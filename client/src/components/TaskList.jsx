
import {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { COMPLETE_TASK } from './../utils/mutations'


import { FiEdit } from "react-icons/fi";



export default function TaskList ({user}) {

    //Index for Rows
    const [rowIndex, setRowIndex] = useState("");

    // Extract user tasks
    const tasksRaw = user.tasks

    // Filter for active tasks only (also refreshes the component)
    const tasks = tasksRaw.filter(task => !task.complete_flag)

    // Complete Task useMutation Hook
    const [CompleteTask, { error }] = useMutation(COMPLETE_TASK);

    // Show Loading screen if loading
    if (CompleteTask.loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   
    
    // Show error screen if error
    if (error) {return (
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>        
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
        } catch (error) {
            console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
        }
    }

    // Creating the edit button and screen
    const viewTask = (taskId) => {
        
        console.log("test function engaged", taskId)
        const testTask = tasks.filter(task => task._id === taskId)
        console.log("testTask", testTask)
        //Navigatge to task Detail
    }

    const test = (reviewDt) => {
        if (reviewDt < new Date().toLocaleString()) {
            return "red"
        } else {
            return "transparent"
        }
    }

    const idgenerator = (taskId) => {
        const id = `test-${taskId}`
        return id
    }

console.log("rowIndex", rowIndex)

    return (
        <div>
            <table id="transaction-table-container" className="w-11/12 m-auto table-auto mb-20 bg-filter">
                <thead>
                    <tr className="text-16 table-heading">
                        <th className="px-4 py-2 text-xs font-medium ">Created</th>
                        <th className="px-4 py-2 text-xs font-medium ">Title</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Review Date</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Stakeholder</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Status (Macro)</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Status (Micro)</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Complete Flag</th>
                        <th className="hidden sm:table-cell px-4 py-2 text-xs font-medium ">Assigned</th>
                        <th className="px-4 py-2 text-xs font-medium ">Complete</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Last Updated</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Category</th>
                        <th className="hidden lg:table-cell px-4 py-2 text-xs font-medium ">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // {/* Index in array to add rowIndex to table */}
                        tasks.map( (task, index) => {   
                            return(
                                <tr key={task._id} className="table-rows text-center" style={{ backgroundColor: test(task.review_dt)}} id={`table-row-${task._id}`} 
                                onClick= { ()=> setRowIndex(index)}>
                                    <td className="font-normal xl:text-base text-xs sm:text-xs md:text-sm"> {task.created_dt}                                    
                                        {/* <input className="input-field" type="date" placeholder="MM/DD/YYYY">
                                        </input> */}
                                    </td>                                
                                    <td className="font-normal xl:text-base text-xs sm:text-xs md:text-sm " >{task.title}</td>
                                        {/* <input className="input-field" type="text">
                                        
                                        </input> */}
                                        {/* {task.title} */}
                                    {/* Hide if less than 640 pixels */}
                                    <td data-id={task._id} className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.review_dt}</td>
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.stakeholder}</td>                                    
                                    
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.status_macro}</td>  
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.status_micro}</td>
                                                    
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">
                                        {
                                            task.complete_flag ? (
                                                "True"
                                            ) : (
                                                "False"
                                            )
                                        }                                    
                                        </td>  
                                    {/* Show if less than 640 pixels */}
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.assigned.username}</td> 
                                    <td>
                                        <button 
                                            className="text-xs font-normal md:text-sm sm:text-xs px-4 py-1 my-1 button-color"
                                            onClick={ ()=> completeHandler(task._id) }
                                            >Complete
                                        </button>
                                    </td>
                                    {/* Show if greater than 1280 pixels */}                                
                                    <td className="hidden lg:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.updatedAt}</td> 
                                    <td className="hidden lg:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.priority.category}</td> 
                                    <td className="hidden lg:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm border-2">
                                        <button>
                                            <FiEdit 
                                                value = {{color: 'red', size: '50'}}
                                                className="m-auto"
                                                onClick={()=> {viewTask(task._id)}}
                                                > Test
                                            </FiEdit>
                                        </button>
                                    </td> 
                                    
                                </tr>
                            )
                            
                        })                         
                    }
                </tbody>
            </table>
        </div>
    )

}

