import Auth from '../utils/auth';
import OutsideClickHandler from 'react-outside-click-handler';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../utils/GlobalState';
import { SIDE_MENU } from '../utils/actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideMenuViewOneUserSelector from './SideMenuViewOneUserSelector'
import ContactMe from './SideMenuContactMe'


export default function SideMenu() {

    // console.log("SideMenu refreshed")
    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    // const [outsideClick, setOutSideClick] = useState(false)

    // Hook to useNavigate
    const navigate = useNavigate();

    const toggleSideMenu = () => {
        if (state.sidemenu === true) {
            document.querySelector(".hamburger").classList.add("active");
            document.querySelector(".side-menu").classList.add("active"); 
            // console.log("Active Added")
            dispatch ({
                type: SIDE_MENU,
                payload: false
            })
        } else {
            document.querySelector(".hamburger").classList.remove("active");
            document.querySelector(".side-menu").classList.remove("active"); 
            // console.log("Active removed")
            dispatch ({
                type: SIDE_MENU,
                payload: true
            })
        }
    }

    const handleLogout = () => {
        // console.log("handleLogut engaged")
        // Log user out (remove 'id_token')
        Auth.logout()
        // Show toast
        toast.success('Logged out Successfully!')
        // Invoke reacter-route to move to home page
        toggleSideMenu()
        navigate('/login')        
    }

    //-----------------------------------------------//
    //- Randomly picks between 3 gifs for side menu -//
    //-----------------------------------------------//
    function randomInt123(min, max) { // min and max inclusive
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let rndInt = randomInt123(1, 6)

    if (rndInt === 4) {
        rndInt = 7
    }

    let gif = `../assets/images/chiikawa loading ${rndInt}.gif`


    return (
        <header >
            {/* <OutsideClickHandler onOutsideClick={sideMenuHide}> */}
                {/* Hamburger */}                        
                <div className="w-1/5">                            
                    { Auth.loggedIn() ? (                        
                        <button className="hamburger"
                            onClick={toggleSideMenu}                        
                            >                                
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                        ) : (                        
                        // <div className="hamburger hidden"></div>
                        // Hide this when done coding ....
                        <div className="hamburger"
                            onClick={toggleSideMenu}
                            
                            >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        )
                    }                                
                </div>

                {/* Side Menu */}            
                <div className="side-menu flex items-center justify-center bg-filter">
                    <li className="relative w-full">
                        <p className="side-menu-heading">Menu</p>
                        <Link to="/" className="side-menu-item">Home</Link>
                        { 
                            Auth.loggedIn() ? 
                            (
                                <div className="">
                                    <Link to="/mytasks" className="side-menu-item">My Tasks </Link>    
                                    <Link to="/alltasks" className="side-menu-item">All Active Tasks </Link>               
                                    <Link to="/assigned" className="side-menu-item"> Assigned Tasks </Link>   
                                    <Link to="/unassigned" className="side-menu-item"> Unassigned Tasks </Link> 
                                    <Link to="/business" className="side-menu-item"> Business Driven Requests </Link> 
                                    <Link to="/completed" className="side-menu-item">Completed Tasks </Link>
                                    <SideMenuViewOneUserSelector />   
                                    <button id="logout-button" className="side-menu-item mt-10"
                                        onClick={handleLogout}
                                        >
                                        Logout
                                    </button>
                                </div>
                            ): (
                                <div>
                                    <div>
                                        <Link to="/login" className="side-menu-item">Login </Link>                  
                                        <Link to="/signup" className="side-menu-item"> Sign Up</Link>                                    
                                    </div>
                                    <div className="mt-20 side-menu-heading">
                                        Log in for more features
                                    </div>
                                </div>
                            )
                        }
                        {/* To come back to fix */}
                        {
                            state.user.security === 'admin' ?
                            (
                                <div>
                                    <p className="side-menu-heading side-menu-admin">Admin Only</p>
                                    <p className="side-menu-item">User security: {state.user.security}</p>
                                    <Link to="/Signup" className="side-menu-item side-menu-admin"> User Management</Link>    
                                </div>
                            ) : (
                                <div>
                                    
                                </div>
                            )               
                        }
                    </li>

                    {/* Chiikawa character for a bit of fun */}
                    <div id="side-menu-chiikawa">
                        <div className = "text-center py-2">
                            <img
                                id="chiikawa-gif"
                                className = "chiikawa-gif m-auto py-2"
                                width="160px"
                                src={gif}
                            />
                        </div>
                        <ContactMe />                       
                    </div>






                </div>
            {/* </OutsideClickHandler> */}

            {/* Logo/Heading */}      
            <div className="flex flex-wrap md:flex md:flex-wrap items-center mx-auto"> 
                <div className="w-3/5 brand-container">
                    <div className="flex flex-wrap justify-center text-center">                                
                        <Link className="link" to='/'>
                            {/* <img src='/assets/images/Ganbarou Logo 2.png' width="300px" className="font-semibold text-center text-color text-3xl sm:text-4xl lg:text-5xl m-auto "></img>   */}
                            <div className="brand text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">Ganbarou!</div>
                            <div id="ganbarou-subtitle" className="hidden sm:block text-md xl:text-lg">頑張ろう</div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* User */}  
            {/* <div className="w-1/5 text-right">                 
                {
                    Auth.loggedIn() ? (                        
                        <div>Logged in as {Auth.getProfile().data.username}</div>
                    ) : (                        
                        <div></div>
                    )
                } 
            </div>  */}     
        </header>
    )
}