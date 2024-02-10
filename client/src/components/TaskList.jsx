import dayjs from 'dayjs'

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useGlobalContext } from '../utils/GlobalState';
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { COMPLETE_TASK, UPDATE_REVIEW_DATE_FROM_TASKLIST } from './../utils/mutations'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    TASKS,
    NEW_TASK,
    COMPLETE_STATE_TASK,
    TASK_DETAIL,
    TASK_DETAIL_REVIEW_DT,
    USER_SELECT,
    // UPDATE_STATE_REVIEW_DT
} from "./../utils/actions";

// import {
//     USER_SELECT,
// } from '../utils/actions'

import { FaUserTie } from "react-icons/fa6";
import { FaUserNinja } from "react-icons/fa6";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { Icon } from '@iconify/react';
import { FaFireAlt } from "react-icons/fa";

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
    

    //     console.log("userSelect:", userSelect)
    // useEffect( ()=> {    
    //     console.log("📢Userlist useEffect engaged")
    //     if(state.userlist.length > 0) {
    //         console.log("🌏 state.userlist", state.userlist)
    //     } else {
    //         console.log("🌏 state.userlist null")
    //         dispatch({
    //             type: USER_SELECT,
    //             payload: userSelect
    //         })
    //     }
    // }, [])

    // useState to track task totals
    // const [taskCount, setTaskCount] = useState(
    //     {
    //         operationalTasks: tasks.filter(task => !task.priority.business_driven).length,
    //         focusTasks: tasks.filter(task => task.priority.business_driven && task.priority.focus).length,
    //         opportunisticTasks: tasks.filter(task => task.priority.business_driven && !task.priority.focus).length
    //     }
    // );

    //-----------------------//
    //- PUSH TASKS TO STATE -//
    //-----------------------//

    // Being used by task counters
    // useEffect ( ()=> {
    //     //Push Tasks to Global State if it is zero
    //     if (state.tasks.length === 0) {
    //         dispatch({
    //             type: TASKS,
    //             payload: tasks
    //         })
    //         console.log("🌏 state.tasks.length zero:", state.tasks.length)            
    //     } else{            
    //         console.log("🌏 state.tasks.length not zero", state.tasks.length)
    //     }
    // },[tasks])


    // useEffect ( ()=> {
    //     console.log ("Sort useEffect engaged")
    //     let sortArray = state.tasks
    //     let sorted = sortArray.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    //     console.log ("SORTED", sorted)
    //     if (sorted) {
    //         dispatch ({ type: TASKS, payload: sorted })
    //     }
    // },[state.tasks])

    // console.log("sortArray", sortArray)

    // console.log ("state.tasks (tasklist)", state.tasks)
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
            toast.success(`Task Completed! Great Work!`)

            await dispatch ({ type: COMPLETE_STATE_TASK, payload: taskId})
            console.log("🌏 State.tasks after complete", state.tasks)

            // Update Totals on Tables
            // if (table === "operational") {
            //     console.log("Operational Task Completed")
            //     setTaskCount(...taskCount, {operationalTasks: tasks.filter(task => !task.priority.business_driven).length -1})
            // }
            // if (table === "focus") {
            //     console.log("Focus Task Completed")
            //     console.log (tasks.filter(task => task.priority.business_driven && task.priority.focus).length)
            //     setTaskCount({...taskCount, focusTasks: tasks.filter(task => task.priority.business_driven && task.priority.focus).length -1})
            // }
            // if (table === "opportunistic") {
            //     console.log("Opportunistic Task Completed")
            //     setTaskCount({...taskCount, opportunisticTasks: tasks.filter(task => task.priority.business_driven && !task.priority.focus).length -1})
            // }
            
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
                            <th className="table-heading-cell">Created</th>
                            <th className="text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden sm:table-cell table-heading-cell ">Review</th> 
                                )
                            }
                            <th className="hidden sm:table-cell table-heading-cell ">Assigned</th>
                            <th className="hidden sm:table-cell table-heading-cell ">Stakeholder</th>
                            <th className="sm:hidden table-cell table-heading-cell">RV/Assign</th>
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
                                        <td className=" table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        <td>
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
                                                <td className="hidden sm:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
                                                    <input
                                                        className="table-select text-center"
                                                        name="review-dt"
                                                        type="date"
                                                        placeholder="MM/DD/YYYY"
                                                        //defaultValue = {dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        value={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        // value={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        onChange= {(e) =>
                                                            // dispatch({ type: TASK_DETAIL_REVIEW_DT, payload: e.target.value}),
                                                            handleReviewDtUpdate(e.target, task._id)
                                                        }
                                                        required
                                                    >
                                                    </input>
                                                </td>   
                                            )
                                        }                                                                                    
                                        <td className="hidden sm:table-cell table-row-cell">{task.assigned.username}</td> 
                                        <td className="hidden sm:table-cell table-row-cell">{task.stakeholder}</td> 

                                        {/* Review Combined Column Operational*/} 
                                        <td className="sm:hidden table-cell  table-row-cell">
                                            <div className="flex justify-center items-center">
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
                                            </div>
                                            <div className="flex justify-center items-center ">
                                                <FaUserNinja/>
                                                <span>&nbsp; {task.assigned.username}</span>
                                            </div>
                                        </td>

                                        {/* Complete Column */}
                                        {
                                            state.view === "completed" ? (
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell link-color"
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
                            <th className="table-heading-cell">Created</th>
                            <th className="text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden sm:table-cell table-heading-cell ">Review</th> 
                                )
                            }                        
                            <th className="hidden sm:table-cell table-heading-cell">Assigned</th>
                            <th className="hidden sm:table-cell table-heading-cell">Stakeholder</th>
                            <th className="sm:hidden table-cell table-heading-cell">RV/Assign</th>
                            <th className="sm:hidden table-cell table-heading-cell"></th>
                            <th className="hidden sm:table-cell table-heading-cell"></th> 
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
                                        <td className=" table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        <td>
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
                                                <td className="hidden sm:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
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
                                        <td className="hidden sm:table-cell table-row-cell">{task.assigned.username}</td> 
                                        <td className="hidden sm:table-cell table-row-cell">{task.stakeholder}</td>

                                        {/* Review/Assign Combined Column Focus*/} 
                                        <td className="sm:hidden table-cell  table-row-cell">
                                            <div className="flex justify-center items-center">
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
                                            </div>
                                            <div className="flex justify-center items-center ">
                                                <FaUserNinja/>
                                                <span>&nbsp; {task.assigned.username}</span>
                                            </div>
                                        </td>

                                        {/* Urgent/Important/Effort Combined Focus*/}                                        
                                        <td className="table-cell table-row-cell">
                                            <div className= "flex flex-wrap sm:flex-nowrap">
                                            {
                                                task.priority.urgent? (
                                                    <div className="w-full sm:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:burning-forest"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-red"
                                                        />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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
                                                    <div className="w-full sm:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:heart-plus"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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
                                                    <div className="w-full sm:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:mountain-road"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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

                                        {/* Pipeline Column FOcus */}
                                        <td className="table-row-cell px-1">
                                            {
                                                !task.priority.pipeline_number || task.priority.pipeline_number === 999 ? (
                                                    <div> -- </div>
                                                ):(
                                                    <div className="flex justify-center border-2"> 
                                                        <div className = "text-center text-xl pipeline-number border-2">
                                                            {task.priority.pipeline_number}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        {/* Complete Column Focus*/}
                                        {
                                            state.view === "completed" ? (
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell link-color"
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
                            <th className="table-heading-cell">Created</th>
                            <th className="text-xs sm:text-xs md:text-sm xl:text-base table-heading-cell">Title</th>
                            {/* Review column */}
                            {
                                state.view === "completed" ? (
                                    <th></th>
                                ) : (
                                <th className="hidden sm:table-cell table-heading-cell ">Review</th> 
                                )
                            }                           
                            <th className="hidden sm:table-cell table-heading-cell">Assigned</th>
                            <th className="hidden sm:table-cell table-heading-cell">Stakeholder</th>
                            <th className="sm:hidden table-cell table-heading-cell">RV/Assign</th>
                            <th className="sm:hidden table-cell table-heading-cell"></th>
                            <th className="hidden sm:table-cell table-heading-cell"></th> 
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
                                        <td className=" table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        <td>
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
                                                <td className="hidden sm:table-cell table-row-cell review-date-js" data-review-dt={task.review_dt}>
                                                    <input
                                                        className="table-select text-center"
                                                        name="review-dt"
                                                        type="date"
                                                        placeholder="MM/DD/YYYY"
                                                        //defaultValue = {dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        defaultValue={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        // value={dayjs(task.review_dt).format('YYYY-MM-DD')}
                                                        onChange= {(e) =>
                                                            // dispatch({ type: TASK_DETAIL_REVIEW_DT, payload: e.target.value}),
                                                            handleReviewDtUpdate(e.target, task._id)
                                                        }
                                                        required
                                                    >
                                                    </input>
                                                </td>   
                                            )
                                        } 
                                        <td className="hidden sm:table-cell table-row-cell">{task.assigned.username}</td> 
                                        <td className="hidden sm:table-cell table-row-cell">{task.stakeholder}</td> 
                                        
                                        {/* Review/Assign Combined Column Opportunistic */} 
                                        <td className="sm:hidden table-cell  table-row-cell">
                                            <div className="flex justify-center items-center">
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
                                            </div>
                                            <div className="flex justify-center items-center ">
                                                <FaUserNinja/>
                                                <span>&nbsp; {task.assigned.username}</span>
                                            </div>
                                        </td>      

                                        {/* Urgent/Important/Effort Combined Opportunistic*/}
                                        <td className="table-cell table-row-cell ">
                                            <div className= "flex flex-wrap sm:flex-nowrap">
                                            {
                                                task.priority.urgent? (
                                                    <div className="w-full sm:w-auto">
                                                        <Icon                                                        
                                                            icon="game-icons:burning-forest"                                                        
                                                            width="25" height="25" 
                                                            className="task-detail-icon m-auto task-detail-icon-red"
                                                        />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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
                                                    <div className="w-full sm:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:heart-plus"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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
                                                    <div className="w-full sm:w-auto">
                                                    <Icon                                                        
                                                        icon="game-icons:mountain-road"                                                        
                                                        width="25" height="25" 
                                                        className="task-detail-icon m-auto task-detail-icon-red"
                                                    />
                                                    </div>
                                                ):(
                                                    <div className="w-full sm:w-auto">
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
                                            {
                                                !task.priority.pipeline_number || task.priority.pipeline_number === 999 ? (
                                                    <div> -- </div>
                                                ):(
                                                    <div className="flex justify-center"> 
                                                        <div className = "text-center text-xl pipeline-number">
                                                            {task.priority.pipeline_number}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        {/* Complete Column Opportunistic */}
                                        {
                                            state.view === "completed" ? (                                                
                                                <td className="table-cell table-row-cell">{dayjs(task.complete_dt).format('DD/MM/YY')}</td>
                                            ) : (
                                                <td>
                                                    <button                                                
                                                        className=" table-row-cell link-color"
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

