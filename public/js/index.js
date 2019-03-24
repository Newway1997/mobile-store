let page = 1;
let pageSize = 6;
$(function () {
    $.ajax({
            type: "GET",
            url: "/product/queryProduct",
            dataType: "json",
            data: {
                page: page,
                pageSize: pageSize,
            },
            success: function (res) {
                if(res.meta.success&&res.data.length>0){
                    let html = template("some-product", {
                        result: res.data
                    });
                    $("#product-list").html(html);

                }

            }
        });
})