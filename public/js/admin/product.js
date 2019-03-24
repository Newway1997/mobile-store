$(function () {
    let page = 1;
    let pageSize = 10;
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (res) {
            let html = template("category-select", {
                result: res.data
            });
            $("#newFirstCategoryName").html(html);
        }
    });
    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (res) {
            if (res.meta.success) {
                let html = template("product-result", {
                    result: res.data
                });
                $("#product-list").html(html);
            } else {
                alert(res.meta.message);
            }
        }
    });

    $('#ok').on('click', function () {
        if (!$('#proName').val()) {
            alert('请输入商品名称')
            return;
        } else if (!$('#proDesc').val()) {
            alert('请输入商品描述')
            return;
        } else if (!$('#num').val()) {
            alert('请输入商品数量')
            return;
        } else if (!$('#size').val()) {
            alert('请输入商品尺码')
            return;
        } else if (!$('#originPrice').val()) {
            alert('请输入原价')
            return
        } else if (!$('#curPrice').val()) {
            alert('请输入现价')
            return
        } else if (!$('#imgUrl').val()) {
            alert('请输入图片')
            return
        }

        let data = new FormData($('#postForm')[0]);
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.meta.success) {
                    location.reload();
                } else {
                    alert("仅支持png,jpg")
                }

            }
        });
    });

    $('#product-list').on('click','#change-status-btn',function(){
        let status=$(this).attr('data-status');
        let id=$(this).attr('data-id');
        let url;
        
        if(status==0){
            url="/product/disableProduct"
        }else{
            
            url="/product/enableProduct"
        }
        $.ajax({
            url: url,
            type: 'get',
            data:{
                id:id
            },
            success: function (res) {
                if (res.meta.success) {
                    window.location.reload();
                } else {
                    alert(res.meta.message);
                }
            }
        });
    })
})