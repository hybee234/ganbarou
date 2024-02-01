
import { useQuery } from '@apollo/client';
import { GET_ME } from './../utils/queries'
import MyTasksSummary from '../components/MyTasksSummary';

export default function MyTasks() {

//Summary Pages
    //Tasks
    //Operational
    //Business Driven
    //Priority
    //Opportunistic
    //Detailed panel

    // Retrived Logged in User records for rendering
    const { data, loading } = useQuery(GET_ME);
    let myData = data?.me || {};

    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../public/assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    console.log (data)

    return(
    <div>
        My current tasks!       
        <MyTasksSummary myData={myData} />
    <h2>
    {
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
    }
    </h2>
    </div>




    )
}