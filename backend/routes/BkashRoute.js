const express = require('express');
const global = require('node-global-storage')
const router = express.Router();
const BkashMiddleware = require('../middleware/bkashAuth');
const axios = require('axios');
const PaymentModel = require('../models/Payment')

router.post('/bkash/payment/create', BkashMiddleware.bkash_auth, async (req, res) => {
    const { amount, orderId } = req.body
    global.setValue('orderId', JSON.stringify(orderId))
    const token = global.getValue('id_token');

    // console.log('UserId 1:', typeof (amount));
    bkash_header = async () => {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: token,
            'x-app-key': process.env.bkash_api_key
        }
    }
    try {
        const { data } = await axios.post(process.env.bkash_create_payment_url, {
            mode: '0011',
            payerReference: "23546",
            callbackURL: `${process.env.BACKEND_LINK}/api/bkash/payment/callback`,
            amount: JSON.stringify(amount),
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "Inv12345"
        }, {
            headers: await bkash_header()

        })
        // console.log(typeof (data.amount))
        // console.log(data.amount)
        return res.status(200).json({ bkashURL: data.bkashURL })

    } catch (error) {
        // console.log(error)
        return res.status(401).json({ error: error.messege })
    }


})


router.get('/bkash/payment/callback', BkashMiddleware.bkash_auth, async (req, res) => {
    const { paymentID, status } = req.query
    // console.log(req.query)
    const token = global.getValue('id_token');
    bkash_header = async () => {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: token,
            'x-app-key': process.env.bkash_api_key
        }
    }
    if (status === 'cancel' || status === 'failure') {
        res.redirect(`${process.env.FRONTEND_LINK}/error?messege=${status}`)
    }
    if (status === 'success') {
        try {
            const { data } = await axios.post(process.env.bkash_execute_payment_url,
                {
                    paymentID
                }, {
                headers: await bkash_header()
            }
            )
            if (data && data.statusCode === '0000') {
                const orderId = global.getValue('orderId')
                await PaymentModel.create({
                    userId: Math.random() * 10 + 1,
                    amount: parseInt(data.amount),
                    paymentID,
                    trxID: data.trxID,
                    date: data.paymentExecuteTime
                })
                // console.log(data)
                return res.redirect(`${process.env.FRONTEND_LINK}/success`)
            } else {
                // console.log("error 1")
                res.redirect(`${process.env.FRONTEND_LINK}/error?messege=${error.statusMessege}`)

            }
        } catch (error) {
            // console.log(error)
            res.redirect(`${process.env.FRONTEND_LINK}/error?messege=${error.messege}`)
        }
    }


})

module.exports = router;
