let TXPhien = require('../Models/TaiXiu_phien');
let helpers = require('../Helpers/Helpers');

function randomIntegerTaixiu(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = async (status) => {
    if (!status) return;
        console.log("Start Init Taixiu Phien!");
        const last = await TXPhien.findOne({}, 'id', { sort: { 'id': -1 } }).exec();
        if (!!last) {
            var i = last.id + 1;
            for (i; i <= 15243; i++) {
                console.log(i);
                let dice1 = helpers.randomInteger(1, 6);
                let dice2 = helpers.randomInteger(1, 6);
                let dice3 = helpers.randomInteger(1, 6);

                const createPhien = await TXPhien.create({ 'dice1': dice1, 'dice2': dice2, 'dice3': dice3, 'time': new Date() });
                if (createPhien) {
                    console.log("Created round: " + createPhien.id);
                    dice1 = null;
                    dice2 = null;
                    dice3 = null;
                }
            }
        } else {
            console.log("Error Taixiu get last round!");
        }
}