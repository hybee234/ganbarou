
export default function MyTasksSummary(props) {

    const {myData} = props

    console.log("MyTasksSummary", myData)
// Summary view for the user
//Operational Tickets (total), total due for attention
//BUsiness driven tickets - priority total, total due for attention
// Business driven tickets - opportunistic, total

// Closed this month
// Gamify this screen

return (
    <p> My Tasks Summary!</p>

    )
}