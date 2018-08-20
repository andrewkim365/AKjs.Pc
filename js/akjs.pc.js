/*! jquery.AKjs by Website Plugin v1.0.0 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20180820 AKjs license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Pc */

if ("undefined" == typeof jQuery) throw new Error("AKjs Plugin's JavaScript requires jQuery");

/*-----------------------------------------------AKjs_Config------------------------------------------*/
function AKjs_Config(setting) {
    var option = $.extend({
            MaskStyle: [],
            Responsive: true,
            ButtonLink: true,
            animation:true
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
    if(option.ButtonLink == true) {
        AKjs_HashSharp(false,false);
    } else {
        $("*").removeAttr("data-href");
    }
    if(option.animation) {
        AKjs_Animation();
    } else {
        $("*").removeAttr("data-animation");
    }
    AKjs_mainHeight();
    $(window).resize(function(){
        AKjs_mainHeight();
    });
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
        });
        $("main").ready(function(){
            Router_Ajax(option);
            option.changePage(document.location.hash.substring(1));
        });
        $(window).bind('hashchange', function () {
            var page = "hashchange";
            var PrevScrollTop = $("#ak-scrollview").scrollTop();
            Router_Ajax(option,page);
            AKjs_mainHeight();
            $("header, main, footer").css({
                "left": 0,
                "right": 0
            });
            if (IsIE8) {
                var record = 0;
            }
            option.changePage(document.location.hash.substring(1), record);
        });
        function Router_Ajax(option,page) {
            AKjs_UserAgent();
            AKjs_RegsInput();
            AKjs_RegularExp();
            if (document.location.hash.substring(1) != "") {
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
                        option.success(document.location.hash.substring(1));
                    },
                    error: function () {
                        option.error(document.location.hash.substring(1));
                        $("header, aside, footer").removeClass("dis_block_im").addClass("dis_none_im");
                        setTimeout(function () {
                            $("main").html('<div class="ak-ErrorPage"><i>&Chi;</i>'+option.ErrorMsg+'</div>');
                            AKjs_mainHeight();
                        }, 100);
                        throw new Error("Sorry! Document not found!");
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
                    throw new Error("Sorry! The lack of \"<template></template>\" elements!");
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
                setTimeout(function () {
                    if (jsText != undefined) {
                        $("<script id='akjs_script' data-temp='"+new Date().getTime()+"' type=\"text/javascript\">"+jsText+"</script>").appendTo($("html"));
                    }
                    if (cssText != undefined) {
                        $("<style id='akjs_style' data-temp='"+new Date().getTime()+"' type=\"text/css\">"+cssText+"</style>").appendTo($("html"));
                    }
                }, 1000);

                Router_Settings();
                setTimeout(function() {
                    if (option.Parameter) {
                        AKjs_HashSharp(true,true);
                    } else {
                        AKjs_HashSharp(true,false);
                    }
                },1000);
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

/*-----------------------------------------------AKjs_mainHeight--------------------------------------*/
function AKjs_mainHeight() {
    AKjs_UserAgent();
    if (!IsIE8) {
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
    setTimeout(function() {
        if ($("#ak-scrollview").length > 0) {
            $("#ak-scrollview").css({
                "height": $(window).height() - $("#ak-scrollview").offset().top
            });
        }
    },300);
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
            if ($(option.to)) {
                $(option.to).html(htmlobj.responseText);
            }
            option.success(result);
            AKjs_HashSharp(true,false);
            AKjs_Animation();
        },
        error: function (error) {
            if ($(option.to)) {
                $(option.to).html(htmlobj.responseText);
            }
            option.error(error);
        }
    });
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
function AKjs_HashSharp(form,key) {
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
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    href_not_main.bind(delegate, function (ak) {
        ak.preventDefault();
        var _this = $(this);
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    function data_href(_this) {
        var $this = _this;
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
                    if (key) {
                        document.location.href=AKjs_changeURLArg($this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }else{
                    if (key) {
                        document.location.href=$this.attr("data-href") + '&akjs=' + new Date().getTime();
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }
            }else{
                if (key) {
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
                    if (key) {
                        document.location.href=AKjs_changeURLArg("#"+$this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href="#"+$this.attr("data-href");
                    }
                }else{
                    if (key) {
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
                if (key) {
                    document.location.href="#"+$this.attr("data-href").replace("./", str) + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href").replace("./", str);
                }
            } else {
                if (key) {
                    document.location.href="#"+$this.attr("data-href") + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href");
                }
            }
        }
    }
    if (form == true) {
        $('form[action]').each(function () {
            var hash_sharp = new RegExp("#");
            if (AKjs_getUrlParam('akjs') && hash_sharp.test(document.location.hash)) {
                if (!hash_sharp.test($(this).attr("action"))) {
                    if (key) {
                        $(this).attr("action", "#/" + $(this).attr("action") + '?akjs=' + new Date().getTime());
                    } else {
                        $(this).attr("action", "#/" + $(this).attr("action"));
                    }
                }
            }
        });
    }
}

/*-----------------------------------------------AKjs_RegularExp------------------------------------------*/
function AKjs_RegularExp() {
    $('input[data-type]').each(function(){
        if ($(this).prop("dataset").type == "number") {
            $(this).attr("pattern","[0-9]*");
            $(this).keyup(function() {
                this.value = this.value.replace(/\D/g, '');
            }).bind("paste", function () {
                this.value = this.value.replace(/\D/g, '');
            }).bind("blur", function () {
                this.value = this.value.replace(/\D/g, '');
            });
        } else if ($(this).prop("dataset").type == "number_symbol") {
            $(this).attr("pattern","(\\d{5}([-]\\d{4})?)");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            });
        } else if ($(this).prop("dataset").type == "alpha") {
            $(this).attr("pattern","[a-zA-Z]{1}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            });
        } else if ($(this).prop("dataset").type == "alpha_number") {
            $(this).attr("pattern","[a-zA-Z0-9_]{4,19}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            });
        } else if ($(this).prop("dataset").type == "sino") {
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            });
        } else if ($(this).prop("dataset").type == "sino_alpha") {
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
function AKjs_Include(url,important) {
    AKjs_pathURL();
    var type_js = new RegExp(".js");
    var type_css = new RegExp(".css");
    var type_remote = new RegExp("http");
    if(type_js.test(url)){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("data-akjs",new Date().getTime());
        if (type_remote.test(url)) {
            fileref.setAttribute("src",url);
        } else {
            fileref.setAttribute("src",AKjsPath+"/"+url+"?akjs="+new Date().getTime());
        }
    }else if(type_css.test(url)){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("data-akjs",new Date().getTime());
        if (type_remote.test(url)) {
            fileref.setAttribute("href",url);
        } else {
            fileref.setAttribute("href",AKjsPath+"/"+url+"?akjs="+new Date().getTime());
        }
    }
    if(typeof fileref != "undefined"){
        if(type_js.test(url)){
            var type ="script";
            var type_url = "src";
        }else if(type_css.test(url)){
            var type ="link";
            var type_url = "href";
        }
        $("head").find(type).each(function(){
            if ($(this).data("akjs")) {
                if ($(this).attr(type_url).indexOf(url) != -1) {
                    $(this).remove();
                }
            }
        });
        if (important) {
            $("head").find("title").after(fileref);
        } else {
            $(fileref).appendTo($("head"));
        }
    }else{
        console.info("load include {"+url+"} file method error!");
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
    switch (option.type) {
        case 'href':
            if (option.time) {
                setTimeout(function () {
                    AniSetting();
                    if (IsIphone || IsIpad) {
                        document.location.href="#"+url;
                    } else {
                        window.location.href="#"+url;
                    }
                }, option.time);
            } else {
                AniSetting();
                if (IsIphone || IsIpad) {
                    document.location.href="#"+url;
                } else {
                    window.location.href="#"+url;
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
                        document.location.replace("#"+url);
                    } else {
                        window.location.replace("#"+url);
                    }
                }, option.time);
            } else {
                AniSetting();
                if (IsIphone || IsIpad) {
                    document.location.replace("#"+url);
                } else {
                    window.location.replace("#"+url);
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
    return params[0][number];
}

/*-----------------------------------------------AKjs_setCookie------------------------------------------*/
function AKjs_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    //AKjs_setCookie("username", user, 365);
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
    //var user = AKjs_getCookie("username");
}

/*-----------------------------------------------AKjs_delCookie------------------------------------------*/
function AKjs_delCookie(name) {
    AKjs_setCookie(name, "", -1);
}

/*-----------------------------------------------AKjs_Unicode------------------------------------------*/
function AKjs_Unicode(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
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
    $(function () {
        $.ajax({
            type:'GET',
            url: js_folder+"plugin/"+setting+".js?akjs="+new Date().getTime(),
            async: false,
            cache: true,
            dataType:'script'
        });
        if (css) {
            var css_url = js_folder + "plugin/css/" + setting + ".css";
            $("html").children("link").filter("#"+setting).remove();
            $("html").append("<link rel='stylesheet' type='text/css' id='"+setting+"' href='"+css_url+"?akjs="+new Date().getTime()+"' />");
        }
    });
}

/*-----------------------------------------------AKjs_pathURL------------------------------------------*/
function AKjs_pathURL() {
    var js_index = js_folder.lastIndexOf("\/");
    var js_Path = js_folder.substring(0, js_index);
    var real_index = js_Path.lastIndexOf("\/");
    AKjsPath = js_Path.substring(0, real_index);
}
ak_scripts = document.scripts;
js_folder = ak_scripts[ak_scripts.length - 1].src.substring(0, ak_scripts[ak_scripts.length - 1].src.lastIndexOf("/") + 1);

/*-----------------------------------------------AKjs_Back------------------------------------------*/
(function(AKjs_Back){
    AKjs_UserAgent();
    if (!IsIE8) {
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
    }
}('AKjs_Back'));