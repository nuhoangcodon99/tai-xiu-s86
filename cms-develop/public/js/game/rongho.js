// SENCE XÓC ĐĨA
const initSenceRongho = () => {
    $(".content-body").html(`
    <style>
    .card .card-body {
        padding: 11px;
    }
    </style>
    <div id="ronghoElement"></div>
    <div class="container-fluid">
    <div class="row">

      <div class="col-12 m-b-30">
        <div class="row">
        
        <div style="margin-bottom: 66px;"></div>

          <!-- End Col -->
          <div class="col-md-4 col-lg-3">
            <div class="card">
              <div class="card-body text-center">
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <div class="text-center">
                            <p style="font-size: 28px; color: #000;">Rồng</p>
                        </div>
                        <ul>
                            <li class="d-inline-block"><img onclick="ronghoSetDicePopup(3, true)" class="rounded" width="60" height="60" id="ronghodice3" src="/images/game/rongho/dice/default.png" alt=""></li>
                            <li class="d-inline-block"><img onclick="ronghoSetDicePopup(0, false)" class="rounded" width="60" height="60" id="ronghodice0" src="/images/game/rongho/dice/default.png"></li>
                        </ul>
                    </div>
                    <div class="col-md-6 col-lg-6">
                        <div class="text-center">
                            <p style="font-size: 28px; color: #000;">Hổ</p>
                        </div>
                        <ul>
                            <li class="d-inline-block"><img onclick="ronghoSetDicePopup(4, true)" class="rounded" width="60" height="60" id="ronghodice4" src="/images/game/rongho/dice/default.png" alt=""></li>
                            <li class="d-inline-block"><img onclick="ronghoSetDicePopup(1, false)" class="rounded" width="60" height="60" id="ronghodice1" src="/images/game/rongho/dice/default.png"></li>
                        </ul>
                    </div>
                </div>
                <div class="taixiuRemainTime">
                    <p id="ronghoTime" style="color: white;">00:00</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Col -->

          <div class="col-md-8 col-lg-9">
            <div class="row">

              <div class="col-lg-4 col-sm-12">
                <div class="card">
                  <div class="social-graph-wrapper widget-facebook">
                    <span class="s-icon">Rồng/Hòa/Hổ</span>
                  </div>
                  <div class="row">
                    <div class="col-4 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetRong">0k</h4>
                        <p class="m-0">RỒNG</p>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetHoa">0k</h4>
                        <p class="m-0">HÒA</p>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetHo">0k</h4>
                        <p class="m-0">HỔ</p>
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
                        <h4 class="m-1" id="totalBetRo">0k</h4>
                        <p class="m-0">[♦] RÔ</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetCo">0k</h4>
                        <p class="m-0">[♥] CƠ</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetBich">0k</h4>
                        <p class="m-0">[♣] BÍCH</p>
                      </div>
                    </div>
                    <div class="col-3 border-right">
                      <div class="pt-3 pb-3 pl-0 pr-0 text-center">
                        <h4 class="m-1" id="totalBetTep">0k</h4>
                        <p class="m-0">[♣] TÉP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <!-- End Col -->





        <div class="col-md-5 col-lg-5">
            <div class="row">
                <div class="col-md-4 col-lg-4">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">[♦] RÔ</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetRo">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-4 col-lg-4">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">[♥] CƠ</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetCo">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-4 col-lg-4">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">Rồng</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetRong">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="col-md-7 col-lg-7">
            <div class="row">
                <div class="col-md-3 col-lg-3">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">Hòa</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetHoa">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-3 col-lg-3">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">Hổ</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetHo">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-3 col-lg-3">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">[♣] TÉP</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetTep">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-3 col-lg-3">
                    <div class="card">
                    <div class="card-body">
                        <h4 class="card-title" style="font-size: 22px;text-align: center;">[♣] BÍCH</h4>
                        <div class="table-responsive">
                        <table class="table header-border">
                            <thead>
                            <tr>
                                <th class="text-center">TÊN</th>
                                <th class="text-center">CƯỢC</th>
                            </tr>
                            </thead>
                            <tbody id="tableBetBich">
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

        </div>
      </div>
    `);
}


const rongho = (data) => {
    try {
        if (void 0 !== data.time_remain) {
            if (data.time_remain > 0) {
                timeCountDown(data.time_remain, "ronghoTime", "ffffff", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.RONGHO) ronghoResetDice();
                        if (mainSence == SENCE_ENUM.RONGHO) callDataGame("rongho");
                        if (mainSence == SENCE_ENUM.RONGHO) $("#ronghoSetDiceModal").modal("hide");
                    }, 4000);
                });
            }
        }

        // if (void 0 !== data.finish) {
        //     for (let dice in data.finish) {
        //         const xocxocResultDice = (data.finish[dice]) ? "dice-red" : "dice-white";
        //         document.getElementById("xocdiadice" + dice).src = `/images/game/xocxoc/${xocxocResultDice}.png`;
        //     }
        // }

        if (void 0 !== data.info) {
            if (void 0 !== data.info.red.rong) {
                $("#totalBetRong").html(`${numbToK(data.info.red.rong)}`);
            }
            if (void 0 !== data.info.red.hoa) {
                $("#totalBetHoa").html(`${numbToK(data.info.red.hoa)}`);
            }
            if (void 0 !== data.info.red.ho) {
                $("#totalBetHo").html(`${numbToK(data.info.red.ho)}`);
            }

            if (void 0 !== data.info.red.ro) {
                $("#totalBetRo").html(`${numbToK(data.info.red.ro)}`);
            }
            if (void 0 !== data.info.red.co) {
                $("#totalBetCo").html(`${numbToK(data.info.red.co)}`);
            }
            if (void 0 !== data.info.red.bich) {
                $("#totalBetBich").html(`${numbToK(data.info.red.bich)}`);
            }
            if (void 0 !== data.info.red.tep) {
                $("#totalBetTep").html(`${numbToK(data.info.red.tep)}`);
            }
        }

        if (void 0 !== data.ingame) {
            if (Object.keys(data.ingame.red).length > 0) {
                let bodyTableRo = '';
                let bodyTableCo = '';
                let bodyTableBich = '';
                let bodyTableTep = '';
                let bodyTableRong = '';
                let bodyTableHo = '';
                let bodyTableHoa = '';

                const data_cuoc = data.ingame.red;

                for (let user in data_cuoc) {
                    if (data_cuoc[user].ro > 0) {
                        bodyTableRo += `<tr>`;
                        bodyTableRo += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableRo += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].ro)}</b></td>`;
                        bodyTableRo += `</tr>`;
                    }
                    if (data_cuoc[user].co > 0) {
                        bodyTableCo += `<tr>`;
                        bodyTableCo += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableCo += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].co)}</b></td>`;
                        bodyTableCo += `</tr>`;
                    }
                    if (data_cuoc[user].bich > 0) {
                        bodyTableBich += `<tr>`;
                        bodyTableBich += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableBich += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].bich)}</b></td>`;
                        bodyTableBich += `</tr>`;
                    }
                    if (data_cuoc[user].tep > 0) {
                        bodyTableTep += `<tr>`;
                        bodyTableTep += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableTep += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].tep)}</b></td>`;
                        bodyTableTep += `</tr>`;
                    }
                    if (data_cuoc[user].rong > 0) {
                        bodyTableRong += `<tr>`;
                        bodyTableRong += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableRong += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].rong)}</b></td>`;
                        bodyTableRong += `</tr>`;
                    }
                    if (data_cuoc[user].ho > 0) {
                        bodyTableHo += `<tr>`;
                        bodyTableHo += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableHo += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].ho)}</b></td>`;
                        bodyTableHo += `</tr>`;
                    }
                    if (data_cuoc[user].hoa > 0) {
                        bodyTableHoa += `<tr>`;
                        bodyTableHoa += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${user}</b></td>`;
                        bodyTableHoa += `<td class="text-center" style="color: rgb(255, 0, 0);"><b>${numberWithCommas(data_cuoc[user].hoa)}</b></td>`;
                        bodyTableHoa += `</tr>`;
                    }
                }

                $("#tableBetRo").html(bodyTableRo);
                $("#tableBetCo").html(bodyTableCo);
                $("#tableBetBich").html(bodyTableBich);
                $("#tableBetTep").html(bodyTableTep);
                $("#tableBetRong").html(bodyTableRong);
                $("#tableBetHo").html(bodyTableHo);
                $("#tableBetHoa").html(bodyTableHoa);
            };
        }

    } catch (e) {}
}


const ronghoSetDicePopup = (dice, format) => {
    let bodySetDice = '';
    let count = (format) ? 13 : 4;
    for (let i = 1; i <= count; i++) {
        if (format) bodySetDice += `<li class="d-inline-block"><img data-dismiss="modal" onclick="ronghoSetDiceElement(${dice}, ${i}, true)" class="rounded" width="60" height="60" src="/images/game/rongho/dice/${i}.png"></li>` + "\n";
        if (!format) bodySetDice += `<li class="d-inline-block"><img data-dismiss="modal" onclick="ronghoSetDiceElement(${dice}, ${i}, false)" class="rounded" width="60" height="60" src="/images/game/rongho/dice/format-${i}.png"></li>` + "\n";
    }
    $("#ronghoElement").html(`
    <!-- Modal -->
        <div class="modal fade" id="ronghoSetDiceModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đặt Kết Quả Rồng Hổ</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body" class="text-center">
                <div id="ronghoSetDiceNotify"></div>
                <ul class="text-center">
                   ${bodySetDice}
                </ul>
            </div>
            </div>
        </div>
        </div>
    `);
    $("#ronghoSetDiceModal").modal("toggle");
}
const ronghoSetDiceElement = (dice, value, format) => {
    // ronghodice3
    if (format) {
        document.getElementById("ronghodice" + dice).src = `/images/game/rongho/dice/${value}.png`;
        try {
            ws.send(`{"rongho":{"set_dice":{"${dice}":${value}}}}`);
        } catch (e) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Không thể  đặt kết quả!",
                timer: 5000
            })
        }
    }
    if (!format) {
        document.getElementById("ronghodice" + dice).src = `/images/game/rongho/dice/format-${value}.png`;
        let textValue;
        switch (value) {
            case 1:
                textValue = '♦';
                break;
            case 2:
                textValue = '♥';
                break;
            case 3:
                textValue = '♣';
                break;
            case 4:
                textValue = '♠';
                break;
        }
        try {
            ws.send(`{"rongho":{"set_dice":{"${dice}":${textValue}}}}`);
        } catch (e) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Không thể  đặt kết quả!",
                timer: 5000
            })
        }
    }
}

const ronghoResetDice = () => {
    $(".modal-backdrop").hide();
    $("#ronghoElement").html(``);
    return true;
}