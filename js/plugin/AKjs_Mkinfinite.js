/*
Modification Date: 2018-07-31
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Mkinfinite-------------------------------------------*/
(function($){
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
}(jQuery));