const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {        
        username: {
            type: String,
            required: [true, 'a username is required'],
            unique: [true, 'username already exists'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'an email is requied'],
            unique: [true, 'email already exists'],            
            match: [/.+@.+\..+/, "Please Enter a valid Email Address"],
        },
        password: {
            type: String,
            required: true,
            minlength: [8, ,'password must be at least 8 characters long']
        },
        security: {
            type: String,
            required: true,
            default: "user",
        },
        // tasks: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Task',
        //     },
        // ],
        
    },
    // set this to use virtual below
    {
        // timestamp:true,
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// userSchema.virtual('taskCount').get(function () {
//     return this.tasks.length;
// });

const User = model('User', userSchema);
module.exports = User;
