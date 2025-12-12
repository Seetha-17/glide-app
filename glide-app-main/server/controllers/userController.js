const User = require('../models/User');
const Ride = require('../models/Ride');

// Update driver location
exports.updateLocation = async (req, res, io) => {
  const { latitude, longitude } = req.body;
  const driverId = req.user.id;

  try {
    const user = await User.findById(driverId);
    if (!user || user.role !== 'driver') {
      return res.status(403).json({ message: 'Unauthorized or not a driver' });
    }

    user.location = { type: 'Point', coordinates: [longitude, latitude] };
    await user.save();

    if (io) {
      io.emit('driver_location_update', { driverId: user._id, location: user.location });
    }

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user info
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Only admin or the user itself
    if (req.user.role !== 'admin' && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { username, email, role } = req.body;
    if (username) user.username = username;
    if (email) user.email = email;
    if (role && req.user.role === 'admin') user.role = role;

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get nearby drivers
exports.getNearbyDrivers = async (req, res) => {
  const { latitude, longitude, radius = 5 } = req.query;
  try {
    const drivers = await User.find({
      role: 'driver',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          $maxDistance: radius * 1000,
        },
      },
    }).select('-password');

    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch activity for the logged-in user
exports.getUserActivity = async (req, res) => {
  try {
    const rides = await Ride.find({ rider: req.user._id }).populate('driver', 'username');
    const activity = rides.map((ride) => ({
      id: ride._id,
      title: `Ride with ${ride.driver?.username || 'N/A'}`,
      details: `${ride.pickupLocation} → ${ride.dropoffLocation}`,
      type: 'ride',
      amount: ride.fare || 0,
      status: ride.status,
      date: ride.createdAt.toISOString().split('T')[0],
    }));
    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};