/*
Modification Date: 2018-05-23
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_HoverBorder-------------------------------------------*/
(function($){
    $.fn.AKjs_HoverBorder = function(setting) {
        var option = $.extend({
                start_delay: 300,
                end_delay: 100,
                border: "1px",
                bor_color: ""
            },
            setting);
        var hborder = $(this);
        hborder.hover(function () {
            var obj = $(this);
            $(obj).find('.top_0.left_0').stop(true).animate({
                "height": $(obj).innerHeight()
            },option.start_delay);
            $(obj).find('.bottom_0.left_0').stop(true).delay(option.start_delay).animate({
                "width": $(obj).innerWidth()
            },option.start_delay);
            $(obj).find('.bottom_0.right_0').stop(true).animate({
                "height": $(obj).innerHeight()
            },option.start_delay);
            $(obj).find('.top_0.right_0').stop(true).delay(option.start_delay).animate({
                "width": $(obj).innerWidth()
            },option.start_delay);
        },function () {
            var obj = $(this);
            $(obj).find('.top_0.left_0').stop(true).delay(option.end_delay).animate({
                "height":'0px'
            },option.end_delay);
            $(obj).find('.bottom_0.left_0').stop(true).animate({
                "width":'0px'
            },option.end_delay);
            $(obj).find('.bottom_0.right_0').stop(true).delay(option.end_delay).animate({
                "height":'0px'
            },option.end_delay);
            $(obj).find('.top_0.right_0').stop(true).animate({
                "width":'0px'
            },option.end_delay);
        });
        hborder.each(function(){
            $(this).addClass("rel");
            if ($(this).children("span").length < 4) {
                $(this).append("<span class='abs zindex_4 top_0 left_0'></span>" +
                    "<span class='abs zindex_4 bottom_0 left_0'></span>" +
                    "<span class='abs zindex_4 bottom_0 right_0'></span>" +
                    "<span class='abs zindex_4 top_0 right_0'></span>");
            }
            $(this).find('.top_0.left_0').css({
                "border-left": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.bottom_0.left_0').css({
                "border-top": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.bottom_0.right_0').css({
                "border-right": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.top_0.right_0').css({
                "border-bottom": "solid "+option.border,
                "border-color": option.bor_color,
            });
        });
    };
}(jQuery));