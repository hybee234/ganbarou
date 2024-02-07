
import { Icon } from '@iconify/react';
import { useGlobalContext } from '../utils/GlobalState';

import {
    TASK_DETAIL_IMPORTANT,
    TASK_DETAIL_URGENT,
    TASK_DETAIL_EFFORT,
} from '../utils/actions'


export default function TaskDetailUrgentImportant() {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    return (
        <div className="flex">
            <div className="modal-field-container">
                <label className="modal-label w-1/3">Urgent</label>
                <div 
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        if(state.taskDetail.priority.urgent === true) {
                            dispatch({ type: TASK_DETAIL_URGENT,
                                payload: false                                   
                            })
                        } else {
                            dispatch({ type: TASK_DETAIL_URGENT,
                                payload: true                                   
                            })
                        }}
                    }
                >
                    {
                        state.taskDetail.priority.urgent ?
                        (
                            <div>
                                <Icon
                                    icon="noto:fire"
                                    // icon="emojione:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto"
                                />
                                <p className = "text-center">Yes</p>
                            </div>  
                        ):(
                            <div> 
                                <Icon
                                    icon="fluent-emoji-flat:sloth"
                                    // icon="fa6-solid:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto"
                                /> 
                                <p className = "text-center">No</p>
                            </div>  
                        )
                    }
                </div>
            </div>
            <div className="modal-field-container cursor-pointer">
                <label className="modal-label w-1/3">Important</label>
                <div
                    className="flex border-2 modal-field"
                    onClick={ () => {
                        if(state.taskDetail.priority.important === true) {
                            dispatch({ type: TASK_DETAIL_IMPORTANT,
                                payload: false                                   
                            })
                        } else {
                            dispatch({ type: TASK_DETAIL_IMPORTANT,
                                payload: true                                   
                            })
                        }}
                    }
                >
                    {
                        state.taskDetail.priority.important ?
                        (
                            <div> 
                                <Icon
                                    icon="noto:crown"
                                    // icon="emojione:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto"
                                />
                                <p className = "text-center">Yes</p>
                            </div>    
                        ):(
                            <div>
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    // icon="fa6-solid:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto"
                                /> 
                                <p className = "text-center">No</p>
                            </div>  
                        )
                    }
                </div>
            </div>
            <div className="modal-field-container justify-center text-center align-center">
                <label className="modal-label m-auto text-center align-center">Effort</label>
                <div
                    className="flex modal-field cursor-pointer"
                    onClick={ () => {
                        if(state.taskDetail.priority.high_effort === true) {
                            dispatch({ type: TASK_DETAIL_EFFORT,
                                payload: false                                   
                            })
                        } else {
                            dispatch({ type: TASK_DETAIL_EFFORT,
                                payload: true                                   
                            })
                        }}
                    }
                >
                    {
                        state.taskDetail.priority.high_effort ?
                        (
                            <div>
                                <Icon
                                    icon="twemoji:snow-capped-mountain"
                                    // icon="emojione:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto "                               
                                />  
                                <p className = "text-center">High</p>
                            </div> 
                        ):(
                            <div>
                                <Icon
                                    icon="streamline-emojis:shortcake-2"
                                    // icon="fa6-solid:fire"
                                    // width="128" height="128" 
                                    className="task-detail-icon m-auto"
                                />
                                <p className = "text-center">Low</p>
                            </div>  
                        )
                    }
                </div>
            </div>    
        </div>  
    )
}

