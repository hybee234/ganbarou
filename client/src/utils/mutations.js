import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
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
                taskCount
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
            updatedAt
        }
    }
`