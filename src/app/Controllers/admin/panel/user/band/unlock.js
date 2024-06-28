const User = require('../../../../../Models/Users');
const AdminHistory = require('../../../../../Models/AdminHistory');

module.exports = async function (client, data) {
    if (!!data.id) {
        const userData = await User.findOne({ '_id': data.id }, 'lock local').exec();
        if (!!userData) {
            if (userData.lock === true) {
                userData.lock = false;
                await userData.save();
                // save login to logs
                AdminHistory.create({
                    name: client.RedName,
                    action: `Mở tài khoản`,
                    description: `Mở tài khoản ${userData.local.username}`
                });
                client.red({ notice: { title: 'Thành công', text: 'Mở khóa thành công!' } });
            } else {
                client.red({ notice: { title: 'Lỗi', text: 'Tài khoản đang hoạt động!' } });
            }
        } else {
            client.red({ notice: { title: 'Lỗi', text: 'Không tìm thấy người dùng!' } });
        }
    } else {
        client.red({ notice: { title: 'Lỗi', text: 'Dữ liệu không đúng!' } });
    }
}