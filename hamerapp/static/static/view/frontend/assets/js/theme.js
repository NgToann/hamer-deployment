function scrollTop() {
	$("html, body").animate({scrollTop: 0}, 600);
	return false;
}

function handleTouchMove(ev) {
	if (!$(ev.target).closest('header').length) {
		ev.preventDefault();
	}
}

const callMenu = function () {
	if ($('.template-header').hasClass('show')) {
		$('.template-header').removeClass('show');
		$('body').css("overflow-y", "auto");
	} else {
		$('.template-header').addClass('show');
		$('body').css("overflow-y", "hidden");
	}
}

$(document).ready(function () {
	$('body').addClass('loaded');
	
	let windowWidth = $(window).width();
	if (windowWidth < 992) {
		$(".template-header .bottom-area .navigation > ul > li:first-child").before(`<li><a href="javascript:void(0)" id="close-menu"><i class="fal fa-times"></i></a></li>`);
		$(".template-header .bottom-area .navigation > ul > li > ul").each(function (index) {
			$(this).prev().attr({
				"href": "#sub-navigation" + index,
				"data-bs-toggle": "collapse"
			});
			$(this).attr({
				"id": "sub-navigation" + index,
				"class": "collapse " + $(this).attr('class'),
				"data-bs-parent": "#has-navigation"
			});
		})
	}
	
	$(document).on("click", "#hamburger .hamburger, .overlay-area, #close-menu", function () {
		callMenu();
	});
	
	$(window).scroll(function (e) {
		var top = $(document).scrollTop();
		var height = $('.header-wrapper').innerHeight() + 15;
		
		if (top > height) {
			$('.header-wrapper').addClass('scroll-sticky animated fadeInDown');
		} else {
			$('.header-wrapper').removeClass('scroll-sticky animated fadeInDown');
		}
	});
	if ($('#menu').length > 0) {
		// const _menu = $('#menu')[0];
		// const scrollspy = VanillaScrollspy(_menu);
		// scrollspy.init();
		//
		// $('#menu .menu-item').click(function () {
		// 	$('#menu .menu-item').removeClass('active');
		// 	$(this).addClass('active');
		// });
	}
	
	$('.callNavigation, .header-overlay, .closeNavigation').click(function (e) {
		if ($('.header-wrapper').hasClass('show')) {
			document.removeEventListener('touchmove', handleTouchMove);
			$('.header-wrapper').removeClass('show');
			$('body').css("overflow", "");
		} else {
			document.addEventListener('touchmove', handleTouchMove, {passive: false});
			$('.header-wrapper').addClass('show');
			$('body').css("overflow-y", "hidden");
		}
	});
	
	$(".lazy").lazy({
		effect: "fadeIn",
		effectTime: 500,
		threshold: 0
	});
	
	new WOW().init();
});
