/*
Modification Date: 2018-11-30
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ZoomImage-------------------------------------------*/
(function($){
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
}(jQuery));
