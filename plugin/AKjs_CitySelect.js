/*
Modification Date: 2018-11-23
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_CitySelect-------------------------------------------*/
(function($) {
    $.fn.AKjs_CitySelect = function(setting) {
        var option = $.extend({
                jsonData: [],
                BoxWidth: "32em",
                BackBtn: "Back",
                TitleText: "Title",
                CloseBtn: "Close",
                callback: function() {},
                clickback: function() {}
            },
            setting);
        var _self = $(this);
        $(window).bind('hashchange', function () {
            $(".ak-areaLayer").remove();
        });
        var jsonData = option.jsonData;
        var _html = [];
        _html.push("<div class=\"ak-areaLayer\">");
        _html.push("<section>");
        _html.push("<button class=\"fl\">"+option.BackBtn+"</button>");
        _html.push("<h3>"+option.TitleText+"</h3>");
        _html.push("<button class=\"fr\">"+option.CloseBtn+"</button>");
        _html.push("</section>");
        _html.push("<article class='scrollbar'>");
        _html.push("<ul></ul>");
        _html.push("</article>");
        _html.push("</div>");
        var areaLayer = $(_html.join(""));
        var expressArea, expressCode, areaCont, areaList = areaLayer.find("ul");
        _self.click(function() {
            $(".ak-areaLayer").remove();
            var _this = $(this);
            if ($('#ak-scrollview').length > 0) {
                if (_self.parents("dialog")[0] != undefined) {
                    $('main').append(areaLayer);
                } else {
                    $('#ak-scrollview').append(areaLayer);
                }
            } else {
                $('body').append(areaLayer);
            }
            areaLayer_css(_this);
            intProvince();
            areaLayer.children("section").find("h3").text(option.TitleText);
            areaLayer.toggleClass("ak-open");
            if (areaLayer.hasClass("ak-open")) {
                areaLayer.slideDown();
                option.callback(_self, areaLayer);
            } else {
                areaLayer.slideUp();
            }
            areaLayer.children("section").find("button.fl").click(function() {
                intProvince();
                areaLayer.children("section").find("h3").text(option.TitleText);
            });
            areaLayer.children("section").find("button.fr").click(function() {
                areaLayer.slideUp();
                areaLayer.removeClass("ak-open");
                setTimeout(function () {
                    areaLayer.remove();
                },500);
            });
        });
        $(document).on("mousedown", function(e) {
            if ($(e.target).closest(".ak-areaLayer").length === 0) {
                areaLayer.slideUp();
                setTimeout(function () {
                    if(areaLayer.css('display') == 'none'){
                        areaLayer.removeClass("ak-open").remove();
                    }
                },500);
            }
        });
        $(window).resize(function () {
            areaLayer_css(_self);
        });
        function areaLayer_css(_this) {
            var offset = _this.offset();
            areaLayer.css({
                "width": option.BoxWidth
            });
            var height = _this.outerHeight() + parseInt(_this.css("margin-top"));
            var width = _this.outerWidth() + parseInt(_this.css("margin-left"));
            if (offset.left + areaLayer.width() > $(window).width()) {
                offsetLeft = offset.left - $("#ak-scrollview").offset().left - areaLayer.width() + width;
            } else {
                offsetLeft = offset.left - $("#ak-scrollview").offset().left;
            }
            if (_self.parents("dialog")[0] != undefined) {
                fullOffsetTop = offset.top + height;
            } else {
                fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top;
            }
            var fullOffsetBottom = "auto";
            areaLayer.css({
                bottom: fullOffsetBottom,
                top: fullOffsetTop,
                left: offsetLeft,
            });
        }
        function intProvince() {
            areaCont = "";
            for (var i=0; i<jsonData.length; i++) {
                areaCont += '<li data-id="'+jsonData[i].id+'" data-area="'+i+'">' + jsonData[i].value + '</li>';
            }
            areaList.html(areaCont);
            areaList.find("li").click(function () {
                Select_Province($(this).attr("data-area"));
            });
            areaLayer.children("article").scrollTop(0);
            areaLayer.children("section").find("button.fl").hide();
        }
        function Select_Province(index) {
            areaCont = "";
            areaList.html("");
            for (var j=0; j<jsonData[index].childs.length; j++) {
                areaCont += '<li data-id="'+jsonData[index].childs[j].id+'" data-area="'+index+','+j+'">' + jsonData[index].childs[j].value + '</li>';
            }
            areaList.html(areaCont);
            areaList.find("li").click(function () {
                Select_City($(this).attr("data-area"));
            });
            areaLayer.children("article").scrollTop(0);
            areaLayer.children("section").find("button.fl").show();
            expressArea = jsonData[index].value + " > ";
            areaLayer.children("section").find("h3").text(expressArea.substring(0, expressArea.lastIndexOf('>')));
        }
        function Select_City(index) {
            var index = index.split(",");
            if (jsonData[index[0]].childs[index[1]].id == "441900" || jsonData[index[0]].childs[index[1]].id == "442000" ||jsonData[index[0]].childs[index[1]].childs == undefined) {
                expressArea += jsonData[index[0]].childs[index[1]].value;
                expressCode = jsonData[index[0]].childs[index[1]].id;
                _self.val(expressArea);
                option.clickback(_self, areaLayer, expressArea, expressCode);
                areaLayer.slideUp();
                areaLayer.removeClass("ak-open").remove();
            } else {
                areaCont = "";
                for (var k=0; k<jsonData[index[0]].childs[index[1]].childs.length; k++) {
                    areaCont += '<li data-id="'+jsonData[index[0]].childs[index[1]].childs[k].id+'" data-area="'+index[0]+','+index[1]+','+k+'">' + jsonData[index[0]].childs[index[1]].childs[k].value + '</li>';
                }
                areaList.html(areaCont);
                areaList.find("li").click(function () {
                    Select_District($(this).attr("data-area"));
                });
                areaLayer.children("article").scrollTop(0);
                areaLayer.children("section").find("button.fl").show();
                expressArea = jsonData[index[0]].value + " > " + jsonData[index[0]].childs[index[1]].value + " > ";
                areaLayer.children("section").find("h3").text(expressArea.substring(0, expressArea.lastIndexOf('>')));
            }
        }
        function Select_District(index) {
            var index = index.split(",");
            expressArea += jsonData[index[0]].childs[index[1]].childs[index[2]].value;
            expressCode = jsonData[index[0]].childs[index[1]].childs[index[2]].id;
            _self.val(expressArea);
            option.clickback(_self, areaLayer, expressArea, expressCode);
            areaLayer.slideUp();
            areaLayer.removeClass("ak-open").remove();
        }
    }
} (jQuery));