const initSenceBienDongSoDu = (name, userId) => {
    $(".content-body").html(`
<div id="userElement"></div>
<input type="hidden" id="userId" value="${userId}">
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Lịch Sử Biến Động Số Dư [<b id="userBienDongSoDu">${name}</b>]   <b onclick="refreshBienDongSoDu('${name}', '${userId}')"><i id="refreshBienDongSoDu" style="margin-left: 10px;" class="fa fa-refresh"></i></b> </h5>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>   
                    <tr>
                      <th class="text-center">HÀNH ĐỘNG</th>
                      <th class="text-center">KIỂU BIẾN ĐỘNG</th>
                      <th class="text-center">SỐ TIỀN</th>
                      <th class="text-center">SỐ DƯ</th>
                      <th class="text-center">MÔ TẢ</th>
                      <th class="text-center">THỜI GIAN</th>
                    </tr>
                  </thead>
                  <tbody id="tableUserBienDongSoDu">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                <nav>
                  <ul class="pagination justify-content-center" id="phantrangUserBienDongSoDu"></ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}



const viewBienDongSoDuUser = (obj) => {
    try {
        const enumsBienDong = {
            'plus': 'Cộng Tiền',
            'minus': 'Trừ Tiền',
            'nap-the': 'Nạp Thẻ Cào',
            'nap-momo': 'Nạp Momo',
            'nap-bank': 'Nạp Ngân Hàng',
            'nap-viettelpay': 'Nạp ViettelPay',
            'mua-the': 'Mua Thẻ Cào',
            'rut-bank': 'Rút Ngân Hàng',
            'nhan-tien-chuyen': 'Nhận Tiền Chuyển',
            'chuyen-tien': 'Chuyển Tiền',
            'giftcode': 'Dùng GiftCode',
            'nhan-tien-vip': 'Nhận Tiền Đạt Vip',
            'nhan-tien-nhiem-vu': 'Nhận Thưởng Nhiệm Vụ',
            'nhan-tien-event': 'Nhận Tiền Sự Kiện',
            'taixiu': 'Tài Xỉu',
            'xoso': 'Xổ Số',
            'xocdia': 'Xóc Đĩa',
            'rongho': 'Rồng Hổ',
            'baucua': 'Bầu Cua',
            'bacay': 'Ba Cây',
            'poker': 'Poker',
            'caothap': 'Cao Thấp',
            'pubg': 'Pubg',
            'candy': 'Candy',
            'minipoker': 'Mini Poker',
            'quay-slot': 'Quay Slot',
            'banca': 'Bắn Cá',
            'nohu': 'Nổ Hũ'
        }

        let data = obj.data;
        // userDataStorage = data.data;
        const totalPage = obj.total;
        const current_page = obj.page;
        let body = '';
        data.forEach((data) => {

            let type;
            if (data.transType == "plus") {
                type = `<b style="color:#e94141">${enumsBienDong["plus"]}</b>`;
            } else if (data.transType == "minus") {
                type = `<b style="color:#419ae9">${enumsBienDong["minus"]}</b>`;
            }

            let action;
            if (data.action == "nap-the" ||
                data.action == "nap-momo" ||
                data.action == "nap-bank" ||
                data.action == "nap-viettelpay" ||
                data.action == "mua-the" ||
                data.action == "nhan-tien-chuyen" ||
                data.action == "chuyen-tien" ||
                data.action == "giftcode") {
                action = `<b style="color:#e94141">${enumsBienDong[data.action]}</b>`;
            } else {
                action = `<b>${enumsBienDong[data.action]}</b>`;
            }

            body += `
              <tr>
                <td class="text-center">${action}</td>
                <td class="text-center"><b>${type}</b></td>
                <td class="text-center"><b style="color:#9241e9">${numberWithCommas(data.red)}</b></td>
                <td class="text-center"><b style="color:#d967fd">${numberWithCommas(data.balance)}</b></td>
                <td class="text-center"><b>${data.description}</b></td>
                <td class="text-center"><b>${data.date}</b></td>
              </tr>
              `;
        });
        $("#tableUserBienDongSoDu").html(body);

        const phantrang = Pagination(current_page, totalPage);
        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
              <li class="page-item ${active}">
                  <a class="page-link" href="javascript:void(UserBienDongSoDuGetDataPage('${$('#userId').val()}' ,${page}))"><b>${page}</b></a>
              </li>
          `;
            $("#phantrangUserBienDongSoDu").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message);
    }
}



const UserBienDongSoDuGetDataPage = (userId, page) => {
    ws.send(`{"users": {"history": {"biendong": { "id": "${userId}", "page": ${page}}}}}`);
}


const refreshBienDongSoDu = (name, userId) => {
    $('#refreshBienDongSoDu').addClass('fa-spin');
    setTimeout(() => {
        $('#refreshBienDongSoDu').removeClass('fa-spin');
    }, 500);
    ws.send(`{"users": {"history": {"biendong": { "id": "${userId}", "page": "1"}}}}`);
}