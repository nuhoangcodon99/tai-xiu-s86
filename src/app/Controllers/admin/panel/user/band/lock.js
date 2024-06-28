const User = require('../../../../../Models/Users');
const AdminHistory = require('../../../../../Models/AdminHistory');

module.exports = async function(client, data) {
    if (!!data.id) {
        const userData = await User.findOne({ '_id': data.id }, 'lock local').exec();
        if (!!userData) {
            if (userData.lock === true) {
                client.red({ notice: { title: 'Lỗi', text: 'Tài khoản này đã bị khóa rồi!' } });
            } else {
                userData.lock = true;
                await userData.save();
                // save login to logs
                AdminHistory.create({
                    name: client.RedName,
                    action: `Khóa tài khoản`,
                    description: `Khóa tài khoản ${userData.local.username}`
                });

                // ngắt kết nối user khi có lệnh khóa
                try {
                    if (void 0 !== redT.users[data.id]) {
                        redT.users[data.id].forEach(function(obj) {
                            obj.red({ notice: { title: 'Account Blocked!', text: 'Tài khoản của bạn đã bị khóa!\nLiên hệ CSKH để biết thêm chi tiết.' } });
                            setTimeout(() => {
                                obj.close();
                            }, 1000);
                        });
                    }
                } catch (e) {}

                client.red({ notice: { title: 'Thành công', text: 'Đã khóa thành công!' } });
            }
        } else {
            client.red({ notice: { title: 'Lỗi', text: 'Không tìm thấy người dùng!' } });
        }
    } else {
        client.red({ notice: { title: 'Lỗi', text: 'Dữ liệu không đúng!' } });
    }
}