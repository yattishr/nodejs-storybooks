const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// StorySchema model
const Story = require('../models/Story')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    // res.send('Login')
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })        
    } catch (err) {
        console.error('OOoops, there was an error fetching your stories! ' , err)
        res.render('/error/500')
    }
    
})

module.exports = router