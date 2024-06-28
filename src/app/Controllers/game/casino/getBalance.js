const TcgService = require('../../../Helpers/TcgService');
const UserInfo = require('../../../Models/UserInfo');

module.exports = (client, data) => {
    if (!!data) {
        try {
            UserInfo.findOne({ id: client.UID }, 'red name', async function(err, user) {
                if (!!user) {
                    const getBalance = await TcgService.getBalance(user.name, TcgService.TcgApiService.productType);
                    if (getBalance) {
                        if (getBalance.status == 0) {
                            client.red({ casino: { betBalance: getBalance.balance } });
                        } else {
                            client.red({ notice: { title: "Lỗi", text: 'Có lỗi xảy ra\nVui lòng thử lại!\nVui lòng thao tác lại...' } });
                        }
                    } else {
                        client.red({ notice: { title: "Lỗi", text: 'Đã có lỗi bất ngờ xảy ra với Casino!\nVui lòng thao tác lại...' } });
                    }
                } else {
                    client.red({ notice: { title: "Lỗi", text: 'Không lấy được dữ liệu người dùng!\nVui lòng thao tác lại...' } });
                }
            });
        } catch (e) {
            console.log(e.message);
            client.red({ notice: { title: "Lỗi", text: 'Đã có lỗi bất ngờ xảy ra với Casino!\nVui lòng thao tác lại...' } });
        }
    }
}