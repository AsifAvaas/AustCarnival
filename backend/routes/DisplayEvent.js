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


// router.post('/eventbyname', async (req, res) => {
//     try {
//         let name = req.body.name;
//         const event = await Event.findOne({ name });
//         return res.json({ data: event });
//     } catch (e) {
//         console.error(e);
//         return res.status(401).json({ "msg": "couldn't find event" });
//     }
// });




module.exports = router;