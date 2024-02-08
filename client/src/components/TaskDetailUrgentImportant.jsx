

import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

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
        <div className="flex justify-center">
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

                    <Tooltip
                        title={
                            <div className="tooltip">                                            
                                <div className="tooltip-string">URGENT</div>                                    
                                <div className="tooltip-string">How time critical is this request? Determined by Enterprise Risk Assessment.</div>                                    
                                <div className="tooltip-string"></div>
                            </div>}
                        arrow placement="top"
                        enterDelay={500}
                        enterNextDelay={500}
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 200 }}
                        // followCursor
                    >
                        {
                            state.taskDetail.priority.urgent ?
                            (
                                <div>
                                    <Icon
                                        // icon="noto:fire"
                                        icon="emojione-v1:fire"
                                        // width="128" height="128" 
                                        className="task-detail-icon m-auto"
                                    />
                                    <p className = "text-center">Yes</p>
                                </div>  
                            ):(
                                <div> 
                                    <Icon
                                        // icon="fluent-emoji-flat:sloth"
                                        icon="streamline-emojis:turtle"
                                        // width="128" height="128" 
                                        className="task-detail-icon m-auto"
                                    /> 
                                    <p className = "text-center">No</p>
                                </div>  
                            )
                        }
                    </Tooltip>
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
                    
                    <Tooltip
                        title={
                            <div className="tooltip">                                            
                                <div className="tooltip-string">IMPORTANT</div>                                    
                                <div className="tooltip-string">Is this request of high value and impact to business risks/benefits?</div>                                    
                                <div className="tooltip-string"></div>
                            </div>}
                        enterDelay={500}
                        enterNextDelay={500}
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 200 }}
                        // followCursor
                    >
                        {
                            state.taskDetail.priority.important ?
                            (
                                <div> 
                                    <Icon
                                        icon="noto:crown"
                                        // width="128" height="128" 
                                        className="task-detail-icon m-auto"
                                    />
                                    <p className = "text-center">Yes</p>
                                </div>    
                            ):(
                                <div>
                                    <Icon
                                        icon="noto-v1:down-arrow"
                                        // width="128" height="128" 
                                        className="task-detail-icon m-auto"
                                    /> 
                                    <p className = "text-center">No</p>
                                </div>  
                            )
                        }
                    </Tooltip>
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
                
                    <Tooltip
                        title={
                            <div className="tooltip">                                            
                                <div className="tooltip-string">EFFORT</div>                                    
                                <div className="tooltip-string">Judgement call on effort required to meet business request</div>                                    
                                <div className="tooltip-string"></div>
                            </div>}
                        enterDelay={500}
                        enterNextDelay={500}
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 200 }}
                        // followCursor
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
                    </Tooltip>
                </div>
            </div>    
        </div>  
    )
}

