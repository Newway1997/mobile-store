let address=null;
$(function () {
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            if (res.meta.success) {
                if (res.data) {
                    address=res.data;
                    let html = template('addressInfo', {
                        result: res.data
                    });
                    $("#address-info-list").html(html);
                }

            } else {
                mui.toast(res.meta.message);
            }
        }
    })
    $("#address-info-list").on("click", ".deleteAddress", function (e) {
        let id=this.getAttribute("data-id");
        let li=this.parentNode.parentNode;
        mui.confirm("确认要删除吗？", function (e) {
            if (e.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'get',
                    data:{
                        id:id
                    },
                    success: function (res) {
                        if (res.meta.success) {
    
                            location.reload();
                            
                        } else {
                            mui.toast("删除失败");
                        }
                    }
                })
            } else {
                //取消删除
                console.log(li)
                mui.swipeoutClose(li);
            }
        });

    });
    //修改地址
    $("#address-info-list").on("click", ".updateAddress", function (e) {
        let id=this.getAttribute("data-id");
        let tempAddress=address.filter(item=>item.id==id)[0];
        sessionStorage.setItem("oldAddress",JSON.stringify(tempAddress))
        window.location.href="updateAddress.html";

    });
})