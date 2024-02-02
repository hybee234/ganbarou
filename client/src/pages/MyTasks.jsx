
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from './../utils/queries'
import { TASKS_BY_ID } from './../utils/queries'

import TasksSummary from '../components/TasksSummary';
import TaskList from '../components/TasksList';

export default function MyTasks() {

//Summary Pages

    //Detailed panel

    // Pull my data
    const {loading, error, data } = useQuery(GET_ME);    

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
    const me = data.me
    // console.log("me", me)        
    // const tasks = data.me.tasks
    // console.log ("tasks", tasks)
    
    return (
    <div>    
        <TasksSummary me={me} /> 
        <TaskList me={me}/>
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