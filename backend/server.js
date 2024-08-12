const express = require('express')
require('dotenv').config();
const MongoDB = require('./Database')
const cors = require('cors')
const app = express()
const UserRouter = require('./routes/createuser')
const EventsRouter = require('./routes/DisplayEvent');
const WorkshopRouter = require('./routes/WorkshopRoute');
const BkashRouter = require('./routes/BkashRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const PaymentRouter = require('./routes/PaymentRoute');
const RegistrationRouter = require('./routes/RegistrationRoute');
const RefreshRouter = require('./authentication/authenticateRoute')
const AuthenticateToken = require('./authentication/Authentication');




const port = process.env.PORT;
const frontend = process.env.FRONTEND_LINK;
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/api', EventsRouter)
app.use('/api', WorkshopRouter)
app.use('/api', ProfileRouter)
app.use('/api', BkashRouter)
app.use('/api', PaymentRouter)
app.use('/api', RegistrationRouter)


app.listen(port)

