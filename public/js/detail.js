let lastnum = 0;
let isSelectSize = false;
let size = 0;
let prodcutId;
$(function () {
    let url = window.location.href;
    let params = getParamFromUrl(url);
    let id = params['id'];

    $('#prodcut-info-list').on('focusin', '#num', function (event) {
        event.stopImmediatePropagation();
    });
    $.ajax({
        type: "GET",
        url: "/product/queryProductDetail",
        dataType: "json",
        data: {
            id: id
        },
        success: function (res) {
            if (res.meta.success) {
                productInfo = res.data[0];
                prodcutId = productInfo.id;
                lastnum = productInfo.num;
                let html = template('productInfo', {
                    result: productInfo
                });
                $("#prodcut-info-list").html(html);
            } else {}
        },
        error: function (xhr, type) {
            console.log("Ajax error!");
        }
    });
    $('#prodcut-info-list').on('tap', '.size span', function () {

        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active").siblings('span').removeClass('active');
        }
        isSelectSize = true;
        size = $(this).html();
    });
    $('#prodcut-info-list').on('click', '#increase', function () {

        let value = $('#num').val();
        if (value < lastnum) {
            $('#num').val(++value);
        }

    })
    $('#prodcut-info-list').on('click', '#reduce', function () {

        let value = $('#num').val()
        if (value > 1) {
            $('#num').val(--value);
        }

    })
    $('#prodcut-info-list').on('tap', '#add-cart', function () {
        if (isSelectSize) {
            $.ajax({
                type: "POST",
                url: "/cart/addCart",
                dataType: "json",
                data: {
                    productId: prodcutId,
                    size: size,
                    num: $('#num').val()
                },
                success: function (res) {
                    if (res.meta.success) {
                        mui.confirm("加入购物车成功，跳转到购物车？", function (msg) {
                            if (msg.index == 1) {
                                location.href="cart.html";
                            } else {

                            }
                        });
                    } else {
                        mui.toast("加入失败");
                    }
                },
                error: function (xhr, type) {
                    console.log("Ajax error!");
                }
            });
        } else {
            alert("请先选择尺码")
        }

    })
})

function getParamFromUrl(url) {
    if (url.indexOf('?') == -1) {
        return {};
    }
    url = url.substring(url.indexOf('?') + 1);
    let params_str = url.split('&');
    let params = {}
    for (let i = 0; i < params_str.length; i++) {
        let arr = params_str[i].split('=');
        params[arr[0]] = arr[1];
    }
    return params;
}