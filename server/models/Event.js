const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    id: {
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
    },
    price: {
        type: Number,
    }

});

const Event = model("Event", eventSchema);

module.exports = Event;