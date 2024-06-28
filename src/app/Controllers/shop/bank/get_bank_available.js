const config = require('../../../../config/bankmap');

module.exports = function(client, data) {
    if (!!data) {
        const bankList = [];
        for (const [key, value] of Object.entries(config)) {
            bankList.push({
                name: key,
                code: value,
            });
        }
        client.red({
            shop: { bank: { get_bank_available: bankList } }
        });
    }
}