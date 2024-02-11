import dayjs from 'dayjs'

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useGlobalContext } from '../utils/GlobalState';
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { COMPLETE_TASK, UPDATE_REVIEW_DATE_FROM_TASKLIST, ASSIGN_USER, UPDATE_TASK_BY_TASK_ID } from './../utils/mutations'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    // TASKS,
    NEW_TASK,
    COMPLETE_STATE_TASK,
    TASK_DETAIL,
    TASK_DETAIL_REVIEW_DT,
    // TASK_DETAIL_ASSIGNED,
    // TASK_DETAIL_PIPELINE,
    // USER_SELECT,
    // UPDATE_STATE_REVIEW_DT
} from "./../utils/actions";


// import { FaUserTie } from "react-icons/fa6";
// import { FaUserNinja } from "react-icons/fa6";
// import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { Icon } from '@iconify/react';
// import { FaFireAlt } from "react-icons/fa";

export default function TaskList (props) {
    // console.log ("TaskList Rendering")
    //--------------------//
    //- Props Validation -//
    //--------------------//
    const {tasks, userSelect} = props

    //---------//
    //- Hooks -//
    //---------//
    
    // const navigate = useNavigate();    
    const [state, dispatch] = useGlobalContext();  
    
    // Index for Rows - feature that console.logs row numbers when clicked on
    const [rowIndex, setRowIndex] = useState('');

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//
    // Do not convert to Australian format (.toLocaleDateString(['en-AU']) or all your calculations will be wrong)
    let now = new Date();
        
    //------------------------------//
    //- Format Overdue Review Date -//
    //------------------------------//

    //Todo - to review if this should be in a useEffect or not
    useEffect(() => { 
        document.querySelectorAll('.review-date-js').forEach(element => {
            if (dayjs(element.dataset.reviewDt).isAfter(dayjs(now))) {                
                element.parentNode.classList.remove('review-due')
            } else {
                element.parentNode.classList.add('review-due')
            }
        })
    },[tasks])

    //----------------------------//
    //- MUTATION - Complete Task -//
    //----------------------------//
    const [CompleteTask, { error }] = useMutation(COMPLETE_TASK);

    // Show Loading screen if loading
    if (CompleteTask.loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 3.gif" /></div>
            <div className = "text-center py-2 text-lg md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   
    
    // Show error screen if error
    if (error) {return (
        <div id="loading-screen"> TaskList Component - Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood (TaskList Mutation - Complete Task)</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 3.gif" /></div>        
        </div>    
    );}

    // Mutation to complete task
    const completeHandler = async (taskId, table) => {        
        try {
            // console.log(taskId)
            const {data} = await CompleteTask({
                variables: {
                    id: taskId
                }
            })
            // console.log("data", data)
            // console.log("table", table)
            toast.success("Task Completed! Awesome Work! 🎉🥳🪇")

            await dispatch ({ type: COMPLETE_STATE_TASK, payload: taskId})
            console.log("🌏 State.tasks after complete", state.tasks)            
            console.log("📦 Complete Task Returned Data:", data)
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }                       

    //---------------------------------------------//
    //-- useMutation update on change Review date -//
    //---------------------------------------------//

    //useMutation hook
    const [UpdateReviewDtFromTaskList, { errors }] = useMutation(UPDATE_REVIEW_DATE_FROM_TASKLIST);

    // Handles update post 
    const handleReviewDtUpdate = async (e, taskId) => {
        try {    
            const { data } = await UpdateReviewDtFromTaskList({
                variables: {
                    taskId: taskId,
                    reviewDt: e.value,                    
                },
            });
            await dispatch({ type: TASK_DETAIL_REVIEW_DT, payload: {id: taskId, review_dt: e.value}})
            console.log("📦 UpdateReviewDtFromTaskList", data)              
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }
    //---------------------------------------------//
    //-- useMutation update on change Review date -//
    //---------------------------------------------//

    const [AssignUser, { errorAssigned }] = useMutation(ASSIGN_USER);

    const handleAssignUpdate = async (e, taskId) => {

        console.log("📢 handleAssignUpdate engaged")        
        // e.value is assigned._id
        // console.log("🖥️ e.target.value", e.value)
        // console.log("🖥️ taskId", taskId)

        try {    
            const {data: assignUserData} = await AssignUser({
                variables: {
                    taskId: taskId,
                    assigned: {
                        _id: e.value,
                    },  
                },
            });
            console.log("📦 assignUserData", assignUserData)        
            toast.success("Assigned User Updated Successfully@")
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
            toast.error("Updated Unsuccessful - something went wrong")
        }
    }

    //-------------------------//
    //- Update Pipeline Value -//
    //-------------------------//

    // const updatePipelineValue = async (e, taskId) => {
    //     console.log("📢 updatePipelineValue engaged")
    //     // Find index of task of interest (by taskId)
    //     const index = tasks.findIndex( (task) => task._id === taskId)
    //     console.log("🖥️ index", index)
    //     console.log("🖥️tasks[index]", tasks[index])

    //     // // Make a copy of the task
    //     const tempTask = tasks[index]
    //     console.log("🖥️tempTask before", tempTask.priority.pipeline_number)

    //     // // Update the copy with the new value
    //     const updatedTask = {...tempTask, priority: { ...tempTask.priority, pipeline_number: e.target.value}}
    //     console.log ("🖥️ Updated Task", updatedTask)

    //     // Insert updatedTask back into the array in the same spot (replace)
    //     tasks = {...tasks[index], tasks: updatedTask}
    //     // console.log("🖥️tasks after insert:", tasks)
    //     // console.log("🖥️tempTask after", tempTask)
    //     // tasks[index].priority.pipeline_number = e.value
    //     // console.log("🖥️tasks[index]", tasks[index])
    // }

    //-------------------------//
    //-- HandlePipelineUpdate -//
    //-------------------------//

    //useMutation hook
    const [UpdateTaskByTaskId, { error: pipelineUpdateError }] = useMutation(UPDATE_TASK_BY_TASK_ID);  

    const handlePipelineUpdate = async(e, taskId) => {
        console.log("📢 handlePipelineUpdate engaged")
        try {    
            // console.log("🖥️ e.target.value", e.target.value)
            // console.log("🖥️ taskId", taskId)

            // Grab task details (property)
            // Submit update with all property data
            let taskDetailArray = tasks.filter(task => task._id === taskId)
            
            // console.log("🖥️ taskDetailArray", taskDetailArray)

            let taskDetail = taskDetailArray[0]
            
            // console.log("🖥️ taskDetail", taskDetail)
            await dispatch ({ type: TASK_DETAIL, payload: taskDetail})

            // console.log("📢 handleFormSubmit engaged")
            // const taskDetail = state.taskDetail
            // console.log("🖥️ taskDetail:", taskDetail)
            // console.log("🐞🐞🐞 Debug point 1 🐞🐞🐞")
            // console.log ("🌏 state.taskDetail: Pipeline:", state.taskDetail)

            const { data: updateTaskData } = await UpdateTaskByTaskId({
                variables: {
                    taskId: taskDetail._id,
                    // createdDt: state.taskDetail.created_dt,
                    // reviewDt: state.taskDetail.review_dt,
                    // title: state.taskDetail.title,
                    // summary: state.taskDetail.summary,
                    // stakeholder: state.taskDetail.stakeholder,
                    // assigned: {
                    //     _id: state.taskDetail.assigned._id,
                    //     // username: state.taskDetail.assigned.username,
                    // },
                    // status_macro: state.taskDetail.status_macro,
                    // status_micro: state.taskDetail.status_micro,
                    priority: {
                        business_driven: taskDetail.priority.business_driven,
                        focus: taskDetail.priority.focus,
                        urgent: taskDetail.priority.urgent,
                        important: taskDetail.priority.important,
                        high_effort: taskDetail.priority.high_effort,
                        pipeline_number:  parseInt(e.target.value, 10),
                        category: taskDetail.priority.category,
                        comment: taskDetail.priority.comment,
                        priority_id: taskDetail.priority_id,
                    }                
                },
            });
            
            console.log("📦 updateTaskData", updateTaskData)
            
            toast.success("Pipeline Number updated Successfully")
        } catch (pipelineUpdateError) {
            console.log(JSON.stringify(pipelineUpdateError, null, 2)); //Much better error reporting for GraphQl issues
            toast.error("Pipeline Updated Unsuccessful - something went wrong")
        }
        






    }



    //------------------//
    // View Task Modal -//
    //------------------//
    const viewTask = (taskId) => {        
        // Filter userTasks for Task of interest
        let taskDetailArray = tasks.filter(task => task._id === taskId)
        let taskDetail = taskDetailArray[0]
        
        dispatch ({ type: TASK_DETAIL, payload: taskDetail})
        dispatch ({ type: NEW_TASK, payload: false})

        document.getElementById('view-details-modal-background').style.display = 'block'
        document.getElementById('view-details-modal-form').style.display = 'block'
    }

    //-------------------//
    //- Category Column -//
    //-------------------//

    const categoryColumn = (category) => {
    
        switch(category){
            case 1:
                return (
                    <div className = "flex cherry-font justify-center"> 
                        <div className="cherry-font text-center align-center text-red-400"> Cat 1
                            <Icon
                                icon="emojione-monotone:skull-and-crossbones"
                                width="20" height="20"
                                className="task-detail-icon m-auto"
                            />
                        </div> 
                    </div>
                )
            case 2:
                return (
                    <div className="cherry-font text-center text-orange-400">Cat 2
                        <Icon
                            icon="icon-park-twotone:lightning"
                            width="20" height="20"
                            className="task-detail-icon m-auto"
                        />
                    </div>  
                )
            case 3:
                return (
                    <div className="cherry-font text-center text-yellow-400">Cat 3
                        <Icon
                            icon="noto:light-bulb"
                            width="20" height="20"
                            className="task-detail-icon m-auto"
                        />
                    </div>  
                )                
            case 4:
                return (
                    <div className="cherry-font text-center text-green-400">Cat 4
                        <Icon
                            icon="fluent-emoji:deciduous-tree"
                            width="20" height="20"
                            className="task-detail-icon m-auto"
                        />
                    </div> 
                )             
            case 5:
                return (
                    <div className="cherry-font text-center text-blue-400">Cat 5
                        <Icon
                            icon="noto:ice"
                            width="20" height="20"
                            className="task-detail-icon m-auto"
                        />
                    </div>  
                )             
            default:
                return "??"
        }

}

// console.log ("🎁 userSelect", userSelect)

    // console.log("rowIndex", rowIndex)

    return (
        <div>
            {/********************/}
            {/* Operational Table*/}
            {/********************/}
        {
            state.view === "business_driven" ?
            (
                <div></div>
            ):(
                <div className ="w-full m-auto text-center">
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">Operational Tasks take priority over Business Driven Initiatives (Focus and Opportunistic)</div>
                            <div className="tooltip-string">Handle Operational tasks due for review before moving onto Focus Initiatives</div>                                     
                        </div>}
                    enterDelay={500}
                    enterNextDelay={500}
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 200 }}
                    // followCursor
                > 
                    <span className = "cherry-font text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">Operational Tasks</span>
                </Tooltip>
                <table className="table-auto table-container bg-filter">
                    <thead>
                        <tr className="table-heading-row text-xs sm:text-xs md:text-sm xl:text-base">
                            <th className="table-cell md:hidden table-heading-cell">Created/Title</th>
                            <th className="hidden md:table-cell table-heading-cell">Created</th>
                            <th className="hidden md:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden lg:table-cell table-heading-cell ">Review</th> 
                                )
                            }
                            <th className="hidden lg:table-cell table-heading-cell">Assigned</th>                            
                            <th className="lg:hidden table-cell table-heading-cell">RV/Assign</th>
                            <th className="hidden md:table-cell table-heading-cell">Stakeholder</th>
                            {/* Complete Column */}
                            {
                                state.view === "completed" ? (
                                    <th className="table-heading-cell">Completed</th>
                                ) : (
                                    <th className="table-heading-cell ">Done</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // {/* Index in array to add rowIndex to table */}
                            tasks.filter(task => !task.priority.business_driven).map( (task, index) => {   
                                // taskState.operational.map( (task, index) => {   
                                return(                                    
                                    <tr id={`table-row-${task._id}`} className="table-row p-4 text-xs sm:text-xs md:text-sm xl:text-base" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                        
                                        {/* Created_dt/Title Combined Focus */}
                                        <td className="table-cell md:hidden table-row-cell">
                                            <div className = " table-row-cell text-left">
                                                {dayjs(task.created_dt).format('DD/MM/YY')}
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title={
                                                        <div className="tooltip">                                            
                                                            <div className="tooltip-heading">Task Summary</div>                                                                            
                                                            <div className="tooltip-string">{task.summary}</div>                                                        
                                                            <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                        </div>}
                                                        arrow placement="bottom"
                                                        enterDelay={500}
                                                        enterNextDelay={500}
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 200 }}
                                                        // followCursor
                                                    >
                                                    <p
                                                        className=" table-row-cell link-color text-left "
                                                        onClick={()=> {viewTask(task._id)}}>
                                                            {task.title}
                                                    </p>
                                                </Tooltip>
                                            </div>                                
                                        </td> 

                                        {/* Created_dt Focus */}
                                        <td className="hidden md:table-cell table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        {/* Title column Focus */}
                                        <td className="hidden md:table-cell table-row-cell">
                                            <Tooltip
                                                title={
                                                    <div className="tooltip">                                            
                                                        <div className="tooltip-heading">Task Summary</div>                                                                            
                                                        <div className="tooltip-string">{task.summary}</div>                                                        
                                                        <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                    </div>}
                                                    arrow placement="bottom"
                                                    enterDelay={500}
                                                    enterNextDelay={500}
                                                    TransitionComponent={Zoom}
                                                    TransitionProps={{ timeout: 200 }}
                                                    // followCursor
                                                >
                                                <p
                                                    className=" table-row-cell link-color "
                                                    onClick={()=> {viewTask(task._id)}}>
                                                        {task.title}
                                                </p>
                                            </Tooltip>
                                        </td>
                                        {/* Review column */}
                                        {
                                            state.view === "completed" ? (
                                                <td>
                                                </td>
                                            ) : (
                                                // Visible if not completed
                                                <td className="hidden lg:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
                                                    <input
                                                        className="table-select text-center"
                                                        name="review-dt"
                                                        type="date"
                                                        placeholder="MM/DD/YYYY"
                                                        value={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        onChange= {(e) =>
                                                            handleReviewDtUpdate(e.target, task._id)
                                                        }
                                                        required
                                                    >
                                                    </input>
                                                </td>   
                                            )
                                        }                                                                                    

                                        {/* Assign column Operational */}
                                        <td className="hidden lg:table-cell table-row-cell">
                                            <select
                                            className="table-select text-center"
                                            name="assigned-user"
                                            type="text"
                                            value={task.assigned._id}
                                            onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td> 

                                        {/* Review/Assigned Combined Column Operational*/} 
                                        <td className="lg:hidden table-cell  table-row-cell">
                                            <div className="flex justify-center items-center">
                                                <input
                                                    className="table-select text-center w-full"
                                                    name="review-dt"
                                                    type="date"
                                                    placeholder="MM/DD/YYYY"
                                                    defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                    onChange= {(e) =>
                                                        handleReviewDtUpdate(e.target, task._id)
                                                    }
                                                    required
                                                >
                                                </input>
                                            </div>
                                            <select
                                                className="table-select text-center w-full"
                                                name="assigned-user"
                                                type="text"
                                                value={task.assigned._id}
                                                onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td>

                                        {/* Stakeholder Operational */}
                                        <td className="hidden md:table-cell table-row-cell">{task.stakeholder}</td> 

                                        {/* Complete Column Operational Table*/}
                                        {
                                            state.view === "completed" ? (
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell"
                                                        onClick={ ()=> completeHandler(task._id, "operational") }
                                                        >                                              
                                                            <Icon icon="subway:tick" width="15" height="15" color="green"/>  
                                                    </button>
                                                </td>
                                            )
                                        } 
                                        
                                    </tr>
                                )                            
                            })                         
                        }
                        <tr className="table-last-row">
                            <th></th>
                            <th className="table-row-cell"><span className="inline sm:hidden">Σ :</span><span className="hidden sm:inline">Tasks :</span>&nbsp;{tasks.filter(task => !task.priority.business_driven).length} </th>                        
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr> 
                    </tbody>
                </table>
            </div>
            )
        }

            {/**************/}
            {/* Focus Table*/}
            {/**************/}
            <div className ="w-full m-auto text-center">
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">Focus Initiatives are Business Driven Initiatives handled after Operational Tasks are in order.</div>
                            <div className="tooltip-string">Focus Initiatives take priority over Opportunistic Initiatives </div>
                            <div className="tooltip-string">Focus Initiatives are what the team have commited to delivering and will be reported against </div>
                            <div className="tooltip-string">You must not progress Opportunistic Initiatives if there is a Focus Initiative requiring attention </div>
                        </div>}
                    enterDelay={500}
                    enterNextDelay={500}
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 200 }}
                    // followCursor
                >                
                    <span className = "cherry-font text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">Focus Initiatives</span>
                </Tooltip>
                <table className="table-auto table-container bg-filter">
                    <thead>
                        <tr className="table-heading-row text-xs sm:text-xs md:text-sm xl:text-base">
                            <th className="table-cell md:hidden table-heading-cell">Created/Title</th>
                            <th className="hidden md:table-cell table-heading-cell">Created</th>
                            <th className="hidden md:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden lg:table-cell table-heading-cell ">Review</th> 
                                )
                            }                        
                            <th className="hidden lg:table-cell table-heading-cell">Assigned</th>
                            <th className="lg:hidden table-cell table-heading-cell">RV/Assign</th>
                            <th className="hidden md:table-cell table-heading-cell">Stakeholder</th>
                            <th className="lg:hidden table-cell table-heading-cell">U/I/E</th>
                            <th className="hidden lg:table-cell table-heading-cell">Urg/Imp/Eff</th> 
                            <th className="hidden sm:table-cell table-heading-cell">Category</th>
                            <th className="table-cell sm:hidden table-heading-cell">
                                <Icon                                                        
                                    icon="solar:cat-bold"                                                        
                                    // width="40" height="40" 
                                    className="task-detail-icon m-auto"
                                />                        
                            </th>
                            <th className="hidden sm:table-cell table-heading-cell">Pipeline</th>
                            <th className="table-cell sm:hidden table-heading-cell text-xl">
                            <Icon                                                        
                                    icon="carbon:delivery"                                                        
                                    // width="40" height="40" 
                                    className="task-detail-icon m-auto"
                                />       
                            </th>
                            {/* Complete Column */}
                            {
                                state.view === "completed" ? (
                                    <th className="table-heading-cell">Completed</th>
                                ) : (
                                    <th className="table-heading-cell ">Done</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // {/* Index in array to add rowIndex to table */}
                            tasks.filter(task => task.priority.business_driven && task.priority.focus).map( (task, index) => {     
                                return(                                    
                                    <tr id={`table-row-${task._id}`} className="table-row p-4 text-xs sm:text-xs md:text-sm xl:text-base" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                        
                                        {/* Created_dt/Title Combined Focus */}
                                        <td className="table-cell md:hidden table-row-cell">
                                            <div className = " table-row-cell text-left">
                                                {dayjs(task.created_dt).format('DD/MM/YY')}
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title={
                                                        <div className="tooltip">                                            
                                                            <div className="tooltip-heading">Task Summary</div>                                                                            
                                                            <div className="tooltip-string">{task.summary}</div>                                                        
                                                            <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                        </div>}
                                                        arrow placement="bottom"
                                                        enterDelay={500}
                                                        enterNextDelay={500}
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 200 }}
                                                        // followCursor
                                                    >
                                                    <p
                                                        className=" table-row-cell link-color text-left "
                                                        onClick={()=> {viewTask(task._id)}}>
                                                            {task.title}
                                                    </p>
                                                </Tooltip>
                                            </div>                                
                                        </td> 
                                        
                                        {/* Created_dt Focus */}
                                        <td className="hidden md:table-cell table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        {/* Title column Focus */}
                                        <td className="hidden md:table-cell table-row-cell">
                                            <Tooltip
                                                title={
                                                    <div className="tooltip">                                            
                                                        <div className="tooltip-heading">Task Summary</div>                                                                            
                                                        <div className="tooltip-string">{task.summary}</div>                                                        
                                                        <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                    </div>}
                                                    arrow placement="bottom"
                                                    enterDelay={500}
                                                    enterNextDelay={500}
                                                    TransitionComponent={Zoom}
                                                    TransitionProps={{ timeout: 200 }}
                                                    // followCursor
                                                >
                                                <p
                                                    className=" table-row-cell link-color "
                                                    onClick={()=> {viewTask(task._id)}}>
                                                        {task.title}
                                                </p>
                                            </Tooltip>
                                        </td>
                                        {/* Review column */}
                                        {
                                            state.view === "completed" ? (
                                                <td>
                                                </td>
                                            ) : (
                                                // Visible if not completed
                                                <td className="hidden lg:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
                                                    <input
                                                        className="table-select text-center"
                                                        name="review-dt"
                                                        type="date"
                                                        placeholder="MM/DD/YYYY"
                                                        defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        onChange= {(e) =>
                                                            handleReviewDtUpdate(e.target, task._id)
                                                        }
                                                        required
                                                    >
                                                    </input>
                                                </td>   
                                            )
                                        } 
                                        {/* Assign column Focus */}
                                        <td className="hidden lg:table-cell table-row-cell">
                                            <select
                                            className="table-select text-center"
                                            name="assigned-user"
                                            type="text"
                                            value={task.assigned._id}
                                            onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td>

                                        {/* Review/Assign Combined Column Focus*/} 
                                        <td className="lg:hidden table-cell  table-row-cell">
                                            <div className="flex justify-center items-center">
                                                <input
                                                    className="table-select text-center w-full"
                                                    name="review-dt"
                                                    type="date"
                                                    placeholder="MM/DD/YYYY"
                                                    defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                    onChange= {(e) =>
                                                        handleReviewDtUpdate(e.target, task._id)
                                                    }
                                                    required
                                                >
                                                </input>
                                            </div>
                                            <select
                                                className="table-select text-center w-full"
                                                name="assigned-user"
                                                type="text"
                                                value={task.assigned._id}
                                                onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td>

                                        {/* Stakeholder column Focus */}
                                        <td className="hidden md:table-cell table-row-cell">{task.stakeholder}</td>

                                        {/* Urgent/Important/Effort Combined Focus*/}                                        
                                        <td className="table-cell table-row-cell">
                                            <div className= "flex flex-wrap lg:flex-nowrap justify-center">
                                            {
                                                task.priority.urgent? (
                                                    <div className="w-full lg:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:burning-forest"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-red"
                                                        />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:camping-tent"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-green"
                                                        />
                                                    </div>
                                                )
                                            }
                                            {
                                                task.priority.important? (
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:heart-plus"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:plain-arrow"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-green"
                                                    />
                                                    </div>
                                                )
                                            }
                                            {
                                                task.priority.high_effort? (
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:mountain-road"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:cake-slice"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-green"
                                                    />
                                                    </div>
                                                )
                                            }
                                            </div>
                                        </td>
                                        
                                        {/* Category Column Focus */}
                                        <td className="table-cell table-row-cell">
                                            {categoryColumn(task.priority.category)}
                                        </td>

                                        {/* Pipeline Column Focus */}
                                        <td className="table-row-cell px-1">
                                            <div className="flex justify-center"> 
                                                <div className = "text-center pipeline-number">
                                                    <input
                                                        className="table-input text-center"                                        
                                                        type="number"
                                                        inputMode="number"
                                                        step="1"
                                                        defaultValue={task.priority.pipeline_number}
                                                        onBlur= {(e) => handlePipelineUpdate (e, task._id)}                                                            
                                                    >
                                                    </input> 
                                                </div>
                                            </div>
                                        </td>
                                        {/* Complete Column Focus*/}
                                        {
                                            state.view === "completed" ? (
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell"
                                                        onClick={ ()=> completeHandler(task._id, "focus") }
                                                        >                                              
                                                            <Icon icon="subway:tick" width="15" height="15" strokeWidth={3} color="green"/>  
                                                    </button>
                                                </td>
                                            )
                                        } 
                                    </tr>
                                )                            
                            })                         
                        }
                        <tr className="table-last-row">
                            <th></th>
                            <th className="table-row-cell"><span className="inline sm:hidden">Σ :</span><span className="hidden sm:inline">Initiatives :</span>&nbsp;{tasks.filter(task => task.priority.business_driven && task.priority.focus).length}</th>                        
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr> 
                    </tbody>
                </table>
            </div>


            {/**********************/}
            {/* Opportunistic Table*/}
            {/**********************/}
            
            <div className ="w-full m-auto text-center">
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">Opportunistic Initiatives are Business Driven Initiatives handled after there are no follow up actions for Operational Tasks and Focus Initiatives.</div>
                            <div className="tooltip-string">Opportunistic Initiatives are the lowest priority task type </div>
                            <div className="tooltip-string">Opportunistic Initiatives do not have time commitments attached to them and are not reported against. </div>
                            <div className="tooltip-string">Do not progress Opportunistic Initiatives if you the action is on your to progress Operational Tasks or Focus Initiatives </div>
                        </div>}
                    enterDelay={500}
                    enterNextDelay={500}
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 200 }}
                    // followCursor
                >                
                    <span className = "cherry-font text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl">Opportunistic Initiatives</span>
                </Tooltip>
                <table className="table-auto table-container bg-filter">
                    <thead>
                        <tr className="table-heading-row text-xs sm:text-xs md:text-sm xl:text-base">
                            <th className="table-cell md:hidden table-heading-cell">Created/Title</th>
                            <th className="hidden md:table-cell table-heading-cell">Created</th>
                            <th className="hidden md:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden lg:table-cell table-heading-cell ">Review</th> 
                                )
                            }                        
                            <th className="hidden lg:table-cell table-heading-cell">Assigned</th>
                            <th className="lg:hidden table-cell table-heading-cell">RV/Assign</th>
                            <th className="hidden md:table-cell table-heading-cell">Stakeholder</th>
                            <th className="lg:hidden table-cell table-heading-cell">U/I/E</th>
                            <th className="hidden lg:table-cell table-heading-cell">Urg/Imp/Eff</th> 
                            <th className="hidden sm:table-cell table-heading-cell">Category</th>
                            <th className="table-cell sm:hidden table-heading-cell">
                                <Icon                                                        
                                    icon="solar:cat-bold"                                                        
                                    // width="40" height="40" 
                                    className="task-detail-icon m-auto"
                                />                        
                            </th>
                            <th className="hidden sm:table-cell table-heading-cell">Pipeline</th>
                            <th className="table-cell sm:hidden table-heading-cell text-xl">
                            <Icon                                                        
                                    icon="carbon:delivery"                                                        
                                    // width="40" height="40" 
                                    className="task-detail-icon m-auto"
                                />       
                            </th>
                            {/* Complete Column */}
                            {
                                state.view === "completed" ? (
                                    <th className="table-heading-cell">Completed</th>
                                ) : (
                                    <th className="table-heading-cell ">Done</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // {/* Index in array to add rowIndex to table */}
                            tasks.filter(task => task.priority.business_driven && !task.priority.focus).map( (task, index) => { 
                                return(                                    
                                    <tr id={`table-row-${task._id}`} className="table-row p-4 text-xs sm:text-xs md:text-sm xl:text-base" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                        
                                        {/* Created_dt/Title Combined Focus */}
                                        <td className="table-cell md:hidden table-row-cell">
                                            <div className = " table-row-cell text-left">
                                                {dayjs(task.created_dt).format('DD/MM/YY')}
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title={
                                                        <div className="tooltip">                                            
                                                            <div className="tooltip-heading">Task Summary</div>                                                                            
                                                            <div className="tooltip-string">{task.summary}</div>                                                        
                                                            <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                        </div>}
                                                        arrow placement="bottom"
                                                        enterDelay={500}
                                                        enterNextDelay={500}
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 200 }}
                                                        // followCursor
                                                    >
                                                    <p
                                                        className=" table-row-cell link-color text-left "
                                                        onClick={()=> {viewTask(task._id)}}>
                                                            {task.title}
                                                    </p>
                                                </Tooltip>
                                            </div>                                
                                        </td> 
                                        
                                        {/* Created_dt Focus */}
                                        <td className="hidden md:table-cell table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        {/* Title column Focus */}
                                        <td className="hidden md:table-cell table-row-cell">
                                            <Tooltip
                                                title={
                                                    <div className="tooltip">                                            
                                                        <div className="tooltip-heading">Task Summary</div>                                                                            
                                                        <div className="tooltip-string">{task.summary}</div>                                                        
                                                        <div className="tooltip-footer">Stakeholder: {task.stakeholder}</div>  
                                                    </div>}
                                                    arrow placement="bottom"
                                                    enterDelay={500}
                                                    enterNextDelay={500}
                                                    TransitionComponent={Zoom}
                                                    TransitionProps={{ timeout: 200 }}
                                                    // followCursor
                                                >
                                                <p
                                                    className=" table-row-cell link-color "
                                                    onClick={()=> {viewTask(task._id)}}>
                                                        {task.title}
                                                </p>
                                            </Tooltip>
                                        </td>
                                        {/* Review column Opportunistic */}
                                        {
                                            state.view === "completed" ? (
                                                <td>
                                                </td>
                                            ) : (
                                                // Visible if not completed
                                                <td className="hidden lg:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
                                                    <input
                                                        className="table-select text-center"
                                                        name="review-dt"
                                                        type="date"
                                                        placeholder="MM/DD/YYYY"
                                                        defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        onChange= {(e) =>
                                                            handleReviewDtUpdate(e.target, task._id)
                                                        }
                                                        required
                                                    >
                                                    </input>
                                                </td>   
                                            )
                                        } 

                                        {/* Assign column Opportunistic */}
                                        <td className="hidden lg:table-cell table-row-cell">
                                            <select
                                            className="table-select text-center"
                                            name="assigned-user"
                                            type="text"
                                            value={task.assigned._id}
                                            onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td> 
                                        
                                        {/* Review/Assign Combined Column Opportunistic */} 
                                        <td className="lg:hidden table-cell table-row-cell">
                                            <div className="flex justify-center items-center">
                                                <input
                                                    className="table-select text-center w-full"
                                                    name="review-dt"
                                                    type="date"
                                                    placeholder="MM/DD/YYYY"
                                                    defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                    onChange= {(e) =>
                                                        handleReviewDtUpdate(e.target, task._id)
                                                    }
                                                    required
                                                >
                                                </input>
                                            </div>
                                            <select
                                                className="table-select text-center w-full"
                                                name="assigned-user"
                                                type="text"
                                                value={task.assigned._id}
                                                onChange= {(e) => handleAssignUpdate(e.target, task._id)}
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
                                        </td>      

                                        {/* Stakeholder Opportunistic */}
                                        <td className="hidden md:table-cell table-row-cell">{task.stakeholder}</td> 

                                        {/* Urgent/Important/Effort Combined Opportunistic*/}
                                        <td className="table-cell table-row-cell">
                                            <div className= "flex flex-wrap lg:flex-nowrap justify-center">
                                            {
                                                task.priority.urgent? (
                                                    <div className="w-full lg:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:burning-forest"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-red"
                                                        />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:camping-tent"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-green"
                                                        />
                                                    </div>
                                                )
                                            }
                                            {
                                                task.priority.important? (
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:heart-plus"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:plain-arrow"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-green"
                                                    />
                                                    </div>
                                                )
                                            }
                                            {
                                                task.priority.high_effort? (
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:mountain-road"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full lg:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:cake-slice"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-green"
                                                    />
                                                    </div>
                                                )
                                            }
                                            </div>
                                        </td>

                                        {/* Category Column Opportunistic */}
                                        <td className="table-cell table-row-cell">
                                            {categoryColumn(task.priority.category)}
                                        </td>

                                        {/* Pipeline Column Opportunistic */}
                                        <td className="table-row-cell px-1">
                                            <div className="flex justify-center"> 
                                                <div className = "text-center pipeline-number">
                                                    <input
                                                        className="table-input text-center"                                        
                                                        type="number"
                                                        inputMode="number"
                                                        step="1"
                                                        defaultValue={task.priority.pipeline_number}
                                                        onBlur= {(e) => handlePipelineUpdate (e, task._id)}
                                                    >
                                                    </input> 
                                                </div>
                                            </div>
                                        </td>
                                        {/* Complete Column Opportunistic */}
                                        {
                                            state.view === "completed" ? (                                                
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell"
                                                        onClick={ ()=> completeHandler(task._id, "opportunistic") }
                                                        >                                              
                                                            <Icon icon="subway:tick" width="15" height="15" color="green"/>  
                                                    </button>
                                                </td>
                                            )
                                        } 
                                    </tr>
                                )                            
                            })                         
                        }
                        <tr className="table-last-row">
                            <th></th>
                            <th className="table-row-cell"><span className="inline sm:hidden">Σ :</span><span className="hidden sm:inline">Initiatives :</span>&nbsp;{tasks.filter(task => task.priority.business_driven && !task.priority.focus).length}</th>                        
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    )
}

