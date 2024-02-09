import {
    SIDE_MENU,
    USER,
    TASKS,
    USER_SELECT,
    TASK_DETAIL_ID,
    TASK_DETAIL,
    TASK_DETAIL_CREATED_DT,
    TASK_DETAIL_TITLE,
    TASK_DETAIL_STAKEHOLDER,
    TASK_DETAIL_REVIEW_DT,
    TASK_DETAIL_ASSIGNED,
    TASK_DETAIL_SUMMARY,
    TASK_DETAIL_STATUS_MACRO,
    TASK_DETAIL_STATUS_MICRO,
    TASK_DETAIL_BUSINESS_DRIVEN,
    TASK_DETAIL_FOCUS,
    TASK_DETAIL_IMPORTANT,
    TASK_DETAIL_URGENT,
    TASK_DETAIL_EFFORT,
    TASK_DETAIL_CATEGORY,
    TASK_DETAIL_PIPELINE,
    TASK_DETAIL_COMMENT,
    TASK_DETAIL_NOTE,
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {    
        case SIDE_MENU: {
            console.log("SIDE_MENU reducer engaged")
            return {
                ...state,
                sidemenu: action.payload,
            }
        }
        case USER: {
            console.log("USER reducer engaged")
            return {
                ...state,
                user: action.payload,
            }
        }
        case TASK_DETAIL_ID: {
            console.log("TASK_DETAIL_ID reducer engaged")
            return {
                ...state,
                taskDetailId: action.payload,
            }
        }
//-------------------//
//- MY TASK REDUCERS -//
//-------------------//
        case TASKS: {
            console.log("TASK reducer engaged")
            return {
                ...state,
                tasks: action.payload,
            }
        }
        case USER_SELECT: {
            console.log("USER_SELECT reducer engaged")
            return {
                ...state,
                userlist: action.payload,
            }
        }

//---------------------//
//- TASK DETAIL MODAL -//
//---------------------//
        case TASK_DETAIL: {
            console.log("TASK_DETAIL reducer engaged")
            return {
                ...state,
                taskDetail: action.payload,
            }
        }
        case TASK_DETAIL_CREATED_DT: {
            console.log("CREATED_DT reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    created_dt: action.payload,
                }
            }
        }
        case TASK_DETAIL_TITLE: {
            console.log("TASK_DETAIL_TITLE reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    title: action.payload,
                }
            }
        }
        case TASK_DETAIL_STAKEHOLDER: {
            console.log("TASK_DETAIL_STAKEHOLDER reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    stakeholder: action.payload,
                }
            }
        }
        case TASK_DETAIL_REVIEW_DT: {
            console.log("TASK_DETAIL_REVIEW_DT reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    review_dt: action.payload,
                }
            }
        }
        case TASK_DETAIL_ASSIGNED: {
            console.log("TASK_DETAIL_ASSIGNED reducer engaged")
            // Payload provides _id
            // Need to find the username based on _id
            //Then update both the _id and username in state
            // console.log("state", state)
            // console.log("state userlist", state.userlist)
            // console.log ("action payload", action.payload)
            // const assigned = [state.userlist].filter( (a) => a._id === action.payload)
            // console.log("State user", assigned)
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    assigned: action.payload
                }
                        // ...state.taskDetail.assigned,
                        // assigned:: action.payload}
            }
        }        
        case TASK_DETAIL_SUMMARY: {
            console.log("TASK_DETAIL_SUMMARY reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    summary: action.payload,
                }
            }
        }
        case TASK_DETAIL_STATUS_MACRO: {
            console.log("TASK_DETAIL_STATUS_MACRO reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    status_macro: action.payload,
                }
            }
        }
        case TASK_DETAIL_STATUS_MICRO: {
            console.log("TASK_DETAIL_STATUS_MICRO reducer engaged")
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    status_micro: action.payload,
                }
            }
        }
        case TASK_DETAIL_BUSINESS_DRIVEN: {
            console.log("TASK_DETAIL_BUSINESS_DRIVEN reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        business_driven: action.payload.business_driven,
                        focus: action.payload.focus}                    
                }
            }
        }
        
        case TASK_DETAIL_FOCUS: {
            console.log("TASK_DETAIL_FOCUS reducer engaged")
            console.log(action.payload.focus)
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        business_driven: action.payload.business_driven,
                        focus: action.payload.focus}                    
                }
            }
        }

        case TASK_DETAIL_IMPORTANT: {
            console.log("TASK_DETAIL_IMPORTANT reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        important: action.payload,
                    }                    
                }
            }
        }

        case TASK_DETAIL_URGENT: {
            console.log("TASK_DETAIL_URGENT reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        urgent: action.payload,
                    }                    
                }
            }
        }

        case TASK_DETAIL_EFFORT: {
            console.log("TASK_DETAIL_EFFORT reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        high_effort: action.payload,
                    }                    
                }
            }
        }
        case TASK_DETAIL_CATEGORY: {
            console.log("TASK_DETAIL_CATEGORY reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        category: action.payload,
                    }                    
                }
            }
        }
        case TASK_DETAIL_PIPELINE: {
            console.log("TASK_DETAIL_PIPELINE reducer engaged")
            return { 
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    priority: {
                        ...state.taskDetail.priority,
                        pipeline_number: action.payload,
                    }                    
                }
            }
        }
        case TASK_DETAIL_COMMENT: {
            console.log("TASK_DETAIL_COMMENT reducer engaged")
            return { 
                ...state,
                taskDetail: { //access taskDetail level
                    ...state.taskDetail,
                    priority: { //access priority level
                        ...state.taskDetail.priority,
                        comment: action.payload, //attach comment (payload) to comment
                    }                    
                }
            }
        }

        // Task Notes
        case TASK_DETAIL_NOTE: {
            console.log("TASK_DETAIL_NOTE reducer engaged")
            return { 
                ...state,
                taskDetail: {   //access taskDetail level
                    ...state.taskDetail,
                    note: action.payload, //attach payload (array of notes) to note
                }                    
            }
        }
        
       
        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    