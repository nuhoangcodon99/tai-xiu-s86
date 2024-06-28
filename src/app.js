require('dotenv').config();
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Ho_Chi_Minh");
let cors = require('cors');
let Telegram = require('node-telegram-bot-api');
let TeleMsg = require('./app/Helpers/Telegram');
let TelegramBot = new Telegram(process.env.TELEGRAM_TOKEN, { polling: true });
let express = require('express');
let app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
let expressWs = require('express-ws')(app);
let bodyParser = require('body-parser');
let morgan = require('morgan');
// Setting & Connect to the Database
let configDB = require('./config/database');
let mongoose = require('mongoose');
require('mongoose-long')(mongoose); // INT 64bit
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(configDB.url, configDB.options); // kết nối tới database
// đọc dữ liệu from
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(morgan('combined'));
app.set('view engine', 'ejs'); // chỉ định view engine là ejs
app.set('views', './views'); // chỉ định thư mục view
// Serve static html, js, css, and image files from the 'public' directory
app.use(express.static('public'));
// server socket
let redT = expressWs.getWss();
process.redT = redT;
redT.telegram = TelegramBot;
global['redT'] = redT; // tạo biến global cho Socket chính để dùng ở mọi nơi
require('./app/Helpers/socketHelper')(redT); // Add function socket User && Admin
require('./app/Helpers/socketHelperAgency')(redT); // Add function socket Agency
require('./routes/routerHttp')(app, redT); // load các routes HTTP
require('./routes/routerSocket')(app, redT); // load các routes WebSocket
require('./app/Helpers/initDataSystem')(); // init data system
require('./app/Helpers/initDataHuGame'); // cấu hình tài khoản admin mặc định và các dữ liệu mặc định
require('./config/admin'); // cấu hình tài khoản admin mặc định và các dữ liệu mặc định
require('./app/Cron/baucua')(redT); // Chạy game Bầu Cua
require('./app/Cron/taixiu')(redT); // Chạy game Tài Xỉu
require('./app/Cron/taixiu/botChatTaixiu')(redT); // Chạy chat Tài Xỉu
require('./app/Cron/taixiu/TopTaiXiuUser')(redT); // Chạy top chơi Bầu Cua
require('./app/Cron/TopHu')(redT); // Chạy top hũ các game
// sử dụng nạp tiền momo
//require('./app/Cron/momo')(redT); // xử lý giao dịch momo
require('./app/Cron/thongke')(redT); // thống kê online ảo
require('./config/cronHu')(redT);
require('./config/cron')();
require('./app/Telegram/Telegram')(redT); // Telegram Bot

// set true false để import dữ liệu mẫu có sẵn
// vào theo đường dẫn bên dưới để config 
require('./app/Helpers/addPhienTaiXiu')(false); // tạo data phiên tài xỉu
require('./app/Helpers/initBotCreate')(false); // tạo người dùng bot
require('./app/Helpers/initBotChat')(false); // tạo nội dung bot chat tài xỉu
require('./app/Helpers/initTcgCreate')(false); // tạo account bên tcg
// Send notify when server started to Tele
TeleMsg(process.env.TELEGRAM_LOGS, `79BET-CO` + "\n" + `Server started at: ${ moment().format("DD/MM/YYYY h:mm:ss a") }` + "\n");

// // Utils Test
// const testCase = require('./utils/getUsers');
// testCase.getUser();

// export server handle
module.exports = app;