require('dotenv').config();
const assert = require('assert');
const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} = process.env;

assert(REDIS_HOST, "REDIS_HOST configuration is required." );
assert(REDIS_PORT, "REDIS_PORT configuration is required." );

module.exports = { 
    url: `redis://${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
};