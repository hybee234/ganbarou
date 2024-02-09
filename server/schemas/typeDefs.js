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

    input userInput {
        _id: ID
        username: String
        email: String
        security: String
    }


    input priorityUserInput {
        business_driven: Boolean
        focus: Boolean        
        important: Boolean
        urgent: Boolean
        high_effort: Boolean
        category: Int
        pipeline_number: Int
        comment: String
    }

    input noteUserInput {
        note_dt: Date
        note_author: userInput
        note_type: String
        note_text: String
        _id: ID
    }

    type Mutation {
        addUser(username: String! email: String! password: String!): Auth
        login(email: String password: String!): Auth
        completeTask( id: ID!): Task

        assignUser (taskId: ID! assigned: userInput): Task
        
        updateTaskByTaskId (
            taskId: ID!
            created_dt: Date
            review_dt: Date
            title: String
            summary: String
            stakeholder: String
            status_macro: String
            status_micro: String
            priority: priorityUserInput
            note: noteUserInput
        ): Task

        updateReviewDtFromTaskList (taskId:ID!, review_dt: Date): Task

        addNote(noteUserInput: noteUserInput, taskId:ID!): Task
    }
`;

module.exports = typeDefs;