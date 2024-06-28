
let BauCua_user = require('../../../../Models/BauCua/BauCua_user');
let UserInfo    = require('../../../../Models/UserInfo');

module.exports = function(client, data) {
		if (!!data && !!data.page && !!data.sort) {
		let page  = data.page>>0;
		let kmess = 10;
		if (page > 0) {
			let sort = {};
			if (data.sort == '1') {
				sort.win = 1;
			}else if (data.sort == '2') {
				sort.win = -1;

			}else if (data.sort == '3') {
				sort.lost = -1;
			}else if (data.sort == '4') {
				sort.lost = 1;

			}else if (data.sort == '5') {
				sort.totall = -1;
			}else if (data.sort == '6') {
				sort.totall = 1;

			}else{
				sort.totall = -1;
			}
		}
	}
}
