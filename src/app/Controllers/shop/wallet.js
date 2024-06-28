let momo = require('./wallet/momo.js');
let viettelpay = require('./wallet/viettelpay.js');

module.exports = function(client, data) {
    if (!!data.gate) {
        if (data.gate == "momo") {
            momo(client);
        }
        if (data.gate == "viettelpay") {
            viettelpay(client);
        }
    }
}