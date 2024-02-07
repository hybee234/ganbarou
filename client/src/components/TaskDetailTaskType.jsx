import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

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
                    <div className="modal-field-container w-full sm:w-1/2 m-auto">
                        <Tooltip title="
                        Tasks are organised into 3 types. Operational ('Tasks' that must be done to keep the business going). 'Focus' (Business driven requests rated as priority, handled after operational tasks are done) and 'Opportunistic' (Business driven tasks that are handled when awaiting external actions on Focus tasks - Lowest priority of the 3 types.)" arrow placement="right">
                        <label className="modal-label w-1/3">Task Type</label>
                        </Tooltip>
                        <div className="flex border-2 modal-field justify-center">
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
                        <div className = "text-center">
                            { 
                                state.taskDetail.priority.business_driven ?
                                (
                                    state.taskDetail.priority.focus ? 
                                    (
                                        <div>
                                            <p className = "modal-label"> Focus Task Type </p>
                                            <p className = "modal-label"> Business Driven/High Priority </p>
                                        </div>
                                    ):(
                                        <div>
                                            <p className = "modal-label"> Focus Task Type </p>
                                            <p className = "modal-label"> (Business Driven/Low Priority) </p>                                            
                                        </div>
                                    )                                    
                                ):(
                                    <div>
                                        <p className = "modal-label"> Operational Task Type </p>
                                        <p className = "modal-label"> (Maintenance/Incidents) </p>
                                        <p className = "modal-label text-red-400"> Operational Tasks are Exempt from Prioritisation </p>
                                    </div>
                                )                                    
                            }
                        </div>
                    </div>                        
    )

}
    