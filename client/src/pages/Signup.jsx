import { AiOutlineUserAdd } from "react-icons/ai";


export default function SignUp () {


    return (

        <div className="page">
            <div className="page-header bg-filter">
                <h1>Sign up</h1>
            </div>
            <div className="sign-up-body">     
                <div className="justify-center w-full text-center">
                    <form id="sign-up-form" className="m-auto my-5 bg-filter rounded-xl text-center border">
                        <h2 className="w-11/12 mx-auto block uppercase text-lg font-semibold md:text-2xl modal-heading"> Sign Up </h2>
                        <div className="w-full px-1 mx-auto my-5 justify-center">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Name: </label>
                            <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out appearance-none modal-field" id="sign-up-name" name="email" type="text" required placeholder="Full name">
                            </input>
                        </div>    
                        <div className="w-full px-1 mx-auto my-5 justify-center">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Email: </label>
                            <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out appearance-none modal-field" id="sign-up-email" name="email" type="text" required placeholder="Email...">
                            </input>
                        </div>
                        <div className="w-full px-1 mx-auto my-5">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Password </label>
                            <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out appearance-none modal-field" id="sign-up-password" name="password" type="password" required placeholder="Minimum 8 Characters... ">
                            </input>
                        </div>
                        <div className="w-full px-1 mx-auto my-5">
                            <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Repeat Password </label>
                            <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out appearance-none modal-field" id="sign-up-repeat-password" name="repeat-password" type="password" required placeholder="Minimum 8 Characters... ">                            
                            </input>
                        </div>
                        <button id="create-account-button" className="px-6 py-2 my-5 font-bold duration-200 ease-in-out button-color" type="submit" value="submit">
                            <div className="flex align-middle items-center">
                                <div><AiOutlineUserAdd size="25"/></div>
                                <div> &nbsp; Sign Up</div>
                            </div>
                        </button>
                    </form>  
                </div>
            </div>
        </div>
    )



}