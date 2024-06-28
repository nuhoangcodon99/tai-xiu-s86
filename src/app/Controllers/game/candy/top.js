let Candy_red = require('../../../Models/Candy/Candy_red');
const redis = require('../../../Redis/RedisService');


module.exports = async function(client) {

    let checkRedis = await redis.get(`candy:gettop`);
    if (checkRedis) {
        client.red({ candy: { top: checkRedis } });
        return;
    }


    Candy_red.find({ type: 2 }, 'name win bet time type', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                delete obj.__v;
                delete obj._id;
                return obj;
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`candy:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ candy: { top: arrayOfResults } });
            });
    });
};