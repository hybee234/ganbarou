const { Schema, model } = require('mongoose');
const { noteSchema } = require('./Note')
const { prioritySchema } = require('./Priority')
const User = require('./User')

const taskSchema = new Schema({
    created_dt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },    
    summary: {
        type: String,
    },
    complete_flag: {
        type: Boolean,
    },
    complete_dt: {     
        //Time defaults to 0000hrs
        type: Date,
    },
    review_dt: {
        //Time defaults to 0000hrs
        type: Date,
        default: Date.now,
    },
    stakeholder: {
        type: String,
    },
    assigned: 
        {        
                type: Schema.Types.ObjectId,
                ref: 'User',        
        },
    

    status_macro: {
        type: String,
        default: "New",
    },
    status_micro: {
        type: String,
        default: "On Hold,"

    },
    note: [noteSchema],
    priority: prioritySchema,
},
{
    timestamps: false,
    toJSON: {
        virtuals: true,
    },
    // id: false, // passed back just the _id value
}
);

module.exports = taskSchema;

const Task = model('Task', taskSchema);
module.exports = Task;
