/*
Modification Date: 2018-09-29
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Scrollbar--------------------------------------------*/
(function($) {
    $.fn.AKjs_Scrollbar = function(options) {
        var setting = {
            children: "",
            speed: 25,
            barMargin: 2,
            barWidth: 8,
            barColor: "rgba(0,0,0,0.5)",
            barMDColor: "rgba(0,0,0,0.7)",
            boxColor: "rgba(0,0,0,0.3)",
            isBox: true,
            isBar: true,
            callback: function() {}
        };
        var opts = $.extend({},
            setting, options);
        var color = {
            "box": opts.boxColor,
            "bar": opts.barColor,
            "barMD": opts.barMDColor
        };
        var w = {};
        var sMouseWheel = "mousewheel";
        if (!("onmousewheel" in document)) {
            sMouseWheel = "DOMMouseScroll";
        }
        var hash = this;
        $(function () {
            $(hash).each(function() {
                var elem = $(this);
                elem.css({
                    "overflow": "hidden"
                });
                if (elem.find("#ak-scrollbar").length < 1) {
                    elem.children().wrapAll("<div id='ak-scrollbar' />");
                }
                var elChild = elem.children("#ak-scrollbar");
                elChild.css({
                    "position": "absolute",
                    "width": "100%",
                    "left": "0"
                });
                $(window).resize(function() {
                    var ScrollBox = elem.find("#ak-scrollbar-ScrollBox");
                    var ScrollBars = elem.find("#ak-scrollbar-ScrollBars");
                    var iRate = elem.innerHeight() / elChild.outerHeight();
                    var iScrollBoxHeight = ScrollBox.innerHeight();
                    var iScrollBarHeight = Math.round(iRate * iScrollBoxHeight);
                    if (iRate >= 1) {
                        ScrollBox.hide();
                        ScrollBars.css("height", 0)
                    } else {
                        ScrollBars.css("height", iScrollBarHeight);
                    }
                });
                var sham = $("<div id='ak-scrollbar-sham' style='position:relative;background:transparent;z-index:-1;height:" + elChild.outerHeight() + "px'></div>");
                var ScrollBox = $("<div id='ak-scrollbar-ScrollBox' style='position:absolute;opacity:" + (opts.isBox ? 1 : 0) + ";width:" + opts.barWidth + "px;top:" + opts.barMargin + "px;right:" + opts.barMargin + "px;bottom:" + opts.barMargin + "px;border-radius: 5px;background: " + color.box + ";'></div>");
                var ScrollBars = $("<div id='ak-scrollbar-ScrollBars' style='position:absolute;opacity:" + (opts.isBar ? 1 : 0) + ";width:" + opts.barWidth + "px;top:" + opts.barMargin + "px;right:" + opts.barMargin + "px;border-radius: 5px;background: " + color.bar + ";'></div>");
                if (elem.find("#ak-scrollbar-ScrollBox").length < 1) {
                    sham.appendTo(elem);
                    ScrollBox.appendTo(elem);
                    ScrollBars.appendTo(elem);
                }
                var iRate = elem.innerHeight() / elChild.outerHeight();
                var iScrollBoxHeight = ScrollBox.innerHeight();
                var iScrollBarHeight = Math.round(iRate * iScrollBoxHeight);
                if (iRate >= 1) {
                    ScrollBox.hide();
                    ScrollBars.css("height", 0);
                } else {
                    ScrollBars.css("height", iScrollBarHeight);
                }
                var iMinTop = elem.innerHeight() - elChild.outerHeight();
                var sMaxTop = iScrollBoxHeight - iScrollBarHeight + opts.barMargin;
                elem.on("mouseenter", function() {
                    w.MouseInScroll = true;
                    ScrollBars.css({
                        "opacity": 1
                    });
                    fnContentResize();
                });
                elem.on("mouseleave", function() {
                    if (!opts.isBar) {
                        ScrollBars.css({
                            "opacity": 0
                        })
                    }
                    w.MouseInScroll = false;
                });
                elem.on("mouseup", function() {
                    ScrollBars.css({
                        "opacity": 1
                    });
                    setTimeout(function() {
                        fnContentResize();
                    }, 200);
                });
                elem.on(sMouseWheel, function(ev) {
                    ev = ev.originalEvent;
                    if (iRate >= 1) {
                        return
                    }
                    if (ev.wheelDelta) {
                        iWheelDelta = ev.wheelDelta / 120
                    } else {
                        iWheelDelta = -ev.detail / 3
                    }
                    iMinTop = elem.innerHeight() - elChild.outerHeight();
                    if (iMinTop > 0) {
                        elChild.css("top", 0);
                        return;
                    }
                    var iTop = parseInt(elChild.css("top"));
                    var iTop = iTop + opts.speed * iWheelDelta;
                    iTop = iTop > 0 ? 0 : iTop;
                    iTop = iTop < iMinTop ? iMinTop: iTop;
                    elChild.css("top", iTop);
                    fnScrollContent(elem, elChild, ScrollBox, ScrollBars, opts.barMargin);
                });
                var isS_B = false,
                    doc_py, barTop, conTop;
                ScrollBars.on("mousedown", function(ev) {
                    isS_B = true;
                    elem.css({
                        "-moz-user-select": "none",
                        "-khtml-user-select": "none",
                        "user-select": "none"
                    });
                    ScrollBars.css({
                        "background": color.barMD
                    });
                    barTop = parseInt(ScrollBars.css("top"));
                    conTop = parseInt(elChild.css("top"));
                });
                $(document).on("mousedown", function(ev) {
                    if (isS_B) {
                        doc_py = ev.pageY;
                    }
                });
                $(document).on("mousemove", function(ev) {
                    if (isS_B) {
                        var rate = ev.pageY - doc_py;
                        var sTop = barTop + rate;
                        sTop = sTop < opts.barMargin ? opts.barMargin: sTop;
                        sTop = sTop > sMaxTop ? sMaxTop: sTop;
                        ScrollBars.css("top", sTop);
                        var ak_Con_rate = elChild.outerHeight() * (rate / iScrollBoxHeight) * -1;
                        var iTop = conTop + ak_Con_rate;
                        iTop = iTop > 0 ? 0 : iTop;
                        iTop = iTop < iMinTop ? iMinTop: iTop;
                        elChild.css("top", iTop);
                    }
                });
                $(document).on("mouseup", function(ev) {
                    elem.css({
                        "-moz-user-select": "",
                        "-khtml-user-select": "",
                        "user-select": ""
                    });
                    ScrollBars.css({
                        "background": color.bar
                    });
                    isS_B = false;
                });
                elChild.bind("DOMNodeInserted", function(e) {
                    setTimeout(function() {
                        fnContentResize();
                    }, 100);
                });
                elChild.bind("DOMNodeRemoved", function(e) {
                    setTimeout(function() {
                        fnContentResize();
                    }, 100);
                });
                function fnContentResize() {
                    sham.css({
                        "height": elChild.outerHeight() + "px"
                    });
                    iRate = elem.innerHeight() / elChild.outerHeight();
                    if (iRate >= 1) {
                        ScrollBox.hide();
                        ScrollBars.css("height", 0);
                        elChild.css("top", 0);
                        return;
                    }
                    ScrollBox.show();
                    iScrollBoxHeight = ScrollBox.outerHeight();
                    iScrollBarHeight = Math.round(iRate * iScrollBoxHeight);
                    ScrollBars.css("height", iScrollBarHeight);
                    iMinTop = elem.innerHeight() - elChild.outerHeight();
                    sMaxTop = iScrollBoxHeight - iScrollBarHeight;
                    var nowConTop = parseInt(elChild.css("top"));
                    fnScrollContent(elem, elChild, ScrollBox, ScrollBars, 0, 0);
                    if (nowConTop < iMinTop) {
                        elChild.css("top", iMinTop);
                        ScrollBars.css("top", sMaxTop);
                    }
                }
            });
        });
        function fnScrollContent(ak_Wrapper, ak_Content, ak_FollowWrapper, ak_FlollowContent, iOffset) {
            var rate = parseInt(ak_Content.css("top")) / (ak_Content.outerHeight() - ak_Wrapper.innerHeight());
            var iTop = (ak_FlollowContent.outerHeight() - ak_FollowWrapper.innerHeight()) * rate + iOffset;
            ak_FlollowContent.css("top", iTop);
            opts.callback(ak_FlollowContent, iTop);
        }
    }
})(jQuery);