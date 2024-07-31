require('dotenv').config()
const jwt = require('jsonwebtoken')
const token_secret = process.env.JWT_SECRET
const AuthenticateToken = (req, res, next) => {
    const token = req.header('authToken')
    if (!token) return res.status(401).json({ message: 'Access denied' })

    try {
        const varified = jwt.verify(token, token_secret)
        req.user = varified.user
        next()

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });

    }

}
module.exports = AuthenticateToken;