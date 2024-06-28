module.exports = function(app, redT) {
    // Home
    app.get('/', function(req, res) {
        return res.redirect('https://127.0.0.1/web');
    });
	 app.get('/', function(req, res) {
        return res.redirect('https://127.0.0.1/mobile');
    });

    // Sign API
    require('./api')(app, redT); // load routes API
};