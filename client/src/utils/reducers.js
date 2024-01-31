import {
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD,
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        // Take a copy of existing state and modify the `update_login_username` property (initially an empty string). Used for input field in the UI.
        case SET_LOGIN_EMAIL: {
            return {
                ...state,
                login_email: action.payload,
            };
        }
    
        // Take a copy of existing state and modify the `studentMajor` property (initially an empty string). Used for dropdown field in the UI.
        case SET_LOGIN_PASSWORD: {
            return {
                ...state,
                login_password: action.payload,
            };
        }

        // Default to returning the state as is in our switch statement
        default:
            return state;
    }
}
    