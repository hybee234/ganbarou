import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                security
            }
        }
    }
`;

export const LOG_IN = gql`
    mutation Login($password: String!, $email: String) {
        login(password: $password, email: $email) {
            token
            user {
                _id
                username
                email
                security
            }
        }
    }
`;

export const COMPLETE_TASK = gql`
    mutation CompleteTask($id: ID!) {
        completeTask(id: $id) {
            _id
            created_dt
            title
            summary
            complete_flag
            complete_dt
            assigned {
                _id
                username
            }
        }
    }
`

export const UPDATE_TASK_BY_TASK_ID = gql`
    mutation Mutation($createdDt: Date, $reviewDt: Date, $title: String, $summary: String, $stakeholder: String, $statusMacro: String, $statusMicro: String, $priority: priorityUserInput, $note: noteUserInput, $taskId: ID!) {
        updateTaskByTaskId(created_dt: $createdDt, review_dt: $reviewDt, title: $title, summary: $summary, stakeholder: $stakeholder, status_macro: $statusMacro, status_micro: $statusMicro, priority: $priority, note: $note, taskId: $taskId) {
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

export const ASSIGN_USER = gql`
    mutation AssignUser($taskId: ID!, $assigned: userInput) {
        assignUser(taskId: $taskId, assigned: $assigned) {
            _id
            created_dt
            title
            assigned {
                _id
                username
                email
                security
            }
            status_macro
            status_micro
            note {
                note_author {
                _id
                }
            }
            priority {
                business_driven
            }
        }
    }
`

export const ADD_NOTE = gql`
    mutation AddNote($noteUserInput: noteUserInput, $taskId: ID!) {
        addNote(noteUserInput: $noteUserInput, taskId: $taskId) {
            _id
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
        }
    }
`

export const UPDATE_REVIEW_DATE_FROM_TASKLIST = gql`
    mutation UpdateReviewDtFromTaskList($taskId: ID!, $reviewDt: Date) {
        updateReviewDtFromTaskList(taskId: $taskId, review_dt: $reviewDt) {
            _id
            review_dt
            title
            summary
            created_dt
            complete_flag
            complete_dt
        }
    }
`

export const ADD_TASK = gql`
    mutation Mutation($createdDt: Date, $reviewDt: Date, $title: String, $summary: String, $stakeholder: String, $statusMacro: String, $statusMicro: String, $priority: priorityUserInput, $assigned: userInput) {
        addTask(created_dt: $createdDt, review_dt: $reviewDt, title: $title, summary: $summary, stakeholder: $stakeholder, status_macro: $statusMacro, status_micro: $statusMicro, priority: $priority, assigned: $assigned) {
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