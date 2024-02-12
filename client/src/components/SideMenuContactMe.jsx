import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaStackOverflow } from "react-icons/fa6";


export default function ContactMe () {

    return (
        <div id="connect-with-me">
            <p className="text-xs py-1">Connect with me :</p>
            <div className="flex">                
                <span>
                    <div className="link-icon py-1">
                        <Link to="https://twitter.com/hklim5" target="_blank">
                            <FaSquareXTwitter style={{ width: "20",  height: "20" }} />
                        </Link>
                    </div>
                </span>
                <span>
                    <div className="link-icon py-1" >
                        <Link to="https://github.com/hybee234" target="_blank">
                            <FaGithub style={{ width: "20",  height: "20" }} />
                        </Link>
                    </div>
                </span>
                <span>
                    <div className="link-icon py-1" >
                        <Link to="https://www.linkedin.com/in/hy-l-25020953/" target="_blank">
                            <FaLinkedin style={{ width: "20",  height: "20" }}/>
                        </Link>
                    </div>
                </span>
                <span>
                    <div className="link-icon py-1" >
                        <Link to="https://stackoverflow.com/users/23088153/hybee" target="_blank">
                            <FaStackOverflow style={{ width: "20",  height: "20" }} />
                        </Link>
                    </div>
                </span>
            </div>
            <p className="text-xs py-1">Hy, Feb 2024</p>
        </div>
    )
}