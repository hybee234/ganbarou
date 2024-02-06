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
    TASK_DETAIL_STAKEHOLDER,
    TASK_DETAIL_REVIEW_DT,
    TASK_DETAIL_ASSIGNED,
    TASK_DETAIL_SUMMARY,
    TASK_DETAIL_STATUS_MACRO,
    TASK_DETAIL_STATUS_MICRO,
} from '../utils/actions'


export default function TaskDetailModal(props) {
    
    console.log("TaskDetailModal Reloaded")

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();      
    console.log("state.taskDetail", state.taskDetail)
    //---------------------//
    //- Data Manipulation -//
    //---------------------//
    const {userSelect} = props
    console.log("TaskDetailModal Component: userSelect:", userSelect)
    
    

    //-------------------------//
    //- Date Formatter Helper -//
    //-------------------------//
    
    // Converts date format to be accetpable by HTML date field
    const dateHelper = (date)=> {
        if (date) {
            // console.log ("Date Before", date)
            // let htmldate = format(new Date (date),"yyyy-MM-dd")
            const htmldate = dayjs(date).format('YYYY-MM-DD')
            // console.log ("Date After", htmldate)
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

    console.log("State Assigned", state.taskDetail.assigned)

    return (
        <div >Hello world
            <div id="view-details-modal-background" className="modal-background"></div>     
            <form id="view-details-modal-form" className="modal-form">                    
                <span className="close" onClick={(() => closeDetailForm())}>&times;</span>
                <h2 className="block modal-heading"> Task Details</h2>
                {/* Task Details */}
                <div className="bg-filter modal-section">
                        <label className="text-color modal-label w-full text-right"> Task Section </label>     
                        <div className="modal-section-divider">
                            <div className="modal-field-container">
                                <label className="modal-label"> Created Date </label>
                                <input
                                    className="modal-field"
                                    name="created-dt"
                                    type="date"
                                    placeholder="MM/DD/YYYY"
                                    value={dateHelper(state.taskDetail.created_dt)}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_CREATED_DT, payload: e.target.value})}
                                    required
                                    >
                                </input>                                
                            </div>
                            <div className="modal-field-container">
                                <label className="modal-label">Stakeholder</label>
                                <input
                                    className="modal-field"
                                    name="stakeholder"
                                    type="text"
                                    placeholder="Title"
                                    rows="1"
                                    cols="30"
                                    value={state.taskDetail.stakeholder}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STAKEHOLDER, payload: e.target.value})}
                                    required
                                    >
                                </input>
                            </div>
                            <div className="modal-field-container">
                                <label className="modal-label"> Review Date </label>
                                <input
                                    className="modal-field"
                                    name="review-dt"
                                    type="date"
                                    placeholder="MM/DD/YYYY"
                                    value={dateHelper(state.taskDetail.review_dt)}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_REVIEW_DT, payload: e.target.value})}
                                    required
                                    >
                                </input>                                
                            </div>
                            <div className="modal-field-container">
                                <label className="modal-label"> Assigned </label>
                                <select
                                    className="modal-select"
                                    name="assigned"
                                    type="text"
                                    value={state.taskDetail.assigned}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_ASSIGNED, payload: e.target.value})}
                                    required
                                    >
                                    {
                                        userSelect.map( (user)=> {
                                            return(
                                                <option value={user._id} key={user._id}>{user.username}</option>
                                            ) 
                                        })
                                    }
                                </select>                                
                            </div>
                            <div className="modal-field-container">
                                <label className="modal-label"> Status (Macro)</label>
                                <select
                                    className="modal-field"
                                    name="status-macro"
                                    type="text"
                                    value={state.taskDetail.status_macro}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STATUS_MACRO, payload: e.target.value})}
                                    >
                                </select>                                
                            </div>
                            <div className="modal-field-container">
                                <label className="modal-label"> Status(Minor)</label>
                                <select
                                    className="modal-field"
                                    name="status-micro"
                                    type="text"
                                    value={state.taskDetail.status_micro}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STATUS_MICRO, payload: e.target.value})}
                                    >
                                </select>                                
                            </div>
                        </div>
                        <div className="modal-section-divider">
                            <div className="modal-field-container">                                    
                                <label className="modal-label">Title</label>
                                
                                <textarea
                                    className="w-full modal-field"
                                    name="title"
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
                            
                            <div className="w-full modal-field-container">
                                <label className="modal-label">Summary</label>
                                <textarea
                                    className="w-full modal-field"
                                    name="status-summary"
                                    type="text"
                                    placeholder="Summary"
                                    rows="3"
                                    cols="30"
                                    value={state.taskDetail.summary}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_SUMMARY, payload: e.target.value})}
                                    >
                                </textarea>
                            </div>
                            {/* <p> Global State Title: {state.taskDetail.title} </p> */}
                        </div>
                </div>


                {/* Notes */}
                <div className="bg-filter modal-section">
                    <label className="w-full modal-label text-right"> Notes Section</label>     
                </div>

                {/* Prioritisation Section*/}
                <div className="bg-filter modal-section">
                    <label className="w-full modal-label text-right"> Prioritisation Section </label>

                    <label className="switch"></label>
                    <input type="checkbox">                            
                        </input><span className="slider round"></span>
                        {/* {state.taskDetail.priority.category} */}


                </div>


                {/* Sign off section */}                    
                <div className="bg-filter modal-section justify-center"> 
                    <button className="w-20 px-2 m-1 text-sm font-bold button-color" type="submit" value="submit"> Save </button>
                    <button className="w-20 px-2 m-1 text-sm font-bold button-color" type="button" value="cancel" onClick={(() => closeDetailForm())}> Cancel </button>    
                </div>

                {/* Modal Form Element Graveyard */}
                <div className="bg-filter modal-section">                    
                    <label className="w-full modal-label text-right"> Modal Form Field Graveyard </label>
                    <div className="modal-field-container">
                        <label className="modal-label"> Unit Cost ($) </label>
                        <input className="w-full modal-field"  type="number" placeholder="00.00" step="0.01"></input>
                        {/* <p className="mt-1 mb-2 text-xs text-red-500 uppercase">Numbers only</p> */}
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label"> Qty In</label>
                        <input className="w-full modal-field" type="text"></input>
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label"> Qty Out</label>
                        <input className="w-full modal-field" type="text"></input>
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label"> Vintage_ID </label>
                        <input className="w-full modal-field" type="number"></input>
                    </div>  
                </div>

                {/* Footer */}
                <p className="block modal-label mt-10"> Task ID: {state.taskDetail._id}</p> 
            </form>
        </div>
    )
}