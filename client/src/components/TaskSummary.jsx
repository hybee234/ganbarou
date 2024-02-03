import { format } from "date-fns";

/*
This components job is to recieve a task array and produce a summary out of it
Operational Tasks - Operational Tasks due for review
Business Focus Initiatives - Business FOcus tasks due for review
Business Opportunistic Initiatives
*/


export default function TasksSummary(props) {

    const {user} = props

    // myData is passed through with all user and task data
    console.log("tasks", user.tasks)

    // Summary view for the user

    // GrandTotal - My Total Active Tasks
    const totalTasks = user.tasks.filter(task => !task.complete_flag).length
    // console.log("totalTasks: ", totalTasks)

    // Grandtotal - Active, future review
    const totalReviewDue = user.tasks.filter(task => !task.complete_flag && task.review_dt < new Date().toLocaleString()).length;
    // console.log("totalReviewDue", totalReviewDue);

    //Operational Tickets (total)
    const totalOperational = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven).length
    // console.log("totalOperational: ", totalOperational)

    //Operational Tickets (total), future review
    const operationalReviewDue = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven && task.review_dt < new Date().toLocaleString()).length
    // console.log("operationalReviewDue: ", operationalReviewDue)

    //Business driven total 
    const totalBusiness = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven).length
    // console.log("totalBusiness: ", totalBusiness)

    //Business driven Focus total
    const businessFocus = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus).length
    // console.log("businessFocus: ", businessFocus)

    // Business driven Focus, future review
    const businessFocusReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus && task.review_dt < new Date().toLocaleString()).length
    // console.log("businessFocusReviewDue: ", businessFocusReviewDue)

    // Business driven opportunistic, total
    const businessOpportunistic = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus).length
    // console.log("businessOpportunistic: ", businessOpportunistic)

    // Business driven Focus, future review
    const businessOpportunisticReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus && task.review_dt < new Date().toLocaleString()).length
    // console.log("businessOpportunisticReviewDue: ", businessOpportunisticReviewDue)

// Closed this month

// Gamify this screen

// var testDate = format(myData.tasks[1].complete_dt, "dd/MM/yyyy")
// console.log("testDate", testDate)
// var date = new Date("2016-01-04 10:34:23");

// var formattedDate = format(date, "MMMM do, yyyy H:mma");


// const reviewDate = user.tasks[0].review_dt
// console.log(reviewDate)

// const now = new Date();
// const date = now.toLocaleDateString();
// const time = now.toLocaleTimeString();
// const current = now.toLocaleString();

// const test = new Date().toLocaleString();
// console.log ("test", test)

// console.log("Current date:", date);
// console.log("Current time:", time);
// console.log("Current:", current);


// if (current > reviewDate) {
//     console.log ("review is before current");
//     console.log ("current", current);
//     console.log ("reviewDate", reviewDate);
    
// } else {
//     console.log ("current is before review");
//     console.log ("current", current);
//     console.log ("reviewDate", reviewDate);
// }


// const now = new Date();
// const date = now.toLocaleDateString();
// const time = now.toLocaleTimeString();

// console.log(`Current date: ${date}`);
// console.log(`Current time: ${time}`);


return (
    <div className="bg-filter mt-10">
        <p> My Tasks Summary!</p>
        <div className="flex flex-wrap justify-center">
            <div className = "border-2 p-2">
                <p className="underline"> Total </p>
                <div> Tasks: {totalTasks} </div>
                <div> Review Due: {totalReviewDue} </div>                
            </div>
            <div className = "border-2 p-2">
                <p className="underline"> Operational </p>
                <div> Tasks: {totalOperational}</div>
                <div> Review Due: {operationalReviewDue}</div>
            </div>
            <div className = "border-2 p-2">
                {/* <div> Total Business Driven Initiatives: {totalBusiness}</div>*/}
                <p className="underline"> Business Driven </p>
                <div className="flex flex-wrap justify-center">
                    <div className = "border-2 p-2">
                        <p className="underline">Focus</p>
                        <div> Tasks: {businessFocus}</div>
                        <div> Review Due: {businessFocusReviewDue}</div>
                    </div>
                    <div className = "border-2 p-2">
                        <p className="underline">Opportunistic</p>
                        <div> Tasks: {businessOpportunistic}</div>
                        <div> Review Due: {businessOpportunisticReviewDue}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}