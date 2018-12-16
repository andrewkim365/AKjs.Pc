/*! jquery.AKjs by Website Plugin v1.0.0 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20181215 AKjs license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Pc */

/*-----------------------------------------------AKjs_Lazyload (2018-12-15)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Lazyload = function(setting) {
        var option = $.extend({
                scroll: $(window),
                scrollTop: "",
                Img_Effect: "",
                Img_LoadStyle: "",
                Img_Error: "",
                Callback: function() {},
                Scrollback: function() {}
            },
            setting);
        AKjs_UserAgent();
        var ele = $(this).not("#ak-aside img").not(".lazy_none");
        var view_h = parseInt(window.screen.height);
        var png_regexp = new RegExp("\\.png");
        var gif_regexp = new RegExp("\\.gif");
        $(function () {
            option.Callback(ele);
            if (ele.prop('tagName') == "img" || ele.prop('tagName') == "IMG") {
                if (option.Img_LoadStyle) {
                    ele.each(function () {
                        var view_img = $(this);
                        if (view_img.length > 0) {
                            if (view_img.parent().prop('tagName') != "figure" && view_img.parent().prop('tagName') != "FIGURE" && view_img.parent().parent().prop('tagName') != "figure" && view_img.parent().parent().prop('tagName') != "FIGURE") {
                                view_img.wrap("<figure />");
                            }
                        }
                        if (png_regexp.test(view_img.attr("src")) || gif_regexp.test(view_img.attr("src"))) {
                            view_img.parents("figure").addClass("bg_none ak_img_" + option.Img_LoadStyle);
                        } else {
                            view_img.parents("figure").addClass("ak_img_" + option.Img_LoadStyle);
                        }
                        if (IsMobile) {
                            setTimeout(function () {
                                if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                    view_img.wrap("<label class='wh_in img_thumb'></label>");
                                    view_img.parent(".img_thumb").css({
                                        "background-image": 'url("' + view_img.attr("src") + '")'
                                    });
                                    view_img.remove();
                                } else {
                                    if (view_img.offset().top < view_h) {
                                        view_img.attr("data-src", view_img.attr("src"));
                                        view_img.attr("src",TransparentImage);
                                        view_img.attr("src", view_img.data("src"));
                                        if (option.Img_Effect) {
                                            view_img.addClass("animated "+option.Img_Effect);
                                        }
                                    } else {
                                        view_img.attr("data-src", view_img.attr("src"));
                                        view_img.attr("src",TransparentImage);
                                        if (option.Img_Effect) {
                                            view_img.removeClass("animated "+option.Img_Effect);
                                        }
                                    }
                                }
                            },500);
                        } else {
                            setTimeout(function () {
                                if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                    view_img.wrap("<label class='wh_in img_thumb'></label>");
                                    view_img.parent(".img_thumb").css({
                                        "background-image": 'url("' + view_img.attr("src") + '")'
                                    });
                                    view_img.remove();
                                } else {
                                    if (view_img.offset().top < view_h) {
                                        if (option.scrollTop) {
                                            var offset_top = option.scrollTop;
                                        } else {
                                            var offset_top = view_img.offset().top - view_h;
                                        }
                                        if (view_img.offset().top < view_h) {
                                            if (offset_top >= option.scroll.scrollTop()) {
                                                $(function () {
                                                    view_img.addClass("animated "+option.Img_Effect);
                                                    view_img.attr("src", view_img.data("src"));
                                                });
                                            }
                                        } else {
                                            if (offset_top <= option.scroll.scrollTop()) {
                                                $(function () {
                                                    view_img.addClass("animated "+option.Img_Effect);
                                                    view_img.attr("src", view_img.data("src"));
                                                });
                                            }
                                        }
                                    } else {
                                        if (view_img.offset().top > option.scroll.scrollTop()+view_h) {
                                            view_img.attr("data-src", view_img.attr("src"));
                                            view_img.attr("src",TransparentImage);
                                        }
                                        if (option.Img_Effect) {
                                            view_img.removeClass("animated "+option.Img_Effect);
                                        }
                                    }
                                }
                            },500);
                        }
                    });
                }
                if (option.Img_Error) {
                    ele.on("error",function(){
                        if ($(this).attr("src") != "" || $(this).attr("onerror")==="") {
                            $(this).replaceWith("<img src=" + option.Img_Error + " class='ak-noimage' />");
                        }
                    });
                }
            }
            option.scroll.on('scroll', function (ak) {
                ak.preventDefault();
                var scroll_ele = $(this);
                var clientHeight = scroll_ele.scrollTop() + scroll_ele.prop('clientHeight');
                var scrollTop = scroll_ele.scrollTop();
                var arr = new Array();
                for(var i = 0; i < ele.length; i++) {
                    arr[i] = ele.eq(i).offset().top + scrollTop + (ele.eq(i).prop('offsetHeight') / 2);
                    if(arr[i] >= scrollTop && arr[i] <= clientHeight){
                        if (ele.eq(i).prop('tagName') == "img" || ele.eq(i).prop('tagName') == "IMG") {
                            ele.eq(i).attr("src", ele.eq(i).data("src"));
                            ele.eq(i).addClass("animated " + option.Img_Effect);
                        }
                    }
                }
                option.Scrollback(ele,scrollTop);
                ele.each(function () {
                    var view_ele = $(this);
                    if (IsMobile) {
                        if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                            if (view_ele.offset().top < view_h) {
                                if (option.scrollTop >= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            } else {
                                if (option.scrollTop >= scrollTop) {
                                    view_ele.attr("src",TransparentImage);
                                    view_ele.removeClass("animated "+option.Img_Effect);
                                }
                            }
                        }
                    } else {
                        if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                            if (option.scrollTop) {
                                var offset_top = option.scrollTop;
                            } else {
                                var offset_top = view_ele.offset().top - view_h;
                            }
                            if (view_ele.offset().top < view_h) {
                                if (offset_top >= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            } else {
                                if (offset_top <= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            }
                        }
                    }

                });
            });
            var TransparentImage ="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwMkY5NUExNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwMkY5NUEyNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjAyRjk1OUY2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjAyRjk1QTA2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_AllChecked (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_AllChecked = function(settings) {
        var ele = $(this);
        var allCheck = ele.children().eq(0).children("dl").find(":checkbox");
        var checks = ele.children().eq(0).children("dl").next().children().children("dl").find(":checkbox");
        var defaults = {
            toggleClass: "",
            callback: function() {}
        };
        var option = $.extend(defaults, settings);
        allCheck.prop("checked", false);
        allCheck.parent("label").removeClass(option.toggleClass);
        allCheck.unbind("click");
        allCheck.click(function() {
            var set = $(this).parents("dl").next().find(":checkbox");
            if ($(this).prop("checked")) {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", true);
                        $(v).parent("label").addClass(option.toggleClass);
                        option.callback($(v))
                    });
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", false);
                        $(v).parent("label").removeClass(option.toggleClass);
                        option.callback($(v));
                    });
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
        });
        checks.unbind("click");
        checks.click(function() {
            var leng = $(this).parents("dl").parent().parent().find(":checkbox:checked").length;
            if ($(this).prop("checked")) {
                $(this).parent("label").addClass(option.toggleClass);
            } else {
                $(this).parent("label").removeClass(option.toggleClass);
            }
            if (leng == checks.length) {
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
            option.callback(checks);
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ButtonSubmit (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ButtonSubmit = function(msg, setting) {
        var option = $.extend({
                click: false,
                icon: ["1.2em", "#ffffff"],
                callback: function() {}
            },
            setting);
        var btn = $(this);
        if (btn.prop("tagName") == "button" || btn.prop("tagName") == "BUTTON") {
            if (option.click) {
                btn.click(function() {
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text", _this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                    document.activeElement.blur();
                })
            } else {
                btn.each(function() {
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text", _this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                })
            }
            function submit_setting(_this) {
                if (msg) {
                    _this.html(msg);
                }
                option.callback(_this, ak_disabled);
                function ak_disabled(state) {
                    AKjs_UserAgent();
                    if (state) {
                        _this.addClass("disabled").attr("disabled", "disabled").html("<em class='ak-submit-loading'><i></i><span>" + msg + "</span></em>");
                        _this.find(".ak-submit-loading").css({
                            "border-color": option.icon[1]
                        });
                        _this.find(".ak-submit-loading i").css({
                            "width": option.icon[0],
                            "height": option.icon[0]
                        });
                        if (IsIE8 || IsIE7 || IsIE6) {
                            _this.find(".ak-submit-loading i").hide();
                        }
                    } else {
                        _this.removeClass("disabled").removeAttr("disabled").html(_this.attr("data-text"));
                    }
                }
            }
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_ChangeIcon (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ChangeIcon = function(setting) {
        var option = $.extend({
                multi_icon: false,
                text_color: new Array(),
                Change_icon: new Array(),
                clickBack: function () {
                }
            },
            setting);
        var $ChangeIcon = $(this);
        $ChangeIcon.unbind("click");
        $ChangeIcon.click(function () {
            var icon_ele = $(this);
            if (option.multi_icon == true) {
                icon_ele.children().eq(0).addClass(option.text_color[1]);
                icon_ele.children().eq(1).toggleClass(option.text_color[1] + " " + option.text_color[0]);
                if (icon_ele.children().eq(1).hasClass(option.text_color[1])) {
                    icon_ele.children().find("i").eq(0).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    option.clickBack("up",option, icon_ele);
                } else {
                    icon_ele.children().find("i").eq(0).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    option.clickBack("down",option, icon_ele);
                }
            } else {
                icon_ele.children().toggleClass(option.text_color[1] + " " + option.text_color[0]);
                var flag = false;
                if (icon_ele.children().hasClass(option.text_color[1])) {
                    icon_ele.children().addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").addClass(option.Change_icon[1]).removeClass(option.Change_icon[0]);
                    option.clickBack(true,option, icon_ele);
                    flag = true;
                } else {
                    icon_ele.children().removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").removeClass(option.Change_icon[1]).addClass(option.Change_icon[0]);
                    option.clickBack(false,option, icon_ele);
                    flag = false;
                }
                if (flag == true) {
                    icon_ele.children().addClass(option.text_color[1]);
                    icon_ele.children().find("i").addClass(option.text_color[1]);
                } else {
                    icon_ele.children().removeClass(option.text_color[1]);
                    icon_ele.children().find("i").removeClass(option.text_color[1]);
                }
            }
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_ChangeInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ChangeInput = function(setting) {
        var option = $.extend({
                text_input: new Array(),
                onChange:function(){}
            },
            setting);
        var $ChangeInput = $(this);
        $ChangeInput.unbind("click");
        $ChangeInput.click(function() {
            var left_input = $(option.text_input[0]);
            var right_input = $(option.text_input[1]);
            var tmp ="";
            var left_input_value = left_input.val();
            var right_input_value = right_input.val();
            tmp = left_input_value;
            left_input.val(right_input_value);
            right_input.val(tmp);
            option.onChange(right_input_value,tmp);
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_Checkbox (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Checkbox = function(settings) {
        var _defaults = {
            boxSize: "",
            checkedClass: "bg_title bor_title c_white",
            disabledClass: "bg_gray_ccc bor_gray_ccc c_white",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var self = this;
        if (!self.parent("label").hasClass("ak-Checkbox")) {
            self.wrap("<label />");
        }
        var checkboxes = self.parent("label");
        checkboxes.addClass("ak-Checkbox");
        if (options.boxSize) {
            checkboxes.css({
                "width": options.boxSize,
                "height": options.boxSize,
                "line-height": options.boxSize
            })
        }
        AKjs_UserAgent();
        if (IsMobile) {
            checkboxes.addClass("sta");
            checkboxes.find('input[type="checkbox"]').addClass("top_0");
            checkboxes.removeClass("bor_rad_0");
        } else {
            checkboxes.addClass("bor_rad_0");
            checkboxes.removeClass("sta");
            checkboxes.find('input[type="checkbox"]').removeClass("top_0")
        }
        $(window).resize(function() {
            if (IsMobile) {
                checkboxes.addClass("sta");
                checkboxes.find('input[type="checkbox"]').addClass("top_0");
                checkboxes.removeClass("bor_rad_0")
            } else {
                checkboxes.addClass("bor_rad_0");
                checkboxes.removeClass("sta");
                checkboxes.find('input[type="checkbox"]').removeClass("top_0");
            }
        });
        checkboxes.attr("data-name", self.attr("name"));
        checkboxes.each(function(ev) {
            if ($(this).find('input[type="checkbox"]').attr("multiple")) {
                var $checkbox = $(ev.target);
            } else {
                var $checkbox = $(this);
            }
            if ($(this).find('input[type="checkbox"]').attr("checked")) {
                $(this).addClass(options.checkedClass);
                $(this).find('input[type="checkbox"]').attr("checked", "checked");
            } else {
                if ($(this).find('input[type="checkbox"]').is(":disabled")) {
                    $(this).addClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').attr("checked", "checked");
                } else {
                    $(this).removeClass(options.checkedClass).removeClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').removeAttr("checked");
                }
            }
            $checkbox.on("change", function() {
                if ($checkbox.find('input[type="checkbox"]').attr("checked")) {
                    $checkbox.find('input[type="checkbox"]').removeAttr("checked");
                    $checkbox.removeClass(options.checkedClass);
                } else {
                    $checkbox.find('input[type="checkbox"]').attr("checked", "checked");
                    $checkbox.addClass(options.checkedClass);
                }
                options.onChange($($(this).children()[0]));
            });
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ChooseList (2018-12-13)--------------------------------------------*/
(function($) {
    var defaults = {
        itemWidth: null,
        multi: false,
        btnClass: "",
        btnIcon: true,
        active: "",
        full: false,
        dataKey: "dataKey",
        change: null,
        click: null
    };
    $.fn.AKjs_ChooseList = function(options) {
        var _this = $(this),
            _num = _this.length;
        if (_num === 1) {
            return new ak_Choose(_this, options)
        }
        if (_num > 1) {
            _this.each(function(index, el) {
                new ak_Choose($(el), options)
            })
        }
    };
    function ak_Choose(el, opt) {
        this.el = el;
        this._tag = this.el.prop("tagName").toLowerCase();
        this._opt = $.extend({},
            defaults, opt);
        return this._init()
    }
    ak_Choose.prototype = {
        _init: function() {
            var _data = this.el.data(this._opt.dataKey);
            if (_data) {
                return _data
            } else {
                this.el.data(this._opt.dataKey, this)
            }
            this.multi = this.el.attr("data-multiple") ? !!this.el.attr("data-multiple") : this._opt.multi;
            var _setFunc = this["_setHtml_btn"];
            if (_setFunc) {
                _setFunc.call(this)
            }
            var option = this._opt;
            this._items.each(function() {
                var _this = this;
                var _self = $(this);
                if (option.btnIcon) {
                    if (_self.children("i").length < 1) {
                        _self.append('<i class="c_in abs minus_bottom_03em minus_right_01em line_h_no text_18em icon-im_xuanze_b dis_none_im"></i>');
                        if (_self.attr("data-checked")) {
                            _self.children("i").removeClass("dis_none_im")
                        } else {
                            _self.children("i").addClass("dis_none_im")
                        }
                    }
                }
                _self.attr("type", "button").addClass(option.btnClass);
                if (_self.attr("data-checked")) {
                    _self.addClass(option.active)
                } else {
                    _self.removeClass(option.active)
                }
            });
            this._bindEvent()
        },
        _setHtml_btn: function() {
            this._wrap = this.el;
            this._items = this.el.children("button");
            if (this._opt.itemWidth) {
                this._items.css("width", this._opt.itemWidth)
            }
        },
        _bindEvent: function() {
            var _this = this;
            this._items.unbind("click");
            _this._wrap.on("click", "button",
                function() {
                    var _self = $(this);
                    if (_self.hasClass("disabled")) {
                        return
                    }
                    if (!_this.multi) {
                        var _val = _self.attr("data-value") || _self.index();
                        _this.val(_val);
                        _this._triggerClick(_val, _self);
                        _this._items.each(function(el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        })
                    } else {
                        _self.toggleClass(_this._opt.active);
                        var _val = [];
                        _this._items.each(function(index, el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.attr("data-checked", "true");
                                var _valOrIndex = _el.index();
                                _val.push(_valOrIndex);
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        });
                        _this.val(_val);
                        _this._triggerClick(_val, _self)
                    }
                });
            return _this
        },
        _triggerChange: function(value, item) {
            item = item || this._wrap;
            this.change(value, item);
            if (typeof this._opt.change == "function") {
                this._opt.change.call(this, value, item)
            }
        },
        _triggerClick: function(value, item) {
            this.click(value, item);
            if (typeof this._opt.click == "function") {
                this._opt.click.call(this, value, item)
            }
        },
        _val_btn: function(index) {
            if (arguments.length === 0) {
                var _oActive = this._wrap.children("button." + this._opt.active);
                if (!this.multi) {
                    return _oActive.index() == -1 ? null: _oActive.index()
                } else {
                    if (_oActive.length == 0) {
                        return null
                    }
                    var _this = this,
                        _val = [];
                    _oActive.each(function(index, el) {
                        var _el = $(el);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.attr("data-checked", "true");
                            _val.push(_el.index())
                        }
                    });
                    return _val
                }
            }
            var _oIndex = this._val_btn();
            if (!this.multi) {
                var _ChooseItem = this._wrap.children("button").eq(index);
                if (!_ChooseItem.length) {
                    return this
                }
                _ChooseItem.addClass(this._opt.active).siblings("button").removeClass(this._opt.active);
                _ChooseItem.attr("data-checked", "true").siblings("button").removeAttr("data-checked");
                if (index !== _oIndex) {
                    this._triggerChange(index, _ChooseItem)
                }
            } else {
                if (index == null || index == "" || index == []) {
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked")
                } else {
                    index = typeof index == "object" ? index: [index];
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked");
                    for (var i in index) {
                        var _no = index[i];
                        this._wrap.children("button").eq(_no).addClass(this._opt.active);
                        this._wrap.children("button").eq(_no).attr("data-checked", "true")
                    }
                }
                if (index !== _oIndex) {
                    this._triggerChange(index)
                }
            }
            return this
        },
        val: function() {
            return this["_val_btn"].apply(this, arguments)
        },
        change: function(value, item) {},
        click: function(value, item) {},
        hide: function() {
            this._wrap.hide();
            return this
        },
        show: function() {
            this._wrap.show();
            return this
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Circliful (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Circliful = function(setting) {
        var option = $.extend({
                prog_color: "",
                bg_color: "",
                fill_color: false,
                width: 15,
                dimension: 200,
                font_size: 15,
                font_color: "#333333",
                percent: 50,
                animationStep: 1
            }, setting);
        return this.each(function() {
            var $dimension = "";
            var $ele_text = "";
            var $ele_info = "";
            var $width = "";
            var $font_size = 0;
            var $font_color = "";
            var $percents = 0;
            var $percent = 100;
            var $prog_color = "";
            var $bg_color = "";
            var $icon = "";
            var $animationStep = 0;
            var ele = $(this);
            ele.html("<section />");
            var section = ele.children("section");
            if (ele.data("dimension") != undefined) {
                $dimension = ele.data("dimension")
            } else {
                $dimension = option.dimension
            }
            if (ele.data("width") != undefined) {
                $width = ele.data("width")
            } else {
                $width = option.width
            }
            if (ele.data("font_size") != undefined) {
                $font_size = ele.data("font_size")
            } else {
                $font_size = option.font_size
            }
            if (ele.data("font_color") != undefined) {
                $font_color = ele.data("font_color")
            } else {
                $font_color = option.font_color
            }
            if (ele.data("percent") != undefined) {
                $percents = ele.data("percent") / 100;
                $percent = ele.data("percent")
            } else {
                $percents = option.percent / 100
            }
            if (ele.data("prog_color") != undefined) {
                $prog_color = ele.data("prog_color")
            } else {
                $prog_color = option.prog_color
            }
            if (ele.data("bg_color") != undefined) {
                $bg_color = ele.data("bg_color")
            } else {
                $bg_color = option.bg_color
            }
            if (ele.data("animationStep") != undefined) {
                $animationStep = parseFloat(ele.data("animationStep"))
            } else {
                $animationStep = option.animationStep
            }
            if (ele.data("text") != undefined) {
                $ele_text = ele.data("text");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-text-half w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text_half();
                    } else {
                        section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text();
                    }
                } else {
                    section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                    css_text();
                }
            }
            if (ele.data("info") != undefined) {
                $ele_info = ele.data("info");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-info-half w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info_half();
                    } else if ($ele_type == "spacing") {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                        section.append("<div class='top_0 left_0 abs bor_rad_50' />");
                        var val = ele.data("width");
                        AKjs_UserAgent();
                        if (IsMobile) {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.2);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val > '15':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                            }
                        } else {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.1);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.3);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '20':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val <= '25':
                                    var wh =($dimension - ($width*2))-($width/0.8);
                                    break;
                                case val <= '30':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                                case val > '30':
                                    var wh =($dimension - ($width*2))-($width/2);
                                    break;
                            }
                        }
                        var div = ele.find("div");
                        div.css({
                            "width": wh + "px",
                            "height": wh + "px"
                        });
                        div.css({
                            "margin": $dimension/2 - (div.outerWidth()/2) + "px"
                        });
                        if (ele.data("spacing_color") != undefined) {
                            div.css({
                                "background-color": ele.data("spacing_color")
                            });
                        }
                    }else {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                    }
                } else {
                    section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                    css_info();
                }
            }
            function css_text() {
                ele.find(".ak-text").css({
                    "line-height": $dimension - 20 + "px",
                    "font-size": $font_size,
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info() {
                ele.find(".ak-info").css({
                    "line-height": ($dimension * 1.25) + "px",
                    "font-size": "0.6em",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_text_half() {
                ele.find(".ak-text-half").css({
                    "line-height": $dimension/2*1.25 + "px",
                    "font-weight": "bold",
                    "font-size": "1.2em",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info_half() {
                ele.find(".ak-info-half").css({
                    "line-height": ($dimension * 0.86) + "px",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            ele.width($dimension + "px");
            var $canvas = $("<canvas></canvas>").attr({
                width: $dimension,
                height: $dimension
            }).appendTo(section).get(0);
            section.addClass("rel ovh");
            var context = $canvas.getContext("2d");
            var $canvas_width = $canvas.width / 2;
            var $canvas_height = $canvas.height / 2;
            var radius = $canvas.width / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var curPerc = $animationStep === 0 ? $percent: 0;
            var curStep = Math.max($animationStep, 0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var $ele_type = "";
            var $fill_color = false;
            if (ele.data("type") != undefined) {
                $ele_type = ele.data("type");
                if ($ele_type == "half") {
                    var startAngle = 2 * Math.PI;
                    var endAngle = 3.13;
                    var circ = Math.PI * 1;
                    var quart = Math.PI / 0.996
                }
            }
            if (ele.data("fill_color") != undefined) {
                $fill_color = ele.data("fill_color");
            } else {
                $fill_color = option.fill_color;
            }
            function k(x) {
                context.clearRect(0, 0, $canvas.width, $canvas.height);
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, endAngle, startAngle, false);
                context.lineWidth = $width - 1;
                context.strokeStyle = $bg_color;
                context.stroke();
                if ($fill_color) {
                    context.fillStyle = $fill_color;
                    context.fill();
                }
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, -(quart), ((circ) * x) - quart, false);
                context.lineWidth = $width;
                context.strokeStyle = $prog_color;
                context.stroke();
                if (curPerc < $percent) {
                    curPerc += curStep;
                    requestAnimationFrame(function() {
                        k(Math.min(curPerc, $percent) / 100)
                    })
                }
            }
            k(curPerc / 100)
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_CitySelect (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_CitySelect = function(setting) {
        var option = $.extend({
                jsonData: [],
                BoxWidth: "32em",
                BackBtn: "Back",
                TitleText: "Title",
                CloseBtn: "Close",
                callback: function() {},
                clickback: function() {}
            },
            setting);
        var _self = $(this);
        $(window).bind('hashchange', function () {
            $(".ak-areaLayer").remove();
        });
        var jsonData = option.jsonData;
        var _html = [];
        _html.push("<div class=\"ak-areaLayer\">");
        _html.push("<section>");
        _html.push("<button class=\"fl\">"+option.BackBtn+"</button>");
        _html.push("<h3>"+option.TitleText+"</h3>");
        _html.push("<button class=\"fr\">"+option.CloseBtn+"</button>");
        _html.push("</section>");
        _html.push("<article class='scrollbar'>");
        _html.push("<ul></ul>");
        _html.push("</article>");
        _html.push("</div>");
        var areaLayer = $(_html.join(""));
        var expressArea, expressCode, areaCont, areaList = areaLayer.find("ul");
        _self.click(function() {
            $(".ak-areaLayer").remove();
            var _this = $(this);
            if ($('#ak-scrollview').length > 0) {
                if (_self.parents("dialog")[0] != undefined) {
                    $('main').append(areaLayer);
                } else {
                    $('#ak-scrollview').append(areaLayer);
                }
            } else {
                $('body').append(areaLayer);
            }
            areaLayer_css(_this);
            intProvince();
            areaLayer.children("section").find("h3").text(option.TitleText);
            areaLayer.toggleClass("ak-open");
            if (areaLayer.hasClass("ak-open")) {
                areaLayer.slideDown();
                option.callback(_self, areaLayer);
            } else {
                areaLayer.slideUp();
            }
            areaLayer.children("section").find("button.fl").click(function() {
                intProvince();
                areaLayer.children("section").find("h3").text(option.TitleText);
            });
            areaLayer.children("section").find("button.fr").click(function() {
                areaLayer.slideUp();
                areaLayer.removeClass("ak-open");
                setTimeout(function () {
                    areaLayer.remove();
                },500);
            });
        });
        $(document).on("mousedown", function(e) {
            if ($(e.target).closest(".ak-areaLayer").length === 0) {
                areaLayer.slideUp();
                setTimeout(function () {
                    if(areaLayer.css('display') == 'none'){
                        areaLayer.removeClass("ak-open").remove();
                    }
                },500);
            }
        });
        $(window).resize(function () {
            areaLayer_css(_self);
        });
        function areaLayer_css(_this) {
            var offset = _this.offset();
            areaLayer.css({
                "width": option.BoxWidth
            });
            var height = _this.outerHeight() + parseInt(_this.css("margin-top"));
            var width = _this.outerWidth() + parseInt(_this.css("margin-left"));
            if (offset.left + areaLayer.width() > $(window).width()) {
                offsetLeft = offset.left - $("#ak-scrollview").offset().left - areaLayer.width() + width;
            } else {
                offsetLeft = offset.left - $("#ak-scrollview").offset().left;
            }
            if (_self.parents("dialog")[0] != undefined) {
                fullOffsetTop = offset.top + height;
            } else {
                fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top;
            }
            var fullOffsetBottom = "auto";
            areaLayer.css({
                bottom: fullOffsetBottom,
                top: fullOffsetTop,
                left: offsetLeft,
            });
        }
        function intProvince() {
            areaCont = "";
            for (var i=0; i<jsonData.length; i++) {
                areaCont += '<li data-id="'+jsonData[i].id+'" data-area="'+i+'">' + jsonData[i].value + '</li>';
            }
            areaList.html(areaCont);
            areaList.find("li").click(function () {
                Select_Province($(this).attr("data-area"));
            });
            areaLayer.children("article").scrollTop(0);
            areaLayer.children("section").find("button.fl").hide();
        }
        function Select_Province(index) {
            areaCont = "";
            areaList.html("");
            for (var j=0; j<jsonData[index].childs.length; j++) {
                areaCont += '<li data-id="'+jsonData[index].childs[j].id+'" data-area="'+index+','+j+'">' + jsonData[index].childs[j].value + '</li>';
            }
            areaList.html(areaCont);
            areaList.find("li").click(function () {
                Select_City($(this).attr("data-area"));
            });
            areaLayer.children("article").scrollTop(0);
            areaLayer.children("section").find("button.fl").show();
            expressArea = jsonData[index].value + " > ";
            areaLayer.children("section").find("h3").text(expressArea.substring(0, expressArea.lastIndexOf('>')));
        }
        function Select_City(index) {
            var index = index.split(",");
            if (jsonData[index[0]].childs[index[1]].id == "441900" || jsonData[index[0]].childs[index[1]].id == "442000" ||jsonData[index[0]].childs[index[1]].childs == undefined) {
                expressArea += jsonData[index[0]].childs[index[1]].value;
                expressCode = jsonData[index[0]].childs[index[1]].id;
                _self.val(expressArea);
                option.clickback(_self, areaLayer, expressArea, expressCode);
                areaLayer.slideUp();
                areaLayer.removeClass("ak-open").remove();
            } else {
                areaCont = "";
                for (var k=0; k<jsonData[index[0]].childs[index[1]].childs.length; k++) {
                    areaCont += '<li data-id="'+jsonData[index[0]].childs[index[1]].childs[k].id+'" data-area="'+index[0]+','+index[1]+','+k+'">' + jsonData[index[0]].childs[index[1]].childs[k].value + '</li>';
                }
                areaList.html(areaCont);
                areaList.find("li").click(function () {
                    Select_District($(this).attr("data-area"));
                });
                areaLayer.children("article").scrollTop(0);
                areaLayer.children("section").find("button.fl").show();
                expressArea = jsonData[index[0]].value + " > " + jsonData[index[0]].childs[index[1]].value + " > ";
                areaLayer.children("section").find("h3").text(expressArea.substring(0, expressArea.lastIndexOf('>')));
            }
        }
        function Select_District(index) {
            var index = index.split(",");
            expressArea += jsonData[index[0]].childs[index[1]].childs[index[2]].value;
            expressCode = jsonData[index[0]].childs[index[1]].childs[index[2]].id;
            _self.val(expressArea);
            option.clickback(_self, areaLayer, expressArea, expressCode);
            areaLayer.slideUp();
            areaLayer.removeClass("ak-open").remove();
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Codeval (2018-12-13)--------------------------------------------*/
(function($) {
    var settings = {
        codeView: "",
        codeLength: "4",
        inputEle: ""
    };
    var _set = {
        storeLable: "codeval",
        codeval: ".ak-codeval"
    };
    $.AKjs_Codeval = {
        ak_getCode: function(option) {
            _commSetting(option);
            return _storeData(_set.storeLable, null)
        },
        ak_setCode: function(option) {
            _commSetting(option);
            _setCodeStyle(settings.codeView, settings.codeLength)
        },
        ak_validateCode: function(option) {
            _commSetting(option);
            var inputV;
            inputV = $(settings.inputEle).val();
            if (inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()) {
                return true
            } else {
                _setCodeStyle(settings.codeView, settings.codeLength);
                return false
            }
        }
    };
    function _commSetting(option) {
        $.extend(settings, option);
    }
    function _storeData(dataLabel, data) {
        var store = $(_set.codeval).get(0);
        if (data) {
            $.data(store, dataLabel, data);
        } else {
            return $.data(store, dataLabel);
        }
    }
    function _setCodeStyle(eid, codeLength) {
        var codeObj = _createCode(settings.codeLength);
        var htmlCode = "";
        htmlCode += '<ol class="' + _set.codeval.substring(1) + '" id="' + _set.codeval.substring(1) + '" onclick="$.AKjs_Codeval.ak_setCode()">' + _setStyle(codeObj) + "</ol>";
        $(eid).html(htmlCode);
        $(function() {
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight()) / 2
            })
        });
        $(window).resize(function() {
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight()) / 2
            })
        });
        $(settings.inputEle).attr("maxlength", settings.codeLength);
        _storeData(_set.storeLable, codeObj);
    }
    function _setStyle(codeObj) {
        var fnCodeObj = new Array();
        var col = new Array("#BF0C43", "#E69A2A", "#707F02", "#18975F", "#BC3087", "#73C841", "#780320", "#90719B", "#1F72D8", "#D6A03C", "#6B486E", "#243F5F", "#16BDB5");
        var charIndex;
        for (var i = 0; i < codeObj.length; i++) {
            charIndex = Math.floor(Math.random() * col.length);
            fnCodeObj.push('<li style="color:' + col[charIndex] + ';">' + codeObj.charAt(i) + "</li>")
        }
        return fnCodeObj.join("")
    }
    function _createCode(codeLength) {
        var codeObj;
        codeObj = _createCodeFollow(codeLength);
        return codeObj
    }
    function _createCodeFollow(codeLength) {
        var code = "";
        var selectChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * selectChar.length);
            if (charIndex % 2 == 0) {
                code += selectChar[charIndex].toLowerCase();
            } else {
                code += selectChar[charIndex];
            }
        }
        return code
    }
} (jQuery));

/*-----------------------------------------------AKjs_Completer (2018-12-13)--------------------------------------------*/
(function($) {
    var $window = $(window);
    var $document = $(document);
    var $namespace = 'completer';
    var $event_resize = 'resize';
    var $event_mousedown = 'mousedown';

    function ak_Completer(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ak_Completer.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }

    function espace(s) {
        return s.replace(/([\.\$\^\{\[\(\|\)\*\+\?\\])/g, '\\$1');
    }

    function toRegexp (s) {
        if (typeof s === 'string' && s !== '') {
            s = espace(s);

            return new RegExp(s + '+[^' + s + ']*$', 'i');
        }

        return null;
    }

    function toArray(s) {
        if (typeof s === 'string') {
            s = s.replace(/[\{\}\[\]"']+/g, '').split(/\s*,+\s*/);
        }
        s = $.map(s, function (n) {
            return typeof n !== 'string' ? n.toString() : n;
        });
        return s;
    }
    ak_Completer.prototype = {
        constructor: ak_Completer,
        init: function () {
            var options = this.options,
                data = toArray(options.source);
            if (data.length > 0) {
                this.data = data;
                this.regexp = toRegexp(options.separator);
                this.$element.attr('autocomplete', 'off').on({
                    focus: $.proxy(this.enable, this),
                    blur: $.proxy(this.disable, this)
                });
                if (this.$element.is(':focus')) {
                    this.enable();
                }
            }
        },
        enable: function () {
            if (!this.active) {
                this.active = true;
                this.$completer = $("<ul class='ak-Completer list'></ul>");
                if ($('#ak-scrollview').length > 0) {
                    if (this.$element.parents("dialog")[0] != undefined) {
                        this.$completer.hide().appendTo('main');
                    } else {
                        this.$completer.hide().appendTo('#ak-scrollview');
                    }
                } else {
                    this.$completer.hide().appendTo('body');
                }
                this.place();
                this.$element.on({
                    keydown: $.proxy(this.keydown, this),
                    keyup: $.proxy(this.keyup, this)
                });
                this.$completer.on({
                    mousedown: $.proxy(this.mousedown, this),
                    mouseover: $.proxy(this.mouseover, this)
                });
            }
        },
        disable: function () {
            if (this.active) {
                this.active = false;
                this.$element.off({
                    keydown: this.keydown,
                    keyup: this.keyup
                });
                this.$completer.off({
                    mousedown: this.mousedown,
                    mouseover: this.mouseover
                });
                $(".ak-Completer").remove();
            }
        },
        attach: function (val) {
            var options = this.options;
            var separator = options.separator;
            var regexp = this.regexp;
            var part = regexp ? val.match(regexp) : null;
            var matched = [];
            var all = [];
            var that = this;
            var reg;
            var item;
            if (part) {
                part = part[0];
                val = val.replace(regexp, '');
                reg = new RegExp('^' +  espace(part), 'i');
            }
            $.each(this.data, function (i, n) {
                n = separator + n;
                item = that.template(val + n);

                if (reg && reg.test(n)) {
                    matched.push(item);
                } else {
                    all.push(item);
                }
            });
            matched = matched.length ? matched.sort() : all;
            if (options.position === 'top') {
                matched = matched.reverse();
            }
            this.fill(matched.join(''));
        },
        suggest: function (val) {
            var reg = new RegExp(espace(val), 'i');
            var that = this;
            var matched = [];
            $.each(this.data, function (i, n) {
                if (reg.test(n)) {
                    matched.push(n);
                }
            });
            matched.sort(function (a, b) {
                return a.indexOf(val) - b.indexOf(val);
            });
            $.each(matched, function (i, n) {
                matched[i] = that.template(n);
            });
            this.fill(matched.join(''));
        },
        template: function (text) {
            return ('<li>' + text + '</li>');
        },
        fill: function (html) {
            var filter;
            this.$completer.empty();
            if (html) {
                filter = this.options.position === 'top' ? ':last' : ':first';
                this.$completer.html(html);
                this.$completer.children(filter).addClass(this.options.selectedClass);
                this.show();
            } else {
                this.hide();
            }
        },
        complete: function () {
            var options = this.options;
            var val = options.filter(this.$element.val()).toString();
            if (val === '') {
                this.hide();
                return;
            }
            if (options.suggest) {
                this.suggest(val);
            } else {
                this.attach(val);
            }
        },
        keydown: function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;

            if (keyCode === 13) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        keyup: function (e) {
            var keyCode = e.keyCode || e.which || e.charCode;
            if (keyCode === 13 || keyCode === 38 || keyCode === 40) {
                this.toggle(keyCode);
            } else {
                this.complete();
            }
        },
        mouseover: function (e) {
            var options = this.options;
            var selectedClass = options.selectedClass,
                $target = $(e.target);

            if ($target.is("li")) {
                $target.addClass(selectedClass).siblings().removeClass(selectedClass);
            }
        },
        mousedown: function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.setValue($(e.target).text());
        },
        setValue: function (val) {
            this.$element.val(val);
            this.hide();
            this.options.itemSelected(val, this.$element, this.$completer);
        },
        toggle: function (keyCode) {
            var selectedClass = this.options.selectedClass;
            var $selected = this.$completer.find('.' + selectedClass.replace(" ","."));
            switch (keyCode) {
                case 40:
                    $selected.removeClass(selectedClass);
                    $selected = $selected.next();
                    break;
                case 38:
                    $selected.removeClass(selectedClass);
                    $selected = $selected.prev();
                    break;
                case 13:
                    this.setValue($selected.text());
                    break;
            }
            if ($selected.length === 0) {
                $selected = this.$completer.children(keyCode === 40 ? ':first' : ':last');
            }
            $selected.addClass(selectedClass);
        },

        place: function () {
            var $element = this.$element;
            var offset = $element.offset();
            var height = $element.outerHeight();
            var width = $element.outerWidth();
            if ($('#ak-scrollview').length > 0) {
                var left = offset.left - $("#ak-scrollview").offset().left;
                var top = offset.top - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop();
                var bottom = $window.innerHeight() - top - $("#ak-scrollview").offset().top;
            } else {
                var left = offset.left;
                var top = offset.top;
                var bottom = $window.innerHeight() - top;
            }
            var styles = {
                minWidth: width,
                zIndex: this.options.zIndex
            };

            switch (this.options.position) {
                case 'top':
                    styles.left = left;
                    styles.bottom = bottom;
                    break;
                default:
                    styles.left = left;
                    styles.top = top + height;
            }

            this.$completer.css(styles);
        },

        show: function () {
            this.$completer.slideDown();
            $window.on($event_resize, $.proxy(this.place, this));
            $document.on($event_mousedown, $.proxy(this.hide, this));
            this.options.showCallBack(this.$element.val(), this.$element, this.$completer);
        },

        hide: function () {
            this.$completer.slideUp();
            $window.off($event_resize, this.place);
            $document.off($event_mousedown, this.hide);
        },

        destroy: function () {
            var $this = this.$element;

            this.hide();
            this.disable();

            $this.off({
                focus: this.enable,
                blur: this.disable
            });

            $this.removeData($namespace);
        }
    };

    ak_Completer.DEFAULTS = {
        position: 'bottom',
        source: [],
        selectedClass: '',
        separator: '',
        suggest: false,
        zIndex: 10,
        filter: function (val) {
            return val;
        },
        showCallBack: function() {

        },
        itemSelected: function() {

        }
    };

    ak_Completer.setDefaults = function (options) {
        $.extend(ak_Completer.DEFAULTS, options);
    };

    ak_Completer.other = $.fn.AKjs_Completer;

    $.fn.AKjs_Completer = function (option) {
        var args = [].slice.call(arguments, 1);
        var result;

        this.each(function () {
            var $this = $(this);
            var data = $this.data($namespace);
            var options;
            var fn;

            if (!data) {
                if (/destroy/.test(option)) {
                    return;
                }

                options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
                $this.data($namespace, (data = new ak_Completer(this, options)));
            }

            if (typeof option === 'string' && $.isFunction(fn = data[option])) {
                result = fn.apply(data, args);
            }
        });

        return typeof result !== 'undefined' ? result : this;
    };

    $.fn.AKjs_Completer.Constructor = ak_Completer;
    $.fn.AKjs_Completer.setDefaults = ak_Completer.setDefaults;

    $.fn.AKjs_Completer.noConflict = function () {
        $.fn.AKjs_Completer = ak_Completer.other;
        return this;
    };
    $(function () {
        $('[data-toggle="completer"]').AKjs_Completer();
    });
} (jQuery));

/*-----------------------------------------------AKjs_CountDown  (2018-12-13)--------------------------------------------*/
function AKjs_CountDown(ele,setting) {
    var option = $.extend({
            wait: 10,
            Start_text: "",
            End_Text: "",
            callback:function(){
            }
        },
        setting);
    var waits = option.wait;
    if (waits == 0) {
        ele.removeAttr("disabled");
        ele.html(option.End_Text);
        waits = option.wait;
        option.callback(waits);
    }
    else {
        ele.attr("disabled", "disabled");
        ele.html(waits + option.Start_text);
        waits--;
        setTimeout(function() {
            AKjs_CountDown(ele,{
                wait: waits,
                Start_text: option.Start_text,
                End_Text: option.End_Text,
                callback:function(waits){
                    option.callback(waits);
                }
            })
        }, 1000);
    }
}

/*-----------------------------------------------AKjs_CountTo (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_CountTo = function(options) {
        options = options || {};
        return $(this).each(function() {
            var settings = $.extend({},
                $.fn.AKjs_CountTo.defaults, {
                    from: $(this).data("from"),
                    to: $(this).data("to"),
                    speed: $(this).data("speed"),
                    refreshInterval: $(this).data("refresh-interval"),
                    decimals: $(this).data("decimals")
                },
                options);
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data("AKjs_CountTo") || {};
            $self.data("AKjs_CountTo", data);
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            render(value);
            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == "function") {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    $self.removeData("AKjs_CountTo");
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == "function") {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        })
    };
    $.fn.AKjs_CountTo.defaults = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };
    function formatter(value, settings) {
        return value.toFixed(settings.decimals)
    }
} (jQuery));

/*-----------------------------------------------AKjs_Dialog  (2018-12-13)--------------------------------------------*/
(function($) {
    var ak = {};
    var AKjs_Dialog = {};
    ak.opening = false;
    ak.defaults = {
        title: false,
        animateIn: "bounceInDown",
        animateOut: "bounceOutUp",
        onSubmit: false,
        onCancel: false,
        required: false,
        icon: false,
        inputbox: false,
        inputType: "",
        inputClass: "",
        placeholder: "",
        button_ok: "OK",
        button_cancel: "CANCEL"
    };
    ak.tplBase = '<div class="ak-dialog">';
    ak.tplBase += '<div class="ak-dialog_container">';
    ak.tplBase += "{{header}}";
    ak.tplBase += '<div class="ak-dialog_content"><p>{{message}}</p>{{input}}</div>';
    ak.tplBase += '<div class="ak-dialog_footer">{{button_cancel}} <button type="button" class="ak_btn bg_white button_ok c_title">{{btn_ok}}</button></div>';
    ak.tplBase += "</div>";
    ak.tplBase += "</div>";
    ak.tplHeader = '<div class="ak-dialog_header bor_bottom_dashed bor_gray_ddd {{icon}}"><h3 class="ml_05em">{{title}}</h3></div>';
    ak.tplInput = '<div class="ak-dialog_field">{{inputbox}}</div>';
    ak.getTeplate = function(type, message, option) {
        var template = ak.tplBase;
        if (type !== "alert") {
            template = template.replace("{{button_cancel}}", '<button type="button" class="ak_btn bg_white button_cancel bor_right bor_gray_ddd">{{btn_cancel}}</button>')
        } else {
            template = template.replace("{{button_cancel}}", "")
        }
        if (type == "prompt") {
            template = template.replace("{{input}}", ak.tplInput)
        } else {
            template = template.replace("{{input}}", "")
        }
        if (option.title) {
            template = template.replace("{{header}}", ak.tplHeader.replace("{{title}}", option.title))
        } else {
            template = template.replace("{{header}}", "")
        }
        if (option.inputbox == "textarea") {
            template = template.replace("{{inputbox}}", "<textarea />")
        } else {
            if (option.inputbox == "input") {
                if (option.inputType) {
                    template = template.replace("{{inputbox}}", "<input type='" + option.inputType + "' />")
                } else {
                    template = template.replace("{{inputbox}}", "<input type='text' />")
                }
            }
        }
        template = template.replace("{{icon}}", option.icon);
        template = template.replace("{{btn_ok}}", option.button_ok);
        template = template.replace("{{btn_cancel}}", option.button_cancel);
        template = template.replace("{{message}}", message);
        return template
    };
    ak.clear = function() {
        $("#alert_mask").length ? $("#alert_mask").remove() : "";
        $(".ak-dialog").length ? $(".ak-dialog").remove() : ""
    };
    ak.Dialog = function() {
        var that = this;
        that.close = function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            if (that.option.animateOut) {
                if (that.option.animateIn) {
                    that.container.find(".ak-dialog_container").removeClass(that.option.animateIn)
                }
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateOut);
                setTimeout(function() {
                        that.container.removeClass("is-active");
                        that.container.remove();
                        ak.opening = false;
                        $("#alert_mask").remove()
                    },
                    800)
            } else {
                that.container.remove();
                ak.opening = false;
                $("#alert_mask").remove()
            }
        };
        that.addEvents = function() {
            that.btnOk.unbind("click");
            that.btnOk.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length) {
                        if (that.option.required == true && !that.field.val().length) {
                            that.field.addClass("is-invalid");
                            return false
                        } else {
                            that.field.removeClass("is-invalid");
                            res = that.field.val()
                        }
                    } else {
                        res = true
                    }
                    if (typeof that.option.onSubmit == "function") {
                        that.option.onSubmit(res)
                    }
                    that.close()
                });
            that.btnCancel.unbind("click");
            that.btnCancel.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length && that.field.val().length !== 0) {
                        res = that.field.val()
                    }
                    if (typeof that.option.onCancel == "function") {
                        that.option.onCancel(res)
                    }
                    that.close()
                })
        };
        this.init = function(type, message, option, defaultValue) {
            if (ak.opening) {
                $("#alert_mask, .ak-dialog").remove()
            }
            ak.clear();
            that.option = ak.getOptions(option);
            $("body").append(ak.getTeplate(type, message, that.option) + "<div id='alert_mask' class=\"ak-mask\"></div> ");
            that.container = $("body").find(".ak-dialog");
            $("#alert_mask").bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            that.container.bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            $("#ak-scrollview").removeClass("scrolling_touch");
            that.btnOk = that.container.find(".button_ok");
            that.btnCancel = that.container.find(".button_cancel");
            if (option.inputbox == "textarea") {
                that.field = that.container.find("textarea")
            } else {
                that.field = that.container.find("input")
            }
            if (option.placeholder) {
                that.field.attr("placeholder", option.placeholder);
                var placeholder_tmps = "";
                that.field.focus(function() {
                    placeholder_tmps = $(this).attr("placeholder");
                    if ($(this)[0].type != "search") {
                        $(this).removeAttr("placeholder")
                    }
                    $(this).blur(function() {
                        $(this).attr("placeholder", placeholder_tmps)
                    })
                })
            }
            that.field.parents(".ak-dialog_content").children("p").addClass("ak-input_title");
            that.field.addClass(option.inputClass);
            if (defaultValue && that.field.length) {
                that.field.val(defaultValue)
            }
            that.container.addClass("ak-is_active").css({
                "top": ($(window).height() / 2) - (that.container.height() / 2)
            });
            if (that.option.animateIn) {
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateIn)
            }
            ak.opening = true;
            that.addEvents()
        }
    };
    ak.getOptions = function(option) {
        var o = $.extend({}, ak.defaults);
        if (typeof option == "object") {
            $.each(option, function(key, val) {
                o[key] !== undefined ? o[key] = val: console.error('The option "' + key + '" not exist.')
            });
        }
        return o
    };
    var isIE = function() {
        var U = navigator.userAgent,
            IsIE = U.indexOf("MSIE") > -1,
            a = IsIE ? /\d+/.exec(U.split(";")[1]) : "no ie";
        return a <= 8
    } ();
    if (!isIE) {
        alert = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("alert", message, userOptions)
        };
        confirm = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("confirm", message, userOptions)
        };
        prompt = function(message, defaultValue, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("prompt", message, userOptions, defaultValue)
        }
    }
    AKjs_Dialog.alert = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("alert", message, userOptions)
    };
    AKjs_Dialog.confirm = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("confirm", message, userOptions)
    };
    AKjs_Dialog.prompt = function(message, defaultValue, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("prompt", message, userOptions, defaultValue)
    };
    AKjs_Dialog.config = function(option) {
        if (typeof option !== "object") {
            return false
        }
        $.each(option, function(key, val) {
            ak.defaults[key] !== undefined ? ak.defaults[key] = val: console.error('The option "' + key + '" not exist.')
        });
    };
    $ak = AKjs_Dialog;
} (jQuery));

/*-----------------------------------------------AKjs_DownCountTime (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_DownCountTime = function(options, callback) {
        var settings = $.extend({
                date: null,
                CountText: {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: ''
                },
                offset: null
            },
            options);
        if (!settings.date) {
            $.error('Date is not defined.');
        }
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 11/15/2018 12:00:00.');
        }
        var container = this;
        container.html("<span class=\"days\">00</span><span class='days_txt'>"+settings.CountText.days+"</span> " +
            "<span class=\"hours\">00</span><span class='hours_txt'>"+settings.CountText.hours+"</span> " +
            "<span class=\"minutes\">00</span><span class='minutes_txt'>"+settings.CountText.minutes+"</span> " +
            "<span class=\"seconds\">00</span><span class='seconds_txt'>"+settings.CountText.seconds+"</span> ");
        var currentDate = function() {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            var new_date = new Date(utc + (3600000 * settings.offset));
            return new_date;
        };
        function countdown() {
            var target_date = new Date(settings.date),
                current_date = currentDate();
            var difference = target_date - current_date;
            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);
            days = (String(days).length >= 2) ? days: '0' + days;
            hours = (String(hours).length >= 2) ? hours: '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes: '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds: '0' + seconds;
            var ref_days = (days === 1) ? 'day': 'days',
                ref_hours = (hours === 1) ? 'hour': 'hours',
                ref_minutes = (minutes === 1) ? 'minute': 'minutes',
                ref_seconds = (seconds === 1) ? 'second': 'seconds';
            if (days != "00") {
                container.find('.days').text(days);
                container.find('.days').removeClass("dis_none_im");
                container.find('.days_txt').removeClass("dis_none_im");
            } else {
                container.find('.days').addClass("dis_none_im");
                container.find('.days_txt').addClass("dis_none_im");
            }
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);
        }
        var interval = setInterval(countdown, 1000);
    };
} (jQuery));

/*-----------------------------------------------AKjs_DropUpDown (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_DropUpDown = function(setting) {
        var option = $.extend({
                curDisplay: "",
                active_toggle: "",
                up_ico: "",
                down_ico: "",
                callback:function(){}
            },
            setting);
        function DropDown(el) {
            this.DropUpDown = el;
            this.initEvents();
        }
        DropDown.prototype = {
            initEvents: function() {
                var obj = this;
                var drop = obj.DropUpDown.children("dl").children("dd:last-child");
                if (option.curDisplay) {
                    var ele_display = obj.DropUpDown.eq(option.curDisplay-1);
                    ele_display.addClass("ak-is_active");
                    ele_display.children("dl").addClass(option.active_toggle);
                    ele_display.children("dl").find("dd").last().children("i").removeClass(option.down_ico).addClass(option.up_ico);
                }
                drop.each(function () {
                    var alldrop = $(this).parent("dl").parent("li");
                    var alldropsub = alldrop.children("dl").next();
                    if (alldrop.hasClass("ak-is_active")) {
                        alldropsub.show();
                    } else {
                        alldropsub.hide();
                    }
                    alldropsub.find("li").addClass("ml_3");
                    alldrop.children("dl").find("dd").last().unbind("click");
                    alldrop.children("dl").find("dd").last().click(function () {
                        alldrop.toggleClass("ak-is_active");
                        if (alldrop.children("dl").next().length > 0) {
                            alldrop.children("dl").toggleClass(option.active_toggle);
                        }
                        alldrop.children("dl").find("dd").last().children("i").toggleClass(option.up_ico + " " + option.down_ico);
                        if (alldrop.hasClass("ak-is_active")) {
                            alldropsub.slideDown(300);
                            option.callback(alldropsub);
                        } else {
                            alldropsub.slideUp(300);
                        }
                    });
                });
            }
        };
        var drop = new DropDown($(this).children("li"));
    };
} (jQuery));

/*-----------------------------------------------AKjs_EchartsRun (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_EchartsRun = function(setting) {
        var opt = $.extend({
                width: 0,
                height: 0,
                option:{},
                callback:function(){}
            },
            setting);
        function Echarts(el) {
            var _this = this;
            _this.elem = el;
            _this.initEvents();
        }
        Echarts.prototype = {
            initEvents: function() {
                var obj = this;
                $(this.elem).css({
                    "width": opt.width,
                    "height": opt.height
                });
                var myChart = echarts.init(obj.elem.get(0));
                var option = opt.option;
                opt.callback(myChart,option);
            }
        };
        new Echarts($(this));
    };
} (jQuery));

/*-----------------------------------------------AKjs_ElementControl (2018-12-13)--------------------------------------------*/
(function($) {
    var Plugin = function(_this, setting) {
        this.$_this = _this;
        this.defaults = {
            ControlType: 'click',
            ControlDom:"",
            scrollTop: 0,
            callback:function(){
            },
            clickback: function() {
            },
            hoverback: function() {
            },
            scrollback:function(){
            }
        };
        this.option = $.extend({},
            this.defaults, setting);
    };
    Plugin.prototype = {
        inital: function() {
            var self = this;
            if (self.option.ControlType === 'click') {
                $(function() {
                    click_fun();
                });
                $(window).resize(function () {
                    click_fun();
                });
                function click_fun() {
                    self.option.callback($(self.option.ControlDom),self.$_this);
                    self.$_this.click(function() {
                        self.option.clickback($(self.option.ControlDom),self.$_this);
                    });
                }
            } else if (self.option.ControlType === 'hover') {
                $(function() {
                    hover_fun();
                });
                $(window).resize(function () {
                    hover_fun();
                });
                function hover_fun() {
                    self.option.callback($(self.option.ControlDom),self.$_this);
                    self.$_this.mouseover(function(){
                        flag = true;
                        self.option.hoverback($(self.option.ControlDom),self.$_this,flag);
                    });
                    self.$_this.mouseout(function(){
                        flag = false;
                        self.option.hoverback($(self.option.ControlDom),self.$_this,flag);
                    });
                }
            } else if (self.option.ControlType === 'scroll') {
                $(function() {
                    scroll_fun();
                });
                $(window).resize(function () {
                    scroll_fun();
                });
                function scroll_fun() {
                    self.option.callback($(self.option.ControlDom),self.$_this);
                    self.$_this.scroll(function(){
                        self.option.scrollback($(self.option.ControlDom), self.$_this, $(this).scrollTop(), self.option.scrollTop);
                    });
                }
            }
        },
        constructor: Plugin
    };
    $.fn.AKjs_ElementControl = function(setting) {
        var ak_ElemControl = new Plugin(this, setting);
        return ak_ElemControl.inital();
    };
} (jQuery));

/*-----------------------------------------------AKjs_Favorite (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Favorite = function(setting) {
        var options = $.extend({
                likeMode: true,
                str: "+1",
                icon_defaultClass: "",
                icon_changeClass: "",
                textClass: "c_white text_12em ml_02em mr_02em",
                text_default: "Favorite",
                text_change: "Cancel",
                startSize: "12px",
                endSize: "30px",
                interval: 600,
                color: "red",
                callback: function() {}
            },
            setting);
        var that = $(this);
        that.each(function() {
            $(this).children("i").css({
                "*display": "inline",
                "*zoom": "1"
            });
            if (options.likeMode == true) {
                $(this).append("<i></i><span></span>(<em></em>)");
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                $(this).children("em").text($(this).attr("data-value"));
                if (typeof($(this).attr("favorite")) != "undefined") {
                    if ($(this).attr("favorite") == 1) {
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            } else {
                $(this).append("<i></i><span></span>");
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                if (typeof($(this).attr("favorite")) != "undefined") {
                    if ($(this).attr("favorite") == 1) {
                        $(this).children("span").text(options.text_change);
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            }
        });
        that.unbind("click");
        that.on("click",
            function(e) {
                e.preventDefault();
                var ele = $(this);
                if (options.likeMode == true) {
                    if (typeof($(this).attr("favorite")) != "undefined") {
                        if ($(this).attr("favorite") == 1) {
                            return false;
                        }
                        $(this).attr("favorite", 1);
                    }
                    var count = parseInt($(this).attr("data-value")) + 1;
                    $(this).attr("data-value", count);
                    $(this).find("em").text(count);
                    $(this).children("i").removeClass(options.icon_defaultClass);
                    $(this).children("i").addClass(options.icon_changeClass);
                    $("body").append("<span class='ak-NumLength press'>" + options.str + "</span>");
                    var box = $(".ak-NumLength");
                    $(window).resize(function() {
                        left = ele.offset().left + ele.width() / 2;
                        top = ele.offset().top - 10
                    });
                    var left = ele.offset().left + ele.width() / 2;
                    var top = ele.offset().top - 10;
                    box.css({
                        "position": "absolute",
                        "left": left,
                        "top": top,
                        "z-index": 9999,
                        "font-size": options.startSize,
                        "line-height": options.endSize,
                        "color": options.color
                    });
                    box.animate({
                            "font-size": options.endSize,
                            "opacity": "0",
                            "top": top - parseInt(options.endSize)
                        },
                        options.interval,
                        function() {
                            box.remove();
                            options.callback(count, ele);
                        })
                } else {
                    if ($(this).children("i").hasClass(options.icon_changeClass)) {
                        var count = parseInt($(this).attr("data-value")) - 1;
                    } else {
                        var count = parseInt($(this).attr("data-value")) + 1;
                    }
                    if ($(this).children("span").text() == options.text_default) {
                        $(this).children("span").text(options.text_change);
                        options.callback(true, ele);
                    } else {
                        $(this).children("span").text(options.text_default);
                        options.callback(false, ele);
                    }
                    $(this).attr("data-value", count);
                    $(this).children("i").toggleClass(options.icon_defaultClass + " " + options.icon_changeClass);
                }
            })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Filterizr (2018-12-13)--------------------------------------------*/
(function($) {
    var ak_Filter = function(w) {
        this.init(w);
    };
    ak_Filter.prototype = {
        init: function(w) {
            this.root = {
                x: 0,
                y: 0,
                w: w
            };
        },
        fit: function(blocks) {
            var n, node, block, len = blocks.length;
            var h = len > 0 ? blocks[0].h: 0;
            this.root.h = h;
            for (n = 0; n < len; n++) {
                block = blocks[n];
                if ((node = this.findNode(this.root, block.w, block.h))) block.fit = this.splitNode(node, block.w, block.h);
                else block.fit = this.growDown(block.w, block.h);
            }
        },
        findNode: function(root, w, h) {
            if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            else if ((w <= root.w) && (h <= root.h)) return root;
            else return null;
        },
        splitNode: function(node, w, h) {
            node.used = true;
            node.down = {
                x: node.x,
                y: node.y + h,
                w: node.w,
                h: node.h - h
            };
            node.right = {
                x: node.x + w,
                y: node.y,
                w: node.w - w,
                h: h
            };
            return node;
        },
        growDown: function(w, h) {
            var node;
            this.root = {
                used: true,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + h,
                down: {
                    x: 0,
                    y: this.root.h,
                    w: this.root.w,
                    h: h
                },
                right: this.root
            };
            if ((node = this.findNode(this.root, w, h))) return this.splitNode(node, w, h);
            else return null;
        }
    };
    $.fn.AKjs_Filterizr = function() {
        var self = this,
            args = arguments;
        if (!self._fltr) {
            self._fltr = $.fn.AKjs_Filterizr.prototype.init(self.selector, (typeof args[0] === 'object' ? args[0] : undefined));
        }
        if (typeof args[0] === 'string') {
            if (args[0].lastIndexOf('_') > -1) throw new Error('AKjs_Filterizr error: You cannot call private methods');
            if (typeof self._fltr[args[0]] === 'function') {
                self._fltr[args[0]](args[1], args[2]);
            } else throw new Error('AKjs_Filterizr error: There is no such function');
        }
        return self;
    };
    $.fn.AKjs_Filterizr.prototype = {
        init: function(selector, options) {
            var self = $(selector).extend($.fn.AKjs_Filterizr.prototype);
            self.options = {
                animationDuration: 0.5,
                onFiltering: {
                    onFilteringStart: function() {},
                    onFilteringEnd: function() {}
                },
                delay: 0,
                delayMode: 'progressive',
                easing: 'ease-out',
                filter: 'all',
                filterOutCss: {
                    'opacity': 0,
                    'z-index': -1,
                    'transform': 'scale(0.5)'
                },
                filterInCss: {
                    'opacity': 1,
                    'z-index': 1,
                    'transform': 'scale(1)'
                },
                layout: 'sameSize',
                selector: (typeof selector === 'string') ? selector: '.filtr-container',
                setupControls: true,
                callback:function(){}
            };
            if (arguments.length === 0) {
                selector = self.options.selector;
                options = self.options;
            }
            if (arguments.length === 1 && typeof arguments[0] === 'object') options = arguments[0];
            if (options) {
                self.setOptions(options);
            }
            self.css({
                'padding': 0,
                'position': 'relative'
            });
            self._lastCategory = 0;
            self._isAnimating = false;
            self._mainArray = self._getFiltrItems();
            self._subArrays = self._makeSubarrays();
            self._activeArray = self._getCollectionByFilter(self.options.filter);
            self._toggledCategories = {};
            self._typedText = $('input[data-search]').val() || '';
            self._uID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r: (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            self._setupEvents();
            self.options.callback($(self.options.selector), self.options.filter);
            if (self.options.setupControls) self._setupControls();
            self.filter(self.options.filter);
            return self;
        },
        filter: function(targetFilter) {
            var self = this,
                target = self._getCollectionByFilter(targetFilter);
            self.options.filter = targetFilter;
            self.trigger('filteringStart');
            self._handleFiltering(target);
            if (self._isSearchActivated()) self.search(self._typedText);
        },
        toggleFilter: function(toggledFilter) {
            var self = this,
                target = [],
                i = 0;
            self.trigger('filteringStart');
            if (!self._toggledCategories[toggledFilter]) self._toggledCategories[toggledFilter] = true;
            else delete self._toggledCategories[toggledFilter];
            if (self._multifilterModeOn()) {
                target = self._makeMultifilterArray();
                self._handleFiltering(target);
                if (self._isSearchActivated()) self.search(self._typedText);
            } else {
                self.filter('all');
                if (self._isSearchActivated()) self.search(self._typedText);
            }
        },
        search: function(text) {
            var self = this,
                array = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter),
                target = [],
                i = 0;
            if (self._isSearchActivated()) {
                for (i = 0; i < array.length; i++) {
                    var containsText = array[i].text().toLowerCase().indexOf(text.toLowerCase()) > -1;
                    if (containsText) {
                        target.push(array[i]);
                    }
                }
            }
            if (target.length > 0) {
                self._handleFiltering(target);
            } else {
                if (self._isSearchActivated()) {
                    for (i = 0; i < self._activeArray.length; i++) {
                        self._activeArray[i]._filterOut();
                    }
                } else {
                    self._handleFiltering(array);
                }
            }
        },
        shuffle: function() {
            var self = this;
            self._mainArray = self._fisherYatesShuffle(self._mainArray);
            self._subArrays = self._makeSubarrays();
            var target = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter);
            if (self._isSearchActivated()) self.search(self._typedText);
            else self._placeItems(target);
        },
        sort: function(attr, sortOrder) {
            var self = this;
            attr = attr || 'domIndex';
            sortOrder = sortOrder || 'asc';
            var isUserAttr = attr !== 'domIndex' && attr !== 'sortData' && attr !== 'w' && attr !== 'h';
            if (isUserAttr) {
                for (var i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i][attr] = self._mainArray[i].data(attr);
                }
            }
            self._mainArray.sort(self._comparator(attr, sortOrder));
            self._subArrays = self._makeSubarrays();
            var target = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter);
            if (self._isSearchActivated()) self.search(self._typedText);
            else self._placeItems(target);
        },
        setOptions: function(options) {
            var self = this,
                i = 0;
            for (var prop in options) {
                self.options[prop] = options[prop];
            }
            if (self._mainArray && (options.animationDuration || options.delay || options.easing || options.delayMode)) {
                for (i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i].css('transition', 'all ' + self.options.animationDuration + 's ' + self.options.easing + ' ' + self._mainArray[i]._calcDelay() + 'ms');
                }
            }
            if (!self.options.filterInCss.transform) self.options.filterInCss.transform = 'translate3d(0,0,0)';
            if (!self.options.filterOutCss.transform) self.options.filterOutCss.transform = 'translate3d(0,0,0)';
        },
        _getFiltrItems: function() {
            var self = this,
                filtrItems = $(self.find('*[data-category]')),
                itemsArray = [];
            $.each(filtrItems,
                function(i, e) {
                    var item = $(e).extend(FiltrItemProto)._init(i, self);
                    itemsArray.push(item);
                });
            return itemsArray;
        },
        _makeSubarrays: function() {
            var self = this,
                subArrays = [];
            for (var i = 0; i < self._lastCategory; i++) subArrays.push([]);
            for (i = 0; i < self._mainArray.length; i++) {
                if (typeof self._mainArray[i]._category === 'object') {
                    for (var p in self._mainArray[i]._category) subArrays[self._mainArray[i]._category[p] - 1].push(self._mainArray[i]);
                } else subArrays[self._mainArray[i]._category - 1].push(self._mainArray[i]);
            }
            return subArrays;
        },
        _makeMultifilterArray: function() {
            var self = this,
                target = [],
                addedMap = {};
            for (var i = 0; i < self._mainArray.length; i++) {
                var item = self._mainArray[i],
                    belongsToCategory = false,
                    isUnique = item.domIndex in addedMap === false;
                if (Array.isArray(item._category)) {
                    for (var x = 0; x < item._category.length; x++) {
                        if (item._category[x] in self._toggledCategories) {
                            belongsToCategory = true;
                            break;
                        }
                    }
                } else {
                    if (item._category in self._toggledCategories) belongsToCategory = true;
                }
                if (isUnique && belongsToCategory) {
                    addedMap[item.domIndex] = true;
                    target.push(item);
                }
            }
            return target;
        },
        _setupControls: function() {
            var self = this;
            $('*[data-filter]').click(function() {
                var targetFilter = $(this).data('filter');
                if (self.options.filter === targetFilter) return;
                self.filter(targetFilter);
            });
            $('*[data-multifilter]').click(function() {
                var targetFilter = $(this).data('multifilter');
                if (targetFilter === 'all') {
                    self._toggledCategories = {};
                    self.filter('all');
                } else {
                    self.toggleFilter(targetFilter);
                }
            });
            $('*[data-shuffle]').click(function() {
                self.shuffle();
            });
            $('*[data-sortAsc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'asc');
            });
            $('*[data-sortDesc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'desc');
            });
            $('input[data-search]').keyup(function() {
                self._typedText = $(this).val();
                self._delayEvent(function() {
                        self.search(self._typedText);
                    },
                    250, self._uID);
            });
        },
        _setupEvents: function() {
            var self = this;
            $(setTimeout(function () {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            }),200);
            $(document).scroll(function () {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            });
            $(window).resize(function() {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            });
            self.on('resizeFiltrContainer',
                function() {
                    if (self._multifilterModeOn()) self.toggleFilter();
                    else self.filter(self.options.filter);
                }).on('filteringStart',
                function() {
                    self.options.onFiltering.onFilteringStart();
                }).on('filteringEnd',
                function() {
                    self.options.onFiltering.onFilteringEnd();
                });
        },
        _calcItemPositions: function() {
            var self = this,
                array = self._activeArray,
                containerHeight = 0,
                cols = Math.round(self.width() / self.find('*[data-category]').outerWidth()),
                rows = 0,
                itemWidth = array[0].outerWidth(),
                itemHeight = 0,
                left = 0,
                top = 0,
                i = 0,
                x = 0,
                posArray = [];
            if (self.options.layout === 'packed') {
                $.each(self._activeArray,
                    function(i, e) {
                        e._updateDimensions();
                    });
                var packer = new ak_Filter(self.outerWidth());
                packer.fit(self._activeArray);
                for (i = 0; i < array.length; i++) {
                    posArray.push({
                        left: array[i].fit.x,
                        top: array[i].fit.y
                    });
                }
                containerHeight = packer.root.h;
            }
            if (self.options.layout === 'horizontal') {
                rows = 1;
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].outerWidth();
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    left += itemWidth;
                    if (containerHeight < itemHeight) containerHeight = itemHeight;
                }
            } else if (self.options.layout === 'vertical') {
                for (i = 1; i <= array.length; i++) {
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    top += itemHeight;
                }
                containerHeight = top;
            } else if (self.options.layout === 'sameHeight') {
                rows = 1;
                var rowWidth = self.outerWidth();
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].width();
                    var itemOuterWidth = array[i - 1].outerWidth(),
                        nextItemWidth = 0;
                    if (array[i]) nextItemWidth = array[i].width();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    x = left + itemWidth + nextItemWidth;
                    if (x > rowWidth) {
                        x = 0;
                        left = 0;
                        top += array[0].outerHeight();
                        rows++;
                    } else left += itemOuterWidth;
                }
                containerHeight = rows * array[0].outerHeight();
            } else if (self.options.layout === 'sameWidth') {
                for (i = 1; i <= array.length; i++) {
                    posArray.push({
                        left: left,
                        top: top
                    });
                    if (i % cols === 0) rows++;
                    left += itemWidth;
                    top = 0;
                    if (rows > 0) {
                        x = rows;
                        while (x > 0) {
                            top += array[i - (cols * x)].outerHeight();
                            x--;
                        }
                    }
                    if (i % cols === 0) left = 0;
                }
                for (i = 0; i < cols; i++) {
                    var columnHeight = 0,
                        index = i;
                    while (array[index]) {
                        columnHeight += array[index].outerHeight();
                        index += cols;
                    }
                    if (columnHeight > containerHeight) {
                        containerHeight = columnHeight;
                        columnHeight = 0;
                    } else columnHeight = 0;
                }
            } else if (self.options.layout === 'sameSize') {
                for (i = 1; i <= array.length; i++) {
                    posArray.push({
                        left: left,
                        top: top
                    });
                    left += itemWidth;
                    if (i % cols === 0) {
                        top += array[0].outerHeight();
                        left = 0;
                    }
                }
                rows = Math.ceil(array.length / cols);
                containerHeight = rows * array[0].outerHeight();
            }
            self.css('height', containerHeight);
            return posArray;
        },
        _handleFiltering: function(target) {
            var self = this,
                toFilterOut = self._getArrayOfUniqueItems(self._activeArray, target);
            for (var i = 0; i < toFilterOut.length; i++) {
                toFilterOut[i]._filterOut();
            }
            self._activeArray = target;
            self._placeItems(target);
        },
        _multifilterModeOn: function() {
            var self = this;
            return Object.keys(self._toggledCategories).length > 0;
        },
        _isSearchActivated: function() {
            var self = this;
            return self._typedText.length > 0;
        },
        _placeItems: function(arr) {
            var self = this;
            self._isAnimating = true;
            self._itemPositions = self._calcItemPositions();
            for (var i = 0; i < arr.length; i++) {
                arr[i]._filterIn(self._itemPositions[i]);
            }
        },
        _getCollectionByFilter: function(filter) {
            var self = this;
            return filter === 'all' ? self._mainArray: self._subArrays[filter - 1];
        },
        _makeDeepCopy: function(obj) {
            var r = {};
            for (var p in obj) r[p] = obj[p];
            return r;
        },
        _comparator: function(prop, sortOrder) {
            return function(a, b) {
                if (sortOrder === 'asc') {
                    if (a[prop] < b[prop]) return - 1;
                    else if (a[prop] > b[prop]) return 1;
                    else return 0;
                } else if (sortOrder === 'desc') {
                    if (b[prop] < a[prop]) return - 1;
                    else if (b[prop] > a[prop]) return 1;
                    else return 0;
                }
            };
        },
        _getArrayOfUniqueItems: function(arr1, arr2) {
            var r = [],
                o = {},
                l = arr2.length,
                i,
                v;
            for (i = 0; i < l; i++) {
                o[arr2[i].domIndex] = true;
            }
            l = arr1.length;
            for (i = 0; i < l; i++) {
                v = arr1[i];
                if (! (v.domIndex in o)) {
                    r.push(v);
                }
            }
            return r;
        },
        _delayEvent: (function() {
            var self = this,
                timers = {};
            return function(callback, ms, uniqueId) {
                if (uniqueId === null) {
                    throw Error("UniqueID needed");
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })(),
        _fisherYatesShuffle: function shuffle(array) {
            var m = array.length,
                t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    };
    var FiltrItemProto = {
        _init: function(index, parent) {
            var self = this,
                delay = 0;
            self._parent = parent;
            self._category = self._getCategory();
            self._lastPos = {};
            self.domIndex = index;
            self.sortData = self.data('sort');
            self.w = 0;
            self.h = 0;
            self._isFilteredOut = true;
            self._filteringOut = false;
            self._filteringIn = false;
            self.css(parent.options.filterOutCss).css({
                '-webkit-backface-visibility': 'hidden',
                'perspective': '1000px',
                '-webkit-perspective': '1000px',
                '-webkit-transform-style': 'preserve-3d',
                'position': 'absolute',
                'transition': 'all ' + parent.options.animationDuration + 's ' + parent.options.easing + ' ' + self._calcDelay() + 'ms'
            });
            self.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                function() {
                    self._onTransitionEnd();
                });
            return self;
        },
        _updateDimensions: function() {
            var self = this;
            self.w = self.outerWidth();
            self.h = self.outerHeight();
        },
        _calcDelay: function() {
            var self = this,
                r = 0;
            if (self._parent.options.delayMode === 'progressive') r = self._parent.options.delay * self.domIndex;
            else if (self.domIndex % 2 === 0) r = self._parent.options.delay;
            return r;
        },
        _getCategory: function() {
            var self = this,
                ret = self.data('category');
            if (typeof ret === 'string') {
                ret = ret.split(', ');
                for (var n in ret) {
                    if (isNaN(parseInt(ret[n]))) {
                        throw new Error('AKjs_Filterizr: the value of data-category must be a number, starting from value 1 and increasing.');
                    }
                    if (ret[n] > self._parent._lastCategory) {
                        self._parent._lastCategory = ret[n];
                    }
                }
            } else {
                if (ret > self._parent._lastCategory) self._parent._lastCategory = ret;
            }
            return ret;
        },
        _onTransitionEnd: function() {
            var self = this;
            if (self._filteringOut) {
                $(self).addClass('filteredOut');
                self._isFilteredOut = true;
                self._filteringOut = false;
            } else if (self._filteringIn) {
                self._isFilteredOut = false;
                self._filteringIn = false;
            }
            if (self._parent._isAnimating) {
                self._parent.trigger('filteringEnd');
                self._parent._isAnimating = false;
            }
        },
        _filterOut: function() {
            var self = this,
                filterOutCss = self._parent._makeDeepCopy(self._parent.options.filterOutCss);
            filterOutCss.transform += ' translate3d(' + self._lastPos.left + 'px,' + self._lastPos.top + 'px, 0)';
            self.css(filterOutCss);
            self._filteringOut = true;
        },
        _filterIn: function(targetPos) {
            var self = this,
                filterInCss = self._parent._makeDeepCopy(self._parent.options.filterInCss);
            $(self).removeClass('filteredOut');
            self._filteringIn = true;
            self._lastPos = targetPos;
            filterInCss.transform += ' translate3d(' + targetPos.left + 'px,' + targetPos.top + 'px, 0)';
            self.css(filterInCss);
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_Flying (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Flying = function (element, options) {
        var defaults = {
            autoPlay: true,
            vertex_Rtop: 20,
            speed: 1.2,
            start: {},
            end: {},
            onEnd: $.noop
        };
        var self = this,
            $element = $(element);
        self.init = function (options) {
            this.setOptions(options);
            !!this.settings.autoPlay && this.play();
        };
        self.setOptions = function (options) {
            this.settings = $.extend(true, {}, defaults, options);
            var settings = this.settings,
                start = settings.start,
                end = settings.end;
            $element.css({marginTop: '0px', marginLeft: '0px', position: 'fixed'}).appendTo('body');
            if (end.width != null && end.height != null) {
                $.extend(true, start, {
                    width: $element.width(),
                    height: $element.height()
                });
            }
            var vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
            if (vertex_top < settings.vertex_Rtop) {
                vertex_top = Math.min(settings.vertex_Rtop, Math.min(start.top, end.top));
            }
            var distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2)),
                steps = Math.ceil(Math.min(Math.max(Math.log(distance) / 0.05 - 75, 30), 100) / settings.speed),
                ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top)),
                vertex_left = (ratio * start.left - end.left) / (ratio - 1),
                curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);
            $.extend(true, settings, {
                count: -1,
                steps: steps,
                vertex_left: vertex_left,
                vertex_top: vertex_top,
                curvature: curvature
            });
        };
        self.play = function () {
            this.move();
        };
        self.move = function () {
            var settings = this.settings,
                start = settings.start,
                count = settings.count,
                steps = settings.steps,
                end = settings.end;
            var left = start.left + (end.left - start.left) * count / steps,
                top = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_top;
            if (end.width != null && end.height != null) {
                var i = steps / 2,
                    width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2),
                    height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
                $element.css({width: width + "px", height: height + "px", "font-size": Math.min(width, height) + "px"});
            }
            $element.css({
                left: left + "px",
                top: top + "px"
            });
            settings.count++;
            var time = window.requestAnimationFrame($.proxy(this.move, this));
            if (count == steps) {
                window.cancelAnimationFrame(time);
                settings.onEnd.apply(this);
            }
        };
        self.destroy = function(){
            $element.remove();
        };
        self.init(options);
    };
    $.fn.AKjs_Flying = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('flying')) {
                $(this).data('flying', new $.AKjs_Flying(this, options));
            }
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_Form (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Form = function(setting) {
        var option = $.extend({
                btn_delete: "",
                btn_delete_ico: "",
                btn_password: "",
                btn_password_ico_hide: "",
                btn_password_ico_show: "",
                placeholder: true,
                keyboard: true,
                PassCheck: "",
                validate: true,
                valCallback: function() {},
                passCallback: function() {},
                butCallback: function() {}
            },
            setting);
        var mbf = $(this);
        if (option.validate == true) {
            mbf.find(":submit").addClass("disabled").attr("disabled", "disabled")
        }
        var password = mbf.find(option.PassCheck);
        mbf.find(":submit").addClass("mb_5");
        mbf.find(":submit").unbind("click");
        mbf.find(":submit").click(function() {
            if (option.PassCheck) {
                if (password.length > 1) {
                    if (password[0].value != password[1].value) {
                        if (mbf.find(option.PassCheck).length > 0) {
                            option.passCallback();
                            return false;
                        }
                    }
                }
            }
            option.butCallback(mbf, false);
            document.activeElement.blur();
            return false
        });
        mbf.keyup(function(event) {
            event.preventDefault();
            if (option.validate == true) {
                var inputs = $(this).find("input[required]");
                var submits = $(this).find(":submit");
                if (mbf.find("textarea[required]").length > 0) {
                    var textareaVal = (mbf.find("textarea[required]").val().replace(/<(.+?)>/gi, "&lt;$1&gt;")).replace(/\n/gi, "|");
                    var strLen = textareaVal.split("|").join("").length;
                } else {
                    var strLen = 2;
                }
                var arr = [];
                for (var i = 0; i < inputs.length; i++) {
                    var tmpFlag = inputs[i].value == "" ? false: true;
                    arr.push(tmpFlag);
                }
                var flag = false;
                if (arr.length == 1) {
                    flag = arr[0];
                } else {
                    if (arr.length > 1) {
                        flag = arr[0];
                        for (var i = 1; i < arr.length; i++) {
                            flag = flag && arr[i];
                        }
                    } else {
                        flag = true;
                    }
                }
                if (!mbf.find(":submit").hasClass("disabled") || strLen > 0) {
                    if (!flag) {
                        submits.addClass("disabled");
                        submits.attr("disabled", "disabled");
                        option.valCallback(flag);
                    } else {
                        submits.removeClass("disabled");
                        submits.removeAttr("disabled");
                        option.valCallback(flag);
                    }
                }
            }
            var keycode = event.which;
            if (keycode == 13) {
                option.butCallback(mbf, true);
            }
        });
        var btn_password = mbf.find(option.btn_password);
        btn_password.each(function() {
            var pass_btn = $(this);
            pass_btn.parent().append('<button type="button" class="press top_0 right_0 abs text_al_r text_18em c_gray_ccc"></button>');
            pass_btn.parent().children("button").addClass(option.btn_password_ico_hide);
            pass_btn.parent().children("button").css({
                "height": pass_btn.outerHeight(),
                "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
            });
            $(window).resize(function() {
                pass_btn.parent().children("button").css({
                    "height": pass_btn.outerHeight(),
                    "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
                })
            });
            pass_btn.parent().children("button").unbind("click");
            pass_btn.parent().children("button").click(function() {
                $(this).toggleClass(option.btn_password_ico_hide + " " + option.btn_password_ico_show);
                if ($(this).hasClass(option.btn_password_ico_show)) {
                    $(this).parent().children("input").attr("type", "text");
                } else {
                    $(this).parent().children("input").attr("type", "password");
                }
            })
        });
        var btn_delete = mbf.find(option.btn_delete);
        btn_delete.keyup(function() {
            var del_btn = $(this);
            if ($(this).val() > 0) {
                if ($(this).next("button[type=reset]").length < 1) {
                    $(this).after("<button type=\"reset\" class='press top_0 right_0 abs text_al_r text_18em c_gray_ccc'></button>");
                    $(this).next("button[type=reset]").css({
                        "height": del_btn.outerHeight(),
                        "margin-left": del_btn.width() - del_btn.next("button").width()
                    });
                    $(window).resize(function() {
                        del_btn.next("button[type=reset]").css({
                            "height": del_btn.outerHeight(),
                            "margin-left": del_btn.width() - del_btn.next("button").width()
                        })
                    });
                    $(this).next("button[type=reset]").addClass(option.btn_delete_ico);
                }
                $(this).next("button[type=reset]").unbind("click");
                $(this).next("button[type=reset]").click(function() {
                    if ($(this).prev("input").attr("required")) {
                        flag = false;
                        $(this).prev("input").val("");
                        mbf.find(":submit").addClass("disabled");
                        mbf.find(":submit").attr("disabled", "disabled");
                        option.valCallback(flag);
                    }
                    $(this).remove();
                })
            } else {
                $(this).next("button[type=reset]").remove();
            }
        });
        if (option.placeholder == true) {
            var placeholder_tmp = "";
            mbf.find("*[placeholder]").focus(function() {
                placeholder_tmp = $(this).attr("placeholder");
                if ($(this)[0].type != "search") {
                    $(this).removeAttr("placeholder");
                }
                $(this).blur(function() {
                    $(this).attr("placeholder", placeholder_tmp);
                })
            });
            $("input[type=button]").each(function() {
                var place = $(this);
                if ($(this).attr("placeholder") && $(this).val() == "") {
                    $(this).parent().append("<label class='top_0  abs c_gray_ccc'></label>");
                    $(this).next("label").html($(this).attr("placeholder"));
                    place.next("label").css({
                        "width": place.outerWidth(),
                        "min-width": "100%",
                        "height": place.outerHeight(),
                        "line-height": place.outerHeight() + "px"
                    });
                    $(window).resize(function() {
                        place.next("label").css({
                            "width": place.outerWidth(),
                            "min-width": "100%",
                            "height": place.outerHeight(),
                            "line-height": place.outerHeight() + "px"
                        })
                    });
                    $(this).next("label").unbind("click");
                    $(this).next("label").click(function() {
                        $(this).prev("input[type=button]").click();
                    })
                }
            })
        }
        if (option.keyboard == true) {
            mbf.find("*[readonly]").focus(function() {
                document.activeElement.blur();
            });
            mbf.find("*[maxlength]").each(function() {
                $(this).attr("oninput", "if(value.length>" + $(this).attr("maxlength") + ")value=value.slice(0," + $(this).attr("maxlength") + ")");
                $(this).on("input", function() {
                    var maxlength = $(this).val();
                    if (maxlength.length == $(this).attr("maxlength")) {
                        document.activeElement.blur();
                    }
                })
            })
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_FullPage (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_FullPage = function (options) {
        return this.each(function () {
            var _this = $(this),
                instance = _this.data('fullpage');
            if (!instance) {
                instance = new AKjs_FullPage(_this, options);
                _this.data('fullpage', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        });
    };
    $.fn.AKjs_FullPage.defaults = {
        selectors: {
            page: '',
            active: ''
        },
        index: 0,
        easing: 'ease',
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: 'vertical',
        callback: function() {}
    };
    var _prefix = (function (temp) {
        var aPrefix = ['webkit', 'moz', 'o', 'ms'],
            props = '';
        for (var i = 0, len = aPrefix.length; i < len; i ++) {
            props = aPrefix[i] + 'Transition';
            if (temp.style[props] !== undefined) {
                return '-' + aPrefix[i].toLowerCase() + '-';
            }
            return false;
        }
    })(document.createElement('section'));
    var AKjs_FullPage = (function () {
        function AKjs_FullPage(element, options) {
            this.settings = $.extend(true, $.fn.AKjs_FullPage.defaults, options);
            this.element = element;
            this.init();
        }
        AKjs_FullPage.prototype = {
            init: function () {
                var _this = this;
                this.selectors = this.settings.selectors;
                this.section = this.element.find("section");
                this.element.addClass("ak-fullpage");
                this.section.wrapAll("<div />");
                this.SectionWrap = this.element.children("div");
                this.direction = this.settings.direction === 'vertical' ? true : false;
                this.pagesCount = this.pagesCount();
                this.index = (this.settings.index >=0 && this.settings.index < this.pagesCount) ? this.settings.index : 0;
                this.canScroll = true;
                if (this.settings.index > 0) {
                    $(function () {
                        _this.index = _this.settings.index;
                        _scrollPage(_this);
                    });
                }
                if (!this.direction) {
                    _initLayout(_this);
                }
                if (this.settings.pagination) {
                    _initPaging(_this);
                }
                _initEvent(_this);
            },
            pagesCount: function () {
                return this.section.size();
            },
            switchLength: function () {
                return this.duration ? this.element.height() : this.element.width();
            },
            prve: function () {
                var _this = this;
                if (this.index > 0) {
                    this.index --;
                } else if (this.settings.loop) {
                    this.index = this.pagesCount - 1;
                }
                _scrollPage(_this);
            },
            next: function () {
                var _this = this;
                if (this.index < this.pagesCount) {
                    this.index ++;
                } else if (this.settings.loop) {
                    this.index = 0;
                }
                _scrollPage(_this);
            }
        };
        function _initLayout(_this) {
            var width = (_this.pagesCount * 100) + '%',
                cellWidth = (100 / _this.pagesCount).toFixed(2) + '%';
            _this.SectionWrap.width(width);
            _this.section.width(cellWidth).css('float', 'left');
        }
        function _initPaging(_this) {
            var pageHtml = '<ul>';
            _this.activeClass = "ak-is_active";
            for (var i = 0, len = _this.pagesCount; i < len; i ++) {
                pageHtml += '<li></li>';
            }
            pageHtml += '</ul>';
            _this.element.append(pageHtml);
            var pages = _this.element.children("ul");
            _this.pageItem = pages.find('li');
            _this.pageItem.addClass(_this.selectors.page);
            _this.pageItem.eq(_this.index).addClass(_this.activeClass).addClass(_this.selectors.active);
            if (_this.direction) {
                pages.addClass('vertical');
            } else {
                pages.addClass('horizontal');
            }
            if (pages.hasClass("vertical")) {
                pages.css({
                    width: pages.find("li.ak-is_active").outerWidth(),
                    top: ($(window).height() - pages.outerHeight()) /2
                });
            } else if (pages.hasClass("horizontal")) {
                pages.css({
                    left: ($(window).width() - pages.outerWidth()) /2
                });
            }
        }
        function _initEvent(_this) {
            _this.element.children("ul").find("li").on("click", function() {
                _this.index = $(this).index();
                _scrollPage(_this);
            });
            _this.element.on('mousewheel DOMMouseScroll', function (e) {
                if (!_this.canScroll) {
                    return;
                }
                var delta = -e.originalEvent.detail || -e.originalEvent.deltaY || e.originalEvent.wheelDelta;

                if (delta > 0 && (_this.index && !_this.settings.loop || _this.settings.loop)) {
                    _this.prve();
                } else if (delta < 0 && (_this.index < (_this.pagesCount - 1) && !_this.settings.loop || _this.settings.loop)) {
                    _this.next();
                }
            });
            if (_this.settings.keyboard) {
                $(window).on('keydown', function (e) {
                    var keyCode = e.keyCode;
                    if (keyCode === 37 || keyCode === 38) {
                        _this.prve();
                    } else if (keyCode === 39 || keyCode === 40) {
                        _this.next();
                    }
                });
            }
            $(window).resize(function () {
                _this.index = 0;
                _scrollPage(_this);
            });
            _this.SectionWrap.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function () {
                _this.canScroll = true;
            });
            _this.settings.callback(false,_this,_this.settings.index);
        }
        function _scrollPage(_this) {
            var dest = _this.section.eq(_this.index).position();
            if (!dest) {
                return;
            }
            _this.canScroll = false;
            if (_prefix) {
                _this.SectionWrap.css(_prefix + 'transition', 'all ' + _this.settings.duration + 'ms ' + _this.settings.easing);
                var translate = _this.direction ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
                _this.SectionWrap.css(_prefix + 'transform', translate);
            } else {
                var animateCss = _this.direction ? {top: -dest.top} : {left: -dest.left};
                _this.SectionWrap.animate(animateCss, _this.settings.duration, function () {
                    _this.canScroll = true;
                });
            }
            if (_this.settings.pagination) {
                _this.pageItem.eq(_this.index).addClass(_this.activeClass).addClass(_this.selectors.active).siblings('li').removeClass(_this.activeClass).removeClass(_this.selectors.active);
            }
            _this.settings.callback(true,_this,_this.index);
        }
        return AKjs_FullPage
    })();
} (jQuery));

/*-----------------------------------------------AKjs_FullScreen (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_FullScreen = function(setting) {
        var option = $.extend({
                clickCallback: function() {},
                fullCallback: function() {}
            },
            setting);
        var full = $(this);
        full.unbind("click");
        full.click(function(){
            Click_FullScreen();
        });

        function Click_FullScreen() {
            var element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            option.clickCallback(full);
        }
        function Exit_FullScreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        document.addEventListener("keydown", function (evt) {
            if (evt.keyCode == 122) {
                evt.preventDefault();
                Click_FullScreen();
            }
        });

        document.addEventListener("fullscreenchange", function () {
            FullScreen_Setting();
        }, false);

        document.addEventListener("msfullscreenchange", function () {
            FullScreen_Setting();
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            FullScreen_Setting();
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            FullScreen_Setting();
        }, false);

        function FullScreen_Setting() {
            var full_flag = false;
            if (document.fullscreenElement) {
                full_flag = true;
            }
            if (document.msFullscreenElement) {
                full_flag = true;
            }
            if (document.mozFullScreen) {
                full_flag = true;
            }
            if (document.webkitIsFullScreen) {
                full_flag = true;
            }
            option.fullCallback(full_flag,full);
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_GetVerifyCode (2018-12-13)--------------------------------------------*/
(function($) {
    function AKjs_GetVerifyCode() {}
    AKjs_GetVerifyCode.prototype.SecondCountDown = function(options) {
        var countDown = {};
        countDown.options = {
            time: 60,
            progress: function() {},
            started: function() {},
            breaked: function() {},
            end: function() {}
        };
        for (var i in options) {
            countDown.options[i] = options[i];
        }
        countDown.timer = null;
        countDown.time = 0;
        countDown._continueRun = true;
        countDown.start = function() {
            var that = this,
                time = that.options.time || 60,
                count = 0,
                interval = 1000,
                start = new Date().getTime(),
                targetTime = that.options.time * 1000;
            clearTimeout(that.timer);
            if (that.options.started && (({}).toString.call(that.options.started) == "[object Function]")) {
                that.options.started(time);
            }
            this._continueRun = true;
            that.timer = setTimeout(function() {
                    if (that._continueRun) {
                        var wucha = 0,
                            nextRunTime = interval,
                            currentFn = arguments.callee;
                        count++;
                        wucha = new Date().getTime() - (start + count * interval);
                        wucha = (wucha <= 0) ? 0 : wucha;
                        nextRunTime = interval - wucha;
                        nextRunTime = (nextRunTime <= 0) ? 0 : nextRunTime;
                        time--;
                        if (that.options.progress && (({}).toString.call(that.options.progress) == "[object Function]")) {
                            that.options.progress(time);
                        }
                        that.time = time;
                        that.timer = setTimeout(currentFn, nextRunTime);
                        if ((targetTime -= interval) <= 0) {
                            clearTimeout(that.timer);
                            if (that.options.end && (({}).toString.call(that.options.end) == "[object Function]")) {
                                that.options.end(time);
                            }
                            that.time = time;
                            return
                        }
                    } else {
                        clearTimeout(that.timer);
                    }
                },
                interval)
        };
        countDown.abort = function() {
            this._continueRun = false;
            clearTimeout(this.timer);
            this.time--;
            if (this.options.breaked && (({}).toString.call(this.options.breaked) == "[object Function]")) {
                this.options.breaked(this.time);
            }
        };
        return countDown
    };
    AKjs_GetVerifyCode.prototype.verify = function(eles, options) {
        eles = $(eles);
        if (eles.length > 0) {
            var self = this,
                timedown = {},
                verifyObj = {},
                _options = {
                    time: 60,
                    event: "click",
                    phone: "",
                    ableClass: "c_title",
                    unableClass: "c_gray_999",
                    condition: function() {},
                    progress: function() {},
                    timeUp: function() {},
                    abort: function() {},
                    eventFn: function() {}
                };
            $.extend(_options, options);
            eles.on(_options.event,
                function() {
                    if (this.unabled) {
                        return
                    }
                    var canRun = true,
                        phone = _options.phone;
                    if ($.isFunction(_options.condition)) {
                        canRun = _options.condition.call(this, phone);
                    } else {
                        canRun = _options.condition(phone);
                    }
                    if (!canRun) {
                        return
                    }
                    var that = this,
                        $this = $(that);
                    timedown = self.SecondCountDown({
                        time: _options.time,
                        progress: function(time) {
                            _options.progress.call(that, time, phone);
                        },
                        end: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.timeUp.call(that, time, phone);
                        },
                        breaked: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.abort.call(that, time, phone);
                        }
                    });
                    timedown.start();
                    this.timedown = timedown;
                    that.unabled = true;
                    $this.removeClass(_options.ableClass);
                    $this.addClass(_options.unableClass);
                    _options.eventFn.call(this, phone);
                })
        }
    };
    window.AKjs_GetVerifyCode = new AKjs_GetVerifyCode()
} (jQuery));

/*-----------------------------------------------AKjs_GoTop (2018-12-13)--------------------------------------------*/
function AKjs_GoTop (setting) {
    option = $.extend({
        dom: $(window),
        hide: false,
        url: "",
        icon: "",
        state: "bottom",
        height: "40px",
        width: "auto",
        time: 500,
        scrollTop: 400,
        aimation: "show",
        hidetime: 2000,
        toTop :function () {},
        toShow :function () {},
        toHide :function () {},
        toClick :function () {}
    },setting);
    var sate,
        timer=null;
    AKjs_UserAgent();
    $(function() {
        if(option.state=='center'){
            sate='top:50%';
        }
        else if(option.state=='bottom'){
            sate= 'bottom:10%';
        }
        if(!option.icon || option.url) {
            var dom = '<div class="ak-GoTopBox" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2em;z-index:999;' + sate + '">' +
                '<img src=' + option.url + ' style="width:100%" />' +
                '</div>';
        } else {
            var dom = '<div class="ak-GoTopBox ' + option.icon + '" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2em;z-index:999;' + sate + '">' +
                '</div>';
        }
        $('.ak-GoTopBox').remove();
        $("body").append(dom);
        var GoTopBox = $('.ak-GoTopBox');
        option.dom.on('scroll',throttle(scroll,50));
        function scroll(){
            if(option.dom.scrollTop()>=option.scrollTop){
                GoTopBox.addClass(option.aimation).fadeIn();
                if(option.hide){
                    clearTimeout(timer);
                    if (!IsMobile) {
                        timer = setTimeout(function () {
                            GoTopBox.fadeOut();
                            option.toHide && option.toHide();
                        }, option.hidetime);
                    }
                }
                option.toShow&&option.toShow();
            }else{
                if(GoTopBox.css('display')=='block'){
                    option.toHide&&option.toHide();
                }
                GoTopBox.hide().removeClass(option.aimation);
            }
            if(option.dom.scrollTop()<=5){
                option.toTop&&option.toTop();
                if(option.state=='center'){
                    GoTopBox.animate({
                        top: "50%",
                        width: option.width
                    });
                }
                else if(option.state=='bottom'){
                    GoTopBox.animate({
                        bottom: "10%",
                        width: option.width
                    });
                }
            }
        }
        GoTopBox.on('click',function(){
            option.dom.animate({
                scrollTop:0
            },option.time,function(){
                option.toTop&&option.toTop();
            });
            if(option.state=='center'){
                GoTopBox.animate({
                    top: "100%",
                    width: 0
                });
            }
            else if(option.state=='bottom'){
                GoTopBox.animate({
                    bottom: "100%",
                    width: 0
                });
            }
            option.toClick&&option.toClick();
        });
        option.dom.on('load',function(){
            if(option.dom.scrollTop()==0){
                return;
            }
            scroll();
        });
        GoTopBox.on('mouseenter',function(){
            clearTimeout(timer);
            GoTopBox.fadeIn();
        });
        GoTopBox.on('mouseleave',function(){
            if (!IsMobile) {
                timer = setTimeout(function () {
                    GoTopBox.fadeOut();
                    option.toHide && option.toHide();
                }, option.hidetime);
            }
        });
        function throttle(fn,time){
            var timer=null;
            return function(){
                var ctx=this,arg=arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(ctx,arg);
                },time);
            }
        }
    });
}

/*-----------------------------------------------AKjs_HotspotMap (2018-12-13)--------------------------------------------*/
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
} (jQuery));

/*-----------------------------------------------AKjs_HoverBorder (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_HoverBorder = function(setting) {
        var option = $.extend({
                start_delay: 300,
                end_delay: 100,
                border: "1px",
                bor_color: ""
            },
            setting);
        var hborder = $(this);
        hborder.hover(function () {
            var obj = $(this);
            $(obj).find('.top_0.left_0').stop(true).animate({
                "height": $(obj).innerHeight()
            },option.start_delay);
            $(obj).find('.bottom_0.left_0').stop(true).delay(option.start_delay).animate({
                "width": $(obj).innerWidth()
            },option.start_delay);
            $(obj).find('.bottom_0.right_0').stop(true).animate({
                "height": $(obj).innerHeight()
            },option.start_delay);
            $(obj).find('.top_0.right_0').stop(true).delay(option.start_delay).animate({
                "width": $(obj).innerWidth()
            },option.start_delay);
        },function () {
            var obj = $(this);
            $(obj).find('.top_0.left_0').stop(true).delay(option.end_delay).animate({
                "height":'0px'
            },option.end_delay);
            $(obj).find('.bottom_0.left_0').stop(true).animate({
                "width":'0px'
            },option.end_delay);
            $(obj).find('.bottom_0.right_0').stop(true).delay(option.end_delay).animate({
                "height":'0px'
            },option.end_delay);
            $(obj).find('.top_0.right_0').stop(true).animate({
                "width":'0px'
            },option.end_delay);
        });
        hborder.each(function(){
            $(this).addClass("rel");
            if ($(this).children("span").length < 4) {
                $(this).append("<span class='abs zindex_4 top_0 left_0'></span>" +
                    "<span class='abs zindex_4 bottom_0 left_0'></span>" +
                    "<span class='abs zindex_4 bottom_0 right_0'></span>" +
                    "<span class='abs zindex_4 top_0 right_0'></span>");
            }
            $(this).find('.top_0.left_0').css({
                "border-left": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.bottom_0.left_0').css({
                "border-top": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.bottom_0.right_0').css({
                "border-right": "solid "+option.border,
                "border-color": option.bor_color,
            });
            $(this).find('.top_0.right_0').css({
                "border-bottom": "solid "+option.border,
                "border-color": option.bor_color,
            });
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_ImgSubject (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ImgSubject = function(setting) {
        var option = $.extend({
                delay: 400,
                img_hover: true,
                img_height: "",
                height: [],
                Hoverback: function() {},
                Visitedback: function() {}
            },
            setting);
        var imgsubject = $(this);
        imgsubject.mouseenter(function(){
            $(this).children().last().stop().animate({
                "height": option.height[1],
                "line-height": option.height[1]
            },option.delay);
            if (option.img_hover) {
                $(this).find("img").stop().animate({
                    width: 1.5 * $(this).find("img").parent("figure").outerWidth(),
                    height: 1.5 * $(this).find("img").parent("figure").outerHeight(),
                    left:("-"+(0.5 * $(this).find("img").parent().width())/2),
                    top:("-"+(0.5 * $(this).find("img").parent().height())/2)
                },option.delay);
                option.Hoverback($(this));
            }
        });
        imgsubject.mouseleave(function(){
            $(this).children().last().stop().animate({
                "height": option.height[0],
                "line-height": option.height[0]
            },option.delay);
            if (option.img_hover) {
                $(this).find("img").stop().animate({
                    width: $(this).find("img").parent("figure").outerWidth(),
                    height: $(this).find("img").parent("figure").outerHeight(),
                    left: 0,
                    top: 0
                }, option.delay);
                option.Visitedback($(this));
            }
        });
        imgSetting();
        $(window).resize(function(){
            imgSetting();
        });
        function imgSetting() {
            imgsubject.each(function(){
                $(this).children().last().css({
                    "height": option.height[0],
                    "line-height": option.height[0]
                });
                $(this).find("img").css({
                    "width": $(this).find("img").parent("figure").outerWidth(),
                    "height": option.img_height,
                    "position": "absolute"
                });
                $(this).find("img").parent("figure").css({
                    "position": "relative",
                    "overflow": "hidden",
                    "height": option.img_height
                });
            });
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_IntlTelInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_IntlTelInput = function(setting) {
        var option = $.extend({
                Title_Text: "",
                Close_btn: "",
                Close_Text: "",
                Close_Icon: "",
                list_Class: "",
                Nav_active: "",
                show_color: "",
                data: [],
                boxsize: ["20em","30em"],
                showBack: function() {},
                clickBack: function() {}
            },
            setting);
        function TelInput(el) {
            this.el = el;
            this.initEvents()
        }
        TelInput.prototype = {
            initEvents: function() {
                var obj = this;
                AKjs_UserAgent();
                $(function() {
                    obj.el.each(function() {
                        $(".ak-IntlTel").remove();
                        $("body").append("<div class='ak-IntlTel'><datalist></datalist></div>");
                        var objsub = $(".ak-IntlTel");
                        var datalist = objsub.children("datalist");
                        datalist.before("<h6></h6>");
                        var str = "<ol>\n";
                        for (var k = 0; k < option.data.length; k++) {
                            str += "<li>" + option.data[k].value + "</li>\n"
                        }
                        str += "</ol>";
                        datalist.before(str);
                        var tmp = "";
                        for (var i = 0; i < option.data.length; i++) {
                            tmp += "<dl>";
                            tmp += '<dt data-id="' + option.data[i].id + '">' + option.data[i].value + "</dt>";
                            for (var j = 0; j < option.data[i].child.length; j++) {
                                tmp += '<dd data-country="' + option.data[i].child[j].country + '" data-number="' + option.data[i].child[j].number + '" data-id="' + option.data[i].child[j].id + '">' + option.data[i].child[j].country + " " + option.data[i].child[j].number + "</dd>"
                            }
                            tmp += "</dl>";
                        }
                        datalist.html(tmp);
                        var objsub_title = objsub.find("h6");
                        var objsub_ol = objsub.find("ol");
                        var objsub_dl = objsub.find("dl");
                        AKjs_UserAgent();
                        objsub.append("<div class='ak-IntlTel_head'>" + "<button type='button' class='" + option.Close_btn + "'><i class='" + option.Close_Icon + "'></i>" + option.Close_Text + "</button>\n" + "<h1>" + option.Title_Text + "</h1>" + "</div>");
                        var IntlTel_head = "bg_gray_f9f bor_bottom bor_gray_ddd";
                        if (IsMobile) {
                            if ($("header").length > 0) {
                                var headStyle = $("header").attr("class");
                                objsub.find(".ak-IntlTel_head").addClass(headStyle);
                            } else {
                                objsub.find(".ak-IntlTel_head").addClass(IntlTel_head);
                            }
                            objsub.find(".ak-IntlTel_head").removeClass("dis_none_im");
                            objsub.addClass("bor_none");
                        } else {
                            objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                        }
                        objsub_title.addClass(option.show_color).css({
                            "height": $(window).height()
                        });
                        datalist.addClass("scrolling_touch press").css({
                            "margin-top": $(".ak-IntlTel_head").outerHeight(),
                            "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                        });
                        if (IsMobile) {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": 0
                            })
                        } else {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": "1%"
                            })
                        }
                        $(window).resize(function() {
                            objsub_title.addClass(option.show_color).css({
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            datalist.addClass("scrolling_touch press").css({
                                "margin-top": $(".ak-IntlTel_head").outerHeight(),
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10
                            })
                        });
                        objsub_dl.find("dd").addClass(option.list_Class);
                        var this_h = 0;
                        datalist.scroll(function() {
                            var letter_position = [];
                            datalist.each(function() {
                                for (var i = 0; i < $(this).find("dl").length; i++) {
                                    letter_position.push($(this).find("dl")[i].offsetTop);
                                }
                            });
                            if ($(".ak-IntlTel_head").length > 0) {
                                scrolltop = datalist.scrollTop() + $(".ak-IntlTel_head").outerHeight();
                            } else {
                                scrolltop = datalist.scrollTop();
                            }
                            for (var j = 0; j < letter_position.length; j++) {
                                if (scrolltop >= letter_position[j]) {
                                    objsub_ol.find("li").removeClass(option.Nav_active);
                                    objsub_ol.find("li").eq(j).addClass(option.Nav_active);
                                }
                            }
                            this_h = datalist.scrollTop();
                        });
                        objsub_ol.find("li").unbind("click");
                        objsub_ol.find("li").on("click", function(event) {
                            if (IsMobile) {
                                this_h += objsub_dl.eq($(this).index()).offset().top - $(".ak-IntlTel_head").outerHeight() + 2;
                            } else {
                                this_h += objsub_dl.eq($(this).index()).offset().top - objsub.offset().top + 2;
                            }
                            event.stopPropagation();
                            objsub.show();
                            objsub_title.fadeIn();
                            setTimeout(function() {
                                objsub_title.fadeOut();
                            }, 800);
                            objsub_title.text($(this).text());
                            datalist.animate({
                                scrollTop: this_h
                            }, 500);
                        });
                        objsub_dl.find("dd").unbind("click");
                        objsub_dl.find("dd").on("click", function() {
                            var val = this;
                            obj.el.children("input").val($(this).attr("data-number"));
                            objsub.hide();
                            obj.el.removeClass("ak-is_active");
                            option.clickBack(val);
                        });
                        $(this).unbind("click");
                        $(this).on("click",
                            function(event) {
                                $(this).toggleClass("ak-is_active");
                                if ($(this).hasClass("ak-is_active")) {
                                    if (IsMobile) {
                                        objsub.show();
                                    } else {
                                        objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                                        objsub.addClass("abs").css({
                                            "width": option.boxsize[0],
                                            "left": $(this).offset().left
                                        });
                                        objsub.children("ol").addClass("abs top_0 mt_1em mr_16em");
                                        datalist.addClass("mt_0 scrollbar").css({
                                            "height": option.boxsize[1]
                                        });
                                        if ($(this).offset().top + $(this).innerHeight()+ objsub.innerHeight() > $(window).height()) {
                                            objsub.css({
                                                "top": "auto",
                                                "bottom": $("#ak-scrollview").outerHeight() - ($(this).offset().top + $(this).outerHeight()) + $("#ak-scrollview").offset().top + $(this).innerHeight()*2-4
                                            });
                                        } else {
                                            objsub.addClass("abs").css({
                                                "top": $(this).offset().top + $(this).outerHeight(),
                                                "bottom": "auto",
                                            });
                                        }
                                        objsub.slideDown();
                                    }
                                    option.showBack(objsub);
                                    $("body").unbind("click");
                                    $("body").click(function () {
                                        objsub.slideUp();
                                        obj.el.removeClass("ak-is_active");
                                    });
                                    if ($('#ak-scrollview').length > 0) {
                                        var $scrollbar = $("#ak-scrollview");
                                    } else {
                                        var $scrollbar = $("main");
                                    }
                                    $scrollbar.scroll(function(){
                                        objsub.hide();
                                        obj.el.removeClass("ak-is_active");
                                    });
                                } else {
                                    if (IsMobile) {
                                        objsub.hide();
                                    } else {
                                        objsub.slideUp();
                                    }
                                }
                                event.stopPropagation();
                            });
                        $(".ak-IntlTel_head").children("button").unbind("click");
                        $(".ak-IntlTel_head").children("button").click(function() {
                            obj.el.removeClass("ak-is_active");
                            objsub.hide();
                        })
                    })
                })
            }
        };
        var el = new TelInput($(this));
    }
} (jQuery));

/*-----------------------------------------------AKjs_Loader (2018-12-13)--------------------------------------------*/
function AKjs_Loader(setting) {
    var option = $.extend({
            ele: "",
            autoMode: true,
            maskBG: false,
            iconColor:"#ffffff",
            timeToHide:0,
            Loader: "",
            text: "",
            boxsize: "",
            eleclass: "animated fadeIn fix",
            callback: function() {}
        },
        setting);
    var load_1 = '<div class="ak-loading ak-Loader1">' +
        '<div class="ak-Loader-double-bounce1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-double-bounce2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_2 = '<div class="ak-loading ak-Loader2">' +
        '<div class="ak-Loader-container ak-Loader-container1">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container2">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container3">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '</div>';
    var load_3 = '<div class="ak-loading ak-Loader3">' +
        '<div class="ak-Loader-dot1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-dot2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_4 = '<div class="ak-loading ak-Loader4" style="background-color:'+option.iconColor+'"></div>';
    var load_5 = '<div class="ak-loading ak-Loader5">' +
        '<div class="ak-Loader-cube1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-cube2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_6 = '<div class="ak-loading ak-Loader6">' +
        '<div class="ak-Loader-rect1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect4" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect5" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_7 = '<div class="ak-loading ak-Loader7">' +
        '<div class="ak-Loader-circ1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    AKjs_UserAgent();
    $(function() {
        if ($(".ak-Loader").length < 1) {
            $("body").append("<div class='ak-Loader'></div>");
        }
        var load_ele = $(".ak-Loader");
        if ($(option.ele).length > 0) {
            load_ele.addClass(option.eleclass).css({
                "left": $(option.ele).offset().left,
                "top": $(option.ele).offset().top,
                "width": $(option.ele).outerWidth(),
                "height": $(option.ele).outerHeight()
            });
        }
        if (IsMobile) {
            load_ele.attr("style",$("main").attr("style"));
            load_ele.bind({
                touchmove: function (ak) {
                    ak.preventDefault();
                    ak.stopPropagation();
                }
            });
        }
        $("#ak-scrollview").removeClass("scrolling_touch");
        load_ele.each(function() {
            var op = option.Loader;
            switch (op) {
                case "load_0":
                    var loadImage ="data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=";
                    load_ele.html("<figure class=\"ak-loading bg_ab_none bg_white08 img_auto\"><img src='"+loadImage+"'></figure>");
                    break;
                case "load_1":
                    load_ele.html(load_1);
                    break;
                case "load_2":
                    load_ele.html(load_2);
                    break;
                case "load_3":
                    load_ele.html(load_3);
                    break;
                case "load_4":
                    load_ele.html(load_4);
                    break;
                case "load_5":
                    load_ele.html(load_5);
                    break;
                case "load_6":
                    load_ele.html(load_6);
                    break;
                case "load_7":
                    load_ele.html(load_7);
                    break;
            }
        });
        var loading = load_ele.find(".ak-loading");
        if (option.maskBG == true) {
            $("<div class='ak-mask' id='#ak-loadingmask' />").appendTo(load_ele);
            loading.addClass("bg_ab_none");
        } else {
            load_ele.find("#ak-loadingmask").remove();
            if (option.boxsize) {
                loading.css({
                    "width": option.boxsize,
                    "height": option.boxsize
                })
            }
        }
        if (option.ele) {
            var ww = $(option.ele).width();
            var wh = $(option.ele).height();
        } else {
            var ww = $(window).width();
            var wh = $(window).height();
        }
        var lw = loading.outerWidth();
        var lh = loading.outerHeight();
        if (IsMobile) {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").length === 0) {
                var heh = 0;
            } else {
                var heh = $("header").outerHeight();
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").length === 0) {
                var foh = 0;
            } else {
                var foh = $("footer").outerHeight();
            }
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2) - heh - foh
            };
        } else {
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2)
            };
        }
        loading.css(yy);
        if (option.text) {
            load_ele.append("<span><em class='dis_inbl pl_1em pr_1em'>"+option.text+"</em></span>");
            if (option.maskBG == true) {
                load_ele.children("span").children("em").removeClass("bg_white08");
            } else {
                load_ele.children("span").children("em").addClass("bg_white08");
            }
            load_ele.children("span").css({
                top: loading.offset().top - load_ele.offset().top + load_ele.children("span").outerHeight()*2
            });
            if (IsIE) {
                load_ele.children("span").addClass("mt_07em");
            }
        }
        $(window).resize(function () {
            if (option.ele) {
                var ww = $(option.ele).width();
                var wh = $(option.ele).height();
            } else {
                var ww = $(window).width();
                var wh = $(window).height();
            }
            if ($(option.ele).length > 0) {
                load_ele.addClass(option.eleclass).css({
                    "left": $(option.ele).offset().left,
                    "top": $(option.ele).offset().top,
                    "width": $(option.ele).outerWidth(),
                    "height": $(option.ele).outerHeight()
                });
            }
            var lw = loading.outerWidth();
            var lh = loading.outerHeight();
            if (IsMobile) {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2) - heh - foh
                };
            } else {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2)
                };
            }
            loading.css(yy);
            if (option.text) {
                load_ele.children("span").css({
                    top: loading.offset().top - load_ele.offset().top + load_ele.children("span").outerHeight()*2
                });
            }
        });

        option.callback(load_ele,ak_closeLayer);
        if (option.autoMode) {
            setTimeout(function () {
                ak_closeLayer(true);
            }, option.timeToHide);
        }
        function ak_closeLayer(state) {
            if (state === true) {
                $(load_ele).fadeOut();
                $("#ak-scrollview").addClass("scrolling_touch");
            } else {
                $(load_ele).fadeIn();
                $("#ak-scrollview").removeClass("scrolling_touch");
            }
        }
    });
}

/*-----------------------------------------------AKjs_Marquee (2018-12-13)--------------------------------------------*/
(function($) {
    var methods = {
        init: function(setting) {
            var option = {
                direction: "left",
                loop: -1,
                scrolldelay: 0,
                scrollamount: 50,
                circular: true,
                drag: true,
                runshort: true,
                hoverstop: true,
                inverthover: false,
                xml: false
            };
            if (setting) {
                $.extend(option, setting)
            }
            return this.each(function() {
                var enterEvent = "mouseenter";
                var leaveEvent = "mouseleave";
                if (option.inverthover) {
                    enterEvent = "mouseleave";
                    leaveEvent = "mouseenter"
                }
                var loop = option.loop,
                    strWrap = $(this).addClass("ak-marquee_wrap").data({
                        scrollamount: option.scrollamount
                    }),
                    fMove = false;
                var strWrapStyle = strWrap.attr("style");
                if (strWrapStyle) {
                    var wrapStyleArr = strWrapStyle.split(";");
                    var startHeight = false;
                    for (var i = 0; i < wrapStyleArr.length; i++) {
                        var str = $.trim(wrapStyleArr[i]);
                        var tested = str.search(/^height/g);
                        if (tested != -1) {
                            startHeight = parseFloat(strWrap.css("height"))
                        }
                    }
                }
                var code = function() {
                    strWrap.off("mouseleave");
                    strWrap.off("mouseenter");
                    strWrap.off("mousemove");
                    strWrap.off("mousedown");
                    strWrap.off("mouseup");
                    if (!$(".ak-marquee_move", strWrap).length) {
                        strWrap.wrapInner($("<div>").addClass("ak-marquee_move"))
                    }
                    var strMove = $(".ak-marquee_move", strWrap).addClass("ak-marquee_origin"),
                        strMoveClone = strMove.clone().removeClass("ak-marquee_origin").addClass("ak-marquee_move_clone"),
                        time = 0;
                    if (!option.hoverstop) {
                        strWrap.addClass("noStop")
                    }
                    var circCloneHor = function() {
                        strMoveClone.clone().css({
                            left: "100%",
                            right: "auto",
                            width: strMove.width()
                        }).appendTo(strMove);
                        strMoveClone.css({
                            right: "100%",
                            left: "auto",
                            width: strMove.width()
                        }).appendTo(strMove)
                    };
                    var circCloneVert = function() {
                        strMoveClone.clone().css({
                            top: "100%",
                            bottom: "auto",
                            height: strMove.height()
                        }).appendTo(strMove);
                        strMoveClone.css({
                            bottom: "100%",
                            top: "auto",
                            height: strMove.height()
                        }).appendTo(strMove)
                    };
                    if (option.direction == "left") {
                        strWrap.height(strMove.outerHeight());
                        if (strMove.width() > strWrap.width()) {
                            var leftPos = -strMove.width();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneHor();
                                    leftPos = -(strMove.width() + (strMove.width() - strWrap.width()))
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    left: strWrap.width()
                                })
                            }
                            var strMoveLeft = strWrap.width(),
                                k1 = 0,
                                timeFunc1 = function() {
                                    var fullS = Math.abs(leftPos),
                                        time = (fullS / strWrap.data("scrollamount")) * 1000;
                                    if (parseFloat(strMove.css("left")) != 0) {
                                        fullS = (fullS + strWrap.width());
                                        time = (fullS - (strWrap.width() - parseFloat(strMove.css("left")))) / strWrap.data("scrollamount") * 1000
                                    }
                                    return time
                                },
                                moveFuncId1 = false,
                                moveFunc1 = function() {
                                    if (loop != 0) {
                                        strMove.stop(true).animate({
                                                left: leftPos
                                            },
                                            timeFunc1(), "linear",
                                            function() {
                                                $(this).css({
                                                    left: strWrap.width()
                                                });
                                                if (loop == -1) {
                                                    moveFuncId1 = setTimeout(moveFunc1, option.scrolldelay)
                                                } else {
                                                    loop--;
                                                    moveFuncId1 = setTimeout(moveFunc1, option.scrolldelay)
                                                }
                                            })
                                    }
                                };
                            strWrap.data({
                                moveId: moveFuncId1,
                                moveF: moveFunc1
                            });
                            if (!option.inverthover) {
                                moveFunc1()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        clearTimeout(moveFuncId1);
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc1()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragLeft;
                                            var dir = 1;
                                            var newX;
                                            var oldX = e.clientX;
                                            strMoveLeft = strMove.position().left;
                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newX = e.clientX;
                                                    if (newX > oldX) {
                                                        dir = 1
                                                    } else {
                                                        dir = -1
                                                    }
                                                    oldX = newX;
                                                    dragLeft = k1 + (e.clientX - strWrap.offset().left);
                                                    if (!option.circular) {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    } else {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = 0;
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > 0 && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        left: dragLeft
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    $(this).off("mousemove");
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                strMove.css({
                                    left: strWrap.width()
                                });
                                var strMoveLeft = strWrap.width(),
                                    k1 = 0,
                                    timeFunc = function() {
                                        time = (strMove.width() + strMove.position().left) / strWrap.data("scrollamount") * 1000;
                                        return time
                                    };
                                var moveFunc = function() {
                                    var leftPos = -strMove.width();
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: strWrap.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragLeft;
                                                var dir = 1;
                                                var newX;
                                                var oldX = e.clientX;
                                                strMoveLeft = strMove.position().left;
                                                k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newX = e.clientX;
                                                        if (newX > oldX) {
                                                            dir = 1
                                                        } else {
                                                            dir = -1
                                                        }
                                                        oldX = newX;
                                                        dragLeft = k1 + (e.clientX - strWrap.offset().left);
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        strMove.stop(true).css({
                                                            left: dragLeft
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "right") {
                        strWrap.height(strMove.outerHeight());
                        strWrap.addClass("ak-marquee_right");
                        strMove.css({
                            left: -strMove.width(),
                            right: "auto"
                        });
                        if (strMove.width() > strWrap.width()) {
                            var leftPos = strWrap.width();
                            strMove.css({
                                left: 0
                            });
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneHor();
                                    leftPos = strMove.width()
                                }
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = strWrap.width(),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("left")) != 0) {
                                    fullS = (strMove.width() + strWrap.width());
                                    time = (fullS - (strMove.width() + parseFloat(strMove.css("left")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: -strMove.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragLeft;
                                            var dir = 1;
                                            var newX;
                                            var oldX = e.clientX;
                                            strMoveLeft = strMove.position().left;
                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newX = e.clientX;
                                                    if (newX > oldX) {
                                                        dir = 1
                                                    } else {
                                                        dir = -1
                                                    }
                                                    oldX = newX;
                                                    dragLeft = k2 + (e.clientX - strWrap.offset().left);
                                                    if (!option.circular) {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    } else {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = 0;
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > 0 && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        left: dragLeft
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    $(this).off("mousemove");
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strWrap.width() - strMove.position().left) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var leftPos = strWrap.width();
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: -strMove.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragLeft;
                                                var dir = 1;
                                                var newX;
                                                var oldX = e.clientX;
                                                strMoveLeft = strMove.position().left;
                                                k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newX = e.clientX;
                                                        if (newX > oldX) {
                                                            dir = 1
                                                        } else {
                                                            dir = -1
                                                        }
                                                        oldX = newX;
                                                        dragLeft = k2 + (e.clientX - strWrap.offset().left);
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        strMove.stop(true).css({
                                                            left: dragLeft
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "up") {
                        strWrap.addClass("ak-marquee_vertical");
                        if (strMove.height() > strWrap.height()) {
                            var topPos = -strMove.height();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneVert();
                                    topPos = -(strMove.height() + (strMove.height() - strWrap.height()))
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    top: strWrap.height()
                                })
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = Math.abs(topPos),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("top")) != 0) {
                                    fullS = (fullS + strWrap.height());
                                    time = (fullS - (strWrap.height() - parseFloat(strMove.css("top")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                            top: topPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                top: strWrap.height()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragTop;
                                            var dir = 1;
                                            var newY;
                                            var oldY = e.clientY;
                                            strMoveTop = strMove.position().top;
                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newY = e.clientY;
                                                    if (newY > oldY) {
                                                        dir = 1
                                                    } else {
                                                        if (newY < oldY) {
                                                            dir = -1
                                                        }
                                                    }
                                                    oldY = newY;
                                                    dragTop = k2 + e.clientY - strWrap.offset().top;
                                                    if (!option.circular) {
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = strWrap.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > strWrap.height() && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                    } else {
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = 0;
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > 0 && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        top: dragTop
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    $(this).off("mousemove");
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                strMove.css({
                                    top: strWrap.height()
                                });
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strMove.height() + strMove.position().top) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var topPos = -strMove.height();
                                    strMove.animate({
                                            top: topPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                top: strWrap.height()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragTop;
                                                var dir = 1;
                                                var newY;
                                                var oldY = e.clientY;
                                                strMoveTop = strMove.position().top;
                                                k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newY = e.clientY;
                                                        if (newY > oldY) {
                                                            dir = 1
                                                        } else {
                                                            if (newY < oldY) {
                                                                dir = -1
                                                            }
                                                        }
                                                        oldY = newY;
                                                        dragTop = k2 + e.clientY - strWrap.offset().top;
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = strWrap.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > strWrap.height() && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        strMove.stop(true).css({
                                                            top: dragTop
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "down") {
                        strWrap.addClass("ak-marquee_vertical").addClass("ak-marquee_down");
                        strMove.css({
                            top: -strMove.height(),
                            bottom: "auto"
                        });
                        if (strMove.height() > strWrap.height()) {
                            var topPos = strWrap.height();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneVert();
                                    topPos = strMove.height()
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    top: -strMove.height()
                                })
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = strWrap.height(),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("top")) != 0) {
                                    fullS = (strMove.height() + strWrap.height());
                                    time = (fullS - (strMove.height() + parseFloat(strMove.css("top")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                        top: topPos
                                    }, timeFunc(), "linear", function() {
                                        $(this).css({
                                            top: -strMove.height()
                                        });
                                        if (loop == -1) {
                                            setTimeout(moveFunc, option.scrolldelay);
                                        } else {
                                            loop--;
                                            setTimeout(moveFunc, option.scrolldelay);
                                        }
                                    });
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc();
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent, function() {
                                    $(this).addClass("ak-marquee_active");
                                    strMove.stop(true);
                                }).on(leaveEvent, function() {
                                    $(this).removeClass("ak-marquee_active");
                                    $(this).off("mousemove");
                                    moveFunc();
                                });
                                if (option.drag) {
                                    strWrap.on("mousedown", function(e) {
                                        if (option.inverthover) {
                                            strMove.stop(true)
                                        }
                                        var dragTop;
                                        var dir = 1;
                                        var newY;
                                        var oldY = e.clientY;
                                        strMoveTop = strMove.position().top;
                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                        $(this).on("mousemove", function(e) {
                                                fMove = true;
                                                newY = e.clientY;
                                                if (newY > oldY) {
                                                    dir = 1
                                                } else {
                                                    if (newY < oldY) {
                                                        dir = -1
                                                    }
                                                }
                                                oldY = newY;
                                                dragTop = k2 + e.clientY - strWrap.offset().top;
                                                if (!option.circular) {
                                                    if (dragTop < -strMove.height() && dir < 0) {
                                                        dragTop = strWrap.height();
                                                        strMoveTop = strMove.position().top;
                                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                    }
                                                    if (dragTop > strWrap.height() && dir > 0) {
                                                        dragTop = -strMove.height();
                                                        strMoveTop = strMove.position().top;
                                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                    }
                                                } else {
                                                    if (dragTop < -strMove.height() && dir < 0) {
                                                        dragTop = 0;
                                                        strMoveTop = strMove.position().top;
                                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                    }
                                                    if (dragTop > 0 && dir > 0) {
                                                        dragTop = -strMove.height();
                                                        strMoveTop = strMove.position().top;
                                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                    }
                                                }
                                                strMove.stop(true).css({
                                                    top: dragTop
                                                })
                                            }).on("mouseup", function() {
                                                if (option.inverthover) {
                                                    strMove.trigger("mouseenter")
                                                }
                                                $(this).off("mousemove");
                                                setTimeout(function() {
                                                        fMove = false
                                                    }, 50);
                                            });
                                        return false
                                    }).on("click", function() {
                                        if (fMove) {
                                            return false
                                        }
                                    });
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strWrap.height() - strMove.position().top) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var topPos = strWrap.height();
                                    strMove.animate({
                                        top: topPos
                                    }, timeFunc(), "linear", function() {
                                        $(this).css({
                                            top: -strMove.height()
                                        });
                                        if (loop == -1) {
                                            setTimeout(moveFunc, option.scrolldelay)
                                        } else {
                                            loop--;
                                            setTimeout(moveFunc, option.scrolldelay)
                                        }
                                    });
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc();
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc();
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown", function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true);
                                            }
                                            var dragTop;
                                            var dir = 1;
                                            var newY;
                                            var oldY = e.clientY;
                                            strMoveTop = strMove.position().top;
                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                            $(this).on("mousemove", function(e) {
                                                fMove = true;
                                                newY = e.clientY;
                                                if (newY > oldY) {
                                                    dir = 1;
                                                } else {
                                                    if (newY < oldY) {
                                                        dir = -1;
                                                    }
                                                }
                                                oldY = newY;
                                                dragTop = k2 + e.clientY - strWrap.offset().top;
                                                if (dragTop < -strMove.height() && dir < 0) {
                                                    dragTop = strWrap.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                if (dragTop > strWrap.height() && dir > 0) {
                                                    dragTop = -strMove.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                strMove.stop(true).css({
                                                    top: dragTop
                                                });
                                                }).on("mouseup", function() {
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    $(this).off("mousemove");
                                                    setTimeout(function() {
                                                        fMove = false
                                                    }, 50);
                                                });
                                            return false;
                                        }).on("click", function() {
                                            if (fMove) {
                                                return false;
                                            }
                                        });
                                    } else {
                                        strWrap.addClass("no_drag");
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static");
                            }
                        }
                    }
                };
                if (option.xml) {
                    $.ajax({
                        url: option.xml,
                        dataType: "xml",
                        success: function(xml) {
                            var xmlTextEl = $(xml).find("text");
                            var xmlTextLength = xmlTextEl.length;
                            for (var i = 0; i < xmlTextLength; i++) {
                                var xmlElActive = xmlTextEl.eq(i);
                                var xmlElContent = xmlElActive.text();
                                var xmlItemEl = $("<span>").text(xmlElContent).appendTo(strWrap);
                                if (option.direction == "left" || option.direction == "right") {
                                    xmlItemEl.css({
                                        display: "inline-block",
                                        textAlign: "right"
                                    });
                                    if (i > 0) {
                                        xmlItemEl.css({
                                            width: strWrap.width() + xmlItemEl.width()
                                        });
                                    }
                                }
                                if (option.direction == "down" || option.direction == "up") {
                                    xmlItemEl.css({
                                        display: "block",
                                        textAlign: "left"
                                    });
                                    if (i > 0) {
                                        xmlItemEl.css({
                                            paddingTop: strWrap.height()
                                        });
                                    }
                                }
                            }
                            code();
                        }
                    })
                } else {
                    code();
                }
                strWrap.data({
                    ini: code,
                    startheight: startHeight
                })
            })
        },
        update: function() {
            var el = $(this);
            var ak_marquee_origin = $(".ak-marquee_origin", el);
            var ak_marquee_move_clone = $(".ak-marquee_move_clone", el);
            ak_marquee_origin.stop(true);
            ak_marquee_move_clone.remove();
            el.data("ini")();
        },
        destroy: function() {
            var el = $(this);
            var elMove = $(".ak-marquee_move", el);
            var startHeight = el.data("startheight");
            $(".ak-marquee_move_clone", el).remove();
            el.off("mouseenter");
            el.off("mousedown");
            el.off("mouseup");
            el.off("mouseleave");
            el.off("mousemove");
            el.removeClass("noStop").removeClass("ak-marquee_vertical").removeClass("ak-marquee_active").removeClass("no_drag").removeClass("ak-marquee_static").removeClass("ak-marquee_right").removeClass("ak-marquee_down");
            var elStyle = el.attr("style");
            if (elStyle) {
                var styleArr = elStyle.split(";");
                for (var i = 0; i < styleArr.length; i++) {
                    var str = $.trim(styleArr[i]);
                    var tested = str.search(/^height/g);
                    if (tested != -1) {
                        styleArr[i] = "";
                    }
                }
                var newArr = styleArr.join(";");
                var newStyle = newArr.replace(/;+/g, ";");
                if (newStyle == ";") {
                    el.removeAttr("style");
                } else {
                    el.attr("style", newStyle);
                }
                if (startHeight) {
                    el.css({
                        height: startHeight
                    })
                }
            }
            elMove.stop(true);
            if (elMove.length) {
                var context = elMove.html();
                elMove.remove();
                el.html(context);
            }
        },
        pause: function() {
            var el = $(this);
            var elMove = $(".ak-marquee_move", el);
            elMove.stop(true);
        },
        play: function() {
            var el = $(this);
            $(this).off("mousemove");
            el.data("moveF")();
        }
    };
    $.fn.AKjs_Marquee = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            }
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_MediaElement (2018-12-13)--------------------------------------------*/
(function($) {
    var akjs = akjs || {};
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
} (jQuery));

/*-----------------------------------------------AKjs_Menu (2018-12-13)--------------------------------------------*/
(function($) {
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
} (jQuery));

/*-----------------------------------------------AKjs_MenuList (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_MenuList = function(setting) {
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
} (jQuery));

/*-----------------------------------------------AKjs_Mkinfinite (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Mkinfinite = function(options){
        var options = $.extend({
            maxZoom:           1.25,
            imagesRatio:       1.5,
            height:             "100%",
            animationTime:     10000,
            animationInterval: 10,
            isFixedBG:         false,
            zoomIn:            true,
            imagesList: new Array(),
        }, options);
        var currentImage  = 1;
        var currentZoom   = 1;
        var animationStep = 0.1;
        var $object;
        var make = function(){
            currentZoom = options.zoomIn ? options.maxZoom : 1;
            animationStep = (options.maxZoom - 1) / ( options.animationTime / options.animationInterval );
            if (!options.zoomIn){
                animationStep = -1 * animationStep;
            }
            $object = $(this);
            $object.css({
                'height': options.height,
                'background-position': '50% 50%',
                'background-repeat': 'no-repeat'
            });
            if (options.imagesList.length > 0){
                calculateZoom(currentImage);
            }
            animateBG();
        };
        var calculateZoom = function(setImageNumber){
            var nBGw = ( options.isFixedBG ? $(window).width() : $object.width() ) * currentZoom;
            var nBGh = $object.height() * currentZoom;
            if ( (nBGw / nBGh) > options.imagesRatio ){
                nBGw = Math.round(nBGw);
                nBGh = Math.round(nBGw / options.imagesRatio);
            } else {
                nBGw = Math.round(nBGh * options.imagesRatio);
                nBGh = Math.round(nBGh);
            }
            if (setImageNumber && (setImageNumber > 0)){
                $object.css({
                    'background-size': nBGw + 'px ' + nBGh + 'px',
                    'background-image': 'url(' + options.imagesList[setImageNumber - 1] + ')'
                });
                var imgLoader = new Image();
                imgLoader.src = options.imagesList[setImageNumber % options.imagesList.length];
            } else {
                $object.css('background-size', nBGw + 'px ' + nBGh + 'px');
            }
        };
        var animateBG = function(){
            if ( options.zoomIn && (currentZoom >= 1) || !options.zoomIn && (currentZoom <= options.maxZoom) ){
                setTimeout(function(){
                    calculateZoom();
                    currentZoom = currentZoom - animationStep;
                    animateBG();
                }, options.animationInterval);
            } else {
                currentZoom = options.zoomIn ? options.maxZoom : 1;
                if (options.imagesList.length > 1){
                    currentImage = currentImage % options.imagesList.length + 1;
                    calculateZoom(currentImage);
                } else {
                    calculateZoom();
                }
                animateBG();
            }
        };
        return this.each(make);
    };
} (jQuery));

/*-----------------------------------------------AKjs_MultiDate (2018-12-13)--------------------------------------------*/
(function($) {
    var ak_MultiDate = function(element, options) {
        var that = this;
        AKjs_UserAgent();
        this.element = $(element);
        this.autoShow = options.autoShow || true;
        this.closeBtn = options.closeBtn;
        this.language = options.language || {
            month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        };
        this.format = DateTimeGlobal.parseFormat(options.format || this.element.data("date-format") || this.language.format || "mm/dd/yyyy");
        this.isInline = options.isInline || false;
        this.isMask = options.isMask || false;
        this.isInput = this.element.is("input");
        if (!this.isInput && this.element.find("input").length < 1) {
            $("<input type='text' class='ak-multiDate-input' />").appendTo(this.element);
            this.element.addClass("ak-multiDate-parent")
        }
        this.component = this.element ? this.element.find("input") : false;
        this.hasInput = this.component && this.element.find("input").length;
        this.disableDblClickSelection = options.disableDblClickSelection;
        this.onRender = options.onRender ||
            function() {};
        this.success = options.success ||
            function() {};
        this.okfun = options.okfun ||
            function() {};
        if (this.component && this.component.length === 0) {
            this.component = false
        }
        if (IsMobile) {
            this.appendTo = "body"
        } else {
            this.appendTo = "#ak-scrollview"
        }
        this.linkField = options.linkField || this.element.data("link-field") || false;
        this.linkFormat = DateTimeGlobal.parseFormat(options.linkFormat || this.element.data("link-format") || "yyyy-mm-dd hh:ii:ss");
        this.minuteStep = options.minuteStep || this.element.data("minute-step") || 5;
        this.pickerPosition = options.pickerPosition || this.element.data("picker-position") || "bottom-right";
        this.initialDate = options.initialDate || null;
        this._attachEvents();
        this.minView = 0;
        if ("minView" in options) {
            this.minView = options.minView
        } else {
            if ("minView" in this.element.data()) {
                this.minView = this.element.data("min-view")
            }
        }
        this.minView = DateTimeGlobal.convertViewMode(this.minView);
        this.maxView = DateTimeGlobal.modes.length - 1;
        if ("maxView" in options) {
            this.maxView = options.maxView
        } else {
            if ("maxView" in this.element.data()) {
                this.maxView = this.element.data("max-view")
            }
        }
        this.maxView = DateTimeGlobal.convertViewMode(this.maxView);
        this.startViewMode = "month";
        if ("startView" in options) {
            this.startViewMode = options.startView
        } else {
            if ("startView" in this.element.data()) {
                this.startViewMode = this.element.data("start-view")
            }
        }
        this.startViewMode = DateTimeGlobal.convertViewMode(this.startViewMode);
        this.viewMode = this.startViewMode;
        if (! ("minView" in options) && !("maxView" in options) && !(this.element.data("min-view") && !(this.element.data("max-view")))) {
            this.pickTime = false;
            if ("pickTime" in options) {
                this.pickTime = options.pickTime
            }
            if (this.pickTime == true) {
                this.minView = 0;
                this.maxView = 4
            } else {
                this.minView = 2;
                this.maxView = 4
            }
        }
        this.forceParse = true;
        if ("forceParse" in options) {
            this.forceParse = options.forceParse
        } else {
            if ("dateForceParse" in this.element.data()) {
                this.forceParse = this.element.data("date-force-parse")
            }
        }
        this.picker = $(DateTimeGlobal.template).appendTo(this.isInline ? this.element: this.appendTo).on({
            click: $.proxy(this.click, this),
            mousedown: $.proxy(this.mousedown, this)
        });
        if (this.closeBtn) {
            this.picker.find(".close").addClass("dis_block_im").text(this.closeBtn)
        } else {
            this.picker.find(".close").removeClass("dis_block_im").remove()
        }
        if (this.isInline) {
            this.picker.addClass("dis_block_im")
        }
        $(document).on("mousedown",
            function(e) {
                if ($(e.target).closest(".ak-MultiDate").length === 0) {
                    that.hide()
                }
            });
        this.autoclose = true;
        if ("autoclose" in options) {
            this.autoclose = options.autoclose
        } else {
            if ("dateAutoclose" in this.element.data()) {
                this.autoclose = this.element.data("date-autoclose")
            }
        }
        this.keyboardNavigation = true;
        if ("keyboardNavigation" in options) {
            this.keyboardNavigation = options.keyboardNavigation
        } else {
            if ("dateKeyboardNavigation" in this.element.data()) {
                this.keyboardNavigation = this.element.data("date-keyboard-navigation")
            }
        }
        this.todayBtn = (options.todayBtn || this.element.data("date-today-btn") || false);
        this.todayHighlight = (options.todayHighlight || this.element.data("date-today-highlight") || false);
        this.calendarWeeks = false;
        if ("calendarWeeks" in options) {
            this.calendarWeeks = options.calendarWeeks
        } else {
            if ("dateCalendarWeeks" in this.element.data()) {
                this.calendarWeeks = this.element.data("date-calendar-weeks")
            }
        }
        if (this.calendarWeeks) {
            this.picker.find("tfoot .today").attr("colspan",
                function(i, val) {
                    return parseInt(val) + 1
                })
        }
        this.weekStart = ((options.weekStart || this.element.data("date-weekstart") || this.language.weekStart || 0) % 7);
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(options.startDate || this.element.data("date-startdate"));
        this.setEndDate(options.endDate || this.element.data("date-enddate"));
        this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        if (this.isInline) {
            this.show()
        }
        if (!this.closeBtn && !this.todayBtn) {
            this.picker.find("tfoot").hide()
        }
    };
    ak_MultiDate.prototype = {
        constructor: ak_MultiDate,
        _events: [],
        _attachEvents: function() {
            this._detachEvents();
            if (this.isInput) {
                this._events = [[this.element, {
                    click: (this.autoShow) ? $.proxy(this.show, this) : function() {},
                    keyup: $.proxy(this.update, this),
                    keydown: $.proxy(this.keydown, this)
                }]]
            } else {
                if (this.component && this.hasInput) {
                    this._events = [[this.element.find("input"), {
                        click: (this.autoShow) ? $.proxy(this.show, this) : function() {},
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }]]
                }
            }
            if (this.disableDblClickSelection) {
                this._events[this._events.length] = [this.element, {
                    dblclick: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).blur()
                    }
                }]
            }
            for (var i = 0,
                     el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.on(ev)
            }
        },
        _detachEvents: function() {
            for (var i = 0,
                     el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.off(ev)
            }
            this._events = []
        },
        show: function(e) {
            this.picker.toggleClass("ShowHide");
            if (this.picker.hasClass("ShowHide")) {
                this.picker.slideDown();
                $("#multi_mask").show();
                this.success(this.element);
                this.picker.bind({
                    touchmove: function(e) {
                        e.preventDefault()
                    }
                })
            }
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.update();
            this.place();
            $(window).on("resize", $.proxy(this.place, this));
            if (e) {
                e.stopPropagation();
                e.preventDefault()
            }
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(e) {
            if (this.isInline) {
                return
            }
            if (!this.picker.is(":visible")) {
                return
            }
            this.picker.slideUp();
            setTimeout(function() {
                    $(".ak-MultiDate").removeClass("ShowHide");
                    $("#multi_mask").hide()
                },
                500);
            $(window).off("resize", this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off("mousedown", this.hide)
            }
            if (this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val())) {
                this.setValue()
            }
            this.element.trigger({
                type: "hide",
                date: this.date
            })
        },
        remove: function() {
            this._detachEvents();
            this.picker.remove();
            delete this.element.data().multiDate
        },
        getDate: function() {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset() * 60000))
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)))
        },
        setUTCDate: function(d) {
            this.date = d;
            this.setValue()
        },
        setValue: function() {
            var formatted = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component) {
                    this.element.find("input").val(formatted);
                    this.element.find("input").next("label").hide()
                }
                this.element.data("date", formatted)
            } else {
                this.element.val(formatted);
                this.element.next("label").hide()
            }
            this.okfun(formatted, this.element)
        },
        getFormattedDate: function(format) {
            if (format === undefined) {
                format = this.format
            }
            return DateTimeGlobal.formatDate(this.date, format, this.language)
        },
        setStartDate: function(startDate) {
            this.startDate = startDate || -Infinity;
            if (this.startDate !== -Infinity) {
                this.startDate = DateTimeGlobal.parseDate(this.startDate, this.format, this.language)
            }
            this.update();
            this.updateNavArrows()
        },
        setEndDate: function(endDate) {
            this.endDate = endDate || Infinity;
            if (this.endDate !== Infinity) {
                this.endDate = DateTimeGlobal.parseDate(this.endDate, this.format, this.language)
            }
            this.update();
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
            this.daysOfWeekDisabled = daysOfWeekDisabled || [];
            if (!$.isArray(this.daysOfWeekDisabled)) {
                this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)
            }
            this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled,
                function(d) {
                    return parseInt(d, 10)
                });
            this.update();
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline) {
                return
            }
            var zIndex = parseInt(this.element.parents().filter(function() {
                return $(this).css("z-index") != "auto"
            }).first().css("z-index")) + 10;
            var textbox = this.component ? this.component: this.element;
            var offset = textbox.offset();
            var height = textbox.outerHeight() + parseInt(textbox.css("margin-top"));
            var width = textbox.outerWidth() + parseInt(textbox.css("margin-left"));
            if (IsMobile) {
                this.picker.removeClass("dis_none").addClass("ak-isMobile").css({
                    bottom: 0,
                    top: "auto",
                    left: 0,
                    zIndex: zIndex
                });
                if (this.isMask) {
                    if ($("#multi_mask").length == 0) {
                        this.picker.after('<div id="multi_mask" class="ak-mask"></div>')
                    }
                    if (this.picker.hasClass("ShowHide")) {
                        $("#multi_mask").show();
                        var that = this;
                        $("#multi_mask").on("click",
                            function(e) {
                                that.hide()
                            })
                    }
                    $("#multi_mask").bind({
                        touchmove: function(e) {
                            e.preventDefault()
                        }
                    })
                }
            } else {
                if (offset.left + this.picker.width() > $(window).width()) {
                    offsetLeft = offset.left - $("#ak-scrollview").offset().left - this.picker.width() + width
                } else {
                    offsetLeft = offset.left - $("#ak-scrollview").offset().left
                }
                if ($("#ak-scrollview").scrollTop() > 0) {
                    fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop()
                } else {
                    fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top
                }
                var fullOffsetBottom = "auto";
                this.picker.removeClass("ak-isMobile").css({
                    bottom: fullOffsetBottom,
                    top: fullOffsetTop,
                    left: offsetLeft,
                    zIndex: zIndex
                });
                $("#multi_mask").remove()
            }
        },
        update: function() {
            var date, fromArgs = false;
            var currentVal = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val();
            if (arguments && arguments.length && (typeof arguments[0] === "string" || arguments[0] instanceof Date)) {
                date = arguments[0];
                fromArgs = true
            } else {
                if (!currentVal && this.initialDate != null) {
                    date = this.initialDate
                } else {
                    date = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val()
                }
            }
            this.date = DateTimeGlobal.parseDate(date, this.format, this.language);
            if (fromArgs || this.initialDate != null) {
                this.setValue()
            }
            if (this.date < this.startDate) {
                this.viewDate = new Date(this.startDate.valueOf())
            } else {
                if (this.date > this.endDate) {
                    this.viewDate = new Date(this.endDate.valueOf())
                } else {
                    this.viewDate = new Date(this.date.valueOf())
                }
            }
            this.fill()
        },
        fillDow: function() {
            var dowCnt = this.weekStart,
                html = "<tr>";
            if (this.calendarWeeks) {
                var cell = "<th>&nbsp;</th>";
                html += cell;
                this.picker.find(".days thead tr:first-child").prepend(cell)
            }
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">' + this.language.weeks[(dowCnt++) % 7] + "</th>"
            }
            html += "</tr>";
            this.picker.find(".days thead").append(html)
        },
        fillMonths: function() {
            var html = "",
                i = 0;
            while (i < 12) {
                html += '<span class="month">' + this.language.month[i++] + "</span>"
            }
            this.picker.find(".month td").html(html)
        },
        fill: function() {
            if (this.date == null || this.viewDate == null) {
                return
            }
            var d = new Date(this.viewDate.valueOf()),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                dayMonth = d.getUTCDate(),
                hours = d.getUTCHours(),
                minutes = d.getUTCMinutes(),
                startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                currentDate = this.date && this.date.valueOf(),
                today = new Date(),
                titleFormat = this.language.titleFormat;
            this.picker.find(".days thead th:eq(1)").text(year + " / " + this.language.month[month]);
            this.picker.find(".hours thead th:eq(1)").text(year + " / " + this.language.month[month] + " / " + dayMonth);
            this.picker.find(".minutes thead th:eq(1)").text(year + " / " + this.language.month[month] + " / " + dayMonth);
            if (this.todayBtn) {
                this.picker.find("tfoot .today").addClass("dis_block_im").text(this.todayBtn)
            } else {
                this.picker.find("tfoot .today").removeClass("dis_block_im").remove()
            }
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = ak_UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                day = DateTimeGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth.valueOf());
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() == this.weekStart) {
                    html.push("<tr>");
                    if (this.calendarWeeks) {
                        var a = new Date(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth(), prevMonth.getUTCDate() - prevMonth.getDay() + 10 - (this.weekStart && this.weekStart % 7 < 5 && 7)),
                            b = new Date(a.getFullYear(), 0, 4),
                            calWeek = ~~ ((a - b) / 86400000 / 7 + 1.5);
                        html.push("<td>" + calWeek + "</td>")
                    }
                }
                var nowTemp = new Date();
                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
                clsName = " " + this.onRender(prevMonth, now) + " ";
                if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
                    clsName += " c_gray_ccc"
                } else {
                    if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
                        clsName += " c_gray_999"
                    }
                }
                if (this.todayHighlight && prevMonth.getUTCFullYear() == today.getFullYear() && prevMonth.getUTCMonth() == today.getMonth() && prevMonth.getUTCDate() == today.getDate()) {
                    clsName += " today"
                }
                if (currentDate && prevMonth.valueOf() == currentDate) {
                    clsName += " bg_title c_white"
                }
                if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate || $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
                    clsName += " disabled"
                }
                html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>");
                if (prevMonth.getUTCDay() == this.weekEnd) {
                    html.push("</tr>")
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1)
            }
            this.picker.find(".days tbody").empty().append(html.join(""));
            html = [];
            for (var i = 0; i < 24; i++) {
                var actual = ak_UTCDate(year, month, dayMonth, i);
                clsName = "";
                if ((actual.valueOf() + 3600000) < this.startDate || actual.valueOf() > this.endDate) {
                    clsName += " disabled"
                } else {
                    if (hours == i) {
                        clsName += " bg_title c_white"
                    }
                }
                html.push('<span class="hour' + clsName + '">' + i + ":00</span>")
            }
            this.picker.find(".hours td").html(html.join(""));
            html = [];
            for (var i = 0; i < 60; i += this.minuteStep) {
                var actual = ak_UTCDate(year, month, dayMonth, hours, i);
                clsName = "";
                if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
                    clsName += " disabled"
                } else {
                    if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
                        clsName += " bg_title c_white"
                    }
                }
                html.push('<span class="minute' + clsName + '">' + hours + ":" + (i < 10 ? "0" + i: i) + "</span>")
            }
            this.picker.find(".minutes td").html(html.join(""));
            var currentYear = this.date && this.date.getUTCFullYear();
            var month = this.picker.find(".month").find("th:eq(1)").text(year).end().find("span").removeClass("bg_title c_white");
            if (currentYear && currentYear == year) {
                month.eq(this.date.getUTCMonth()).addClass("bg_title c_white")
            }
            if (year < startYear || year > endYear) {
                month.addClass("disabled")
            }
            if (year == startYear) {
                month.slice(0, startMonth).addClass("disabled")
            }
            if (year == endYear) {
                month.slice(endMonth + 1).addClass("disabled")
            }
            html = "";
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.picker.find(".years").find("th:eq(1)").addClass("press").text(year + "-" + (year + 9)).end().find("td");
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year' + (i == -1 || i == 10 ? " c_gray_ccc": "") + (currentYear == year ? " bg_title c_white": "") + (year < startYear || year > endYear ? " disabled": "") + '">' + year + "</span>";
                year += 1
            }
            yearCont.html(html)
        },
        updateNavArrows: function() {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                day = d.getUTCDate(),
                hour = d.getUTCHours();
            switch (this.viewMode) {
                case 0:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate() && hour <= this.startDate.getUTCHours()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate() && hour >= this.endDate.getUTCHours()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 1:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 2:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 3:
                case 4:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break
            }
        },
        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(e.target).hasClass("close") || $(e.target).parent().hasClass("close")) {
                this.hide()
            }
            if ($(e.target).hasClass("today") || $(e.target).parent().hasClass("today")) {
                var date = new Date();
                date = ak_UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                this.viewMode = this.startViewMode;
                this.showMode(0);
                this._setDate(date);
                this.hide()
            }
            var target = $(e.target).closest("span, td, th");
            if (target.length == 1) {
                if (target.is(".disabled")) {
                    this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                    return
                }
                switch (target[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (target[0].className) {
                            case "c_title":
                                this.showMode(1);
                                break;
                            case "prev":
                            case "next":
                                var dir = DateTimeGlobal.modes[this.viewMode].navStep * (target[0].className == "prev" ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, dir);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, dir);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break
                                }
                                this.fill();
                                break
                        }
                        break;
                    case "span":
                        if (!target.is(".disabled")) {
                            if (target.is(".month")) {
                                if (this.minView === 3) {
                                    var month = target.parent().find("span").index(target) || 0;
                                    var year = this.viewDate.getUTCFullYear(),
                                        day = 1,
                                        hours = this.viewDate.getUTCHours(),
                                        minutes = this.viewDate.getUTCMinutes(),
                                        seconds = this.viewDate.getUTCSeconds();
                                    this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                } else {
                                    this.viewDate.setUTCDate(1);
                                    var month = target.parent().find("span").index(target);
                                    this.viewDate.setUTCMonth(month);
                                    this.element.trigger({
                                        type: "changeMonth",
                                        date: this.viewDate
                                    })
                                }
                            } else {
                                if (target.is(".year")) {
                                    if (this.minView === 4) {
                                        var year = parseInt(target.text(), 10) || 0;
                                        var month = 0,
                                            day = 1,
                                            hours = this.viewDate.getUTCHours(),
                                            minutes = this.viewDate.getUTCMinutes(),
                                            seconds = this.viewDate.getUTCSeconds();
                                        this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    } else {
                                        this.viewDate.setUTCDate(1);
                                        var year = parseInt(target.text(), 10) || 0;
                                        this.viewDate.setUTCFullYear(year);
                                        this.element.trigger({
                                            type: "changeYear",
                                            date: this.viewDate
                                        })
                                    }
                                } else {
                                    if (target.is(".hour")) {
                                        var hours = parseInt(target.text(), 10) || 0;
                                        var year = this.viewDate.getUTCFullYear(),
                                            month = this.viewDate.getUTCMonth(),
                                            day = this.viewDate.getUTCDate(),
                                            minutes = this.viewDate.getUTCMinutes(),
                                            seconds = this.viewDate.getUTCSeconds();
                                        this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    } else {
                                        if (target.is(".minute")) {
                                            var minutes = parseInt(target.text().substr(target.text().indexOf(":") + 1), 10) || 0;
                                            var year = this.viewDate.getUTCFullYear(),
                                                month = this.viewDate.getUTCMonth(),
                                                day = this.viewDate.getUTCDate(),
                                                hours = this.viewDate.getUTCHours(),
                                                seconds = this.viewDate.getUTCSeconds();
                                            this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                        }
                                    }
                                }
                            }
                            if (this.viewMode != 0) {
                                var oldViewMode = this.viewMode;
                                this.showMode( - 1);
                                this.fill();
                                if (oldViewMode == this.viewMode && this.autoclose) {
                                    this.hide()
                                }
                            } else {
                                this.fill();
                                if (this.autoclose) {
                                    this.hide()
                                }
                            }
                        }
                        break;
                    case "td":
                        if (target.is(".day") && !target.is(".disabled")) {
                            var day = parseInt(target.text(), 10) || 1;
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();
                            if (target.is(".c_gray_ccc")) {
                                if (month === 0) {
                                    month = 11;
                                    year -= 1
                                } else {
                                    month -= 1
                                }
                            } else {
                                if (target.is(".c_gray_999")) {
                                    if (month == 11) {
                                        month = 0;
                                        year += 1
                                    } else {
                                        month += 1
                                    }
                                }
                            }
                            this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                        }
                        var oldViewMode = this.viewMode;
                        this.showMode( - 1);
                        this.fill();
                        if (oldViewMode == this.viewMode && this.autoclose) {
                            this.hide()
                        }
                        break
                }
            }
        },
        _setDate: function(date, which) {
            if (!which || which == "date") {
                this.date = date
            }
            if (!which || which == "view") {
                this.viewDate = date
            }
            this.fill();
            this.setValue();
            this.element.trigger({
                type: "changeDate",
                date: this.date
            });
            var element;
            if (this.isInput) {
                element = this.element
            } else {
                if (this.component) {
                    element = this.element.find("input")
                }
            }
            if (element) {
                element.change();
                if (this.autoclose && (!which || which == "date")) {}
            }
        },
        moveHour: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf());
            dir = dir > 0 ? 1 : -1;
            new_date.setUTCHours(new_date.getUTCHours() + dir);
            return new_date
        },
        moveDate: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf());
            dir = dir > 0 ? 1 : -1;
            new_date.setUTCDate(new_date.getUTCDate() + dir);
            return new_date
        },
        moveMonth: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month,
                test;
            dir = dir > 0 ? 1 : -1;
            if (mag == 1) {
                test = dir == -1 ?
                    function() {
                        return new_date.getUTCMonth() == month
                    }: function() {
                        return new_date.getUTCMonth() != new_month
                    };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                if (new_month < 0 || new_month > 11) {
                    new_month = (new_month + 12) % 12
                }
            } else {
                for (var i = 0; i < mag; i++) {
                    new_date = this.moveMonth(new_date, dir)
                }
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function() {
                    return new_month != new_date.getUTCMonth()
                }
            }
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month)
            }
            return new_date
        },
        moveYear: function(date, dir) {
            return this.moveMonth(date, dir * 12)
        },
        dateWithinRange: function(date) {
            return date >= this.startDate && date <= this.endDate
        },
        keydown: function(e) {
            if (this.picker.is(":not(:visible)")) {
                if (e.keyCode == 27) {
                    this.show()
                }
                return
            }
            var dateChanged = false,
                dir, day, month, newDate, newViewDate;
            switch (e.keyCode) {
                case 27:
                    this.hide();
                    e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation) {
                        break
                    }
                    dir = e.keyCode == 37 ? -1 : 1;
                    if (e.ctrlKey) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir)
                    } else {
                        if (e.shiftKey) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else {
                            newDate = new Date(this.date.valueOf());
                            newDate.setUTCDate(this.date.getUTCDate() + dir);
                            newViewDate = new Date(this.viewDate.valueOf());
                            newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir)
                        }
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true
                    }
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation) {
                        break
                    }
                    dir = e.keyCode == 38 ? -1 : 1;
                    if (e.ctrlKey) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir)
                    } else {
                        if (e.shiftKey) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else {
                            newDate = new Date(this.date.valueOf());
                            newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                            newViewDate = new Date(this.viewDate.valueOf());
                            newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7)
                        }
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true
                    }
                    break;
                case 13:
                    this.hide();
                    e.preventDefault();
                    break;
                case 9:
                    this.hide();
                    break
            }
            if (dateChanged) {
                this.element.trigger({
                    type:
                        "changeDate",
                    date: this.date
                });
                var element;
                if (this.isInput) {
                    element = this.element
                } else {
                    if (this.component) {
                        element = this.element.find("input")
                    }
                }
                if (element) {
                    element.change()
                }
            }
        },
        showMode: function(dir) {
            if (dir) {
                var newViewMode = Math.max(0, Math.min(DateTimeGlobal.modes.length - 1, this.viewMode + dir));
                if (newViewMode >= this.minView && newViewMode <= this.maxView) {
                    this.viewMode = newViewMode
                }
            }
            this.picker.find(">div").removeClass("dis_block_im").filter("." + DateTimeGlobal.modes[this.viewMode].clsName).addClass("dis_block_im");
            if (this.picker.children(".dis_block_im").find("tfoot button").length > 1) {
                this.picker.children(".dis_block_im").find("tfoot button").addClass("w_50");
                this.picker.children(".dis_block_im").find("tfoot button").eq(0).addClass("bor_right")
            } else {
                this.picker.children(".dis_block_im").find("tfoot button").removeClass("w_50");
                this.picker.children(".dis_block_im").find("tfoot button").eq(0).removeClass("bor_right")
            }
            this.updateNavArrows()
        },
        reset: function(e) {
            this._setDate(null, "date")
        }
    };
    $.fn.AKjs_MultiDate = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function() {
            var $this = $(this),
                data = $this.data("multiDate"),
                options = typeof option == "object" && option;
            if (!data) {
                $this.data("multiDate", (data = new ak_MultiDate(this, $.extend({},
                    $.fn.AKjs_MultiDate.defaults, options))))
            }
            if (typeof option == "string" && typeof data[option] == "function") {
                data[option].apply(data, args)
            }
        })
    };
    $.fn.AKjs_MultiDate.defaults = {
        onRender: function(date, now) {
            return ""
        },
        success: function(ele) {},
        okfun: function(val, ele) {}
    };
    $.fn.AKjs_MultiDate.Constructor = ak_MultiDate;
    function ak_UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var DateTimeGlobal = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        },
            {
                clsName: "hours",
                navFnc: "Date",
                navStep: 1
            },
            {
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            },
            {
                clsName: "month",
                navFnc: "FullYear",
                navStep: 1
            },
            {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
        isLeapYear: function(year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth: function(year, month) {
            return [31, (DateTimeGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        validParts: /hh?|ii?|ss?|dd?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(format) {
            var separators = format.replace(this.validParts, "\0").split("\0"),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0) {
                throw new Error("Invalid date format.")
            }
            return {
                separators: separators,
                parts: parts
            }
        },
        parseDate: function(date, format, language) {
            if (date instanceof Date) {
                return new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd")
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd hh:ii")
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd hh:ii:ss")
            }
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
                var part_re = /([-+]\d+)([dmwy])/,
                    parts = date.match(/([-+]\d+)([dmwy])/g),
                    part,
                    dir;
                date = new Date();
                for (var i = 0; i < parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch (part[2]) {
                        case "d":
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case "m":
                            date = ak_MultiDate.prototype.moveMonth.call(ak_MultiDate.prototype, date, dir);
                            break;
                        case "w":
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case "y":
                            date = ak_MultiDate.prototype.moveYear.call(ak_MultiDate.prototype, date, dir);
                            break
                    }
                }
                return ak_UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
            }
            var parts = date && date.match(this.nonpunctuation) || [],
                date = new Date(),
                parsed = {},
                setters_order = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                setters_map = {
                    hh: function(d, v) {
                        return d.setUTCHours(v)
                    },
                    h: function(d, v) {
                        return d.setUTCHours(v)
                    },
                    ii: function(d, v) {
                        return d.setUTCMinutes(v)
                    },
                    i: function(d, v) {
                        return d.setUTCMinutes(v)
                    },
                    ss: function(d, v) {
                        return d.setUTCSeconds(v)
                    },
                    s: function(d, v) {
                        return d.setUTCSeconds(v)
                    },
                    yyyy: function(d, v) {
                        return d.setUTCFullYear(v)
                    },
                    yy: function(d, v) {
                        return d.setUTCFullYear(2000 + v)
                    },
                    m: function(d, v) {
                        v -= 1;
                        while (v < 0) {
                            v += 12
                        }
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() != v) {
                            d.setUTCDate(d.getUTCDate() - 1)
                        }
                        return d
                    },
                    d: function(d, v) {
                        return d.setUTCDate(v)
                    }
                },
                val,
                filtered,
                part;
            setters_map["M"] = setters_map["MM"] = setters_map["mm"] = setters_map["m"];
            setters_map["dd"] = setters_map["d"];
            date = ak_UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            if (parts.length == format.parts.length) {
                for (var i = 0,
                         cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = format.parts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case "MM":
                                filtered = $(language.month).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p
                                });
                                val = $.inArray(filtered[0], language.month) + 1;
                                break;
                            case "M":
                                filtered = $(language.month).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p
                                });
                                val = $.inArray(filtered[0], language.month) + 1;
                                break
                        }
                    }
                    parsed[part] = val
                }
                for (var i = 0,
                         s; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        setters_map[s](date, parsed[s])
                    }
                }
            }
            return date
        },
        formatDate: function(date, format, language) {
            if (date == null) {
                return ""
            }
            var val = {
                h: date.getUTCHours(),
                i: date.getUTCMinutes(),
                s: date.getUTCSeconds(),
                d: date.getUTCDate(),
                m: date.getUTCMonth() + 1,
                M: language.month[date.getUTCMonth()],
                MM: language.month[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.hh = (val.h < 10 ? "0": "") + val.h;
            val.ii = (val.i < 10 ? "0": "") + val.i;
            val.ss = (val.s < 10 ? "0": "") + val.s;
            val.dd = (val.d < 10 ? "0": "") + val.d;
            val.mm = (val.m < 10 ? "0": "") + val.m;
            var date = [],
                seps = $.extend([], format.separators);
            for (var i = 0,
                     cnt = format.parts.length; i < cnt; i++) {
                if (seps.length) {
                    date.push(seps.shift())
                }
                date.push(val[format.parts[i]])
            }
            return date.join("")
        },
        convertViewMode: function(viewMode) {
            switch (viewMode) {
                case 4:
                case "decade":
                    viewMode = 4;
                    break;
                case 3:
                case "year":
                    viewMode = 3;
                    break;
                case 2:
                case "month":
                    viewMode = 2;
                    break;
                case 1:
                case "day":
                    viewMode = 1;
                    break;
                case 0:
                case "hour":
                    viewMode = 0;
                    break
            }
            return viewMode
        },
        headTemplate: "<thead>" + "<tr>" + '<th class="prev"><i class="icon-ln_fanhui_a"/></th>' + '<th colspan="5" class="c_title"></th>' + '<th class="next"><i class="icon-ln_qianjin_a"/></th>' + "</tr>" + "</thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7"><fieldset><button type="button" class="fl close c_gray_777"></button><button type="button" class="fr today c_title"></button></fieldset></th></tr></tfoot>'
    };
    DateTimeGlobal.template = '<div class="ak-MultiDate dis_none">' + '<div class="minutes">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="hours">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="days">' + "<table>" + DateTimeGlobal.headTemplate + "<tbody></tbody>" + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="month">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="years">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + "</div>";
    $.fn.AKjs_MultiDate.DateTimeGlobal = DateTimeGlobal
} (jQuery));

/*-----------------------------------------------AKjs_NavMenu (2018-12-13)--------------------------------------------*/
(function($) {
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
} (jQuery));

/*-----------------------------------------------AKjs_NowTime (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_NowTime = function(setting) {
        var option = $.extend({
                dateStyle: 'yyyy-MM-dd hh:mm:ss'
            },
            setting);
        var time = this;
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        setInterval(function(){
            time.html(new Date().Format(option.dateStyle));
        },1000);
    };
} (jQuery));

/*-----------------------------------------------AKjs_Paginator (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Paginator = function (el, options) {
        if(!(this instanceof $.AKjs_Paginator)){
            return new $.AKjs_Paginator(el, options);
        }
        var self = this;
        self.$container = $(el);
        self.$container.data('AKjs_Paginator', self);
        self.init = function () {
            self.$container.addClass("ak-pagination");
            if (options.first_text) {
                var first_text = '<li class="ak_first">'+options.first_text+'</li>';
            }
            if (options.prev_text) {
                var prev_text = '<li class="ak_prev">'+options.prev_text+'</li>';
            }
            if (options.next_text) {
                var next_text = '<li class="ak_next">'+options.next_text+'</li>';
            }
            if (options.last_text) {
                var last_text = '<li class="ak_last">'+options.last_text+'</li>';
            }
            self.options = $.extend({}, {
                ak_first: first_text,
                ak_prev: prev_text,
                ak_next: next_text,
                ak_last: last_text,
                ak_page: '<li class="ak_page">{{ak_page}}</li>'
            }, options);
            self.verify();
            self.extendJquery();
            self.render();
            self.fireEvent(this.options.currentPage, 'init');
        };
        self.verify = function () {
            var opts = self.options;
            if (!self.isNumber(opts.totalPages)) {
                throw new Error('[AKjs_Paginator] type error: totalPages');
            }
            if (!self.isNumber(opts.totalCounts)) {
                throw new Error('[AKjs_Paginator] type error: totalCounts');
            }
            if (!self.isNumber(opts.pageSize)) {
                throw new Error('[AKjs_Paginator] type error: pageSize');
            }
            if (!self.isNumber(opts.currentPage)) {
                throw new Error('[AKjs_Paginator] type error: currentPage');
            }
            if (!self.isNumber(opts.visiblePages)) {
                throw new Error('[AKjs_Paginator] type error: visiblePages');
            }
            if (!opts.totalPages && !opts.totalCounts) {
                throw new Error('[AKjs_Paginator] totalCounts or totalPages is required');
            }
            if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
                throw new Error('[AKjs_Paginator] pageSize is required');
            }
            if (opts.totalCounts && opts.pageSize) {
                opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
            }
            if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
                throw new Error('[AKjs_Paginator] currentPage is incorrect');
            }
            if (opts.totalPages < 1) {
                throw new Error('[AKjs_Paginator] totalPages cannot be less currentPage');
            }
        };
        self.extendJquery = function () {
            $.fn.AKjs_PaginatorHTML = function (s) {
                return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
            };
        };
        self.render = function () {
            self.renderHtml();
            self.setStatus();
            self.bindEvents();
        };
        self.renderHtml = function () {
            var html = [];
            var pages = self.getPages();
            for (var i = 0, j = pages.length; i < j; i++) {
                html.push(self.buildItem('ak_page', pages[i]));
            }
            self.isEnable('ak_prev') && html.unshift(self.buildItem('ak_prev', self.options.currentPage - 1));
            self.isEnable('ak_first') && html.unshift(self.buildItem('ak_first', 1));
            self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
            self.isEnable('ak_next') && html.push(self.buildItem('ak_next', self.options.currentPage + 1));
            self.isEnable('ak_last') && html.push(self.buildItem('ak_last', self.options.totalPages));
            self.$container.html(html.join(''));
        };
        self.buildItem = function (type, pageData) {
            var html = self.options[type]
                .replace(/{{ak_page}}/g, pageData)
                .replace(/{{totalPages}}/g, self.options.totalPages)
                .replace(/{{totalCounts}}/g, self.options.totalCounts);
            return $(html).attr({
                'data-role': type,
                'data-index': pageData
            }).AKjs_PaginatorHTML();
        };
        self.setStatus = function () {
            var options = self.options;
            if (!self.isEnable('ak_first') || options.currentPage === 1) {
                $('[data-role=ak_first]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_prev') || options.currentPage === 1) {
                $('[data-role=ak_prev]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_next') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_next]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_last') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_last]', self.$container).addClass(options.disableClass);
            }
            $('[data-role=ak_page]', self.$container).removeClass(options.activeClass);
            $('[data-role=ak_page][data-index=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
        };
        self.getPages = function () {
            var pages = [],
                visiblePages = self.options.visiblePages,
                currentPage = self.options.currentPage,
                totalPages = self.options.totalPages;
            if (visiblePages > totalPages) {
                visiblePages = totalPages;
            }
            var half = Math.floor(visiblePages / 2);
            var start = currentPage - half + 1 - visiblePages % 2;
            var end = currentPage + half;
            if (start < 1) {
                start = 1;
                end = visiblePages;
            }
            if (end > totalPages) {
                end = totalPages;
                start = 1 + totalPages - visiblePages;
            }
            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }
            return pages;
        };
        self.isNumber = function (value) {
            var type = typeof value;
            return type === 'number' || type === 'undefined';
        };
        self.isEnable = function (type) {
            return self.options[type] && typeof self.options[type] === 'string';
        };
        self.switchPage = function (pageIndex) {
            self.options.currentPage = pageIndex;
            self.render();
        };
        self.fireEvent = function (pageIndex, type) {
            return (typeof self.options.onPageChange !== 'function') || (self.options.onPageChange(pageIndex, type, self.$container) !== false);
        };
        self.callMethod = function (method, options) {
            switch (method) {
                case 'option':
                    self.options = $.extend({}, self.options, options);
                    self.verify();
                    self.render();
                    break;
                case 'destroy':
                    self.$container.empty();
                    self.$container.removeData('AKjs_Paginator');
                    break;
                default :
                    throw new Error('[AKjs_Paginator] method "' + method + '" does not exist');
            }
            return self.$container;
        };
        self.bindEvents = function () {
            var opts = self.options;
            self.$container.off();
            self.$container.on('click', '[data-role]', function () {
                var $el = $(this);
                if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                    return;
                }
                var pageIndex = +$el.attr('data-index');
                if (self.fireEvent(pageIndex, 'change')) {
                    self.switchPage(pageIndex);
                }
            });
        };
        self.init();
        return self.$container;
    };
    $.AKjs_Paginator.defaultOptions = {
        first_text: 'First',
        prev_text: 'Previous',
        next_text: 'Next',
        last_text: 'Last',
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 4,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
    };
    $.fn.AKjs_Paginator = function () {
        var self = this,
            args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
            var $instance = $(self).data('AKjs_Paginator');
            if (!$instance) {
                throw new Error('[AKjs_Paginator] the element is not instantiated');
            } else {
                return $instance.callMethod(args[0], args[1]);
            }
        } else {
            return new $.AKjs_Paginator(this, args[0]);
        }
    };

} (jQuery));

/*-----------------------------------------------AKjs_PassLevel (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_PassLevel = function(setting) {
        var option = $.extend({
                O_color: "#cccccc",
                L_color: "#e85959",
                M_color: "#e85959",
                H_color: "#e85959",
                L_text: "L",
                M_text: "M",
                H_text: "H",
                callback: function() {}
            },
            setting);
        var pl = $(this);
        pl.each(function(){
            $(".ak-PassLevel").remove();
            $(this).after('<ul class="ak-PassLevel">' +
                '<li class="strength_L">'+option.L_text+'</li>' +
                '<li class="strength_M">'+option.M_text+'</li>' +
                '<li class="strength_H">'+option.H_text+'</li>' +
                '</ul>');
            $(this).nextAll(".ak-PassLevel").children("li").css('background-color', option.O_color);
            $(this).nextAll(".ak-PassLevel").hide();
            option.callback($(this),$(this).nextAll(".ak-PassLevel"),false);
            $(this).on('keyup', function(e) {
                $(this).nextAll(".ak-PassLevel").show();
                ak_pwStrength(this.value);
                $(this).nextAll(".ak-PassLevel").children(".strength_L").css('background-color', Lcolor);
                $(this).nextAll(".ak-PassLevel").children(".strength_M").css('background-color', Mcolor);
                $(this).nextAll(".ak-PassLevel").children(".strength_H").css('background-color', Hcolor);
                option.callback($(this),$(this).nextAll(".ak-PassLevel"),true);
                if ($(this).val() == 0) {
                    $(this).nextAll(".ak-PassLevel").hide();
                    option.callback($(this),$(this).nextAll(".ak-PassLevel"),false);
                }
            });
        });
        function ak_pwStrength(pwd) {
            if (pwd == null || pwd == '' || pwd == undefined) {
                Lcolor = Mcolor = Hcolor = option.O_color;
            } else {
                S_level = ak_checkStrong(pwd);
                switch (S_level) {
                    case 0:
                        Lcolor = Mcolor = Hcolor = option.O_color;
                        break;
                    case 1:
                        Lcolor = option.L_color;
                        Mcolor = Hcolor = option.O_color;
                        break;
                    case 2:
                        Lcolor = option.L_color;
                        Mcolor = option.M_color;
                        Hcolor = option.O_color;
                        break;
                    default:
                        Lcolor = option.L_color;
                        Mcolor = option.M_color;
                        Hcolor = option.H_color;
                        break;
                }
            }
            return true;
        }
        function ak_CharMode(iN) {
            if (iN >= 48 && iN <= 57)
                return 1;
            if (iN >= 65 && iN <= 90)
                return 2;
            if (iN >= 97 && iN <= 122)
                return 4;
            else return 8;
        }
        function ak_bitTotal(num) {
            modes = 0;
            for (i = 0; i < 4; i++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        }
        function ak_checkStrong(sPW) {
            if (sPW.length <= 4) return 0;
            Modes = 0;
            for (i = 0; i < sPW.length; i++) {
                Modes |= ak_CharMode(sPW.charCodeAt(i));
            }
            return ak_bitTotal(Modes);
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_PickupTime (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_PickupTime = function(setting) {
        var option = $.extend({
                dateleng: 6,
                width: "200px",
                boxheight: 5,
                minute: 0,
                speed: 500,
                dateflag: true,
                mouse: "click",
                selectedClass: "c_title",
                weeks_text: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                today_text: "Today",
                months_text:"-",
                days_text:"",
                callback:function(){}
            },
            setting);
        function ak_pickuptime(elem) {
            var obj = this;
            elem.on(option.mouse,function(){
                var $this = $(this);
                $this.toggleClass("ak-open");
                obj.init(0,function(data){
                    option.callback(data,$this);
                },elem);
            });
        }
        ak_pickuptime.prototype = {
            init: function(setuptime, data, elem) {
                this.setuptime = setuptime;
                this.run(data,elem);
            },
            marketgetTime: function() {
                var setuptime = this.setuptime;
                var nowtime = new Date();
                nowtime.setDate(nowtime.getDate() + setuptime);
                var Day = nowtime.getDay();
                var Hours = nowtime.getHours();
                var i = parseInt(Day);
                var weeks = option.weeks_text;
                var list = new Array();
                var Month, dates;
                for (var k = setuptime; k < option.dateleng + setuptime; k++) {
                    if (i == option.dateleng-1) {
                        i = 0;
                    }
                    if (k == 0) {
                        Month = nowtime.getMonth() + 1;
                        dates = nowtime.getDate();
                        list.push(Month + option.months_text + dates + option.days_text+" " + weeks[i] + " ("+option.today_text+")");
                    } else {
                        nowtime.setDate(nowtime.getDate() + 1);
                        Month = nowtime.getMonth() + 1;
                        dates = nowtime.getDate();
                        list.push(Month + option.months_text + dates + option.days_text+" " + weeks[i]);
                    }
                    i++;
                    dates++
                }
                list.push(Hours);
                return list
            },
            todoble: function(hours,half) {
                var minTmp = parseInt(option.minute.toString());
                var mins = half*minTmp<10?"0"+half*minTmp:half*minTmp;
                if (hours < 10) {
                    hours = "0" + hours + ":"+mins;
                } else {
                    hours = hours + ":"+mins;
                }
                return hours
            },
            run: function(data,elem) {
                var marketgetTime = this.marketgetTime();
                var li = "";
                for (var i = 0; i < 24; i++) {
                    if(parseInt(option.minute.toString()) === 0){
                        j = 0;
                        if (i <= marketgetTime[option.dateleng]) {
                            li += "<li class='disabled dis_none_im'>" + this.todoble(i,j) + "</li>"
                        } else {
                            if (i == Number(marketgetTime[option.dateleng]) + 1) {
                                li += "<li>" + this.todoble(i,j) + "</li>"
                            } else {
                                li += "<li>" + this.todoble(i,j) + "</li>"
                            }
                        }
                    }else{
                        for(var j = 0; j < 60/option.minute; j++){
                            if (i <= marketgetTime[option.dateleng]) {
                                li += "<li class='disabled dis_none_im'>" + this.todoble(i,j) + "</li>"
                            } else {
                                if (i == Number(marketgetTime[option.dateleng]) + 1) {
                                    li += "<li>" + this.todoble(i,j) + "</li>"
                                } else {
                                    li += "<li>" + this.todoble(i,j) + "</li>"
                                }
                            }
                        }
                    }

                }
                var template = "<div class='ak-PickupTime'>" +
                    "<ol class='scrollbar'>" ;
                for (var i = 0; i < option.dateleng; i++) {
                    if (i == 0) {
                        template += "<li class='"+option.selectedClass+"'>" + marketgetTime[i] + "</li>";
                    } else {
                        template += "<li>" + marketgetTime[i] + "</li>";
                    }
                }
                template += "</ol>";
                template += "<ul class='scrollbar'>" + li + "</ul></div>";

                if ($(".ak-PickupTime").length > 0) {
                    $(".ak-PickupTime").remove();
                }

                if ($('#ak-scrollview').length > 0) {
                    if ($(".ak-PickupTime").parents("dialog")[0] != undefined) {
                        $('main').append(template);
                    } else {
                        $('#ak-scrollview').append(template);
                    }
                } else {
                    $('body').append(template);
                }
                $(function () {
                    var $self = $(".ak-PickupTime");
                    $self.hide();
                    if (elem.hasClass("ak-open")) {
                        $self.slideDown(option.speed);
                        $("body").unbind("click");
                        setTimeout(function() {
                            $('body').bind('click', function(event) {
                                var evt = event.srcElement ? event.srcElement : event.target;
                                if($(evt).parents(".ak-PickupTime").length > 0) {
                                    return false;
                                } else {
                                    $self.slideUp(option.speed);
                                    elem.removeClass("ak-open");
                                    $self.removeClass("dis_block_im");
                                }
                            });
                        },option.speed);
                    } else {
                        $self.slideUp(option.speed);
                        $self.removeClass("dis_block_im");
                    }
                    select_list_css();
                    if (option.dateflag) {
                        $self.find("ol li").on("click", function() {
                            var index = $(this).index();
                            if ($(this).hasClass("disabled")) {
                                if (index != 0) {
                                    $(this).removeClass("dis_none_im");
                                } else {
                                    $(this).addClass("dis_none_im");
                                }
                            }
                            $(this).addClass(option.selectedClass).siblings().removeClass(option.selectedClass);
                        });
                    } else {
                        $self.find("ol").remove();
                        $self.find("ul").addClass("w_100");
                        $self.find("ul li").removeClass("disabled dis_none_im "+option.selectedClass);
                    }
                    $self.find("ul li").on("click", function() {
                        $(this).addClass(option.selectedClass).siblings().removeClass(option.selectedClass);
                        var $data_text =$self.find("ol").find('.' + option.selectedClass.replace(" ","."));
                        var text = $data_text.text() + " " + $(this).text();
                        setTimeout(function() {
                            $self.slideUp(option.speed);
                            elem.removeClass("ak-open");
                            $self.removeClass("dis_block_im");
                        },option.speed);
                        if (Object.prototype.toString.call(data) === "[object Function]") {
                            data(text);
                        } else {
                            return false;
                        }
                    });
                });
                function select_list_css() {
                    var $self = $(".ak-PickupTime");
                    var this_h = elem.outerHeight();
                    if (option.boxheight) {
                        $self.css({
                            "width": option.width,
                            "max-height": $self.find("ul li").eq(0).outerHeight() * option.boxheight
                        });
                        $self.children().css({
                            "height": $self.find("ul li").eq(0).outerHeight() * option.boxheight
                        });
                    } else {
                        $self.css({
                            "width": option.width,
                            "max-height": $self.find("ul li").eq(0).outerHeight() * 5
                        });
                        $self.children().css({
                            "height": $self.find("ul li").eq(0).outerHeight() * 5
                        });
                    }
                    if (elem.offset().top + elem.innerHeight()+ $self.innerHeight() > $(window).height()) {
                        $self.css({
                            "top": "auto",
                            "bottom": $("#ak-scrollview").outerHeight() - (elem.offset().top + $('#ak-scrollview').scrollTop()) + elem.outerHeight() + $("#ak-scrollview").offset().top - this_h -8,
                            "left": elem.offset().left - $("#ak-scrollview").offset().left
                        });
                    } else {
                        $self.css({
                            "bottom": "auto",
                            "left": elem.offset().left - $("#ak-scrollview").offset().left
                        });
                        if ($('#ak-scrollview').length > 0) {
                            if (elem.parents("dialog")[0] != undefined) {
                                $self.css({
                                    "top": elem.offset().top -$("#ak-scrollview").offset().top + this_h
                                });
                            } else {
                                $self.css({
                                    "top": elem.offset().top + $('#ak-scrollview').scrollTop() - $("#ak-scrollview").offset().top + this_h
                                });
                            }
                        } else {
                            $self.css({
                                "top": elem.offset().top + elem.innerHeight() + 1
                            });
                        }
                    }
                }
            }
        };
        new ak_pickuptime($(this));
    };
} (jQuery));

/*-----------------------------------------------AKjs_Popupwin (2018-12-13)--------------------------------------------*/
function AKjs_Popupwin (setting) {
    option = $.extend({
        dom: "",
        position: "",
        effectIn: "",
        effectOut: "",
        hasMask: true,
        closeBtn: "",
        OneButton: "",
        maskPosition: "",
        toggleIcon: "",
        callback :function () {},
        scrollback :function () {}
    },setting);
    setPopupStyle();
    $(window).resize(function(){
        setPopupStyle();
    });
    var setTimes = 100;
    if (option.OneButton) {
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function() {
            option.callback($(option),false);
            ClickHideModal();
        });
        AKjs_UserAgent();
        $(option.OneButton).toggleClass("ak-is_active");
        if ($(option.OneButton).hasClass("ak-is_active")) {
            setPopupStyle();
            setTimeout(function() {
                if (option.hasMask) {
                    addModalMask();
                    $("#ak-scrollview").removeClass("scrolling_touch");
                }
                if (option.position === 'offset') {
                    if (IsMobile) {
                        var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        olw = 0;
                    } else {
                        var isOth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight() - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop();
                        if (isOth > $("#ak-scrollview").outerHeight()) {
                            var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        } else {
                            var oth = isOth;
                        }
                        olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left;
                        if ($(window).width() - olw > 0) {
                            olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left - $(option.dom).outerWidth();
                        }
                    }
                    $(option.dom).css({
                        "top": oth,
                        "left": olw
                    });
                    $(window).resize(function(){
                        $(option.dom).addClass("dis_none");
                        ClickHideModal();
                    });
                }
                if (option.effectIn || option.effectOut) {
                    $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
                }
                if (option.toggleIcon) {
                    if (option.position != 'offset') {
                        $(option.OneButton).find("i").attr("data-icon",$(option.OneButton).find("i").attr("class"));
                        $(option.OneButton).find("i").removeClass($(option.OneButton).find("i").attr("class")).addClass(option.toggleIcon);
                    }
                }
                option.callback($(option),true);
            },setTimes);
        } else {
            option.callback($(option),false);
            ClickHideModal();
        }
    } else {
        if (option.effectIn || option.effectOut) {
            $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
        }
        if (option.hasMask) {
            addModalMask();
            $("#ak-scrollview").removeClass("scrolling_touch");
        }
        option.callback($(option),true);
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function(ec) {
            ec.preventDefault();
            option.callback($(option),false);
            ClickHideModal();
        });
    }
    $("#ak-scrollview").scroll(function(sc){
        sc.preventDefault();
        option.scrollback($(option));
        $('#popup_mask').fadeOut().remove();
        if (option.OneButton) {
            var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
            $(option.dom).css({
                top: scrollHeight
            });
            $(option.OneButton).removeClass("ak-is_active");
        }
    });
    function addModalMask() {
        $('#popup_mask').remove();
        if ($("#popup_mask").length < 1) {
            $("main").append('<div id="popup_mask" class="ak-mask"></div>');
            $('#popup_mask').show();
            $("#popup_mask").unbind("click");
            $("#popup_mask").on('click', function() {
                option.callback($(option),false);
                ClickHideModal();
            });
            $('#popup_mask').bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            if (option.maskPosition) {
                $('#popup_mask').css({
                    "z-index": option.maskPosition
                });
                if (option.position === 'offset') {
                    var otm = $(option.OneButton).offset().top;
                    var ohm = $(option.OneButton).outerHeight();
                    $('#popup_mask').css({
                        "top": otm + ohm
                    });
                }
            }
        }
    }
    function setPopupStyle() {
        var ww = $(window).width();
        var wh = $(window).height();
        if (option.dom) {
            var dw = $(option.dom).outerWidth();
            var dh = $(option.dom).outerHeight();
            $(option.dom).css({
                "position": "fixed",
                "background": "transparent",
                "z-index": parseInt(option.maskPosition) + 1
            });
            if (option.position === 'top') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": 0
                });
            } else if (option.position === 'bottom') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "bottom": 0
                });
            } else if (option.position === 'left') {
                $(option.dom).css({
                    "left": 0,
                    "top": 0
                });
            } else if (option.position === 'right') {
                $(option.dom).css({
                    "right": 0,
                    "top": 0
                });
            } else if (option.position === 'middle') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": (wh / 2) - (dh / 2)
                });
            }
        }
    }
    function ClickHideModal(){
        if (option.OneButton) {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
            $(option.OneButton).find("i").removeClass(option.toggleIcon).addClass($(option.OneButton).find("i").attr("data-icon"));
        } else {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
        }
        var effectTime = option.effectOut;
        effectStr = effectTime.substring(effectTime.indexOf('ani_')+3,effectTime.lastIndexOf('s'));
        if (effectStr.indexOf("_0") != -1) {
            effectStr = effectStr.replace("_0","_0.");
        }
        effectStr = effectStr.substr(1);
        var ani_css = new RegExp("ani_");
        if(ani_css.test(effectTime)) {
            var setTimeouts = effectStr*1000+setTimes;
        } else {
            var setTimeouts = 1000;
        }
        setTimeout(function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            $(option.OneButton).removeClass("ak-is_active");
            $('#popup_mask').fadeOut().remove();
            $(option.dom).addClass("dis_none");
        },setTimeouts);
    }
}

/*-----------------------------------------------AKjs_PortraitImage (2018-12-13)--------------------------------------------*/
(function($) {
    var option = {};
    $.fn.AKjs_PortraitImage = function(setting) {
        var op = $.extend({
                errorTip: "",
                btn_ok: "",
                box_title: "",
                addCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        setTimeout(function() {
                pimg.each(function() {
                    $(this).addClass("ak-PortraitImage");
                    $(this).find("input[type=file]").attr("accept", "image/*");
                    $(this).bind("change",
                        function() {
                            ak_PortraitFilePrvid($(this).children("input")[0], op)
                        });
                    $(this).children("figure").css({
                        "margin-top": (pimg.outerWidth() / 3 / 2)
                    })
                })
            },
            200);
        $(window).resize(function() {
            pimg.children("figure").css({
                "margin-top": (pimg.outerWidth() / 3 / 2)
            })
        })
    };
    function ak_PortraitFilePrvid(file, op) {
        var tip = op.errorTip;
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) {
            for (var i = 0,
                     f; f = file.files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_PortraitValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            title: op.box_title
                        })
                    } else {
                        ak_PortraitShowImg(src, file)
                    }
                };
                fr.readAsDataURL(f)
            }
        } else {
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    title: op.box_title
                })
            } else {
                ak_PortraitShowImg(file.value, file)
            }
        }
        function ak_PortraitValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e
                }
            }
            return null
        }
        function ak_PortraitShowImg(src, id) {
            var figure = "<img src=" + src + ">";
            $(id).next().remove("i");
            $(id).next().html(figure);
            $(id).unbind("click");
            $(id).click(function() {
                $(id).parent().children("img").attr("src", src)
            });
            option.addCallbak($(id).next().find("img"));
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_PreviewImage  (2018-12-13)--------------------------------------------*/
(function($) {
    var option = {};
    $.fn.AKjs_PreviewImage = function(setting) {
        var op = $.extend({
                uploadNum: 0,
                webToast: "",
                messege: "",
                btn_ok: "",
                btn_cancel: "",
                box_title: new Array(),
                delbtnClass: "",
                box_icon: new Array(),
                Class: "",
                Del_icon: "",
                length: 4,
                length_title: "",
                size: 5,
                size_title: "",
                errorTip: "",
                addCallbak: function() {},
                delCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        pimg.addClass("ak-previewImage");
        $(option.delbtnClass).hide();
        pimg.find("input[type=file]").attr("accept", "image/*");
        pimg.children("i").addClass(option.box_icon[0]);
        pimg.each(function() {
            $(option.delbtnClass).unbind("click");
            $(option.delbtnClass).click(function(e) {
                if ($(option.delbtnClass).hasClass("ak-is_active")) {
                    $(option.delbtnClass).parents("ul").find("li span").hide();
                    $(option.delbtnClass).removeClass("ak-is_active")
                } else {
                    $(option.delbtnClass).parents("ul").find("li span").show();
                    $(option.delbtnClass).addClass("ak-is_active")
                }
            })
        });
        pimg.bind("change",
            function() {
                if (option.uploadNum == op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000);
                    return false
                }
                var tempData = $(this).children("input")[0];
                if ((option.uploadNum + tempData.files.length) > op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000)
                }
                var tempFiles = [];
                for (var i = 0; i < (op.length - option.uploadNum); i++) {
                    if (tempData.files[i] != null && tempData.files[i] != undefined) {
                        if (tempData.files[i].size > op.size * 1024 * 1024) {
                            AKjs_WebToast(op.size_title + op.size + "MB", "middle", "mask", 3000);
                            return false
                        }
                    }
                    tempFiles.push(tempData.files[i])
                }
                file_prvid(tempData, tempFiles, op)
            });
        var figure_wh = $(this).outerWidth();
        var figure_m = $(this).outerWidth() / 3;
        pimg.children("figure").css({
            "width": figure_wh - figure_m,
            "height": figure_wh - figure_m,
            "line-height": figure_wh - figure_m + "px",
            "margin-top": (figure_m / 2) - 2
        })
    };
    function file_prvid(file, files, op) {
        var tip = op.errorTip;
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) {
            for (var i = 0,
                     f; f = files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_ValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            button_cancel: op.btn_cancel,
                            title: op.box_title[1]
                        });
                        return false
                    } else {
                        showPrvImg(src, file);
                        op.uploadNum++
                    }
                };
                fr.readAsDataURL(f)
            }
        } else {
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    button_cancel: op.btn_cancel,
                    title: op.box_title[1]
                });
                return false
            } else {
                showPrvImg(file.value, file);
                op.uploadNum++
            }
        }
        function ak_ValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e
                }
            }
            return null
        }
        function showPrvImg(src, id) {
            var imgList = "<li class='rel fl mb_5'>" + "<figure class='img_auto " + option.Class + "' style='background-color: #eeeeee !important;'>" + "<img src=" + src + " />" + "</figure>" + "<span class='pointer top_0 abs wh_12em line_h_12em text_14em text_al_c bor_rad_50 c_white " + option.Del_icon + "' style='background-color: rgba(255,0,0,1); z-index: 1'>" + "</span>" + "</li>";
            $(id).parents("li").before(imgList);
            $(option.delbtnClass).show();
            var showPrvImg_li = $(id).parents("li");
            option.addCallbak(showPrvImg_li.parent());
            var delbtn = showPrvImg_li.parent().find("li").find("span");
            delbtn.hide().css({
                "margin-top": "-" + delbtn.height() / 3 + "px",
                "left": showPrvImg_li.parent().find("figure").width() - (delbtn.width() / 2)
            });
            delbtn.unbind("click");
            delbtn.click(function() {
                var image = $(this);
                $ak.confirm(option.messege, {
                    icon: "question",
                    button_ok: option.btn_ok,
                    button_cancel: option.btn_cancel,
                    title: option.box_title[0],
                    onSubmit: function(res) {
                        option.delCallbak(image.parent("li"));
                        option.uploadNum--;
                        if (option.uploadNum < 1) {
                            $(option.delbtnClass).hide();
                        }
                        AKjs_WebToast(option.webToast, "bottom", 1000)
                    }
                })
            })
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Print (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Print = $.fn.AKjs_Print = function() {
        var options, $this, self = this;
        if (self instanceof $) {
            self = self.get(0);
        }
        if (PrintIsNode(self)) {
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                $this = $(arguments[0]);
                if (PrintIsNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                $this = $("html");
            }
        }
        var defaults = {
            iframe: false,
            noPrint: "",
            callback: function() {},
            deferred: $.Deferred()
        };
        options = $.extend({},
            defaults, (options || {}));
        var $styles = $("style, link, meta, title");
        var copy = $this.clone();
        copy = $("<span/>").append(copy);
        copy.find(options.noPrint).remove();
        options.callback(copy);
        copy.append($styles.clone());
        var content = copy.html();
        copy.remove();
        if (options.iframe) {
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    $iframe = $('<iframe height="0" width="0" frameborder="0" name="Opaque"/>').prependTo('body').css({
                        "position": "absolute",
                        "top": -999,
                        "left": -999
                    });
                }
                var w, wdoc;
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                PrintFrame(w).done(function() {
                    setTimeout(function() {
                        if (iframeCount === 0) {
                            $iframe.remove();
                        }
                    }, 100);
                }).fail(function(err) {
                    console.error("Failed to print from iframe", err);
                    PrintContentInNewWindow(content);
                }).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            } catch(e) {
                console.error("Failed to print from iframe", e.stack, e.message);
                PrintContentInNewWindow(content).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            }
        } else {
            PrintContentInNewWindow(content).always(function() {
                try {
                    options.deferred.resolve();
                } catch(err) {
                    console.warn('Error notifying deferred', err);
                }
            });
        }
        return this;
    };
    function PrintFrame(frameWindow) {
        var def = $.Deferred();
        try {
            setTimeout(function() {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('AKjs_Print', false, null)) {
                        frameWindow.print();
                    }
                } catch(e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch(err) {
            def.reject(err);
        }
        return def;
    }
    function PrintContentInNewWindow(content) {
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return PrintFrame(w);
    }
    function PrintIsNode(o) {
        return !! (typeof Node === "object" ? o instanceof Node: o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
} (jQuery));

/*-----------------------------------------------AKjs_ProductPhoto (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ProductPhoto = function(setting) {
        var option = $.extend({
                data: [],
                large_height: "20em",
                small_size: "5em",
                btn_width: "3em",
                btn_height: "",
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
            if (option.data.length > 0) {
                $this.html("<div class=\"ak-large_box\"><ul></ul></div>" +
                    "<div class=\"ak-small_box\">" +
                    "<button class=\"ak-is_prev\"><i class=\"icon-ln_fanhui_a\"></i></button>" +
                    "<div>" +
                    "<ol></ol>" +
                    "</div>" +
                    "<button class=\"ak-is_next\"><i class=\"icon-ln_qianjin_a\"></i></button>" +
                    "</div>");
            }
            var $large_elem = $(this).children(".ak-large_box");
            var $large_list = $(this).children(".ak-large_box").children("ul");
            var $small_elem = $(this).children(".ak-small_box");
            var $small_list = $(this).children(".ak-small_box").children("div");
            if (option.data.length > 0) {
                var large_tmp = "";
                var small_tmp = "";
                for (var i = 0; i < option.data.length; i++) {
                    large_tmp += '<li data-id="' + option.data[i].id + '"><img src="' + option.data[i].small + '" /></li>';
                    small_tmp += '<li data-id="' + option.data[i].id + '"><figure><img src="' + option.data[i].small + '" /></figure></li>';
                }
                $large_list.html(large_tmp);
                $small_list.children("ol").html(small_tmp);
            }
            $(window).resize(function () {
                var w = $small_list.find("li").outerWidth();
                var ChangeBtn = $small_elem.children("button");
                $small_list.css({
                    "width":w * option.vis
                });
                ChangeBtn.css({
                    "width": option.btn_width,
                    "height": option.btn_height
                });
                $small_list.css({
                    "width":w * option.vis,
                    "margin-left": ChangeBtn.outerWidth()
                });
                $small_elem.css({
                    "width": $small_list.outerWidth() + (ChangeBtn.outerWidth()*2),
                    "height": option.small_size
                });
                $large_elem.css({
                    "width":$small_elem.outerWidth(),
                    "height":option.large_height
                });
            });
            var t = 0;
            $large_list.children("li").eq(0).show();
            $small_list.find("li").css({
                "width":option.small_size
            });
            $small_list.find("li").eq(0).addClass("ak-is_active");
            $small_list.find("li").eq(0).children().addClass(option.state);
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
            $small_list.css({
                "width":w * option.vis
            });
            $small_list.children("ol").css({
                "width": l * w
            });
            ChangeBtn.css({
                "width": option.btn_width,
                "height": option.btn_height
            });
            $small_list.css({
                "width":w * option.vis,
                "margin-left": option.btn_width
            });
            $small_elem.css({
                "width": $small_list.outerWidth() + (ChangeBtn.outerWidth()*2),
                "height": option.small_size
            });
            $large_elem.css({
                "width":$small_elem.outerWidth(),
                "height":option.large_height
            });
            $small_list.find("li").children().css({
                "height":$small_list.outerHeight()-4
            });
            $this.removeClass("dis_none dis_none_im");
            $small_list.find("li").unbind("click");
            $small_list.find("li").click(function() {
                $(this).addClass("ak-is_active").siblings().removeClass("ak-is_active");
                t = $(this).index();
                Img($(this).index());
                $small_list.find("li").children().removeClass(option.state);
                $(this).children().addClass(option.state);
                option.changeback($large_list.children("li").eq($(this).index()), $(this), $(this).index());
            });
            $small_elem.children(".ak-is_prev").unbind("click");
            $small_elem.children(".ak-is_prev").click(function() {
                var i;
                $small_list.find("li").each(function(index) {
                    if ($(this).hasClass("ak-is_active")) {
                        i = index;
                        $(this).children().addClass(option.state);
                    } else {
                        $(this).children().removeClass(option.state);
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
                        $(this).children().addClass(option.state);
                    } else {
                        $(this).children().removeClass(option.state);
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
                $small_list.find("li").children().removeClass(option.state);
                $small_list.find("li").eq(i).children().addClass(option.state);
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
} (jQuery));

/*-----------------------------------------------AKjs_Progress (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.extend({
        AKjs_Progress: function(options) {
            var defaults = {
                goalAmount: 100,
                currentAmount: 50,
                speed: 1000,
                ColorStyle: "",
                textBefore: "",
                textAfter: "",
                milestoneNumber: 70,
                milestoneClass: "",
                callback: function() {}
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var obj = $(this);
                var goalAmountParsed = parseInt(defaults.goalAmount);
                if (obj.attr("data-to")) {
                    var currentAmountParsed = parseInt(obj.attr("data-to"))
                } else {
                    var currentAmountParsed = parseInt(defaults.currentAmount)
                }
                var percentage = (currentAmountParsed / goalAmountParsed) * 100;
                var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? " " + defaults.milestoneClass: "";
                if (defaults.textAfter) {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "<em>" + currentAmountParsed + "</em>" + defaults.textAfter + "</span></li>"
                } else {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "</span></li>"
                }
                var progressBarWrapped = '<ol class="bg_in h_in dis_block_im ovh">' + progressBar + "</ol>";
                obj.html(progressBarWrapped);
                var rendered = obj.children("ol").children("li");
                rendered.each(function() {
                    obj.find(".ak-progressBar").addClass(defaults.ColorStyle);
                    $(this).html($(this).html().replace(/\s/g, " "));
                    setTimeout(function() {
                            rendered.find("span").show().css({
                                "line-height": rendered.height() + 2 + "px"
                            });
                            obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                        },
                        300);
                    $(window).resize(function() {
                        rendered.find("span").show().css({
                            "line-height": rendered.height() + 2 + "px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                    })
                });
                rendered.animate({
                        width: percentage + "%"
                    },
                    {
                        duration: defaults.speed,
                        step: function(now, fx) {
                            if (obj.attr("data-from")) {
                                fx.start = parseInt(obj.attr("data-from"))
                            } else {
                                fx.start = 0
                            }
                            rendered.find("em").text(parseInt(fx.now))
                        }
                    });
                setTimeout(function() {
                        $(rendered).parent().addClass(milestoneNumberClass)
                    },
                    defaults.speed);
                defaults.callback.call($(this))
            })
        }
    })
} (jQuery));

/*-----------------------------------------------AKjs_QRcode (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_QRcode = function(options) {
        var QRMode;
        function QR8bitByte(data) {
            this.mode = QRMode;
            this.data = data
        }
        function QRCode(typeNumber, errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }
        function QRPolynomial(num, shift) {
            if (void 0 == num.length) throw Error(num.length + "/" + shift);
            for (var offset = 0; offset < num.length && 0 == num[offset];) offset++;
            this.num = Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset]
        }
        function QRRSBlock(totalCount, dataCount) {
            this.totalCount = totalCount;
            this.dataCount  = dataCount;
        }
        function QRBitBuffer() {
            this.buffer = [];
            this.length = 0
        }
        QR8bitByte.prototype = {
            getLength: function() {
                return this.data.length
            },
            write: function(buffer) {
                for (var i = 0; i < this.data.length; i++) buffer.put(this.data.charCodeAt(i), 8)
            }
        };
        QRCode.prototype = {
            addData: function(data) {
                this.dataList.push(new QR8bitByte(data));
                this.dataCache = null
            },
            isDark: function(row, col) {
                if (0 > row || this.moduleCount <= row || 0 > col || this.moduleCount <= col) throw Error(row + "," + col);
                return this.modules[row][col]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                if (1 > this.typeNumber) {
                    for (var typeNumber = 1,
                             typeNumber = 1; 40 > typeNumber; typeNumber++) {
                        for (var data = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel), buffer = new QRBitBuffer, totalDataCount = 0, rsBlocks = 0; rsBlocks < data.length; rsBlocks++) totalDataCount += data[rsBlocks].dataCount;
                        for (i = 0; i < this.dataList.length; i++) data = this.dataList[i],
                            buffer.put(data.mode, 4),
                            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)),
                            data.write(buffer);
                        if (buffer.getLengthInBits() <= 8 * totalDataCount) break
                    }
                    this.typeNumber = typeNumber
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(test, maskPattern) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test, maskPattern);
                7 <= this.typeNumber && this.setupTypeNumber(test);
                null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, maskPattern)
            },
            setupPositionProbePattern: function(row, col) {
                for (var r = -1; 7 >= r; r++) if (! ( - 1 >= row + r || this.moduleCount <= row + r)) for (var b = -1; 7 >= b; b++) - 1 >= col + b || this.moduleCount <= col + b || (this.modules[row + r][col + b] = 0 <= r && 6 >= r && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == r || 6 == r) || 2 <= r && 4 >= r && 2 <= b && 4 >= b ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var minLostPoint = 0,
                         pattern = 0,
                         i = 0; 8 > i; i++) {
                    this.makeImpl(!0, i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (0 == i || minLostPoint > lostPoint) minLostPoint = lostPoint,
                        pattern = i
                }
                return pattern
            },
            createMovieClip: function(target_mc, instance_name, depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++)
                    for (
                        var y = cs * row,
                             col = 0; col < this.modules[row].length; col++) {
                    var x = cs * col;
                    this.modules[row][col] && (qr_mc.beginFill(0, 100), qr_mc.moveTo(x, y), qr_mc.lineTo(x + cs, y), qr_mc.lineTo(x + cs, y + cs), qr_mc.lineTo(x, y + cs), qr_mc.endFill())
                }
                return qr_mc
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            },
            setupPositionAdjustPattern: function() {
                for (var pos = QRUtil.getPatternPosition(this.typeNumber), c = 0; c < pos.length; c++) for (var d = 0; d < pos.length; d++) {
                    var row = pos[c],
                        col = pos[d];
                    if (null == this.modules[row][col]) for (var f = -2; 2 >= f; f++) for (var i = -2; 2 >= i; i++) this.modules[row + f][col + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                }
            },
            setupTypeNumber: function(test) {
                for (var bits = QRUtil.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var mod = !test && 1 == (bits >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = mod
                }
                for (d = 0; 18 > d; d++) mod = !test && 1 == (bits >> d & 1),
                    this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = mod
            },
            setupTypeInfo: function(test, maskPattern) {
                for (var data = QRUtil.getBCHTypeInfo(this.errorCorrectLevel << 3 | maskPattern), i = 0; 15 > i; i++) {
                    var mod = !test && 1 == (data >> i & 1);
                    6 > i ? this.modules[i][8] = mod: 8 > i ? this.modules[i + 1][8] = mod: this.modules[this.moduleCount - 15 + i][8] = mod
                }
                for (i = 0; 15 > i; i++) mod = !test && 1 == (data >> i & 1),
                    8 > i ? this.modules[8][this.moduleCount - i - 1] = mod: 9 > i ? this.modules[8][15 - i - 1 + 1] = mod: this.modules[8][15 - i - 1] = mod;
                this.modules[this.moduleCount - 8][8] = !test
            },
            mapData: function(data, maskPattern) {
                for (var inc = -1,
                         row = this.moduleCount - 1,
                         bitIndex = 7,
                         byteIndex = 0,
                         col = this.moduleCount - 1; 0 < col; col -= 2) for (6 == col && col--;;) {
                    for (var g = 0; 2 > g; g++) if (null == this.modules[row][col - g]) {
                        var dark = !1;
                        byteIndex < data.length && (dark = 1 == (data[byteIndex] >>> bitIndex & 1));
                        QRUtil.getMask(maskPattern, row, col - g) && (dark = !dark);
                        this.modules[row][col - g] = dark;
                        bitIndex--; - 1 == bitIndex && (byteIndex++, bitIndex = 7)
                    }
                    row += inc;
                    if (0 > row || this.moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break
                    }
                }
            }
        };
        QRCode.PAD0 = 236;
        QRCode.PAD1 = 17;
        QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
            for (var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel), buffer = new QRBitBuffer, e = 0; e < dataList.length; e++) {
                var data = dataList[e];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                data.write(buffer)
            }
            for (e = typeNumber = 0; e < rsBlocks.length; e++) typeNumber += rsBlocks[e].dataCount;
            if (buffer.getLengthInBits() > 8 * typeNumber) throw Error("code length overflow. (" + buffer.getLengthInBits() + ">" + 8 * typeNumber + ")");
            for (buffer.getLengthInBits() + 4 <= 8 * typeNumber && buffer.put(0, 4); 0 != buffer.getLengthInBits() % 8;) buffer.putBit(!1);
            for (; ! (buffer.getLengthInBits() >= 8 * typeNumber);) {
                buffer.put(QRCode.PAD0, 8);
                if (buffer.getLengthInBits() >= 8 * typeNumber) break;
                buffer.put(QRCode.PAD1, 8)
            }
            return QRCode.createBytes(buffer, rsBlocks)
        };
        QRCode.createBytes = function(buffer, rsBlocks) {
            for (var offset = 0,
                     maxDcCount = 0,
                     maxEcCount = 0,
                     dcdata = Array(rsBlocks.length),
                     ecdata = Array(rsBlocks.length),
                     g = 0; g < rsBlocks.length; g++) {
                var dcCount = rsBlocks[g].dataCount,
                    ecCount = rsBlocks[g].totalCount - dcCount,
                    maxDcCount = Math.max(maxDcCount, dcCount),
                    maxEcCount = Math.max(maxEcCount, ecCount);
                dcdata[g] = Array(dcCount);
                for (var rsPoly = 0; rsPoly < dcdata[g].length; rsPoly++) dcdata[g][rsPoly] = 255 & buffer.buffer[rsPoly + offset];
                offset += dcCount;
                rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                dcCount = (new QRPolynomial(dcdata[g], rsPoly.getLength() - 1)).mod(rsPoly);
                ecdata[g] = Array(rsPoly.getLength() - 1);
                for (rsPoly = 0; rsPoly < ecdata[g].length; rsPoly++) ecCount = rsPoly + dcCount.getLength() - ecdata[g].length,
                    ecdata[g][rsPoly] = 0 <= ecCount ? dcCount.get(ecCount) : 0
            }
            for (rsPoly = g = 0; rsPoly < rsBlocks.length; rsPoly++) g += rsBlocks[rsPoly].totalCount;
            offset = Array(g);
            for (rsPoly = dcCount = 0; rsPoly < maxDcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < dcdata[g].length && (offset[dcCount++] = dcdata[g][rsPoly]);
            for (rsPoly = 0; rsPoly < maxEcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < ecdata[g].length && (offset[dcCount++] = ecdata[g][rsPoly]);
            return offset
        };
        QRMode = 4;
        for (var QRUtil = {
                PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function(data) {
                    for (var c = data << 10; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);) c ^= QRUtil.G15 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);
                    return (data << 10 | c) ^ QRUtil.G15_MASK
                },
                getBCHTypeNumber: function(data) {
                    for (var c = data << 12; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);) c ^= QRUtil.G18 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);
                    return data << 12 | c
                },
                getBCHDigit: function(data) {
                    for (var digit = 0; 0 != data;) digit++,
                        data >>>= 1;
                    return digit
                },
                getPatternPosition: function(typeNumber) {
                    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]
                },
                getMask: function(maskPattern, c, d) {
                    switch (maskPattern) {
                        case 0:
                            return 0 == (c + d) % 2;
                        case 1:
                            return 0 == c % 2;
                        case 2:
                            return 0 == d % 3;
                        case 3:
                            return 0 == (c + d) % 3;
                        case 4:
                            return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                        case 5:
                            return 0 == c * d % 2 + c * d % 3;
                        case 6:
                            return 0 == (c * d % 2 + c * d % 3) % 2;
                        case 7:
                            return 0 == (c * d % 3 + (c + d) % 2) % 2;
                        default:
                            throw Error("bad maskPattern:" + maskPattern);
                    }
                },
                getErrorCorrectPolynomial: function(errorCorrectLength) {
                    for (var c = new QRPolynomial([1], 0), d = 0; d < errorCorrectLength; d++) c = c.multiply(new QRPolynomial([1, QRMath.gexp(d)], 0));
                    return c
                },
                getLengthInBits: function(mode, type) {
                    if (1 <= type && 10 > type) switch (mode) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case 4:
                            return 8;
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + mode);
                    } else if (27 > type) switch (mode) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case 4:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + mode);
                    } else if (41 > type) switch (mode) {
                        case 1:
                            return 14;
                        case 2:
                            return 13;
                        case 4:
                            return 16;
                        case 8:
                            return 12;
                        default:
                            throw Error("mode:" + mode);
                    } else throw Error("type:" + type);
                },
                getLostPoint: function(qrCode) {
                    for (var moduleCount = qrCode.getModuleCount(), d = 0, b = 0; b < moduleCount; b++) for (var e = 0; e < moduleCount; e++) {
                        for (var f = 0,
                                 i = qrCode.isDark(b, e), g = -1; 1 >= g; g++) if (! (0 > b + g || moduleCount <= b + g)) for (var h = -1; 1 >= h; h++) 0 > e + h || moduleCount <= e + h || 0 == g && 0 == h || i == qrCode.isDark(b + g, e + h) && f++;
                        5 < f && (d += 3 + f - 5)
                    }
                    for (b = 0; b < moduleCount - 1; b++) for (e = 0; e < moduleCount - 1; e++) if (f = 0, qrCode.isDark(b, e) && f++, qrCode.isDark(b + 1, e) && f++, qrCode.isDark(b, e + 1) && f++, qrCode.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
                    for (b = 0; b < moduleCount; b++) for (e = 0; e < moduleCount - 6; e++) qrCode.isDark(b, e) && !qrCode.isDark(b, e + 1) && qrCode.isDark(b, e + 2) && qrCode.isDark(b, e + 3) && qrCode.isDark(b, e + 4) && !qrCode.isDark(b, e + 5) && qrCode.isDark(b, e + 6) && (d += 40);
                    for (e = 0; e < moduleCount; e++) for (b = 0; b < moduleCount - 6; b++) qrCode.isDark(b, e) && !qrCode.isDark(b + 1, e) && qrCode.isDark(b + 2, e) && qrCode.isDark(b + 3, e) && qrCode.isDark(b + 4, e) && !qrCode.isDark(b + 5, e) && qrCode.isDark(b + 6, e) && (d += 40);
                    for (e = f = 0; e < moduleCount; e++) for (b = 0; b < moduleCount; b++) qrCode.isDark(b, e) && f++;
                    qrCode = Math.abs(100 * f / moduleCount / moduleCount - 50) / 5;
                    return d + 10 * qrCode
                }
            },
                 QRMath = {
                     glog: function(n) {
                         if (1 > n) throw Error("glog(" + n + ")");
                         return QRMath.LOG_TABLE[n]
                     },
                     gexp: function(n) {
                         for (; 0 > n;) n += 255;
                         for (; 256 <= n;) n -= 255;
                         return QRMath.EXP_TABLE[n]
                     },
                     EXP_TABLE: Array(256),
                     LOG_TABLE: Array(256)
                 },
                 m = 0; 8 > m; m++) QRMath.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++) QRMath.EXP_TABLE[m] = QRMath.EXP_TABLE[m - 4] ^ QRMath.EXP_TABLE[m - 5] ^ QRMath.EXP_TABLE[m - 6] ^ QRMath.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[m]] = m;
        QRPolynomial.prototype = {
            get: function(index) {
                return this.num[index]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var num = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) for (var b = 0; b < a.getLength(); b++) num[d + b] ^= QRMath.gexp(QRMath.glog(this.get(d)) + QRMath.glog(a.get(b)));
                return new QRPolynomial(num, 0)
            },
            mod: function(a) {
                if (0 > this.getLength() - a.getLength()) return this;
                for (var c = QRMath.glog(this.get(0)) - QRMath.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++) d[b] ^= QRMath.gexp(QRMath.glog(a.get(b)) + c);
                return (new QRPolynomial(d, 0)).mod(a)
            }
        };
        QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
            if (void 0 == rsBlock) throw Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            for (var length = rsBlock.length / 3,
                     list = [], f = 0; f < length; f++) for (var h = rsBlock[3 * f + 0], g = rsBlock[3 * f + 1], QRUtil = rsBlock[3 * f + 2], QRMath = 0; QRMath < h; QRMath++) list.push(new QRRSBlock(g, QRUtil));
            return list
        };
        QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
            switch (errorCorrectLevel) {
                case 1:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 0];
                case 0:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 1];
                case 3:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 2];
                case 2:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 3]
            }
        };
        QRBitBuffer.prototype = {
            get: function(index) {
                return 1 == (this.buffer[Math.floor(index / 8)] >>> 7 - index % 8 & 1)
            },
            put: function(num, length) {
                for (var d = 0; d < length; d++) this.putBit(1 == (num >>> length - d - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(bit) {
                var bufIndex = Math.floor(this.length / 8);
                this.buffer.length <= bufIndex && this.buffer.push(0);
                bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof options && (options = {
            text: options
        });
        options = $.extend({},
            {
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#ffffff",
                foreground: "#000000"
            },
            options);
        return this.each(function() {
            var element;
            element = new QRCode(options.typeNumber, options.correctLevel);
            element.addData(options.text);
            element.make();
            var createCanvas = document.createElement("canvas");
            var img_url = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MzhGOTQyNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MzhGOTQzNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkzOEY5NDA1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkzOEY5NDE1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
            createCanvas.width = options.width;
            createCanvas.height = options.height;
            for (var ctx = createCanvas.getContext("2d"), tileW = options.width / element.getModuleCount(), tileH = options.height / element.getModuleCount(), row = 0; row < element.getModuleCount(); row++) for (var i = 0; i < element.getModuleCount(); i++) {
                ctx.fillStyle = element.isDark(row, i) ? options.foreground: options.background;
                var g = Math.ceil((i + 1) * tileW) - Math.floor(i * tileW),
                    QRUtil = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                ctx.fillRect(Math.round(i * tileW), Math.round(row * tileH), g, QRUtil)
            }
            element = createCanvas;
            $(element).appendTo(this);
            AKjs_UserAgent();
            if (IsMobile) {
                $(this).addClass("rel ovh");
                $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(this);
            }
            var resize = this;
            $(window).resize(function(){
                if (IsMobile == null) {
                    $(resize).removeClass("rel ovh");
                    $(resize).find("img").remove();
                } else {
                    $(resize).addClass("rel ovh");
                    if ($(resize).find("img").length < 1) {
                        $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(resize);
                    }
                }
            });
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Radio (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Radio = function(settings) {
        var _defaults = {
            boxSize: "2.6em",
            checkedClass: "bor_title border8",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        if (!this.parent("label").hasClass("ak-Radio")) {
            this.wrap("<label />")
        }
        var radios = this.parent("label");
        radios.addClass("ak-Radio");
        AKjs_UserAgent();
        if (!IsMobile) {
            if (options.boxSize) {
                radios.css({
                    "width": options.boxSize,
                    "height": options.boxSize,
                    "line-height": options.boxSize
                })
            }
            radios.addClass("rel text_al_c dis_inbl_im fn");
        } else {
            radios.addClass("bor_none bor_rad_0");
            radios.removeClass("rel text_al_c").removeAttr("style")
        }
        $(window).resize(function() {
            if (!IsMobile) {
                if (options.boxSize) {
                    radios.css({
                        "width": options.boxSize,
                        "height": options.boxSize,
                        "line-height": options.boxSize
                    })
                }
                radios.addClass("rel text_al_c dis_inbl_im fn");
            } else {
                radios.addClass("bor_none bor_rad_0");
                radios.removeClass("rel text_al_c").removeAttr("style")
            }
        });
        radios.attr("data-name", this.attr("name"));
        radios.each(function() {
            var $radio = $(this);
            var _name = $(this).data("name");
            if ($radio.find('input[type="radio"]').is(":checked")) {
                var $otherRadios = radios.filter("[data-name='" + _name + "']").not($radio);
                $radio.addClass(options.checkedClass);
                $otherRadios.removeClass(options.checkedClass);
                $otherRadios.find('input[type="radio"]').removeAttr("checked")
            }
            $radio.unbind();
            $radio.on("change",
                function() {
                    if (!$(this).hasClass(options.checkedClass)) {
                        $(this).addClass(options.checkedClass);
                        $(this).children('input[type="radio"]').attr("checked", "checked");
                        radios.filter("[data-name='" + _name + "']").not($(this)).removeClass(options.checkedClass);
                        radios.filter("[data-name='" + _name + "']").not($(this)).children('input[type="radio"]').removeAttr("checked")
                    }
                    options.onChange($(this).children())
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Range (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_Range = function() {
        return this.init.apply(this, arguments)
    };
    AKjs_Range.prototype = {
        defaults: {
            onstatechange: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: "%s",
            width: "90%",
            ProgClass: "",
            disable: false
        },
        template: '<div class="ak-range">' +
        '   <ul>' +
        '       <li class="ak-SelectedBar"></li>' +
        '       <li class="ak-Pointer low"></li>' +
        '       <li class="ak-label"></li>' +
        '       <li class="ak-Pointer high"></li>' +
        '       <li class="ak-label"></li>' +
        '       <li class="ak-Clickable"></li>' +
        '   </ul>' +
        '   <div class="ak-scale"></div>' +
        '</div>',
        init: function(node, options) {
            this.options = $.extend({},
                this.defaults, options);
            this.inputNode = $(node);
            this.options.value = this.inputNode.prop("defaultValue") || (this.options.isRange ? this.options.from + "," + this.options.from: this.options.from);
            this.domNode = $(this.template);
            this.inputNode.after(this.domNode);
            this.domNode.on("change", this.onChange);
            this.pointers = $(".ak-Pointer", this.domNode);
            this.lowPointer = this.pointers.first();
            this.highPointer = this.pointers.last();
            this.labels = $(".ak-label", this.domNode);
            this.lowLabel = this.labels.first();
            this.highLabel = this.labels.last();
            this.scale = $(".ak-scale", this.domNode);
            this.bar = $(".ak-SelectedBar", this.domNode);
            this.clickableBar = this.domNode.find(".ak-Clickable");
            this.interval = this.options.to - this.options.from;
            this.render();
        },
        render: function() {
            if (this.inputNode.prop("disabled")) {
                this.domNode.addClass("ak-readonly");
                this.options.disable = true;
                this.isReadonly();
            } else {
                this.options.disable = false;
                this.isReadonly();
            }
            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log("AKjs_Range : no width found, returning");
                return
            } else {
                this.domNode.width(this.options.width || this.inputNode.width());
                this.inputNode.hide()
            }
            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide()
            }
            if (!this.options.showLabels) {
                this.labels.hide()
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale()
            }
            this.setValue(this.options.value);
            this.bar.addClass(this.options.ProgClass);
        },
        isSingle: function() {
            if (typeof(this.options.value) === "number") {
                return true
            }
            return (this.options.value.indexOf(",") !== -1 || this.options.isRange) ? false: true
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on("mousedown touchstart", $.proxy(this.onDragStart, this));
            this.pointers.bind("dragstart",
                function(event) {
                    event.preventDefault()
                })
        },
        onDragStart: function(e) {
            if (this.options.disable || (e.type === "mousedown" && e.which !== 1)) {
                return
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass("zindex_3");
            pointer.addClass("ak-Focused zindex_3");
            this[(pointer.hasClass("low") ? "low": "high") + "Label"].addClass("ak-Focused");
            $(document).on("mousemove.ak-RangeSlider touchmove.ak-RangeSlider", $.proxy(this.onDrag, this, pointer));
            $(document).on("mouseup.ak-RangeSlider touchend.ak-RangeSlider touchcancel.ak-RangeSlider", $.proxy(this.onDragEnd, this))
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0]
            } else {
                if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                    e = e.originalEvent.changedTouches[0]
                }
            }
            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, pointer, position])
        },
        onDragEnd: function(e) {
            this.pointers.removeClass("ak-Focused");
            this.labels.removeClass("ak-Focused");
            $(document).off(".ak-RangeSlider")
        },
        barClicked: function(e) {
            if (this.options.disable) {
                return
            }
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle()) {
                this.setPosition(this.pointers.last(), x, true, true)
            } else {
                var pointer = Math.abs(parseInt(this.pointers.first().css("left"), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css("left"), 10) - x + this.pointers.first().width() / 2) ? this.pointers.first() : this.pointers.last();
                this.setPosition(pointer, x, true, true)
            }
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            if (self.isSingle()) {
                min = 0;
                max = self.domNode.width()
            } else {
                min = pointer.hasClass("high") ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
                max = pointer.hasClass("low") ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width()
            }
            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true)
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos, lowPos = this.lowPointer.position().left,
                highPos = this.highPointer.position().left,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position)
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth)
            } else {
                lowPos = Math.round(position - circleWidth)
            }
            pointer[animate ? "animate": "css"]({
                "left": Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0
            } else {
                leftPos = lowPos + circleWidth
            }
            this.bar[animate ? "animate": "css"]({
                "width": Math.round(highPos + circleWidth - leftPos),
                "left": leftPos
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly()
        },
        setValue: function(value) {
            var values = value.toString().split(",");
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values: [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1])
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1])
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = "";
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != "|" ? "<ins>" + s[i] + "</ins>": "") + "</span>"
            }
            this.scale.html(str);
            $("ins", this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                })
            })
        },
        getBarWidth: function() {
            var values = this.options.value.split(",");
            if (values.length > 1) {
                return parseInt(values[1], 10) - parseInt(values[0], 10)
            } else {
                return parseInt(values[0], 10)
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $(".ak-label", this.domNode)[pointer.hasClass("low") ? "first": "last"]();
            var text;
            var value = this.positionToValue(position);
            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined: (pointer.hasClass("low") ? "low": "high");
                text = this.options.format(value, type)
            } else {
                text = this.options.format.replace("%s", value)
            }
            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.domNode.width() - width);
            label[animate ? "animate": "css"]({
                left: left - label.width()/4
            });
            this.setInputValue(pointer, value)
        },
        valuesToPrc: function(values) {
            var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
                highPrc = ((values[1] - this.options.from) * 100 / this.interval);
            return [lowPrc, highPrc]
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = value + this.options.from;
            return Math.round(value / this.options.step) * this.options.step
        },
        setInputValue: function(pointer, v) {
            if (this.isSingle()) {
                this.options.value = v.toString()
            } else {
                var values = this.options.value.split(",");
                if (pointer.hasClass("low")) {
                    this.options.value = v + "," + values[1]
                } else {
                    this.options.value = values[0] + "," + v
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value);
                this.options.onstatechange(this, this.options.value)
            }
        },
        getValue: function() {
            return this.options.value
        },
        isReadonly: function() {
            this.domNode.toggleClass("ak-readonly", this.options.disable)
        },
        disable: function() {
            this.options.disable = true;
            this.isReadonly()
        },
        enable: function() {
            this.options.disable = false;
            this.isReadonly()
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable;
            this.isReadonly()
        }
    };
    var pluginName = "AKjs_Range";
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;
        var range = this;
        setTimeout(function() {
                range.each(function() {
                    var $this = $(this),
                        data = $.data(this, "plugin_" + pluginName),
                        options = typeof option === "object" && option;
                    if (!data) {
                        $this.data("plugin_" + pluginName, (data = new AKjs_Range(this, options)));
                        $(window).resize(function() {
                            data.setValue(data.getValue())
                        })
                    }
                    if (typeof option === "string") {
                        result = data[option].apply(data, Array.prototype.slice.call(args, 1))
                    }
                    if (typeof option === 'number') {
                        data.setValue(option);
                    }
                })
            },
            500);
        return result || this
    };
} (jQuery));

/*-----------------------------------------------AKjs_Ratyli (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Ratyli = function(el, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("AKjs_Ratyli", base);
        base.init = function() {
            base.options = $.extend({},
                $.AKjs_Ratyli.defaultOptions, options);
            base.options = $.extend({},
                base.options, base.$el.data());
            base.set(base.options.rate, true);
            base.$el.on("click", "> *",
                function(e) {
                    if (!base.options.disable) {
                        var target = e.target;
                        if (target.tagName != "span") {
                            target = target.parentNode
                        }
                        base.options.onSignClick.call(base, target);
                        var val = $(target).prevAll().length + 1;
                        base.set(val)
                    }
                });
            base.$el.on("mouseenter", "> *",
                function(e) {
                    var target = e.target;
                    if (target.tagName != "span") {
                        target = target.parentNode
                    }
                    if (!base.options.disable) {
                        $(target).addClass("rate-active");
                        $(target).prevAll().addClass("rate-active")
                    }
                    base.options.onSignEnter.apply(null, [base.options.rate, target])
                });
            base.$el.on("mouseleave", "> *",
                function(e) {
                    var target = e.target;
                    if (target.tagName != "span") {
                        target = target.parentNode
                    }
                    if (!base.options.disable) {
                        $(target).removeClass("rate-active");
                        $(target).prevAll().removeClass("rate-active")
                    }
                    base.options.onSignLeave.apply(null, [base.options.rate, target])
                })
        };
        base.set = function(val, init) {
            if (val < 0 || (val % 1 != 0) || val > base.options.ratemax) {
                val = 0
            }
            if (val == 1 && base.options.rate == 1 && base.options.unrateable == true && !init) {
                val = 0
            }
            base.options.rate = val;
            base.$el.html("");
            if (base.options.rate != 0) {
                base.$el.attr("data-rate", base.options.rate)
            }
            base.$el.attr("data-ratemax", base.options.ratemax);
            var i = 0;
            while (i < base.options.ratemax) {
                var tmp = "";
                if (i < base.options.rate) {
                    tmp = base.signTemplate("full")
                } else {
                    tmp = base.signTemplate("empty")
                }
                base.$el.append(tmp);
                i++
            }
            if (!init && !base.options.disable) {
                base.$el.attr("data-rate", val)
            }
            base.options.onRated.call(base, val, init);
            return base.options.rate
        };
        base.signTemplate = function(type) {
            return "<span>" + base.options[type] + "</span>"
        };
        base.init()
    };
    $.AKjs_Ratyli.defaultOptions = {
        disable: false,
        unrateable: false,
        full: "",
        empty: "",
        rate: 0,
        ratemax: 5,
        onSignEnter: function() {},
        onSignLeave: function() {},
        onSignClick: function() {},
        onRated: function() {}
    };
    $.fn.AKjs_Ratyli = function(options) {
        return this.each(function() { (new $.AKjs_Ratyli(this, options))
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ReadMore (2018-12-13)--------------------------------------------*/
(function($) {
    var readmore = 'AKjs_ReadMore',
        defaults = {
            speed: 100,
            maxHeight: 200,
            heightMargin: 16,
            moreLink: '',
            lessLink: '',
            startOpen: false,
            beforeToggle: function(){},
            afterToggle: function(){}
        };
    function Readmore( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        $(this.element).data('max-height', this.options.maxHeight);
        $(this.element).data('height-margin', this.options.heightMargin);
        delete(this.options.maxHeight);
        this.init();
    }
    Readmore.prototype = {
        init: function() {
            var $this = this;
            $(this.element).each(function() {
                var current = $(this),
                    maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
                    heightMargin = current.data('height-margin');
                if(current.css('max-height') != 'none') {
                    current.css('max-height', 'none');
                }
                $this.setBoxHeight(current);
                if(current.outerHeight(true) <= maxHeight + heightMargin) {
                    return true;
                }
                else {
                    current.data('collapsedHeight', maxHeight);
                    var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
                    current.after($(useLink).on('click', function(event) {
                        $this.toggleSlider(this, current, event)
                    }));
                    if(!$this.options.startOpen) {
                        current.css({
                            height: maxHeight,
                            display: "block"
                        });
                        current.removeClass("dis_none_im").removeClass("dis_none");
                    }
                }
            });
        },
        toggleSlider: function(trigger, element, event) {
            event.preventDefault();
            var $this = this,
                newHeight = newLink = sectionClass = '',
                expanded = false,
                collapsedHeight = $(element).data('collapsedHeight');

            if ($(element).height() <= collapsedHeight + $(trigger).height()) {
                newHeight = $(element).data('expandedHeight');
                newLink = 'lessLink';
                expanded = true;
            }
            else {
                newHeight = collapsedHeight;
                newLink = 'moreLink';
                expanded = false;
            }
            $this.options.beforeToggle(trigger, element, expanded);
            $(element).animate({
                'height': newHeight
            }, {duration: $this.options.speed, complete: function() {
                    $this.options.afterToggle(trigger, element, expanded);
                    $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) {
                        $this.toggleSlider(this, element, event)
                    }));
                }
            });
        },

        setBoxHeight: function(element) {
            var el = element.clone().css({
                    'height': 'auto',
                    'width': element.width(),
                    'overflow': 'hidden'
            }).insertAfter(element),
                height = el.outerHeight();
            el.remove();
            element.data('expandedHeight', height);
        }
    };

    $.fn[readmore] = function( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + readmore);
                if (instance instanceof Readmore && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_SelectOption (2018-12-13)--------------------------------------------*/
(function($) {
    var defaluts = {
        active: "",
        boxheight: 5,
        speed: 1000,
        callback: function() {},
        clickback: function() {}
    };
    $.fn.extend({
        "AKjs_SelectOption": function(options){
            var option = $.extend({
            }, defaluts, options);
            $(this).addClass("ak-SelectOpts");
            $(window).bind('hashchange', function () {
                $(".ak-SelectList").remove();
            });
            return this.each(function(){
                var $this = $(this);
                var _html = [];
                _html.push("<section class=\"" + $this.attr('class') + "\">");
                _html.push("<var>" + $this.find(":selected").text() + "</var>");
                _html.push("<cite class='ak-SelectList scrollbar'><ul>");
                $this.children("option").each(function () {
                    var opts = $(this);
                    _html.push("<li title='"+opts.text()+"' data-value=\"" + opts.val() + "\">" + opts.text() + "</li>");
                });
                _html.push("</ul>");
                _html.push("</cite>");
                _html.push("</section>");
                var select = $(_html.join(""));
                var select_text = select.find("var");
                var select_list = select.find("cite");
                $this.after(select);
                $this.nextAll("section.ak-SelectOpts").not($this.next("section.ak-SelectOpts")).remove();
                select_list.find("li").each(function () {
                    var list = $(this);
                    if (list.data("value") == $this.find(":selected").val()) {
                        if ($this.find(":selected").val() > 0) {
                            list.addClass(option.active);
                        }
                    }
                });
                option.callback(select,select_list,$this.find(":selected").val(),select_text.text());
                AKjs_UserAgent();
                select.unbind("click");
                select.click(function (andrew) {
                    var $this_ = $(this);
                    andrew.preventDefault();
                    $(".ak-SelectList").remove();
                    if ($('#ak-scrollview').length > 0) {
                        if (select.parents("dialog")[0] != undefined) {
                            $('main').append(select_list);
                        } else {
                            $('#ak-scrollview').append(select_list);
                        }
                    } else {
                        $('body').append(select_list);
                    }
                    if(select_list.css('display') == 'none'){
                        option.clickback(false,select,select_list);
                    }
                    select_list.find("li").unbind("click");
                    select_list.on("click", "li", function () {
                        var li = $(this);
                        if (li.data("value") === 0 || li.data("value") === "") {
                            var val = li.removeClass(option.active).siblings("li").removeClass(option.active).end().data("value");
                        } else {
                            var val = li.addClass(option.active).siblings("li").removeClass(option.active).end().data("value").toString();
                        }
                        select.removeClass("ak-open");
                        select_list.slideUp(option.speed);

                        if (li.data("value") != "0" || li.data("value") != "") {
                            if ($this.attr("data-type") == "router-link") {
                                document.location.href = "#/" + li.data("value");
                            } else if ($this.attr("data-type") == "link") {
                                document.location.href = li.data("value");
                            }
                        }
                        if (val !== $this.val()) {
                            select_text.text(li.text());
                            $this.val(val);
                            $this.attr("data-value",val);
                            $this.find("option[value!='"+val+"']").removeAttr("selected");
                            $this.find("option[value='"+val+"']").attr("selected","selected");
                            $this.change();
                            option.clickback(true,select,select_list,val,select_text.text());
                        }
                    });
                    $(this).toggleClass("ak-open");
                    select_list_css();
                    $(window).resize(function () {
                        select_list_css();
                    });
                    function select_list_css() {
                        var this_h = $this_.outerHeight();
                        if (option.boxheight) {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * option.boxheight
                            });
                        } else {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * 5
                            });
                        }
                        if ($this_.offset().top + $this_.innerHeight()+ select_list.innerHeight() > $(window).height()) {
                            select_list.css({
                                "top": "auto",
                                "bottom": $("#ak-scrollview").outerHeight() - ($this_.offset().top + $('#ak-scrollview').scrollTop()) + $this_.outerHeight() + $("#ak-scrollview").offset().top - this_h,
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                        } else {
                            select_list.css({
                                "bottom": "auto",
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                            if ($('#ak-scrollview').length > 0) {
                                if (select.parents("dialog")[0] != undefined) {
                                    select_list.css({
                                        "top": $this_.offset().top -$("#ak-scrollview").offset().top + this_h
                                    });
                                } else {
                                    select_list.css({
                                        "top": $this_.offset().top + $('#ak-scrollview').scrollTop() - $("#ak-scrollview").offset().top + this_h
                                    });
                                }
                            } else {
                                select_list.css({
                                    "top": $this_.offset().top + $this_.innerHeight() + 1
                                });
                            }
                        }
                        select_list.find("li").css({
                            "height": select.outerHeight()+"px",
                            "line-height": select.outerHeight()+"px"
                        });
                    }
                    if ($(this).hasClass("ak-open")) {
                        $(".ak-SelectOpts").not(select).removeClass("ak-open");
                        $(".ak-SelectList").not(select_list).hide();
                        select_list.slideDown(option.speed);
                        select_list.animate({scrollTop:0},0);
                        $("body").unbind("click");
                        setTimeout(function() {
                            $("body").click(function () {
                                $(".ak-SelectList").slideUp(option.speed);
                                $(".ak-SelectOpts").removeClass("ak-open");
                            });
                            if ($('#ak-scrollview').length > 0) {
                                var $scrollbar = $("#ak-scrollview");
                            } else {
                                var $scrollbar = $("main");
                            }
                            $scrollbar.scroll(function(){
                                $(".ak-SelectList").slideUp(option.speed);
                                $(".ak-SelectOpts").removeClass("ak-open");
                            });
                        },option.speed);
                    } else {
                        select_list.slideUp(option.speed);
                    }
                });
            });
        }
    });
} (jQuery));

/*-----------------------------------------------AKjs_Slider (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_Slider = function(ele, opt) {
        var self = this;
        self.$element = ele,
            self.defaults = {
                fullpage: false,
                UpDown: false,
                start: 1,
                speed: 500,
                interval: 5000,
                autoPlay: false,
                loopPlay: true,
                dotShow: true,
                arrShow: true,
                dotClass:"",
                arrClass:"",
                arrIcon: [],
                CustomHeight: false,
                ActiveClass: "bg_title",
                callback: function() {},
                afterSlider: function() {}
            },
            self.clickable = true,
            self.options = $.extend({},
                self.defaults, opt)
    };
    AKjs_Slider.prototype = {
        init: function() {
            var self = this,
                ele = self.$element;
            var touchStartY = 0,
                touchStartX = 0,
                mouseStartY = 0,
                mouseStartX = 0;
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            var SliderSize = SliderLi.length;
            var index = self.options.start;
            var styleSetting = function() {
                if (self.options.arrShow) {
                    if (self.options.UpDown) {
                        if (self.options.arrIcon) {
                            var arrElement = '<button type="button" class="ak-arr_prev">'+self.options.arrIcon[0]+'</button><button type="button" class="ak-arr_next">'+self.options.arrIcon[1]+'</button>';
                        } else {
                            var arrElement = '<button type="button" class="ak-arr_prev">&and;</button><button type="button" class="ak-arr_next">&or;</button>';
                        }
                    } else {
                        if (self.options.arrIcon) {
                            var arrElement = '<button type="button" class="ak-arr_prev">'+self.options.arrIcon[0]+'</button><button type="button" class="ak-arr_next">'+self.options.arrIcon[1]+'</button>';
                        } else {
                            var arrElement = '<button type="button" class="ak-arr_prev">&lt;</button><button type="button" class="ak-arr_next">&gt;</button>';
                        }
                    }
                    if ($(ele).children("button").length < 1) {
                        ele.append(arrElement);
                    }
                    ele.find("button").addClass(self.options.arrClass);
                    if (self.options.UpDown) {
                        ele.find("button.ak-arr_prev").css({
                            "top": ele.find("button.ak-arr_prev").outerWidth()/2
                        });
                        ele.find("button.ak-arr_next").css({
                            "bottom": ele.find("button.ak-arr_next").outerWidth()/2
                        });
                    } else {
                        ele.find("button.ak-arr_prev").css({
                            "left": ele.find("button.ak-arr_prev").outerWidth()/2
                        });
                        ele.find("button.ak-arr_next").css({
                            "right": ele.find("button.ak-arr_next").outerWidth()/2
                        });
                    }
                    self.options.callback(ele);
                }
                for (i = 1; i <= SliderSize; i++) {
                    if (index == i) {
                        SliderLi.eq(index - 1).addClass("dis_block_im");
                        if (self.options.CustomHeight) {
                            setTimeout(function () {
                                if (SliderLi.eq(index - 1).find("img").hasClass("dis_none") || SliderLi.eq(index - 1).find("img").hasClass("dis_none_im")) {
                                } else {
                                    var custom_h = SliderLi.eq(index - 1).find("*[data-height=true]").prop("height");
                                    SliderLi.eq(index - 1).css({"height": custom_h});
                                    SliderLi.eq(index - 1).find("*").css({"height": custom_h});
                                    sliderInder.css({"height": SliderLi.eq(index - 1).outerHeight()});
                                    ele.css({"height": SliderLi.eq(index - 1).outerHeight()});
                                }
                            }, 200);
                        }
                    }
                }
                if (self.options.dotShow) {
                    var dot = "";
                    for (i = 1; i <= SliderSize; i++) {
                        if (index == i) {
                            dot += '<li data-index="' + i + '" class="'+self.options.ActiveClass+'"></li>'
                        } else {
                            dot += '<li data-index="' + i + '"></li>'
                        }
                    }
                    var dotElement = '<ol>' + dot + "</ol>";
                    if ($(ele).children("ol").length < 1) {
                        ele.append(dotElement);
                        if (self.options.UpDown) {
                            $(ele).children("ol").addClass("bottom_au right_0 mr_1em");
                        } else {
                            $(ele).children("ol").find("li").addClass("fl");
                        }
                    }
                }
                ele.addClass("ak-Slider");
                setTimeout(function () {
                    if (self.options.arrShow) {
                        if (self.options.UpDown) {
                            var arrOffset = (ele.outerWidth() - ele.find("button").outerWidth()) / 2;
                            ele.find("button").css("left", arrOffset + "px");
                        } else {
                            var arrOffset = (ele.outerHeight() - ele.find("button").outerHeight()) / 2;
                            if (ele.hasClass("h_fill")) {
                                ele.find("button").css("top", $(window).height()/2 - ele.find("button").outerHeight() / 2+ "px");
                            } else {
                                ele.find("button").css("top", arrOffset + "px");
                            }
                        }
                    }
                    if (self.options.dotShow) {
                        var dots = ele.children("ol");
                        if (self.options.UpDown) {
                            dots.find("li").addClass(self.options.dotClass).removeClass("fl");
                            var dotHeight = (SliderSize + 1) * dots.find("li").eq(0).outerHeight();
                            var dotOffset = (ele.outerHeight() - dotHeight) / 2;
                            dots.css({
                                "top": dotOffset + "px"
                            });
                        } else {
                            dots.find("li").addClass(self.options.dotClass);
                            var dotWidth = (SliderSize + 1) * dots.find("li").eq(0).outerWidth();
                            var dotOffset = (ele.outerWidth() - dotWidth) / 2;
                            dots.css({
                                "left": dotOffset + "px"
                            });
                        }
                    }
                }, 200);
            };
            styleSetting();
            $(window).resize(function() {
                styleSetting();
            });
            if (self.options.arrShow) {
                ele.find(".ak-arr_next").unbind("click");
                ele.find(".ak-arr_next").on("click",
                    function(event) {
                        event.preventDefault();
                        var $_this = $(this);
                        $_this.attr("disabled","disabled");
                        if (self.clickable) {
                            if (index >= SliderSize) {
                                index = 1;
                            } else {
                                index += 1;
                            }
                            self.moveTo(index, "ak-arr_next");
                            setTimeout(function () {
                                $_this.removeAttr("disabled");
                            },self.options.speed);
                        }
                    });
                ele.find(".ak-arr_prev").unbind("click");
                ele.find(".ak-arr_prev").on("click",
                    function(event) {
                        event.preventDefault();
                        var $_this = $(this);
                        $_this.attr("disabled","disabled");
                        if (self.clickable) {
                            if (index == 1) {
                                index = SliderSize;
                            } else {
                                index -= 1;
                            }
                            self.moveTo(index, "ak-arr_prev");
                            setTimeout(function () {
                                $_this.removeAttr("disabled");
                            },self.options.speed);
                        }
                    })
            }
            if (self.options.dotShow) {
                ele.find("ol li").unbind("click");
                ele.find("ol li").on("click",
                    function(event) {
                        event.preventDefault();
                        if (self.clickable) {
                            var dotIndex = $(this).data("index");
                            if (dotIndex > index) {
                                dir = "ak-arr_next"
                            } else {
                                dir = "ak-arr_prev"
                            }
                            if (dotIndex != index) {
                                index = dotIndex;
                                self.moveTo(index, dir)
                            }
                        }
                    })
            }
            if (self.options.autoPlay) {
                var timer;
                var play = function() {
                    index++;
                    if (index > SliderSize) {
                        index = 1
                    }
                    self.moveTo(index, "ak-arr_next");
                };
                timer = setInterval(play, self.options.interval);
                ele.hover(function() {
                        timer = clearInterval(timer)
                    },
                    function() {
                        timer = setInterval(play, self.options.interval)
                    })
            }
            if (self.options.fullpage) {
                ele.on({
                    touchmove: function (es) {
                        es.preventDefault();
                        return false;
                    }
                });
                var win_h = $(window).height();
                SliderLi.css({"height": win_h});
                sliderInder.css({"height": win_h});
                ele.css({"height": win_h});
            }
            AKjs_UserAgent();
            SliderLi.on({
                touchstart: function(es) {
                    touchStartY = es.originalEvent.touches[0].clientY;
                    touchStartX = es.originalEvent.touches[0].clientX;
                },
                touchend: function(es) {
                    var touchEndY = es.originalEvent.changedTouches[0].clientY,
                        touchEndX = es.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (self.options.UpDown) {
                        if (Math.abs(xDiff) < Math.abs(yDiff)) {
                            if (yDiff > 10) {
                                if (index >= SliderSize) {
                                    if (self.options.loopPlay) {
                                        index = 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    index += 1;
                                    self.moveTo(index, "ak-arr_next");
                                }
                            } else {
                                if (index == 1) {
                                    if (self.options.loopPlay) {
                                        index = SliderSize;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                } else {
                                    index -= 1;
                                    self.moveTo(index, "ak-arr_prev");
                                }
                            }
                        }
                    } else {
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 10) {
                                if (index >= SliderSize) {
                                    if (self.options.loopPlay) {
                                        index = 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    index += 1;
                                    self.moveTo(index, "ak-arr_next");
                                }
                            } else {
                                if (index == 1) {
                                    if (self.options.loopPlay) {
                                        index = SliderSize;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                } else {
                                    index -= 1;
                                    self.moveTo(index, "ak-arr_prev");
                                }
                            }
                        }
                    }
                    touchStartY = null;
                    touchStartX = null
                },
                touchmove: function(es) {
                    var touchEndY = es.originalEvent.changedTouches[0].clientY,
                        touchEndX = es.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (self.options.UpDown) {
                        es.preventDefault();
                    }
                }
            });
            if (!IsMobile) {
                SliderLi.on({
                    mousedown: function(es) {
                        mouseStartY = es.clientY;
                        mouseStartX = es.clientX;
                    },
                    mouseup: function(es) {
                        var mouseEndY = es.screenY,
                            mouseEndX = es.screenX,
                            yDiff = mouseStartY - mouseEndY,
                            xDiff = mouseStartX - mouseEndX;
                        if (self.options.UpDown) {
                            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                                if (yDiff > 10) {
                                    if (index >= SliderSize) {
                                        if (self.options.loopPlay) {
                                            index = 1;
                                            self.moveTo(index, "ak-arr_next");
                                        }
                                    } else {
                                        index += 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    if (index == 1) {
                                        if (self.options.loopPlay) {
                                            index = SliderSize;
                                            self.moveTo(index, "ak-arr_prev");
                                        }
                                    } else {
                                        index -= 1;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                }
                            }
                        } else {
                            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                                if (xDiff > 10) {
                                    if (index >= SliderSize) {
                                        if (self.options.loopPlay) {
                                            index = 1;
                                            self.moveTo(index, "ak-arr_next");
                                        }
                                    } else {
                                        index += 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    if (index == 1) {
                                        if (self.options.loopPlay) {
                                            index = SliderSize;
                                            self.moveTo(index, "ak-arr_prev");
                                        }
                                    } else {
                                        index -= 1;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                }
                            }
                        }
                        mouseStartY = null;
                        mouseStartX = null
                    }
                });
            }
        },
        moveTo: function(index, dir) {
            var self = this,
                ele = self.$element;
            var clickable = self.clickable;
            var dots_li = ele.children("ol").find("li");
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            if (clickable) {
                if (self.options.UpDown) {
                    var offset = ele.height();
                } else {
                    var offset = ele.width();
                }
                if (dir == "ak-arr_prev") {
                    offset = -1 * offset
                }
                if (self.options.UpDown) {
                    sliderInder.children(".dis_block_im").stop().animate({
                            top: -offset
                        },
                        self.options.speed,
                        function() {
                            $(this).removeClass("dis_block_im")
                        });
                    SliderLi.eq(index - 1).css("top", offset + "px").addClass("dis_block_im").stop().animate({
                            top: 0
                        },
                        self.options.speed,
                        function() {
                            self.clickable = true
                        });
                } else {
                    sliderInder.children(".dis_block_im").stop().animate({
                            left: -offset
                        },
                        self.options.speed,
                        function() {
                            $(this).removeClass("dis_block_im")
                        });
                    SliderLi.eq(index - 1).css("left", offset + "px").addClass("dis_block_im").stop().animate({
                            left: 0
                        },
                        self.options.speed,
                        function() {
                            self.clickable = true
                        });
                }
                if (self.options.CustomHeight) {
                    if (SliderLi.eq(index - 1).find("img").hasClass("dis_none") || SliderLi.eq(index - 1).find("img").hasClass("dis_none_im")) {
                    } else {
                        var custom_h = SliderLi.eq(index - 1).find("*[data-height=true]").prop("height");
                        SliderLi.eq(index - 1).css({"height": custom_h});
                        SliderLi.eq(index - 1).find("*").css({"height": custom_h});
                        sliderInder.css({"height": SliderLi.eq(index - 1).outerHeight()});
                        ele.css({"height": SliderLi.eq(index - 1).outerHeight()});
                    }
                }
                self.options.afterSlider(index);
                dots_li.removeClass(self.options.ActiveClass);
                dots_li.eq(index - 1).addClass(self.options.ActiveClass);
            } else {
                self.clickable = false;
                return false
            }
        }
    };
    $.fn.AKjs_Slider = function(options) {
        var ak_Slider = new AKjs_Slider(this, options);
        return this.each(function() {
            ak_Slider.init()
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_SnInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_SnInput = function(setting) {
        var option = $.extend({
                default_active: false,
                input_length: 1,
                callback: function() {}
            },
            setting);
        var ele = $(this).find("input");
        $(this).css({
            "display": "block",
            "overflow": "hidden",
            "position": "relative"
        });
        ele.each(function() {
            ele.css({
                "display": "block",
                "overflow": "hidden",
                "position": "relative",
                "float": "left",
                "text-align": "center"
            });
            if (option.default_active == true) {
                ele.first().focus()
            }
            ele.attr("maxlength", option.input_length);
            ele.focus(function() {
                $(this).addClass("bor_title bg_white")
            });
            ele.blur(function() {
                $(this).removeClass("bor_title bg_white")
            });
            $(this).keyup(function(e) {
                e = window.event || e;
                var k = e.keyCode || e.which;
                if (k == 8) {
                    if ($(this).val().length < 1) {
                        $(this).prev().focus();
                        $(this).prev().focus(function() {
                            var obj = e.srcElement ? e.srcElement: e.target;
                            if (obj.createTextRange) {
                                var range = obj.createTextRange();
                                range.moveStart("character", option.input_length);
                                range.collapse(true);
                                range.select()
                            }
                        })
                    }
                } else {
                    if ($(this).val().length > parseInt(option.input_length) - 1) {
                        AKjs_UserAgent();
                        if (!IsQQ) {
                            $(this).next().focus()
                        }
                    }
                }
                this.value = this.value.replace(/[^a-z0-9]/i, "");
                this.value = this.value.toUpperCase()
            })
        });
        ele.bind("keyup",
            function() {
                var f = true;
                var str = "";
                if (ele.val() >= 1) {
                    $(this).addClass("c_black")
                } else {
                    $(this).addClass("c_black")
                }
                for (var i = 0; i < ele.length; i++) {
                    if ("" == ele.eq(i).val()) {
                        f = false
                    }
                }
                if (f) {
                    for (var i = 0; i < ele.length; i++) {
                        str += ele.eq(i).val()
                    }
                    if (str.length == (parseInt(option.input_length) * ele.length)) {
                        option.callback(str)
                    }
                } else {
                    option.callback("")
                }
            })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Spinner (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Spinner=function(setting) {
        var option = $.extend({
                input_width:"100%",
                btn_wrap: "",
                btn_left: "",
                btn_right: "",
                spacing: 1,
                maxNumber: "",
                changeBack: function() {},
                clickBack:function(){
                }
            },
            setting);
        var spt =$(this);
        $(function() {
            ak_sptFun();
        });
        $(window).resize(function(){
            spt.parent().find("input").css({
                "height": spt.parent().children("button").outerHeight()
            });
            spt.parent().css({
                "height": spt.parent().children("button").height()
            });
            spt.parent().css({
                "margin-top": (spt.parent().parent().outerHeight() - spt.parent().outerHeight())/2
            });
        });
        function ak_sptFun() {
            spt.each(function(i) {
                $(this).wrap('<div class="'+option.btn_wrap+'"></div>');
                $(this).before('<button type="button" class="minus '+option.btn_left+'"></button>');
                $(this).before('<button type="button" class="plus '+option.btn_right+'"></button>');
                $(this).parent().css({
                    "overflow": "hidden",
                    "width": option.input_width,
                    "height": spt.parent().children("button").height(),
                    "margin-top": (spt.parent().outerHeight() - spt.parent().children("button").outerHeight()) / 2-2
                });
                var it =$(this).parent().find("input");
                it.css({
                    "width": "100%",
                    "height": $(this).parent().children("button").outerHeight(),
                    "line-height": "100%",
                    "float": "inherit"
                });
                if (parseInt(it.val())<=1){
                    $(this).parent().children(".minus").attr("disabled",'disabled');
                }
                $(this).keyup(function() {
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum = 1;
                    if (it.val() != '' && it.val() != null && it.val() != undefined) {
                        lengthNum = parseInt(it.val());
                    }
                    if (parseInt(it.val()) > 1) {
                        $(this).parent().children(".minus").removeAttr("disabled", 'disabled');
                        $(this).parent().children(".plus").removeAttr("disabled", 'disabled');
                    } else if (parseInt(it.val()) <= maxNumber) {
                        $(this).parent().children(".minus").attr("disabled", 'disabled');
                    }
                    if (lengthNum === 0) {
                        it.val(1);
                        $(this).parent().children(".plus").removeAttr("disabled", 'disabled');
                    }
                    if (parseInt(it.val()) >= parseInt(maxNumber)) {
                        it.val(parseInt(maxNumber));
                        $(this).parent().children(".plus").attr("disabled", 'disabled');
                    }
                    option.changeBack(it.val(),$(this));
                });
                $(this).parent().children(".plus").unbind("click");
                $(this).parent().children(".plus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber > parseInt(it.val())) {
                        $(this).parent().children(".minus").removeAttr("disabled",'disabled');
                        it.val(lengthNum+parseInt(option.spacing));
                    } else if (maxNumber <= parseInt(it.val())) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                        it.parent().children(".minus").removeAttr("disabled",'disabled');
                    }
                    if (parseInt(it.val()) >= parseInt(maxNumber)) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(it.val(), $(this).parent().children("input"));
                });
                $(this).parent().children(".minus").unbind("click");
                $(this).parent().children(".minus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber >= lengthNum){
                        $(this).parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(lengthNum-parseInt(option.spacing));
                    } else if (maxNumber <= lengthNum) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                    }
                    if (parseInt(it.val())<=1){
                        it.val(parseInt(1));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(it.val(), $(this).parent().children("input"));
                })
            });
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_StepOrder (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_StepOrder = function(setting) {
        var option = $.extend({
                stepNum: "",
                stepClass:  new Array(),
                dashed_line: "bor_white bor_bottom_dashed2",
                progress: "bor_white bor_bottom2",
                callback: function() {}
            },
            setting);
        var step = $(this);
        step.addClass("rel ovh");
        step.children().addClass("rel ovh");
        step.children().before("<cite /><cite />");
        step.children("cite").eq(0).addClass("dis_block rel w_100 "+option.dashed_line);
        step.children("cite").eq(1).addClass("dis_block rel "+option.progress);
        var step_li = step.children().children("li");
        var num_box = step.children().children("li").eq(0).children().eq(0);
        var step_line_h = step.children("cite").eq(0).outerHeight();
        step_li.each(function(){
            step.fadeIn();
            var num_boxs = $(this).children().eq(0);
            $(this).addClass("fl text_al_c");
            if($(this).index() <= option.stepNum-1){
                $(this).addClass("ak-is_active");
            }
            if ($(this).hasClass("ak-is_active")) {
                $(this).children().eq(0).addClass(option.stepClass[0]);
                $(this).children().eq(1).addClass(option.stepClass[1]);
            } else {
                num_boxs.removeClass(option.stepClass[0]);
                num_boxs.next().removeClass(option.stepClass[1]);
            }
            num_boxs.addClass("dis_block center text_al_c");
            step.children("cite").eq(0).css({
                "top": num_box.outerHeight()/2+step_line_h
            });
            step.children("cite").eq(1).css({
                "top": num_box.outerHeight()/2-step_line_h+step_line_h,
                "width": 0
            }).animate({
                "width": step.find(".ak-is_active").last().children().eq(0).offset().left
            });
            $(window).resize(function(){
                step.children("cite").eq(0).css({
                    "top": num_box.outerHeight()/2+step_line_h
                });
                step.children("cite").eq(1).css({
                    "top": num_box.outerHeight()/2-step_line_h+step_line_h,
                    "width": 0
                }).animate({
                    "width": step.find(".ak-is_active").last().children().eq(0).offset().left
                });
            });
        });
        option.callback(step);
    };
} (jQuery));

/*-----------------------------------------------AKjs_Substring (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Substring = function() {
        $(this).blur(function() {
            this.value = outputmoney(this.value)
        })
    };
    function outputdollars(number) {
        if (number.length <= 3) {
            return (number == "" ? "0": number)
        } else {
            var mod = number.length % 3;
            var output = (mod == 0 ? "": (number.substring(0, mod)));
            for (var i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0)) {
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3)
                } else {
                    output += "" + number.substring(mod + 3 * i, mod + 3 * i + 3)
                }
            }
            return (output)
        }
    }
    function outputcents(amount) {
        amount = Math.round(((amount) - Math.floor(amount)) * 100);
        return (amount < 10 ? ".0" + amount: "." + amount)
    }
    function outputmoney(number) {
        number = number.replace(/\,/g, "");
        if (isNaN(number) || number == "") {
            return ""
        }
        number = Math.round(number * 100) / 100;
        if (number < 0) {
            return "-" + outputdollars(Math.floor(Math.abs(number) - 0) + "") + outputcents(Math.abs(number) - 0)
        } else {
            return outputdollars(Math.floor(number - 0) + "") + outputcents(number - 0)
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Switch (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Switch = function(settings) {
        var _defaults = {
            checkedClass: "bg_title",
            disabledClass: "dis_opa_05",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var Switchs = this;
        Switchs.addClass("ak-Switch");
        if (Switchs.parent().children("label").length < 1) {
            Switchs.parent().append("<label />")
        }
        Switchs.next("label").attr("data-name", this.attr("name"));
        Switchs.each(function() {
            var $switch = $(this);
            $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2);
            $(window).resize(function() {
                $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2)
            });
            if ($switch.is(":checked") && !$switch.is(":disabled")) {
                $switch.next("label").addClass(options.checkedClass).removeClass(options.disabledClass)
            } else {
                if (!$switch.is(":checked") && $switch.is(":disabled")) {
                    $switch.next("label").removeClass(options.checkedClass).addClass(options.disabledClass)
                } else {
                    if ($switch.is(":disabled") || $switch.is(":checked")) {
                        $switch.next("label").addClass(options.disabledClass).addClass(options.checkedClass)
                    } else {
                        if (!$switch.is(":checked") && !$switch.is(":disabled")) {
                            $switch.next("label").removeClass(options.checkedClass).removeClass(options.disabledClass)
                        }
                    }
                }
            }
            $switch.unbind();
            $switch.on("change",
                function() {
                    $(this).next("label").toggleClass(options.checkedClass);
                    options.onChange($(this)[0].checked)
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Tabs (2018-12-13)--------------------------------------------*/
(function($) {
    var Plugin = function(elem, options) {
        this.$wrapper = elem;
        this.timer = null;
        this.playTimer = null;
        this.iNow = 0;
        this.defaults = {
            curDisplay: 1,
            touchmode: false,
            mouse: "click",
            playDelay: 1000,
            content_dom: "",
            boxheight: false,
            navlength: false,
            fullclass: "bor_bottom2 bor_title c_title",
            emptyclass: "bor_bottom bor_gray_ddd",
            changeMethod: "default",
            autoPlay: false,
            callback: function() {},
            changeback: function() {}
        };
        this.opts = $.extend({},
            this.defaults, options)
    };
    Plugin.prototype = {
        inital: function() {
            var self = this;
            $(function() {
                self.setData();
                self.tabInital()
            });
            AKjs_UserAgent();
            if (!IsMobile) {
                $(window).resize(function() {
                    self.setData();
                })
            }
            this.$tab_list = this.$wrapper.children("nav").children("ul").children("li");
            if (this.opts.content_dom) {
                this.$tabCont_art = $(this.opts.content_dom)
            } else {
                this.$tabCont_art = this.$wrapper.children("article")
            }
            this.$tabCont_wrap = this.$tabCont_art.children("div");
            this.$tab_cont = this.$tabCont_wrap.find("section");
            if (this.opts.mouse === "click") {
                this.$tab_list.click(function() {
                    self.changeTab($(this).index());
                    self.iNow = $(this).index()
                })
            } else {
                if (this.opts.mouse === "hover") {
                    this.$tab_list.hover(function() {
                            var cur_obj = this;
                            clearTimeout(self.timer);
                            self.timer = setTimeout(function() {
                                    self.changeTab($(cur_obj).index())
                                },
                                30);
                            self.iNow = $(this).index()
                        },
                        function() {
                            clearTimeout(self.timer)
                        })
                } else {
                    this.$tab_list.click(function() {
                        self.changeTab($(this).index());
                        self.iNow = $(this).index()
                    })
                }
            }
            if (this.opts.autoPlay) {
                clearInterval(this.playTimer);
                this.playTimer = setInterval(function() {
                        self.autoPlay()
                    },
                    this.opts.playDelay);
                this.$wrapper.hover(function() {},
                    function() {
                        self.playTimer = setInterval(function() {
                                self.autoPlay()
                            },
                            this.opts.playDelay)
                    })
            }
            var tmp = this.opts.curDisplay;
            if (this.opts.touchmode) {
                var touchStartY = 0,
                    touchStartX = 0,
                    mouseStartY = 0,
                    mouseStartX = 0;
                this.$tab_cont.on({
                    touchstart: function(e) {
                        touchStartY = e.originalEvent.touches[0].clientY;
                        touchStartX = e.originalEvent.touches[0].clientX
                    },
                    touchend: function(e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX,
                            tabsize = self.$tab_list.length;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 5) {++tmp;
                                if (tmp > tabsize) {
                                    tmp = 1
                                }
                                self.$tab_list.eq(tmp - 1).click()
                            } else {--tmp;
                                if (tmp == 0) {
                                    tmp = tabsize
                                }
                                self.$tab_list.eq(tmp - 1).click()
                            }
                        }
                        touchStartY = null;
                        touchStartX = null
                    },
                    touchmove: function(e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    }
                });
                if (!IsMobile) {
                    this.$tab_cont.on({
                        mousedown: function(e) {
                            mouseStartY = e.originalEvent.clientY;
                            mouseStartX = e.originalEvent.clientX
                        },
                        mouseup: function(e) {
                            var mouseEndY = e.originalEvent.screenY,
                                mouseEndX = e.originalEvent.screenX,
                                yDiff = mouseStartY - mouseEndY,
                                xDiff = mouseStartX - mouseEndX,
                                tabsize = self.$tab_list.length;
                            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                                if (xDiff > 5) {++tmp;
                                    if (tmp > tabsize) {
                                        tmp = 1
                                    }
                                    self.$tab_list.eq(tmp - 1).click()
                                } else {--tmp;
                                    if (tmp == 0) {
                                        tmp = tabsize
                                    }
                                    self.$tab_list.eq(tmp - 1).click()
                                }
                            }
                            mouseStartY = null;
                            mouseStartX = null
                        },
                        mousemove: function(e) {
                            e.preventDefault()
                        }
                    });
                }
            }
        },
        setData: function() {
            if (this.$tab_list.length == this.opts.navlength) {
                this.$tab_list.removeClass("pl_1em pr_1em");
                this.$tab_list.parent("ul").removeClass("nav_line").addClass("nav_line_c");
                this.$tab_list.parent("ul").addClass("length" + this.$tab_list.length)
            }
            this.$tab_cont.css({
                "width": this.$tabCont_art.width()
            });
            if (this.opts.boxheight) {
                this.$tabCont_wrap.parent().css({
                    height: this.opts.boxheight
                });
                this.$tab_cont.css({
                    height: this.opts.boxheight
                })
            } else {
                this.$tabCont_wrap.parent().css({
                    "height": "auto"
                })
            }
            var tabCont_w = this.$tab_cont.width();
            var tabCont_h = this.$tab_cont.height();
            var tabCont_len = this.$tab_cont.length;
            switch (this.opts.changeMethod) {
                case "default":
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    break;
                case "horizontal":
                    this.$tabCont_wrap.css({
                        width:
                            tabCont_w * tabCont_len
                    });
                    this.$tab_cont.addClass("fl");
                    break;
                case "vertical":
                    this.$tabCont_wrap.css({
                        height:
                            tabCont_h * tabCont_len
                    });
                    break;
                case "opacity":
                    this.$tab_cont.css({
                        display:
                            "block"
                    });
                    break;
                default:
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    break
            }
        },
        tabInital: function() {
            var curNum = this.opts.curDisplay - 1;
            this.$tab_list.removeClass(this.opts.fullclass);
            this.$tab_list.eq(curNum).addClass(this.opts.fullclass);
            this.$tab_cont.eq(curNum).nextAll().addClass("dis_none_im");
            this.opts.callback(this.$tab_cont.eq(curNum), curNum);
            if (this.opts.changeMethod != "vertical") {
                this.$tab_cont.css({
                    "height": "0",
                    "margin-bottom": "1%"
                });
                this.$tab_cont.eq(curNum).css({
                    "height": "auto"
                })
            } else {
                if (!this.opts.boxheight) {
                    this.$tabCont_wrap.parent().css({
                        height: this.$tab_cont.eq(curNum).outerHeight()
                    })
                }
            }
            if (this.opts.changeMethod === "default" || this.opts.changeMethod === "opacity") {
                this.$tab_cont.eq(curNum).css({
                    display: "block"
                })
            } else {
                if (this.opts.changeMethod === "horizontal") {
                    this.$tabCont_wrap.css({
                        left: -curNum * this.$tab_cont.width()
                    })
                } else {
                    if (this.opts.changeMethod === "vertical") {
                        this.$tabCont_wrap.css({
                            top: -curNum * this.$tab_cont.height()
                        })
                    } else {
                        this.$tab_cont.eq(curNum).css({
                            display: "block"
                        })
                    }
                }
            }
            this.iNow = this.opts.curDisplay - 1
        },
        changeTab: function(index) {
            this.$tab_list.removeClass(this.opts.fullclass).addClass(this.opts.emptyclass).removeAttr("style");
            this.$tab_list.eq(index).removeClass(this.opts.emptyclass).addClass(this.opts.fullclass);
            this.$tab_cont.removeClass("dis_none_im");
            this.opts.changeback(this.$tab_cont.eq(index), index);
            if (this.opts.changeMethod != "vertical") {
                var that = this;
                setTimeout(function() {
                        that.$tab_cont.css({
                            "height": "0"
                        });
                        that.$tab_cont.eq(index).css({
                            "height": "auto"
                        })
                    },
                    500);
                this.$tab_cont.eq(index).css({
                    "height": "auto"
                })
            }
            switch (this.opts.changeMethod) {
                case "default":
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    this.$tab_cont.eq(index).css({
                        display:
                            "block"
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break;
                case "horizontal":
                    this.$tabCont_wrap.stop().animate({
                        left:
                            this.$tab_cont.width() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        })
                    }
                    break;
                case "vertical":
                    this.$tabCont_wrap.stop().animate({
                        top:
                            this.$tab_cont.height() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        })
                    }
                    break;
                case "opacity":
                    this.$tab_cont.addClass("animated");
                    this.$tab_cont.removeClass("rel fadeIn zindex_2").addClass("abs fadeOut");
                    this.$tab_cont.eq(index).removeClass("abs fadeOut").addClass("rel fadeIn zindex_2");
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break;
                default:
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    this.$tab_cont.eq(index).css({
                        display:
                            "block"
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break
            }
        },
        autoPlay: function() {
            if (this.iNow === this.$tab_list.length - 1) {
                this.iNow = 0
            } else {
                this.iNow++
            }
            this.changeTab(this.iNow)
        },
        constructor: Plugin
    };
    $.fn.AKjs_Tabs = function(options) {
        var plugin = new Plugin(this, options);
        return plugin.inital()
    }
} (jQuery));

/*-----------------------------------------------AKjs_Template (2018-12-13)--------------------------------------------*/
(function($, undefined) {
    var oldManip = $.fn.domManip,
        tmplItmAtt = "_tmplitem",
        newTmplItems = {},
        wrappedItems = {},
        appendToTmplItems,
        topTmplItem = {
            key: 0,
            data: {}
        },
        itemKey = 0,
        cloneIndex = 0,
        stack = [];
    var regex = {
        sq_escape: /([\\'])/g,
        sq_unescape: /\\'/g,
        dq_unescape: /\\\\/g,
        nl_strip: /[\r\t\n]/g,
        shortcut_replace: /\$\{([^\}]*)\}/g,
        lang_parse: /\{\%(\/?)(\w+|.)(?:\(((?:[^\%]|\%(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\%]|\%(?!\}))*?)\))?\s*\%\}/g,
        old_lang_parse: /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        template_anotate: /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,
        text_only_template: /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        html_expr: /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! |\{\%! /,
        last_word: /\w$/
    };

    function newTmplItem(options, parentItem, fn, data) {
        var newItem = {
            data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            AKjs_Template: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if(options) {
            $.extend(newItem, options, { nodes: [], parent: parentItem });
        }
        if(fn) {
            newItem.AKjs_Template = fn;
            newItem._ctnt = newItem._ctnt || $.isFunction(newItem.AKjs_Template) && newItem.AKjs_Template($, newItem) || fn;
            newItem.key = ++itemKey;
            (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
        }
        return newItem;
    }
    $.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        $.fn[ name ] = function(selector) {
            var ret = [], insert = $(selector), elems, i, l, tmplItems,
                parent = this.length === 1 && this[0].parentNode;

            appendToTmplItems = newTmplItems || {};
            if(parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[ original ](this[0]);
                ret = this;
            } else {
                for(i = 0,l = insert.length; i < l; i++) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    $(insert[i])[ original ](elems);
                    ret = ret.concat(elems);
                }
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector);
            }
            tmplItems = appendToTmplItems;
            appendToTmplItems = null;
            $.AKjs_Template.complete(tmplItems);
            return ret;
        };
    });

    $.fn.extend({
        AKjs_Template: function(data, options, parentItem) {
            var ele = $(this[0]);
            ele.addClass("ak-for");
            var ret = $.AKjs_Template(ele, data, options, parentItem);
            if (options.callback != undefined) {
                newTmplItem(options.callback(ele,ret));
            }
            $(function() {
                ele.removeClass("ak-for");
                ele.find(".ak-for").removeClass("ak-for");
                ele.children().eq(0).remove();
                ret.appendTo(ele);
            });
            return ret;
        },
        tmplItem: function() {
            var ret = $.tmplItem(this[0]);
            return ret;
        },
        template: function(name) {
            var ret = $.template(name, this[0]);
            return ret;
        },

        domManip: function(args, table, callback, options) {
            if(args[0] && $.isArray(args[0])) {
                var dmArgs = $.makeArray(arguments), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
                while(i < elemsLength && !(tmplItem = $.data(elems[i++], "tmplItem"))) {
                }
                if(tmplItem && cloneIndex) {
                    dmArgs[2] = function(fragClone) {
                        $.AKjs_Template.afterManip(this, fragClone, callback);
                    };
                }
                oldManip.apply(this, dmArgs);
            } else {
                oldManip.apply(this, arguments);
            }
            cloneIndex = 0;
            if(!appendToTmplItems) {
                $.AKjs_Template.complete(newTmplItems);
            }
            return this;
        }
    });

    $.extend({
        AKjs_Template: function(AKjs_Template, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if(topLevel) {
                parentItem = topTmplItem;
                AKjs_Template = $.template[AKjs_Template] || $.template(null, AKjs_Template);
                wrappedItems = {};
            } else if(!AKjs_Template) {
                AKjs_Template = parentItem.AKjs_Template;
                newTmplItems[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if(parentItem.wrapped) {
                    updateWrapped(parentItem, parentItem.wrapped);
                }
                return $(build(parentItem, null, parentItem.AKjs_Template($, parentItem)));
            }
            if(!AKjs_Template) {
                return [];
            }
            if(typeof data === "function") {
                data = data.call(parentItem || {});
            }
            if(options && options.wrapped) {
                updateWrapped(options, options.wrapped);
            }
            ret = $.isArray(data) ?
                $.map(data, function(dataItem) {
                    return dataItem ? newTmplItem(options, parentItem, AKjs_Template, dataItem) : null;
                }) :
                [ newTmplItem(options, parentItem, AKjs_Template, data) ];
            return topLevel ? $(build(parentItem, null, ret)) : ret;
        },
        tmplItem: function(elem) {
            var tmplItem;
            if(elem instanceof $) {
                elem = elem[0];
            }
            while(elem && elem.nodeType === 1 && !(tmplItem = $.data(elem,
                "tmplItem")) && (elem = elem.parentNode)) {
            }
            return tmplItem || topTmplItem;
        },
        template: function(name, AKjs_Template) {
            if(AKjs_Template) {
                if(typeof AKjs_Template === "string") {
                    AKjs_Template = buildTmplFn(AKjs_Template)
                } else if(AKjs_Template instanceof $) {
                    AKjs_Template = AKjs_Template[0] || {};
                }
                if(AKjs_Template.nodeType) {
                    AKjs_Template = $.data(AKjs_Template, "AKjs_Template") || $.data(AKjs_Template, "AKjs_Template", buildTmplFn(AKjs_Template.innerHTML));
                }
                return typeof name === "string" ? ($.template[name] = AKjs_Template) : AKjs_Template;
            }
            return name ? (typeof name !== "string" ? $.template(null, name) :
                ($.template[name] || $.template(null, name))) : null;
        },
        encode: function(text) {
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });

    $.extend($.AKjs_Template, {
        tag: {
            "AKjs_Template": {
                _default: { $2: "null" },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            "wrap": {
                _default: { $2: "null" },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: { $2: "$index, $value" },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                open: "}else{"
            },
            "elif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "elseif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: { $1: "$data" },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(items) {
            newTmplItems = {};
        },
        afterManip: function afterManip(elem, fragClone, callback) {
            var content = fragClone.nodeType === 11 ?
                $.makeArray(fragClone.childNodes) : fragClone.nodeType === 1 ? [fragClone] : [];
            callback.call(elem, fragClone);
            storeTmplItems(content);
            cloneIndex++;
        }
    });

    function build(tmplItem, nested, content) {
        var frag, ret = content ? $.map(content, function(item) {
            return (typeof item === "string") ?
                (tmplItem.key ? item.replace(regex.template_anotate, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2") : item) : build(item, tmplItem, item._ctnt);
        }) : tmplItem;
        if(nested) {
            return ret;
        }
        ret = ret.join("");
        ret.replace(regex.text_only_template, function(all, before, middle, after) {
            frag = $(middle).get();
            storeTmplItems(frag);
            if(before) {
                frag = unencode(before).concat(frag);
            }
            if(after) {
                frag = frag.concat(unencode(after));
            }
        });
        return frag ? frag : unencode(ret);
    }

    function unencode(text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        return $.makeArray(el.childNodes);
    }
    function buildTmplFn(markup) {
        var parse_tag = function(all, slash, type, fnargs, target, parens, args) {
            if(!type) {
                return "');__.push('";
            }
            var tag = $.AKjs_Template.tag[ type ], def, expr, exprAutoFnDetect;
            if(!tag) {
                return "');__.push('";
            }
            def = tag._default || [];
            if(parens && !regex.last_word.test(target)) {
                target += parens;
                parens = "";
            }
            if(target) {
                target = unescape(target);
                args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
                expr = parens ? (target.indexOf(".") > -1 ? target + unescape(parens) : ("(" + target + ").call($item" + args)) : target;
                exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
            } else {
                exprAutoFnDetect = expr = def.$1 || "null";
            }
            fnargs = unescape(fnargs);
            return "');" +
                tag[ slash ? "close" : "open" ]
                    .split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true")
                    .split("$1a").join(exprAutoFnDetect)
                    .split("$1").join(expr)
                    .split("$2").join(fnargs || def.$2 || "") +
                "__.push('";
        };
        var depreciated_parse = function() {
            if($.AKjs_Template.tag[arguments[2]]) {
                return parse_tag.apply(this, arguments);
            } else {
                return "');__.push('{{" + arguments[2] + "}}');__.push('";
            }
        };
        var parsed_markup_data = "var $=$,call,__=[],$data=$item.data; with($data){__.push('";
        var parsed_markup = $.trim(markup);
        parsed_markup = parsed_markup.replace(regex.sq_escape, "\\$1");
        parsed_markup = parsed_markup.replace(regex.nl_strip, " ");
        parsed_markup = parsed_markup.replace(regex.shortcut_replace, "{%= $1%}");
        parsed_markup = parsed_markup.replace(regex.lang_parse,  parse_tag);
        parsed_markup = parsed_markup.replace(regex.old_lang_parse, depreciated_parse);
        parsed_markup_data += parsed_markup;
        parsed_markup_data += "');}return __;";
        return new Function("$", "$item", parsed_markup_data);
    }
    function updateWrapped(options, wrapped) {
        options._wrap = build(options, true, $.isArray(wrapped) ? wrapped : [regex.html_expr.test(wrapped) ? wrapped : $(wrapped).html()]
        ).join("");
    }
    function unescape(args) {
        return args ? args.replace(regex.sq_unescape, "'").replace(regex.dq_unescape, "\\") : null;
    }
    function outerHtml(elem) {
        var div = document.createElement("div");
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    }
    function storeTmplItems(content) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for(i = 0,l = content.length; i < l; i++) {
            if((elem = content[i]).nodeType !== 1) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for(m = elems.length - 1; m >= 0; m--) {
                processItemKey(elems[m]);
            }
            processItemKey(elem);
        }
        function processItemKey(el) {
            var pntKey, pntNode = el, pntItem, tmplItem, key;
            if((key = el.getAttribute(tmplItmAtt))) {
                while(pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(tmplItmAtt))) {
                }
                if(pntKey !== key) {
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute(tmplItmAtt) || 0)) : 0;
                    if(!(tmplItem = newTmplItems[key])) {
                        tmplItem = wrappedItems[key];
                        tmplItem = newTmplItem(tmplItem, newTmplItems[pntNode] || wrappedItems[pntNode]);
                        tmplItem.key = ++itemKey;
                        newTmplItems[itemKey] = tmplItem;
                    }
                    if(cloneIndex) {
                        cloneTmplItem(key);
                    }
                }
                el.removeAttribute(tmplItmAtt);
            } else if(cloneIndex && (tmplItem = $.data(el, "tmplItem"))) {
                cloneTmplItem(tmplItem.key);
                newTmplItems[tmplItem.key] = tmplItem;
                pntNode = $.data(el.parentNode, "tmplItem");
                pntNode = pntNode ? pntNode.key : 0;
            }
            if(tmplItem) {
                pntItem = tmplItem;
                while(pntItem && pntItem.key != pntNode) {
                    pntItem.nodes.push(el);
                    pntItem = pntItem.parent;
                }
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                $.data(el, "tmplItem", tmplItem);
            }
            function cloneTmplItem(key) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] =
                    (newClonedItems[key] || newTmplItem(tmplItem,
                        newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent));
            }
        }
    }
    function tiCalls(content, AKjs_Template, data, options) {
        if(!content) {
            return stack.pop();
        }
        stack.push({ _: content, AKjs_Template: AKjs_Template, item:this, data: data, options: options });
    }
    function tiNest(AKjs_Template, data, options) {
        return $.AKjs_Template($.template(AKjs_Template), data, options, this);
    }
    function tiWrap(call, wrapped) {
        var options = call.options || {};
        options.wrapped = wrapped;
        return $.AKjs_Template($.template(call.AKjs_Template), call.data, options, call.item);
    }
    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return $.map(
            $($.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"),
            function(e) {
                return textOnly ?
                    e.innerText || e.textContent :
                    e.outerHTML || outerHtml(e);
            });
    }
    function tiUpdate() {
        var coll = this.nodes;
        $.AKjs_Template(null, null, null, this).insertBefore(coll[0]);
        $(coll).remove();
    }
} (jQuery));

/*-----------------------------------------------AKjs_Textarea (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Textarea = function(setting) {
        var opm = $.extend({
                maxlength: 300,
                rows: 6,
                onTextVal: function() {}
            },
            setting);
        var txt =$(this);
        if (txt.length > 0) {
            txt.each(function(){
                $(this).after('<span class="dis_block_im ovh abs center text_al_r text_12px">' +
                    '<var class="text_08em" style="color: #f16a6a;">0</var>' +
                    '/' +
                    '<var class="text_08em mr_03em">'+opm.maxlength+'</var>' +
                    '</span>');
                $(this).next("span").css({
                    "width": $(this).width(),
                    "left": ($(window).width() - $(this).width()) /2
                });
                $(this).attr("rows",opm.rows).attr("maxlength",opm.maxlength);
                $(this).parent().css({
                    "padding-bottom": $(this).next("span").height() * 1.2+"px"
                })
            });
            var len = 0;
            txt.on("input propertychange",function(e){
                if( len >= opm.maxlength && e.keyCode == 8 ){
                    return;
                }else{
                    var textareaVal = ($(this).val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    var entLen = textareaVal.split('|').length-1;
                    var strLen = textareaVal.split('|').join('').length;
                    $(this).attr('maxlength',opm.maxlength+(entLen*2));
                    len = strLen;
                    if( len >= opm.maxlength ){
                        len = opm.maxlength;
                    }
                    $(this).next("span").children("var").eq(0).html(len);
                    var data = $(this).val();

                    if (strLen > 0) {
                        opm.onTextVal(data);
                    }
                }
            });
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_TimeAxis (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_TimeAxis = function(setting) {
        var option = $.extend({
                firstbox: "",
                boxsize: "",
                textstyle: "",
                data:[],
                callback:function(){
                }
            },
            setting);
        function TimeAxis(el) {
            this.el = el;
            this.initEvents();
        }
        TimeAxis.prototype = {
            initEvents : function() {
                var obj = this;
                obj.el.each(function() {
                    $(this).addClass("ak-TimeAxis");
                    $(this).html("<cite><strong></strong></cite><ul></ul>");
                    var datalist = $(this).children("ul");
                    var tmp = "";
                    for(var i = 0; i < option.data.length; i++){
                        tmp += '<li>';
                        tmp += '    <section>';
                        tmp += '        <h6>'+option.data[i].time+'</h6>';
                        tmp += '    </section>';
                        tmp += '    <locator>';
                        tmp += '        <span></span>';
                        tmp += '    </locator>';
                        tmp += '    <article>';
                        tmp += '        <p>'+option.data[i].value+'</p>';
                        tmp += '    </article>';
                        tmp += '</li>';
                    }
                    datalist.html(tmp);
                    datalist.children("li").eq(0).children("section").addClass(option.firstbox);
                    datalist.find("section h6").addClass(option.textstyle);
                    $(this).children("cite").css({
                        "width": option.boxsize
                    });
                    datalist.find("section").css({
                        "width": option.boxsize,
                        "height": option.boxsize,
                        "line-height": option.boxsize,
                        "left": "-"+option.boxsize
                    });
                    datalist.find("locator").css({
                        "left": "-"+option.boxsize
                    });
                    datalist.find("article").css({
                        "margin-left": "-"+option.boxsize
                    });
                    option.callback($(this));
                });
            }
        };
        var el = new TimeAxis($(this));
    };
} (jQuery));

/*-----------------------------------------------AKjs_TimeClock (2018-12-13)--------------------------------------------*/
(function($) {
    var ak_Clock = function(elem, ctx, opts) {
        this.$element = elem;
        this.context = ctx;
        this.defaults = {
            hCol: '#555',
            mCol: '#555',
            sCol: 'red',
            isNumCol: '#000',
            noNumCol: '#999',
            dCol: '#000'
        };
        this.options = $.extend({}, this.defaults, opts);
    };
    ak_Clock.prototype = {
        drawBackground: function(_ctx, r, rem, isNumCol, noNumCol) {
            _ctx.save();
            _ctx.translate(r, r);
            _ctx.beginPath();
            _ctx.strokeStyle = '#ffffff';
            _ctx.lineWidth = 0;
            _ctx.stroke();
            var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            _ctx.font = 18 * rem + 'px Arial';
            _ctx.textAlign = 'center';
            _ctx.textBaseline = 'middle';
            hourNumbers.forEach(function(number, i) {
                var rad = 2 * Math.PI / 12 * i;
                var x = Math.cos(rad) * (r - 30 * rem);
                var y = Math.sin(rad) * (r - 30 * rem);
                _ctx.fillText(number, x, y)
            });
            for (var i = 0; i < 60; i++) {
                var rad = 2 * Math.PI / 60 * i;
                var x = Math.cos(rad) * (r - 16 * rem);
                var y = Math.sin(rad) * (r - 16 * rem);
                _ctx.beginPath();
                if (i % 5 == 0) {
                    _ctx.fillStyle = isNumCol;
                    _ctx.arc(x, y, 2.4 * rem, 0, 2 * Math.PI, false)
                } else {
                    _ctx.fillStyle = noNumCol;
                    _ctx.arc(x, y, 1.8 * rem, 0, 2 * Math.PI, false)
                }
                _ctx.fill()
            }
        },
        drawHour: function(_ctx, r, rem, hour, minute, hCol) {
            var radH = 2 * Math.PI / 12 * hour;
            var radM = 2 * Math.PI / 12 / 60 * minute;
            _ctx.save();
            _ctx.beginPath();
            _ctx.rotate(radH + radM);
            _ctx.strokeStyle = hCol;
            _ctx.lineWidth = 3 * rem;
            _ctx.lineCap = "round";
            _ctx.moveTo(0, 10 * rem);
            _ctx.lineTo(0, -r + 60 * rem);
            _ctx.stroke();
            _ctx.restore();
        },
        drawMinute: function(_ctx, r, rem, minute, mCol) {
            var rad = 2 * Math.PI / 60 * minute;
            _ctx.save();
            _ctx.beginPath();
            _ctx.rotate(rad);
            _ctx.strokeStyle = mCol;
            _ctx.lineWidth = 3 * rem;
            _ctx.lineCap = "round";
            _ctx.moveTo(0, 10 * rem);
            _ctx.lineTo(0, -r + 40 * rem);
            _ctx.stroke();
            _ctx.restore();
        },
        drawSecond: function(_ctx, r, rem, second, sCol) {
            var rad = 2 * Math.PI / 60 * second;
            _ctx.save();
            _ctx.beginPath();
            _ctx.rotate(rad);
            _ctx.fillStyle = sCol;
            _ctx.moveTo( - 2 * rem, 20 * rem);
            _ctx.lineTo(2 * rem, 20 * rem);
            _ctx.lineTo(1, -r + 20 * rem);
            _ctx.lineTo( - 1, -r + 20 * rem);
            _ctx.fill();
            _ctx.restore();
        },
        drawDot: function(_ctx, r, rem, dCol) {
            _ctx.beginPath();
            _ctx.fillStyle = dCol;
            _ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
            _ctx.fill();
        },
        draw: function() {
            var width = this.$element.width(),
                height = this.$element.height(),
                _ctx = this.context,
                r = width / 2,
                rem = width / 200,
                isNumCol = this.options.isNumCol,
                noNumCol = this.options.noNumCol,
                hCol = this.options.hCol,
                mCol = this.options.mCol,
                sCol = this.options.sCol,
                dCol = this.options.dCol;
            var date = new Date(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                second = date.getSeconds();
            _ctx.clearRect(0, 0, width, height);
            this.drawBackground(_ctx, r, rem, isNumCol, noNumCol);
            this.drawHour(_ctx, r, rem, hour, minute, hCol);
            this.drawMinute(_ctx, r, rem, minute, mCol);
            this.drawSecond(_ctx, r, rem, second, sCol);
            this.drawDot(_ctx, r, rem, dCol);
            _ctx.restore();
        }
    };
    $.fn.AKjs_TimeClock = function(options) {
        var _self = this;
        var ctx = this.get(0).getContext('2d');
        _self.addClass("bor_rad_50");
        setInterval(function() {
            var TimeClock = new ak_Clock(_self, ctx, options);
            TimeClock.draw();
        }, 1000);
    }
} (jQuery));

/*-----------------------------------------------AKjs_ToolTip (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ToolTip = function(options) {
        var defaults = {
                background: '#777777',
                color: '#ffffff',
                opacity: '0.8',
                customHtml: ""
            },
            options = $.extend(defaults, options);
        return this.each(function() {
            var elem = $(this);
            var title = elem.attr('title');
            if(title != undefined && title != '') {
                var htmls = title;
            } else {
                var htmls = options.customHtml;
            }
            var tooltip = $('<div class="ak-tooltip" />');
            elem.attr('title','');
            elem.hover(function(e) {
                tooltip.hide().appendTo('body').html(htmls).hide().css({
                    'background-color' : options.background,
                    'color' : options.color,
                    'opacity' : options.opacity
                })
                    .fadeIn(500);
            },
            function() {
                tooltip.remove();
            });
            elem.mousemove(function(e) {
                tooltip.css({
                    top: e.pageY - tooltip.outerHeight() - 10,
                    left: e.pageX - (tooltip.outerWidth()/2) + 2
                });
            });
        });
    }
} (jQuery));

/*-----------------------------------------------AKjs_Typeahead (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_Typeahead = function(element, options) {
        var _this = this;
        $(function() {
            _this.$element = $(element);
            _this.options = $.extend(true, {}, $.fn.AKjs_Typeahead.defaults, options);
            _this.$menu = $("<div class=\"ak-typeahead\"></div>").appendTo("body");
            _this.shown = false;
            _this.eventSupported = _this.options.eventSupported || _this.eventSupported;
            _this.grepper = _this.options.grepper || _this.grepper;
            _this.highlighter = _this.options.highlighter || _this.highlighter;
            _this.lookup = _this.options.lookup || _this.lookup;
            _this.matcher = _this.options.matcher || _this.matcher;
            _this.render = _this.options.render || _this.render;
            _this.init = _this.options.init || _this.init;
            _this.ele_show = _this.options.ele_show || _this.ele_show;
            _this.select = _this.options.select || _this.select;
            _this.sorter = _this.options.sorter || _this.sorter;
            _this.source = _this.options.source || _this.source;
            AKjs_UserAgent();
            if (!_this.source.length) {
                var ajax = _this.options.ajax;
                if (typeof ajax === "string") {
                    _this.ajax = $.extend({},
                        $.fn.AKjs_Typeahead.defaults.ajax, {
                            url: ajax
                        })
                } else {
                    _this.ajax = $.extend({},
                        $.fn.AKjs_Typeahead.defaults.ajax, ajax)
                }
                if (!_this.ajax.url) {
                    _this.ajax = null
                }
            }
            _this.init();
            _this.listen()
        });
    };
    AKjs_Typeahead.prototype = {
        constructor: AKjs_Typeahead,
        init: function() {
            var that = this;
            that.$element.bind("focus", function() {
                that.ele_show(1);
                if (that.$element.val().length === 0 && that.$menu.children("ul").find("li").length === 0 && that.$menu.outerHeight() < 10) {
                    that.$menu.children("ul").hide();
                    that.options.CallBack(true,$(this),that.$menu);
                } else {
                    that.$menu.children("ul").show();
                    that.options.CallBack(false,$(this),that.$menu);
                }
            });
            $(document).on("mousedown", function(e) {
                if ($(e.target).closest(that.$menu).length === 0 && $(e.target).closest(that.$element).length === 0) {
                    that.$menu.hide();
                    that.options.CallBack(false,$(this),that.$menu);
                }
            });
            that.$element.bind("input propertychange", function() {
                that.ele_show(1);
                that.options.CallBack(false,$(this),that.$menu);
                if (that.$element.val().length === 0 && that.$menu.children("ul").find("li").length === 0) {
                    that.$menu.children("ul").hide();
                } else {
                    that.$menu.children("ul").show();
                }
                if (that.$element.val().length == 0) {
                    that.$menu.children("ul").empty();
                }
            });
        },
        show: function() {
            var that = this;
            that.ele_show();
            this.$menu.bind("touchstart",
                function() {
                    document.activeElement.blur();
                });
            return this
        },
        ele_show: function(flag) {
            var that = this;
            if (flag) {
                that.$menu.on("touchmove",
                    function(event) {
                        event.preventDefault()
                    })
            } else {
                that.$menu.unbind("touchmove")
            }
            that.$menu.show();
            if (IsMobile) {
                that.$element.parent().parent().addClass("ak-is_search w_100 zindex_show fix top_0 left_0");
                that.$menu.css({
                    "top": that.$element.parent().parent().outerHeight()-1,
                    "left": "0",
                    "width": "100%"
                });
                that.$menu.children("ul").addClass("bor_none scrolling_touch scrollbar").css({
                    "overflow-y": "scroll",
                    "height": $(window).height()
                });
                $("header").addClass("dis_opa_0");
                $("main").addClass("mt_0");
                $("#ak-scrollview").removeClass("scrolling_touch").addClass("ovh_im");
            } else {
                that.$menu.children("ul").find("li:last").addClass("mb_0");
                that.$menu.addClass(that.options.boxClass);
                that.$menu.css({
                    "top": that.$element.offset().top + that.$element.outerHeight(),
                    "left": that.$element.offset().left,
                    "width": that.options.boxsize[0]
                });
                that.$menu.children("ul").addClass("scrolling_touch scrollbar").css({
                    "overflow-y": "scroll",
                    "max-height": that.options.boxsize[1]
                });
                $(window).resize(function () {
                    that.$menu.css({
                        "top": that.$element.offset().top + that.$element.outerHeight(),
                        "left": that.$element.offset().left
                    });
                });
                if ($('#ak-scrollview').length > 0) {
                    var $scrollbar = $("#ak-scrollview");
                } else {
                    var $scrollbar = $("main");
                }
                $scrollbar.scroll(function(){
                    that.$menu.hide();
                });
                $(window).scroll(function(){
                    that.$menu.hide();
                });
            }
            $(window).bind("hashchange", function() {
                that.$menu.remove();
                $("header").removeClass("dis_opa_0");
                if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                    $("main").addClass("mt_0");
                } else {
                    $("main").removeClass("mt_0");
                }
                $("#ak-scrollview").addClass("scrolling_touch");
            });
            that.options.showCallBack(that.$menu);
            that.shown = true
        },
        hide: function() {
            if (IsMobile) {
                this.$element.parent().parent().removeClass("ak-is_search w_100 zindex_show fix top_0 left_0");
                $("header").removeClass("dis_opa_0");
                if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                    $("main").addClass("mt_0");
                } else {
                    $("main").removeClass("mt_0");
                }
                $("#ak-scrollview").addClass("scrolling_touch").removeClass("ovh_im");
            }
            this.$menu.hide();
            this.shown = false;
            return this
        },
        eventSupported: function(eventName) {
            var isSupported = (eventName in this.$element);
            if (!isSupported) {
                this.$element.setAttribute(eventName, "return;");
                isSupported = typeof this.$element[eventName] === "function"
            }
            return isSupported
        },
        ajaxer: function() {
            var that = this,
                query = that.$element.val();
            if (query === that.query) {
                return that
            }
            that.query = query;
            if (that.ajax.timerId) {
                clearTimeout(that.ajax.timerId);
                that.ajax.timerId = null
            }
            if (!query || query.length < that.ajax.triggerLength) {
                if (that.ajax.xhr) {
                    that.ajax.xhr.abort();
                    that.ajax.xhr = null;
                    that.ajaxToggleLoadClass(false)
                }
                return that.shown ? that.hide() : that
            }
            that.ajax.timerId = setTimeout(function() {
                    $.proxy(that.ajaxExecute(query), that)
                },
                that.ajax.timeout);
            return that
        },
        ajaxExecute: function(query) {
            this.ajaxToggleLoadClass(true);
            if (this.ajax.xhr) {
                this.ajax.xhr.abort()
            }
            var params = this.ajax.preDispatch ? this.ajax.preDispatch(query) : {
                query: query
            };
            var jAjax = (this.ajax.method === "post") ? $.post: $.get;
            this.ajax.xhr = jAjax(this.ajax.url, params, $.proxy(this.ajaxLookup, this));
            this.ajax.timerId = null
        },
        ajaxLookup: function(data) {
            var items;
            this.ajaxToggleLoadClass(false);
            if (!this.ajax.xhr) {
                return
            }
            if (this.ajax.preProcess) {
                data = this.ajax.preProcess(data)
            }
            this.ajax.data = data;
            items = this.grepper(this.ajax.data);
            if (!items || !items.length) {
                return this.shown ? this.hide() : this
            }
            this.ajax.xhr = null;
            return this.render(items.slice(0, this.options.items)).show()
        },
        ajaxToggleLoadClass: function(enable) {
            if (!this.ajax.loadingClass) {
                return
            }
            this.$element.toggleClass(this.ajax.loadingClass, enable)
        },
        lookup: function(event) {
            var that = this,
                items;
            if (that.ajax) {
                that.ajaxer()
            } else {
                that.query = that.$element.val();
                if (!that.query) {
                    return that.shown ? that.hide() : that
                }
                items = that.grepper(that.source);
                if (!items || !items.length) {
                    return that.shown ? that.show() : that
                }
                return that.render(items.slice(0, that.options.items)).show()
            }
        },
        grepper: function(data) {
            var that = this,
                items;
            if (data && data.length && !data[0].hasOwnProperty(that.options.display)) {
                return null
            }
            items = $.grep(data,
                function(item) {
                    return that.matcher(item[that.options.display], item)
                });
            return this.sorter(items)
        },
        matcher: function(item) {
            return~item.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(items) {
            var that = this,
                beginswith = [],
                caseSensitive = [],
                caseInsensitive = [],
                item;
            while (item = items.shift()) {
                if (!item[that.options.display].toLowerCase().indexOf(this.query.toLowerCase())) {
                    beginswith.push(item)
                } else {
                    if (~item[that.options.display].indexOf(this.query)) {
                        caseSensitive.push(item)
                    } else {
                        caseInsensitive.push(item)
                    }
                }
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function(item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return item.replace(new RegExp("(" + query + ")", "ig"),
                function($1, match) {
                    return "<strong>" + match + "</strong>"
                })
        },
        render: function(items) {
            var that = this;
            this.$menu.html("<ul />");
            items = $(items).map(function(i, item) {
                i = $("<li class=\"touchstart\"></li>").attr("data-value", item[that.options.val]);
                if (item[that.options.custom] != undefined) {
                    i.html("<span class='fl'>"+that.highlighter(item[that.options.display], item)+"</span><span class='fr'>"+item[that.options.custom]+"</span>");
                } else {
                    i.html("<span class='fl'>"+that.highlighter(item[that.options.display], item)+"</span>");
                }
                return i[0]
            });
            items.first().addClass("ak-is_active");
            this.$menu.children("ul").html(items);
            return this
        },
        select: function() {
            var that = this;
            var $selectedItem = this.$menu.find(".ak-is_active").find("span.fl");
            setTimeout(function() {
                document.activeElement.blur();
                that.hide();
                that.$element.val($selectedItem.text()).change()
            }, 150);
            this.$menu.children("ul").empty();
            this.options.itemSelected($selectedItem, $selectedItem.parent().attr("data-value"), $selectedItem.text());
            return
        },
        next: function(event) {
            var active = this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            var next = active.next();
            if (!next.length) {
                next = $(this.$menu.find("li")[0])
            }
            next.addClass("ak-is_active")
        },
        prev: function(event) {
            var active = this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            var prev = active.prev();
            if (!prev.length) {
                prev = this.$menu.find("li").last()
            }
            prev.addClass("ak-is_active")
        },
        listen: function() {
            this.$element.on("blur", $.proxy(this.blur, this)).on("input propertychange", $.proxy(this.keyup, this));
            if (this.eventSupported("keydown")) {
                this.$element.on("keydown", $.proxy(this.keypress, this))
            } else {
                this.$element.on("keypress", $.proxy(this.keypress, this))
            }
            this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this))
        },
        keyup: function(e) {
            e.stopPropagation();
            e.preventDefault();
            switch (e.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown) {
                        return
                    }
                    this.select();
                    break;
                case 27:
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
        },
        keypress: function(e) {
            e.stopPropagation();
            if (!this.shown) {
                return
            }
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault();
                    this.prev();
                    break;
                case 40:
                    e.preventDefault();
                    this.next();
                    break
            }
        },
        blur: function(e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            if (that.$element.val().length == 0) {
                that.$menu.children("ul").hide();
            }
            setTimeout(function() {
                document.activeElement.blur();
            }, 150);
        },
        click: function(e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            if ($(e.target).closest(that.$menu.find("li")).length > 0) {
                that.select();
            }
        },
        mouseenter: function(e) {
            this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            $(e.currentTarget).addClass("ak-is_active")
        }
    };
    $.fn.AKjs_Typeahead = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("ak_typeahead"),
                options = typeof option === "object" && option;
            if (!data) {
                $this.data("ak_typeahead", (data = new AKjs_Typeahead(this, options)))
            }
            if (typeof option === "string") {
                data[option]()
            }
        })
    };
    $.fn.AKjs_Typeahead.defaults = {
        source: [],
        items: 20,
        display: "name",
        val: "id",
        custom: "text",
        boxsize: ["20em","30em"],
        boxClass: "",
        CallBack: function() {},
        showCallBack: function() {},
        itemSelected: function() {},
        ajax: {
            url: null,
            timeout: 300,
            method: "post",
            triggerLength: 3,
            loadingClass: null,
            displayField: null,
            preDispatch: null,
            preProcess: null
        }
    };
    $.fn.AKjs_Typeahead.Constructor = AKjs_Typeahead;
    $(function() {
        $("body").on("focus.ak_typeahead.data-api", '[data-provide="ak_typeahead"]',
            function(e) {
                var $this = $(this);
                if ($this.data("ak_typeahead")) {
                    return
                }
                e.preventDefault();
                $this.AKjs_Typeahead($this.data())
            })
    })
} (jQuery));

/*-----------------------------------------------AKjs_TypeIt (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_TypeIt = function(el, options) {
        this.el = $(el);
        this.options = $.extend({}, $.fn.AKjs_TypeIt.defaults, options);
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.stringsElement = this.options.stringsElement;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.shuffle = this.options.shuffle;
        this.sequence = [];
        this.build();
    };
    AKjs_TypeIt.prototype = {
        constructor: AKjs_TypeIt,
        init: function() {
            var self = this;
            self.timeout = setTimeout(function() {
                for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;
                if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        },
        build: function() {
            var self = this;
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"ak-TypeIt-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                this.strings = [];
                this.stringsElement.hide();
                console.log(this.stringsElement.children());
                var strings = this.stringsElement.children();
                $.each(strings, function(key, value){
                    self.strings.push($(value).html());
                });
            }
            this.init();
        },
        typewrite: function(curString, curStrPos) {
            if (this.stop === true) {
                return;
            }
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;
            self.timeout = setTimeout(function() {
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1;
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }
                if (self.contentType === 'html') {
                    var curChar = curString.substr(curStrPos).charAt(0);
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        }
                        else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                            if (curStrPos + 1 > curString.length) { break; }
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }
                self.timeout = setTimeout(function() {
                    if (curStrPos === curString.length) {
                        self.options.onString(self.arrayPos);
                        if (self.arrayPos === self.strings.length - 1) {
                            self.options.callback(self);
                            self.curLoop++;
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function() {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);

                    } else {
                        if (curStrPos === 0) {
                            self.options.preString(self.arrayPos);
                        }
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }
                        curStrPos++;
                        self.typewrite(curString, curStrPos);
                    }
                }, charPause);
            }, humanize);
        },
        backspace: function(curString, curStrPos) {
            if (this.stop === true) {
                return;
            }
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;
            self.timeout = setTimeout(function() {
                if (self.contentType === 'html') {
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos - 1).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                            if (curStrPos < 0) { break; }
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }
                if (curStrPos > self.stopNum) {
                    curStrPos--;
                    self.backspace(curString, curStrPos);
                }
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;
                        if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);
                        self.init();
                    } else
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                }
            }, humanize);
        },
        shuffleArray: function(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }
    };
    $.fn.AKjs_TypeIt = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('TypeIt'),
                options = typeof option == 'object' && option;
            $this.data('TypeIt', (data = new AKjs_TypeIt(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.AKjs_TypeIt.defaults = {
        strings: [],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: false,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: 'html',
        callback: function() {},
        preString: function() {},
        onString: function() {}
    };
} (jQuery));

/*-----------------------------------------------AKjs_Validate (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Validate = function(setting) {
        var option = $.extend({
                valid: "",
                VerifyClass: "c_red",
                focusBack: function() {},
                clickBack: function() {}
            },
            setting);
        AKjs_RegsInput();
        var form = $(this);
        var ctrls = form.find('[data-valid]');
        var isDiy = false;
        $.each(option.valid, function(key, val) {
            if (option.valid[key].hasOwnProperty('success')) {
                return ! (isDiy = true);
            }
        });
        $.each(ctrls, function(index, ele) {
            var key = $(ele).attr('data-valid');
            $(ele).parent().find("sub").remove();
            $(ele).parent().append("<sub class='dis_none_im' style='white-space: pre;line-height: "+$(ele).outerHeight()+"px;' data-error='"+key+"' />");
            $(ele).on('change', function() {
                if (!test(ele, key)) {
                    $(ele).focus();
                    option.focusBack($(ele),index,false);
                } else {
                    option.focusBack($(ele),index,true);
                }
            });
        });
        form.find(":submit").on("click", function(ev) {
            if (form.find('[type="submit"]').disabled()) {
                ev.preventDefault();
            }
            var vResult = true;
            var isFocus = true;
            $.each(ctrls, function(index, ele) {
                var key = $(ele).attr('data-valid');
                if (!test(ele, key)) {
                    if (isFocus) {
                        $(ele).focus();
                        option.focusBack($(ele),index,false);
                        isFocus = false;
                    }
                    vResult = false;
                    if (!isDiy) {
                        return false;
                    }
                }
            });
            if (option.clickBack && option.clickBack.constructor === Function) {
                ev.preventDefault();
                if (vResult) {
                    option.clickBack($(this), form, true);
                } else {
                    option.clickBack($(this), form, false);
                }
            } else {
                if (!vResult) {
                    ev.preventDefault();
                }
            }
        });
        function test(ele, key) {
            var va = option.valid[key];
            var errDom = isDiy ? null: form.find('[data-error="' + key + '"]');
            if ($(ele).prop('type') == 'radio' || $(ele).prop('type') == 'checkbox') {
                return $.inRange(form.find('[data-valid="' + key + '"]:checked').length, va.norm) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            } else if (va.norm.context) {
                return $(ele).val() == va.norm.val() && $(ele).val().length > 0 ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            } else {
                return va.norm.test($(ele).val()) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            }
        }
        function fnError(ts, va, errDom, empty, error) {
            if (ts.val().length < 1) {
                if (empty != undefined) {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05em '+option.VerifyClass).html("* "+empty);
                } else {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05em '+option.VerifyClass).html("* "+error);
                }
            } else {
                if (isDiy) {
                    va.error(ts);
                } else {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05em '+option.VerifyClass).html("* "+error);
                }
            }
            return false;
        }
        function fnSuccess(ts, va, errDom) {
            if (isDiy) {
                va.success(ts);
            } else {
                setTimeout(function() {
                    errDom.addClass("dis_none_im").removeClass('abs ml_05em '+option.VerifyClass).html('');
                }, 200);
            }
            return true;
        }
        $.fn.message = function(status,str) {
            var _ts = $(this);
            if (status == true) {
                _ts.parent().children("text").remove();
                _ts.parent().children("sub").addClass("dis_none_im");
                if (typeof str != undefined && str !="" && str !=null) {
                    _ts.parent().append("<text style='white-space: pre;line-height: "+_ts.outerHeight()+"px;' />");
                    _ts.parent().children("text").addClass('abs ml_05em '+option.VerifyClass).html("* "+str);
                }
                _ts.focus();
                $("button#ak-validateBtn").remove();
                form.find(":submit").parent().append("<button type='button' id='ak-validateBtn' class='"+form.find(":submit").attr("class")+"'>"+form.find(":submit").text()+"</button>");
                form.find(":submit").addClass("dis_none_im");
                $("button#ak-validateBtn").removeClass("dis_none_im");
                $("button#ak-validateBtn").on("click", function(ev) {
                    ev.preventDefault();
                    _ts.focus();
                });
            }
            if (status == false) {
                _ts.parent().children("text").removeClass('abs ml_05em '+option.VerifyClass).html("").remove();
                form.find(":submit").removeClass("dis_none_im");
                $("button#ak-validateBtn").remove();
            }
            return _ts.hasClass('dis_none_im');
        };
    };
    $.fn.disabled = function(status) {
        var _ts = $(this);
        if (status == true) {
            _ts.addClass('disabled');
            _ts.attr('disabled', true);
        }
        if (status == false) {
            _ts.removeClass('disabled');
            _ts.attr('disabled', false);
        }
        return _ts.hasClass('disabled') || typeof _ts.attr('disabled') != 'undefined';
    };
    $.inRange = function(num, range) {
        if (typeof range == 'string') {
            range = range.replace(/ /g, '');
        }
        if (!/^\(|\)|\[|\]$/.test(range)) {
            return num == parseFloat(range);
        } else if (/^\(\d*\.?\d*,[\)\]]$/.test(range)) {
            return num > parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\)$/.test(range)) {
            return num < parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\(|\)/g, '').split(',');
            return num > parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,[\)\]]$/.test(range)) {
            return num >= parseFloat(range.replace(/\[|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\]$/.test(range)) {
            return num <= parseFloat(range.replace(/\(|,|\]/g, ''));
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\[|\]/g, '').split(',');
            return num >= parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\(|\]/g, '').split(',');
            return num > parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\[|\)/g, '').split(',');
            return num >= parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else {
            return false;
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Viewer (2018-12-13)--------------------------------------------*/
(function($) {
    function isString(s) {
        return typeof s === 'string';
    }
    function isNumber(n) {
        return typeof n === 'number' && !isNaN(n);
    }
    function isUndefined(u) {
        return typeof u === 'undefined';
    }
    function toArray(obj, offset) {
        var args = [];
        if (isNumber(offset)) {
            args.push(offset);
        }
        return args.slice.apply(obj, args);
    }
    function proxy(fn, context) {
        var args = toArray(arguments, 2);
        return function () {
            return fn.apply(context, args.concat(toArray(arguments)));
        };
    }
    function getTransform(options) {
        var transforms = [];
        var rotate = options.rotate;
        var scaleX = options.scaleX;
        var scaleY = options.scaleY;
        if (isNumber(rotate)) {
            transforms.push('rotate(' + rotate + 'deg)');
        }
        if (isNumber(scaleX) && isNumber(scaleY)) {
            transforms.push('scale(' + scaleX + ',' + scaleY + ')');
        }
        return transforms.length ? transforms.join(' ') : 'none';
    }
    function forceReflow(element) {
        return element.offsetWidth;
    }
    function getImageName(url) {
        return isString(url) ? url.replace(/^.*\//, '').replace(/[\?&#].*$/, '') : '';
    }
    function getImageSize(image, callback) {
        var newImage;
        if (image.naturalWidth) {
            return callback(image.naturalWidth, image.naturalHeight);
        }
        newImage = document.createElement('img');

        newImage.onload = function () {
            callback(this.width, this.height);
        };
        newImage.src = image.src;
    }
    function getTouchesCenter(touches) {
        var length = touches.length;
        var pageX = 0;
        var pageY = 0;

        if (length) {
            $.each(touches, function (i, touch) {
                pageX += touch.pageX;
                pageY += touch.pageY;
            });

            pageX /= length;
            pageY /= length;
        }

        return {
            pageX: pageX,
            pageY: pageY
        };
    }
    function getResponsiveClass(option) {
        switch (option) {
            case 2:
                return $class_hide_xs_down;
            case 3:
                return $class_hide_sm_down;
            case 4:
                return $class_hide_md_down;
        }
    }
    function ak_Viewer(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ak_Viewer.defaults, $.isPlainObject(options) && options);
        this.isImg = false;
        this.isBuilt = false;
        this.isShown = false;
        this.isViewed = false;
        this.isFulled = false;
        this.isPlayed = false;
        this.wheeling = false;
        this.playing = false;
        this.fading = false;
        this.tooltiping = false;
        this.transitioning = false;
        this.action = false;
        this.target = false;
        this.timeout = false;
        this.index = 0;
        this.length = 0;
        this.init();
    }
    var $window = $(window),
        $document = $(document),
        $namespace = "viewer",
        $element_viewer = document.createElement($namespace),
        $class_fixed = "fix",
        $class_open = "scrolling_touch",
        $class_show = "dis_block_im",
        $class_hide = "dis_none_im",
        $class_hide_xs_down = "ak-viewer-hide-xs-down",
        $class_hide_sm_down = "ak-viewer-hide-sm-down",
        $class_hide_md_down = "ak-viewer-hide-md-down",
        $class_fade = "ak-viewer-fade",
        $class_in = "ak-viewer-in",
        $class_move = "ak-viewer-move",
        $class_active = "ak-viewer-active",
        $class_invisible = "ak-viewer-invisible",
        $class_transition = "ak-viewer-transition",
        $class_fullscreen = "ak-viewer-fullscreen",
        $class_fullscreen_exit = "ak-viewer-fullscreen-exit",
        $class_close = "ak-viewer-close",
        $selector_img = "img",
        $event_mousedown = "mousedown touchstart pointerdown MSPointerDown",
        $event_mousemove = "mousemove touchmove pointermove MSPointerMove",
        $event_mouseup = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
        $event_wheel = "wheel mousewheel DOMMouseScroll",
        $event_transitionend = "transitionend",
        $event_load = "load." + $namespace,
        $event_keydown = "keydown." + $namespace,
        $event_click = "click." + $namespace,
        $event_resize = "resize." + $namespace,
        $event_build = "build." + $namespace,
        $event_built = "built." + $namespace,
        $event_show = "show." + $namespace,
        $event_shown = "shown." + $namespace,
        $event_hide = "hide." + $namespace,
        $event_hidden = "hidden." + $namespace,
        $event_view = "view." + $namespace,
        $event_viewed = "viewed." + $namespace,
        $support_transition = "undefined" != typeof $element_viewer.style.transition,
        round = Math.round,
        sqrt = Math.sqrt,
        abs = Math.abs,
        min = Math.min,
        max = Math.max,
        num = Number;
    ak_Viewer.prototype = {
        constructor: ak_Viewer,
        init: function() {
            var options = this.options,
                $this = this.$element,
                isImg = $this.is($selector_img),
                $images = isImg ? $this: $this.find($selector_img),
                length = $images.length,
                ready = $.proxy(this.ready, this);
            length && ($.isFunction(options.build) && $this.one($event_build, options.build),
            this.trigger($event_build).isDefaultPrevented() || ($support_transition || (options.transition = !1),
                this.isImg = isImg,
                this.length = length,
                this.count = 0,
                this.$images = $images,
                this.$body = $("main"),
                options.inline ? ($this.one($event_built, $.proxy(function() {
                    this.view();
                },
                this)),
                $images.each(function() {
                this.complete ? ready() : $(this).one($event_load, ready)
            })) : $this.on($event_click, $.proxy(this.start, this))));
        },
        ready: function() {
            this.count++,
            this.count === this.length && this.build()
        },
        build: function() {
            var $parent, $viewer, $title, $toolbar, $navbar, $button, options = this.options,
                $this = this.$element;
            this.isBuilt || (
                this.$parent = $parent = $this.parent(),
                    this.$viewer = $viewer = $(ak_Viewer.template),
                    this.$canvas = $viewer.find(".ak-viewer-canvas"),
                    this.$footer = $viewer.find(".ak-viewer-footer"),
                    this.$title = $title = $viewer.find(".ak-viewer-title"),
                    this.$toolbar = $toolbar = $viewer.find(".ak-viewer-toolbar"),
                    this.$navbar = $navbar = $viewer.find(".ak-viewer-navbar"),
                    this.$button = $button = $viewer.find(".ak-viewer-button"),
                    this.$tooltip = $viewer.find(".ak-viewer-tooltip"),
                    this.$player = $viewer.find(".ak-viewer-player"),
                    this.$list = $viewer.find(".ak-viewer-list"),
                    $title.addClass(options.title ? getResponsiveClass(options.title) : $class_hide),
                    $toolbar.addClass(options.toolbar ? getResponsiveClass(options.toolbar) : $class_hide),
                    $toolbar.find("li[class*=zoom]").toggleClass($class_invisible, !options.zoomable),
                    $toolbar.find("li[class*=flip]").toggleClass($class_invisible, !options.scalable),
                options.rotatable || $toolbar.find("li[class*=rotate]").addClass($class_invisible).appendTo($toolbar),
                    $navbar.addClass(options.navbar ? getResponsiveClass(options.navbar) : $class_hide),
                    options.inline ? ($button.addClass($class_fullscreen),
                        $viewer.css("z-index", options.zIndexInline),
                    "static" === $parent.css("position") && $parent.css("position", "relative")) : ($button.addClass($class_close),
                        $viewer.css("z-index", options.zIndex).addClass([$class_fixed, $class_fade, $class_hide].join(" "))),
                    $("body").append($viewer),
                options.inline && (this.render(), this.bind(), this.isShown = !0),
                    this.isBuilt = !0, $.isFunction(options.built) && $this.one($event_built, options.built),
                    this.trigger($event_built));
        },
        unbuild: function() {
            var options = this.options,
                $this = this.$element;
            this.isBuilt && (options.inline && $this.removeClass($class_hide), this.$viewer.remove())
        },
        bind: function() {
            var options = this.options,
                $this = this.$element;
            $.isFunction(options.view) && $this.on($event_view, options.view),
            $.isFunction(options.viewed) && $this.on($event_viewed, options.viewed),
                this.$viewer.on($event_click, $.proxy(this.click, this)).on($event_wheel, $.proxy(this.wheel, this)),
                this.$canvas.on($event_mousedown, $.proxy(this.mousedown, this)),
                $document.on($event_mousemove, this._mousemove = proxy(this.mousemove, this)).on($event_mouseup, this._mouseup = proxy(this.mouseup, this)).on($event_keydown, this._keydown = proxy(this.keydown, this)),
                $window.on($event_resize, this._resize = proxy(this.resize, this))
        },
        unbind: function() {
            var options = this.options,
                $this = this.$element;
            $.isFunction(options.view) && $this.off($event_view, options.view),
            $.isFunction(options.viewed) && $this.off($event_viewed, options.viewed),
                this.$viewer.off($event_click, this.click).off($event_wheel, this.wheel),
                this.$canvas.off($event_mousedown, this.mousedown),
                $document.off($event_mousemove, this._mousemove).off($event_mouseup, this._mouseup).off($event_keydown, this._keydown),
                $window.off($event_resize, this._resize)
        },
        render: function() {
            this.initContainer();
            this.initViewer();
            this.initList();
            this.renderViewer();
        },
        initContainer: function() {
            this.container = {
                width: $window.innerWidth(),
                height: $window.innerHeight()
            }
        },
        initViewer: function() {
            var viewer,
                options = this.options,
                $parent = this.$parent;
            options.inline && (this.parent = viewer = {
                width: max($parent.width(), options.minWidth),
                height: max($parent.height(), options.minHeight)
            }),
            (this.isFulled || !viewer) && (viewer = this.container),
                this.viewer = $.extend({}, viewer);
        },
        renderViewer: function() {
            this.options.inline && !this.isFulled && this.$viewer.css(this.viewer)
        },
        initList: function() {
            var options = this.options,
                $this = this.$element,
                $list = this.$list,
                list = [];
            this.$images.each(function(g) {
                var j = this.src,
                    e = this.alt || getImageName(j),
                    f = options.url;
                j && (isString(f) ? f = this.getAttribute(f) : $.isFunction(f) && (f = f.call(this, this)), list.push('<li><img src="' + j + '" data-action="view" data-index="' + g + '" data-url="' + (f || j) + '" alt="' + e + '"></li>'))
            }),
                $list.html(list.join("")).find($selector_img).one($event_load, {
                        filled: !0
                    },
                    $.proxy(this.loadImage, this)),
                this.$items = $list.children(),
            options.transition && $this.one($event_viewed,
                function() {
                    $list.addClass($class_transition);
                });
        },
        renderList: function(index) {
            var i = index || this.index,
                width = this.$items.eq(i).width(),
                outerWidth = width + 1;
            this.$list.css({
                width: outerWidth * (this.length + 10),
                marginLeft: (this.viewer.width - width) / 2 - outerWidth * i
            });
        },
        resetList: function() {
            this.$list.empty().removeClass($class_transition).css("margin-left", 0);
        },
        initImage: function(callback) {
            var options = this.options,
                $image = this.$image,
                viewer = this.viewer,
                footerHeight = this.$footer.height(),
                viewerWidth = viewer.width,
                viewerHeight = max(viewer.height - footerHeight, footerHeight),
                oldImage = this.image || {};
            getImageSize($image[0], $.proxy(function(naturalWidth, naturalHeight) {
                    var initialImage, image, aspectRatio = naturalWidth / naturalHeight,
                        width = viewerWidth,
                        height = viewerHeight;
                    viewerHeight * aspectRatio > viewerWidth ? height = viewerWidth / aspectRatio: width = viewerHeight * aspectRatio,
                        width = min(0.9 * width, naturalWidth),
                        height = min(0.9 * height, naturalHeight),
                        image = {
                            naturalWidth: naturalWidth,
                            naturalHeight: naturalHeight,
                            aspectRatio: aspectRatio,
                            ratio: width / naturalWidth,
                            width: width,
                            height: height,
                            left: (viewerWidth - width) / 2,
                            top: (viewerHeight - height) / 2
                        },
                        initialImage = $.extend({},
                            image),
                    options.rotatable && (image.rotate = oldImage.rotate || 0, initialImage.rotate = 0),
                    options.scalable && (image.scaleX = oldImage.scaleX || 1, image.scaleY = oldImage.scaleY || 1, initialImage.scaleX = 1, initialImage.scaleY = 1),
                        this.image = image,
                        this.initialImage = initialImage,
                    $.isFunction(callback) && callback()
                },
                this))
        },
        renderImage: function(a) {
            var image = this.image,
                $image = this.$image;
            $image.css({
                width: image.width,
                height: image.height,
                marginLeft: image.left,
                marginTop: image.top,
                transform: getTransform(image)
            });
            $.isFunction(a) && (this.transitioning ? $image.one($event_transitionend, a) : a())
        },
        resetImage: function() {
            this.$image.remove();
            this.$image = null
        },
        start: function(a) {
            var target = a.target;
            $(target).is("img") && (this.target = target, this.show())
        },
        click: function(a) {
            var $target = $(a.target),
                action = $target.data("action"),
                image = this.image;
            switch (action) {
                case "canvas":
                    this.isPlayed ? this.stop() : this.options.inline ? this.isFulled ? this.exit() : this.full() : this.hide();
                    break;
                case "mix":
                    this.isPlayed ? this.stop() : this.options.inline ? this.isFulled ? this.exit() : this.full() : this.hide();
                    break;
                case "view":
                    this.view($target.data("index"));
                    break;
                case "zoom-in":
                    this.zoom(0.1, !0);
                    break;
                case "zoom-out":
                    this.zoom( - 0.1, !0);
                    break;
                case "one-to-one":
                    this.toggle();
                    break;
                case "reset":
                    this.reset();
                    break;
                case "prev":
                    this.prev();
                    break;
                case "next":
                    this.next();
                    break;
                case "rotate-left":
                    this.rotate( - 90);
                    break;
                case "rotate-right":
                    this.rotate(90);
                    break;
                case "flip-horizontal":
                    this.scaleX( - image.scaleX || -1);
                    break;
                case "flip-vertical":
                    this.scaleY( - image.scaleY || -1);
                    break;
                default:
                    this.isPlayed && this.stop()
            }
        },
        load: function() {
            var options = this.options,
                viewer = this.viewer,
                $image = this.$image;
            this.timeout && (clearTimeout(this.timeout), this.timeout = !1),
                $image.removeClass($class_invisible).css("cssText", "width:0;height:0;margin-left:" + viewer.width / 2 + "px;margin-top:" + viewer.height / 2 + "px;max-width:none!important;visibility:visible;"),
                this.initImage($.proxy(function() {
                    $image.toggleClass($class_transition, options.transition).toggleClass($class_move, options.movable),
                        this.renderImage($.proxy(function() {
                            this.isViewed = !0, this.trigger($event_viewed)
                        }, this))
                    }, this));
        },
        loadImage: function(e) {
            var image = e.target,
                $image = $(image),
                $parent = $image.parent(),
                parentWidth = $parent.width(),
                parentHeight = $parent.height(),
                filled = e.data && e.data.filled;
            getImageSize(image, function(naturalWidth, naturalHeight) {
                    var aspectRatio = naturalWidth / naturalHeight,
                        width = parentWidth,
                        height = parentHeight;
                    parentHeight * aspectRatio > parentWidth ? filled ? width = parentHeight * aspectRatio: height = parentWidth / aspectRatio: filled ? height = parentWidth / aspectRatio: width = parentHeight * aspectRatio,
                        $image.css({
                            width: width,
                            height: height,
                            marginLeft: (parentWidth - width) / 2,
                            marginTop: (parentHeight - height) / 2
                        })
                })
        },
        resize: function() {
            this.initContainer(),
                this.initViewer(),
                this.renderViewer(),
                this.renderList(),
                this.initImage($.proxy(function() {
                        this.renderImage()
                    },
                    this)),
            this.isPlayed && this.$player.find($selector_img).one($event_load, $.proxy(this.loadImage, this)).trigger($event_load)
        },
        wheel: function(event) {
            var e = event.originalEvent || event,
                ratio = num(this.options.zoomRatio) || 0.1,
                delta = 1;
            this.isViewed && (event.preventDefault(), this.wheeling || (this.wheeling = !0, setTimeout($.proxy(function() {
                    this.wheeling = !1
                },
                this), 50), e.deltaY ? delta = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? delta = -e.wheelDelta / 120 : e.detail && (delta = e.detail > 0 ? 1 : -1), this.zoom( - delta * ratio, !0, event)))
        },
        keydown: function(e) {
            var options = this.options,
                which = e.which;
            if (this.isFulled && options.keyboard) {
                switch (which) {
                    case 27:
                        this.isPlayed ? this.stop() : options.inline ? this.isFulled && this.exit() : this.hide();
                        break;
                    case 32:
                        this.isPlayed && this.stop();
                        break;
                    case 37:
                        this.prev();
                        break;
                    case 38:
                        e.preventDefault(),
                            this.zoom(options.zoomRatio, !0);
                        break;
                    case 39:
                        this.next();
                        break;
                    case 40:
                        e.preventDefault(),
                            this.zoom( - options.zoomRatio, !0);
                        break;
                    case 48:
                    case 49:
                        (e.ctrlKey || e.shiftKey) && (e.preventDefault(), this.toggle())
                }
            }
        },
        mousedown: function(event) {
            var touchesLength,
                options = this.options,
                originalEvent = event.originalEvent,
                touches = originalEvent && originalEvent.touches,
                e = event,
                action = options.movable ? "move": !1;
            if (this.isViewed) {
                if (touches) {
                    if (touchesLength = touches.length, touchesLength > 1) {
                        if (!options.zoomable || 2 !== touchesLength) {
                            return
                        }
                        e = touches[1],
                            this.startX2 = e.pageX,
                            this.startY2 = e.pageY,
                            action = "zoom"
                    } else {
                        this.isSwitchable() && (action = "switch")
                    }
                    e = touches[0]
                }
                action && (event.preventDefault(), this.action = action, this.startX = e.pageX || originalEvent && originalEvent.pageX, this.startY = e.pageY || originalEvent && originalEvent.pageY)
            }
        },
        mousemove: function(event) {
            var touchesLength,
                options = this.options,
                action = this.action,
                $image = this.$image,
                originalEvent = event.originalEvent,
                touches = originalEvent && originalEvent.touches,
                e = event;
            if (this.isViewed) {
                if (touches) {
                    if (touchesLength = touches.length, touchesLength > 1) {
                        if (!options.zoomable || 2 !== touchesLength) {
                            return
                        }
                        e = touches[1],
                            this.endX2 = e.pageX,
                            this.endY2 = e.pageY
                    }
                    e = touches[0]
                }
                action && (event.preventDefault(), "move" === action && options.transition && $image.hasClass($class_transition) && $image.removeClass($class_transition), this.endX = e.pageX || originalEvent && originalEvent.pageX, this.endY = e.pageY || originalEvent && originalEvent.pageY, this.change(event))
            }
        },
        mouseup: function(event) {
            var action = this.action;
            action && (event.preventDefault(), "move" === action && this.options.transition && this.$image.addClass($class_transition), this.action = !1)
        },
        show: function() {
            var $viewer,
                options = this.options;
            options.inline || this.transitioning || (this.isBuilt || this.build(), $.isFunction(options.show) && this.$element.one($event_show, options.show), this.trigger($event_show).isDefaultPrevented() || (this.$body.removeClass($class_open), $viewer = this.$viewer.removeClass($class_hide), this.$element.one($event_shown, $.proxy(function() {
                    this.view(this.target ? this.$images.index(this.target) : this.index),
                        this.target = !1
                },
                this)), options.transition ? (this.transitioning = !0, $viewer.addClass($class_transition), forceReflow($viewer[0]), $viewer.one($event_transitionend, $.proxy(this.shown, this)).addClass($class_in)) : ($viewer.addClass($class_in), this.shown())))
        },
        hide: function() {
            var options = this.options,
                $viewer = this.$viewer;
            options.inline || this.transitioning || !this.isShown || ($.isFunction(options.hide) && this.$element.one($event_hide, options.hide), this.trigger($event_hide).isDefaultPrevented() || (this.isViewed && options.transition ? (this.transitioning = !0, this.$image.one($event_transitionend, $.proxy(function() {
                    $viewer.one($event_transitionend, $.proxy(this.hidden, this)).removeClass($class_in)
                },
                this)), this.zoomTo(0, !1, !1, !0)) : ($viewer.removeClass($class_in), this.hidden())))
        },
        view: function(index) {
            var $image,
                $item,
                $img,
                url,
                alt,
                $title = this.$title;
            index = Number(index) || 0,
            !this.isShown || this.isPlayed || 0 > index || index >= this.length || this.isViewed && index === this.index || this.trigger($event_view).isDefaultPrevented() || ($item = this.$items.eq(index), $img = $item.find($selector_img), url = $img.data("url"), alt = $img.attr("alt"), this.$image = $image = $('<img src="' + url + '" alt="' + alt + '">'), this.isViewed && this.$items.eq(this.index).removeClass($class_active), $item.addClass($class_active), this.isViewed = !1, this.index = index, this.image = null, this.$canvas.html($image.addClass($class_invisible)), this.renderList(), $title.empty(), this.$element.one($event_viewed, $.proxy(function() {
                    var image = this.image,
                        width = image.naturalWidth,
                        height = image.naturalHeight;
                    $title.html(alt + " (" + width + " &times; " + height + ")")
                },
                this)), $image[0].complete ? this.load() : ($image.one($event_load, $.proxy(this.load, this)), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout($.proxy(function() {
                    $image.removeClass($class_invisible),
                        this.timeout = !1
                },
                this), 1000)))
        },
        prev: function() {
            this.view(max(this.index - 1, 0))
        },
        next: function() {
            this.view(min(this.index + 1, this.length - 1))
        },
        move: function(offsetX, offsetY) {
            var image = this.image;
            this.moveTo(isUndefined(offsetX) ? offsetX: image.left + num(offsetX), isUndefined(offsetY) ? offsetY: image.top + num(offsetY))
        },
        moveTo: function(x, y) {
            var image = this.image,
                changed = !1;
            isUndefined(y) && (y = x),
                x = num(x),
                y = num(y),
            this.isViewed && !this.isPlayed && this.options.movable && (isNumber(x) && (image.left = x, changed = !0), isNumber(y) && (image.top = y, changed = !0), changed && this.renderImage())
        },
        zoom: function(ratio, hasTooltip, _event) {
            var image = this.image;
            ratio = num(ratio),
                ratio = 0 > ratio ? 1 / (1 - ratio) : 1 + ratio,
                this.zoomTo(image.width * ratio / image.naturalWidth, hasTooltip, _event)
        },
        zoomTo: function(ratio, hasTooltip, _event, _zoomable) {
            var originalEvent, newWidth, newHeight, offset, center, options = this.options,
                minZoomRatio = 0.01,
                maxZoomRatio = 100,
                image = this.image,
                width = image.width,
                height = image.height;
            ratio = max(0, ratio),
            isNumber(ratio) && this.isViewed && !this.isPlayed && (_zoomable || options.zoomable) && (_zoomable || (minZoomRatio = max(minZoomRatio, options.minZoomRatio), maxZoomRatio = min(maxZoomRatio, options.maxZoomRatio), ratio = min(max(ratio, minZoomRatio), maxZoomRatio)), ratio > 0.95 && 1.05 > ratio && (ratio = 1), newWidth = image.naturalWidth * ratio, newHeight = image.naturalHeight * ratio, _event && (originalEvent = _event.originalEvent) ? (offset = this.$viewer.offset(), center = originalEvent.touches ? getTouchesCenter(originalEvent.touches) : {
                pageX: _event.pageX || originalEvent.pageX || 0,
                pageY: _event.pageY || originalEvent.pageY || 0
            },
                image.left -= (newWidth - width) * ((center.pageX - offset.left - image.left) / width), image.top -= (newHeight - height) * ((center.pageY - offset.top - image.top) / height)) : (image.left -= (newWidth - width) / 2, image.top -= (newHeight - height) / 2), image.width = newWidth, image.height = newHeight, image.ratio = ratio, this.renderImage(), hasTooltip && this.tooltip())
        },
        rotate: function(a) {
            this.rotateTo((this.image.rotate || 0) + num(a))
        },
        rotateTo: function(degree) {
            var image = this.image;
            degree = num(degree),
            isNumber(degree) && this.isViewed && !this.isPlayed && this.options.rotatable && (image.rotate = degree, this.renderImage())
        },
        scale: function(scaleX, scaleY) {
            var image = this.image,
                changed = !1;
            isUndefined(scaleY) && (scaleY = scaleX),
                scaleX = num(scaleX),
                scaleY = num(scaleY),
            this.isViewed && !this.isPlayed && this.options.scalable && (isNumber(scaleX) && (image.scaleX = scaleX, changed = !0), isNumber(scaleY) && (image.scaleY = scaleY, changed = !0), changed && this.renderImage())
        },
        scaleX: function(scaleX) {
            this.scale(scaleX, this.image.scaleY)
        },
        scaleY: function(scaleY) {
            this.scale(this.image.scaleX, scaleY)
        },
        stop: function() {
            this.isPlayed && (this.options.fullscreen && this.exitFullscreen(), this.isPlayed = !1, clearTimeout(this.playing), this.$player.removeClass($class_show).empty())
        },
        full: function() {
            var options = this.options,
                $image = this.$image,
                $list = this.$list;
            this.isShown && !this.isPlayed && !this.isFulled && options.inline && (this.isFulled = !0, this.$body.removeClass($class_open), this.$button.addClass($class_fullscreen_exit), options.transition && ($image.removeClass($class_transition), $list.removeClass($class_transition)), this.$viewer.addClass($class_fixed).removeAttr("style").css("z-index", options.zIndex), this.initContainer(), this.viewer = $.extend({},
                this.container), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        options.transition && setTimeout(function() {
                                $image.addClass($class_transition),
                                    $list.addClass($class_transition)
                            },
                            0)
                    })
                },
                this)))
        },
        exit: function() {
            var options = this.options,
                $image = this.$image,
                $list = this.$list;
            this.isFulled && (this.isFulled = !1, this.$body.removeClass($class_open), this.$button.removeClass($class_fullscreen_exit), options.transition && ($image.removeClass($class_transition), $list.removeClass($class_transition)), this.$viewer.removeClass($class_fixed).css("z-index", options.zIndexInline), this.viewer = $.extend({},
                this.parent), this.renderViewer(), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        options.transition && setTimeout(function() {
                                $image.addClass($class_transition),
                                    $list.addClass($class_transition)
                            },
                            0)
                    })
                },
                this)))
        },
        tooltip: function() {
            var options = this.options,
                $tooltip = this.$tooltip,
                image = this.image,
                classes = [$class_show, $class_fade, $class_transition].join(" ");
            this.isViewed && !this.isPlayed && options.tooltip && ($tooltip.text(round(100 * image.ratio) + "%"), this.tooltiping ? clearTimeout(this.tooltiping) : options.transition ? (this.fading && $tooltip.trigger($event_transitionend), $tooltip.addClass(classes), forceReflow($tooltip[0]), $tooltip.addClass($class_in)) : $tooltip.addClass($class_show), this.tooltiping = setTimeout($.proxy(function() {
                    options.transition ? ($tooltip.one($event_transitionend, $.proxy(function() {
                            $tooltip.removeClass(classes),
                                this.fading = !1
                        },
                        this)).removeClass($class_in), this.fading = !0) : $tooltip.removeClass($class_show),
                        this.tooltiping = !1
                },
                this), 1000))
        },
        toggle: function() {
            1 === this.image.ratio ? this.zoomTo(this.initialImage.ratio, !0) : this.zoomTo(1, !0)
        },
        reset: function() {
            this.isViewed && !this.isPlayed && (this.image = $.extend({},
                this.initialImage), this.renderImage())
        },
        update: function() {
            var index,
                $this = this.$element,
                $images = this.$images,
                indexes = [];
            if (this.isImg) {
                if (!$this.parent().length) {
                    return this.destroy()
                }
            } else {
                this.$images = $images = $this.find($selector_img),
                    this.length = $images.length
            }
            this.isBuilt && ($.each(this.$items,
                function(f) {
                    var g = $(this).find("img")[0],
                        h = $images[f];
                    h ? h.src !== g.src && indexes.push(f) : indexes.push(f)
                }), this.$list.width("auto"), this.initList(), this.isShown && (this.length ? this.isViewed && (index = $.inArray(this.index, indexes), index >= 0 ? (this.isViewed = !1, this.view(max(this.index - (index + 1), 0))) : this.$items.eq(this.index).addClass($class_active)) : (this.$image = null, this.isViewed = !1, this.index = 0, this.image = null, this.$canvas.empty(), this.$title.empty())))
        },
        destroy: function() {
            var $this = this.$element;
            this.options.inline ? this.unbind() : (this.isShown && this.unbind(), $this.off($event_click, this.start)),
                this.unbuild(),
                $this.removeData($namespace)
        },
        trigger: function(type, data) {
            var e = $.Event(type, data);
            return this.$element.trigger(e), e
        },
        shown: function() {
            var options = this.options;
            this.transitioning = !1,
                this.isFulled = !0,
                this.isShown = !0,
                this.isVisible = !0,
                this.render(),
                this.bind(),
            $.isFunction(options.shown) && this.$element.one($event_shown, options.shown),
                this.trigger($event_shown)
        },
        hidden: function() {
            var options = this.options;
            this.transitioning = !1,
                this.isViewed = !1,
                this.isFulled = !1,
                this.isShown = !1,
                this.isVisible = !1,
                this.unbind(),
                this.$body.addClass($class_open),
                this.$viewer.addClass($class_hide),
                this.resetList(),
                this.resetImage(),
            $.isFunction(options.hidden) && this.$element.one($event_hidden, options.hidden),
                this.trigger($event_hidden)
        },
        requestFullscreen: function() {
            var documentElement = document.documentElement; ! this.isFulled || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (documentElement.requestFullscreen ? documentElement.requestFullscreen() : documentElement.msRequestFullscreen ? documentElement.msRequestFullscreen() : documentElement.mozRequestFullScreen ? documentElement.mozRequestFullScreen() : documentElement.webkitRequestFullscreen && documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))
        },
        exitFullscreen: function() {
            this.isFulled && (document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen())
        },
        change: function(event) {
            var offsetX = this.endX - this.startX,
                offsetY = this.endY - this.startY;
            switch (this.action) {
                case "move":
                    this.move(offsetX, offsetY);
                    break;
                case "zoom":
                    this.zoom(function(f, d, h, g) {
                        var k = sqrt(f * f + d * d),
                            j = sqrt(h * h + g * g);
                        return (j - k) / k
                    } (abs(this.startX - this.startX2), abs(this.startY - this.startY2), abs(this.endX - this.endX2), abs(this.endY - this.endY2)), !1, event),
                        this.startX2 = this.endX2,
                        this.startY2 = this.endY2;
                    break;
                case "switch":
                    this.action = "switched",
                    abs(offsetX) > abs(offsetY) && (offsetX > 1 ? this.prev() : -1 > offsetX && this.next())
            }
            this.startX = this.endX,
                this.startY = this.endY
        },
        isSwitchable: function() {
            var image = this.image,
                viewer = this.viewer;
            return image.left >= 0 && image.top >= 0 && image.width <= viewer.width && image.height <= viewer.height
        }
    };
    ak_Viewer.defaults = {
        inline: !1,
        button: !0,
        navbar: !0,
        title: !0,
        toolbar: !0,
        tooltip: !0,
        movable: !0,
        zoomable: !0,
        rotatable: !0,
        scalable: !0,
        transition: !0,
        fullscreen: !0,
        keyboard: !0,
        interval: 5000,
        minWidth: 200,
        minHeight: 100,
        zoomRatio: 0.1,
        minZoomRatio: 0.01,
        maxZoomRatio: 100,
        zIndex: 99,
        zIndexInline: 0,
        url: "data-url",
        build: null,
        built: null,
        show: null,
        shown: null,
        hide: null,
        hidden: null,
        view: null,
        viewed: null
    };
    ak_Viewer.template =
        '<div class="ak-viewer-container">' +
            '<div class="ak-viewer-canvas" data-action="canvas"></div>' +
            '<div class="ak-viewer-footer animated slideInUp h_10em bg_black07">' +
                '<div class="ak-viewer-title"></div>' +
                '<ul class="ak-viewer-toolbar">' +
                    '<li class="ak-viewer-one-to-one bg_black07" data-action="one-to-one"></li>' +
                    '<li class="ak-viewer-zoom-in bg_black07" data-action="zoom-in"></li>' +
                    '<li class="ak-viewer-zoom-out bg_black07" data-action="zoom-out"></li>' +
                    '<li class="ak-viewer-prev bg_black07" data-action="prev"></li>' +
                    '<li class="ak-viewer-next bg_black07" data-action="next"></li>' +
                    '<li class="ak-viewer-rotate-left bg_black07" data-action="rotate-left"></li>' +
                    '<li class="ak-viewer-rotate-right bg_black07" data-action="rotate-right"></li>' +
                    '<li class="ak-viewer-flip-horizontal bg_black07" data-action="flip-horizontal"></li>' +
                    '<li class="ak-viewer-flip-vertical bg_black07" data-action="flip-vertical"></li>' +
                    '<li class="ak-viewer-reset bg_black07" data-action="reset"></li>' +
                "</ul>" +
                '<div class="ak-viewer-navbar bg_black04">' +
                    '<ul class="ak-viewer-list"></ul>' +
                "</div>" +
            "</div>" +
            '<div class="ak-viewer-tooltip"></div>' +
            '<button type="button" class="ak-viewer-button bg_black07" data-action="mix"></button>' +
            '<div class="ak-mask"></div>' +
        "</div>";
    ak_Viewer.other = $.fn.AKjs_Viewer;
    $.fn.AKjs_Viewer = function(options) {
        var result, args = toArray(arguments, 1);
        return this.each(function() {
            var fn, $this = $(this),
                data = $this.data($namespace);
            if (!data) {
                if (/destroy|hide|exit|stop|reset/.test(options)) {
                    return
                }
                $this.data($namespace, data = new ak_Viewer(this, options));
            }
            isString(options) && $.isFunction(fn = data[options]) && (result = fn.apply(data, args));
        }),isUndefined(result) ? this: result;
    };
    $.fn.AKjs_Viewer.Constructor = ak_Viewer;
    $.fn.AKjs_Viewer.setDefaults = ak_Viewer.setDefaults,
        $.fn.AKjs_Viewer.noConflict = function() {
            return $.fn.AKjs_Viewer = ak_Viewer.other, this;
        }
} (jQuery));

/*-----------------------------------------------AKjs_Vticker (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Vticker = function(setting) {
        var option = $.extend({
                speed: 500,
                pause: 3000,
                showItems: 3,
                mousePause: true,
                isPaused: false,
                direction: "up",
                height: 0
            }, setting);
        moveUp = function(ele, LiHeight, option) {
            if (!option.isPaused) {
                ele_children = ele.children();
                var datas = ele_children.children("li:first").clone(true);
                if (option.height > 0) LiHeight = ele_children.children("li:first").outerHeight();
                ele_children.animate({
                        top: "-=" + LiHeight
                    },
                    option.speed,
                    function() {
                        $(this).children("li:first").remove();
                        $(this).css("top", "0")
                    });
                datas.appendTo(ele_children)
            }
        };
        moveDown = function(ele, LiHeight, option) {
            if (!option.isPaused) {
                ele_children = ele.children();
                var datas = ele_children.children("li:last").clone(true);
                if (option.height > 0) LiHeight = ele_children.children("li:first").outerHeight();
                ele_children.css("top", "-" + LiHeight).prepend(datas);
                ele_children.animate({
                        top: 0
                    },
                    option.speed,
                    function() {
                        $(this).children("li:last").remove()
                    });
            }
        };
        var _this = $(this);
        $(window).resize(function() {
            _this.each(function () {
                var ele = $(this),
                    LiHeight = $(this).children().children("li").outerHeight();
                if (option.height) {
                    ele.height(option.height);
                    ele.children().children("li").height(option.height / option.showItems);
                } else {
                    ele.height(LiHeight * option.showItems)
                }
            });
        });
        _this.each(function() {
            var ele = $(this),
                LiHeight = $(this).children().children("li").outerHeight();
            ele.css({
                overflow: "hidden",
                position: "relative"
            }).children().css({
                position: "absolute"
            });
            if (option.height) {
                ele.height(option.height);
                ele.children().children("li").height(option.height / option.showItems);
            } else {
                ele.height(LiHeight * option.showItems)
            }
            setInterval(function() {
                    option.direction == "up" ? moveUp(ele, LiHeight, option) : moveDown(ele, LiHeight, option)
                },
                option.pause);
            option.mousePause && ele.bind("mouseenter",
                function() {
                    option.isPaused = true
                }).bind("mouseleave",
                function() {
                    option.isPaused = false
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Waterfall (2018-12-13)--------------------------------------------*/
(function($) {
    var pluginName = 'AKjs_Waterfall',
        defaults = {
            scrollDom:$(window),
            spacingWidth: 5,
            spacingHeight: 5,
            minColCount: 2,
            itemAlign: "center",
            isFadeIn: true,
            Callback: null,
            ajaxCallback: null
        };

    function AKjs_Waterfall(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.ajaxLoading = false;
        this.colHeightArray = [];
        this._init();
    }

    AKjs_Waterfall.prototype = {
        constructor: AKjs_Waterfall,
        _init: function () {
            var $this = this;
            this.options.Callback(this.$element);
            this.$element.addClass("dis_opa_0");
            setTimeout(function() {
                $this._positionAll();
                if (!$this.$element.hasClass("dis_opa_0")) {
                    $(".ak-waterfall-down").addClass("dis_none").removeClass("abs top_0 w_100").remove();
                }
            },1000);
            $(window).resize(function(){
                $this._positionAll();
            });
            this._doScroll();
        },
        _getColumnCount: function () {
            var eleWidth = this.$element.width(),
                $item = this.$element.children(),
                itemWidth = $item.eq(0).outerWidth(),
                iCol = Math.floor(eleWidth / (itemWidth + this.options.spacingWidth)),
                realWidth = 0,
                leftOffset = 0;
            iCol = iCol > this.options.minColCount ? iCol : this.options.minColCount;
            realWidth = iCol * itemWidth;
            if(eleWidth > realWidth) {
                leftOffset = Math.floor((eleWidth - realWidth - iCol * this.options.spacingWidth) / 2);
            }
            this.itemWidth = itemWidth;
            this.cols = iCol;
            this.leftOffset = this.options.itemAlign == "center" ? leftOffset : 0;
        },
        _positionAll: function () {
            var $this = this,
                $item = $this.$element.children(),
                minHeight,
                minIndex;
            this.colHeightArray = [];
            this.$element.addClass("ak-waterfall").removeClass("dis_opa_0");
            this._getColumnCount();
            $item.each(function(index) {
                    if(index < $this.cols) {
                        $(this).css("top", 0);
                        $(this).css("left", $this.leftOffset + index * $this.itemWidth + index * $this.options.spacingWidth);
                        $this.colHeightArray.push($(this).outerHeight());
                    } else {
                        minHeight = Math.min.apply(null, $this.colHeightArray);
                        minIndex = $.inArray(minHeight, $this.colHeightArray);
                        $(this).css("top", minHeight + $this.options.spacingHeight);
                        $(this).css("left", $item.eq(minIndex).offset().left - $this.$element.offset().left);
                        $this.colHeightArray[minIndex] += $(this).outerHeight() + $this.options.spacingHeight;
                    }
                    if($this.options.isFadeIn) {
                        $(this).animate({
                            "opacity": 1
                        }, 1000);
                    }
                });
            this.$element.css("height", Math.max.apply(null, $this.colHeightArray));
        },
        _doScroll: function () {
            var $this = this,
                scrollTimer;
            var $container = $this.options.scrollDom;
            $container.on('scroll', function (andrew) {
                andrew.preventDefault();
                if(scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(function() {
                    var $first_top = $this.$element.children().first().offset().top,
                        scrollTop = $container.scrollTop() + $container.height();

                    if(!$this.ajaxLoading && scrollTop > Math.max.apply(null, $this.colHeightArray) + $first_top) {
                        $this.ajaxLoading = true;
                        $this.options.ajaxCallback && $this.options.ajaxCallback(
                            $this.$element,
                            function() {
                                $this._positionAll();
                            },
                            function() {
                                $this.ajaxLoading = false;
                            }
                        );
                    }
                }, 100);
            });
        }
    };
    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new AKjs_Waterfall(this, options));
            }
        });
        return this;
    }
} (jQuery));

/*-----------------------------------------------AKjs_WebToast (2018-12-13)--------------------------------------------*/
function AKjs_WebToast() {
    var dcfg = {
        message: "",
        position: "bottom",
        mask: "mask",
        time: ""
    };
    var AKjs_WebToast = ".ak-webtoast";
    var sub_AKjs_WebToast = AKjs_WebToast.substring(1,AKjs_WebToast.length);
    var len = arguments.length;

    if (len > 0) {
        var arg0 = arguments[0]; /*message*/
        var arg1 = arguments[1]; /*position*/
        var arg2 = arguments[2]; /*mask*/
        var arg3 = arguments[3]; /*time*/
        var regx = /(bottom|top|middle)/i;
        var regy = /(mask)/i;
        var numRegx = /[1-9]\d*/;
        if (arg0) {
            dcfg.message = arg0;
        }
        if (regx.test(arg1)) {
            dcfg.position = arg1;
        }
        if (regy.test(arg2) || arg2=="") {
            dcfg.mask = arg2;
            if (numRegx.test(arg3)) {
                dcfg.time = arg3;
            }
        } else {
            dcfg.time = arg2;
        }

    }
    if ("mask" == arg2) {
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><div class='ak-mask'></div><h3>" + dcfg.message + "</h3></div>";
    } else {
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><h3>" + dcfg.message + "</h3></div>";
    }
    if ($(AKjs_WebToast).length <= 0) {
        $("body").append(ret);
    } else {
        $(AKjs_WebToast).css("left", "");
        if ("mask" == arg2) {
            ret = "<div class='ak-mask'></div><h3>" + dcfg.message + "</h3>";
        } else {
            ret = "<h3>" + dcfg.message + "</h3>";
        }
        $(AKjs_WebToast).html(ret);
    }
    setTimeout(function () {
        $(AKjs_WebToast).fadeIn();
        ToastSetting();
    }, 100);

    $(window).resize(function(){
        ToastSetting();
    });
    function ToastSetting() {
        var w = $(AKjs_WebToast).children("h3").width(),
            ww = $(window).width();
        $(AKjs_WebToast).children("h3").css("left", (ww - w) / 2);
        if ("bottom" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", 50);
            $(AKjs_WebToast).children("h3").css("top", "");
        } else if ("top" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", 50);
        } else if ("middle" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", "");
            var h = $(AKjs_WebToast).children("h3").height(),
                hh = $(window).height();
            $(AKjs_WebToast).children("h3").css("bottom", (hh - h) / 2 - 20);
        }
    }
    if (dcfg.message==="destroy") {
        $(AKjs_WebToast).fadeOut().remove();
    }
    if (dcfg.time) {
        setTimeout(function() {
            $(AKjs_WebToast).fadeOut().remove();
        }, dcfg.time);
    }
}

/*-----------------------------------------------AKjs_ZoomImage (2018-12-13)--------------------------------------------*/
(function($) {
    var defaults = {
        fadeduration: 200,
        imgclass:"border2 bor_title"
    };
    var $ak_zoomimage;
    var currentzoominfo = {
        $zoomimage:null,
        offset:[,],
        settings:null,
        multiplier:[,]
    };
    function getDimensions($target){
        return {
            w:$target.width(),
            h:$target.height()
        }
    }
    function getoffset(what, offsettype){
        return (what.offsetParent)? what[offsettype]+getoffset(what.offsetParent, offsettype) : what[offsettype]
    }
    function AKjs_ZoomImage($img, settings){
        var s = settings || defaults;
        var trigger = 'mouseenter';
        $img.off('mouseenter').on(trigger, function(e){
            var jqueryevt = e;
            var e = jqueryevt.originalEvent.changedTouches? jqueryevt.originalEvent.changedTouches[0] : jqueryevt;
            var offset = {
                left:getoffset($img.get(0), 'offsetLeft'),
                top:getoffset($img.get(0), 'offsetTop')
            };
            var mousecoord = [e.pageX - offset.left, e.pageY - offset.top];
            var $zoomimage;
            var zoomdfd = $.Deferred();
            var imgdimensions = {
                imgw:null,
                imgh:null,
                zoomimgw:null,
                zoomimgh:null
            };
            $ak_zoomimage.html( '<img src="' + $img.attr('src') + '" />' );
            $zoomimage = $ak_zoomimage.find('img');
            if ($zoomimage.get(0).complete){
                zoomdfd.resolve();
            }
            else{
                $zoomimage.on('load', function(){
                    zoomdfd.resolve();
                });
            }
            zoomdfd.done(function(){
                var imgdimensions = getDimensions($img);
                if ($('#ak-scrollview').length > 0) {
                    var _ths_h = $("#ak-scrollview").scrollTop();
                } else {
                    var _ths_h = 0;
                }
                $ak_zoomimage.css({
                    display:'block',
                    width:$img.parent().outerWidth(),
                    height:$img.parent().outerHeight()-4,
                    left:$img.parent().offset().left,
                    top:$img.parent().offset().top - $("html").scrollTop() - _ths_h
                });
                var ak_ZoomImage_containerdimensions = getDimensions($ak_zoomimage);
                var zoomimgdimensions = getDimensions($zoomimage);
                $ak_zoomimage.stop().css({opacity:0}).animate({opacity:1}, s.fadeduration);
                currentzoominfo = {$zoomimage:$zoomimage, offset:offset, settings:s, multiplier:[zoomimgdimensions.w/ak_ZoomImage_containerdimensions.w, zoomimgdimensions.h/ak_ZoomImage_containerdimensions.h]}
            });
            jqueryevt.stopPropagation();
        });
    }
    $.fn.AKjs_ZoomImage = function(options){
        var s = $.extend({}, defaults, options);
        return this.each(function(){
            var $target = $(this);
            $target = ($target.is('img'))? $target : $target.find('img:eq(0)');
            if ($target.length == 0){
                return true;
            }
            AKjs_ZoomImage($target, s);
            if ($(".ak-ZoomImage").length == 0) {
                $ak_zoomimage = $('<div class="ak-ZoomImage" />').appendTo(document.body);
            }
            $ak_zoomimage.addClass(s.imgclass);
            $ak_zoomimage.on('mousemove', function(e){
                var $zoomimage = currentzoominfo.$zoomimage;
                var imgoffset = $(this).offset();
                var mousecoord = [e.pageX-imgoffset.left, e.pageY-imgoffset.top];
                var multiplier = currentzoominfo.multiplier;
                $zoomimage.css({
                    left: -mousecoord[0] * multiplier[0] + mousecoord[0],
                    top: -mousecoord[1] * multiplier[1] + mousecoord[1]
                });
            });
            $ak_zoomimage.on('mouseleave', function(){
                $ak_zoomimage.stop().animate({opacity:0}, currentzoominfo.settings.fadeduration, function(){
                    $(this).html("").css({
                        display:'none'
                    });
                });
            });
            $ak_zoomimage.on('mousewheel DOMMouseScroll', function (e) {
                e.preventDefault();
            });
        });
    };
} (jQuery));
