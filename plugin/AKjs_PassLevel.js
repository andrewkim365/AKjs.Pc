/*
Modification Date: 2018-10-08
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_PassLevel-------------------------------------*/
(function($){
    $.fn.AKjs_PassLevel = function(setting) {
        var option = $.extend({
                O_color: "#cccccc",
                L_color: "#e85959",
                M_color: "#e85959",
                H_color: "#e85959",
                L_text: "L",
                M_text: "M",
                H_text: "H",
                callback: function() {}
            },
            setting);
        var pl = $(this);
        pl.each(function(){
            $(".ak-PassLevel").remove();
            $(this).after('<ul class="ak-PassLevel">' +
                '<li class="strength_L">'+option.L_text+'</li>' +
                '<li class="strength_M">'+option.M_text+'</li>' +
                '<li class="strength_H">'+option.H_text+'</li>' +
                '</ul>');
            $(this).nextAll(".ak-PassLevel").children("li").css('background-color', option.O_color);
            $(this).nextAll(".ak-PassLevel").hide();
            option.callback($(this),$(this).nextAll(".ak-PassLevel"),false);
            $(this).on('keyup', function(e) {
                $(this).nextAll(".ak-PassLevel").show();
                ak_pwStrength(this.value);
                $(this).nextAll(".ak-PassLevel").children(".strength_L").css('background-color', Lcolor);
                $(this).nextAll(".ak-PassLevel").children(".strength_M").css('background-color', Mcolor);
                $(this).nextAll(".ak-PassLevel").children(".strength_H").css('background-color', Hcolor);
                option.callback($(this),$(this).nextAll(".ak-PassLevel"),true);
                if ($(this).val() == 0) {
                    $(this).nextAll(".ak-PassLevel").hide();
                    option.callback($(this),$(this).nextAll(".ak-PassLevel"),false);
                }
            });
        });
        function ak_pwStrength(pwd) {
            if (pwd == null || pwd == '' || pwd == undefined) {
                Lcolor = Mcolor = Hcolor = option.O_color;
            } else {
                S_level = ak_checkStrong(pwd);
                switch (S_level) {
                    case 0:
                        Lcolor = Mcolor = Hcolor = option.O_color;
                        break;
                    case 1:
                        Lcolor = option.L_color;
                        Mcolor = Hcolor = option.O_color;
                        break;
                    case 2:
                        Lcolor = option.L_color;
                        Mcolor = option.M_color;
                        Hcolor = option.O_color;
                        break;
                    default:
                        Lcolor = option.L_color;
                        Mcolor = option.M_color;
                        Hcolor = option.H_color;
                        break;
                }
            }
            return true;
        }
        function ak_CharMode(iN) {
            if (iN >= 48 && iN <= 57)
                return 1;
            if (iN >= 65 && iN <= 90)
                return 2;
            if (iN >= 97 && iN <= 122)
                return 4;
            else return 8;
        }
        function ak_bitTotal(num) {
            modes = 0;
            for (i = 0; i < 4; i++) {
                if (num & 1) modes++;
                num >>>= 1;
            }
            return modes;
        }
        function ak_checkStrong(sPW) {
            if (sPW.length <= 4) return 0;
            Modes = 0;
            for (i = 0; i < sPW.length; i++) {
                Modes |= ak_CharMode(sPW.charCodeAt(i));
            }
            return ak_bitTotal(Modes);
        }
    };
}(jQuery));