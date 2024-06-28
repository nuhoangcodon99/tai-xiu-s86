let Sexandzen_red = require('../../../Models/Sexandzen/Sexandzen_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client) {

    let checkRedis = await redis.get(`royal:gettop`);
    if (checkRedis) {
        client.red({ sexandzen: { top: checkRedis } });
        return;
    }

    Sexandzen_red.find({ type: 2 }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`sexandzen:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ sexandzen: { top: arrayOfResults } });
            });
    });
};