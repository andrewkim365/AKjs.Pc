/*
Modification Date: 2018-10-16
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_PickupTime-------------------------------------*/
(function($){
    $.fn.AKjs_PickupTime = function(setting) {
        var option = $.extend({
                dateleng: 6,
                width: "200px",
                boxheight: 5,
                minute: 0,
                speed: 500,
                dateflag: true,
                mouse: "click",
                selectedClass: "c_title",
                weeks_text: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                today_text: "Today",
                months_text:"-",
                days_text:"",
                callback:function(){}
            },
            setting);
        function ak_pickuptime(elem) {
            var obj = this;
            elem.on(option.mouse,function(){
                var $this = $(this);
                $this.toggleClass("ak-open");
                obj.init(0,function(data){
                    option.callback(data,$this);
                },elem);
            });
        }
        ak_pickuptime.prototype = {
            init: function(setuptime, data, elem) {
                this.setuptime = setuptime;
                this.run(data,elem);
            },
            marketgetTime: function() {
                var setuptime = this.setuptime;
                var nowtime = new Date();
                nowtime.setDate(nowtime.getDate() + setuptime);
                var Day = nowtime.getDay();
                var Hours = nowtime.getHours();
                var i = parseInt(Day);
                var weeks = option.weeks_text;
                var list = new Array();
                var Month, dates;
                for (var k = setuptime; k < option.dateleng + setuptime; k++) {
                    if (i == option.dateleng-1) {
                        i = 0;
                    }
                    if (k == 0) {
                        Month = nowtime.getMonth() + 1;
                        dates = nowtime.getDate();
                        list.push(Month + option.months_text + dates + option.days_text+" " + weeks[i] + " ("+option.today_text+")");
                    } else {
                        nowtime.setDate(nowtime.getDate() + 1);
                        Month = nowtime.getMonth() + 1;
                        dates = nowtime.getDate();
                        list.push(Month + option.months_text + dates + option.days_text+" " + weeks[i]);
                    }
                    i++;
                    dates++
                }
                list.push(Hours);
                return list
            },
            todoble: function(hours,half) {
                var minTmp = parseInt(option.minute.toString());
                var mins = half*minTmp<10?"0"+half*minTmp:half*minTmp;
                if (hours < 10) {
                    hours = "0" + hours + ":"+mins;
                } else {
                    hours = hours + ":"+mins;
                }
                return hours
            },
            run: function(data,elem) {
                var marketgetTime = this.marketgetTime();
                var li = "";
                for (var i = 0; i < 24; i++) {
                    if(parseInt(option.minute.toString()) === 0){
                        j = 0;
                        if (i <= marketgetTime[option.dateleng]) {
                            li += "<li class='disabled dis_none_im'>" + this.todoble(i,j) + "</li>"
                        } else {
                            if (i == Number(marketgetTime[option.dateleng]) + 1) {
                                li += "<li>" + this.todoble(i,j) + "</li>"
                            } else {
                                li += "<li>" + this.todoble(i,j) + "</li>"
                            }
                        }
                    }else{
                        for(var j = 0; j < 60/option.minute; j++){
                            if (i <= marketgetTime[option.dateleng]) {
                                li += "<li class='disabled dis_none_im'>" + this.todoble(i,j) + "</li>"
                            } else {
                                if (i == Number(marketgetTime[option.dateleng]) + 1) {
                                    li += "<li>" + this.todoble(i,j) + "</li>"
                                } else {
                                    li += "<li>" + this.todoble(i,j) + "</li>"
                                }
                            }
                        }
                    }

                }
                var template = "<div class='ak-PickupTime'>" +
                    "<ol class='scrollbar'>" ;
                for (var i = 0; i < option.dateleng; i++) {
                    if (i == 0) {
                        template += "<li>" + marketgetTime[i] + "</li>";
                    } else {
                        template += "<li>" + marketgetTime[i] + "</li>";
                    }
                }
                template += "</ol>";
                template += "<ul class='scrollbar'>" + li + "</ul></div>";

                if ($(".ak-PickupTime").length > 0) {
                    $(".ak-PickupTime").remove();
                }

                if ($('#ak-scrollview').length > 0) {
                    if ($(".ak-PickupTime").parents("dialog")[0] != undefined) {
                        $('main').append(template);
                    } else {
                        $('#ak-scrollview').append(template);
                    }
                } else {
                    $('body').append(template);
                }
                $(function () {
                    var $self = $(".ak-PickupTime");
                    $self.hide();
                    if (elem.hasClass("ak-open")) {
                        $self.slideDown(option.speed);
                        $("body").unbind("click");
                        setTimeout(function() {
                            $('body').bind('click', function(event) {
                                var evt = event.srcElement ? event.srcElement : event.target;
                                if($(evt).parents(".ak-PickupTime").length > 0) {
                                    return false;
                                } else {
                                    $self.slideUp(option.speed);
                                    elem.removeClass("ak-open");
                                    $self.removeClass("dis_block_im");
                                }
                            });
                        },option.speed);
                    } else {
                        $self.slideUp(option.speed);
                        $self.removeClass("dis_block_im");
                    }
                    select_list_css();
                    if (option.dateflag) {
                        $self.find("ol li").on("click", function() {
                            var index = $(this).index();
                            if ($(this).hasClass("disabled")) {
                                if (index != 0) {
                                    $(this).removeClass("dis_none_im");
                                } else {
                                    $(this).addClass("dis_none_im");
                                }
                            }
                            $(this).addClass(option.selectedClass).siblings().removeClass(option.selectedClass);
                        });
                    } else {
                        $self.find("ol").remove();
                        $self.find("ul").addClass("w_100");
                        $self.find("ul li").removeClass("disabled dis_none_im "+option.selectedClass);
                    }
                    $self.find("ul li").on("click", function() {
                        $(this).addClass(option.selectedClass).siblings().removeClass(option.selectedClass);
                        var $data_text =$self.find("ol").find('.' + option.selectedClass.replace(" ","."));
                        var text = $data_text.text() + " " + $(this).text();
                        setTimeout(function() {
                            $self.slideUp(option.speed);
                            elem.removeClass("ak-open");
                            $self.removeClass("dis_block_im");
                        },option.speed);
                        if (Object.prototype.toString.call(data) === "[object Function]") {
                            data(text);
                        } else {
                            return false;
                        }
                    });
                });
                function select_list_css() {
                    var $self = $(".ak-PickupTime");
                    var this_h = elem.outerHeight();
                    if (option.boxheight) {
                        $self.css({
                            "width": option.width,
                            "max-height": $self.find("ul li").eq(0).outerHeight() * option.boxheight
                        });
                        $self.children().css({
                            "height": $self.find("ul li").eq(0).outerHeight() * option.boxheight
                        });
                    } else {
                        $self.css({
                            "width": option.width,
                            "max-height": $self.find("ul li").eq(0).outerHeight() * 5
                        });
                        $self.children().css({
                            "height": $self.find("ul li").eq(0).outerHeight() * 5
                        });
                    }
                    if (elem.offset().top + elem.innerHeight()+ $self.innerHeight() > $(window).height()) {
                        $self.css({
                            "top": "auto",
                            "bottom": $("#ak-scrollview").outerHeight() - (elem.offset().top + $('#ak-scrollview').scrollTop()) + elem.outerHeight() + $("#ak-scrollview").offset().top - this_h -8,
                            "left": elem.offset().left - $("#ak-scrollview").offset().left
                        });
                    } else {
                        $self.css({
                            "bottom": "auto",
                            "left": elem.offset().left - $("#ak-scrollview").offset().left
                        });
                        if ($('#ak-scrollview').length > 0) {
                            if (elem.parents("dialog")[0] != undefined) {
                                $self.css({
                                    "top": elem.offset().top -$("#ak-scrollview").offset().top + this_h
                                });
                            } else {
                                $self.css({
                                    "top": elem.offset().top + $('#ak-scrollview').scrollTop() - $("#ak-scrollview").offset().top + this_h
                                });
                            }
                        } else {
                            $self.css({
                                "top": elem.offset().top + elem.innerHeight() + 1
                            });
                        }
                    }
                }
            }
        };
        new ak_pickuptime($(this));
    };
}(jQuery));