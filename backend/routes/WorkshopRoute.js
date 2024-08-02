const express = require('express');
const router = express.Router();

const Event = require('../models/Events')
const Workshop = require('../models/Workshop')


router.post('/workshop', async (req, res) => {
    try {
        const workshops = await Workshop.find({});
        return res.json(workshops);

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})
module.exports = router;