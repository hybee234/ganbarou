
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { TASKS_BY_ID } from '../utils/queries'

import TasksSummary from '../components/TasksSummary';

export default function MyTasks() {

//Summary Pages
    //Tasks
    //Operational
    //Business Driven
    //Priority
    //Opportunistic
    //Detailed panel

    //*********************//
    //* CALL QUERIES *//
    //*********************//

    // Multiple queries (without defining loading, data, error)

    // Get user data of logged in person
    const myData = useQuery(GET_ME);    
    // Get tasks using ID of logged in user
    const taskById = useQuery(TASKS_BY_ID, {
        variables: { assigned: Auth.getProfile().data._id }
    })
    
    //Handle error and loading together
    const error = myData.error || taskById.error
    const loading = myData.loading || taskById.loading

    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    if (error) {return (
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>        
        </div>    
    );}

    // Array of me
    const me = myData.data.me
    console.log("me", me)
    
    // Array of tasks assigned to userID
    const tasks = taskById.data.tasksById
    console.log ("tasks", tasks)
    
    const meTasks = myData.data.me.tasks
    console.log ("meTasks", meTasks)


    
    return (
    <div>
        My current tasks!       
        {/* <TasksSummary tasks={myTasks} />  */}
    <h2>
    {/* {
        myData.tasks.length ?
            `You have ${myData.tasks.length} active
                ${
                    myData.tasks.length === 1 ?
                        'task'
                        :
                        'tasks'
                }`
            : 
            'You have no active tasks!'
    } */}
    </h2>
    </div>




    )
}