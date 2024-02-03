// Define the query and mutation functionality to work with the Mongoose models.
const { User, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {

    Query: {
        users: async () => {

            console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Users │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            return User.find()
        },

        tasks: async () => {

            console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Tasks │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            return Task.find()
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .exec()
        },

        me: async (parent, args, context) => {

            console.log (`\x1b[33m ┌─────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find Me - Active Tasks  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └─────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("context.user Find me", context.user)
            console.log("user._id", context.user._id)

            if (!context.user){
                throw AuthenticationError;
            }

            const myData = await User.findOne({ _id: context.user._id })
                .populate({
                    path: 'tasks',
                    // match: { complete_flag: false }
                }).exec()

            // console.log(myData)
            return myData;            
        },

        tasksByAssignedId: async (parent,args) => {

            console.log (`\x1b[33m ┌───────────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Tasks by Assigned ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("assigned:", args.assigned)

            // Find all tasks by assigned user ID
            const userTasks = await Task.find({ assigned: args.assigned})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .exec()

            return userTasks
        },


    },


    Mutation: {
        addUser : async (parent, args) => {

            console.log (`\x1b[33m ┌───────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Add User  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            const user = await User.create(args)
            const token = signToken(user)            
            return { token, user }
        },

        login : async (parent, args) => {
            
            console.log (`\x1b[33m ┌───────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Login │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            // Check User Exist
            const user = await User.findOne({                
                email: args.email,                
            });

            if (!user) {
                throw AuthenticationError;
            }

            // Check Password Correct
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            //Create JWT Token
            const token = signToken(user)            
            return { token, user }
        },
        
        completeTask: async (parent, args) => {
            
            console.log (`\x1b[33m ┌───────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Complete Task │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("taskId", args.id)
            // Complete Task document (updates complete date to now)
            const task = await Task.findOneAndUpdate( 
                { _id: args.id },        //filter
                {   //update
                    complete_flag: true,
                    complete_dt: Date.now(),
                    // summary: "test change",
                    // $set: { assigned: ["65bcf3966dc8d7dc861b5403"] },   // Remove User from assigned - not working ... 
                    // $pullAll: { assigned: }
                    // $set: {assigned: []}
                    // $pull: {assigned}, 
                },
                { new: true }           // return doc                
            );

            // Remove Task ID from all User documents
            const user = await User.updateMany(
                {  },
                { $pull: { tasks: args.id }},
                { new: true}
            )

            // return user
            // console.log (user)

            return task   
        },

        removeTaskFromUsers: async (parent, args) => {
            
            console.log (`\x1b[33m ┌───────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Remove Task From User │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log(args.id)

                // Remove Task ID from all User Documents
                const user = await User.updateMany(
                    //{ _id: "65b8ed239359f0fca323570c" },
                    {  },
                    { $pull: { tasks: args.id }},
                    // { $addTOSet: { tasks: { _id: "65b8dba1b768a37702f656b7" }}},  // { id: args._id }
                    { new: true}
                )
                console.log(user)
                return user
        },

// Unauthorised - Missing context.user means failed authMiddelware
    //         if (!context.user) {
    //             throw AuthenticationError("Unauthorised to Delete");
    //         }     

    //         // Delete book subdocument from User
    //         const deleteBook = await User.findOneAndUpdate(
    //             { _id: context.user._id },
    //             { $pull: { savedBooks: { bookId: args.bookId } } },
    //             { new: true }
    //         )

    //         return deleteBook;
    //     },

    //     saveBook: async (parent, args, context) => {

    //         console.log (`\x1b[33m ┌────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
    //         console.log (`\x1b[33m │ Save Book  │ \x1b[0m\x1b[32m  \x1b[0m`); 
    //         console.log (`\x1b[33m └────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

    //         // Unauthorised - Missing context.user means failed authMiddelware
    //         if (!context.user) {
    //             throw AuthenticationError("Unauthorised to Save");
    //         }

    //         // Add book as subdocument to User
    //         const saveBook = await User.findOneAndUpdate(
    //             { _id: context.user._id },
    //             { $addToSet: { savedBooks: args.book } },
    //             { new: true, runValidators: true }
    //         );

    //         return saveBook
    //     },

    //     deleteBook: async (parent, args, context) => {
            
    //         console.log (`\x1b[33m ┌──────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
    //         console.log (`\x1b[33m │ Delete Book  │ \x1b[0m\x1b[32m  \x1b[0m`); 
    //         console.log (`\x1b[33m └──────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

    //         // Unauthorised - Missing context.user means failed authMiddelware
    //         if (!context.user) {
    //             throw AuthenticationError("Unauthorised to Delete");
    //         }     

    //         // Delete book subdocument from User
    //         const deleteBook = await User.findOneAndUpdate(
    //             { _id: context.user._id },
    //             { $pull: { savedBooks: { bookId: args.bookId } } },
    //             { new: true }
    //         )

    //         return deleteBook;
    //     },

    }
};

module.exports = resolvers;