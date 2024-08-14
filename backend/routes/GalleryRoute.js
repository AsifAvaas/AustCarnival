const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery')

router.post('/gallery/all', async (req, res) => {
    try {
        const gallery = await Gallery.find({});
        return res.json({ data: gallery });

    } catch (e) {
        return res.status(401).json({ "msg": "couldnt find" })
    }
})

router.post('/gallery/create', async (req, res) => {
    if (req.body.image === "") {
        return res.json({ success: false });
    }
    try {
        await Gallery.create({
            name: req.body.name,
            image: req.body.image
        })


        res.json({ success: true });

    } catch (e) {
        console.error(e);
        res.json({ success: false, error: e.message });
    }
})

router.delete('/gallery/delete/:id', async (req, res) => {
    const userId = req.params.id



    try {
        const deletedImage = await Gallery.findByIdAndDelete(userId)
        if (deletedImage) {
            res.status(200).json({ success: true, message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the image' });

    }

})


module.exports = router;

