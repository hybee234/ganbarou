// import { Icon } from '@iconify/react';
//<Icon icon="ic:twotone-login"></Icon>
//form.control - to add "onChange" and value to both email and password

export default function WelcomeLogin () {
    return (
        <div className="mx-auto w-11/12 max-w-sm">        
            <div className="justify-center text-center">
                <form id="login-form" className="m-auto my-5 bg-filter rounded-xl text-center border">
                    <div className="w-full px-1 mx-auto my-5 justify-center">
                        <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Email: </label>
                        <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out modal-field appearance-none" id="login-email" name="login-email" type="email" placeholder="Email..." required ></input>
                    </div>
                    <div className="w-full px-1 mx-auto my-2">
                        <label className="w-5/6 mx-auto text-left block mb-2 text-xs font-bold tracking-wide text-color uppercase"> Password </label>
                        <input className="w-11/12 px-4 py-3 mb-0 leading-tight duration-200 ease-in-out modal-field appearance-none" id="login-password" name="login-password" type="password"  placeholder="Password..." required></input>
                    </div>
                    <button id="login-login-button" className="px-6 py-2 my-5 font-bold duration-200 ease-in-out button-color" type="submit" value="submit">  &nbsp;Log In</button>
                </form>  
            </div>
        </div>
    )
}