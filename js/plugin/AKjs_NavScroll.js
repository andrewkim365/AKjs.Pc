/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_NavScroll--------------------------------------------*/
(function($){
    $.fn.AKjs_NavScroll = function(setting) {
        var option = $.extend({
                content_dom: "",
                line_style: "dis_block abs bor_top2 bor_title",
                active_corlor: "c_title",
                ClickCallback: function() {}
            },
            setting);
        var ele = $(this);
        var ele_list = ele.children().first().children();
        if (option.content_dom) {
            var ele_content = $(option.content_dom);
        } else {
            var ele_content = ele.children().last();
        }
        if (ele_list.children("sub").length < 1) {
            ele_list.append("<sub></sub>");
        }
        var ele_list_line = ele_list.children("sub");
        ele_list.css({
            "left": "0",
            "transform": "translate3d(0px, 0px, 0px)",
            "transition-duration": "0s"
        });
        ele_list.find("li").each(function(){
            ele_list_line.addClass(option.line_style).css({
                "left": "0"
            });
            ele_list.children().eq(0).addClass(option.active_corlor).siblings().removeClass(option.active_corlor);
        });
        var nav_w = ele_list.children().eq(0).width();
        ele_list_line.css({
            "width": nav_w,
            "top": ele_list.outerHeight()-3
        });
        ele_list.find("li").on('click', function(){
            nav_w=$(this).width();
            ele_list_line.stop(true);
            ele_list_line.animate({
                "left":$(this).position().left
            },300);
            ele_list_line.animate({
                "width": nav_w
            });
            $(this).addClass(option.active_corlor).siblings().removeClass(option.active_corlor);
            var fn_w = (ele.width() - nav_w) / 2;
            var fnl_l;
            var fnl_x = parseInt($(this).position().left);
            if (fnl_x <= fn_w) {
                fnl_l = 0;
            } else if (fn_w - fnl_x <= flb_w - fl_w) {
                fnl_l = flb_w - fl_w;
            } else {
                fnl_l = fn_w - fnl_x;
            }
            ele_list.animate({
                "left" : fnl_l
            }, 300);
            ele_content.animate({
                "left" : "-"+flb_w * $(this).index()
            }, 300);
            option.ClickCallback($(this),$(this).index());
        });
        setTimeout(function() {
            ak_SetStyle();
        }, 100);

        $(window).resize(function(){
            ak_SetStyle();
        });

        function ak_SetStyle() {
            fl_w = ele_list.width();
            flb_w = ele.width();
            ele_content.removeClass("dis_none");
            ele_content.children().css({"width": flb_w});
            ele_content.css({"width": ele_content.children().width() * ele_content.children().length});
        }

        ele_list.on('touchstart', function (e) {
            var touch1 = e.originalEvent.targetTouches[0];
            x1 = touch1.pageX;
            y1 = touch1.pageY;
            ty_left = parseInt($(this).css("left"));
        });
        ele_list.on('touchmove', function (e) {
            var touch2 = e.originalEvent.targetTouches[0];
            var x2 = touch2.pageX;
            var y2 = touch2.pageY;
            if(ty_left + x2 - x1>=0){
                $(this).css({
                    "left": "0",
                    "transform": "translate3d("+x2/4+"px, 0px, 0px)",
                    "transition-duration": "0s"
                });
            }else if(ty_left + x2 - x1<=flb_w-fl_w){
                $(this).css({
                    "left": flb_w-fl_w,
                    "transform": "translate3d(-"+x1/4+"px, 0px, 0px)",
                    "transition-duration": "0.2s"
                });
            }else{
                $(this).css({
                    "left": ty_left + x2 - x1
                });
            }
            if(Math.abs(y2-y1)>0){
                e.preventDefault();
            }
        });
        ele_list.on('touchend', function (e) {
            $(this).css({
                "transform": "translate3d(0px, 0px, 0px)",
                "transition-duration": "0s"
            });
        });
    };
}(jQuery));
