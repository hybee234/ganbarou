import dayjs from 'dayjs'
import { useGlobalContext } from '../utils/GlobalState';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { COMPLETE_TASK } from './../utils/mutations'
import { TASK_DETAIL } from "./../utils/actions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiEdit } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { LuCalendarClock } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";
import { FaUserNinja } from "react-icons/fa6";
import { LiaUserNinjaSolid } from "react-icons/lia";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

import { Icon } from '@iconify/react';


export default function TaskList (props) {
    console.log ("TaskList Rendering")
    //---------------------//
    //- Data Manipulation -//
    //---------------------//
    const user = props.user                                     // User and tasks together
    const userTasks = user.tasks                                // Just the tasks extracted out

    const tasks = userTasks.filter(task => !task.complete_flag) // Active tasks only

    const operationalTasks = userTasks.filter(task => !task.complete_flag && !task.priority.business_driven) // OpertaionalTasks
    const focusTasks = userTasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus) // Focus Tasks
    const opportunisticTasks = userTasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus) // Opportunistic Tasks

    let taskArray = []
    taskArray.operational = operationalTasks
    taskArray.focus = focusTasks
    taskArray.opportunistic = opportunisticTasks

    //-----------------------//
    //- Sort by review date -//
    //-----------------------//

    //sort array by older review date on top (smallest to greatest)
    tasks.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)

    //Sort arrays lowest to max  (smallest to greatest)
    taskArray.operational.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    taskArray.focus.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)
    taskArray.opportunistic.sort((a,b) => (a.review_dt > b.review_dt) ? 1 : (a.review_dt < b.review_dt) ?-1 :0)

    console.log("taskArray", taskArray)


    // console.log("user", user)               
    // console.log("user task", user.tasks)    


    //---------//
    //- Hooks -//
    //---------//
    
    // const navigate = useNavigate();    
    const [state, dispatch] = useGlobalContext();  
    
    // Index for Rows - feature that console.logs row numbers when clicked on
    const [rowIndex, setRowIndex] = useState('');

    // useState for Task Count
    const [taskCount, useTaskCount] = useState(tasks.length)
    const [operationalTaskCount, useOperationalTaskCount] = useState(taskArray.operational.length)
    const [focusTaskCount, useFocusTaskCount] = useState(taskArray.focus.length)
    const [opportunisticTaskCount, useOpportunisticTaskCount] = useState(taskArray.opportunistic.length)

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//
    
    let now = new Date();
    now = `${now.toLocaleDateString('en-AU')} ${now.toLocaleTimeString('en-AU')}`;
    const today = (new Date()).toLocaleDateString('en-AU')
    
    // HTML wants date to be YYYY/MM/DD

    // const date = new Date()
    // const formatter = new Intl.DateFormat('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
    // const formattedDate = formatter.format("4/2/24");
    // console.log(formattedDate);

    
    //------------------------------------------------//
    //- Conditionally Formatting Overdue Review Date -//
    //------------------------------------------------//

    //Todo - to review if this should be in a useEffect or not
    useEffect(() => {
            document.querySelectorAll('.review-date-js').forEach(element => {
                if (dayjs(element.dataset.reviewDt).format('DD/MM/YYYY') < dayjs(now).format('DD/MM/YYYY')) {
                    // console.log ("OVERDUE for review", element.dataset.reviewDt)
                    element.parentNode.classList.add('review-due')
                } else {
                    // console.log ("not due for review", element.dataset.reviewDt)
                }
            })
    },[])

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
            <div>Allow this Chiikawa character to lighten the mood</div>
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
            console.log("data", data)

            console.log("table", table)
            toast.success(`Task Completed! Great Work!`) 

            if (table === "original") {
            useTaskCount(taskCount - 1)
            }      
            if (table === "operational") {
                // console.log("Operational Task Completed")
                useOperationalTaskCount(operationalTaskCount - 1)
            }
            if (table === "focus") {
                // console.log("Focus Task Completed")
                useFocusTaskCount(focusTaskCount -1)
            }
            if (table === "opportunistic") {
                // console.log("Opportunistic Task Completed")
                useOpportunisticTaskCount(opportunisticTaskCount - 1)
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }

    //--------------------//
    // View Task Modal -//
    //--------------------//
    const viewTask = (taskId) => {
        
        // Filter userTasks for Task of interest
        let taskDetailArray = userTasks.filter(task => task._id === taskId)
        let taskDetail = taskDetailArray[0]
        // console.log("taskDetail", taskDetail)
        // let created_dtArray = taskDetail.created_dt.split("/")
        // let updated_dt = `${created_dtArray[2]}-${created_dtArray[1]}-${created_dtArray[0]}`
        // console.log(updated_dt)
        // taskDetail.created_dt = updated_dt
        // Add to state
        
        dispatch ({ type: TASK_DETAIL, payload: taskDetail})

        // Alternative approach - filter userTask array for the task of interest store local storage
        // gotta handle stringiufy etc - try global state for now
        // localStorage.setItem('detail_view', taskDetail);

        // explore using global state instead for now ...
        // localStorage.setItem('detail_view_id', taskId);

        // console.log(state.taskDetail.created_dt)
        // const createdDtArray = state.taskDetail.created_dt.split("/")
        // console.log (createdDtArray)
        


        document.getElementById('view-details-modal-background').style.display = 'block'
        document.getElementById('view-details-modal-form').style.display = 'block'



    }

    // console.log("rowIndex", rowIndex)

    //----------------------------------//
    //- Submit Update Mutation Per Row -//
    //----------------------------------//

    // const submitRow = (taskId) => {
    //     //submit update to database
    //     //Write update mutation
    //     console.log("submitRow - Surprise!", taskId)
    // }

    //-----------------------//
    //- Sort by Review Date -//
    //-----------------------//

    // const formatDate = (date) => {
    //     if(date) {
    //         console.log ("test date", date.toLocaleDateString('en-AU'))
    //         return <p>"test"+ date.toLocaleDateString('en-AU')</p>
    //     } else {
    //         return <p>"no date"</p>
    //     }      
    // }

    return (

        
        // Original
        // <div>
        //     <table id="task-table-container" className="w-11/12 m-auto table-auto mb-20 bg-filter">
        //         <thead>
        //             <tr className="text-16 table-heading-cell">
        //                 <th className="table-heading-cell ">Created</th>
        //                 <th className="table-heading-cell ">Title</th>
        //                 <th className="hidden sm:table-cell table-heading-cell ">Review Date</th>
        //                 <th className="hidden sm:table-cell table-heading-cell ">Stakeholder</th>
        //                 <th className="hidden sm:table-cell table-heading-cell ">Status (Macro)</th>
        //                 <th className="hidden sm:table-cell table-heading-cell ">Status (Micro)</th>
        //                 {/* <th className="hidden sm:table-cell table-heading-cell ">Complete Flag</th> */}
        //                 <th className="hidden sm:table-cell table-heading-cell ">Assigned</th>
        //                 <th className="table-heading-cell ">Complete</th>
        //                 <th className="hidden lg:table-cell table-heading-cell ">Last Updated</th>
        //                 <th className="hidden lg:table-cell table-heading-cell ">Category</th>
        //                 <th className="hidden lg:table-cell table-heading-cell ">Edit</th>
        //                 <th className="hidden lg:table-cell table-heading-cell ">task_id</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 // {/* Index in array to add rowIndex to table */}
        //                 tasks.map( (task, index) => {   
        //                     return(
        //                         // <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id}  style={{ backgroundColor: reviewDue(task.review_dt)}}  onClick= { ()=> setRowIndex(index)}>
        //                         <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id} onClick= { ()=> setRowIndex(index)}>
        //                             <td id={`created-dt-${task._id}`} className=" xl:text-base text-xs sm:text-xs md:text-sm" data-created-dt={task.created_dt}> {task.created_dt}</td>                                
        //                             <td id={`title-${task._id}`} className="xl:text-base text-xs sm:text-xs md:text-sm"> {task.title}</td>
        //                             {/* Hide if less than 640 pixels */}
        //                             <td id={`review-dt-${task._id}`} className="review-date-js hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-review-dt={task.review_dt}>{task.review_dt}</td>
        //                             <td id={`stakeholder-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-stakeholder={task.stakeholder}>{task.stakeholder}</td>                                    
        //                             <td id={`status-macro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-macro={task.status_macro}>{task.status_macro}</td>  
        //                             <td id={`status-micro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-micro={task.micro}>{task.status_micro}</td>
                                                    
        //                             {/* <td id={`complete-flag-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-complete-flag={task.complete_flag}>
        //                                 {
        //                                     task.complete_flag ? (
        //                                         "True"
        //                                     ) : (
        //                                         "False"
        //                                     )
        //                                 }                                    
        //                                 </td>   */}
        //                             {/* Show if less than 640 pixels */}
        //                             <td id={`assigned-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-assigned-username={task.assigned.username}>{task.assigned.username}</td> 
        //                             <td>
        //                                 <button
        //                                     id={`complete-button-${task._id}`}
        //                                     className="text-xs md:text-sm sm:text-xs px-4 py-1 my-1 button-color "
        //                                     onClick={ ()=> completeHandler(task._id, "original") }
        //                                     ><ImCross className="m-auto text-red-600"/> 
        //                                 </button>
        //                             </td>
        //                             {/* Show if greater than 1280 pixels */}                                
        //                             <td id={`updated-at-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task.updatedAt}</td> 
        //                             <td id={`category-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-category={task.priority.category}>{task.priority.category}</td> 
        //                             <td className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">                                        
        //                                 <button
        //                                     id={`edit-button-${task._id}`}
        //                                     value={`${task._id}`}
        //                                     className='button-color px-4 py-1 my-1'
        //                                     onClick={()=> {viewTask(task._id)}}
        //                                     >
        //                                         <FiEdit className="m-auto"/>                                                
        //                                 </button>
        //                             </td>
        //                             <td id={`${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task._id}</td>                                      
        //                         </tr>
        //                     )                            
        //                 })                         
        //             }
        //             <tr className="table-last-row">
        //                 <th></th>
        //                 <th></th>
        //                 <th>Total Tasks: {taskCount}</th>                        
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //                 <th></th>
        //             </tr> 
        //         </tbody>
        //     </table>



        <div>
            {/********************/}
            {/* Operational Table*/}
            {/********************/}
            <div className ="w-full m-auto">Operational
                <table className="table-auto table-container bg-filter">
                    <thead>
                        <tr className="table-heading-cell">
                            <th className="table-heading-cell ">Created</th>
                            <th className="table-heading-cell ">Title</th>
                            <th className="hidden sm:table-cell table-heading-cell ">Review</th>                            
                            <th className="hidden sm:table-cell table-heading-cell ">Assigned</th>
                            <th className="hidden sm:table-cell table-heading-cell ">Stakeholder</th>
                            <th className="sm:hidden table-cell table-heading-cell"></th>
                            <th className="table-heading-cell ">Done</th>
                            <th className="hidden sm:table-cell table-heading-cell ">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // {/* Index in array to add rowIndex to table */}
                            taskArray.operational.map( (task, index) => {   
                                return(                                    
                                    <tr id={`table-row-${task._id}`} className="table-row p-4 text-center" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                        <td className="text-xs sm:text-xs md:text-sm xl:text-base table-row-cell" data-created-dt={task.created_dt}> {dayjs(task.created_dt).format('DD/MM/YY')}</td>                                
                                        <td>
                                            <p
                                                className="text-xs sm:text-xs md:text-sm xl:text-base table-row-cell link-color "
                                                onClick={()=> {viewTask(task._id)}}>
                                                    {task.title}
                                            </p>
                                        </td>
                                        <td className="hidden sm:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-row-cell review-date-js " data-review-dt={task.review_dt}> {dayjs(task.review_dt).format('DD/MM/YY')}</td>
                                        <td className="hidden sm:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-row-cell">{task.assigned.username}</td> 
                                        <td className="hidden sm:table-cell text-xs sm:text-xs md:text-sm xl:text-base table-row-cell">{task.stakeholder}</td> 
                                        <td className="sm:hidden table-cell text-xs sm:text-xs md:text-sm xl:text-base table-row-cell">

                                            <div className="flex justify-left items-center">
                                                <div><BsFillCalendar2WeekFill className=""/> </div>
                                                <div>&nbsp; {dayjs(task.review_dt).format('DD/MM/YY')}</div>
                                            </div>


                                            <div className="flex justify-left items-center">
                                                <div><FaUserNinja className=""/> </div>
                                                <div>&nbsp; {task.assigned.username}</div>
                                            </div>

                                            <div className="flex justify-left items-center">
                                                <div><FaUserTie className=""/> </div>
                                                <div>&nbsp; {task.stakeholder}</div>
                                            </div>

                                        </td> 
                                        <td>
                                            <button                                                
                                                className="text-xs sm:text-xs md:text-sm xl:text-base table-row-cell link-color"
                                                onClick={ ()=> completeHandler(task._id, "operational") }
                                                >                                              
                                                    <Icon icon="subway:tick" width="15" height="15" strokeWidth={3} color="green"/>  
                                            </button>
                                        </td>
                                        {/* Show if greater than 1280 pixels */}                                
                                        <td id={`updated-at-${task._id}`} className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm table-row-cell">{task.updatedAt}</td>
                                    </tr>
                                )                            
                            })                         
                        }
                        <tr className="table-last-row">
                            <th></th>
                            <th></th>
                            <th className="table-row-cell"><span className="inline sm:hidden">Σ :</span><span className="hidden sm:inline">Total :</span>&nbsp;{operationalTaskCount}</th>                        
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
        
            {/**************/}
            {/* Focus Table*/}
            {/**************/}
            <h1> Focus  </h1>
            <table className="w-11/12 table-auto bg-filter table-container">
                <thead>
                    <tr className="text-16 table-heading-cell">
                        <th className="table-heading-cell ">Created</th>
                        <th className="table-heading-cell ">Title</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Review Date</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Stakeholder</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Status (Macro)</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Status (Micro)</th>
                        {/* <th className="hidden sm:table-cell table-heading-cell ">Complete Flag</th> */}
                        <th className="hidden sm:table-cell table-heading-cell ">Assigned</th>
                        <th className="table-heading-cell ">Complete</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Last Updated</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Category</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Edit</th>
                        <th className="hidden lg:table-cell table-heading-cell ">task_id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // {/* Index in array to add rowIndex to table */}
                        taskArray.focus.map( (task, index) => {   
                            return(
                                // <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id}  style={{ backgroundColor: reviewDue(task.review_dt)}}  onClick= { ()=> setRowIndex(index)}>
                                <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                    <td id={`created-dt-${task._id}`} className=" xl:text-base text-xs sm:text-xs md:text-sm" data-created-dt={task.created_dt}> {task.created_dt}</td>                                
                                    <td id={`title-${task._id}`} className="xl:text-base text-xs sm:text-xs md:text-sm"> {task.title}</td>
                                    {/* Hide if less than 640 pixels */}
                                    <td id={`review-dt-${task._id}`} className="review-date-js hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-review-dt={task.review_dt}>{dayjs(task.review_dt).format('DD/MM/YY')}</td>
                                    <td id={`stakeholder-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-stakeholder={task.stakeholder}>{task.stakeholder}</td>                                    
                                    <td id={`status-macro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-macro={task.status_macro}>{task.status_macro}</td>  
                                    <td id={`status-micro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-micro={task.micro}>{task.status_micro}</td>
                                                    
                                    {/* <td id={`complete-flag-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-complete-flag={task.complete_flag}>
                                        {
                                            task.complete_flag ? (
                                                "True"
                                            ) : (
                                                "False"
                                            )
                                        }                                    
                                        </td>   */}
                                    {/* Show if less than 640 pixels */}
                                    <td id={`assigned-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-assigned-username={task.assigned.username}>{task.assigned.username}</td> 
                                    <td>
                                        <button
                                            id={`complete-button-${task._id}`}
                                            className="text-xs md:text-sm sm:text-xs px-4 py-1 my-1 button-color "
                                            onClick={ ()=> completeHandler(task._id, "focus") }
                                            ><ImCross className="m-auto text-red-600"/> 
                                        </button>
                                    </td>
                                    {/* Show if greater than 1280 pixels */}                                
                                    <td id={`updated-at-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task.updatedAt}</td> 
                                    <td id={`category-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-category={task.priority.category}>{task.priority.category}</td> 
                                    <td className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">                                        
                                        <button
                                            id={`edit-button-${task._id}`}
                                            value={`${task._id}`}
                                            className='button-color px-4 py-1 my-1'
                                            onClick={()=> {viewTask(task._id)}}
                                            >
                                                <FiEdit className="m-auto"/>                                                
                                        </button>
                                    </td>
                                    <td id={`${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task._id}</td>                                      
                                </tr>
                            )                            
                        })                         
                    }
                    <tr className="table-last-row">
                        <th></th>
                        <th></th>
                        <th>Total Tasks: {focusTaskCount}</th>                        
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

            {/**********************/}
            {/* Opportunistic Table*/}
            {/**********************/}
            <h1> Opportunistic </h1>
            <table className="w-11/12 table-auto bg-filter table-container">
                <thead>
                    <tr className="text-16 table-heading-cell">
                        <th className="table-heading-cell ">Created</th>
                        <th className="table-heading-cell ">Title</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Review Date</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Stakeholder</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Status (Macro)</th>
                        <th className="hidden sm:table-cell table-heading-cell ">Status (Micro)</th>
                        {/* <th className="hidden sm:table-cell table-heading-cell ">Complete Flag</th> */}
                        <th className="hidden sm:table-cell table-heading-cell ">Assigned</th>
                        <th className="table-heading-cell ">Complete</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Last Updated</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Category</th>
                        <th className="hidden lg:table-cell table-heading-cell ">Edit</th>
                        <th className="hidden lg:table-cell table-heading-cell ">task_id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // {/* Index in array to add rowIndex to table */}
                        taskArray.opportunistic.map( (task, index) => {   
                            return(
                                // <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id}  style={{ backgroundColor: reviewDue(task.review_dt)}}  onClick= { ()=> setRowIndex(index)}>
                                <tr id={`table-row-${task._id}`} className="table-row text-center" key={task._id} onClick= { ()=> setRowIndex(index)}>
                                    <td id={`created-dt-${task._id}`} className=" xl:text-base text-xs sm:text-xs md:text-sm" data-created-dt={task.created_dt}> {task.created_dt}</td>                                
                                    <td id={`title-${task._id}`} className="xl:text-base text-xs sm:text-xs md:text-sm"> {task.title}</td>
                                    {/* Hide if less than 640 pixels */}
                                    <td id={`review-dt-${task._id}`} className="review-date-js hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-review-dt={task.review_dt}>{task.review_dt}</td>
                                    <td id={`stakeholder-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-stakeholder={task.stakeholder}>{task.stakeholder}</td>                                    
                                    <td id={`status-macro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-macro={task.status_macro}>{task.status_macro}</td>  
                                    <td id={`status-micro-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-micro={task.micro}>{task.status_micro}</td>
                                                    
                                    {/* <td id={`complete-flag-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-complete-flag={task.complete_flag}>
                                        {
                                            task.complete_flag ? (
                                                "True"
                                            ) : (
                                                "False"
                                            )
                                        }                                    
                                        </td>   */}
                                    {/* Show if less than 640 pixels */}
                                    <td id={`assigned-${task._id}`}className="hidden sm:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-status-assigned-username={task.assigned.username}>{task.assigned.username}</td> 
                                    <td>
                                        <button
                                            id={`complete-button-${task._id}`}
                                            className="text-xs md:text-sm sm:text-xs px-4 py-1 my-1 button-color "
                                            onClick={ ()=> completeHandler(task._id, "opportunistic") }
                                            ><ImCross className="m-auto text-red-600"/> 
                                        </button>
                                    </td>
                                    {/* Show if greater than 1280 pixels */}                                
                                    <td id={`updated-at-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task.updatedAt}</td> 
                                    <td id={`category-${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm" data-category={task.priority.category}>{task.priority.category}</td> 
                                    <td className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">                                        
                                        <button
                                            id={`edit-button-${task._id}`}
                                            value={`${task._id}`}
                                            className='button-color px-4 py-1 my-1'
                                            onClick={()=> {viewTask(task._id)}}
                                            >
                                                <TiTick className="m-auto"/>                                                
                                        </button>
                                    </td>
                                    <td id={`${task._id}`} className="hidden lg:table-cell xl:text-base text-xs sm:text-xs md:text-sm">{task._id}</td>                                      
                                </tr>
                            )                            
                        })                         
                    }
                    <tr className="table-last-row">
                        <th></th>
                        <th></th>
                        <th>Total Tasks: {opportunisticTaskCount}</th>                        
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

