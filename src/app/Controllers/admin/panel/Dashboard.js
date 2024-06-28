let overview = require('./Overview');
let moneyStatis = require('./Overview/moneyStatis');


module.exports = function(client, data) {
    if (!!data.overview) {
        overview(client);
    }

    if (!!data.moneystatis) {
        moneyStatis(client, data.moneystatis);
    }
}