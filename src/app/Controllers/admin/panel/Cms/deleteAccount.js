const Admin = require('../../../../Models/Admin');
const AdminPermission = require('../../../../Models/AdminPermission');

module.exports = async(client, data) => {
    if (!!data) {
        try {
            if (!data.username) {
                client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập đầy đủ!' } });
                return;
            }
            let username = '' + data.username + '';
            username = username.toLowerCase();

            const checkExits = await Admin.findOne({ username }).select("_id").lean();
            if (checkExits) {
                Admin.findOneAndRemove({ username }, (err, adminDel) => {
                    if (err) console.log(err);
                    AdminPermission.deleteMany({ username }, (err, adminPerDel) => {
                        if (err) console.log(err);
                        client.red({ notice: { title: 'Thành công', text: 'Xóa người dùng thành công!' } });
                    });
                });
            } else {
                client.red({ notice: { title: 'LỖI', text: 'Người dùng không tồn tại!' } });
            }

        } catch (e) {
            console.log(e);
            client.red({ cms: { getdata: [] } });
        }
    } else {
        client.red({ notice: { title: 'LỖI', text: 'Du lieu khong dung dinh dang!' } });
    }
}