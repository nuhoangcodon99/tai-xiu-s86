const Admin = require('../../../../Models/Admin');
const AdminPermission = require('../../../../Models/AdminPermission');

let editPermission = async(client, username, permission, status) => {
    try {
        const edit = await AdminPermission.findOneAndUpdate({ username, permission }, { $set: { status } }, { upsert: true });
        if (!edit) {
            client.red({ notice: { title: 'LỖI', text: 'Lỗi không xác định!' } });
        } else {
            client.red({ notice: { title: 'Thành công', text: 'Chỉnh sửa thành công!' } });
        }
    } catch (e) {
        console.log(e.message);
        client.red({ notice: { title: 'LỖI', text: 'Lỗi không xác định!' } });
        return;
    }
}

module.exports = async(client, data) => {
    if (!!data) {
        try {
            if (!data.username || !data.permission || data.status == "undefined") {
                client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập đầy đủ!' } });
                return;
            }
            let username = '' + data.username + '';
            username = username.toLowerCase();

            const checkExits = await Admin.findOne({ username }).select("_id").lean();
            if (checkExits) {
                editPermission(client, username, data.permission, data.status)
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