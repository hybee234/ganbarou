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
mutation Mutation($id: ID!, $createdDt: Date, $reviewDt: Date, $title: String, $summary: String, $stakeholder: String, $assigned: assignedUserInput, $priority: priorityUserInput) {
    updateTaskByTaskId(_id: $id, created_dt: $createdDt, review_dt: $reviewDt, title: $title, summary: $summary, stakeholder: $stakeholder, assigned: $assigned, priority: $priority) {
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
        business_driven
        focus
        important
        urgent
      }
    }
  }
`