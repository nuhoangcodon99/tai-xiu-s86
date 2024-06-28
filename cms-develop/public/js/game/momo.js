// SENCE MOMO
const initSenceChanleMomo = () => {
    $(".content-body").html(`
<div id="momoElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-4 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted text-center" style="font-size: 25px;color: #101010 !important;">THỐNG KÊ HÔM NAY</h5>
              <hr>
              <div class="row">

              <div class="col-6">
                <div class="card card-widget">
                    <div class="card-body gradient-9">
                        <div class="media">
                            <span class="card-widget__icon"><i class="fa fa-money"></i></span>
                            <div class="media-body">
                                <h2 class="card-widget__title" id="momoMoneyRecive">0</h2>
                                <h5 class="card-widget__subtitle">TỔNG TIỀN NHẬN</h5>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              <div class="col-6">
                <div class="card card-widget">
                    <div class="card-body gradient-4">
                        <div class="media">
                            <span class="card-widget__icon"><i class="fa fa-shopping-cart"></i></span>
                            <div class="media-body">
                                <h2 class="card-widget__title" id="momoMoneyReal">0</h2>
                                <h5 class="card-widget__subtitle">TỔNG DOANH THU</h5>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

            </div>

            </div>
          </div>


          <div class="card">
            <div class="card-body">
              <h5 class="text-muted text-center" style="font-size: 25px;color: #101010 !important;">CẤU HÌNH TÀI KHOẢN</h5>
              <hr>
                    <div class="basic-form">
                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label">SỐ ĐIỆN THOẠI MOMO</label>
                            <div class="col-sm-7">
                                <input type="number" id="momoPhone" class="form-control" placeholder="Số điện thoại...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label">TÊN TRÊN MOMO</label>
                            <div class="col-sm-7">
                                <input type="text" id="momoName" class="form-control" placeholder="Tên...">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button onclick="updateMomoAccount()" class="btn btn-dark">Lưu</button>
                            </div>
                        </div>
                    </div>
              
            </div>
          </div>

        </div>

        <div class="col-md-8 col-lg-8">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted text-center" style="font-size: 25px;color: #101010 !important;">LỊCH SỬ CHƠI MOMO</h5>
              <hr>

              <div class="row d-flex justify-content-center">
              <div class="col-12 col-md-4 col-lg-4">
                <div class="row">

                  <div class="col-sm-12 col-lg-12 col-md2">
                    <input type="text" id="byNickname" class="form-control" placeholder="Tên nhân vật cần tìm">
                  </div>

                </div>
              </div>
              <div class="col-12 col-md-2 col-lg-2">
                <button onclick="MomofilterUsers()" type="button" class="btn btn-lg mb-1 btn-flat btn-dark"><i class="fa fa-search"></i> Tìm
                  Kiếm</button>
              </div>
            </div>
            <hr>


              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NGƯỜI CHƠI</th>
                      <th class="text-center">MỨC CƯỢC</th>
                      <th class="text-center">GAME</th>
                      <th class="text-center">MÃ GIAO DỊCH</th>
                      <th class="text-center">TIỀN THẮNG</th>
                      <th class="text-center">THỜI GIAN</th>
                    </tr>
                  </thead>
                  <tbody id="tableLichSuMomo">
                  </tbody>
                </table>
              </div>
                <div class="bootstrap-pagination">
                    <nav class="text-center">
                      <ul class="pagination justify-content-center" id="phantrangLichSuMomo"></ul>
                    </nav>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    `);
};

let momo = (data) => {
    if (void 0 !== data.config) {
        momoAccount(data.config);
    }
    if (void 0 !== data.get_data) {
        viewLichSuChoiMomo(data.get_data);
    }
    if (void 0 !== data.getstatis) {
        momoStatis(data.getstatis);
    }
}

let momoAccount = (data) => {
    if (!!data) {
        $("#momoPhone").val(data.phone);
        $("#momoName").val(data.name);
    }
}

let updateMomoAccount = () => {
    let momoPhone = $("#momoPhone").val();
    let momoName = $("#momoName").val();

    if (!momoPhone && !momoName) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }

    ws.send(`{"momo":{"update":{"phone":"${ momoPhone }","name":"${ momoName }"}}}`);
}

let momoStatis = (data) => {
    try {
        $("#momoMoneyRecive").html(numberWithCommas(data.totalRecive));
        $("#momoMoneyReal").html(numberWithCommas(data.totalReal));
    } catch (e) {
        console.log(e);
    }
}


const viewLichSuChoiMomo = (obj) => {
    let PREFIX_GAME = {
        'chan-le': 'CHẴN LẺ',
        'tai-xiu': 'TÀI XỈU',
        'mot-phan-ba': 'MỘT PHẦN BA',
        'tong-ba-so': 'TỔNG BA SỐ',
        'hieu-2-so': 'HIỆU HAI SỐ',
        'lo': 'LÔ'
    }

    try {
        let data = obj.data;
        const totalPage = obj.total;
        const current_page = obj.page;
        let body = '';
        data.forEach((data) => {
            let gameName;
            gameName = PREFIX_GAME[data.game];
            body += `
            <tr>
              <td class="text-center"><b>${ data.name }</b></td>
              <td class="text-center"><b style="color:#e94141">${ numberWithCommas(data.bet) }</b></td>
              <td class="text-center"><b>${ gameName }</b></td>
              <td class="text-center"><b>#${ data.transID }</b></td>
              <td class="text-center"><b style="color:#e94141">${ numberWithCommas(data.red) }</b></td>
              <td class="text-center"><b>${ moment(data.date).format("DD/MM/YYYY h:mm:ss") }</b></td>
            </tr>
            `;
        });
        $("#tableLichSuMomo").html(body);

        const phantrang = Pagination(current_page, totalPage, 15);
        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
            <li class="page-item ${ active }">
                <a class="page-link" href="javascript:void(LichSuChoiMomoGetDataPage(${ page }))"><b>${ page }</b></a>
            </li>
        `;
            $("#phantrangLichSuMomo").html(phantrangBody);
        });

    } catch (e) {
        console.log(e);
    }
}

const MomofilterUsers = () => {
    const name = $("#byNickname").val();
    ws.send(`{"momo":{"get_data":{"name": "${ name }", "page": 1}}}`);
};

const LichSuChoiMomoGetDataPage = (page) => {
    const name = $("#byNickname").val();
    if (name.length > 0) {
        ws.send(`{"momo":{"get_data":{"name": "${ name }", "page": ${ page }}}}`);
    } else {
        ws.send(`{"momo":{"get_data":{"page": ${ page }}}}`);
    }
}