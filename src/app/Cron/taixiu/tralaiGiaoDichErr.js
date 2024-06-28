require('dotenv').config();
let Helpers = require('../../Helpers/Helpers');
let UserInfo = require('../../Models/UserInfo');
let TXPhien = require('../../Models/TaiXiu_phien');
let TXCuoc = require('../../Models/TaiXiu_cuoc');
let Message = require('../../Models/Message');

let UserHistory = require('../../Models/UserHistory');
let UserHistoryEnums = require('../../../config/userHistoryEnums');

module.exports = async function() {
    try {
        let lastPhien = await TXPhien.findOne({}, 'id', { sort: { id: -1 } }).exec();

        if (!!lastPhien) {
            let list = await TXCuoc.find({ thanhtoan: false }, null).sort({ 'bot': 1 }).exec();

            for (var obj of list) {
                if (obj.phien < lastPhien) {

                    await UserInfo.updateOne({ id: obj.uid }, { $inc: { red: obj.bet } }).exec();
                    const user = await UserInfo.findOne({ id: obj.uid }, 'red').exec();

                    if (!!user) {
                        await UserHistory.create({
                            uid: obj.uid,
                            name: obj.name,
                            action: UserHistoryEnums.TAIXIU,
                            transType: UserHistoryEnums.TRANS_PLUS,
                            red: obj.bet,
                            balance: user.red,
                            description: 'Hoàn tiền lỗi phiên ' + obj.phien
                        });

                        await Message.create({
                            uid: obj.uid,
                            title: 'Hoàn trả tài xỉu',
                            text: `Bạn được nhận lại ${Helpers.numberWithCommas(obj.bet)},\n Do phiên Tài Xỉu #${obj.phien} không thể xử lý lệnh cược của bạn!`,
                            time: new Date()
                        });
                    }

                    obj.thanhtoan = true;
                    obj.tralai = obj.bet;
                    obj.save();
                }
            }
        }

        lastPhien = lastPhien.id;

    } catch (e) {
        //console.log(e);
    }
}