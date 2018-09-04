/*
Modification Date: 2018-05-23
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Snippet-------------------------------------*/
(function($) {
    $.fn.AKjs_Snippet = function(language, settings) {
        if (typeof language == "object") {
            settings = language
        }
        if (typeof language == "string") {
            language = language.toLowerCase()
        }
        var defaults = {
            style: "random",
            showNum: true,
            transparent: false,
            collapse: false,
            showMsg: "Expand Code",
            hideMsg: "Collapse Code"
        };
        var styleArr = ["acid", "berries-dark", "berries-light", "bipolar", "blacknblue", "bright", "contrast", "darkblue", "darkness", "desert", "dull", "easter", "emacs", "golden", "greenlcd", "ide-anjuta", "ide-codewarrior", "ide-devcpp", "ide-eclipse", "ide-kdev", "ide-msvcpp", "kwrite", "matlab", "navy", "nedit", "neon", "night", "pablo", "peachpuff", "print", "rand01", "the", "typical", "vampire", "vim", "vim-dark", "whatis", "whitengrey", "zellner"];
        if (settings) {
            $.extend(defaults, settings)
        }
        return this.each(function() {
            var useStyle = defaults.style.toLowerCase();
            if (defaults.style == "random") {
                var randomnumber = Math.floor(Math.random() * (styleArr.length));
                useStyle = styleArr[randomnumber]
            }
            var o = $(this);
            var node = this.nodeName.toLowerCase();
            if (node == "pre") {
                if (o.data("orgHtml") == undefined || o.data("orgHtml") == null) {
                    var orgHtml = o.html();
                    o.data("orgHtml", orgHtml)
                }
                if (!o.parent().hasClass("ak-snippet-wrap")) {
                    if (typeof language != "string") {
                        if (o.attr("class").length > 0) {
                            var errclass = ' class="' + o.attr("class") + '"'
                        } else {
                            var errclass = ""
                        }
                        if (o.attr("id").length > 0) {
                            var errid = ' id="' + o.attr("id") + '"'
                        } else {
                            var errid = ""
                        }
                        var error = "AKjs_Snippet Error: You must specify a language on inital usage of AKjs_Snippet. Reference <pre" + errclass + errid + ">";
                        console.log(error);
                        return false
                    }
                    o.addClass("ak_" + language).addClass("ak-snippet-formatted").wrap("<div class='ak-snippet-container' style='" + o.attr("style") + ";'><div class='ak_" + useStyle + " ak-snippet-wrap'></div></div>");
                    o.removeAttr("style");
                    ak_highlightDocument();
                    if (defaults.showNum) {
                        var newhtml = o.html();
                        newhtml = newhtml.replace(/\n/g, "</li><li>");
                        newhtml = "<ol class='ak-snippet-num'><li>" + newhtml + "</li></ol>";
                        while (newhtml.indexOf("<li></li></ol>") != -1) {
                            newhtml = newhtml.replace("<li></li></ol>", "</ol>")
                        }
                    } else {
                        var newhtml = o.html();
                        newhtml = newhtml.replace(/\n/g, "</li><li>");
                        newhtml = "<ul class='ak-snippet-no-num'><li>" + newhtml + "</li></ul>";
                        while (newhtml.indexOf("<li></li></ul>") != -1) {
                            newhtml = newhtml.replace("<li></li></ul>", "</ul>")
                        }
                    }
                    newhtml = newhtml.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                    o.html(newhtml);
                    while (o.find("li").eq(0).html() == "") {
                        o.find("li").eq(0).remove()
                    }
                    o.find("li").each(function() {
                        if ($(this).html().length < 2) {
                            var rep = ($(this).html()).replace(/\s/g, "");
                            if (rep == "") {
                                if ($.browser.opera) {
                                    $(this).html("&nbsp;")
                                } else {
                                    $(this).html("<span style='display:none;'>&nbsp;</span>")
                                }
                            }
                        }
                    });
                    var txtOnly = "<pre class='ak-snippet-textonly ak_sourceCode' style='display:none;'>" + o.data("orgHtml") + "</pre>";
                    var controls = "<div class='ak-snippet-menu ak_sourceCode' style='display:none;'><pre>" + "<a class='ak-snippet-text' href='#'>text</a>" + "</pre></div>";
                    o.parent().append(txtOnly);
                    o.parent().prepend(controls);
                    o.parent().hover(function() {
                            $(this).find(".ak-snippet-menu").fadeIn("fast")
                        },
                        function() {
                            $(this).find(".ak-snippet-menu").fadeOut("fast")
                        });
                    o.parent().find("a.ak-snippet-text").click(function() {
                        var org = $(this).parents(".ak-snippet-wrap").find(".ak-snippet-formatted");
                        var txt = $(this).parents(".ak-snippet-wrap").find(".ak-snippet-textonly");
                        org.toggle();
                        txt.toggle();
                        if (txt.is(":visible")) {
                            $(this).html("html")
                        } else {
                            $(this).html("text")
                        }
                        $(this).blur();
                        return false
                    });
                    if (defaults.collapse) {
                        var styleClass = o.parent().attr("class");
                        var collapseShow = "<div class='ak-snippet-reveal " + styleClass + "'><pre class='ak_sourceCode'><a href='#' class='ak-snippet-toggle'>" + defaults.showMsg + "</a></pre></div>";
                        var collapseHide = "<div class='ak_sourceCode ak-snippet-hide'><pre><a href='#' class='ak-snippet-revealed ak-snippet-toggle'>" + defaults.hideMsg + "</a></pre></div>";
                        o.parents(".ak-snippet-container").append(collapseShow);
                        o.parent().append(collapseHide);
                        var root = o.parents(".ak-snippet-container");
                        root.find(".ak-snippet-reveal").hide();
                        root.find(".ak-snippet-wrap").eq(0).show();
                        root.find("a.ak-snippet-toggle").click(function() {
                            root.find(".ak-snippet-wrap").toggle();
                            return false
                        })
                    }
                    if (defaults.transparent) {
                        var styleObj = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        o.css(styleObj);
                        o.next(".ak-snippet-textonly").css(styleObj);
                        o.parents(".ak-snippet-container").find(".ak-snippet-reveal pre").css(styleObj)
                    }
                    o.parents(".ak-snippet-container").find("a").addClass("ak_url")
                } else {
                    o.parent().attr("class", "ak_" + useStyle + " ak-snippet-wrap");
                    o.parents(".ak-snippet-container").find(".ak-snippet-reveal").attr("class", "ak_" + useStyle + " ak-snippet-wrap ak-snippet-reveal");
                    o.find("li.box, li.box-top, li.box-mid, li.box-bot").removeAttr("style").removeAttr("class");
                    o.find("li .box-sp").remove();
                    if (defaults.transparent) {
                        var styleObj = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        o.css(styleObj);
                        o.next(".ak-snippet-textonly").css(styleObj);
                        o.parents(".ak-snippet-container").find(".ak-snippet-hide pre").css(styleObj)
                    } else {
                        var styleObj = {
                            "background-color": "",
                            "box-shadow": "",
                            "-moz-box-shadow": "",
                            "-webkit-box-shadow": ""
                        };
                        o.css(styleObj);
                        o.next(".ak-snippet-textonly").css(styleObj);
                        o.parents(".ak-snippet-container").find(".ak-snippet-reveal pre").css(styleObj)
                    }
                    if (defaults.showNum) {
                        var list = o.find("li").eq(0).parent();
                        if (list.hasClass("ak-snippet-no-num")) {
                            list.wrap("<ol class='ak-snippet-num'></ol>");
                            var li = o.find("li").eq(0);
                            li.unwrap()
                        }
                    } else {
                        var list = o.find("li").eq(0).parent();
                        if (list.hasClass("ak-snippet-num")) {
                            list.wrap("<ul class='ak-snippet-no-num'></ul>");
                            var li = o.find("li").eq(0);
                            li.unwrap()
                        }
                    }
                    ak_highlightDocument();
                }
            } else {
                var error = "AKjs_Snippet Error: Sorry, AKjs_Snippet only formats '<pre>' elements. '<" + node + ">' elements are currently unsupported.";
                console.log(error);
                return false
            }
        })
    };
    var ak_requests = {};
    function ak_isEmailAddress(a) {
        if (/^mailto:/.test(a)) {
            return false
        }
        return a.indexOf("@") !== -1
    }
    function ak_setHref(b, c, d) {
        var a = d.substring(b[c - 2].pos, b[c - 1].pos);
        if (a.length >= 2 && a.charAt(0) === "<" && a.charAt(a.length - 1) === ">") {
            a = a.substr(1, a.length - 2)
        }
        if (ak_isEmailAddress(a)) {
            a = "mailto:" + a
        }
        b[c - 2].node.href = a
    }
    function ak_konquerorExec(b) {
        var a = [""];
        a.index = b.length;
        a.input = b;
        return a
    }
    function ak_highlightString(B, o) {
        if (/Konqueror/.test(navigator.userAgent)) {
            if (!o.konquered) {
                for (var F = 0; F < o.length; F++) {
                    for (var H = 0; H < o[F].length; H++) {
                        var G = o[F][H][0];
                        if (G.source === "$") {
                            G.exec = ak_konquerorExec
                        }
                    }
                }
                o.konquered = true
            }
        }
        var N = document.createElement("a");
        var q = document.createElement("span");
        var A = [];
        var j = 0;
        var n = [];
        var C = 0;
        var k = null;
        var x = function(i, a) {
            var p = i.length;
            if (p === 0) {
                return
            }
            if (!a) {
                var Q = n.length;
                if (Q !== 0) {
                    var r = n[Q - 1];
                    if (!r[3]) {
                        a = r[1]
                    }
                }
            }
            if (k !== a) {
                if (k) {
                    A[j++] = {
                        pos: C
                    };
                    if (k === "ak_url") {
                        ak_setHref(A, j, B)
                    }
                }
                if (a) {
                    var P;
                    if (a === "ak_url") {
                        P = N.cloneNode(false)
                    } else {
                        P = q.cloneNode(false)
                    }
                    P.className = a;
                    A[j++] = {
                        node: P,
                        pos: C
                    }
                }
            }
            C += p;
            k = a
        };
        var t = /\r\n|\r|\n/g;
        t.lastIndex = 0;
        var d = B.length;
        while (C < d) {
            var v = C;
            var l;
            var w;
            var h = t.exec(B);
            if (h === null) {
                l = d;
                w = d
            } else {
                l = h.index;
                w = t.lastIndex
            }
            var g = B.substring(v, l);
            var M = [];
            for (;;) {
                var I = C - v;
                var D;
                var y = n.length;
                if (y === 0) {
                    D = 0
                } else {
                    D = n[y - 1][2]
                }
                var O = o[D];
                var z = O.length;
                var m = M[D];
                if (!m) {
                    m = M[D] = []
                }
                var E = null;
                var u = -1;
                for (var K = 0; K < z; K++) {
                    var f;
                    if (K < m.length && (m[K] === null || I <= m[K].index)) {
                        f = m[K]
                    } else {
                        var c = O[K][0];
                        c.lastIndex = I;
                        f = c.exec(g);
                        m[K] = f
                    }
                    if (f !== null && (E === null || f.index < E.index)) {
                        E = f;
                        u = K;
                        if (f.index === I) {
                            break
                        }
                    }
                }
                if (E === null) {
                    x(g.substring(I), null);
                    break
                } else {
                    if (E.index > I) {
                        x(g.substring(I, E.index), null)
                    }
                    var e = O[u];
                    var J = e[1];
                    var b;
                    if (J instanceof Array) {
                        for (var L = 0; L < J.length; L++) {
                            b = E[L + 1];
                            x(b, J[L])
                        }
                    } else {
                        b = E[0];
                        x(b, J)
                    }
                    switch (e[2]) {
                        case - 1 : break;
                        case - 2 : n.pop();
                            break;
                        case - 3 : n.length = 0;
                            break;
                        default:
                            n.push(e);
                            break
                    }
                }
            }
            if (k) {
                A[j++] = {
                    pos: C
                };
                if (k === "ak_url") {
                    ak_setHref(A, j, B)
                }
                k = null
            }
            C = w
        }
        return A
    }
    function ak_getClasses(d) {
        var a = [];
        var b = d.className;
        if (b && b.length > 0) {
            var e = b.split(" ");
            for (var c = 0; c < e.length; c++) {
                if (e[c].length > 0) {
                    a.push(e[c])
                }
            }
        }
        return a
    }
    function ak_addClass(c, a) {
        var d = ak_getClasses(c);
        for (var b = 0; b < d.length; b++) {
            if (a.toLowerCase() === d[b].toLowerCase()) {
                return
            }
        }
        d.push(a);
        c.className = d.join(" ")
    }
    function ak_extractTagsFromNodeList(c, a) {
        var f = c.length;
        for (var d = 0; d < f; d++) {
            var e = c.item(d);
            switch (e.nodeType) {
                case 1:
                    if (e.nodeName.toLowerCase() === "br") {
                        var b;
                        if (/MSIE/.test(navigator.userAgent)) {
                            b = "\r"
                        } else {
                            b = "\n"
                        }
                        a.text.push(b);
                        a.pos++
                    } else {
                        a.tags.push({
                            node: e.cloneNode(false),
                            pos: a.pos
                        });
                        ak_extractTagsFromNodeList(e.childNodes, a);
                        a.tags.push({
                            pos: a.pos
                        })
                    }
                    break;
                case 3:
                case 4:
                    a.text.push(e.data);
                    a.pos += e.length;
                    break
            }
        }
    }
    function ak_extractTags(c, b) {
        var a = {};
        a.text = [];
        a.tags = b;
        a.pos = 0;
        ak_extractTagsFromNodeList(c.childNodes, a);
        return a.text.join("")
    }
    function ak_mergeTags(d, f) {
        var a = d.length;
        if (a === 0) {
            return f
        }
        var c = f.length;
        if (c === 0) {
            return d
        }
        var i = [];
        var e = 0;
        var b = 0;
        while (e < a && b < c) {
            var h = d[e];
            var g = f[b];
            if (h.pos <= g.pos) {
                i.push(h);
                e++
            } else {
                i.push(g);
                if (f[b + 1].pos <= h.pos) {
                    b++;
                    i.push(f[b]);
                    b++
                } else {
                    i.push({
                        pos: h.pos
                    });
                    f[b] = {
                        node: g.node.cloneNode(false),
                        pos: h.pos
                    }
                }
            }
        }
        while (e < a) {
            i.push(d[e]);
            e++
        }
        while (b < c) {
            i.push(f[b]);
            b++
        }
        return i
    }
    function ak_insertTags(k, h) {
        var g = document;
        var l = document.createDocumentFragment();
        var e = 0;
        var d = k.length;
        var b = 0;
        var j = h.length;
        var c = l;
        while (b < j || e < d) {
            var i;
            var a;
            if (e < d) {
                i = k[e];
                a = i.pos
            } else {
                a = j
            }
            if (a <= b) {
                if (i.node) {
                    var f = i.node;
                    c.appendChild(f);
                    c = f
                } else {
                    c = c.parentNode
                }
                e++
            } else {
                c.appendChild(g.createTextNode(h.substring(b, a)));
                b = a
            }
        }
        return l
    }
    function ak_highlightElement(d, g) {
        ak_addClass(d, "ak_sourceCode");
        var c = [];
        var e = ak_extractTags(d, c);
        var f = ak_highlightString(e, g);
        var b = ak_mergeTags(c, f);
        var a = ak_insertTags(b, e);
        while (d.hasChildNodes()) {
            d.removeChild(d.firstChild)
        }
        d.appendChild(a)
    }
    function ak_getXMLHttpRequest() {
        if (window.ActiveXObject) {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } else {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest()
            }
        }
        throw "No XMLHttpRequest implementation available"
    }
    function ak_load(language, element, prefix, suffix) {
        if (language in ak_requests) {
            ak_requests[language].push(element);
            return
        }
        ak_requests[language] = [element];
        var request = ak_getXMLHttpRequest();
        var url = prefix + "ak_" + language + suffix;
        request.open("GET", url, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                try {
                    if (!request.status || request.status === 200) {
                        eval(request.responseText);
                        var elements = ak_requests[language];
                        for (var i = 0; i < elements.length; i++) {
                            ak_highlightElement(elements[i], ak_languages[language])
                        }
                    } else {
                        throw "HTTP error: status " + request.status
                    }
                } finally {
                    request = null
                }
            }
        };
        request.send(null)
    }
    function ak_highlightDocument(prefix, suffix) {
        var nodeList = document.getElementsByTagName("pre");
        for (var i = 0; i < nodeList.length; i++) {
            var element = nodeList.item(i);
            var htmlClasses = element.className.toLowerCase();
            var htmlClass = htmlClasses.replace(/ak_sourcecode/g, "");
            if (htmlClass.indexOf("ak_") != -1) {
                htmlClass = htmlClass.match(/(\bak_)\w+\b/g)[0]
            }
            if (htmlClasses.indexOf("ak_sourcecode") != -1) {
                continue
            }
            if (htmlClass.substr(0, 3) === "ak_") {
                var language = htmlClass.substring(3);
                if (language in ak_languages) {
                    ak_highlightElement(element, ak_languages[language])
                } else {
                    if (typeof(prefix) === "string" && typeof(suffix) === "string") {
                        ak_load(language, element, prefix, suffix)
                    } else {
                        console.log('Found <pre> element with class="' + htmlClass + '", but no such language exists');
                        continue
                    }
                }
                break
            }
        }
    }
    if (!this.ak_languages) {
        this.ak_languages = {}
    }
    ak_languages.c = [[[/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 13], [/'/g, "ak_string", 14], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/$/g, null, -2], [/</g, "ak_string", 11], [/"/g, "ak_string", 12], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.cpp = [[[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 13], [/'/g, "ak_string", 14], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/$/g, null, -2], [/</g, "ak_string", 11], [/"/g, "ak_string", 12], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.csharp = [[[/\b(?:using)\b/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))(?:[FfDdMmUulL]+)?\b/g, "ak_number", -1], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:abstract|event|new|struct|as|explicit|null|switch|base|extern|this|false|operator|throw|break|finally|out|true|fixed|override|try|case|params|typeof|catch|for|private|foreach|protected|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|continue|in|return|virtual|default|interface|sealed|volatile|delegate|internal|do|is|sizeof|while|lock|stackalloc|else|static|enum|namespace|get|partial|set|value|where|yield)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 10, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 13], [/'/g, "ak_string", 14], [/\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/$/g, null, -2], [/</g, "ak_string", 11], [/"/g, "ak_string", 12], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.css = [[[/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/(?:\.|#)[A-Za-z0-9_]+/g, "ak_selector", -1], [/\{/g, "ak_cbracket", 10, 1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\}/g, "ak_cbracket", -2], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/[A-Za-z0-9_-]+[ \t]*:/g, "ak_property", -1], [/[.%A-Za-z0-9_-]+/g, "ak_value", -1], [/#(?:[A-Za-z0-9_]+)/g, "ak_string", -1]]];
    ak_languages.flex = [[[/^%\{/g, "ak_preproc", 1, 1], [/^%[sx]/g, "ak_preproc", 16, 1], [/^%option/g, "ak_preproc", 17, 1], [/^%(?:array|pointer|[aceknopr])/g, "ak_preproc", -1], [/[A-Za-z_][A-Za-z0-9_-]*/g, "ak_preproc", 19, 1], [/^%%/g, "ak_preproc", 20, 1]], [[/^%\}/g, "ak_preproc", -2], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 2], [/\/\//g, "ak_comment", 8], [/\/\*\*/g, "ak_comment", 9], [/\/\*/g, "ak_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 14], [/'/g, "ak_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 3, 1], [/<!DOCTYPE/g, "ak_preproc", 5, 1], [/<!--/g, "ak_comment", 6], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 7, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 7, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 4]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 4]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 6]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 4]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 3, 1], [/<!DOCTYPE/g, "ak_preproc", 5, 1], [/<!--/g, "ak_comment", 6], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 7, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 7, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/$/g, null, -2], [/</g, "ak_string", 12], [/"/g, "ak_string", 13], [/\/\/\//g, "ak_comment", 2], [/\/\//g, "ak_comment", 8], [/\/\*\*/g, "ak_comment", 9], [/\/\*/g, "ak_comment", 10]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/$/g, null, -2], [/[A-Za-z_][A-Za-z0-9_-]*/g, "ak_function", -1]], [[/$/g, null, -2], [/[A-Za-z_][A-Za-z0-9_-]*/g, "ak_keyword", -1], [/"/g, "ak_string", 18], [/=/g, "ak_symbol", -1]], [[/$/g, null, -2], [/"/g, "ak_string", -2]], [[/$/g, null, -2], [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "ak_type", -1], [/"/g, "ak_string", 13], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1]], [[/^%%/g, "ak_preproc", 21, 1], [/<[A-Za-z_][A-Za-z0-9_-]*>/g, "ak_function", -1], [/"/g, "ak_string", 13], [/\\./g, "ak_preproc", -1], [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "ak_type", -1], [/\/\*/g, "ak_comment", 22], [/\{/g, "ak_cbracket", 23, 1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1]], [[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 2], [/\/\//g, "ak_comment", 8], [/\/\*\*/g, "ak_comment", 9], [/\/\*/g, "ak_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 14], [/'/g, "ak_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/\*\//g, "ak_comment", -2], [/\/\*/g, "ak_comment", 22]], [[/\}/g, "ak_cbracket", -2], [/\{/g, "ak_cbracket", 23, 1], [/\$./g, "ak_variable", -1], [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 2], [/\/\//g, "ak_comment", 8], [/\/\*\*/g, "ak_comment", 9], [/\/\*/g, "ak_comment", 10], [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/^[ \t]*#(?:[ \t]*include)/g, "ak_preproc", 11, 1], [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 14], [/'/g, "ak_string", 15], [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]]];
    ak_languages.html = [[[/<\?xml/g, "ak_preproc", 1, 1], [/<!DOCTYPE/g, "ak_preproc", 3, 1], [/<!--/g, "ak_comment", 4], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 5, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 5, 1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 4]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]]];
    ak_languages.java = [[[/\b(?:import|package)\b/g, "ak_preproc", -1], [/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 10], [/'/g, "ak_string", 11], [/(\b(?:class|interface))([ \t]+)([$A-Za-z0-9_]+)/g, ["ak_keyword", "ak_normal", "ak_classname"], -1], [/\b(?:abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|false|final|finally|for|goto|if|implements|instanceof|interface|native|new|null|private|protected|public|return|static|strictfp|super|switch|synchronized|throw|throws|true|this|transient|try|volatile|while)\b/g, "ak_keyword", -1], [/\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g, "ak_type", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1], [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["ak_usertype", "ak_usertype", "ak_normal"], -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.javascript = [[[/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "ak_keyword", -1], [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["ak_symbol", "ak_normal", "ak_symbol"], -1], [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["ak_number", "ak_normal", "ak_symbol"], -1], [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["ak_normal", "ak_symbol"], -1], [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "ak_regexp", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 10], [/'/g, "ak_string", 11], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "ak_predef_var", -1], [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "ak_predef_func", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.javascript_dom = [[[/\/\/\//g, "ak_comment", 1], [/\/\//g, "ak_comment", 7], [/\/\*\*/g, "ak_comment", 8], [/\/\*/g, "ak_comment", 9], [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "ak_keyword", -1], [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["ak_symbol", "ak_normal", "ak_symbol"], -1], [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["ak_number", "ak_normal", "ak_symbol"], -1], [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["ak_normal", "ak_symbol"], -1], [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "ak_regexp", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 10], [/'/g, "ak_string", 11], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "ak_predef_var", -1], [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "ak_predef_func", -1], [/\b(?:applicationCache|closed|Components|content|controllers|crypto|defaultStatus|dialogArguments|directories|document|frameElement|frames|fullScreen|globalStorage|history|innerHeight|innerWidth|length|location|locationbar|menubar|name|navigator|opener|outerHeight|outerWidth|pageXOffset|pageYOffset|parent|personalbar|pkcs11|returnValue|screen|availTop|availLeft|availHeight|availWidth|colorDepth|height|left|pixelDepth|top|width|screenX|screenY|scrollbars|scrollMaxX|scrollMaxY|scrollX|scrollY|self|sessionStorage|sidebar|status|statusbar|toolbar|top|window)\b/g, "ak_predef_var", -1], [/\b(?:alert|addEventListener|atob|back|blur|btoa|captureEvents|clearInterval|clearTimeout|close|confirm|dump|escape|find|focus|forward|getAttention|getComputedStyle|getSelection|home|moveBy|moveTo|open|openDialog|postMessage|print|prompt|releaseEvents|removeEventListener|resizeBy|resizeTo|scroll|scrollBy|scrollByLines|scrollByPages|scrollTo|setInterval|setTimeout|showModalDialog|sizeToContent|stop|unescape|updateCommands|onabort|onbeforeunload|onblur|onchange|onclick|onclose|oncontextmenu|ondragdrop|onerror|onfocus|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpaint|onreset|onresize|onscroll|onselect|onsubmit|onunload)\b/g, "ak_predef_func", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 5]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 3]], [[/$/g, null, -2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 2, 1], [/<!DOCTYPE/g, "ak_preproc", 4, 1], [/<!--/g, "ak_comment", 5], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 6, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 6, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]]];
    ak_languages.perl = [[[/\b(?:import)\b/g, "ak_preproc", -1], [/(s)(\{(?:\\\}|[^}])*\}\{(?:\\\}|[^}])*\})([ixsmogce]*)/g, ["ak_keyword", "ak_regexp", "ak_keyword"], -1], [/(s)(\((?:\\\)|[^)])*\)\((?:\\\)|[^)])*\))([ixsmogce]*)/g, ["ak_keyword", "ak_regexp", "ak_keyword"], -1], [/(s)(\[(?:\\\]|[^\]])*\]\[(?:\\\]|[^\]])*\])([ixsmogce]*)/g, ["ak_keyword", "ak_regexp", "ak_keyword"], -1], [/(s)(<.*><.*>)([ixsmogce]*)/g, ["ak_keyword", "ak_regexp", "ak_keyword"], -1], [/(q(?:q?))(\{(?:\\\}|[^}])*\})/g, ["ak_keyword", "ak_string"], -1], [/(q(?:q?))(\((?:\\\)|[^)])*\))/g, ["ak_keyword", "ak_string"], -1], [/(q(?:q?))(\[(?:\\\]|[^\]])*\])/g, ["ak_keyword", "ak_string"], -1], [/(q(?:q?))(<.*>)/g, ["ak_keyword", "ak_string"], -1], [/(q(?:q?))([^A-Za-z0-9 \t])(.*\2)/g, ["ak_keyword", "ak_string", "ak_string"], -1], [/(s)([^A-Za-z0-9 \t])(.*\2.*\2)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["ak_keyword", "ak_regexp", "ak_regexp", "ak_keyword"], -1], [/(s)([^A-Za-z0-9 \t])(.*\2[ \t]*)([^A-Za-z0-9 \t])(.*\4)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["ak_keyword", "ak_regexp", "ak_regexp", "ak_regexp", "ak_regexp", "ak_keyword"], -1], [/#/g, "ak_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/(?:m|qr)(?=\{)/g, "ak_keyword", 2], [/(?:m|qr)(?=#)/g, "ak_keyword", 4], [/(?:m|qr)(?=\|)/g, "ak_keyword", 6], [/(?:m|qr)(?=@)/g, "ak_keyword", 8], [/(?:m|qr)(?=<)/g, "ak_keyword", 10], [/(?:m|qr)(?=\[)/g, "ak_keyword", 12], [/(?:m|qr)(?=\\)/g, "ak_keyword", 14], [/(?:m|qr)(?=\/)/g, "ak_keyword", 16], [/"/g, "ak_string", 18], [/'/g, "ak_string", 19], [/</g, "ak_string", 20], [/\/[^\n]*\//g, "ak_string", -1], [/\b(?:chomp|chop|chr|crypt|hex|i|index|lc|lcfirst|length|oct|ord|pack|q|qq|reverse|rindex|sprintf|substr|tr|uc|ucfirst|m|s|g|qw|abs|atan2|cos|exp|hex|int|log|oct|rand|sin|sqrt|srand|my|local|our|delete|each|exists|keys|values|pack|read|syscall|sysread|syswrite|unpack|vec|undef|unless|return|length|grep|sort|caller|continue|dump|eval|exit|goto|last|next|redo|sub|wantarray|pop|push|shift|splice|unshift|split|switch|join|defined|foreach|last|chop|chomp|bless|dbmclose|dbmopen|ref|tie|tied|untie|while|next|map|eq|die|cmp|lc|uc|and|do|if|else|elsif|for|use|require|package|import|chdir|chmod|chown|chroot|fcntl|glob|ioctl|link|lstat|mkdir|open|opendir|readlink|rename|rmdir|stat|symlink|umask|unlink|utime|binmode|close|closedir|dbmclose|dbmopen|die|eof|fileno|flock|format|getc|print|printf|read|readdir|rewinddir|seek|seekdir|select|syscall|sysread|sysseek|syswrite|tell|telldir|truncate|warn|write|alarm|exec|fork|getpgrp|getppid|getpriority|kill|pipe|qx|setpgrp|setpriority|sleep|system|times|x|wait|waitpid)\b/g, "ak_keyword", -1], [/^\=(?:head1|head2|item)/g, "ak_comment", 21], [/(?:\$[#]?|@|%)[\/A-Za-z0-9_]+/g, "ak_variable", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1]], [[/$/g, null, -2]], [[/\{/g, "ak_regexp", 3]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\\{|\\\}|\}/g, "ak_regexp", -3]], [[/#/g, "ak_regexp", 5]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\#|#/g, "ak_regexp", -3]], [[/\|/g, "ak_regexp", 7]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\\||\|/g, "ak_regexp", -3]], [[/@/g, "ak_regexp", 9]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\@|@/g, "ak_regexp", -3]], [[/</g, "ak_regexp", 11]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\<|\\>|>/g, "ak_regexp", -3]], [[/\[/g, "ak_regexp", 13]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\]|\]/g, "ak_regexp", -3]], [[/\\/g, "ak_regexp", 15]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\\\|\\/g, "ak_regexp", -3]], [[/\//g, "ak_regexp", 17]], [[/[ \t]+#.*/g, "ak_comment", -1], [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "ak_variable", -1], [/\\\/|\//g, "ak_regexp", -3]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|')/g, null, -1], [/'/g, "ak_string", -2]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/\=cut/g, "ak_comment", -2]]];
    ak_languages.php = [[[/\b(?:include|include_once|require|require_once)\b/g, "ak_preproc", -1], [/\/\//g, "ak_comment", 1], [/#/g, "ak_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 2], [/'/g, "ak_string", 3], [/\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g, "ak_keyword", -1], [/\/\/\//g, "ak_comment", 4], [/\/\//g, "ak_comment", 1], [/\/\*\*/g, "ak_comment", 9], [/\/\*/g, "ak_comment", 10], [/(?:\$[#]?|@|%)[A-Za-z0-9_]+/g, "ak_variable", -1], [/<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\{|\}/g, "ak_cbracket", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1]], [[/$/g, null, -2]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/\\(?:\\|')/g, null, -1], [/'/g, "ak_string", -2]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 5, 1], [/<!DOCTYPE/g, "ak_preproc", 6, 1], [/<!--/g, "ak_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 8, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 7]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 5, 1], [/<!DOCTYPE/g, "ak_preproc", 6, 1], [/<!--/g, "ak_comment", 7], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 8, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 8, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]]];
    ak_languages.python = [[[/\b(?:import|from)\b/g, "ak_preproc", -1], [/#/g, "ak_comment", 1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/\b(?:and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|global|if|in|is|lambda|not|or|pass|print|raise|return|try|while)\b/g, "ak_keyword", -1], [/^(?:[\s]*'{3})/g, "ak_comment", 2], [/^(?:[\s]*\"{3})/g, "ak_comment", 3], [/^(?:[\s]*'(?:[^\\']|\\.)*'[\s]*|[\s]*\"(?:[^\\\"]|\\.)*\"[\s]*)$/g, "ak_comment", -1], [/(?:[\s]*'{3})/g, "ak_string", 4], [/(?:[\s]*\"{3})/g, "ak_string", 5], [/"/g, "ak_string", 6], [/'/g, "ak_string", 7], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||\{|\}/g, "ak_symbol", -1], [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "ak_function", -1]], [[/$/g, null, -2]], [[/(?:'{3})/g, "ak_comment", -2]], [[/(?:\"{3})/g, "ak_comment", -2]], [[/(?:'{3})/g, "ak_string", -2]], [[/(?:\"{3})/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|')/g, null, -1], [/'/g, "ak_string", -2]]];
    ak_languages.ruby = [[[/\b(?:require)\b/g, "ak_preproc", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1], [/"/g, "ak_string", 1], [/'/g, "ak_string", 2], [/</g, "ak_string", 3], [/\/[^\n]*\//g, "ak_regexp", -1], [/(%r)(\{(?:\\\}|#\{[A-Za-z0-9]+\}|[^}])*\})/g, ["ak_symbol", "ak_regexp"], -1], [/\b(?:alias|begin|BEGIN|break|case|defined|do|else|elsif|end|END|ensure|for|if|in|include|loop|next|raise|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|false|nil|self|true|__FILE__|__LINE__|and|not|or|def|class|module|catch|fail|load|throw)\b/g, "ak_keyword", -1], [/(?:^\=begin)/g, "ak_comment", 4], [/(?:\$[#]?|@@|@)(?:[A-Za-z0-9_]+|'|\"|\/)/g, "ak_type", -1], [/[A-Za-z0-9]+(?:\?|!)/g, "ak_normal", -1], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/(#)(\{)/g, ["ak_symbol", "ak_cbracket"], -1], [/#/g, "ak_comment", 5], [/\{|\}/g, "ak_cbracket", -1]], [[/$/g, null, -2], [/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/$/g, null, -2], [/\\(?:\\|')/g, null, -1], [/'/g, "ak_string", -2]], [[/$/g, null, -2], [/>/g, "ak_string", -2]], [[/^(?:\=end)/g, "ak_comment", -2]], [[/$/g, null, -2]]];
    ak_languages.sql = [[[/\b(?:VARCHAR|TINYINT|TEXT|DATE|SMALLINT|MEDIUMINT|INT|BIGINT|FLOAT|DOUBLE|DECIMAL|DATETIME|TIMESTAMP|TIME|YEAR|UNSIGNED|CHAR|TINYBLOB|TINYTEXT|BLOB|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|BOOL|BINARY|VARBINARY)\b/gi, "ak_type", -1], [/\b(?:ALL|ASC|AS|ALTER|AND|ADD|AUTO_INCREMENT|BETWEEN|BINARY|BOTH|BY|BOOLEAN|CHANGE|CHECK|COLUMNS|COLUMN|CROSS|CREATE|DATABASES|DATABASE|DATA|DELAYED|DESCRIBE|DESC|DISTINCT|DELETE|DROP|DEFAULT|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FIELD|FLUSH|FOR|FOREIGN|FUNCTION|FROM|GROUP|GRANT|HAVING|IGNORE|INDEX|INFILE|INSERT|INNER|INTO|IDENTIFIED|IN|IS|IF|JOIN|KEYS|KILL|KEY|LEADING|LIKE|LIMIT|LINES|LOAD|LOCAL|LOCK|LOW_PRIORITY|LEFT|LANGUAGE|MODIFY|NATURAL|NOT|NULL|NEXTVAL|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUTFILE|OR|OUTER|ON|PROCEDURE|PROCEDURAL|PRIMARY|READ|REFERENCES|REGEXP|RENAME|REPLACE|RETURN|REVOKE|RLIKE|RIGHT|SHOW|SONAME|STATUS|STRAIGHT_JOIN|SELECT|SETVAL|SET|TABLES|TERMINATED|TO|TRAILING|TRUNCATE|TABLE|TEMPORARY|TRIGGER|TRUSTED|UNIQUE|UNLOCK|USE|USING|UPDATE|VALUES|VARIABLES|VIEW|WITH|WRITE|WHERE|ZEROFILL|TYPE|XOR)\b/gi, "ak_keyword", -1], [/"/g, "ak_string", 1], [/'/g, "ak_string", 2], [/`/g, "ak_string", 3], [/#/g, "ak_comment", 4], [/\/\/\//g, "ak_comment", 5], [/\/\//g, "ak_comment", 4], [/\/\*\*/g, "ak_comment", 11], [/\/\*/g, "ak_comment", 12], [/--/g, "ak_comment", 4], [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "ak_symbol", -1], [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "ak_number", -1]], [[/"/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/'/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/`/g, "ak_string", -2], [/\\./g, "ak_specialchar", -1]], [[/$/g, null, -2]], [[/$/g, null, -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 6, 1], [/<!DOCTYPE/g, "ak_preproc", 8, 1], [/<!--/g, "ak_comment", 9], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 10, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 10, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 7]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 7]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 9]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 7]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/<\?xml/g, "ak_preproc", 6, 1], [/<!DOCTYPE/g, "ak_preproc", 8, 1], [/<!--/g, "ak_comment", 9], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 10, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "ak_keyword", 10, 1], [/@[A-Za-z]+/g, "ak_type", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]], [[/\*\//g, "ak_comment", -2], [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "ak_url", -1], [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "ak_todo", -1]]];
    ak_languages["url"] = [[{"regex": /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g, "style": "ak_url"}, {"regex": /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g, "style": "ak_url"}]];
    ak_languages.xml = [[[/<\?xml/g, "ak_preproc", 1, 1], [/<!DOCTYPE/g, "ak_preproc", 3, 1], [/<!--/g, "ak_comment", 4], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "ak_keyword", -1], [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "ak_keyword", 5, 1], [/&(?:[A-Za-z0-9]+);/g, "ak_preproc", -1]], [[/\?>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/\\(?:\\|")/g, null, -1], [/"/g, "ak_string", -2]], [[/>/g, "ak_preproc", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]], [[/-->/g, "ak_comment", -2], [/<!--/g, "ak_comment", 4]], [[/(?:\/)?>/g, "ak_keyword", -2], [/([^=" \t>]+)([ \t]*)(=?)/g, ["ak_type", "ak_normal", "ak_symbol"], -1], [/"/g, "ak_string", 2]]];

})(jQuery);