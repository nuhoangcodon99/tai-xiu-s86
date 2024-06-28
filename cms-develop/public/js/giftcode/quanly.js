const initSenceQuanlygiftcode = () => {
    $(".content-body").html(`
<div id="giftManagerElement"></div>
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
                      <th class="text-center">MÃ CHUNG</th>
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
                        <button onclick="addGiftCodePopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

giftCode = (data) => {
    try {
        let body = '';
        data.data.forEach((data) => {
            let status;
            if (void 0 !== data.uid) {
                status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Hết`;
            } else {
                status = `<i class="fa fa-circle-o text-success  mr-2"></i> Còn`;
            }

            body += `
                <tr>
                <td class="text-center"><b>${moment(data.date).format("DD/MM/YYYY H:mm")}</b></td>
                <td class="text-center"><b>${data.code}</b></td>
                <td class="text-center"><b>${numberWithCommas(data.red)}</b></td>
                <td class="text-center"><b>${data.type}</b></td>
                <td class="text-center"><b>${status}</b></td>
                <td class="text-center"><b>${moment(data.todate).format("DD/MM/YYYY H:mm")}</b></td>
                <td class="text-center">
                    <button onclick="confirmDelGiftCode('${data._id}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                    <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                </td>
                </tr>
                `;
        });
        $("#tableGiftManager").html(body);
    } catch (e) {}
}


const addGiftCodePopup = () => {
    $("#giftManagerElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addGiftViewDetailModal">
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
                                <div class="input-group-append"><span class="input-group-text" onclick="getGiftCodeRandom()"><i class="fa fa-plus"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <input id="giftcodeType" type="text" class="form-control" placeholder="Mã chung...">
                                <div class="input-group-append"><span class="input-group-text" onclick="checkGiftCodeType()"><i class="fa fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <input id="giftCodeAmount" type="number" class="form-control" placeholder="Số tiền nhận...">
                            <input id="giftCodeXu" type="hidden" value="0">
                        </div>
                        <h5><center>Hết hạn</center></h5>
                        <div class="form-row align-items-center">
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeDay" class="form-control mb-2" placeholder="Ngày">
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeMonth" class="form-control mb-2" placeholder="Tháng">
                            </div>
                            <div class="col-md-4 col-lg-4">
                                <input type="number" id="giftCodeYear" class="form-control mb-2" placeholder="Năm">
                            </div>
                        </div>
                        <br>
                        <div class="col-md-12 col-lg-12 text-center">
                          <div class="form-group">
                            <button onclick="addGiftCode()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
    $("#addGiftViewDetailModal").modal("toggle");
}

const getGiftCodeRandom = () => {
    ws.send(`{"giftcode":{"get_gift":true}}`);
}

const checkGiftCodeType = () => {
    const code = $("#giftcodeType").val();
    ws.send(`{"giftcode":{"checkMid":"${code}"}}`);
}

const giftCodeRadom = (data) => {
    $("#giftCodeCode").val(data);
}

const addGiftCode = () => {
    const giftCodeCode = $("#giftCodeCode").val();
    const giftCodeType = $("#giftcodeType").val();
    const giftCodeAmount = $("#giftCodeAmount").val();
    const giftCodeDay = $("#giftCodeDay").val();
    const giftCodeMonth = $("#giftCodeMonth").val();
    const giftCodeYear = $("#giftCodeYear").val();
    const giftCodeXu = $("#giftCodeXu").val();

    if (!giftCodeCode && !giftCodeAmount && !giftCodeDay && !giftCodeMonth && !giftCodeYear) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }
    ws.send(`{"giftcode":{"create_gift":{"giftcode":"${giftCodeCode}","chung":"${giftCodeType}","red":"${giftCodeAmount}","xu":"${giftCodeXu}","ngay":"${giftCodeDay}","thang":"${giftCodeMonth}","nam":"${giftCodeYear}"}}}`);
    ws.send(`{"giftcode":{"get_data":{"page":1}}}`);
    $("#addGiftViewDetailModal").modal('hide');
}

const confirmDelGiftCode = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ GiftCode khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"giftcode":{"remove":"${id}"}}`);
            ws.send(`{"giftcode":{"get_data":{"page":1}}}`);
        }
    });
}