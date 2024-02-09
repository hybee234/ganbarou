import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Icon } from '@iconify/react';

import { useGlobalContext } from '../utils/GlobalState';
import TaskDetailUrgentImportant from '../components/TaskDetailUrgentImportant';
import TaskDetailCategory from '../components/TaskDetailCategory';


import {
    TASK_DETAIL_COMMENT,
    TASK_DETAIL_PIPELINE
} from '../utils/actions'

export default function TaskDetailPrioritisation() {
    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  

    //---------------------//
    //- Expand Text Area  -//
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
        <div>
            {
                state.taskDetail.priority.business_driven === true ?
                (
                    <div>
                    <h2 className="block cherry-font w-full"> Prioritisation</h2> 
                        <div className="modal-section bg-filter p-5 justify-center flex">
                            <div className="modal-section-divider flex flex-wrap justify-center">
                                {/* Urgency/Importance*/}
                                <div className="modal-section-divider flex flex-wrap justify-center">
                                    <div className="">
                                        <TaskDetailUrgentImportant />
                                    </div>
                                    <div className="">
                                        <TaskDetailCategory/>
                                    </div>
                                </div>

                                {/* Comment*/}
                                <div className="modal-section-divider flex flex-wrap justify-center">

                                    <div className="modal-field-container p-1">
                                        <label className="modal-label">Prioritisation Notes</label>
                                        <Tooltip
                                            title={
                                                <div className="tooltip">                                            
                                                    <div className="tooltip-string">Comments pertaining to prioritisation Only</div>                                    
                                                    <div className="tooltip-string"></div>                                      
                                                </div>}
                                            arrow placement="bottom"
                                            enterDelay={500}
                                            enterNextDelay={500}
                                            TransitionComponent={Zoom}
                                            TransitionProps={{ timeout: 200 }}
                                            // followCursor
                                        >
                                            <textarea
                                                className="modal-field "
                                                name="status-summary"
                                                type="text"
                                                placeholder="Summary"
                                                rows="3"
                                                cols="30"
                                                value={state.taskDetail.priority.comment}
                                                onInput={(e) => expandArea(e)}
                                                onChange= {(e) =>
                                                    dispatch({ type: TASK_DETAIL_COMMENT, payload: e.target.value})}
                                                >
                                            </textarea>
                                        </Tooltip>
                                    </div>

                                    <div className="modal-field-container p-1">
                                        <label className="modal-label "> Pipeline Number</label>
                                        <Tooltip
                                            title={
                                                <div className="tooltip">                                            
                                                    <div className="tooltip-string">Agreed Sequence of Business Initiatives</div>
                                                    <div className="tooltip-string">This should be reviewed frequently in case business priorities change</div>                                     
                                                </div>}
                                            enterDelay={500}
                                            enterNextDelay={500}
                                            TransitionComponent={Zoom}
                                            TransitionProps={{ timeout: 200 }}
                                            // followCursor
                                        >
                                            <input
                                                id="pipeline-number"
                                                className="modal-field text-center cherry-font"                                        
                                                type="number"
                                                inputMode="number"
                                                step="1"
                                                value={state.taskDetail.priority.pipeline_number}
                                                onChange= {(e) =>
                                                    dispatch({ type: TASK_DETAIL_PIPELINE, payload: e.target.value})}
                                                >
                                            </input>                                
                                        </Tooltip>
                                    </div>
                                </div>           
                            </div> 
                        </div> 
                    </div>
                ):(
                    <div></div>
                )
            }
        </div>
    )
}