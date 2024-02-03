import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';

import Auth from '../utils/auth';

import { FaGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaStackOverflow } from "react-icons/fa6";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Footer() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    // [HL] Hy tracking global state
    const consoleLog = () => {
        console.log("state", state)
        const loggedIn = Auth.loggedIn()
        console.log("Logged In?", loggedIn)
    }

    // Remove JWT - can be left over from a different app
    const clearToken = () => {
        console.log("ClearToken Engaged - logged out")
        Auth.logout()  
        toast.success('JWT removed from local storage, logged out')      
    }

    return (
        <div className = "footer">

            <div className = "bg-filter" >       
                <button className="button-color px-6 py-2 my-2 font-bold text-2xl" onClick={() => consoleLog()} >
                    Console.log(state)
                </button>
                {/* Flag used for developing */}
                { 
                    Auth.loggedIn() ? (
                        <div className="text-green-400">
                            <div>Username: {Auth.getProfile().data.username}</div>
                            <div>Email: {Auth.getProfile().data.email}</div>
                            <div>_id: {Auth.getProfile().data._id}</div>
                        </div>                         
                    ): (
                        <div>
                            <span className="text-red-400"> Not Logged in </span>
                        </div>
                    )
                }         
                <div className="flex justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    <span>
                        <div className="p-3 link">
                            <Link to="https://twitter.com/hklim5" target="_blank">
                                <FaSquareXTwitter />
                            </Link>
                        </div>
                    </span>
                    <span>
                        <div className="p-3 link" >
                            <Link to="https://github.com/hybee234" target="_blank">
                                <FaGithub />
                            </Link>
                        </div>
                    </span>
                    <span>
                        <div className="p-3 link" >
                            <Link to="https://www.linkedin.com/in/hy-l-25020953/" target="_blank">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </span>
                    <span>
                        <div className="p-3 link" >
                            <Link to="https://stackoverflow.com/users/23088153/hybee" target="_blank">
                                <FaStackOverflow />
                            </Link>
                        </div>
                    </span>
                </div>
                <button className="button-color px-6 py-2 my-2 font-bold text-2xl" onClick={() => clearToken()} >
                    Log out / Clear JWT                    
                </button>

                <p>Hybee January 2024</p>
            </div>
        </div>
    );
}

export default Footer;
