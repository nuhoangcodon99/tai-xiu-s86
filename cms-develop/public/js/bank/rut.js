let rutbankDataStorage;

const initSenceNganhangrut = () => {
    $(".content-body").html(`
<div id="rutbankElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Yêu Cầu Rút Ngân Hàng</h5>
              <div class="row">
                <div class="col-2 col-md-2 col-lg-2">
                  <div class="form-group">
                    <select class="custom-select mr-sm-2" id="rutbankType" onchange="changeTypeRutbank()">
                      <option value="0">Chờ duyệt</option>
                      <option value="1">Thành công</option>
                      <option value="2">Thất bại</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">#ID</th>
                      <th class="text-center">THỜI GIAN</th>
                      <th class="text-center">TÊN</th>
                      <th class="text-center">NGÂN HÀNG</th>
                      <th class="text-center">RÚT</th>
                      <th class="text-center">TÌNH TRẠNG</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableRutbank">
                  </tbody>
                </table>
              </div>

                <div class="bootstrap-pagination">
                    <nav>
                        <ul class="pagination justify-content-center" id="phantrangRutbank"></ul>
                    </nav>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const changeTypeRutbank = () => {
    const type = $("#rutbankType").val();
    ws.send(`{"shop":{"bank":{"rut":{"status":"${type}","page":1}}}}`);
}

const bankrut = (data) => {
    try {
        rutbankDataStorage = data.data;
        const totalPage = data.total;
        const current_page = data.page;
        let body = '';
        data.data.forEach((data) => {
            let status;
            if (data.status == 2) {
                status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Thất Bại`;
            } else if (data.status == 1) {
                status = `<i class="fa fa-circle-o text-success  mr-2"></i> Thành Công`;
            } else if (data.status == 0) {
                status = `<i class="fa fa-circle-o text-warning  mr-2"></i> Chờ Duyệt`;
            }

            body += `
                <tr>
                  <td class="text-center"><b>#${data.GD}</b></td>
                  <td class="text-center"><b>${moment(data.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
                  <td class="text-center"><b>${(typeof data.name !== 'undefined') ? data.name: ""}</b></td>
                  <td class="text-center"><b>${data.bank.toUpperCase()}</b></td>
                  <td class="text-center"><b>${numberWithCommas(data.money)}</b></td>
                  <td class="text-center"><b>${status}</b></td>
                  <td class="text-center">
                    <button onclick="rutbankViewDetailPopup('${data._id}')" type="button" class="btn mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-eye color-dark"></i></b> </span><b>Chi tiết</b>
                    </button>
                  </td>
                </tr>
                `;
        });
        $("#tableRutbank").html(body);

        const phantrang = Pagination(current_page, totalPage);

        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
                <li class="page-item ${active}">
                    <a class="page-link" href="javascript:void(rutbankGetDataPage(${page}))"><b>${page}</b></a>
                </li>
            `;
            $("#phantrangRutbank").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message)
    }
}


const rutbankGetDataPage = (page) => {
    const status = $("#rutbankType").val();
    ws.send(`{"shop":{"bank":{"rut":{"status":"${status}","page":${page}}}}}`);
}

const rutbankViewDetailPopup = (dataOrder) => {
    try {
        let dataItem, status, option;
        rutbankDataStorage.forEach((item) => {
            if (item._id == dataOrder) {
                dataItem = item;
            }
        });
        if (dataItem.status == 2) {
            status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Thẻ Sai`;
            option = `<option value="2">Thất Bại</option>`;
        } else if (dataItem.status == 1) {
            status = `<i class="fa fa-circle-o text-success  mr-2"></i> Thẻ Đúng`;
            option = `<option value="1">Thành Công</option>`;
        } else if (dataItem.status == 0) {
            status = `<i class="fa fa-circle-o text-warning  mr-2"></i> Chờ Duyệt`;
            option = `<option value="0">Chờ Duyệt</option>`;
        }
        $("#rutbankElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="rutbankViewDetailModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thông Tin Rút Ngân Hàng</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div id="napthePopupNotify"></div>
                        <div class="row" style="padding: 10px;">
                          <div class="table">
                            <table class="table header-border">
                              <thead>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><b>ID giao dịch:</b></td>
                                  <td><b>#${dataItem.GD}</b></td>
                                </tr>
                                <tr>
                                  <td><b>ID Tạo lệnh:</b></td>
                                  <td><b>${dataItem.uid}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tên nhân vật:</b></td>
                                  <td><b>${dataItem.nick.toUpperCase()}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Chủ tài khoản:</b></td>
                                  <td><b>${dataItem.name}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Số tài khoản:</b></td>
                                  <td><b>${dataItem.number}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Ngân Hàng:</b></td>
                                  <td><b>${dataItem.bank.toUpperCase()}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Số tiền rút:</b></td>
                                  <td><b>${numberWithCommas(dataItem.money)}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Thời gian:</b></td>
                                  <td><b>${moment(dataItem.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tình trạng:</b></td>
                                  <td><b>${status}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Chỉnh Sửa:</b></td>
                                  <td><select id="naptheEditStatus" class="form-control">
                                          ${option}
                                          <option value="1">Thành Công</option>
                                          <option value="2">Thất Bại</option>
                                      </select></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="form-group row">
                              <div class="col-lg-2 ml-auto">
                                <button type="button" class="btn mb-1 btn-primary" onclick="rutbankEditPost('${dataItem._id}')">Cập nhật</button>
                              </div>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
        $("#rutbankViewDetailModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const rutbankEditPost = (id) => {
    ws.send(`{"shop":{"bank":{"updateRut":{"id":"${id}","status":"${$("#naptheEditStatus").val()}"}}}}`);
    $('.modal-backdrop').remove();
    $('#rutbankViewDetailModal').modal('hide');
    callDataGame('nganhangrut');
}

const approveCheckOut = () => {
    const username = $("#byUserID").val();
    const status = $("#byStatus").val();
    if (!username) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập vào tên nhân vật!",
            timer: 5000
        })
        return;
    }
    ws.send(`{"shop":{"bank":{"updatemultirut":{"uid":"${username}","status":"${status}"}}}}`);
}