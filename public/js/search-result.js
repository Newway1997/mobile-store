$(function () {

    mui.init({
        pullRefresh: {
            container: '#refreshContainer',
            up: {
                auto: true,
                contentrefresh: '正在加载...',
                contentnomore: '没有更多数据了',
                callback: getData
            }
        }
    });
    $('#price-sort').on('tap', function () {
        priceSort = priceSort == 1 ? 2 : 1;
        html = '';
        page = 1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });
});
let page = 1;
let html = '';
let priceSort = 1;
let This = null;

function getData() {
    let pageSize = 6;
    let url = window.location.href;
    let params = getParamFromUrl(url);
    let proName = params['keyword'];
    let secondCategory=params['secondCategory'];
    if (!This) {
        This = this;
    }

    $.ajax({
        type: "GET",
        url: "/product/queryProduct",
        dataType: "json",
        data: {
            page: page,
            pageSize: pageSize,
            proName: proName,
            price: priceSort,
            secondCategory:secondCategory
        },
        success: function (res) {
            if (res.data.length < 1) {
                This.endPullupToRefresh(true);
            } else {
                html += template("search-product", {
                    result: res.data
                });
                $("#product-box").html(html);
                This.endPullupToRefresh(false);

                page++;
            }

        },
        error: function (xhr, type) {
            console.log("Ajax error!");
        }
    });
}

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