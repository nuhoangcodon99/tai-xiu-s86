const GiftCodeOne = require('../app/Models/GiftCodeOne');


const clearGiftCode = async(condition) => {
    try {
        const allGiftCode = await GiftCodeOne.deleteMany({ 'type': false }, 'red name id').sort({ 'red': -1 }).exec();
        console.log("DONE~~~");
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    clearGiftCode
}