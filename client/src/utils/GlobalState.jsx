import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const TaskContext = createContext();
const { Provider } = TaskContext;

const TaskProvider = ({ value = [], ...props }) => {

    const initialstate = {
        login_email: '',
        login_password: '',
        cartOpen: false,
        categories: [],
        currentCategory: '',
    }

    const [state, dispatch] = useReducer(reducer, initialstate );

    return <Provider value={[state, dispatch]} {...props} />;
};

const useTaskContext = () => {
    return useContext(TaskContext);
};

export { TaskProvider, useTaskContext };


// import { createContext, useContext, useReducer } from "react";
// import reducer from './reducers'


// // Create TaskContext using createContext
// export const TaskContext = createContext();

// // Create custom hook that allows easy access to TaskContext Values
// export const useTask = () => useContext(TaskContext)

// //create Task provider. Accepts argument of "protps"

// export default function TaskProvider(props) {
//     const login = "test"
//     //Set up useReducer hook. Accepts two arguments - reducer and initial state
//     const initialState = { login }
//     const [state, dispatch] = useReducer(reducer, initialState);
//     return <TaskContext.Provider value={[state, dispatch]} {...props} />
// }