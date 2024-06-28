module.exports = {
    'extract': 0, // Chiết khẩu 0%
    'URL': 'https://baotrung.vn', // URL API
    'PARTNER_ID': '9174287561', // Token
    'PARTNER_KEY': '4c385e934eaadb6e5c697684bd83d74b', // KEY

    '99': 'Đang nạp...',
    '1': 'Nạp thẻ cào thành công.',
    '2': 'Thẻ cào sai mệnh giá.',
    '3': 'Thẻ cào không đúng hoặc đã qua sử dụng.',
    '4': 'Hệ thống đang bảo trì, giữ lại thẻ và quay lại sau.',
    '311': 'Thẻ sai định dạng.',

    'VIETTEL': 'vt',
    'VINAPHONE': 'vn',
    'MOBIFONE': 'mb'

    // stt (int): trạng thái gửi thẻ
    // •   1: đăng ký thẻ thành công, thẻ đã được xử lý hoàn tất
    // •   0: thẻ không được chấp nhận, kiểm tra mã và serial, hoặc thẻ đã tồn tại -> KHÔNG ĐƯỢC GỬI LẠI THẺ NÀY
    // •   -1: server đang bận, hãy gửi lại thẻ sau ít phút
    // •   -2: mã API key không đúng
    // ex_stt (int): trạng thái gạch thẻ
    // •   00, "Giao dịch thành công"
    // •   99, "Lỗi, tuy nhiên lỗi chưa được định nghĩa hoặc chưa xác định được nguyên nhân"
    // •   01, "Lỗi, địa chỉ IP truy cập API bị từ chối"
    // •   02, "Lỗi, tham số chưa chính xác (thường sai tên tham số hoặc thiếu tham số)"
    // •   03, "Lỗi, Mã cp không tồn tại hoặc tài khoản cp đang bị khóa"
    // •   04, "Lỗi, chữ ký không chính xác"
    // •   05, "Tài khoản cp không tồn tại"
    // •   06, "Tài khoản cp đang bị khóa hoặc bị phong tỏa, không thể thực giao dịch nạp tiền"
    // •   07, "Thẻ đã được sử dụng"
    // •   08, "Thẻ bị khóa"
    // •   09, "Thẻ hết hạn sử dụng"
    // •   10, "Thẻ chưa được kích hoạt hoặc không tồn tại"
    // •   11, "Mã thẻ sai định dạng"
    // •   12, "Sai số serial của thẻ"
    // •   13, "Thẻ chưa được kích hoạt hoặc không tồn tại"
    // •   14, "Thẻ không tồn tại"
    // •   15, "Thẻ không sử dụng được"
    // •   16, "Số lần thử (nhập sai liên tiếp) của thẻ vượt quá giới hạn cho phép"
    // •   17, "Hệ thống Telco bị lỗi hoặc quá tải, thẻ chưa bị trừ"
    // •   18, "Hệ thống Telco bị lỗi hoặc quá tải, thẻ có thể bị trừ, cần đối soát lại"
    // •   19, "Kết nối tới Telco bị lỗi, thẻ chưa bị trừ"
    // •   20, "Kết nối tới telco thành công, thẻ có thể bị trừ nhưng chưa rõ kết quả" }
    // msg: kết quả, nội dung thông báo
    // data: { 
    // 	id: id của thẻ được đăng ký trên hệ thống
    // 	card_amount: mệnh giá thực của thẻ
    // 	status: trạng thái thẻ
    // 	•   success: nạp thẻ thành công 
    // 	•   card_fail: thẻ sai
    // 	•   delete: thẻ bị từ chối
    // }



};