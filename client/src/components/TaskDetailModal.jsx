/* 
Receives task ID of interest from parent and renders it
The only way to show this is to click on a task that will pass task details to this component
*/
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Icon } from '@iconify/react';

import Auth from '../utils/auth';
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGlobalContext } from '../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_BY_TASK_ID } from './../utils/mutations';

import TaskDetailTaskType from '../components/TaskDetailTaskType';
import TaskDetailUrgentImportant from '../components/TaskDetailUrgentImportant';
import TaskDetailCategory from '../components/TaskDetailCategory';
import TaskDetailNotesSection from '../components/TaskDetailNotesSection';
import TaskDetailPrioritisation from '../components/TaskDetailPrioritisation';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


export default function TaskDetailModal( {userSelect}) {
    
    console.log("TaskDetailModal Reloaded")

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    console.log("state.taskDetail", state.taskDetail)

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
    // const consoleLog = () => {
    //     console.log("state", state)
    //     const loggedIn = Auth.loggedIn()
    //     console.log("Logged In?", loggedIn)
    // }

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
        console.log("taskDetail:", taskDetail.priority.business_driven)
        
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
                    },
                    status_macro: state.taskDetail.status_macro,
                    status_micro: state.taskDetail.status_micro,
                    priority: {
                        business_driven: state.taskDetail.priority.business_driven,
                        focus: state.taskDetail.priority.focus,
                        urgent: state.taskDetail.priority.urgent,
                        important: state.taskDetail.priority.important,
                        high_effort: state.taskDetail.priority.high_effort,
                        pipeline_number:  parseInt(state.taskDetail.priority.pipeline_number, 10),
                        category: state.taskDetail.priority.category,
                        comment: state.taskDetail.priority.comment
                    }
                
                },
            });

            console.log("UpdateTaskByTaskId", data)
            closeDetailForm()
            toast.success("Task updated Successfully")
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
            toast.success("Something went wrong - Task NOt Updated")
        }
    }
        
    //---------------------//
    //- Expand Text Area  -//
    //---------------------//
    const expandArea = (e) => {
        //Expands TextArea on input to a maximum of 200px height
        // console.log(e.target)
        var textarea = e.target
        var heightLimit = 200; /* Maximum height: 200px */
        textarea.style.height = ""; /* Reset the height*/
        textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
    };

    return (
        <div>
            <div id="view-details-modal-background" className="modal-background"></div>     
            <form id="view-details-modal-form" className="modal-form" onSubmit={()=> handleFormSubmit(event)}>                    
                <span className="close" onClick={(() => closeDetailForm())}>&times;</span>
                <h2 className="block modal-heading cherry-font"> Task Details</h2>

    {/***********************/}
    {/* Task Details Section*/}
    {/***********************/}
                <div className="bg-filter modal-section p-5">
                    {/* <h1 className="block cherry-font w-full"> Task Details </h1> */}
                    <div className="flex flex-wrap modal-section-divider w-full sm:w-1/4">                        
                        <div className="modal-field-container w-1/2 sm:w-full">
                            <div>
                                <label className="modal-label"> Created Date* </label>
                            </div>
                            <input
                                className="modal-field w-full text-center"
                                name="created-dt"
                                type="date"
                                placeholder="MM/DD/YYYY"
                                value={dayjs(state.taskDetail.created_dt).format('YYYY-MM-DD')}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_CREATED_DT, payload: e.target.value})}
                                required
                                >
                            </input>                                
                        </div>                           
                        <div className="modal-field-container w-1/2 sm:w-full">                           
                            <div>
                                <label className="modal-label">Review Date*</label>
                            </div>
                            <Tooltip
                                title={
                                    <div className="tooltip">                                            
                                        <div className="tooltip-string">* Set your review date for when you next want to look at this task. Adjust it as frequently as needed to manage your workload.</div>                                    
                                        <div className="tooltip-string">* Task lists sort by review date and are highlighted red if the date elapses.</div>                                    
                                        <div className="tooltip-string">* Can't progress a task because you're waiting on the stakeholder? Set a review date in the future to follow up!"</div>
                                    </div>}
                                arrow placement="bottom"
                                enterDelay={500}
                                enterNextDelay={500}
                                TransitionComponent={Zoom}
                                TransitionProps={{ timeout: 200 }}
                                // followCursor
                            >
                                <input
                                    className="modal-field w-full text-center"
                                    name="review-dt"
                                    type="date"
                                    placeholder="MM/DD/YYYY"
                                    value={dayjs(state.taskDetail.review_dt).format('YYYY-MM-DD')}
                                    onChange= {(e) =>
                                        dispatch({ type: TASK_DETAIL_REVIEW_DT, payload: e.target.value})}
                                    required
                                    >
                                </input>                                
                            </Tooltip>                               
                        </div>
                        <div className="modal-field-container w-1/2 sm:w-full">
                        <div>
                                <label className="modal-label">Assigned*</label>
                            </div>
                            <select
                                className="modal-select w-full text-center"
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
                        <div className="modal-field-container w-1/2 sm:w-full">
                            <div>
                                <label className="modal-label">Stakeholder*</label>
                            </div>
                            <input
                                className="modal-field w-full text-center"
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
                        <div className="modal-field-container w-1/2 sm:w-full">
                            <div>
                                <label className="modal-label">Stage</label>
                            </div>
                            <select
                                className="modal-select w-full"
                                name="status-macro"
                                type="text"
                                value={state.taskDetail.status_macro}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_STATUS_MACRO, payload: e.target.value})}
                                >
                                <option>New</option>
                                <option>Design</option>
                                <option>Testing</option>
                                <option>Training</option>
                                <option>Deployment</option>
                            </select>                                
                        </div>
                        <div className="modal-field-container w-1/2 sm:w-full">
                            <label className="modal-label">Status</label>
                            <select
                                className="modal-select w-full"
                                name="status-micro"
                                type="text"
                                value={state.taskDetail.status_micro}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_STATUS_MICRO, payload: e.target.value})}
                                >
                                <option>On Hold</option>
                                <option>Design</option>
                                <option>Testing</option>
                                <option>Training</option>
                                <option>Deployment</option>
                            </select> 
                        </div>
                    </div>
                    <div className="modal-section-divider w-full sm:w-3/4">
                        <div className="modal-field-container">                                    
                            <label className="modal-label">Title*</label>
                            
                            <textarea
                                className="w-full modal-field"
                                name="title"
                                type="text"
                                placeholder="Title"
                                rows="2"
                                cols="50"
                                value={state.taskDetail.title}
                                onInput={(e) => expandArea(e)}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_TITLE, payload: e.target.value})}
                                required
                                >
                            </textarea>
                        </div>                            
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
                                onInput={(e) => expandArea(e)}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_SUMMARY, payload: e.target.value})}
                                >
                            </textarea>

                            {/* <div className="modal-section-divider justify-center align-center"> */}
                                        <div className="w-full">
                                <TaskDetailTaskType />
                            {/* </div> */}
                    </div>
                        </div>                 
                    </div>
                </div>


    {/*************************/}
    {/* Prioritisation Section*/}
    {/*************************/}
                <TaskDetailPrioritisation />               
                

    {/****************/}
    {/* Notes Section*/}
    {/****************/}                
                <TaskDetailNotesSection/>



    {/*******************/}
    {/* Sign off Section*/}
    {/*******************/}                
                <div className="modal-section justify-center"> 
                    <button
                        className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
                        type="submit"
                        value="submit"
                        >
                        <div className="flex align-middle items-center">                          
                                <Icon
                                    icon="mi:save"
                                    width="30" height="30" 
                                    className="task-detail-icon m-auto"
                                />
                                <div>&nbsp; Save</div>                                                  
                        </div> 
                    </button>

                    <button
                        className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
                        type="button"
                        value="cancel"
                        onClick={() => closeDetailForm()}
                        >
                        <div className="flex align-middle items-center">                          
                                <Icon
                                    icon="icons8:cancel-2"
                                    width="30" height="30" 
                                    className="task-detail-icon m-auto"
                                />
                                <div>&nbsp; Cancel</div>                                                  
                        </div> 
                    </button>


                </div>

                {/* Modal Form Element Graveyard */}

    {/**********/}
    {/* Footer */}
    {/**********/}

                {/* <button
                    className="px-6 py-2 mt-20 font-bold duration-200 ease-in-out button-color"
                    type="button"
                    value="cancel"
                    onClick={() => consoleLog()}
                    >
                    <div className="flex align-middle items-center">                          
                            <Icon
                                icon="fa:gears"
                                width="30" height="30" 
                                className="task-detail-icon m-auto"
                            />
                            <div>&nbsp; console.log(state)</div>                                                  
                    </div> 
                </button> */}





                <p className="block modal-label w-1/3 mt-10"> Task ID: {state.taskDetail._id}</p> 
            </form>
        </div>
    )
}