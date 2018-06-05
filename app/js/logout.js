function funcSuccessIndex(req){
	$('.session_activ').css({'display': 'none'});//скрываем кнопки выйти и найти людей
	$('.session_deactiv').css({'display': 'block'});//показываем кнопки войти и зарегистрироваться
};

function funcSuccessView(req){//перенаправление на главную
	$(location).attr('href',"/");
};

$(document).ready(function(){
	$('.logout_index').bind('click', function(){//нажатие на кнопку выход на главной
		$.ajax({
			url: 'logout',
			type: 'POST',
			success: funcSuccessIndex
		});
	});

	$('.logout_view').bind('click', function(){//нажатие на кнопку выход на странице выдачи
		$.ajax({
			url: 'logout',
			type: 'POST',
			success: funcSuccessView
		});
	});
});