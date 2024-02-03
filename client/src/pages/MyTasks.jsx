import { useQuery } from '@apollo/client';

import { GET_ME } from './../utils/queries'

import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';

// import { TASKS_BY_ID } from './../utils/queries'
// import Auth from '../utils/auth';


export default function MyTasks() {

        // Pull my data
        const {loading, error, data } = useQuery(GET_ME);    

        const userData = data?.me || {}


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

    // setUser(userData)



    console.log(userData)

    const user = userData

    return (
    <div>    
        <TasksSummary me={userData} /> 
        <TaskList me={userData}/>
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