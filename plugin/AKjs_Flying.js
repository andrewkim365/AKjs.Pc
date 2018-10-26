/*
Modification Date: 2018-10-19
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Flying--------------------------------------*/
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
