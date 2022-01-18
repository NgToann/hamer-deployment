$(function() {
    var slideSwiper_1 = new Swiper('#slideSwiper-1', {
        slidesPerView: 1,
        loop: true,
        lazy: true,
        speed: 1000,
        autoHeight: true,
        navigation: {
            nextEl: "#slideSwiper-1 .swiper-button-next",
            prevEl: "#slideSwiper-1 .swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            }
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var swiperProduct = new Swiper('#swiper-Product', {
        slidesPerView: 3,
        loop: true,
        lazy: true,
        speed: 1000,
        autoHeight: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".product-inner.swiper-custom-theme .swiper-button-next",
            prevEl: ".product-inner.swiper-custom-theme .swiper-button-prev",
        },
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            }
        },
    });

    $('.image-link').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
            enabled: true
        },
    }).on('mfpOpen', function() {
        $('body').css('overflow-y', 'hidden');
    }).on('mfpClose', function() {
        $('body').css('overflow-y', '');
    });

    $('.image-chungnhan').magnificPopup({
        type: 'image',
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
            enabled: true
        },
    }).on('mfpOpen', function() {
        $('body').css('overflow-y', 'hidden');
    }).on('mfpClose', function() {
        $('body').css('overflow-y', '');
    });

    $('.callModalOrderProduct').click(function(e) {
        e.stopPropagation();
        let _name = $(this).attr('data-name');
        let _id = $(this).attr('data-id');
        $('#modalOrderProduct input[name=id_sanpham]').val(_id);
        $('#modalOrderProduct input[name=product]').val(_name);
        $('#modalOrderProduct #name_product').html(_name);
        $('#modalOrderProduct').modal('show');
    });

    $('#modalOrderProduct').on('hide.bs.modal', function() {
        $('#modalOrderProduct #form-modalOrder button[type=submit]').prop('disabled', false).html('Buy now');
    });

    $('#form-order, #form-modalOrder').submit(function(e) {
        e.stopPropagation();
        let elm = $(this),
            buttonElm = elm.find('button[type=submit]');
        btnlinkload(buttonElm, 'Please wait');
        let _data = elm.serialize();
        $.post(URL_ROOT + 'sanpham/ajaxOrder', _data, function(result) {
            if (result.status == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success... !',
                    text: 'Order success',
                    showConfirmButton: true,
                    confirmButtonText: 'Close!',
                    customClass: {
                        cancelButton: 'btn btn-success'
                    },
                });
                btnlinkthanhcong(buttonElm, 'Order success');
                buttonElm.prop('disabled', true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error... !',
                    text: 'Order failed',
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Retry!',
                    customClass: {
                        cancelButton: 'btn btn-danger'
                    },
                });
                btnlinkthanhcong(buttonElm, 'Buy now');
            }
        }, "JSON");
        return false;
    });

    $('#checkCode').submit(function(e) {
        e.stopPropagation();
        let elm = $(this),
            buttonElm = elm.find('button[type=submit]');
        btnlinkload(buttonElm, 'Please wait');
        let _data = elm.serialize();
        $.post(URL_ROOT + 'sanpham/checkCode', _data, function(result) {
            //result.status = 1
            if (result.status == 1) {
                let _html = ` <div class='popupCheckCode-header'>
		                    <p>
		                        This is an original product of Sino - USA Collaboration
		                    </p>
		                </div>
		                <div class='popupCheckCode-body'>
		                    <div class='popupCheckCode-seri'>
		                        Serial: ${result.seri}
		                    </div>
		                    <div class='popupCheckCode-content'>
		                        <div class='popupCheckCode-content_column'>
		                            <div class='title'>
		                                <i class='fal fa-qrcode'></i>
		                                Code scans
		                            </div>
		                            <div class='number'>
		                                1
		                            </div>
		                        </div>
		                        <div class='popupCheckCode-content_column'>
		                            <div class='title'>
		                                <i class='fal fa-user-friends'></i>
		                                People scans
		                            </div>
		                            <div class='number'>
		                                1
		                            </div>
		                        </div>
		                    </div>
		                </div>`;

                Swal.fire({
                    icon: 'success',
                    html: _html,
                    showConfirmButton: false,
                    customClass: 'swalPopUpCheckCode',
                });

                btnlinkthanhcong(buttonElm, 'Check');
            } else {
                let _html = `<div class='popupCheckCode-header'>
		                    <p class='py-1'>
		                        Warning: This product could be fake or counterfeit because this is not a product of Sino - USA Collaboration
		                    </p>
		                    <p class='py-0'>---</p>
		                    <p class='py-1'>Please send email to hamer2uchecking@gmail.com to support as soon as possible</p>
		                    <p class='pt-1 pb-2'>Thank you !</p>
		                </div>
		                <div class='popupCheckCode-body'>
		                    <div class='popupCheckCode-seri'>
		                       Serial: 0
		                    </div>
		                    <div class='popupCheckCode-content'>
		                        <div class='popupCheckCode-content_column'>
		                            <div class='title'>
		                                <i class='fal fa-qrcode'></i>
		                                Code scans
		                            </div>
		                            <div class='number'>
		                                0
		                            </div>
		                        </div>
		                        <div class='popupCheckCode-content_column'>
		                            <div class='title'>
		                                <i class='fal fa-user-friends'></i>
		                                People scans
		                            </div>
		                            <div class='number'>
		                                0
		                            </div>
		                        </div>
		                    </div>
		                </div>`;
                Swal.fire({
                    icon: 'error',
                    html: _html,
                    showConfirmButton: false,
                    customClass: 'swalPopUpCheckCode error',
                });

                btnlinkthanhcong(buttonElm, 'Check');
            }
        }, "JSON");
        return false;
    });
});


