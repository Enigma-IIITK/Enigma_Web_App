"use client"
import React, {useEffect} from 'react';
import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useRouter } from "next/navigation";

import signUp from "../firebase/signup";
import signIn from "../firebase/signin";
import addData from "../firebase/addData";
import { useAuthContext } from "../firebase/AuthContext";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/AuthContext';

const Login = () => {

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


    return router.push("/user_dashboard")


  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push('/dashboard'); 
        }
    });

    return () => unsubscribe();
}, [router]);

  const signUpHandler = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { result, error } = await signUp(email, password);
    setLoading(false)


    if (error) {
      setIsErrorSignUp(true)
      return console.log(error)
    }

    // add user to database


    var data = { "username": userName, "email": email }
    const { result: result2, error: error2 } = await addData("users", result.user.uid, data)
    if (error2) {
      setIsErrorSignIn(true)
      return console.log(error2)
    }

    return router.push("/users")
  }
  const closeToast = () => {
    setIsErrorSignIn(false)
    setIsErrorSignUp(false)
  }


  return (


    <div className="flex py-10 justify-center  bg-cover bg-left"
      style={{ backgroundImage: "url('random/bg_login.png')" }}>

      {
        isErrorSignIn ?
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

      <div className="w-full max-w-md p-8 space-y-6 bg-black  bg-opacity-50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-100">Sign in</h2>
        <form className="mt-8 space-y-6"  onSubmit={signInHandler}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Email"
                  required
                  autoFocus onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full px-3 py-2 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIcon className="absolute right-2 w-5 h-5 text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-violet-500 hover:text-violet-300">Forgot your password?</a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-violet-400 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign in
            </button>
          </div>
        </form>
        <div className="relative flex justify-center text-sm">
          {/* <span className="px-2 bg-black bg-opacity-50 text-gray-100">Or</span> */}
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">
            <span className="sr-only">Sign in with Google</span>
            {/* <img src="/google-icon.svg" alt="Google icon" className="w-6 h-6" /> */}
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">
            <span className="sr-only">Sign in with GitHub</span>
            {/* <img src="/github-icon.svg" alt="GitHub icon" className="w-6 h-6" /> */}
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account? <Link href="/signup" className="font-medium text-violet-500 hover:text-violet-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
