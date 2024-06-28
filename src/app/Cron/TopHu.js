// Hũ game
let HU_game = require('../Models/HU');

let TopHu = function (io) {
    HU_game.find({}, 'game type red bet toX balans x').exec(function (err, data) {
        if (data.length) {
            let result = data.map(function (obj) {
                obj = obj._doc;
                delete obj._id;
                return obj;
            });
            let temp_data = {
                TopHu: {
                    mini_poker: result.filter(function (mini_poker) {
                        return mini_poker.game === "minipoker";
                    }),
                    big_babol: result.filter(function (big_babol) {
                        return big_babol.game === "bigbabol";
                    }),
                    vq_red: result.filter(function (vq_red) {
                        return vq_red.game === "vuongquocred";
                    }),
                    mini3cay: result.filter(function (mini3cay) {
                        return mini3cay.game === "mini3cay";
                    }),
                    caothap: result.filter(function (caothap) {
                        return caothap.game === "caothap";
                    }),
                    arb: result.filter(function (arb) {
                        return arb.game === "arb";
                    }),
                    candy: result.filter(function (candy) {
                        return candy.game === "candy";
                    }),
                    long: result.filter(function (long) {
                        return long.game === "long";
                    }),
                    zeus: result.filter(function (zeus) {
                        return zeus.game === "Zeus";
                    }),
                    tamhung: result.filter(function (tamhung) {
                        return tamhung.game === "tamhung";
                    }),
                    vqb: result.filter(function (tamhung) {
                        return tamhung.game === "tamhung";
                    }),
                    chuadao: result.filter(function (tamhung) {
                        return tamhung.game === "tamhung";
                    }),
                    thanhchien: result.filter(function (tamhung) {
                        return tamhung.game === "tamhung";
                    }),
                    captin: result.filter(function (zeus) {
                        return zeus.game === "Zeus";
                    }),
                    sexandzen: result.filter(function (sexandzen) {
                        return sexandzen.game === "sexandzen";
                    }),
                    roy: result.filter(function (roy) {
                        return roy.game === "roy";
                    }),
                }
            };
            io.broadcast(temp_data);
        }
    });
}


module.exports = async (io) => {
    try {
        // gọi top hũ luôn khi init socket
        setInterval(async () => {
            try {
                TopHu(io);
            } catch (e) {
                console.log(e.message);
            }
        }, 7000);
    } catch (e) {
        console.log(e.message);
    }
}