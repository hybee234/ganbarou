
import { useQuery } from '@apollo/client';
import { GET_ME } from './../utils/queries'
import TasksSummary from '../components/TasksSummary';

export default function MyTasks() {

//Summary Pages
    //Tasks
    //Operational
    //Business Driven
    //Priority
    //Opportunistic
    //Detailed panel

    // Retrived Logged in User records for rendering
    const { loading, error, data } = useQuery(GET_ME);
    // console.log ("data", data)
    let myData = data?.me || {};
    // console.log ("myData", myData)



    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    if (error) {return `Error! ${error.message}`;}

    return (
    <div>
        My current tasks!       
        <TasksSummary myData={myData} /> 
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