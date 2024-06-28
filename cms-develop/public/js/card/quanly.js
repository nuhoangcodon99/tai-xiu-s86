const initSenceQuanlythecao = () => {
    $(".content-body").html(`
<div id="quanlycardElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-6 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted text-center" style="font-size: 25px;color: #101010 !important;">NHÀ MẠNG</h5>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NHÀ MẠNG</th>
                      <th class="text-center">MÃ GẠCH</th>
                      <th class="text-center">NẠP</th>
                      <th class="text-center">MUA</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableNhamang">
                  </tbody>
                </table>
              </div>
                <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button  onclick="addNhaMangPopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted text-center" style="font-size: 25px;color: #101010 !important;">MỆNH GIÁ</h5>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">MỆNH GIÁ</th>
                      <th class="text-center">GIÁ TRỊ</th>
                      <th class="text-center">NẠP</th>
                      <th class="text-center">MUA</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableMenhgia">
                  </tbody>
                </table>
              </div>
                <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button onclick="addAmountPopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    `);
}

const quanlythecao_nhamang = (data) => {
    let cardBody = '';
    data.forEach((card) => {
        cardBody += `
                <tr>
                  <td class="text-center"><b>${card.name.toUpperCase()}</b></td>
                  <td class="text-center"><b>${card.value}</b></td>
                  <td class="text-center"><b>${(card.nap) ? "CÓ" : "KHÔNG"}</b></td>
                  <td class="text-center"><b>${(card.mua) ? "CÓ" : "KHÔNG"}</b></td>
                  <td class="text-center">
                    <button onclick="confirmDelNhamang('${card._id}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                  </td>
                </tr>
                `;
    });
    $("#tableNhamang").html(cardBody);
}
const quanlythecao_menhgia = (data) => {
    let cardBody = '';
    data.forEach((card) => {
        cardBody += `
                <tr>
                  <td class="text-center"><b>${numberWithCommas(card.name)}</b></td>
                  <td class="text-center"><b>${numberWithCommas(card.values)}</b></td>
                  <td class="text-center"><b>${(card.nap) ? "CÓ" : "KHÔNG"}</b></td>
                  <td class="text-center"><b>${(card.mua) ? "CÓ" : "KHÔNG"}</b></td>
                  <td class="text-center">
                    <button onclick="confirmDelAmount('${card._id}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                  </td>
                </tr>
                `;
    });
    $("#tableMenhgia").html(cardBody);
}

const addNhaMangPopup = () => {
    $("#quanlycardElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addNhamangViewDetailModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm nhà mạng</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                      <div class="row" style="padding: 10px;"></div>
                        <div class="form-group">
                            <input id="cardNetworkName" type="text" class="form-control input-rounded" placeholder="Tên hiển thị...">
                        </div>
                        <div class="form-group">
                            <input id="cardNetworkValue" type="text" class="form-control input-rounded" placeholder="Mã Gạch...">
                        </div>
                        <div class="col-md-12 col-lg-12 text-center">
                          <div class="form-group">
                            <div class="form-check mb-3">
                              <label class="form-check-label">
                                <input id="cardNetworkNap" checked type="checkbox" class="form-check-input" value="">Áp dụng <b>NẠP</b> thẻ</label>
                            </div>
                            <div class="form-check mb-3">
                              <label class="form-check-label">
                                <input id="cardNetworkMua" checked type="checkbox" class="form-check-input" value="">Áp dụng <b>MUA</b> thẻ</label>
                            </div>
                            <button onclick="addNetwork()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                </div>
            `);
    $("#addNhamangViewDetailModal").modal("toggle");
    $(document).ready(() => {
        $("#cardNetworkName").keyup(() => {
            $("#cardNetworkName").val($("#cardNetworkName").val().toUpperCase());
        });
    });
}




const addAmountPopup = () => {
    $("#quanlycardElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addAmountViewDetailModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm mệnh giá</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div class="row" style="padding: 10px;"></div>
                        <div class="form-group">
                            <input id="cardAmountName" type="number" class="form-control input-rounded" placeholder="Mệnh giá...">
                        </div>
                        <div class="form-group">
                            <input id="cardAmountValue" type="number" class="form-control input-rounded" placeholder="Giá trị...">
                        </div>
                        <div class="col-md-12 col-lg-12 text-center">
                          <div class="form-group">
                            <div class="form-check mb-3">
                              <label class="form-check-label">
                                <input id="cardAmountNap" checked type="checkbox" class="form-check-input" value="">Áp dụng <b>NẠP</b> thẻ</label>
                            </div>
                            <div class="form-check mb-3">
                              <label class="form-check-label">
                                <input id="cardAmountMua" checked type="checkbox" class="form-check-input" value="">Áp dụng <b>MUA</b> thẻ</label>
                            </div>
                            <button onclick="addAmount()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
    $("#addAmountViewDetailModal").modal("toggle");
}

const addNetwork = () => {
    const name = $("#cardNetworkName").val();
    const values = $("#cardNetworkValue").val();
    if (!name && !values) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }
    const nap = $("#cardNetworkNap").prop("checked");
    const mua = $("#cardNetworkMua").prop("checked");
    ws.send(`{"shop":{"nhamang":{"add":{"name":"${name}","value":"${values}","nap":${nap},"mua":${mua}}}}}`);
    ws.send(`{"shop":{"thecao_get":{"menhgia":true,"nhamang":true}}}`);
    $("#addNhamangViewDetailModal").modal('hide');
}

const addAmount = () => {
    const name = $("#cardAmountName").val();
    const values = $("#cardAmountValue").val();
    if (!name && !values) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }
    if (!isInt(name)) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Mệnh giá phải là dạng số!",
            timer: 5000
        });
        return;
    }
    const nap = $("#cardAmountNap").prop("checked");
    const mua = $("#cardAmountMua").prop("checked");
    ws.send(`{"shop":{"menhgia":{"add":{"name":"${name}","values":"${values}","nap":${nap},"mua":${mua}}}}}`);
    ws.send(`{"shop":{"thecao_get":{"menhgia":true,"nhamang":true}}}`);
    $("#addAmountViewDetailModal").modal('hide');
}

const confirmDelAmount = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ mệnh giá khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"shop":{"menhgia":{"remove":"${id}"}}}`);
            ws.send(`{"shop":{"thecao_get":{"menhgia":true,"nhamang":true}}}`);
        }
    });
}

const confirmDelNhamang = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ nhà mạng khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"shop":{"nhamang":{"remove":"${id}"}}}`);
            ws.send(`{"shop":{"thecao_get":{"menhgia":true,"nhamang":true}}}`);
        }
    });
}