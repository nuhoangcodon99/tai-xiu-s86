const initSenceIpBlackList = () => {
    $(".content-body").html(`
<div id="ipBlacklistElement"></div>
    `);
    ipBlacklistPopup();
};


const ipBlacklistPopup = () => {
    try {
        ws.send(`{"cms":{"ipblacklist":{"get_data":true}}}`);

        $("#ipBlacklistElement").html(`
            <!-- Modal -->
                <div class="modal fade" id="ipBlacklistModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Danh Sách IP Đang Chặn</h5>
                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" class="text-center">
                            <div class="form-group">
                                <textarea class="form-control" rows="30" id="listIpBlackList"  placeholder="Nhập các địa chỉ ip cần chặn, mỗi ip 1 dòng..."></textarea>
                            </div>
                            
                            <div id="btnUpdateIpBlackList" style="display: none;">
                                <button onclick="updateIpBlackList()" data-dismiss="modal" type="button" class="btn mb-1 btn-flat btn-primary">Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            `);
        $("#ipBlacklistModal").modal("toggle");
    } catch (e) {
        console.log(e.message);
    }
}

const ipBlacklistData = (data) => {
    $("#btnUpdateIpBlackList").show();
    let body = '';
    data.forEach(ip => {
        body += ip + "\n";
    });
    body = body.substring(0, body.length - 1);
    $("#listIpBlackList").val(body);
};

const updateIpBlackList = () => {
    try {
        let listIpBlackList = [];
        let stringList = $("#listIpBlackList").val();

        if (stringList) {
            const expList = stringList.split("\n");
            expList.forEach((ip) => {
                if (ip.length > 0) {
                    listIpBlackList.push(ip);
                }
            });
        }
        ws.send(`{"cms":{"ipblacklist":{"update": ${JSON.stringify(listIpBlackList)} }}}`);
    } catch (e) {
        console.log(e);
    }
};