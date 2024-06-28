const initSenceLichSuChoiTaiXiu = (name, userId) => {
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
              <h5 class="text-muted" style="color: #101010 !important;">Lịch Sử Chơi Tài Xỉu [<b id="userPlayHistoryTaiXiu">${name}</b>]<b onclick="refreshPlayTaixiu('${name}', '${userId}')"><i id="refreshPlayTaixiu" style="margin-left: 10px;" class="fa fa-refresh"></i></b></h5>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">PHIÊN</th>
                      <th class="text-center">CỬA ĐẶT</th>
                      <th class="text-center">KẾT QUẢ</th>
                      <th class="text-center">TIỀN CƯỢC</th>
                      <th class="text-center">TIỀN THẮNG</th>
                      <th class="text-center">TRẢ LẠI</th>
                      <th class="text-center">THỜI GIAN</th>
                    </tr>
                  </thead>
                  <tbody id="tableUserPlayHistoryTaixiu">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                <nav>
                  <ul class="pagination justify-content-center" id="phantrangUserPlayHistoryTaixiu"></ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}


const viewLichSuTaiXiuUser = (obj) => {
    try {
        let data = obj.data;
        // userDataStorage = data.data;
        const totalPage = obj.total;
        const current_page = obj.page;
        let body = '';
        data.forEach((data) => {
            let type, redType;
            if (data.betwin > 0) {
                type = `<b style="color:#e94141">${numberWithCommas(data.betwin)}</b>`;
            } else {
                type = `<b>${numberWithCommas(data.betwin)}</b>`;
            }

            //redType = (data.totall.includes("-")) ? "" : "+";
            let betChoice = (data.select) ? "TÀI" : "XỈU";
            let ketQua = (data.dice1 + data.dice2 + data.dice3 > 10) ? "TÀI" : "XỈU";
            body += `
            <tr>
              <td class="text-center"><b>#${data.phien}</b></td>
              <td class="text-center"><b>${betChoice}</b></td>
              <td class="text-center"><b>${ketQua}</b></td>
              <td class="text-center"><b>${numberWithCommas(data.bet)}</b></td>
              <td class="text-center"><b>${type}</b></td>
              <td class="text-center"><b>${numberWithCommas(data.tralai)}</b></td>
              <td class="text-center"><b>${moment(data.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
            </tr>
            `;
        });
        $("#tableUserPlayHistoryTaixiu").html(body);

        const phantrang = Pagination(current_page, totalPage);
        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
            <li class="page-item ${active}">
                <a class="page-link" href="javascript:void(UserPlayHistoryTaixiuGetDataPage('${$('#userId').val()}' ,${page}))"><b>${page}</b></a>
            </li>
        `;
            $("#phantrangUserPlayHistoryTaixiu").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message);
    }
}

const UserPlayHistoryTaixiuGetDataPage = (userId, page) => {
    ws.send(`{"users": {"history": {"taixiu": { "id": "${userId}", "page": ${page}}}}}`);
}

const refreshPlayTaixiu = (name, userId) => {
    $('#refreshPlayTaixiu').addClass('fa-spin');
    setTimeout(() => {
        $('#refreshPlayTaixiu').removeClass('fa-spin');
    }, 500);
    ws.send(`{"users": {"history": {"taixiu": { "id": "${userId}", "page": "1"}}}}`);
}