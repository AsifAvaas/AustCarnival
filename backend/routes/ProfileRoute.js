const express = require('express');
const router = express.Router();


const User = require('../models/User')



router.post('/profile', async (req, res) => {
    const id = req.body.id
    try {
        let user = await User.findById(id);

        res.json({ profileInfo: user })

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})



module.exports = router;
