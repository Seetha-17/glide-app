import React, { useState } from 'react';
import * as axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = ({ rideId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Authorization': `Bearer ${user.token}` } };
      await axios.post(
        `http://localhost:5000/api/rides/review/${rideId}`,
        { rating, comment },
        config
      );
      alert('Review submitted successfully!');
      onReviewSubmit();
    } catch (error) {
      alert('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Rate Your Driver</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;