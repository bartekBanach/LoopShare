const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categories = require('../data/categories');
const types = require('../data/types');
const keys = require('../data/keys');



const sampleSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },

    key: {
        type: String,
        enum: keys
    },

    bpm: {
        type: Number,
    },
    category: {
        type: String,
        enum: categories,
    },
    type: {
        type: String,
        enum: types,
    },
    user_id: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    downloads: {
        type: Number,
        default: 0,
    }



}, { timestamps: true });


module.exports = mongoose.model('Sample', sampleSchema);