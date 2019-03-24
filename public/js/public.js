$(function(){
    if(localStorage.getItem("productLength")){
        $('.mui-badge').css("visibility","visible");
        $('.mui-badge').html(localStorage.getItem("productLength"));
    }else{
        $('.mui-badge').css("visibility","hidden");
    }

    //恢复mui禁用的a标签
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr('href')
        })
    })
})