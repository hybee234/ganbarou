const { GraphQLScalarType, Kind } = require("graphql");
//import dateScalar from './scalers/date'

const typeDefs = `
scalar Date  #HL

    type User {
        _id: ID
        username: String
        email: String
        tasks: [Task]
        taskCount: Int
    }

    type Task {
        _id: ID
        created_dt: Date
        title: String
        summary: String
        complete_flag: Boolean
        complete_dt: Date
        remind_dt: Date
        stakeholder: String
        assigned: String
        status_macro: String
        status_micro: String
        note: [Note]
        priority: [Priority]
        #updatedAt is one of the automatic columns added if model has timestamps: true
        updatedAt: Date        
    }

    type Note {
        noteId: ID
        note: String
        author: String
        note_dt: Date
    }

    type Priority {
        priorityId: ID
        operational: Boolean
        priority: Boolean
        category: Int
        importance: String
        urgency: String
        effort: String
        comment: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        tasks: [Task]
    #    me: User
    }

    type Mutation {
        addUser(username: String! email: String! password: String!): Auth
    #    login(username: String email: String password: String!): Auth
    #    saveBook(book:saveBookInput): User
    #    deleteBook (bookId: String! ): User
    #    deleteBookGraphQl (bookId: String! ): User
     }

`;

// Why does VS code think there is nothing to commit?

// Custom Scalar to define Date
// const dateScalar = new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     serialize(value) {
//         if (value instanceof Date) {
//             return value.getTime(); // Convert outgoing Date to integer for JSON
//         }
//         throw Error('GraphQL Date Scalar serializer expected a `Date` object');
//     },

//     parseValue(value) {
//         if (typeof value === 'number') {
//             return new Date(value); // Convert incoming integer to Date
//         }
//         throw new Error('GraphQL Date Scalar parser expected a `number`');
//     },

//     parseLiteral(ast) {
//         if (ast.kind === Kind.INT) {
//             // Convert hard-coded AST string to integer and then to Date
//             return new Date(parseInt(ast.value, 10));
//         }        
//         // Invalid hard-coded value (not an integer)
//         return null;
//     },
// });

module.exports = typeDefs;