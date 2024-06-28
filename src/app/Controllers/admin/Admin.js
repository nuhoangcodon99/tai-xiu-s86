require('dotenv').config();
let jwt = require('jsonwebtoken');
var Admin = require('../../Models/Admin');
var AdminPermission = require('../../Models/AdminPermission');
var validator = require('validator');
var Helper = require('../../Helpers/Helpers');

let createToken = (username) => {
    try {
        const token = jwt.sign({ username }, process.env.SCRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return token;
    } catch (e) {
        console.log(e);
        return null;
    }
};

let getInfoAdmin = async(uid) => {
    try {
        const admin = await Admin.findOne({ '_id': uid }, '-password -__v -fail');
        return admin;
    } catch (e) {
        return false;
    }
};

let getPermission = async(username) => {
    try {
        const data = {};
        const getData = await AdminPermission.find({ username }, 'permission status -_id');
        for (const per of getData) {
            data[per.permission] = per.status;
        }
        return data;
    } catch (e) {
        console.log(e);
        return {};
    }
};

async function first(client) {
    // Tạo token mới
    let token = createToken(client.RedName);
    const adminInfo = await getInfoAdmin(client.UID);
    const adminPermission = await getPermission(adminInfo.username);
    var data = {
        Authorized: true,
        rootadmin: process.env.ADMIN_USERNAME,
        currentlogin: {
            data: adminInfo,
            permission: adminPermission
        },
        access_token: token
    };
    client.red(data);
}

function changePassword(client, data) {
    if (!!data && !!data.password && !!data.newPassword && !!data.newPassword2) {
        if (!validator.isLength(data.password, { min: 6, max: 32 })) {
            client.red({ notice: { title: 'LỖI', text: 'Độ dài mật khẩu từ 6 đến 32 ký tự !!' } });
        } else if (!validator.isLength(data.newPassword, { min: 6, max: 32 })) {
            client.red({ notice: { title: 'LỖI', text: 'Độ dài mật khẩu từ 6 đến 32 ký tự !!' } });
        } else if (!validator.isLength(data.newPassword2, { min: 6, max: 32 })) {
            client.red({ notice: { title: 'LỖI', text: 'Độ dài mật khẩu từ 6 đến 32 ký tự !!' } });
        } else if (data.password == data.newPassword) {
            client.red({ notice: { title: 'LỖI', text: 'Mật khẩu mới không trùng với mật khẩu cũ.!!' } });
        } else if (data.newPassword != data.newPassword2) {
            client.red({ notice: { title: 'LỖI', text: 'Nhập lại mật khẩu không đúng!!' } });
        } else {
            Admin.findOne({ '_id': client.UID }, function(err, user) {
                if (user !== null) {
                    if (Helper.validPassword(data.password, user.password)) {
                        Admin.updateOne({ '_id': client.UID }, { $set: { 'password': Helper.generateHash(data.newPassword) } }).exec();
                        client.red({ notice: { title: 'ĐỔI MẬT KHẨU', text: 'Đổi mật khẩu thành công.' } });
                    } else {
                        client.red({ notice: { title: 'ĐỔI MẬT KHẨU', text: 'Mật khẩu cũ không đúng.' } });
                    }
                }
            });
        }
    }
}

function onData(client, data) {
    if (!!data) {
        if (!!data.doi_pass) {
            changePassword(client, data.doi_pass)
        }
    }
}

module.exports = {
    first: first,
    onData: onData,
}