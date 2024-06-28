let userDataStorage;

const initSenceQuanlynguoidung = () => {
    $(".content-body").html(`
<div id="userElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Quản lý người dùng</h5>
              <div class="row">
                <div class="col-12 col-md-10 col-lg-10">
                  <div class="row">

                    <div class="col-sm-12 col-lg-2 col-md2" style="display:none;">
                      <input type="text" id="byUID" class="form-control" placeholder="UID">
                    </div>

                    <div class="col-sm-12 col-lg-2 col-md2">
                      <input type="text" id="byIp" class="form-control" placeholder="Địa chỉ IP">
                    </div>
                    <div class="col-sm-12 col-lg-2 col-md2">
                      <input type="text" id="byNickname" class="form-control" placeholder="Tên nhân vật">
                    </div>
                    <div class="col-sm-12 col-lg-2 col-md2">
                      <input type="text" id="byUsername" class="form-control" placeholder="Tên đăng nhập">
                    </div>
                    <div class="col-sm-12 col-lg-2 col-md2">
                      <input type="text" id="byPhone" class="form-control" placeholder="Số điện thoại">
                    </div>
                    <div class="col-sm-12 col-lg-2 col-md2">
                      <select class="form-control"  id="byType">
                        <option value="0">Tất cả</option>
                        <option value="1">Người dùng</option>
                        <option value="2">BOT</option>
                      </select>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-md2">
                      <select class="form-control"  id="byRecharge">
                        <option value="0">Tất cả</option>
                        <option value="1">Đã Nạp Tiền</option>
                        <option value="2">Chưa Nạp Tiền</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-2 col-lg-2">
                  <button onclick="filterUsers()" type="button" class="btn btn-lg mb-1 btn-flat btn-dark"><i class="fa fa-search"></i> Tìm
                    Kiếm</button>
                </div>
              </div>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">UID</th>
                      <th class="text-center">TÊN ĐĂNG NHẬP</th>
                      <th class="text-center">TÊN NHÂN VẬT</th>
                      <th class="text-center">TIỀN</th>
                      <th class="text-center">TIỀN LÃI</th>
                      <th class="text-center">SỐ ĐIỆN THOẠI</th>
                      <th class="text-center">ĐỊA CHỈ IP</th>
                      <th class="text-center">PLATFORM</th>
                      <th class="text-center">OS DEVICE</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="tableUser">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                <nav>
                  <ul class="pagination justify-content-center" id="phantrangUser"></ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const users = (data) => {
    try {
        // userDataStorage = data.data;
        const totalPage = data.total;
        const current_page = data.page;
        let body = '';
        data.data.forEach((data) => {
            let type, redType;
            if (data.type == false) {
                type = `<b></b>`;
            } else if (data.type) {
                type = `<b style="color:#e94141"> [BOT]</b>`;
            } else {
                type = `<b></b>`;
            }

            let platform = '';
            platform = (data.platform) ? `Trình Duyệt` : `Mobile App`;

            redType = (data.totall.includes("-")) ? "" : "+";
            body += `
                <tr>
                  <td class="text-center"><b>#${ data.UID }</b>${ type }</td>
                  <td class="text-center"><b>${ data.username.toUpperCase() }</b></td>
                  <td class="text-center"><b>${ data.name.toUpperCase() }</b></td>
                  <td class="text-center"><b>${ numberWithCommas(data.red) }</b></td>
                  <td class="text-center"><b>${ redType }${ numberWithCommas(data.totall) }</b></td>
                  <td class="text-center"><b>${ data.phone }</b></td>
                  <td class="text-center"><b>${ data.ip }</b></td>
                  <td class="text-center"><b>${ platform }</b></td>
                  <td class="text-center"><b>${ data.os }</b></td>
                  <td class="text-center">
                    <button onclick="getInfoUser('${ data.id }')" type="button" class="btn mb-1 btn-rounded btn-dark"><span class="btn-icon-left">
                      <b><i class="fa fa-eye color-dark"></i></b> </span><b>Chi tiết</b>
                    </button>
                  </td>
                </tr>
                `;
        });
        $("#tableUser").html(body);

        const phantrang = Pagination(current_page, totalPage);

        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
                <li class="page-item ${ active }">
                    <a class="page-link" href="javascript:void(userGetDataPage(${ page }))"><b>${ page }</b></a>
                </li>
            `;
            $("#phantrangUser").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message);
    }
}

const userInfo = (data) => {
    try {
        userViewDetailPopup(data);
    } catch (e) {
        console.log(e.message);
    }
}

const filterUsers = () => {
    try {
        try {
            const byIp = $("#byIp").val();
            const byUid = $("#byUID").val();
            const byNickname = $("#byNickname").val();
            const byUsername = $("#byUsername").val();
            const byPhone = $("#byPhone").val();
            const byType = $("#byType").val();
            const byRecharge = $("#byRecharge").val();
            ws.send(`{"users":{"get_users":{"uid":"${ byUid }","nick":"${ byUsername }","name":"${ byNickname }","phone":"${ byPhone }","sort":"2","macth":"${ byType }", "byRecharge": "${ byRecharge }", "byIp": "${ byIp }", "page":1}}}`);
        } catch (e) {
            console.log(e.message);
        }
    } catch (e) {
        console.log(e.message);
    }
}

const userGetDataPage = (page) => {
    try {
        const byUid = $("#byUID").val();
        const byNickname = $("#byNickname").val();
        const byEmail = $("#byEmail").val();
        const byUsername = $("#byUsername").val();
        const byPhone = $("#byPhone").val();
        const byType = $("#byType").val();
        ws.send(`{"users":{"get_users":{"uid":"${ byUid }","nick":"${ byUsername }","name":"${ byNickname }","phone":"${ byPhone }","email":"${ byEmail }","sort":"2","macth":"${ byType }","page":${ page }}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const getInfoUser = (id) => {
    ws.send(`{"users":{"get_info":"${ id }"}}`);
}

const userViewDetailPopup = (data) => {
    try {
        userResetModal();
        $('#userViewDetailModal').modal('hide');
        $("#userViewDetailModal").remove();

        userDataStorage = data;

        let lockBtn = '';
        let lockFunc = true;
        if (!data.profile.lock) {
            lockBtn = '<i class="fa fa fa-lock"></i> Khóa';
            lockFunc = true;
        } else {
            lockBtn = '<i class="fa fa fa-unlock-alt"></i> Mở Khóa';
            lockFunc = false;
        }

        $("#userElement").html(`
          <!-- Modal -->
              <div class="modal fade" id="userViewDetailModal">
              <div class="modal-dialog " role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Thông Tin Thành Viên [<b>${ data.profile.username.toUpperCase() }</b>]</h5>
                      <button type="button" class="close" data-dismiss="modal" onClick="userResetModal()"><span>&times;</span>
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
                                  <td><b>UID:</b></td>
                                  <td><b>${ data.profile.UID }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tên đăng nhập:</b></td>
                                  <td><b>${ data.profile.username }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tên nhân vật:</b></td>
                                  <td><b>${ data.profile.name }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Số điện thoại:</b></td>
                                  <td><b>${ data.profile.phone }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Ngày đăng kí:</b></td>
                                  <td><b>${ moment(data.profile.joinedOn).format("DD/MM/YYYY h:mm:ss") }</b></td>
                                </tr>
                                <tr>
                                  <td><b>VIP tích lũy:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.lastVip) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>VIP hiện tại:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.vip) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền đã nạp:</b></td>
                                  <td><b>${ numberWithCommas(data.tiendanap) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền đã rút:</b></td>
                                  <td><b>${ numberWithCommas(data.tiendarut) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền hiện tại:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.red) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Két sắt:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.ketSat) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền đã chơi:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.redPlay) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền thắng:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.redWin) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền thua:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.redLost) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền lãi:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.totall) }</b></td>
                                </tr>
                                <tr>
                                  <td><b>Tiền thắng hũ:</b></td>
                                  <td><b>${ numberWithCommas(data.profile.hu) }</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="col-md-12 col-lg-12 text-center">
                            <div class="rounded-button">
                                <button onclick="userEditProfile('${ data.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-primary"><i class="fa fa-pencil-square-o"></i> Chỉnh sửa</button><br>
                                <button onclick="getLishSuUserChuyenTien('${ data.profile.name }', '${ data.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-dark"><i class="fa fa-history"></i> Chuyển tiền</button>
                                <button onclick="getLishSuChoiTaiXiu('${ data.profile.name }', '${ data.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-dark"><i class="fa fa-history"></i> Tài xỉu</button>
                                <button onclick="getLishSuChoiAll('${ data.profile.name }', '${ data.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-dark"><i class="fa fa-history"></i> Biến động</button>
                            </div>
                          </div>
                          <div class="col-md-12 col-lg-12 text-center">
                            <div class="rounded-button">
                                <button onclick="bandUser(${ lockFunc }, '${ data.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-danger">${ lockBtn }</button><br>
                            </div>
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          `);
        $("#userViewDetailModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const userEditProfile = () => {
    try {
        const optionUserType = (userDataStorage.profile.type) ? `<option value="1">Hiện tại - Bot</option>` : `<option value="2">Hiện Tại - Người</option>`;

        userResetModal();
        $("#userElement").html(`
          <!-- Modal -->
              <div class="modal fade" id="userEditModal">
              <div class="modal-dialog modal-sm" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Chỉnh Sửa Thành Viên [<b>${ userDataStorage.profile.username.toUpperCase() }</b>]</h5>
                      <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                      </button>
                  </div>
                  <div class="modal-body" class="text-center">
                      <div id="napthePopupNotify"></div>
                      <div class="row" style="padding: 10px;">
                      <div class="input-group mb-2">
                            <div class="input-group-prepend">
                              <div class="input-group-text">Số điện thoại</div>
                            </div>
                            <input type="text" id="userEditPhoneValue" class="form-control" placeholder="Nhập số điện thoại" value="${ userDataStorage.profile.phone }">
                          </div>
                          <div class="input-group mb-2">
                            <div class="input-group-prepend">
                              <div class="input-group-text">Số tiền</div>
                            </div>
                            <input type="text" id="userEditRedValue" class="form-control" placeholder="Nhập số tiền" value="${ userDataStorage.profile.red }">
                          </div>
                          <div class="input-group mb-2">
                            <div class="input-group-prepend">
                              <div class="input-group-text">Mật khẩu mới</div>
                            </div>
                            <input type="text" id="userEditPasswordValue" class="form-control" placeholder="Nhập mật khẩu mới" value="">
                          </div>
                          <div class="col-md-12 col-lg-12">
                              <div class="form-group">
                                <select id="userEditTypeValue" class="form-control">
                                   ${ optionUserType }
                                    <option value="1">Bot</option>
                                    <option value="2">Người</option>
                                </select>
                              </div>
                          </div>

                          <div class="col-md-12 col-lg-12 text-center">
                            <div class="rounded-button">
                                <button onclick="userEditProfilePost('${ userDataStorage.profile.id }')" type="button" data-dismiss="modal" class="btn mb-1 btn-rounded btn-primary"></i> Xác nhận</button>
                            </div>
                          </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>
          `);
        $("#userEditModal").modal("toggle");
    } catch (e) {

    }
}

const userResetModal = () => {
    $(".modal-backdrop").hide();
    $('#userViewDetailModal').modal('hide');
    $("#userViewDetailModal").remove();
}

const updateUserEditCheckType = (type) => {
    try {
        if (type == "bot") {
            $("#userEditBotValue").attr("checked", "checked");
            $("#userEditHumanValue").removeAttr("checked");
        }
        if (type == "human") {
            $("#userEditHumanValue").attr("checked", "checked");
            $("#userEditBotValue").removeAttr("checked");
        }
    } catch (e) {}
}

const userEditProfilePost = (id) => {
    const userEditPhoneValue = $("#userEditPhoneValue").val();
    const userEditRedValue = $("#userEditRedValue").val();
    const userEditPasswordValue = $("#userEditPasswordValue").val();
    const userEditTypeValue = $("#userEditTypeValue").val();
    ws.send(`{"users":{"update":{"id":"${ id }","data":{"phone":"${ userEditPhoneValue }","red":"${ userEditRedValue }","xu":"1","pass":"${ userEditPasswordValue }","type":"${ userEditTypeValue }"}}}}`);
    ws.send(`{"users":{"get_users":{"uid":"","nick":"","name":"","phone":"","email":"","sort":"3","macth":"0","page":1}}}`);
}

const closeViewDetailUserModal = () => {
    try {
        userResetModal();
        $('#userViewDetailModal').modal('toggle');
        $('#userEditModal').modal('toggle');
    } catch (e) {}
}


const bandUser = (type, userID) => {
    // type = true => khóa 
    if (!!type) {
        ws.send(`{"users": {"band": {"lock": { "id": "${ userID }"}}}}`);
    } else {
        ws.send(`{"users": {"band": {"unlock": { "id": "${ userID }"}}}}`);
    }
    closeViewDetailUserModal();
}

const getLishSuChoiTaiXiu = (name, userID) => {
    closeViewDetailUserModal();
    setTimeout(() => {
        handleGetLishSuChoiTaiXiu(name, userID);
    }, 700);
}

const handleGetLishSuChoiTaiXiu = (name, userId) => {
    ws.send(`{"users": {"history": {"taixiu": { "id": "${ userId }", "page": 1}}}}`);
    initSenceLichSuChoiTaiXiu(name, userId);
}


const getLishSuUserChuyenTien = (name, userID) => {
    closeViewDetailUserModal();
    setTimeout(() => {
        handleGetLishSuUserChuyenTien(name, userID);
    }, 700);
}

const handleGetLishSuUserChuyenTien = (name, userId) => {
    ws.send(`{"users": {"history": {"chuyen": { "id": "${ userId }", "page": 1}}}}`);
    initSenceLichSuUserChuyenTien(name, userId);
}


const getLishSuChoiAll = (name, userID) => {
    closeViewDetailUserModal();
    setTimeout(() => {
        handleGetBienDongSoDu(name, userID);
    }, 700);
}

const handleGetBienDongSoDu = (name, userId) => {
    ws.send(`{"users": {"history": {"biendong": { "id": "${ userId }", "page": 1}}}}`);
    initSenceBienDongSoDu(name, userId);
}