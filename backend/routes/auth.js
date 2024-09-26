const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const jwt_secret = 'Sm@rtboy'
const fetchuser = require ('../middleware/fetchuser')

// Route 1: Create a new user
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({success , errors: errors.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success , error: "User with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret)
        success = true
        res.json({ success , authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occurred")
    }
})

// Route 2: Login a user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ suuccess ,  error: "Sorry, user does not exist" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success ,  error: "Please login with password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret)
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route : 03 get logged in details
router.get('/getuser',fetchuser, async (req, res) => {
try {
    userid = req.user.id
    const user = await User.findById(userid).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message)
        res.status(500).send("Internal server error")
}

})

module.exports = router
