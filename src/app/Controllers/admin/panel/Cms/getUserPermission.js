const Admin = require('../../../../Models/Admin');
const AdminPermission = require('../../../../Models/AdminPermission');

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

module.exports = async(client, data) => {
    if (!!data) {
        try {
            if (!data.username) {
                client.red({ notice: { title: 'LỖI', text: 'Vui lòng nhập đầy đủ!' } });
                return;
            }
            const getPers = await getPermission(data.username);
            client.red({ cms: { getuserpermission: { username: data.username, permission: getPers } } });
        } catch (e) {
            client.red({ cms: { getuserpermission: {} } });
        }
    } else {
        client.red({ notice: { title: 'LỖI', text: 'Du lieu khong dung dinh dang!' } });
    }
}