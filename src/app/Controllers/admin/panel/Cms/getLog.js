const AdminHistory = require('../../../../Models/AdminHistory');


module.exports = function (client, data) {
        if (!!data && !!data.page) {
            var page  = data.page>>0;
            var kmess = 20;
            if (page > 0) {
                AdminHistory.estimatedDocumentCount().exec(function(err, total){
                    AdminHistory.find({}, {}, {sort:{'_id':-1}, skip: (page-1)*kmess, limit: kmess}, function(err, getlog) {
                        client.red({cms:{getlog, page:page, kmess:kmess, total:total}});
                    });
                });
            }
        }
};