var HU = require('../../../../Models/HU');
var config = require('../../../../../config/sexandzen.json');

module.exports = function(client) {
    HU.find({ game: 'sexandzen', red: true }, 'name type redPlay redWin redLost hu', function(err, cat) {
        Promise.all(cat.map(function(obj) {
                obj = obj._doc;
                delete obj._id;
                return obj;
            }))
            .then(varT => {
                client.red({ sexandzen: { hu: varT, chedo: config.chedo } });
            })
    });
}