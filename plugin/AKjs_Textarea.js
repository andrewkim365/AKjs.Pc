/*
Modification Date: 2018-09-10
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Textarea----------------------------------------*/
(function($){
    $.fn.AKjs_Textarea = function(setting) {
        var opm = $.extend({
                maxlength: 300,
                rows: 6,
                onTextVal: function() {}
            },
            setting);
        AKjs_UserAgent();
        var txt =$(this);
        if (txt.length > 0) {
            txt.each(function(){ //input元素加maxlength属性后控制自定义字数
                var _this = $(this);
                _this.next("span").remove();
                $(this).after('<span class="dis_block_im ovh abs center text_al_r text_08em">' +
                    '<var class="text_08em" style="color: #f16a6a;">0</var>' +
                    '/' +
                    '<var class="text_08em mr_03em">'+opm.maxlength+'</var>' +
                    '</span>');
                if (IsMobile) {
                    _this.next("span").css({
                        "width": _this.width(),
                        "left": ($(window).width() - _this.width()) /2
                    });
                    $(window).resize(function(){
                        _this.next("span").css({
                            "width": _this.width(),
                            "left": ($(window).width() - _this.width()) /2
                        });
                    });
                } else {
                    _this.next("span").css({
                        "width": _this.parent().width() - 10,
                        "left": 0
                    });
                    $(window).resize(function(){
                        _this.next("span").css({
                            "width": _this.parent().width() - 10,
                            "left": 0
                        });
                    });
                }
                $(this).attr("rows",opm.rows).attr("maxlength",opm.maxlength);
                $(this).parent().css({
                    "padding-bottom": $(this).next("span").height() * 1.2+"px"
                })
            });
            var len = 0;
            txt.keyup(function() {
                if( len >= opm.maxlength && e.keyCode == 8 ){
                    return;
                }else{
                    // 取出回车字符
                    var textareaVal = ($(this).val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    // 回车数量
                    var entLen = textareaVal.split('|').length-1;
                    // 不包含回车的数量
                    var strLen = textareaVal.split('|').join('').length;
                    $(this).attr('maxlength',opm.maxlength+(entLen*2));
                    len = strLen;
                    if( len >= opm.maxlength ){
                        len = opm.maxlength;
                    }
                    $(this).next("span").children("var").eq(0).html(len);
                    var data = $(this).val();

                    if (strLen > 0) {
                        opm.onTextVal(data);
                    }
                }
            });
        }
    };
}(jQuery));