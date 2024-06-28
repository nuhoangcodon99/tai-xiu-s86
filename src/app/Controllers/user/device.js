const Device = require('../../Models/Device');
const IpBlackList = require('../../Models/IpBlackList');

let updateDevice = async(client, data) => {
    try {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await Device.findOneAndUpdate({ uid: client.UID }, {
            uid: client.UID,
            ip: data.ip,
            isbrowser: data.update_device.is_browser,
            os: data.update_device.os
        }, options);
        client.red({ update_device: true });

        // ngắt kết nối user khi có ip trong blacklist
        if (!!data.ip) {
            const ipBlock = await IpBlackList.findOne({ 'ip': data.ip }).exec();
            if (!!ipBlock) {
                // ngắt kết nối user khi có ip trong blacklist
                try {
                    if (void 0 !== redT.users[client.UID]) {
                        redT.users[client.UID].forEach(function(obj) {
                            obj.red({ notice: { title: 'Spammer Blocked!', text: 'Kết nối của bạn bị ngắt bởi hệ thống!\nLiên hệ CSKH để biết thêm chi tiết.' } });
                            setTimeout(() => {
                                console.log(`Disconnected ${client.RedName.toUpperCase()} with spam IP: ${data.ip}`);
                                obj.close();
                            }, 100);
                        });
                    }
                } catch (e) {}
            }
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = function(client, data) {
    if (void 0 !== data.update_device) {
        updateDevice(client, data);
    }
};