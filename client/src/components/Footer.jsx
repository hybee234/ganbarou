import { useGlobalContext } from '../utils/GlobalState';
import { Icon } from '@iconify/react';
import Auth from '../utils/auth';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Footer() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    // Hook to useNavigate
    const navigate = useNavigate();

    const consoleLog = () => {
        console.log("🌏 state", state)
        const loggedIn = Auth.loggedIn()
        console.log("💬 Logged In?", loggedIn)
    }

    // Remove JWT - can be left over from a different app
    const clearToken = () => {
        console.log("📢 ClearToken Engaged - logged out")
        Auth.logout()  
        toast.success('JWT removed from local storage, logged out')     
        navigate('/')
    }

    return (
        <div className = "footer">

            <div className = "bg-filter" >       
                <button
                    className="px-3 py-2 font-bold duration-200 ease-in-out button-color"
                    type="button"
                    value="cancel"
                    onClick={() => consoleLog()}
                    >
                    <div className="flex align-middle items-center">                          
                            <Icon
                                icon="fa:gears"
                                width="30" height="30" 
                                className="task-detail-icon m-auto"
                            />
                            <div>&nbsp; console.log(state)</div>                                                  
                    </div> 
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
                
                <button
                    className="px-3 py-2 font-bold duration-200 ease-in-out button-color"
                    onClick={() => clearToken()}
                >
                    Log out / Clear JWT                    
                </button>

                <p>Hybee February 2024</p>
            </div>
        </div>
    );
}

export default Footer;
