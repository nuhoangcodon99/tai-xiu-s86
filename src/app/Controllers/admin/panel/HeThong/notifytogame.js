let SysInformation = require('../../../../Models/System/Sys_Information');

let setData = async (models, key, value) => {
    try {
        const rowUpdate = await models.findOneAndUpdate({ key }, { value });
        return rowUpdate;
    } catch (e) {
        console.log(e);
    }
}

module.exports = async function (client, data) {
    if (!!data) {
        //client.redT.sendInHome({ notice: { title: 'Thành công', text: 'Gửi tin nhắn tới tất cả thành công !' } });

        if (!!data.title && !!data.msg) {
            // ghim tin nhắn
            if (data.pin) {
                //const notifyPin = await getDataSys(SysInformation, "notifyPin");

                // update pinned notify
                let dataPinned = {
                    title: data.title,
                    text: data.msg,
                    pin: true
                };

                await setData(SysInformation, "notifyPin", JSON.stringify(dataPinned));

                client.redT.sendInHome({
                    news: {
                        thongbao: {
                            title: data.title,
                            text: data.msg,
                            pin: true
                        }
                    }
                });
                client.red({ notice: { title: 'Thành công', text: 'Gửi và Ghim thông báo thành công!' } });
            } else {
                // clear pinned notify
                await setData(SysInformation, "notifyPin", "");

                client.redT.sendInHome({
                    news: {
                        thongbao: {
                            title: data.title,
                            text: data.msg,
                            pin: false
                        }
                    }
                });
                client.red({ notice: { title: 'Thành công', text: 'Gửi thông báo thành công!' } });
            }
        } else {
            client.red({ notice: { title: 'Thất bại', text: 'Dữ liệu thiếu' } });
        }
    } else {
        client.red({ notice: { title: 'Thất bại', text: 'Dữ liệu không đúng' } });
    }
}
