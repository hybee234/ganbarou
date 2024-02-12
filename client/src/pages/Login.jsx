
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOG_IN } from './../utils/mutations'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiSignInBold } from "react-icons/pi";

export default function Login () {
    // Hook to useNavigate
    const navigate = useNavigate();

    //Hooks for useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //Field updated event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    // useMutation
    const [Login, { error }] = useMutation(LOG_IN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        //Call graphql - Login Mutation
        try {
            const { data } = await Login({
                variables: {
                    email: email,
                    password: password,
                }
            })

            // Store token in local storage - id_token (Auth.login already redirects use to home page)
            Auth.login(data.login.token);    
            // console.log(data.login.user.username)
            setEmail('');
            setPassword('');          
            toast.success(`Login Successful`)  

            //Navigate to Home Page (Navigate doesn't trigger page refresh and retains toast notification)
            navigate('/MyTasks');

        } catch (error) {
            toast.error("Log in Failed, Please Try Again") 
            console.error(error);    
        }
    };

    return (

        <div className="page">
            <div className="page-header bg-filter">
                <h1>Login</h1>
            </div>
            <div className="login-body">        
                <div className="justify-center text-center">
                    <form id="login-form" className="m-auto my-5 bg-filter rounded-xl text-center border"
                        onSubmit={handleFormSubmit}>                        
                        <div className="w-full px-1 mx-auto my-5 justify-center">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Email: </label>
                            <input
                                className="w-11/12 input-field"
                                id="login-email"
                                value={email}
                                name="email"
                                type="email"
                                placeholder="Email..."
                                onChange={handleInputChange}
                                required                                 
                            />
                        </div>
                        <div className="w-full px-1 mx-auto my-2">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Password </label>
                            <input
                                className="w-11/12 input-field"
                                id="login-password"
                                value={password}
                                name="password"
                                type="password" 
                                placeholder="Password..."
                                onChange={handleInputChange}
                                required                                
                            />
                        </div>
                        <button id="login-login-button" className="px-6 py-2 my-5 font-bold duration-200 ease-in-out button-color" type="submit" value="submit">
                            <div className="flex align-middle items-center">
                                <PiSignInBold size="25" />
                                <div>&nbsp; Log in</div>
                            </div>
                        </button>

                        <div className="text-center mt-3">Don't have an account?</div>
                        <Link to="/Signup" className="link underline">Sign up here</Link>

                    </form>  

                </div> 
            </div>
        </div>
    )
}