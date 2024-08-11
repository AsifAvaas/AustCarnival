const express = require('express');
const router = express.Router();

const Event = require('../models/Events')


router.post('/displayevent', async (req, res) => {
    try {
        const events = await Event.find({});
        return res.json(events);

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})






module.exports = router;