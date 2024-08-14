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
router.post('/event/create', async (req, res) => {
    try {
        await Event.create({
            name: req.body.name,
            body: req.body.body,
            date: req.body.date,
            image: req.body.image,
            icon: req.body.icon,
            price: req.body.price
        })
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