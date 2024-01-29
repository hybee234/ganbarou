const { Schema, Types } = require('mongoose');


const noteSchema = new Schema(
    {

        noteId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        note: {
            type: String,
            required: true,
            maxlength: 280,            
        },
        author: {
            type: String,
            required: true,
        },
        note_dt: {     
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

module.exports = { noteSchema };