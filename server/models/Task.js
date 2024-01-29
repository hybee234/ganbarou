const { Schema, model } = require('mongoose');
const { noteSchema } = require('./Note')
const { prioritySchema } = require('./Priority')

const taskSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    created_dt: {     
        type: Date,
        default: Date.now,
        get: function(value) {
            return value.toLocaleString()
        }
    },
    description: {
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
        type: Date,
        get: function(value) {
            return value.toLocaleString()
        }
    },
    remind_dt: {
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
    note: [noteSchema],
    priority: [prioritySchema]
},
{
    timestamps: true,

}
);

module.exports = taskSchema;

const Task = model('task', taskSchema);
module.exports = Task;
