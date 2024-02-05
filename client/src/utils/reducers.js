import {
    // SET_LOGIN_EMAIL,
    // SET_LOGIN_PASSWORD,
    SIDE_MENU,
    USER,
    TASK_DETAIL_ID,
    TASK_DETAIL,
    TASK_DETAIL_CREATED_DT,
    TASK_DETAIL_TITLE,
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {    
        // case SET_LOGIN_EMAIL: {
        //     return {
        //         ...state,
        //         login_email: action.payload,
        //     };
        // }            
        // case SET_LOGIN_PASSWORD: {
        //     return {
        //         ...state,
        //         login_password: action.payload,
        //     };
        // }
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

        // case USER_TASKS: {
        //     console.log("Reducer USER_TASKS engaged")
        //     return {
        //         ...state,
        //         tasks: action.payload,
        //     }
        // }
        case TASK_DETAIL_ID: {
            console.log("TASK_DETAIL_ID reducer engaged")
            return {
                ...state,
                taskDetailId: action.payload,
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
        


        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    