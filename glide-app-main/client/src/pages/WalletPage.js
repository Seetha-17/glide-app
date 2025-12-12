import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import walletBg from '../assets/images/bg-wallet.png';

// Sample transactions data
const initialTransactions = [
  { id: 1, type: 'Credit', amount: 500, date: '2025-09-10', status: 'Completed' },
  { id: 2, type: 'Debit', amount: 150, date: '2025-09-11', status: 'Completed' },
  { id: 3, type: 'Credit', amount: 200, date: '2025-09-12', status: 'Pending' },
];

const WalletPage = () => {
  const [balance, setBalance] = useState(150); 
  const [transactions, setTransactions] = useState(initialTransactions);
  const [rewardPoints, setRewardPoints] = useState(50);
  const [animateBalance, setAnimateBalance] = useState(balance);
  const navigate = useNavigate();

  // Animate balance changes
  useEffect(() => {
    let start = animateBalance;
    const end = balance;
    if (start === end) return;

    const step = () => {
      start += (end - start) / 5;
      if (Math.abs(start - end) < 0.5) {
        setAnimateBalance(end);
      } else {
        setAnimateBalance(start);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [balance]);

  // Handle Quick Top-Up
  const handleAddMoney = (amount) => {
    setBalance(prev => prev + amount);
    setTransactions(prev => [
      { id: prev.length + 1, type: 'Credit', amount, date: new Date().toLocaleDateString(), status: 'Completed' },
      ...prev
    ]);
  };

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-start bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${walletBg})` }}
    >
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>

      <div className="z-10 w-full max-w-2xl p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl text-white">
        <h2 className="text-4xl font-extrabold text-indigo-400 mb-6 text-center">My Wallet</h2>

        {/* Current Balance */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-inner mb-6 text-center">
          <p className="text-xl text-gray-400">Current Balance</p>
          <p className="text-5xl font-bold text-white mt-2">₹{animateBalance.toFixed(2)}</p>
        </div>

        {/* Quick Add Money Buttons */}
        <div className="flex justify-between mb-6 gap-3 flex-wrap">
          {[100, 200, 500, 1000].map(amount => (
            <button
              key={amount}
              onClick={() => handleAddMoney(amount)}
              className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-bold transition transform hover:scale-105"
            >
              +₹{amount}
            </button>
          ))}
        </div>

        {/* Navigate to Add Money Page */}
        <button
          onClick={() => navigate('/add-money')}
          className="w-full py-3 mb-6 text-sm font-bold rounded-md text-gray-900 bg-indigo-400 hover:bg-indigo-300 transition-colors"
        >
          Add Custom Amount
        </button>

        {/* Rewards Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-indigo-400 mb-2">Rewards</h3>
          <p className="text-gray-300">You have <span className="font-bold">{rewardPoints} points</span> available!</p>
          <p className="text-gray-400 text-sm mt-1">Redeem points for discounts on rides.</p>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4">Transaction History</h3>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-3 bg-gray-700 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount}
                  </p>
                  <p className={`text-xs ${tx.status === 'Completed' ? 'text-green-300' : 'text-yellow-300'}`}>
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>All transactions are secure and verified.</p>
          <p>Wallet balance updates instantly after top-ups or refunds.</p>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
