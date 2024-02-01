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
    }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($book: saveBookInput) {
        saveBook(book: $book) {
            _id
            email
            bookCount
            username
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            bookCount
            email
            username
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;