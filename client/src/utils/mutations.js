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
    mutation UpdateTaskByTaskId($id: ID!, $createdDt: Date, $reviewDt: Date, $title: String, $summary: String, $stakeholder: String, $statusMacro: String, $statusMicro: String, $assigned: userInput, $priority: priorityUserInput, $note: noteUserInput) {
        updateTaskByTaskId(_id: $id, created_dt: $createdDt, review_dt: $reviewDt, title: $title, summary: $summary, stakeholder: $stakeholder, status_macro: $statusMacro, status_micro: $statusMicro, assigned: $assigned, priority: $priority, note: $note) {
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
                email
                security
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
                    email
                    security
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