$(function () {
    let page = 1;
    let pageSize = 10;
    let totalPage=1;
    getData(page,pageSize);
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
        $.ajax({
            url: '/category/addCategory',
            type: 'post',
            data: {
                categoryName:$('#newCategoryName').val()
            },
            success: function (res) {
                location.reload();
            }
        });
        
        
    });
})
function getData(page,pageSize){
    $.ajax({
        url: '/category/queryTopCategoryPaging',
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