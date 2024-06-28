// SENCE LOGIN 

const login = () => {
    if (!$("#otpcode").val() || !$("#username").val() || !$("#password").val()) {
        cuteToast({
            type: "warning", // or 'info', 'error', 'warning'
            message: "Vui lòng nhập",
            timer: 3000
        });
        return;
    }

    const data = {
        authtype: "account",
        otp: $("#otpcode").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        ip: cmsLoginIpAndress
    }
    ws.send(JSON.stringify({ authentication: data }));
}

const loginGetOTP = () => {
    cuteToast({
        type: "success", // or 'info', 'error', 'warning'
        message: "Đã gửi mã OTP",
        timer: 5000
    });
    ws.send(JSON.stringify({ otp: { getotp: { ip: cmsLoginIpAndress } } }));
}

const clearSenceLogin = () => {
    $("#loginSence").fadeOut(700, () => {
        $("#loginSence").remove();
    });
}