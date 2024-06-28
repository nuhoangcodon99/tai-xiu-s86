var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const BankHistory = require('../../../../Models/Bank/Bank_history');
const NapThe = require('../../../../Models/NapThe');
const MuaThe = require('../../../../Models/MuaThe');

let getStartEndOfDate = (type, time, day) => {
    return (type == "start") ? moment(time.subtract(day, "days")).startOf('day') : moment(time.subtract(day, "days")).endOf('day');
}


module.exports = async function(client, data) {

    try {

        const limitGetDay = data.since >> 0;

        let nap = {};
        let rut = {};

        for (var i = limitGetDay - 1; i >= 0; i--) {
            const startTime = getStartEndOfDate("start", moment(), i);
            const endTime = getStartEndOfDate("end", moment(), i);

            nap[startTime.format("DD/MM/YYYY")] = {};
            rut[startTime.format("DD/MM/YYYY")] = {};

            nap[startTime.format("DD/MM/YYYY")].bank = [];
            nap[startTime.format("DD/MM/YYYY")].momo = [];
            nap[startTime.format("DD/MM/YYYY")].thecao = [];
            nap[startTime.format("DD/MM/YYYY")].viettelpay = [];
            nap[startTime.format("DD/MM/YYYY")].thecao = [];
            rut[startTime.format("DD/MM/YYYY")].thecao = [];
            rut[startTime.format("DD/MM/YYYY")].bank = [];

            let findHistory = await BankHistory.find({
                time: {
                    $gte: startTime.toDate(),
                    $lte: endTime.toDate()
                },
                type: 0,
                status: 1
            }).exec();

            if (findHistory) {
                findHistory.forEach(async(data) => {

                    if (data.bank == "MOMO") {
                        nap[startTime.format("DD/MM/YYYY")].momo.push(data);
                    } else if (data.bank == "VIETTELPAY") {
                        nap[startTime.format("DD/MM/YYYY")].viettelpay.push(data);
                    } else {
                        nap[startTime.format("DD/MM/YYYY")].bank.push(data);
                    }

                });

            }

            nap[startTime.format("DD/MM/YYYY")].thecao = await NapThe.find({
                time: {
                    $gte: startTime.toDate(),
                    $lte: endTime.toDate()
                },
                status: 1
            }).exec();

            rut[startTime.format("DD/MM/YYYY")].thecao = await MuaThe.find({
                time: {
                    $gte: startTime.toDate(),
                    $lte: endTime.toDate()
                },
                status: 1
            }).exec();

            rut[startTime.format("DD/MM/YYYY")].bank = await BankHistory.find({
                time: {
                    $gte: startTime.toDate(),
                    $lte: endTime.toDate()
                },
                type: 1,
                status: 1
            }).exec();
        }

        client.red({ dashboard: { moneystatis: { since: limitGetDay, nap, rut } } });
    } catch (e) {
        console.log(e);
    }
}