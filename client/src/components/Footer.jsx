import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/GlobalState';

import { FaGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaStackOverflow } from "react-icons/fa6";


function Footer() {

    //Hook to access state
    const [state, dispatch] = useGlobalContext();

    // [HL] Hy tracking global state
    const consoleLog = () => {
        console.log("state", state)
    }


    return (
        <div className = "footer">

            <div className = "bg-filter" >       
                <button className="button-color px-6 py-2 my-2 font-bold text-2xl" onClick={() => consoleLog()} >
                    Console.log(state)
                </button>         
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
                <p>Hybee January 2024</p>
            </div>
        </div>
    );
}

export default Footer;
