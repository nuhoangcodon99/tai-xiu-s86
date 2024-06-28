// SENCE TÀI XỈU 
let randomELementTxTime = "";

const initSenceTaiXiu = () => {
    randomELementTxTime = "taixiuTime_" + getRandomInt(0, 999999999);
    $(".content-body").html(`
    <style>
      #userBetTaixiuElement:hover {
        background-color: red;
      }
    </style>
    <div id="taixiuElement"></div>
    <div id="taixiuValueDice" style="display: none;">
        <input type="hidden" id="taixiuValueDice1"/>
        <input type="hidden" id="taixiuValueDice2"/>
        <input type="hidden" id="taixiuValueDice3"/>
    </div>
    <div class="container-fluid">
    <div class="row">

      <div class="col-12 m-b-30">
        <div class="row">

        <div class="col-12 b-b-30">
            <div class="general-button">
                <button type="button" onclick="callDataGame('taixiu')" class="btn mb-1 btn-flat btn-dark">Quản Lý</button>
                <button type="button" onclick="initSenceOverViewTaiXiu()" class="btn mb-1 btn-flat btn-dark">Tổng Quan</button>
                  <select class="custom-select mr-sm-2" id="taixiuMode" onchange="changeTypeNapthe()" style="width: 147px;margin-left: 106px; margin-top: -5px;">
                    <option value="1">AUTO</option>
                    <option value="0">Random</option>
                  </select>
                <button type="button" onclick="TaixiuSetMode()" class="btn mb-1 btn-flat btn-dark">Đặt Chế Độ</button>
            </div>
        </div>
        
        <div style="margin-bottom: 66px;"></div>
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <i class="fa fa-circle fa-5x" style="display: block;color: #333;margin-top: 10px;width: 12%;margin-left: auto;margin-right: auto;"></i>
              <div class="card-body text-center">
                <h5 class="card-title" id="taixiuTotalBet_tai">0</h5>
                <p class="card-text"><i class="fa fa-users" aria-hidden="true"></i> : <b id="taixiuTotalUser_tai">0</b></p>
                <button onclick="selectResultTaixiu('tai')" type="button" class="btn mb-1 btn-flat btn-dark">VỀ TÀI</button>
              </div>
            </div>
          </div>
          <!-- End Col -->
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <div class="card-body text-center">
                    <p id="taixiuPhien">#?????</p>
                    <ul>
                        <li class="d-inline-block"><img onclick="taixiuSetDicePopup(1)" class="rounded" width="60" height="60" id="dice1" src="/images/game/taixiu/dice-0.png" alt=""></li>
                        <li class="d-inline-block"><img onclick="taixiuSetDicePopup(2)" class="rounded" width="60" height="60" id="dice2" src="/images/game/taixiu/dice-0.png"></li>
                        <li class="d-inline-block"><img onclick="taixiuSetDicePopup(3)" class="rounded" width="60" height="60" id="dice3" src="/images/game/taixiu/dice-0.png" alt=""></li>
                    </ul>
                    <div class="taixiuRemainTime">
                        <p id="${ randomELementTxTime }" style="color: white;">00:00</p>
                    </div>
                    <button onclick="taixiuPostSetDice()" type="button" class="btn mb-taixiuRemainTime1 btn-rounded btn-warning"><b>Đặt</b></button>
              </div>
            </div>
          </div>
          <!-- End Col -->
          <div class="col-md-6 col-lg-4">
            <div class="card">
              <i class="fa fa-circle-o fa-5x" style="display: block;margin-top: 10px;width: 12%;margin-left: auto;margin-right: auto;"></i>
              <div class="card-body text-center">
                <h5 class="card-title" id="taixiuTotalBet_xiu">0</h5>
                <p class="card-text"><i class="fa fa-users" aria-hidden="true"></i> : <b id="taixiuTotalUser_xiu">0</b></p>
                <button onclick="selectResultTaixiu('xiu')" type="button" class="btn mb-1 btn-flat btn-dark">VỀ XỈU</button>
              </div>
            </div>
          </div>
          <!-- End Col -->
          
          <div class="col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <!--<h4 class="card-title" style="font-size: 22px;text-align: center;">TÀI</h4>-->
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">NHÂN VẬT</th>
                        <th class="text-center">CƯỢC</th>
                        <th class="text-center">SỐ DƯ</th>
                        <th class="text-center">IP ONLINE</th>
                        <th class="text-center">HÀNH ĐỘNG</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetTai">
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

          <div class="col-md-6 col-lg-6">
            <div class="card">
              <div class="card-body">
                <!-- <h4 class="card-title" style="font-size: 22px;text-align: center;">XỈU</h4> -->
                <div class="table-responsive">
                  <table class="table header-border">
                    <thead>
                      <tr>
                        <th class="text-center">NHÂN VẬT</th>
                        <th class="text-center">CƯỢC</th>
                        <th class="text-center">SỐ DƯ</th>
                        <th class="text-center">IP ONLINE</th>
                        <th class="text-center">HÀNH ĐỘNG</th>
                      </tr>
                    </thead>
                    <tbody id="tableBetXiu">
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

    userResetModal2();
    $("#taixiuElement").html(``);
    TaixiuGetMode(); // lấy chế độ hiện tại
}

$(document).ready(() => {
  setInterval(() => {
    try {
      ws.send(`{"taixiu":{"get_time":true,"view":true}}`);
    }catch(e){}
  }, 10000);
});


// GAME HANDLE DATA
const taixiu = (data) => {
    try {
        if (void 0 !== data.mode) {
            if (data.mode == "1") {
                $("#taixiuMode").html(`
                <option value="1">AUTO</option>
                <option value="0">RANDOM</option>
                `);
            }
            if (data.mode == "0") {
                $("#taixiuMode").html(`
                <option value="0">RANDOM</option>
                <option value="1">AUTO</option>
                `);
            }
        }

        if (void 0 !== data.phien) {
            $("#taixiuPhien").html(`#${ data.phien }`);
        }

        if (void 0 !== data.time_remain) {
            if (data.time_remain > 61 && data.time_remain <= 75) {
                timeCountDown(data.time_remain - 60, randomELementTxTime, "ff0000", () => {
                    if (mainSence == SENCE_ENUM.TAIXIU) taixiuResetDice();
                    if (mainSence == SENCE_ENUM.TAIXIU) $("#taixiuSetDiceModal").modal("hide");
                });
            } else if (data.time_remain <= 61 && data.time_remain > 0) {
                timeCountDown(data.time_remain, randomELementTxTime, "ffffff", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.TAIXIU) taixiuResetDice();
                        callDataGame("taixiu");
                        if (mainSence == SENCE_ENUM.TAIXIU) $("#taixiuSetDiceModal").modal("hide");
                    }, 2000);
                });
            } else if (data.time_remain == 0) {
                timeCountDown(15, randomELementTxTime, "ff0000", () => {
                    setTimeout(() => {
                        if (mainSence == SENCE_ENUM.TAIXIU) taixiuResetDice();
                        callDataGame("taixiu");
                        if (mainSence == SENCE_ENUM.TAIXIU) $("#taixiuSetDiceModal").modal("hide");
                    }, 1000);
                });
            }
        }

        if (void 0 !== data.finish) {
            const dice = data.finish.dices;
            taixiuSetDiceElement(1, dice[0]);
            taixiuSetDiceElement(2, dice[1]);
            taixiuSetDiceElement(3, dice[2]);
            setTimeout(() => {
              callDataGame("taixiu");
            }, 5000);
        }


        if (void 0 !== data.taixiu) {
            if (void 0 !== data.taixiu.red_tai && void 0 !== data.taixiu.red_xiu) {
                $("#taixiuTotalBet_tai").html(`${ numberWithCommas(data.taixiu.red_tai) }`);
                $("#taixiuTotalBet_xiu").html(`${ numberWithCommas(data.taixiu.red_xiu) }`);
            }
            if (void 0 !== data.taixiu.red_player_tai && void 0 !== data.taixiu.red_player_xiu) {
                $("#taixiuTotalUser_tai").html(`${ numberWithCommas(data.taixiu.red_player_tai) }`);
                $("#taixiuTotalUser_xiu").html(`${ numberWithCommas(data.taixiu.red_player_xiu) }`);
            }
        }

        if (void 0 !== data.list) {
            if (Object.keys(data.list).length > 0) {
                let bodyTableTai = '';
                let bodytableXiu = '';

                // tìm ip trùng
                let listIP = [];
                let ipSpam = [];

                for (const player of data.list) listIP.push(player.ip);
                for (const player of data.list) {
                    const countSameIp = count_element_in_array(listIP, player.ip);
                    if (countSameIp > 1) {
                        ipSpam.push(player.ip);
                    }
                };
                // lọc trùng list ip spam
                ipSpam = [...new Set(ipSpam)]

                for (const cuoc of data.list) {

                    let color = (cuoc.bet >= 500000) ? "255, 0, 0" : (cuoc.bet >= 300000) ? "177, 0, 0" : (cuoc.bet >= 100000) ? "134, 0, 0" : "0, 0, 0";

                    let betChoice = (cuoc.select) ? true : false;
                    if (betChoice) {
                        bodyTableTai += `<tr>`;
                        bodyTableTai += `<td class="text-center" style="color: rgb(0, 0, 0);"><b id="userBetTaixiuElement" style="cursor: help; " onClick="getInfoUser('${ cuoc.id }')">${ cuoc.name }</b></td>`;
                        bodyTableTai += `<td class="text-center" style="color: rgb(${ color });"><b>${ numberWithCommas(cuoc.bet) }</b></td>`;
                        bodyTableTai += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(cuoc.balance) }</b></td>`;
                        //bodyTableTai += `<td class="text-center">${ moment(cuoc.time).format("hh:mm:ss") }</td>`;
                        if (ipSpam.indexOf(cuoc.ip) > -1) {
                            bodyTableTai += `<td class="text-center" style="color: rgb(255, 0, 0);"><b><i class="fa fa-exclamation-triangle"></i> ${ cuoc.ip }</b></td>`;
                        } else {
                            bodyTableTai += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ cuoc.ip }</b></td>`;
                        }
                        bodyTableTai += `<td class="text-center">
                          <button onclick="getLishSuChoiTaiXiu2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                            <b><i class="fa fa-search"></i></b>
                          </button>
                          <button onclick="getLishSuChoiAll2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                            <b><i class="fa fa-history"></i></b>
                          </button>
                          <button onclick="getLishSuUserChuyenTien2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                            <b><i class="fa fa-exchange"></i></b>
                          </button>
                          </td>
                          `;

                        bodyTableTai += `</tr>`;
                    } else {
                        bodytableXiu += `<tr>`;
                        bodytableXiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b id="userBetTaixiuElement" style="cursor: help;" onClick="getInfoUser('${ cuoc.id }')">${ cuoc.name }</b></td>`;
                        bodytableXiu += `<td class="text-center" style="color: rgb(${ color });"><b>${ numberWithCommas(cuoc.bet) }</b></td>`;
                        bodytableXiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(cuoc.balance) }</b></td>`;
                        //bodytableXiu += `<td class="text-center">${ moment(cuoc.time).format("hh:mm:ss") }</td>`;
                        if (ipSpam.indexOf(cuoc.ip) > -1) {
                            bodytableXiu += `<td class="text-center" style="color: rgb(255, 0, 0);"><b><i class="fa fa-exclamation-triangle"></i> ${ cuoc.ip }</b></td>`;
                        } else {
                            bodytableXiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ cuoc.ip }</b></td>`;
                        }
                        bodytableXiu += `<td class="text-center">
                        <button onclick="getLishSuChoiTaiXiu2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                          <b><i class="fa fa-search"></i></b>
                        </button>
                        <button onclick="getLishSuChoiAll2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                          <b><i class="fa fa-history"></i></b>
                        </button>
                        <button onclick="getLishSuUserChuyenTien2('${ cuoc.name }', '${ cuoc.id }')" type="button" class="btn mb-1 btn-outline-dark">
                          <b><i class="fa fa-exchange"></i></b>
                        </button>
                        </td>
                        `;
                        bodytableXiu += `</tr>`;
                    }

                };
                $("#tableBetTai").html(bodyTableTai);
                $("#tableBetXiu").html(bodytableXiu);
            };
        }

        if (void 0 !== data.dashboard) {

            if (void 0 !== data.dashboard.get_users) {
                if (Object.keys(data.dashboard.get_users.data).length > 0) {
                    const totalPage = data.dashboard.get_users.total;
                    const current_page = data.dashboard.get_users.page;
                    let bodyTableTopTaixiu = '';

                    for (const userTop of data.dashboard.get_users.data) {
                        bodyTableTopTaixiu += `<tr>`;
                        bodyTableTopTaixiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ userTop.name }</b></td>`;
                        bodyTableTopTaixiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(userTop.tWin) }</b></td>`;
                        bodyTableTopTaixiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(userTop.tLost) }</b></td>`;
                        bodyTableTopTaixiu += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(userTop.profitTX) }</b></td>`;
                        bodyTableTopTaixiu += `</tr>`;
                    };
                    $("#tableTopTaixiu").html(bodyTableTopTaixiu);

                    const phantrang = Pagination(current_page, totalPage);
                    let phantrangBody = '';
                    phantrang.forEach((page) => {
                        let active = (current_page == page) ? "active" : "";
                        phantrangBody += `
                            <li class="page-item ${ active }">
                                <a class="page-link" href="javascript:void(topTaixiuGetDataPage(${ page }))"><b>${ page }</b></a>
                            </li>
                        `;
                        $("#phantrangTopTaiXiu").html(phantrangBody);
                    });
                };
            }


            if (Object.keys(data.dashboard.dTXWin).length > 0) {
                let bodyTableWin = '';
                for (const line of data.dashboard.dTXWin) {
                    bodyTableWin += `<tr>`;
                    bodyTableWin += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ line.name }</b></td>`;
                    bodyTableWin += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(line.tLineWinRed) }/${ numberWithCommas(line.tLineWinRedH) }</b></td>`;
                    bodyTableWin += `</tr>`;
                };
                $("#taixiuTableWin").html(bodyTableWin);
            };
            if (Object.keys(data.dashboard.dTXLost).length > 0) {
                let bodyTableLost = '';
                for (const line of data.dashboard.dTXLost) {
                    bodyTableLost += `<tr>`;
                    bodyTableLost += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ line.name }</b></td>`;
                    bodyTableLost += `<td class="text-center" style="color: rgb(0, 0, 0);"><b>${ numberWithCommas(line.tLineLostRed) }/${ numberWithCommas(line.tLineLostRedH) }</b></td>`;
                    bodyTableLost += `</tr>`;
                };
                $("#taixiuTableLost").html(bodyTableLost);
            };

        }
    } catch (e) {
        console.log(e);
    }

}



const topTaixiuGetDataPage = (page) => {
    ws.send(`{"taixiu":{"dashboard":{"get_top":{"red":true,"sort":"5","page":${ page }}}}}`);
}

const initSenceOverViewTaiXiu = () => {
    mainSence = SENCE_ENUM.MAIN;
    ws.send(`{"taixiu":{"dashboard":{"view":true}}}`);
    ws.send(`{"taixiu":{"dashboard":{"get_top":{"red":true,"sort":"5","page":1}}}}`);

    $(".content-body").html(``); // reset sence content
    $(".content-body").html(`
<div id="taixiuElement"></div>
<div class="container-fluid">
  <div class="row">

    <div class="col-12 m-b-30">
      <div class="row">

        <div class="col-12 b-b-30">
          <div class="general-button">
            <button type="button" onclick="callDataGame('taixiu')" class="btn mb-1 btn-flat btn-dark">Quản Lý</button>
            <button type="button" onclick="initSenceOverViewTaiXiu()" class="btn mb-1 btn-flat btn-dark">Tổng Quan</button>
            <button type="button" onclick="openModalResetTopTaiXiu()" class="btn mb-1 btn-flat btn-dark">Reset TOP</button>
          </div>
        </div>

        <div style="margin-bottom: 66px;"></div>


        <div class="col-md-6 col-lg-6">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title" style="font-size: 22px;text-align: center;">TOP TÀI XỈU</h4>
              <div class="table-responsive" style="height: 497px;">
                <table class="table header-border">
                  <thead>
                    <tr>
                      <th class="text-center">TÊN NHÂN VẬT</th>
                      <th class="text-center">THẮNG</th>
                      <th class="text-center">THUA</th>
                      <th class="text-center">LÃI/LỖ</th>
                    </tr>
                  </thead>
                  <tbody id="tableTopTaixiu">
                  </tbody>
                </table>
              </div>
            </div>
            <div class="bootstrap-pagination">
              <nav>
                <ul class="pagination justify-content-center" id="phantrangTopTaiXiu">
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-6">
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title" style="font-size: 22px;text-align: center;">DÂY THẮNG</h4>
                  <div class="table-responsive" style="overflow: auto;height: 533px;">
                    <table class="table header-border">
                      <thead>
                        <tr>
                          <th class="text-center">TÊN NHÂN VẬT</th>
                          <th class="text-center">MAX/HIỆN</th>
                        </tr>
                      </thead>
                      <tbody id="taixiuTableWin">
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

            <div class="col-md-6 col-lg-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title" style="font-size: 22px;text-align: center;">DÂY THUA</h4>
                  <div class="table-responsive"  style="overflow: auto;height: 533px;">
                    <table class="table header-border">
                      <thead>
                        <tr>
                          <th class="text-center">TÊN NHÂN VẬT</th>
                          <th class="text-center">MAX/HIỆN</th>
                        </tr>
                      </thead>
                      <tbody id="taixiuTableLost">
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
      </div>
    </div>
    `);
}

const taixiuResetDice = () => {
    $(".modal-backdrop").hide();
    $("#taixiuElement").html(``);
    return true;
}

const taixiuPostSetDice = () => {
    try {
        let dice1 = Number($("#taixiuValueDice1").val());
        let dice2 = Number($("#taixiuValueDice2").val());
        let dice3 = Number($("#taixiuValueDice3").val());
        ws.send(`{"taixiu":{"set_dice":{"dice1":${ dice1 },"dice2":${ dice2 },"dice3":${ dice3 }}}}`);
    } catch (e) {
        cuteToast({
            type: "error", // or 'info', 'error', 'warning'
            message: "Không thể  đặt kết quả!",
            timer: 5000
        })
    }
}

const taixiuSetDicePopup = (dice) => {
    $("#taixiuElement").html(`
    <!-- Modal -->
        <div class="modal fade" id="taixiuSetDiceModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đặt Kết Quả Xúc Xắc ${ dice }</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body" class="text-center">
                <div id="taixiuSetDiceNotify"></div>
                <ul class="text-center">
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 1)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-1.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 2)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-2.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 3)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-3.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 4)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-4.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 5)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-5.png"></li>
                    <li class="d-inline-block"><img data-dismiss="modal" onclick="taixiuSetDiceElement(${ dice }, 6)" class="rounded" width="60" height="60" src="/images/game/taixiu/dice-6.png"></li>
                    </ul>
            </div>
            </div>
        </div>
        </div>
    `);
    $("#taixiuSetDiceModal").modal("toggle");
}

const taixiuSetDiceElement = (dice, value) => {
    try {
        $("#taixiuValueDice" + dice).val(value);
        document.getElementById("dice" + dice).src = `/images/game/taixiu/dice-${ value }.png`;
        $("#taixiuSetDiceNotify").html(`
      <div class="alert alert-success">
          Xúc Xắc <b>${ dice }</b> đang chọn là <b>${ value }</b>
      </div>
      `);
    } catch (e) {}
};

const openModalResetTopTaiXiu = () => {
    $("#taixiuElement").html(`
    <!-- Modal -->
        <div class="modal fade" id="taixiuSetDiceModal">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Đặt lại dữ liệu TOP</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <div class="modal-body" class="text-center">
            <div class="alert alert-warning">Bạn có muốn đặt lại dữ liệu TOP không ?</div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
               <button onclick="taixiuResetTop()" type="button" class="btn btn-primary"  data-dismiss="modal">Reset</button>
            </div>
            </div>
        </div>
        </div>
    `);
    $("#taixiuSetDiceModal").modal("toggle");
}

const taixiuResetTop = () => {
    ws.send(`{"taixiu":{"dashboard":{"resetTop":true}}}`);
    ws.send(`{"taixiu":{"dashboard":{"get_top":{"red":true,"sort":"5","page":1}}}}`);
}

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createResult = (result) => {
    while (true) {
        let dice1, dice2, dice3;
        dice1 = randomInteger(1, 6);
        dice2 = randomInteger(1, 6);
        dice3 = randomInteger(1, 6);
        if (result == "tai") {
            if (dice1 + dice2 + dice3 > 10) return [dice1, dice2, dice3];
        } else {
            if (dice1 + dice2 + dice3 <= 10) return [dice1, dice2, dice3];
        }
    }
}

const selectResultTaixiu = (result) => {
    const arrDice = createResult(result);
    taixiuSetDiceElement(1, arrDice[0]);
    taixiuSetDiceElement(2, arrDice[1]);
    taixiuSetDiceElement(3, arrDice[2]);
    let dice1 = Number($("#taixiuValueDice1").val());
    let dice2 = Number($("#taixiuValueDice2").val());
    let dice3 = Number($("#taixiuValueDice3").val());
    ws.send(`{"taixiu":{"set_dice":{"dice1":${ dice1 },"dice2":${ dice2 },"dice3":${ dice3 }}}}`);
}




const getLishSuChoiTaiXiu2 = (name, userID) => {
    closeViewDetailUserModal();
    handleGetLishSuChoiTaiXiu2(name, userID);
}

const handleGetLishSuChoiTaiXiu2 = (name, userId) => {
    ws.send(`{"users": {"history": {"taixiu": { "id": "${ userId }", "page": 1}}}}`);
    initSenceLichSuChoiTaiXiu(name, userId);
}


const getLishSuUserChuyenTien2 = (name, userID) => {
    handleGetLishSuUserChuyenTien2(name, userID);
}

const handleGetLishSuUserChuyenTien2 = (name, userId) => {
    ws.send(`{"users": {"history": {"chuyen": { "id": "${ userId }", "page": 1}}}}`);
    initSenceLichSuUserChuyenTien(name, userId);
}


const getLishSuChoiAll2 = (name, userID) => {
    handleGetBienDongSoDu2(name, userID);
}

const handleGetBienDongSoDu2 = (name, userId) => {
    ws.send(`{"users": {"history": {"biendong": { "id": "${ userId }", "page": 1}}}}`);
    initSenceBienDongSoDu(name, userId);
}

const userInfo2 = (data) => {
    try {
        userViewDetailPopup2(data);
    } catch (e) {
        console.log(e.message);
    }
}

const userResetModal2 = () => {
    $(".modal-backdrop").hide();
    $('#userViewDetailModal').modal('hide');
    $("#userViewDetailModal").remove();
}

const userViewDetailPopup2 = (data) => {
    try {
        userResetModal2();
        $('#userViewDetailModal').modal('hide');
        $("#userViewDetailModal").remove();

        $("#taixiuElement").html(`
        <!-- Modal -->
            <div class="modal fade" id="userViewDetailModal">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thông Tin Thành Viên [<b>${ data.profile.username.toUpperCase() }</b>]</h5>
                    <button type="button" class="close" data-dismiss="modal" onClick="userResetModal2()"><span>&times;</span>
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


const TaixiuSetMode = () => {
    try {
        const setMode = $("#taixiuMode").val();
        ws.send(`{"taixiu":{"mode": { "set_mode": "${setMode}" }}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const TaixiuGetMode = () => {
    ws.send(`{"taixiu":{"mode": { "get_mode": true }}}`);
}