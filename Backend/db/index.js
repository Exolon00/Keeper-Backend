const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL= process.env.DB_URL

mongoose.connect(DB_URL);


const UserSchema = new mongoose.Schema({
   
    username: String, 
    password: String,
    writtenNote: [{
        type: String,
        ref: 'NOte'
    }]
});

const NoteSchema = new mongoose.Schema({
    title: String,
    description: String,
    id: String
})

const User = mongoose.model('User',UserSchema)
const Note = mongoose.model('Note',NoteSchema)

module.exports = {
    User,
    Note
}