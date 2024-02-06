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

            const allTasks = await Task.find()
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
                .exec()

            return allTasks
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
                    // path: 'tasks',
                    // match: { complete_flag: false }
                }).exec()

            // console.log(myData)
            return myData;            
        },

        tasksByAssignedId: async (parent,args) => {

            console.log (`\x1b[33m ┌───────────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Tasks by Assigned ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            // console.log("assigned:", args.assigned)

            // Find all tasks by assigned user ID
            const userTasks = await Task.find({ assigned: args.assigned})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
                .exec()

            return userTasks
        },

        taskByTaskId: async (parent,args) => {

            console.log (`\x1b[33m ┌───────────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Tasks by Assigned ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            // console.log("taskId:", args._id)

            // Find all tasks by assigned user ID
            const task = await Task.findOne({ _id: args._id})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
                .exec()

            return task
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
                },
                { new: true, runValidators: true})          // return doc                
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
            return task   
        },

        // removeTaskFromUsers: async (parent, args) => {
            
        //     console.log (`\x1b[33m ┌───────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
        //     console.log (`\x1b[33m │ Remove Task From User │ \x1b[0m\x1b[32m  \x1b[0m`); 
        //     console.log (`\x1b[33m └───────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

        //     console.log(args.id)

        //         // Remove Task ID from all User Documents
        //         const user = await User.updateMany(
        //             //{ _id: "65b8ed239359f0fca323570c" },
        //             {  },
        //             { $pull: { tasks: args.id }},
        //             // { $addTOSet: { tasks: { _id: "65b8dba1b768a37702f656b7" }}},  // { id: args._id }
        //             { new: true}
        //         )
        //         console.log(user)
        //         return user
        // },

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


        updateTaskByTaskId: async (parent, args) => {
                
            console.log (`\x1b[33m ┌────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Update Task by Task ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("args", args)


                const updateTask = await Task.findByIdAndUpdate(
                    { _id: args._id },
                    { 
                        created_dt: args.created_dt, 
                        review_dt: args.review_dt,
                        title: args.title,
                        summary: args.summary,
                        stakeholder: args.stakeholder,
                        $set: {assigned: {
                            _id: args.assigned._id,
                        }}
                    },
                    { new: true, runValidators: true})
                    .populate({ path: 'assigned' })
                    .populate({ path: 'note.note_author' })
                    .populate({ path: 'priority'})
                    .exec()
                                
                // console.log(updateTask)
                return updateTask

                //const user = original (remove from original)
                                    // { $addTOSet: { tasks: { _id: "65b8dba1b768a37702f656b7" }}},  // { id: args._id }
                //const user = new (add to new)


        },


    }
};

module.exports = resolvers;