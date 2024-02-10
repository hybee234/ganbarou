import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


import { SiTarget } from "react-icons/si";
import { FaTools } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

import { useGlobalContext } from '../utils/GlobalState';
import dayjs from 'dayjs'

import {
    TASK_DETAIL_BUSINESS_DRIVEN,
    TASK_DETAIL_FOCUS
} from '../utils/actions'

    //---------------------//
    //- Data Manipulation -//
    //---------------------//
    let now = new Date();

    // console.log("TaskDetailModal Component: userSelect:", userSelect)

export default function TaskDetailTaskType() {
    
    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    return (
                //*********************//
                //* Task Type selector //
                //*********************//
                    <div className="modal-field-container m-auto">
                        
                        <label className="modal-label w-1/3">Assign Task Type*</label>

                        <Tooltip

                            title={
                                <div className="tooltip">                                            
                                    <div className="tooltip-string"><b>* Operational:</b> Tasks that must be carried out to maintain BAU (e.g. Monitoring, auditing, content updates, incidents).</div>                                    
                                    <div className="tooltip-string"><b>* Focus:</b> Business driven initiatives rated as priority, handled after operational tasks are done.</div>                                    
                                    <div className="tooltip-string"><b>* Opportunistic:</b> Business driven initiatives. Lowest priority - handled only when awaiting Operattional and Focus tasks are awaiting external actions.</div>
                                </div>}                            
                            arrow placement="top"
                            enterDelay={500}
                            enterNextDelay={500}
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 200 }}
                            // followCursor
                            
                        >
                            <div className="flex border-2 modal-field justify-center w-2/3 sm:w-1/2  m-auto">
                                { //first checkpoint
                                    state.taskDetail.priority.business_driven ? 
                                    ( // Business driven request
                                        <div className="flex">                                        
                                            <FaTools
                                                color="grey"
                                                className="task-detail-icon cursor-pointer"
                                                onClick={ () => {
                                                    dispatch({ type: TASK_DETAIL_BUSINESS_DRIVEN,
                                                        payload: {
                                                            business_driven: false,
                                                            focus: false
                                                        }
                                                    })
                                                }}
                                            /> 
                                        { //Check if Focus or opportunistic
                                            state.taskDetail.priority.focus ?
                                            (
                                                <div className="flex">
                                                    {// is review date passed?
                                                        dayjs(now).isAfter(dayjs(state.taskDetail.review_dt)) ?
                                                        (
                                                            <div>
                                                                <SiTarget color="red" className="task-detail-icon cursor-pointer" />
                                                            </div>
                                                        ):(
                                                            <div>
                                                                <SiTarget color="green" className="task-detail-icon cursor-pointer" />
                                                            </div>
                                                        )
                                                    }

                                                    <FaClock
                                                        color="grey"
                                                        className="task-detail-icon cursor-pointer"
                                                        onClick={() => {
                                                            dispatch({ type: TASK_DETAIL_FOCUS,
                                                                payload: {
                                                                    business_driven: true,
                                                                    focus: false
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            ):(
                                                <div className="flex">
                                                    <SiTarget
                                                        color="grey"
                                                        className="task-detail-icon cursor-pointer"                                
                                                        onClick={ () => {
                                                            dispatch({ type: TASK_DETAIL_FOCUS,
                                                                payload: {
                                                                    business_driven: true,
                                                                    focus: true
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    {// is review date passed?
                                                        dayjs(now).isAfter(dayjs(state.taskDetail.review_dt)) ?
                                                        (
                                                            <div>
                                                                <FaClock color="red" className="task-detail-icon cursor-pointer" />
                                                            </div>
                                                        ):(
                                                            <div>
                                                                <FaClock color="green" className="task-detail-icon cursor-pointer" />
                                                            </div>
                                                        )
                                                    }
                                                </div>   
                                            )
                                        }
                                        </div>
                                        
                                    ):(
                                        //Not a business driven request (Operationa; Active)
                                        <div>
                                            { 
                                                <div className="flex">                             
                                                    {// is review date passed?
                                                        dayjs(now).isAfter(dayjs(state.taskDetail.review_dt)) ?
                                                        (
                                                            <div>
                                                                <FaTools color="red" className="task-detail-icon cursor-pointer" />
                                                            </div>
                                                        ):(
                                                            <div>
                                                                <FaTools color="green" className="task-detail-icon cursor-pointer" />                                                            
                                                            </div>
                                                            
                                                        )
                                                    }
                                                    <SiTarget
                                                        color="grey"
                                                        className="task-detail-icon cursor-pointer"                                
                                                        onClick={ () => {
                                                            dispatch({ type: TASK_DETAIL_FOCUS,
                                                                payload: {
                                                                    business_driven: true,
                                                                    focus: true
                                                                }
                                                            })
                                                        }}
                                                    />
                                                    <FaClock
                                                    color="grey"
                                                    className="task-detail-icon cursor-pointer"
                                                    onClick={() => {
                                                        dispatch({ type: TASK_DETAIL_FOCUS,
                                                            payload: {
                                                                business_driven: true,
                                                                focus: false
                                                            }
                                                        })
                                                    }}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </Tooltip>
                        <div className = "text-center">
                            { 
                                state.taskDetail.priority.business_driven ?
                                (
                                    state.taskDetail.priority.focus ? 
                                    (
                                        <div>
                                            <p className = "modal-label"> Focus </p>
                                            <p className = "modal-label"> Business Driven/High Priority </p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className = "modal-label"> Opportunistic </p>
                                            <p className = "modal-label"> (Business Driven/Low Priority) </p>                                            
                                        </div>
                                    )                                    
                                ):(
                                    <div>
                                        <p className = "modal-label"> Operational </p>
                                        <p className = "modal-label"> (Maintenance/Incidents) </p>
                                        <p className = "modal-label text-red-400"> Operational Tasks are Exempt from Prioritisation </p>
                                    </div>
                                )                                    
                            }
                        </div>
                    </div>                        
    )

}
    