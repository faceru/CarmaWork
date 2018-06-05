var valid_university;
var valid_faculty;
var valid_direction;
//задержка появления и скрытия всплывающих списков
setTimeout(function(){},1000);
$('#spec').focus(function(){setTimeout(function(){$('#spec_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#spec_window').hide('fast');},0);});
$('#fuq').focus(function(){setTimeout(function(){$('#fuq_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#fuq_window').hide('fast');},150);});
$('#vuz').focus(function(){setTimeout(function(){$('#vuz_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#vuz_window').hide('fast');},0);});
//поиск/фильтр вузов
function filterUniversity(){
	var listUniversity = $('p.vuz_window_name');//собираем спиок вузов
	for (var i = 0; i < listUniversity.length; i++) {
		var serch;
		serch = listUniversity[i].textContent.toLowerCase().indexOf($('#vuz').val().toLowerCase());//проверка вхождения введенной последовательности символов
		if(serch == -1){//если нет
			listUniversity[i].style.display = 'none';//то убираем блок
		}
		else{//иначе
			listUniversity[i].style.display = 'block';//показываем 
		}
	}
};
//поиск/фильтр факультетов
function filterFaculty(){
	var listFaculty = $('p.fuq_window_name');//собираем спиок факультетов
	for (var i = 0; i < listFaculty.length; i++) {
		var serch;
		serch = listFaculty[i].textContent.toLowerCase().indexOf($('#fuq').val().toLowerCase());//проверка вхождения введенной последовательности символов
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
	var listDirection = $('p.spec_window_name');//собираем спиок направлений
	for (var i = 0; i < listDirection.length; i++) {
		var serch;
		serch = listDirection[i].textContent.toLowerCase().indexOf($('#spec').val().toLowerCase());//проверка вхождения введенной последовательности символов
		if(serch == -1){//если нет
			listDirection[i].style.display = 'none';//то убираем блок
		}
		else{//иначе
			listDirection[i].style.display = 'block';//показываем
		}
	}
};
//загрузка списка направлений
function funcSuccessDirection(req){
	req.forEach(function(element){
		$("#spec_window").append("<p class='spec_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeDirection(){
	console.log('запрос направлений');
	$('.spec_window_name').detach();//очистка списка
};
//загрузка списка факультетов
function funcSuccessFaculty(req){
	req.forEach(function(element){
		$("#fuq_window").append("<p class='fuq_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeFaculty(){
	console.log('запрос факультетов');
	$('.fuq_window_name').detach();//очистка списка
};
//загрузка списка вузов
function funcSuccessUniversity(req){
	req.forEach(function(element){
		$("#vuz_window").append("<p class='vuz_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeUniversity(){
	console.log('запрос вузов');
	$('.vuz_window_name').detach();//очистка списка
};
//проверка направления
function funcSuccessDirectionCheck(req){
	if(req.found){
		valid_direction = true;
		$('#spec').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_direction = false;
		$('#spec').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Направление не найдено в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};
//проверка факультета
function funcSuccessFacultyCheck(req){
	if(req.found){
		valid_faculty = true;
		$('#spec').prop('disabled', false);//разблокировка полей ввода
		$('#fuq').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
		$.ajax({
			url: 'direction',
			type: 'POST',
			data: ({'val': $('#fuq').val()}),
			dataType: 'json',
			beforeSend: funcBeforeDirection,
			success: funcSuccessDirection
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_faculty = false;
		$('#spec').prop('disabled', true);//блокировка полей ввода
		$('#spec').val('');
		$('#fuq').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Факультет не найден в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};
//проверка вуза
function funcSuccessUniversityCheck(req){
	if(req.found){
		valid_university = true;
		$('#fuq').prop('disabled', false);//разблокировка полей ввода
		$('#vuz').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
		$.ajax({//запрос списка факультетов
			url: 'faculty',
			type: 'POST',
			data: ({'val': $('#vuz').val()}),
			dataType: 'json',
			beforeSend: funcBeforeFaculty,
			success: funcSuccessFaculty
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_university = false;
		$('#fuq').prop('disabled', true);//блокировка полей ввода
		$('#fuq').val('');
		$('#spec').val('');
		$('#vuz').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Вуз не найден в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};

$(document).ready(function(){
	valid_university = false;
	valid_faculty = false;
	valid_direction = false;
	//запрос загрузки списка вузов
	$.ajax({
		url: 'university',
		type: 'POST',
		dataType: 'json',
		beforeSend: funcBeforeUniversity,
		success: funcSuccessUniversity
	});
	//выбор из списка вузов
    $("#vuz_window").on("click", "p.vuz_window_name", function(){
        $('#vuz').val($(this).text());
        $('#fuq').prop('disabled', true);//блокировка полей ввода
        $('#spec').prop('disabled', true);
		$('#fuq').val('');
		$('#spec').val('');
		$('#vuz').css({'border' : '1px solid #000'});
		$('#fuq').css({'border' : '1px solid #000'});
		$('#spec').css({'border' : '1px solid #000'});
    });
    //выбор из списка факультетов
    $("#fuq_window").on("click", "p.fuq_window_name", function(){
        $('#fuq').val($(this).text());
        $('#spec').prop('disabled', true);//блокировка полей ввода
		$('#spec').val('');
		$('#fuq').css({'border' : '1px solid #000'});
		$('#spec').css({'border' : '1px solid #000'});
    });
    //выбор из списка направлений
    $("#spec_window").on("click", "p.spec_window_name", function(){
        $('#spec').val($(this).text());
		$('#spec').css({'border' : '1px solid #000'});
    });
    //проверка выбранного/введенного вуза
	$('#vuz').blur(function() {
		setTimeout(function () {//задержка отправки
			if($('#vuz').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'universitycheck',
					type: 'POST',
					data: ({'val': $('#vuz').val()}),
					dataType: 'json',
					success: funcSuccessUniversityCheck
				});
			}
			else{//иначе очистка последующие поля вывод ошибки
				$('#vuz').css({'border' : '1px solid #ff0000'});
				$('#fuq').prop('disabled', true);//блокировка полей ввода
		        $('#spec').prop('disabled', true);
				$('#fuq').val('');
				$('#spec').val('');
				$('#fuq').css({'border' : '1px solid #000'});
				$('#spec').css({'border' : '1px solid #000'});
				$('.error_register').text('Поле Вуз не должно быть пустым');
				$('.error_register').css({'opacity': '1'});
				valid_university = false;
			}
		}, 250);
	});

	$('#fuq').blur(function() {//проверка выбранного/введенного факультета
		setTimeout(function () {//задержка отправки
			if($('#fuq').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'facultycheck',
					type: 'POST',
					data: ({'val': $('#fuq').val()}),
					dataType: 'json',
					success: funcSuccessFacultyCheck
				});
			}
			else{//иначе очистка последущих полей вывод ошибки
				$('#fuq').css({'border' : '1px solid #ff0000'});
		        $('#spec').prop('disabled', true);//блокировка полей ввода
				$('#spec').val('');
				$('#spec').css({'border' : '1px solid #000'});
				$('.error_register').text('Поле Факультет не должно быть пустым');
				$('.error_register').css({'opacity': '1'});
				valid_faculty = false;
			}
		}, 250);
	});

	$('#spec').blur(function() {//проверка выбранного/введенного направления
		setTimeout(function () {//задержка отправки
			if($('#spec').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'directioncheck',
					type: 'POST',
					data: ({'val': $('#spec').val()}),
					dataType: 'json',
					success: funcSuccessDirectionCheck
				});
			}
			else{//иначе вывод ошибки
				$('#spec').css({'border' : '1px solid #ff0000'});
				$('.error_register').text('Поле Направление не должно быть пустым');
				$('.error_register').css({'opacity': '1'});
				valid_direction = false;
			}
		}, 250);
	});
});