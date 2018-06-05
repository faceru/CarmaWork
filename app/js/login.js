var valid_email = false;

//проверка email
function funcSuccessEmail(req){
	if(req.found){
		$('#error').css({'opacity': '0'});
		$('#email').css({'border' : '1px solid #569b44'});
		valid_email = true;
	}
	else{
		$('#error').text('Введенный Email не зарегистрирован');
		$('#error').css({'opacity': '1'});
		$('#email').css({'border' : '1px solid #ff0000'});
		valid_email = false;
	}
}
//запрос аутентификации
function funcSuccess(req){
	if(req.login && req.password){//если верный логин и пароль
		$(location).attr('href',"/view");//перенаправление на выдачу
	}
	else if(req.login && !req.password){//если неверный пароль
		$('#error').text('Не правильный пароль*');//изменяем текст сообщения
		$('#error').css({'opacity': '1'});//показываем сообщение
	}
	else if(!req.login){//если неверный логин
		$('#error').text('Не правильный логин или пароль*');
		$('#error').css({'opacity': '1'});
	}
};

function funcBefore(){
	$('#error').css({'opacity': '0'});
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
			$('#error').text('Не верно введен Email');
			$('#error').css({'opacity': '1'});
			$(this).css({'border' : '1px solid #ff0000'});
			valid_email = false;
		}
	} else {
		$('#error').text('Поле Email не должно быть пустым');
		$('#error').css({'opacity': '1'});
		$(this).css({'border' : '1px solid #ff0000'});
		valid_email = false;
	}
};

$(document).ready(function(){
	//проверка email
	$('#email').blur(validEmail);
	$('#error').css({'opacity': '0'});//скрываем сообщение ошибки
	$('#signin').bind('click', function(){//нажатие на кнопку войти
		if(valid_email){
			$.ajax({//запрос аутентификации
				url: 'login',
				type: 'POST',
				data: ({'login': $('#email').val(), 'password': $('#password').val()}),
				dataType: 'json',
				beforeSend: funcBefore,
				success: funcSuccess
			});
		}
		else{
			$('#error').text('Не верно введен Email');
			$('#error').css({'opacity': '1'});
		}
	});
});