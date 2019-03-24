$(function () {
    $("#modify-btn").on('click', function (e) {
        let oldpass = $.trim($("[name='oldpass']").val());
        let newpass = $.trim($("[name='newpass']").val());
        let assignpass = $.trim($("[name='assignpass']").val());
        if (!oldpass) {
            mui.toast("请输入原密码");
        }  else if (!newpass) {
            mui.toast("请输入新密码");
        } else if (!assignpass) {
            mui.toast("请再次输入密码")
        } else if (assignpass != newpass) {
            mui.toast("两次输入密码不一致")
        } else {
            $.ajax({
                url: '/user/modifypass',
                type: 'post',
                data: {
                    "oldpass": oldpass,
                    "newpass": newpass
                },
                success: function (res) {
                    if (res.meta.success) {
                        mui.toast("修改成功");
                        setTimeout(function () {
                            window.location.href = "login.html"
                        }, 2000);
                    }
                }
            })
        }
    })

})