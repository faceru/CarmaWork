function funcSuccess(req){
	if(req.session){//если сессия авторизирована
		$('.session_deactiv').css({'display': 'none'});//сурываем кнопки регистрация и вход
		$('.session_activ').css({'display': 'block'});//показываем кнопки выход и найти людей
	}
	else{//иначе если нет
		$('.session_activ').css({'display': 'none'});
		$('.session_deactiv').css({'display': 'block'});
	}
};

$(document).ready(function(){//запрос информации о сессии
	$.ajax({
		url: 'button',
		type: 'POST',
		success: funcSuccess
	});
});