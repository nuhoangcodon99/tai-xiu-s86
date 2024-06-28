var LongLan_red = require('../../../Models/LongLan/LongLan_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client) {

    let checkRedis = await redis.get(`longlan:gettop`);
    if (checkRedis) {
        client.red({ longlan: { top: checkRedis } });
        return;
    }
    LongLan_red.find({ type: 2 }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`longlan:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ longlan: { top: arrayOfResults } });
            })
    });
};