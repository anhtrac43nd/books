

/* Browser Identification *****************************************************/
(function($) {
    'use strict';

    function XBList() {
        this.aList = [];
    }

    XBList.prototype = {

        toCondition: function(c) {
            return c === undefined ? {} : ($.isPlainObject(c) ? c : { userAgent: c });
        },

        add: function(name, allow, deny) {
            this.aList.push({
                name: name,
                oAllow: this.toCondition(allow),
                oDeny: this.toCondition(deny)
            });
            return this;
        },

        get: function() {
            var i, j, state;
            for (i = 0; i< this.aList.length; i++) {
                state = true;
                for (j in this.aList[i].oAllow) {
                    if (!this.aList[i].oAllow[j].test(navigator[j])) {
                        state = false;
                        break;
                    }
                }
                for (j in this.aList[i].oDeny) {
                    if (this.aList[i].oDeny[j].test(navigator[j])) {
                        state = false;
                        break;
                    }
                }
                if (state) {
                    return this.aList[i].name;
                }
            }
            return null;
        }
    };

    var oName = new XBList(),
        oOS = new XBList(),
        oPlatform = new XBList(),
        oEngine = new XBList(),
        getVersion = function() {
            try {
                return (/.+(Chrome|Firefox|Version|OPR|MSIE|Trident.+?rv|CriOS)(\/| |:)([0-9\.]+)/).exec(navigator.userAgent)[3] || null;
            } catch (e) {
                return 0;
            }
        },
        fnUpdate = function() {
            $.xBrowser = {
                name: oName.get(),
                os: oOS.get(),
                platform: oPlatform.get(),
                engine: oEngine.get(),
                version: getVersion()
            };
            $('html')
                .removeClass('chrome firefox safari opera ie android ios win mac linux mobile desktop webkit gecko presto trident')
                .addClass($.xBrowser.os + ' ' + $.xBrowser.platform + ' ' + $.xBrowser.engine + ' ' + $.xBrowser.name + ' ' + $.xBrowser.name + parseInt($.xBrowser.version, 10));
        };

    oName .add('chrome', { userAgent: /Chrome/, vendor: /Google/ })
        .add('chrome', { userAgent: /CriOS/ })
        .add('firefox', /Firefox/)
        .add('safari', { userAgent: /Safari/, vendor: /Apple/ })
        .add('opera', /Opera/)
        .add('opera', { vendor: /Opera/})
        .add('ie', /MSIE|Trident/);

    oOS .add('android', /Android/) .add('ios', { platform: /iPad|iPhone|iPod/ }) .add('ios', /iPad|iPhone|iPod/) .add('win', /Windows/) .add('mac', /Macintosh/) .add('linux', /Linux/);
    oPlatform .add('mobile', { platform: /Android|iPad|iPhone|iPod/ }) .add('mobile', /Android|iPad|iPhone|iPod/) .add('desktop', /Windows|Macintosh|Linux/);
    oEngine .add('webkit', /WebKit/) .add('gecko', /Gecko/, /WebKit/) .add('presto', /Presto/) .add('trident', /Trident|MSIE (7|6|5)/);

    fnUpdate();
}(jQuery));
/* End Browser Identification *************************************************/



/* IE lte 8 HTML5 support *****************************************************/
(function($) {
    'use strict';

    if ($.xBrowser.name === 'ie' && $.xBrowser.version < 9) {
        var tags = [
            'article',
            'aside',
            'figcaption',
            'figure',
            'footer',
            'header',
            'hgroup',
            'mark',
            'nav',
            'section',
            'time'
        ];
        for (var i = 0; i < tags.length; i++) {
            document.createElement(tags[i]);
        }
    }
}(jQuery));
/* End IE lte 8 HTML5 support *************************************************/

(function($) {
    'use strict';

    var gWindow = $(window),
        gDebug = $('html').hasClass('m-debug'),
        gTShow = 600,
        gTHide = 400,
        gTSleep = gTShow / 2,
        ie8 = $.xBrowser.name === 'ie' && parseInt($.xBrowser.version) <= 8,
        gMobile = $.xBrowser.platform === 'mobile';



/**************************************************************************************************************************************************************/
    var fnConvertParams = function(isShow, sProperties, tShow, tSleep, easing, cb) {
        var tToggle = isShow ? gTShow : gTHide;

        switch (arguments.length) {
            case 5:
                if ($.easing[arguments[3]]) {                                   // sProperties, tShow, easing, cb
                    cb = arguments[4];
                    easing = arguments[3];
                    tSleep = gTSleep;

                } else {                                                        // sProperties, tShow, tSleep, cb
                    cb = arguments[4];
                    easing = undefined;
                }
                break;
            case 4:
                if ($.easing[arguments[3]]) {                                   // sProperties, tShow, easing
                    easing = arguments[3];
                    tSleep = undefined;
                } else if ($.easing[arguments[2]]) {                            // sProperties, easing, cb
                    cb = arguments[3];
                    tSleep = gTSleep;
                    tShow = tToggle;
                } else {                                                        // sProperties, tShow, cb
                    cb = arguments[3];
                    tSleep = gTSleep;
                }
                break;
            case 3:
                if ($.type(arguments[2]) === 'function') {                      // sProperties, cb
                    cb = arguments[2];
                    tSleep = gTSleep;
                    tShow = tToggle;
                } else if ($.easing[arguments[2]]) {                            // sProperties, easing
                    easing = arguments[2];
                    tShow = tToggle;
                }                                                               // sProperties, tShow
                break;
            case 2:
                if ($.type(arguments[1]) === 'function') {                      // cb
                    cb = arguments[1];
                    tSleep = gTSleep;
                    tShow = tToggle;
                    sProperties = 'O';
                } else {                                                        // sProperties
                    tShow = tToggle;
                }
                break;
            case 1:
                tShow = tToggle;
                sProperties = 'O';
                break;
        }

        return [ sProperties, tShow, tSleep, easing, cb ];
    };



    var acAnimate = function(isShow, sProperties, tShow, tSleep, easing, cb) {
        var aProperties = sProperties.split(' '),
            isComplete = false;

        this.each(function() {
            if ($(this).data('acStopped')) { return; }

            var $el = $(this),
                aDeferred = [],

                fnAnimate = function() {
                    isShow && $el.css({ visibility: 'visible' });
                    for (var i = 0; i < aProperties.length; i++) {
                        (function(index) {
                            aDeferred[index] = $.Deferred();
                            $el[(isShow ? 'acShow' : 'acHide') + aProperties[i].toUpperCase()](tShow, 0, easing, function() {
                                !isShow && $el.acClearStyle();
                                aDeferred[index].resolve();
                            });
                        }(i));
                    }
                };

            $el.queue(function(dequeue) {
                fnAnimate();
                $.when.apply(null, aDeferred).done(function() {
                    isComplete = true;
                    dequeue();
                });
            });
        });

        setTimeout($.proxy(function() {
            if ($(this).data('acStopped')) { return; }
            (cb || $.noop)();
        }, this), tShow + (tSleep || 0));

        return this;
    };



    var acAnimateList = function(isShow, sProperties, params, cb) {
        sProperties = sProperties === undefined ? 'O' : sProperties;

        params = $.extend({
            tShow: isShow ? gTShow : gTHide,
            tDelay: gTSleep,
            tSleep: gTSleep,
            easing: undefined
        }, params);

        setTimeout(cb || $.noop, params.tDelay * (this.length - 1) + params.tShow + params.tSleep);

        return this.each(function(index, el) {
            $(el).delay(params.tDelay * index)[ isShow ? 'acShow' : 'acHide' ](sProperties, params.tShow, params.easing);
        });
    };



/**************************************************************************************************************************************************************/
    $.fn.acShow = function(sProperties, tShow, tSleep, easing, cb) {
        var aParams = fnConvertParams.apply(this, [true].concat($.makeArray(arguments)));
        return acAnimate.apply(this, [true].concat(aParams));
    };



    $.fn.acHide = function(sProperties, tShow, tSleep, easing, cb) {
        var aParams = fnConvertParams.apply(this, [false].concat($.makeArray(arguments)));
        return acAnimate.apply(this, [false].concat(aParams));
    };



    $.fn.acHideForced = function(cb) {
        this.find('*').andSelf().stop(true).data('acStopped', true);
        return this.fadeOut(gTHide, cb || $.noop).acHideZ(gTHide * 1.75);
    };



    $.fn.acRestart = function() {
        return this.acClear().find('*').andSelf().removeData('acStopped');
    };



    $.fn.acShowList = function(sProperties, params, cb) {
        return acAnimateList.apply(this, [true].concat($.makeArray(arguments)));
    };



    $.fn.acHideList = function(sProperties, params, cb) {
        return acAnimateList.apply(this, [false].concat($.makeArray(arguments)));
    };



    $.fn.acClear = function() {
        return this.find('*').andSelf().stop(true).acClearStyle();
    };



    $.fn.acClearStyle = (function() {
        var re1 = /(background-image: .+?)(?=;|$)/i,
            re2 = /(filter: .+?sizingMethod='scale'\))/i;

        return function() {
            return this.each(function() {
                var $el = $(this),
                    style = $el.attr('style');

                if (style) {
                    var r1 = re1.exec(style),
                        r2 = re2.exec(style);

                    style = $.trim((r1 ? (r1[1] + '; ') : '') + (r2 ? (r2[1] + ';') : ''));
                    $el.attr('style', style);
                }
            });
        };
    }());



/**************************************************************************************************************************************************************/
    $.fn.acShowO = function(tShow, tSleep, easing, cb) {
        this.css({ opacity: 0 }).animate({ opacity: 1 }, { duration: tShow, easing: easing, queue: false });
        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



    $.fn.acShowB = function(tShow, tSleep, easing, cb) {
        if (!ie8) {
            this.css({ backgroundSize: '1% 1%' }).animate({ backgroundSize: '100% 100%' }, { duration: tShow, easing: easing, queue: false, complete: function() {
                $(this).css({ backgroundSize: '' });
            }});
        } else {
            this.find('> i.ie').css({ width: '1%', height: '1%', top: '49.5%', left: '49.5%' })
                .animate({ width: '100%', height: '100%', left: 0, top: 0 }, tShow, easing, $.proxy(function() {
                    this.css({ width: '', height: '', left: '', top: '' });
                }, this));
        }
        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



    $.fn.acShowZ = function(tShow, tSleep, easing, cb) {
        var start = 0.1,
            end = 1,
            d = end - start;

        this.animate({ acZoom: 1 }, { duration: tShow, easing: easing, queue: false,
            step: function(now, fx) {
                $(this).css({ transform: 'scale(' + (start + now * d) + ')' });
            },
            complete: function() {
                $(this).css({ acZoom: '', transform: '' });
            }
        });

        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



    $.fn.acShowM = (function() {
        var getMargin = function(el) {
            if (window.getComputedStyle) {
                var oStyle = window.getComputedStyle(el);
                if (oStyle.margin !== '') {
                    return oStyle.margin;
                } else {
                    return $.trim(oStyle.marginTop + ' ' + oStyle.marginRight + ' ' + oStyle.marginBottom + ' ' + oStyle.marginLeft);
                }
            } else {
                return $(el).css('margin');
            }
        };

        return function(tShow, tSleep, easing, cb) {
            this.each(function() {
                $(this).data('ac-style-margin', getMargin(this));
            });
            this.animate({ margin: 0 }, { duration: tShow, easing: easing, queue: false });
            setTimeout(cb || $.noop, tShow + (tSleep || 0));
            return this;
        };
    }());



    $.fn.acShowL = function(tShow, tSleep, easing, cb) {
        this.each(function() {
            var $el = $(this);
            $el.data('ac-style-left', $el.css('left'));
        });
        this.animate({ left: 0 }, { duration: tShow, easing: easing, queue: false });
        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



    $.fn.acShowH = function(tShow, tSleep, easing, cb) {
        this.animate({ height: 'hide' }, { duration: 0, queue: false, complete: function() {
            $(this).animate({ height: 'show' }, { duration: tShow, easing: easing, queue: false });
        }});
        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



    $.fn.acShowW = function(tShow, tSleep, easing, cb) {
        this.animate({ width: 'hide' }, { duration: 0, queue: false, complete: function() {
            $(this).animate({ width: 'show' }, { duration: tShow, easing: easing, queue: false });
        }});
        setTimeout(cb || $.noop, tShow + (tSleep || 0));
        return this;
    };



/**************************************************************************************************************************************************************/
    $.fn.acHideO = function(tHide, tSleep, easing, cb) {
        this.animate({ opacity: 0 }, { duration: tHide, easing: easing, queue: false });
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideB = function(tHide, tSleep, easing, cb) {
        if (!ie8) {
            this.css({ backgroundSize: '100% 100%' }).animate({ backgroundSize: '1% 1%' }, { duration: tHide, easing: easing, queue: false });
        } else {
            this.find('> i.ie').css({ width: '100%', height: '100%', top: 0, left: 0 })
                .animate({ width: '1%', height: '1%', left: '49.5%', top: '49.5%' }, tHide, easing, $.proxy(function() {
                this.css({ width: '', height: '', left: '', top: '' });
            }, this));
        }
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideZ = function(tHide, tSleep, easing, cb) {
        var start = 1,
            end = 0.1,
            d = end - start;

        this.animate({ acZoom: 1 }, { duration: tHide, easing: easing, queue: false,
            step: function(now, fx) {
                $(this).css({ transform: 'scale(' + (start + now * d) + ')' });
            },
            complete: function() {
                $(this).css({ acZoom: '', transform: '' });
            }
        });

        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideM = function(tHide, tSleep, easing, cb) {
        this.each(function() {
            var $el = $(this);
            $el.animate({ margin: $el.data('ac-style-margin') }, { duration: tHide, easing: easing, queue: false });
        });
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideL = function(tHide, tSleep, easing, cb) {
        this.each(function() {
            var $el = $(this);
            $el.animate({ left: $el.data('ac-style-left') }, { duration: tHide, easing: easing, queue: false });
        });
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideH = function(tHide, tSleep, easing, cb) {
        this.animate({ height: 0 }, { duration: tHide, easing: easing, queue: false });
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



    $.fn.acHideW = function(tHide, tSleep, easing, cb) {
        this.animate({ width: 0 }, { duration: tHide, easing: easing, queue: false });
        setTimeout(cb || $.noop, tHide + (tSleep || 0));
        return this;
    };



/**************************************************************************************************************************************************************/
    $.fx.step.backgroundSize = (function() {
        var re = /^([1-9][0-9]*|0)([^ ]+) ([1-9][0-9]*|0)([^ ]+)$/,
            re2 = /^([1-9][0-9]*|0)([^ ]+)$/,

            getSize = function(str) {
                return re.exec(str.replace(re2, '$1$2 $1$2'));
            };

        return function(fx) {
            if (fx.pos === 0) {
                fx.aStart = getSize(fx.elem.style.backgroundSize);
                fx.aStart[1] = parseInt(fx.aStart[1], 10);
                fx.aStart[3] = parseInt(fx.aStart[3], 10);
                fx.aEnd = re.exec(fx.end);
                fx.aEnd[1] = parseInt(fx.aEnd[1], 10);
                fx.aEnd[3] = parseInt(fx.aEnd[3], 10);
            }
            fx.elem.style.backgroundSize = (fx.aStart[1] + (fx.aEnd[1] - fx.aStart[1]) * fx.pos) + fx.aStart[2] + ' ' + (fx.aStart[3] + (fx.aEnd[3] - fx.aStart[3]) * fx.pos) + fx.aStart[4];
        };
    }());



/**************************************************************************************************************************************************************/
    $.acOnScroll = (function() {
        var aCallbacks = [],
            $wnd = gWindow,

            fnCheck = function() {
                var t = $wnd.scrollTop() + (gMobile ? 100 : 0),
                    b = t + $wnd.height();

                gDebug && console.log('Window Scroll:', 'H', b - t, 'B', b, 'T', t);

                for (var i = 0; i < aCallbacks.length; i++) {
                    if (((aCallbacks[i].b !== null) ? (aCallbacks[i].b <= b) : (aCallbacks[i].cur !== b)) || aCallbacks[i].t <= t) {
                        var cb = aCallbacks[i].cb;
                        aCallbacks.splice(i, 1);
                        cb();
                    }
                }
            };

        $wnd.on('scroll resize', fnCheck);

        return function(bottom, top, cb) {                                      // bottom, top, cb
            if (arguments.length === 3 && $.type(bottom) !== 'number') {        // null, top, cb
                bottom = Number.MAX_VALUE;
            } else if (arguments.length === 2) {                                // bottom, cb
                top = Number.MAX_VALUE;
                cb = arguments[1];
            } else if (arguments.length === 1) {                                // cb
                bottom = null;
                top = Number.MAX_VALUE;
                cb = arguments[0];
            }

            aCallbacks.push({
                b: bottom,
                t: top,
                cb: cb,
                cur: gWindow.scrollTop() + gWindow.height()
            });
            fnCheck();
        };
    }());



/**************************************************************************************************************************************************************/
    $.fn.acIEFix = function() {
        return this.each(function() {
            var $el = $(this),
                recheck = $el.attr('ie-recheck'),
                $i = $('<i class="ie"></i>').appendTo($el),

                fnUpdate = function(ev) {
                    if (ev === undefined || !/^style\./.test(ev.propertyName)) {
                        $el.css({backgroundImage: ''});
                        $i.css({
                            filter:
                                'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' +
                                    $el.css('background-image').replace(/^url\("?[^\/]+:\/\/[^\/]+\/(.+?)"?\)$/, '/$1') +
                                    '\', sizingMethod=\'scale\')'
                        });
                        $el.css({backgroundImage: 'none'});
                    }
                };

            fnUpdate();

            if (recheck !== undefined) {
                recheck = parseInt(recheck);
                $el[0].attachEvent('onpropertychange', fnUpdate);
                for (var $p = $el.parent(), i = 0; i < recheck; $p = $p.parent(), i++) {
                    $p[0].attachEvent('onpropertychange', fnUpdate);
                }
            }
        });
    };
}(jQuery));
/* End */

/* Preload ********************************************************************/
(function($) {
    'use strict';

    $.fn.xPreload = function() {
        return fnPreload($.map(this.filter('img').toArray(), function() {
            return $(this).attr('src');
        }), this);
    };

    $.xPreload = function(aSrc) {
        return fnPreload($.isArray(aSrc) ? aSrc : [aSrc], aSrc);
    };

    var fnPreload = (function() {
        var items = 0,

            fnCreate = function() {
                return items++ === 0 ? $('<div id="x-preload" style="display: none;"></div>').appendTo('body') : $('#x-preload');
            },

            fnDestroy = function() {
                if (--items === 0) {
                    $('#x-preload').remove();
                }
            },

            fnLoad = function(src) {
                if (/^.+\.(jpg|jpeg|png|gif)$/.test(src)) {
                    var dComplete = $.Deferred();
                    $('<img>').on('load', function() {
                        $(this).detach();
                        fnDestroy();
                        dComplete.resolve();
                    }).attr('src', src).appendTo(fnCreate());
                    return dComplete;
                } else if (/^.+\.(js|css)$/.test(src)) {
                    return $.get(src);
                } else {
                    return null;
                }
            };


        return function(array, arg) {
            var dComplete = $.Deferred(),
                dArray = [];

            for (var i = 0; i < array.length; i++) {
                dArray.push(fnLoad(array[i]));
            }
            $.when.apply(null, dArray).done(function() {
                dComplete.resolve(arg);
            });

            return dComplete;
        };
    }());
}(jQuery));
/* End Preload ****************************************************************/

(function($) {
    'use strict';
    var $banner = $('.b-index-bnn');
    var fnInitialize = function() {
        $banner.find('.b-clouds').jsBannerClouds();
        $banner.jsBanner();
        setTimeout(function() {
            $banner.addClass('m-transition');
            $banner.find('.r-free').css({
                marginRight: -1000
            }).fadeIn(800).animate({
                marginRight: 0
            }, {
                duration: 800,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                    $(this).css({
                        marginRight: ''
                    });
                }
            });
        }, 100);
        if ($.xBrowser.name === 'ie' && parseInt($.xBrowser.version) <= 8) {
            $('.js-ie-fix, .js-ie-fix-list > li').acIEFix();
        }
    };
    var fnPreload = function() {
		
        var $list = $banner.find('.b-carousel, .b-clouds, .b-bnn-list > li.n1').find('*'),
            aUrl = [''];
        $list.each(function() {
            var url = (window.getComputedStyle && window.getComputedStyle(this) || this.style).backgroundImage.replace(/^url\("?(.+?)"?\)$/, '$1'),
                i;
            if (url && url !== '') {
                for (i = 0; i < aUrl.length; i++) {
                    if (aUrl[i] === url) {
                        return;
                    }
                }
                aUrl.push(url);
            }
        });
        return $.xPreload(aUrl);
    };
	
    $(function() {
		
        fnPreload().done(function() {
			
            $banner.find('.b-loader-container').fadeOut(500);
            $banner.find('.b-load-gap').remove();
            $banner.addClass('m-ready');
            $banner.addClass('m-ready-start');
            fnInitialize();
        });
        $banner.find('.r-details').each(function() {
            var $el = $(this),
                fnShow = (function() {
                    var id = null;
                    return function() {
                        $el.addClass('m-show');
                        clearTimeout(id);
                        id = setTimeout(function() {
                            $el.removeClass('m-show');
                        }, 5000);
                    };
                }());
            $el.on('mousemove', fnShow).on('mouseleave', function() {
                setTimeout(function() {
                    $el.removeClass('m-show');
                }, 25);
            });
        });
    });
}(jQuery));
(function($) {
    'use strict';
    $.fn.jsBannerClouds = (function() {
        var Cloud = function(el) {
            this.$el = $(el);
            this.$container = this.$el.parent();
            $.extend(this, {
                width: this.$el.width(),
                height: this.$el.height(),
                cWidth: this.$container.width()
            });
            this.start();
            $(window).on('resize', $.proxy(this.onResize, this));
        };
        $.extend(Cloud.prototype, {
            MIN_SPEED: 25,
            MAX_SPEED: 100,
            MIN_TIMEOUT: 2500,
            MAX_TIMEOUT: 10000,
            start: function() {
                $.extend(this, {
                    left: parseInt(this.$el.css('left'), 10),
                    speed: this.MIN_SPEED + Math.round(Math.random() * (this.MAX_SPEED - this.MIN_SPEED))
                });
                this.dir = this.left < 0 ? 1 : -1;
                this.move();
            },
            move: function() {
                var dest = (this.cWidth / 2 + (this.dir > 0 ? 0 : this.width)) * this.dir,
                    time = Math.round(Math.abs(dest - this.left) / this.speed);
                this.$el.animate({
                    left: dest
                }, time * 1000, 'linear', $.proxy(function() {
                    var timeout = this.MIN_TIMEOUT + Math.round(Math.random() * (this.MAX_TIMEOUT - this.MIN_TIMEOUT));
                    setTimeout($.proxy(function() {
                        this.start();
                    }, this), timeout);
                }, this));
            },
            onResize: function() {
                this.$el.stop();
                this.cWidth = this.$container.width();
                this.move();
            }
        });
        return function() {
            return this.each(function() {
                $(this).find('> li').each(function() {
                    new Cloud(this);
                });
            });
        };
    }());
    $.fn.jsBannerCarousel = (function() {
        var Carousel = function(el, params) {
            $.extend(this, {
                index: 0,
                duration: 500,
                easing: 'easeInOutQuad'
            }, params, {
                $el: $(el)
            });
            this.initialize();
            this.$el.data('jsBannerCarousel', this);
        };
        var $menu = $('.b-index-bnn').find('.r-menu > li');
        $.extend(Carousel.prototype, {
            RADIUS: 422,
            RADIUSTEXT: 110,
            initialize: function() {
                this.$items = this.$el.find('> li');
                this.$textItems = this.$el.find('> li span');
                this.angle = 360 / this.$items.length;

                this.$items.each($.proxy(function(i, el) {
                    $(el).css(this.angle2pos((i + this.index) * this.angle));
                }, this));

                this.$items.each($.proxy(function(i, el) {
                    // $(el).css(this.angle2posText((i + this.index) * this.angle));
                    $(el).find('span').css(this.angle2posText((i + this.index) * this.angle));
                }, this));

                this.$items.eq(-this.index).addClass('is-active');
            },
            angle2pos: function(angle) {
                return {
                    top: -Math.cos(angle / 180 * Math.PI) * this.RADIUS,
                    left: Math.sin(angle / 180 * Math.PI) * this.RADIUS
                };
            },
            angle2posText: function(angle) {
                if(angle>=90 && angle<=270)
                {
                    var margin2Radius = (this.RADIUSTEXT/Math.PI) - 25;
                }
                else
                {
                    var margin2Radius = (this.RADIUSTEXT/Math.PI) + 25;
                }

                return {
                    top: (-Math.cos(angle / 180 * Math.PI) * this.RADIUSTEXT),
                    left: (Math.sin(angle / 180 * Math.PI) * this.RADIUSTEXT),
                    right: (Math.sin(angle / 180 * Math.PI) * this.RADIUSTEXT),
                    marginTop: margin2Radius
                };
            },
            set: function(newIndex) {
                this.$items.removeClass('is-active').eq(newIndex).addClass('is-active');
                this.$items.removeClass('is-active').find('a').attr('href', '#');
                this.$items.eq(newIndex).addClass('is-active').find('a').attr('href', newIndex !== 0 ? $menu.eq(newIndex - 1).find('a').attr('href') : '#');

                var _this = this,
                    dAngle = -(this.$items.length + newIndex - this.index) % this.$items.length * this.angle;
                if (dAngle < -180) {
                    dAngle += 360;
                }
                this.$el.css({
                    b24animate: 0
                }).animate({
                    b24animate: 1
                }, {
                    duration: this.duration,
                    easing: this.easing,
                    step: function(now, fx) {
                        // _this.$items.each(function(i, el) {
                        //     i = -_this.index + i;
                        //     $(el).css(_this.angle2pos(i * _this.angle + dAngle * fx.pos));
                        // });
                    },
                    complete: function() {
                        // _this.index = newIndex;
                        // $(this).css({
                        //     b24animate: ''
                        // });
                    }
                });
                return $.when(this.$el);
            }
        });
        return function(params) {
            return this.each(function() {
                new Carousel(this, params);
            });
        };
    }());
    $.fn.jsBanner = function() {
        return this.each(function() {
            var $banner = $(this),
                $heading = $banner.find('h2 a'),
                $menu = $banner.find('.r-menu > li'),
                $text = $banner.find('.r-text > li'),
                $details = $banner.find('.r-details .e-button'),
                $free = $banner.find('.r-free'),
                index = 0,
                auto = true,
                $carousel = $banner.find('.b-carousel').jsBannerCarousel({
                    index: index
                }),
                oCarousel = $carousel.data('jsBannerCarousel'),
                $aCarousel = $carousel.find('> li'),
                $bList = $banner.find('.b-bnn-list').jsBannerList(),
                oBList = $bList.data('jsBannerList'),
                $prev = $banner.find('.e-arrow.n-prev'),
                $next = $banner.find('.e-arrow.n-next'),
                length = oCarousel.$items.length,
                busy = false,
                idTimeout = null,
                timeout = 2500,
                tFade = 500,
                prev = function() {
                    set((length + index - 1) % length);
                },
                next = function() {
                    set((index + 1) % length);
                },
                set = function(newIndex) {
                    if (busy || newIndex === index) {
                        return;
                    }
                    busy = true;
                    auto && stop();
                    setMenu(newIndex);
                    setDetails(newIndex);
                    showFree();
                    var dComplete = $.Deferred();
                    hide(index).done(function() {
                        setTimeout(function() {
                            show(newIndex).done(function() {
                                dComplete.resolve();
                            });
                        }, 200);
                    });
                    $.when(oCarousel.set(newIndex)).done(function() {
                        index = newIndex;
                        busy = false;
                    });
                    $.when(dComplete).done(function() {
                        auto && start();
                    });
                },
                setDetails = (function() {
                    var url0 = $heading.attr('href');
                    return function(index) {
                        $details.attr('href', index === 0 ? url0 : $menu.eq(index - 1).find('a').attr('href'));
                    };
                }()),
                showFree = (function() {
                    var w = $free.width(),
                        isHover = false,
                        duration = 400,
                        show = function() {
                            $free.stop().animate({
                                width: w
                            }, duration, 'easeInQuad');
                        },
                        hide = function() {
                            $free.stop().animate({
                                width: 0
                            }, duration, 'easeOutQuad');
                        };
                    $free.find('.e-text').outerWidth(w);
                    $free.hover(function() {
                        isHover = true;
                    }, function() {
                        isHover = false;
                    });
                    return function() {
                        !isHover && hide();
                        setTimeout(function() {
                            show();
                        }, duration);
                    };
                }()),
                setMenu = function(index) {
                    $menu.removeClass('is-active');
                    if (index > 0) {
                        $menu.eq(index - 1).addClass('is-active');
                    }
                },
                show = function(index) {
                    return $.when(oBList.show(index), $text.hide().eq(index).css({
                        display: 'table-cell',
                        opacity: 0
                    }).fadeTo(tFade, 1, function() {
                        $(this).css({
                            opacity: ''
                        });
                    }));
                },
                hide = function(index) {
                    return $.when(oBList.hide(index), $text.filter(':visible').add($text.eq(index)).fadeOut(tFade));
                },
                start = function() {
                    idTimeout = setTimeout(function() {
                        next();
                    }, timeout);
                },
                stop = function() {
                    clearTimeout(idTimeout);
                };
            setMenu(index);
            show(index);
            setDetails(index);
            auto && start();
            $prev.on('click', prev);
            $next.on('click', next);
            $heading.on('click', function(e) {
                set(0);
            });
            $carousel.find('a').on('click', function(e) {
                if (!$(this).closest('li').hasClass('is-active') || $(this).attr('href') === '#') {
                    e.preventDefault();
                }
                set($aCarousel.index($(this).closest('li')));
            });
        });
    };
}(jQuery));
var countGap = 0;
(function($) {
    'use strict';
    $.fn.jsBannerList = (function() {
        var BannerList = function(el) {
            $.extend(this, {
                $el: $(el),
                action: 0,
                iCurrent: -1,
                iShow: -1
            });
            this.$el.data('jsBannerList', this);
            this.$items = this.$el.find('> li').each(function(index, el) {
                eval('MiniBanner' + index)(el);
            });
        };
        $.extend(BannerList.prototype, {
            show: function(index) {
                if (this.action !== 0) {
                    return;
                }
                var _this = this,
                    dComplete = $.Deferred(),
                    $el = this.$items.eq(index);
                this.action = 1;
                this.iShow = index;
                $el.acRestart();
                $.when($el.data('jsMiniBanner').show()).done(function() {
                    if (_this.action === 1 && index === _this.iShow) {
                        _this.action = 0;
                        _this.iCurrent = _this.iShow;
                        _this.iShow = -1;
                        dComplete.resolve();
                    }
                });
                return dComplete;
            },
            hide: (function() {
                var dComplete = null,
                    onHide = function() {
                        this.action = 0;
                        dComplete.resolve();
                    };
                return function() {
                    var _this = this,
                        $el;
                    dComplete = $.Deferred();
                    switch (this.action) {
                        case 0:
                            this.action = 2;
                            $el = this.$items.eq(this.iCurrent);
                            $.when($el.data('jsMiniBanner').hide()).done(function() {
                                onHide.call(_this);
                            });
                            break;
                        case 1:
                            this.action = 3;
                            $el = this.$items.eq(this.iShow);
                            $.when($el.acHideForced()).done(function() {
                                onHide.call(_this);
                            });
                            break;
                    }
                    return dComplete;
                };
            }())
        });
        return function() {
            return this.each(function() {
                new BannerList(this);
            });
        };
    }());
    var tShow = 600,
        tHide = 400,
        tSleep = tShow / 2,
        tSleep2 = tSleep * 0.75,
        tDelay = tSleep / 2,
        tDelay2 = tDelay / 2,
        showEasing = 'easeOutQuart',
        hideEasing = 'easeInQuart',
        fnShowCircles = function($el, cb) {
            $el.find('.r-circle > li').acShowList('B', {
                tSleep: 0
            }, cb || $.noop);
        };
    var MiniBanner0 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aList = $el.find('.r-list > li');
            var fn = {
                show: function() {
                    if (countGap === 0) {;
                        countGap = false;
                        $el.find('.r-list > li.n1').css({
                            visibility: 'visible',
                            margin: 0
                        });
                        return $.when($aList.not('.n1').acShowList('M B', {
                            easing: showEasing
                        }));
                    } else {
                        return $.when($aList.acShowList('M B', {
                            easing: showEasing
                        }));
                    }
                },
                hide: function() {
                    return $.when($aList.acHide('M B', hideEasing));
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner1 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $task = $el.find('.r-task-wnd');
            var showWindows = function(cb) {
                    $task.add($el.find('.e-chart')).acShowList('M', {
                        tDelay: tShow,
                        easing: showEasing,
                        tSleep: tSleep * 1.5
                    }, cb || $.noop);
                },
                complete = function(cb) {
                    $task.find('.e-timer').acShow('O', tShow, tSleep * 1.25, function() {
                        $task.find('.r-counter > li').acShowList('O', {
                            tDelay: tShow + tSleep
                        });
                        $task.find('.r-list > li').acShowList('O', {
                            tDelay: tShow + tSleep,
                            tSleep: 0
                        }, cb || $.noop);
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        showWindows(function() {
                            complete(function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred(),
                        $aCircle = $el.find('.r-circle > li');
                    $el.find('.e-chart').acHide('M', tHide, tDelay2, function() {
                        $.when($task.acHide('O'), $aCircle.acHide('O')).done(function() {
                            $task.css('display','none');
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner2 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aWnd = $el.find('.r-window > li');
            var showUser = function(cb) {
                    $el.find('.r-user > li').acShowList('O', {
                        tDelay: tDelay * 1.5,
                        tSleep: tSleep * 0.5
                    }, cb);
                },
                showStatus = function(cb) {
                    $aWnd.eq(1).acShow('B', tShow, tSleep * 0.5, function() {
                        $aWnd.find('.r-progress > li').acShowList('O', {
                            tDelay: tDelay * 1.5
                        });
                        (cb || $.noop)();
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    $el.find('.r-circle > li').acShowList('B', {
                        tDelay: tSleep * 1.25,
                        tSleep: -tSleep2
                    }, function() {
                        $aWnd.eq(0).acShow('B', tShow, tSleep2, function() {
                            showUser(function() {
                                showStatus(function() {
                                    $aWnd.eq(2).acShow('B', tShow, tSleep2, function() {
                                        $el.find('.e-phone').acShow('M', tShow, 0, function() {
                                            dComplete.resolve();
                                        });
                                    });
                                });
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.e-phone').acHide('M', tHide, tDelay2, function() {
                        $aWnd.add($el.find('.r-user > li, .r-progress > li')).acHide('O', tHide, tDelay2, function() {
                            $el.find('.r-circle > li').acHide('B', tHide, 0, function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner3 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aWnd = $el.find('.r-window > li');
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    $el.find('.r-circle > li').acShowList('B', {
                        tDelay: tSleep * 1.25,
                        tSleep: -tSleep * 0.25
                    }, function() {
                        $aWnd.acShowList('M', {
                            tDelay: tShow + tDelay,
                            tSleep: tDelay
                        }, function() {
                            $el.find('.e-dots').acShow('O', tShow, 0, function() {
                                $el.find('.e-phone').acShow('B', tShow, 0, function() {
                                    dComplete.resolve();
                                });
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $.when($el.find('.e-phone').acHide('B'), $el.find('.e-dots').acHide(), $aWnd.eq(1).acHide('M')).done(function() {
                        $aWnd.eq(0).acHide('M', tHide, 0, function() {
                            $el.find('.r-circle > li').acHide('B', tHide, 0, function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner4 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aList = $el.find('.r-list > li');
            var showList = function(cb) {
                $aList.acShowList('M', {
                    tDelay: tShow,
                    easing: showEasing
                }, cb || $.noop);
            };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        showList(function() {
                            $el.find('.e-dots').acShow(function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var $aCircle = $el.find('.r-circle > li');
                    $el.find('.e-dots').acHide('O');
                    $aList.not('.n1').acHide('M', tHide, tDelay2, function() {
                        $aCircle.acHide('B');
                        $aList.eq(0).acHide('M');
                    });
                    return $.when($aList, $aCircle);
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner5 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aMessage = $el.find('.r-message > li'),
                $msg0 = $aMessage.eq(0),
                $msg1 = $aMessage.eq(1);
            var showMessage0 = function(cb) {
                    var $msg = $aMessage.eq(0);
                    $msg.acShow('B', tShow, tDelay, function() {
                        $msg.find('.r-like > li').acShowList('O', {
                            tShow: tShow * 0.5,
                            tDelay: tShow + tDelay
                        });
                        setTimeout(function() {
                            $msg.find('.e-like-popup').acShow('O', tShow * 0.75, tSleep * 1.25, cb || $.noop);
                        }, tDelay + tShow);
                    });
                },
                showMessage1 = function(cb) {
                    var $msg = $aMessage.eq(1);
                    $msg.acShow('H', tShow * 0.75, tDelay, function() {
                        $msg.find('.e-like').acShow('O', tShow * 0.5, 0, function() {
                            $msg.find('.r-comment > li').acShowList('O', {
                                tShow: tShow * 0.5,
                                tDelay: tShow * 0.5,
                                tSleep: 0
                            }, cb || $.noop);
                        });
                    });
                };
            var showMessage = function(cb) {
                    $msg0.acShow('B', tShow, tSleep2, function() {
                        $msg1.acShow('H', tShow * 0.75, tDelay, cb);
                    });
                },
                showLike = function(cb) {
                    $.when($msg0.find('.r-like > li').acShowList('O', {
                        tShow: tShow * 0.5,
                        tDelay: tShow + tDelay
                    }), $msg0.find('.e-like-popup').delay(tDelay + tShow).acShow('O', tShow * 0.75), $msg1.find('.e-like').acShow('O', tShow * 0.5), $msg1.find('.r-comment > li').delay(tShow * 0.5 + tDelay2).acShowList('O', {
                        tShow: tShow * 0.5,
                        tDelay: tSleep2
                    })).done(cb || $.noop);
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        showMessage(function() {
                            showLike(function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $msg1.find('.e-like, .r-comment > li').add($msg0.find('.e-like-popup, .r-like > li')).acHide();
                    $msg1.acHide('H', tHide, tDelay2, function() {
                        $el.find('.r-circle > li').acHide('O B');
                        $msg0.acHide('O', tHide, 0, function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner6 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var showUsers = function(cb) {
                    var $aUser = $el.find('.r-user > li'),
                        show = function($el, cb) {
                            $el.acShow('B', tShow, -tShow * 0.75, showEasing, cb || $.noop);
                        };
                    show($aUser.eq(0), function() {
                        show($el.find('.e-disk'), function() {
                            $aUser.not('.n1').acShowList('B', {
                                easing: showEasing,
                                tSleep: -tShow * 0.75
                            }, function() {
                                show($el.find('.e-circle'), function() {
                                    setTimeout(cb || $.noop, tShow * 0.75);
                                });
                            });
                        });
                    });
                },
                showFile = function(cb) {
                    var $aFile = $el.find('.r-file > li');
                    $el.find('.r-dots > li').acShow('O', tShow, tDelay, function() {
                        $aFile.eq(0).acShow('M O', tShow, tDelay, function() {
                            $aFile.not('.n1').acShow('M O', tShow * 1.2, 0, cb);
                        });
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    showUsers(function() {
                        showFile(function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.r-file > li').acHide('O', tHide, tDelay2, function() {
                        $.when($el.find('.r-user > li, .e-disk, .e-circle').acHide('B'), $el.find('.r-dots > li').acHide('O')).done(function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner7 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var showFileList = function(cb) {
                    $el.find('.e-avatar, .e-avatar span').acShow('B', tShow, tSleep * 0.25, showEasing, function() {
                        $el.find('.e-file-list').acShow('H', tShow * 0.75, tSleep * 1.25, cb || $.noop);
                    });
                },
                showMenu = function(cb) {
                    var $menu = $el.find('.r-menu');
                    $menu.acShow('O', tShow, tSleep * 0.5, function() {
                        $menu.find('.e-button, .e-popup').acShow(cb || $.noop);
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el);
                    setTimeout(function() {
                        showFileList(function() {
                            showMenu(function() {
                                dComplete.resolve();
                            });
                        });
                    }, tSleep * 2);
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.r-menu, .r-menu > *, .e-file-list').acHide('O', tHide, tDelay2, function() {
                        $el.find('.r-circle > li, .e-avatar, .e-avatar span').acHide('B O', tHide, 0, function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner8 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var showUsers = function(cb) {
                    var $aUser = $el.find('.r-user > li'),
                        show = function($el, cb) {
                            $el.acShow('B', tShow, -tShow * 0.75, showEasing, cb || $.noop);
                        };
                    show($aUser.eq(0), function() {
                        show($el.find('.e-disk'), function() {
                            $aUser.not('.n1').acShowList('B', {
                                easing: showEasing,
                                tSleep: -tShow * 0.75
                            }, function() {
                                show($el.find('.e-circle'), function() {
                                    setTimeout(cb || $.noop, tShow * 0.75);
                                });
                            });
                        });
                    });
                },
                showFile = function(cb) {
                    var $aFile = $el.find('.r-file > li');
                    $el.find('.r-dots > li').acShow('O', tShow, tDelay, function() {
                        $aFile.eq(0).acShow('M O', tShow, tDelay, function() {
                            $aFile.not('.n1').acShow('M O', tShow * 1.2, 0, cb);
                        });
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    showUsers(function() {
                        showFile(function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.r-file > li').acHide('O', tHide, tDelay2, function() {
                        $.when($el.find('.r-user > li, .e-disk, .e-circle').acHide('B'), $el.find('.r-dots > li').acHide('O')).done(function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner9 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $popup = $el.find('.r-popup');
            var showCalendar = function(cb) {
                    $el.find('.r-calendar').acShow('M', tShow, tSleep, showEasing, cb);
                },
                showColumn = function(cb) {
                    var $col = $el.find('.r-column'),
                        $aCol = $col.find('> li');
                    $aCol.eq(0).acShow('O', function() {
                        $.when($col.animate({
                            margin: 0
                        }, tShow), $aCol.eq(0).acHide('O', tShow), $aCol.eq(1).acShow('O')).done(function() {
                            setTimeout(cb || $.noop, tSleep);
                        });
                    });
                },
                clickButton = function(cb) {
                    var $button = $popup.find('.e-button');
                    $button.acShow('O', tDelay, 0, function() {
                        $button.acHide('O', tDelay, tSleep2, function() {
                            $.when($popup.acHide('B M', tShow), $el.find('.r-scheduler, .r-column > li').acHide('O', tShow)).done(cb);
                        });
                    });
                };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        showCalendar(function() {
                            $el.find('.r-scheduler').acShow();
                            showColumn(function() {
                                $popup.acShow('B M', tShow, tSleep2, showEasing, function() {
                                    clickButton(function() {
                                        dComplete.resolve();
                                    });
                                });
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $.when($el.find('.r-popup').acHide('B M'), $el.find('.r-calendar').acHide('M')).done(function() {
                        setTimeout(function() {
                            $el.find('.r-circle > li').acHide('B', tHide, 0, function() {
                                dComplete.resolve();
                            });
                        }, tDelay2);
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner10 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var showWindows = function(cb) {
                $el.find('.r-window > li').acShowList('M', {
                    tDelay: tShow * 0.75
                }, cb);
            };
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    setTimeout(function() {
                        $el.find('.e-user').acShow('B');
                    }, tSleep);
                    fnShowCircles($el, function() {
                        showWindows(function() {
                            $el.find('.e-type').acShow('O', tShow, tSleep, function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.e-type').acHide('O');
                    $el.find('.r-window > li').acHide('M', tHide, tDelay2, function() {
                        $el.find('.r-circle > li, .e-user').acHide('B', tHide, 0, function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner11 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        $el.find('.r-window > li').acShowList('M', {
                            tDelay: tShow * 0.75,
                            tSleep: -tSleep
                        }, function() {
                            $el.find('.e-popup').acShow('O', tShow, 0, function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $el.find('.e-popup').acHide('O');
                    $($el.find('.r-window > li').toArray().reverse()).acHideList('M', {
                        tSleep: -tSleep
                    }, function() {
                        $el.find('.r-circle > li').acHide('B', tHide, 0, function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner12 = function(el) {
        $(el).each(function() {
            var $el = $(this);
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    fnShowCircles($el, function() {
                        setTimeout(function() {
                            $el.find('.r-phone > li').acShowList('B M', {
                                tSleep: tSleep2
                            }, function() {
                                $el.find('.e-tablet').acShow('M', tShow, tSleep2, function() {
                                    $el.find('.e-platform').acShow('O', tShow, 0, function() {
                                        dComplete.resolve();
                                    });
                                });
                            });
                        }, tDelay);
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $.when($el.find('.r-phone > li, .e-platform').acHide(), $el.find('.e-tablet').acHide('M')).done(function() {
                        $el.find('.r-circle > li').acHide('B', tHide, 0, function() {
                            dComplete.resolve();
                        });
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
    var MiniBanner13 = function(el) {
        $(el).each(function() {
            var $el = $(this),
                $aWnd = $el.find('.r-window > li');
            var fn = {
                show: function() {
                    var dComplete = $.Deferred();
                    $aWnd.eq(0).acShow('M', tShow, tDelay, function() {
                        $aWnd.eq(1).acShow('B M', tShow * 0.75, tDelay, function() {
                            $aWnd.eq(2).acShow('O', tShow, 0, function() {
                                dComplete.resolve();
                            });
                        });
                    });
                    return dComplete;
                },
                hide: function() {
                    var dComplete = $.Deferred();
                    $($aWnd.toArray().reverse()).acHideList('B O', {
                        tDelay: tDelay * 1.75,
                        tSleep: 0
                    }, function() {
                        dComplete.resolve();
                    });
                    return dComplete;
                }
            };
            $el.data('jsMiniBanner', fn);
        });
    };
}(jQuery));

