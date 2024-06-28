module.exports = function (io) {
    // Phát sóng tới tất cả người dùng và khách
    io.sendAllAgency = function (data, noBroadcast = null) {
        this.clients.forEach(function (client) {
            if (client.agency && noBroadcast !== client) {
                client.red(data);
            }
        });
    };
};