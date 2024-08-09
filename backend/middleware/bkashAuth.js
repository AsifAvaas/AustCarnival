const axios = require('axios')
const global = require('node-global-storage')
const grantTokenUrl = process.env.bkash_grant_token_url
class BkashMiddleware {
    bkash_auth = async (req, res, next) => {

        global.unsetValue('id_token')

        try {
            const { data } = await axios.post(grantTokenUrl, {
                app_key: process.env.bkash_api_key,
                app_secret: process.env.bkash_secret_key,

            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    username: process.env.bkash_username,
                    password: process.env.bkash_password,
                }
            })
            // console.log(data)
            global.setValue('id_token', data.id_token, { protected: true })
            // console.log('Stored ID Token:', global.getValue('id_token'));

        } catch (error) {

            return res.status(401).json({ message: error.message });

        }
        next()
    }
}


module.exports = new BkashMiddleware()