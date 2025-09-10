const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Event = require('../models/Events')
const sendEmail = require('../utils/sendEmail')
const frontend = process.env.FRONTEND_LINK


router.post('/displayevent', async (req, res) => {
    try {
        const events = await Event.find({});
        return res.json(events);

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})
router.post('/event/create', async (req, res) => {
    try {
        const event = await Event.create({
            name: req.body.name,
            body: req.body.body,
            date: req.body.date,
            image: req.body.image,
            icon: req.body.icon,
            price: req.body.price,
        });
        const users = await User.find({ hasEmail: true }, "email name");
        if (users.length === 0) {
            return res.json({ success: true, message: "Event created but no users with email enabled." });
        }
        const subject = `New Event: ${event.name}`;
        const html = ` 
        <p>We are excited to announce a new event!</p>

      <h1>${event.name}</h1>
      <p>${event.body}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Price:</strong> ${event.price ? event.price + " BDT" : "Free"}</p>
      <p><a href="${frontend}/event/${event.name}" 
            style="display:inline-block;padding:10px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">
            View Event
         </a></p>
    `;


        const emailPromises = users.map((user) =>
            sendEmail(
                user.email,
                subject,
                `<p>Hello ${user.name || ""},</p>` + html
            )
        );

        await Promise.all(emailPromises);


        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.json({ success: false, error: e.message });

    }
})
router.delete('/event/delete/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (deletedEvent) {
            res.status(200).json({ success: true, message: 'Instructor deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Instructor not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the instructor' });
    }
})
router.put('/event/update/:id', async (req, res) => {
    const eventId = req.params.id;
    const { name, body, price, date, icon, image } = req.body;

    try {
        // Find the event by ID and update it with the new data
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { name, body, price, date, icon, image },
            { new: true } // This option returns the updated document
        );

        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while editing the event' });
    }
})





module.exports = router;