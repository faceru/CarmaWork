var valid_email = false;
var valid_surname = false;
var valid_name = false;
var valid_password = false;
var valid_code = false;
var valid_type = false;
var valid_course = false;
//проверка email
function funcSuccessEmail(req){
	if(!req.found){
		$('.error_register').css({'opacity': '0'});
		$('.emailall').css({'border' : '1px solid #569b44'});
		valid_email = true;
	}
	else{
		$('.error_register').text('Пользователь с введенным Email уже зарегистрирован');
		$('.error_register').css({'opacity': '1'});
		$('.emailall').css({'border' : '1px solid #ff0000'});
		valid_email = false;
	}
}
//проверка кода на сервере и отправка данных на сервер
function funcSuccess(req){
	$(location).attr('href',"/login");
};

function funcBefore(){
	$('.error_register').css({'opacity': '0'});
};
//проверка кода на сервере и отправка данных на сервер
function funcSuccessCode(req){
	if(req.send){
		if(valid_university){
			$.ajax({//отправка данных студента
				url: 'register',
				type: 'POST',
				data: ({'surname': $('#surname').val(), 'name': $('#name').val(), 'otche': $('#otche').val(), 'email': $('#email').val(), 
					'vk': $('#vk').val(), 'telegram': $('#telegram').val(), 'skype': $('#skype').val(), 'password': $('#password').val(), 
					'university': $('#vuz').val(), 'faculty': $('#fuq').val(), 'direction': $('#spec').val(), 
					'type': $('#zaoch option:selected').text(), 'course': $('#kurs option:selected').text(), 'permission': 1, 
					'country': $('#country').val(), 'city': $('#city').val()}),
				dataType: 'json',
				beforeSend: funcBefore,
				success: funcSuccess
			});
		}
		else{
			$.ajax({//отправка данных работодателя
				url: 'register',
				type: 'POST',
				data: ({'surname': $('#surname_job').val(), 'name': $('#name_job').val(), 'otche': $('#otche_job').val(), 
					'email': $('#email_job').val(), 'vk': $('#vk_job').val(), 'telegram': $('#telegram_job').val(), 
					'skype': $('#skype_job').val(), 'password': $('#password_job').val(), 'permission': 2, 
					'country': $('#country_job').val(), 'city': $('#city_job').val()}),
				dataType: 'json',
				beforeSend: funcBefore,
				success: funcSuccess
			});
		}
	}
	else{
		$(this).css({'border' : '1px solid #ff0000'});
		$('.register_modul_error').text('Введен неверный код');
		$('.register_modul_error').css({'opacity': '1'});
		console.log('code check error');
	}
};

function funcBeforeCode(){
	$('.error_register').css({'opacity': '0'});
};
//отправка письма на почту
function funcSuccessSend(req){
	if(req.send){
		$('#register_modul').arcticmodal({//открытие модального окна
			afterClose:function(){
				$('body').css('overflow', 'scroll');
			}
		});
	}
	else{
		$('.error_register').text('Произошла непредвиденная ошибка отправки письма на ваш Email');
		$('.error_register').css({'opacity': '1'});
	}
};

function funcBeforeSend(){
	$('.error_register').css({'opacity': '0'});
};
//проверка email
function validEmail(element) {
	if($(this).val() != '') {
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if(pattern.test($(this).val())){
			$.ajax({//проверка email на существование в базе данных пользователей
				url: 'email',
				type: 'POST',
				data: ({'email': $(this).val()}),
				dataType: 'json',
				success: funcSuccessEmail
			});				
		} else {
			$('.error_register').text('Не верно введен Email');
			$('.error_register').css({'opacity': '1'});
			$(this).css({'border' : '1px solid #ff0000'});
			valid_email = false;
		}
	} else {
		$('.error_register').text('Поле Email не должно быть пустым');
		$('.error_register').css({'opacity': '1'});
		$(this).css({'border' : '1px solid #ff0000'});
		valid_email = false;
	}
};
//проверка фамилии
function validSurname(element) {
	if($(this).val() != '') {
		$(this).css({'border' : '1px solid #569b44'});
		valid_surname = true;
	} else {
		$(this).css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Поле Фамилия не должно быть пустым');
		$('.error_register').css({'opacity': '1'});
		valid_surname = false;
	}
};
//проверка имени
function validName(element) {
	if($(this).val() != '') {
		$(this).css({'border' : '1px solid #569b44'});
		valid_name = true;
	} else {
		$(this).css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Поле Имя не должно быть пустым');
		$('.error_register').css({'opacity': '1'});
		valid_name = false;
	}
};
//проверка пароля
function validPassword(element) {
	if($(this).val() != '') {
		if($(this).val().length < 8){
			$(this).css({'border' : '1px solid #ff0000'});
			$('.error_register').text('Пароль слишком короткий, минимальная длинна 8 символов');
			$('.error_register').css({'opacity': '1'});
			valid_password = false;
		}
		else{
			$('.error_register').css({'opacity': '0'});
			$(this).css({'border' : '1px solid #569b44'});
			valid_password = true;
		}
	} else {
		$(this).css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Поле Пароль не должно быть пустым');
		$('.error_register').css({'opacity': '1'});
		valid_password = false;
	}
};
//нажатие галочки
function clickCheck(element){
	if($(this).is(":checked")) {
		$(this).prop('checked', true);
	}
	else{
		$(this).prop('checked', false);
	}
};

$(document).ready(function(){
	//проверка обязательных полей
	$('.emailall').blur(validEmail);
	$('.surnameall').blur(validSurname);
	$('.nameall').blur(validName);
	$('.passwordall').blur(validPassword);
	//нажатие галочки
	$('.checkboxall').blur(clickCheck);
	//проверка кода
	$('#code').blur(function() {
		if($(this).val() != '' && $(this).val().length === 16) {
			$(this).css({'border' : '1px solid #569b44'});
			$('.register_modul_error').css({'opacity': '0'});
			valid_code = true;
		} else {
			$(this).css({'border' : '1px solid #ff0000'});
			$('.register_modul_error').text('Неверный код');
			$('.register_modul_error').css({'opacity': '1'});
			valid_code = false;
		}
	});

	/*
	jQuery('select').on('focus', function() {
		var obj = null;
	    obj = this;
	    $(this).change(function() {
			jQuery(obj).blur();
		});
	});
	*/
	//проверка выбора поля форма обучения
	$('#zaoch').blur(function() {
		if($('#zaoch option:selected').text() != 'Не выбрано') {
			$(this).css({'border' : '1px solid #569b44'});
			$('.error_register').css({'opacity': '0'});
			valid_type = true;
		} else {
			$(this).css({'border' : '1px solid #ff0000'});
			$('.error_register').text('Поле Форма обучения не должно быть не выбранным');
			$('.error_register').css({'opacity': '1'});
			valid_type = false;
		}
	});
	//проверка выбора поля курс
	$('#kurs').blur(function() {
		if($('#kurs option:selected').text() != 'Не выбрано') {
			$(this).css({'border' : '1px solid #569b44'});
			$('.error_register').css({'opacity': '0'});
			valid_course = true;
		} else {
			$(this).css({'border' : '1px solid #ff0000'});
			$('.error_register').text('Поле Курс не должно быть не выбранным');
			$('.error_register').css({'opacity': '1'});
			valid_course = false;
		}
	});

	$('.register_modul_error').css({'opacity': '0'});
	$('.error_register').css({'opacity': '0'});
	//нажатие кнопки зарегистрироваться для работодателя
	$('#register_employer').bind('click', function(){
		if($("#checkbox_label_job").is(":checked")) {
			if(valid_surname && valid_name && valid_password){
				if(valid_email){
					if(valid_city){
						if(valid_country){
							$.ajax({
								url: 'sendmailcode',
								type: 'POST',
								data: ({'email': $('#email_job').val()}),
								dataType: 'json',
								beforeSend: funcBeforeSend,
								success: funcSuccessSend
							});
						}
						else{
							$('.error_register').text('Введена некорректная страна');
							$('.error_register').css({'opacity': '1'});
						}
					}
					else{
						$('.error_register').text('Введен некорректный город');
						$('.error_register').css({'opacity': '1'});
					}
				}
				else{
					$('.error_register').text('Введен не корректный Email');
					$('.error_register').css({'opacity': '1'});
				}
			}
			else{
				$('.error_register').text('Пожалуйста заполните обязательные поля');
				$('.error_register').css({'opacity': '1'});
			}
		}
		else{
			$('.error_register').text('Пожалуйста дайте согласие на обработку персональных данных');
			$('.error_register').css({'opacity': '1'});
		}
	});
	//нажатие кнопки зарегистрироваться для студента
	$('#register_student').bind('click', function(){
		if($("#checkbox_work").is(":checked")) {
			if(valid_surname && valid_name && valid_password){
				if(valid_email){
					if(valid_university){
						if(valid_faculty){
							if(valid_direction){
								if(valid_type){
									if(valid_course){
										if(valid_city){
											if(valid_country){
												$.ajax({
													url: 'sendmailcode',
													type: 'POST',
													data: ({'email': $('#email').val()}),
													dataType: 'json',
													beforeSend: funcBeforeSend,
													success: funcSuccessSend
												});
											}
											else{
												$('.error_register').text('Введена некорректная страна');
												$('.error_register').css({'opacity': '1'});
											}
										}
										else{
											$('.error_register').text('Введен некорректный город');
											$('.error_register').css({'opacity': '1'});
										}
									}
									else{
										$('.error_register').text('Поле Курс не должно быть не выбранным');
										$('.error_register').css({'opacity': '1'});
									}
								}
								else{
									$('.error_register').text('Поле Форма обучения не должно быть не выбранным');
									$('.error_register').css({'opacity': '1'});
								}
							}
							else{
								$('.error_register').text('Введено не корректное Направление');
								$('.error_register').css({'opacity': '1'});
							}
						}
						else{
							$('.error_register').text('Введен не корректный Факультет');
							$('.error_register').css({'opacity': '1'});
						}
					}
					else{
						$('.error_register').text('Введен не корректный Вуз');
						$('.error_register').css({'opacity': '1'});
					}
				}
				else{
					$('.error_register').text('Введен не корректный Email');
					$('.error_register').css({'opacity': '1'});
				}
			}
			else{
				$('.error_register').text('Пожалуйста заполните обязательные поля');
				$('.error_register').css({'opacity': '1'});
			}
		}
		else{
			$('.error_register').text('Пожалуйста дайте согласие на обработку персональных данных');
			$('.error_register').css({'opacity': '1'});
		}
	});
	//проверка кода на сервере и отправка данных на сервер
	$('.register_modul_btn').bind('click', function(){
		if(valid_code){
			if(valid_university){
				$.ajax({//отправка кода для студента
					url: 'checkcode',
					type: 'POST',
					data: ({'email': $('#email').val(), 'code': $('#code').val()}),
					dataType: 'json',
					beforeSend: funcBeforeCode,
					success: funcSuccessCode
				});
			}
			else{
				$.ajax({//отправка кода для работодателя
					url: 'checkcode',
					type: 'POST',
					data: ({'email': $('#email_job').val(), 'code': $('#code').val()}),
					dataType: 'json',
					beforeSend: funcBeforeCode,
					success: funcSuccessCode
				});
			}
		}
	});
	//очистка полей при смене типа учетной записи
	$('.change').bind('click', function(){
		$('.clearinput').val('');
		$('.clearcolor').css({'border' : '1px solid #000'});
		$(".checkboxall").prop('checked', false);
		$('#spec').prop('disabled', true);
		$('#fuq').prop('disabled', true);
		$('select').val(0);
		$('select').css({'border' : '1px solid #000'});
		valid_email = false;
		valid_surname = false;
		valid_name = false;
		valid_password = false;
		valid_university = false;
		valid_faculty = false;
		valid_direction = false;
		$('.error_register').css({'opacity': '0'});
	});
});