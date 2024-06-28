const _ = require('lodash');
var BankHistory = require('../../../Models/Bank/Bank_history');
const helpers = require('../../../Helpers/Helpers');
const axios = require("axios");
const config = require('../../../../config/momo');

module.exports = async(client) => {
    try {
        // bắn thông tin nạp 
        let transid = helpers.getRandomInt(100000000, 999999999);
        let randomContent = helpers.makeid(10);
        const bankDetail = await axios({
            method: 'post',
            url: `https://1spay.online/api/info`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "kind": "json",
                "name": config.name,
                "key": config.key,
                "tranID": transid,
                "type": "Momo",
                "bankCode": "Null",
                "accessToken": config.token,
                "size": 100,
                "character": client.UID + "_" + helpers.makeid(8),
                "comment": randomContent
              })
        });
        
        const reqBankDetail = bankDetail.data;

        if (reqBankDetail.status == 0) {

            BankHistory.create({
                uid: client.UID,
                bank: "MOMO",
                number: reqBankDetail.numberPhone,
                branch: "MOMO",
                name: reqBankDetail.name,
                info: reqBankDetail.comment,
                hinhthuc: 1,
                transId: transid,
                money: 0,
                status: 3,
                time: new Date()
            });

            client.red({
                shop: {
                    momo: {
                        nap: {
                            sdt: reqBankDetail.numberPhone,
                            noidung: reqBankDetail.comment,
                            nguoinhan: reqBankDetail.name
                        }
                    }
                }
            });
        } else {
            client.red({ notice: { title: 'THÔNG BÁO', text: "Hệ thống nạp Momo\nđang bảo trì.\n5000" } });
        }
    } catch (e) {
        console.log(`Error Momo: ${e.message}`);
        client.red({ notice: { title: 'THÔNG BÁO', text: "Hệ thống nạp Momo\nđang bảo trì.\n5001" } });
    }
}