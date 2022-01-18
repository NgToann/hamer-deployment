$(document).ready(function () {
	
	$('#callModalForgot').click(function (e) {
		$('#modalLogin').modal('hide');
		$('#modalRegister').modal('hide');
		$('#modalForgot').modal('show');
		setTimeout(function () {
			$('body').addClass('modal-open');
		}, 500)
	});
	
	$('#callModalRegister').click(function (e) {
		$('#modalLogin').modal('hide');
		$('#modalForgot').modal('hide');
		$('#modalRegister').modal('show');
		setTimeout(function () {
			$('body').addClass('modal-open');
		}, 500)
	});
	
	$('#frmdangnhap').submit(function (e) {
		if (!$(this)[0].checkValidity()) {
			e.stopPropagation();
			e.preventDefault();
			$(this).addClass('was-validated');
			return false;
		} else {
			let elm = $(this).find('#btndangnhapungvien');
			btnlinkload(elm);
			
			Form = document.querySelector("form#frmdangnhap");
			var formData = new FormData(Form);
			formData.append("token", token);
			var http = new XMLHttpRequest();
			http.open("POST", URL + "checksum/createchecksum", true);
			http.send(formData);
			http.onreadystatechange = function (event) {
				if (http.readyState == 4 && http.status == 200) {
					var ketqua = JSON.parse(http.responseText);
					if (ketqua.tinhtrang == 1) {
						token = ketqua.token;
						var checksum = ketqua.checksum;
						formData.append("checksum", checksum);
						http = new XMLHttpRequest();
						http.open("POST", URL + "login/login", true);
						http.send(formData);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									window.location.reload();
								} else {
									btnlinkthanhcong(elm, "Đăng nhập");
									call_toastr(ketqua.tinnhan, 'error');
								}
							}
						};
					} else {
						btnlinkthanhcong(elm, "Đăng nhập");
						call_toastr("Lỗi xác thực! Vui lòng thử lại", 'error');
					}
				}
			};
			return false;
		}
	})
	
	$('#quenmatkhau').submit(function () {
		if (!$(this)[0].checkValidity()) {
			$(this).addClass('was-validated');
			return false;
		} else {
			let elm = $(this).find('#btnquenmatkhau');
			btnlinkload(elm);
			$.post(URL + "login/qaz/" + $(this).find("#floatingEmailForgot").val(), function (o) {
				if (o.tinhtrang == 1) {
					btnlinkthanhcong(elm, "Đã gửi");
					elm.prop('disabled', true);
					call_toastr('Mật khẩu đã được gửi qua email của bạn', 'success');
				} else {
					btnlinkthanhcong(elm, "Gửi");
					call_toastr('Địa chỉ email không hợp lệ hoặc không tồn tại', 'error');
				}
			}, "JSON");
			return false;
		}
	})
	
	$("#frmdangky").submit(function (e) {
		if (!$(this)[0].checkValidity()) {
			$(this).addClass('was-validated');
			return false;
		} else {
			let elm = $(this).find('#btndangkyungvien');
			btnlinkload(elm);
			Form = document.querySelector("form#frmdangky");
			var formData = new FormData(Form);
			formData.append("token", token);
			var http = new XMLHttpRequest();
			http.open("POST", URL + "checksum/createchecksum", true);
			http.send(formData);
			http.onreadystatechange = function (event) {
				if (http.readyState == 4 && http.status == 200) {
					var ketqua = JSON.parse(http.responseText);
					if (ketqua.tinhtrang == 1) {
						token = ketqua.token;
						var checksum = ketqua.checksum;
						formData.append("checksum", checksum);
						http = new XMLHttpRequest();
						
						http.open("POST", URL + "login/insert", true);
						http.send(formData);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									id_taikhoan = ketqua.id_taikhoan;
									call_toastr('Đăng ký thành công', 'success');
									btnlinkthanhcong(elm, "Đăng ký");
									elm.prop('disabled', true);
									setTimeout(() => {
										window.location.reload();
									}, 2500);
								} else {
									call_toastr(ketqua.tinnhan, 'error');
									btnlinkthanhcong(elm, "Đăng ký");
								}
							}
						};
					} else {
						call_toastr('Lỗi xác thực, vui lòng tải lại trang', 'error');
						btnlinkthanhcong(elm, "Đăng ký");
					}
				}
			};
			return false;
		}
	});
	
	$("#frmcapnhattaikhoan").submit(function () {
		if (!$(this)[0].checkValidity()) {
			$(this).addClass('was-validated');
			return false;
		} else {
			
			let elm = $(this).find('#btnUpdate');
			btnlinkload(elm);
			Form = document.querySelector("form#frmcapnhattaikhoan");
			var formdata = new FormData(Form);
			formdata.append("token", token);
			var http = new XMLHttpRequest();
			http.open("POST", URL + "checksum/createchecksum", true);
			http.onreadystatechange = function (event) {
				if (http.readyState == 4 && http.status == 200) {
					var ketqua = JSON.parse(http.responseText);
					if (ketqua.tinhtrang == 1) {
						token = ketqua.token;
						var checksum = ketqua.checksum;
						formdata.append("checksum", checksum);
						http = new XMLHttpRequest();
						http.open("POST", URL + "taikhoan/update", true);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									call_toastr('Cập nhật thông tin thành công', 'success');
									btnlinkthanhcong(elm, "Cập nhật");
									elm.prop('disabled', true);
									setTimeout(() => {
										window.location.reload();
									}, 2500);
								} else {
									btnlinkthanhcong(elm, "Cập nhật");
									elm.prop('disabled', false);
									call_toastr('Cập nhật thông tin thất bại', 'error');
								}
							}
						};
						http.send(formdata);
					}
				}
			};
			http.send(formdata);
			return false;
		}
	});
	
	$("#frmdoimatkhau").submit(function () {
		if (!$(this)[0].checkValidity()) {
			$(this).addClass('was-validated');
			return false;
		} else {
			let elm = $(this).find('#btnUpdatePass');
			btnlinkload(elm);
			Form = document.querySelector("form#frmdoimatkhau");
			var formdata = new FormData(Form);
			formdata.append("token", token);
			var http = new XMLHttpRequest();
			http.open("POST", URL + "checksum/createchecksum", true);
			http.onreadystatechange = function (event) {
				if (http.readyState == 4 && http.status == 200) {
					var ketqua = JSON.parse(http.responseText);
					if (ketqua.tinhtrang == 1) {
						token = ketqua.token;
						var checksum = ketqua.checksum;
						formdata.append("checksum", checksum);
						http = new XMLHttpRequest();
						http.open("POST", URL + "taikhoan/doimatkhau", true);
						http.onreadystatechange = function (event) {
							if (http.readyState == 4 && http.status == 200) {
								var ketqua = JSON.parse(http.responseText);
								if (ketqua.tinhtrang == 1) {
									call_toastr('Đổi mật khẩu thành công', 'success');
									btnlinkthanhcong(elm, "Đổi mật khẩu");
									elm.prop('disabled', true);
									setTimeout(() => {
										window.location.reload();
									}, 2500);
								} else {
									btnlinkthanhcong(elm, "Đổi mật khẩu");
									elm.prop('disabled', false);
									call_toastr('Đổi mật khẩu thất bại', 'error');
								}
							}
						};
						http.send(formdata);
					}
				}
			};
			http.send(formdata);
			return false;
		}
	});
});
