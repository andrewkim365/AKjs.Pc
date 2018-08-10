/*
Modification Date: 2018-07-02
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ImgSubject-------------------------------------------*/
(function($){
    $.fn.AKjs_ImgSubject = function(setting) {
        var option = $.extend({
                delay: 400,
                img_hover: true,
                img_height: "",
                height: [],
                Hoverback: function() {},
                Visitedback: function() {}
            },
            setting);
        var imgsubject = $(this);
        imgsubject.mouseenter(function(){
            $(this).children().last().stop().animate({
                "height": option.height[1],
                "line-height": option.height[1]
            },option.delay);
            if (option.img_hover) {
                $(this).find("img").stop().animate({
                    width: 1.5 * $(this).find("img").parent("figure").outerWidth(),
                    height: 1.5 * $(this).find("img").parent("figure").outerHeight(),
                    left:("-"+(0.5 * $(this).find("img").parent().width())/2),
                    top:("-"+(0.5 * $(this).find("img").parent().height())/2)
                },option.delay);
                option.Hoverback($(this));
            }
        });
        imgsubject.mouseleave(function(){
            $(this).children().last().stop().animate({
                "height": option.height[0],
                "line-height": option.height[0]
            },option.delay);
            if (option.img_hover) {
                $(this).find("img").stop().animate({
                    width: $(this).find("img").parent("figure").outerWidth(),
                    height: $(this).find("img").parent("figure").outerHeight(),
                    left: 0,
                    top: 0
                }, option.delay);
                option.Visitedback($(this));
            }
        });
        imgSetting();
        $(window).resize(function(){
            imgSetting();
        });
        function imgSetting() {
            imgsubject.each(function(){
                $(this).children().last().css({
                    "height": option.height[0],
                    "line-height": option.height[0]
                });
                $(this).find("img").css({
                    "width": $(this).find("img").parent("figure").outerWidth(),
                    "height": option.img_height,
                    "position": "absolute"
                });
                $(this).find("img").parent("figure").css({
                    "position": "relative",
                    "overflow": "hidden",
                    "height": option.img_height
                });
            });
        }
    };
}(jQuery));