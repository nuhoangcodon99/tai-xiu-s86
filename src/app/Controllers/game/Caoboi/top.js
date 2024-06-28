var Caoboi_red = require('../../../Models/Caoboi/Caoboi_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client, data) {

    let checkRedis = await redis.get(`caoboi:gettop`);
    if (checkRedis) {
        client.red({ Caoboi: { top: checkRedis } });
        return;
    }

    Caoboi_red.find({ type: { $gte: 2 } }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`caoboi:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ Caoboi: { top: arrayOfResults } });
            })
    });
};