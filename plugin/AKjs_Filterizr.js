/*
Modification Date: 2018-11-06
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Filterizr----------------------------------------*/
(function($){
    var ak_Filter = function(w) {
        this.init(w);
    };
    ak_Filter.prototype = {
        init: function(w) {
            this.root = {
                x: 0,
                y: 0,
                w: w
            };
        },
        fit: function(blocks) {
            var n, node, block, len = blocks.length;
            var h = len > 0 ? blocks[0].h: 0;
            this.root.h = h;
            for (n = 0; n < len; n++) {
                block = blocks[n];
                if ((node = this.findNode(this.root, block.w, block.h))) block.fit = this.splitNode(node, block.w, block.h);
                else block.fit = this.growDown(block.w, block.h);
            }
        },
        findNode: function(root, w, h) {
            if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
            else if ((w <= root.w) && (h <= root.h)) return root;
            else return null;
        },
        splitNode: function(node, w, h) {
            node.used = true;
            node.down = {
                x: node.x,
                y: node.y + h,
                w: node.w,
                h: node.h - h
            };
            node.right = {
                x: node.x + w,
                y: node.y,
                w: node.w - w,
                h: h
            };
            return node;
        },
        growDown: function(w, h) {
            var node;
            this.root = {
                used: true,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + h,
                down: {
                    x: 0,
                    y: this.root.h,
                    w: this.root.w,
                    h: h
                },
                right: this.root
            };
            if ((node = this.findNode(this.root, w, h))) return this.splitNode(node, w, h);
            else return null;
        }
    };
    $.fn.AKjs_Filterizr = function() {
        var self = this,
            args = arguments;
        if (!self._fltr) {
            self._fltr = $.fn.AKjs_Filterizr.prototype.init(self.selector, (typeof args[0] === 'object' ? args[0] : undefined));
        }
        if (typeof args[0] === 'string') {
            if (args[0].lastIndexOf('_') > -1) throw new Error('AKjs_Filterizr error: You cannot call private methods');
            if (typeof self._fltr[args[0]] === 'function') {
                self._fltr[args[0]](args[1], args[2]);
            } else throw new Error('AKjs_Filterizr error: There is no such function');
        }
        return self;
    };
    $.fn.AKjs_Filterizr.prototype = {
        init: function(selector, options) {
            var self = $(selector).extend($.fn.AKjs_Filterizr.prototype);
            self.options = {
                animationDuration: 0.5,
                onFiltering: {
                    onFilteringStart: function() {},
                    onFilteringEnd: function() {}
                },
                delay: 0,
                delayMode: 'progressive',
                easing: 'ease-out',
                filter: 'all',
                filterOutCss: {
                    'opacity': 0,
                    'z-index': -1,
                    'transform': 'scale(0.5)'
                },
                filterInCss: {
                    'opacity': 1,
                    'z-index': 1,
                    'transform': 'scale(1)'
                },
                layout: 'sameSize',
                selector: (typeof selector === 'string') ? selector: '.filtr-container',
                setupControls: true,
                callback:function(){}
            };
            if (arguments.length === 0) {
                selector = self.options.selector;
                options = self.options;
            }
            if (arguments.length === 1 && typeof arguments[0] === 'object') options = arguments[0];
            if (options) {
                self.setOptions(options);
            }
            self.css({
                'padding': 0,
                'position': 'relative'
            });
            self._lastCategory = 0;
            self._isAnimating = false;
            self._mainArray = self._getFiltrItems();
            self._subArrays = self._makeSubarrays();
            self._activeArray = self._getCollectionByFilter(self.options.filter);
            self._toggledCategories = {};
            self._typedText = $('input[data-search]').val() || '';
            self._uID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r: (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            self._setupEvents();
            self.options.callback($(self.options.selector), self.options.filter);
            if (self.options.setupControls) self._setupControls();
            self.filter(self.options.filter);
            return self;
        },
        filter: function(targetFilter) {
            var self = this,
                target = self._getCollectionByFilter(targetFilter);
            self.options.filter = targetFilter;
            self.trigger('filteringStart');
            self._handleFiltering(target);
            if (self._isSearchActivated()) self.search(self._typedText);
        },
        toggleFilter: function(toggledFilter) {
            var self = this,
                target = [],
                i = 0;
            self.trigger('filteringStart');
            if (!self._toggledCategories[toggledFilter]) self._toggledCategories[toggledFilter] = true;
            else delete self._toggledCategories[toggledFilter];
            if (self._multifilterModeOn()) {
                target = self._makeMultifilterArray();
                self._handleFiltering(target);
                if (self._isSearchActivated()) self.search(self._typedText);
            } else {
                self.filter('all');
                if (self._isSearchActivated()) self.search(self._typedText);
            }
        },
        search: function(text) {
            var self = this,
                array = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter),
                target = [],
                i = 0;
            if (self._isSearchActivated()) {
                for (i = 0; i < array.length; i++) {
                    var containsText = array[i].text().toLowerCase().indexOf(text.toLowerCase()) > -1;
                    if (containsText) {
                        target.push(array[i]);
                    }
                }
            }
            if (target.length > 0) {
                self._handleFiltering(target);
            } else {
                if (self._isSearchActivated()) {
                    for (i = 0; i < self._activeArray.length; i++) {
                        self._activeArray[i]._filterOut();
                    }
                } else {
                    self._handleFiltering(array);
                }
            }
        },
        shuffle: function() {
            var self = this;
            self._mainArray = self._fisherYatesShuffle(self._mainArray);
            self._subArrays = self._makeSubarrays();
            var target = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter);
            if (self._isSearchActivated()) self.search(self._typedText);
            else self._placeItems(target);
        },
        sort: function(attr, sortOrder) {
            var self = this;
            attr = attr || 'domIndex';
            sortOrder = sortOrder || 'asc';
            var isUserAttr = attr !== 'domIndex' && attr !== 'sortData' && attr !== 'w' && attr !== 'h';
            if (isUserAttr) {
                for (var i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i][attr] = self._mainArray[i].data(attr);
                }
            }
            self._mainArray.sort(self._comparator(attr, sortOrder));
            self._subArrays = self._makeSubarrays();
            var target = self._multifilterModeOn() ? self._makeMultifilterArray() : self._getCollectionByFilter(self.options.filter);
            if (self._isSearchActivated()) self.search(self._typedText);
            else self._placeItems(target);
        },
        setOptions: function(options) {
            var self = this,
                i = 0;
            for (var prop in options) {
                self.options[prop] = options[prop];
            }
            if (self._mainArray && (options.animationDuration || options.delay || options.easing || options.delayMode)) {
                for (i = 0; i < self._mainArray.length; i++) {
                    self._mainArray[i].css('transition', 'all ' + self.options.animationDuration + 's ' + self.options.easing + ' ' + self._mainArray[i]._calcDelay() + 'ms');
                }
            }
            if (!self.options.filterInCss.transform) self.options.filterInCss.transform = 'translate3d(0,0,0)';
            if (!self.options.filterOutCss.transform) self.options.filterOutCss.transform = 'translate3d(0,0,0)';
        },
        _getFiltrItems: function() {
            var self = this,
                filtrItems = $(self.find('*[data-category]')),
                itemsArray = [];
            $.each(filtrItems,
                function(i, e) {
                    var item = $(e).extend(FiltrItemProto)._init(i, self);
                    itemsArray.push(item);
                });
            return itemsArray;
        },
        _makeSubarrays: function() {
            var self = this,
                subArrays = [];
            for (var i = 0; i < self._lastCategory; i++) subArrays.push([]);
            for (i = 0; i < self._mainArray.length; i++) {
                if (typeof self._mainArray[i]._category === 'object') {
                    for (var p in self._mainArray[i]._category) subArrays[self._mainArray[i]._category[p] - 1].push(self._mainArray[i]);
                } else subArrays[self._mainArray[i]._category - 1].push(self._mainArray[i]);
            }
            return subArrays;
        },
        _makeMultifilterArray: function() {
            var self = this,
                target = [],
                addedMap = {};
            for (var i = 0; i < self._mainArray.length; i++) {
                var item = self._mainArray[i],
                    belongsToCategory = false,
                    isUnique = item.domIndex in addedMap === false;
                if (Array.isArray(item._category)) {
                    for (var x = 0; x < item._category.length; x++) {
                        if (item._category[x] in self._toggledCategories) {
                            belongsToCategory = true;
                            break;
                        }
                    }
                } else {
                    if (item._category in self._toggledCategories) belongsToCategory = true;
                }
                if (isUnique && belongsToCategory) {
                    addedMap[item.domIndex] = true;
                    target.push(item);
                }
            }
            return target;
        },
        _setupControls: function() {
            var self = this;
            $('*[data-filter]').click(function() {
                var targetFilter = $(this).data('filter');
                if (self.options.filter === targetFilter) return;
                self.filter(targetFilter);
            });
            $('*[data-multifilter]').click(function() {
                var targetFilter = $(this).data('multifilter');
                if (targetFilter === 'all') {
                    self._toggledCategories = {};
                    self.filter('all');
                } else {
                    self.toggleFilter(targetFilter);
                }
            });
            $('*[data-shuffle]').click(function() {
                self.shuffle();
            });
            $('*[data-sortAsc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'asc');
            });
            $('*[data-sortDesc]').click(function() {
                var sortAttr = $('*[data-sortOrder]').val();
                self.sort(sortAttr, 'desc');
            });
            $('input[data-search]').keyup(function() {
                self._typedText = $(this).val();
                self._delayEvent(function() {
                        self.search(self._typedText);
                    },
                    250, self._uID);
            });
        },
        _setupEvents: function() {
            var self = this;
            $(setTimeout(function () {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            }),200);
            $(document).scroll(function () {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            });
            $(window).resize(function() {
                self._delayEvent(function() {
                        self.trigger('resizeFiltrContainer');
                    },
                    250, self._uID);
            });
            self.on('resizeFiltrContainer',
                function() {
                    if (self._multifilterModeOn()) self.toggleFilter();
                    else self.filter(self.options.filter);
                }).on('filteringStart',
                function() {
                    self.options.onFiltering.onFilteringStart();
                }).on('filteringEnd',
                function() {
                    self.options.onFiltering.onFilteringEnd();
                });
        },
        _calcItemPositions: function() {
            var self = this,
                array = self._activeArray,
                containerHeight = 0,
                cols = Math.round(self.width() / self.find('*[data-category]').outerWidth()),
                rows = 0,
                itemWidth = array[0].outerWidth(),
                itemHeight = 0,
                left = 0,
                top = 0,
                i = 0,
                x = 0,
                posArray = [];
            if (self.options.layout === 'packed') {
                $.each(self._activeArray,
                    function(i, e) {
                        e._updateDimensions();
                    });
                var packer = new ak_Filter(self.outerWidth());
                packer.fit(self._activeArray);
                for (i = 0; i < array.length; i++) {
                    posArray.push({
                        left: array[i].fit.x,
                        top: array[i].fit.y
                    });
                }
                containerHeight = packer.root.h;
            }
            if (self.options.layout === 'horizontal') {
                rows = 1;
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].outerWidth();
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    left += itemWidth;
                    if (containerHeight < itemHeight) containerHeight = itemHeight;
                }
            } else if (self.options.layout === 'vertical') {
                for (i = 1; i <= array.length; i++) {
                    itemHeight = array[i - 1].outerHeight();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    top += itemHeight;
                }
                containerHeight = top;
            } else if (self.options.layout === 'sameHeight') {
                rows = 1;
                var rowWidth = self.outerWidth();
                for (i = 1; i <= array.length; i++) {
                    itemWidth = array[i - 1].width();
                    var itemOuterWidth = array[i - 1].outerWidth(),
                        nextItemWidth = 0;
                    if (array[i]) nextItemWidth = array[i].width();
                    posArray.push({
                        left: left,
                        top: top
                    });
                    x = left + itemWidth + nextItemWidth;
                    if (x > rowWidth) {
                        x = 0;
                        left = 0;
                        top += array[0].outerHeight();
                        rows++;
                    } else left += itemOuterWidth;
                }
                containerHeight = rows * array[0].outerHeight();
            } else if (self.options.layout === 'sameWidth') {
                for (i = 1; i <= array.length; i++) {
                    posArray.push({
                        left: left,
                        top: top
                    });
                    if (i % cols === 0) rows++;
                    left += itemWidth;
                    top = 0;
                    if (rows > 0) {
                        x = rows;
                        while (x > 0) {
                            top += array[i - (cols * x)].outerHeight();
                            x--;
                        }
                    }
                    if (i % cols === 0) left = 0;
                }
                for (i = 0; i < cols; i++) {
                    var columnHeight = 0,
                        index = i;
                    while (array[index]) {
                        columnHeight += array[index].outerHeight();
                        index += cols;
                    }
                    if (columnHeight > containerHeight) {
                        containerHeight = columnHeight;
                        columnHeight = 0;
                    } else columnHeight = 0;
                }
            } else if (self.options.layout === 'sameSize') {
                for (i = 1; i <= array.length; i++) {
                    posArray.push({
                        left: left,
                        top: top
                    });
                    left += itemWidth;
                    if (i % cols === 0) {
                        top += array[0].outerHeight();
                        left = 0;
                    }
                }
                rows = Math.ceil(array.length / cols);
                containerHeight = rows * array[0].outerHeight();
            }
            self.css('height', containerHeight);
            return posArray;
        },
        _handleFiltering: function(target) {
            var self = this,
                toFilterOut = self._getArrayOfUniqueItems(self._activeArray, target);
            for (var i = 0; i < toFilterOut.length; i++) {
                toFilterOut[i]._filterOut();
            }
            self._activeArray = target;
            self._placeItems(target);
        },
        _multifilterModeOn: function() {
            var self = this;
            return Object.keys(self._toggledCategories).length > 0;
        },
        _isSearchActivated: function() {
            var self = this;
            return self._typedText.length > 0;
        },
        _placeItems: function(arr) {
            var self = this;
            self._isAnimating = true;
            self._itemPositions = self._calcItemPositions();
            for (var i = 0; i < arr.length; i++) {
                arr[i]._filterIn(self._itemPositions[i]);
            }
        },
        _getCollectionByFilter: function(filter) {
            var self = this;
            return filter === 'all' ? self._mainArray: self._subArrays[filter - 1];
        },
        _makeDeepCopy: function(obj) {
            var r = {};
            for (var p in obj) r[p] = obj[p];
            return r;
        },
        _comparator: function(prop, sortOrder) {
            return function(a, b) {
                if (sortOrder === 'asc') {
                    if (a[prop] < b[prop]) return - 1;
                    else if (a[prop] > b[prop]) return 1;
                    else return 0;
                } else if (sortOrder === 'desc') {
                    if (b[prop] < a[prop]) return - 1;
                    else if (b[prop] > a[prop]) return 1;
                    else return 0;
                }
            };
        },
        _getArrayOfUniqueItems: function(arr1, arr2) {
            var r = [],
                o = {},
                l = arr2.length,
                i,
                v;
            for (i = 0; i < l; i++) {
                o[arr2[i].domIndex] = true;
            }
            l = arr1.length;
            for (i = 0; i < l; i++) {
                v = arr1[i];
                if (! (v.domIndex in o)) {
                    r.push(v);
                }
            }
            return r;
        },
        _delayEvent: (function() {
            var self = this,
                timers = {};
            return function(callback, ms, uniqueId) {
                if (uniqueId === null) {
                    throw Error("UniqueID needed");
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })(),
        _fisherYatesShuffle: function shuffle(array) {
            var m = array.length,
                t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    };
    var FiltrItemProto = {
        _init: function(index, parent) {
            var self = this,
                delay = 0;
            self._parent = parent;
            self._category = self._getCategory();
            self._lastPos = {};
            self.domIndex = index;
            self.sortData = self.data('sort');
            self.w = 0;
            self.h = 0;
            self._isFilteredOut = true;
            self._filteringOut = false;
            self._filteringIn = false;
            self.css(parent.options.filterOutCss).css({
                '-webkit-backface-visibility': 'hidden',
                'perspective': '1000px',
                '-webkit-perspective': '1000px',
                '-webkit-transform-style': 'preserve-3d',
                'position': 'absolute',
                'transition': 'all ' + parent.options.animationDuration + 's ' + parent.options.easing + ' ' + self._calcDelay() + 'ms'
            });
            self.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                function() {
                    self._onTransitionEnd();
                });
            return self;
        },
        _updateDimensions: function() {
            var self = this;
            self.w = self.outerWidth();
            self.h = self.outerHeight();
        },
        _calcDelay: function() {
            var self = this,
                r = 0;
            if (self._parent.options.delayMode === 'progressive') r = self._parent.options.delay * self.domIndex;
            else if (self.domIndex % 2 === 0) r = self._parent.options.delay;
            return r;
        },
        _getCategory: function() {
            var self = this,
                ret = self.data('category');
            if (typeof ret === 'string') {
                ret = ret.split(', ');
                for (var n in ret) {
                    if (isNaN(parseInt(ret[n]))) {
                        throw new Error('AKjs_Filterizr: the value of data-category must be a number, starting from value 1 and increasing.');
                    }
                    if (ret[n] > self._parent._lastCategory) {
                        self._parent._lastCategory = ret[n];
                    }
                }
            } else {
                if (ret > self._parent._lastCategory) self._parent._lastCategory = ret;
            }
            return ret;
        },
        _onTransitionEnd: function() {
            var self = this;
            if (self._filteringOut) {
                $(self).addClass('filteredOut');
                self._isFilteredOut = true;
                self._filteringOut = false;
            } else if (self._filteringIn) {
                self._isFilteredOut = false;
                self._filteringIn = false;
            }
            if (self._parent._isAnimating) {
                self._parent.trigger('filteringEnd');
                self._parent._isAnimating = false;
            }
        },
        _filterOut: function() {
            var self = this,
                filterOutCss = self._parent._makeDeepCopy(self._parent.options.filterOutCss);
            filterOutCss.transform += ' translate3d(' + self._lastPos.left + 'px,' + self._lastPos.top + 'px, 0)';
            self.css(filterOutCss);
            self._filteringOut = true;
        },
        _filterIn: function(targetPos) {
            var self = this,
                filterInCss = self._parent._makeDeepCopy(self._parent.options.filterInCss);
            $(self).removeClass('filteredOut');
            self._filteringIn = true;
            self._lastPos = targetPos;
            filterInCss.transform += ' translate3d(' + targetPos.left + 'px,' + targetPos.top + 'px, 0)';
            self.css(filterInCss);
        }
    };
}(jQuery));