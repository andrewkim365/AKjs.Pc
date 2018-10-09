/*
Modification Date: 2018-10-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ProductPhoto-------------------------------------*/
(function($){
    $.fn.AKjs_ProductPhoto = function(setting) {
        var option = $.extend({
                data: [],
                large_size: [],
                small_size: "",
                state: "bor_title",
                vis: 5,
                autoPlay: true,
                playDelay: 3000,
                callback: function() {},
                changeback: function() {}
            },
            setting);
        return this.each(function() {
            var $this = $(this);
            $this.html("<div class=\"ak-large_box\"><ul></ul></div>" +
                "<div class=\"ak-small_box\"><button class=\"ak-is_prev\"><i class=\"icon-ln_fanhui_a\"></i></button><div><ol></ol></div><button class=\"ak-is_next\"><i class=\"icon-ln_qianjin_a\"></i></button></div>");
            var $large_elem = $(this).children(".ak-large_box");
            var $large_list = $(this).children(".ak-large_box").children("ul");
            var $small_elem = $(this).children(".ak-small_box");
            var $small_list = $(this).children(".ak-small_box").children("div");
            var large_tmp = "";
            var small_tmp = "";
            for (var i = 0; i < option.data.length; i++) {
                large_tmp += '<li data-id="' + option.data[i].id + '"><img src="' + option.data[i].small + '" /></li>';
                small_tmp += '<li data-id="' + option.data[i].id + '"><figure><img src="' + option.data[i].small + '" /></figure></li>';
            }
            $large_list.html(large_tmp);
            $small_list.children("ol").html(small_tmp);

            $(window).resize(function () {
                var w = $small_list.find("li").outerWidth();
                var ChangeBtn = $small_elem.children("button");
                $small_elem.css({
                    "width":$large_elem.outerWidth(),
                    "height":option.small_size
                });
                $small_list.css({
                    "width":w * option.vis
                });
                ChangeBtn.css({
                    "width":($small_elem.outerWidth() - $small_list.outerWidth()) /2,
                    "max-width": "2.8em"
                });
                $small_list.css({
                    "width":w * option.vis,
                    "margin-left": ChangeBtn.outerWidth()
                });
            });
            var t = 0;
            if (option.large_size) {
                $large_elem.css({
                    "width":option.large_size[0],
                    "height":option.large_size[1]
                });
            } else {
                $large_elem.css({
                    "width": "100%",
                    "height": "100%"
                });
            }
            $large_list.children("li").eq(0).show();
            $small_list.find("li").css({
                "width":option.small_size
            });
            $small_list.find("li").eq(0).addClass("ak-is_active");
            $small_list.find("li").eq(0).children("figure").addClass(option.state);
            option.callback($large_list.children("li").eq(0), $small_list.find("li").eq(0), 0);
            var l = $small_list.find("li").length;
            var l_mean;
            if (l < option.vis) {
                l_mean = 0;
                $small_elem.children("button").hide();
                $small_list.addClass("ml_0");
            } else {
                l_mean = ((parseInt(l / option.vis) - 1) * option.vis) + (l % option.vis);
            }
            var w = $small_list.find("li").outerWidth();
            var ChangeBtn = $small_elem.children("button");
            $small_elem.css({
                "width":$large_elem.outerWidth(),
                "height":option.small_size
            });
            $small_list.css({
                "width":w * option.vis
            });
            $small_list.children("ol").css({
                "width": l * w
            });
            ChangeBtn.css({
                "width":($small_elem.outerWidth() - $small_list.outerWidth()) /2,
                "max-width": "2.8em"
            });
            $small_list.css({
                "width":w * option.vis,
                "margin-left": ChangeBtn.outerWidth()
            });
            $small_list.find("li").children("figure").css({
                "height":$small_list.find("li").outerHeight() - ($small_list.find("li").children("figure").outerHeight() - $small_list.find("li").outerHeight())
            });
            $small_list.find("li").unbind("click");
            $small_list.find("li").click(function() {
                $(this).addClass("ak-is_active").siblings().removeClass("ak-is_active");
                t = $(this).index();
                Img($(this).index());
                $small_list.find("li").children("figure").removeClass(option.state);
                $(this).children("figure").addClass(option.state);
                option.changeback($large_list.children("li").eq($(this).index()), $(this), $(this).index());
            });
            $small_elem.children(".ak-is_prev").unbind("click");
            $small_elem.children(".ak-is_prev").click(function() {
                var i;
                $small_list.find("li").each(function(index) {
                    if ($(this).hasClass("ak-is_active")) {
                        i = index;
                        $(this).children("figure").addClass(option.state);
                    } else {
                        $(this).children("figure").removeClass(option.state);
                    }
                });
                i--;
                if (i < 0) {
                    i = l - 1;
                }
                t = i;
                Img(i);
                option.changeback($large_list.children("li").eq(i), $small_list.find("li").eq(i), i);
            });
            $small_elem.children(".ak-is_next").unbind("click");
            $small_elem.children(".ak-is_next").click(function() {
                var i;
                $small_list.find("li").each(function(index) {
                    if ($(this).hasClass("ak-is_active")) {
                        i = index;
                        $(this).children("figure").addClass(option.state);
                    } else {
                        $(this).children("figure").removeClass(option.state);
                    }
                });
                i++;
                if (i > l - 1) {
                    i = 0;
                }
                t = i;
                Img(i);
                option.changeback($large_list.children("li").eq(i), $small_list.find("li").eq(i), i);
            });
            function Img(i) {
                $large_list.children("li").eq(i).fadeIn().siblings().hide();
                $small_list.find("li").eq(i).addClass("ak-is_active").siblings().removeClass("ak-is_active");
                $small_list.find("li").children("figure").removeClass(option.state);
                $small_list.find("li").eq(i).children("figure").addClass(option.state);
                var ml = i * w;
                if (ml <= l_mean * w) {
                    $small_list.children("ol").stop().animate({
                        marginLeft: -ml + "px"
                    }, option.speed);
                } else {
                    $small_list.children("ol").stop().animate({
                        marginLeft: -(l_mean * w) + "px"
                    }, option.speed);
                }
            }
            if (option.autoPlay) {
                var timing = setInterval(function() {
                    t++;
                    if (t > l - 1) {
                        t = 0;
                    }
                    option.changeback($large_list.children("li").eq(t), $small_list.find("li").eq(t), t);
                    Img(t);
                }, option.playDelay);
                $this.hover(function() {
                    clearInterval(timing);
                }, function() {
                    timing = setInterval(function() {
                        t++;
                        if (t > l - 1) {
                            t = 0;
                        }
                        option.changeback($large_list.children("li").eq(t), $small_list.find("li").eq(t), t);
                        Img(t);
                    }, option.playDelay);
                });
            }
        })
    }
}(jQuery));