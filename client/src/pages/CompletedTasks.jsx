
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { USER_LIST, ALL_TASKS } from '../utils/queries'
import Auth from '../utils/auth';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';


import { useGlobalContext } from '../utils/GlobalState';
import {
    VIEW,
} from '../utils/actions'

export default function CompletedTasks() {
    console.log("🌳 Completed Task Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    const [userId, setUserId] = useState(Auth.getProfile().data._id)

    useEffect( ()=> {
        dispatch ({ type: VIEW, payload: "completed"})
    },[state.view])
    

    //-------------//
    //- Use Query -//
    //-------------//
    const allTaskData = useQuery(ALL_TASKS);    
    const userSelect = useQuery(USER_LIST);   

    //Initialise the data
    // const myData = myDataQuery.data?.me || {}
    // const userList = userListQuery.data?.users || {}

    //Handle error and loading together
    const error = allTaskData.error|| userSelect.error
    const loading = allTaskData.loading || userSelect.loading

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

    // Filter for Active Tasks 
    const filterTasks = allTaskData.data.tasks.filter( (task) => task.complete_flag) // Filter for Active Tasks for Current logged in user
    // SOrt by Review Date
    const sortTasks = filterTasks.sort((a,b) => (a.complete_dt > b.complete_dt) ? 1 : (a.complete_dt < b.complete_dt) ?-1 :0)
    //Package into tasks to handover
    const tasks = sortTasks

 

    console.log("🎁 Completed: tasks", tasks)
    return (
    <div>
        <div className="brand text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl mb-5">Completed Tasks View</div>    
        {/* <TasksSummary tasks={tasks}  /> */}
        <TaskList tasks={tasks} userSelect={userSelect.data.users} />  
        <TaskDetailModal userSelect={userSelect.data.users} />
        {/* <AddNewTask user={userId} userSelect={userSelect.data.users}/>   */}
    </div>
    )
}