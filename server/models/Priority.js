const { Schema, Types } = require('mongoose');


const prioritySchema = new Schema(
    {
        priority_id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        pipeline_number: {
            type: Number,
        },
        business_driven: {
            type: Boolean,
        },
        focus: {
            type: Boolean,
        },
        category: {
            type: Number,
        },
        important: {
            type: Boolean,
        },
        urgent: {
            type: Boolean,
        },
        high_effort: {
            type: Boolean,
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