
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { USER_LIST, ALL_TASKS } from '../utils/queries'
import Auth from '../utils/auth';
import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import AddNewTask from '../components/Task - AddNew';

import { useGlobalContext } from '../utils/GlobalState';
import {
    VIEW,
} from '../utils/actions'

export default function Unassigned() {
    console.log("AllTasks Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    const [userId, setUserId] = useState(Auth.getProfile().data._id)

    useEffect( ()=> {
        dispatch ({ type: VIEW, payload: "unassigned"})
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
    const filterTasks = allTaskData.data.tasks.filter( (task) => !task.complete_flag && task.assigned._id ==="65c5681fada9c3ff849efeed") // Filter for Active Tasks excluding unnassignedfor Current logged in user
    // SOrt by Review Date
    const sortTasks = filterTasks.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    //Package into tasks to handover
    const tasks = sortTasks

    console.log("AllAssigned: tasks", tasks)

    return (
    <div>
        <div className="brand text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">Unassigned Tasks</div>    
        <TasksSummary tasks={tasks}  />
        <TaskList tasks={tasks} userSelect={userSelect.data.users} />  
        <TaskDetailModal userSelect={userSelect.data.users} />
        <AddNewTask user={userId} userSelect={userSelect.data.users}/>  
    </div>
    )
}