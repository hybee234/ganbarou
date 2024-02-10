import { useQuery } from '@apollo/client';
import { USER_LIST} from '../utils/queries'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import { useGlobalContext } from '../utils/GlobalState';

import {
    VIEW_ONE_USER,
} from '../utils/actions'

export default function SideMenuUserSelect () {
    console.log("🌳 SideMenuViewOneUserSelector Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    // Hook to useNavigate
    const navigate = useNavigate();

    const {loading, error, data} = useQuery(USER_LIST);   
    //Show Loading screen if loading
    if (loading) {
        return ( 
        <div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 1.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    //Show error screen if error
    if (error) {return (
        <div> MyTask Page - Error! 
            {/* <div> ${error.message}</div> */}
            <div> Allow this Chiikawa character to lighten the mood</div>
            <div> Has the user session expired? Perhaps this should point to the login screen</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 1.gif" /></div>        
        </div>    
    );}

    //-------------------------------//
    //- Handle Selected User Update -//
    //-------------------------------//
    // Receives new user._id filters userList for username and id, dispatches action to state.
    const handleUserUpdate = async (e)=> {
        console.log("📢 HandleUserUpdate engaged")
        // console.log("HandleAssignUpdate, etarget,value", e.target.value)
        console.log("🌏 state.viewOneUser._id:", state.viewOneUser._id)
        console.log("💬 e.target.value", e.target.value)
        // value 1 = None selected option
        if (e.target.value === "1") {
            console.log("💬 null value selected")
            return
        } else {
            //Filter for user matching ID provided
            const user = data.users.filter( (a) => a._id === e.target.value)            
            console.log("🖥️ User", user[0])
            // Dispatch action to update GLobal state
            await dispatch({
                type: VIEW_ONE_USER,
                payload: user[0]
            })   
            navigate('/oneuser');
        }  
    }

    const checkViewOneUser = () => {
        console.log("🌏 state.viewOneUser", state.viewOneUser)
    }

    // Users
    // Sort users
    // console.log("🎁 userSelectData.data.users", data.users)
    const sortUsers = data.users
    // console.log("🎁 sortUsers", sortUsers)
    const userSelect = sortUsers.slice().sort((a,b) => (a.username > b.username) ? 1 : (a.username < b.username) ?-1 :0)
    // console.log("🎁 userSelect", userSelect)

    return (
        <div className = "">  
            <p className="side-menu-heading">View One User</p>       
            <select
                className="side-menu-item modal-select"
                name="user"
                type="text"
                defaultValue="1"
                value={state.viewOneUser._id}
                onChange= {(e) => handleUserUpdate(e)}
                required
                >
                <option value="1">Select a User...</option>
                {
                    userSelect.map( (user)=> {                            
                        return(
                            <option id={user._id} value={user._id} key={user._id}>{user.username}</option>
                        ) 
                    })
                }
            </select>
            {/* <button
                className="side-menu-item px-3 py-2 font-bold duration-200 ease-in-out button-color w-full"
                name="add"
                type="button"
                value="button"
                onClick={(e) => checkViewOneUser(e)}
                >
                &nbsp; 🌏 state.viewOneUser                    
            </button> */}
            

        </div>
    )
    
}