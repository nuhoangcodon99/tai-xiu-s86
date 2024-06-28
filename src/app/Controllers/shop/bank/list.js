var BankHistory = require('../../../Models/Bank/Bank_history');
let helpers = require('../../../Helpers/Helpers');
const axios = require("axios");
const config = require('../../../../config/napbank');

module.exports = async (client) => {
    try {
        const getBankAvailible = await axios({
            method: 'get',
            url: `${config.API_URL}/bank/list?name=${config.NAME}&key=${config.KEY}`,
            headers: {}
        });
        const bankAvailible = getBankAvailible.data;
        let bankList = [];

        if (bankAvailible.isError) {
            client.red({ notice: { title: 'LỖI', text: 'Nạp ngân hàng đang bảo trì!' } });
            return void 0;
        }

        for (var bank of bankAvailible.data) {
            let transid = helpers.getRandomInt(100000000, 999999999);
            const bankDetail = await axios({
                method: 'post',
                url: `${config.API_URL}/info`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "kind": "json",
                    "name": config.NAME,
                    "key": config.KEY,
                    "tranID": transid,
                    "type": "Bank",
                    "bankCode": bank.bankCode,
                    "accessToken": config.TOKEN,
                    "size": 100,
                    "character": client.UID + "_" + helpers.makeid(8),
                    "comment": "WinVip_Create_Transaction"
                })
            });

            const reqBankDetail = bankDetail.data;

            if (!!reqBankDetail) {
                BankHistory.create({
                    uid: client.UID,
                    bank: bank.bankName.toUpperCase(),
                    number: reqBankDetail.numberPhone,
                    branch: bank.bankCode,
                    name: reqBankDetail.name.toUpperCase(),
                    info: reqBankDetail.comment,
                    hinhthuc: 1,
                    transId: reqBankDetail.TranID,
                    money: 0,
                    status: 3,
                    time: new Date()
                });
            
                bankList.push({
                    bank: bank.bankName.toUpperCase(),
                    number: reqBankDetail.numberPhone,
                    name: reqBankDetail.name.toUpperCase(),
                    branch: bank.shortName.toUpperCase(),
                    content: reqBankDetail.comment,
                    transid: reqBankDetail.TranID
                });
            }
        
        }
        client.red({ shop: { bank: { list: bankList } } });
    } catch (e) {
        console.log(`Error Bank: ${e.message}`);
    }
}