$(function () {
    // 按钮点击事件搜索功能
    let keyArr = [];
    $('#history-box').on('click','.history-item',function(e){
        let key=e.target.innerText;
        $('#search-content').val(key);
        let index=keyArr.indexOf(key);
        keyArr.splice(index,1);
        localStorage.setItem('keyArr', JSON.stringify(keyArr));
    });
    $('#search-button').on('click', function () {
        let keyword = $(this).siblings('input').val();
        if (keyword) {
            // 存储历史关键字
            keyArr.unshift(keyword);
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            location.href = "search-result.html?keyword=" + keyword;
        } else {
            alert("请输入要搜索商品关键字")
        }
    });
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem("keyArr"))
        let html = template('history', {
            result: keyArr
        });
        $('#history-box').html(html);
    }
    $("#clear-history").on('click', function () {
        localStorage.removeItem('keyArr');
        keyArr=[];
        $('#history-box').html('');
    });
})