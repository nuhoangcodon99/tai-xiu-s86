// SENCE BẦU CUA
const initSenceBauCua = () => {
    $(".content-body").html(`
    <div id="baucuaElement"></div>
    <div class="container-fluid">
    <div class="row">

      <div class="col-12 m-b-30">
        <div class="row">
        
        <div style="margin-bottom: 66px;"></div>

          <!-- End Col -->
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <div class="card-body text-center">
                    <ul>
                        <li class="d-inline-block"><img onclick="baucuaSetDicePopup(0)" class="rounded" width="60" height="60" id="baucuadice0" src="/images/game/baucua/dice/default.png" alt=""></li>
                        <li class="d-inline-block"><img onclick="baucuaSetDicePopup(1)" class="rounded" width="60" height="60" id="baucuadice1" src="/images/game/baucua/dice/default.png"></li>
                        <li class="d-inline-block"><img onclick="baucuaSetDicePopup(2)" class="rounded" width="60" height="60" id="baucuadice2" src="/images/game/baucua/dice/default.png" alt=""></li>
                    </ul>
                    <div class="taixiuRemainTime">
                        <p id="baucuaTime" style="color: white;">00:00</p>
                    </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <div class="col-md-6 col-lg-8">
            <div class="row">

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/huou.png" alt="">
                    <div class="desc" id="redHuou">0</div>
                  </div>
                </div>
              </div>

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/bau.png" alt="">
                    <div class="desc" id="redBau">0</div>
                  </div>
                </div>
              </div>

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/ga.png" alt="">
                    <div class="desc" id="redGa">0</div>
                  </div>
                </div>
              </div>

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/ca.png" alt="">
                    <div class="desc" id="redCa">0</div>
                  </div>
                </div>
              </div>

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/cua.png" alt="">
                    <div class="desc" id="redCua">0</div>
                  </div>
                </div>
              </div>

              <div class="col-4 col-xs-4 col-sm-4 col-md-2 col-lg-2">
                <div class="card">
                  <div class="Portfolio">
                    <img class="card-img"
                      src="/images/game/baucua/tom.png" alt="">
                    <div class="desc" id="redTom">0</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- End Col -->
                    


          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">HƯƠU</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetHuou">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">BẦU</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetBau">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">GÀ</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetGa">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">CÁ</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetCa">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">CUA</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetCua">
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2 col-lg-2">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title" style="font-size: 22px;text-align: center;">TÔM</h4>
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">TÊN</th>
                        <th class="text-center">CƯỢC</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetTom">
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
const baucua = (data) => {
    try {
        if (void 0 !== data.time_remain) {
            if (data.time_remain > 60) {
                timeCountDown(data.time_remain - 59, "baucuaTime", "ff0000", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.BAUCUA) taixiuResetDice();
                        if (mainSence == SENCE_ENUM.BAUCUA) callDataGame("baucua");
                        if (mainSence == SENCE_ENUM.BAUCUA) $("#baucuaSetDiceModal").modal("hide");
                    }, 1000);
                });
            } else if (data.time_remain > 0) {
                timeCountDown(data.time_remain, "baucuaTime", "ffffff", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.BAUCUA) baucuaResetDice();
                        if (mainSence == SENCE_ENUM.BAUCUA) callDataGame("baucua");
                        if (mainSence == SENCE_ENUM.BAUCUA) $("#baucuaSetDiceModal").modal("hide");
                    }, 2000);
                });
            }
        }

        if (void 0 !== data.info) {
            if (void 0 !== data.info.redBau) {
                $("#redBau").html(`${numbToK(data.info.redBau)}`);
            }
            if (void 0 !== data.info.redCa) {
                $("#redCa").html(`${numbToK(data.info.redCa)}`);
            }
            if (void 0 !== data.info.redCua) {
                $("#redCua").html(`${numbToK(data.info.redCua)}`);
            }
            if (void 0 !== data.info.redGa) {
                $("#redGa").html(`${numbToK(data.info.redGa)}`);
            }
            if (void 0 !== data.info.redHuou) {
                $("#redHuou").html(`${numbToK(data.info.redHuou)}`);
            }
            if (void 0 !== data.info.redBau) {
                $("#redTom").html(`${numbToK(data.info.redTom)}`);
            }
        }

        if (void 0 !== data.ingame) {
            if (Object.keys(data.ingame).length > 0) {
                let bodyTableHuou = '';
                let bodyTableBau = '';
                let bodyTableGa = '';
                let bodyTableCa = '';
                let bodyTableCua = '';
                let bodyTableTom = '';

                for (const cuoc of data.ingame) {
                    if (cuoc[0] > 0) {
                        bodyTableHuou += `<tr>`;
                        bodyTableHuou += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableHuou += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[0])}</b></td>`;
                        bodyTableHuou += `</tr>`;
                    }
                    if (cuoc[1] > 0) {
                        bodyTableBau += `<tr>`;
                        bodyTableBau += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableBau += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[1])}</b></td>`;
                        bodyTableBau += `</tr>`;
                    }
                    if (cuoc[2] > 0) {
                        bodyTableGa += `<tr>`;
                        bodyTableGa += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableGa += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[2])}</b></td>`;
                        bodyTableGa += `</tr>`;
                    }
                    if (cuoc[3] > 0) {
                        bodyTableCa += `<tr>`;
                        bodyTableCa += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableCa += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[3])}</b></td>`;
                        bodyTableCa += `</tr>`;
                    }
                    if (cuoc[4] > 0) {
                        bodyTableCua += `<tr>`;
                        bodyTableCua += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableCua += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[4])}</b></td>`;
                        bodyTableCua += `</tr>`;
                    }
                    if (cuoc[5] > 0) {
                        bodyTableTom += `<tr>`;
                        bodyTableTom += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${cuoc.name}</b></td>`;
                        bodyTableTom += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(cuoc[5])}</b></td>`;
                        bodyTableTom += `</tr>`;
                    }
                };

                $("#tableBetHuou").html(bodyTableHuou);
                $("#tableBetBau").html(bodyTableBau);
                $("#tableBetGa").html(bodyTableGa);
                $("#tableBetCa").html(bodyTableCa);
                $("#tableBetCua").html(bodyTableCua);
                $("#tableBetTom").html(bodyTableTom);
            };
        }
    } catch (e) {}
}

const baucuaSetDicePopup = (dice) => {
    $("#baucuaElement").html(`
    <!-- Modal -->
        <div class="modal fade" id="baucuaSetDiceModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đặt Kết Quả Xúc Xắc</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body" class="text-center">
                <div id="baucuaSetDiceNotify"></div>
                <ul class="text-center">
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 0)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/huou.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 1)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/bau.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 2)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/ga.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 3)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/ca.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 4)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/cua.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="baucuaSetDiceElement(${dice}, 5)" class="rounded" width="60" height="60" src="/images/game/baucua/dice/tom.png"></li>
                    </ul>
            </div>
            </div>
        </div>
        </div>
    `);
    $("#baucuaSetDiceModal").modal("toggle");
}

const baucuaResetDice = () => {
    $(".modal-backdrop").hide();
    $("#baucuaElement").html(``);
    return true;
}

const baucuaSetDiceElement = (dice, value) => {
    let textValue;
    switch (value) {
        case 0:
            textValue = 'huou'
            break;
        case 1:
            textValue = 'bau';
            break;
        case 2:
            textValue = 'ga';
            break;
        case 3:
            textValue = 'ca';
            break;
        case 4:
            textValue = 'cua';
            break;
        case 5:
            textValue = 'tom';
            break;
        default:
            textValue = '';
            break;
    }
    document.getElementById("baucuadice" + dice).src = `/images/game/baucua/dice/${textValue}.png`;
    try {
        ws.send(`{"baucua":{"set_dice":{"${dice}":"${value}"}}}`);
    } catch (e) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Không thể  đặt kết quả!",
            timer: 5000
        })
    }
}