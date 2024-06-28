const Helpers = require('../../../../Helpers/Helpers');

let set_mode = (client, data) => {
    if (!!data) {
        if (!data.set_mode) return void 0;
        let mode = data.set_mode.toString();
        Helpers.setDataContent('taixiuAiMode', mode);
        client.red({ notice: { title: 'THÀNH CÔNG', text: 'Đặt chế độ thành công...' } });
    }
}

let get_mode = (client) => {
    const currentMode = Helpers.getDataContent('taixiuAiMode');
    client.red({ taixiu: { mode: currentMode } });
}

module.exports = function(client, data) {
    if (void 0 !== data.set_mode) {
        set_mode(client, data);
    }
    if (void 0 !== data.get_mode) {
        get_mode(client);
    }
}