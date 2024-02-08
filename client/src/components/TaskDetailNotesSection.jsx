import Zoom from '@mui/material/Zoom';

import Tooltip from '@mui/material/Tooltip';
import { useGlobalContext } from '../utils/GlobalState';

export default function TaskDetailNotesSection( ) {

        //Hook to access global context
        const [state, dispatch] = useGlobalContext();  

    return (
        <div className="modal-section bg-filter backdrop:p-5">
            <label className="modal-label w-full"> Notes Section</label>
            <div className="modal-section-divider "> Modal Section Divider
                <div className="modal-field-container">

                    {/* Note display section */}
                    <div>
                        {
                            state.taskDetail.note.map( (note) => {
                                return(
                                    <div key={note.note_id}>
                                        {note.note_dt}
                                        {note.note_author.username}
                                        {note.note_type}
                                        {note.note_text}
                                  
                                    </div>
                                )
                            })
                        }


                    </div>


                    <label className="modal-label w-1/3">Modal Label</label>
                    <div className = "modal-field">
                        Modal Field
                    </div>
                </div>
            </div>
        </div>
    )
}