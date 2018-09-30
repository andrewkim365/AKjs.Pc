/*
Modification Date: 2018-09-30
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ElementControl--------------------------------------------*/
(function($){
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
}(jQuery));