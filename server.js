require('dotenv').config();
const app = require('./src/app'); // load express handle

/**
 * Start Express server.
 */
const server = app.listen(process.env.PORT, () => {
    console.log(
        ">>> Server is running at port %d in %s mode",
        process.env.PORT,
        process.env.ENV_ENVIROMENT
    );
    console.log(">>> Press CTRL-C to stop server\n");
});