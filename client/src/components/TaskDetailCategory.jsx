import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

import { Icon } from '@iconify/react'
import { useGlobalContext } from '../utils/GlobalState';

import {
    TASK_DETAIL_CATEGORY,
} from '../utils/actions'


export default function TaskDetailCategory() {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  


    return(
        <div className="flex justify-center">
            <div className="modal-field-container">
            <label className="modal-label">Cat 1</label>
                
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">CAT 1</div>                                    
                            <div className="tooltip-string">Urgent, High Value - Critical Initiatives.</div>                                    
                            <div className="tooltip-string">Critical enterprise risk to business without immediate attention</div>
                        </div>}
                    arrow placement="top"
                    enterDelay="500"
                    // enterNextDelay="500"
                    followCursor="true"
                >
                    <div
                        className="border-2 modal-field cursor-pointer"
                        onClick={ () => {
                            dispatch({ type: TASK_DETAIL_CATEGORY,
                                payload: 1                            
                            })
                        }}
                        >
                        
                            {
                                state.taskDetail.priority.category === 1 ?
                                (
                                    <div className="cherry-font text-5xl text-center text-red-400">1
                                        <Icon
                                            icon="teenyicons:skull-solid"
                                            width="25" height="25"
                                            className="task-detail-icon m-auto"
                                        />
                                    </div>  
                                ):(
                                    <div className="cherry-font text-5xl text-center text-gray-400">1
                                        <Icon
                                            icon="ant-design:stop-outlined"
                                            width="25" height="25"
                                            className="task-detail-icon m-auto"
                                        />
                                    </div>  
                                )
                            } 
                                        
                    </div> 
                </Tooltip> 
            </div>
            
            <div className="modal-field-container">
                <label className="modal-label">Cat 2</label>
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">CAT 2</div>                                    
                            <div className="tooltip-string">Urgent, High Value - Must Have.</div>                                    
                            <div className="tooltip-string">Major initiatives, typically strategic in nature</div>
                        </div>}
                    arrow placement="top"
                    enterDelay="500"
                    // enterNextDelay="500"
                    followCursor="true"
                >
                    <div
                        className="border-2 modal-field cursor-pointer"
                        onClick={ () => {
                            dispatch({ type: TASK_DETAIL_CATEGORY,
                                payload: 2                            
                            })
                        }}
                        >
                        {
                            state.taskDetail.priority.category === 2 ?
                            (
                                <div className="cherry-font text-5xl text-center text-orange-400">2
                                    <Icon
                                        icon="fxemoji:lightningmood"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            ):(
                                <div className="cherry-font text-5xl text-center text-gray-400">2
                                    <Icon
                                        icon="ant-design:stop-outlined"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            )
                        }
                    </div> 
                </Tooltip>
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 3</label>
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">CAT 3</div>                                    
                            <div className="tooltip-string">Not-urgent, High Value - Should Have</div>                                    
                            <div className="tooltip-string">Moderate initiatives, supports part of business</div>
                        </div>}
                    arrow placement="top"
                    enterDelay="500"
                    // enterNextDelay="500"
                    followCursor="true"
                >
                    <div
                        className="border-2 modal-field cursor-pointer"
                        onClick={ () => {
                            dispatch({ type: TASK_DETAIL_CATEGORY,
                                payload: 3                            
                            })
                        }}
                        >
                        {
                            state.taskDetail.priority.category === 3 ?
                            (
                                <div className="cherry-font text-5xl text-center text-yellow-400">3
                                    <Icon
                                        icon="noto:light-bulb"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            ):(
                                <div className="cherry-font text-5xl text-center text-gray-400">3
                                    <Icon
                                        icon="ant-design:stop-outlined"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            )
                        }
                    </div> 
                </Tooltip>
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 4</label>
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">CAT 4</div>                                    
                            <div className="tooltip-string">Not-urgent, Low Value, Low effort - Could Have</div>                                    
                            <div className="tooltip-string">Low impact to business as a whole, non critical</div>
                        </div>}
                    arrow placement="top"
                    enterDelay="500"
                    // enterNextDelay="500"
                    followCursor="true"
                >
                    <div
                        className="border-2 modal-field cursor-pointer"
                        onClick={ () => {
                            dispatch({ type: TASK_DETAIL_CATEGORY,
                                payload: 4                            
                            })
                        }}
                        >
                        {
                            state.taskDetail.priority.category === 4 ?
                            (
                                <div className="cherry-font text-5xl text-center text-green-400">4
                                    <Icon
                                        icon="fluent-emoji:deciduous-tree"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            ):(
                                <div className="cherry-font text-5xl text-center text-gray-400">4
                                    <Icon
                                        icon="ant-design:stop-outlined"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            )
                        }
                    </div>
                </Tooltip> 
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 5</label>
                <Tooltip
                    title={
                        <div className="tooltip">                                            
                            <div className="tooltip-string">CAT 5</div>                                    
                            <div className="tooltip-string">Not-urgent, Low Value, High effort - Nice to have</div>                                    
                            <div className="tooltip-string">Effort outweights value</div>
                        </div>}
                    arrow placement="top"
                    enterDelay="500"
                    // enterNextDelay="500"
                    followCursor="true"
                >
                    <div
                        className="border-2 modal-field cursor-pointer"
                        onClick={ () => {
                            dispatch({ type: TASK_DETAIL_CATEGORY,
                                payload: 5                            
                            })
                        }}
                        >
                        {
                            state.taskDetail.priority.category === 5 ?
                            (
                                <div className="cherry-font text-5xl text-center text-blue-400">5
                                    <Icon
                                        icon="noto:ice"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            ):(
                                <div className="cherry-font text-5xl text-center text-gray-400">5
                                    <Icon
                                        icon="ant-design:stop-outlined"
                                        width="25" height="25"
                                        className="task-detail-icon m-auto"
                                    />
                                </div>  
                            )
                        }
                    </div> 
                </Tooltip>
            </div>             
        </div>   
    )
}

