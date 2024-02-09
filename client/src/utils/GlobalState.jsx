import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ value = [], ...props }) => {

    const initialstate = {
        sidemenu: true,
        user:[],
        taskDetailId:'',
        taskDetail:{
            assigned: {
                _id :'',
                username: '',
            },
            complete_dt:'',
            complete_flag:'',
            create_dt:'',
            note: [{
                note_author:{
                    _id:"",
                    username: '',
                },
                note_dt:'',
                note_id:'',
                note_text:'',
                note_type:'',
            }],
            priority: {
                business_driven:'',
                category: '',
                comment: '',
                focus: '',
                high_effort: '',
                important: '',
                pipeline_number:'',
                priority_id: '',
                urgent: '',
            },
            review_dt:'',
            stakeholder: '',
            status_macro:'',
            status_micro:'',
            summary:'',
            title:'',
            _id:'',            
        },
        new_task: true,
        tasks:[],
        userlist:[],
        // showHideDetailView:'hide',       
    }

    const [state, dispatch] = useReducer(reducer, initialstate );

    return <Provider value={[state, dispatch]} {...props} />;
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

