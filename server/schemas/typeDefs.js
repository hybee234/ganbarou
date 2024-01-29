const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        tasks: [Task]
        taskCount: Int
    }

    type Task {
        _id: ID
        # created_dt: Date
        title: String
        summary: String
        complete_flag: Boolean
        # complete_dt: Date
        # remind_dt: Date
        stakeholder: String
        assigned: String
        status_macro: String
        status_micro: String
        note: [Note]
        priority: [Priority]        
    }

    type Note {
        noteId: ID
        note: String
        author: String
        # note_dt: Date
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
    #    me: User
    }

    # type Mutation {
    #     createUser(username: String! email: String! password: String!): Auth
    #     login(username: String email: String password: String!): Auth
    #     saveBook(book:saveBookInput): User
    #     deleteBook (bookId: String! ): User
    #     deleteBookGraphQl (bookId: String! ): User
    # }


`;

module.exports = typeDefs;