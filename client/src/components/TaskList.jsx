
export default function TaskList (props) {

    const me = props
    console.log ("me", me)

    const tasks = me.me.tasks

    console.log("tasks", tasks)


            // row.original.note.map( (note) => {
            //     return (
            //         <div className="flexwrap p-5 m-1 input-field" key={note.note_id}>
            //             <div className= "w-full flex justify-between">
            //                 <div>Type: {note.note_type} </div> 
            //                 <div>{note.note_author.username}, {note.note_dt}</div>                            
            //             </div>
            //             <div className="w-full pt-5">{note.note_text}</div>
            //         </div>
            //     )
            // })

// Complete Date
// Summary


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
                                <td className="hidden sm:table-cell font-normal xl:text-base text-xs sm:text-xs md:text-sm">{task.complete_flag}div</td>  
                                {/* Show if less than 640 pixels */}
                                <td>
                                    <button data-transaction-id = "{{transaction_id}}" className="text-xs font-normal xl:text-base md:text-sm sm:text-xs link-text button-color">Complete</button>
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

