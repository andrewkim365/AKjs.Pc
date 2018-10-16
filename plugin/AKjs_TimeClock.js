/*
Modification Date: 2018-10-14
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_TimeClock----------------------------------------*/
(function($){
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
}(jQuery));