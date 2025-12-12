import React from 'react';
import heroImage from '../assets/images/pathpal-hero.png'; // illustrative hero image
import step1Image from '../assets/images/step1.png';
import step2Image from '../assets/images/step2.png';
import step3Image from '../assets/images/step3.png';
import studentIcon from '../assets/images/student.png';
import professionalIcon from '../assets/images/professional.png';
import friendsIcon from '../assets/images/friends.png';

const PathPalSection = () => {
  const steps = [
    {
      title: 'Plan Your Journey',
      description: 'Set your starting point and destination. Anyone traveling can join—students, professionals, friends!',
      image: step1Image
    },
    {
      title: 'Get Matched in Real Time',
      description: 'Our smart algorithm finds travelers heading in the same direction and suggests shared rides.',
      image: step2Image
    },
    {
      title: 'Share Your Ride & Save',
      description: 'Enjoy discounted fares, reduce your carbon footprint, and make new connections!',
      image: step3Image
    }
  ];

  const benefits = [
    { title: 'Save Money', description: 'Share rides and reduce your commute fare.', icon: studentIcon },
    { title: 'Eco-Friendly', description: 'Fewer cars on the road means lower emissions.', icon: professionalIcon },
    { title: 'Build Community', description: 'Meet fellow travelers and make new friends.', icon: friendsIcon },
    { title: 'Flexible', description: 'Anyone can share a ride—no need to be a driver.', icon: studentIcon },
    { title: 'Safe & Trusted', description: 'Ratings and verification ensure secure travel.', icon: professionalIcon }
  ];

  const testimonials = [
    {
      quote: 'I saved 30% on my daily commute thanks to PathPal!',
      name: 'Ankit, Student',
    },
    {
      quote: 'I met amazing classmates on my way to campus!',
      name: 'Riya, Student',
    },
    {
      quote: 'Sharing rides makes my daily commute so much more fun!',
      name: 'Sameer, Professional',
    },
  ];

  return (
    <section className="w-full bg-gray-900 text-white py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-4">
            PathPal: Shared Journeys, Smarter Commutes
          </h2>
          <p className="text-gray-300 mb-6">
            Connect with fellow travelers heading your way and save money, time, and the planet.
          </p>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105">
            Start Sharing Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img src={heroImage} alt="PathPal hero" className="rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-3xl font-bold text-indigo-400 text-center mb-12">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
              <img src={step.image} alt={step.title} className="w-24 h-24 mb-4 rounded-xl" />
              <h4 className="text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h3 className="text-3xl font-bold text-indigo-400 text-center mb-12">Core Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition transform hover:scale-105">
              <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 mb-4 rounded-xl" />
              <h4 className="font-bold mb-2">{benefit.title}</h4>
              <p className="text-gray-300 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto mb-16">
        <h3 className="text-3xl font-bold text-indigo-400 text-center mb-12">What Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl p-6 text-center hover:scale-105 transform transition">
              <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
              <p className="font-bold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg transition transform hover:scale-105">
          Find or Offer a Ride
        </button>
      </div>
    </section>
  );
};

export default PathPalSection;
