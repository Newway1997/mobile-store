
$(function () {
    mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

//获取一级分类
    $.ajax({
        type: "GET",
        url: "/category/firstcategory",
        dataType: "json",
        success: function (res) {
            let html = template("category-first", {
                result: res.data
            });
            $(".classfy-left .links").html(html);

            if (res.data[0].id) {
                $(".classfy-left .links").find('li').eq(0).addClass('active');
                getSecondCategory(res.data[0].id);
            }
        },
        error: function (xhr, type) {
            console.log("Ajax error!");
        }
    });
//获取二级分类
    $(".classfy-left .links").on("click", "li", function () {
        let id = $(this).attr("data-id");
        $(this).addClass('active').siblings().removeClass('active');
        getSecondCategory(id);
    });

    $(".classfy-right .links").on("click","li",function(){
        let id = $(this).attr("data-id");
        location.href = "search-result.html?secondCategory=" + id;
    })
})

function getSecondCategory(id){
    $.ajax({
        type: "GET",
        url: "/category/secondcategory",
        dataType: "json",
        data: {
            id: id
        },
        success: function (res) {
            let html = template("category-second", {
                result: res.data
            });
            $(".classfy-right .links").html(html);
        },
        error: function (xhr, type) {
            console.log("Ajax error!");
        }
    });
}