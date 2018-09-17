﻿/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Select-------------------------------------------*/
(function($) {
    window.AKjs_Select = (function() {
        function getClass(dom, string) {
            return dom.getElementsByClassName(string)
        }
        function AKjs_Select(config) {
            this.AKjs_Select;
            this.wheelsData = config.wheels;
            this.jsonType = false;
            this.jsonData = [];
            this.checkDataType();
            this.renderWheels(this.wheelsData);
            this.displayJson = [];
            this.cascade = false;
            this.startY;
            this.moveEndY;
            this.moveY;
            this.oldMoveY;
            this.offset = 0;
            this.offsetSum = 0;
            this.oversizeBorder;
            this.curDistance = [];
            this.clickStatus = false;
            this.init(config)
        }
        AKjs_Select.prototype = {
            constructor: AKjs_Select,
            init: function(config) {
                var _this = this;
                _this.trigger = document.querySelector(config.trigger);
                if (_this.trigger == undefined || _this.trigger == null || _this.trigger == "") {
                    return
                }
                $(function() {
                    $("body").append(_this.AKjs_Select)
                });
                document.activeElement.blur();
                _this.wheel = getClass(_this.AKjs_Select, "wheel");
                _this.slider = getClass(_this.AKjs_Select, "selectContainer");
                _this.wheels = _this.AKjs_Select.querySelector(".wheels");
                _this.ensureBtn = _this.AKjs_Select.querySelector(".ensure");
                _this.closeBtn = _this.AKjs_Select.querySelector(".cancel");
                _this.grayLayer = _this.AKjs_Select.querySelector(".ak-mask");
                _this.popUp = _this.AKjs_Select.querySelector(".content");
                _this.callback = config.callback ? config.callback: function() {};
                _this.transitionEnd = config.transitionEnd ? config.transitionEnd: function() {};
                _this.initPosition = config.position ? config.position: [];
                $(function() {
                    _this.liHeight = _this.AKjs_Select.querySelector("li").offsetHeight;
                    _this.setCurDistance(_this.initPosition)
                });
                $(window).resize(function() {
                    _this.liHeight = _this.AKjs_Select.querySelector("li").offsetHeight;
                    _this.setCurDistance(_this.initPosition)
                });
                $(_this.grayLayer).bind({
                    touchmove: function(e) {
                        e.preventDefault()
                    }
                });
                _this.titleText = config.title ? config.title: "";
                _this.button_ensure = config.ensure ? config.ensure: "";
                _this.button_cancel = config.cancel ? config.cancel: "";
                _this.setTitle(_this.titleText);
                _this.setEnsure(_this.button_ensure);
                _this.setCancel(_this.button_cancel);
                _this.checkCascade();
                if (_this.cascade) {
                    _this.initCascade()
                }
                if (_this.initPosition.length == 0) {
                    for (var i = 0; i < _this.slider.length; i++) {
                        _this.initPosition.push(0)
                    }
                }
                _this.setCurDistance(_this.initPosition);
                _this.addListenerAll();
                _this.closeBtn.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.ensureBtn.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch");
                        var tempValue = "";
                        for (var i = 0; i < _this.wheel.length; i++) {
                            i == _this.wheel.length - 1 ? tempValue += _this.getValue(i) : tempValue += _this.getValue(i) + " "
                        }
                        $(_this.trigger).next("label").hide();
                        _this.trigger.value = tempValue;
                        _this.callback(_this.getJson(), _this.getIndexArr())
                    });
                $(_this.trigger).unbind("click");
                _this.trigger.addEventListener("click",
                    function() {
                        $(_this.grayLayer).removeClass("dis_none_im");
                        $(_this.AKjs_Select).addClass("ak-Select-show");
                        $("#ak-scrollview").removeClass("scrolling_touch");
                        if ($(_this.AKjs_Select).hasClass("ak-Select-show")) {
                            $(_this.popUp).children().removeClass("dis_opa_0")
                        }
                    });
                _this.grayLayer.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.popUp.addEventListener("click",
                    function(event) {
                        event.stopPropagation();
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.fixRowStyle()
            },
            setTitle: function(string) {
                var _this = this;
                _this.titleText = string;
                $(_this.AKjs_Select).find(".title").html(_this.titleText)
            },
            setEnsure: function(string) {
                var _this = this;
                _this.button_ensure = string;
                $(_this.AKjs_Select).find(".ensure").html(_this.button_ensure)
            },
            setCancel: function(string) {
                var _this = this;
                _this.button_cancel = string;
                $(_this.AKjs_Select).find(".cancel").html(_this.button_cancel)
            },
            renderWheels: function(wheelsData) {
                var _this = this;
                _this.AKjs_Select = document.createElement("div");
                $(_this.AKjs_Select).addClass("ak-Select");
                $(_this.AKjs_Select).html('<div id="select_mask" class="ak-mask dis_none_im"></div>' + '<div class="content">' + '<div class="panel dis_opa_0">' + '<div class="title c_title"></div>' + '<div class="fixWidth">' + '<div class="wheels">' + "</div>" + '<div class="selectLine"></div>' + '<div class="shadowMask"></div>' + "</div>" + "</div>" + '<div class="btnBar dis_opa_0">' + '<div class="fixWidth">' + '<button type="button" class="cancel bg_white c_gray_777"></button>' + '<button type="button" class="ensure bg_white c_title"></button>' + "</div>" + "</div>" + "</div>");
                var tempHTML = "";
                for (var i = 0; i < wheelsData.length; i++) {
                    tempHTML += '<div class="wheel"><ul class="selectContainer">';
                    if (_this.jsonType) {
                        for (var j = 0; j < wheelsData[i].data.length; j++) {
                            tempHTML += '<li data-id="' + wheelsData[i].data[j].id + '">' + wheelsData[i].data[j].value + "</li>"
                        }
                    } else {
                        for (var j = 0; j < wheelsData[i].data.length; j++) {
                            tempHTML += "<li>" + wheelsData[i].data[j] + "</li>"
                        }
                    }
                    tempHTML += "</ul></div>"
                }
                $(_this.AKjs_Select).find(".wheels").html(tempHTML)
            },
            addListenerAll: function() {
                var _this = this;
                for (var i = 0; i < _this.slider.length; i++) { (function(i) {
                    _this.addListenerWheel(_this.wheel[i], i);
                    _this.addListenerLi(i)
                })(i)
                }
            },
            addListenerWheel: function(theWheel, index, event) {
                var _this = this;
                theWheel.addEventListener("touchstart",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("touchend",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("touchmove",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mousedown",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mousemove",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mouseup",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    true)
            },
            addListenerLi: function(sliderIndex) {
                var _this = this;
                var curWheelLi = _this.slider[sliderIndex].getElementsByTagName("li");
                for (var j = 0; j < curWheelLi.length; j++) { (function(j) {
                    curWheelLi[j].addEventListener("click",
                        function() {
                            _this.singleClick(this, j, sliderIndex)
                        },
                        false)
                })(j)
                }
            },
            checkDataType: function() {
                var _this = this;
                if (typeof(_this.wheelsData[0].data[0]) == "object") {
                    _this.jsonType = true;
                    _this.jsonData = _this.wheelsData[0].data
                }
            },
            checkCascade: function() {
                var _this = this;
                if (_this.jsonType) {
                    var node = _this.wheelsData[0].data;
                    for (var i = 0; i < node.length; i++) {
                        if ("childs" in node[i] && node[i].childs.length > 0) {
                            _this.cascade = true;
                            break
                        }
                    }
                } else {
                    _this.cascade = false
                }
            },
            initCascade: function() {
                var _this = this;
                _this.displayJson.push(_this.generateArrData(_this.jsonData));
                _this.checkArrDeep(_this.jsonData[0]);
                _this.updateWheels()
            },
            generateArrData: function(targetArr) {
                var tempArr = [];
                for (var i = 0; i < targetArr.length; i++) {
                    tempArr.push({
                        "id": targetArr[i].id,
                        "value": targetArr[i].value
                    })
                }
                return tempArr
            },
            checkArrDeep: function(parent) {
                var _this = this;
                if ("childs" in parent && parent.childs.length > 0) {
                    _this.displayJson.push(_this.generateArrData(parent.childs));
                    _this.checkArrDeep(parent.childs[0])
                }
            },
            checkRange: function(index, posIndexArr) {
                var _this = this;
                var deleteNum = _this.displayJson.length - 1 - index;
                for (var i = 0; i < deleteNum; i++) {
                    _this.displayJson.pop()
                }
                var resultNode;
                for (var i = 0; i <= index; i++) {
                    if (i == 0) {
                        resultNode = _this.jsonData[posIndexArr[0]]
                    } else {
                        resultNode = resultNode.childs[posIndexArr[i]]
                    }
                }
                _this.checkArrDeep(resultNode);
                _this.updateWheels();
                _this.fixRowStyle();
                _this.setCurDistance(_this.resetPostion(index, posIndexArr))
            },
            resetPostion: function(index, posIndexArr) {
                var _this = this;
                var tempPosArr = posIndexArr;
                var tempCount;
                if (_this.slider.length > posIndexArr.length) {
                    tempCount = _this.slider.length - posIndexArr.length;
                    for (var i = 0; i < tempCount; i++) {
                        tempPosArr.push(0)
                    }
                } else {
                    if (_this.slider.length < posIndexArr.length) {
                        tempCount = posIndexArr.length - _this.slider.length;
                        for (var i = 0; i < tempCount; i++) {
                            tempPosArr.pop()
                        }
                    }
                }
                for (var i = index + 1; i < tempPosArr.length; i++) {
                    tempPosArr[i] = 0
                }
                return tempPosArr
            },
            updateWheels: function() {
                var _this = this;
                if (_this.wheel.length > _this.displayJson.length) {
                    var count = _this.wheel.length - _this.displayJson.length;
                    for (var i = 0; i < count; i++) {
                        _this.wheels.removeChild(_this.wheel[_this.wheel.length - 1])
                    }
                }
                for (var i = 0; i < _this.displayJson.length; i++) { (function(i) {
                    var tempHTML = "";
                    if (_this.wheel[i]) {
                        for (var j = 0; j < _this.displayJson[i].length; j++) {
                            tempHTML += '<li data-id="' + _this.displayJson[i][j].id + '">' + _this.displayJson[i][j].value + "</li>"
                        }
                        _this.slider[i].innerHTML = tempHTML
                    } else {
                        var tempWheel = document.createElement("div");
                        $(tempWheel).addClass("wheel");
                        tempHTML = '<ul class="selectContainer">';
                        for (var j = 0; j < _this.displayJson[i].length; j++) {
                            tempHTML += '<li data-id="' + _this.displayJson[i][j].id + '">' + _this.displayJson[i][j].value + "</li>"
                        }
                        tempHTML += "</ul>";
                        $(tempWheel).html(tempHTML);
                        _this.addListenerWheel(tempWheel, i);
                        _this.wheels.appendChild(tempWheel)
                    }
                    _this.addListenerLi(i)
                })(i)
                }
            },
            updateWheel: function(sliderIndex, data) {
                var _this = this;
                var tempHTML = "";
                for (var j = 0; j < data.length; j++) {
                    tempHTML += "<li>" + data[j] + "</li>"
                }
                _this.slider[sliderIndex].innerHTML = tempHTML;
                _this.addListenerLi(sliderIndex)
            },
            fixRowStyle: function() {
                var _this = this;
                var width = (100 / _this.wheel.length).toFixed(2);
                for (var i = 0; i < _this.wheel.length; i++) {
                    _this.wheel[i].style.width = width + "%"
                }
            },
            getIndex: function(distance) {
                return Math.round((2 * this.liHeight - distance) / this.liHeight)
            },
            getIndexArr: function() {
                var _this = this;
                var temp = [];
                for (var i = 0; i < _this.curDistance.length; i++) {
                    temp.push(_this.getIndex(_this.curDistance[i]))
                }
                return temp
            },
            getJson: function() {
                var _this = this;
                var temp = [];
                var positionArr = _this.getIndexArr();
                if (_this.cascade) {
                    for (var i = 0; i < _this.wheel.length; i++) {
                        temp.push(_this.displayJson[i][positionArr[i]])
                    }
                } else {
                    if (_this.jsonType) {
                        for (var i = 0; i < _this.curDistance.length; i++) {
                            temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])])
                        }
                    } else {
                        for (var i = 0; i < _this.curDistance.length; i++) {
                            temp.push(_this.getValue(i))
                        }
                    }
                }
                return temp
            },
            calcDistance: function(index) {
                return 2 * this.liHeight - index * this.liHeight
            },
            setCurDistance: function(indexArr) {
                var _this = this;
                var temp = [];
                for (var i = 0; i < _this.slider.length; i++) {
                    temp.push(_this.calcDistance(indexArr[i]));
                    _this.movePosition(_this.slider[i], temp[i])
                }
                _this.curDistance = temp
            },
            fixPosition: function(distance) {
                return - (this.getIndex(distance) - 2) * this.liHeight
            },
            movePosition: function(theSlider, distance) {
                theSlider.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
                theSlider.style.transform = "translate3d(0," + distance + "px, 0)"
            },
            locatePostion: function(index, posIndex) {
                this.curDistance[index] = this.calcDistance(posIndex);
                this.movePosition(this.slider[index], this.curDistance[index])
            },
            updateCurDistance: function(theSlider, index) {
                this.curDistance[index] = parseInt(theSlider.style.transform.split(",")[1])
            },
            getDistance: function(theSlider) {
                return parseInt(theSlider.style.transform.split(",")[1])
            },
            getValue: function(sliderIndex) {
                var _this = this;
                var index = _this.getIndex(_this.curDistance[sliderIndex]);
                return _this.slider[sliderIndex].getElementsByTagName("li")[index].innerHTML
            },
            touch: function(event, theSlider, index) {
                var _this = this;
                event = event || window.event;
                switch (event.type) {
                    case "touchstart":
                        _this.startY = event.touches[0].clientY;
                        _this.oldMoveY = _this.startY;
                        break;
                    case "touchend":
                        _this.moveEndY = event.changedTouches[0].clientY;
                        _this.offsetSum = _this.moveEndY - _this.startY;
                        _this.updateCurDistance(theSlider, index);
                        _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
                        _this.movePosition(theSlider, _this.curDistance[index]);
                        _this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
                        if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
                            _this.curDistance[index] = 2 * _this.liHeight;
                            setTimeout(function() {
                                    _this.movePosition(theSlider, _this.curDistance[index])
                                },
                                100)
                        } else {
                            if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
                                _this.curDistance[index] = _this.oversizeBorder;
                                setTimeout(function() {
                                        _this.movePosition(theSlider, _this.curDistance[index])
                                    },
                                    100)
                            }
                        }
                        _this.transitionEnd(_this.getIndexArr(), _this.getJson());
                        if (_this.cascade) {
                            var tempPosArr = _this.getIndexArr();
                            tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
                            _this.checkRange(index, tempPosArr)
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        _this.moveY = event.touches[0].clientY;
                        _this.offset = _this.moveY - _this.oldMoveY;
                        _this.updateCurDistance(theSlider, index);
                        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
                        _this.movePosition(theSlider, _this.curDistance[index]);
                        _this.oldMoveY = _this.moveY;
                        break
                }
            },
            dragClick: function(event, theSlider, index) {
                var _this = this;
                event = event || window.event;
                if (typeof event !== "undefined") {
                    switch (event.type) {
                        case "mousedown":
                            _this.startY = event.clientY;
                            _this.oldMoveY = _this.startY;
                            _this.clickStatus = true;
                            break;
                        case "mouseup":
                            _this.moveEndY = event.clientY;
                            _this.offsetSum = _this.moveEndY - _this.startY;
                            _this.updateCurDistance(theSlider, index);
                            _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
                            _this.movePosition(theSlider, _this.curDistance[index]);
                            _this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
                            if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
                                _this.curDistance[index] = 2 * _this.liHeight;
                                setTimeout(function() {
                                        _this.movePosition(theSlider, _this.curDistance[index])
                                    },
                                    100)
                            } else {
                                if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
                                    _this.curDistance[index] = _this.oversizeBorder;
                                    setTimeout(function() {
                                            _this.movePosition(theSlider, _this.curDistance[index])
                                        },
                                        100)
                                }
                            }
                            _this.clickStatus = false;
                            _this.transitionEnd(_this.getIndexArr(), _this.getJson());
                            if (_this.cascade) {
                                var tempPosArr = _this.getIndexArr();
                                tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
                                _this.checkRange(index, tempPosArr)
                            }
                            break;
                        case "mousemove":
                            event.preventDefault();
                            if (_this.clickStatus) {
                                _this.moveY = event.clientY;
                                _this.offset = _this.moveY - _this.oldMoveY;
                                _this.updateCurDistance(theSlider, index);
                                _this.curDistance[index] = _this.curDistance[index] + _this.offset;
                                _this.movePosition(theSlider, _this.curDistance[index]);
                                _this.oldMoveY = _this.moveY
                            }
                            break
                    }
                }
            },
            singleClick: function(theLi, index, sliderIndex) {
                var _this = this;
                if (_this.cascade) {
                    var tempPosArr = _this.getIndexArr();
                    tempPosArr[sliderIndex] = index;
                    _this.checkRange(sliderIndex, tempPosArr)
                } else {
                    _this.curDistance[sliderIndex] = (2 - index) * _this.liHeight;
                    _this.movePosition(theLi.parentNode, _this.curDistance[sliderIndex])
                }
            }
        };
        return AKjs_Select
    })()
} (jQuery));