const mongoose = require('mongoos');
const Schema = mongoose.Schema;

const urlSchema = new Schema({

    originalUrl: String,
    shorterUrl: String
    
}, {timestamp: true});