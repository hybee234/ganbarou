/* 
Receives task ID of interest from parent and renders it
The only way to show this is to click on a task that will pass task details to this component
*/

import { useState } from 'react'
import { useGlobalContext } from '../utils/GlobalState';

import {
    TASK_DETAIL_CREATED_DT,
    TASK_DETAIL_TITLE,
} from '../utils/actions'


export default function TaskDetailModal() {
    
    console.log("TaskDetailModal Reloaded")

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  
    
    console.log("state.taskDetail", state.taskDetail)
    
    //Grab Task ID from local storage
    // const taskId = localStorage.getItem('detail_view_id');
    
    //Testing purposes - change it back to local storage when done
    // const taskId = "65b8dba1b768a37702f656b4"

    // const [taskData, setTaskData] = useState();
    // const [created_dt, setCreated_dt] = useState(state.taskDetail.created_dt);
    // const [title, setTitle] = useState(state.taskDetail.title);

    

    //Pull task data
        // const {loading, error, data } = useQuery(TASK_BY_TASK_ID, {
        //     variables: { id: taskId },
            // refetchOnWindowFocus: false,
        // });
        // const taskRawData = data?.taskByTaskId || {}

        // console.log("data", data)
        // console.log("data_created_dt", data.taskByTaskId.created_dt)
        
        // useEffect( () => {
        //     setTaskData(data)
        // }, [data])
        
        // console.log("taskRawData.taskByTaskId", taskRawData.taskByTaskId)
        // let task = data.taskByTaskId
        // console.log(task)
        // useEffect(() => {
        //     setCreated_dt("2024-12-20")
        //     // setCreated_dt(taskData.taskByTaskId.created_dt)
        // }, []);

        //Handle Loading    
        // if (loading) {
        //     return ( 
        //     <div id="loading-screen">
        //         <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 2.gif" /></div>
        //         <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        //     </div>
        //     )
        // }   
        // //Handle Error
        // if (error) {return (
        //     <div id="loading-screen"> Error! 
        //         <div>${error.message}</div>
        //         <div>Allow this Chiikawa character to lighten the mood (Task DetailModal)</div>
        //         <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 2.gif" /></div>        
        //     </div>    
        // );}



    const closeDetailForm = () => {
        console.log("closeDetailForm triggered")
        document.getElementById('view-details-modal').style.display = 'none'
    }


    return (
        <div >Hello world
            <div></div>
        {/* //     <div>Global State: {state.detailViewId}</div>
        //     <div>Local Storage: {taskId}</div>
        //     <div>{task.title}</div>
        //     <div>{task.created_dt}</div>
        //     <div>{task.assigned.username}</div>
         */}


            {/* {{!-- View Details Modal Form --}} */}
            <div id="view-details-modal" className="modal">        
                <form className="w-full p-3 m-auto modal-content">    
                    <span
                        className="close"
                        onClick={(() => closeDetailForm())}
                        >&times;</span>

                    <h2 className="block text-2xl md:text-3xl modal-heading"> Task Details</h2>    
                    <h2 className="block my-2 text-color modal-label"> Task ID: {state.taskDetail._id}</h2>
                    <div className="flex flex-wrap mx-1 my-2">
                        <div className="w-1/2 px-1 sm:w-2/6">
                            <label className="block my-2 text-color modal-label"> Created Date {state.taskDetail.created_dt} </label>
                            <input
                                className="w-full px-3 py-2 modal-field"
                                type="date"
                                placeholder="MM/DD/YYYY"
                                value={state.taskDetail.created_dt}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_CREATED_DT, payload: e.target.value})}
                                required
                                >
                            </input>
                        </div>
                        <div className="w-1/2 px-1 sm:w-2/6">
                            <label className="block my-2 text-color modal-label"> Unit Cost ($) </label>
                            <input className="w-full px-3 py-2 modal-field"  type="number" placeholder="00.00" step="0.01"></input>
                            {/* <p className="mt-1 mb-2 text-xs text-red-500 uppercase">Numbers only</p> */}
                        </div>
                        <div className="w-1/2 px-1 sm:w-1/6">
                            <label className="block my-2 text-color modal-label"> Qty In</label>
                            <input className="w-full px-3 py-2 modal-field" type="text"></input>
                        </div>
                        <div className="w-1/2 px-1 sm:w-1/6">
                            <label className="block my-2 text-color modal-label"> Qty Out</label>
                            <input className="w-full px-3 py-2 modal-field" type="text"></input>
                        </div>
                    </div>
                    <div className="flex flex-wrap mx-1 mb-4">
                        <div className="w-full px-1">
                            <label className="block mb-1 mt-2 text-color modal-label">Title</label>
                            <textarea
                                className="w-full px-3 py-2 modal-field"
                                type="text"
                                placeholder="Title"
                                rows="1"
                                cols="30"
                                value={state.taskDetail.title}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_TITLE, payload: e.target.value})}
                                required
                                >
                            </textarea>
                        </div>
                        <p> Global State Title: {state.taskDetail.title} </p>
                    </div>
                    <div className="flex flex-wrap mx-1 mb-4">
                        <div className="w-full px-1">
                            <label className="block mb-1 mt-2  text-color modal-label">Tasting Notes</label>
                            <textarea className="w-full px-3 py-2 modal-field"  type="text" placeholder="Tastings Notes ..." rows="2" cols="30"></textarea>
                        </div>
                    </div>

                    <button id="update-transaction-submit-button" className="w-28 px-6 py-2 mt-4 font-bold button-color" type="submit" value="submit"> Save </button>
                    <button id="update-transaction-cancel-button" className="w-28 px-6 py-2 mt-2 font-bold button-color" type="button" value="cancel"> Cancel </button>

                    <div className="w-1/4 m-auto">
                        <label className="block mt-8 my-2 text-color modal-label"> Vintage_ID </label>
                        <input className="w-full px-3 py-2 modal-field" type="number" required></input>
                    </div>   

                    <button id="update-transaction-delete-button" className="px-4 py-2 m-2 font-bold delete-color" type="button" value="button"> Delete Transaction </button>
                </form>
            </div>   

    </div>

    )


}