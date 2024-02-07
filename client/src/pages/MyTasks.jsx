
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { USER_LIST, ALL_TASKS } from './../utils/queries'
import Auth from '../utils/auth';
import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';
import TestComponent from '../components/TestComponent';

import { useGlobalContext } from '../utils/GlobalState';
import {
    TASKS,
    USER_SELECT,
} from '../utils/actions'

export default function MyTasks() {
    console.log("MyTask Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    const [userId, useUserId] = useState(Auth.getProfile().data._id)

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

    // Filter array for provided UserID (default is the logged in user)
    // console.log("UserID:", userId) 
    const tasks = allTaskData.data.tasks.filter( (task) => task.assigned._id === userId)
    // console.log("MyTasksPage:tasks", tasks)

    // WARNING ... Dispatch causes infinite re-render loop ...
    //
    // useEffect( ()=> {
    //     dispatch({
    //         type: TASKS,
    //         payload: userData.data.me.tasks
    //     })
    
    //     dispatch({
    //         type: USER_SELECT,
    //         payload: userSelect.data.users
    //     })
    // },[userData.data.me.tasks,userSelect.data.users])
    return (
    <div>    
        <TasksSummary tasks={tasks}  />
        <TaskList tasks={tasks} userSelect={userSelect.data.users} />        
        <div className= "">
            <TaskDetailModal userSelect={userSelect.data.users} />
        </div>
        {/* <TestComponent test1={userData} test2={userList}/> */}
    </div>
    )
}