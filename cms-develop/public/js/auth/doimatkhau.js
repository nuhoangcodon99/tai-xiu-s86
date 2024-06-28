const initSenceDoimatkhau = () => {
    $(".content-body").html(`
<div id="doimatkhauElement"></div>
    `);
    changePasswordPopup();
}


const changePasswordPopup = () => {
    try {
        $("#doimatkhauElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="doimatkhauModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Đổi Mật Khẩu</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div id="doimatkhauPopupNotify"></div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Mật khẩu cũ:</label>
                            <input type="password" class="form-control" id="password" placeholder="nhập mật khẩu cũ">
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Mật khẩu mới:</label>
                            <input type="password" class="form-control" id="newPassword" placeholder="nhập mật khẩu mới">
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Nhập lại mật khẩu mới:</label>
                            <input type="password" class="form-control" id="newPassword2" placeholder="nhập lại mật khẩu mới">
                          </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-primary" onclick="onPostDoimatkhau()">Cập nhật</button>
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                      </div>
                    </div>
                    </div>
                </div>
              </div>
            `);
        $("#doimatkhauModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const onPostDoimatkhau = () => {
    try {
        const password = $("#password").val();
        const newPassword = $("#newPassword").val();
        const newPassword2 = $("#newPassword2").val();

        if (!password && !newPassword && !newPassword2) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Vui lòng nhập đầy đủ thông tin!",
                timer: 5000
            })
            return;
        }

        if (!password && password.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Mật khẩu cũ quá ngắn!",
                timer: 5000
            })
            return;
        }

        if (!newPassword && newPassword.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Mật khẩu mới quá ngắn!",
                timer: 5000
            })
            return;
        }

        if (newPassword !== newPassword2) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "2 mật khẩu vừa nhập không khớp!",
                timer: 5000
            })
            return;
        }

        ws.send(`{"admin":{"doi_pass":{"password":"${password}","newPassword":"${newPassword}","newPassword2":"${newPassword2}"}}}`);

    } catch (e) {
        console.log(e.message);
    }
}