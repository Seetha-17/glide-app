const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ride = require('../models/Ride');
const User = require('../models/User');
const Review = require('../models/Review');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

const vehicleDetails = {
  'Bike': { fareRate: 8, capacity: 1 },
  'Auto': { fareRate: 12, capacity: 3 },
  'Electric Auto': { fareRate: 15, capacity: 3 },
  'Mini Car': { fareRate: 20, capacity: 4 },
  'XL Sedan': { fareRate: 25, capacity: 6 },
  'Luxury': { fareRate: 40, capacity: 4 },
};

// Helper function to get distance from Google Maps API
const getDistance = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      console.error('Distance Matrix API error:', response.data.status, response.data.error_message);
      return null;
    }
    
    // Add checks for data existence to prevent crashes
    if (!response.data.rows || !response.data.rows[0] || !response.data.rows[0].elements || !response.data.rows[0].elements[0]) {
        console.error('Distance Matrix API response is missing required data.');
        return null;
    }

    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      const distanceInKm = element.distance.value / 1000;
      return distanceInKm;
    } else {
      console.error('Distance Matrix element status error:', element.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance:', error.message);
    return null;
  }
};

// @desc    Request a new ride
// @route   POST /api/rides/request
// @access  Private (Rider)
exports.requestRide = asyncHandler(async (req, res) => {
  const io = req.io;
  const { pickupLocation, dropoffLocation, vehicleType } = req.body;
  const riderId = req.user.id;

  const newRide = new Ride({
    rider: riderId,
    pickupLocation,
    dropoffLocation,
    vehicleType,
    status: 'requested',
  });
  await newRide.save();
  io.emit('new_ride_request', newRide);
  res.status(201).json(newRide);
});

// @desc    Get all requested rides
// @route   GET /api/rides/requested
// @access  Private (Driver)
exports.getRequestedRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
  res.status(200).json(rides);
});

// @desc    Accept a ride
// @route   PUT /api/rides/accept/:rideId
// @access  Private (Driver)
exports.acceptRide = asyncHandler(async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    res.status(404);
    throw new Error('Ride not found');
  }
  if (ride.status !== 'requested') {
    res.status(400);
    throw new Error('Ride already accepted or unavailable');
  }
  ride.driver = driverId;
  ride.status = 'accepted';
  await ride.save();
  io.to(ride.rider.toString()).emit('ride_accepted', ride);
  res.status(200).json(ride);
});

// @desc    Get a fare estimate for a specific vehicle
// @route   POST /api/rides/fare
// @access  Private (Rider)
exports.getFareEstimate = asyncHandler(async (req, res) => {
  const { pickup, dropoff, vehicleType } = req.body;
  const fareRatePerKm = vehicleDetails[vehicleType]?.fareRate || 20;
  const distance = await getDistance(pickup, dropoff);
  if (distance === null) {
    res.status(500);
    throw new Error('Could not calculate distance.');
  }
  const estimatedFare = parseFloat((distance * fareRatePerKm).toFixed(2));
  res.status(200).json({ estimatedFare });
});

// @desc    Get all available fares for a route
// @route   POST /api/rides/fares
// @access  Public
exports.getFares = asyncHandler(async (req, res) => {
  const { pickup, dropoff } = req.body;
  const distance = await getDistance(pickup, dropoff);
  if (distance === null) {
    res.status(500);
    throw new Error('Could not calculate distance.');
  }
  const fares = Object.keys(vehicleDetails).map(type => ({
    type,
    fare: parseFloat((distance * vehicleDetails[type].fareRate).toFixed(2)),
    capacity: vehicleDetails[type].capacity,
  }));
  res.status(200).json({ fares });
});

// @desc    Start a ride
// @route   PUT /api/rides/start/:rideId
// @access  Private (Driver)
exports.startRide = asyncHandler(async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  const ride = await Ride.findById(rideId);
  if (!ride || ride.driver.toString() !== driverId) {
    res.status(404);
    throw new Error('Ride not found or unauthorized');
  }
  ride.status = 'in_progress';
  await ride.save();
  io.to(ride.rider.toString()).emit('ride_started', ride);
  res.status(200).json({ message: 'Ride started', ride });
});

// @desc    Complete a ride
// @route   PUT /api/rides/complete/:rideId
// @access  Private (Driver)
exports.completeRide = asyncHandler(async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  const ride = await Ride.findById(rideId);
  if (!ride || ride.driver.toString() !== driverId) {
    res.status(404);
    throw new Error('Ride not found or unauthorized');
  }
  ride.status = 'completed';
  const finalDistance = await getDistance(ride.pickupLocation, ride.dropoffLocation);
  if (finalDistance === null) {
     res.status(500);
     throw new Error('Could not calculate final distance.');
  }
  ride.fare = parseFloat((finalDistance * vehicleDetails[ride.vehicleType].fareRate).toFixed(2));
  await ride.save();
  io.to(ride.rider.toString()).emit('ride_completed', ride);
  res.status(200).json({ message: 'Ride completed', ride });
});

// @desc    Get matching rides for a driver's route
// @route   POST /api/rides/match
// @access  Private (Driver)
exports.getMatchingRides = asyncHandler(async (req, res) => {
  const { driverRoute } = req.body;
  const requestedRides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
  const matchingRides = requestedRides.filter(ride => 
    ride.pickupLocation === driverRoute.start && ride.dropoffLocation === driverRoute.end
  );
  res.status(200).json(matchingRides);
});

// @desc    Create a Stripe payment intent
// @route   POST /api/rides/create-payment-intent
// @access  Private (Rider)
exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { rideId } = req.body;
  const ride = await Ride.findById(rideId);
  if (!ride) {
    res.status(404);
    throw new Error('Ride not found');
  }
  const fareInCents = Math.round(ride.fare * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: fareInCents,
    currency: 'inr',
    metadata: { rideId: ride._id.toString() },
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

// @desc    Submit a review for a completed ride
// @route   POST /api/rides/review/:rideId
// @access  Private (Rider)
exports.submitReview = asyncHandler(async (req, res) => {
  const { rideId, rating, comment } = req.body;
  const riderId = req.user.id;
  const ride = await Ride.findById(rideId);
  if (!ride || ride.rider.toString() !== riderId || ride.status !== 'completed') {
    res.status(404);
    throw new Error('Ride not found or cannot be reviewed');
  }
  const review = new Review({
    ride: rideId,
    rider: riderId,
    driver: ride.driver,
    rating,
    comment,
  });
  await review.save();
  res.status(201).json(review);
});