var Bank_history = require('../../../../Models/Bank/Bank_history');
var UserInfo = require('../../../../Models/UserInfo');

module.exports = async function(client, data) {
    if (data.uid && data.status) {
        var status = data.status >> 0;

        const getAll = await Bank_history.find({ 'uid': data.uid });

        if (getAll) {
            getAll.forEach(async(col) => {
                if (col.status !== status) {
                    var update = {};
                    if (status === 2) {
                        update.red = col.money; // trả lại
                    } else if (col.status === 2) {
                        update.red = -col.money; // trừ tiền
                    }
                    await UserInfo.updateOne({ 'id': col.uid }, { $inc: update }).exec();
                }

                col.status = status;
                if (data.info) {
                    var info = '' + data.info + '';
                    if (info.length < 32) {
                        col.info = data.info;
                    }
                }
                col.save();
            });
            client.red({ notice: { title: 'THÀNH CÔNG', text: `Duyệt yêu cầu thành công!` } });
        }

    }
}