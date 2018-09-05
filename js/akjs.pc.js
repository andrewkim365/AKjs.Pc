/*! jquery.AKjs by Website Plugin v1.0.0 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20180905 AKjs license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Pc */

if ("undefined" == typeof jQuery) throw new Error("AKjs Plugin's JavaScript requires jQuery");

/*-----------------------------------------------AKjs_Config------------------------------------------*/
function AKjs_Config(setting) {
    var option = $.extend({
            MaskStyle: [],
            Responsive: true,
            ButtonLink: true,
            animation:true,
            pluginPath: "js/plugin/"
        },
        setting);
    AKjs_UserAgent();
    AKjs_RegsInput();
    AKjs_RegularExp();
    if(option.MaskStyle) {
        $("body").addClass("ak-mask_" + option.MaskStyle[0]+" ak-mask_"+option.MaskStyle[1]);
    }
    if(!option.Responsive) {
        $("body").addClass("ak-screen");
    }
    if(option.ButtonLink== true) {
        if (!$("html").attr("data-router")) {
            AKjs_HashSharp();
        }
    } else {
        $("*").removeAttr("data-href");
    }
    if(option.animation) {
        AKjs_Animation();
    } else {
        $("*").removeAttr("data-animation");
    }
    if (!$("html").attr("data-router")) {
        AKjs_mainHeight();
    }
    $(window).resize(function(){
        AKjs_mainHeight();
    });
    if(option.pluginPath) {
        akPath = option.pluginPath.charAt(option.pluginPath.length - 1);
        if (akPath === "/") {
            plugPath = option.pluginPath.substring(0, option.pluginPath.length-1);
        } else {
            plugPath = option.pluginPath;
        }
        localStorage.AKjsPath = plugPath;
    }
    if (IsIE6) {
        $("html").addClass("akjs_ie6");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE7) {
        $("html").addClass("akjs_ie7");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE8) {
        $("html").addClass("akjs_ie8");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE) {
        $("html").addClass("akjs_ie");
    }
}

/*-----------------------------------------------AKjs_Router------------------------------------------*/
function AKjs_Router(setting) {
    var option = $.extend({
            Router: false,
            FileFormat: ".html",
            Parameter: false,
            Animate:"",
            ErrorMsg: "Current Page loading failure!",
            RouterPath:[],
            success:function () {
            },
            error:function () {
            },
            changePage:function () {
            }
        },
        setting);
    if(option.Router == true) {
        layout = $.ajax({
            url: option.RouterPath[1],
            async: false,
            cache: false
        });
        $(document).ready(function(){
            if (option.Animate) {
                $("body").html("<div id='ak-animation'>"+layout.responseText+"</div>");
            } else {
                $("body").html(layout.responseText);
            }
            Router_Ajax(option);
            AKjs_mainHeight();
            option.changePage(document.location.hash.substring(1),false);
        });
        $(window).bind('hashchange', function () {
            var page = "hashchange";
            var PrevScrollTop = $("#ak-scrollview").scrollTop();
            Router_Ajax(option,page);
            AKjs_mainHeight();
            option.changePage(document.location.hash.substring(1), true);
            $("header, main, footer").css({
                "left": 0,
                "right": 0
            });
            option.changePage(document.location.hash.substring(1), true);
        });
        function Router_Ajax(option,page) {
            AKjs_UserAgent();
            AKjs_RegsInput();
            AKjs_RegularExp();
            if (document.location.hash.substring(1) != "") {
                $("#ak-animation").find("img").hide().show();
                if (page == "hashchange") {
                    if (option.Animate) {
                        $("#ak-main").addClass("dis_opa_0").removeClass("animated " + option.Animate);
                        setTimeout(function () {
                            $("#ak-main").removeClass("dis_opa_0").addClass("animated " + option.Animate);
                        }, 100);
                    }
                    $("#ak-scrollview").animate({"scrollTop": 0}, 100);
                    $("body").children("div").not("#ak-animation").remove();
                    setTimeout(function () {
                        $(".ak-mask").remove();
                    }, 500);
                }
                var Router_path = "./";
                if (option.RouterPath[0]) {
                    if (document.location.hash.substring(1).substr(0, 1) != "/") {
                        Router_path = option.RouterPath[0] + "/";
                    } else {
                        Router_path = option.RouterPath[0];
                    }
                }
                var hash_dot = new RegExp("\\.");
                var hash_question = new RegExp("\\?");
                if (hash_dot.test(Router_path + document.location.hash.substring(1))) {
                    var ak_url = Router_path + document.location.hash.substring(1)
                } else {
                    if (hash_question.test(Router_path + document.location.hash.substring(1))) {
                        var ak_hash = Router_path + document.location.hash.substring(1).replace("?", option.FileFormat + "?");
                    } else {
                        var ak_hash = Router_path + document.location.hash.substring(1) + option.FileFormat;
                    }
                    var ak_url = ak_hash.replace("/" + option.FileFormat, "/index" + option.FileFormat);
                }
                htmlobj = $.ajax({
                    url: ak_url,
                    async: false,
                    cache: false,
                    success: function () {
                        $("html").attr("data-router","akjs");
                        $(function () {
                            option.success(document.location.hash.substring(1));
                        });
                    },
                    error: function () {
                        $("html").attr("data-router","error");
                        $("header, aside, footer").removeClass("dis_block_im").addClass("dis_none_im");
                        $(".ak-ErrorPage").remove();
                        $("body").append('<div class="ak-ErrorPage"><i>&Chi;</i>'+option.ErrorMsg+'</div>');
                        AKjs_mainHeight();
                        $(function () {
                            option.error(document.location.hash.substring(1));
                        });
                    }
                });
                var htmlobj_text = $(htmlobj.responseText);

                if (htmlobj_text.prop("tagName") == "template" || htmlobj_text.prop("tagName") == "TEMPLATE") {
                    main_tmpl = htmlobj_text.html();
                    var tmpl_scrollview = new RegExp("\\<ak-scrollview");
                    if (tmpl_scrollview.test(main_tmpl)) {
                        main_tmpl = htmlobj_text.html().replace('<ak-scrollview', '<div id="ak-scrollview"').replace('</ak-scrollview>', '</div>').replace('<ak-main', '<div id="ak-main"').replace('</ak-main>', '</div>');
                    } else {
                        main_tmpl = htmlobj_text.html().replace('<ak-main', '<div id="ak-main"><div id="ak-scrollview"').replace('</ak-main>', '</div></div>');
                    }
                    if (!IsIE8) {
                        if (typeof(Storage) !== "undefined") {
                            localStorage.setItem("Retrieve", $("body").html());
                            record = localStorage.getItem("Retrieve");
                        }
                    } else {
                        main_tmpl = main_tmpl.replace(/<AK-PAGE-CODE/g,'<span id="ak-page-code" class="dis_none_im"').replace('</AK-PAGE-CODE','</span');
                        main_tmpl = main_tmpl.replace(/<AK-TITLE/g,'<span id="ak-title" class="dis_none_im"').replace('</AK-TITLE','</span');
                    }

                    $("main").html(main_tmpl);

                    if (IsIE8) {
                        $("#ak-page-code").remove();
                        $("#ak-title").remove();
                    }

                    if ($("#ak-main").parentsUntil("main").length > 0) {
                        $("#ak-main").remove();
                        throw new Error("Sorry! The outer layer of the \"<ak-main></ak-main>\" element can not have other elements!");
                    }
                } else {
                    if ($("html").attr("data-router") != "error") {
                        throw new Error("Sorry! The lack of \"<template></template>\" elements!");
                    }
                }
                if ($(htmlobj_text).next().length > 0 && $(htmlobj_text).next().next().length < 1) {
                    if ($(htmlobj_text).next().prop("tagName") == "script") {
                        var jsText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "style") {
                        var cssText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "SCRIPT") {
                        var jsText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "STYLE") {
                        var cssText = $(htmlobj_text).next().html();
                    }
                } else if ($(htmlobj_text).next().length > 0 && $(htmlobj_text).next().next().length > 0) {
                    if ($(htmlobj_text).next().prop("tagName") == "script" && $(htmlobj_text).next().next().prop("tagName") == "style") {
                        var jsText = $(htmlobj_text).next().html();
                        var cssText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "style" && $(htmlobj_text).next().next().prop("tagName") == "script") {
                        var cssText = $(htmlobj_text).next().html();
                        var jsText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "SCRIPT" && $(htmlobj_text).next().next().prop("tagName") == "STYLE") {
                        var jsText = $(htmlobj_text).next().html();
                        var cssText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "STYLE" && $(htmlobj_text).next().next().prop("tagName") == "SCRIPT") {
                        var cssText = $(htmlobj_text).next().html();
                        var jsText = $(htmlobj_text).next().next().html();
                    }
                    $(htmlobj_text).next().next().nextAll().remove();
                }
                $("html").children("script").html("").remove();
                $("html").children("style").html("").remove();

                $(function() {
                    Router_Settings();
                    setTimeout(function () {
                        if (jsText != undefined) {
                            $("<script id='akjs_script' data-temp='"+new Date().getTime()+"' type=\"text/javascript\">"+jsText+"</script>").appendTo($("html"));
                        }
                        if (cssText != undefined) {
                            $("<style id='akjs_style' data-temp='"+new Date().getTime()+"' type=\"text/css\">"+cssText+"</style>").appendTo($("html"));
                        }
                        if (option.Parameter) {
                            localStorage.HashSharp = true;
                            AKjs_HashSharp();
                        } else {
                            localStorage.HashSharp = false;
                            AKjs_HashSharp();
                        }
                    }, 1000);
                });
            }
        }
        function Router_Settings() {
            AKjs_Animation();
            $("form").each(function(){
                if ($(this).attr("data-submit") != "true") {
                    $(this).attr("onsubmit","return false");
                } else {
                    $(this).removeAttr("onsubmit");
                }
            });
            if ($("ak-title").length > 0) {
                $("head").find("title").text($("ak-title").text());
                $("ak-title").remove();
            }
        }
        $("html").attr("data-router","akjs");
    } else {
        $("html").removeAttr("data-router");
    }
}

/*-----------------------------------------------AKjs_UserAgent------------------------------------------*/
function AKjs_UserAgent() {
    var terminal = navigator.userAgent.toLowerCase();
    var browser = window.navigator.userAgent;
    var explorer = window.navigator.appVersion;
    IsMobile = terminal.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    IsIpad = terminal.match(/ipad/i) == "ipad";
    IsIphone = terminal.match(/iphone os/i) == "iphone os";
    IsAndroid = terminal.match(/android/i) == "android";
    IsWindows = terminal.match(/windows/i) == "windows";
    IsImac = terminal.match(/macintosh/i) == "Imac";
    IsWechat = terminal.match(/MicroMessenger/i)=="micromessenger";
    IsQQ = terminal.match(/QQ/i)=="qq";
    IsUc7 = terminal.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    IsUc = terminal.match(/ucweb/i) == "ucweb";
    IsWM = terminal.match(/windows mobile/i) == "windows mobile";
    IsChrome = /Chrom/gi.test(browser);
    IsFirefox = /firefox/gi.test(browser);
    IsOpera = /opera/gi.test(browser);
    IsIE = !!document.all;
    IsIE6 = !!document.all && !window.XMLHttpRequest;
    IsIE7 = !!document.all && /msie 7.0/gi.test(explorer);
    IsIE8 = !!document.all && /msie 8.0/gi.test(explorer);
    Oslanguage = (navigator.browserLanguage || navigator.language).toLowerCase();
}

/*-----------------------------------------------AKjs_RegsInput------------------------------------------*/
function AKjs_RegsInput() {
    Regs_email = /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
    Regs_mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))\d{8})$/;
    Regs_url = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    Regs_idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    Regs_postal = /^[1-9]\d{5}(?!\d)$/;
    Regs_date = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
    Regs_qq = /^[1-9][0-9]{4,9}$/;
    Regs_numAll = /"^\d+$/;
    Regs_userBefit = /^[a-z0-9]+$/i;
    Regs_pwdBefit = /^\w+$/;
}

/*-----------------------------------------------AKjs_InputLineHeight--------------------------------------*/
function AKjs_InputLineHeight() {
    AKjs_UserAgent();
    $('input[type="text"],input[type="password"],input[type="number"], input[type="tel"], input[type="email"]').each(function(){
        var inputs = $(this);
        inputs.css({
            "line-height": inputs.outerHeight()+"px"
        });
    });
}

/*-----------------------------------------------AKjs_Responsive------------------------------------------*/
function AKjs_Responsive(setting) {
    var option = $.extend({
            resizeCallback: function () {
            }
        },
        setting);
    function ak_WindowSize() {
        var device_width = window.screen.width;
        var device_height = window.screen.height;
        if (window.innerWidth)
            viewport_width = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            viewport_width = document.body.clientWidth;
        if (window.innerHeight)
            viewport_height = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            viewport_height = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            viewport_height = document.documentElement.clientHeight;
            viewport_width = document.documentElement.clientWidth;
        }
        option.resizeCallback(device_width,device_height,viewport_width,viewport_height);
    }
    window.onresize = function() {
        ak_WindowSize();
    };
}

/*-----------------------------------------------AKjs_placeholder--------------------------------------*/
function AKjs_placeholder() {
    $("input[placeholder]").each(function(){
        var place = $(this);
        if (place.attr("placeholder") && place.val()=='') {
            if (place.parent().prop('tagName') != "LABEL") {
                place.wrap("<label class='dis_block ovh rel h_in c_gray_ccc'></label>");
                place.parent("label").append("<span>" + place.attr('placeholder') + "</span>");
            }
            place.parent("label").children("span").css({
                "display": "block",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": place.outerHeight(),
                "line-height": place.outerHeight()+"px",
                "text-indent": "1em"
            });
            $(window).resize(function(){
                place.parent("label").children("span").css({
                    "display": "block",
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
                    "width": "100%",
                    "height": place.outerHeight(),
                    "line-height": place.outerHeight()+"px",
                    "text-indent": "1em"
                });
            });
            place.on('focus', function() {
                $(this).parent("label").children("span").addClass("dis_none_im");
            });
            place.on('blur', function() {
                if ($(this).val() == "") {
                    $(this).parent("label").children("span").removeClass("dis_none_im");
                }
            });
            place.keyup(function() {
                if ($(this).val() != "") {
                    $(this).parent("label").children("span").addClass("dis_none_im");
                } else {
                    $(this).parent("label").children("span").removeClass("dis_none_im");
                }
            });
        }
    });
}

/*-----------------------------------------------AKjs_mainHeight--------------------------------------*/
function AKjs_mainHeight() {
    $(function () {
        AKjs_UserAgent();
        if (!IsIE) {
            AKjs_Back.listen(function(){
                if ($("#ak-animation").length > 0) {
                    $("#ak-animation").attr("data-router", "slideLeft");
                }
            });
        }
        $("form").each(function(){
            if ($(this).attr("data-submit") == "false") {
                $(this).attr("onsubmit","return false");
            }
            $(this).removeAttr("data-submit");
        });
        if ($("main").children("#ak-main").length === 0) {
            $("main").children().not("dialog").wrapAll("<div id=\"ak-main\"><div id=\"ak-scrollview\"></div></div>");
        } else {
            if ($("#ak-scrollview").length < 1) {
                $("main").children("#ak-main").children().wrapAll("<div id=\"ak-scrollview\"></div>");
            }
        }
        $(function () {
            if ($("#ak-scrollview").length > 0) {
                $("#ak-scrollview").css({
                    "height": $(window).height() - $("#ak-scrollview").offset().top
                });
                $(".h_main").each(function(){
                    $(this).css({
                        "height": $("#ak-scrollview").height() - $(this).offset().top + $("#ak-scrollview").offset().top
                    });
                });
            }
        });
        if (IsMobile) {
            $("#ak-scrollview, textarea").removeClass("scrollbar");
            $(".bar_hide").removeClass("scrollbar_hide");
            $("body").addClass("fix_full");
            document.oncontextmenu = function(){
                event.returnValue = false;
                return false;
            };
        } else {
            $("#ak-scrollview, textarea").addClass("scrollbar");
            $(".bar_hide").addClass("scrollbar_hide");
            $("body").removeClass("fix_full");
            document.oncontextmenu = function(){
                event.returnValue = true;
                return true;
            };
        }
        $("*[data-bounce=true]").on({
            touchstart: function (ak) {
                touchStartY = ak.originalEvent.touches[0].clientY;
                touchStartX = ak.originalEvent.touches[0].clientX;
            },
            touchmove: function (ak) {
                var touchEndY = ak.originalEvent.changedTouches[0].clientY,
                    touchEndX = ak.originalEvent.changedTouches[0].clientX,
                    yDiff = touchStartY - touchEndY,
                    xDiff = touchStartX - touchEndX;
                if (Math.abs(xDiff) < Math.abs(yDiff)) {
                    if ($(this).scrollTop() === 0) {
                        if (yDiff < 5) {
                            $(this).css({
                                "transform": "translate3d(0," + Math.abs(yDiff) / 4 + "px,0)"
                            });
                        }
                    } else if ($(this).scrollTop() === $(this).prop("scrollHeight") - $(this).height()) {
                        if (yDiff > 5) {
                            $(this).css({
                                "transform": "translate3d(0,-" + Math.abs(yDiff) / 4 + "px,0)"
                            });
                        }
                    }
                }
            },
            touchend: function (ak) {
                $(this).css({
                    "transform": "translate3d(0,0,0)"
                });
            }
        });
        $("main").click(function(){
            $('[class^="defer_"]').addClass("defer_none");
            $('[class*=" defer_"]').addClass("defer_none");
        });
        $("#ak-scrollview").scroll(function(){
            $('[class^="defer_"]').addClass("defer_none");
            $('[class*=" defer_"]').addClass("defer_none");
        });
        setTimeout(function() {
            $("main").css({
                "left": 0,
                "right": 0,
                "top": 0,
                "bottom": 0
            });
            $(".h_fill").css({
                "height": $(window).height()
            });
            $(".ud_text_c").wrap("<text />");
        },100);
        setTimeout(function() {
            $('[class^="defer_"]').addClass("defer_none");
            $('[class*=" defer_"]').addClass("defer_none");
        },10000);
    });
}

/*-----------------------------------------------AKjs_Ajax--------------------------------------------*/
function AKjs_Ajax(setting) {
    var option = $.extend({
            to: "",
            type: "POST",
            url: "",
            data:{},
            async:false,
            cache: false,
            success:function () {
            },
            error:function () {
            }
        },
        setting);
    htmlobj = $.ajax({
        type: option.type,
        url: option.url,
        data: option.data,
        async: option.async,
        cache: option.cache,
        success: function (result) {
            option.success(result);
            AKjs_HashSharp();
            AKjs_Animation();
        },
        error: function (error) {
            option.error(error);
        }
    });
    if ($(option.to)) {
        $(option.to).html(htmlobj.responseText);
    }
}

/*-----------------------------------------------AKjs_Animation------------------------------------------*/
function AKjs_Animation() {
    $('*[data-animation]').each(function(){
        var ani_ele = $(this);
        var ani_s = new RegExp("s");
        var animated_each = ani_ele.attr("data-animation");
        aniJson_each = eval("(" + animated_each + ")");
        if (aniJson_each.name) {
            ani_ele.removeClass("animated "+aniJson_each.name);
            ani_ele.addClass("animated "+aniJson_each.name);
        }
        if (aniJson_each.duration) {
            if (ani_s.test(aniJson_each.duration)) {
                ani_ele.css({
                    "animation-duration" : parseInt(aniJson_each.duration)
                });
            } else {
                ani_ele.css({
                    "animation-duration" : parseInt(aniJson_each.duration)+"s"
                });
            }
        }
        if (aniJson_each.delay) {
            if (ani_s.test(aniJson_each.delay)) {
                ani_ele.css({
                    "animation-delay" : parseInt(aniJson_each.delay)
                });
            } else {
                ani_ele.css({
                    "animation-delay" : parseInt(aniJson_each.delay)+"s"
                });
            }
        }
    });
}

/*-----------------------------------------------AKjs_HashSharp------------------------------------------*/
function AKjs_HashSharp() {
    var hash_sharp = new RegExp("#");
    var hash_dot = new RegExp("./");
    var hash_sharps = new RegExp("\\?#");
    var hash_script = new RegExp("javascript");
    var question_mark =  new RegExp("\\?");
    var akTime =  new RegExp("akjs=");
    var href_main = $("main *[data-href]");
    var href_not_main = $('*[data-href]').not("main *[data-href]");
    AKjs_UserAgent();
    $('*[data-href]').addClass("pointer");
    if (IsIphone || IsIpad) {
        href_not_main.unbind('touchstart');
        delegate = "touchstart";
    } else {
        href_not_main.unbind('click');
        delegate = "click";
    }
    href_main.bind("click", function (ak) {
        ak.preventDefault();
        var _this = $(this);
        var _HashSharp = localStorage.HashSharp;
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this,_HashSharp);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    href_not_main.bind(delegate, function (ak) {
        ak.preventDefault();
        var _this = $(this);
        var _HashSharp = localStorage.HashSharp;
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this,_HashSharp);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    function data_href(_this,_HashSharp) {
        var $this = _this;
        var akKey = _HashSharp;
        if ($("#ak-animation").length > 0) {
            $("#ak-animation").attr("data-router","");
            if (_this.parents("footer")[0] != undefined) {
                $("#ak-animation").attr("data-router","");
            } else if (_this.attr("data-back") === "true" || hash_script.test(_this.attr("data-href"))){
                $("#ak-animation").attr("data-router","slideLeft");
            } else {
                $("#ak-animation").attr("data-router","slideRight");
            }
        }
        if (hash_sharp.test($this.attr("data-href"))) {
            if(question_mark.test($this.attr("data-href"))){
                if(akTime.test($this.attr("data-href"))){
                    if (akKey === "true") {
                        document.location.href=AKjs_changeURLArg($this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }else{
                    if (akKey === "true") {
                        document.location.href=$this.attr("data-href") + '&akjs=' + new Date().getTime();
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }
            }else{
                if (akKey === "true") {
                    document.location.href=$this.attr("data-href") + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href=$this.attr("data-href");
                }
            }
            $this.attr("data-href",$this.attr("data-href").replace("#",""));
        } else if (hash_script.test($this.attr("data-href"))){
            document.location.replace($this.attr("data-href"));
        } else if (hash_sharps.test(document.location.href)) {
            document.location.replace(document.location.href.replace("?#", "#"));
        } else {
            if(question_mark.test($this.attr("data-href"))){
                if(akTime.test($this.attr("data-href"))){
                    if (akKey === "true") {
                        document.location.href=AKjs_changeURLArg("#"+$this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href="#"+$this.attr("data-href");
                    }
                }else{
                    if (akKey === "true") {
                        document.location.href="#"+$this.attr("data-href") + '&akjs=' + new Date().getTime();
                    } else {
                        document.location.href="#"+$this.attr("data-href");
                    }
                }
            } else if (hash_dot.test($this.attr("data-href"))) {
                var str = document.location.hash;
                var index = str.lastIndexOf("\/");
                str = str.substring(0,index)+"/";
                str = str.replace("#","");
                if (akKey === "true") {
                    document.location.href="#"+$this.attr("data-href").replace("./", str) + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href").replace("./", str);
                }
            } else {
                if (akKey === "true") {
                    document.location.href="#"+$this.attr("data-href") + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href");
                }
            }
        }
    }
    if ($("html").attr("data-router") == "akjs") {
        $('form[action]').each(function () {
            var akKey = localStorage.HashSharp;
            var hash_sharp = new RegExp("#");
            if (!hash_sharp.test($(this).attr("action"))) {
                if (akKey === "true") {
                    $(this).attr("action", "#/" + $(this).attr("action") + '?akjs=' + new Date().getTime());
                } else {
                    $(this).attr("action", "#/" + $(this).attr("action"));
                }
            }
        });
    }
}

/*-----------------------------------------------AKjs_RegularExp------------------------------------------*/
function AKjs_RegularExp() {
    $('input[data-type]').each(function(){
        if ($(this).attr("data-type") == "number") {
            $(this).attr("pattern","[0-9]*");
            $(this).keyup(function() {
                this.value = this.value.replace(/\D/g, '');
            }).bind("paste", function () {
                this.value = this.value.replace(/\D/g, '');
            }).bind("blur", function () {
                this.value = this.value.replace(/\D/g, '');
            });
        } else if ($(this).attr("data-type") == "number_symbol") {
            $(this).attr("pattern","(\\d{5}([-]\\d{4})?)");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            });
        } else if ($(this).attr("data-type") == "alpha") {
            $(this).attr("pattern","[a-zA-Z]{1}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            });
        } else if ($(this).attr("data-type") == "alpha_number") {
            $(this).attr("pattern","[a-zA-Z0-9_]{4,19}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            });
        } else if ($(this).attr("data-type") == "sino") {
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            });
        } else if ($(this).attr("data-type") == "sino_alpha") {
            $(this).keyup(function() {
                this.value = this.value.replace(/[\d]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[\d]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[\d]/g,'');
            });
        }
    });
}

/*-----------------------------------------------AKjs_Include------------------------------------------*/
function AKjs_Include(url) {
    var type_js = new RegExp(".js");
    var type_css = new RegExp(".css");
    if(type_js.test(url)) {
        $.ajax({
            type: 'GET',
            url: url + "?akjs=" + new Date().getTime(),
            async: false,
            cache: true,
            dataType: 'script'
        });
    } else if(type_css.test(url)) {
        var css_valarr = url.split(".css");
        css_valarr = css_valarr.join();
        css_valarr = css_valarr.substring(0, css_valarr.length-1);
        css_valarr = css_valarr.substring(css_valarr.lastIndexOf('/') + 1, css_valarr.length).replace(".","_");
        if ($("head").children("style").filter("#include_"+css_valarr+"_css").length == 0) {
            if (localStorage.getItem("include_"+css_valarr + "_css") === null) {
                css_incobj = $.ajax({
                    type: 'GET',
                    url: url + "?akjs=" + new Date().getTime(),
                    async: false,
                    cache: true,
                    dataType: 'text'
                });
                localStorage.setItem("include_" + css_valarr + "_css", css_incobj.responseText);
            } else {
                localStorage.setItem("include_" + css_valarr + "_css", localStorage.getItem("include_" + css_valarr + "_css"));
            }
            $("head").append("<style type='text/css' id='include_" + css_valarr + "_css'>" + localStorage.getItem("include_" + css_valarr + "_css") + "</style>");
        }
    }
}

/*-----------------------------------------------AKjs_Location-------------------------------------------*/
function AKjs_Location(url,setting) {
    var option = $.extend({
            type: "",
            time: 0,
            router:""
        },
        setting);
    AKjs_UserAgent();
    function AniSetting() {
        if ($("#ak-animation").length > 0) {
            if (option.router === "right") {
                $("#ak-animation").attr("data-router","slideRight");
            } else if (option.router === "left") {
                $("#ak-animation").attr("data-router","slideLeft");
            }
        }
    }
    var sharp = "";
    if ($("html").attr("data-router") == "akjs") {
        sharp = "#";
    }
    switch (option.type) {
        case 'href':
            if (option.time) {
                setTimeout(function () {
                    AniSetting();
                    if (IsIphone || IsIpad) {
                        document.location.href=sharp+url;
                    } else {
                        window.location.href=sharp+url;
                    }
                }, option.time);
            } else {
                AniSetting();
                if (IsIphone || IsIpad) {
                    document.location.href=sharp+url;
                } else {
                    window.location.href=sharp+url;
                }
            }
            break;
        case 'history':
            if (option.time) {
                setTimeout(function () {
                    if ($("#ak-animation").length > 0) {
                        $("#ak-animation").attr("data-router", "slideLeft");
                    }
                    if (IsIphone || IsIpad) {
                        history.back(url);
                    } else {
                        window.back(url);
                    }
                }, option.time);
            } else {
                if ($("#ak-animation").length > 0) {
                    $("#ak-animation").attr("data-router", "slideLeft");
                }
                if (IsIphone || IsIpad) {
                    history.back(url);
                } else {
                    window.back(url);
                }
            }
            break;
        case 'reload':
            if (option.time) {
                setTimeout(function () {
                    if (IsIphone || IsIpad) {
                        document.location.reload();
                    } else {
                        window.location.reload();
                    }
                }, option.time);
            } else {
                if (IsIphone || IsIpad) {
                    document.location.reload();
                } else {
                    window.location.reload();
                }
            }
            break;
        default:
            if (option.time) {
                setTimeout(function () {
                    AniSetting();
                    if (IsIphone || IsIpad) {
                        document.location.replace(sharp+url);
                    } else {
                        window.location.replace(sharp+url);
                    }
                }, option.time);
            } else {
                AniSetting();
                if (IsIphone || IsIpad) {
                    document.location.replace(sharp+url);
                } else {
                    window.location.replace(sharp+url);
                }
            }
            break;
    }
}

/*-----------------------------------------------AKjs_getUrlParam-------------------------------------------*/
function AKjs_getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var u = document.location.search.substr(1);
    //if(u == ''){
    var temp = document.location.hash.split('?');
    if(temp.length == 2){
        u = temp[1];
    }
    //}
    var r = u.match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*-----------------------------------------------AKjs_changeURLArg-------------------------------------------*/
function AKjs_changeURLArg(url,arg,val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + val;
}

/*-----------------------------------------------AKjs_Params------------------------------------------*/
function AKjs_Params(number) {
    var hash_question = new RegExp("\\?");
    var hash_sharp = new RegExp("\\#/");
    if (hash_sharp.test(document.location.hash)) {
        hash_arr = (location.hash || "").replace(/^\#/, '').split("&");
    } else {
        hash_arr = (location.hash || "").replace(/^\#/, '/').split("&");
    }
    var params = [];
    for(var i=0; i<hash_arr.length; i++){
        params.push(hash_arr[i].split("/"));
    }
    if (hash_question.test(params[0][number])) {
        var ak_params = params[0][number].split("?")[0];
    } else {
        var ak_params = params[0][number];
    }
    return ak_params;

}

/*-----------------------------------------------AKjs_Pathname------------------------------------------*/
function AKjs_Pathname() {
    var question = new RegExp("\\?");
    var strUrl=window.location.href;
    var arrUrl=strUrl.split("/");
    var strPage=arrUrl[arrUrl.length-1];
    if (question.test(strPage)) {
        var ak_strPage = strPage.split("?")[0];
    } else {
        var ak_strPage = strPage;
    }
    return ak_strPage;
}

/*-----------------------------------------------AKjs_setCookie------------------------------------------*/
function AKjs_setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/*-----------------------------------------------AKjs_getCookie------------------------------------------*/
function AKjs_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

/*-----------------------------------------------AKjs_delCookie------------------------------------------*/
function AKjs_delCookie(name) {
    AKjs_setCookie(name, "", -1);
}

/*-----------------------------------------------AKjs_Unicode------------------------------------------*/
function AKjs_Unicode(str) {
    var s = escape(str);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != "") {
        retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++) {
        if(sa[i].substring(0,1) == "u") {
            retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
        }
        else retV += "%" + sa[i];
    }
    return retV;
    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for(var i = 0; i < s.length; i ++)
        {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value;
        return digS;
    }
    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for(var i = 0; i < 4; i++)
        {
            n2 = Math.pow(2,3 - i);
            if(n1 >= n2)
            {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }
    function Dig2Dec(s) {
        var retV = 0;
        if(s.length == 4)
        {
            for(var i = 0; i < 4; i ++)
            {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }
    function Hex2Utf8(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if(s.length == 16)
        {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10,16);
            var sss = "0123456789ABCDEF";
            for(var i = 0; i < 3; i ++)
            {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i)+1)*8);



                retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
            }
            return retS;
        }
        return "";
    }
}

/*-----------------------------------------------AKjs_htmlEncode------------------------------------------*/
function AKjs_htmlEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, ">");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, " ");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, '"');
    s = s.replace(/\n/g, "<br>");
    return s;
}

/*-----------------------------------------------AKjs_htmlDecode------------------------------------------*/
function AKjs_htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/>/g, "&");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, " ");
    s = s.replace(/'/g, "\'");
    s = s.replace(/"/g, '\"');
    s = s.replace(/<br>/g, "\n");
    return s;
}

/*-----------------------------------------------AKjs_FileFormat------------------------------------------*/
function AKjs_FileFormat(filename) {
    var d=/\.[^\.]+$/.exec(filename);
    var ext = new String(d);
    var s = ext.toLowerCase();
    return s;
}

/*-----------------------------------------------AKjs_DateFormat------------------------------------------*/
function AKjs_DateFormat(date,format) {
    if (date.constructor === Date) {
        var d = date;
    }else if (date.constructor === String) {
        var d = new Date(Date.parse(date.replace(/-/g,   "/")));
    }else{
        var d = new Date();
    }
    var ak_zeroize = function (value, length)
    {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++)
        {
            zeros += '0';
        }
        return zeros + value;
    };

    return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
    {
        switch ($0)
        {
            case 'd': return d.getDate();
            case 'dd': return ak_zeroize(d.getDate());
            case 'M': return d.getMonth() + 1;
            case 'MM': return ak_zeroize(d.getMonth() + 1);
            case 'yy': return String(d.getFullYear()).substr(2);
            case 'yyyy': return d.getFullYear();
            case 'h': return d.getHours() % 12 || 12;
            case 'hh': return ak_zeroize(d.getHours() % 12 || 12);
            case 'H': return d.getHours();
            case 'HH': return ak_zeroize(d.getHours());
            case 'm': return d.getMinutes();
            case 'mm': return ak_zeroize(d.getMinutes());
            case 's': return d.getSeconds();
            case 'ss': return ak_zeroize(d.getSeconds());
            case 'l': return ak_zeroize(d.getMilliseconds(), 3);
            case 'L': var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return ak_zeroize(m);
            case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z': return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default: return $0.substr(1, $0.length - 2);
        }
    });
}

/*-----------------------------------------------AKjs_Plugin------------------------------------------*/
function AKjs_Plugin(setting,css) {
    var AKjsPath = localStorage.AKjsPath;
    if (css) {
        if ($("head").children("style").filter("#" + setting + "_css").length == 0) {
            if (localStorage.getItem(setting + "_css") === null) {
                css_plugobj = $.ajax({
                    type: 'GET',
                    url: AKjsPath + "/css/" + setting + ".css?akjs=" + new Date().getTime(),
                    async: false,
                    cache: true,
                    dataType: 'text'
                });
                localStorage.setItem(setting + "_css", css_plugobj.responseText);
            } else {
                localStorage.setItem(setting + "_css", localStorage.getItem(setting + "_css"));
            }
            $("head").append("<style type='text/css' id='" + setting + "_css'>"+localStorage.getItem(setting+"_css")+"</style>");
        }
    }
    if ($("head").children("script").filter("#"+setting+"_js").length == 0) {
        if (localStorage.getItem(setting+"_js") === null) {
            js_plugobj = $.ajax({
                type: 'GET',
                url: AKjsPath + "/" + setting + ".js?akjs=" + new Date().getTime(),
                async: false,
                cache: true,
                dataType: 'text'
            });
            localStorage.setItem(setting+"_js", js_plugobj.responseText);
        } else {
            localStorage.setItem(setting+"_js", localStorage.getItem(setting+"_js"));
        }
        $("head").append("<script type='text/javascript' language='javascript' id='"+setting+"_js'>"+localStorage.getItem(setting+"_js")+"</script>");
    }
}

/*-----------------------------------------------AKjs_Back------------------------------------------*/
(function(AKjs_Back){
    AKjs_UserAgent();
    if (!IsIE) {
        $(function () {
            var STATE = 'ak-back';
            var element;
            var onPopState = function(event){
                event.state === STATE && fire();
            };
            var record = function(state){
                history.pushState(state, null, location.href);
            };
            var fire = function(){
                var event = document.createEvent('Events');
                event.initEvent(STATE, false, false);
                element.dispatchEvent(event);
            };
            var listen = function(listener){
                element.addEventListener(STATE, listener, false);
            };
            !function(){
                element = document.createElement('span');
                window.addEventListener('popstate', onPopState);
                this.listen = listen;
                record(STATE);
            }.call(window[AKjs_Back] = window[AKjs_Back] || {});
        });
    }
}('AKjs_Back'));