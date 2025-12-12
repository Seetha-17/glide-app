const express = require('express');

const {
  requestRide,
  getRequestedRides,
  acceptRide,
  getFareEstimate,
  getFares,
  startRide,
  completeRide,
  getMatchingRides,
  createPaymentIntent,
  submitReview,
} = require('../controllers/rideController');

const protect = require('../middleware/authMiddleware');

module.exports = (io) => {
  const router = express.Router();

  // Middleware to attach the Socket.IO instance to every request for emitting in callbacks
  router.use((req, res, next) => {
    req.io = io;
    next();
  });

  router.post('/request', protect, requestRide);
  router.get('/requested', protect, getRequestedRides);
  router.put('/accept/:rideId', protect, acceptRide);
  router.post('/fare', protect, getFareEstimate);
  router.post('/fares', getFares); // Public route, no token needed
  router.put('/start/:rideId', protect, startRide);
  router.put('/complete/:rideId', protect, completeRide);
  router.post('/match', protect, getMatchingRides);
  router.post('/create-payment-intent', protect, createPaymentIntent);
  router.post('/review/:rideId', protect, submitReview);

  return router;
};
