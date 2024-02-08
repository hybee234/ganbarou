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
    TASK_DETAIL_NOTE,
    TASK_DETAIL,
} from '../utils/actions'

export default function TaskDetailNotesSection( ) {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  
    const [ newNote, setNewNote] = useState('')

    //Update newNote as New Note is being typed out
    const handleInputChange = (e) => {
        const {value} = e.target
        setNewNote(value)
    }

    //-------------------------//
    //- Auto-Expand TextArea  -//
    //-------------------------//
    const expandArea = (e) => {
        //Expands TextArea on input to a maximum of 200px height
        var textarea = e.target
        var heightLimit = 200; /* Maximum height: 200px */
        textarea.style.height = ""; /* Reset the height*/
        textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
        };

    //---------------------//
    //- ADD NOTE MUTATION -//
    //---------------------//

    //useMutation hook
    const [AddNote, { error }] = useMutation(ADD_NOTE);

    const addNewNote = async (event) => {
        console.log ("addNewNote engaged") 
        if (!newNote) {
            toast.error("Cannot submit an empty note")

        } else {
        
            try {    
                const { data } = await AddNote({
                    variables: {
                        noteUserInput: {
                            note_text: newNote,
                            note_type: "Progress Note"
                        },
                        taskId: state.taskDetail._id,
                    }
                });

                // console.log("***data", data)
                // console.log("***data.addnote", data.addNote)
                await dispatch({ type: TASK_DETAIL_NOTE, payload: data.addNote.note })
                console.log("***Post_dispatch", state.taskDetail)                
                toast.success(`Note added!`) 
                setNewNote('')
            } catch (error) {
                console.log(JSON.stringify(error, null, 2)); //Much better error reporting for GraphQl issues
                toast.error("Couldn't add note - something went wrong") 
            }
        }
    }

    return (
        <div className="modal-section bg-filter p-5">
            <h2 className="block cherry-font w-full"> Notes </h2>   

            <div className="modal-section-divider w-full">
                <div className=" ">
                    {/* Note display section */}                
                        {
                            state.taskDetail.note && state.taskDetail.note.map( (note) => {
                                return(
                                    <div key={note.note_id} className ="modal-field justify-center my-1 ">
                                        <div className="note-container">
                                            <div className="note-details">                                                
                                            { note.note_author.username ?
                                                (
                                                    <div className="px-1">{dayjs(note.note_dt).format('DD/MM/YY, HHmm')}hrs. {note.note_author.username}</div>
                                                ):( 
                                                    <div>Oops</div>
                                                )} 
                                            </div>
                                            <div className="note-text">
                                                {note.note_text}
                                            </div>
                                        </div>                                        
                                    </div>
                                )
                            })
                        }
                </div>
            </div>

            <div className="modal-section-divider w-full">
                {/* <label className="modal-label">Add new Note</label> */}
                    <textarea
                        className="w-full modal-field"
                        name="note-text"
                        type="text"
                        placeholder="Type in your new note here"
                        rows="4"
                        cols="30"
                        value={newNote}
                        onInput={(e) => expandArea(e)}
                        onChange= {handleInputChange}
                        >
                    </textarea>
                    <button
                        className="px-6 py-2 m-2 font-bold duration-200 ease-in-out button-color"
                        type="button"
                        value="note"
                        onClick={()=>addNewNote()}
                        >
                        <div className="flex align-middle items-center">                          
                                <Icon
                                    icon="mdi:file-document-add-outline"
                                    width="30" height="30" 
                                    className="task-detail-icon m-auto"
                                />
                                <div>&nbsp; Add Note</div>                                                  
                        </div> 
                    </button>
            </div>            
        </div>
    )
}