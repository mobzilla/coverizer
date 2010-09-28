(function($) {
	$.coverizer = function(el, options) {
		var base = this;
		
		base.$el = $(el)
		base.el = el;
		base.images = []
		base.section_width = 0;
		base.current_image = 1;
		
		base.init = function() {
			base.options = $.extend({},$.coverizer.defaults, options);
			// Find Images
			base.images = base.$el.find("img");
			if(base.images.length > 0) {
				base.setupEventListeners();
			}
		};
		
		base.setupEventListeners = function(e) {
			base.$el.mousemove(base.mouseMove).mouseout(base.mouseOut);
			base.calculateImageSections();
			base.hideAllImagesApartFromTheFirst();
		};
		
		base.mouseMove = function(e) {
			var x = e.pageX - base.$el.offset().left;
			var show_image = Math.ceil(x / base.section_width);
			if(show_image <= 0) {
				show_image = 1;
			}
			if(base.current_image != show_image) {
				$(base.images[(show_image - 1)]).css("z-index", 4000);
				$(base.images[(base.current_image - 1)]).css("z-index", -1);
				base.current_image = show_image;
			}
		};
		
		base.mouseOut = function(e) {
			if($.browser.mozilla) {
				if((e.pageX - base.$el.offset().left) > base.$el.width() || (e.pageY - base.$el.offset().top) > base.$el.height()) {
					$(base.images[0]).css("z-index", 4000);
					$(base.images[(base.current_image - 1)]).css("z-index", -1);
					base.current_image = 1;
				}
			} else {
				$(base.images[0]).css("z-index", 4000);
				$(base.images[(base.current_image - 1)]).css("z-index", -1);
				base.current_image = 1;
			}
		};
		
		base.calculateImageSections = function() {
			var container_width = base.$el.width();
			var section_width = Math.ceil(container_width / base.images.length);
			base.section_width = section_width;
		};
		
		base.hideAllImagesApartFromTheFirst = function() {
			var image;
			for(var i = 1, total = base.images.length; i < total; i++) {
				$(base.images[i]).css("z-index", -1);
			}
		};
				
		base.init();
	};
	
	$.coverizer.defaults = {
	};
	
	$.fn.coverizer = function(options) {
		return this.each(function(i){			
			(new $.coverizer(this, options));
		});	
	};
})(jQuery);