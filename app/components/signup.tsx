"use client"
import React from 'react';
import Link from 'next/link';

import { useRouter } from "next/navigation";

import signUp from "../firebase/signup";
import signIn from "../firebase/signin";
import addData from "../firebase/addData";
import { useAuthContext } from "../firebase/AuthContext";

const signup = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isErrorSignIn, setIsErrorSignIn] = React.useState(false)
  const [isErrorSignUp, setIsErrorSignUp] = React.useState(false)
  const router = useRouter()

  const signInHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { result, error } = await signIn(email, password);
    setLoading(false)

    if (error) {
      setIsErrorSignIn(true)
      return console.log(error)
    }
    /**
     * DO SOMETHING WHEN LOGGED IN
     */

    console.log(result);


    return router.push("/users")


  }

  const signUpHandler = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { result, error } = await signUp(email, password);
    setLoading(false)
    console.log(result)

    if (error) {
      setIsErrorSignUp(true)
      return console.log(error)
    }

    // add user to database


    var data = {  "email": email }
    const { result: result2, error: error2 } = await addData("users", result.user.uid, data)
    if (error2) {
      setIsErrorSignIn(true)
      return console.log(error2)
    }

    return router.push("/dashboard");
  }
  const closeToast = () => {
    setIsErrorSignIn(false)
    setIsErrorSignUp(false)
  }


  return (
    <div className="flex items-center justify-end min-h-screen bg-cover bg-center px-8"
    style={{ backgroundImage: "url('random/bg_signup.png')" }}>
     
     {
        isErrorSignUp ?
          <div id="toast-danger" className="z-10 fixed bottom-5 left-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Wrong Username/Password</div>
            <button type="button" onClick={closeToast} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          :
          <></>
      }


      <div className="w-full max-w-2xl p-12 space-y-6 bg-black bg-opacity-50 rounded-lg shadow-lg min-h-[425px]">
        <h2 className="text-4xl font-extrabold text-black-500">Sign Up</h2>
        <p className="text-lg text-gray-400">Become part of the Enigma community!</p>
        <form className="mt-8 space-y-6" onSubmit={signUpHandler}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div className='sm:col-span-2'>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-3 py-2 mt-1 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your email"
                required
                autoFocus onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-3 py-2 mt-1 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="******************"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-black">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="block w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="******************"
                required
              />
            </div> */}
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm">
              <Link href="/login"className="font-medium text-pink-500 hover:text-pink-700">Already have an account? Sign In</Link>
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
