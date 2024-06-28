require('dotenv').config();
const Admin = require('../../../../Models/Admin');

module.exports = async(client) => {
    try {
        const getdata = await Admin.find({ "username": { "$ne": process.env.ADMIN_USERNAME } }, '-password -token -lastLogin -fail');
        client.red({ cms: { getdata } });
    } catch (e) {
        client.red({ cms: { getdata: [] } });
    }
}