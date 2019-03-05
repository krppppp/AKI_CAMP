/**
 * common js
 *
*/

(function($){"use strict";var LetterFx=function(element,options){this.options=$.extend({},$.fn.letterfx.defaults,options);this.num_completed_fx=0;this.is_done=false;this.monitor_timer=null;this.killswitch=null;this.$element=$(element);if(this.options.restore)this.original_html=this.$element.html();this.init()};LetterFx.prototype.init=function(){this.new_html=this.$element.text().replace(this.options.pattern,this.options.replacement);this.$element.addClass(this.options.css.element.base).addClass(this.options.css.element.before);this.$element.html(this.new_html);this.$letters=this.$element.find(this.options.selector);this.$letters.css("transition-duration",this.options.fx_duration).addClass(this.options.css.letters.base).addClass(this.options.css.letters.before);this.bindLetterFxEnd();this.num_letters=this.$letters.length;this.fx();return this};LetterFx.prototype.bindLetterFxEnd=function(){var options=this.options;var lfx=this;this.$letters.bind("transitionend",function(){options.onLetterComplete($(this),lfx.$element,lfx);lfx.notifyFXEnd();switch(options.letter_end){case"destroy":$(this).remove();break;case"rewind":lfx.applyLetterFx($(this),options.timing,options.css.letters.after,options.css.letters.before);break;case"stay":break;default:$(this).replaceWith($(this).text())}});return lfx};LetterFx.prototype.terminate=function(){this.is_done=true;this.options.onElementComplete(this.$element,this);clearTimeout(this.killswitch);switch(this.options.element_end){case"destroy":this.$element.remove();break;case"stay":break;default:this.$element.html(this.original_html);this.$element.removeClass(this.options.css.element.base).removeClass(this.options.css.element.after);break}};LetterFx.prototype.notifyFXEnd=function(){clearTimeout(this.monitor_timer);this.num_completed_fx++;var lfx=this;this.monitor_timer=setTimeout(function(){if(lfx.num_completed_fx%lfx.num_letters===0){lfx.terminate()}},Math.max(this.options.timing+10,50));return this};LetterFx.prototype.startKillWatch=function(){var fx_duration=this.options.fx_duration.match(/\d+s/)?parseInt(this.options.fx_duration):1;var time=Math.ceil(1.5*this.num_letters*this.options.timing*fx_duration);var lfx=this;this.killswitch=window.setTimeout(function(){if(!lfx.isDone()){lfx.terminate()}},time)};LetterFx.prototype.fx=function(){var lfx=this;this.startKillWatch();this.$element.removeClass(this.options.css.element.before).addClass(this.options.css.element.after);var $letters=this.options.sort(this.$letters);var options=this.options;$letters.each(function(i,letter){lfx.applyLetterFx($(letter),(i+1)*options.timing,options.css.letters.before,options.css.letters.after)});return this};LetterFx.prototype.applyLetterFx=function($letter,timing,css_before,css_after){var options=this.options;window.setTimeout(function(){$letter.removeClass(css_before).addClass(css_after)},timing);return this};LetterFx.prototype.isDone=function(){return this.is_done};var LetterFxConfig=function(conf){this.config=$.extend({},$.fn.letterfx.defaults,conf);this.buildCss(this.config.backwards);if(this.config.words)this.config.pattern=/(\S+)/g};LetterFxConfig.prototype.buildCss=function(flip){var options=this.config;var before=flip?"after":"before";var after=flip?"before":"after";var css={element:{},letters:{}};css.element.base=options.element_class+"-container "+options.fx.replace(/(\S+)/g,options.element_class+"-$1-container");css.element[before]=options.fx.replace(/(\S+)/g,options.element_class+"-$1-before-container");css.element[after]=options.fx.replace(/(\S+)/g,options.element_class+"-$1-after-container");css.letters.base=options.element_class;css.letters[before]=options.fx.replace(/(\S+)/g,options.element_class+"-$1-before");css.letters[after]=options.fx.replace(/(\S+)/g,options.element_class+"-$1-after");this.config=$.extend(options,{css:css})};LetterFxConfig.prototype.getConfig=function(){return this.config};LetterFxConfig.parse=function(config){return new LetterFxConfig(config).getConfig()};$.fn.letterfx=function(config){config=LetterFxConfig.parse(config);return $(this).each(function(){var $element=$(this);if(!$element.data("letterfx-obj")||$element.data("letterfx-obj").isDone()){$element.data("letterfx-obj",new LetterFx($element,config))}})};$.fn.letterfx.sort={random:function(array){var currentIndex=array.length,temporaryValue,randomIndex;while(0!==currentIndex){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temporaryValue=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temporaryValue}return array},reverse:function($array){return $array.toArray().reverse()}};$.fn.letterfx.patterns={letters:/(\S)/gi};$.fn.letterfx.defaults={fx:"spin fly-top",pattern:/(\S)/gi,word:false,backwards:false,replacement:"<span>$1</span>",selector:"span",timing:50,fx_duration:"1s",sort:function($letters){return $letters},onLetterComplete:function($letter,$element,LetterFXObj){},onElementComplete:function($element,LetterFXObj){},letter_end:"restore",element_end:"restore",restore:true,destroy:false,element_class:"letterfx",css:{element:{base:"",before:"",after:""},letters:{base:"",before:"",after:""}}}})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written perneeded.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written perneeded.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function($, window, document, undefined) {
    var _window  = $(window);

    $(function() {
        if( $('html').hasClass('lt-ie9')) {
            $('dt:first').addClass('first-el');
            $('dd:first').addClass('first-el');
            $('dd:last').addClass('last-el');
            $('dt:last').addClass('last-el');
            $(':first-child').addClass('first-el-child');
            $(':last-child').addClass('last-el-child');
        }

        // rollover
        $(".hover-opacity01").hover(
              function(){ $(this).stop().fadeTo(200,0.6); },
              function(){ $(this).stop().fadeTo(250,1.0); }
         );
        $(".hover-opacity02").hover(
              function(){ $(this).stop().fadeTo(200,0.5); },
              function(){ $(this).stop().fadeTo(250,1.0); }
         );

        // pagescroll
        $('a[href*="#"]').click(function(event){
            if(!$(this).hasClass('noscr')) {
                event.preventDefault();
                var f = this.href;
                var p = f.split('#');
                var t = p[1];
                var to = $('#'+t).offset();
                var tt = to.top -70;
                $('html, body').animate({scrollTop:tt} ,400 ,'swing');
            }
        });

        //スマホかどうか
        if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
            $('.nopc-bg').show();
            $('.main-bg').hide();
        }

        /*=====< scroll >====================================================================================**/
        var $header        = $('#site-header'),
            $wrapper       = $('#wrapper'),
            _super     = '.super',
            _what          = '.what',
            _needed       = '.needed',
            _service       = '.service',
            _backup        = '.akitennisclass74',
            _flow          = '.flow',
            _v_s = '.v_s',
            isTitleEffect = {
                _super: false,
                _what: false,
                _needed: false,
                _service: false,
                _backup: false,
                _flow: false,
                _v_s: false
            };


        $('#site-header .inner .animation').css({
            'transition': 'all .5s'
        });

        // title effect
        function titleEffect(_el) {
            $('.common-title', _el).animate({
                opacity: 1
            }, 200);
            $('.common-title', _el).letterfx({"fx":"fall","backwards":false,"timing":50,"fx_duration":"120ms","letter_end":"restore","element_end":"restore"});
            isTitleEffect[_el] = true;
        }

        _window.on('scroll', function(event) {

            // title effect
            if (_window.scrollTop() > $(_super).offset().top - 400) {
                if(!isTitleEffect[_super]) {
                  //titleEffect(_super);
                  $('#wrapper > section:nth-child(4) > div > div > h1').addClass('flip slower animated');
                  $('#wrapper > section:nth-child(4) > div > div > h1').css("opacity",1);
                }
            }
            if (_window.scrollTop() > $(_what).offset().top - 400) {
                if(!isTitleEffect[_what]) {
                  //titleEffect(_what);
                  $('#wrapper > section:nth-child(3) > div > h1').addClass('fadeIn slower animated');
                  $('#wrapper > section:nth-child(3) > div > h1').css("opacity",1);
                  $('#wrapper > section:nth-child(3) > div > h1').addClass('flipInX slower animated');
                }
            }
            if (_window.scrollTop() > $(_needed).offset().top - 400) {
                if(!isTitleEffect[_needed]) {
                  //titleEffect(_needed);
                  $('#wrapper > section:nth-child(6) > div > h1').addClass('shake slower animated');
                  $('#wrapper > section:nth-child(6) > div > h1').css("opacity",1);
                }
            }
            if (_window.scrollTop() > $(_service).offset().top - 400) {
                if(!isTitleEffect[_service]) {
                  //titleEffect(_service);
                  $('#wrapper > section:nth-child(8) > div > div > h1').addClass('zoomIn slower animated');
                }
            }
            if (_window.scrollTop() > $(_backup).offset().top - 400) {
                if(!isTitleEffect[_backup]) {
                    titleEffect(_backup);
                }
            }
            if (_window.scrollTop() > $(_flow).offset().top - 400) {
                if(!isTitleEffect[_flow]) {
                  //titleEffect(_flow);
                  $('#wrapper > section:nth-child(11) > div > div > h1').addClass('slideInUp slower animated');
                  $('#wrapper > section:nth-child(11) > div > div > h1').css("opacity",1);
                }
            }
            if (_window.scrollTop() > $(_v_s).offset().top - 400) {
                if(!isTitleEffect[_v_s]) {
                    titleEffect(_v_s);
                }
            }

            if (_window.scrollTop() > $(_super).offset().top) {
                if( $('html').hasClass('lt-ie9')) {
                    $('#site-header .inner').fadeIn(500);
                } else {
                    $('#site-header .inner').addClass('active');
                }
            } else {
                if( $('html').hasClass('lt-ie9')) {
                    $('#site-header .inner').fadeOut(500);
                } else {
                    $('#site-header .inner').removeClass('active');
                }
            }
            if (_window.scrollTop() > $(_what).offset().top) {
                $('.what .btm-contents .inbound').animate({
                    'left': '0px'
                }, 1000, 'easeOutQuint');
                $('.what .btm-contents .outbound').animate({
                    'left': '0px'
                }, 1000, 'easeOutQuint');
            }
            if (_window.scrollTop() > $(_service).offset().top - 200) {
                var _isShow = false;

                function humanShow(_block, _index) {
                    if( $('html').hasClass('lt-ie9')) {
                        _block.delay(_index*50).animate({
                            opacity: 1
                        }, 100);
                    } else {
                        setTimeout(function() {
                            _block.addClass('active');
                        }, _index*50)
                    }
                }
                function serviceAnimation(_index, _interval) {
                    if(_index == 1) {
                        $('.service .process .process-potential .human ul li').each( function(index, val) {
                            humanShow($(this), index);
                        });
                    } else if(_index == 2) {
                        if( $('html').hasClass('lt-ie9')) {
                            $('.service .process .process-potential section .sentence').animate({
                                opacity: 1
                            }, 800);
                        } else {
                            $('.service .process .process-potential section .sentence').addClass('active');
                        }
                    } else if(_index == 3) {
                        $('.service .process .process-prospect .human ul li').each( function(index, val) {
                            humanShow($(this), index);
                        });
                    } else if(_index == 4) {
                        if( $('html').hasClass('lt-ie9')) {
                            $('.service .process .process-prospect section .sentence').animate({
                                opacity: 1
                            }, 800);
                        } else {
                            $('.service .process .process-prospect section .sentence').addClass('active');
                        }
                    } else if(_index == 5) {
                        $('.service .process .process-customer .human ul li').each( function(index, val) {
                            humanShow($(this), index);
                        });
                    }

                    // 再帰呼び出し
                    if( _index <= 5) {
                        setTimeout(function() {
                            serviceAnimation( (_index + 1), _interval - 200 );
                        }, _interval - 200);
                    } else {
                        _isShow = true;
                    }
                }

                // アニメーション開始
                if(!_isShow) {
                    serviceAnimation(1, 1300);
                }
            }
        });

        /*=====< fadein >====================================================================================**/
        function fade01() {
            if (Modernizr.csstransitions){
                $('#akitennisid2 .inbound dt').css({
                    'transition': 'all .8s ease-out',
                    opacity: 1
                });
                $('#akitennisid2 .inbound dd.sentence').css({
                    'transition': 'all .8s ease-out',
                    opacity: 1
                });
                if (!Modernizr.svg){
                    $('#akitennisid2 .inbound dd.animate-img').css({
                        'transition': 'all .8s ease-out',
                        opacity: 1
                    });
                }
            } else {
                $('#akitennisid2 .inbound dt').animate({
                    opacity: 1
                }, 800);
                $('#akitennisid2 .inbound dd.sentence').animate({
                    opacity: 1
                }, 800);
                if (!Modernizr.svg){
                    $('#akitennisid2 .inbound dd.animate-img').animate({
                        opacity: 1
                    }, 800);
                }
            }
        }
        function fade02() {
            if( $('html').hasClass('lt-ie9')) {
                $('#akitennisid2 dl.inbound dd.animate-img').animate({ opacity: 1}, 300);
            } else {
                $('#akitennisid2 dl.inbound dd.animate-img').animate({ opacity: 1}, 100).letterfx({"fx":"grow","backwards":false,"timing":50,"fx_duration":"200ms","letter_end":"stay","element_end":"stay"});
            }
        }
        function fade03() {
            if (Modernizr.csstransitions){
                $('#akitennisid2 .vatu').css({
                    'transition': 'all .8s ease-out',
                    opacity: 1
                });
            } else {
                $('#akitennisid2 .vatu').animate({
                    opacity: 1
                }, 800);
            }
        }
        function fade04() {
            if (Modernizr.csstransitions){
                $('#akitennisid2 .outbound dt').css({
                    'transition': 'all .8s ease-out',
                    opacity: 1
                });
                $('#akitennisid2 .outbound dd.sentence').css({
                    'transition': 'all .8s ease-out',
                    opacity: 1
                });
                if (!Modernizr.svg){
                    $('#akitennisid2 .outbound dd.animate-img').css({
                        'transition': 'all .8s ease-out',
                        opacity: 1
                    });
                }
            } else {
                $('#akitennisid2 .outbound dt').animate({
                    opacity: 1
                }, 800);
                $('#akitennisid2 .outbound dd.sentence').animate({
                    opacity: 1
                }, 800);
                if (!Modernizr.svg){
                    $('#akitennisid2 .outbound dd.animate-img').animate({
                        opacity: 1
                    }, 800);
                }
            }
        }
        function fade05() {
            if( $('html').hasClass('lt-ie9')) {
                $('#akitennisid2 dl.outbound dd.animate-img').animate({ opacity: 1}, 600);
            } else {
                $('#akitennisid2 dl.outbound dd.animate-img').animate({ opacity: 1}, 100).letterfx({"fx":"grow","backwards":false,"timing":50,"fx_duration":"200ms","letter_end":"restore","element_end":"restore"});
            }
        }
        function fade06() {
            if (Modernizr.csstransitions){
                $('#akitennisid2 .main-sentence').css({
                    'transition': 'all .5s ease-out',
                    opacity: 1
                });
                $('#akitennisid2 .arrow').css({
                    'transition': 'all .5s ease-out',
                    opacity: 1,
                    'bottom': '6.288659%'
                });
            } else {
                $('#akitennisid2 .main-sentence').animate({
                    opacity: 1
                }, 800);
                $('#akitennisid2 .arrow').animate({
                    opacity: 1,
                    'bottom': '6.288659%'
                }, 800);
            }
        }

        function fadeStart(_fncCnt) {
            if(_fncCnt == 1) {
                fade01();
                setTimeout(function(){
                    fadeStart(2);
                }, 800)
            } else if(_fncCnt == 2) {
                fade02();
                setTimeout(function(){
                    fadeStart(3);
                }, 800)
            } else if(_fncCnt == 3) {
                fade03();
                setTimeout(function(){
                    fadeStart(4);
                }, 800)
            } else if(_fncCnt == 4) {
                fade04();
                setTimeout(function(){
                    fadeStart(5);
                }, 800)
            } else if(_fncCnt == 5) {
                fade05();
                setTimeout(function(){
                    fadeStart(6);
                }, 800)
            } else if(_fncCnt == 6) {
                fade06();
            }
        }

        /*=====< load >======================================================================================**/
        _window.on('load', function(event) {
            setTimeout(function() {
                fadeStart(1);
            }, 200);
        });


    });
})(jQuery, this, this.document);
