const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateLocation,
  getNearbyDrivers,
  getUserActivity
} = require('../controllers/userController');
const Ride = require('../models/Ride');

// Admin routes
router.get('/', protect, getAllUsers);

// Driver location
router.post('/location', protect, updateLocation);

// Nearby drivers for riders
router.get('/drivers/nearby', protect, getNearbyDrivers);

// Activity route for riders - MUST BE PLACED BEFORE THE /:id ROUTE
router.get('/activity', protect, getUserActivity);

// General User routes - This will now only match valid IDs
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;