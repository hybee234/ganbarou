import { format } from "date-fns";

export default function MyTasksSummary(props) {

    const {myData} = props

    console.log("MyTasksSummary", myData)
// Summary view for the user
//Operational Tickets (total), total due for attention
//BUsiness driven tickets - priority total, total due for attention
// Business driven tickets - opportunistic, total

// Closed this month
// Gamify this screen
console.log("Test", )

// var testDate = format(myData.tasks[1].complete_dt, "dd/MM/yyyy")
// console.log("testDate", testDate)
// var date = new Date("2016-01-04 10:34:23");

// var formattedDate = format(date, "MMMM do, yyyy H:mma");


// Pull out the branch of interest to do analysis
const myTasks = myData.tasks
console.log("myTasks", myTasks)

// Array of Tasks that are not complete that are due for review
const reviewDue = myTasks.filter(d => (!d.complete_flag) && (d.review_dt < Date.now) );
console.log("Active - Due for review:", reviewDue);

// Length of Array of Tasks that are not complete that are due for review
const reviewDueCount = myTasks.filter(d => (!d.complete_flag) && (d.review_dt < Date.now)).length;
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