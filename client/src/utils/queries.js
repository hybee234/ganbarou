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
                assigned_id
                status_macro
                status_micro
                note {
                    note_id
                    note_text
                    note_type
                    note_author
                    note_dt
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
