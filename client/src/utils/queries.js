import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
            _id
            username
            email
            security
            tasks {
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
                    urgency
                    high_effort
                    comment
                }
                updatedAt
            }
        taskCount
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
                urgency
                high_effort
                comment
            }
            updatedAt
        }
    }
`