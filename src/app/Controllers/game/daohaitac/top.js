let Daohaitac_red = require('../../../Models/Daohaitac/Daohaitac_red');
const redis = require('../../../Redis/RedisService');


module.exports = async function(client) {

    let checkRedis = await redis.get(`daohaitac:gettop`);
    if (checkRedis) {
        client.red({ daohaitac: { top: checkRedis } });
        return;
    }

    Daohaitac_red.find({ type: 2 }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`daohaitac:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ daohaitac: { top: arrayOfResults } });
            });
    });
};