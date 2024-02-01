import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
        username
        email
        security
        taskCount
        tasks {
            _id
            created_dt
            title
            summary
            complete_flag
            complete_dt
            remind_dt
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
                operational
                priority
                category
                importance
                urgency
                effort
                comment
            }
            updatedAt
        }
        }
    }
`;
