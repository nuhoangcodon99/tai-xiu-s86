require('dotenv').config();
let MomoModel = require('../Models/Momo');
let UserInfo = require('../Models/UserInfo');
let GetTranSaction = require('../Helpers/RequestMomo');
let Helpers = require('../Helpers/Helpers');
let telegram = require('../Helpers/Telegram');


module.exports = async(redT) => {
    try {
        // setInterval(async() => {
        //     try {
        //         const getAllTrans = await GetTranSaction();
        //         if (getAllTrans.length > 0) {
        //             for (const transaction of getAllTrans) {
        //                 if (transaction.tranId) {
        //                     if (transaction.io == 1) {
        //                         const check = await MomoModel.countDocuments({ transid: transaction.tranId });
        //                         if (check == 0) {
        //                             const user = await UserInfo.findOne({ name: String(transaction.comment).toLowerCase() });
        //                             if (!!user) {
        //                                 const updateUser = await UserInfo.findOneAndUpdate({
        //                                     id: user.id
        //                                 }, {
        //                                     $inc: {
        //                                         red: transaction.amount
        //                                     }
        //                                 }).exec();

        //                                 if (!!user && void 0 !== redT.users[user.id]) {
        //                                     redT.users[user.id].forEach(function(obj) {
        //                                         obj.red({ notice: { title: 'THÀNH CÔNG', text: 'Bạn vừa nạp ' + Helpers.numberWithCommas(transaction.amount) + ' GOLD từ ví Momo thành công!', load: false }, user: { red: user.red * 1 + transaction.amount } });
        //                                     });
        //                                 }

        //                                 MomoModel.create({
        //                                     transid: Number(transaction.tranId),
        //                                     username: user.name,
        //                                     phone: transaction.partnerId,
        //                                     name: transaction.partnerName,
        //                                     amount: Number(transaction.amount),
        //                                     time: Number(transaction.time),
        //                                     status: 1
        //                                 });

        //                                 telegram(process.env.TELEGRAM_RECHARGE_GROUP, ` ${user.name.toUpperCase()}` + "\n" + `├ loại nạp: Momo` + "\n" + `├ số tiền: ${Helpers.numberWithCommas(Number(transaction.amount))}` + "\n" + `├ nạp từ: ${transaction.partnerId}` + "\n" + `├ người nạp: ${transaction.partnerName}` + "\n" + `└ mã giao dịch: ${Number(transaction.tranId)}` + "\n");

        //                             }
        //                         } else {}
        //                     }
        //                 }
        //             }
        //         } else {
        //             //console.log(`Momo Get Transaction Error: ${data.message}`);
        //         }
        //     } catch (e) {
        //         //console.log(e.message);
        //     }
        // }, 20000);

    } catch (e) {
        //console.log(e.message);
    }
}