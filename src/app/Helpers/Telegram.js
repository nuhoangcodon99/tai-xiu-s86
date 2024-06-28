require('dotenv').config();
var qs = require('qs');
const axios = require('axios');

module.exports = async(teleGroupId, content) => {
    try {
        var config = {
            method: 'post',
            url: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'chat_id': teleGroupId,
                'text': content
            })
        };
        const res = await axios(config);
        //console.log(res);
        if (res.data.ok) {
            return true;
        } else {
            return false;
        }
        
    } catch (e) {
        console.log(`${e.message}`);
        return false;
    }
}