const initSenceGuithongbao = () => {
    $(".content-body").html(`
<div id="guithongbaoElement"></div>
    `);
    guithongbaoPopup();
}


const guithongbaoPopup = () => {
    try {
        $("#guithongbaoElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="guithongbaoModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Gửi thông báo server</h5>
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" class="text-center">
                        <div id="doimatkhauPopupNotify"></div>
                        <h5>Gửi thông báo Game</h5>
                         <div class="form-group">
                              <label for="message-text" class="col-form-label">Tin nhắn:</label>
                              <textarea class="form-control" id="message-game-guithongbao"  placeholder="nhập nội dung tin nhắn trong 1 dòng..."></textarea>
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Tên nhân vật:</label>
                            <input type="text" class="form-control" id="username-game-guithongbao" placeholder="nhập tên nhân vật">
                          </div>
                          <button onclick="sendMessageGameAll()" type="button" class="btn mb-1 btn-flat btn-danger">Gửi toàn bộ</button>
                          <button onclick="sendMessageGameUser()" type="button" class="btn mb-1 btn-flat btn-info">Gửi riêng</button>
                          <hr>
                        <h5>Gửi thông báo Telegram</h5>
                         <div class="form-group">
                              <label for="message-text" class="col-form-label">Tin nhắn:</label>
                              <textarea class="form-control" id="message-tele-guithongbao"  placeholder="nhập nội dung tin nhắn trong 1 dòng..."></textarea>
                          </div>
                          <button onclick="sendMessageTele()" type="button" class="btn mb-1 btn-flat btn-primary">Gửi toàn bộ</button>
                        <hr>
                        <h5>Gửi thông báo Trong Game</h5>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Tiêu đề:</label>
                            <input type="text" class="form-control" id="guithongbao-title" placeholder="nhập tiêu đề">
                        </div>
                        <div class="form-group">
                               <label for="message-text" class="col-form-label">Thông báo:</label>
                               <textarea class="form-control" id="guithongbao-message"  placeholder="nhập nội dung thông báo trong 1 dòng..."></textarea>
                        </div>
                        <button onclick="sendMessageGame()" type="button" class="btn mb-1 btn-flat btn-primary">Gửi thông báo nhanh</button>
                        <button onclick="sendMessageGameAndPin()" type="button" class="btn mb-1 btn-flat btn-danger">Gửi + Ghim thông báo</button>

                    </div>
                    </div>
                </div>
              </div>
            `);
        $("#guithongbaoModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessageGameUser = () => {
    try {
        const msg = $("#message-game-guithongbao").val();
        const user = $("#username-game-guithongbao").val();

        if (!msg && !user && msg.length <= 5 && user.length <= 3) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Thông tin quá ngắn!",
                timer: 5000
            })
            return;
        }
        ws.send(`{"sys":{"SendHomThu":{"msg":"${ msg }","nickname":"${ user }"}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessageGameAll = () => {
    try {
        const msg = $("#message-game-guithongbao").val();

        if (!msg && msg.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Thông tin quá ngắn!",
                timer: 5000
            })
            return;
        }
        ws.send(`{"sys":{"SendAllHomThu":"${ msg }"}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessageTele = () => {
    try {
        const msg = $("#message-tele-guithongbao").val();

        if (!msg && msg.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Thông tin quá ngắn!",
                timer: 5000
            })
            return;
        }
        ws.send(`{"sys":{"SendAllTele":"${ msg }"}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessageGame = () => {
    try {
        const title = $("#guithongbao-title").val();
        const msg = $("#guithongbao-message").val();

        if (!title && title.length <= 5 || !msg && msg.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Thông tin quá ngắn!",
                timer: 5000
            })
            return;
        }
        ws.send(`{"sys":{"SendToGame":{"title": "${ title }", "msg": "${ msg }", "pin": false}}}`);
    } catch (e) {
        console.log(e.message);
    }
}

const sendMessageGameAndPin = () => {
    try {
        const title = $("#guithongbao-title").val();
        const msg = $("#guithongbao-message").val();

        if (!title && title.length <= 5 || !msg && msg.length <= 5) {
            cuteToast({
                type: "error", // or 'info', 'error', 'warning'
                message: "Thông tin quá ngắn!",
                timer: 5000
            })
            return;
        }
        ws.send(`{"sys":{"SendToGame":{"title": "${ title }", "msg": "${ msg }", "pin": true}}}`);
    } catch (e) {
        console.log(e.message);
    }
}