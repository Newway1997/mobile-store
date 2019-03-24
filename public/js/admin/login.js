$.ajax({
    url: '/admin/checkLogin',
    type: 'get',
    async:false,
    success: function (res) {
        if (res.meta.success) {
          location.href="user.html"
        } else {
            
        }
    }
});
$(function(){
    $("#login-btn").on("click", function () {
        let username = $("[name='username']").val();
        let password = $("[name='password']").val();
        
        if (!username) {
            alert("请输入用户名");
        } else if (!password) {
            alert("请输入密码");
        }else{
            $.ajax({
                url: '/admin/login',
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
                         setTimeout(function(){
                             window.location.href="user.html"
                         },1000);
                    }else{
                       
                       alert("错误")
                    }
                }
            })
        }
       
    });
});