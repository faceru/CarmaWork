var permission;
var load = {
	course: '',
	type: '',
	university: '',
	faculty: '',
	direction: ''
};
var card;
var numberfirst = 0;
var numberlast = 5;
var numberlastid;
var data;
//задержка появления и скрытия всплывающих списков
setTimeout(function(){},1000);
$('#result_spec').focus(function(){setTimeout(function(){$('.result_spec_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('.result_spec_window').hide('fast');},150);});
$('#result_faq').focus(function(){setTimeout(function(){$('.result_faq_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('.result_faq_window').hide('fast');},150);});
$('#result_vuz').focus(function(){setTimeout(function(){$('.result_vuz_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('.result_vuz_window').hide('fast');},0);});
//поиск/фильтр вузов
function filterUniversity(){
	var listUniversity = $('p.result_vuz_window_name');//собираем спиок вузов
	for (var i = 0; i < listUniversity.length; i++) {
		var serch;
		serch = listUniversity[i].textContent.toLowerCase().indexOf($('#result_vuz').val().toLowerCase());//проверка вхождения введенной последовательности символов
		if(serch == -1){//если нет
			listUniversity[i].style.display = 'none';//то убираем блок
		}
		else{//иначе
			listUniversity[i].style.display = 'block';//показываем 
		}
	}
};

function filterFaculty(){//поиск/фильтр факультетов
	var listFaculty = $('p.result_faq_window_name');//собираем спиок факультетов
	for (var i = 0; i < listFaculty.length; i++) {
		var serch;
		serch = listFaculty[i].textContent.toLowerCase().indexOf($('#result_faq').val().toLowerCase());//проверка вхождения введенной последовательности символов
		if(serch == -1){//если нет
			listFaculty[i].style.display = 'none';//то убираем блок
		}
		else{//иначе
			listFaculty[i].style.display = 'block';//показываем
		}
	}
};
//поиск/фильтр направлений
function filterDirection(){
	var listDirection = $('p.result_spec_window_name');
	for (var i = 0; i < listDirection.length; i++) {
		var serch;
		serch = listDirection[i].textContent.toLowerCase().indexOf($('#result_spec').val().toLowerCase());//проверка вхождения введенной последовательности символов
		if(serch == -1){//если нет
			listDirection[i].style.display = 'none';//то убираем блок
		}
		else{//иначе
			listDirection[i].style.display = 'block';//показываем
		}
	}
};
//сброс фильтра
$('.clear').click(function(){
	$('input').css({'border' : '1px solid #000'});
	$('input').val('');
	if(permission == 1){//если студент
		load.direction = '';//сбрасываем направление
	}
	else{//если работодатель
		load.university = '';//сбрасываем все
		load.faculty = '';
		load.direction = '';
		$('#result_faq').prop('disabled', true);
    	$('#result_spec').prop('disabled', true);
	}
	load.course = '';//сброс курса и формы обучения
	load.type = '';
	$('select').val(0);//сброс выбранных селектов
	$('select').css({'border' : '1px solid #000'});
	$.ajax({//запрос списка карточек попадающих под фильтр
		url: 'load',
		type: 'POST',
		data: (load),
		dataType: 'json',
		beforeSend: funcBeforeLoad,
		success: funcSuccessLoad
	});
})
//загрузка списка направлений
function funcSuccessDirection(req){
	req.forEach(function(element){
		$(".result_spec_window").append("<p class='result_spec_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeDirection(){
	console.log('запрос направлений');
	$('.result_spec_window_name').detach();
};
//загрузка списка факультетов
function funcSuccessFaculty(req){
	req.forEach(function(element){
		$(".result_faq_window").append("<p class='result_faq_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeFaculty(){
	console.log('запрос факультетов');
	$('.result_faq_window_name').detach();
};
//загрузка списка вузов
function funcSuccessUniversity(req){
	req.forEach(function(element){
		$(".result_vuz_window").append("<p class='result_vuz_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeUniversity(){
	console.log('запрос вузов');
	$('.result_vuz_window_name').detach();
};
//загрузка списка карточек попадающих под фильтр
function funcSuccessLoad(req){
	$('.card').addClass('oldCard');//добавление старым карточкам анимации
	$('.card').removeClass('fadeInRight');
	$('.card').addClass('fadeOutLeft');
	setTimeout(function(){//задержка для анимации
		data = req;
		var i = 0;
		req.forEach(function(element){//создание карточек
			if(i >= numberfirst && i < numberlast){//ограничение кол-ва карточек
				var newCard = card.clone();
				var p = newCard.find('p');
				p[0].textContent = element.surname;
				p[1].textContent = element.name;
				p[2].textContent = element.otche;
				p[3].textContent = element.university;
				p[4].textContent = element.faculty;
				p[5].textContent = element.course + ' Курс';
				p[6].textContent = element.direction;
				if(element.telegram != ''){//если не введены необязательные поля, пропускаем
					p[7].textContent = 'Telegram ' + element.telegram;
				}
				if(element.skype != ''){
					p[8].textContent = 'Skype ' + element.skype;
				}
				p[9].textContent = element.email;
				var a = newCard.find('a');
				if(element.vk != ''){
					a[0].textContent = 'ВКонтакте ' + element.vk;
					a[0].href = 'https://vk.com/' + element.vk;
				}
				newCard.addClass('animated');//добавление анимации
				newCard.addClass('fadeInRight');
				$('.cards').append(newCard);//вставка новой карточки
			}
			i++;
		});
		numberlastid = i;
		$('.oldCard').detach();//удаление старых карточек
		if(numberlastid == 0){//если карточек нет выводим сообщение
			$(".cards").append("<p id='error'>Студенты не найдены выберете другие параметры фильтрации</p>");
		}
	},300);
};

function funcBeforeLoad(){
	$('#error').detach();
	numberfirst = 0;
	numberlast = 5;
	console.log('запрос карточек');
};
//загрузка информации о пользователе
function funcSuccessPermission(req){
	permission = req.permission;
	if(permission == 1){//если студент
		$('.result_filtr_vuz').css({'display' : 'none'});//скрываем лишние поля фильтра
		$('.result_filtr_faq').css({'display' : 'none'});
		$('#result_spec').prop('disabled', false);
		$.ajax({//запрос списка направлений
			url: 'direction',
			type: 'POST',
			data: ({'val': req.faculty}),
			dataType: 'json',
			beforeSend: funcBeforeDirection,
			success: funcSuccessDirection
		});
		load.university = req.university;
		load.faculty = req.faculty;
		$.ajax({//запрос списка карточек
			url: 'load',
			type: 'POST',
			data: (load),
			dataType: 'json',
			beforeSend: funcBeforeLoad,
			success: funcSuccessLoad
		});
	}
	else{//если работодатель
		$.ajax({//запрос списка вузов
			url: 'university',
			type: 'POST',
			dataType: 'json',
			beforeSend: funcBeforeUniversity,
			success: funcSuccessUniversity
		});
		$.ajax({//запрос списка карточек
			url: 'load',
			type: 'POST',
			data: (load),
			dataType: 'json',
			beforeSend: funcBeforeLoad,
			success: funcSuccessLoad
		});
	}
};
//проверка направления
function funcSuccessDirectionCheck(req){
	if(req.found){//если найдено
		$('#result_spec').css({'border' : '1px solid #569b44'});
		load.direction = $('#result_spec').val();//заносим в фильтр выбранное направление
		$.ajax({//запрос списка карточек
			url: 'load',
			type: 'POST',
			data: (load),
			dataType: 'json',
			beforeSend: funcBeforeLoad,
			success: funcSuccessLoad
		});
	}
	else{//иначе вывод ошибки
		$('#result_spec').css({'border' : '1px solid #ff0000'});
	}
};
//проверка факультета
function funcSuccessFacultyCheck(req){
	if(req.found){//если найдено
		$('#result_spec').prop('disabled', false);//разблокировка полей ввода
		$('#result_faq').css({'border' : '1px solid #569b44'});
		$.ajax({//запрос списка направлений
			url: 'direction',
			type: 'POST',
			data: ({'val': $('#result_faq').val()}),
			dataType: 'json',
			beforeSend: funcBeforeDirection,
			success: funcSuccessDirection
		});
		load.faculty = $('#result_faq').val();//заносим в фильтр выбранный факультет
		$.ajax({//запрос списка карточек
			url: 'load',
			type: 'POST',
			data: (load),
			dataType: 'json',
			beforeSend: funcBeforeLoad,
			success: funcSuccessLoad
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		$('#result_spec').prop('disabled', true);//блокировка полей ввода
		$('#result_spec').val('');
		$('#result_faq').css({'border' : '1px solid #ff0000'});
	}
};
//провека вуза
function funcSuccessUniversityCheck(req){
	if(req.found){//если найдено
		$('#result_faq').prop('disabled', false);//разблокировка полей ввода
		$('#result_vuz').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
		$.ajax({//запрос списка факультетов
			url: 'faculty',
			type: 'POST',
			data: ({'val': $('#result_vuz').val()}),
			dataType: 'json',
			beforeSend: funcBeforeFaculty,
			success: funcSuccessFaculty
		});
		load.university = $('#result_vuz').val();//заносим в фильтр выбранный вуз
		$.ajax({//запрос списка карточек
			url: 'load',
			type: 'POST',
			data: (load),
			dataType: 'json',
			beforeSend: funcBeforeLoad,
			success: funcSuccessLoad
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		$('#result_faq').prop('disabled', true);//блокировка полей ввода
		$('#result_faq').val('');
		$('#result_spec').val('');
		$('#result_vuz').css({'border' : '1px solid #ff0000'});
	}
};

$(document).ready(function(){
	card = $('.card').clone();//клонирование карточки

	/*
	jQuery('select').on('focus', function() {
		var obj = null;
	    obj = this;
	    $(this).change(function() {
			setTimeout(function() { jQuery(obj).blur() }, 250);
		});
	});
	*/
	//запрос инфрмации о пользователе
	$.ajax({
		url: 'permission',
		type: 'POST',
		dataType: 'json',
		success: funcSuccessPermission
	});
	//переход на следующую страницу
	$('.card_next').bind('click', function(){
		if(numberlast < numberlastid){
			numberfirst += 5;
			numberlast += 5;
			$('.card').css({'opacity' : '0'});
			$('.card').addClass('oldCard');
			funcSuccessLoad(data);
		}
	});
	//переход на предыдущую страницу
	$('.card_prev').bind('click', function(){
		if(numberfirst > 0){
			numberfirst -= 5;
			numberlast -= 5;
			$('.card').css({'opacity' : '0'});
			$('.card').addClass('oldCard');
			funcSuccessLoad(data);
		}
	});
	//переход к началу
	$('.first_cards').bind('click', function(){
		if(numberlastid != 0){
			numberfirst = 0;
			numberlast = 5;
			$('.card').css({'opacity' : '0'});
			$('.card').addClass('oldCard');
			funcSuccessLoad(data);
		}
	});
	//переход в конец
	$('.last_cards').bind('click', function(){
		if(numberlastid != 0){
			var last = numberlastid;
			while(last % 5 != 0){
				last++;
			}
			numberfirst = last - 5;
			numberlast = last;
			$('.card').css({'opacity' : '0'});
			$('.card').addClass('oldCard');
			funcSuccessLoad(data);
		}
	});
	//проверка выбора формы обучения
	$('#result_form').blur(function() {
		console.log('форма обучения');
		if($('#result_form option:selected').text() != 'Не выбрано') {
			$(this).css({'border' : '1px solid #569b44'});
			load.type = $('#result_form option:selected').text();//заносим в фильтр выбранную форму обучения
			$.ajax({//запрос списка карточек
				url: 'load',
				type: 'POST',
				data: (load),
				dataType: 'json',
				beforeSend: funcBeforeLoad,
				success: funcSuccessLoad
			});
		} else {//иначе
			$(this).css({'border' : '1px solid #000'});
			load.type = '';//очищаем в фильтре выбранную форму обучения
			$.ajax({//запрос списка карточек
				url: 'load',
				type: 'POST',
				data: (load),
				dataType: 'json',
				beforeSend: funcBeforeLoad,
				success: funcSuccessLoad
			});
		}
	});
	//проверка выбора курса
	$('#result_kurs').blur(function() {
		console.log('курс');
		if($('#result_kurs option:selected').text() != 'Не выбрано') {
			$(this).css({'border' : '1px solid #569b44'});
			load.course = $('#result_kurs option:selected').text();//заносим в фильр выбранный курс
			$.ajax({//запрос списка карточек
				url: 'load',
				type: 'POST',
				data: (load),
				dataType: 'json',
				beforeSend: funcBeforeLoad,
				success: funcSuccessLoad
			});
		} else {//иначе
			$(this).css({'border' : '1px solid #000'});
			load.course = '';//очищаем в фильтре выбранный курс
			$.ajax({//запрос списка карточек
				url: 'load',
				type: 'POST',
				data: (load),
				dataType: 'json',
				beforeSend: funcBeforeLoad,
				success: funcSuccessLoad
			});
		}
	});
	//выбор вуза из списка
    $(".result_vuz_window").on("click", "p.result_vuz_window_name", function(){
        $('#result_vuz').val($(this).text());
        $('#result_faq').prop('disabled', true);
        $('#result_spec').prop('disabled', true);
		$('#result_faq').val('');
		$('#result_spec').val('');
		$('#result_vuz').css({'border' : '1px solid #000'});
		$('#result_faq').css({'border' : '1px solid #000'});
		$('#result_spec').css({'border' : '1px solid #000'});
    });
    //выбор факультета из списка
    $(".result_faq_window").on("click", "p.result_faq_window_name", function(){
        $('#result_faq').val($(this).text());
        $('#result_spec').prop('disabled', true);
		$('#result_spec').val('');
		$('#result_faq').css({'border' : '1px solid #000'});
		$('#result_spec').css({'border' : '1px solid #000'});
    });
    //выбор направления из списка
    $(".result_spec_window").on("click", "p.result_spec_window_name", function(){
        $('#result_spec').val($(this).text());
		$('#result_spec').css({'border' : '1px solid #000'});
    });
    //проверка выбранного/введенного вуза
	$('#result_vuz').blur(function() {
		setTimeout(function () {//задержка отправки
			if($('#result_vuz').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'universitycheck',
					type: 'POST',
					data: ({'val': $('#result_vuz').val()}),
					dataType: 'json',
					success: funcSuccessUniversityCheck
				});
			}
			else{//иначе очистка последующие поля вывод ошибки
				$('#result_vuz').css({'border' : '1px solid #000'});
		        $('#result_faq').prop('disabled', true);
		        $('#result_spec').prop('disabled', true);
				$('#result_faq').val('');
				$('#result_spec').val('');
				$('#result_faq').css({'border' : '1px solid #000'});
				$('#result_spec').css({'border' : '1px solid #000'});
				load.university = '';//очищаем фильтр
				load.faculty = '';
				load.direction = '';
				$.ajax({//запрос списка карточек
					url: 'load',
					type: 'POST',
					data: (load),
					dataType: 'json',
					beforeSend: funcBeforeLoad,
					success: funcSuccessLoad
				});
			}
		}, 250);
	});
	//проверка выбранного/введенного факультета
	$('#result_faq').blur(function() {
		setTimeout(function () {//задержка отправки
			if($('#result_faq').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'facultycheck',
					type: 'POST',
					data: ({'val': $('#result_faq').val()}),
					dataType: 'json',
					success: funcSuccessFacultyCheck
				});
			}
			else{//иначе очистка последущих полей вывод ошибки
				$('#result_faq').css({'border' : '1px solid #000'});
		        $('#result_spec').prop('disabled', true);
				$('#result_spec').val('');
				$('#result_spec').css({'border' : '1px solid #000'});
				load.faculty = '';//очищаем фильтр
				load.direction = '';
				$.ajax({//запрос списка карточек
					url: 'load',
					type: 'POST',
					data: (load),
					dataType: 'json',
					beforeSend: funcBeforeLoad,
					success: funcSuccessLoad
				});
			}
		}, 250);
	});
	//проверка выбранного/введенного направления
	$('#result_spec').blur(function() {
		setTimeout(function () {//задержка отправки
			if($('#result_spec').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'directioncheck',
					type: 'POST',
					data: ({'val': $('#result_spec').val()}),
					dataType: 'json',
					success: funcSuccessDirectionCheck
				});
			}
			else{//иначе вывод ошибки
				$('#result_spec').css({'border' : '1px solid #000'});
				load.direction = '';//очищаем фильтр
				$.ajax({//запрос списка катрочек
					url: 'load',
					type: 'POST',
					data: (load),
					dataType: 'json',
					beforeSend: funcBeforeLoad,
					success: funcSuccessLoad
				});
			}
		}, 250);
	});
});