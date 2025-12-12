import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/images/bg-login.png';

const DriverApplicationPage = () => {
  const navigate = useNavigate();

  // Initialize from localStorage if available
  const initialData = JSON.parse(localStorage.getItem('driverForm')) || {
    fullName: '',
    email: '',
    phoneNumber: '',
    vehicleType: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleCompany: '',
    licenseFile: null,
    vehiclePhotoFile: null,
    personalPhotoFile: null,
    agreeTerms: false
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // Auto-save formData to localStorage
  useEffect(() => {
    localStorage.setItem('driverForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : files ? files[0] : value;
    setFormData({
      ...formData,
      [name]: val,
    });

    // Show preview if file is selected
    if (files && files.length > 0) {
      const fileUrl = URL.createObjectURL(files[0]);
      setShowPreview((prev) => ({
        ...prev,
        [name]: fileUrl
      }));
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert('Full Name is required.');
      return false;
    }
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Please enter a valid email.');
      return false;
    }
    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      alert('Phone number must be 10 digits.');
      return false;
    }
    if (!formData.vehicleType.trim() || !formData.vehicleNumber.trim() || !formData.vehicleModel.trim() || !formData.vehicleCompany.trim()) {
      alert('Please fill all vehicle details.');
      return false;
    }
    // File validation
    const fileFields = ['personalPhotoFile', 'vehiclePhotoFile', 'licenseFile'];
    for (let field of fileFields) {
      const file = formData[field];
      if (!file) {
        alert(`Please upload ${field.replace('File', '').replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert(`${field.replace('File', '').replace(/([A-Z])/g, ' $1')} must be less than 2MB.`);
        return false;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert(`${field.replace('File', '').replace(/([A-Z])/g, ' $1')} must be an image (jpeg/png) or PDF.`);
        return false;
      }
    }
    if (!formData.agreeTerms) {
      alert('You must agree to the terms and privacy policy.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Thank you for your application! We will review your details shortly.');
      localStorage.removeItem('driverForm');
      navigate('/dashboard'); // Redirect to dashboard after submission
    }, 2000);
  };

  return (
    <div
      className="relative min-h-screen w-screen flex items-center justify-center bg-cover bg-center py-8"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      <div className="z-10 w-full max-w-4xl p-6 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl text-white">
        <h2 className="text-2xl font-bold text-center text-indigo-400 mb-4">Join Us as a Driver</h2>
        <p className="text-center text-gray-400 mb-6">Submit your details to start earning with Glide.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Personal Identity */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Personal Identity</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <label className="block text-gray-400">
                  Personal Photo
                  <input
                    type="file"
                    name="personalPhotoFile"
                    onChange={handleChange}
                    required
                    accept="image/jpeg, image/png"
                    className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                  />
                </label>
                {showPreview.personalPhotoFile && (
                  <img src={showPreview.personalPhotoFile} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Vehicle Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="vehicleType"
                  placeholder="Vehicle Type (e.g., Mini Car)"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="Vehicle Number (e.g., DL1CXYZ1234)"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  name="vehicleModel"
                  placeholder="Vehicle Model"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="text"
                  name="vehicleCompany"
                  placeholder="Vehicle Company"
                  value={formData.vehicleCompany}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400">
                      Vehicle Photo
                      <input
                        type="file"
                        name="vehiclePhotoFile"
                        onChange={handleChange}
                        required
                        accept="image/jpeg, image/png"
                        className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                      />
                    </label>
                    {showPreview.vehiclePhotoFile && (
                      <img src={showPreview.vehiclePhotoFile} alt="Vehicle Preview" className="w-24 h-24 object-cover rounded-md mt-2" />
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400">
                      Driving License
                      <input
                        type="file"
                        name="licenseFile"
                        onChange={handleChange}
                        required
                        accept="application/pdf,image/jpeg,image/png"
                        className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                      />
                    </label>
                    {showPreview.licenseFile && (
                      <div className="mt-2 text-sm text-gray-300">File selected</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-700" />

          {/* Terms and Privacy */}
          <div>
            <label className="text-sm text-gray-300 flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="mr-2"
              />
              I agree to the{' '}
              <a href="/privacy" className="text-indigo-400 underline ml-1">Privacy Policy</a> and{' '}
              <a href="/terms" className="text-indigo-400 underline ml-1">Terms of Service</a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-sm font-bold rounded-md ${loading ? 'bg-gray-600' : 'bg-indigo-400 hover:bg-indigo-300'} text-gray-900 transition-colors`}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm">
              <h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
              <p className="mb-6">Are you sure you want to submit the application?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="px-4 py-2 bg-indigo-400 hover:bg-indigo-300 text-gray-900 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverApplicationPage;