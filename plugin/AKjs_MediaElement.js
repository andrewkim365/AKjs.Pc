﻿var akjs = akjs || {};
akjs.meIndex = 0,
akjs.plugins = {
    silverlight: [{
        version: [3, 0],
        types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
    }],
    flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/dailymotion", "video/x-dailymotion", "application/x-mpegURL"]
    }],
    vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
    }]
},
akjs.Utility = {
    encodeUrl: function(a) {
        return encodeURIComponent(a)
    },
    escapeHTML: function(a) {
        return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
    },
    absolutizeUrl: function(a) {
        var b = document.createElement("div");
        return b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>',
            b.firstChild.href
    },
    getScriptPath: function(a) {
        for (var b, c, d, e, f, g, h = 0,
                 i = "",
                 j = "",
                 k = document.getElementsByTagName("script"), l = k.length, m = a.length; l > h; h++) {
            for (e = k[h].src, c = e.lastIndexOf("/"), c > -1 ? (g = e.substring(c + 1), f = e.substring(0, c + 1)) : (g = e, f = ""), b = 0; m > b; b++) if (j = a[b], d = g.indexOf(j), d > -1) {
                i = f;
                break
            }
            if ("" !== i) break
        }
        return i
    },
    secondsToTimeCode: function(a, b, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var e = Math.floor(a / 3600) % 24,
            f = Math.floor(a / 60) % 60,
            g = Math.floor(a % 60),
            h = Math.floor((a % 1 * d).toFixed(3)),
            i = (b || e > 0 ? (10 > e ? "0" + e: e) + ":": "") + (10 > f ? "0" + f: f) + ":" + (10 > g ? "0" + g: g) + (c ? ":" + (10 > h ? "0" + h: h) : "");
        return i
    },
    timeCodeToSeconds: function(a, b, c, d) {
        "undefined" == typeof c ? c = !1 : "undefined" == typeof d && (d = 25);
        var e = a.split(":"),
            f = parseInt(e[0], 10),
            g = parseInt(e[1], 10),
            h = parseInt(e[2], 10),
            i = 0,
            j = 0;
        return c && (i = parseInt(e[3]) / d),
            j = 3600 * f + 60 * g + h + i
    },
    convertSMPTEtoSeconds: function(a) {
        if ("string" != typeof a) return ! 1;
        a = a.replace(",", ".");
        var b = 0,
            c = -1 != a.indexOf(".") ? a.split(".")[1].length: 0,
            d = 1;
        a = a.split(":").reverse();
        for (var e = 0; e < a.length; e++) d = 1,
        e > 0 && (d = Math.pow(60, e)),
            b += Number(a[e]) * d;
        return Number(b.toFixed(c))
    },
    removeSwf: function(a) {
        var b = document.getElementById(a);
        b && /object|embed/i.test(b.nodeName) && (akjs.MediaFeatures.isIE ? (b.style.display = "none",
            function() {
                4 == b.readyState ? akjs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10)
            } ()) : b.parentNode.removeChild(b))
    },
    removeObjectInIE: function(a) {
        var b = document.getElementById(a);
        if (b) {
            for (var c in b)"function" == typeof b[c] && (b[c] = null);
            b.parentNode.removeChild(b)
        }
    }
},
akjs.PluginDetector = {
    hasPluginVersion: function(a, b) {
        var c = this.plugins[a];
        return b[1] = b[1] || 0,
            b[2] = b[2] || 0,
            c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? !0 : !1
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(a, b, c, d, e) {
        this.plugins[a] = this.detectPlugin(b, c, d, e)
    },
    detectPlugin: function(a, b, c, d) {
        var e, f, g, h = [0, 0, 0];
        if ("undefined" != typeof this.nav.plugins && "object" == typeof this.nav.plugins[a]) {
            if (e = this.nav.plugins[a].description, e && ("undefined" == typeof this.nav.mimeTypes || !this.nav.mimeTypes[b] || this.nav.mimeTypes[b].enabledPlugin)) for (h = e.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), f = 0; f < h.length; f++) h[f] = parseInt(h[f].match(/\d+/), 10)
        } else if ("undefined" != typeof window.ActiveXObject) try {
            g = new ActiveXObject(c),
            g && (h = d(g))
        } catch(i) {}
        return h
    }
},
akjs.MediaFeatures = {
    init: function() {
        var a, b, c = this,
            d = document,
            e = akjs.PluginDetector.nav,
            f = akjs.PluginDetector.ua.toLowerCase(),
            g = ["source", "track", "audio", "video"];
        c.isiPad = null !== f.match(/ipad/i),
            c.isiPhone = null !== f.match(/iphone/i),
            c.isiOS = c.isiPhone || c.isiPad,
            c.isAndroid = null !== f.match(/android/i),
            c.isBustedAndroid = null !== f.match(/android 2\.[12]/),
            c.isBustedNativeHTTPS = "https:" === location.protocol && (null !== f.match(/android [12]\./) || null !== f.match(/macintosh.* version.* safari/)),
            c.isIE = -1 != e.appName.toLowerCase().indexOf("microsoft") || null !== e.appName.toLowerCase().match(/trident/gi),
            c.isChrome = null !== f.match(/chrome/gi),
            c.isChromium = null !== f.match(/chromium/gi),
            c.isFirefox = null !== f.match(/firefox/gi),
            c.isWebkit = null !== f.match(/webkit/gi),
            c.isGecko = null !== f.match(/gecko/gi) && !c.isWebkit && !c.isIE,
            c.isOpera = null !== f.match(/opera/gi),
            c.hasTouch = "ontouchstart" in window,
            c.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
        for (a = 0; a < g.length; a++) b = document.createElement(g[a]);
        c.supportsMediaTag = "undefined" != typeof b.canPlayType || c.isBustedAndroid;
        try {
            b.canPlayType("video/mp4")
        } catch(h) {
            c.supportsMediaTag = !1
        }
        c.hasSemiNativeFullScreen = "undefined" != typeof b.webkitEnterFullscreen,
            c.hasNativeFullscreen = "undefined" != typeof b.requestFullscreen,
            c.hasWebkitNativeFullScreen = "undefined" != typeof b.webkitRequestFullScreen,
            c.hasMozNativeFullScreen = "undefined" != typeof b.mozRequestFullScreen,
            c.hasMsNativeFullScreen = "undefined" != typeof b.msRequestFullscreen,
            c.hasTrueNativeFullScreen = c.hasWebkitNativeFullScreen || c.hasMozNativeFullScreen || c.hasMsNativeFullScreen,
            c.nativeFullScreenEnabled = c.hasTrueNativeFullScreen,
            c.hasMozNativeFullScreen ? c.nativeFullScreenEnabled = document.mozFullScreenEnabled: c.hasMsNativeFullScreen && (c.nativeFullScreenEnabled = document.msFullscreenEnabled),
        c.isChrome && (c.hasSemiNativeFullScreen = !1),
        c.hasTrueNativeFullScreen && (c.fullScreenEventName = "", c.hasWebkitNativeFullScreen ? c.fullScreenEventName = "webkitfullscreenchange": c.hasMozNativeFullScreen ? c.fullScreenEventName = "mozfullscreenchange": c.hasMsNativeFullScreen && (c.fullScreenEventName = "MSFullscreenChange"), c.isFullScreen = function() {
            return c.hasMozNativeFullScreen ? d.mozFullScreen: c.hasWebkitNativeFullScreen ? d.webkitIsFullScreen: c.hasMsNativeFullScreen ? null !== d.msFullscreenElement: void 0
        },
            c.requestFullScreen = function(a) {
                c.hasWebkitNativeFullScreen ? a.webkitRequestFullScreen() : c.hasMozNativeFullScreen ? a.mozRequestFullScreen() : c.hasMsNativeFullScreen && a.msRequestFullscreen()
            },
            c.cancelFullScreen = function() {
                c.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : c.hasMozNativeFullScreen ? document.mozCancelFullScreen() : c.hasMsNativeFullScreen && document.msExitFullscreen()
            }),
        c.hasSemiNativeFullScreen && f.match(/mac os x 10_5/i) && (c.hasNativeFullScreen = !1, c.hasSemiNativeFullScreen = !1)
    }
},
akjs.MediaFeatures.init(),
akjs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function(a) {
        this.currentTime = a
    },
    setMuted: function(a) {
        this.muted = a
    },
    setVolume: function(a) {
        this.volume = a
    },
    stop: function() {
        this.pause()
    },
    setSrc: function(a) {
        for (var b = this.getElementsByTagName("source"); b.length > 0;) this.removeChild(b[0]);
        if ("string" == typeof a) this.src = a;
        else {
            var c, d;
            for (c = 0; c < a.length; c++) if (d = a[c], this.canPlayType(d.type)) {
                this.src = d.src;
                break
            }
        }
    },
    setVideoSize: function(a, b) {
        this.width = a,
            this.height = b
    }
},
akjs.MediaPluginBridge = {
    pluginMediaElements: {},
    htmlMediaElements: {},
    registerPluginElement: function(a, b, c) {
        this.pluginMediaElements[a] = b,
            this.htmlMediaElements[a] = c
    },
    unregisterPluginElement: function(a) {
        delete this.pluginMediaElements[a],
            delete this.htmlMediaElements[a]
    },
    initPlugin: function(a) {
        var b = this.pluginMediaElements[a],
            c = this.htmlMediaElements[a];
        if (b) {
            switch (b.pluginType) {
                case "flash":
                    b.pluginElement = b.pluginApi = document.getElementById(a);
                    break;
                case "silverlight":
                    b.pluginElement = document.getElementById(b.id),
                        b.pluginApi = b.pluginElement.Content.MediaElementJS
            }
            null != b.pluginApi && b.success && b.success(b, c)
        }
    },
    fireEvent: function(a, b, c) {
        var d, e, f, g = this.pluginMediaElements[a];
        if (g) {
            d = {
                type: b,
                target: g
            };
            for (e in c) g[e] = c[e],
                d[e] = c[e];
            f = c.bufferedTime || 0,
                d.target.buffered = d.buffered = {
                    start: function() {
                        return 0
                    },
                    end: function() {
                        return f
                    },
                    length: 1
                },
                g.dispatchEvent(d.type, d)
        }
    }
},
akjs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight","vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: akjs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: .8,
    success: function() {},
    error: function() {}
},
akjs.MediaElement = function(a, b) {
    return akjs.HtmlMediaElementShim.create(a, b)
},
akjs.HtmlMediaElementShim = {
    create: function(a, b) {
        var c, d, e = akjs.MediaElementDefaults,
            f = "string" == typeof a ? document.getElementById(a) : a,
            g = f.tagName.toLowerCase(),
            h = "audio" === g || "video" === g,
            i = f.getAttribute(h ? "src": "href"),
            j = f.getAttribute("poster"),
            k = f.getAttribute("autoplay"),
            l = f.getAttribute("preload"),
            m = f.getAttribute("controls");
        for (d in b) e[d] = b[d];
        return i = "undefined" == typeof i || null === i || "" == i ? null: i,
            j = "undefined" == typeof j || null === j ? "": j,
            l = "undefined" == typeof l || null === l || "false" === l ? "none": l,
            k = !("undefined" == typeof k || null === k || "false" === k),
            m = !("undefined" == typeof m || null === m || "false" === m),
            c = this.determinePlayback(f, e, akjs.MediaFeatures.supportsMediaTag, h, i),
            c.url = null !== c.url ? akjs.Utility.absolutizeUrl(c.url) : "",
            "native" == c.method ? (akjs.MediaFeatures.isBustedAndroid && (f.src = c.url, f.addEventListener("click",
                function() {
                    f.play()
                },
                !1)), this.updateNative(c, e, k, l)) : "" !== c.method ? this.createPlugin(c, e, j, k, l, m) : (this.createErrorMessage(c, e, j), this)
    },
    determinePlayback: function(a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = [],
            r = {
                method: "",
                url: "",
                htmlMediaElement: a,
                isVideo: "audio" != a.tagName.toLowerCase()
            };
        if ("undefined" != typeof b.type && "" !== b.type) if ("string" == typeof b.type) q.push({
            type: b.type,
            url: e
        });
        else for (f = 0; f < b.type.length; f++) q.push({
                type: b.type[f],
                url: e
            });
        else if (null !== e) k = this.formatType(e, a.getAttribute("type")),
            q.push({
                type: k,
                url: e
            });
        else for (f = 0; f < a.childNodes.length; f++) j = a.childNodes[f],
            1 == j.nodeType && "source" == j.tagName.toLowerCase() && (e = j.getAttribute("src"), k = this.formatType(e, j.getAttribute("type")), p = j.getAttribute("media"), (!p || !window.matchMedia || window.matchMedia && window.matchMedia(p).matches) && q.push({
                type: k,
                url: e
            }));
        if (!d && q.length > 0 && null !== q[0].url && this.getTypeFromFile(q[0].url).indexOf("audio") > -1 && (r.isVideo = !1), akjs.MediaFeatures.isBustedAndroid && (a.canPlayType = function(a) {
                return null !== a.match(/video\/(mp4|m4v)/gi) ? "maybe": ""
            }), akjs.MediaFeatures.isChromium && (a.canPlayType = function(a) {
                return null !== a.match(/video\/(webm|ogv|ogg)/gi) ? "maybe": ""
            }), !(!c || "auto" !== b.mode && "auto_plugin" !== b.mode && "native" !== b.mode || akjs.MediaFeatures.isBustedNativeHTTPS && b.httpsBasicAuthSite === !0)) {
            for (d || (o = document.createElement(r.isVideo ? "video": "audio"), a.parentNode.insertBefore(o, a), a.style.display = "none", r.htmlMediaElement = a = o), f = 0; f < q.length; f++) if ("video/m3u8" == q[f].type || "" !== a.canPlayType(q[f].type).replace(/no/, "") || "" !== a.canPlayType(q[f].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== a.canPlayType(q[f].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                r.method = "native",
                    r.url = q[f].url;
                break
            }
            if ("native" === r.method && (null !== r.url && (a.src = r.url), "auto_plugin" !== b.mode)) return r
        }
        if ("auto" === b.mode || "auto_plugin" === b.mode || "shim" === b.mode) for (f = 0; f < q.length; f++) for (k = q[f].type, g = 0; g < b.plugins.length; g++) for (l = b.plugins[g], m = akjs.plugins[l], h = 0; h < m.length; h++) if (n = m[h], null == n.version || akjs.PluginDetector.hasPluginVersion(l, n.version)) for (i = 0; i < n.types.length; i++) if (k == n.types[i]) return r.method = l,
            r.url = q[f].url,
            r;
        return "auto_plugin" === b.mode && "native" === r.method ? r: ("" === r.method && q.length > 0 && (r.url = q[0].url), r)
    },
    formatType: function(a, b) {
        return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b
    },
    getTypeFromFile: function(a) {
        a = a.split("?")[0];
        var b = a.substring(a.lastIndexOf(".") + 1).toLowerCase();
        return (/(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b) ? "video": "audio") + "/" + this.getTypeFromExtension(b)
    },
    getTypeFromExtension: function(a) {
        switch (a) {
            case "mp4":
            case "m4v":
            case "m4a":
                return "mp4";
            case "webm":
            case "webma":
            case "webmv":
                return "webm";
            case "ogg":
            case "oga":
            case "ogv":
                return "ogg";
            default:
                return a
        }
    },
    createErrorMessage: function(a, b, c) {
        var d = a.htmlMediaElement,
            e = document.createElement("div");
        e.className = "me-cannotplay";
        try {
            e.style.width = d.width + "px",
                e.style.height = d.height + "px"
        } catch(f) {}
        e.innerHTML = b.customError ? b.customError: "" !== c ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>': '<a href="' + a.url + '"><span>' + akjs.i18n.t("Download File") + "</span></a>",
            d.parentNode.insertBefore(e, d),
            d.style.display = "none",
            b.error(d)
    },
    createPlugin: function(a, b, c, d, e, f) {
        var g, h, i, j = a.htmlMediaElement,
            k = 1,
            l = 1,
            m = "me_" + a.method + "_" + akjs.meIndex++,
            n = new akjs.PluginMediaElement(m, a.method, a.url),
            o = document.createElement("div");
        n.tagName = j.tagName;
        for (var p = 0; p < j.attributes.length; p++) {
            var q = j.attributes[p];
            1 == q.specified && n.setAttribute(q.name, q.value)
        }
        for (h = j.parentNode; null !== h && null != h.tagName && "body" !== h.tagName.toLowerCase() && null != h.parentNode && null != h.parentNode.tagName && null != h.parentNode.constructor && "ShadowRoot" === h.parentNode.constructor.name;) {
            if ("p" === h.parentNode.tagName.toLowerCase()) {
                h.parentNode.parentNode.insertBefore(h, h.parentNode);
                break
            }
            h = h.parentNode
        }
        switch (a.isVideo ? (k = b.pluginWidth > 0 ? b.pluginWidth: b.videoWidth > 0 ? b.videoWidth: null !== j.getAttribute("width") ? j.getAttribute("width") : b.defaultVideoWidth, l = b.pluginHeight > 0 ? b.pluginHeight: b.videoHeight > 0 ? b.videoHeight: null !== j.getAttribute("height") ? j.getAttribute("height") : b.defaultVideoHeight, k = akjs.Utility.encodeUrl(k), l = akjs.Utility.encodeUrl(l)) : b.enablePluginDebug && (k = 320, l = 240), n.success = b.success, akjs.MediaPluginBridge.registerPluginElement(m, n, j), o.className = "abs", o.id = m + "_container", a.isVideo ? j.parentNode.insertBefore(o, j) : document.body.insertBefore(o, document.body.childNodes[0]), i = ["id=" + m, "jsinitfunction=akjs.MediaPluginBridge.initPlugin", "jscallbackfunction=akjs.MediaPluginBridge.fireEvent", "isvideo=" + (a.isVideo ? "true": "false"), "autoplay=" + (d ? "true": "false"), "preload=" + e, "width=" + k, "startvolume=" + b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + l, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam], null !== a.url && i.push("flash" == a.method ? "file=" + akjs.Utility.encodeUrl(a.url) : "file=" + a.url), b.enablePluginDebug && i.push("debug=true"), b.enablePluginSmoothing && i.push("smoothing=true"), b.enablePseudoStreaming && i.push("pseudostreaming=true"), f && i.push("controls=true"), b.pluginVars && (i = i.concat(b.pluginVars)), a.method) {
            case "silverlight":
                o.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + m + '" name="' + m + '" width="' + k + '" height="' + l + '" class="ak-shim"><param name="initParams" value="' + i.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>';
                break;
            case "flash":
                akjs.MediaFeatures.isIE ? (g = document.createElement("div"), o.appendChild(g), g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + m + '" width="' + k + '" height="' + l + '" class="ak-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + i.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : o.innerHTML = '<embed id="' + m + '" name="' + m + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + i.join("&") + '" width="' + k + '" height="' + l + '" scale="default"class="ak-shim"></embed>';
                break;
            case "vimeo":
                var s = m + "_player";
                if (n.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1), o.innerHTML = '<iframe src="//player.vimeo.com/video/' + n.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + s + '" width="' + k + '" height="' + l + '" frameborder="0" class="ak-shim" id="' + s + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                    var t = $f(o.childNodes[0]);
                    t.addEvent("ready",
                        function() {
                            function a(a, b, c, d) {
                                var e = {
                                    type: c,
                                    target: b
                                };
                                "timeupdate" == c && (b.currentTime = e.currentTime = d.seconds, b.duration = e.duration = d.duration),
                                    b.dispatchEvent(e.type, e)
                            }
                            t.playVideo = function() {
                                t.api("play")
                            },
                                t.stopVideo = function() {
                                    t.api("unload")
                                },
                                t.pauseVideo = function() {
                                    t.api("pause")
                                },
                                t.seekTo = function(a) {
                                    t.api("seekTo", a)
                                },
                                t.setVolume = function(a) {
                                    t.api("setVolume", a)
                                },
                                t.setMuted = function(a) {
                                    a ? (t.lastVolume = t.api("getVolume"), t.api("setVolume", 0)) : (t.api("setVolume", t.lastVolume), delete t.lastVolume)
                                },
                                t.addEvent("play",
                                    function() {
                                        a(t, n, "play"),
                                            a(t, n, "playing")
                                    }),
                                t.addEvent("pause",
                                    function() {
                                        a(t, n, "pause")
                                    }),
                                t.addEvent("finish",
                                    function() {
                                        a(t, n, "ended")
                                    }),
                                t.addEvent("playProgress",
                                    function(b) {
                                        a(t, n, "timeupdate", b)
                                    }),
                                n.pluginElement = o,
                                n.pluginApi = t,
                                akjs.MediaPluginBridge.initPlugin(m)
                        })
                } else console.warn("You need to include froogaloop for vimeo to work")
        }
        return j.style.display = "none",
            j.removeAttribute("autoplay"),
            n
    },
    updateNative: function(a, b) {
        var c, d = a.htmlMediaElement;
        for (c in akjs.HtmlMediaElement) d[c] = akjs.HtmlMediaElement[c];
        return b.success(d, d),
            d
    }
},
function(a, b) {
    "use strict";
    var c = {
        locale: {
            language: b.i18n && b.i18n.locale.language || "",
            strings: b.i18n && b.i18n.locale.strings || {}
        },
        ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        methods: {}
    };
    c.getLanguage = function() {
        var a = c.locale.language || window.navigator.userLanguage || window.navigator.language;
        return c.ietf_lang_regex.exec(a) ? a: null
    },
    "undefined" != typeof akjsL10n && (c.locale.language = akjsL10n.language),
        c.methods.checkPlain = function(a) {
            var b, c, d = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            a = String(a);
            for (b in d) d.hasOwnProperty(b) && (c = new RegExp(b, "g"), a = a.replace(c, d[b]));
            return a
        },
        c.methods.t = function(a, b) {
            return c.locale.strings && c.locale.strings[b.context] && c.locale.strings[b.context][a] && (a = c.locale.strings[b.context][a]),
                c.methods.checkPlain(a)
        },
        c.t = function(a, b) {
            if ("string" == typeof a && a.length > 0) {
                var d = c.getLanguage();
                return b = b || {
                    context: d
                },
                    c.methods.t(a, b)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        },
        b.i18n = c
} (document, akjs)
"undefined" != typeof jQuery ? akjs.$ = jQuery: "undefined" != typeof ender && (akjs.$ = ender),
function(a) {akjs.MepDefaults = {
        poster: "",
        showPosterWhenEnded: !1,
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        videoWidth: -1,
        videoHeight: -1,
        defaultAudioWidth: 400,
        defaultAudioHeight: 30,
        defaultSeekBackwardInterval: function(a) {
            return.05 * a.duration
        },
        defaultSeekForwardInterval: function(a) {
            return.05 * a.duration
        },
        setDimensions: !0,
        audioWidth: -1,
        audioHeight: -1,
        startVolume: .8,
        loop: !1,
        autoRewind: !0,
        enableAutosize: !0,
        alwaysShowHours: !1,
        showTimecodeFrameCount: !1,
        framesPerSecond: 25,
        autosizeProgress: !0,
        alwaysShowControls: !1,
        hideVideoControlsOnLoad: !1,
        clickToPlayPause: !0,
        iPadUseNativeControls: !1,
        iPhoneUseNativeControls: !1,
        AndroidUseNativeControls: !1,
        features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
        isVideo: !0,
        enableKeyboard: !0,
        pauseOtherPlayers: !0,
        keyActions: [{
            keys: [32, 179],
            action: function(a, b) {
                b.paused || b.ended ? a.play() : a.pause()
            }
        },
            {
                keys: [38],
                action: function(a, b) {
                    a.container.find(".ak-volume-slider").css("display", "block"),
                    a.isVideo && (a.showControls(), a.startControlsTimer());
                    var c = Math.min(b.volume + .1, 1);
                    b.setVolume(c)
                }
            },
            {
                keys: [40],
                action: function(a, b) {
                    a.container.find(".ak-volume-slider").css("display", "block"),
                    a.isVideo && (a.showControls(), a.startControlsTimer());
                    var c = Math.max(b.volume - .1, 0);
                    b.setVolume(c)
                }
            },
            {
                keys: [37, 227],
                action: function(a, b) {
                    if (!isNaN(b.duration) && b.duration > 0) {
                        a.isVideo && (a.showControls(), a.startControlsTimer());
                        var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0);
                        b.setCurrentTime(c)
                    }
                }
            },
            {
                keys: [39, 228],
                action: function(a, b) {
                    if (!isNaN(b.duration) && b.duration > 0) {
                        a.isVideo && (a.showControls(), a.startControlsTimer());
                        var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration);
                        b.setCurrentTime(c)
                    }
                }
            },
            {
                keys: [70],
                action: function(a) {
                    "undefined" != typeof a.enterFullScreen && (a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen())
                }
            },
            {
                keys: [77],
                action: function(a) {
                    a.container.find(".ak-volume-slider").css("display", "block"),
                    a.isVideo && (a.showControls(), a.startControlsTimer()),
                        a.setMuted(a.media.muted ? !1 : !0)
                }
            }]
    },
akjs.mepIndex = 0,
akjs.players = {},
akjs.MediaElementPlayer = function(b, c) {
    if (! (this instanceof akjs.MediaElementPlayer)) return new akjs.MediaElementPlayer(b, c);
    var d = this;
    return d.$media = d.$node = a(b),
        d.node = d.media = d.$media[0],
        d.node ? "undefined" != typeof d.node.player ? d.node.player: (d.node.player = d, "undefined" == typeof c && (c = d.$node.data("akjsoptions")), d.options = a.extend({},
            akjs.MepDefaults, c), d.id = "mep_" + akjs.mepIndex++, akjs.players[d.id] = d, d.init(), d) : void 0
},
akjs.MediaElementPlayer.prototype = {
    hasFocus: !1,
    controlsAreVisible: !0,
    init: function() {
        var b = this,
            c = akjs.MediaFeatures,
            d = a.extend(!0, {},
                b.options, {
                    success: function(a, c) {
                        b.meReady(a, c)
                    },
                    error: function(a) {
                        b.handleError(a)
                    }
                }),
            e = b.media.tagName.toLowerCase();
        if (b.isDynamic = "audio" !== e && "video" !== e, b.isVideo = b.isDynamic ? b.options.isVideo: "audio" !== e && b.options.isVideo, c.isiPad && b.options.iPadUseNativeControls || c.isiPhone && b.options.iPhoneUseNativeControls) b.$media.attr("controls", "controls"),
        c.isiPad && null !== b.media.getAttribute("autoplay") && b.play();
        else if (c.isAndroid && b.options.AndroidUseNativeControls);
        else {
            b.$media.removeAttr("controls");
            var f = akjs.i18n.t(b.isVideo ? "Video Player": "Audio Player");
            if (a('<span class="ak-offscreen">' + f + "</span>").insertBefore(b.$media), b.container = a('<div id="' + b.id + '" class="ak-container ' + (akjs.MediaFeatures.svg ? "svg": "no-svg") + '" tabindex="0" role="application" aria-label="' + f + '"><div class="ak-inner"><div class="ak-mediaelement"></div><div class="ak-layers"></div><div class="ak-controls"></div><div class="ak-clear"></div></div></div>').addClass(b.$media[0].className).insertBefore(b.$media).focus(function() {
                    if (!b.controlsAreVisible) {
                        b.showControls(!0);
                        var a = b.container.find(".ak-playpause-button > button");
                        a.focus()
                    }
                }), b.container.addClass((c.isAndroid ? "ak-android ": "") + (c.isiOS ? "ak-ios ": "") + (c.isiPad ? "ak-ipad ": "") + (c.isiPhone ? "ak-iphone ": "") + (b.isVideo ? "ak-video ": "ak-audio ")), c.isiOS) {
                var g = b.$media.clone();
                b.container.find(".ak-mediaelement").append(g),
                    b.$media.remove(),
                    b.$node = b.$media = g,
                    b.node = b.media = g[0]
            } else b.container.find(".ak-mediaelement").append(b.$media);
            b.controls = b.container.find(".ak-controls"),
                b.layers = b.container.find(".ak-layers");
            var h = b.isVideo ? "video": "audio",
                i = h.substring(0, 1).toUpperCase() + h.substring(1);
            b.width = b.options[h + "Width"] > 0 || b.options[h + "Width"].toString().indexOf("%") > -1 ? b.options[h + "Width"] : "" !== b.media.style.width && null !== b.media.style.width ? b.media.style.width: null !== b.media.getAttribute("width") ? b.$media.attr("width") : b.options["default" + i + "Width"],
                b.height = b.options[h + "Height"] > 0 || b.options[h + "Height"].toString().indexOf("%") > -1 ? b.options[h + "Height"] : "" !== b.media.style.height && null !== b.media.style.height ? b.media.style.height: null !== b.$media[0].getAttribute("height") ? b.$media.attr("height") : b.options["default" + i + "Height"],
                b.setPlayerSize(b.width, b.height),
                d.pluginWidth = b.width,
                d.pluginHeight = b.height
        }
        akjs.MediaElement(b.$media[0], d),
        "undefined" != typeof b.container && b.controlsAreVisible && b.container.trigger("controlsshown")
    },
    showControls: function(a) {
        var b = this;
        a = "undefined" == typeof a || a,
        b.controlsAreVisible || (a ? (b.controls.css("visibility", "visible").stop(!0, !0).fadeIn(200,
            function() {
                b.controlsAreVisible = !0,
                    b.container.trigger("controlsshown")
            }), b.container.find(".ak-control").css("visibility", "visible").stop(!0, !0).fadeIn(200,
            function() {
                b.controlsAreVisible = !0
            })) : (b.controls.css("visibility", "visible").css("display", "block"), b.container.find(".ak-control").css("visibility", "visible").css("display", "block"), b.controlsAreVisible = !0, b.container.trigger("controlsshown")), b.setControlsSize())
    },
    hideControls: function(b) {
        var c = this;
        b = "undefined" == typeof b || b,
        !c.controlsAreVisible || c.options.alwaysShowControls || c.keyboardAction || (b ? (c.controls.stop(!0, !0).fadeOut(200,
            function() {
                a(this).css("visibility", "hidden").css("display", "block"),
                    c.controlsAreVisible = !1,
                    c.container.trigger("controlshidden")
            }), c.container.find(".ak-control").stop(!0, !0).fadeOut(200,
            function() {
                a(this).css("visibility", "hidden").css("display", "block")
            })) : (c.controls.css("visibility", "hidden").css("display", "block"), c.container.find(".ak-control").css("visibility", "hidden").css("display", "block"), c.controlsAreVisible = !1, c.container.trigger("controlshidden")))
    },
    controlsTimer: null,
    startControlsTimer: function(a) {
        var b = this;
        a = "undefined" != typeof a ? a: 1500,
            b.killControlsTimer("start"),
            b.controlsTimer = setTimeout(function() {
                    b.hideControls(),
                        b.killControlsTimer("hide")
                },
                a)
    },
    killControlsTimer: function() {
        var a = this;
        null !== a.controlsTimer && (clearTimeout(a.controlsTimer), delete a.controlsTimer, a.controlsTimer = null)
    },
    controlsEnabled: !0,
    disableControls: function() {
        var a = this;
        a.killControlsTimer(),
            a.hideControls(!1),
            this.controlsEnabled = !1
    },
    enableControls: function() {
        var a = this;
        a.showControls(!1),
            a.controlsEnabled = !0
    },
    meReady: function(b, c) {
        var d, e, f = this,
            g = akjs.MediaFeatures,
            h = c.getAttribute("autoplay"),
            i = !("undefined" == typeof h || null === h || "false" === h);
        if (!f.created) {
            if (f.created = !0, f.media = b, f.domNode = c, !(g.isAndroid && f.options.AndroidUseNativeControls || g.isiPad && f.options.iPadUseNativeControls || g.isiPhone && f.options.iPhoneUseNativeControls)) {
                f.buildposter(f, f.controls, f.layers, f.media),
                    f.buildkeyboard(f, f.controls, f.layers, f.media),
                    f.buildoverlays(f, f.controls, f.layers, f.media),
                    f.findTracks();
                for (d in f.options.features) if (e = f.options.features[d], f["build" + e]) try {
                    f["build" + e](f, f.controls, f.layers, f.media)
                } catch(j) {}
                f.container.trigger("controlsready"),
                    f.setPlayerSize(f.width, f.height),
                    f.setControlsSize(),
                f.isVideo && (akjs.MediaFeatures.hasTouch ? f.$media.bind("touchstart",
                    function() {
                        f.controlsAreVisible ? f.hideControls(!1) : f.controlsEnabled && f.showControls(!1)
                    }) : (f.clickToPlayPauseCallback = function() {
                    f.options.clickToPlayPause && (f.media.paused ? f.play() : f.pause())
                },
                    f.media.addEventListener("click", f.clickToPlayPauseCallback, !1), f.container.bind("mouseenter mouseover",
                    function() {
                        f.controlsEnabled && (f.options.alwaysShowControls || (f.killControlsTimer("enter"), f.showControls(), f.startControlsTimer(2500)))
                    }).bind("mousemove",
                    function() {
                        f.controlsEnabled && (f.controlsAreVisible || f.showControls(), f.options.alwaysShowControls || f.startControlsTimer(2500))
                    }).bind("mouseleave",
                    function() {
                        f.controlsEnabled && (f.media.paused || f.options.alwaysShowControls || f.startControlsTimer(1e3))
                    })), f.options.hideVideoControlsOnLoad && f.hideControls(!1), i && !f.options.alwaysShowControls && f.hideControls(), f.options.enableAutosize && f.media.addEventListener("loadedmetadata",
                    function(a) {
                        f.options.videoHeight <= 0 && null === f.domNode.getAttribute("height") && !isNaN(a.target.videoHeight) && (f.setPlayerSize(a.target.videoWidth, a.target.videoHeight), f.setControlsSize(), f.media.setVideoSize(a.target.videoWidth, a.target.videoHeight))
                    },
                    !1)),
                    b.addEventListener("play",
                        function() {
                            var a;
                            for (a in akjs.players) {
                                var b = akjs.players[a];
                                b.id == f.id || !f.options.pauseOtherPlayers || b.paused || b.ended || b.pause(),
                                    b.hasFocus = !1
                            }
                            f.hasFocus = !0
                        },
                        !1),
                    f.media.addEventListener("ended",
                        function() {
                            if (f.options.autoRewind) try {
                                f.media.setCurrentTime(0),
                                    window.setTimeout(function() {
                                            a(f.container).find(".ak-overlay-loading").parent().hide()
                                        },
                                        20)
                            } catch(b) {}
                            f.media.pause(),
                            f.setProgressRail && f.setProgressRail(),
                            f.setCurrentRail && f.setCurrentRail(),
                                f.options.loop ? f.play() : !f.options.alwaysShowControls && f.controlsEnabled && f.showControls()
                        },
                        !1),
                    f.media.addEventListener("loadedmetadata",
                        function() {
                            f.updateDuration && f.updateDuration(),
                            f.updateCurrent && f.updateCurrent(),
                            f.isFullScreen || (f.setPlayerSize(f.width, f.height), f.setControlsSize())
                        },
                        !1),
                    f.container.focusout(function(b) {
                        if (b.relatedTarget) {
                            var c = a(b.relatedTarget);
                            f.keyboardAction && 0 === c.parents(".ak-container").length && (f.keyboardAction = !1, f.hideControls(!0))
                        }
                    }),
                    setTimeout(function() {
                            f.setPlayerSize(f.width, f.height),
                                f.setControlsSize()
                        },
                        50),
                    f.globalBind("resize",
                        function() {
                            f.isFullScreen || akjs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || f.setPlayerSize(f.width, f.height),
                                f.setControlsSize()
                        })
            }
            i && "native" == b.pluginType && f.play(),
            f.options.success && ("string" == typeof f.options.success ? window[f.options.success](f.media, f.domNode, f) : f.options.success(f.media, f.domNode, f))
        }
    },
    handleError: function(a) {
        var b = this;
        b.controls.hide(),
        b.options.error && b.options.error(a)
    },
    setPlayerSize: function(b, c) {
        var d = this;
        if (!d.options.setDimensions) return ! 1;
        if ("undefined" != typeof b && (d.width = b), "undefined" != typeof c && (d.height = c), d.height.toString().indexOf("%") > 0 || "100%" === d.$node.css("max-width") || d.$node[0].currentStyle && "100%" === d.$node[0].currentStyle.maxWidth) {
            var e = function() {
                    return d.isVideo ? d.media.videoWidth && d.media.videoWidth > 0 ? d.media.videoWidth: null !== d.media.getAttribute("width") ? d.media.getAttribute("width") : d.options.defaultVideoWidth: d.options.defaultAudioWidth
                } (),
                f = function() {
                    return d.isVideo ? d.media.videoHeight && d.media.videoHeight > 0 ? d.media.videoHeight: null !== d.media.getAttribute("height") ? d.media.getAttribute("height") : d.options.defaultVideoHeight: d.options.defaultAudioHeight
                } (),
                g = d.container.parent().closest(":visible").width(),
                h = d.container.parent().closest(":visible").height(),
                i = d.isVideo || !d.options.autosizeProgress ? parseInt(g * f / e, 10) : f;
            isNaN(i) && (i = h),
            d.container.parent().length > 0 && "body" === d.container.parent()[0].tagName.toLowerCase() && (g = a(window).width(), i = a(window).height()),
            i && g && (d.container.width(g).height(i), d.$media.add(d.container.find(".ak-shim")).width("100%").height("100%"), d.isVideo && d.media.setVideoSize && d.media.setVideoSize(g, i), d.layers.children(".ak-layer").width("100%").height("100%"))
        } else d.container.width(d.width).height(d.height),
            d.layers.children(".ak-layer").width(d.width).height(d.height);
        var j = d.layers.find(".ak-overlay-play"),
            k = j.find(".ak-overlay-button");
        j.height(d.container.height() - d.controls.height()),
            k.css("margin-top", "-" + (k.height() / 2 - d.controls.height() / 2).toString() + "px")
    },
    setControlsSize: function() {
        var b = this,
            c = 0,
            d = 0,
            e = b.controls.find(".ak-time-rail"),
            f = b.controls.find(".ak-time-total"),
            g = (b.controls.find(".ak-time-current"), b.controls.find(".ak-time-loaded"), e.siblings()),
            h = g.last(),
            i = null;
        if (b.container.is(":visible") && e.length && e.is(":visible")) {
            b.options && !b.options.autosizeProgress && (d = parseInt(e.css("width"), 10)),
            0 !== d && d || (g.each(function() {
                var b = a(this);
                "absolute" != b.css("position") && b.is(":visible") && (c += a(this).outerWidth(!0))
            }), d = b.controls.width() - c - (e.outerWidth(!0) - e.width()));
            do e.width(d),
                f.width(d - (f.outerWidth(!0) - f.width())),
            "absolute" != h.css("position") && (i = h.length ? h.position() : null, d--);
            while (null !== i && i.top > 0 && d > 0);
            b.setProgressRail && b.setProgressRail(),
            b.setCurrentRail && b.setCurrentRail()
        }
    },
    buildposter: function(b, c, d, e) {
        var f = this,
            g = a('<div class="ak-poster ak-layer"></div>').appendTo(d),
            h = b.$media.attr("poster");
        "" !== b.options.poster && (h = b.options.poster),
            h ? f.setPoster(h) : g.hide(),
            e.addEventListener("play",
                function() {
                    g.hide()
                },
                !1),
        b.options.showPosterWhenEnded && b.options.autoRewind && e.addEventListener("ended",
            function() {
                g.show()
            },
            !1)
    },
    setPoster: function(b) {
        var c = this,
            d = c.container.find(".ak-poster"),
            e = d.find("img");
        0 === e.length && (e = a('<img width="100%" height="100%" />').appendTo(d)),
            e.attr("src", b),
            d.css({
                "background-image": "url(" + b + ")"
            })
    },
    buildoverlays: function(b, c, d, e) {
        var f = this;
        if (b.isVideo) {
            var g = a('<div class="ak-overlay ak-layer"><div class="ak-overlay-loading"><span></span></div></div>').hide().appendTo(d),
                h = a('<div class="ak-overlay ak-layer"><div class="ak-overlay-error"></div></div>').hide().appendTo(d),
                i = a('<div class="ak-overlay ak-layer ak-overlay-play"><div class="ak-overlay-button"></div></div>').appendTo(d).bind("click",
                    function() {
                        f.options.clickToPlayPause && e.paused && e.play()
                    });
            e.addEventListener("play",
                function() {
                    i.hide(),
                        g.hide(),
                        c.find(".ak-time-buffering").hide(),
                        h.hide()
                },
                !1),
                e.addEventListener("playing",
                    function() {
                        i.hide(),
                            g.hide(),
                            c.find(".ak-time-buffering").hide(),
                            h.hide()
                    },
                    !1),
                e.addEventListener("seeking",
                    function() {
                        g.show(),
                            c.find(".ak-time-buffering").show()
                    },
                    !1),
                e.addEventListener("seeked",
                    function() {
                        g.hide(),
                            c.find(".ak-time-buffering").hide()
                    },
                    !1),
                e.addEventListener("pause",
                    function() {
                        akjs.MediaFeatures.isiPhone || i.show()
                    },
                    !1),
                e.addEventListener("waiting",
                    function() {
                        g.show(),
                            c.find(".ak-time-buffering").show()
                    },
                    !1),
                e.addEventListener("loadeddata",
                    function() {
                        g.show(),
                            c.find(".ak-time-buffering").show(),
                        akjs.MediaFeatures.isAndroid && (e.canplayTimeout = window.setTimeout(function() {
                                if (document.createEvent) {
                                    var a = document.createEvent("HTMLEvents");
                                    return a.initEvent("canplay", !0, !0),
                                        e.dispatchEvent(a)
                                }
                            },
                            300))
                    },
                    !1),
                e.addEventListener("canplay",
                    function() {
                        g.hide(),
                            c.find(".ak-time-buffering").hide(),
                            clearTimeout(e.canplayTimeout)
                    },
                    !1),
                e.addEventListener("error",
                    function() {
                        g.hide(),
                            c.find(".ak-time-buffering").hide(),
                            h.show(),
                            h.find(".ak-overlay-error").html("Error loading this resource")
                    },
                    !1),
                e.addEventListener("keydown",
                    function(a) {
                        f.onkeydown(b, e, a)
                    },
                    !1)
        }
    },
    buildkeyboard: function(b, c, d, e) {
        var f = this;
        f.container.keydown(function() {
            f.keyboardAction = !0
        }),
            f.globalBind("keydown",
                function(a) {
                    return f.onkeydown(b, e, a)
                }),
            f.globalBind("click",
                function(c) {
                    b.hasFocus = 0 !== a(c.target).closest(".ak-container").length
                })
    },
    onkeydown: function(a, b, c) {
        if (a.hasFocus && a.options.enableKeyboard) for (var d = 0,
                                                             e = a.options.keyActions.length; e > d; d++) for (var f = a.options.keyActions[d], g = 0, h = f.keys.length; h > g; g++) if (c.keyCode == f.keys[g]) return "function" == typeof c.preventDefault && c.preventDefault(),
            f.action(a, b, c.keyCode),
            !1;
        return ! 0
    },
    findTracks: function() {
        var b = this,
            c = b.$media.find("track");
        b.tracks = [],
            c.each(function(c, d) {
                d = a(d),
                    b.tracks.push({
                        srclang: d.attr("srclang") ? d.attr("srclang").toLowerCase() : "",
                        src: d.attr("src"),
                        kind: d.attr("kind"),
                        label: d.attr("label") || "",
                        entries: [],
                        isLoaded: !1
                    })
            })
    },
    changeSkin: function(a) {
        this.container[0].className = "ak-container " + a,
            this.setPlayerSize(this.width, this.height),
            this.setControlsSize()
    },
    play: function() {
        this.load(),
            this.media.play()
    },
    pause: function() {
        try {
            this.media.pause()
        } catch(a) {}
    },
    load: function() {
        this.isLoaded || this.media.load(),
            this.isLoaded = !0
    },
    setMuted: function(a) {
        this.media.setMuted(a)
    },
    setCurrentTime: function(a) {
        this.media.setCurrentTime(a)
    },
    getCurrentTime: function() {
        return this.media.currentTime
    },
    setVolume: function(a) {
        this.media.setVolume(a)
    },
    getVolume: function() {
        return this.media.volume
    },
    setSrc: function(a) {
        this.media.setSrc(a)
    },
    remove: function() {
        var a, b, c = this;
        for (a in c.options.features) if (b = c.options.features[a], c["clean" + b]) try {
            c["clean" + b](c)
        } catch(d) {}
        c.isDynamic ? c.$node.insertBefore(c.container) : (c.$media.prop("controls", !0), c.$node.clone().insertBefore(c.container).show(), c.$node.remove()),
        "native" !== c.media.pluginType && c.media.remove(),
            delete akjs.players[c.id],
        "object" == typeof c.container && c.container.remove(),
            c.globalUnbind(),
            delete c.node.player
    },
    rebuildtracks: function() {
        var a = this;
        a.findTracks(),
            a.buildtracks(a, a.controls, a.layers, a.media)
    },
    resetSize: function() {
        var a = this;
        setTimeout(function() {
                a.setPlayerSize(a.width, a.height),
                    a.setControlsSize()
            },
            50)
    }
},
function() {
    function b(b, d) {
        var e = {
            d: [],
            w: []
        };
        return a.each((b || "").split(" "),
            function(a, b) {
                var f = b + "." + d;
                0 === f.indexOf(".") ? (e.d.push(f), e.w.push(f)) : e[c.test(b) ? "w": "d"].push(f)
            }),
            e.d = e.d.join(" "),
            e.w = e.w.join(" "),
            e
    }
    var c = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
    akjs.MediaElementPlayer.prototype.globalBind = function(c, d, e) {
        var f = this;
        c = b(c, f.id),
        c.d && a(document).bind(c.d, d, e),
        c.w && a(window).bind(c.w, d, e)
    },
        akjs.MediaElementPlayer.prototype.globalUnbind = function(c, d) {
            var e = this;
            c = b(c, e.id),
            c.d && a(document).unbind(c.d, d),
            c.w && a(window).unbind(c.w, d)
        }
} (),
"undefined" != typeof a && (a.fn.AKjs_MediaElement = function(b) {
    return this.each(b === !1 ?
        function() {
            var b = a(this).data("AKjs_MediaElement");
            b && b.remove(),
                a(this).removeData("AKjs_MediaElement")
        }: function() {
            a(this).data("AKjs_MediaElement", new akjs.MediaElementPlayer(this, b))
        }),
        this
}, a(document).ready(function() {
        a(".ak-player").AKjs_MediaElement()
    }));
    window.MediaElementPlayer = akjs.MediaElementPlayer
} (akjs.$),
function(a) {
    a.extend(MediaElementPlayer.prototype, {
            buildplaypause: function(b, c, d, e) {
                function f(a) {
                    "play" === a ? (i.removeClass("ak-play").addClass("ak-pause"), j.attr({
                        title: h.pauseText,
                        "aria-label": h.pauseText
                    })) : (i.removeClass("ak-pause").addClass("ak-play"), j.attr({
                        title: h.playText,
                        "aria-label": h.playText
                    }))
                }
                var g = this,
                    h = g.options,
                    i = a('<div class="ak-button ak-playpause-button ak-play" ><button type="button" aria-controls="' + g.id + '" title="' + h.playText + '" aria-label="' + h.playText + '"></button></div>').appendTo(c).click(function(a) {
                        return a.preventDefault(),
                            e.paused ? e.play() : e.pause(),
                            !1
                    }),
                    j = i.find("button");
                f("pse"),
                    e.addEventListener("play",
                        function() {
                            f("play")
                        },
                        !1),
                    e.addEventListener("playing",
                        function() {
                            f("play")
                        },
                        !1),
                    e.addEventListener("pause",
                        function() {
                            f("pse")
                        },
                        !1),
                    e.addEventListener("paused",
                        function() {
                            f("pse")
                        },
                        !1)
            }
        })
} (akjs.$),
function(a) {
    a.extend(akjs.MepDefaults, {
        progessHelpText: akjs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
    }),
        a.extend(MediaElementPlayer.prototype, {
            buildprogress: function(b, c, d, e) {
                a('<div class="ak-time-rail"><span  class="ak-time-total ak-time-slider"><span class="ak-time-buffering"></span><span class="ak-time-loaded"></span><span class="ak-time-current"></span><span class="ak-time-handle"></span><span class="ak-time-float"><span class="ak-time-float-current">00:00</span><span class="ak-time-float-corner"></span></span></span></div>').appendTo(c),
                    c.find(".ak-time-buffering").hide();
                var f = this,
                    g = c.find(".ak-time-total"),
                    h = c.find(".ak-time-loaded"),
                    i = c.find(".ak-time-current"),
                    j = c.find(".ak-time-handle"),
                    k = c.find(".ak-time-float"),
                    l = c.find(".ak-time-float-current"),
                    m = c.find(".ak-time-slider"),
                    n = function(a) {
                        var b, c = g.offset(),
                            d = g.outerWidth(!0),
                            f = 0,
                            h = 0,
                            i = 0;
                        b = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0].pageX: a.pageX,
                        e.duration && (b < c.left ? b = c.left: b > d + c.left && (b = d + c.left), i = b - c.left, f = i / d, h = .02 >= f ? 0 : f * e.duration, o && h !== e.currentTime && e.setCurrentTime(h), akjs.MediaFeatures.hasTouch || (k.css("left", i), l.html(akjs.Utility.secondsToTimeCode(h)), k.show()))
                    },
                    o = !1,
                    p = !1,
                    q = 0,
                    r = !1,
                    s = b.options.autoRewind,
                    t = function() {
                        var a = e.currentTime,
                            b = akjs.i18n.t("Time Slider"),
                            c = akjs.Utility.secondsToTimeCode(a),
                            d = e.duration;
                        m.attr({
                            "aria-label": b,
                            "aria-valuemin": 0,
                            "aria-valuemax": d,
                            "aria-valuenow": a,
                            "aria-valuetext": c,
                            role: "slider",
                            tabindex: 0
                        })
                    },
                    u = function() {
                        var a = new Date;
                        a - q >= 1e3 && e.play()
                    };
                m.bind("focus",
                    function() {
                        b.options.autoRewind = !1
                    }),
                    m.bind("blur",
                        function() {
                            b.options.autoRewind = s
                        }),
                    m.bind("keydown",
                        function(a) {
                            new Date - q >= 1e3 && (r = e.paused);
                            var b = a.keyCode,
                                c = e.duration,
                                d = e.currentTime;
                            switch (b) {
                                case 37:
                                    d -= 1;
                                    break;
                                case 39:
                                    d += 1;
                                    break;
                                case 38:
                                    d += Math.floor(.1 * c);
                                    break;
                                case 40:
                                    d -= Math.floor(.1 * c);
                                    break;
                                case 36:
                                    d = 0;
                                    break;
                                case 35:
                                    d = c;
                                    break;
                                case 10:
                                    return void(e.paused ? e.play() : e.pause());
                                case 13:
                                    return void(e.paused ? e.play() : e.pause());
                                default:
                                    return
                            }
                            return d = 0 > d ? 0 : d >= c ? c: Math.floor(d),
                                q = new Date,
                            r || e.pause(),
                            d < e.duration && !r && setTimeout(u, 1100),
                                e.setCurrentTime(d),
                                a.preventDefault(),
                                a.stopPropagation(),
                                !1
                        }),
                    g.bind("mousedown touchstart",
                        function(a) { (1 === a.which || 0 === a.which) && (o = !0, n(a), f.globalBind("mousemove.dur touchmove.dur",
                            function(a) {
                                n(a)
                            }), f.globalBind("mouseup.dur touchend.dur",
                            function() {
                                o = !1,
                                    k.hide(),
                                    f.globalUnbind(".dur")
                            }))
                        }).bind("mouseenter",
                        function() {
                            p = !0,
                                f.globalBind("mousemove.dur",
                                    function(a) {
                                        n(a)
                                    }),
                            akjs.MediaFeatures.hasTouch || k.show()
                        }).bind("mouseleave",
                        function() {
                            p = !1,
                            o || (f.globalUnbind(".dur"), k.hide())
                        }),
                    e.addEventListener("progress",
                        function(a) {
                            b.setProgressRail(a),
                                b.setCurrentRail(a)
                        },
                        !1),
                    e.addEventListener("timeupdate",
                        function(a) {
                            b.setProgressRail(a),
                                b.setCurrentRail(a),
                                t(a)
                        },
                        !1),
                    f.loaded = h,
                    f.total = g,
                    f.current = i,
                    f.handle = j
            },
            setProgressRail: function(a) {
                var b = this,
                    c = void 0 !== a ? a.target: b.media,
                    d = null;
                c && c.buffered && c.buffered.length > 0 && c.buffered.end && c.duration ? d = c.buffered.end(0) / c.duration: c && void 0 !== c.bytesTotal && c.bytesTotal > 0 && void 0 !== c.bufferedBytes ? d = c.bufferedBytes / c.bytesTotal: a && a.lengthComputable && 0 !== a.total && (d = a.loaded / a.total),
                null !== d && (d = Math.min(1, Math.max(0, d)), b.loaded && b.total && b.loaded.width(b.total.width() * d))
            },
            setCurrentRail: function() {
                var a = this;
                if (void 0 !== a.media.currentTime && a.media.duration && a.total && a.handle) {
                    var b = Math.round(a.total.width() * a.media.currentTime / a.media.duration),
                        c = b - Math.round(a.handle.outerWidth(!0) / 2);
                    a.current.width(b),
                        a.handle.css("left", c)
                }
            }
        })
} (akjs.$),
function(a) {
    a.extend(akjs.MepDefaults, {
        duration: -1,
        timeAndDurationSeparator: "<span> | </span>"
    }), a.extend(MediaElementPlayer.prototype, {
            buildcurrent: function(b, c, d, e) {
                var f = this;
                a('<div class="ak-time" role="timer" aria-live="off"><span class="ak-currenttime">' + (b.options.alwaysShowHours ? "00:": "") + (b.options.showTimecodeFrameCount ? "00:00:00": "00:00") + "</span></div>").appendTo(c),
                    f.currenttime = f.controls.find(".ak-currenttime"),
                    e.addEventListener("timeupdate",
                        function() {
                            b.updateCurrent()
                        },
                        !1)
            },
            buildduration: function(b, c, d, e) {
                var f = this;
                c.children().last().find(".ak-currenttime").length > 0 ? a(f.options.timeAndDurationSeparator + '<span class="ak-duration">' + (f.options.duration > 0 ? akjs.Utility.secondsToTimeCode(f.options.duration, f.options.alwaysShowHours || f.media.duration > 3600, f.options.showTimecodeFrameCount, f.options.framesPerSecond || 25) : (b.options.alwaysShowHours ? "00:": "") + (b.options.showTimecodeFrameCount ? "00:00:00": "00:00")) + "</span>").appendTo(c.find(".ak-time")) : (c.find(".ak-currenttime").parent().addClass("ak-currenttime-container"), a('<div class="ak-time ak-duration-container"><span class="ak-duration">' + (f.options.duration > 0 ? akjs.Utility.secondsToTimeCode(f.options.duration, f.options.alwaysShowHours || f.media.duration > 3600, f.options.showTimecodeFrameCount, f.options.framesPerSecond || 25) : (b.options.alwaysShowHours ? "00:": "") + (b.options.showTimecodeFrameCount ? "00:00:00": "00:00")) + "</span></div>").appendTo(c)),
                    f.durationD = f.controls.find(".ak-duration"),
                    e.addEventListener("timeupdate",
                        function() {
                            b.updateDuration()
                        },
                        !1)
            },
            updateCurrent: function() {
                var a = this;
                a.currenttime && a.currenttime.html(akjs.Utility.secondsToTimeCode(a.media.currentTime, a.options.alwaysShowHours || a.media.duration > 3600, a.options.showTimecodeFrameCount, a.options.framesPerSecond || 25))
            },
            updateDuration: function() {
                var a = this;
                a.container.toggleClass("ak-long-video", a.media.duration > 3600),
                a.durationD && (a.options.duration > 0 || a.media.duration) && a.durationD.html(akjs.Utility.secondsToTimeCode(a.options.duration > 0 ? a.options.duration: a.media.duration, a.options.alwaysShowHours, a.options.showTimecodeFrameCount, a.options.framesPerSecond || 25))
            }
        })
} (akjs.$),
function(a) {
    a.extend(akjs.MepDefaults, {
        muteText: akjs.i18n.t("Mute Toggle"),
        allyVolumeControlText: akjs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
        hideVolumeOnTouchDevices: !0,
        audioVolume: "horizontal",
        videoVolume: "vertical"
    }),
        a.extend(MediaElementPlayer.prototype, {
            buildvolume: function(b, c, d, e) {
                if (!akjs.MediaFeatures.isAndroid && !akjs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                    var f = this,
                        g = f.isVideo ? f.options.videoVolume: f.options.audioVolume,
                        h = "horizontal" == g ? a('<div class="ak-button ak-volume-button ak-mute"><button type="button" aria-controls="' + f.id + '" title="' + f.options.muteText + '" aria-label="' + f.options.muteText + '"></button></div><a href="javascript:void(0);" class="ak-horizontal-volume-slider"><span class="ak-offscreen">' + f.options.allyVolumeControlText + '</span><div class="ak-horizontal-volume-total"></div><div class="ak-horizontal-volume-current"></div><div class="ak-horizontal-volume-handle"></div></a>').appendTo(c) : a('<div class="ak-button ak-volume-button ak-mute"><button type="button" aria-controls="' + f.id + '" title="' + f.options.muteText + '" aria-label="' + f.options.muteText + '"></button><a href="javascript:void(0);" class="ak-volume-slider"><span class="ak-offscreen">' + f.options.allyVolumeControlText + '</span><div class="ak-volume-total"></div><div class="ak-volume-current"></div><div class="ak-volume-handle"></div></a></div>').appendTo(c),
                        i = f.container.find(".ak-volume-slider, .ak-horizontal-volume-slider"),
                        j = f.container.find(".ak-volume-total, .ak-horizontal-volume-total"),
                        k = f.container.find(".ak-volume-current, .ak-horizontal-volume-current"),
                        l = f.container.find(".ak-volume-handle, .ak-horizontal-volume-handle"),
                        m = function(a, b) {
                            if (!i.is(":visible") && "undefined" == typeof b) return i.show(),
                                m(a, !0),
                                void i.hide();
                            a = Math.max(0, a),
                                a = Math.min(a, 1),
                                0 === a ? (h.removeClass("ak-mute").addClass("ak-unmute"), h.children("button").attr("title", akjs.i18n.t("Unmute")).attr("aria-label", akjs.i18n.t("Unmute"))) : (h.removeClass("ak-unmute").addClass("ak-mute"), h.children("button").attr("title", akjs.i18n.t("Mute")).attr("aria-label", akjs.i18n.t("Mute")));
                            var c = j.position();
                            if ("vertical" == g) {
                                var d = j.height(),
                                    e = d - d * a;
                                l.css("top", Math.round(c.top + e - l.height() / 2)),
                                    k.height(d - e),
                                    k.css("top", c.top + e)
                            } else {
                                var f = j.width(),
                                    n = f * a;
                                l.css("left", Math.round(c.left + n - l.width() / 2)),
                                    k.width(Math.round(n))
                            }
                        },
                        n = function(a) {
                            var b = null,
                                c = j.offset();
                            if ("vertical" === g) {
                                var d = j.height(),
                                    f = (parseInt(j.css("top").replace(/px/, ""), 10), a.pageY - c.top);
                                if (b = (d - f) / d, 0 === c.top || 0 === c.left) return
                            } else {
                                var h = j.width(),
                                    i = a.pageX - c.left;
                                b = i / h
                            }
                            b = Math.max(0, b),
                                b = Math.min(b, 1),
                                m(b),
                                e.setMuted(0 === b ? !0 : !1),
                                e.setVolume(b)
                        },
                        o = !1,
                        p = !1;
                    h.hover(function() {
                            i.show(),
                                p = !0
                        },
                        function() {
                            p = !1,
                            o || "vertical" != g || i.hide()
                        });
                    var q = function() {
                        var a = Math.floor(100 * e.volume);
                        i.attr({
                            "aria-label": akjs.i18n.t("volumeSlider"),
                            "aria-valuemin": 0,
                            "aria-valuemax": 100,
                            "aria-valuenow": a,
                            "aria-valuetext": a + "%",
                            role: "slider",
                            tabindex: 0
                        })
                    };
                    i.bind("mouseover",
                        function() {
                            p = !0
                        }).bind("mousedown",
                        function(a) {
                            return n(a),
                                f.globalBind("mousemove.vol",
                                    function(a) {
                                        n(a)
                                    }),
                                f.globalBind("mouseup.vol",
                                    function() {
                                        o = !1,
                                            f.globalUnbind(".vol"),
                                        p || "vertical" != g || i.hide()
                                    }),
                                o = !0,
                                !1
                        }).bind("keydown",
                        function(a) {
                            var b = a.keyCode,
                                c = e.volume;
                            switch (b) {
                                case 38:
                                    c += .1;
                                    break;
                                case 40:
                                    c -= .1;
                                    break;
                                default:
                                    return ! 0
                            }
                            return o = !1,
                                m(c),
                                e.setVolume(c),
                                !1
                        }).bind("blur",
                        function() {
                            i.hide()
                        }),
                        h.find("button").click(function() {
                            e.setMuted(!e.muted)
                        }),
                        h.find("button").bind("focus",
                            function() {
                                i.show()
                            }),
                        e.addEventListener("volumechange",
                            function(a) {
                                o || (e.muted ? (m(0), h.removeClass("ak-mute").addClass("ak-unmute")) : (m(e.volume), h.removeClass("ak-unmute").addClass("ak-mute"))),
                                    q(a)
                            },
                            !1),
                    f.container.is(":visible") && (m(b.options.startVolume), 0 === b.options.startVolume && e.setMuted(!0), "native" === e.pluginType && e.setVolume(b.options.startVolume))
                }
            }
        })
} (akjs.$),
function(a) {
    a.extend(akjs.MepDefaults, {
        usePluginFullScreen: !0,
        newWindowCallback: function() {
            return ""
        },
        fullscreenText: akjs.i18n.t("Fullscreen")
    }),
        a.extend(MediaElementPlayer.prototype, {
            isFullScreen: !1,
            isNativeFullScreen: !1,
            isInIframe: !1,
            buildfullscreen: function(b, c, d, e) {
                if (b.isVideo) {
                    if (b.isInIframe = window.location != window.parent.location, akjs.MediaFeatures.hasTrueNativeFullScreen) {
                        var f = function() {
                            b.isFullScreen && (akjs.MediaFeatures.isFullScreen() ? (b.isNativeFullScreen = !0, b.setControlsSize()) : (b.isNativeFullScreen = !1, b.exitFullScreen()))
                        };
                        b.globalBind(akjs.MediaFeatures.fullScreenEventName, f)
                    }
                    var g = this,
                        h = (b.container, a('<div class="ak-button ak-fullscreen-button"><button type="button" aria-controls="' + g.id + '" title="' + g.options.fullscreenText + '" aria-label="' + g.options.fullscreenText + '"></button></div>').appendTo(c));
                    if ("native" === g.media.pluginType || !g.options.usePluginFullScreen && !akjs.MediaFeatures.isFirefox) h.click(function() {
                        var a = akjs.MediaFeatures.hasTrueNativeFullScreen && akjs.MediaFeatures.isFullScreen() || b.isFullScreen;
                        a ? b.exitFullScreen() : b.enterFullScreen()
                    });
                    else {
                        var i = null,
                            j = function() {
                                var a, b = document.createElement("x"),
                                    c = document.documentElement,
                                    d = window.getComputedStyle;
                                return "pointerEvents" in b.style ? (b.style.pointerEvents = "auto", b.style.pointerEvents = "x", c.appendChild(b), a = d && "auto" === d(b, "").pointerEvents, c.removeChild(b), !!a) : !1
                            } ();
                        if (j && !akjs.MediaFeatures.isOpera) {
                            var k, l, m = !1,
                                n = function() {
                                    if (m) {
                                        for (var a in o) o[a].hide();
                                        h.css("pointer-events", ""),
                                            g.controls.css("pointer-events", ""),
                                            g.media.removeEventListener("click", g.clickToPlayPauseCallback),
                                            m = !1
                                    }
                                },
                                o = {},
                                p = ["top", "left", "right", "bottom"],
                                q = function() {
                                    var a = h.offset().left - g.container.offset().left,
                                        b = h.offset().top - g.container.offset().top,
                                        c = h.outerWidth(!0),
                                        d = h.outerHeight(!0),
                                        e = g.container.width(),
                                        f = g.container.height();
                                    for (k in o) o[k].css({
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    });
                                    o.top.width(e).height(b),
                                        o.left.width(a).height(d).css({
                                            top: b
                                        }),
                                        o.right.width(e - a - c).height(d).css({
                                            top: b,
                                            left: a + c
                                        }),
                                        o.bottom.width(e).height(f - d - b).css({
                                            top: b + d
                                        })
                                };
                            for (g.globalBind("resize",
                                function() {
                                    q()
                                }), k = 0, l = p.length; l > k; k++) o[p[k]] = a('<div class="ak-fullscreen-hover" />').appendTo(g.container).mouseover(n).hide();
                            h.on("mouseover",
                                function() {
                                    if (!g.isFullScreen) {
                                        var a = h.offset(),
                                            c = b.container.offset();
                                        e.positionFullscreenButton(a.left - c.left, a.top - c.top, !1),
                                            h.css("pointer-events", "none"),
                                            g.controls.css("pointer-events", "none"),
                                            g.media.addEventListener("click", g.clickToPlayPauseCallback);
                                        for (k in o) o[k].show();
                                        q(),
                                            m = !0
                                    }
                                }),
                                e.addEventListener("fullscreenchange",
                                    function() {
                                        g.isFullScreen = !g.isFullScreen,
                                            g.isFullScreen ? g.media.removeEventListener("click", g.clickToPlayPauseCallback) : g.media.addEventListener("click", g.clickToPlayPauseCallback),
                                            n()
                                    }),
                                g.globalBind("mousemove",
                                    function(a) {
                                        if (m) {
                                            var b = h.offset(); (a.pageY < b.top || a.pageY > b.top + h.outerHeight(!0) || a.pageX < b.left || a.pageX > b.left + h.outerWidth(!0)) && (h.css("pointer-events", ""), g.controls.css("pointer-events", ""), m = !1)
                                        }
                                    })
                        } else h.on("mouseover",
                            function() {
                                null !== i && (clearTimeout(i), delete i);
                                var a = h.offset(),
                                    c = b.container.offset();
                                e.positionFullscreenButton(a.left - c.left, a.top - c.top, !0)
                            }).on("mouseout",
                            function() {
                                null !== i && (clearTimeout(i), delete i),
                                    i = setTimeout(function() {
                                            e.hideFullscreenButton()
                                        },
                                        1500)
                            })
                    }
                    b.fullscreenBtn = h,
                        g.globalBind("keydown",
                            function(a) { (akjs.MediaFeatures.hasTrueNativeFullScreen && akjs.MediaFeatures.isFullScreen() || g.isFullScreen) && 27 == a.keyCode && b.exitFullScreen()
                            })
                }
            },
            cleanfullscreen: function(a) {
                a.exitFullScreen()
            },
            containerSizeTimeout: null,
            enterFullScreen: function() {
                var b = this;
                if ("native" === b.media.pluginType || !akjs.MediaFeatures.isFirefox && !b.options.usePluginFullScreen) {
                    if (a(document.documentElement).addClass("ak-fullscreen"), normalHeight = b.container.height(), normalWidth = b.container.width(), "native" === b.media.pluginType) if (akjs.MediaFeatures.hasTrueNativeFullScreen) akjs.MediaFeatures.requestFullScreen(b.container[0]),
                    b.isInIframe && setTimeout(function d() {
                            if (b.isNativeFullScreen) {
                                var c = window.devicePixelRatio || 1,
                                    e = .002,
                                    f = c * a(window).width(),
                                    g = screen.width,
                                    h = Math.abs(g - f),
                                    i = g * e;
                                h > i ? b.exitFullScreen() : setTimeout(d, 500)
                            }
                        },
                        500);
                    else if (akjs.MediaFeatures.hasSemiNativeFullScreen) return void b.media.webkitEnterFullscreen();
                    if (b.isInIframe) {
                        var c = b.options.newWindowCallback(this);
                        if ("" !== c) {
                            if (!akjs.MediaFeatures.hasTrueNativeFullScreen) return b.pause(),
                                void window.open(c, b.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                            setTimeout(function() {
                                    b.isNativeFullScreen || (b.pause(), window.open(c, b.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"))
                                },
                                250)
                        }
                    }
                    b.container.addClass("ak-container-fullscreen").width("100%").height("100%"),
                        b.containerSizeTimeout = setTimeout(function() {
                                b.container.css({
                                    width: "100%",
                                    height: "100%"
                                }),
                                    b.setControlsSize()
                            },
                            500),
                        "native" === b.media.pluginType ? b.$media.width("100%").height("100%") : (b.container.find(".ak-shim").width("100%").height("100%"), b.media.setVideoSize(a(window).width(), a(window).height())),
                        b.layers.children("div").width("100%").height("100%"),
                    b.fullscreenBtn && b.fullscreenBtn.removeClass("ak-fullscreen").addClass("ak-unfullscreen"),
                        b.setControlsSize(),
                        b.isFullScreen = !0,
                        b.container.find(".ak-captions-text").css("font-size", screen.width / b.width * 1 * 100 + "%"),
                        b.container.find(".ak-captions-position").css("bottom", "45px")
                }
            },
            exitFullScreen: function() {
                var b = this;
                return clearTimeout(b.containerSizeTimeout),
                    "native" !== b.media.pluginType && akjs.MediaFeatures.isFirefox ? void b.media.setFullscreen(!1) : (akjs.MediaFeatures.hasTrueNativeFullScreen && (akjs.MediaFeatures.isFullScreen() || b.isFullScreen) && akjs.MediaFeatures.cancelFullScreen(), a(document.documentElement).removeClass("ak-fullscreen"), b.container.removeClass("ak-container-fullscreen").width(normalWidth).height(normalHeight), "native" === b.media.pluginType ? b.$media.width(normalWidth).height(normalHeight) : (b.container.find(".ak-shim").width(normalWidth).height(normalHeight), b.media.setVideoSize(normalWidth, normalHeight)), b.layers.children("div").width(normalWidth).height(normalHeight), b.fullscreenBtn.removeClass("ak-unfullscreen").addClass("ak-fullscreen"), b.setControlsSize(), b.isFullScreen = !1, b.container.find(".ak-captions-text").css("font-size", ""), void b.container.find(".ak-captions-position").css("bottom", ""))
            }
        })
} (akjs.$);