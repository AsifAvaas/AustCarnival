const express = require('express');
const router = express.Router();
const Register = require('../models/registration')
const Events = require('../models/Events')
// const SSLCommerzPayment = require('sslcommerz-lts')

// const store_id = process.env.Store_ID
// const store_passwd = process.env.Store_Password
// const is_live = false //true for live, false for sandbox
const { v4: uuidv4 } = require('uuid');

const BkashMiddleware = require('../middleware/bkashAuth')
const axios = require('axios');
const backend = process.env.Backend_link;
const frontend = process.env.FRONTEND_LINK;

// router.post('/payment', async (req, res) => {
//     console.log(req.body);
//     try {
//         const tran_id = uuidv4();

//         const event = await Events.findOne({ name: req.body.event_name });
//         // console.log(price.price)
//         await Register.create({
//             name1: req.body.name1,
//             main_email: req.body.main_email,
//             roll1: req.body.roll1,
//             name2: req.body.name2,
//             email2: req.body.email2,
//             roll2: req.body.roll2,
//             name3: req.body.name3,
//             email3: req.body.email3,
//             roll3: req.body.roll3,
//             team: req.body.team,
//             eventId: event._id,
//             tran_id: tran_id,
//             isPaid: false
//         });


//         const data = {
//             total_amount: event.price,
//             currency: 'BDT',
//             tran_id: tran_id,
//             success_url: `https://aust-carnival-backend.vercel.app/api/success?tran_id=${tran_id}`,
//             fail_url: `https://aust-carnival-backend.vercel.app/api/error/${tran_id}`,
//             cancel_url: `https://aust-carnival-backend.vercel.app/api/error/${tran_id}`,
//             ipn_url: 'https://localhost:3030/ipn',
//             shipping_method: 'Courier',
//             product_name: 'Computer.',
//             product_category: 'Electronic',
//             product_profile: 'general',
//             cus_name: 'Customer Name',
//             cus_email: req.body.main_email,
//             cus_add1: 'Dhaka',
//             cus_add2: 'Dhaka',
//             cus_city: 'Dhaka',
//             cus_state: 'Dhaka',
//             cus_postcode: '1000',
//             cus_country: 'Bangladesh',
//             cus_phone: req.body.number,
//             cus_fax: '01711111111',
//             ship_name: 'Customer Name',
//             ship_add1: 'Dhaka',
//             ship_add2: 'Dhaka',
//             ship_city: 'Dhaka',
//             ship_state: 'Dhaka',
//             ship_postcode: 1000,
//             ship_country: 'Bangladesh',
//         };

//         // console.log(data);

//         // Initialize the SSLCommerzPayment instance
//         const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//         sslcz.init(data).then(apiResponse => {
//             // Redirect the user to payment gateway
//             let GatewayPageURL = apiResponse.GatewayPageURL;
//             res.send({ url: GatewayPageURL }); // Send the URL to the client
//         }).catch(error => {
//             console.error("SSLCommerz error:", error);
//             res.status(500).json({ success: false, message: 'Payment initiation failed' });
//         });

//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ success: false, message: 'Registration failed' });
//     }
// });





// router.get('/success', async (req, res) => {
//     const tran_id = req.query.tran_id;
//     try {
//         if (!tran_id) {
//             console.error("No tran_id provided");
//             return res.redirect(`https://aust-carnival.vercel.app/error`);
//         }

//         // Introduce a small delay
//         await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay

//         const paymentData = await Register.findOne({ tran_id: tran_id });

//         if (!paymentData) {
//             console.error(`No payment data found for tran_id: ${tran_id}`);
//             return res.redirect(`https://aust-carnival.vercel.app/error`);
//         }

//         paymentData.isPaid = true;
//         await paymentData.save();

//         console.log(`Payment successful for tran_id: ${tran_id}`);
//         return res.redirect(`https://aust-carnival.vercel.app/success`);
//     } catch (error) {
//         console.error("Error during payment success handling:", error);
//         return res.redirect(`https://aust-carnival.vercel.app/error`);
//     }
// });


// router.get('/error/:tran_id', async (req, res) => {


//     try {

//         const deletedRecord = await Register.deleteOne({ tran_id: req.params.tran_id });


//         // Redirect to the error page
//         return res.redirect(`https://aust-carnival.vercel.app/error`);
//     } catch (error) {
//         console.error("Error deleting transaction:", error);
//         return res.redirect(`https://aust-carnival.vercel.app/error`);
//     }
// })
router.post('/payment', BkashMiddleware.bkash_auth, async (req, res) => {
    try {
        const tran_id = uuidv4();
        const token = req.bkashToken;

        // Find the event
        const event = await Events.findOne({ name: req.body.event_name });
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        // Save registration attempt
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
            number: req.body.number,
            eventId: event._id,
            tran_id: tran_id,
            isPaid: false
        });

        // Create bKash payment
        const { data } = await axios.post(
            process.env.bkash_create_payment_url,
            {
                mode: "0011",
                payerReference: " ",
                callbackURL: `${backend}/api/bkash/callback?tran_id=${tran_id}`,
                amount: req.body.price.toString(),
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 8),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${token}`,
                    "x-app-key": process.env.bkash_api_key,
                },
            }
        );

        return res.status(200).json({ bkashURL: data.bkashURL });
    } catch (error) {
        console.error("Payment Error:", error.response?.data || error.message);
        return res.status(500).json({ success: false, message: "Payment initiation failed" });
    }
});
router.get('/bkash/callback', BkashMiddleware.bkash_auth, async (req, res) => {
    const token = req.bkashToken;
    const { paymentID, status, tran_id } = req.query;

    if (!tran_id) {
        return res.redirect(`${frontend}/failure?message=Invalid transaction`);
    }

    if (status === 'cancel' || status === 'failure') {
        return res.redirect(`${frontend}/error?message=${status}`);
    }

    if (status === 'success') {
        try {
            // Update registration as paid
            const registration = await Register.findOneAndUpdate(
                { tran_id: tran_id },
                { isPaid: true },
                { new: true }
            );

            if (!registration) {
                return res.redirect(`${frontend}/error?messege=Registration not found`);
            }

            return res.redirect(`${frontend}/success`);
        } catch (error) {
            console.error("Callback Error:", error.message);
            return res.redirect(`${frontend}/error?messege=Server error`);
        }
    }
});

module.exports = router;
