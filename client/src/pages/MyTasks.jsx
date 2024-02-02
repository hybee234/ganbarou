
import { useQuery } from '@apollo/client';
import { GET_ME } from './../utils/queries'
import { USER_TASKS } from './../utils/queries'
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
    const myData = useQuery(GET_ME);
    const userTask = useQuery(USER_TASKS)
    
    const error = myData.error || userTask.error
    const loading = myData.loading || userTask.loading
    //myData contains User and Task data
    // let myData = data?.me || {};

    console.log("myData", myData.data)
    console.log ("userTask", userTask.data)
    //myTasks = task data only - to look at removing task data fromm this - changing data structure
    // let myTasks = myData.tasks 

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