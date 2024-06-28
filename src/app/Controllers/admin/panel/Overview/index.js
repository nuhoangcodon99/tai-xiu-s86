var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
const Admins = require('../../../../Models/Admin');
const UserInfos = require('../../../../Models/UserInfo');
const BankHistory = require('../../../../Models/Bank/Bank_history');
const NapThe = require('../../../../Models/NapThe');
const MuaThe = require('../../../../Models/MuaThe');

module.exports = async function (client) {
    let online = {};
    online.users = [];
    online.admins = [];

    Object.values(client.redT.users).forEach(user => {
        user.forEach((member) => {
            online.users.push({
                id: member.UID,
                name: member.RedName,
                scene: member.scene,
            });
        });
    });

    Object.values(client.redT.admins).forEach(admin => {
        admin.forEach((owner) => {
            online.admins.push({
                id: owner.UID,
                name: owner.RedName
            });
        });
    });

    online.totalUser = await UserInfos.countDocuments({ type: false }).exec();
    online.totalAdmin = await Admins.countDocuments({}).exec();

    let nap = {};
    nap.bank = [];
    nap.momo = [];
    nap.thecao = [];
    nap.viettelpay = [];

    let totalRechargeBank = 0;
    let totalRechargeMomo = 0;
    let totalRechargeCard = 0;
    let totalRechargeViettelpay = 0;


    const today = moment().startOf('day')
    let findHistory = await BankHistory.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        type: 0,
        status: 1
    }).exec();

    findHistory.forEach((data) => {
        if (data.bank == "MOMO") {
            nap.momo.push(data);
            totalRechargeMomo += Number(data.money);
        } else if (data.bank == "VIETTELPAY") {
            nap.viettelpay.push(data);
            totalRechargeViettelpay += Number(data.money);
        } else {
            nap.bank.push(data);
            totalRechargeBank += Number(data.money);
        }
    });

    nap.thecao = await NapThe.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        status: 1
    }).exec();

    nap.thecao.forEach((data) => {
        totalRechargeCard += Number(data.menhGia);
    });

    let rut = {};
    rut.thecao = await MuaThe.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        status: 0
    }).exec();
    rut.bank = await BankHistory.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        type: 1,
        status: 0
    }).exec();

    let cardCashOut = await MuaThe.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        status: 1
    }).exec();
    let bankCashOut = await BankHistory.find({
        time: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        },
        type: 1,
        status: 1
    }).exec();

    let totalCashOutCard = 0;
    let totalCashOutBank = 0;

    cardCashOut.forEach((data) => {
        totalCashOutCard += Number(data.menhGia);
    });
    bankCashOut.forEach((data) => {
        totalCashOutBank += Number(data.money);
    });


    let totalRechargeToday = totalRechargeBank + totalRechargeMomo + totalRechargeCard + totalRechargeViettelpay;
    let totalCashOutToday = totalCashOutCard + totalCashOutBank;
    let income = {};
    income.today = totalRechargeToday - totalCashOutToday;
    income.month = 0

    client.red({
        dashboard: {
            online,
            nap,
            rut,
            total: {
                totalRechargeToday,
                totalCashOutToday
            },
            income
        }
    });
}