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
        })

        const uniqueData = [];
        const eventNamesSet = new Set();

        data.forEach(item => {
            if (!eventNamesSet.has(item.event_name)) {
                uniqueData.push(item);
                eventNamesSet.add(item.event_name);
            }
        });

        return res.json({ data: uniqueData })
    } catch (error) {
        console.error("Error fetching registration:", error);
        return res.status(500).json({ error: "An error occurred while fetching registration data." });
    }

})


module.exports = router;
