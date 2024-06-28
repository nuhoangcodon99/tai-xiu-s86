const initSenceSystemSetting = () => {
    $(".content-body").html(`
<div id="giftManagerElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-5 col-lg-5">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Cài Đặt Thông Tin</h5>
              <hr>
              <div class="basic-form" style="">
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Version</label>
                            <div class="col-sm-8">
                                <input type="text" id="version" class="form-control" placeholder="Nhập version hiện tại...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Zalo Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="zalo" class="form-control" placeholder="Nhập Zalo link hỗ trợ...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Telegram Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="telegram" class="form-control" placeholder="Nhập Telegram link hỗ trợ...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Tele OTP Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="telegramBot" class="form-control" placeholder="Nhập TelegramBot OTP...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Tele Support Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="telesupport" class="form-control" placeholder="Nhập TelegramBot Hỗ Trợ...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">FanPage Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="fanpage" class="form-control" placeholder="Nhập FanPage link OTP...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">QuickChat Url</label>
                            <div class="col-sm-8">
                                <input type="text" id="quickChat" class="form-control" placeholder="Nhập Quick Chat link OTP...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Tải IOS</label>
                            <div class="col-sm-8">
                                <input type="text" id="ios" class="form-control" placeholder="Nhập link tải IOS...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label">Tải Android</label>
                            <div class="col-sm-8">
                                <input type="text" id="android" class="form-control" placeholder="Nhập link tải Android...">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-8">
                                <button type="button" onclick="systemSetInfo()" class="btn btn-dark">Cập nhật</button>
                            </div>
                        </div>
                </div>

            </div>
          </div>

        </div>

        <div class="col-md-7 col-lg-7">
          <div class="card">
            <div class="card-body">
                <h5 class="text-muted" style="color: #101010 !important;">Cài Đặt Trạng Thái Game</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-lg-6 col-sm-6">
                        <div class="basic-list-group">
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Tài Xỉu</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="taixiu_Set" type="checkbox" onchange="systemSetGameStatus('taixiu_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xóc Đĩa</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="xocxoc_Set" type="checkbox" onchange="systemSetGameStatus('xocxoc_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Rồng Hổ</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="rongho_Set" type="checkbox" onchange="systemSetGameStatus('rongho_Set')">
                                        <span class="slider round"></span>
                                    </label> -->
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bầu Cua</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="baucua_Set" type="checkbox" onchange="systemSetGameStatus('baucua_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>                                
                                <!--<li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Lô Đề</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="lode_Set" type="checkbox" onchange="systemSetGameStatus('lode_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li> -->
                                <!--<li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bóng Đá</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="kbet_Set" type="checkbox" onchange="systemSetGameStatus('kbet_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li> -->
                                <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Poker</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="pocker_Set" type="checkbox" onchange="systemSetGameStatus('pocker_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li> -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bom Tấn</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="candy_Set" type="checkbox" onchange="systemSetGameStatus('candy_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Thiên Địa</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="caothap_Set" type="checkbox" onchange="systemSetGameStatus('caothap_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Thần Quay</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="daihaitrinh_Set" type="checkbox" onchange="systemSetGameStatus('daihaitrinh_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Ba Cây</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="bacay_Set" type="checkbox" onchange="systemSetGameStatus('bacay_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li> -->
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Mini Poker</div> 
                                    <label class="switch" style="margin-top: 7px;">
                                        <input id="minipoker_Set" type="checkbox" onchange="systemSetGameStatus('minipoker_Set')">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>                
                    </div>
                    <div class="col-md-6 col-lg-6 col-sm-6">
                        <div class="basic-list-group">
                            <ul class="list-group">
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Mini Pubg</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="pubg_Set" type="checkbox" onchange="systemSetGameStatus('pubg_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Casino Royal</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="casinoroyale_Set" type="checkbox" onchange="systemSetGameStatus('casinoroyale_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Siêu Xe</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="sieuxe_Set" type="checkbox" onchange="systemSetGameStatus('sieuxe_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Zeus, Avengers</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="avengers_Set" type="checkbox" onchange="systemSetGameStatus('avengers_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li>                     
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Medusa, Ngộ không, Dragon, Frozen</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="pubg_Set" type="checkbox" onchange="systemSetGameStatus('pubg_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li>                                
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Bát Tiên</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="panda_Set" type="checkbox" onchange="systemSetGameStatus('panda_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Bắn Cá</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="banca_Set" type="checkbox" onchange="systemSetGameStatus('banca_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Thần Rừng</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="cowboy_Set" type="checkbox" onchange="systemSetGameStatus('cowboy_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li>
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Dòng Máu Anh Hùng</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="dongmauanhhung_Set" type="checkbox" onchange="systemSetGameStatus('dongmauanhhung_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Frozen</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="frozen_Set" type="checkbox" onchange="systemSetGameStatus('frozen_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> --> 
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Đảo Hải Tặc</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="daihaitrinh_Set" type="checkbox" onchange="systemSetGameStatus('daihaitrinh_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            <!-- <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div class="font-20x">Cao Bồi</div> 
                                <label class="switch" style="margin-top: 7px;">
                                    <input id="cowboy_Set" type="checkbox" onchange="systemSetGameStatus('cowboy_Set')">
                                    <span class="slider round"></span>
                                </label>
                            </li> -->
                            </ul>
                        </div>                
                    </div>                
                </div>

            </div>
          </div>


          <div class="card">
            <div class="card-body">
                <h5 class="text-muted" style="color: #101010 !important;">Server Settings Advance</h5>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-lg-6 text-center" id="baotrihethong">
                    </div>
                    <div class="col-md-6 col-lg-6 text-center">
                        <button onclick="rebootSystem()" type="button" class="btn mb-1 btn-flat btn-danger">SYSTEM REBOOT</button>
                    </div>
                </div>
            </div>                
          </div> 
    
        </div>


      </div>

    </div>
    `);
    getBaotriStatus();
}


let initSystemSetInformation = (data) => {
    try {
        $("#version").val(data.version);
        $("#telegram").val(data.telegram);
        $("#telegramBot").val(data.telegramBot);
        $("#zalo").val(data.zalo);
        $("#fanpage").val(data.fanpage);
        $("#quickChat").val(data.quickChat);
        $("#ios").val(data.ios);
        $("#android").val(data.android);
        $("#telesupport").val(data.telesupport);
    } catch (e) {
        console.log(e.message);
    }
}

let initSystemSetGameStatus = (data) => {
    try {
        Object.keys(data).forEach((key) => {
            if (data[key]) $("#" + key + "_Set").prop("checked", true);
        });
    } catch (e) {
        console.log(e.message);
    }
}


let systemSetInfo = () => {
    const version = $("#version").val();
    const telegram = $("#telegram").val();
    const telegramBot = $("#telegramBot").val();
    const telesupport = $("#telesupport").val();
    const zalo = $("#zalo").val();
    const fanpage = $("#fanpage").val();
    const quickChat = $("#quickChat").val();
    const ios = $("#ios").val();
    const android = $("#android").val();
    ws.send(`{"systemset":{"information":{"setdata": {"version":"${version}", "telegram":"${telegram}", "telegramBot":"${telegramBot}", "telesupport": "${telesupport}", "zalo":"${zalo}", "fanpage":"${fanpage}", "quickChat":"${quickChat}", "ios":"${ios}", "android":"${android}"}}}}`);
}

let systemSetGameStatus = (game) => {
    try {
        const name = game.split("_Set")[0];
        const value = $("#" + game).prop("checked");
        ws.send(`{"systemset":{"gamestatus":{"setdata":{"${name}":${value}}}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

let getBaotriStatus = () => {
    try {
        var settings = {
            "url": `${ConfigDataUrl}?act=baotri`,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function(response) {
            let json = JSON.parse(response);
            if (json.baotri == "true") {
                $("#baotrihethong").html(`
                <button onclick="baotriSystem(false)" type="button" class="btn mb-1 btn-flat btn-success">TẮT BẢO TRÌ</button>
                `);
            } else {
                $("#baotrihethong").html(`
                <button onclick="baotriSystem(true)" type="button" class="btn mb-1 btn-flat btn-danger">BẬT BẢO TRÌ</button>
                `);
            }
        });
    } catch (e) {
        console.log(e.message);
    }
};


let baotriSystem = (type) => {
    var settings = {
        "url": `${ConfigDataUrl}/update.php`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "act": "baotri",
            "data": type
        }
    };

    if (type) {
        cuteAlert({
            type: "question",
            title: "Bảo trì",
            message: "Bạn có muốn bật bảo trì hệ thống không?",
            confirmText: "Đồng ý",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == 'confirm') {
                $.ajax(settings).done(function(response) {
                    if (response == "true") {
                        cuteToast({
                            type: "sucess", // or 'info', 'error', 'warning'
                            message: "Đã bật chế độ bảo trì!",
                            timer: 3000
                        });
                    } else {
                        cuteToast({
                            type: "error", // or 'info', 'error', 'warning'
                            message: "Lỗi!",
                            timer: 3000
                        });
                    }
                });
            }
        });
    } else {
        cuteAlert({
            type: "question",
            title: "Bảo trì",
            message: "Bạn có muốn tắt bảo trì hệ thống không?",
            confirmText: "Đồng ý",
            cancelText: "Hủy"
        }).then((e) => {
            if (e == 'confirm') {
                $.ajax(settings).done(function(response) {
                    if (response == "false") {
                        cuteToast({
                            type: "sucess", // or 'info', 'error', 'warning'
                            message: "Đã tắt chế độ bảo trì!",
                            timer: 3000
                        });
                    } else {
                        cuteToast({
                            type: "error", // or 'info', 'error', 'warning'
                            message: "Lỗi!",
                            timer: 3000
                        });
                    }
                });
            }
        });
    }
}

let rebootSystem = () => {
    cuteAlert({
        type: "question",
        title: "Reboot System",
        message: "Bạn có muốn khởi động lại hệ thống không?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            setTimeout(function() {
                ws.send(`{"systemset":{"system":{"reboot": true}}}`);
            }, 500);
        }
    });
}