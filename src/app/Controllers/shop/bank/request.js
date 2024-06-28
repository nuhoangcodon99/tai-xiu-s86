var BankHistory = require('../../../Models/Bank/Bank_history');

module.exports = async(client, data) => {
    try {
        if (!!data.amount && !!data.transid) {
            let amount = data.amount >> 0;
            BankHistory.findOne({ transId: data.transid }, '', function(err, bank) {
                if (!!bank) {
                    bank.money = amount;
                    bank.save();
                    client.red({ notice: { title: 'THÀNH CÔNG', text: 'Gửi yêu cầu nạp thành công...' } });
                } else {
                    client.red({ notice: { title: 'LỖI', text: 'Không tìm thấy yêu cầu nạp trên hệ thống' } });
                }
            });
        } else {
            client.red({ notice: { title: "Bảo trì", text: "Thiếu dữ liệu!", "load": false } });
        }
    } catch (err) {
        client.red({ notice: { title: "Bảo trì", text: "Bảo trì hệ thống nạp bank", "load": false } });
        console.log(err.message);
    }
}