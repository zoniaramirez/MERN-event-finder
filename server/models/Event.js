const { Schema } = require('mongoose');

const eventSchema = new Schema({
    eventId: {
        type: String,        
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    }, 
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    }
});

module.exports = eventSchema;