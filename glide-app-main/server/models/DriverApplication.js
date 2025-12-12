const mongoose = require('mongoose');

const driverApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleCompany: {
    type: String,
    required: true,
  },
  licenseFile: {
    type: String, // Store the file path
    required: true,
  },
  vehiclePhotoFile: {
    type: String, // Store the file path
    required: true,
  },
  personalPhotoFile: {
    type: String, // Store the file path
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DriverApplication = mongoose.model('DriverApplication', driverApplicationSchema);
module.exports = DriverApplication;