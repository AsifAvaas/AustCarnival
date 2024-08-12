const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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

router.post('/profile/update', async (req, res) => {
    const id = req.body.id
    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }

        user.profile_pic = req.body.image
        user.name = req.body.name
        user.email = req.body.email
        console.log(req.body.email)
        console.log(req.body.password)

        if (req.body.password !== user.password) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = securedPassword
            console.log("password updated")
        }

        await user.save()
        res.json({ profileInfo: user })

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})


module.exports = router;
