let initSenceQuanlycms = () => {
    $(".content-body").html(`
<div id="CmsElement"></div>
<div class="container-fluid">
  <div class="row">
    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-5 col-lg-5">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Tạo Người Dùng CMS</h5>
              <hr>
              <div class="basic-form">
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                      <input type="text" id="cms_username" class="form-control" placeholder="Username Cms Login...">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                      <input type="password" id="cms_password" class="form-control" placeholder="Password Cms Login ...">
                    </div>
                  </div>
              </div>
                <div class="bootstrap-pagination">
                    <nav class="text-center">
                        <button onclick="addCmsUserPopup()" type="button" class="btn mb-1 btn-rounded btn-dark">Thêm</button>
                    </nav>
                </div>
            </div>
          </div>
        </div>

        <div class="col-md-7 col-lg-7">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Danh Sách Quản Lý CMS</h5>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NGƯỜI DÙNG</th>
                      <th class="text-center">NGÀY TẠO</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableCmsManager">
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>


      </div>

    </div>
    `);
}

let listCmsUser = (data) => {
    let body = '';
    data.forEach((data) => {
        body += `
                <tr>
                <td class="text-center"><b>${data.username.toUpperCase()}</b></td>
                <td class="text-center"><b>${moment(data.regDate).format("DD/MM/YYYY h:mm:ss")}</b></td>
                <td class="text-center">
                    <button onclick="editCmsUser('${data.username}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark">
                      <b><i class="icon-note"></i></b> <b>Edit</b>
                    </button>
                    <button style="margin-left:1px;" onclick="confirmDelCmsUser('${data.username}')" type="button" class="btn btn-sm mb-1 btn-rounded btn-dark">
                     <b><i class="fa fa-trash"></i></b> <b>Xóa</b>
                    </button>
                </td>
                </tr>
                `;
    });
    $("#tableCmsManager").html(body);
}

let addCmsUserPopup = () => {
    try {
        const username = $("#cms_username").val();
        const password = $("#cms_password").val();
        if (!username || !password) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Vui lòng nhập đầy đủ!",
                timer: 3000
            })
            return;
        }
        ws.send(`{"cms":{"addaccount":{"username":"${username}","password":"${password}"}}}`);
        setTimeout(() => {
            initSenceQuanlycms();
            ws.send(`{"cms":{"getdata": true }}`);
        }, 1000);
    } catch (e) {
        console.log(e);
    }
}

let editCmsUser = (username) => {
    $("#CmsElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="editCmsUserModal">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Chỉnh sửa quyền người dùng cms</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div class="row" style="padding: 10px;"></div>

                          <div class="row">
                            <div class="col-md-4 col-lg-4 col-sm-4">
                              <div class="basic-list-group">
                                <ul class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xem CMS</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="main_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'main_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xem Nạp thẻ</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="yeucaunapthe_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'yeucaunapthe_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xem Rút thẻ</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="yeucaurutthe_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'yeucaurutthe_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xem Nạp Ngân Hàng</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="nganhangnap_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'nganhangnap_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xem Rút Ngân Hàng</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="nganhangrut_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'nganhangrut_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý Ngân Hàng</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="quanlynganhang_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'quanlynganhang_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý Thẻ Cào</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="quanlythecao_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'quanlythecao_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý Người Dùng</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="quanlynguoidung_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'quanlynguoidung_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý Đại Lý</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="quanlydaily_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'quanlydaily_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý CMS</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="quanlycms_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'quanlycms_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý  GiftCode</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="giftcode_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'giftcode_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Quản Lý  GiftCode 1 Lần</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="giftcodeone_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'giftcodeone_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Đổi Mật Khẩu</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="doimatkhau_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'doimatkhau_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Gửi Thông Báo</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="guithongbao_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'guithongbao_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Cài Đặt Hệ Thống</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="system_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'system_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div class="col-md-4 col-lg-4 col-sm-4">
                              <div class="basic-list-group">
                                <ul class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Tài Xỉu</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="taixiu_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'taixiu_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Xóc Đĩa</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="xocdia_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'xocdia_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Rồng Hổ</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="rongho_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'rongho_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bầu Cua</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="baucua_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'baucua_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Lô Đề</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="lode_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'lode_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bóng Đá</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="kbet_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'kbet_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Poker</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="pocker_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'pocker_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Candy</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="big_babol_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'big_babol_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Ba Cây</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="mini3cay_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'mini3cay_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Cao Thấp</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="caothap_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'caothap_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Mini Poker</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="mini_poker_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'mini_poker_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div class="col-md-4 col-lg-4 col-sm-4">
                              <div class="basic-list-group">
                                <ul class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Mini Pubg</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="angrybird_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'angrybird_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Casino Royal</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="royal_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'royal_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Siêu Xe</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="sieuxe_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'sieuxe_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Avengers</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="longlan_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'longlan_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Panda</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="candy_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'candy_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Liên Minh</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="zeus_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'zeus_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Bắn Cá</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="banca_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'banca_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Miền Viễn Tây</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="vq_red_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'vq_red_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Dòng Máu Anh Hùng</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="dmanhhung_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'dmanhhung_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Frozen</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="sexandzen_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'sexandzen_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Đảo Hải Tặc</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="daohaitac_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'daohaitac_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <div class="font-20x">Cao Bồi</div>
                                    <label class="switch" style="margin-top: 7px;">
                                      <input id="caoboi_Set" type="checkbox" onchange="editCmsUserUpdate('${username}', 'caoboi_Set')">
                                      <span class="slider round"></span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                    </div>
                    </div>
                </div>
                </div>
            `);
    $("#editCmsUserModal").modal("toggle");
    ws.send(`{"cms":{"getuserpermission":{"username":"${username}"}}}`);
}

let setShowPermissionUser = (data) => {
    try {
        const permission = data.permission;
        for (let [key, value] of Object.entries(permission)) {
            if (value) $("#" + key + "_Set").prop("checked", true);
        }
    } catch (e) {
        console.log(e.message);
    }
}

let editCmsUserUpdate = (username, permission) => {
    try {
        const parseAction = permission.split("_Set")[0];
        const status = $("#" + permission).prop("checked");
        ws.send(`{"cms":{"editpermission":{"username":"${username}","permission":"${parseAction}", "status": ${status}}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

let confirmDelCmsUser = (username) => {
    cuteAlert({
        type: "question",
        title: "Hành động",
        message: "Hành động sẽ xóa bỏ người dùng này khỏi danh sách?",
        confirmText: "Đồng ý",
        cancelText: "Hủy"
    }).then((e) => {
        if (e == 'confirm') {
            ws.send(`{"cms":{"deleteaccount":{"username":"${username}"}}}`);
            setTimeout(() => {
                initSenceQuanlycms();
                ws.send(`{"cms":{"getdata": true }}`);
            }, 1000);
        }
    });
}