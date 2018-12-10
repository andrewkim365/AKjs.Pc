/*
Modification Date: 2018-12-04
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_HotspotMap------------------------------------------*/
(function($) {
    function Plugin(setting, option) {
        this.options = option;
        this.root = setting;
    }
    Plugin.prototype.init = function() {
        var _ele = this.root,
            _option = this.options,
            _html = "",
            _rect = "",
            _auto = "auto",
            _visible = "",
            _position = "",
            _left,
            _top,
            _html = _html + ('<img src="' + _ele.children("img").first().attr("src") + '">');
        _ele.addClass("ak-HotspotMrap");
        _ele.find("tooltip").addClass(".ak-Hotspot-object").each(function() {
            "rect" == $(this).data("type") ? (_rect = "ak-Hotspot-rect", _left = $(this).data("x"),
                _top = $(this).data("y")) : (_rect = "ak-Hotspot", _left = $(this).data("x") - $(this).data("width") / 2,
                _top = $(this).data("y") - $(this).data("height") / 2);
            _visible = "visible" == $(this).data("visible") ? "visible": "";
            _auto = !1 == $(this).data("tooltip-auto-width") ? $(this).data("tooltip-width") + "px": "auto";
            _position = $(this).data("popup-position");
            _html += '<div class="' + _rect + " " + _visible + " " + _position + ' ak-Hotspot-object" style="left: ' + _left + "px; top: " + _top + "px; width: " + $(this).data("width") + "px; height: " + $(this).data("height") + 'px;">';
            _html += '\t<div class="ak-Hotspot-shape"></div><div class="ak-Hotspot-shape-inner"></div><div class="ak-Hotspot-shape-inner-two"></div>';
            _html += '\t<div class="ak-Hotspot-tooltip-outer">';
            _html += '\t\t<div class="ak-Hotspot-ToolTip-wrap" style="width: ' + _auto + ';">';
            _html += '\t\t\t<div class="ak-Hotspot-ToolTip">';
            _html += $(this).html();
            _html += "\t\t\t</div>";
            _html += "\t\t</div>";
            _html += "\t</div>";
            _html += "</div>";
        });
        _ele.html(_html);
        AKjs_HashSharp();
        _ele.removeClass("dis_none dis_none_im");
        _ele.addClass(_option.show_on);
        _option.callback(_ele);
        _ele.find(".ak-Hotspot-shape-inner").addClass(" animated infinite "+_option.animated).css({
            "background-color":_option.btn_color
        });
        _ele.find(".ak-Hotspot-rect.visible .ak-Hotspot-shape").css({
            "border-color":_option.rect_color[0]
        });
        _ele.find(".ak-Hotspot-rect.visible .ak-Hotspot-shape-inner").css({
            "border-color":_option.rect_color[1]
        });
        if ("click" == _option.show_on) _ele.find(".ak-Hotspot-object").on("click", function() {
            $(this).toggleClass("visible-tooltip");
            if ($(this).hasClass("visible-tooltip")) {
                _option.showback(true,$(this));
            }
        });
        "mouseover" == _option.show_on && (_ele.find(".ak-Hotspot-object").on("mouseover", function() {
            $(this).addClass("visible-tooltip");
            if ($(this).hasClass("visible-tooltip")) {
                _option.showback(true,$(this));
            }
        }), _ele.find(".ak-Hotspot-object").on("mouseout", function() {
            $(this).removeClass("visible-tooltip");
            if (!$(this).hasClass("visible-tooltip")) {
                _option.showback(false,$(this));
            }
        }));
    };
    $.fn.AKjs_HotspotMap = function(setting) {
        option = $.extend(!0, {
            show_on: "mouseover",
            btn_color: "#ffffff",
            rect_color: ["#e12e63","#2a468d"],
            animated: "flash",
            callback:function(){
            },
            showback:function(){
            },
        }, setting);
        return this.each(function() {
            (new Plugin($(this), option)).init();
        });
    }
})(jQuery);