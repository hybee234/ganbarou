const { Schema, model } = require('mongoose');
const { noteSchema } = require('./Note')
const { prioritySchema } = require('./Priority')

const taskSchema = new Schema({
    created_dt: {
        //Stores date and time     
        type: Date,
        default: Date.now,
        get: function(value) {
            return value.toLocaleString()
        }
    },
    title: {
        type: String,
        required: true,
    },    
    summary: {
        type: String,
        required: true,
    },
    complete_flag: {
        type: Boolean,
    },
    complete_dt: {     
        //Time defaults to 0000hrs
        type: Date,
        get: function(value) {
            return value.toLocaleString()
        }
    },
    remind_dt: {
        //Time defaults to 0000hrs
        type: Date,
        get: function(value) {
            return value.toLocaleString()
        }
    },
    stakeholder: {
        type: String,

    },
    assigned: {
        type: String,
        //default "unassigned"
        required: true,
    },            
    status_macro: {
        type: String,
    },
    status_micro: {
        type: String,
    },
    note: [noteSchema],
    priority: [prioritySchema],
},
{
    timestamps: true,

}
);

module.exports = taskSchema;

const Task = model('task', taskSchema);
module.exports = Task;
