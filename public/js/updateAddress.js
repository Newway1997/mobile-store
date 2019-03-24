$(function(){
    
    let oldAddress=sessionStorage.getItem("oldAddress");
    oldAddress=JSON.parse(oldAddress);
    
    let html = template('addressInfo', {
        result: oldAddress
    });
    console.log(html)
    $("#address-info").html(html);
    let _getParam = function (obj, param) {
        return obj[param] || '';
    };
    let cityPicker3 = new mui.PopPicker({
        layer: 3
    });
    cityPicker3.setData(cityData3);
    $("#selectcity").on('tap',function(){
        cityPicker3.show(function (items) {
            $("#selectcity").val(_getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text'));
            //返回 false 可以阻止选择框的关闭
            //return false;
        });
    });
    $("#update-btn").on('click',function(){
        let id=this.getAttribute("data-id");
        let receiver= $("[name='receiver']").val();
        let zipcode = $("[name='zipcode']").val();
        let address= $("[name='address'").val();
        let addressDetail = $("[name='addressDetail']").val();
        if (!receiver) {
            mui.toast("请输入收货人");
        } else if (!zipcode) {
            mui.toast("请输入邮编");
        } else if (!address) {
            mui.toast("请选择省市区");
        } else if (!addressDetail) {
            mui.toast("请输入详细地址")
        }  else {
            $.ajax({
                url: '/address/updateaddress',
                type: 'post',
                data: {
                    "id":id,
                    "receiver": receiver,
                    "zipcode":zipcode,
                    "address": address,
                    "addressDetail": addressDetail
                },
                success: function (res) {
                    if (res.meta.success) {
                        mui.toast("修改成功");
                        setTimeout(function () {
                            window.location.href = "address.html"
                        }, 1000);
                    }else{
                        mui.toast("修改失败");
                    }
                }
            })
        }
    })
})