const { Schema, model } = require('mongoose');
const { noteSchema } = require('./Note')
const { prioritySchema } = require('./Priority')

const taskSchema = new Schema({
    created_dt: {
        //Stores date and time     
        type: Date,
        default: Date.now,
        get: function(value) {
            if (value) {
                return value.toLocaleString()
            } else
                return "null"
        }
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
        get: function(value) {
            if (value) {
                return value.toLocaleString()
            } else
                return "null"
        }
    },
    review_dt: {
        //Time defaults to 0000hrs
        type: Date,
        get: function(value) {
            if (value) {
                return value.toLocaleString()
            } else
                return "null"
        }
    },
    stakeholder: {
        type: String,

    },
    assigned_id: {        
        type: Schema.Types.ObjectId,
        ref: 'user',        
    },            
    status_macro: {
        type: String,
    },
    status_micro: {
        type: String,
    },
    note: [noteSchema],
    priority: prioritySchema,
},
{
    timestamps: true,

}
);

module.exports = taskSchema;

const Task = model('task', taskSchema);
module.exports = Task;
