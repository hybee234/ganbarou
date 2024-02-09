import { Icon } from '@iconify/react';
import { useGlobalContext } from '../utils/GlobalState';
import Auth from '../utils/auth';

import {    
    NEW_TASK,
    CLEAR_TASK_DETAIL,
} from '../utils/actions'

export default function AddNewTask(props) {

const {userId, userSelect} = props

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    //------------------//
    // Add Task Modal -//
    //------------------//
    const addNewTask = async () => {        
        // Filter userTasks for Task of interest
        // let taskDetailArray = tasks.filter(task => task._id === taskId)
        // let taskDetail = taskDetailArray[0]
        let now = new Date();

        dispatch ({ type: CLEAR_TASK_DETAIL, payload:
            {
                _id:"",
                create_dt: now,
                review_dt: now,                                        
                title: "",
                summary: "",
                stakeholder: "",
                status_macro:"New",
                status_micro:"On Hold",                    
                complete_dt:"",
                complete_flag:"",
                
                note: [{
                    note_author:{
                        _id:"",
                        username: "",
                    },
                    note_dt:"",
                    note_id:"",
                    note_text:"",
                    note_type:"",
                }],
                priority: {
                    priority_id: "",
                    business_driven: true,
                    category: 5,                        
                    focus: false,
                    comment: "",
                    high_effort: false,
                    important: false,
                    pipeline_number: 100,                        
                    urgent: false,
                },
                assigned: {
                    _id : Auth.getProfile().data._id,
                    username: Auth.getProfile().data.username,
                },
            }
        })
        //New_task flag to control downstream components
        // True = add new task
        // False = edit existing task
        await dispatch ({ type: NEW_TASK, payload: true})  
            
        document.getElementById('view-details-modal-background').style.display = 'block'
        document.getElementById('view-details-modal-form').style.display = 'block'
    }

    return (
        <button
            className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
            type="button"
            value="note"
            onClick={()=>addNewTask()}
            >
            <div className="flex align-middle items-center">                          
                    <Icon
                        icon="mdi:file-document-add-outline"
                        width="30" height="30" 
                        className="task-detail-icon m-auto"
                    />
                    <div>&nbsp; Add New Task</div>                                                  
            </div> 
        </button>
    )


}