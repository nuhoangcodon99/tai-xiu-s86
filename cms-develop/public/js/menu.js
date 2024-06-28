// INIT MENU CONTENT
const initMenu = (data) => {
    $("#menu").hide();
    $("#menu").html(`
<li class="nav-label">MAIN GAME</li>
<li id="taixiu_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('taixiu'))" aria-expanded="false">
        <i class="icon-ghost menu-icon"></i><span class="nav-text">TÀI XỈU</span>
    </a>
</li>
<li id="baucua_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('baucua'))" aria-expanded="false">
        <i class="icon-ghost menu-icon"></i><span class="nav-text">BẦU CUA</span>
    </a>
</li>
<li id="xocdia_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('xocdia'))" aria-expanded="false">
        <i class="icon-ghost menu-icon"></i><span class="nav-text">XÓC ĐĨA</span>
    </a>
</li>
<li id="rongho_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('rongho'))" aria-expanded="false">
        <i class="icon-ghost menu-icon"></i><span class="nav-text">RỒNG HỔ</span>
    </a>
</li>
<li class="nav-label">SLOT GAME</li>
<!-- <li id="caoboi_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('caoboi'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">CAO BỒI</span>
    </a>
</li> -->
<!-- <li id="sieuxe_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('sieuxe'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">SIÊU XE</span>
    </a>
</li> -->
<li id="royal_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('royal'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">PIRATE KING</span>
    </a>
</li>
<!-- <li id="dmanhhung_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('dmanhhung'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">DÒNG MÁU ANH HÙNG</span>
    </a>
</li> -->
<li id="sexandzen_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('sexandzen'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">NGỘ KHÔNG</span>
    </a>
</li>
<!-- <li id="daohaitac_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('daohaitac'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">ĐẠI HẢI TRÌNH</span>
    </a>
</li> -->

<li id="mini_poker_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('mini_poker'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">MINI POKER</span>
    </a>
</li>
<li id="mini3cay_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('mini3cay'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">MINI 3 CÂY</span>
    </a>
</li>
<li id="big_babol_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('big_babol'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">CANDY</span>
    </a>
</li>
<li id="angrybird_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('angrybird'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">PUBG</span>
    </a>
</li>
<li id="vq_red_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('vq_red'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">AI CẬP</span>
    </a>
</li>
<li id="candy_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('candy'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">KINGDOM</span>
    </a>
</li>
<li id="longlan_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('longlan'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">AVENGERS</span>
    </a>
</li>
<li id="zeus_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('zeus'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">LIÊN MINH</span>
    </a>
</li>
<!-- <li id="avenger_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('zeus'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">AVENGERS</span>
    </a>
</li> -->

<!-- <li id="tamhung_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('daohaitac'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">MEDUSA</span>
    </a>
</li> -->
<!-- <li id="tamhung_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('daohaitac'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">TAM HÙNG</span>
    </a>
</li> -->
<!-- <li id="tamhung_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('daohaitac'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">FROZEN</span>
    </a>
</li> -->
<li id="momo_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('momo'))" aria-expanded="false">
        <i class="icon-grid menu-icon"></i><span class="nav-text">CHẴN LẺ MOMO</span>
    </a>
</li>


<li class="nav-label">NẠP RÚT</li>
<li id="yeucaunapthe_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('yeucaunapthe'))" aria-expanded="false">
        <i class="icon-screen-tablet menu-icon"></i><span class="nav-text">YÊU CẦU NẠP THẺ</span>
    </a>
</li>
<li id="yeucaurutthe_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('yeucaurutthe'))" aria-expanded="false">
        <i class="icon-screen-tablet menu-icon"></i><span class="nav-text">YÊU CẦU RÚT THẺ</span>
    </a>
</li>
<li id="nganhangnap_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('nganhangnap'))" aria-expanded="false">
        <i class="icon-badge menu-icon"></i><span class="nav-text">NGÂN HÀNG - NẠP</span>
    </a>
</li>
<li id="nganhangrut_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('nganhangrut'))" aria-expanded="false">
        <i class="icon-badge menu-icon"></i><span class="nav-text">NGÂN HÀNG - RÚT</span>
    </a>
</li>
<li class="nav-label">THẺ CÀO - NGÂN HÀNG</li>
<li id="quanlythecao_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlythecao'))" aria-expanded="false">
        <i class="icon-notebook menu-icon"></i><span class="nav-text">QUẢN LÝ THẺ CÀO</span>
    </a>
</li>
<!-- 
<li id="quanlynganhang_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlynganhang'))" aria-expanded="false">
        <i class="icon-notebook menu-icon"></i><span class="nav-text">QUẢN LÝ NGÂN HÀNG</span>
    </a>
</li>
-->
<li id="giftcode_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('giftcode'))" aria-expanded="false">
        <i class="icon-badge menu-icon"></i><span class="nav-text">GIFTCODE</span>
    </a>
</li>
<li id="giftcodeone_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('giftcodeone'))" aria-expanded="false">
        <i class="icon-badge menu-icon"></i><span class="nav-text">GIFTCODE DÙNG 1 LẦN</span>
    </a>
</li>
<li class="nav-label">THÀNH VIÊN - ĐẠI LÝ</li>
<!-- 
<li id="quanlydaily_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlydaily'))" aria-expanded="false">
        <i class="icon-user menu-icon"></i><span class="nav-text">QUẢN LÝ ĐẠI LÝ</span>
    </a>
</li>
-->
<li id="quanlynguoidung_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlynguoidung'))" aria-expanded="false">
        <i class="icon-user menu-icon"></i><span class="nav-text">QUẢN LÝ NGƯỜI DÙNG</span>
    </a>
</li>
<li id="quanlycms_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlycms'))" aria-expanded="false">
        <i class="icon-user menu-icon"></i><span class="nav-text">QUẢN LÝ CMS</span>
    </a>
</li>
<li class="nav-label">LỊCH SỬ</li>
<li id="quanlydaily_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('lichsuchuyentien'))" aria-expanded="false">
        <i class="icon-graph menu-icon"></i><span class="nav-text">LỊCH SỬ CHUYỂN TIỀN</span>
    </a>
</li>
<li class="nav-label">HỆ THỐNG</li>
<li id="logcms_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('logcms'))" aria-expanded="false">
        <i class="icon-graph menu-icon"></i><span class="nav-text">LỊCH SỬ CMS</span>
    </a>
</li>
<li id="ipaccess_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('ipblacklist'))" aria-expanded="false">
        <i class="fa fa-exclamation-circle"></i><span class="nav-text">BLACKLIST IP</span>
    </a>
</li>
<li id="system_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('quanlyhethong'))" aria-expanded="false">
        <i class="icon-note menu-icon"></i><span class="nav-text">CÀI ĐẶT HỆ THỐNG</span>
    </a>
</li>
<li id="guithongbao_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('guithongbao'))" aria-expanded="false">
        <i class="fa fa-inbox  menu-icon"></i><span class="nav-text">GỬI THÔNG BÁO</span>
    </a>
</li>
<li id="cleartrash_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('cleartrash'))" aria-expanded="false">
        <i class="fa fa-trash"></i><span class="nav-text">DỌN DỮ LIỆU</span>
    </a>
</li>
<li class="nav-label">BẢO MẬT</li>
<li id="doimatkhau_Menu">
    <a class="has-arrow" href="javascript:void(callDataGame('doimatkhau'))" aria-expanded="false">
        <i class="icon-lock menu-icon"></i><span class="nav-text">ĐỔI MẬT KHẨU</span>
    </a>
</li>
<li id="doimatkhau_Menu">
    <a class="has-arrow" href="javascript:void(signOut())" aria-expanded="false">
        <i class="icon-key menu-icon"></i><span class="nav-text">ĐĂNG XUẤT</span>
    </a>
</li>
    `);
    const permission = data.currentlogin.permission;
    for (let [key, value] of Object.entries(permission)) {
        if (!value) $("#" + key + "_Menu").hide();
    }
    $("#menu").fadeIn();
}