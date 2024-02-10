

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
        <div className="modal-field-container p-1">
            {/* <label className="modal-label"> Value/Effort</label> */}
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
                                            icon="game-icons:burning-forest"                                                        
                                            // width="25" height="25" 
                                            className="task-detail-icon m-auto task-detail-icon-red"
                                        />
                                        <p className = "text-center">Yes</p>
                                    </div>  
                                ):(
                                    <div> 
                                        <Icon                                                        
                                            icon="game-icons:camping-tent"                                                        
                                            // width="25" height="25" 
                                            className="task-detail-icon m-auto task-detail-icon-green"
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
                            arrow placement="top"
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
                                            icon="game-icons:heart-plus"                                                        
                                            // width="25" height="25" 
                                            className="task-detail-icon m-auto task-detail-icon-red"
                                        />
                                        <p className = "text-center">Yes</p>
                                    </div>    
                                ):(
                                    <div>
                                        <Icon                                                        
                                            icon="game-icons:plain-arrow"                                                        
                                            // width="25" height="25" 
                                            className="task-detail-icon m-auto task-detail-icon-green"
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
                            arrow placement="top"
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
                                        icon="game-icons:mountain-road"                                                        
                                        // width="25" height="25" 
                                        className="task-detail-icon m-auto task-detail-icon-red"
                                    />
                                    <p className = "text-center">High</p>
                                </div> 
                            ):(
                                <div>
                                    <Icon                                                        
                                        icon="game-icons:cake-slice"                                                        
                                        // width="25" height="25" 
                                        className="task-detail-icon m-auto task-detail-icon-green"
                                    />
                                    <p className = "text-center">Low</p>
                                </div>  
                            )
                        }
                        </Tooltip>
                    </div>
                </div>    
            </div>
        </div>  
    )
}

