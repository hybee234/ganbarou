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

// import { useState } from 'react'
import { useGlobalContext } from '../utils/GlobalState';
import { useState, useEffect, useReducer } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_TASK_BY_TASK_ID, ASSIGN_USER, ADD_TASK } from './../utils/mutations';

import TaskDetailTaskType from '../components/TaskDetailTaskType';
// import TaskDetailUrgentImportant from '../components/TaskDetailUrgentImportant';
// import TaskDetailCategory from '../components/TaskDetailCategory';
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
    // ADD_STATE_TASK,
} from '../utils/actions'


export default function TaskDetailModal( props ) {
    
const {userSelect} = props

    // console.log("TaskDetailModal Reloaded")

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  
    
    console.log("🌏 state.taskDetail", state.taskDetail)

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//
    // Do not convert to Australian format (.toLocaleDateString(['en-AU']) or all your calculations will be wrong)
    let now = new Date();

    //----------------------------//
    //- Colour Review Date Field -//
    //----------------------------//

    useEffect ( ()=> {
        // console.log("📢 Review date check engaged")
        if (dayjs(now).isAfter(dayjs(state.taskDetail.review_dt))) {        
            //if Future review date
            // console.log("💬 review-dt-due")
            document.getElementById("review-dt-field").classList.add("review-dt-due")        
            document.getElementById("review-dt-field").classList.remove("review-dt-ok")

        } else {        
            //Overdue review
            // console.log("💬 review-dt-ok")

            document.getElementById("review-dt-field").classList.add("review-dt-ok")        
            document.getElementById("review-dt-field").classList.remove("review-dt-due")
        }
    },[state.taskDetail, now])

    //--------------------//
    //- Close Modal Form -//
    //--------------------//

    const closeDetailForm = () => {
        console.log("📢 closeDetailForm triggered")
        document.getElementById('view-details-modal-background').style.display = 'none'
        document.getElementById('view-details-modal-form').style.display = 'none'
    }

    //------------------------//
    //- Log state to Console -//
    //------------------------//
    // TROUBLESHOOTING ONLY
    const consoleLog = () => {
        console.log("🌏 state", state)
        const loggedIn = Auth.loggedIn()
        console.log("💬 Logged In?", loggedIn)
    }

    //----------------------------------//
    //- CheckButton clicked (Add/Save) -//
    //----------------------------------//

const checkButton = (event) =>{
    if (state.new_task === true) {
        console.log("🌏state.new_task", state.new_task)
        addNewTask(event)
        
    } else {
        console.log("🌏state.new_task", state.new_task)
        updateTask(event)
    }
}


    //--------------------------------//
    //- Handle Assign Update on form -//
    //--------------------------------//
    // Receives new assign._id from form, filters userList for username and id, dispatches action to state.
    const handleAssignUpdate = (e)=> {
        // console.log("HandleAssignUpdate, etarget,value", e.target.value)
        console.log("📢 HandleAssignUpdate engaged")
        const assigned = userSelect.filter( (a) => a._id === e.target.value)
        // console.log("Assigned", assigned[0])
        dispatch({
            type: TASK_DETAIL_ASSIGNED,
            payload: assigned[0]
        })
    }
    
    //----------------//
    //- Update Task  -//
    //----------------//
    //useMutation hook
    const [UpdateTaskByTaskId, { error }] = useMutation(UPDATE_TASK_BY_TASK_ID);    
    const [AssignUser, { errorAssigned }] = useMutation(ASSIGN_USER);
    const updateTask = async (e) => {
        e.preventDefault();
        console.log("📢 handleFormSubmit engaged")
        const taskDetail = state.taskDetail
        console.log("🖥️ taskDetail:", taskDetail)
        
        try {    
            const { data: updateTaskData } = await UpdateTaskByTaskId({
                variables: {
                    taskId: state.taskDetail._id,
                    createdDt: state.taskDetail.created_dt,
                    reviewDt: state.taskDetail.review_dt,
                    title: state.taskDetail.title,
                    summary: state.taskDetail.summary,
                    stakeholder: state.taskDetail.stakeholder,
                    // assigned: {
                    //     _id: state.taskDetail.assigned._id,
                    //     // username: state.taskDetail.assigned.username,
                    // },
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
                        comment: state.taskDetail.priority.comment,
                        priority_id: state.taskDetail.priority_id,
                    }                
                },
            });
            const {data: assignUserData} = await AssignUser({
                variables: {
                    taskId: state.taskDetail._id,
                    assigned: {
                        _id: state.taskDetail.assigned._id,
                    },  
                },
            });
            
            console.log("📦 updateTaskData", updateTaskData)
            console.log("📦 assignUserData", assignUserData)
            closeDetailForm()
            toast.success("Task updated Successfully")
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
            toast.error("Updated Unsuccessful - something went wrong")
        }
    }

    //----------------//
    //- Add New Task -//
    //----------------//
    const [AddTask, { error : addTaskError }] = useMutation(ADD_TASK);    
    const addNewTask = async (event) => {
        event.preventDefault();
        console.log("📢 addNewTask engaged")
        const taskDetail = state.taskDetail
        console.log("🖥️ taskDetail:", taskDetail)
        console.log("💬", Auth.getProfile().data._username)
        
        try {    
            const { data: addTaskData } = await AddTask({
                variables: {
                    assigned: {
                        _id : state.taskDetail.assigned._id,
                        username: state.taskDetail.assigned.username,
                    },
                    complete_dt: state.taskDetail.complete_dt,
                    complete_flag: state.taskDetail.complete_flag,
                    create_dt: state.taskDetail.create_dt,
                    // note: [{
                    //     note_author:{
                    //         _id:"",
                    //         username: '',
                    //     },
                    //     note_dt:'',
                    //     note_id:'',
                    //     note_text:'',
                    //     note_type:'',
                    // }],
                    priority: {
                        business_driven: state.taskDetail.priority.business_driven,
                        category: state.taskDetail.priority.category,
                        comment: state.taskDetail.priority.comment,
                        focus: state.taskDetail.priority.focus,
                        high_effort: state.taskDetail.priority.high_effort,
                        important: state.taskDetail.priority.important,
                        pipeline_number: parseInt(state.taskDetail.priority.pipeline_number, 10),
                        urgent: state.taskDetail.priority.urgent
                    },
                    review_dt: state.taskDetail.review_dt,
                    stakeholder: state.taskDetail.stakeholder,
                    status_macro: state.taskDetail.status_macro,
                    status_micro: state.taskDetail.status_micro,
                    summary: state.taskDetail.summary,
                    title:state.taskDetail.title,
                }
            });

            const {data: assignUserNewTaskData} = await AssignUser({
                variables: {
                    taskId: addTaskData.addTask._id,
                    assigned: {
                        _id: addTaskData.addTask.assigned._id,
                    },  
                },
            });

            // dispatch({ type: ADD_STATE_TASK, payload: addTaskData.addTask}) //This successfully updated the table
            console.log("📦 AddTaskData", addTaskData)
            console.log("📦 assignUserNewTaskData", assignUserNewTaskData)
            closeDetailForm()
            toast.success("Successfully added a new task")
        } catch (addTaskError) {
            console.log(JSON.stringify(addTaskError, null, 2)); //Much better error reporting for GraphQl issues
            toast.error("Add Task Unsuccessful - something went wrong")
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
            {/* <form id="view-details-modal-form" className="modal-form" onSubmit={()=> handleFormSubmit(event)}>                     */}
            <form id="view-details-modal-form" className="modal-form" onSubmit={checkButton}>       
                <span className="close" onClick={(() => closeDetailForm())}>&times;</span>
                <h2 className="block modal-heading cherry-font"> Task Details</h2>                       
                    {/* {
                        state.new_task ? (
                            <div>state.new_task = True</div>
                        ):(
                            <div>state.new_task = False</div>
                        )
                    } */}

    {/***********************/}
    {/* Task Details Section*/}
    {/***********************/}
                <div className="bg-filter modal-section p-5">
                    {/* <h1 className="block cherry-font w-full"> Task Details </h1> */}
                    
                    <div className="flex-wrap modal-section-divider w-full hidden sm:block">
                        <div className="modal-field-container">
                            <label className="modal-label">Title*</label>        
                            <div className="text-2xl">                                    
                                <textarea
                                    id ="task-title"
                                    className="w-full text-center modal-field"
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
                        </div>
                    </div>  
                    <div className="flex flex-wrap modal-section-divider w-full sm:w-1/4">                        
                        <div className="modal-field-container w-1/2 sm:w-full">
                            <div>
                                <label className="modal-label"> Created Date* </label>
                            </div>
                            <input
                                className="modal-field w-full text-center"
                                name="created-dt"
                                type="date"
                                placeholder="DD/MM/YYYY"
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
                            // REVIEW DATE FIELD
                            >
                                <input
                                    id = "review-dt-field"
                                    className="modal-field w-full text-center"                                    
                                    name="review-dt"
                                    type="date"
                                    placeholder="DD/MM/YYYY"
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
                                            <option id={user._id} value={user._id} key={user._id}>{user.username}</option>
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
                        <div className="modal-field-container block sm:hidden">
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
                                rows="6"
                                cols="30"
                                value={state.taskDetail.summary}
                                onInput={(e) => expandArea(e)}
                                onChange= {(e) =>
                                    dispatch({ type: TASK_DETAIL_SUMMARY, payload: e.target.value})}
                                >
                            </textarea>
                            <div className="w-full">
                                <TaskDetailTaskType />
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

                {
                    state.new_task ? (
                        <div></div>
                    ):(
                        <TaskDetailNotesSection/>
                    )
                }
                

    {/*******************/}            
    {/* Sign off Section*/}
    {/*******************/}  
                <div className="modal-section justify-center"> 


                {/* Add/Save Task Buttons*/}
                {
                    state.view === "completed" ? (
                        <div>

                        </div>
                    ) : (
                        <div>
                            {
                                state.new_task ? (
                                    // New Task
                                    <button
                                        className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
                                        name="add"
                                        type="submit"
                                        value="submit"
                                        // onClick={(e) => addNewTask(e)}
                                        >
                                        <div className="flex align-middle items-center">                          
                                            <Icon
                                                icon="mdi:file-document-add-outline"
                                                width="30" height="30" 
                                                className="task-detail-icon m-auto"
                                            />
                                            <div>&nbsp; Add New Task</div>                                                  
                                        </div> 
                                    </button>
                                ):(
                                    // Not a new task
                                    <button
                                    className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
                                    name="save"
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
                                )
                            }
                        </div>       
                    )
                }                            
                        
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

    {/**********/}
    {/* Footer */}
    {/**********/}

                <button
                    className="px-6 py-2 my-5 font-bold duration-200 ease-in-out button-color"
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
                            <div>&nbsp; console.log(state) </div>                                                  
                    </div> 
                </button>

                <p className="block modal-label w-1/3 mt-5"> Task ID: {state.taskDetail._id}</p> 
            </form>
        </div>
    )
}