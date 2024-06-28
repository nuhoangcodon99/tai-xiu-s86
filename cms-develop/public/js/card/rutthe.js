let muatheDataStorage;

const initSenceYeucaurutthe = () => {
    $(".content-body").html(`
<div id="muatheElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Yêu Cầu Rút Thẻ</h5>
              <div class="col-2 col-md-2 col-lg-2">
                <div class="form-group">
                  <select class="custom-select mr-sm-2" id="muatheType" onchange="changeTypeMuathe()">
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
                      <th class="text-center">SỐ LƯỢNG</th>
                      <th class="text-center">TÌNH TRẠNG</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableMuathe">
                  </tbody>
                </table>
              </div>

                <div class="bootstrap-pagination">
                    <nav>
                        <ul class="pagination justify-content-center" id="phantrangMuathe"></ul>
                    </nav>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const changeTypeMuathe = () => {
    const type = $("#muatheType").val();
    ws.send(`{ "mua_the": { "get_data": { "status": "${type}", "page": 1 } } }`);
}

const muathe = (data) => {
    try {
        muatheDataStorage = data.data;
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
                  <td class="text-center"><b>${moment(data.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
                  <td class="text-center"><b>${(typeof data.name !== 'undefined') ? data.name: ""}</b></td>
                  <td class="text-center"><b>${data.nhaMang}</b></td>
                  <td class="text-center"><b>${numberWithCommas(data.menhGia)}</b></td>
                  <td class="text-center"><b>${numberWithCommas(data.soLuong)}</b></td>
                  <td class="text-center"><b>${status}</b></td>
                  <td class="text-center">
                    <button onclick="muatheGetInfo('${data._id}')" type="button" class="btn mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-eye color-dark"></i></b> </span><b>Chi tiết</b>
                    </button>
                  </td>
                </tr>
                `;
        });
        $("#tableMuathe").html(body);

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

const muatheGetInfo = (id) => {
    ws.send(`{"mua_the":{"get_info":"${id}"}}`);
}

const muatheInfo = (data) => {
    muatheViewDetailPopup(data);
}

const muatheGetDataPage = (page) => {
    const status = $("#naptheType").val();
    ws.send(`{"mua_the":{"get_data":{"status":"${status}","page":${page}}}}`);
}

const muatheViewDetailPopup = (dataOrder) => {
    try {
        let dataItem, status, option;
        let bodyCard = ``;
        muatheDataStorage.forEach((item) => {
            if (item._id == dataOrder.id) {
                dataItem = item;
            }
        });
        if (dataItem.status == 2) {
            status = `<i class="fa fa-circle-o text-danger  mr-2"></i> Thất bại`;
            option = `<option value="2">Thất bại</option>`;
        } else if (dataItem.status == 1) {
            status = `<i class="fa fa-circle-o text-success  mr-2"></i> Thành công`;
            option = `<option value="1">Thành công</option>`;
        } else if (dataItem.status == 0) {
            status = `<i class="fa fa-circle-o text-warning  mr-2"></i> Chờ Duyệt`;
            option = `<option value="0">Chờ Duyệt</option>`;
        }

        let stt = 1;
        for (let card of dataOrder.card) {
            bodyCard += `<div class="col-md-4 col-lg-4">`;
            bodyCard += `
              <div class="card text-center" style="border: 1px solid #ccc!important;">
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 18px; margin-top: 0px;">${card.nhaMang.toUpperCase()}</h5>
                    <input id="cardId_${stt}" type="hidden" value="${card._id}">
                    <div class="form-group">
                        <input id="pin_${stt}" type="text" class="form-control input-rounded" placeholder="Mã thẻ..." value="${card.maThe}">
                    </div>
                    <div class="form-group">
                        <input id="serial_${stt}" type="text" class="form-control input-rounded" placeholder="Số Seri..." value="${card.seri}">
                    </div>
                </div>
                <div class="card-footer text-muted">
                Mệnh giá: <b>${numberWithCommas(card.menhGia)}</b>
                </div>
              </div>
            `;
            bodyCard += `</div>`;
            stt++;
        }


        $("#muatheElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="muatheViewDetailModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thông Tin Nạp Thẻ</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div id="napthePopupNotify"></div>
                        <div class="row" style="padding: 10px;">
                          <div class="col-md-12 col-lg-12">
                          <div class="row">
                            ${bodyCard}
                            </div>
                          </div>
                          <div class="table">
                            <table class="table header-border">
                              <thead>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><b>Tình trạng:</b></td>
                                  <td><b>${status}</b></td>
                                </tr>
                                <tr>
                                  <td><b>Chỉnh Sửa:</b></td>
                                  <td><select id="muatheEditStatus" class="form-control">
                                          ${option}
                                          <option value="1">Thành công</option>
                                          <option value="2">Thất bại</option>
                                      </select></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="form-group row">
                              <div class="col-lg-2 ml-auto">
                                <button type="button" data-dismiss="modal" class="btn mb-1 btn-primary" onclick="muatheEditPost('${dataItem._id}', ${dataOrder.card.length})">Cập nhật</button>
                              </div>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
        $("#muatheViewDetailModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const muatheEditPost = (id, length) => {
    let status = $("#muatheEditStatus").val();
    let objCard = [];

    for (let card = 1; card <= length; card++) {
        const cardId = $(`#cardId_${card}`).val();
        const pin = $(`#pin_${card}`).val();
        const serial = $(`#serial_${card}`).val();
        let cardChild = new Object();
        if (pin) Object.assign(cardChild, { maThe: pin });
        if (serial) Object.assign(cardChild, { seri: serial });
        objCard.push({ id: cardId, card: cardChild });
    }
    let cardDataObj = {
        mua_the: {
            update: {
                cart: id,
                status,
                card: objCard
            }
        }
    }
    ws.send(JSON.stringify(cardDataObj));
    ws.send(`{"mua_the":{"get_data":{"status":"-1","page":1}}}`);
}