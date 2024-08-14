const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Workshop = require('../models/Workshop');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')





require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

router.post('/signup', body('email', 'invalid email id').isEmail(), body('password', 'password must contain minimum 8 charecters including atleast 1 upperCase, 1 lowerCase, 1 number and 1 especial symbol').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1
}), body('name').notEmpty(), async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({ messege: result.array() })
    }

    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.json({ messege: "Passwords do not match" });
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ messege: "Email Id already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            isAdmin: req.body.isAdmin
        });
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.json({ success: false, error: e.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        let email = req.body.email;

        let user = await User.findOne({ email })

        if (!user) {
            user = await Workshop.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Email address does not exist' });
            }
        }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)

        if (!passwordCheck) {
            return res.status(400).json({ messege: 'wrong password' })
        }

        const authToken = jwt.sign({ id: user.id }, jwt_secret, { expiresIn: "30m" })
        const refreshToken = jwt.sign({ id: user.id }, refresh_secret, { expiresIn: "15d" })

        // console.log(`successfully logged in to ${email}`)

        return res.json({ success: true, authToken: authToken, refreshToken: refreshToken, userID: user.id, email: user.email, adminStatus: user.isAdmin, userType: user instanceof Workshop ? 'instructor' : 'student' })

    } catch (e) {
        console.log(e)
        return res.status(401).json({ success: false })

    }
})




module.exports = router;
