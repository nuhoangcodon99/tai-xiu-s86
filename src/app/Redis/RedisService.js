const asyncRedis = require("async-redis");
// Setting & Connect to the Redis
const configRedis = require('../../config/redis');
// create and connect redis client to local instance.
const redisClient = asyncRedis.createClient(configRedis);

redisClient.on('connect', () => {});
redisClient.on('message', (channel, message) => {});
redisClient.on('error', (error) => {
    console.log(`Redis Error: ${error}`);
});

module.exports = {
    set: async (key, value) => {
        await redisClient.set(key, JSON.stringify(value));
        //await redisClient.quit();
    },
    setex: async (key, time, value) => {
        await redisClient.setex(key, time, JSON.stringify(value));
        //await redisClient.quit();
    },
    get: async (key) => {
        let exportData;
        const data = await redisClient.get(key);
        exportData = JSON.parse(data);
        //redisClient.quit();
        return exportData;
    }
}