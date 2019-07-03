$(function ($) {
    banner();
    initWidth();
    $('[data-toggle="tooltip"]').tooltip();
    $(".wjs-news .nav-tabs").on("click", "a", function () {
        $(".wjs-news h3").html($(this).data("title"));
    })

})
var banner = function () {

    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                    url: "js/data.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        window.data = data;
                        callback && callback(window.data);
                    }
                }
            )
        }
    }

    var reader = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768;
            /*准备数据 把数据转换成HTML格式*/
            var pointTemplate = template("point", {list: data.length});
            var imgUrlTemplate = template("imageUrl", {imgList: data, isM: isMobile});
            /*把字符渲染到页面中*/
            $(".carousel-indicators").html(pointTemplate);
            $(".carousel-inner").html(imgUrlTemplate);
        })
    }

    $(window).on("resize", function () {
        reader();
    }).trigger('resize');

    var startX = 0;
    var distence = 0;
    var ismove = false;
    $(".wjs-banner").on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    })
    $(".wjs-banner").on('touchmove', function (e) {
        distence = e.originalEvent.touches[0].clientX - startX;
        ismove = true;
    })
    $(".wjs-banner").on('touchend', function (e) {
        if (ismove && Math.abs(distence) > 50) {
            if (distence > 0) {
                $(".carousel").carousel('prev');
            } else {
                $(".carousel").carousel("next");
            }
        }
        startX = 0;
        distence = 0;
        ismove = false;
    })
}
var initWidth = function () {
    var $currentLi = $(".wjs-product .nav-tabs li");
    var liWidth = 0;
    $currentLi.each(function (item, i) {
        var $curr = $(this);
        liWidth += $curr.outerWidth(true);
    })
    $(".wjs-product .nav-tabs").width(liWidth);

    new IScroll($(".wjs-product-nav")[0], {
        iScrollX: true,
        iScrollY: false,
        click: true
    });
}
