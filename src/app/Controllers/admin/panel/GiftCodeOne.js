var validator = require('validator');
var shortid = require('shortid');
var GiftCodeOne = require('../../../Models/GiftCodeOne');
var UsedGiftCodeOne = require('../../../Models/UsedGiftCode');
var helpers = require('../../../Helpers/Helpers');

function get_data(client, data) {
    if (!!data && !!data.page) {
        var page = data.page >> 0;
        var kmess = 10;
        if (page > 0) {
            let arrGiftCode = [];
            GiftCodeOne.estimatedDocumentCount().exec(function(err, total) {
                GiftCodeOne.find({}, {}, { sort: { '_id': -1 }, skip: (page - 1) * kmess, limit: kmess }, function(err, result) {
                    client.red({ giftcodeone: { get_data: { data: result, page: page, kmess: kmess, total: total } } });
                });
            });
        }
    }
}

function get_used_gift(client, data) {
    if (!!data && !!data.giftcode) {
        UsedGiftCodeOne.find({ 'code': data.giftcode }, function(err, result) {
            client.red({ giftcodeone: { get_used_gift: { data: result } } });
        });
    }
}

function get_gift(client) {
    client.red({ giftcode: { get_gift: helpers.makeid(8) } });
}

function create_gift(client, data) {
    if (!!data && !!data.giftcode &&
        !!data.ngay &&
        !!data.thang &&
        !!data.nam) {
        if (!validator.isEmpty(data.giftcode)) {
            var giftcode = '' + data.giftcode + '';
            var red = data.red >> 0;
            var quality = data.quality >> 0;
            var ngay = (data.ngay >> 0) + 1;
            var thang = (data.thang >> 0) - 1;
            var nam = data.nam >> 0;

            GiftCodeOne.findOne({ 'code': giftcode }, function(err, check) {
                if (!!check) {
                    client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode đã tồn tại...' } });
                } else {
                    try {
                        GiftCodeOne.create({
                            'code': giftcode,
                            'red': red,
                            'quality': quality,
                            'date': new Date(),
                            'todate': new Date(nam, thang, ngay)
                        }, function(errgift, gift) {
                            if (!!gift) {
                                GiftCodeOne.estimatedDocumentCount().exec(function(err, total) {
                                    GiftCodeOne.find({}, {}, { sort: { '_id': -1 }, skip: 0, limit: 10 }, function(err, result) {
                                        client.red({ giftcodeone: { get_data: { data: result, page: 1, kmess: 10, total: total } }, notice: { title: 'TẠO GIFTCODE', text: 'Tạo gift code thành công...' } });
                                    });
                                });
                            }
                        });
                    } catch (error) {
                        client.red({ notice: { title: 'THẤT BẠI', text: 'Mã GiftCode đã tồn tại...' } });
                    }
                }
            })
        }
    }
}

function remove(client, id) {
    if (!!id) {
        GiftCodeOne.findOne({ '_id': id }, function(err, check) {
            if (!!check) {
                var active = GiftCodeOne.findOneAndRemove({ '_id': id }).exec();
                Promise.all([active])
                    .then(values => {
                        GiftCodeOne.estimatedDocumentCount().exec(function(err, total) {
                            GiftCodeOne.find({}, {}, { sort: { '_id': -1 }, skip: 0, limit: 10 }, function(err, data) {
                                client.red({ banklist: { remove: true }, giftcodeone: { get_data: { data: data, page: 1, kmess: 10, total: total } }, notice: { title: 'GIFT CODE', text: 'Xoá thành công...' } });
                            });
                        });
                    })
            } else {
                GiftCodeOne.estimatedDocumentCount().exec(function(err, total) {
                    GiftCodeOne.find({}, {}, { sort: { '_id': -1 }, skip: 0, limit: 10 }, function(err, data) {
                        client.red({ giftcodeone: { get_data: { data: data, page: 1, kmess: 10, total: total } }, notice: { title: 'GIFT CODE', text: 'Gift code không tồn tại...' } });
                    });
                });
            }
        })
    }
}

let create_mutil_gift = (client, data) => {
    if (!!data &&
        !!data.ngay &&
        !!data.thang &&
        !!data.nam) {
        var red = data.red >> 0;
        var quality = data.quality >> 0;
        var ngay = (data.ngay >> 0) + 1;
        var thang = (data.thang >> 0) - 1;
        var nam = data.nam >> 0;
        var limit = data.limit >> 0;

        try {
            for (var i = 0; i <= limit; i++) {
                const giftcode = helpers.makeid(8);
                GiftCodeOne.findOne({ 'code': giftcode }, function(err, check) {
                    if (!!check) {} else {
                        try {
                            GiftCodeOne.create({
                                'code': giftcode,
                                'red': red,
                                'quality': quality,
                                'date': new Date(),
                                'todate': new Date(nam, thang, ngay)
                            }, function(errgift, gift) {
                                if (!!gift) {
                                    client.red({ giftcodeone: { export: { code: giftcode } } });
                                } else {}
                            });
                        } catch (error) {
                            console.log(`Err Exc GiftCode: ${error.message}`);
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e.message);
        }

    }
}


module.exports = function(client, data) {
    if (!!data.get_data) {
        get_data(client, data.get_data);
    }
    if (!!data.get_gift) {
        get_gift(client);
    }
    if (!!data.create_gift) {
        create_gift(client, data.create_gift);
    }
    if (!!data.get_used_gift) {
        get_used_gift(client, data.get_used_gift);
    }
    if (!!data.remove) {
        remove(client, data.remove);
    }
    if (!!data.create_mutil_gift) {
        create_mutil_gift(client, data.create_mutil_gift);
    }
}