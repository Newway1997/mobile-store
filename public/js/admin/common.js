/*登陆拦截*/
    $.ajax({
        url: '/admin/checkLogin',
        type: 'get',
        async:false,
        success: function (res) {
            if (res.meta.success) {
              
            } else {
                location.href="login.html"
            }
        }
    });
    $(function(){
        $("#logout").on("click", function () {
            $.ajax({
                url: '/admin/logout',
                type: 'get',
                success: function (res) {
                    if (res.meta.success) {
                        alert("退出登录成功");
                        setTimeout(function () {
                            window.location.href = "login.html"
                        }, 1000);
                    } else {
                        alert(res.meta.message);
                    }
                }
            })
        });
    });
