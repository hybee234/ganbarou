import { gql } from '@apollo/client';

export const GET_ME = gql`
    query GetMe {
        me {
            username
            _id
            email
            bookCount
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
