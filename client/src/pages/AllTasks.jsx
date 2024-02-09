
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { USER_LIST, ALL_TASKS } from '../utils/queries'
import Auth from '../utils/auth';
import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';

import { useGlobalContext } from '../utils/GlobalState';
import {
    TASKS,
    USER_SELECT,
} from '../utils/actions'

export default function AllTasks() {
    console.log("AllTasks Rendering")

    //Hook to access state
    const [state, dispatch] = useGlobalContext();
    const [userId, setUserId] = useState(Auth.getProfile().data._id)

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
    const tasks = allTaskData.data.tasks.filter( (task) => !task.complete_flag) // Filter for Active Tasks for Current logged in user
    console.log("MyTasksPage:tasks", tasks)

    // useEffect( ()=> {    
    //     if (state.tasks.length) {
    //         //do nothing
    //         console.log(state.tasks)
    //         console.log('state.tasks OK')
    //     } else{
    //         console.log('state.tasks null')
    //         dispatch({
    //                 type: TASKS,
    //                 payload: tasks
    //             })
    //     }
    // }, [])

    // useEffect( ()=> {    
    //     if(state.userlist.length) {
    //         console.log(state.userlist)
    //     } else {
    //         console.log('state.userlist null')
    //         dispatch({
    //             type: USER_SELECT,
    //             payload: userSelect.data.users
    //         })
    //     }
    // }, [])



    return (
    <div>
        <div className="brand text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">All Tasks</div>    
        <TasksSummary tasks={tasks}  />
        <TaskList tasks={tasks} userSelect={userSelect.data.users} />  
        <TaskDetailModal userSelect={userSelect.data.users} />
    </div>
    )
}