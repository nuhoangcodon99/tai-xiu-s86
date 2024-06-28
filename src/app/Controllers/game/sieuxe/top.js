var SieuXe_red = require('../../../Models/SieuXe/SieuXe_red');
const redis = require('../../../Redis/RedisService');

module.exports = async function(client, data) {
    let checkRedis = await redis.get(`sieuxe:gettop`);
    if (checkRedis) {
        client.red({ sieuxe: { top: checkRedis } });
        return;
    }
    SieuXe_red.find({ type: { $gte: 1 } }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`sieuxe:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ sieuxe: { top: arrayOfResults } });
            })
    });
};