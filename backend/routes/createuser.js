const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Workshop = require('../models/Workshop');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const { body, validationResult } = require('express-validator')
const backend = process.env.Backend_link
const frontend = process.env.FRONTEND_LINK
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/TokenModel')
const crypto = require("crypto");



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
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ messege: "Email Id already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);


        user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            isAdmin: req.body.isAdmin
        })
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save()
        const url = `${backend}/api/${user._id}/verify/${token.token}`
        // await sendEmail(user.email, "Verify Email", url)

        await sendEmail(
            user.email,
            "Verify Your Email Address",
            `
  <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px; color:#333;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <h2 style="color:#2c7a7b; text-align:center; margin-bottom:20px;">Welcome to AUST CSE Carnival 🎉</h2>
      
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>Thank you for registering! Please confirm your email address by clicking the button below:</p>

      <p style="text-align:center; margin:30px 0;">
        <a href="${url}" 
           style="background-color:#2c7a7b; color:#fff; padding:12px 24px; 
                  text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
          Verify Email
        </a>
      </p>

      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p style="word-break:break-all;">
        <a href="${url}">${url}</a>
      </p>

      <p><strong>Note:</strong> This link will expire in <span style="color:#e53e3e;">30 minutes</span>.</p>

      <p>If you didn’t create an account, you can safely ignore this email.</p>

      <hr style="margin:30px 0; border:none; border-top:1px solid #ddd;" />

      <p style="font-size:12px; color:#777; text-align:center;">
        © ${new Date().getFullYear()} AUST CSE Carnival. All rights reserved.
      </p>
    </div>
  </div>
  `
        );
        user.save();
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

        if (user && !user.isVerified) {
            return res.status(400).json({ messege: 'Email not verified' })
        }
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
        return res.status(401).json({ success: false, e })

    }
})
router.get("/:id/verify/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(400).json({ message: "Invalid Link" })

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token)
            return res.status(400).json({ message: "Invalid Link" })

        await user.updateOne({ _id: user._id, isVerified: true, hasEmail: true })
        await Token.deleteOne({ _id: token._id });
        res.redirect(`${frontend}/login`)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Sevrver Error" })
    }
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body
    try {
        console.log(email)
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, error: "User does not exist" })
        }
        const secret = jwtSecret + user.password
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "10m" })

        const link = `${backend}/api/reset-password/${user._id}/${token}`

        await sendEmail(
            user.email,
            "Password Reset Request",
            `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c7a7b;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password for your account. 
       If this was you, click the button below to reset your password:</p>

    <p style="text-align: center; margin: 20px 0;">
      <a href="${link}" 
         style="background-color: #2c7a7b; color: #fff; padding: 10px 20px; 
                text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
    </p>

    <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="${link}">${link}</a></p>

    <p><strong>Note:</strong> This link will expire in 30 minutes.</p>

    <p>If you didn’t request a password reset, you can safely ignore this email.</p>

    <hr style="margin: 20px 0;" />
    <p style="font-size: 12px; color: #777;">
      © ${new Date().getFullYear()} AUST CSE Carnival. All rights reserved.
    </p>
  </div>
  `
        );
        res.json({ success: true });

    } catch (error) {
        return res.json({ error: error.message })
    }
})

router.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.json({ success: false, error: "User does not exist" })
    }
    const secret = jwtSecret + user.password
    try {
        const verify = jwt.verify(token, secret)
        if (verify) {
            const email = user.email;

            res.redirect(`${frontend}/resetPassword?id=${id}&email=${email}`);
        } else {
            return res.json({ success: false, error: "Invalid token" });
        }
    } catch (error) {
        return res.json({ success: false, error: "User does not exist" })
    }

})


router.put('/password/reset', body('password', 'Password must contain minimum of 8 letters, including 1 uppuercase, 1 lowercase, 1 number and 1 spacial symbol.').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
}), async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.json({ errorMessage: result.array() });
    }

    const { id, password } = req.body
    const user = await User.findById(id)
    if (!user) {
        return res.json({ error: "User does not exist" })
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const securepassword = await bcrypt.hash(password, salt);

        user.password = securepassword
        await user.save()
        return res.json({ success: true, message: 'Password updated successfully' })
    } catch (error) {
        return res.json({ error: 'An error occurred while updating the password' })
    }

})





module.exports = router;
