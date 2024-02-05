/* 
Receives task ID of interest from parent and renders it
The only way to show this is to click on a task that will pass task details to this component
*/
import dayjs from 'dayjs'
import { format } from 'date-fns'
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

    //-------------------------//
    //- Date Formatter Helper -//
    //-------------------------//
    
    // Converts date format to be accetpable by HTML date field
    const dateHelper = (date)=> {
        if (date) {
            console.log ("Date Before", date)
            // let htmldate = format(new Date (date),"yyyy-MM-dd")
            const htmldate = dayjs(date).format('YYYY-MM-DD')
            console.log ("Date After", htmldate)
            return htmldate
        } else 
            return 
    }

    //--------------------//
    //- Close Modal Form -//
    //--------------------//

    const closeDetailForm = () => {
        console.log("closeDetailForm triggered")
        document.getElementById('view-details-modal-background').style.display = 'none'
        document.getElementById('view-details-modal-form').style.display = 'none'
    }

    return (
        <div >Hello world
            <div></div>

            {/* {{!-- View Details Modal Form --}} */}
            <div id="view-details-modal-background" className="modal-background">
            </div>        
                <form id="view-details-modal-form" className="modal-form">                    
                    <span className="close" onClick={(() => closeDetailForm())}>&times;</span>
                    <h2 className="block modal-heading"> Task Details</h2>

                    {/* Task Details */}
                    <div className="flex flex-wrap border-2">
                            <label className="block my-2 text-color modal-label w-full text-right"> Task Section </label>     
                            <div className="">
                                <label className="block my-2 text-color modal-label text-center"> Created Date </label>
                                <input
                                    className="w-full px-3 py-2 modal-field"
                                    type="date"
                                    placeholder="MM/DD/YYYY"
                                    value={dateHelper(state.taskDetail.created_dt)}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_CREATED_DT, payload: e.target.value})}
                                    required
                                    >
                                </input>                                
                            </div>
                            <div className="">
                                <label className="block my-2 text-color modal-label">Stakeholder</label>
                                <textarea
                                    className="w-full px-3 py-2 modal-field"
                                    type="text"
                                    placeholder="Title"
                                    rows="1"
                                    cols="30"
                                    value={state.taskDetail.stakeholder}
                                    // onChange= {(e) =>
                                    //     dispatch({ type: TASK_DETAIL_TITLE, payload: e.target.value})}
                                    required
                                    >
                                </textarea>
                            </div>
                            <div className="">
                                <label className="block my-2 text-color modal-label text-center"> Review Date </label>
                                <input
                                    className="w-full px-3 py-2 modal-field"
                                    type="date"
                                    placeholder="MM/DD/YYYY"
                                    value={dateHelper(state.taskDetail.created_dt)}
                                    // onChange= {(e) =>
                                    //     dispatch({ type: TASK_DETAIL_CREATED_DT, payload: e.target.value})}
                                    required
                                    >
                                </input>                                
                            </div>
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
                            {/* <p> Global State Title: {state.taskDetail.title} </p> */}
                            
                            <div className="w-full px-1">
                                <label className="block mb-1 mt-2 text-color modal-label">Summary</label>
                                <textarea
                                    className="w-full px-3 py-2 modal-field"
                                    type="text"
                                    placeholder="Summary"
                                    rows="2"
                                    cols="30"
                                    value={state.taskDetail.title}
                                    // onChange= {(e) =>
                                    //     dispatch({ type: TASK_DETAIL_TITLE, payload: e.target.value})}
                                    required
                                    >
                                </textarea>
                            </div>
                            {/* <p> Global State Title: {state.taskDetail.title} </p> */}
                    </div>


                    {/* Notes */}
                    <div className="flex flex-wrap border-2">
                        <label className="block my-2 text-color modal-label w-full text-right"> Notes Section</label>     
                    </div>

                    {/* Prioritisation Section*/}
                    <div className="flex flex-wrap border-2">    
                    <label className="block my-2 text-color modal-label w-ful text-right"> Prioritisation Section </label>                 
                    </div>


                    {/* Sign off section */}                    
                    <div>
                        <button className="w-28 mx-1 py-1 mt-4 font-bold button-color" type="submit" value="submit"> Save </button>
                        <button className="w-28 mx-1 py-1 mt-2 font-bold button-color" type="button" value="cancel" onClick={(() => closeDetailForm())}> Cancel </button>    
                    </div>

                    {/* Modal Form Element Graveyard */}
                    <div className="flex flex-wrap border-2">                        
                    <label className="block my-2 text-color modal-label w-full text-right"> Modal Form Field Graveyard </label>
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
                        <div className="w-1/4 m-auto">
                            <label className="block my-2 text-color modal-label"> Vintage_ID </label>
                            <input className="w-full px-3 py-2 modal-field" type="number" required></input>
                        </div>  
                    </div>

                    {/* Footer */}
                    <p className="block modal-label mt-10"> Task ID: {state.taskDetail._id}</p> 
                </form>
               

    </div>

    )


}