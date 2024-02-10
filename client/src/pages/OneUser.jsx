
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { USER_LIST, ALL_TASKS } from '../utils/queries'
import Auth from '../utils/auth';

import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import AddNewTask from '../components/TaskAddNew';

import { useGlobalContext } from '../utils/GlobalState';
import { useNavigate } from 'react-router-dom';

import {
    VIEW,
} from '../utils/actions'

export default function OneUser() {
    console.log("🌳 OneUser Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    // Hook to useNavigate
    const navigate = useNavigate();

    // If state.viewOneUser is blank (i.e. after refresh) then set it to then navigate to MyTask
    // This is to prevent an infinite loop    
    if (state.viewOneUser._id) {
        console.log("🌏 state.viewOneUser._id", state.viewOneUser._id)
    } else {
        navigate('/mytasks')
    }

    const [userId, setUserId] = useState(Auth.getProfile().data._id)
    
    useEffect( ()=> {
        dispatch ({ type: VIEW, payload: "oneuser"})
    },[state.view])

    //-------------//
    //- Use Query -//
    //-------------//

    //Initialise the data
    // const myData = myDataQuery.data?.me || {}
    // const userList = userListQuery.data?.users || {}

    //Handle error and loading together
    const allTaskData = useQuery(ALL_TASKS);    
    const userSelectData = useQuery(USER_LIST);   
    const error = allTaskData.error|| userSelectData.error
    const loading = allTaskData.loading || userSelectData.loading

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



    //---------------------//
    //- Data Manipulation -//
    //--------------------//

    // Filter for Active Tasks for Current logged in user
    // const filterTasks = allTaskData.data.tasks.filter( (task) => task.assigned._id === state.viewOneUser._id && !task.complete_flag) 
    // // Sort by Review Date
    // const sortTasks = filterTasks.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    // //Package into tasks to handover
    // const tasks = sortTasks

    // Tasks
    // Filter for Active Tasks for Current logged in user
    const filterTasks = allTaskData.data.tasks.filter( (task) => task.assigned._id === state.viewOneUser._id && !task.complete_flag) 
    // Sort by Review Date
    const sortTasks = filterTasks.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    // Package into tasks to handover
    const tasks = sortTasks
    console.log("🎁 OneUser tasks:", tasks)

    // Users
    // Sort users
    console.log("🎁 userSelectData.data.users",userSelectData.data.users)
    const sortUsers = userSelectData.data.users
    console.log("🎁 sortUsers", sortUsers)
    const userSelect = sortUsers.slice().sort((a,b) => (a.username > b.username) ? 1 : (a.username < b.username) ?-1 :0)
    console.log("🎁 userSelect", userSelect)


    return (
        <div>
            <div className="brand text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">{state.viewOneUser.username}'s tasks</div>
            <TasksSummary tasks={tasks}  />          
            <TaskList tasks={tasks} userSelect={userSelect}/>  
            <TaskDetailModal userSelect={userSelect} />
            <AddNewTask user={userId} userSelect={userSelect} />  
        </div>
    )
}