(function($) {
	$.coverHover = function(el, options) {
		var base = this;
		
		base.$el = $(el)
		base.el = el;
		base.images = []
		base.section_width = 0;
		
		base.init = function() {
			base.options = $.extend({},$.coverHover.defaults, options);
			// Find Images
			base.images = base.$el.find("img");
			if(base.images.length > 0) {
				base.setupEventListeners();
			}
		};
		
		base.setupEventListeners = function(e) {
			base.$el.mousemove(base.mouseMove);
			base.$el.mouseout(base.mouseOut);
			base.calculateImageSections();
			base.hideAllImagesApartFrom(1);
		};
		
		base.mouseMove = function(e) {
			var x = e.pageX - base.$el.offset().left;
			var show_image = Math.ceil(x / base.section_width);
			if(show_image <= 0) {
				show_image = 1;
			}
			base.hideAllImagesApartFrom(show_image);
		};
		
		base.mouseOut = function(e) {
			base.hideAllImagesApartFrom(1);
		};
		
		base.calculateImageSections = function() {
			var container_width = base.$el.width();
			var section_width = Math.ceil(container_width / base.images.length);
			base.section_width = section_width;
		};
		
		base.hideAllImagesApartFrom = function(dont_hide) {
			dont_hide--;
			var image;
			for(var i = 0, total = base.images.length; i < total; i++) {
				if(dont_hide == i) {
					$(base.images[i]).show();
				} else {
					$(base.images[i]).hide();
				}
			}
		};
				
		base.init();
	};
	
	$.coverHover.defaults = {
	};
	
	$.fn.coverHover = function(options) {
		return this.each(function(i){			
			(new $.coverHover(this, options));
		});	
	};
})(jQuery);