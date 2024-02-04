
import { useEffect, useState, useRef } from 'react'
import { useGlobalContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { TASK_BY_TASK_ID } from '../utils/queries'



export default function TaskDetailModal() {
    //Hook to access state
    const [state, dispatch] = useGlobalContext();  
    console.log(state.detailViewId)
    //Grab Task ID from local storage
    const taskId = localStorage.getItem('detail_view_id');

    const [created_dt, setCreated_dt] = useState();


    //Pull task data
        const {loading, error, data } = useQuery(TASK_BY_TASK_ID, {
            variables: { id: taskId }
        });

        console.log(data)
        const task = data.taskByTaskId

        useEffect(() => {
            
            setCreated_dt("2024-12-20")
        }, []);

        //Handle Loading    
        if (loading) {
            return ( 
            <div id="loading-screen">
                <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 2.gif" /></div>
                <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
            </div>
            )
        }   
        // //Handle Error
        if (error) {return (
            <div id="loading-screen"> Error! 
                <div>${error.message}</div>
                <div>Allow this Chiikawa character to lighten the mood (Task DetailModal)</div>
                <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 2.gif" /></div>        
            </div>    
        );}


    // console.log("task.created_dt", task.created_dt)
    // console.log("created_id", created_dt)


    return (
        <div >Hello world
        {/* //     <div>Global State: {state.detailViewId}</div>
        //     <div>Local Storage: {taskId}</div>
        //     <div>{task.title}</div>
        //     <div>{task.created_dt}</div>
        //     <div>{task.assigned.username}</div>
         */}


            {/* {{!-- Update Transaction Modal Form --}} */}
            <div className="modal">        
                <form className="w-full p-3 m-auto modal-content">    
                    <span className="close">&times;</span>
                    <h2 className="block text-2xl md:text-3xl modal-heading"> Task Details</h2>    
                    <div className="flex flex-wrap mx-1 my-2">
                        <div className="w-1/2 px-1 sm:w-2/6">
                            <label className="block my-2 text-color modal-label"> Created Date </label>
                            <input
                                className="w-full px-3 py-2 modal-field"
                                type="date"
                                placeholder="MM/DD/YYYY"
                                value={created_dt}
                                onChange={e => setCreated_dt(e.target.value)}
                                required

                                >

                                </input>
                        </div>
                        <div className="w-1/2 px-1 sm:w-2/6">
                            <label className="block my-2 text-color uppercase"> Unit Cost ($) </label>
                            <input className="w-full px-3 py-2 modal-field"  type="number" placeholder="00.00" step="0.01"></input>
                            <p className="mt-1 mb-2 text-xs text-red-500 uppercase">Numbers only</p>
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
                            <label className="block mb-1 mt-2 text-color modal-label">Event/Retailer</label>
                            <textarea className="w-full px-3 py-2 modal-field"  type="text" placeholder="Event/Retailer" rows="1" cols="30"></textarea>
                        </div>
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