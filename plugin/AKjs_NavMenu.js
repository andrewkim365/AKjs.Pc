/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_NavMenu-------------------------------------------*/
(function($){
    $.fn.AKjs_NavMenu = function(setting) {
        var option = $.extend({
                curDisplay: 3,
                activeText: "",
                LinePosition: "",
                LineClass: "",
                BoxPadding: 10,
                LineHeight: "",
                Callback: function(ele,index) {
                    console.log(index)
                },
                Hover: function(ele,index) {
                    console.log(index)
                }
            },
            setting);
        if (this.length > 0) {
            var $navBox = $(this);
            setTimeout(function() {
                var $navLi = $navBox.find("li");
                if ($navBox.children("abbr").length < 1) {
                    $navBox.children().addClass("rel ovh zindex_3");
                    $("<abbr />").appendTo($navBox);
                }
                $navLi.each(function() {
                    $(this).html("<span>"+$(this).text()+"</span>");
                });

                $navLi.removeClass("ak_navCur");
                $navLi.children("span").removeClass(option.activeText);

                router_url = document.location.hash.substring(1).split("?")[0];
                if (option.curDisplay) {
                    $navLi.eq(option.curDisplay-1).addClass("ak_navCur");
                    option.Callback($navLi.eq(option.curDisplay-1),option.curDisplay-1);
                } else {
                    $navLi.eq(0).addClass("ak_navCur");
                    option.Callback($navLi.eq(0),0);
                }

                var $navLiCur = $navBox.find(".ak_navCur");

                setTimeout(function() {
                    $navLiCur.each(function() {
                        $(this).children("span").addClass(option.activeText);
                    });
                },100);

                var $LiCurSlider = $navBox.children("abbr");
                var $LiTarget = $navLi.children("span");
                var $LiCurTarget = $navLiCur.children("span");

                var $LiCurPosition = $navLiCur.children("span").position().left;
                var $LiCurTop = $navLiCur.children("span").position().top;
                var $LiCurWidth = $navLiCur.children("span").outerWidth(true);
                var $LiCurHeight = $navLiCur.children("span").outerHeight(true);

                var $boxPadding = option.BoxPadding*2;

                $LiTarget.addClass("rel zindex_2");
                $LiCurSlider.addClass(option.LineClass).animate({
                    "left": $LiCurPosition - ($boxPadding/2),
                    "width": $LiCurWidth + $boxPadding
                });

                $(window).resize(function(){
                    var $LiCurPosition = $navLiCur.children("span").position().left;
                    var $LiCurTop = $navLiCur.children("span").position().top;
                    var $LiCurWidth = $navLiCur.children("span").outerWidth();
                    var $LiCurHeight = $navLiCur.children("span").outerHeight();

                    $LiCurSlider.css({
                        "left": $LiCurPosition - ($boxPadding/2),
                        "width": $LiCurWidth + $boxPadding
                    });
                    switch (option.LinePosition) {
                        case 'bottom':
                            $LiCurSlider.css({
                                "bottom": 0,
                                "height": option.LineHeight
                            });
                            break;
                        case 'top':
                            $LiCurSlider.css({
                                "top": 0,
                                "height": option.LineHeight
                            });
                            break;
                        default:
                            $LiCurSlider.css({
                                "top": $LiCurTop - ($boxPadding/2)/2,
                                "height": $LiCurHeight +  ($boxPadding/2)
                            });
                            break;
                    }
                });

                switch (option.LinePosition) {
                    case 'bottom':
                        $LiCurSlider.css({
                            "display": "block",
                            "position": "absolute",
                            "bottom": '0',
                            "height": option.LineHeight
                        });
                        break;
                    case 'top':
                        $LiCurSlider.css({
                            "display": "block",
                            "position": "absolute",
                            "top": '0',
                            "height": option.LineHeight
                        });
                        break;
                    default:
                        $LiCurSlider.css({
                            "display": "block",
                            "position": "absolute",
                            "top": $LiCurTop - ($boxPadding/2)/2,
                            "height": $LiCurHeight +  ($boxPadding/2)
                        });
                        break;
                }

                $navLi.mouseenter(function () {
                    var $_parent = $(this).children("span"),
                        _posWidth = $_parent.outerWidth(true),
                        _posLeft = $_parent.position().left;
                    if (option.LinePosition != "bottom" || option.LinePosition != "top") {
                        $LiCurSlider.stop().animate({
                            "left": _posLeft - ($boxPadding/2),
                            "width": _posWidth + $boxPadding
                        }, "fast");
                    } else {
                        $LiCurSlider.stop().animate({
                            "left": _posLeft,
                            "width": _posWidth
                        }, "fast");
                    }
                    setTimeout(function() {
                        $LiTarget.removeClass(option.activeText);
                        $_parent.addClass(option.activeText);
                    },100);
                    option.Hover($(this),$(this).index());
                });
                $navBox.mouseleave(function (posCur, posLeft, posWidth) {
                    posCur = $LiCurTarget;
                    posLeft = $LiCurPosition;
                    posWidth = $LiCurWidth;

                    if (option.LinePosition != "bottom" || option.LinePosition != "top") {
                        $LiCurSlider.stop().animate({
                            "left": posLeft - ($boxPadding/2),
                            "width": posWidth + $boxPadding
                        }, "fast");
                    } else {
                        $LiCurSlider.stop().animate({
                            "left": posLeft,
                            "width": posWidth
                        }, "fast");
                    }
                    setTimeout(function() {
                        $LiTarget.removeClass(option.activeText);
                        posCur.addClass(option.activeText);
                    },100);
                    option.Callback(posCur.parent(),posCur.parent().index());
                });
            },100);
        }
    };
}(jQuery));