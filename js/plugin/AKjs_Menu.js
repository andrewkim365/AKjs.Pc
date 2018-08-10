/*
Modification Date: 2018-06-04
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Menu--------------------------------------------*/
(function($){
    $.fn.AKjs_Menu = function(setting) {
        var option = $.extend({
                icon_text: [],
                btn_color: "",
                active_color: "",
                menu_icon: new Array(),
                menu_icon_active: new Array(),
                Callback: function() {}
            },
            setting);
        var ak_menu_btn = $(this);
        ak_MenuSetting();
        $(window).bind('hashchange', function () {
            ak_MenuSetting();
        });
        function ak_MenuSetting() {

            ak_menu_btn.each(function () {
                var index = $(this).index();
                if ($(this).attr("data-href")) {
                    var data_href = $(this).attr("data-href").split("?")[0];
                }
                $(this).find(option.icon_text[0]).addClass(option.menu_icon[index]);
                $(this).removeClass(option.active_color).addClass(option.btn_color);
                if (document.location.hash.indexOf(data_href) != -1 || document.location.hash.substring(1).split("?")[0].indexOf(data_href) != -1) {
                    ak_menu_btn.removeClass(option.active_color).addClass(option.btn_color);
                    $(this).find(option.icon_text[0]).removeClass(option.menu_icon[index]);
                    $(this).find(option.icon_text[0]).addClass(option.menu_icon_active[index]);
                    $(this).addClass(option.active_color).removeClass(option.btn_color);
                    option.Callback($(this),index+1);
                } else if (document.location.hash.substring(1).split("?")[0] == "") {
                    ak_menu_btn.eq(0).find(option.icon_text[0]).removeClass(option.menu_icon[0]).addClass(option.menu_icon_active[0]);
                    ak_menu_btn.eq(0).addClass(option.active_color).removeClass(option.btn_color);
                } else if (document.location.hash.substring(1).split("?")[0].indexOf(data_href) == -1) {
                    $(this).find(option.icon_text[0]).removeClass(option.menu_icon_active[index]);
                    $(this).removeClass(option.active_color).addClass(option.btn_color);
                    if ($("ak-menu-code").length > 0) {
                        $("ak-menu-code").hide();
                        if ($(this).attr("data-code") == $("ak-menu-code").text()) {
                            $(this).find(option.icon_text[0]).removeClass(option.menu_icon[index]);
                            $(this).find(option.icon_text[0]).addClass(option.menu_icon_active[index]);
                            $(this).addClass(option.active_color).removeClass(option.btn_color);
                            setTimeout(function() {
                                $("ak-menu-code").remove();
                            }, 500);
                        }
                    }
                }
            });
        }
    }
}(jQuery));