import {
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD,
    SIDE_MENU,
    USER,
    TODAY
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {    
        case SET_LOGIN_EMAIL: {
            return {
                ...state,
                login_email: action.payload,
            };
        }            
        case SET_LOGIN_PASSWORD: {
            return {
                ...state,
                login_password: action.payload,
            };
        }
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
        case TODAY: {
            console.log("Reducer TODAY engaged")
            return {
                ...state,
                today: action.payload,
            }
        }
        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    