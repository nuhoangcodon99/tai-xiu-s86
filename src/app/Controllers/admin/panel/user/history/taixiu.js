
var TXPhien = require('../../../../../Models/TaiXiu_phien');
var TXCuoc  = require('../../../../../Models/TaiXiu_cuoc');
const isEmpty    = require('../../../../../Helpers/Helpers').isEmpty;

module.exports = function(client, data){
	if (!!data.id) {
		var page  = data.page>>0;
		var kmess = 15;
		if (page > 0) {
			// match
			let query = {
				uid:data.id, 
				thanhtoan:true
			};

			if (!isEmpty(data.phien)) {
				query.phien = data.phien>>0;
			}
			if (!isEmpty(data.betwin)) {
				if (data.betwin == "1") {
					query.betwin = {
						$gt: 1
					};
				}else {
					query.betwin = 0;
				};
			}
			if (!isEmpty(data.tralai)) {
				if (data.tralai == "1") {
					query.tralai = {
						$gt: 1
					};
				}else {
					query.tralai = 0;
				};
			}

			TXCuoc.countDocuments({uid:data.id, thanhtoan:true}).exec(function(err, total){
				var getCuoc = TXCuoc.find(query, {}, {sort:{'_id':-1}, skip: (page-1)*kmess, limit: kmess}, function(error, result){
					if (result.length) {
						Promise.all(result.map(function(obj){
							obj = obj._doc;
							var getPhien = TXPhien.findOne({id: obj.phien}).exec();
							return Promise.all([getPhien]).then(values => {
								Object.assign(obj, values[0]._doc);
								delete obj.__v;
								delete obj._id;
								delete obj.thanhtoan;
								delete obj.id;
								delete obj.uid;
								return obj;
							});
						}))
						.then(function(arrayOfResults) {
							client.red({users:{taixiu:{data:arrayOfResults, page:page, kmess:kmess, total:total}}});
						})
					}else{
						client.red({users:{taixiu:{data: [], page:page, kmess:kmess, total:0}}});
					}
				});
			});
		}
	}
}
