
import { useMutation, useQuery } from '@apollo/client';
import { COMPLETE_TASK } from './../utils/mutations'

export default function TaskList ({me}) {

    const tasksRaw = me.tasks

    //Filter for active tasks only
    const tasks = tasksRaw.filter(task => !task.complete_flag)

    // Complete Task useMutation Hook
    const [CompleteTask, { error }] = useMutation(COMPLETE_TASK);

    if (CompleteTask.loading) {
        return ( 
        <div id="loading-screen">
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>
            <div className = "text-center py-2 text-lg font-normal md:text-2xl text-color">Loading ...</div>
        </div>
        )
    }   

    if (error) {return (
        <div id="loading-screen"> Error! 
            <div>${error.message}</div>
            <div>Allow this Chiikawa character to lighten the mood</div>
            <div className = "text-center py-2"><img className = "m-auto py-2" width="100px" src="../assets/images/chiikawa loading.gif" /></div>        
        </div>    
    );}

    const completeHandler = async (taskId) => {
        // I need to write an update record mutation ...
        try {
            console.log(taskId)
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
                        <th className="hidden xl:table-cell px-4 py-2 text-xs font-medium ">Last Updated</th>
                        <th className="hidden xl:table-cell px-4 py-2 text-xs font-medium ">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map( (task) => {   
                            return(
                                <tr key={task._id} className="table-rows text-center">
                                    <td className="font-normal xl:text-base text-xs sm:text-xs md:text-sm ">{task.created_dt}</td>                                
                                    <td className="font-normal xl:text-base text-xs sm:text-xs md:text-sm" >{task.title}</td> 
                                    {/* Hide if less than 640 pixels */}
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.review_dt}</td>
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.stakeholder}</td>                                    
                                    
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.status_macro}</td>  
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.status_micro}</td>
                                                    
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">
                                        {
                                            task.complete_flag ? (
                                                <p>True</p>
                                            ) : (
                                                <p>False</p>
                                            )
                                        }                                    
                                        </td>  
                                    {/* Show if less than 640 pixels */}
                                    <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.assigned._id}</td> 
                                    <td>
                                        <button 
                                            className="text-xs font-normal md:text-sm sm:text-xs px-4 py-1 my-1 button-color"
                                            onClick={ ()=> completeHandler(task._id) }
                                            >Complete
                                        </button>
                                    </td>
                                    {/* Show if greater than 1280 pixels */}                                
                                    <td className="hidden xl:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.updatedAt}</td> 
                                    <td className="hidden xl:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.priority.category}</td> 
                                </tr>
                            )
                            
                        })                         
                    }
                </tbody>
            </table>
        </div>
    )

}

