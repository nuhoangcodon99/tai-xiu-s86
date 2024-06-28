const Helpers = require('../../Helpers/Helpers');
const xsmbModel = require('../../Models/XoSo/mb/xsmb');
const xsmbTrathuong = require('./XSMB_trathuong');
const axios = require('axios');

let check = function (text) {
    text = text.trim();
    return !!text ? text : '';
}

module.exports = async () => {
    try {
        const getKetQua = await axios({
            method: 'get',
            url: 'https://api.vesoviet.com.vn/api/v1/lottery-results?productid=7',
            responseType: 'json'
        });
        let xsmb = getKetQua.data;
        let date = xsmb.termDate;
        let db, g1, g2, g3, g4, g5, g6, g7;

        xsmb.result.forEach(data => {
            if (data.type == 'dacbiet') {
                db = check(data.result[0]);
            }
            if (data.type == 'giainhat') {
                g1 = check(data.result[0]);
            }
            if (data.type == 'giainhi') {
                g2 = [data.result[0], data.result[1]];
            }
            if (data.type == 'giaiba') {
                g3 = [data.result[0], data.result[1], data.result[2], data.result[3], data.result[4], data.result[5]];
            }
            if (data.type == 'giaitu') {
                g4 = [data.result[0], data.result[1], data.result[2], data.result[3]];
            }
            if (data.type == 'giainam') {
                g5 = [data.result[0], data.result[1], data.result[2], data.result[3], data.result[4], data.result[5]];
            }
            if (data.type == 'giaisau') {
                g6 = [data.result[0], data.result[1], data.result[2]];
            }
            if (data.type == 'giaibay') {
                g7 = [data.result[0], data.result[1], data.result[2], data.result[3]];
            }
        });

        xsmbModel.findOne({ date: date }, {}, function (err, result) {
            if (!!result) {
                result.gdb = db;
                result.g1 = g1;
                result.g2 = g2;
                result.g3 = g3;
                result.g4 = g4;
                result.g5 = g5;
                result.g6 = g6;
                result.g7 = g7;
                result.save();
                date = null;
                db = null;
                g1 = null;
                g2 = null;
                g3 = null;
                g4 = null;
                g5 = null;
                g6 = null;
                g7 = null;
                result = null;
            } else {
                xsmbModel.create({ date: date, gdb: db, g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, g7: g7 });
                date = null;
                db = null;
                g1 = null;
                g2 = null;
                g3 = null;
                g4 = null;
                g5 = null;
                g6 = null;
                g7 = null;
            }
        });

    } catch (e) {
        console.log(`Error Cron XSMB: ${ e.message }`);
    }
};