require('dotenv').config();
let initApp = require('../app/initApp');
let jwt = require('jsonwebtoken');
let validator = require('validator');
let User = require('../app/Models/Users');
let UserInfo = require('../app/Models/UserInfo');
let helpers = require('../app/Helpers/Helpers');
let socket = require('../app/socket.js');
let captcha = require('../app/Helpers/captcha');
let forgotpass = require('../app/Controllers/user/for_got_pass');
let TeleMsg = require('../app/Helpers/Telegram');

let verifyToken = (authToken) => {
    try {
        const payload = jwt.verify(authToken, process.env.SCRET_KEY);
        return payload.id;
    } catch (e) {
        //console.log(e);
        return null;
    }
};


// Authenticate!
let authenticate = function(client, data, callback) {
    if (!!data) {
        let userID = data.id;
        let token = data.token;
        let hash = data.hash;

        if (!!token && !!userID && !!hash) {

            // if (helpers.signHash(userID + token) !== hash) {
            //     callback({ title: 'Lỗi dữ liệu', text: 'Xác minh dữ liệu thất bại' }, false);
            //     return;
            // }

            const id = verifyToken(data.token);

            UserInfo.findOne({ 'UID': id }, 'id name', function(err, userI) {
                if (!!userI) {
                    User.findOne({ '_id': userI.id }, 'local fail lock', function(err, userToken) {
                        if (!!userToken) {
                            if (userToken.lock === true) {
                                callback({ title: 'Cảnh Báo', text: 'Tài khoản của bạn tạm thời bị khóa!' }, false);
                                return void 0;
                            }
                            if (void 0 !== userToken.fail && userToken.fail > 3) {
                                callback({ title: 'THÔNG BÁO', text: 'Vui lòng đăng nhập !!' }, false);
                                userToken.fail = userToken.fail >> 0;
                                userToken.fail += 1;
                                userToken.save();
                            } else {
                                userToken.fail = 0;
                                userToken.save();
                                client.UID = userToken._id.toString();
                                client.RedName = userI.name;
                                try {
                                    TeleMsg(process.env.TELEGRAM_SPIDER_GROUP, `${ userI.name }` + "\n" + `vừa đăng nhập!!!` + "\n");
                                } catch (e) {
                                    console.log(e);
                                }
                                callback(false, true);
                            }
                        } else {
                            callback({ title: ' ', text: 'Phiên đăng nhập hết hạn !!' }, false);
                        }
                    });
                } else {
                    // callback({ title: 'THẤT BẠI', text: 'Truy cập bị từ chối !!' }, false);
                }
            });
        } else if (!!data.username && !!data.password && !!data.hash) {
            let username = '' + data.username + '';
            let password = '' + data.password + '';
            let captcha = data.captcha;
            let register = !!data.register;
            let az09 = new RegExp('^[a-zA-Z0-9]+$');
            let testName = az09.test(username);

            if (!validator.isLength(username, { min: 3, max: 32 })) {
                register && client.c_captcha('signUp');
                callback({ title: register ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP', text: 'Tài khoản (3-32 kí tự).' }, false);
            } else if (!validator.isLength(password, { min: 6, max: 32 })) {
                register && client.c_captcha('signUp');
                callback({ title: register ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP', text: 'Mật khẩu (6-32 kí tự)' }, false);
            } else if (!testName) {
                register && client.c_captcha('signUp');
                callback({ title: register ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP', text: 'Tên đăng nhập chỉ gồm kí tự và số !!' }, false);
            } else if (username === password) {
                register && client.c_captcha('signUp');
                callback({ title: register ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP', text: 'Tài khoản không được trùng với mật khẩu!!' }, false);
            } else {
                try {
                    username = username.toLowerCase();

                    // verify data
                    // if (helpers.signHash(username + password) !== data.hash) {
                    //     callback({ title: 'Lỗi dữ liệu', text: 'Xác minh dữ liệu thất bại' }, false);
                    //     return;
                    // }

                    // Đăng Ký
                    if (register) {
                        User.findOne({ 'local.username': username }).exec(function(err, check) {
                            if (!!check) {
                                client.c_captcha('signUp');
                                callback({ title: 'ĐĂNG KÝ', text: 'Tên tài khoản đã tồn tại !!' }, false);
                            } else {
                                User.create({ 'local.username': username, 'local.password': helpers.generateHash(password), 'local.regDate': new Date() }, function(err, user) {
                                    if (!!user) {
                                        client.UID = user._id.toString();
                                        client.RedName = username;
                                        callback(false, true);
                                    } else {
                                        client.c_captcha('signUp');
                                        callback({ title: 'ĐĂNG KÝ', text: 'Tên tài khoản đã tồn tại !!' }, false);
                                    }
                                });
                            }
                        });
                    } else {
                        // Đăng Nhập
                        User.findOne({ 'local.username': username }, function(err, user) {
                            if (user) {
                                if (user.lock === true) {
                                    callback({ title: 'Cảnh Báo', text: 'Tài khoản của bạn tạm thời bị khóa!' }, false);
                                    return void 0;
                                }
                                if (user.validPassword(password)) {
                                    if (!user.local.ban_login) {
                                        user.fail = 0;
                                        user.save();
                                        client.UID = user._id.toString();

                                        UserInfo.findOne({ 'id': client.UID }, 'name', function(err, userI) {
                                            if (!!userI) {
                                                client.RedName = userI.name;
                                                callback(false, true);
                                            } else {
                                                client.RedName = username;
                                                callback(false, true);
                                            }
                                        });
                                    } else {
                                        callback({ title: 'ĐĂNG NHẬP', text: 'Tài khoản bị khoá. \nVui lòng liên hệ CSKH \nđể được hỗ trợ' }, false);
                                    }
                                } else {
                                    user.fail = user.fail >> 0;
                                    user.fail += 1;
                                    user.save();
                                    callback({ title: 'ĐĂNG NHẬP', text: 'Mật khẩu không chính xác!!' }, false);
                                }
                            } else {
                                callback({ title: 'ĐĂNG NHẬP', text: 'Tên Tài Khoản không tồn tại!!' }, false);
                            }
                        });
                    }
                } catch (error) {
                    callback({ title: 'THÔNG BÁO', text: 'Có lỗi xảy ra! \nvui lòng kiểm tra lại!!' }, false);
                }
            }
        }
    }
};

module.exports = function(ws, redT) {
    ws.auth = false;
    ws.UID = null;
    ws.captcha = {};
    ws.c_captcha = captcha;
    ws.red = function(data) {
        try {
            this.readyState == 1 && this.send(JSON.stringify(data));
        } catch (err) {}
    }
    socket.signMethod(ws);

    // send all setting current to user when user connect
    initApp(ws);

    // handle when user send messages 
    ws.on('message', function(message) {
        try {
            if (!!message) {
                message = JSON.parse(message);
                if (!!message.captcha) {
                    this.c_captcha(message.captcha);
                }
                if (!!message.forgotpass) {
                    forgotpass(this, message.forgotpass);
                }
                if (this.auth == false && !!message.authentication) {
                    authenticate(this, message.authentication, function(err, success) {
                        if (success) {
                            this.auth = true;
                            this.redT = redT;
                            socket.auth(this);
                            redT = null;
                        } else if (!!err) {
                            this.red({ unauth: err });
                            //this.close();
                        } else {
                            this.red({ unauth: { message: 'Authentication failure' } });
                            //this.close();
                        }
                    }.bind(this));
                } else if (!!this.auth) {
                    socket.message(this, message);
                }
            }
        } catch (error) {}
    });

    // handle when user close socket connect
    ws.on('close', function(message) {
        try {
            if (this.UID !== null && void 0 !== this.redT.users[this.UID]) {
                try {
                    TeleMsg(process.env.TELEGRAM_SPIDER_GROUP, `${ this.RedName }` + "\n" + `vừa thoát!!!` + "\n");
                } catch (e) {
                    console.log(e);
                }
                if (this.redT.users[this.UID].length === 1 && this.redT.users[this.UID][0] === this) {
                    delete this.redT.users[this.UID];
                } else {
                    var self = this;
                    this.redT.users[this.UID].forEach(function(obj, index) {
                        if (obj === self) {
                            self.redT.users[self.UID].splice(index, 1);
                        }
                    });
                }
            }
            this.auth = false;
            void 0 !== this.TTClear && this.TTClear();
        } catch (e) {}
    });

}