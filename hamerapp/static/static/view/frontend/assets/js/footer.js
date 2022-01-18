$(document).ready(function () {
	
	$("img.lazy-load").attr("src", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
	$(window).on('load', function () {
		if ($(document).width() > 1200) {
			if ($('body').hasClass("home")) {
				$('.open-cate').click();
				$('.colse-cate').click();
				$('.vertical-groups').each(function () {
					
					height1 = $(this).outerHeight() - 25;
					height2 = $(this).children(".quangcaomenu").children('a').children().outerHeight();
					htemp = $(this).children(".quangcaomenu").children(".htmlmenu").outerHeight();
					if (htemp > height2)
						height2 = htemp;
					height = height1 + height2;
					$(this).css("height", height);
				})
			} else {
				$('.open-cate').click();
				$(".vertical-menu-content").show();
				$('.vertical-groups').each(function () {
					
					height1 = $(this).outerHeight() - 25;
					height2 = $(this).children(".quangcaomenu").children('a').children().outerHeight();
					htemp = $(this).children(".quangcaomenu").children(".htmlmenu").outerHeight();
					if (htemp > height2)
						height2 = htemp;
					height = height1 + height2;
					$(this).css("height", height);
				});
				$(".vertical-menu-content").hide();
				$('.colse-cate').click();
			}
			
		}
	});
	
	windowwidth = $(window).width();
	left = (windowwidth - 252) / 2;
	$('.boxdangload').css("left", left);
	$('.dangload').hide();
	$('.thongbao').hide();

//$ ( window ). bind ( "load" ,  function ()  {
//    var timeout = setTimeout ( function ()  {
//        $ ( "img.lazy" ). trigger ( "sporty" )
//    },  50000 );
//});
	menuactive = $('li.menuactive').parents('li.li-sub').addClass("menuactive");
	menuactive = $('li.menuactive').parents('li.dropdown').addClass("menuactive");
	
	dangtim = false;
	$('#btn-quicksearch').click(function () {
		if ($('#danhmuc-search,#danhmuccon-search').val() == '')
			alert('Vui lòng chọn danh mục!');
		else
			window.open(URL_ROOT + "tim-kiem-nhanh/" + ChangeToSlugSearch($('#danhmuccon-search').val()), '_self');
	});
	
	$('#danhmuc-search').on('change', function () {
		event.preventDefault();
		var id_danhmuc = $(this).val();
		$.post(URL_ROOT + "timkiem/getDanhMucCon", {"id_danhmuc": id_danhmuc}, function (data) {
			var t = '',
				arr = jQuery.parseJSON(data);
			arr.forEach(function (item) {
				t += `<option value='${item.id_danhmuc}'>${item.ten}</option>`;
			})
			$('#danhmuccon-search').html(t);
		});
	});
	
	$('#btnsearch').click(function () {
		if ($('#search-termsMobile').val() == '')
			alert('Vui lòng nhập từ khóa!');
		else
			window.open(URL_ROOT + "tim-kiem/" + ChangeToSlugSearch($('#search-termsMobile').val()), '_self');
	});
	
	$(document).on('click', '.btn-addon', function (el) {
		el.preventDefault();
		if ($('#search-terms').val() == '')
			alert('Vui lòng nhập từ khóa!');
		else
			window.open(URL_ROOT + "tim-kiem/" + ChangeToSlugSearch($('#search-terms').val()), '_self');
	});
	
	$(document).on("keyup", '#search-terms, #search-termsMobile', function (e) {
		if (e.which == 13 || e.keyCode == 13) {
			if ($(this).val() == '')
				alert('Vui lòng nhập từ khóa!');
			else
				window.open(URL_ROOT + "tim-kiem/" + ChangeToSlugSearch($(this).val()), '_self');
		} else if (!dangtim) {
			dangtim = true;
			str = ChangeToSlugSearch($(this).val());
			$('.btn-addon').html('<i class="fa fa-spinner fa-spin"></i>');
			$.post(URL_ROOT + "timkiem", {"str": str}, function (o) {
				html = '';
				if (o.tinhtrang == 1) {
					$('#ketquatim').addClass('open');
					for
						(key in o.data) {
						obj = o.data[key];
						if (obj.gia > 0) {
							giatien = format1(parseInt(((checkTimeSale(obj.thoigiankhuyenmai) && obj.giamgia > 0) ? obj.giamgia : obj.gia)), "") + '&nbsp;₫';
						} else {
							giatien = 'Liên hệ';
						}
						
						if (obj.hinhdaidien == '' || obj.hinhdaidien == null) {
							img = '<img  src="' + URL_ROOT + 'public/upload/images/noimage.png"> ';
						} else {
							img = '<img  src="' + URL_ROOT + 'public/upload/images/thumb_hinhsanpham/' + obj.hinhdaidien + '"> ';
						}
						
						html += `<li>
									<div class="image">
										<a href="${URL_ROOT}san-pham/${obj.id_sanpham}/${obj.slugsanpham}">
										${img}
										</a>
									</div>
									<div class="info">
										<a href="${URL_ROOT}san-pham/${obj.id_sanpham}/${obj.slugsanpham}">
											${obj.tensanpham}
										</a>
										<div class='price'>${giatien}</div>
									</div>
								</li>`;
					}
					dangtim = false;
					$('.btn-addon').html('<i class="far fa-search"></i>');
					$('.ketquatim').html(html);
					
				} else {
					$('.btn-addon').html('<i class="far fa-search"></i>');
					dangtim = false;
					$('#ketquatim').addClass('open');
					$('.ketquatim').html('<li class="py-2 text-dark text-center fw-bold justify-content-center">Không tìm thấy kết quả phù hợp</li>');
				}
			}, "JSON")
		}
	});
	
	$("body").click(function (e) {
		$('#ketquatim').removeClass('open');
	});
	
});

