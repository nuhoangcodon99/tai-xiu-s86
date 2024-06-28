const Helper = require('../../../Helpers/Helpers');
const TcgService = require('../../../Helpers/TcgService');
const UserInfo = require('../../../Models/UserInfo');
const UserHistory = require('../../../Models/UserHistory');
const UserHistoryEnums = require('../../../../config/userHistoryEnums');


module.exports = (client, data) => {
    try {
        if (!!data && !!data.amount) {
            let red = data.amount >> 0;
            let type = data.type; // true là từ quỹ game sang saba và false là ngược lại
            let percent = 1000;

            if (type) {
                const amountTransfer = Math.floor(red / percent);

                UserInfo.findOne({ id: client.UID }, 'red name', async function(err, user) {
                    if (!!user) {
                        if (user.red < red) {
                            client.red({ notice: { title: "Lỗi", text: 'Không đủ số dư!' } });
                        } else {
                            const transfer = await TcgService.userTransfer(
                                user.name,
                                TcgService.TcgApiService.productType,
                                1,
                                amountTransfer,
                                Helper.randomInteger(100000000000, 999999999999) // transID
                            );

                            if (transfer) {
                                if (transfer.status == 0) {
                                    await UserInfo.findOneAndUpdate({ id: client.UID }, { $inc: { red: -red } }).exec();
                                    client.red({ casino: { recallData: true } }); // update lại tiền quỹ saba
                                    client.red({ user: { red: Number(user.red) - red } }); // update lại tiền game
                                    UserHistory.create({
                                        uid: client.UID,
                                        name: user.name,
                                        action: UserHistoryEnums.CASINO,
                                        transType: UserHistoryEnums.TRANS_MINUS,
                                        red: red,
                                        balance: Number(user.red) - red,
                                        description: 'Chuyển vào quỹ Casino ' + Helper.numberWithCommas(red)
                                    });
                                    client.red({ notice: { title: "Thành Công!", text: "Chuyển quỹ thành công!" } });
                                } else {
                                    client.red({ notice: { title: "Lỗi!", text: transfer.error_desc } });
                                }
                            } else {
                                client.red({ notice: { title: "Lỗi!", text: "Có lỗi bất ngờ\nVui lòng thử lại!\nVui lòng thao tác lại..." } });
                            }
                        }
                    } else {
                        client.red({ notice: { title: "Lỗi", text: 'Không lấy được dữ liệu người dùng!\nVui lòng thao tác lại...' } });
                    }
                });
            } else {

                const amountUpdate = Math.floor(red * percent);
                UserInfo.findOne({ id: client.UID }, 'red name', async function(err, user) {
                    if (!!user) {
                        const withDraw = await TcgService.userTransfer(
                            user.name,
                            TcgService.TcgApiService.productType,
                            2,
                            red,
                            Helper.randomInteger(100000000000, 999999999999) // transID
                        );

                        if (withDraw) {
                            if (withDraw.status == 0) {
                                UserInfo.findOneAndUpdate({ id: client.UID }, { $inc: { red: +amountUpdate } }, async function(err, result) {
                                    if (!!result) {
                                        client.red({ casino: { recallData: true } }); // update lại tiền quỹ saba
                                        client.red({ user: { red: Number(result.red) + amountUpdate } }); // update lại tiền game
                                        UserHistory.create({
                                            uid: client.UID,
                                            name: user.name,
                                            action: UserHistoryEnums.CASINO,
                                            transType: UserHistoryEnums.TRANS_PLUS,
                                            red: red,
                                            balance: Number(result.red) + amountUpdate,
                                            description: 'Rút từ quỹ Casino ' + Helper.numberWithCommas(red)
                                        });
                                        client.red({ notice: { title: "Thành Công!", text: "Chuyển quỹ thành công!" } });
                                    } else {
                                        client.red({ notice: { title: "Lỗi!", text: "Có lỗi bất ngờ\nVui lòng thử lại!" } });
                                    }
                                });
                            } else {
                                client.red({ notice: { title: "Lỗi", text: withDraw.error_desc } });
                            }
                        } else {
                            client.red({ notice: { title: "Lỗi!", text: "Có lỗi bất ngờ\nVui lòng thử lại!" } });
                        }

                    } else {
                        client.red({ notice: { title: "Lỗi", text: 'Không lấy được dữ liệu người dùng!\nVui lòng thao tác lại...' } });
                    }
                });
            }
        }
    } catch (e) {
        console.log(e);
        client.red({ notice: { title: "Lỗi", text: 'Đã có lỗi bất ngờ xảy ra với Casino!\nVui lòng thao tác lại...' } });
    }
}