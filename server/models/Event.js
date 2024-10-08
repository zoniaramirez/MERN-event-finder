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
    },
    date: {
        type: String,
    }, 
    description: {
        type: String,
    },
    link: {
        type: String,
    }
});

module.exports = eventSchema;