var valid_email;
//запрос отправки письма с паролем на почту
function funcSuccessSend(req){
	if(req.send){
		$('.error').text('Письмо было отправлено на вашу почту*');
		$('.error').css({'opacity': '1'});
	}
	else{
		$('.error').text('Произошла ошибка при отправке, попробуйте позже*');
		$('.error').css({'opacity': '1'});
	}
};

function funcBeforeSend(){
	$('.error').css({'opacity': '0'});
};
//проверка почты
function funcSuccess(req){
	if(req.found){
		$('#emailreboot').css({'border' : '1px solid #569b44'});
		$('.error').text('Email найден в базе данных, нажмите отправить, чтобы получить пароль*');
		$('.error').css({'opacity': '1'});
		valid_email = true;
	}
	else{
		$('#emailreboot').css({'border' : '1px solid #ff0000'});
		$('.error').text('Email не найден в базе данных*');
		$('.error').css({'opacity': '1'});
		valid_email = false;
	}
};

function funcBefore(){
	$('.error').css({'opacity': '0'});
};

$(document).ready(function(){
	valid_email = false;
	//проверка валидности email
	$('#emailreboot').blur(function() {
		if($(this).val() != '') {
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
			if(pattern.test($(this).val())){
				$.ajax({//проверка email на существование в базе данных пользователей
					url: 'email',
					type: 'POST',
					data: ({'email': $('#emailreboot').val()}),
					dataType: 'json',
					beforeSend: funcBefore,
					success: funcSuccess
				});				
			} else {
				$('.error').text('Не верно введен Email');
				$('.error').css({'opacity': '1'});
				$(this).css({'border' : '1px solid #ff0000'});
				valid_email = false;
			}
		} else {
			$('.error').text('Поле Email не должно быть пустым');
			$('.error').css({'opacity': '1'});
			$(this).css({'border' : '1px solid #ff0000'});
			valid_email = false;
		}
	});

	$('.error').css({'opacity': '0'});
	$('#reboot').bind('click', function(){//запрос отправки письма с паролем на почту
		if(valid_email){
			$.ajax({
				url: 'sendmail',
				type: 'POST',
				data: ({'email': $('#emailreboot').val()}),
				dataType: 'json',
				beforeSend: funcBeforeSend,
				success: funcSuccessSend
			});
		}
	});
});