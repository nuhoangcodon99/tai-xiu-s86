// SENCE SLOT
const initSenceSlot = (gameName) => {
    let game = (gameName == "daohaitac") ? "tamhung" : gameName;


    $(".content-body").html(`
    <div class="container-fluid">
    <div class="row">
      <section id="slotUiMode">
        <div>
          <input type="radio" id="mode_0" name="select" onClick="setGameMode('${game}', '0')">
          <label id="mode" for="mode_0">
            <h2>KHÓ</h2>
          </label>
        </div>
        <div>
          <input type="radio" id="mode_1" name="select" onClick="setGameMode('${game}', '1')">
          <label id="mode" for="mode_1">
            <h2>VỪA</h2>
          </label>
        </div>
        <div>
          <input type="radio" id="mode_2" name="select" onClick="setGameMode('${game}', '2')">
          <label id="mode" for="mode_2">
            <h2>&#160;DỄ&#160;&#160;</h2>
          </label>
        </div>
      </section>
  
      <div class="col-12 m-b-30">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <div class="card-header bg-white">
                <h1 class="card-title">HŨ 100</h1>
              </div>
              <div class="card-body">
                <div class="basic-form">
                  <div class="form-group">
                    <h4>Gọi Tên: <a href="#" id="name100"></a></h4>
                    <input type="text" class="form-control input-rounded" id="namehu100" placeholder="Tên nhân vật"><br>
                    <center>
                      <button type="button" onClick="kichNoHu('${game}', '100')" class="btn mb-1 btn-rounded btn-primary btn-lg">Kích Nổ</button>
                      <center>
                  </div>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã chơi: </b><span
                        class="badge badge-primary badge-pill" id="redPlay100">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thắng: </b> <span
                        class="badge badge-primary badge-pill" id="redWin100">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thua: </b> <span
                        class="badge badge-primary badge-pill" id="redLost100">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã nổ: </b> <span
                        class="badge badge-primary badge-pill" id="hu100">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <div class="card-header bg-white">
                <h1 class="card-title">HŨ 1.000</h1>
              </div>
              <div class="card-body">
                <div class="basic-form">
                  <div class="form-group">
                    <h4>Gọi Tên: <a href="#" id="name1000"></a></h4>
                    <input type="text" class="form-control input-rounded" id="namehu1000" placeholder="Tên nhân vật"><br>
                    <center>
                      <button type="button" onClick="kichNoHu('${game}', '1000')" class="btn mb-1 btn-rounded btn-primary btn-lg">Kích Nổ</button>
                      <center>
                  </div>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã chơi: </b><span
                        class="badge badge-primary badge-pill" id="redPlay1000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thắng: </b> <span
                        class="badge badge-primary badge-pill" id="redWin1000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thua: </b> <span
                        class="badge badge-primary badge-pill" id="redLost1000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã nổ: </b> <span
                        class="badge badge-primary badge-pill" id="hu1000">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <div class="card-header bg-white">
                <h1 class="card-title">HŨ 10.000</h1>
              </div>
              <div class="card-body">
                <div class="basic-form">
                  <div class="form-group">
                    <h4>Gọi Tên: <a href="#" id="name10000"></a></h4>
                    <input type="text" class="form-control input-rounded"  id="namehu10000" placeholder="Tên nhân vật"><br>
                    <center>
                      <button type="button" onClick="kichNoHu('${game}', '10000')" class="btn mb-1 btn-rounded btn-primary btn-lg">Kích Nổ</button>
                      <center>
                  </div>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã chơi: </b><span
                        class="badge badge-primary badge-pill" id="redPlay10000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thắng: </b> <span
                        class="badge badge-primary badge-pill" id="redWin10000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Thua: </b> <span
                        class="badge badge-primary badge-pill" id="redLost10000">0</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center"><b>Đã nổ: </b> <span
                        class="badge badge-primary badge-pill" id="hu10000">0</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  
          <div class="col-md-12 col-lg-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">TOP CHƠI</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th>TÊN NHÂN VẬT</th>
                        <th>ĐÃ CHƠI</th>
                        <th>THẮNG</th>
                        <th>THUA</th>
                        <th>LÃI</th>
                        <th>GẦN ĐÂY</th>
                      </tr>
                    </thead>
                    <tbody id="tableTop">
                      <tr>
                        <td><a href="javascript:void(0)">Order #26589</a>
                        </td>
                        <td>Herman Beck</td>
                        <td><span class="text-muted">Oct 16, 2017</span>
                        </td>
                        <td>$45.00</td>
                        <td><span class="label gradient-1 rounded">Paid</span>
                        </td>
                        <td>EN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
                <div class="bootstrap-pagination">
                    <nav>
                        <ul class="pagination justify-content-center" id="phantrang">
                        </ul>
                    </nav>
                </div>
            </div>
          </div>
  
        </div>
      </div>
    `);
}

// GAME HANDLE DATA
const caoboi = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("caoboi", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("caoboi", data.get_top);
    }
}
const sieuxe = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("sieuxe", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("sieuxe", data.get_top);
    }
}
const royal = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("royal", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("royal", data.get_top);
    }
}
const dmanhhung = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("dmanhhung", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("dmanhhung", data.get_top);
    }
}
const sexandzen = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("sexandzen", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("sexandzen", data.get_top);
    }
}
const daohaitac = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("daohaitac", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("daohaitac", data.get_top);
    }
}

const mienvientay = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("vq_red", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("vq_red", data.get_top);
    }
}

const lienminhhuyenthoai = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("zeus", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("zeus", data.get_top);
    }
}
const avengers = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("longlan", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("longlan", data.get_top);
    }
}
const panda = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("candy", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("candy", data.get_top);
    }
}

const tamhung = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("tamhung", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("tamhung", data.get_top);
    }
}

const pubg = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("angrybird", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("angrybird", data.get_top);
    }
}
const minicandy = (data) => {
    // set mode
    if (void 0 !== data.chedo) {
        initUiMode(data.chedo);
    }
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("big_babol", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("big_babol", data.get_top);
    }
}
const mini3cay = (data) => {
    // remove UI mode
    $("#slotUiMode").hide();
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("mini3cay", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("mini3cay", data.get_top);
    }
}
const minipoker = (data) => {
    // remove UI mode
    $("#slotUiMode").hide();
    // set Data Hũ
    if (void 0 !== data.hu) {
        setGameDataHu("mini_poker", data.hu);
    }
    // set Data Top
    if (void 0 !== data.get_top) {
        setGameDataTop("mini_poker", data.get_top);
    }
}
const setGameDataHu = (game, data) => {
    try {
        data.forEach((data) => {
            if (data.type === 100) {
                $("#name100").html(data.name);
                $("#redPlay100").html(numberWithCommas(data.redPlay));
                $("#redWin100").html(numberWithCommas(data.redWin));
                $("#redLost100").html(numberWithCommas(data.redLost));
                $("#hu100").html(numberWithCommas(data.hu));
            }
        });
        data.forEach((data) => {
            if (data.type === 1000) {
                $("#name1000").html(data.name);
                $("#redPlay1000").html(numberWithCommas(data.redPlay));
                $("#redWin1000").html(numberWithCommas(data.redWin));
                $("#redLost1000").html(numberWithCommas(data.redLost));
                $("#hu1000").html(numberWithCommas(data.hu));
            }
        });
        data.forEach((data) => {
            if (data.type === 10000) {
                $("#name10000").html(data.name);
                $("#redPlay10000").html(numberWithCommas(data.redPlay));
                $("#redWin10000").html(numberWithCommas(data.redWin));
                $("#redLost10000").html(numberWithCommas(data.redLost));
                $("#hu10000").html(numberWithCommas(data.hu));
            }
        });
    } catch (e) {
        console.log(e.message)
    }
}

const setGameDataTop = (game, data) => {
    try {
        let gameName = (game == "daohaitac") ? "tamhung" : game;

        const totalPage = data.total;
        const current_page = data.page;

        let body = '';
        data.data.forEach((data) => {
            body += `
            <tr>
            <td><b>${(typeof data.name !== 'undefined') ? data.name: ""}</b></td>
            <td><b>${numberWithCommas(data.bet)}</b></td>
            <td><b>${numberWithCommas(data.win)}</b></td>
            <td><b>${numberWithCommas(data.lost)}</b></td>
            <td><b>${numberWithCommas(data.profit)}</b></td>
            <td><b>${moment(data.t).format("DD/MM/YYYY h:mm:ss")}</b></td>
            </tr>
            `;
        });
        $("#tableTop").html(body);

        const phantrang = Pagination(current_page, totalPage);

        let phantrangBody = '';
        phantrang.forEach((page) => {
            let active = (current_page == page) ? "active" : "";
            phantrangBody += `
                    <li class="page-item ${active}">
                        <a class="page-link" href="javascript:void(slotGetDataPage('${gameName}', ${page}))"><b>${page}</b></a>
                    </li>
                `;
            $("#phantrang").html(phantrangBody);
        });

    } catch (e) {
        console.log(e.message)
    }
}

const slotGetDataPage = (game, page) => {
    let gameName = (game == "daohaitac") ? "tamhung" : game;
    ws.send(`{ "${gameName}": { "get_top": { "sort": "7", "page": "${page}" } } }`);
}

const setGameMode = (game, mode) => {
    let gameName = (game == "daohaitac") ? "tamhung" : game;
    ws.send(`{"${gameName}": { "chedo": "${mode}"}}`);
}

const kichNoHu = (game, hu) => {
    try {
        let gameName = (game == "daohaitac") ? "tamhung" : game;
        const name = $("#namehu" + hu).val();
        ws.send(`{"${gameName}":{"name_hu":{"name":"${name}","bet":"${hu}"}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const initUiMode = (mode) => {
    $(`#mode_${mode}`).prop('checked', true);
}