const initSenceQuanlynganhang = () => {
    $(".content-body").html(`
<div id="bankManagerElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Quản Lý Ngân Hàng</h5>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NGÂN HÀNG</th>
                      <th class="text-center">SỐ TÀI KHOẢN</th>
                      <th class="text-center">CHỦ TÀI KHOẢN</th>
                      <th class="text-center">CHI NHÁNH</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableBankManager">
                  </tbody>
                </table>
              </div>

                <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button onclick="addBankPopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const bankManager = (data) => {
    try {
        let body = '';
        data.data.forEach((data) => {
            body += `
                <tr>
                <td class="text-center"><b>${data.bank.toUpperCase()}</b></td>
                <td class="text-center"><b>${data.number}</b></td>
                <td class="text-center"><b>${data.name}</b></td>
                <td class="text-center"><b>${data.branch}</b></td>
                <td class="text-center">
                    <button onclick="confirmDelBank('${data._id}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                    <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                </td>
                </tr>
                `;
        });
        $("#tableBankManager").html(body);
    } catch (e) {}
}

const addBankPopup = () => {
    $("#bankManagerElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addBankViewDetailModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm ngân hàng</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div class="row" style="padding: 10px;"></div>
                        <div class="form-group">
                            <input id="BankName" type="text" class="form-control input-rounded" placeholder="Ngân hàng...">
                        </div>
                        <div class="form-group">
                            <input id="BankNumber" type="number" class="form-control input-rounded" placeholder="Số tài khoản...">
                        </div>
                        <div class="form-group">
                            <input id="BankOwner" type="text" class="form-control input-rounded" placeholder="Chủ tài khoản...">
                        </div>
                        <div class="form-group">
                            <input id="BankBranch" type="text" class="form-control input-rounded" placeholder="Chi nhánh...">
                        </div>
                        <div class="col-md-12 col-lg-12 text-center">
                          <div class="form-group">
                            <button onclick="addBank()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                          </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `);
    $("#addBankViewDetailModal").modal("toggle");
    $(document).ready(() => {
        $("#BankName").keyup(() => {
            $("#BankName").val($("#BankName").val().toUpperCase());
        });
    });
}

const addBank = () => {
    const bank = $("#BankName").val();
    const number = $("#BankNumber").val();
    const name = $("#BankOwner").val();
    const branch = $("#BankBranch").val();

    if (!bank && !number && !name && !branch) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập đầy đủ!",
            timer: 5000
        });
        return;
    }
    ws.send(`{"shop":{"bank":{"add":{"bank":"${bank}","number":"${number}","name":"${name}","branch":"${branch}"}}}}`);
    ws.send(`{"shop":{"bank":{"list":true}}}`);
    $("#addBankViewDetailModal").modal('hide');
}

const confirmDelBank = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ ngân hàng khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"shop":{"bank":{"remove":"${id}"}}}`);
            ws.send(`{"shop":{"bank":{"list":true}}}`);
        }
    });
}