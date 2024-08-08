const express = require('express');
const router = express.Router();
const Register = require('../models/registration')
require('dotenv').config();


router.post('/registration', async (req, res) => {
    try {
        await Register.create({
            name1: req.body.name1,
            main_email: req.body.main_email,
            roll1: req.body.roll1,
            name2: req.body.name2,
            email2: req.body.email2,
            roll2: req.body.roll2,
            name3: req.body.name3,
            email3: req.body.email3,
            roll3: req.body.roll3,
            team: req.body.team,
            event_name: req.body.event_name,
        })
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }

})

module.exports = router;