import { Link } from 'react-router-dom';
// import { useGlobalContext } from '../utils/GlobalState';
import Auth from '../utils/auth';

import picture from '/assets/images/Ganbarou Team 3.jpeg'
// import { TODAY } from '../utils/actions'

export default function Welcome() {

    //Hook to access state
    // const [state, dispatch] = useGlobalContext();

    //Create today
    
    // // Discharge today to global state
    // dispatch({ type: TODAY , payload: today})

    return (
        <div className="page">
            <div className="page-header bg-filter">
                <h1>Welcome to Ganbarou!</h1>
            </div>
            
            <div className = "welcome-page bg-filter justify-center">
                {/* <h2 className="w-full"> A team task management solution </h2>                 */}
                <div className ="flex flex-wrap justify-center">
                    <div className = "flex p-2 m-2 justify-start">
                        <img src='./assets/images/Ganbarou Team 3.jpeg' width="500px" className="welcome-picture m-auto"></img>                                 
                    </div>
                        <div className = "welcome-text-container p-2 m-2 text-center">               
                        <p> "Ganbarou!" is a Japanese expression of encouragement and support in times of challenge.</p>
                        <p> Ganbarou means "Lets do our best together!" inspiring team determination, perseverence, and collaboration. </p>       
                        <p> My solution seeks to support the positive team spirit by providing a means to organise and plan team tasks! </p>  
                        {
                            Auth.loggedIn() ?
                            (
                                <div className="text-center">                            
                                    <Link to="/MyTasks" className="button-color w-28 px-6 py-2">View My Tasks</Link>                      
                                </div>
                            ) : (                              
                                <div className="text-center">                            
                                    <Link to="/Login" className="button-color w-28 px-6 py-2">Login</Link>&nbsp; or &nbsp;
                                    <Link to="/Signup" className="button-color w-28 px-6 py-2">Sign Up</Link>                            
                                </div>
                            )
                        }
                        <div className="text-center">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
