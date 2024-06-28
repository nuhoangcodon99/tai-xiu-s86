var Helpers = require('../app/Helpers/Helpers');
var Users = require('../app/Models/UserInfo');

const getUser = async() => {
    try {
        const allUser = await Users.find({ 'type': true }, 'red name id').sort({ 'red': -1 }).exec();
        for (const user of allUser) {
            // const red = Number(user.red.toString());
            // if (red >= 5000) {
            //     console.log(user.name + ' : ' + Helpers.numberWithCommas(red));
            //     //await Users.updateOne({ 'id': user.id }, { $inc: { red: -red } }).exec();
            // }
            console.log(user.name);
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUser
}