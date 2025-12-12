const DriverApplication = require('../models/DriverApplication');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get all driver applications
// @route   GET /api/admin/applications
// @access  Private (Admin)
exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await DriverApplication.find({});
  res.status(200).json(applications);
});

// @desc    Update a driver application status
// @route   PUT /api/admin/applications/:id
// @access  Private (Admin)
exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await DriverApplication.findById(id);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  application.status = status;
  await application.save();
  res.status(200).json({ message: `Application status updated to ${status}`, data: application });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});