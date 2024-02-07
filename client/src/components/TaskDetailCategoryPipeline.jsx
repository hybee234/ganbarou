
import { useGlobalContext } from '../utils/GlobalState';

import {
    TASK_DETAIL_CATEGORY,
    TASK_DETAIL_PIPELINE
} from '../utils/actions'


export default function TaskDetailCategoryPipeline() {

    //Hook to access global context
    const [state, dispatch] = useGlobalContext();  



    return(
    
        <div> Ohayo! Gozaimasu </div>
    )
}