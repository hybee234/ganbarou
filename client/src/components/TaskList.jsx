import { useGlobalContext } from '../utils/GlobalState';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { COMPLETE_TASK } from './../utils/mutations'
import { DETAIL_VIEW_ID } from "./../utils/actions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiEdit } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default function TaskList (props) {
    // Hook to useNavigate
    const navigate = useNavigate();

    //Hook to access state
    const [state, dispatch] = useGlobalContext();  

    console.log ("TaskList Rendering")
    const user = props.user
    const setTaskDetailId = props.setTaskDetailId

    console.log("user", user)
    console.log("user task", user.tasks)


    const tasksRaw = user.tasks

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//

    useEffect(() => {
        highlightReview()
        ,[]
    })

    // Now (date and time)
    let now = new Date();
    now = `${now.toLocaleDateString('en-AU')} ${now.toLocaleTimeString('en-AU')}`;
    const today = (new Date()).toLocaleDateString('en-AU')


    // const date = new Date()
    // const formatter = new Intl.DateFormat('en-AU', { day: '2-digit', month: '2-digit', year: '2-digit' });
    // const formattedDate = formatter.format("4/2/24");
    // console.log(formattedDate);
                                                    

    //Index for Rows
    const [rowIndex, setRowIndex] = useState('');

    //----------------------------------------//
    //- User Tasks - Filter for Active Tasks -//
    //----------------------------------------//

    const tasks = tasksRaw.filter(task => !task.complete_flag)

    //useState for Task Count
    const [taskCount, useTaskCount] = useState(tasks.length)

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
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading 3.gif" /></div>        
        </div>    
    );}

    // Mutation to complete task
    const completeHandler = async (taskId) => {        
        try {
            // console.log(taskId)
            const {data} = await CompleteTask({
                variables: {
                    id: taskId
                }
            })
            console.log("data", data)
            toast.success(`Task Completed! Great Work!`) 
            useTaskCount(taskCount - 1)      
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }

    //--------------------//
    // View Task details -//
    //--------------------//
    const viewTask = (taskId) => {
    
        // setTaskDetailId(taskId)

        dispatch ({ type: DETAIL_VIEW_ID, payload: taskId})



        //put the ID in localStorage ....
        localStorage.setItem('detail_view_id', taskId);

            
        navigate('/TaskDetailPage');

        // viewTaskDetail = { task_id: "1234"}
        // console.log("viewTaskDetail:", viewTaskDetail)
        // document.getElementById('task-detail-form-js').style.display = 'block'
        

        // console.log(document.getElementById(`created-dt-${taskId}`).textContent)

        //Navigatge to task Detail
    }

    // console.log("rowIndex", rowIndex)

    //--------------------------------------//
    //- Populate table with current values -//
    //-------------------------------------//

    //title
    // document.querySelectorAll('.title-input-js').forEach(element => {
    //     element.value = element.dataset.title
    // })

    //review date


    //------------------------------------------------//
    //- Conditionally Formatting Overdue Review Date -//
    //------------------------------------------------//

    const highlightReview = () => {
        document.querySelectorAll('.review-date-js').forEach(element => {
            if (element.dataset.reviewDt < now) {
                // console.log ("OVERDUE for review", element.dataset.reviewDt)

                // console.log (today)
                element.parentNode.classList.add('review-due')
            } else {
                // console.log ("not due for review", element.dataset.reviewDt)
            }
        })
    }

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

    return (
        <div>
            <table id="task-table-container" className="w-11/12 m-auto table-auto mb-20 bg-filter">
                <thead>
                    <tr className="text-16 table-heading">
                        <th className="px-4 py-2 text-xs font-medium ">Created</th>
                        <th className="px-4 py-2 text-xs font-medium ">Title</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Review Date</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Stakeholder</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Status (Macro)</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Status (Micro)</th>
                        {/* <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Complete Flag</th> */}
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Assigned</th>
                        <th className="px-4 py-2 text-xs font-medium ">Complete</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Last Updated</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Category</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Edit</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">task_id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // {/* Index in array to add rowIndex to table */}
                        tasks.map( (task, index) => {   
                            return(
                                // <tr id={`table-row-${task._id}`} className="table-rows text-center" key={task._id}  style={{ backgroundColor: reviewDue(task.review_dt)}}  onClick= { ()=> setRowIndex(index)}>
                                <tr id={`table-row-${task._id}`} className="table-rows text-center" key={task._id} onClick= { ()=> setRowIndex(index)}>
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
                                            onClick={ ()=> completeHandler(task._id) }
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
                        <th>Total Tasks: {taskCount}</th>                        
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

