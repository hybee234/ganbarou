import {
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD,
    SIDE_MENU,
    USER,
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

        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    