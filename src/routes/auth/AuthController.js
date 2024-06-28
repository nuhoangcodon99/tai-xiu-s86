require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helpers = require('../../app/Helpers/Helpers');
var Users = require('../../app/Models/Users');
var UserInfo = require('../../app/Models/UserInfo');

// Game User
let TaiXiu_User = require('../../app/Models/TaiXiu_user');
let MiniPoker_User = require('../../app/Models/miniPoker/miniPoker_users');
let Bigbabol_User = require('../../app/Models/BigBabol/BigBabol_users');
let VQRed_User = require('../../app/Models/VuongQuocRed/VuongQuocRed_users');
let BauCua_User = require('../../app/Models/BauCua/BauCua_user');
let Mini3Cay_User = require('../../app/Models/Mini3Cay/Mini3Cay_user');
let CaoThap_User = require('../../app/Models/CaoThap/CaoThap_user');
let AngryBirds_user = require('../../app/Models/AngryBirds/AngryBirds_user');
let Candy_user = require('../../app/Models/Candy/Candy_user');
let LongLan_user = require('../../app/Models/LongLan/LongLan_user');
let Zeus_user = require('../../app/Models/Zeus/Zeus_user');
let XocXoc_user = require('../../app/Models/XocXoc/XocXoc_user');
let Message = require('../../app/Models/Message');
let TotalSpend = require('../../app/Models/TotalSpend');
let validator = require('validator');
let Helper = require('../../app/Helpers/Helpers');
let TopVip = require('../../app/Models/VipPoint/TopVip');


var express = require('express');
var router = express.Router();

router.post('/login', async(req, res) => {
    try {
        let { username, password } = req.body;

        if (username == null ||
            password == null ||
            username == "" ||
            password == "") {
            res.json({
                status: false,
                message: "Tài khoản hoặc mật khẩu không được bỏ trống!"
            });
            return;
        };

        if (username.match(/^[A-Za-z0-9_.]+$/) == null) {
            res.json({
                status: false,
                message: "Tên tài khoản không được có kí tự lạ!"
            });
            return;
        }

        if (username.length < 6) {
            res.json({
                status: false,
                message: "Tên tài khoản phải lớn hơn 6 kí tự!"
            });
            return;
        }

        if (password.length < 6) {
            res.json({
                status: false,
                message: "Mật khẩu phải lớn hơn 6 kí tự!"
            });
            return;
        }
        username = username.toLowerCase();

        const user = await Users.findOne({
            'local.username': username,
        });

        if (!!user) {
            var lastInfo = user.local;

            bcrypt.compare(password, lastInfo.password)
                .then(async(isMatch) => {

                    if (isMatch) {

                        if (!!lastInfo.ban_login) { // nếu tài khoản bị khóa
                            res.json({
                                status: false,
                                message: "Tài khoản của bạn đã bị khóa! Vui lòng liên hệ CSKH để được hỗ trợ!"
                            });
                        } else {
                            const userInfo = await UserInfo.findOne({ id: user._id });

                            if (!!userInfo) {
                                const payload = {
                                    id: userInfo.UID
                                };

                                jwt.sign(payload, process.env.SCRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN },
                                    (err, token) => {
                                        if (err) {
                                            return res.json({
                                                status: false,
                                                data: err.message
                                            });
                                        }

                                        res.json({
                                            status: true,
                                            token: `${token}`,
                                            data: {
                                                username: lastInfo.username,
                                                regDate: lastInfo.regDate,
                                                nickname: userInfo.name,
                                                id: user._id,
                                                UID: userInfo.UID,
                                                red: userInfo.red
                                            }
                                        });
                                    });
                            } else {
                                res.json({
                                    status: false,
                                    message: "Thông tin đăng nhập không chính xác!"
                                });
                            }

                        }

                    } else {
                        res.json({
                            status: false,
                            message: "Thông tin đăng nhập không chính xác!"
                        });
                    }
                });

        } else {
            res.json({
                status: false,
                message: "Không tìm thấy tài khoản phù hợp!"
            });
        }

    } catch (e) {
        console.log(e.message);
        res.json({
            status: false,
            message: e.message
        });
    }
});

router.post('/register', async(req, res) => {
    try {
        let { username, password, repeat_pwd } = req.body;

        if (username == null ||
            password == null ||
            repeat_pwd == null ||
            username == "" ||
            password == "" ||
            repeat_pwd == "") {
            res.json({
                status: false,
                message: "Tài khoản hoặc mật khẩu không được bỏ trống!"
            });
            return;
        };

        if (username.match(/^[A-Za-z0-9_.]+$/) == null) {
            res.json({
                status: false,
                message: "Tên tài khoản không được có kí tự lạ!"
            });
            return;
        }

        if (username.length < 6) {
            res.json({
                status: false,
                message: "Tên tài khoản phải lớn hơn 6 kí tự!"
            });
            return;
        }

        if (password.length < 6) {
            res.json({
                status: false,
                message: "Mật khẩu phải lớn hơn 6 kí tự!"
            });
            return;
        }

        if (password !== repeat_pwd) {
            res.json({
                status: false,
                message: "2 mật khẩu không khớp nhau!"
            });
            return;
        }

        username = username.toLowerCase();

        const user = await Users.findOne({
            'local.username': username,
        });

        if (!!user) {
            return res.json({
                status: false,
                message: "Tên tài khoản đã có người đăng kí 1!"
            });
        } else {
            username = username.toLowerCase();

            Users.create({ 'local.username': username, 'local.password': helpers.generateHash(password), 'local.regDate': new Date() }, async function(err, user) {

                if (!!user) {
                    const totalUser = await Users.count();

                    UserInfo.create({ 'id': user._id, 'name': username, 'joinedOn': new Date() }, function(errC, userInfoCreate) {
                        // , 'UID': totalUser + 1
                        if (!!errC) {
                            return res.json({
                                status: false,
                                message: errC
                            });
                        } else {
                            const payload = {
                                id: userInfoCreate.UID
                            };
                            jwt.sign(payload, process.env.SCRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN },
                                (err, token) => {
                                    if (err) {
                                        return res.json({
                                            status: false,
                                            data: err.message
                                        });
                                    }

                                    userNew = userInfoCreate._doc;
                                    userInfoCreate.level = 1;
                                    userInfoCreate.vipNext = 100;
                                    userInfoCreate.vipHT = 0;
                                    userInfoCreate.phone = '';
                                    userInfoCreate.token = token;
                                    delete userInfoCreate._id;
                                    delete userInfoCreate.redWin;
                                    delete userInfoCreate.redLost;
                                    delete userInfoCreate.redPlay;
                                    delete userInfoCreate.vip;
                                    delete userInfoCreate.hu;
                                    delete userInfoCreate.totall;
                                    delete userInfoCreate.type;
                                    delete userInfoCreate.otpFirst;
                                    delete userInfoCreate.gitCode;
                                    delete userInfoCreate.gitRed;
                                    delete userInfoCreate.veryold;

                                    TotalSpend.create({ 'uid': user._id, 'name': user.name, 'red': 0 });
                                    TaiXiu_User.create({ 'uid': user._id, name: user.name, type: false });
                                    MiniPoker_User.create({ 'uid': user._id });
                                    Bigbabol_User.create({ 'uid': user._id });
                                    VQRed_User.create({ 'uid': user._id });
                                    BauCua_User.create({ 'uid': user._id });
                                    Mini3Cay_User.create({ 'uid': user._id });
                                    CaoThap_User.create({ 'uid': user._id });
                                    AngryBirds_user.create({ 'uid': user._id });
                                    Candy_user.create({ 'uid': user._id });
                                    LongLan_user.create({ 'uid': user._id });
                                    Zeus_user.create({ 'uid': user._id });
                                    XocXoc_user.create({ 'uid': user._id });
                                    TopVip.create({ 'name': userNew.name, 'vip': 0 });
                                    Message.create({ 'uid': user._id, 'title': 'Thành Viên Mới', 'text': 'Chào mừng bạn đến với 8Win.Club - Cổng game bài quốc tế, chúc bạn chơi game vui vẻ, thắng lớn...', 'time': new Date() });

                                    res.json({
                                        status: true,
                                        token: `${token}`,
                                        data: {
                                            username,
                                            regDate: userInfoCreate.regDate,
                                            nickname: userInfoCreate.name,
                                            id: user._id,
                                            UID: userInfoCreate.UID,
                                            red: userInfoCreate.red
                                        }
                                    });
                                });
                        }
                    });

                } else {
                    return res.json({
                        status: false,
                        message: "Tên tài khoản đã có người đăng kí 2!"
                    });
                }
            });
        }


    } catch (e) {
        console.log(e.message);
        res.json({
            status: false,
            message: e.message
        });
    }
});

router.get("/auto-login", async(req, res) => {
    try {
        const { UID, Token } = req.query;
        if (UID !== "" || Token !== "") {
            res.redirect(`https://play.winvip.club/login?UID=${UID}&Token=${Token}`);
        } else {
            res.json({
                status: false,
                message: "Error Validate"
            });
        }
    } catch (e) {
        console.log(e.message);
    }
});


module.exports = router;