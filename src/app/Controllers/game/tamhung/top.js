var TamHung_red = require('../../../Models/TamHung/TamHung_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client, data) {
    let checkRedis = await redis.get(`tamhung:gettop`);
    if (checkRedis) {
        client.red({ tamhung: { top: checkRedis } });
        return;
    }

    TamHung_red.find({ type: { $gte: 1 } }, 'name win bet time type', { sort: { '_id': -1 }, limit: 100 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`tamhung:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ tamhung: { top: arrayOfResults } });
            })
    });
};