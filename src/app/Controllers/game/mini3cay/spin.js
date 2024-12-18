
let Mini3Cay_red  = require('../../../Models/Mini3Cay/Mini3Cay_red');
let Mini3Cay_user = require('../../../Models/Mini3Cay/Mini3Cay_user');
let HU            = require('../../../Models/HU');
let TotalSpend = require('../../../Models/TotalSpend');
let UserInfo      = require('../../../Models/UserInfo');
let Helpers       = require('../../../Helpers/Helpers');
let base_card     = require('../../../../data/card');

module.exports = function(client, spin) {
	if (!!spin && !!spin.cuoc) {
		let cuoc = spin.cuoc>>0;  // Tiền cược
		if (!(cuoc == 100 || cuoc == 1000 || cuoc == 10000)) {
			// Error
			client.red({mini:{bacay:{status:0,notice: 'Quay thất bại...'}}});
		}else{
			// Spin
			UserInfo.findOne({id:client.UID}, 'red name', function(err, user){
				if (!user || user.red < cuoc) {
					client.red({mini:{bacay:{status:0, notice: 'Bạn không đủ Tiền để quay.!!'}}});
				}else{
					let addQuy = (cuoc*0.01)>>0;
					// Sử lý bài
					let an      = 0;
					let code    = 0;
					let text    = '';
					let thuong  = 0;
					let nohu    = false;
					let card    = [...base_card.card]
						.slice(0, 36);
					card.splice((Math.random()*4)>>0, 1);
					card.splice((Math.random()*3)>>0, 1);

					TotalSpend.findOneAndUpdate({ uid: client.UID }, { $inc: { red: cuoc } }).exec();

					// tráo bài
					card = Helpers.shuffle(card); // tráo bài lần 1
					card = Helpers.shuffle(card); // tráo bài lần 2
					card = Helpers.shuffle(card); // tráo bài lần 3
					let ketqua = card.slice(0, 3); // bốc 3 thẻ đầu tiên
					let ketqua_temp = [...ketqua]; // copy kết quả để sử lý, (tránh sắp sếp, mất tính ngẫu nhiên)
					let ADiamond = false;       // Có Át rô trong bài?
					let arrT   = [];           // Mảng lọc các bộ 2 trong bài
					for (let i = 0; i < 3; i++) {
						let dataT = ketqua[i];
						if (void 0 === arrT[dataT.card]) {
							arrT[dataT.card] = 1;
						}else{
							arrT[dataT.card] += 1;
						}
						if (dataT.card == 0 && dataT.type == 1) {
							ADiamond = true; // có Át rô trong bài.
						}
					}
					let bo3     = false; // bộ ba (Kết quả có phải là bộ 3?)
					let bo3_a   = null;  // Tên bộ 3
					arrT.forEach(function(c, index) {
						if (c === 3) {
							bo3   = true;
							bo3_a = index;
						}
					});
					let type     = ketqua[0].type;                                     // Lấy ra chất đầu tiên trong bài
					let dongChat = ketqua_temp.filter(type_card => type_card.type == type); // Lọc đồng chất
					dongChat     = dongChat.length == 3 ? true : false;                // Dây là đồng chất
					let TongDiem = (ketqua[0].card + ketqua[1].card + ketqua[2].card + 3)%10;     // Tổng điểm
					TongDiem = TongDiem === 0 ? 10 : TongDiem;
					let LienTiep   = ketqua_temp.sort(function(a,b){return a.card - b.card});
					let Day        = LienTiep[2].card - LienTiep[0].card === 2 && LienTiep[2].card != LienTiep[1].card && LienTiep[1].card != LienTiep[0].card ? true : false; // Bộ liên tiếp
					// Kết thúc xử lý bài
					// Kiểm tra kết quả
					HU.findOne({game:'mini3cay', type:cuoc, red: true}, {}, function(err, data){
						let uInfo      = {};
						let mini_users = {};
						let huUpdate   = {bet:addQuy};
						let quyHu     = data.bet;
						let quyMin    = data.min+addQuy;
						let checkName = (client.profile.name == data.name);
						if (checkName || (bo3 && bo3_a === 0)) {
							// NỔ HŨ (Bộ 3 Át Hoặc được xác định là nổ hũ)
							HU.updateOne({game:'mini3cay', type:cuoc, red: true}, {$set:{name:'', bet:quyMin}}).exec();
							if (checkName){
								// đặt kết quả thành nổ hũ nếu người chơi được xác định thủ công
								card = [...base_card.card]
									.slice(0, 4);
								// tráo bài
								card = Helpers.shuffle(card); // tráo bài lần 1
								card = Helpers.shuffle(card); // tráo bài lần 2
								//card = Helpers.shuffle(card); // tráo bài lần 3
								ketqua = card.slice(0, 3);
							}
							nohu = true;
							an   = (quyHu-Math.ceil(quyHu*2/100))>>0;
							text = 'Nổ Hũ';
							code = 6;
							huUpdate['hu'] = uInfo['hu'] = mini_users['hu']     = 1; // Khởi tạo
							client.redT.sendInHome({pushnohu:{title:'MINI 3 CÂY', name:client.profile.name, bet:an}});
						}else if (Day && dongChat) {
							// x30    3 lá liên tiếp đồng chất
							an   = cuoc*30;
							text = 'Suốt';
							code = 5;
							client.redT.sendInHome({news:{t:{game:'MINI 3 CÂY', users:client.profile.name, bet:an, status:2}}});
						}else if (bo3) {
							// x20      Sáp
							an   = cuoc*20;
							text = 'Sáp ' + (bo3_a+1);
							code = 4;
							client.redT.sendInHome({news:{t:{game:'MINI 3 CÂY', users:client.profile.name, bet:an, status:2}}});
						}else if (ADiamond && TongDiem == 10) {
							// x10		Tổng 3 lá = 10, có Át rô
							an   = cuoc*10;
							text = '10 Điểm, A rô';
							code = 3;
						}else if (TongDiem == 10) {
							// x2.5		Tổng 3 lá = 10
							an   = cuoc*2.5;
							text = '10 Điểm';
							code = 2;
						}else if (TongDiem == 9) {
							// x2 		Tổng 3 lá = 9
							an   = cuoc*2;
							text = '9 Điểm';
							code = 1;
						}

						let tien = an-cuoc;
						uInfo['red'] = tien;         // Cập nhật Số dư Red trong tài khoản
						huUpdate['redPlay'] = uInfo['redPlay'] = mini_users['bet'] = cuoc;     // Cập nhật Số Red đã chơi
						if (tien > 0){
							huUpdate['redWin'] = uInfo['redWin'] = mini_users['win'] = tien;    // Cập nhật Số Red đã Thắng
						}
						if (tien < 0){
							let BetThua = Math.abs(tien);
							try {
								HU.findOne({ game: 'mini3cay', type: cuoc, red: true }, 'bet', function(err, data) {
									if (!!data) {
										data.bet += BetThua;
										data.save();
									}
								});
							}catch(e) {
								console.log(e.message);
							}
							huUpdate['redLost'] = uInfo['redLost'] = mini_users['lost'] = tien*(-1); // Cập nhật Số Red đã Thua
							
						}
						Mini3Cay_red.create({'uid': client.UID, 'win': an, 'bet': cuoc, 'type': code, 'kq': ketqua, 'time': new Date()});
						client.red({mini:{bacay:{status:1, card:ketqua, win: an, text: text, code: code}}, user:{red: user.red-cuoc}});

						UserInfo.updateOne({id:client.UID}, {$inc: uInfo}).exec();
						Mini3Cay_user.updateOne({'uid': client.UID}, {$set:{time: new Date()}, $inc: mini_users}).exec();
						data = null;
						uInfo      = null;
						mini_users = null;
						huUpdate   = null;
						quyHu     = null;
						quyMin    = null;
						checkName = null;
						tien      = null;
						//client = null;
						spin = null;
						//cuoc = null;
						config = null;
						addQuy = null;
						an      = null;
						code    = null;
						text    = null;
						thuong  = null;
						nohu    = null;
						card    = null;
						ketqua = null;
						ketqua_temp = null;
						ADiamond = null;
						arrT   = null;
						bo3     = null;
						bo3_a   = null;
						type     = null;
						dongChat = null;
						TongDiem = null;
						LienTiep   = null;
						Day        = null;
					});
				}
			});
		}
	}
};
