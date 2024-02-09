import { useState } from 'react'
import { Icon } from '@iconify/react';
import { useGlobalContext } from '../utils/GlobalState';
import dayjs from 'dayjs'

import { useMutation } from '@apollo/client';
import { ADD_NOTE } from './../utils/mutations';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import Auth from '../utils/auth';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {    
    NEW_TASK,
    CLEAR_TASK_DETAIL,
} from '../utils/actions'


export default function AddNewTask(props) {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    //------------------//
    // View Task Modal -//
    //------------------//
    const addNewTask = () => {        
        // Filter userTasks for Task of interest
        // let taskDetailArray = tasks.filter(task => task._id === taskId)
        // let taskDetail = taskDetailArray[0]
        let now = new Date();
        
        const today = () => {
            return  (new Date().getFullYear() + '-' + ('0' + (new Date().getMonth()+1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2));
        }

        //ad a flag in here to say new or not - then downstream components can use it .... ....
        dispatch ({ type: CLEAR_TASK_DETAIL, payload:
            {
                assigned: {
                    _id : Auth.getProfile().data._id,
                    username: '',
                },
                complete_dt:'',
                complete_flag:'',
                create_dt: now,
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
                    pipieline_number:'',
                    priority_id: '',
                    urgency: '',
                },
                review_dt: now,
                stakeholder: '',
                status_macro:'',
                status_micro:'',
                summary:'',
                title:'',
                _id:'',
            }
        })
        dispatch ({ type: NEW_TASK, payload: true})

        // Might need to dispatch something to clear state.taskDetail

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