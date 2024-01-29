import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) {
            token
            user {
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
    }
`;

export const LOG_IN = gql`
    mutation Login($password: String!, $username: String, $email: String) {
        login(password: $password, username: $username, email: $email) {
            token
            user {
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