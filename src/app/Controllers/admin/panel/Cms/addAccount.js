const validator = require('validator');
const helpers = require('../../../../Helpers/Helpers');
const Admin = require('../../../../Models/Admin');
const AdminPerConfig = require('../../../../../data/adminPermission');
const AdminPermission = require('../../../../Models/AdminPermission');


module.exports = async(client, data) => {
    if (!!data) {
        try {
            if (!data.username && !data.password) {
                client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập đầy đủ!' } });
                return;
            }
            let username = '' + data.username + '';
            let password = '' + data.password + '';
            let az09 = new RegExp('^[a-zA-Z0-9]+$');
            let testName = az09.test(username);

            if (!validator.isLength(username, { min: 3, max: 32 })) {
                client.red({ notice: { title: 'LỖI', text: 'Tên tài khoản (3-32 kí tự).' } });
                return;
            } else if (!validator.isLength(password, { min: 6, max: 32 })) {
                client.red({ notice: { title: 'LỖI', text: 'Mật khẩu (6-32 kí tự)' } });
                return;
            } else if (!testName) {
                client.red({ notice: { title: 'LỖI', text: 'Tên đăng nhập chỉ gồm kí tự và số !!' } });
                return;
            } else if (username === password) {
                client.red({ notice: { title: 'LỖI', text: 'Tài khoản không được trùng với mật khẩu!!' } });
                return;
            }

            username = username.toLowerCase();

            const checkExits = await Admin.findOne({ username }).select("_id").lean();

            if (!checkExits) {
                Admin.create({
                    username,
                    'password': helpers.generateHash(password),
                    'rights': 9,
                    'regDate': new Date()
                }, (err, user) => {
                    if (err) {
                        client.red({ notice: { title: 'LỖI', text: 'Lỗi không xác định!' } });
                        return;
                    }
                    // create permission for admin
                    for (let [key, value] of Object.entries(AdminPerConfig)) {
                        AdminPermission.findOne({ username, permission: value }).select("_id").lean().then(permission => {
                            if (!permission) {
                                AdminPermission.create({
                                    username,
                                    'permission': value,
                                    'status': false
                                });
                                console.log(`[${username}] => Created permission: ${key}`);
                            } else {
                                console.log(`[${username}] => Permission Exists`);
                            }
                        });
                    }
                    client.red({ notice: { title: 'Thành công', text: 'Tạo người dùng thành công!' } });
                });
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Người dùng đã tồn tại!' } });
            }

        } catch (e) {
            console.log(e);
            client.red({ cms: { getdata: [] } });
        }
    } else {
        client.red({ notice: { title: 'LỖI', text: 'Du lieu khong dung dinh dang!' } });
    }
}