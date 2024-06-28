var UserInfo = require('../../../../../Models/UserInfo');
var UserHistory = require('../../../../../Models/UserHistory');

module.exports = function(client, data) {
    if (!!data.id && data.page) {
        var page = data.page >> 0;
        UserInfo.findOne({ 'id': data.id }, 'name', function(err, user) {
            if (!!user) {
                if (data.page > 0) {
                    var kmess = 20;
                    UserHistory.countDocuments({ name: user.name }).exec(function(err, total) {
                        UserHistory.find({ name: user.name }, {}, { sort: { '_id': -1 }, skip: (page - 1) * kmess, limit: kmess }, function(err, result) {
                            client.red({ users: { biendong: { data: result, page: page, kmess: kmess, total: total } } });
                        });
                    });
                }
            }
        });
    }
}