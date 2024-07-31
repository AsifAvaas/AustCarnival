const express = require('express')
require('dotenv').config();
const MongoDB = require('./Database')
const cors = require('cors')
const app = express()
const UserRouter = require('./routes/createuser')
const RefreshRouter = require('./authentication/authenticateRoute')
const data = require('./models/Data');
const AuthenticateToken = require('./authentication/Authentication');
const port = process.env.PORT;
const frontend = process.env.FRONTEND_LINK;
app.use(express.json());
MongoDB();


app.use(cors({
    origin: frontend,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'authToken'],
    credentials: true

}))

app.get('/', (req, res) => {
    res.status(200).send(port)
})

app.use('/api', UserRouter)
app.use('/api', RefreshRouter)
app.use('/api', AuthenticateToken, data)

app.listen(port)

