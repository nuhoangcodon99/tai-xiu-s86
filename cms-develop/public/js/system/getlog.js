const initSenceLogCms = (userId) => {
    $(".content-body").html(`
<div id="tableLichSuCmsElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div style="margin-bottom: 66px;"></div>

        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <h5 class="text-muted" style="color: #101010 !important;">Lịch Sử Hoạt Động CMS</h5>
              <hr>
              <div class="table-responsive">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">NGƯỜI DÙNG</th>
                      <th class="text-center">HÀNH ĐỘNG</th>
                      <th class="text-center">MÔ TẢ</th>
                      <th class="text-center">THỜI GIAN</th>
                    </tr>
                  </thead>
                  <tbody id="tableLichSuCms">
                  </tbody>
                </table>
              </div>

              <div class="bootstrap-pagination">
                <nav>
                  <ul class="pagination justify-content-center" id="phantrangtableLichSuCms"></ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    `);
}

const setGetLogCms = (obj) => {
    try {
        let data = obj.getlog;
        const totalPage = obj.total;
        const current_page = obj.page;
        let body = '';
        data.forEach((data) => {
            body += `
              <tr>
                <td class="text-center"><b>${ data.name }</b></td>
                <td class="text-center"><b>${ data.action }</b></td>
                <td class="text-center"><b>${ data.description }</b></td>
                <td class="text-center"><b>${ data.date }</b></td>
              </tr>
              `;
        });
        $("#tableLichSuCms").html(body);
        const phantrang = Pagination(current_page, totalPage, 20);
        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
              <li class="page-item ${ active }">
                  <a class="page-link" href="javascript:void(LogCmsGetDataPage(${ page }))"><b>${ page }</b></a>
              </li>
          `;
            $("#phantrangtableLichSuCms").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message);
    }
}

const LogCmsGetDataPage = (page) => {
    ws.send(`{"cms":{"getlog":{"page": ${ page }}}}`);
}