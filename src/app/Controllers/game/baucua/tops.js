let BauCua_user = require('../../../Models/BauCua/BauCua_user');
let UserInfo = require('../../../Models/UserInfo');
const redis = require('../../../Redis/RedisService');


module.exports = async function(client) {

    let checkRedis = await redis.get(`baucua:gettop`);
    if (checkRedis) {
        client.red({ mini: { baucua: { tops: checkRedis } } });
        return;
    }

    BauCua_user.find({ 'totall': { $gt: 0 } }, 'totall uid', { sort: { totall: -1 }, limit: 10 }, function(err, results) {
        Promise.all(results.map(function(obj) {
                return new Promise(function(resolve, reject) {
                    UserInfo.findOne({ 'id': obj.uid }, function(error, result2) {
                        resolve({ name: !!result2 ? result2.name : '', bet: obj.totall });
                    });
                });
            }))
            .then(async function(data) {
                await redis.setex(`baucua:gettop`, 60, data); // cache 60s
                client.red({ mini: { baucua: { tops: data } } });
                data = null;
                client = null;
            });
    });
};