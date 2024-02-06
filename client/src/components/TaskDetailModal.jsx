/* 
Receives task ID of interest from parent and renders it
The only way to show this is to click on a task that will pass task details to this component
*/
import Auth from '../utils/auth';
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGlobalContext } from '../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_BY_TASK_ID } from './../utils/mutations';

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
    // console.log("TaskDetailModal Component: userSelect:", userSelect)
        

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

    //-----------------------//
    //- Log state to Console -//
    //-----------------------//
    // TROUBLESHOOTING ONLY
    const consoleLog = () => {
        console.log("state", state)
        const loggedIn = Auth.loggedIn()
        console.log("Logged In?", loggedIn)
    }

    //------------------------//
    //- Handle Assign Update -//
    //------------------------//
    // Receives new assign._id from form, filters userList for username and id, dispatches action to state.
    const handleAssignUpdate = (e)=> {
        // console.log("HandleAssignUpdate, etarget,value", e.target.value)
        const assigned = userSelect.filter( (a) => a._id === e.target.value)
        // console.log("Assigned", assigned[0])
        dispatch({
            type: TASK_DETAIL_ASSIGNED,
            payload: assigned[0]
        })
    }
    
    //----------------------//
    //- Handle form submit -//
    //----------------------//
    //useMutation hook
    const [UpdateTaskByTaskId, { error }] = useMutation(UPDATE_TASK_BY_TASK_ID);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const taskDetail = state.taskDetail
        console.log("taskDetail:", taskDetail)
        
        try {    

            const { data } = await UpdateTaskByTaskId({
                variables: {
                    id: state.taskDetail._id,
                    createdDt: state.taskDetail.created_dt,
                    reviewDt: state.taskDetail.review_dt,
                    title: state.taskDetail.title,
                    summary: state.taskDetail.summary,
                    stakeholder: state.taskDetail.stakeholder,
                    assigned: {
                        _id: state.taskDetail.assigned._id,
                    }
                
                },
            });

            console.log("UpdateTaskByTaskId", data)
            closeDetailForm()
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }
        


    return (
        <div >
            <div id="view-details-modal-background" className="modal-background"></div>     
            <form id="view-details-modal-form" className="modal-form" onSubmit={()=> handleFormSubmit(event)}>                    
                <span className="close" onClick={(() => closeDetailForm())}>&times;</span>
                <h2 className="block modal-heading"> Task Details</h2>
                {/* Task Details */}
                <div className="bg-filter modal-section p-5">
                        <label className="modal-label w-full"> </label>     
                        <div className="modal-section-divider w-1/3">
                            <div className="modal-field-container">
                                <div>
                                    <label className="modal-label w-1/2"> Created Date </label>
                                </div>
                                <input
                                    className="modal-field w-1/2"
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
                                <div>
                                    <label className="modal-label">Stakeholder</label>
                                </div>
                                <input
                                    className="modal-field w-1/2"
                                    name="stakeholder"
                                    type="text"
                                    placeholder="Stakeholder"
                                    rows="1"
                                    cols="30"
                                    value={state.taskDetail.stakeholder}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STAKEHOLDER, payload: e.target.value})}
                                    required
                                    >
                                </input>
                            </div>
                            <div className="modal-field-container justify-left items-start align-top">
                                <div>
                                    <label className="modal-label">Review Date</label>
                                </div>
                                <input
                                    className="modal-field w-1/2"
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
                            <div>
                                    <label className="modal-label">Assigned</label>
                                </div>
                                <select
                                    className="modal-select w-1/2"
                                    name="assigned"
                                    type="text"
                                    value={state.taskDetail.assigned._id}
                                    onChange= {(e) => handleAssignUpdate(e)}
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
                                <div>
                                    <label className="modal-label">Stage</label>
                                </div>
                                <select
                                    className="modal-select w-1/2"
                                    name="status-macro"
                                    type="text"
                                    value={state.taskDetail.status_macro}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STATUS_MACRO, payload: e.target.value})}
                                    >
                                </select>                                
                            </div>
                            <div className="modal-field-container flex">
                                <div className = "w-1/3 text-center">
                                    <label className="modal-label">Status</label>
                                </div>
                                <select
                                    className="modal-select w-2/3"
                                    name="status-micro"
                                    type="text"
                                    value={state.taskDetail.status_micro}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_STATUS_MICRO, payload: e.target.value})}
                                    >
                                    <option> </option>
                                    <option>Design</option>
                                    <option>Testing</option>
                                    <option>Training</option>
                                    <option>Deployment</option>
                                </select> 
                            </div>
                        </div>
                        <div className="modal-section-divider w-2/3">
                            <div className="modal-field-container">                                    
                                <label className="modal-label w-1/3">Title</label>
                                
                                <textarea
                                    className="w-full modal-field"
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    rows="2"
                                    cols="50"
                                    value={state.taskDetail.title}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_TITLE, payload: e.target.value})}
                                    required
                                    >
                                </textarea>
                            </div>
                            {/* <p> Global State Title: {state.taskDetail.title} </p> */}
                            
                            <div className="w-full modal-field-container">
                                <label className="modal-label w-1/3">Summary</label>
                                <textarea
                                    className="w-full modal-field"
                                    name="status-summary"
                                    type="text"
                                    placeholder="Summary"
                                    rows="4"
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
                    <label className="w-full modal-label w-1/3 text-right"> Notes Section</label>     
                </div>

                {/* Prioritisation Section*/}
                <div className="bg-filter modal-section">
                    <label className="w-full modal-label w-1/3 text-right"> Prioritisation Section </label>

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
                    <label className="w-full modal-label w-1/3 text-right"> Modal Form Field Graveyard </label>
                    <div className="modal-field-container">
                        <label className="modal-label w-1/3"> Unit Cost ($) </label>
                        <input className="w-full modal-field"  type="number" placeholder="00.00" step="0.01"></input>
                        {/* <p className="mt-1 mb-2 text-xs text-red-500 uppercase">Numbers only</p> */}
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label w-1/3"> Qty In</label>
                        <input className="w-full modal-field" type="text"></input>
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label w-1/3"> Qty Out</label>
                        <input className="w-full modal-field" type="text"></input>
                    </div>
                    <div className="modal-field-container">
                        <label className="modal-label w-1/3"> Vintage_ID </label>
                        <input className="w-full modal-field" type="number"></input>
                    </div>  
                </div>

                {/* Footer */}
                <p className="button-color px-6 py-2 my-2 font-bold text-2xl" onClick={() => consoleLog()} >
                    Console.log(state)
                </p>
                <p className="block modal-label w-1/3 mt-10"> Task ID: {state.taskDetail._id}</p> 
            </form>
        </div>
    )
}