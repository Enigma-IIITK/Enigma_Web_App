
import React from 'react';
import Link from 'next/link';

const signup = () => {
  return (
    <div className="flex items-center justify-end min-h-screen bg-cover bg-center px-8"
    style={{ backgroundImage: "url('random/background.jpg')" }}>
      <div className="w-full max-w-2xl p-12 space-y-6 bg-white bg-opacity-95 rounded-lg shadow-lg min-h-[425px]">
        <h2 className="text-4xl font-extrabold text-gray-900">Sign Up</h2>
        <p className="text-lg text-gray-600">Become part of the Enigma community!</p>
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="******************"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="******************"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm">
              <Link href="/login"className="font-medium text-green-600 hover:text-green-500">Already have an account? Sign In</Link>
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
