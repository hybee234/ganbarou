import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './../utils/mutations'
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineUserAdd } from "react-icons/ai";


// Constants to validate form fields
let nameOK;
let emailOK;
let passwordOK;
let repeatOK
const regex = new RegExp(/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z0-9_.-]+)$/)

export default function SignUp () {

    // Hook to useNavigate
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    //Field updated event
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else if (name === "repeat") {
            setRepeat(value)
        }
    }

    // Blur event (lost focus)
    const handleInputBlur = e => {
        const { name, value } = e.target;
        // console.log(`${name} lost focus, ${value}, ${value.length}`);

        // If name field loses focus
        if (name === "name") {
            // If name value is null - show message
            if (!value) {
                // console.log ("Name is required")
                document.getElementById('name-warning').style.visibility = "visible";
                nameOK = 0;
            }
            // If name value is OK - hide message
            if (value) {
                // console.log ("Name is OK")
                document.getElementById('name-warning').style.visibility = "hidden";
                nameOK = 1;
            }

        // If email field loses focus
        } else if (name === "email") {            
            // If email value is null - show message
            if (!value) {
                // console.log ("Email is required")
                document.getElementById('email-warning').style.visibility = "visible";
                emailOK = 0;
            }
            // If email value is OK - check regex here
            if (value) {
                // console.log ("Email is populated")                
                //Test value against regex
                if (regex.test(value)) {
                    //Hide message if pass regex test
                    console.log ("regex test", regex.test(value))
                    document.getElementById('email-warning').style.visibility = "hidden";
                    emailOK = 1;
                } else {
                    //Show message if fail regex text
                    console.log ("regex test", regex.test(value))
                    document.getElementById('email-warning').style.visibility = "visible";
                    emailOK = 0;
                }
            }

        // If password field loses focus
        } else if (name === "password") {
            // If message length lt 10 - show message
            if (value.length < 8) {
                // console.log ("Message more than 10 chars is required")
                document.getElementById('password-warning').style.visibility = "visible";
                passwordOK = 0
            }          
            // If message is OK - hide message
            if (value.length >=8) {
                // console.log ("Message is OK")
                document.getElementById('password-warning').style.visibility = "hidden";
                passwordOK = 1
            }           

        // If repeat password field loses focus
        } else if (name === "repeat") {
            // If message length lt 10 - show message
            if ( password !== repeat ) {
                // console.log ("Message more than 10 chars is required")
                document.getElementById('repeat-warning').style.visibility = "visible";
                repeatOK = 0
            }          
            // If repeat password is OK - hide message
            if (password === repeat) {
                // console.log ("Message is OK")
                document.getElementById('repeat-warning').style.visibility = "hidden";
                repeatOK = 1
            }            
        }
    };


    // Call in useMutation Hook
    const [AddUser, { error }] = useMutation(ADD_USER);

    // Form Submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //Check if form is ready to submit
        // console.log("nameOK:", nameOK, ". emailOK: ", emailOK, ". passwordOK: ", passwordOK, ". repeatOK: ", repeatOK)
        if (nameOK === 1 && emailOK === 1 && passwordOK === 1 && repeatOK ===1) {
            // Graph QL useMutation method
            try {
                const { data } = await AddUser({
                    variables: {
                        username: name,
                        email: email,
                        password: password,
                    }
                })
                // Store token in local storage - id_token (Auth.login already redirects use to home page)                
                Auth.login(data.addUser.token);

                toast.success(`Sign Up Successful! Welcome ${data.addUser.user.username}!`) 

                //Navigate to MyTasks)
                navigate('/MyTasks');

                // Clear form
                setName('');
                setEmail('');
                setPassword('');
                setRepeat('');

            } catch (error) {
                console.error(error);
                toast.error("Oops! Something went wrong in the Sign up Process") 
            }

            
        } else {
            // Fields are not OK 
            toast.error("Please correct the errors on the form before attempting to sign up") 
        }
    };

    return (
        <div className="page">
            <div className="page-header bg-filter">
                <h1>Sign up</h1>
            </div>
            <div className="sign-up-body">     
                <div className="justify-center w-full text-center">
                    <form
                        id="sign-up-form"
                        className="m-auto my-5 bg-filter rounded-xl text-center border"
                        onSubmit= {handleFormSubmit}
                        >
                        {/* <h2 className="w-11/12 mx-auto block uppercase text-lg font-semibold md:text-2xl modal-heading"> Sign Up </h2> */}
                        <div className="w-full px-1 mx-auto mt-5 justify-center">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Name: </label>
                            <input
                                className="w-11/12 input-field"
                                id="sign-up-name"
                                value={name}
                                name="name"
                                type="text"                                
                                placeholder="Full name"
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                required
                            />            
                            <p id="name-warning" className="warningtext">A name is required</p>                
                        </div>    
                        <div className="w-full px-1 mx-auto justify-center">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Email: </label>
                            <input
                                className="w-11/12 input-field"
                                id="sign-up-email"
                                value={email}
                                name="email"
                                type="text"                            
                                placeholder="Email..."
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                required
                            />
                            <p id="email-warning" className="warningtext">Please enter a valid email address</p>                            
                        </div>
                        <div className="w-full px-1 mx-auto">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Password </label>
                            <input
                                className="w-11/12 input-field"
                                id="sign-up-password"
                                value={password}
                                name="password"
                                type="password"                                
                                placeholder="Minimum 8 Characters... "
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                required
                            />
                            <p id="password-warning" className="warningtext">Password must be at least 8 characters</p>                            
                        </div>
                        <div className="w-full px-1 mx-auto">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Repeat Password </label>
                            <input
                                className="w-11/12 input-field"
                                id="sign-up-repeat-password"
                                value={repeat}
                                name="repeat"
                                type="password"                                
                                placeholder="Minimum 8 Characters... "
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                required
                            />
                            <p id="repeat-warning" className="warningtext">Passwords do not match</p>                             
                        </div>
                        <button id="create-account-button" className="px-6 py-2 my-5 font-bold button-color" type="submit" value="submit">
                            <div className="flex align-middle items-center">
                                <div><AiOutlineUserAdd size="25"/></div>
                                <div> &nbsp; Sign Up</div>
                            </div>                            
                        </button>
                        <div className="text-center mt-3">Already have an account?</div>                    
                        <Link to="/Login" className="link underline">Log in here</Link>
                    </form>  



                </div>
            </div>
        </div>
    )



}