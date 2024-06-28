let Information = require('../../../../Models/System/Sys_Information');

let setData = async(models, key, value) => {
    try {
        const rowUpdate = await models.findOneAndUpdate({ key }, { value });
        return rowUpdate;
    } catch (e) {
        console.log(e);
    }
}

let getDataSys = async(models, key) => {
    try {
        const getData = await models.findOne({ key });
        return getData.value;
    } catch (e) {
        console.log(e);
    }
};

module.exports = async(client, data) => {
    if (!!data) {
        if (void 0 !== data.information.getdata) {
            const dataClient = {
                systemset: {
                    information: {
                        version: await getDataSys(Information, "version"),
                        telegram: await getDataSys(Information, "telegram"),
                        telegramBot: await getDataSys(Information, "telegramBot"),
                        telesupport: await getDataSys(Information, "telesupport"),
                        zalo: await getDataSys(Information, "zalo"),
                        fanpage: await getDataSys(Information, "fanpage"),
                        quickChat: await getDataSys(Information, "quickChat"),
                        ios: await getDataSys(Information, "ios"),
                        android: await getDataSys(Information, "android"),
                    }
                }
            };
            client.red(dataClient);
        }

        if (void 0 !== data.information.setdata) {
            if (void 0 !== data.information.setdata.version) {
                const update = await setData(Information, "version", data.information.setdata.version);
            }
            if (void 0 !== data.information.setdata.zalo) {
                const update = await setData(Information, "zalo", data.information.setdata.zalo);
            }
            if (void 0 !== data.information.setdata.telegram) {
                const update = await setData(Information, "telegram", data.information.setdata.telegram);
            }
            if (void 0 !== data.information.setdata.telegramBot) {
                const update = await setData(Information, "telegramBot", data.information.setdata.telegramBot);
            }
            if (void 0 !== data.information.setdata.telesupport) {
                const update = await setData(Information, "telesupport", data.information.setdata.telesupport);
            }
            if (void 0 !== data.information.setdata.fanpage) {
                const update = await setData(Information, "fanpage", data.information.setdata.fanpage);
            }
            if (void 0 !== data.information.setdata.quickChat) {
                const update = await setData(Information, "quickChat", data.information.setdata.quickChat);
            }
            if (void 0 !== data.information.setdata.ios) {
                const update = await setData(Information, "ios", data.information.setdata.ios);
            }
            if (void 0 !== data.information.setdata.android) {
                const update = await setData(Information, "android", data.information.setdata.android);
            }

            const dataClient = {
                initApp: {
                    information: {
                        version: await getDataSys(Information, "version"),
                        telegram: await getDataSys(Information, "telegram"),
                        telegramBot: await getDataSys(Information, "telegramBot"),
                        telesupport: await getDataSys(Information, "telesupport"),
                        zalo: await getDataSys(Information, "zalo"),
                        fanpage: await getDataSys(Information, "fanpage"),
                        quickChat: await getDataSys(Information, "quickChat"),
                        ios: await getDataSys(Information, "ios"),
                        android: await getDataSys(Information, "android"),
                    }
                }
            };

            client.redT.sendInHome(dataClient);
            client.red({ notice: { title: 'Thành Công', text: 'Cài đặt thông tin thành công!' } });
        }
    } else {
        client.red({ notice: { title: 'Thất bại', text: 'Dữ liệu không đúng' } });
    }
}