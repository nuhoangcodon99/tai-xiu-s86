let CaoThap_red = require('../../../Models/CaoThap/CaoThap_red');
let UserInfo = require('../../../Models/UserInfo');
const redis = require('../../../Redis/RedisService');


module.exports = async function(client) {

    let checkRedis = await redis.get(`caothap:gettop`);
    if (checkRedis) {
        client.red({ mini: { caothap: { tops: checkRedis } } });
        return;
    }

    CaoThap_red.find({ play: false }, 'uid goc bet a time', { sort: { '_id': -1 }, limit: 50 }, function(err, result) {
        Promise.all(result.map(function(obj) {
                obj = obj._doc;
                obj.a = (obj.a.length == 3);
                var getPhien = UserInfo.findOne({ id: obj.uid }, 'name').exec();
                return Promise.all([getPhien]).then(values => {
                    Object.assign(obj, values[0]._doc);
                    delete obj.__v;
                    delete obj._id;
                    delete obj.uid;
                    return obj;
                });
            }))
            .then(async function(arrayOfResults) {
                await redis.setex(`caothap:gettop`, 60, arrayOfResults); // cache 60s
                client.red({ mini: { caothap: { tops: arrayOfResults } } });
            })
    });
};