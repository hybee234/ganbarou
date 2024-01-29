const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String        
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        me: User
    }

    input saveBookInput {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }


    type Mutation {
        createUser(username: String! email: String! password: String!): Auth
        login(username: String email: String password: String!): Auth
        saveBook(book:saveBookInput): User
        deleteBook (bookId: String! ): User
        deleteBookGraphQl (bookId: String! ): User
    }


`;

module.exports = typeDefs;