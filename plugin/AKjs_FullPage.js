/*
Modification Date: 2018-11-13
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_FullPage------------------------------------------*/
(function ($) {
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
}(jQuery));