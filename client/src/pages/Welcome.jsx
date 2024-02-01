import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';

import picture from '/assets/images/Ganbarou Team3.jpeg'

export default function Welcome() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    return (
        <div className="page">
            <div className="page-header bg-filter">
                <h1>Welcome to Ganbarou!</h1>
            </div>
            
            <div className = "about-me-page bg-filter justify-center mt-10">
                {/* <h2 className="w-full"> A team task management solution </h2>                 */}
                <div className ="flex flex-wrap justify-center">
                    <div className = "flex p-2 m-2 justify-start">
                        <img src={picture} width="500px" className="about-me-profile-picture m-auto"></img>                                 
                    </div>
                        <div className = "about-me-text-container p-2 m-2 text-center">               
                        <p> "Ganbarou" (頑張ろう) is a Japanese expression of encouragement and support in times of challenge. It means "Let's do our best together!", calling on the teams determination, perseverence, and collaboration. </p>       
                        <p> Ganbarou seeks to support the positive team spirit by providing a means to organise and plan team tasks. </p>  
                        <div className="text-center pt-10">                            
                            <Link to="/Login" className="button-color w-28 px-6 py-2 text-2xl">Login</Link>&nbsp; or &nbsp;
                            <Link to="/Signup" className="button-color w-28 px-6 py-2 text-2xl">Sign Up</Link>                            
                        </div>
                        <div className="text-center">
                            
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
