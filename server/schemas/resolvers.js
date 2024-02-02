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

        tasksById: async (parent,args) => {

            console.log (`\x1b[33m ┌──────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Tasks by ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("assigned:", args.assigned)

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

            console.log(args._id)
            // Check User Exist
            const task = await Task.findOneAndUpdate( 
                {_id: args._id},        //filter
                {complete_flag: true, complete_dt: Date.now()},  //update
                { new: true }           // return doc                
            );

            // const user = await User.find(
            //     {  },
            //     {$pull: {tasks: {_id: args.id}}},
            //     {multi:true, new: true}
            // )

            // const user = await User.updateMany(
            //     { },
            //     { $pull: { tasks: { _id: "65b8dba1b768a37702f656b4" }}},
            //     {new: true}
            // )
            

            // console.log (user)

            return task   
        },

        removeTaskFromUsers: async (parent, args) => {
            
            console.log (`\x1b[33m ┌───────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Remove Task From User │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log(args._id)

            const mongoose = require('mongoose');
            console.log(mongoose.Types.ObjectId.isValid('65b8ed239359f0fca323570c'));
            // true
            console.log(mongoose.Types.ObjectId.isValid('65b8dba1b768a37702f656b5'));
            // false

            try{
                const user = await User.findOneAndUpdate(
                    { _id: "65b8ed239359f0fca323570c" },
                    // { $pull: { tasks: { id: args._id }}},
                    { $addTOSet: { tasks: { _id: "65b8dba1b768a37702f656b7" }}},
                    { new: true}
                ).exec()
                console.log (user)
                return user               

            } catch (err) {
                // console.log(err)
            }
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