
import { useQuery } from '@apollo/client';
import { GET_ME } from './../utils/queries'
import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
import TaskDetailModal from '../components/TaskDetailModal';

export default function MyTasks() {
    console.log("MyTask Rendering")

    //-------------//
    //- Use Query -//
    //-------------//
    const {loading, error, data } = useQuery(GET_ME);    
    const userData = data?.me || {}

    //Show Loading screen if loading
    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 1.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    //Show error screen if error
    if (error) {return (
        <div id="loading-screen"> MyTask Page - Error! 
            <div> ${error.message}</div>
            <div> Allow this Chiikawa character to lighten the mood</div>
            <div> Has the user session expired? Perhaps this should point to the login screen</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 1.gif" /></div>        
        </div>    
    );}

    return (
    <div>    
        <TasksSummary user={userData} />
        <TaskList user={userData} />
        {/* Hide the modals when you're done configuring them */}
        <div className= "">
            <TaskDetailModal user={userData} />
        </div>
    </div>
    )
}