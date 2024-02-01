import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {

    const initialstate = {
        login_email: '',
        login_password: '',
        sidemenu: '',
        user:[],
    }

    const [state, dispatch] = useReducer(reducer, initialstate );

    return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

