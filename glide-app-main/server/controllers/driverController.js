const DriverApplication = require('../models/DriverApplication');
const asyncHandler = require('express-async-handler');

// @desc    Submit a new driver application
// @route   POST /api/drivers/apply
// @access  Public
exports.submitApplication = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    vehicleType,
    vehicleNumber,
    vehicleModel,
    vehicleCompany,
    licenseFile,
    vehiclePhotoFile,
    personalPhotoFile,
  } = req.body;

  // Input validation
  if (!fullName || !email || !phoneNumber || !vehicleType || !vehicleNumber || !vehicleModel || !vehicleCompany) {
    res.status(400);
    throw new Error('Please fill all required fields.');
  }

  const existingApplication = await DriverApplication.findOne({ email });
  if (existingApplication) {
    res.status(400);
    throw new Error('An application with this email already exists.');
  }

  const newApplication = new DriverApplication({
    fullName,
    email,
    phoneNumber,
    vehicleType,
    vehicleNumber,
    vehicleModel,
    vehicleCompany,
    licenseFile,
    vehiclePhotoFile,
    personalPhotoFile,
  });

  await newApplication.save();
  res.status(201).json({ message: 'Application submitted successfully!', data: newApplication });
});