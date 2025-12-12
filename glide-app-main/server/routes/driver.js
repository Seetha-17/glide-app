const express = require('express');
const { submitApplication } = require('../controllers/driverController');
const { getAllApplications } = require('../controllers/adminController'); // Correct import
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', submitApplication);
router.get('/applications', protect, getAllApplications); // This line must be present and correct

module.exports = router;