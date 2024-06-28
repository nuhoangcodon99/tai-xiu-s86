var tabTranDau = require('../../../../Models/BongDa/BongDa');


module.exports = function(client) {
    tabTranDau.find({ 'blacklist': 0 }, function(err, data) {
        client.red({ bongda: { data: data } });
    });
}