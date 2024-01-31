import { Link } from 'react-router-dom';
import picture from '/assets/images/Ganbarou Team3.jpeg'

import { useGlobalContext } from '../utils/GlobalState';


export default function Welcome() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    return (

        <div className="page">
            <div className="page-header bg-filter">
                <h1>Welcome!</h1>
            </div>
            
            <div className = "about-me-page bg-filter justify-center mt-10">
                <h2 className="w-full"> A team task management solution </h2>                
                <div className ="flex flex-wrap justify-center">
                    <div className = "flex p-2 m-2 justify-start">
                        <img src={picture} width="500px" className="about-me-profile-picture m-auto"></img>                                 
                    </div>
                        <div className = "about-me-text-container p-2 m-2 text-left">               
                        <p> "Ganbarou" (頑張ろう) means "Let's do our best together!" It is a Japanese expression of encouragement and support in times of challenge. </p>                                                
                        
                        <p> This solution Ganbarou is a task management solution aimed at organising and planning work within a team! Log in or Sign up to get started!</p>

                        <div className="text-center">
                            <Link to="/Login" className="link about-me-contact-me">Login</Link> 
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
