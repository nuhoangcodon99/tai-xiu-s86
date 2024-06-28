// Router HTTP / HTTPS
var mobile = require('is-mobile');
module.exports = function(app, redT) {
    // Home
    app.get('/', function(req, res) {
        if (mobile({ ua: req })) {
            return res.redirect('/mobile/');
        } else {
            return res.redirect('/web/');
        }
    });
    app.get('/web/', function(req, res) {
        if (mobile({ ua: req })) {
            return res.redirect('/mobile/');
        } else {
            return res.render('index');
        }
    });
    app.get('/mobile/', function(req, res) {
        if (mobile({ ua: req })) {
            return res.render('index_mobile');
        } else {
            return res.redirect('/web/');
        }
    });
    app.get('/telegram/', function(req, res) {
            return require('./routes/telegram/redirect')(res);
    });

    // doi tien ban ca
    app.post('/0dad22e92af4b6d5f32d332782378076/', function(req, res) {
        return require('./app/Controllers/game/cashIn')(req,res);
    });

    // Admin
    app.get('/zad199/', function(req, res) {
        return res.render('admin');
    });

    // Fanpage
    app.get('/fanpage/', function(req, res) {
        return require('./routes/fanpage/redirect')(res);
    });

    // Fanpage
    app.get('/group/', function(req, res) {
        return require('./routes/group/redirect')(res);
    });

    app.post('/727ed2360085c1d77316468e5c407233', function(req, res) {
        return require('./app/Controllers/shop/nap_the_callback')(req,res);
    });

    app.get('/727ed2360085c1xxxxxa68e5c407233', function(req, res) {
        return require('./app/Controllers/shop/callbackcard')(req,res);
    });


    app.get('/010660adeb52e67bf3b3d008a6f14d79', function(req, res) {
        return require('./app/Controllers/shop/momocallback')(req,res);
    });

    app.get('/b62fde6246f27d5b88ba0e79b449a252', function(req, res) {
        return require('./app/Controllers/shop/bankcallback')(req,res);
    });

    app.get('/GetCaptcha', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        return require('./app/Controllers/landing/getCaptcha')(req,res);
    });

    app.get('/CheckExistAccountName', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        return require('./app/Controllers/landing/CheckExistAccountName')(req,res);
    });

    app.get('/CheckExistNickName', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        return require('./app/Controllers/landing/CheckExistNickName')(req,res);
    });

    app.post('/QuickRegister', function(req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        return require('./app/Controllers/landing/QuickRegister')(req,res);
    });

    // Help IOS
    app.get('/help/ios/', function(req, res) {
        return res.render('help/ios');
    });

    // Sign API
    //require('./routes/api')(app, redT); // load routes API


};
