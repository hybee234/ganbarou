// Define the query and mutation functionality to work with the Mongoose models.
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");


const resolvers = {
    Query: {
        users: async () => {

            console.log (`\x1b[33m ┌────────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find all Users  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            return User.find()
        },

        me: async (parent, args, context) => {

            console.log (`\x1b[33m ┌──────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Find Me  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            console.log("context.user Find me", context.user)
            console.log("user._id", context.user._id)

            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                
                // console.log("userData - FindMe ", userData)

                return userData;
            }
            
            throw new AuthenticationError("Not logged in");
        },
    },


    Mutation: {
        createUser : async (parent, args) => {

            console.log (`\x1b[33m ┌──────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Create User  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

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
                $or: [{ username: args.username }, { email: args.email }],                
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

        saveBook: async (parent, args, context) => {

            console.log (`\x1b[33m ┌────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Save Book  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            // Unauthorised - Missing context.user means failed authMiddelware
            if (!context.user) {
                throw AuthenticationError("Unauthorised to Save");
            }

            // Add book as subdocument to User
            const saveBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.book } },
                { new: true, runValidators: true }
            );

            return saveBook
        },

        deleteBook: async (parent, args, context) => {
            
            console.log (`\x1b[33m ┌──────────────┐ \x1b[0m\x1b[32m  \x1b[0m`);
            console.log (`\x1b[33m │ Delete Book  │ \x1b[0m\x1b[32m  \x1b[0m`); 
            console.log (`\x1b[33m └──────────────┘ \x1b[0m\x1b[32m  \x1b[0m`); 

            // Unauthorised - Missing context.user means failed authMiddelware
            if (!context.user) {
                throw AuthenticationError("Unauthorised to Delete");
            }     

            // Delete book subdocument from User
            const deleteBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            )

            return deleteBook;
        },

    }
};

module.exports = resolvers;