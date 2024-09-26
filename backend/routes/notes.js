const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')


//fetch all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server error" })
    }

})

//add note
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 5 characters').isLength({ min: 5 }),
    body('description', 'Description must be at least 10 characters').isLength({ min: 10 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()

        res.json(savednote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})

//update notes
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newnote = {}
        if (title) {
            newnote.title = title
        }
        if (description) {
            newnote.description = description
        }
        if (tag) {
            newnote.tag = tag
        }

        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server error" })
    }


})

//delete notes
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {      
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success":"Note has been deleted" , note:note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server error" })
    }


})

module.exports = router