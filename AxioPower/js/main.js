jQuery(document).ready(function(){
	$('#gallery-hold').gallery({
		list: '.box > ul > li',
		switchers:'ul.gall-nav > li'
	});
});


(function ($){
	$.fn.gallery = function(options){
		var options = $.extend({
			btnNext:'.next',
			btnPrev:'.prev',
			classname:'active',
			speed:800,
			list:'ul > li',
			switchers:'ul > li',
			rotate:3000
		}, options || {})
		return this.each(function(){			var hold = $(this);
			var list = hold.find(options.list);
			var prev = hold.find(options.btnPrev);
			var next = hold.find(options.btnNext);
			var a = list.index(list.index(list.filter('.active:eq(0)')));
			var box = hold.find(options.switchers);
			var t;
			if(a == -1) a = 0;
			
			list.removeClass('active').css({opacity: 0}).eq(a).addClass('active').css({opacity: 1})
			box.removeClass('active').css({opacity: 0.5}).eq(a).addClass('active').css({opacity: 1});
			box.click(function(){
				console.log(this);
				changeEl(box.index(this));
				return false;
			});
			t = setTimeout(function(){
			if(a < list.length - 1) changeEl(a+1);
				else changeEl(0);
			}, options.rotate);
			function changeEl(active){
			if (t) clearTimeout(t);
				if (active != a) {
					box.eq(a).removeClass('active').animate({opacity: 0.5}, {queue: false,duration: options.speed});
					box.eq(active).addClass('active').animate({opacity: 1}, {queue: false,duration: options.speed});
					list.eq(a).removeClass('active').animate({opacity: 0}, {queue: false,duration: options.speed});
					list.eq(active).addClass('active').animate({opacity: 1}, {queue: false,duration: options.speed});
					a = active;
				}
				t = setTimeout(function(){
				if(a < list.length - 1) changeEl(a+1);
					else changeEl(0);
				}, options.rotate);
			}
			next.click(function(){
				if(a != list.length - 1) changeEl(a + 1);
				else changeEl(0);
				return false;
			});
	
			prev.click(function(){
				if(a != 0) changeEl(a - 1);
				else changeEl(list.length - 1);
				return false;
			});		});
		
	};
})(jQuery);
