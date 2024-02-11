// Define the query and mutation functionality to work with the Mongoose models.
const { User, Task } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

    Query: {
        users: async () => {
            console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Users │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            return User.find().exec()
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
            console.log("🔒 context.user", context.user)
            console.log("🔒 context.user._id", context.user._id)

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
            console.log (`\x1b[33m ┌──────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find Task by Task ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 
            // console.log("taskId:", args._id)

            // Find all tasks by assigned user ID
            const task = await Task.findOne({ _id: args._id})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
                .exec()

            return task
        },


        checkout: async (parent, args, context) => {

            console.log (`\x1b[33m ┌────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Stripe │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            const url = new URL(context.headers.referer).origin;
            // We map through the list of products sent by the client to extract the _id of each item and create a new Order.
            await Order.create({ products: args.products.map(({ _id }) => _id) });
            
            // Create an array of line items that the user is buying
            //Just coffee ..
            const line_items = [];
            
            for (const product of args.products) {
                line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: [`${url}/images/${product.image}`],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.purchaseQuantity,
                });
            }
            // Create payment session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`,
            });
            
            return { session: session.id };
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

            console.log("🎁 taskId", args.id)
            // Complete Task document (updates complete date to now)
            const task = await Task.findOneAndUpdate( 
                { _id: args.id },                       //filter
                {                                       //update
                    complete_flag: true,
                    complete_dt: Date.now(),
                },
                { new: true, runValidators: true})      // return doc                
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})
            return task   
        },

        addNote: async (parent, args, context) => {            
            console.log (`\x1b[33m ┌──────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Add Note to Task │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁 args", args)
            console.log("🔒 context.user", context.user)

            if (!context.user){
                throw AuthenticationError;
            }

            const addNote = await Task.findOneAndUpdate(
                { _id: args.taskId },
                {
                    $addToSet: {
                        note: {
                            note_text: args.noteUserInput.note_text,
                            note_type: args.noteUserInput.note_type,                      
                            note_author: {
                                _id: context.user._id
                            }
                        },
                    }                        
                },
                { new: true, runValidators: true})                    
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})

            console.log("📦 Add Note to Task", addNote)
            return addNote
        },

        updateTaskByTaskId: async (parent, args) => {
            console.log (`\x1b[33m ┌────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Update Task by Task ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁 args", args)

            const updateTask = await Task.findOneAndUpdate(
                { _id: args.taskId },
                { 
                    created_dt: args.created_dt, 
                    review_dt: args.review_dt,
                    title: args.title,
                    summary: args.summary,
                    stakeholder: args.stakeholder,
                    status_macro: args.status_macro,
                    status_micro: args.status_micro,
                    // $set: {assigned: args.assigned._id},
                        // _id: "65b8ed239359f0fca323570c",
                        // _id: args.assigned._id,
                        // username: args.assigned.username,
                        // email: args.assigned.email,
                        // security: args.assigned.security                        
                    $set: {priority: {
                        business_driven: args.priority.business_driven,
                        focus: args.priority.focus,
                        important: args.priority.important,
                        urgent: args.priority.urgent,
                        high_effort: args.priority.high_effort,
                        pipeline_number: args.priority.pipeline_number,
                        category: args.priority.category,
                        comment: args.priority.comment
                    }}
                },
                { new: true, runValidators: true})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})                
                            
            console.log("📦 Update Task By Task ID", updateTask)
            return updateTask
        },

        updateReviewDtFromTaskList: async (parent, args) => {
            console.log (`\x1b[33m ┌───────────────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Update Review Date from Task List │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁Task ID", args.taskId)
            console.log("🎁Review_dt", args.review_dt)

            const updateReviewDt = await Task.findOneAndUpdate(
                { _id: args.taskId },
                { review_dt: args.review_dt},
                { new: true, runValidators: true})

            console.log(updateReviewDt)
            return updateReviewDt
        },

        assignUser: async (parent, args) => {        
            console.log (`\x1b[33m ┌───────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Update Task Assigned User │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁Task ID", args.taskId)
            console.log("🎁userInput._id", args.assigned._id)

            const assignUser = await Task.findOneAndUpdate(
                { _id: args.taskId },
                { $set: {assigned: args.assigned._id}},
                { new: true, runValidators: true})
                .populate({ path: 'assigned' })

            console.log("📦 Update Task Assigned User", assignUser)
            return assignUser
        },

        addTask: async (parent, args) => {
            console.log (`\x1b[33m ┌──────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Add New Task │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁args", args)

            const addTask = await Task.create(
                    args
                    // { new: true, runValidators: true}
                )
            // console.log("📦Add New task", addTask)
            return addTask.populate({ path: 'assigned' })
        },


        updatePipelineNumber: async (parent, args) => {        
            console.log (`\x1b[33m ┌───────────────────────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Update PipeLine Number by Task ID │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └───────────────────────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("🎁Task ID", args.taskId)

            const updatePipelineNumber = await Task.findOneAndUpdate(
                { _id: args.taskId },
                { $set: {priority: {
                    pipeline_number: args.pipelineNumber,
                }}
                },
                { new: true, runValidators: true})
                .populate({ path: 'assigned' })
                .populate({ path: 'note.note_author' })
                .populate({ path: 'priority'})                
                            
            console.log("📦 Update PipeLine Number by Task I", updatePipelineNumber)
            return updatePipelineNumber
        },
    }
};

module.exports = resolvers;