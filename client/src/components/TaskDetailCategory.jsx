
import { Icon } from '@iconify/react'
import { useGlobalContext } from '../utils/GlobalState';

import {
    TASK_DETAIL_CATEGORY,
} from '../utils/actions'


export default function TaskDetailCategory() {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  


    return(
        <div className="flex">
            <div className="modal-field-container">
            <label className="modal-label">Cat 1</label>
                <div
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        dispatch({ type: TASK_DETAIL_CATEGORY,
                            payload: 1                            
                        })
                    }}
                    >
                    {
                        state.taskDetail.priority.category === 1 ?
                        (
                            <div className="brand text-5xl text-center text-yellow-400">1
                                <Icon
                                    icon="noto:glowing-star"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        ):(
                            <div className="brand text-5xl text-center">1
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        )
                    }                   
                </div> 
            </div>
            
            <div className="modal-field-container">
                <label className="modal-label">Cat 2</label>
                <div
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        dispatch({ type: TASK_DETAIL_CATEGORY,
                            payload: 2                            
                        })
                    }}
                    >
                    {
                        state.taskDetail.priority.category === 2 ?
                        (
                            <div className="brand text-5xl text-center text-yellow-400">2
                                <Icon
                                    icon="fxemoji:lightningmood"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        ):(
                            <div className="brand text-5xl text-center text-gray-400">2
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        )
                    }
                </div> 
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 3</label>
                <div
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        dispatch({ type: TASK_DETAIL_CATEGORY,
                            payload: 3                            
                        })
                    }}
                    >
                    {
                        state.taskDetail.priority.category === 3 ?
                        (
                            <div className="brand text-5xl text-center text-yellow-400">3
                                <Icon
                                    icon="noto:light-bulb"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        ):(
                            <div className="brand text-5xl text-center text-gray-400">3
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        )
                    }
                </div> 
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 4</label>
                <div
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        dispatch({ type: TASK_DETAIL_CATEGORY,
                            payload: 4                            
                        })
                    }}
                    >
                    {
                        state.taskDetail.priority.category === 4 ?
                        (
                            <div className="brand text-5xl text-center text-yellow-400">4
                                <Icon
                                    icon="fxemoji:electrictorch"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        ):(
                            <div className="brand text-5xl text-center text-gray-400">4
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        )
                    }
                </div> 
            </div> 

            <div className="modal-field-container">
                <label className="modal-label">Cat 5</label>
                <div
                    className="border-2 modal-field cursor-pointer"
                    onClick={ () => {
                        dispatch({ type: TASK_DETAIL_CATEGORY,
                            payload: 5                            
                        })
                    }}
                    >
                    {
                        state.taskDetail.priority.category === 5 ?
                        (
                            <div className="brand text-5xl text-center text-yellow-400">5
                                <Icon
                                    icon="noto:candle"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        ):(
                            <div className="brand text-5xl text-center text-gray-400">5
                                <Icon
                                    icon="emojione-v1:cross-mark"
                                    width="25" height="25"
                                    className="task-detail-icon m-auto"
                                />
                            </div>  
                        )
                    }
                </div> 
            </div>             
        </div>   
    )
}

