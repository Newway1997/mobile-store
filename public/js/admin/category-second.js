$(function () {
    let page = 1;
    let pageSize = 10;
    let totalPage=1;
    getData(page,pageSize);

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
    $('#prev').on('click',function(){
        
        if(page<2){
            page=1;
            alert("已经是第一页了")
        }else{
            page--;
            getData(page,pageSize);
            location.reload();
        }
        
    });
    $('#next').on('click',function(){
        
        if(page>=totalPage){
            
            alert("已经是最后一页了")
        }else{
            page++;
            getData(page,pageSize);
            location.reload();
        }
        
    });
    $('#ok').on('click',function(){
        console.log($('#newLogo').val())
        if(!$('#newLogo').val()){
            alert('请输入文件')
            return;
        }else if(!$('#newCategoryName').val()){
            alert('请输入新类名')
            return 
        }
        let data = new FormData($('#postForm')[0]);
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if(res.meta.success){
                    location.reload();
                }else{
                    alert("仅支持png,jpg")
                }
                
            }
        });   
    });
})
function getData(page,pageSize){
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (res) {
            let html = template("category-result", {
                result: res.data
            });
            $("#category-list").html(html);
        }
    });
}