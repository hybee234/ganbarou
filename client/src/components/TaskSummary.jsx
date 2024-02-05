/*
This components job is to recieve a task array and produce a summary out of it
Operational Tasks - Operational Tasks due for review
Business Focus Initiatives - Business FOcus tasks due for review
Business Opportunistic Initiatives
*/

import dayjs from 'dayjs';
import { SiTarget } from "react-icons/si";
import { FaTools } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
// import { RiCheckboxBlankFill } from "react-icons/ri"
// import { BsFillBalloonFill } from "react-icons/bs";

export default function TasksSummary(props) {

    
    console.log("TaskSummary Rendering")
    
    const {user} = props

    //----------------------------------------//
    //- Create and Store Date/Time constants -//
    //----------------------------------------//

    // Now (date and time)
    let now = new Date();
    now = `${now.toLocaleDateString('en-AU')} ${now.toLocaleTimeString('en-AU')}`;

    // myData is passed through with all user and task data
    // console.log("My Summary: Tasks:", user.tasks)

    // GrandTotal - My Total Active Tasks
    const totalTasks = user.tasks.filter(task => !task.complete_flag).length
    // console.log("totalTasks: ", totalTasks)

    // Grandtotal - Active, future review
    const totalReviewDue = user.tasks.filter(task => !task.complete_flag && dayjs(task.review_dt).format('DD/MM/YYYY') <=  dayjs(now).format('DD/MM/YYYY')).length;
    // console.log("totalReviewDue", totalReviewDue);

    //Operational Tickets (total)
    const totalOperational = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven).length
    // console.log("totalOperational: ", totalOperational)

    //Operational Tickets (total), future review
    const operationalReviewDue = user.tasks.filter(task => !task.complete_flag && !task.priority.business_driven && dayjs(task.review_dt).format('DD/MM/YYYY') <=  dayjs(now).format('DD/MM/YYYY')).length
    console.log("operationalReviewDue: ", operationalReviewDue)

    //Business driven total 
    const totalBusiness = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven).length
    // console.log("totalBusiness: ", totalBusiness)

    //Business driven Focus total
    const businessFocus = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus).length
    // console.log("businessFocus: ", businessFocus)

    // Business driven Focus, future review
    const businessFocusReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && task.priority.focus && dayjs(task.review_dt).format('DD/MM/YYYY') <=  dayjs(now).format('DD/MM/YYYY')).length
    console.log("businessFocusReviewDue: ", businessFocusReviewDue)

    // Business driven opportunistic, total
    const businessOpportunistic = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus).length
    // console.log("businessOpportunistic: ", businessOpportunistic)

    // Business driven Focus, future review
    const businessOpportunisticReviewDue = user.tasks.filter(task => !task.complete_flag && task.priority.business_driven && !task.priority.focus && dayjs(task.review_dt).format('DD/MM/YYYY') <=  dayjs(now).format('DD/MM/YYYY')).length
    // console.log("businessOpportunisticReviewDue: ", businessOpportunisticReviewDue)

//----------------//
//- Render Icons -//
//----------------//

    // let TotalIcons = () => {
    //         return (
    //             <div className="flex flex-wrap justify-center task-icon">
    //                 {Array.from(Array(businessFocusReviewDue), (e, i) => {
    //                     return <SiTarget color="red" key={i} className="p-1" />
    //                 })}
    //                 {Array.from(Array(operationalReviewDue), (e, i) => {
    //                     return <FaTools color="red" key={i} className="p-1" />
    //                 })}
    //                 {Array.from(Array(totalOperational-operationalReviewDue), (e, i) => {
    //                     return <FaTools color="green" key={i} className="p-1"/>
    //                 })}
    //                 {Array.from(Array(businessOpportunisticReviewDue), (e, i) => {
    //                     return <RiCheckboxBlankFill color="red" key={i} className="" />
    //                 })}
    //                 {Array.from(Array(businessOpportunistic-businessOpportunisticReviewDue), (e, i) => {
    //                     return <RiCheckboxBlankFill color="green" key={i} className=""/>
    //                 })}
    //                 {Array.from(Array(businessFocus-businessFocusReviewDue), (e, i) => {
    //                     return <SiTarget color="green" key={i} className="p-1"/>
    //                 })}
    //             </div>
    //         )
    //     }

    let OperationalIcons = () => {
        return (
            <div className="flex flex-wrap justify-center">
                {Array.from(Array(totalOperational-operationalReviewDue), (e, i) => {
                    return <FaTools color="green" key={i} className="task-icon"/>
                })}
                {Array.from(Array(operationalReviewDue), (e, i) => {
                    return <FaTools color="red" key={i} className="task-icon" />
                })}
            </div>
        )
    }

    let FocusIcons = () => {
        return (
            <div className="flex flex-wrap justify-center">
                {Array.from(Array(businessFocus-businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="green" key={i} className="task-icon"/>
                })}
                {Array.from(Array(businessFocusReviewDue), (e, i) => {
                    return <SiTarget color="red" key={i} className="task-icon" />
                })}
            </div>
        )
    }

    let OpportunisticIcons = () => {
        return (
            <div className="flex flex-wrap justify-center">
                {Array.from(Array(businessOpportunistic-businessOpportunisticReviewDue), (e, i) => {
                    return <FaClock color="#004000" key={i} className="task-icon-opp"/>
                })}
                {Array.from(Array(businessOpportunisticReviewDue), (e, i) => {
                    return <FaClock color="#500000" key={i} className="task-icon-opp"/>
                })}
            </div>
        )
    }

return (
    <div className="flex">
        <div className="mx-auto bg-filter my-2">
            <div className="flex flex-wrap justify-center task-summary-container">
                {/* <div className = "">
                    <p className="underline"> Total </p>
                    <div > {totalReviewDue} / {totalTasks} due for review </div>   
                    <TotalIcons />              
                </div> */}
                <div className = "px-1">
                    <p className=""> Operational ({totalOperational-operationalReviewDue}/{totalOperational}) </p>
                    <OperationalIcons/>
                </div>
                <div className="flex flex-wrap justify-center">
                    <div className = "px-1">
                        <p className="">Focus ({businessFocus-businessFocusReviewDue}/{businessFocus})</p>
                        <FocusIcons />    
                    </div>
                    <div className = "px-1">
                        <p className="">Opportunistic ({businessOpportunistic-businessOpportunisticReviewDue}/{businessOpportunistic})</p>
                        <OpportunisticIcons />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}