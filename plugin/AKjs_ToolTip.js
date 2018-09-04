/*
Modification Date: 2018-05-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ToolTip-------------------------------------------*/
(function($){
    $.fn.AKjs_ToolTip = function(options) {
        var defaults = {
                background: '#777777',
                color: '#ffffff',
                opacity: '0.8'
            },
            options = $.extend(defaults, options);
        return this.each(function() {
            var elem = $(this);
            var title = elem.attr('title');
            if(title != '') {
                var tooltip = $('<div class="ak-tooltip" />');
                elem.attr('title','');
                elem.hover(function(e) {
                        tooltip.hide().appendTo('body').html(title).hide().css({
                            'background-color' : options.background,
                            'color' : options.color,
                            'opacity' : options.opacity
                        })
                            .fadeIn(500);
                    },
                    function() {
                        tooltip.remove();
                    });
            }
            elem.mousemove(function(e) {
                tooltip.css({
                    top: e.pageY - tooltip.outerHeight() - 10,
                    left: e.pageX - (tooltip.outerWidth()/2) + 2
                });
            });
        });
    }
}(jQuery));