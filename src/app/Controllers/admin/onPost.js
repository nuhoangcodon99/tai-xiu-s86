let Admin = require('./Admin');
let Dashboard = require('./panel/Dashboard');
let Users = require('./panel/Users');
let NapThe = require('./panel/NapThe');
let MuaThe = require('./panel/MuaThe');
let ChuyenTien = require('./panel/ChuyenTien');
let Shop = require('./panel/Shop');
let BongDa = require('./game/bongda');
let GiftCode = require('./panel/GiftCode');
let GiftCodeOne = require('./panel/GiftCodeOne');
let SystemSet = require('./panel/SystemSet');
let Cms = require('./panel/Cms');

let HeThong = require('./panel/HeThong');
let TaiXiu = require('./game/taixiu');
let BauCua = require('./game/baucua');
let MiniPoker = require('./game/mini_poker');
let BigBabol = require('./game/big_babol');
let VuongQuocRed = require('./game/vq_red');
let mini3cay = require('./game/mini3cay');
let angrybirds = require('./game/angrybirds');
let XocXoc = require('./game/xocxoc');
let RongHo = require('./game/rongho');
let candy = require('./game/candy');
let longlan = require('./game/longlan');
let zeus = require('./game/zeus');
let xs = require('./game/xs');
let eventvip = require('./panel/eventvip');

let caoboi = require('./game/caoboi');
let sieuxe = require('./game/sieuxe');
let royal = require('./game/royal');
let sexandzen = require('./game/sexandzen');
let dmanhhung = require('./game/dmanhhung');
let daohaitac = require('./game/daohaitac');
let tamhung = require("./game/tamhung");
let Momo = require("./game/momo");


module.exports = function(client, data) {
    if (!!data) {
        // đổi pass + đăng nhập bla blo
        if (!!data.admin) {
            Admin.onData(client, data.admin)
        }

        // dashboard
        if (!!data.dashboard) {
            Dashboard(client, data.dashboard);
        }

        // Begin Game
        if (!!data.taixiu) {
            TaiXiu(client, data.taixiu)
        }
        if (!!data.momo) {
            Momo(client, data.momo)
        }
        if (!!data.baucua) {
            BauCua(client, data.baucua)
        }
        if (!!data.mini_poker) {
            MiniPoker(client, data.mini_poker)
        }
        if (!!data.bongda) {
            BongDa(client, data.bongda)
        }
        if (!!data.big_babol) {
            BigBabol(client, data.big_babol)
        }
        if (!!data.vq_red) {
            VuongQuocRed(client, data.vq_red)
        }
        if (!!data.mini3cay) {
            mini3cay(client, data.mini3cay)
        }
        if (!!data.angrybird) {
            angrybirds(client, data.angrybird)
        }
        if (!!data.candy) {
            candy(client, data.candy)
        }
        if (!!data.longlan) {
            longlan(client, data.longlan)
        }
        if (!!data.tamhung) {
            tamhung(client, data.tamhung);
        }
        if (!!data.zeus) {
            zeus(client, data.zeus);
        }

        // ADDED BY KUNKEY
        if (!!data.caoboi) {
            caoboi(client, data.caoboi);
        }
        if (!!data.sieuxe) {
            sieuxe(client, data.sieuxe);
        }
        if (!!data.royal) {
            royal(client, data.royal);
        }
        if (!!data.sexandzen) {
            sexandzen(client, data.sexandzen);
        }
        if (!!data.dmanhhung) {
            dmanhhung(client, data.dmanhhung);
        }
        if (!!data.daohaitac) {
            daohaitac(client, data.daohaitac);
        }
        // END ADDED

        if (!!data.rongho) {
            RongHo(client, data.rongho)
        }
        if (!!data.xocxoc) {
            XocXoc(client, data.xocxoc)
        }
        // End Game

        if (!!data.nap_the) {
            NapThe(client, data.nap_the)
        }
        if (!!data.mua_the) {
            MuaThe(client, data.mua_the)
        }
        if (!!data.chuyen_tien) {
            ChuyenTien(client, data.chuyen_tien)
        }
        if (!!data.users) {
            Users(client, data.users)
        }
        if (!!data.shop) {
            Shop(client, data.shop)
        }
        if (!!data.giftcode) {
            GiftCode(client, data.giftcode);
        }
        if (!!data.giftcodeone) {
            GiftCodeOne(client, data.giftcodeone);
        }
        if (!!data.sys) {
            HeThong(client, data.sys);
        }
        if (!!data.xs) {
            xs(client, data.xs);
        }
        if (!!data.eventvip) {
            eventvip(client, data.eventvip);
        }
        if (!!data.systemset) {
            SystemSet(client, data.systemset);
        }
        if (!!data.cms) {
            Cms(client, data.cms);
        }
    }
}