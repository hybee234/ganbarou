const { GraphQLScalarType, Kind } = require("graphql");
//import dateScalar from './scalers/date'

const typeDefs = `
    scalar Date  

    type User {
        _id: ID
        username: String
        email: String
        security: String
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
        urgent: Boolean
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

    input assignedUserInput {
        _id: ID
        username: String
    }


    input priorityUserInput {
        pipeline_number: Int
        business_driven: Boolean
        focus: Boolean
        category: Int
        important: Boolean
        urgent: Boolean
        high_effort: Boolean
        comment: String
    }

    type Mutation {
        addUser(username: String! email: String! password: String!): Auth
        login(email: String password: String!): Auth
        completeTask( id: ID!): Task
        removeTaskFromUsers ( id:ID!): User
        updateTaskByTaskId (
            _id: ID!
            created_dt: Date
            review_dt: Date
            title: String
            summary: String
            stakeholder: String
            status_macro: String
            status_micro: String
            assigned: assignedUserInput
            priority: priorityUserInput
        ): Task
    }
`;

module.exports = typeDefs;