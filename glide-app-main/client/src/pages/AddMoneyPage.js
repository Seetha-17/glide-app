import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import walletBg from '../assets/images/bg-wallet.png';

// Sample recent top-ups (will also update dynamically)
const initialTopUps = [
  { id: 1, amount: 500, date: '2025-09-10', status: 'Completed' },
  { id: 2, amount: 200, date: '2025-09-11', status: 'Completed' },
  { id: 3, amount: 100, date: '2025-09-12', status: 'Pending' },
];

const AddMoneyPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [promoCode, setPromoCode] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [topUps, setTopUps] = useState(initialTopUps);
  const navigate = useNavigate();

  const minAmount = 50;
  const maxAmount = 5000;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount < minAmount || amount > maxAmount) {
      alert(`Amount should be between ₹${minAmount} and ₹${maxAmount}`);
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);

      // Add to recent top-ups
      const newTopUp = {
        id: topUps.length + 1,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
        status: 'Completed',
        paymentMethod,
        note,
      };
      setTopUps([newTopUp, ...topUps]);

      alert(`₹${amount} added to your wallet!`);

      // Redirect to wallet page
      navigate('/wallet');
    }, 2000);
  };

  const handleQuickAmount = (value) => {
    setAmount(value);
  };

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${walletBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      {/* Main Card */}
      <div className="z-10 w-full max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Add Money to Wallet
        </h2>

        {/* Quick Amount Buttons */}
        <div className="flex justify-between mb-6 gap-3 flex-wrap">
          {[100, 200, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAmount(amt)}
              className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-bold transition transform hover:scale-105"
            >
              +₹{amt}
            </button>
          ))}
        </div>

        {/* Add Money Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={minAmount}
            max={maxAmount}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Payment Method Selection */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="NetBanking">Net Banking</option>
            <option value="Wallet">Other Wallet</option>
          </select>

          {/* Promo Code Input */}
          <input
            type="text"
            placeholder="Promo Code (optional)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Optional Note */}
          <input
            type="text"
            placeholder="Note / Reference (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-sm font-bold rounded-md text-gray-900 bg-indigo-400 hover:bg-indigo-300 transition-colors"
          >
            {loading ? 'Processing...' : 'Add Funds'}
          </button>
        </form>

        {/* Recent Top-Ups */}
        <div className="bg-gray-800 rounded-xl p-4 mt-6 max-h-48 overflow-y-auto">
          <h3 className="text-lg font-bold text-indigo-400 mb-2">Recent Top-Ups</h3>
          {topUps.length === 0 ? (
            <p className="text-gray-300">No top-ups yet.</p>
          ) : (
            topUps.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-2 bg-gray-700 rounded-lg mb-2"
              >
                <div>
                  <p className="font-medium">₹{tx.amount}</p>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${tx.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {tx.status}
                  </p>
                  <p className="text-xs text-gray-400">{tx.paymentMethod}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Security Note */}
        <p className="text-gray-400 text-sm text-center mt-4">
          All payments are secure and encrypted. Your card details are never stored.
        </p>
      </div>
    </div>
  );
};

export default AddMoneyPage;
