import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
            _id
            username
            email
            security
        }
    }
`;


export const TASKS_BY_ASSIGNED_ID = gql`
    query TasksByAssignedId($assigned: ID!) {
        tasksByAssignedId(assigned: $assigned) {
            _id
            created_dt
            title
            summary
            complete_flag
            complete_dt
            review_dt
            stakeholder
            assigned {
                _id
                username
            }
            status_macro
            status_micro
            note {
                note_id
                note_author {
                    _id
                    username
                }
                note_dt
                note_text
                note_type
            }
            priority {
                priority_id
                pipeline_number
                business_driven
                focus
                category
                important
                urgent
                high_effort
                comment
            }
        }
    }
`

export const TASK_BY_TASK_ID = gql`
    query TaskByTaskId($id: ID!) {
        taskByTaskId(_id: $id) {
            _id
            created_dt
            title
            summary
            complete_flag
            complete_dt
            review_dt
            stakeholder
            assigned {
                _id
                username
            }
            status_macro
            status_micro
            note {
                note_id
                note_text
                note_type
                note_author {
                    _id
                    username
                }
                note_dt
            }
            priority {
                priority_id
                pipeline_number
                business_driven
                focus
                category
                important
                urgent
                high_effort
                comment
            }
        }
    }
`
export const USER_LIST = gql`
query Users {
    users {
        _id
        username
    }
}
`

export const ALL_TASKS = gql`
    query Tasks {
        tasks {
            _id
            created_dt
            title
            summary
            complete_flag
            complete_dt
            review_dt
            stakeholder
            status_macro
            status_micro
            note {
                note_id
                note_text
                note_type
                note_dt
                note_author {
                    _id
                    username
                }
            }
            priority {
                priority_id
                pipeline_number
                business_driven
                focus
                category
                important
                urgent
                high_effort
                comment
            }
            assigned {
                _id
                username
                email
            }
        }
    }
`