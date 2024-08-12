const express = require('express');
const router = express.Router();
const Register = require('../models/registration')
// .select('event_name');
// const eventNames = [...new Set(data.map(item => item.event_name))];

router.post('/getRegistration', async (req, res) => {
    const mail = req.body.email;
    try {
        const data = await Register.find({
            $or: [
                { main_email: mail },
                { email2: mail },
                { email3: mail }
            ]
        }).populate('eventId'); // Populate event details

        const uniqueData = [];
        const eventIdsSet = new Set();

        data.forEach(item => {
            if (!eventIdsSet.has(item.eventId._id.toString())) {
                uniqueData.push(item);
                eventIdsSet.add(item.eventId._id.toString());
            }
        });

        return res.json({ data: uniqueData });
    } catch (error) {
        console.error("Error fetching registration:", error);
        return res.status(500).json({ error: error });
    }
});

module.exports = router;
