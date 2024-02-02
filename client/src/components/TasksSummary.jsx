import { format } from "date-fns";

/*
This components job is to recieve a task array and produce a summary out of it
Operational Tasks - Operational Tasks due for review
Business Focus Initiatives - Business FOcus tasks due for review
Business Opportunistic Initiatives
*/


export default function TasksSummary(props) {

    const {tasks} = props

    // myData is passed through with all user and task data
    console.log("tasks", tasks)

    // Pull out the tasks from myData
    // const myTasks = myData.tasks
    // console.log("myTasks", myTasks)

// Summary view for the user
// My Total Active Tasks

    const activeTasks = tasks.filter(task => (!task.complete_flag)).length
    console.log("activeTasks: ", activeTasks)


//Operational Tickets (total), total due for attention
//BUsiness driven tickets - priority total, total due for attention
// Business driven tickets - opportunistic, total

// Closed this month
// Gamify this screen


// var testDate = format(myData.tasks[1].complete_dt, "dd/MM/yyyy")
// console.log("testDate", testDate)
// var date = new Date("2016-01-04 10:34:23");

// var formattedDate = format(date, "MMMM do, yyyy H:mma");





// Array of Tasks that are not complete that are due for review
const reviewDue = tasks.filter(d => (!d.complete_flag) && (d.review_dt < Date.now) );
console.log("Active - Due for review:", reviewDue);

// Length of Array of Tasks that are not complete that are due for review
const reviewDueCount = tasks.filter(d => (!d.complete_flag) && (d.review_dt < Date.now)).length;
console.log("Active - Due for review:", reviewDueCount);








// Open tasks
// const openTasks = myData.tasks.filter(function (task) {

// } => !d.complete_flag).length;
// console.log("openTasks:", openTasks);

return (
    <div>
        <p> My Tasks Summary!</p>
        <div> review Due
            {
                reviewDue.map( (task) => {
                    return (
                        <div key={task._id}>
                            Task title: {task.title}
                            Task complete flag: {task.complete_flag}
                        </div>
                    )

                    
                })
            }
        </div>

    </div>
    )
}