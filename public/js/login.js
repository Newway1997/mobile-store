$(function () {
    $("#login-btn").on("click", function () {
        let username = $("[name='username']").val();
        let password = $("[name='password']").val();
        
        if (!username) {
            mui.toast("请输入用户名");
        } else if (!password) {
            mui.toast("请输入密码");
        }else{
            $.ajax({
                url: '/user/login',
                type: 'post',
                data:{
                    "username":username,
                    "password":password,
                },beforeSend:function(){
                    $("#login-btn").html("正在登录...");
                },
                success: function (res) {
                    $("#login-btn").html("登录");
                    if(res.meta.success){
                         mui.toast("登录成功");
                         
                         setTimeout(function(){
                             window.location.href="user.html"
                         },1000);
                    }else{
                       
                        mui.toast(res.meta.message);
                    }
                }
            })
        }
       
    });
});