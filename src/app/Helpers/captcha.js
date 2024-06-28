var fs = require('fs');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let Create = function(client, name) {
    var arrCaptcha = [
        "4885",
        "2822",
        "6573",
        "5766",
        "4885",
        "8966",
        "8563",
        "6244",
        "1668",
        "3696",
        "7611",
        "7849",
        "9466",
        "9336",
        "5751",
        "6147"
    ];
    var randomNumb = getRandomInt(16);
    var captchaValue = arrCaptcha[randomNumb];

    fs.readFile(process.cwd() + '/src/data/captcha/' + randomNumb + '.png', function(err, buffer) {
        client.captcha = captchaValue;
        let data = {};
        data['data'] = 'data:image/png;base64,' + buffer.toString('base64');
        data['name'] = name;
        client.red({ captcha: data });
    });
}


module.exports = function(data) {
    switch (data) {
        case 'signUp':
            Create(this, 'signUp');
            break;

        case 'signIn':
            Create(this, 'signIn');
            break;

        case 'giftcode':
            Create(this, 'giftcode');
            break;

        case 'forgotpass':
            Create(this, 'forgotpass');
            break;

        case 'transfer':
            Create(this, 'transfer');
            break;

        case 'chargeCard':
            Create(this, 'chargeCard');
            break;

        case 'regOTP':
            Create(this, 'regOTP');
            break;

        case 'withdrawCard':
            Create(this, 'withdrawCard');
            break;
    }
}
