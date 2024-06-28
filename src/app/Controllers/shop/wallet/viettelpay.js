const _ = require('lodash');
const UserInfo = require('../../../Models/UserInfo');
const BankHistory = require('../../../Models/Bank/Bank_history');
const helpers = require('../../../Helpers/Helpers');
const axios = require("axios");
const config = require('../../../../config/vtpay.js');

module.exports = async(client) => {
    try {
        const userData = await UserInfo.findOne({ id: client.UID }, 'UID').exec();
        const getData = await axios({
            method: 'get',
            url: `${config.URL}?partner=${config.PARTNER_ID}&uid=${userData.UID}`,
            headers: {}
        });
        const apiData = getData.data;

        if (apiData.status) {
            const dataRes = apiData.data;
            const checkExitsOrder = await BankHistory.findOne({ info: dataRes.content, status: 0 }).exec();

            if (!checkExitsOrder) {
                // chưa có đơn thì tạo đơn trong data
                let transid = helpers.getRandomInt(100000000, 999999999);
                BankHistory.create({
                    uid: client.UID,
                    bank: "VIETTELPAY",
                    number: dataRes.phone,
                    branch: "VIETTELPAY",
                    name: dataRes.name.toUpperCase(),
                    info: dataRes.content,
                    hinhthuc: 1,
                    transId: transid,
                    money: 0,
                    status: 3,
                    time: new Date()
                });
            }


            client.red({
                shop: {
                    wallet: {
                        nap: {
                            sdt: dataRes.phone,
                            noidung: dataRes.content,
                            nguoinhan: dataRes.name
                        }
                    }
                }
            });
        } else {
            client.red({ notice: { title: 'THÔNG BÁO', text: "Hệ thống nạp ViettelPay\nđang bảo trì." } });
        }
    } catch (e) {
        client.red({ notice: { title: 'THÔNG BÁO', text: "Ops!\nCó lỗi bất ngờ!." } });
    }
}