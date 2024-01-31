import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';
import Auth from '../utils/auth';

import { SIDE_MENU } from '../utils/actions';

export default function SideMenu() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    console.log(state.user_security)

    if (state.sidemenu === "toggle") {
        document.querySelector(".hamburger").classList.toggle("active");
        document.querySelector(".side-menu").classList.toggle("active"); 
        // console.log(state.sidemenu)
    } 
    

const hamburgerOnClick = () => {
    dispatch ({
        type: SIDE_MENU,
        payload: "toggle"
    })
}

// const hamburgerOnBlur = () => {
//     dispatch ({
//         type: SIDE_MENU,
//         payload: "inactive"
//     })
// }

    return (
        <header>            
            <div className="mx-auto border-2">
                {/* <!-- Container for navbar content --> */}
                <div className="flex flex-wrap md:flex md:flex-wrap items-center border-2">
                    {/* {{! Hamburger Icon }} */}
                    <div className="w-1/5 border-2">
                        { Auth.loggedIn() ? (                        
                            <button className="hamburger w-1/12 "
                                onClick={hamburgerOnClick}                        
                                >                                
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </button>
                            ) : (                        
                            // <div className="hamburger hidden"></div>
                            <div className="hamburger w-1/12 "
                                onClick={hamburgerOnClick}
                                >
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </div>
                            )
                        }
                    </div>                    
                    <div className="w-3/5 border-2">
                            <Link to='/'>
                                <img src='/assets/images/ganbarou.jpeg' width="200px" className="font-semibold text-center text-color text-3xl sm:text-4xl lg:text-5xl m-auto "></img>  
                            </Link>
                    </div>                     
                    <div className="w-1/5 border-2">
                    </div>                    
                </div>
            </div>

            {/* <!-- Side Menu --> */}
            <div className="side-menu flex items-center justify-center">
                <li className="relative w-full">
                    <p className="side-menu-heading">Welcome, </p>
                    <Link to="/" className="side-menu-item">Home</Link>   
                    <Link to="/Login" className="side-menu-item">Login </Link>                  
                    <Link to="/Signup" className="side-menu-item"> Sign Up</Link>               
                    <button id="logout-button" className="side-menu-item">Logout</button>
                    {
                        state.user_security === 'admin' ?
                        (
                        <div>
                            <p>admin user!</p>
                            <p>{state.user_security}</p>
                        </div>
                        ) : (
                        <div>
                            <p>not admin user!</p>
                            <p>{state.user_security}</p>
                        </div>
                        )               
                    }
                </li>
            </div>

        </header>

        
    )






}