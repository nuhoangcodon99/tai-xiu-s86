const initSenceDashboard = () => {
    // SENCE Dashboard
    if (!authData.currentlogin.permission.main) {
        $(".content-body").html(`
            <div class="container-fluid mt-3">
                <div class="row">

                    <div class="container h-100">
                                <div class="row justify-content-center h-100">
                                    <div class="col-xl-6">
                                        <div class="error-content">
                                            <div class="card mb-0">
                                                <div class="card-body text-center">
                                                    <h1 class="error-text text-primary">403</h1>
                                                    <h4 class="mt-4"><i class="fa fa-thumbs-down text-danger"></i> Yêu cầu đã bị từ chối</h4>
                                                    <p>Khu vực này chỉ hiển thị đối với người được ủy quyền.</p>
                                                    <form class="mt-5 mb-5">
                                                        
                                                    </form>
                                                    <div class="text-center">
                                                        <p>Copyright © Designed by <a href="#">Digitalheaps</a>, Developed by <a href="#">Quixlab</a> 2018</p>
                                                        <ul class="list-inline">
                                                            <li class="list-inline-item"><a href="javascript:void()" class="btn btn-facebook"><i class="fa fa-facebook"></i></a>
                                                            </li>
                                                            <li class="list-inline-item"><a href="javascript:void()" class="btn btn-twitter"><i class="fa fa-twitter"></i></a>
                                                            </li>
                                                            <li class="list-inline-item"><a href="javascript:void()" class="btn btn-linkedin"><i class="fa fa-linkedin"></i></a>
                                                            </li>
                                                            <li class="list-inline-item"><a href="javascript:void()" class="btn btn-google-plus"><i class="fa fa-google-plus"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                </div>
            </div>
        `);
        return;
    }

    $(".content-body").hide();
    $(".content-body").html(`
          <div class="container-fluid mt-3">
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-1">
                            <div class="card-body">
                                <h3 class="card-title text-white">Nạp Bank</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white" id="bankToday">0</h2>
                                    <p class="text-white mb-0">Hôm nay</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-2">
                            <div class="card-body">
                                <h3 class="card-title text-white">Nạp Momo</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white" id="momoToday">0</h2>
                                    <p class="text-white mb-0">Hôm nay</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-3">
                            <div class="card-body">
                                <h3 class="card-title text-white">Nạp Thẻ</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white" id="thecaoToday">0</h2>
                                    <p class="text-white mb-0">Hôm nay</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card gradient-4">
                            <div class="card-body">
                                <h3 class="card-title text-white">Nạp Viettel Pay</h3>
                                <div class="d-inline-block">
                                    <h2 class="text-white" id="viettelpayToday">0</h2>
                                    <p class="text-white mb-0">Hôm nay</p>
                                </div>
                                <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3">
                        <div class="card card-widget">
                            <div class="card-body gradient-3">
                                <div class="media">
                                    <span class="card-widget__icon"><i class="icon-home"></i></span>
                                    <div class="media-body">
                                        <h2 class="card-widget__title" id="incomeToday">0</h2>
                                        <h5 class="card-widget__subtitle">Tổng thu hôm nay</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="card card-widget">
                            <div class="card-body gradient-4">
                                <div class="media">
                                    <span class="card-widget__icon"><i class="icon-tag"></i></span>
                                    <div class="media-body">
                                        <h2 class="card-widget__title" id="cashoutToday">0</h2>
                                        <h5 class="card-widget__subtitle">Tổng rút hôm nay</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="card card-widget">
                            <div class="card-body gradient-4">
                                <div class="media">
                                    <span class="card-widget__icon"><i class="icon-emotsmile"></i></span>
                                    <div class="media-body">
                                        <h2 class="card-widget__title" id="realIncomeToday">0</h2>
                                        <h5 class="card-widget__subtitle">Thực thu hôm nay</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="card card-widget">
                            <div class="card-body gradient-9">
                                <div class="media">
                                    <span class="card-widget__icon"><i class="icon-ghost"></i></span>
                                    <div class="media-body">
                                        <h2 class="card-widget__title" id="realIncomeMonth">0</h2>
                                        <h5 class="card-widget__subtitle">Thực thu tháng này</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="card card-widget">
                            <div class="card-body">
                                <h5 class="card-title px-4 mb-3">Thống Kê Online </h5>
                                <center><h2 class="mt-4" id="countOnline" style="font-weight: bold;">0</h2></center>
                                <center><span>Đang hoạt động</span></center>
                                <div class="mt-4">
                                    <h6>Users Online <span class="pull-right"><o id="userOnlines">0</o>/<o id="totalUser">0</o></span></h6>
                                    <div class="progress mb-3" style="height: 7px">
                                        <div id="processUserOnlines" class="progress-bar bg-primary" style="width: 0%;" role="progressbar"><span class="sr-only">30% Order</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <h6 >Admins Online <span class="pull-right"><o id="adminOnlines">0</o>/<o id="totalAdmin">0</o></span></h6>
                                    <div class="progress mb-3" style="height: 7px">
                                        <div id="processAdminOnlines" class="progress-bar bg-success" style="width: 0%;" role="progressbar"><span class="sr-only">50% Order</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Vị trí người chơi</h4>
                                <div class="active-member" style="height: 202px;overflow: scroll;overflow-x: hidden;">
                                    <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Tên</th>
                                                    <th class="text-center">Vị trí</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tableSceneLocation">                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="text-center">
                                    <span class="display-5"><i class="icon-wallet gradient-9-text"></i></span>
                                    <h2 class="mt-3" id="bankOrderCheckOut">0</h2>
                                    <h5 class="mt-3 mb-1">RÚT NGÂN HÀNG</h5>
                                    <hr>
                                    <button type="button" onclick="callDataGame('nganhangrut')" class="btn-lg btn mb-1 btn-rounded btn-danger">Kiểm Tra</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="text-center">
                                    <span class="display-5"><i class="icon-credit-card gradient-4-text"></i></span>
                                    <h2 class="mt-3" id="cardOrderCheckOut">0</h2>
                                    <h5 class="mt-3 mb-1">RÚT THẺ</h5>
                                    <hr>
                                    <button type="button" onclick="callDataGame('yeucaurutthe')" class="btn-lg btn mb-1 btn-rounded btn-danger">Kiểm Tra</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Biểu Đồ Thu Nhập</h4>
                                <div id="chart-money">
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            
            </div>`);

    $(".content-body").fadeIn();
}

let initChart = (data) => {

    try {

        var options = {};
        options.chart = {
            height: 350,
            type: 'area'
        };
        options.dataLabels = {
            enabled: false
        };
        options.stroke = {
            curve: 'smooth'
        };
        options.tooltip = {
            y: {
                formatter: function (value, series) {
                    return numberWithCommas(value);
                }
            }
        }
        options.xaxis = {
            type: 'date',
            categories: []
        };
        options.yaxis = {
            labels: {
                formatter: function (value) {
                    return numberWithCommas(value);
                }
            }
        };
        options.series = [{
            name: 'Bank',
            data: []
        },
        {
            name: 'Momo',
            data: []
        },
        {
            name: 'Thẻ Cào',
            data: []
        },
        {
            name: 'ViettelPay',
            data: []
        }
        ];

        for (var key in data.nap) {
            options.xaxis.categories.push(key);
            let napBank = 0;
            let napMomo = 0;
            let napViettelPay = 0;
            let napTheCao = 0;

            data.nap[key].bank.forEach((nap) => {
                napBank = napBank + Number(nap.money);
            });
            data.nap[key].momo.forEach((nap) => {
                napMomo = napMomo + Number(nap.money);
            });
            data.nap[key].viettelpay.forEach((nap) => {
                napViettelPay = napViettelPay + Number(nap.money);
            });
            data.nap[key].thecao.forEach((nap) => {
                napTheCao = napTheCao + Number(nap.menhGia);
            });

            options.series[0].data.push(napBank);
            options.series[1].data.push(napMomo);
            options.series[2].data.push(napTheCao);
            options.series[3].data.push(napViettelPay);

        }

        var chart = new ApexCharts(document.querySelector("#chart-money"), options);
        chart.render();
    } catch (e) { }
}


let dashboard = (data) => {
    // parse data
    if (void 0 !== data.online) {
        let dataHandle = data.online;

        let bodyScene = '';
        let objUser = [];
        let userOnl = 0;

        dataHandle.users.forEach(user => {

            if (!objUser.includes(user.name)) {

                let textScene;
                switch (user.scene) {
                    case "home":
                        textScene = "Trang Chủ"
                        break;
                    case "bc":
                        textScene = "Bắn Cá"
                        break;
                    case "zeus":
                        textScene = "Liên Minh"
                        break;
                        break;
                    case "longlan":
                        textScene = "Avengers"
                        break;
                    case "Xocxoc":
                        textScene = "Xóc Đĩa"
                        break;
                    case "vq_red":
                        textScene = "Ai Cập"
                        break;
                    case "candy":
                        textScene = "KingDom"
                        break;
                    case "sexandzen":
                        textScene = "Ngộ Không"
                        break;
                    case "poker":
                        textScene = "Poker"
                        break;
                    case "bacay":
                        textScene = "Ba Cây"
                        break;
                    case "rongho":
                        textScene = "Rồng Hổ"
                        break;
                    case "royal":
                        textScene = "Pirate King"
                        break;
                    case "xo_so":
                        textScene = "Xổ Số"
                        break;
                }

                bodyScene += '<tr>';
                bodyScene += `<td class="text-center">${ user.name }</td>`;
                bodyScene += `<td class="text-center">${ textScene }</td>`;
                bodyScene += '</tr>';

                objUser.push(user.name);
                userOnl++;
            }
        });
        $("#tableSceneLocation").html(bodyScene);


        // Đang hoạt động
        $("#countOnline").html(numberWithCommas(userOnl));
        $("#userOnlines").html(numberWithCommas(userOnl)); // user online
        $("#totalUser").html(numberWithCommas(dataHandle.totalUser)); // total user online
        $("#adminOnlines").html(numberWithCommas(dataHandle.admins.length)); // admin online
        $("#totalAdmin").html(numberWithCommas(dataHandle.totalAdmin)); // total admin online

        document.getElementById("processUserOnlines").style.width = Math.ceil((userOnl / dataHandle.totalUser) * 100) + "%";
        document.getElementById("processAdminOnlines").style.width = Math.ceil((userOnl / dataHandle.totalAdmin) * 100) + "%";


    }

    if (void 0 !== data.nap) {
        let dataHandle = data.nap;

        let napBank = 0;
        let napMomo = 0;
        let napViettelPay = 0;
        let napTheCao = 0;

        dataHandle.bank.forEach((nap) => {
            napBank = napBank + Number(nap.money);
        });
        dataHandle.momo.forEach((nap) => {
            napMomo = napMomo + Number(nap.money);
        });
        dataHandle.viettelpay.forEach((nap) => {
            napViettelPay = napViettelPay + Number(nap.money);
        });
        dataHandle.thecao.forEach((nap) => {
            napTheCao = napTheCao + Number(nap.menhGia);
        });

        $("#bankToday").html(numberWithCommas(napBank));
        $("#momoToday").html(numberWithCommas(napMomo));
        $("#thecaoToday").html(numberWithCommas(napTheCao));
        $("#viettelpayToday").html(numberWithCommas(napViettelPay));

    }

    if (void 0 !== data.rut) {
        let dataHandle = data.rut;
        $("#bankOrderCheckOut").html(numberWithCommas(dataHandle.bank.length));
        $("#cardOrderCheckOut").html(numberWithCommas(dataHandle.thecao.length));
    }

    if (void 0 !== data.total) {
        let dataHandle = data.total;
        $("#incomeToday").html(numberWithCommas(dataHandle.totalRechargeToday));
        $("#cashoutToday").html(numberWithCommas(dataHandle.totalCashOutToday));
    }

    if (void 0 !== data.income) {
        let dataHandle = data.income;
        $("#realIncomeToday").html(numberWithCommas(dataHandle.today));
        $("#realIncomeMonth").html(numberWithCommas(dataHandle.month));
    }
}