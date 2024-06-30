import React from 'react';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/24/outline';

const Login = () => {
  return (
    <div className="flex py-10 justify-center  bg-cover bg-left"
    style={{ backgroundImage: "url('random/background2.jpg')" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign in</h2>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative">
                <input 
                  type="username" 
                  id="username" 
                  name="username" 
                  className="w-full px-3 py-2 text-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  placeholder="Username" 
                  required 
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative flex items-center">
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" 
                  placeholder="Password" 
                  required 
                />
                <EyeIcon className="absolute right-2 w-5 h-5 text-gray-500 cursor-pointer"/>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign in
            </button>
          </div>
        </form>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">
            <span className="sr-only">Sign in with Google</span>
            <img src="/google-icon.svg" alt="Google icon" className="w-6 h-6"/>
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">
            <span className="sr-only">Sign in with GitHub</span>
            <img src="/github-icon.svg" alt="GitHub icon" className="w-6 h-6"/>
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link href="/signup"className="font-medium text-green-600 hover:text-green-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
