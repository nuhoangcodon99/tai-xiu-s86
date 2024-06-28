let TaiXiu_User = require('../../Models/TaiXiu_user');
let UserInfo = require('../../Models/UserInfo');
let _tops = [];


let topUser = function(io) {
    TaiXiu_User.find({ 'totall': { $gt: 0 } }, 'totall uid', { sort: { totall: -1 }, limit: 10 }, function(err, results) {
        Promise.all(results.map(function(obj) {
                return new Promise(function(resolve, reject) {
                    UserInfo.findOne({ 'id': obj.uid }, function(error, result2) {
                        resolve({ name: !!result2 ? result2.name : '' });
                    })
                })
            }))
            .then(function(result) {
                _tops = result;
                io.top = _tops;
            });
    });
}

module.exports = async(io) => {
    try {
        setInterval(() => {
             topUser(io);
        }, 40000);
    } catch (e) {
        console.log(e.message);
    }
}