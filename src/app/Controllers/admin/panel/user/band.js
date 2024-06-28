let lock = require('./band/lock');
let unlock = require('./band/unlock');


module.exports = function(client, data) {
    if (!!data.lock) {
        lock(client, data.lock);
    }
    if (!!data.unlock) {
        unlock(client, data.unlock);
    }
}