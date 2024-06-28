
const initSenceLichSuUserChuyenTien = (name, userId) => {
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
              <h5 class="text-muted" style="color: #101010 !important;">Lịch Sử Chuyển Tiền [<b id="userChuyenTien">${name}</b>]</h5>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NGƯỜI CHUYỂN</th>
                      <th class="text-center">CHUYỂN TỚI</th>
                      <th class="text-center">SỐ TIỀN</th>
                      <th class="text-center">THỰC NHẬN</th>
                      <th class="text-center">NỘI DUNG</th>
                      <th class="text-center">THỜI GIAN</th>
                    </tr>
                  </thead>
                  <tbody id="tableUserChuyenTien">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                <nav>
                  <ul class="pagination justify-content-center" id="phantrangUserChuyentien"></ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}


const viewLichSuUserChuyenTien = (obj) => {
  try {
    let data = obj.data;
    // userDataStorage = data.data;
    const totalPage = obj.total;
    const current_page = obj.page;
    let body = '';
    data.forEach((data) => {
        let type, redType;
        if (data.red > 0) {
            type = `<b style="color:#e94141">${numberWithCommas(data.red)}</b>`;
        } else {
            type = `<b>${numberWithCommas(data.red)}</b>`;
        }

        //redType = (data.totall.includes("-")) ? "" : "+";
        body += `
            <tr>
              <td class="text-center"><b>${data.from}</b></td>
              <td class="text-center"><b style="color:#e94141">${data.to}</b></td>
              <td class="text-center"><b>${type}</b></td>
              <td class="text-center"><b>${numberWithCommas(data.red_c)}</b></td>
              <td class="text-center"><b>${data.message}</b></td>
              <td class="text-center"><b>${moment(data.time).format("DD/MM/YYYY h:mm:ss")}</b></td>
            </tr>
            `;
    });
    $("#tableUserChuyenTien").html(body);

    const phantrang = Pagination(current_page, totalPage);
    let phantrangBody = '';
    phantrang.forEach((page) => {
        let active = (current_page == page) ? "active" : "";
        phantrangBody += `
            <li class="page-item ${active}">
                <a class="page-link" href="javascript:void(UserChuyenTienGetDataPage('${$('#userId').val()}' ,${page}))"><b>${page}</b></a>
            </li>
        `;
        $("#phantrangUserChuyentien").html(phantrangBody);
    });

  } catch (e) {
      console.log(e.message);
  }
}

const UserChuyenTienGetDataPage = (userId, page) => {
  ws.send(`{"users": {"history": {"taixiu": { "id": "${userId}", "page": ${page}}}}}`);
}