require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
let tab_NapThe = require('../../Models/NapThe');
let NhaMang = require('../../Models/NhaMang');
let MenhGia = require('../../Models/MenhGia');
let config = require('../../../config/thecao');
let validator = require('validator');
let telegram = require('../../Helpers/Telegram');
let helpers = require('../../Helpers/Helpers');
const md5 = require('md5');
const _ = require('lodash');

module.exports = function (client, data) {

    client = client || {};
    if (!!data && !!data.nhamang && !!data.menhgia && !!data.mathe && !!data.seri && !!data.captcha) {
        if (!validator.isLength(data.captcha, { min: 4, max: 4 })) {
            client.red({ notice: { title: 'LỖI', text: 'Captcha không đúng', load: false } });
        } else if (validator.isEmpty(data.nhamang)) {
            client.red({ notice: { title: 'LỖI', text: 'Vui lòng chọn nhà mạng...', load: false } });
        } else if (validator.isEmpty(data.menhgia)) {
            client.red({ notice: { title: 'LỖI', text: 'Vui lòng chọn mệnh giá thẻ...', load: false } });
        } else if (validator.isEmpty(data.mathe)) {
            client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập mã thẻ cào...', load: false } });
        } else if (validator.isEmpty(data.seri)) {
            client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập seri ...', load: false } });
        } else {
            let checkCaptcha = new RegExp('^' + data.captcha + '$', 'i');
            checkCaptcha = checkCaptcha.test(client.captcha);
            if (checkCaptcha) {
                let nhaMang = '' + data.nhamang;
                let menhGia = '' + data.menhgia;
                let maThe = '' + data.mathe;
                let seri = '' + data.seri;

                let check1 = NhaMang.findOne({ name: nhaMang, nap: true }).exec();
                let check2 = MenhGia.find({}).exec();

                

                Promise.all([check1, check2])
                    .then(values => {
                        
                        if (!!values[0] && !!values[1] && maThe.length > 11 && seri.length > 11) {

                            let nhaMang_data = values[0];
                            let menhGia_data = values[1];

                            tab_NapThe.findOne({ 'uid': client.UID, 'nhaMang': nhaMang, 'menhGia': menhGia, 'maThe': maThe, 'seri': seri }, function (err, cart) {
                                if (cart !== null) {
                                    client.red({ notice: { title: 'THẤT BẠI', text: 'Bạn đã yêu cầu nạp thẻ này trước đây.!!', load: false } });
                                } else {
                                    let transid = helpers.getRandomInt(100000000, 999999999);

                                    tab_NapThe.create({ 'uid': client.UID, 'transid': transid, 'nhaMang': nhaMang, 'menhGia': menhGia, 'maThe': maThe, 'seri': seri, 'time': new Date() }, function (error, create) {
                                        if (!!create) {

                                            // Chờ kết quả tiếp theo nếu api trả luôn kết quả 
                                            // client.red({ loading: { text: 'Đang chờ sử lý...' } });

                                            // bắn thẻ sang bên thứ 3
                                            var dataPost = new FormData();
                                            dataPost.append('telco', nhaMang);
                                            dataPost.append('code', maThe);
                                            dataPost.append('serial', seri);
                                            dataPost.append('amount', menhGia);
                                            dataPost.append('request_id', transid);
                                            dataPost.append('partner_id', config.PARTNER_ID);
                                            dataPost.append('sign', md5(config.PARTNER_KEY+maThe+seri));
                                            dataPost.append('command', 'charging');

                                            axios({
                                                method: 'post',
                                                url: `${config.URL}/chargingws/v2`,
                                                headers: {
                                                    'Cookie': 'PHPSESSID=u3kjsaukif0qi55g9o0tb521eh', 
                                                    ...dataPost.getHeaders()
                                                },
                                                data: dataPost
                                            }).then(function (response) {
                                                try {
                                                    const resp = response.data;
                                                    
                                                    if (resp.status == 99) {
                                                        client.red({ notice: { title: 'THÔNG BÁO', text: 'Yêu cầu nạp thẻ thành công!', load: false } });
                                                    } else {
                                                        tab_NapThe.updateOne({ '_id': create._id.toString() }, { $set: { status: 2 } }).exec();
                                                        client.red({ notice: { title: 'Tin Nhắn hệ thống!', text: resp.message + '\nVui lòng thử lại!', load: false } });
                                                    }
                                                } catch (e) {
                                                    tab_NapThe.updateOne({ '_id': create._id.toString() }, { $set: { status: 2 } }).exec();
                                                    client.red({ notice: { title: 'BẢO TRÌ', text: 'Hệ thống nạp thẻ tạp thời không hoạt động, vui lòng giữ lại thẻ và quay lại sau.', load: false } });
                                                    //client.red({ notice: { title: 'SYSTEM EXCEPTION!', text: e.message, load: false } });
                                                }
                                            })
                                                .catch(function (error) {
                                                    tab_NapThe.updateOne({ '_id': create._id.toString() }, { $set: { status: 2 } }).exec();
                                                    client.red({ notice: { title: 'BẢO TRÌ', text: 'Hệ thống nạp thẻ tạp thời không hoạt động, vui lòng giữ lại thẻ và quay lại sau.', load: false } });
                                                });

                                        } else {
                                            client.red({ notice: { title: 'BẢO TRÌ', text: 'Hệ thống nạp thẻ tạp thời không hoạt động, vui lòng giữ lại thẻ và quay lại sau.', load: false } });
                                        }
                                    });
                                }
                            });
                        } else {
                            client.red({ notice: { title: 'THẤT BẠI', text: 'Thẻ nạp không được hỗ trợ.!!', load: false } });
                        }
                    });
            } else {
                client.red({ notice: { title: 'NẠP THẺ', text: 'Captcha không đúng', load: false } });
            }
        }
    }
    client.c_captcha('chargeCard');
}