const { Schema, Types } = require('mongoose');


const prioritySchema = new Schema(
    {
        priorityId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        operational: {
            type: Boolean,
        },
        priority: {
            type: Boolean,
        },
        category: {
            type: Number,
        },
        importance: {
            type: String,
        },
        urgency: {
            type: String,
        },
        effort: {
            type: String,
        },
        comment: {
            type: String
        }

    },    
    {
        toJSON: {       
            getters: true,
        },
        _id: false, // passed back just the _id value
    }
);

module.exports = { prioritySchema };