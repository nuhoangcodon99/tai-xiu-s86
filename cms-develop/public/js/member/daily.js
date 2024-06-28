const initSenceQuanlydaily = () => {
    $(".content-body").html(`
<div id="dailyElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Quản lý đại lý</h5>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">STT</th>
                      <th class="text-center">ĐẠI LÝ</th>
                      <th class="text-center">TÊN NHÂN VẬT</th>
                      <th class="text-center">SỐ ĐIỆN THOẠI</th>
                      <th class="text-center">KHU VỰC</th>
                      <th class="text-center">FACEBOOK</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableDaily">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button onclick="addDailyPopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const dailys = (data) => {
    try {
        let body = '';
        let i = 1;
        data.data.forEach((data) => {
            body += `
                <tr>
                  <td class="text-center"><b>#${i}</b></td>
                  <td class="text-center"><b>${data.name}</b></td>
                  <td class="text-center"><b>${data.nickname}</b></td>
                  <td class="text-center"><b>${data.phone}</b></td>
                  <td class="text-center"><b>${data.location}</b></td>
                  <td class="text-center"><b><a href="//facebook.com/${data.fb}" target="_blank">>>Xem<<</a></b></td>
                  <td class="text-center">
                    <button onclick="deleteDailyConfirm('${data._id}')" type="button" class="btn-sm mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-trash color-dark"></i></b> </span><b>Xóa</b>
                    </button>
                  </td>
                </tr>
                `;
            i++;
        });
        $("#tableDaily").html(body);
    } catch (e) {
        console.log(e.message);
    }
}

const deleteDailyConfirm = (id) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ đại lý này khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"shop":{"daily":{"remove":"${id}"}}}`);
            ws.send(`{"shop":{"daily":{"get_data":true}}}`);
        }
    });
}

const addDailyPopup = () => {
    $("#dailyElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="addDailyModal">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Thêm đại lý</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                      <div class="row" style="padding: 10px;"></div>
                        <div class="form-group">
                            <input id="dailyName" type="text" class="form-control input-rounded" placeholder="Tên hiển thị...">
                        </div>
                        <div class="form-group">
                            <input id="dailyNickname" type="text" class="form-control input-rounded" placeholder="Tên nhân vật game...">
                        </div>
                        <div class="form-group">
                            <input id="dailyPhone" type="number" class="form-control input-rounded" placeholder="Số điện thoại...">
                        </div>
                        <div class="form-group">
                            <input id="dailyLocation" type="text" class="form-control input-rounded" placeholder="Khu vực hoạt động...">
                        </div>
                        <div class="form-group">
                            <input id="dailyFacebook" type="text" class="form-control input-rounded" placeholder="ID Facebook...">
                        </div>
                        <div class="col-md-12 col-lg-12 text-center">
                            <button onclick="addDaily()" type="button" class="btn mb-1 btn-rounded btn-primary">Thêm</button>
                        </div>
                      </div>
                    </div>
                </div>
                </div>
            `);
    $("#addDailyModal").modal("toggle");
}


const addDaily = () => {
    const dailyName = $("#dailyName").val();
    const dailyNickname = $("#dailyNickname").val();
    const dailyPhone = $("#dailyPhone").val();
    const dailyLocation = $("#dailyLocation").val();
    const dailyFacebook = $("#dailyFacebook").val();

    if (!dailyName ||
        !dailyNickname ||
        !dailyPhone ||
        !dailyLocation ||
        !dailyFacebook) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: `Vui lòng điền đầy đủ thông tin!`,
            timer: 3000
        });
        return;
    }

    ws.send(`{"shop":{"daily":{"add":{"name":"${dailyName}","nickname":"${dailyNickname}","phone":"${dailyPhone}","location":"${dailyLocation}","fb":"${dailyFacebook}"}}}}`);
    ws.send(`{"shop":{"daily":{"get_data":true}}}`);
    $("#addDailyModal").modal("hide");
}