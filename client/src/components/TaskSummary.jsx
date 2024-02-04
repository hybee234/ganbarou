import { RiCheckboxBlankFill } from "react-icons/ri"
import { SiTarget } from "react-icons/si";
import { BsFillBalloonFill } from "react-icons/bs";
import { FaTools } from "react-icons/fa";

/*
This components job is to recieve a task array and produce a summary out of it
Operational Tasks - Operational Tasks due for review
Business Focus Initiatives - Business FOcus tasks due for review
Business Opportunistic Initiatives
*/


export default function TasksSummary(props) {

    const {user} = props

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//

    // Now (date and time)
    let now = new Date();
    now = `${now.toLocaleDateString('en-AU')} ${now.toLocaleTimeString('en-AU')}`;

    // myData is passed through with all user and task data
    console.log("My Summary: Tasks:", user.tasks)

    // GrandTotal - My Total Active Tasks
    const totalTasks = user.tasks.filter(task => !task.complete_flag).length
    // console.log("totalTasks: ", totalTasks)

    // Grandtotal - Active, future review
    const totalReviewDue = user.tasks.filter(task => !task.complete_flag && task.review_dt <= now).length;
    // console.log("totalReviewDue", totalReviewDue);

    //Operational Tickets (total)
    const totalOperational = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven).length
    // console.log("totalOperational: ", totalOperational)

    //Operational Tickets (total), future review
    const operationalReviewDue = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven && task.review_dt <= now).length
    // console.log("operationalReviewDue: ", operationalReviewDue)

    //Business driven total 
    const totalBusiness = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven).length
    // console.log("totalBusiness: ", totalBusiness)

    //Business driven Focus total
    const businessFocus = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus).length
    // console.log("businessFocus: ", businessFocus)

    // Business driven Focus, future review
    const businessFocusReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus && task.review_dt <= now).length
    // console.log("businessFocusReviewDue: ", businessFocusReviewDue)

    // Business driven opportunistic, total
    const businessOpportunistic = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus).length
    // console.log("businessOpportunistic: ", businessOpportunistic)

    // Business driven Focus, future review
    const businessOpportunisticReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus && task.review_dt <= now).length
    // console.log("businessOpportunisticReviewDue: ", businessOpportunisticReviewDue)

// Closed this month

//----------------//
//- Render Icons -//
//----------------//

    let TotalIcons = () => {
            return (
                <div className="flex flex-wrap text-5xl">
                     {Array.from(Array(operationalReviewDue), (e, i) => {
                    return <FaTools color="red" key={i} className="p-1" />
                    })}
                    {Array.from(Array(businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="red" key={i} className="p-1" />
                    })}
                    {Array.from(Array(businessOpportunisticReviewDue), (e, i) => {
                    return <RiCheckboxBlankFill color="red" key={i} className="" />
                    })}
                    {Array.from(Array(totalOperational-operationalReviewDue), (e, i) => {
                        return <FaTools color="green" key={i} className="p-1"/>
                    })}
                    {Array.from(Array(businessFocus-businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="green" key={i} className="p-1"/>
                    })}
                    {Array.from(Array(businessOpportunistic-businessOpportunisticReviewDue), (e, i) => {
                        return <RiCheckboxBlankFill color="green" key={i} className=""/>
                    })}
                </div>
            )
        }

    let OperationalIcons = () => {
        return (
            <div className="flex flex-wrap text-5xl">
                {Array.from(Array(operationalReviewDue), (e, i) => {
                    return <FaTools color="red" key={i} className="p-1" />
                })}
                {Array.from(Array(totalOperational-operationalReviewDue), (e, i) => {
                    return <FaTools color="green" key={i} className="p-1"/>
                })}
            </div>
        )
    }

    let FocusIcons = () => {
        return (
            <div className="flex flex-wrap text-5xl">
                {Array.from(Array(businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="red" key={i} className="p-1" />
                })}
                {Array.from(Array(businessFocus-businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="green" key={i} className="p-1"/>
                })}
            </div>
        )
    }

    let OpportunisticIcons = () => {
        return (
            <div className="flex flex-wrap text-5xl">
                {Array.from(Array(businessOpportunisticReviewDue), (e, i) => {
                    return <RiCheckboxBlankFill color="red" key={i} />
                })}
                {Array.from(Array(businessOpportunistic-businessOpportunisticReviewDue), (e, i) => {
                    return <RiCheckboxBlankFill color="green" key={i} />
                })}
            </div>
        )
    }

// OperationalGood
// OperationalReview
// BusinessFocusGood
// BusinessFocusReview
// BusinessOpportunisticGood
// BusinessOpportunisticReview





return (
    <div className="bg-filter mt-10">
        <p className="border-2"> Summary!</p>
        <div className="flex flex-wrap justify-center ">
            <div className = "border-2 p-2 ">
                <p className="underline"> Total </p>
                <div > {totalReviewDue} / {totalTasks} due for review </div>   
                <TotalIcons />              
            </div>
            <div className = "border-2 p-2">
                <p className="underline"> Operational </p>
                <OperationalIcons/>
                <div> Tasks: {totalOperational}</div>
                <div> Review Due: {operationalReviewDue}</div>
            </div>
            <div className = "border-2 p-2">
                {/* <div> Total Business Driven Initiatives: {totalBusiness}</div>*/}
                <p className="underline"> Business Driven </p>
                <div className="flex flex-wrap justify-center">
                    <div className = "border-2 p-2">
                        <p className="underline">Bus.Focus</p>
                        <FocusIcons />
                        <div> Tasks: {businessFocus}</div>
                        <div> Review Due: {businessFocusReviewDue}</div>
                    </div>
                    <div className = "border-2 p-2">
                        <p className="underline">Opportunistic</p>
                        <OpportunisticIcons />
                        <div> Tasks: {businessOpportunistic}</div>
                        <div> Review Due: {businessOpportunisticReviewDue}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}