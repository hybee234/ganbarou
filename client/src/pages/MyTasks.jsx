
import { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_ME, USER_LIST } from './../utils/queries'
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

    //-------------//
    //- Use Query -//
    //-------------//
    const userData = useQuery(GET_ME);    
    const userSelect = useQuery(USER_LIST);   

    //Initialise the data
    // const myData = myDataQuery.data?.me || {}
    // const userList = userListQuery.data?.users || {}

    //Handle error and loading together
    const error = userData.error|| userSelect.error
    const loading = userData.loading || userSelect.loading

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

    // clean list of tasks
    console.log("MyTasks Page, Tasks:", userData.data.me.tasks)
    console.log("MyTasks Page, UserList", userSelect.data.users )

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
        <TasksSummary tasks={userData.data.me.tasks}  />
        <TaskList tasks={userData.data.me.tasks} userSelect={userSelect.data.users} />
        {/* Hide the modals when you're done configuring them */}
        <div className= "">
            <TaskDetailModal userSelect={userSelect.data.users} />
        </div>
        {/* <TestComponent test1={userData} test2={userList}/> */}
    </div>
    )
}