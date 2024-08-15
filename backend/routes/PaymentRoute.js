const express = require('express');
const router = express.Router();
const Register = require('../models/registration')
const Events = require('../models/Events')
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.Store_ID
const store_passwd = process.env.Store_Password
const is_live = false //true for live, false for sandbox
const { v4: uuidv4 } = require('uuid');


router.post('/payment', async (req, res) => {
    console.log(req.body);
    try {
        const tran_id = uuidv4();

        const event = await Events.findOne({ name: req.body.event_name });
        // console.log(price.price)
        await Register.create({
            name1: req.body.name1,
            main_email: req.body.main_email,
            roll1: req.body.roll1,
            name2: req.body.name2,
            email2: req.body.email2,
            roll2: req.body.roll2,
            name3: req.body.name3,
            email3: req.body.email3,
            roll3: req.body.roll3,
            team: req.body.team,
            eventId: event._id,
            tran_id: tran_id,
            isPaid: false
        });


        const data = {
            total_amount: event.price,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `https://aust-carnival-backend.vercel.app/api/success?tran_id=${tran_id}`,
            fail_url: `https://aust-carnival-backend.vercel.app/api/error/${tran_id}`,
            cancel_url: `https://aust-carnival-backend.vercel.app/api/error/${tran_id}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: req.body.main_email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: req.body.number,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        // console.log(data);

        // Initialize the SSLCommerzPayment instance
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL }); // Send the URL to the client
        }).catch(error => {
            console.error("SSLCommerz error:", error);
            res.status(500).json({ success: false, message: 'Payment initiation failed' });
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});





router.post('/success', async (req, res) => {
    const tran_id = req.query.tran_id;
    const paymentData = await Register.findOne({ tran_id: tran_id });
    try {
        if (paymentData) {

            paymentData.isPaid = true;
            await paymentData.save();
            return res.redirect(`https://aust-carnival.vercel.app/success`)
        } else {
            return res.redirect(`https://aust-carnival.vercel.app/error`)
        }
    } catch (error) {
        console.error(error);
        return res.redirect(`https://aust-carnival.vercel.app/error`)
    }
})

router.post('/error/:tran_id', async (req, res) => {


    try {

        const deletedRecord = await Register.deleteOne({ tran_id: req.params.tran_id });


        // Redirect to the error page
        return res.redirect(`https://aust-carnival.vercel.app/error`);
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.redirect(`https://aust-carnival.vercel.app/error`);
    }
})




module.exports = router;
