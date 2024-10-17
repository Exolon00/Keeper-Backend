const { Router } = require("express");
const router = Router();
const { suserMiddleware } = require("../middleware/user");
const { userMiddleware } = require("../middleware/user");
const jwt = require('jsonwebtoken');
const { User, Note } = require("../db");
require('dotenv').config();
const jwtPassword = process.env.JWT_SECRET;
const { zodUserSchema } = require('../types')

// User Routes
router.post('/signup', (req, res) => {
    //  user signup 
    const parsedUser =  zodUserSchema.safeParse(req.body)
    
    
    if (!parsedUser.success) {
        res.json({
            msg: "Wrong Input"
        })
    }
    else {
        User.findOne({ username: req.body.username })
            .then(function (data) {
                if (data) {
                    res.json({
                        msg: "User already exists, plz signin"
                    })
                    return;
                }
                else {
                    const newUser = new User(req.body)
                    newUser.save()
                        .then(function () {
                            res.json({
                                msg: "User created successfully, signin to proceed"
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: "Internal sever error"
                            })
                        })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Internal sever error"
                })
            })


    }
});

router.post('/signin', suserMiddleware, (req, res) => {
    //  user signin
    const username = req.headers.username;
    const token = jwt.sign({ username }, jwtPassword);
    res.json({
        token: token,
        msg: "success"
    })
});

router.get('/notes', userMiddleware, async (req, res) => {
    try {
        const username = req.username;
        const user = await User.findOne({ username });
        const notes = await Note.find({
            _id: {
                "$in": user.writtenNote
            }
        })
        res.json({
            msg: "notes fetched",
            notes: notes
        })
    } catch (err) {

        res.status(500).json({ msg: 'Internal server error' });
    }

});

router.post('/note', userMiddleware, async (req, res) => {
    // todo
    const username = req.username
    const id = Math.round(Math.random() * 1000000)
    const note = req.body;
    note.id = id;
    const newNote = new Note(note);
    try {
        const createdNote = await newNote.save()
        const newNoteId = createdNote._id.toString();
        await User.updateOne({ username: username }, {
            "$push": {
                writtenNote: newNoteId
            }
        })
        res.json({

            note: createdNote,
            msg: "note created successfully"
        })
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/note/delete/:noteId', userMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    try {
        await Note.deleteOne({
            id: {
                $in: [noteId]
            }
        })
        res.json({
            msg: "removed successfully"
        })
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error' });
    }

});

module.exports = router