$(function () {
    $("#register-btn").on("click", function () {
        let username = $("[name='username']").val();
        let password = $("[name='password']").val();
        let mobile = $("[name='mobile'").val();
        let vcode = $("[name='vcode']").val();
        let assignpass = $("[name='assignpass']").val();
        if (!username) {
            mui.toast("请输入用户名");
        } else if (mobile.length < 11) {
            mui.toast("请输入合法手机号");
        } else if (!password) {
            mui.toast("请输入密码");
        } else if (!vcode) {
            mui.toast("请输入验证码")
        } else if (assignpass != password) {
            mui.toast("两次密码不一致")
        } else {
            $.ajax({
                url: '/user/register',
                type: 'post',
                data: {
                    "username": username,
                    "password": password,
                    "mobile": mobile,
                    "vcode": vcode
                },
                success: function (res) {
                    if (res.meta.success) {
                        mui.toast("注册成功");
                        setTimeout(function () {
                            window.location.href = "login.html"
                        }, 2000);
                    }
                }
            })
        }

    });

    $("#getCode").on('click', function () {
        $.ajax({
            url: '/user/vcode',
            type: 'get',
            success: function (res) {
                console.log(res.data.vcode)
            }
        })
    })
});