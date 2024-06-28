const guessResult = require('../app/Controllers/agency/guessResult');

module.exports = function (ws, redT) {
    ws.agency = true;
    ws.auth = false;
    ws.UID = null;
    ws.red = function (data) {
        try {
            this.readyState == 1 && this.send(JSON.stringify(data));
        } catch (err) { }
    }

    guessResult.Taixiu(redT);

    // handle when user send messages 
    ws.on('message', function (message) {
        try {
            if (!!message) {
                message = JSON.parse(message);
                if (this.auth == false && !!message.authentication) {
                    console.log("Agency UnAuth: " + message);
                } else if (!!this.auth) {
                    console.log("Agency Auth: " + message);
                }
            }
        } catch (error) { }
    });

    // handle when user close socket connect
    ws.on('close', function (message) {
        this.UID = null;
        this.auth = false;
    });
}