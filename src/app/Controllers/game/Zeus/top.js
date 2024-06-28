var Zeus_red = require('../../../Models/Zeus/Zeus_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client, data) {
    let checkRedis = await redis.get(`zeus:gettop`);
    if (checkRedis) {
        client.red({ Zeus: { top: checkRedis } });
        return;
    }
    Zeus_red.find({ type: { $gte: 2 } }, 'name win bet time type', { sort: { '_id': -1 }, limit: 100 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`zeus:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ Zeus: { top: arrayOfResults } });
            })
    });

};