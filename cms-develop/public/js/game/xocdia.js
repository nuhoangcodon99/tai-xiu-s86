// SENCE XÓC ĐĨA
const initSenceXocdia = () => {
    $(".content-body").html(`
    <div id="xocdiaElement"></div>
    <div class="container-fluid">
    <div class="row">

      <div class="col-12 m-b-30">
        <div class="row">
        
        <div style="margin-bottom: 66px;"></div>

          <!-- End Col -->
          <div class="col-md-4 col-lg-3">
            <div class="card">
              <div class="card-body text-center">
                    <ul>
                        <li class="d-inline-block"><img onclick="xocdiaSetDicePopup(0)" class="rounded" width="60" height="60" id="xocdiadice0" src="/images/game/xocxoc/default.png" alt=""></li>
                        <li class="d-inline-block"><img onclick="xocdiaSetDicePopup(1)" class="rounded" width="60" height="60" id="xocdiadice1" src="/images/game/xocxoc/default.png"></li>
                        <li class="d-inline-block"><img onclick="xocdiaSetDicePopup(2)" class="rounded" width="60" height="60" id="xocdiadice2" src="/images/game/xocxoc/default.png" alt=""></li>
                        <li class="d-inline-block"><img onclick="xocdiaSetDicePopup(3)" class="rounded" width="60" height="60" id="xocdiadice3" src="/images/game/xocxoc/default.png" alt=""></li>
                    </ul>
                    <div class="taixiuRemainTime">
                        <p id="xocdiaTime" style="color: white;">00:00</p>
                    </div>
                    <button type="button" class="btn mb-1 btn-dark" onclick="xocxocPostSetDice('white3')">3 Trắng</button>
                    <button type="button" class="btn mb-1 btn-flat btn-dark" onclick="xocxocPostSetDice('double')">Sấp Đôi</button>
                    <button type="button" class="btn mb-1 btn-dark" onclick="xocxocPostSetDice('red3')">3 Đỏ</button>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <div class="col-md-8 col-lg-9">
            <div class="row">

              <div class="col-lg-4 col-sm-12">
                <div class="card">
                  <div class="social-graph-wrapper widget-facebook">
                    <span class="s-icon">CHẴN/LẺ</span>
                  </div>
                  <div class="row">
                    <div class="col-6 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetChan">0k</h4>
                        <p class="m-0">CHẴN</p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetLe">0k</h4>
                        <p class="m-0">LẺ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-8 col-sm-12">
                <div class="card">
                  <div class="social-graph-wrapper widget-facebook">
                    <span class="s-icon">CÁC CON VỊ</span>
                  </div>
                  <div class="row">
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBet3do">0k</h4>
                        <p class="m-0">3 ĐỎ</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBet4do">0k</h4>
                        <p class="m-0">4 ĐỎ</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBet4trang">0k</h4>
                        <p class="m-0">4 TRẮNG</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBet3trang">0k</h4>
                        <p class="m-0">3 TRẮNG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- End Col -->
                    


          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">3 ĐỎ</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBet3do">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">4 ĐỎ</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBet4do">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">CHẴN</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetChan">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">LẺ</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetLe">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">4 TRẮNG</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBet4trang">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title"  style="font-size: 22px;text-align: center;">3 TRẮNG</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBet3trang">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>


            </div>
          </div>

        </div>
      </div>
    `);
}

// GAME HANDLE DATA
const xocxoc = (data) => {
    try {
        if (void 0 !== data.time_remain) {
            if (data.time_remain > 0) {
                timeCountDown(data.time_remain, "xocdiaTime", "ffffff", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.XOCXOC) xocdiaResetDice();
                        if (mainSence == SENCE_ENUM.XOCXOC) callDataGame("xocdia");
                        if (mainSence == SENCE_ENUM.XOCXOC) $("#xocdiaSetDiceModal").modal("hide");
                    }, 4000);
                });
            }
        }

        if (void 0 !== data.finish) {
            for (let dice in data.finish) {
                const xocxocResultDice = (data.finish[dice]) ? "dice-red" : "dice-white";
                document.getElementById("xocdiadice" + dice).src = `/images/game/xocxoc/${xocxocResultDice}.png`;
            }
        }

        if (void 0 !== data.info) {
            if (void 0 !== data.info.red.chan) {
                $("#totalBetChan").html(`${numbToK(data.info.red.chan)}`);
            }
            if (void 0 !== data.info.red.le) {
                $("#totalBetLe").html(`${numbToK(data.info.red.le)}`);
            }
            if (void 0 !== data.info.red.red3) {
                $("#totalBet3do").html(`${numbToK(data.info.red.red3)}`);
            }
            if (void 0 !== data.info.red.red4) {
                $("#totalBet4do").html(`${numbToK(data.info.red.red4)}`);
            }
            if (void 0 !== data.info.red.white3) {
                $("#totalBet3trang").html(`${numbToK(data.info.red.white3)}`);
            }
            if (void 0 !== data.info.red.white4) {
                $("#totalBet4trang").html(`${numbToK(data.info.red.white4)}`);
            }
        }

        if (void 0 !== data.ingame) {
            if (Object.keys(data.ingame.red).length > 0) {
                let bodyTable3do = '';
                let bodyTable4do = '';
                let bodyTable4trang = '';
                let bodyTable3trang = '';
                let bodyTableChan = '';
                let bodyTableLe = '';

                const data_cuoc = data.ingame.red;

                for (let user in data_cuoc) {
                    if (data_cuoc[user].red3 > 0) {
                        bodyTable3do += `<tr>`;
                        bodyTable3do += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTable3do += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].red3)}</b></td>`;
                        bodyTable3do += `</tr>`;
                    }
                    if (data_cuoc[user].red4 > 0) {
                        bodyTable4do += `<tr>`;
                        bodyTable4do += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTable4do += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].red4)}</b></td>`;
                        bodyTable4do += `</tr>`;
                    }
                    if (data_cuoc[user].white3 > 0) {
                        bodyTable3trang += `<tr>`;
                        bodyTable3trang += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTable3trang += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].white3)}</b></td>`;
                        bodyTable3trang += `</tr>`;
                    }
                    if (data_cuoc[user].white4 > 0) {
                        bodyTable4trang += `<tr>`;
                        bodyTable4trang += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTable4trang += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].white4)}</b></td>`;
                        bodyTable4trang += `</tr>`;
                    }
                    if (data_cuoc[user].chan > 0) {
                        bodyTableChan += `<tr>`;
                        bodyTableChan += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableChan += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].chan)}</b></td>`;
                        bodyTableChan += `</tr>`;
                    }
                    if (data_cuoc[user].le > 0) {
                        bodyTableLe += `<tr>`;
                        bodyTableLe += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableLe += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].le)}</b></td>`;
                        bodyTableLe += `</tr>`;
                    }
                }

                $("#tableBet3do").html(bodyTable3do);
                $("#tableBet4do").html(bodyTable4do);
                $("#tableBet4trang").html(bodyTable4trang);
                $("#tableBet3trang").html(bodyTable3trang);
                $("#tableBetChan").html(bodyTableChan);
                $("#tableBetLe").html(bodyTableLe);
            };
        }



    } catch (e) {}
}

const xocdiaSetDicePopup = (dice) => {
    $("#xocdiaElement").html(`
    <!-- Modal -->
        <div class="modal fade" id="xocdiaSetDiceModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đặt Kết Quả Xúc Xắc</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body" class="text-center">
                <div id="xocdiaSetDiceNotify"></div>
                <ul class="text-center">
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="xocdiaSetDiceElement(${dice}, 0)" class="rounded" width="60" height="60" src="/images/game/xocxoc/dice-red.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="xocdiaSetDiceElement(${dice}, 1)" class="rounded" width="60" height="60" src="/images/game/xocxoc/dice-white.png"></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    `);
    $("#xocdiaSetDiceModal").modal("toggle");
}

const xocdiaSetDiceElement = (dice, value) => {
    // {"xocxoc":{"set_dice":{"0":true}}}
    let textValue;
    switch (value) {
        case 0:
            textValue = true;
            imgVal = "dice-red";
            break;
        case 1:
            textValue = false;
            imgVal = "dice-white";
            break;
        default:
            textValue = '';
            imgVal = "default";
            break;
    }
    document.getElementById("xocdiadice" + dice).src = `/images/game/xocxoc/${imgVal}.png`;
    try {
        ws.send(`{"xocxoc":{"set_dice":{"${dice}":${textValue}}}}`);
    } catch (e) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Không thể  đặt kết quả!",
            timer: 5000
        })
    }
}

const xocdiaResetDice = () => {
    $(".modal-backdrop").hide();
    $("#xocdiaElement").html(``);
    return true;
}

const xocxocShuffle = (array) => {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


const xocxocPostSetDice = (result) => {
    let objResult = xocxocShuffle(["0", "1", "2", "3"]);

    console.log(objResult);
    console.log(objResult[0]);
    
    switch (result) {
      case "white3":
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[0]), 1); }, 0);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[1]), 1); }, 100);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[2]), 1); }, 200);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[3]), 0); }, 300);

      break;
      case "red3":
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[0]), 1); }, 0);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[1]), 0); }, 100);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[2]), 0); }, 200);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[3]), 0); }, 300);
      break;
      case "double":
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[0]), 0); }, 0);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[1]), 0); }, 100);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[2]), 1); }, 200);
        setTimeout(() => { xocdiaSetDiceElement(parseInt(objResult[3]), 1); }, 300);
      break;
    }
}