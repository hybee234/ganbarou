
import { useGlobalContext } from '../utils/GlobalState';

import { useQuery } from '@apollo/client';
import { TASK_BY_TASK_ID } from './../utils/queries'



export default function TaskDetail() {
//Hook to access state
    const [state, dispatch] = useGlobalContext();  
    console.log(state.detailViewId)

    const taskId = localStorage.getItem('detail_view_id');

    //Pull task data
    const {loading, error, data } = useQuery(TASK_BY_TASK_ID, {
        variables: { id: taskId }
    });
    //Handle Loading    
    if (loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   
    //Handle Error
    if (error) {return (
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>        
        </div>    
    );}

    const task = data.taskByTaskId
    console.log(task)


    return (
        <div >Hello world
        <div>Global State: {state.detailViewId}</div>
        <div>Local Storage: {taskId}</div>
        <div>{task.title}</div>
        <div>{task.created_dt}</div>
        <div>{task.assigned.username}</div>
        </div>
    )


}