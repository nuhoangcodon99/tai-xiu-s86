require('dotenv').config();
const axios = require('axios');
var qs = require('qs');

module.exports = async() => {
    try {
        const getAllTrans = await axios({
            method: 'post',
            url: 'https://thueapimomo.vn/HISTORYAPIMOMO',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=t8plbr2vcsf80f514gmdl6f376'
            },
            data: qs.stringify({
                'token': '', // process.env.MOMO_TOKEN
                'time': '10'
            })
        });

        const data = getAllTrans.data;

        if (data.status == "success") {
            return data.TranList;
        } else {
            console.log(`Momo Get Transaction Error: ${data.message}`);
        }

    } catch (e) {
        console.log(e.message);
    }
}