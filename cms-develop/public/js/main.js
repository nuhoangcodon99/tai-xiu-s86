let isLogin = false; // trang thai login
let authData; // set global authen
let mainSence; // set mainScene 

// Let us open a web socket
let ws = new WebSocket(SocketUrl);
ws.onopen = function() {
    console.log("Connected!");
    if (localStorage.hasOwnProperty('access_token')) {
        const data = {
            authtype: "token",
            token: localStorage.getItem("access_token"),
            ip: cmsLoginIpAndress
        }
        ws.send(JSON.stringify({ authentication: data }));
    }
}

// SOCKET NHẬN TỪ SV VỀ
ws.onmessage = (_data) => {
    var data = JSON.parse(_data.data);
    // error login 
    if (void 0 !== data.unauth) {
        localStorage.removeItem("access_token"); // remove access token
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: data.unauth.text,
            timer: 3000
        });
    }
    // login success
    if (void 0 !== data.Authorized) {
        //sweetAlert("Thành công!", `Đăng nhập thành công!`, "success");
        localStorage.setItem('access_token', data.access_token);
        isLogin = true;
        clearSenceLogin();
        authData = data;
        initMenu(authData);
        initSenceDashboard();
        mainScene = SENCE_ENUM.MAIN; // set main sence
        ws.send(`{"dashboard":{"overview":true}}`);
        ws.send(`{"dashboard":{"moneystatis": { "since": 7 }}}`);
        // ws.send(`{"taixiu":{"get_time":true,"view":false}}`);
        // ws.send(`{"baucua":{"get_new":true,"view":false}}`);
        // ws.send(`{"xocxoc":{"get_new":true,"view":false}}`);
    }
    // noitice
    if (void 0 !== data.notice) {
        cuteToast({
            type: "info", // or 'info', 'error', 'warning'
            message: data.notice.text,
            timer: 5000
        })
    }

    // RECEIVE DATA FROM SERVER

    if (void 0 !== data.dashboard) {

        if (void 0 !== data.dashboard) {
            dashboard(data.dashboard);
        }
        if (void 0 !== data.dashboard.moneystatis) {
            initChart(data.dashboard.moneystatis);
        }
    }
    if (void 0 !== data.taixiu) {
        taixiu(data.taixiu);
    }
    if (void 0 !== data.baucua) {
        baucua(data.baucua);
    }
    if (void 0 !== data.xocxoc) {
        xocxoc(data.xocxoc);
    }
    if (void 0 !== data.rongho) {
        rongho(data.rongho);
    }
    if (void 0 !== data.momo) {
        momo(data.momo);
    }
    if (void 0 !== data.caoboi) {
        caoboi(data.caoboi);
    }
    if (void 0 !== data.sieuxe) {
        sieuxe(data.sieuxe);
    }
    if (void 0 !== data.royal) {
        royal(data.royal);
    }
    if (void 0 !== data.dmanhhung) {
        dmanhhung(data.dmanhhung);
    }
    if (void 0 !== data.sexandzen) {
        sexandzen(data.sexandzen);
    }
    if (void 0 !== data.daohaitac) {
        daohaitac(data.daohaitac);
    }
    if (void 0 !== data.vq_red) {
        mienvientay(data.vq_red);
    }
    if (void 0 !== data.zeus) {
        lienminhhuyenthoai(data.zeus);
    }
    if (void 0 !== data.longlan) {
        avengers(data.longlan);
    }
    if (void 0 !== data.tamhung) {
        tamhung(data.tamhung);
    }
    if (void 0 !== data.candy) {
        panda(data.candy);
    }
    if (void 0 !== data.angrybird) {
        pubg(data.angrybird);
    }
    if (void 0 !== data.big_babol) {
        minicandy(data.big_babol);
    }
    if (void 0 !== data.mini3cay) {
        mini3cay(data.mini3cay);
    }
    if (void 0 !== data.mini_poker) {
        minipoker(data.mini_poker);
    }

    if (void 0 !== data.nap_the) {
        if (void 0 !== data.nap_the.get_data) {
            napthe(data.nap_the.get_data);
        }
    }
    if (void 0 !== data.chuyen_tien) {
        if (void 0 !== data.chuyen_tien.get_data) {
            viewLichSuChuyenTien(data.chuyen_tien.get_data);
        }
    }
    if (void 0 !== data.mua_the) {
        if (void 0 !== data.mua_the.get_data) {
            muathe(data.mua_the.get_data);
        }
        if (void 0 !== data.mua_the.get_info) {
            muatheInfo(data.mua_the.get_info);
        }
    }
    if (void 0 !== data.thecao) {
        if (void 0 !== data.thecao.menhgia) {
            quanlythecao_menhgia(data.thecao.menhgia);
        }
        if (void 0 !== data.thecao.nhamang) {
            quanlythecao_nhamang(data.thecao.nhamang);
        }
    }
    if (void 0 !== data.banknap) {
        banknap(data.banknap);
    }
    if (void 0 !== data.bankrut) {
        bankrut(data.bankrut);
    }
    if (void 0 !== data.banklist) {
        bankManager(data.banklist);
    }
    if (void 0 !== data.giftcode) {
        if (void 0 !== data.giftcode.get_data) {
            giftCode(data.giftcode.get_data);
        }
        if (void 0 !== data.giftcode.get_gift) {
            giftCodeRadom(data.giftcode.get_gift);
        }
    }
    if (void 0 !== data.giftcodeone) {
        if (void 0 !== data.giftcodeone.get_data) {
            giftCodeOne(data.giftcodeone.get_data);
        }
        if (void 0 !== data.giftcodeone.get_gift) {
            giftCodeOneRadom(data.giftcodeone.get_gift);
        }
        if (void 0 !== data.giftcodeone.export) {
            exportGiftcodeOne(data.giftcodeone.export);
        }
    }
    if (void 0 !== data.users) {
        if (void 0 !== data.users.get_users) {
            users(data.users.get_users);
        }
        if (void 0 !== data.users.get_info) {
            userInfo(data.users.get_info);
            userInfo2(data.users.get_info);
        }
        if (void 0 !== data.users.taixiu) {
            viewLichSuTaiXiuUser(data.users.taixiu);
        }
        if (void 0 !== data.users.chuyen) {
            viewLichSuUserChuyenTien(data.users.chuyen);
        }
        if (void 0 !== data.users.biendong) {
            viewBienDongSoDuUser(data.users.biendong);
        }
    }
    if (void 0 !== data.daily) {
        dailys(data.daily);
    }
    if (void 0 !== data.systemset) {
        if (void 0 !== data.systemset.information) {
            initSystemSetInformation(data.systemset.information);
        }
        if (void 0 !== data.systemset.gameStatus) {
            initSystemSetGameStatus(data.systemset.gameStatus);
        }
    }
    if (void 0 !== data.cms) {
        if (void 0 !== data.cms.getdata) {
            listCmsUser(data.cms.getdata);
        }
        if (void 0 !== data.cms.getuserpermission) {
            setShowPermissionUser(data.cms.getuserpermission);
        }
        if (void 0 !== data.cms.getlog) {
            setGetLogCms(data.cms);
        }
        if (void 0 !== data.cms.ipblacklist) {
            ipBlacklistData(data.cms.ipblacklist);
        }
    }
};




// CALL DATA INIT GAME FROM MENU 
const callDataGame = (game) => {
    // dashboard
    if (game == "home") {
        if (isLogin) {
            initMenu(authData);
            initSenceDashboard();
            mainScene = SENCE_ENUM.MAIN; // set main sence    
            ws.send(`{"dashboard":{"overview":true}}`);
            ws.send(`{"dashboard":{"moneystatis": { "since": 7 }}}`);
            ws.send(`{"taixiu":{"get_time":true,"view":false}}`);
            ws.send(`{"baucua":{"get_new":true,"view":false}}`);
            ws.send(`{"xocxoc":{"get_new":true,"view":false}}`);
        }
    }
    // taixiu
    if (game == "taixiu") {
        changeTitle("TÀI XỈU");
        mainSence = SENCE_ENUM.TAIXIU;
        ws.send(`{"taixiu":{"get_time":true,"view":true}}`);
        initSenceTaiXiu(); // tạo taixiu panel games
        return;
    }
    // baucua
    if (game == "baucua") {
        changeTitle("BẦU CUA");
        mainSence = SENCE_ENUM.BAUCUA;
        ws.send(`{"baucua":{"get_new":true,"view":true}}`);
        ws.send(`{"baucua":{"view":true}}`);
        initSenceBauCua();
        return;
    }
    // xocdia
    if (game == "xocdia") {
        changeTitle("XÓC ĐĨA");
        mainSence = SENCE_ENUM.XOCXOC;
        ws.send(`{"xocxoc":{"get_new":true,"view":true}}`);
        ws.send(`{"xocxoc":{"view":true}}`);
        initSenceXocdia();
        return;
    }
    // rongho
    if (game == "rongho") {
        changeTitle("RỒNG HỔ");
        mainSence = SENCE_ENUM.RONGHO;
        ws.send(`{"rongho":{"get_new":true,"view":true}}`);
        ws.send(`{"rongho":{"view":true}}`);
        initSenceRongho();
        return;
    }

    // chanle momo
    if (game == "momo") {
        changeTitle("CHẴN LẺ MOMO");
        mainSence = SENCE_ENUM.CHANLEMOMO;
        ws.send(`{"momo":{"getconfig":true}}`);
        ws.send(`{"momo":{"get_data":{"page":1}}}`);
        ws.send(`{"momo":{"getstatis":true}}`);
        initSenceChanleMomo();
        return;
    }

    // yeu cau nap the
    if (game == "yeucaunapthe") {
        changeTitle("YÊU CẦU NẠP THẺ");
        mainSence = SENCE_ENUM.YEUCAUNAPTHE;
        ws.send(`{"nap_the":{"get_data":{"status":"-1","page":1}}}`);
        initSenceYeucaunapthe();
        return;
    }
    // yeu cau rut the
    if (game == "yeucaurutthe") {
        changeTitle("YÊU CẦU RÚT THẺ");
        mainSence = SENCE_ENUM.YEUCAURUTTHE;
        ws.send(`{"mua_the":{"get_data":{"status":"-1","page":1}}}`);
        initSenceYeucaurutthe();
        return;
    }
    if (game == "nganhangnap") {
        changeTitle("NGÂN HÀNG NẠP");
        mainSence = SENCE_ENUM.NGANHANGNAP;
        ws.send(`{"shop":{"bank":{"nap":{"status":"0","page":1}}}}`);
        initSenceNganhangnap();
        return;
    }
    // yeu cau rut bank
    if (game == "nganhangrut") {
        changeTitle("NGÂN HÀNG RÚT");
        mainSence = SENCE_ENUM.NGANHANGRUT;
        ws.send(`{"shop":{"bank":{"rut":{"status":"0","page":1}}}}`);
        initSenceNganhangrut();
        return;
    }
    if (game == "quanlynganhang") {
        changeTitle("QUẢN LÝ NGÂN HÀNG");
        mainSence = SENCE_ENUM.QUANLYNGANHANG;
        ws.send(`{"shop":{"bank":{"list":true}}}`);
        initSenceQuanlynganhang();
        return;
    }
    // quan ly nguoi dung
    if (game == "quanlynguoidung") {
        changeTitle("QUẢN LÝ NGƯỜI DÙNG");
        mainSence = SENCE_ENUM.QUANLYNGUOIDUNG;
        ws.send(`{"users":{"get_users":{"uid":"","nick":"","name":"","phone":"","email":"","sort":"3","macth":"0", "byRecharge": "0","page":1}}}`);
        initSenceQuanlynguoidung();
        return;
    }
    // quan ly nguoi dung
    if (game == "quanlydaily") {
        changeTitle("QUẢN LÝ ĐẠI LÝ");
        mainSence = SENCE_ENUM.QUANLYDAILY;
        ws.send(`{"shop":{"daily":{"get_data":true}}}`);
        initSenceQuanlydaily();
        return;
    }
    // quan ly the cao
    if (game == "quanlythecao") {
        changeTitle("QUẢN LÝ THẺ CÀO");
        mainSence = SENCE_ENUM.QUANLYTHECAO;
        ws.send(`{"shop":{"thecao_get":{"menhgia":true,"nhamang":true}}}`);
        initSenceQuanlythecao();
        return;
    }
    if (game == "giftcode") {
        changeTitle("QUẢN LÝ GIFTCODE");
        mainSence = SENCE_ENUM.GIFTCODE;
        ws.send(`{"giftcode":{"get_data":{"page":1}}}`);
        initSenceQuanlygiftcode();
        return;
    }
    if (game == "giftcodeone") {
        changeTitle("QUẢN LÝ GIFTCODE 1 Lần");
        mainSence = SENCE_ENUM.GIFTCODEONE;
        ws.send(`{"giftcodeone":{"get_data":{"page":1}}}`);
        initSenceQuanlygiftcodeone();
        return;
    }
    // doi mat khau
    if (game == "doimatkhau") {
        changeTitle("ĐỔI MẬT KHẨU");
        mainSence = SENCE_ENUM.DOIMATKHAU;
        initSenceDoimatkhau();
        return;
    }
    // gửi thong bao
    if (game == "guithongbao") {
        changeTitle("GỬI THÔNG BÁO");
        mainSence = SENCE_ENUM.GUITHONGBAO;
        initSenceGuithongbao();
        return;
    }
    // clear Trash
    if (game == "cleartrash") {
        changeTitle("DỌN DẸP DỮ LIỆU");
        mainSence = SENCE_ENUM.CLEARTRASH;
        ws.send(`{"sys":{"clear":true}}`);
        cuteToast({
            type: "success", // or 'info', 'error', 'warning'
            message: "Đã nhận lệnh dọn dẹp dữ liệu!",
            timer: 5000
        })
        return;
    }

    if (game == "quanlyhethong") {
        changeTitle("CÀI ĐẶT HỆ THỐNG");
        mainSence = SENCE_ENUM.SYSTEM;
        ws.send(`{"systemset":{"information":{"getdata":true}}}`);
        ws.send(`{"systemset":{"gamestatus":{"getdata":true}}}`);
        initSenceSystemSetting();
        return;
    }

    if (game == "ipblacklist") {
        changeTitle("BLACKLIST IP ACCESS");
        mainSence = SENCE_ENUM.BLACKLISTIP;
        initSenceIpBlackList();
        return;
    }

    if (game == "logcms") {
        changeTitle("CMS LỊCH SỬ");
        mainSence = SENCE_ENUM.QUANLYCMS;
        ws.send(`{"cms":{"getlog":{"page":1}}}`);
        initSenceLogCms();
        return;
    }

    if (game == "quanlycms") {
        changeTitle("QUẢN LÝ CMS");
        mainSence = SENCE_ENUM.QUANLYCMS;
        ws.send(`{"cms":{"getdata": true }}`);
        initSenceQuanlycms();
        return;
    }

    if (game == "lichsuchuyentien") {
        changeTitle("LỊCH SỬ CHUYỂN TIỀN");
        mainSence = SENCE_ENUM.LICHSUCHUYENTIEN;
        ws.send(`{"chuyen_tien":{"get_data":{"page":1}}}`);
        initSenceLichSuChuyenTien();
        return;
    }

    // slot game
    if (game == SENCE_ENUM.CAOBOI ||
        game == SENCE_ENUM.SIEUXE ||
        game == SENCE_ENUM.ROYAL ||
        game == SENCE_ENUM.DMANHHUNG ||
        game == SENCE_ENUM.SEXANDZEN ||
        game == SENCE_ENUM.DAOHAITAC ||
        game == SENCE_ENUM.MINIPOKER ||
        game == SENCE_ENUM.MINI3CAY ||
        game == SENCE_ENUM.MINICANDY ||
        game == SENCE_ENUM.PUBG ||
        game == SENCE_ENUM.MIENVIENTAY ||
        game == SENCE_ENUM.PANDA ||
        game == SENCE_ENUM.AVENGERS ||
        game == SENCE_ENUM.LMHT) {

        let gameName = (game == SENCE_ENUM.DAOHAITAC) ? "tamhung" : game;

        changeTitle("SLOT GAME");
        mainSence = SENCE_ENUM[game.toUpperCase()];
        ws.send(`{ "${ gameName }": { "get_data": true } }`);
        ws.send(`{ "${ gameName }": { "get_top": { "sort": "7", "page": 1 } } }`);
        initSenceSlot(gameName); // tạo slot panel game              
    }

}

ws.onclose = (e) => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    cuteAlert({
        type: "question",
        title: "Bạn vừa mất kết nối",
        message: "Bạn có muốn kết nối lại không ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            setTimeout(function() {
                location.reload();
            }, 800);
        }
    });
};

ws.onerror = (err) => {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
};


let signOut = () => {
    cuteAlert({
        type: "question",
        title: "Đăng xuất",
        message: "Bạn có muốn kết thúc phiên đăng nhập không?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            setTimeout(function() {
                localStorage.removeItem("access_token"); // remove access token
                location.reload();
            }, 500);
        }
    });
}