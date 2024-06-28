var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
let MomoConfig = require('../../../Models/Momo/MomoConfig');
let MomoCuoc = require('../../../Models/Momo/MomoCuoc');
const Helpers = require('../../../Helpers/Helpers');

let update = async(client, data) => {
    if (!!data) {
        let momoAccount = await MomoConfig.findOne({ 'prefix': 'momo' }).exec();

        if (!!momoAccount) {
            momoAccount.phone = data.phone;
            momoAccount.name = data.name;
            momoAccount.save();
            client.red({ notice: { title: 'THÀNH CÔNG', text: 'Cập nhật thành công!' } });
        } else {
            MomoConfig.create({
                name: data.name,
                phone: data.phone,
            });
            client.red({ notice: { title: 'THÀNH CÔNG', text: 'Cập nhật thành công!' } });
        }
    }
}

let getConfig = async(client) => {
    let getData = await MomoConfig.findOne({ 'prefix': 'momo' }).exec();
    if (!!getData) {
        client.red({
            momo: {
                config: getData
            }
        });
    } else {
        client.red({
            momo: {
                config: {}
            }
        });
    }
}

let get_data = async(client, data) => {
    try {
        if (!!data && !!data.page) {
            var page = data.page >> 0;
            var kmess = 15;

            if (page > 0) {

                let match = {};

                if (!Helpers.isEmpty(data.name)) {
                    let name = '' + data.name + '';
                    name = name.toLowerCase();
                    match.name = name;
                }

                MomoCuoc.countDocuments(match).exec(function(err, total) {
                    MomoCuoc.find(match, {}, { sort: { '_id': -1 }, skip: (page - 1) * kmess, limit: kmess }, function(err, result) {
                        if (result.length) {
                            Promise.all(result.map(function(obj) {
                                    obj = obj._doc;
                                    delete obj.__v;
                                    return obj;
                                }))
                                .then(function(arrayOfResults) {
                                    client.red({ momo: { get_data: { data: arrayOfResults, page: page, kmess: kmess, total: total } } });
                                })
                        } else {
                            client.red({ momo: { get_data: { data: result, page: page, kmess: kmess, total: total } } });
                        }
                    });
                });
            }
        }
    } catch (e) {
        client.red({ notice: { title: 'Lỗi', text: e.message } });
    }
}

let getstatis = async(client) => {
    let totalRecive = 0;
    let totalWin = 0;
    try {
        let startTime = moment().startOf('day');
        let endTime = moment().endOf('day');

        let findHistory = await MomoCuoc.find({
            date: {
                $gte: startTime.toDate(),
                $lte: endTime.toDate()
            }
        }).exec();

        if (findHistory) {
            findHistory.forEach(async(data) => {
                totalRecive += data.bet;
                if (data.win && data.red > 0) {
                    totalWin += data.red;
                }
            });
        }

        client.red({
            momo: {
                getstatis: {
                    totalRecive,
                    totalReal: totalRecive - totalWin
                }
            }
        });
    } catch (e) {
        console.log(e);
        client.red({
            momo: {
                getstatis: {
                    totalRecive: 0,
                    totalReal: 0
                }
            }
        });
    }
};



module.exports = function(client, data) {
    if (void 0 !== data.getconfig) {
        getConfig(client)
    }
    if (void 0 !== data.update) {
        update(client, data.update)
    }
    if (void 0 !== data.get_data) {
        get_data(client, data.get_data)
    }
    if (void 0 !== data.getstatis) {
        getstatis(client)
    }
}