/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ElementControl--------------------------------------------*/
(function($){
    var Plugin = function(ele, options) {
        this.$ele = ele;
        this.defaults = {
            dom:"",
            mouse: 'click',
            clickCallback: function() {},
            hoverCallback: function() {}
        };
        this.opts = $.extend({},
            this.defaults, options);
    };
    Plugin.prototype = {
        inital: function() {
            var self = this;
            if (self.opts.mouse === 'click') {
                this.$ele.click(function() {
                    self.opts.clickCallback(self.$ele,self.opts.dom);
                });
            } else if (self.opts.mouse === 'hover') {
                this.$ele.mouseover(function(){
                    hover = true;
                    self.opts.hoverCallback(self.$ele, self.opts.dom, hover);
                });
                this.$ele.mouseout(function(){
                    hover = false;
                    self.opts.hoverCallback(self.$ele, self.opts.dom, hover);
                });
            }
        },
        constructor: Plugin
    };
    $.fn.AKjs_ElementControl = function(options) {
        var plugin = new Plugin(this, options);
        return plugin.inital();
    };
}(jQuery));