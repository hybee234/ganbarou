const { GraphQLScalarType, Kind } = require("graphql");
//import dateScalar from './scalers/date'

const typeDefs = `
scalar Date  #HL

    type User {
        _id: ID
        username: String
        email: String
        security: String
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
        review_dt: Date
        stakeholder: String
        assigned: User
        status_macro: String
        status_micro: String
        note: [Note]
        priority: Priority
        #updatedAt is one of the automatic columns added if model has timestamps: true
        updatedAt: Date        
    }

    type Note {
        note_id: ID
        note_text: String
        note_type: String
        note_author: User
        note_dt: Date
    }

    type Priority {
        priority_id: ID
        pipeline_number: Int
        business_driven: Boolean
        focus: Boolean
        category: Int
        important: Boolean
        urgency: Boolean
        high_effort: Boolean
        comment: String
    }

    type Auth {
        token: ID!
        user: User
    } 

    type Query {
        users: [User]
        tasks: [Task]
        me: User
        tasksByAssignedId(assigned: ID!): [Task]
        taskByTaskId (_id: ID!): Task
    }

    type Mutation {
        addUser(username: String! email: String! password: String!): Auth
        login(email: String password: String!): Auth
        completeTask( id: ID!): Task
        removeTaskFromUsers ( id:ID!): User
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