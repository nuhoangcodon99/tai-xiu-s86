const TcgService = require('../../../Helpers/TcgService');
const UserInfo = require('../../../Models/UserInfo');

module.exports = (client, data) => {
    if (!!data && data.platform) {
        try {
            UserInfo.findOne({ id: client.UID }, 'red name', async function(err, user) {
                if (!!user) {
                    let platform = "html5-desktop";
                    if (data.platform == "mobile") {
                        platform = "html5";
                    } else if (data.platform == "desktop") {
                        platform = "html5-desktop";
                    }

                    const getGame = await TcgService.getLaunchGame(user.name, TcgService.TcgApiService.productType, 1, "SEX001", platform);

                    if (getGame) {
                        if (getGame.status == 0) {
                            client.red({
                                casino: {
                                    playRequest: {
                                        url: getGame.game_url
                                    }
                                }
                            });
                        } else {
                            client.red({ notice: { title: "Lỗi", text: getGame.error_desc } });
                        }
                    } else {
                        client.red({ notice: { title: "Lỗi", text: 'Đã có lỗi bất ngờ xảy ra với Casino!\nVui lòng thao tác lại...' } });
                    }
                } else {
                    client.red({ notice: { title: "Lỗi", text: 'Không lấy được dữ liệu người dùng!\nVui lòng thao tác lại...' } });
                }
            });
        } catch (e) {
            console.log(e);
            client.red({ notice: { title: "Lỗi", text: 'Đã có lỗi bất ngờ xảy ra với Casino!\nVui lòng thao tác lại...' } });
        }
    }
}