const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const refresh_secret = process.env.refresh_secret
const token_secret = process.env.JWT_SECRET



router.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: 'Access denied' });

    try {
        const varified = jwt.verify(refreshToken, refresh_secret)
        const newToken = jwt.sign({ user: varified.user }, token_secret, { expiresIn: "30m" })
        res.json({ token: newToken })
    } catch (error) {
        console.error('Invalid or expired refresh token:', error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });

    }
})

module.exports = router;
