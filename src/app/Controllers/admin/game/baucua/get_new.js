
const BauCua = require('../../../../Models/BauCua/BauCua_temp');
const dataBauCua = require('../../../../../data/baucua.json');

module.exports = function (client) {
	try {
		BauCua.findOne({}, {}, function (err, data) {
			client.red({ baucua: { dices: [dataBauCua[0], dataBauCua[1], dataBauCua[2]], time_remain: client.redT.BauCua_time } });
		});
	} catch (e) {
		client.red({
			notice: {
				title: 'Thông Báo',
				text: 'Có lỗi bất ngờ xảy ra!\nVui lòng reload lại game\nđể khắc phục...'
			}
		});
	}
}
