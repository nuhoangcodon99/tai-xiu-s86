let Bank_history = require('../Models/Bank/Bank_history');
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");

module.exports = () => {
    try {
        var startDay = moment().startOf('day').toISOString();

        // Bank_history.find({ time: { $lte: startDay } }, (err, bank) => {
        //     // bank.forEach((row) => {
        //     //     console.log(row);
        //     //     // some do  
        //     // });
        // })
    } catch (err) {

    }
}