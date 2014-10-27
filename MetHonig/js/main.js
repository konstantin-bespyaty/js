jQuery(document).ready(function(){
	slideOpen();
	slideOpen2();
	tabs();
	relax();
	boxClick();
});

function initRist(){
	 var state = true;
    $( ".open-link" ).click(function() {
      if ( state ) {
        $( ".open-box" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( ".open-box" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
	})
}


function initShow(){
	var box = $('<div class="list"><a href="#" class="show">Show</a> <div class="more">oefoihfbokjeoifjbhokehgbokjfbhokejfbh</div> </div>');
	var link = box.find('a.show');
	var list = box.find('div.more');
	var fox = $('#main').css({
		margin:0
	})
	$('body').prepend(box);
	var w = list.outerWidth();
	var speed = 400;
	list.css({
		width:0,
		background:'#000'
	});
	
	function create(){
		if (!box.hasClass('list-item')) {
				list.stop().animate({width: 0}, speed, function(){list.css({width:0, display: 'none'});
				})
				fox.animate({marginLeft:0}, {queue:false, duration: speed});
			}
			else {
				if(box.hasClass('list-item')){
					list.show().animate({width: w}, speed, function(){list.css({width: w})});
				}
				fox.animate({marginLeft:w}, {queue:false, duration: speed});
			}
	}
	
	link.click(function(){		box.toggleClass('list-item');
		create();		return false;	});
}

function initCounter(){
	$('ul.accaunt').each(function(){
		var hold = $(this);
		var day = hold.attr('data-time').split(':')[0].split('.');
		var time = hold.attr('data-time').split(':')[1].split('.');
		hold.removeAttr('data-time');
		var newDate = new Date(day[0], (day[1]/1-1), day[2], time[0], time[1], time[2], 0);
		var startDate = new Date();
		var count = newDate.getTime() - startDate.getTime();
		var d, h, m, s;
		var li = hold.find('li .day span');
		
		if(count > 0){
			setTimeout(function() {
				count-=1000;
				if (count > 0) {
					d = Math.floor(count / (1000*60*60*24));
					h = Math.floor((count-d*1000*60*60*24) / (1000*60*60));
					m = Math.floor((count-d*1000*60*60*24 - h*1000*60*60) / (1000*60));
					s = Math.floor((count-d*1000*60*60*24 - h*1000*60*60 - m*1000*60) / (1000));
					li.eq(0).text(('0'+d).slice(-2));
					li.eq(1).text(('0'+h).slice(-2));
					li.eq(2).text(('0'+m).slice(-2));
					li.eq(3).text(('0'+s).slice(-2));
					setTimeout(arguments.callee, 1000);
				}
			}, 0);
		}
	});
}

function boxClick(){
	$('.more').each(function(){
		var hold = $(this);
		hold.click(function(){
			$('#main').css({display: 'none'});
			$('body').append("<strong>Что то поламалось))))))</strong>");
			$('strong').css({
				position: 'absolute',
				top:-1300,
				left:'30%',
				color:'#000',
				fontSize:50,
				lineHeight:60
			})
		})
	})
}

function slideOpen(){
	var speed = 600;
	$('.open-wrap').each(function(){
		var hold = $(this);
		var box = hold.find('.open-box');
		var btn = hold.find('.open-link');
		var h = box.height();
		if(box.is(':visible')) box.show();
		else box.hide();
		hold.addClass('opened ');
		hold.removeClass('active');

		btn.click(function(){			if (box.is(':visible')) {
				box.stop().animate({height: 0}, speed, function(){box.css({display: 'none',height: 'auto'});
				hold.removeClass('opened');
				})
			}
			else {
				if(box.is(':hidden')){
					box.show();
					h = box.height();
					box.height(0);
				}
				hold.addClass('opened');
				box.stop().animate({height: h}, speed, function(){ 
					box.height('auto');
				})
			}
			return false;		});
	});
}
function slideOpen2(){
	var speed = 600;
	$('.block.categorie > .top > .holder > .bg > ul > li').each(function(){
		var hold = $(this);
		var box = hold.children('ul');
		var btn = hold.find('.open-link')
		var h = box.height();
		if(box.is(':visible')) box.show();
		else box.hide();
		hold.addClass('active ');
		btn.click(function(){
			if (box.is(':visible')) {
				box.stop().animate({height: 0}, speed, function(){box.css({display: 'none',height: 'auto'});
				hold.removeClass('active');
				})
			}
			else {
				if(box.is(':hidden')){
					box.show();
					h = box.height();
					box.height(0);
				}
				hold.addClass('active');
				box.stop().animate({height: h}, speed, function(){ 
					box.height('auto');
				})
			}
			return false;
		});
	});
}
$('.docks').each(function(){
	var hold = $(this);
	var link = hold.find('.holder');
	var img_rot = hold.find('.btn-docks-hover');
	var box = hold.find('ul.docks-list');
	value = 0;
	if(!hold.hasClass('open')){
			box.css({display: 'none'});
		}
		link.click(function(){
		value += 180;
			if(!hold.hasClass('open')){
				hold.addClass('open');
				img_rot.rotate({animateTo:value}, 400);
				box.slideDown(400);
		}
		else{
		hold.removeClass('open');
		
		box.slideUp(400);
		img_rot.rotate({animateTo:value}, 400);
	}
});
}); 
function tabs(){
	var speed = 600;
	$('.tabs').each(function(){
		hold = $(this);
		var btn = hold.find('a.tab');
		var li = hold.find('ul.tabset > li');
		var a = li.index(li.index(li.filter('.active:eq(0)')));
		var get = hold.find('.tabs-wrapper');
		if(a == -1) a = 0;
		li.removeClass('active').eq(a).addClass('active');
		loadText();
		
		
		function  loadText(active){
			$.ajax({
				type: 'GET',
				dataType: 'html',
				url: btn.eq(a).attr('href'),
				success: function(msg){
					get.append('<div class="tabd active"> '+msg+' </div> ');
					btn.eq(a).addClass('show');
					
				},
				error: function(){alert('Server is unavailable. Refresh the page within 15 seconds.!');}
			});
			}
		btn.click(function(){
			changeEl(btn.index(this));
			return false;
		});
		function changeEl(active){
			var block = hold.find('.tabd');
			var h = block.height();
			if (active != a) {
				block.eq(a).removeClass('active').animate({opacity: 0}, {queue: false,duration: speed});
				block.eq(active).addClass('active').animate({opacity: 1}, {queue: false,duration: speed});
				li.eq(a).removeClass('active');
				li.eq(active).addClass('active');
				a = active;
			}
			if(btn.eq(active).hasClass('show')){
				if (active != a) {
					a = active;
				}
			}
			else{
				loadText();
			}
			
		}
	})
}
function relax(){
	$('input:text , input:password , textarea').each(function(){
		var hold = $(this);
		var box = hold.val();
		
		hold.focus (function(){
			if (this.value == box){
				this.value = '';
			}
		}).blur(function(){
			if(this.value == ''){
				this.value = box;
			}
		})
	})
}
