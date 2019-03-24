$(function () {
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        success: function (res) {
            if (res.meta.success) {
                let html = template("user-result", {
                    result: res.data
                });
                $("#user-list").html(html);
            } else {
                alert(res.meta.message);
            }
        }
    });
    $('#user-list').on('click','#change-status-btn',function(){
        let status=$(this).attr('data-status');
        let id=$(this).attr('data-id');
        let url;
        
        if(status==0){
            url="/user/disableUser"
        }else{
            
            url="/user/enableUser"
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