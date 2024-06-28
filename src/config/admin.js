// Khởi tạo dữ liệu
require("dotenv").config();
const assert = require('assert');
const {
    ADMIN_USERNAME,
    ADMIN_PASSWORD
} = process.env;

assert(ADMIN_USERNAME, "ADMIN_USERNAME configuration is required.");
assert(ADMIN_PASSWORD, "ADMIN_PASSWORD configuration is required.");


// Admin
let Admin = require('../app/Models/Admin');
let generateHash = require('../app/Helpers/Helpers').generateHash;
let AdminPerConfig = require('../data/adminPermission');
let AdminPermission = require('../app/Models/AdminPermission');

Admin.estimatedDocumentCount().exec(function(err, total) {
    if (total == 0) {
        Admin.create({ 'username': `${process.env.ADMIN_USERNAME}`, 'password': generateHash(`${process.env.ADMIN_PASSWORD}`), 'rights': 9, 'regDate': new Date() }, (err, user) => {
            if (err) {
                console.log(`Can't create Admin: ` + err);
                return;
            }
            // create permission for admin
            for (let [key, value] of Object.entries(AdminPerConfig)) {
                AdminPermission.findOne({ username: process.env.ADMIN_USERNAME, permission: value }).select("_id").lean().then(permission => {
                    if (!permission) {
                        AdminPermission.create({
                            'username': `${process.env.ADMIN_USERNAME}`,
                            'permission': value,
                            'status': true
                        });
                        console.log(`[${process.env.ADMIN_USERNAME}] => Created permission: ${key}`);
                    } else {
                        console.log(`Permission Exists`);
                    }
                });
            }
        });
    }
});