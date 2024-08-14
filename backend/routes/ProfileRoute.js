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
router.post('/profile/all', async (req, res) => {
    const id = req.body.id
    try {
        let user = await User.find({
            _id: { $ne: id }
        });
        res.json({ success: true, profileInfo: user })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error })
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
router.delete('/profile/delete/:id', async (req, res) => {
    try {
        const profileId = req.params.id;
        const deletedProfile = await User.findByIdAndDelete(profileId);
        if (deletedProfile) {
            res.status(200).json({ success: true, message: 'profile deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Profile not found' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the Profile' });
    }
})

module.exports = router;
