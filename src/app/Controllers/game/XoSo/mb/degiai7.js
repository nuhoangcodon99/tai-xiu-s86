let UserInfo = require('../../../../Models/UserInfo');
let xsmb_cuoc = require('../../../../Models/XoSo/mb/xsmb_cuoc');

let numberPad = require('../../../../Helpers/Helpers').numberPad;

module.exports = function(client, data) {
    if (!!data.so && typeof data.so === 'string' && !!data.diem) {
        let diem = data.diem >> 0;

        // giới hạn số điểm đặt
        if (diem > 1000000) {
            client.red({ XoSo: { notice: 'Số điểm tối đa là 1.000.000' } });
            return void 0;
        }

        // Tách số
        let res = data.so.split(',');
        res = res.map(function(obj) {
            obj = obj.trim();
            if (obj.length === 2) {
                return obj;
            }
            return void 0;
        });
        res = res.filter(function(obj) {
            return obj !== void 0;
        });
        if (res.length === 0) {
            client.red({ XoSo: { notice: 'Số chọn không hợp lệ...' } });
        } else if (res.length > 10) {
            client.red({ XoSo: { notice: '1 Vé cược tối đa 10 Số...' } });
        } else {
            let tongTien = res.length * diem * 4000;
            UserInfo.findOne({ id: client.UID }, 'red', function(err, users) {
                if (!!users && users.red >= tongTien) {
                    users.red -= tongTien;
                    users.save();

                    let date = new Date();
                    let stringTime = numberPad(date.getDate(), 2) + '/' + numberPad(date.getMonth() + 1, 2) + '/' + date.getFullYear();

                    xsmb_cuoc.create({ name: client.profile.name, date: stringTime, type: 'degiai7', so: res, diem: diem, cuoc: tongTien, time: new Date() });
                    client.red({ notice: { text: 'CƯỢC THÀNH CÔNG...', title: 'THÀNH CÔNG' }, user: { red: users.red - tongTien } });
                    date = null;
                    stringTime = null;
                    users = null;
                    tongTien = null;
                    diem = null;
                } else {
                    client.red({ XoSo: { notice: 'Số dư không khả dụng...' } });
                }
                res = null;
                client = null;
            });
        }
    } else {
        client.red({ XoSo: { notice: 'Dữ liệu không đúng...' } });
    }
};