"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import signUp from "../firebase/signup";
import signIn from "../firebase/signin";
import addData from "../firebase/addData";
import { useAuthContext } from "../firebase/AuthContext";


import '../loader.css';


const Login = () => {
    const sectionStyle = {
        backgroundImage: `url('/section.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        margin: '10px 0 0 0',
        height: '500px',

    };

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
        <section style={sectionStyle} className="user">
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
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    :
                    <></>
            }
            {
                isErrorSignUp ?
                    <div id="toast-danger" className="z-10 fixed bottom-5 left-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Something went wrong. Is your password &gt;8 characters?</div>
                        <button type="button" onClick={closeToast} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    :
                    <></>
            }
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Aren't a member yet?</h2>
                        <p className="user_unregistered-text">Discover the AI Magic with us and fellow like-minded AI-ians.</p>
                        <button className="user_unregistered-signup" id="signup-button">Sign up</button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Aleady a part of this great club?</h2>
                        <p className="user_registered-text">My friend, you won my heart. Special people like should go here instead.</p>
                        <button className="user_registered-login" id="login-button">Login</button>
                    </div>
                </div>

                <div className="user_options-forms" id="user_options-forms">
                    <div className="user_forms-login">
                        <h2 className="forms_title">Login</h2>
                        <form className="forms_form text-white" onSubmit={signInHandler}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="email" placeholder="Email" className="forms_field-input" required autoFocus onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="forms_field">
                                    <input type="password" autoComplete="true" placeholder="Password" className="forms_field-input" required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <button type="button" className="forms_buttons-forgot">Forgot password?</button>
                                {loading ? <div className="loader"></div> : <input type="submit" value="Log In" className="forms_buttons-action" />}


                            </div>
                        </form>
                    </div>
                    <div className="user_forms-signup">
                        <h2 className="forms_title">Sign Up</h2>
                        <form className="forms_form " onSubmit={signUpHandler} >
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Full Name" className="forms_field-input text-white" required onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="forms_field">
                                    <input type="email" placeholder="Email" className="forms_field-input" required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="forms_field">
                                    <input type="password" autoComplete="true" placeholder="Password" className="forms_field-input" required onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                {loading ? <div className="loader"></div> : <input type="submit" value="Sign up" className="forms_buttons-action" />}
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;