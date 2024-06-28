var BigBabol_red = require('../../../Models/BigBabol/BigBabol_red');
const redis = require('../../../Redis/RedisService');



module.exports = async function(client) {

    let checkRedis = await redis.get(`bigbabal:gettop`);
    if (checkRedis) {
        client.red({ mini: { big_babol: { top: checkRedis } } });
        return;
    }

    BigBabol_red.find({ type: 2 }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`bigbabal:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ mini: { big_babol: { top: arrayOfResults } } });
            })
    });
};