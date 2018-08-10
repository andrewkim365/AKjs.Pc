/*-----------------------------------------------AKjs_FullScreen------------------------------------------*/
(function($){
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

        function Click_FullScreen() { //启动全屏
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
        function Exit_FullScreen() { //退出全屏
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
            if (evt.keyCode == 122) { //F11
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
}(jQuery));
