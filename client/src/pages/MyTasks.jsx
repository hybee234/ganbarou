import { useQuery } from '@apollo/client';

import { GET_ME } from './../utils/queries'

import TasksSummary from '../components/TaskSummary';
import TaskList from '../components/TaskList';
// import { useGlobalContext } from '../utils/GlobalState';
// import { USER } from '../utils/actions'

export default function MyTasks() {
    // const [state, dispatch] = useGlobalContext();
    // Pull logged in usser data with Tasks attached
    const {loading, error, data } = useQuery(GET_ME);    
    const userData = data?.me || {}

    //Show Loading screen if loading
    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    //Show error screen if error
    if (error) {return (
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>        
        </div>    
    );}


    // dispatch({ type: USER, payload: data.user} )    




    return (
    <div>    
        <TasksSummary user={userData} />
        <TaskList user={userData}/>
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