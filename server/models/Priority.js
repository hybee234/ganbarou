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
        statusMacro: {
            type: String,

        },
        statusMicro: {
            type: String,
        },
        createdAt: {     
            type: Date,
            default: Date.now,
            get: function(value) {
                return value.toLocaleString()
            }
        },
    
    },    
    {
        toJSON: {       
            getters: true,
        },
        _id: false, // passed back just the _id value
    }
);

module.exports = { prioritySchema };