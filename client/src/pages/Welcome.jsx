// import picture from '/assets/images/Profile.jpg'
// import { Link } from 'react-router-dom';
import WelcomeLogin from './../components/Welcome-Login'


export default function Welcome() {
    return (
        <div className="page">
            <div className="page-header bg-filter">
                <h1>Ganbarou!</h1>
            </div>
            
            <div className = "about-me-page bg-filter justify-center mt-10">
                <h2 className="w-full">頑張ろう </h2>
                <h2 className="w-full">Let's Do Our best!</h2> 
                <div className ="flex flex-wrap justify-center">
                    
                    <div className = "about-me-text-container p-2 m-2 text-left">
                        <p> "No matter the challenges ahead, we can conquer this together as a team. Give it our best, trust in each other and everything will be OK. Ganbarou!" </p>
                        <p>  </p>                                                
                        <p> Please login or sign up to to take advantage of this sophisticated task management and planning solution!  </p>
                        <div className="text-center">
                        
                        </div>
                    </div>
                    <div className = "flex p-2 m-2 justify-start">
                        
                    </div>
                </div>
            </div>

            <WelcomeLogin />
        </div>
    );
}
