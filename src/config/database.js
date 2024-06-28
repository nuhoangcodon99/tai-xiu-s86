require('dotenv').config();
const assert = require('assert');
const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME
} = process.env;

assert(DATABASE_HOST, "DATABASE_HOST configuration is required." );
assert(DATABASE_PORT, "DATABASE_PORT configuration is required." );
assert(DATABASE_NAME, "DATABASE_NAME configuration is required." );

module.exports = {
    'url': `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
    'options': {
        'user': `${process.env.DATABASE_USERNAME}`,
        'pass': `${process.env.DATABASE_PASSWORD}`,
        'dbName': `${process.env.DATABASE_NAME}`,
        'useNewUrlParser': true,
        'useUnifiedTopology': true,
        'ssl': false,
        //'autoIndex':       false,
    },
};