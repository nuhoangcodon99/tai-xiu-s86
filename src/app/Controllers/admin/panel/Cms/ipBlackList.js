const IpBlackList = require('../../../../Models/IpBlackList');

let get_data = async function(client, data) {

    let listIP = [];
    const allIP = await IpBlackList.find({}).exec();

    if (!!allIP) {
        allIP.forEach((doc) => {
            listIP.push(doc.ip);
        });
    }

    client.red({
        cms: {
            ipblacklist: listIP
        }
    });
};

let update = async function(client, data) {
    if (!!data) {
        await IpBlackList.deleteMany({});

        for (var ip of data) {
            await IpBlackList.create({
                ip: ip
            });
            client.red({ notice: { title: 'THÀNH CÔNG', text: 'Added IP: ' + ip } });
        }
    }
}

module.exports = function(client, data) {
    if (!!data.get_data) {
        get_data(client);
    }
    if (!!data.update) {
        update(client, data.update);
    }
}