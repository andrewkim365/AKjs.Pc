/*
Modification Date: 2018-10-11
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Completer-------------------------------------------*/
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