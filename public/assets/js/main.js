let DEBUG = true;
let ENV = "prod";
let SocketUrl;

(ENV !== "prod") ? SocketUrl = `ws://localhost:8009/cms102`: SocketUrl = `ws://server.po88.club/connect`;

function playSound(url) {
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function() {
        audio.remove() //Remove when played.
    };
    document.body.appendChild(audio);
}

let countTo = (element, from, to) => {
    let $this = $("#" + element);
    let countTo = to >> 0;
    $({
        countNum: $this.text()
    }).animate({
        countNum: countTo
    }, {
        duration: 3000,
        easing: 'linear',
        step: function() {
            $this.text(numberWithCommas(Math.floor(this.countNum)));
        },
        complete: function() {
            $this.text(numberWithCommas(this.countNum));
        }
    });
}

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// SOCKET CHECK BROWSER
if ("WebSocket" in window) {} else {
    alert("Trình duyệt của bạn không được hỗ trợ Websocket vui lòng đổi trình duyệt khác để sử dụng!");
}


// Let us open a web socket
let ws = new WebSocket(SocketUrl);
ws.onopen = function() {
    console.log("Connected!");
}

// SOCKET NHẬN TỪ SV VỀ
ws.onmessage = (_data) => {
    var data = JSON.parse(_data.data);

    //console.log(data);

    let listGet = [
        "arb",
        "candy",
        "caothap",
        "captin",
        "chuadao",
        "mini_poker",
        "sexandzen",
        "zeus"
    ];


    if (void 0 !== data.TopHu) {

        for (const [key, value] of Object.entries(data.TopHu)) {
            if (listGet.indexOf(key) > -1) {

                value.forEach(item => {
                    if (item.type == 10000 && !!item.red) {
                        if (Number($("#" + key).text().replace(/,/g, '')) < item.bet) {
                            countTo(key, $("#" + key).text().replace(/,/g, ''), item.bet);
                        }
                    }
                });
            }
        }
    }


    if (void 0 !== data.news) {
        if (void 0 !== data.news.t) {
            if (void 0 !== data.news.t.users) {
                if (data.news.t.status == 2) {
                    cuteToast({
                        type: "success", // or 'info', 'error', 'warning'
                        message: data.news.t.users.toUpperCase() + " vừa thắng " + numberWithCommas(data.news.t.bet) + " game " + data.news.t.game,
                        timer: 5000
                    })
                    setTimeout(() => {
                        playSound('assets/sound/winner.mp3');
                    }, 500);
                    const jsConfetti = new JSConfetti()
                    jsConfetti.addConfetti()
                }
            }

            if (void 0 !== data.news.t.user) {
                if (data.news.t.status == 2) {
                    cuteToast({
                            type: "success", // or 'info', 'error', 'warning'
                            message: data.news.t.user.toUpperCase() + " vừa thắng " + numberWithCommas(data.news.t.bet) + " game " + data.news.t.game,
                            timer: 5000
                        })
                        //const jsConfetti = new JSConfetti()
                        //jsConfetti.addConfetti()
                }
            }
        }
    }

};