"use client"; // Make sure to include this for client-side rendering

import { useState } from 'react';
import { db } from '../firebase/addData'; 
import { collection, addDoc } from 'firebase/firestore';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Add email to the Firestore subscriber list
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: new Date(),
      });
      setMessage('You have been successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage('There was an error. Please try again.');
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-[url('/random/subscribe.jpg')] p-4">
      <h1 className="text-white text-3xl">The Weekly Epoch</h1>
      <br />
      <h1 className="text-white text-2xl mb-4">Subscribe to our Newsletter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default Subscribe;
