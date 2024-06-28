const initSenceQuanlygiftcodeone = () => {
    $(".content-body").html(`
<div id="giftoneManagerElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Quản Lý GiftCode</h5>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">THỜI GIAN</th>
                      <th class="text-center">MÃ CODE</th>
                      <th class="text-center">GIÁ TRỊ</th>
                      <th class="text-center">TÌNH TRẠNG</th>
                      <th class="text-center">SỐ LƯỢNG</th>
                      <th class="text-center">ĐÃ DÙNG</th>
                      <th class="text-center">CÒN lẠI</th>
                      <th class="text-center">HẾT HẠN</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableGiftManager">
                  </tbody>
                </table>
              </div>

                <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button onclick="addGiftCodeOnePopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            <br>
                <div class="bootstrap-pagination">
                    <nav>
                    <ul class="pagination justify-content-center" id="phantrangGiftCodeOne"></ul>
                    </nav>
                </div>

            </div>
          </div>

        </div>
      </div>

    </div>

    <div class="container-fluid">
      <div class="row">
    
        <div class="col-12 m-b-30">
          <div class="row">
    
            <div style="margin-bottom: 66px;"></div>
    
            <div class="col-md-12 col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="text-muted" style="color: #101010 !important;">Tạo nhiều GiftCode</h5>
                    <hr>
                        <div class="row">
                            <div class="col-md-8 col-lg-8">
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>Số lượng tạo</label>
                                        <input type="number" id="giftLimit" placeholder="Số lượng giftcode được tạo" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Số người dùng mỗi mã</label>
                                        <input id="giftQuality" placeholder="Số người dùng mỗi mã" type="number" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Giá trị tiền nhận/mã</label>
                                        <input id="giftRed" type="number" placeholder="Giá trị tiền nhận mỗi mã" class="form-control">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <label>Ngày hết hạn</label>
                                        <input id="giftNgay" type="number" placeholder="ngày hết hạn" min="2" max="2" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Tháng hết hạn</label>
                                        <input id="giftThang" placeholder="tháng hết hạn" type="number" min="2" max="2" class="form-control">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label>Năm hết hạn</label>
                                        <input id="giftNam" type="number" placeholder="năm hết hạn" value="2022" min="4" max="4" class="form-control">
                                    </div>
                                </div>

                                <div class="text-center">
                                    <button onclick="addMultiGiftCodeOne()" type="button" class="btn mb-1 btn-rounded btn-dark">Tạo</button>
                                </div>

                            </div>
                            <div class="col-md-4 col-lg-4">
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label>Kết Xuất GiftCode</label>
                                        <textarea id="giftSuccess" class="form-control" rows="6" id="comment" placeholder="Kết quả sẽ hiển thị ở đây.."></textarea>
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
}

giftCodeOne = (data) => {
    try {
        let body = '';
        const totalPage = data.total;
        const current_page = data.page;
        data.data.forEach((data) => {
            let status;
            if (data.status == 1) {
                status = `<i class="fa fa-circle-o text-success  mr-2"></i> Hoạt động`;
            } else if (data.status == 2) {
                status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Dừng`;
            } else if (data.status == 0) {
                status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Hết hạn`;
            }
            body += `
                <tr>
                <td class="text-center"><b>${moment(data.date).format("DD/MM/YYYY H:mm")}</b></td>
                <td class="text-center"><b>${data.code}</b></td>
                <td class="text-center"><b>${numberWithCommas(data.red)}</b></td>
                <td class="text-center"><b>${status}</b></td>
                <td class="text-center"><b>${numberWithCommas(data.quality)}</b></td>
                <td class="text-center"><b>${numberWithCommas(data.used)}</b></td>
                <td class="text-center"><b>${numberWithCommas(data.quality  - data.used)}</b></td>
                <td class="text-center"><b>${moment(data.todate).format("DD/MM/YYYY H:mm")}</b></td>
                <td class="text-center">
                    <button onclick="confirmDelGiftCodeOne('${data._id}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                    <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                </td>
                </tr>
                `;
        });
        $("#tableGiftManager").html(body);

        const phantrang = Pagination(current_page, totalPage);

        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
                <li class="page-item ${active}">
                    <a class="page-link" href="javascript:void(GiftCodeOneGetDataPage(${page}))"><b>${page}</b></a>
                </li>
            `;
            $("#phantrangGiftCodeOne").html(phantrangBody);
        });

    } catch (e) {}
}


const addGiftCodeOnePopup = () => {
    const currentTimeGift = moment().add('days', 1);

    $("#giftoneManagerElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addGiftOneViewDetailModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tạo GiftCode</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div class="row" style="padding: 10px;"></div>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <input id="giftCodeCode" type="text" class="form-control" placeholder="GifCode...">
                                <div class="input-group-append"><span class="input-group-text" onclick="getGiftCodeOneRandom()"><i class="fa fa-plus"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <input id="giftCodeQuality" type="number" class="form-control" placeholder="Số lượng sử dụng...">
                                <div class="input-group-append"><span class="input-group-text"><i class="fa fa-users"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input id="giftCodeAmount" type="number" class="form-control" placeholder="Số tiền nhận...">
                            <input id="giftCodeXu" type="hidden" value="0">
                        </div>
                        <div class="form-group">
                            <select id="giftCodeStatus" class="form-control">
                                <option value="1">Hoạt động</option>
                                <option value="2">Tạm dừng</option>
                                <option value="0">Hết hạn</option>
                            </select>
                        </div>
                        <h5><center>Hết hạn</center></h5>
                        <div class="form-row align-items-center">
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeDay" class="form-control mb-2" placeholder="Ngày" value="${currentTimeGift.format('DD')}">
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeMonth" class="form-control mb-2" placeholder="Tháng" value="${currentTimeGift.format('MM')}">
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeYear" class="form-control mb-2" placeholder="Năm" value="${currentTimeGift.format('YYYY')}">
                            </div>
                        </div>
                        <br>
                        <div class="col-md-12 col-lg-12 text-center">
                          <div class="form-group">
                            <button onclick="addGiftCodeOne()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
    $("#addGiftOneViewDetailModal").modal("toggle");
}

const getGiftCodeOneRandom = () => {
    ws.send(`{"giftcodeone":{"get_gift":true}}`);
}

const giftCodeOneRadom = (data) => {
    $("#giftCodeCode").val(data);
}

const addGiftCodeOne = () => {
    const giftCodeCode = $("#giftCodeCode").val();
    const giftCodeAmount = $("#giftCodeAmount").val();
    const giftCodeDay = $("#giftCodeDay").val();
    const giftCodeMonth = $("#giftCodeMonth").val();
    const giftCodeYear = $("#giftCodeYear").val();
    const giftCodeQuality = $("#giftCodeQuality").val();
    const giftCodeStatus = $("#giftCodeStatus").val();

    if (!giftCodeCode && !giftCodeAmount && !giftCodeDay && !giftCodeMonth && !giftCodeYear && !giftCodeQuality && !giftCodeStatus) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }
    ws.send(`{"giftcodeone":{"create_gift":{"giftcode":"${giftCodeCode}","red":"${giftCodeAmount}","quality": "${giftCodeQuality}", "status":"${giftCodeStatus}", "ngay":"${giftCodeDay}","thang":"${giftCodeMonth}","nam":"${giftCodeYear}"}}}`);
    ws.send(`{"giftcodeone":{"get_data":{"page":1}}}`);
    $("#addGiftOneViewDetailModal").modal('hide');
}

const confirmDelGiftCodeOne = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ GiftCode khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"giftcodeone":{"remove":"${id}"}}`);
            ws.send(`{"giftcodeone":{"get_data":{"page":1}}}`);
        }
    });
}

const GiftCodeOneGetDataPage = (page) => {
    ws.send(`{"giftcodeone":{"get_data":{"page": ${page}}}}`);
}


const addMultiGiftCodeOne = () => {
    let giftLimit = $("#giftLimit").val();
    let giftQuality = $("#giftQuality").val();
    let giftRed = $("#giftRed").val();
    let giftNgay = $("#giftNgay").val();
    let giftThang = $("#giftThang").val();
    let giftNam = $("#giftNam").val();

    if (!giftLimit ||
        !giftQuality ||
        !giftRed ||
        !giftNgay ||
        !giftThang ||
        !giftNam
    ) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng điền đầy đủ thông tin!",
            timer: 3000
        });
    } else {
        ws.send(`{"giftcodeone":{"create_mutil_gift":{"red":"${giftRed}","quality": "${giftQuality}","limit":"${giftLimit}","ngay":"${giftNgay}","thang":"${giftThang}","nam":"${giftNam}"}}}`);
    }
}

const exportGiftcodeOne = (data) => {
    if (!!data.code) {
        $("#giftSuccess").val(function(i, text) {
            return data.code + "\n" + text;
        });
    }
}