let userInfo = null;
$.ajax({
    url: '/user/getUserInfo',
    type: 'get',
    async: false,
    success: function (res) {
        if (res.meta.success) {
            userInfo = res.data;
        } else {
            //未登录
            window.location.href = "login.html";
        }
    }
});
$(function () {

    $("#logout").on("click", function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {
                if (res.meta.success) {
                    mui.toast("退出登录成功");

                    localStorage.removeItem("productLength");
                    setTimeout(function () {
                        window.location.href = "index.html"
                    }, 1000);
                } else {
                    mui.toast(res.meta.message);
                }
            }
        })
    });
    if (userInfo!=null) {
        let html = template('userInfo', {
            user: userInfo
        });
        $("#user-info-show").html(html);
    }
})