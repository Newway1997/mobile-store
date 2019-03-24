$(function () {
    $.ajax({
        type: "GET",
        url: "/cart/getCart",
        dataType: "json",
        success: function (res) {
            if (res.meta.success) {
                let html = template('cart-product', {
                    result: res.data
                });
                $('.mui-badge').html(res.data.length);
                localStorage.setItem("productLength",res.data.length);
                $("#cart-box").html(html);
            } else {
                mui.toast("失败");
            }
        },
        error: function (xhr, type) {
            console.log("Ajax error!");
        }
    });
})