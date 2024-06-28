let Information = require('./HeThong/Information');
let GameStatus = require('./HeThong/GameStatus');
let system = require('./HeThong/System');


module.exports = function(client, data) {
    if (!!data.information) {
        Information(client, data);
    }
    if (!!data.gamestatus) {
        GameStatus(client, data);
    }
    if (!!data.system) {
        system(client, data.system);
    }
}