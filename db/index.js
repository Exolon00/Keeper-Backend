const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://exolon00:4GmSyrs6noECkOqM@cluster0.ykamnkv.mongodb.net/Notes_app');


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