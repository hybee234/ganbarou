import { PiSignInBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';

import { useGlobalContext } from '../utils/GlobalState';
import {
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD,
    USER
} from '../utils/actions'

import { useMutation } from '@apollo/client';
import { LOG_IN } from './../utils/mutations'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login () {
    // // Hook to useNavigate
    const navigate = useNavigate();

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    // useMutation
    const [Login, { error }] = useMutation(LOG_IN);



    const handleFormSubmit = async (event) => {
        event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        //Call graphql
        try {

            const { data } = await Login({
                variables: {
                    email: state.login_email, 
                    password: state.login_password,
                }
            })

            // Store token in local storage - id_token (Auth.login already redirects use to home page)
            Auth.login(data.login.token);

            console.log(data.login.user)
            dispatch({ type: USER, payload: data.login.user} )
            
            toast.success("Login Successful")  

            //Navigate to Home Page (Testing)
            navigate('/');


            // Write some actions to update the state   
            dispatch({ type: SET_LOGIN_PASSWORD, payload: ''})
            dispatch({ type: SET_LOGIN_EMAIL, payload: ''})
        } catch (err) {
            toast.error("Log in Failed, Please Try Again") 
            console.error(err);    
        }
            
        
        // setUserFormData({
        //     username: '',
        //     email: '',
        //     password: '',
        // });

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
                            <input className="w-11/12 input-field" id="login-email" name="login-email" type="email" placeholder="Email..." required 
                                onChange= {(e) =>
                                dispatch({ type: SET_LOGIN_EMAIL, payload: e.target.value})}
                            ></input>
                        </div>
                        <div className="w-full px-1 mx-auto my-2">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Password </label>
                            <input className="w-11/12 input-field" id="login-password" name="login-password" type="password"  placeholder="Password..." required
                                onChange= {(e) =>
                                dispatch({ type: SET_LOGIN_PASSWORD, payload: e.target.value})}
                            ></input>
                        </div>
                        <button id="login-login-button" className="px-6 py-2 my-5 font-bold duration-200 ease-in-out button-color" type="submit" value="submit">
                            <div className="flex align-middle items-center">
                                <div><PiSignInBold size="25" /></div>
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