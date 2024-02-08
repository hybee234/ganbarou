import { useState } from 'react'

import { useGlobalContext } from '../utils/GlobalState';
import { TASK_DETAIL_NOTE_TEXT } from '../utils/actions'
import dayjs from 'dayjs'

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';


export default function TaskDetailNotesSection( ) {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  
    const [ newNote, setNewNote] = useState('')
    //sort notes in order

const handleInputChange = (e) => {
    const {value} = e.target
    setNewNote(value)
    console.log(newNote)
}

    // dispatch({ type: TASK_DETAIL_NOTE_TEXT, payload: e.target.value})}

    //---------------------//
    //- Expand TextArea  -//
    //---------------------//
    const expandArea = (e) => {
        //Expands TextArea on input to a maximum of 200px height
        // console.log(e.target)
        var textarea = e.target
        var heightLimit = 200; /* Maximum height: 200px */
        textarea.style.height = ""; /* Reset the height*/
        textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
        };


    return (
        <div className="modal-section bg-filter p-5">
            <h2 className="block cherry-font w-full"> Notes </h2>   

            <div className="modal-section-divider w-full">
                <div className=" ">
                    {/* Note display section */}                
                        {
                            state.taskDetail.note.map( (note) => {
                                return(
                                    <div key={note.note_id} className ="modal-field justify-center my-1 ">
                                        <div className="note-container">
                                            <div className="note-details">                                                
                                                <div className="px-1">{dayjs(note.note_dt).format('DD/MM/YY, HHmm')}hrs. {note.note_author.username} </div>
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
                <label className="modal-label w-1/3">Add new Note</label>
                    <textarea
                        className="w-full modal-field"
                        name="note-text"
                        type="text"
                        placeholder="Type a new note here"
                        rows="4"
                        cols="30"
                        value={newNote}
                        onInput={(e) => expandArea(e)}
                        onChange= {handleInputChange}
                            
                        >
                    </textarea>
                    <button className="w-20 px-2 py-1 m-1 text-sm font-bold button-color" type="submit" value="submit"> Add Note </button>
            </div>
            
        </div>
    )
}