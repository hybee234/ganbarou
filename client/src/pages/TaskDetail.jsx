import React from 'react'

export default function TaskDetail(props) {
    const { state } = props.location;
    console.log (state)


    return (
        <div className="text-3xl bg-filter task-detail-form">Hi I'm the Task Detail Component
            <p>Task ID = </p>
        </div>
    )


}