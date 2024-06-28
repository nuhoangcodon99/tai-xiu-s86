require('dotenv').config();
const helper = require("../Helpers/Helpers");

module.exports = async (redT) => {
    try {
        setInterval(async () => {
            try {
                let total = helper.getRandomInt(580, 700);
                redT.broadcast({ online: { total } });
            } catch (e) { }
        }, 7000);
    } catch (e) {
        console.log(e.message);
    }
}