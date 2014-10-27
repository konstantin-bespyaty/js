jQuery(document).ready(function(){
	gallery()
});

function gallery(){
	var speed = 800;
	$('#gallery-hold').each(function(){
		var hold = $(this);
		var t;
		var list = hold.find('.info-text > li');
		var a = list.index(list.index(list.filter('.active:eq(0)')));
		var prev = hold.find('a.prev');
		var next = hold.find('a.next');
		var box = hold.find('ul.gall-nav > li')
		
		if(a == -1) a = 0;
		list.removeClass('active').css({opacity: 0}).eq(a).addClass('active').css({opacity: 1})
		box.removeClass('active').css({opacity: 0.5}).eq(a).addClass('active').css({opacity: 1});
		box.click(function(){
			changeEl(box.index(this));
			return false;
		});
		
		function changeEl(active){
			if (t) clearTimeout(t);
			if (active != a) {
				box.eq(a).removeClass('active').animate({opacity: 0.5}, {queue: false,duration: speed});
				box.eq(active).addClass('active').animate({opacity: 1}, {queue: false,duration: speed});
				list.eq(a).removeClass('active').animate({opacity: 0}, {queue: false,duration: speed});
				list.eq(active).addClass('active').animate({opacity: 1}, {queue: false,duration: speed});
				a = active;
			}
			t = setTimeout(function(){
			if(a < list.length - 1) changeEl(a+1);
				else changeEl(0);
			}, 3000);
		}
		
		t = setTimeout(function(){
		if(a < list.length - 1) changeEl(a+1);
			else changeEl(0);
		}, 3000);

		next.click(function(){
			if(a != list.length - 1) changeEl(a + 1);
			else changeEl(0);
			return false;
		});

		prev.click(function(){
			if(a != 0) changeEl(a - 1);
			else changeEl(list.length - 1);
			return false;
		});
	})
}