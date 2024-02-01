import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import Auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';

import { SIDE_MENU } from '../utils/actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SideMenu() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    // Hook to useNavigate
    const navigate = useNavigate();

    // console.log(state.user_security)

    if (state.sidemenu === "toggle") {
        document.querySelector(".hamburger").classList.toggle("active");
        document.querySelector(".side-menu").classList.toggle("active"); 
        // console.log(state.sidemenu)
    } 

    if (state.sidemenu === "hide") {
        document.querySelector(".hamburger").classList.remove("active");
        document.querySelector(".side-menu").classList.remove("active"); 
        // console.log(state.sidemenu)
    } 
    

    const sideMenuShow = () => {
        dispatch ({
            type: SIDE_MENU,
            payload: "toggle"
        })
    }

    const sideMenuHide = () => {
        // console.log ("clicked outside")
        dispatch ({
            type: SIDE_MENU,
            payload: "hide"
        })
    }

    if (Auth.loggedIn()) {
        const usenameJWT = Auth.getProfile().data.username
        const emailJWT = Auth.getProfile().data.email
        const _idJWT = Auth.getProfile().data._id
        // console.log(usenameJWT)
    }

    const handleLogout = () => {
        console.log("handleLogut engaged")
        // Log user out (remove 'id_token')
        Auth.logout()
        // Invoke reacter-route to move to home page
        navigate('/')
        // Show toast
        toast.success=('Logged out Successfully')
    }


    return (
        <header>
            <OutsideClickHandler onOutsideClick={sideMenuHide}>
                <div className="mx-auto border-2">
                    {/* <!-- Container for navbar content --> */}
                    <div className="flex flex-wrap md:flex md:flex-wrap items-center border-2">
                        {/* {{! Hamburger Icon }} */}
                        
                            <div className="w-1/5 border-2">
                            
                                { Auth.loggedIn() ? (                        
                                    <button className="hamburger w-1/12 "
                                        onClick={sideMenuShow}                        
                                        >                                
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                    </button>
                                    ) : (                        
                                    // <div className="hamburger hidden"></div>
                                    
                                    <div className="hamburger w-1/12 "
                                        onClick={sideMenuShow}
                                        
                                        >
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                    </div>

                                    )
                                }
                                
                            </div>     
                        
                        <div className="w-3/5 border-2">
                                <div className="flex flex-wrap justify-center">
                                    <Link to='/'>
                                        <img src='/assets/images/ganbarou.jpeg' width="200px" className="font-semibold text-center text-color text-3xl sm:text-4xl lg:text-5xl m-auto "></img>  
                                    </Link>
                                </div>
                        </div>                     
                        <div className="w-1/5 border-2 text-right">
                        
                        </div>                    
                    </div>
                </div>

            {/* <!-- Side Menu --> */}            
                <div className="side-menu flex items-center justify-center bg-filter">
                    <li className="relative w-full">
                        <p className="side-menu-heading">Welcome, </p>
                        <Link to="/" className="side-menu-item">Home</Link>
                        { 
                            Auth.loggedIn() ? (
                                <button id="logout-button" className="side-menu-item"
                                onClick={handleLogout}
                                >
                                Logout
                                </button>
                            ): (
                            <div>
                                <Link to="/Login" className="side-menu-item">Login </Link>                  
                                <Link to="/Signup" className="side-menu-item"> Sign Up</Link>
                            </div>
                            )
                        }
                        {
                            state.user.security === 'admin' ?
                            (
                            <div>
                                <p>admin user!</p>
                                <p>User security: {state.user.security}</p>
                                <Link to="/Signup" className="side-menu-item"> User Management</Link>    
                            </div>
                            ) : (
                            <div>
                                <p>not admin user!</p>
                                <p>User security:  {state.user.security}</p>
                                
                            </div>
                            )               
                        }
                    </li>
                </div>
            </OutsideClickHandler>
        </header>

        
    )
}