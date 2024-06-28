let SysGameStatus = require('../../../../Models/System/Sys_GameStatus');

let setData = async(models, key, value) => {
    try {
        const rowUpdate = await models.findOneAndUpdate({ key }, { value });
        return rowUpdate;
    } catch (e) {
        console.log(e);
    }
}

let getDataSys = async(models, key) => {
    try {
        const getData = await models.findOne({ key });
        return getData.value;
    } catch (e) {
        console.log(e);
    }
};

module.exports = async(client, data) => {
    if (!!data) {
        if (void 0 !== data.gamestatus.getdata) {
            const data = {
                systemset: {
                    gameStatus: {
                        taixiu: await getDataSys(SysGameStatus, "taixiu"),
                        xocxoc: await getDataSys(SysGameStatus, "xocxoc"),
                        rongho: await getDataSys(SysGameStatus, "rongho"),
                        baucua: await getDataSys(SysGameStatus, "baucua"),
                        lode: await getDataSys(SysGameStatus, "lode"),
                        kbet: await getDataSys(SysGameStatus, "kbet"),
                        pocker: await getDataSys(SysGameStatus, "pocker"),
                        candy: await getDataSys(SysGameStatus, "candy"),
                        bacay: await getDataSys(SysGameStatus, "bacay"),
                        caothap: await getDataSys(SysGameStatus, "caothap"),
                        minipoker: await getDataSys(SysGameStatus, "minipoker"),
                        pubg: await getDataSys(SysGameStatus, "pubg"),
                        casinoroyale: await getDataSys(SysGameStatus, "casinoroyale"),
                        sieuxe: await getDataSys(SysGameStatus, "sieuxe"),
                        avengers: await getDataSys(SysGameStatus, "avengers"),
                        panda: await getDataSys(SysGameStatus, "panda"),
                        lmht: await getDataSys(SysGameStatus, "lmht"),
                        banca: await getDataSys(SysGameStatus, "banca"),
                        mienvientay: await getDataSys(SysGameStatus, "mienvientay"),
                        dongmauanhhung: await getDataSys(SysGameStatus, "dongmauanhhung"),
                        frozen: await getDataSys(SysGameStatus, "frozen"),
                        daihaitrinh: await getDataSys(SysGameStatus, "daihaitrinh"),
                        cowboy: await getDataSys(SysGameStatus, "cowboy"),
                        tamhung: await getDataSys(SysGameStatus, "tamhung")
                    }
                }
            };
            client.red(data);
        }

        if (void 0 !== data.gamestatus.setdata) {
            if (void 0 !== data.gamestatus.setdata.taixiu) {
                const update = await setData(SysGameStatus, "taixiu", data.gamestatus.setdata.taixiu);
            }
            if (void 0 !== data.gamestatus.setdata.xocxoc) {
                const update = await setData(SysGameStatus, "xocxoc", data.gamestatus.setdata.xocxoc);
            }
            if (void 0 !== data.gamestatus.setdata.rongho) {
                const update = await setData(SysGameStatus, "rongho", data.gamestatus.setdata.rongho);
            }
            if (void 0 !== data.gamestatus.setdata.baucua) {
                const update = await setData(SysGameStatus, "baucua", data.gamestatus.setdata.baucua);
            }
            if (void 0 !== data.gamestatus.setdata.lode) {
                const update = await setData(SysGameStatus, "lode", data.gamestatus.setdata.lode);
            }
            if (void 0 !== data.gamestatus.setdata.kbet) {
                const update = await setData(SysGameStatus, "kbet", data.gamestatus.setdata.kbet);
            }
            if (void 0 !== data.gamestatus.setdata.pocker) {
                const update = await setData(SysGameStatus, "pocker", data.gamestatus.setdata.pocker);
            }
            if (void 0 !== data.gamestatus.setdata.bacay) {
                const update = await setData(SysGameStatus, "bacay", data.gamestatus.setdata.bacay);
            }
            if (void 0 !== data.gamestatus.setdata.caothap) {
                const update = await setData(SysGameStatus, "caothap", data.gamestatus.setdata.caothap);
            }
            if (void 0 !== data.gamestatus.setdata.minipoker) {
                const update = await setData(SysGameStatus, "minipoker", data.gamestatus.setdata.minipoker);
            }
            if (void 0 !== data.gamestatus.setdata.pubg) {
                const update = await setData(SysGameStatus, "pubg", data.gamestatus.setdata.pubg);
            }
            if (void 0 !== data.gamestatus.setdata.casinoroyale) {
                const update = await setData(SysGameStatus, "casinoroyale", data.gamestatus.setdata.casinoroyale);
            }
            if (void 0 !== data.gamestatus.setdata.sieuxe) {
                const update = await setData(SysGameStatus, "sieuxe", data.gamestatus.setdata.sieuxe);
            }
            if (void 0 !== data.gamestatus.setdata.avengers) {
                const update = await setData(SysGameStatus, "avengers", data.gamestatus.setdata.avengers);
            }
            if (void 0 !== data.gamestatus.setdata.panda) {
                const update = await setData(SysGameStatus, "panda", data.gamestatus.setdata.panda);
            }
            if (void 0 !== data.gamestatus.setdata.lmht) {
                const update = await setData(SysGameStatus, "lmht", data.gamestatus.setdata.lmht);
            }
            if (void 0 !== data.gamestatus.setdata.banca) {
                const update = await setData(SysGameStatus, "banca", data.gamestatus.setdata.banca);
            }
            if (void 0 !== data.gamestatus.setdata.mienvientay) {
                const update = await setData(SysGameStatus, "mienvientay", data.gamestatus.setdata.mienvientay);
            }
            if (void 0 !== data.gamestatus.setdata.dongmauanhhung) {
                const update = await setData(SysGameStatus, "dongmauanhhung", data.gamestatus.setdata.dongmauanhhung);
            }
            if (void 0 !== data.gamestatus.setdata.frozen) {
                const update = await setData(SysGameStatus, "frozen", data.gamestatus.setdata.frozen);
            }
            if (void 0 !== data.gamestatus.setdata.daihaitrinh) {
                const update = await setData(SysGameStatus, "daihaitrinh", data.gamestatus.setdata.daihaitrinh);
            }
            if (void 0 !== data.gamestatus.setdata.cowboy) {
                const update = await setData(SysGameStatus, "cowboy", data.gamestatus.setdata.cowboy);
            }
            if (void 0 !== data.gamestatus.setdata.tamhung) {
                const update = await setData(SysGameStatus, "tamhung", data.gamestatus.setdata.tamhung);
            }

            const dataClient = {
                initApp: {
                    gameStatus: {
                        taixiu: await getDataSys(SysGameStatus, "taixiu"),
                        xocxoc: await getDataSys(SysGameStatus, "xocxoc"),
                        rongho: await getDataSys(SysGameStatus, "rongho"),
                        baucua: await getDataSys(SysGameStatus, "baucua"),
                        lode: await getDataSys(SysGameStatus, "lode"),
                        kbet: await getDataSys(SysGameStatus, "kbet"),
                        pocker: await getDataSys(SysGameStatus, "pocker"),
                        candy: await getDataSys(SysGameStatus, "candy"),
                        bacay: await getDataSys(SysGameStatus, "bacay"),
                        caothap: await getDataSys(SysGameStatus, "caothap"),
                        minipoker: await getDataSys(SysGameStatus, "minipoker"),
                        pubg: await getDataSys(SysGameStatus, "pubg"),
                        casinoroyale: await getDataSys(SysGameStatus, "casinoroyale"),
                        sieuxe: await getDataSys(SysGameStatus, "sieuxe"),
                        avengers: await getDataSys(SysGameStatus, "avengers"),
                        panda: await getDataSys(SysGameStatus, "panda"),
                        lmht: await getDataSys(SysGameStatus, "lmht"),
                        banca: await getDataSys(SysGameStatus, "banca"),
                        mienvientay: await getDataSys(SysGameStatus, "mienvientay"),
                        dongmauanhhung: await getDataSys(SysGameStatus, "dongmauanhhung"),
                        frozen: await getDataSys(SysGameStatus, "frozen"),
                        daihaitrinh: await getDataSys(SysGameStatus, "daihaitrinh"),
                        cowboy: await getDataSys(SysGameStatus, "cowboy"),
                        tamhung: await getDataSys(SysGameStatus, "tamhung")
                    }
                }
            };
            client.redT.sendInHome(dataClient);

            client.red({ notice: { title: 'Thành Công', text: 'Cài đặt trạng thái thành công!' } });
        }
    } else {
        client.red({ notice: { title: 'Thất bại', text: 'Dữ liệu không đúng' } });
    }
}