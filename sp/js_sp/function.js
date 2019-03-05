;
(function($, window, document, undefined) {
	var _window  = $(window),
	$html = $('html'),
	$wrapper = $('#wrapper'),
	$header = $('#js-header'),
	$thankswrapper = $('.thankswrapper'),
	$senderrwrapper = $('.senderrwrapper'),
	_isFixed = false;


	var init = function() {
		Resize();
		Wrapperheight();
	};


	var Resize = function() {

		var portraitWidth,landscapeWidth;

		_window.bind("resize load", function(){
			portraitWidth = _window.width();
			var baseFontSize = portraitWidth/32;

			if(portraitWidth<=840){
				$html.css("font-size", baseFontSize);
			}else{
				$html.css("font-size", 20);
			}
		}).trigger("resize");
	}

	var Wrapperheight = function() {

		var innerheight;
			_window.bind("load orientationchange　resize", function(){
				 innerheight = _window.innerHeight();
				 $thankswrapper.css("min-height", innerheight);
				 $senderrwrapper.css("min-height", innerheight);
				})
	}

	$(function() {
		init();
	});


})(jQuery, this, this.document);