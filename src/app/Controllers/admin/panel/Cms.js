let getData = require('./Cms/getData');
let addAccount = require('./Cms/addAccount');
let editPermission = require('./Cms/editPermission');
let deleteAccount = require('./Cms/deleteAccount');
let getUserPermission = require('./Cms/getUserPermission');
let getlog = require('./Cms/getLog');
let ipBlackList = require('./Cms/ipBlackList');

module.exports = function(client, data) {
    if (void 0 !== data.getdata) {
        getData(client)
    }
    if (void 0 !== data.ipblacklist) {
        ipBlackList(client, data.ipblacklist);
    }
    if (void 0 !== data.getlog) {
        getlog(client, data.getlog);
    }
    if (void 0 !== data.getuserpermission) {
        getUserPermission(client, data.getuserpermission);
    }
    if (void 0 !== data.addaccount) {
        addAccount(client, data.addaccount);
    }
    if (void 0 !== data.editpermission) {
        editPermission(client, data.editpermission);
    }
    if (void 0 !== data.deleteaccount) {
        deleteAccount(client, data.deleteaccount);
    }
}