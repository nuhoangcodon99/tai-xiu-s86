var RoyAl_red = require('../../../Models/RoyAl/RoyAl_red');
const redis = require('../../../Redis/RedisService');


module.exports = async function(client, data) {
    let checkRedis = await redis.get(`royal:gettop`);
    if (checkRedis) {
        client.red({ royal: { top: checkRedis } });
        return;
    }
    RoyAl_red.find({ type: { $gte: 1 } }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`royal:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ royal: { top: arrayOfResults } });
            })
    });
};