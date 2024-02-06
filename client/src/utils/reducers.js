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
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {    
        case SIDE_MENU: {
            return {
                ...state,
                sidemenu: action.payload,
            }
        }
        case USER: {
            console.log("Reducer USER engaged")
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
            console.log("TASK_DETAIL_ID reducer engaged")
            return {
                ...state,
                tasks: action.payload,
            }
        }
        case USER_SELECT: {
            console.log("TASK_DETAIL_ID reducer engaged")
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
            
            return {
                ...state,
                taskDetail: {
                    ...state.taskDetail,
                    assigned: {
                        ...state.taskDetail.assigned,
                        _id: action.payload}
                }
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
        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    