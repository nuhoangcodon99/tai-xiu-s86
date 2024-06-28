let naptheDataStorage;

const initSenceYeucaunapthe = () => {
    $(".content-body").html(`
<div id="naptheElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Yêu Cầu Nạp Thẻ</h5>
              <div class="col-2 col-md-2 col-lg-2">
                <div class="form-group">
                  <select class="custom-select mr-sm-2" id="naptheType" onchange="changeTypeNapthe()">
                    <option value="-1">Tất cả</option>
                    <option value="1">Đã duyệt</option>
                    <option value="0">Chờ duyệt</option>
                  </select>
                </div>
                </div>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">THỜI GIAN</th>
                      <th class="text-center">TÊN</th>
                      <th class="text-center">NHÀ MẠNG</th>
                      <th class="text-center">MỆNH GIÁ</th>
                      <th class="text-center">ĐÃ NHẬN</th>
                      <th class="text-center">TÌNH TRẠNG</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableNapthe">
                  </tbody>
                </table>
              </div>

                <div class="bootstrap-pagination">
                    <nav>
                        <ul class="pagination justify-content-center" id="phantrangNapthe"></ul>
                    </nav>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const changeTypeNapthe = () => {
    const type = $("#naptheType").val();
    ws.send(`{ "nap_the": { "get_data": { "status": "${type}", "page": 1 } } }`);
}

const napthe = (data) => {
    try {
        naptheDataStorage = data.data;
        const totalPage = data.total;
        const current_page = data.page;
        let body = '';
        data.data.forEach((data) => {
            let status;
            if (data.status == 2) {
                status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Thẻ Sai`;
            } else if (data.status == 1) {
                status = `<i class="fa fa-circle-o text-success  mr-2"></i> Thẻ Đúng`;
            } else if (data.status == 0) {
                status = `<i class="fa fa-circle-o text-warning  mr-2"></i> Chờ Duyệt`;
            }

            body += `
                <tr>
                  <td class="text-center"><b>${moment(data.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
                  <td class="text-center"><b>${(typeof data.name !== 'undefined') ? data.name: ""}</b></td>
                  <td class="text-center"><b>${data.nhaMang}</b></td>
                  <td class="text-center"><b>${numberWithCommas(data.menhGia)}</b></td>
                  <td class="text-center"><b>${numberWithCommas(data.nhan)}</b></td>
                  <td class="text-center"><b>${status}</b></td>
                  <td class="text-center">
                    <button onclick="naptheViewDetailPopup('${data._id}')" type="button" class="btn mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-eye color-dark"></i></b> </span><b>Chi tiết</b>
                    </button>
                  </td>
                </tr>
                `;
        });
        $("#tableNapthe").html(body);

        const phantrang = Pagination(current_page, totalPage);

        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
                <li class="page-item ${active}">
                    <a class="page-link" href="javascript:void(naptheGetDataPage(${page}))"><b>${page}</b></a>
                </li>
            `;
            $("#phantrangNapthe").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message)
    }
}

const naptheGetDataPage = (page) => {
    const status = $("#naptheType").val();
    ws.send(`{"nap_the":{"get_data":{"status":"${status}","page":${page}}}}`);
}

const naptheViewDetailPopup = (dataOrder) => {
    try {
        let dataItem, status, option;
        naptheDataStorage.forEach((item) => {
            if (item._id == dataOrder) {
                dataItem = item;
            }
        });
        if (dataItem.status == 2) {
            status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Thẻ Sai`;
            option = `<option value="2">Thẻ Sai</option>`;
        } else if (dataItem.status == 1) {
            status = `<i class="fa fa-circle-o text-success  mr-2"></i> Thẻ Đúng`;
            option = `<option value="1">Thẻ Đúng</option>`;
        } else if (dataItem.status == 0) {
            status = `<i class="fa fa-circle-o text-warning  mr-2"></i> Chờ Duyệt`;
            option = `<option value="0">Chờ Duyệt</option>`;
        }
        $("#naptheElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="naptheViewDetailModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thông Tin Nạp Thẻ</h5>
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
                                  <td><b>Người dùng:</b></td>
                                  <td><b>${dataItem.name.toUpperCase()}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Nhà mạng:</b></td>
                                  <td><b>${dataItem.nhaMang}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Mã thẻ:</b></td>
                                  <td><b>${dataItem.maThe}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Seri:</b></td>
                                  <td><b>${dataItem.seri}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Mệnh giá:</b></td>
                                  <td><b>${numberWithCommas(dataItem.menhGia)}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Thời gian:</b></td>
                                  <td><b>${moment(dataItem.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền nhận:</b></td>
                                  <td><b>${numberWithCommas(dataItem.nhan)}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tình trạng:</b></td>
                                  <td><b>${status}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Chỉnh Sửa:</b></td>
                                  <td><select id="naptheEditStatus" class="form-control">
                                          ${option}
                                          <option value="1">Thẻ Đúng</option>
                                          <option value="2">Thẻ Sai</option>
                                      </select></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="form-group row">
                              <div class="col-lg-2 ml-auto">
                                <button type="button" class="btn mb-1 btn-primary" onclick="naptheEditPost('${dataItem._id}')">Cập nhật</button>
                              </div>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
        $("#naptheViewDetailModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const naptheEditPost = (id) => {
    ws.send(`{"nap_the":{"update":{"id":"${id}","status":"${$("#naptheEditStatus").val()}"}}}`);
}