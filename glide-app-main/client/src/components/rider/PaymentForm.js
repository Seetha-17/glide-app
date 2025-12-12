// client/src/components/rider/PaymentForm.js
import React from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const CheckoutForm = ({ rideId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) { return; }
    setLoading(true);
    try {
      // Get the client secret from your backend
      const response = await axios.post(
        'http://localhost:5000/api/rides/create-payment-intent',
        { rideId },
        { headers: { 'Authorization': `Bearer ${user.token}` } }
      );
      const { clientSecret } = response.data;

      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: 'http://localhost:3000/dashboard', // Redirect URL
        },
      });
      if (result.error) {
        alert(result.error.message);
      } else {
        alert('Payment successful!');
        // Handle successful payment, e.g., update ride status to paid
      }
    } catch (error) {
      alert('Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Complete Payment</h3>
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="w-full py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700"
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentForm = ({ rideId }) => {
  const options = {
    // You would dynamically get this from your backend
    clientSecret: 'pi_..._secret_...', 
    appearance: { theme: 'stripe' },
  };

  // Pass the client secret dynamically after getting it from the server
  if (!options.clientSecret) { return <div>Loading payment form...</div>; }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm rideId={rideId} />
    </Elements>
  );
};

export default PaymentForm;