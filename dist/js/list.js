var valid_university;
var valid_faculty;
var valid_direction;
var valid_country = true;
var valid_city = true;
//задержка появления и скрытия всплывающих списков
setTimeout(function(){},1000);
$('#spec').focus(function(){setTimeout(function(){$('#spec_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#spec_window').hide('fast');},0);});
$('#fuq').focus(function(){setTimeout(function(){$('#fuq_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#fuq_window').hide('fast');},150);});
$('#vuz').focus(function(){setTimeout(function(){$('#vuz_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#vuz_window').hide('fast');},0);});

$('#country').focus(function(){setTimeout(function(){$('#country_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#country_window').hide('fast');},0);});
$('#city').focus(function(){setTimeout(function(){$('#city_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#city_window').hide('fast');},0);});

$('#country_job').focus(function(){setTimeout(function(){$('#country_job_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#country_job_window').hide('fast');},0);});
$('#city_job').focus(function(){setTimeout(function(){$('#city_job_window').show('fast');},0);})
.blur(function(){setTimeout(function(){$('#city_job_window').hide('fast');},0);});
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
//загрузка списка стран
function funcSuccessCountry(req){
	req.forEach(function(element){
		$("#country_window").append("<p class='country_window_name'>" + element + "</p>");//заполнение списка
		$("#country_job_window").append("<p class='country_job_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeCountry(){
	console.log('запрос стран');
	$('.country_window_name').detach();//очистка списка
	$('.country_job_window_name').detach();//очистка списка
};
//загрузка списка городов
function funcSuccessCityJob(req){
	req.forEach(function(element){
		$("#city_job_window").append("<p class='city_job_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeCityJob(){
	console.log('запрос городов');
	$('.city_job_window_name').detach();//очистка списка
};
//загрузка списка городов
function funcSuccessCity(req){
	req.forEach(function(element){
		$("#city_window").append("<p class='city_window_name'>" + element + "</p>");//заполнение списка
	});
};

function funcBeforeCity(){
	console.log('запрос городов');
	$('.city_window_name').detach();//очистка списка
};
//проверка города
function funcSuccessCityJobCheck(req){
	if(req.found){
		valid_city = true;
		$('#city_job').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_city = false;
		$('#city_job').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Город не найден в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};
//проверка страны
function funcSuccessCountryJobCheck(req){
	if(req.found){
		valid_country = true;
		$('#city_job').prop('disabled', false);//разблокировка полей ввода
		$('#country_job').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
		$.ajax({
			url: 'city',
			type: 'POST',
			data: ({'val': $('#country_job').val()}),
			dataType: 'json',
			beforeSend: funcBeforeCityJob,
			success: funcSuccessCityJob
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_country = false;
		$('#city_job').prop('disabled', true);//блокировка полей ввода
		$('#city_job').val('');
		$('#country_job').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Страна не найдена в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};
//проверка города
function funcSuccessCityCheck(req){
	if(req.found){
		valid_city = true;
		$('#city').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_city = false;
		$('#city').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Город не найден в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
};
//проверка страны
function funcSuccessCountryCheck(req){
	if(req.found){
		valid_country = true;
		$('#city').prop('disabled', false);//разблокировка полей ввода
		$('#country').css({'border' : '1px solid #569b44'});
		$('.error_register').css({'opacity': '0'});
		$.ajax({
			url: 'city',
			type: 'POST',
			data: ({'val': $('#country').val()}),
			dataType: 'json',
			beforeSend: funcBeforeCity,
			success: funcSuccessCity
		});
	}
	else{//иначе очистка последующих полей вывод ошибки
		valid_country = false;
		$('#city').prop('disabled', true);//блокировка полей ввода
		$('#city').val('');
		$('#country').css({'border' : '1px solid #ff0000'});
		$('.error_register').text('Страна не найдена в базе данных, выбирете из списка');
		$('.error_register').css({'opacity': '1'});
	}
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
	//запрос загрузки списка стран
	$.ajax({
		url: 'country',
		type: 'POST',
		dataType: 'json',
		beforeSend: funcBeforeCountry,
		success: funcSuccessCountry
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

    //выбор из списка стран
    $("#country_window").on("click", "p.country_window_name", function(){
        $('#country').val($(this).text());
        $('#city').prop('disabled', true);//блокировка полей ввода
		$('#city').val('');
		$('#country').css({'border' : '1px solid #000'});
		$('#city').css({'border' : '1px solid #000'});
    });
    //выбор из списка стран
    $("#country_job_window").on("click", "p.country_job_window_name", function(){
        $('#country_job').val($(this).text());
        $('#city_job').prop('disabled', true);//блокировка полей ввода
		$('#city_job').val('');
		$('#country_job').css({'border' : '1px solid #000'});
		$('#city_job').css({'border' : '1px solid #000'});
    });
    //выбор из списка городов
    $("#city_window").on("click", "p.city_window_name", function(){
        $('#city').val($(this).text());
		$('#city').css({'border' : '1px solid #000'});
    });
    //выбор из списка городов
    $("#city_job_window").on("click", "p.city_job_window_name", function(){
        $('#city_job').val($(this).text());
		$('#city_job').css({'border' : '1px solid #000'});
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

	$('#country').blur(function() {//проверка выбранной/введенной страны
		setTimeout(function () {//задержка отправки
			if($('#country').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'countrycheck',
					type: 'POST',
					data: ({'val': $('#country').val()}),
					dataType: 'json',
					success: funcSuccessCountryCheck
				});
			}
			else{//иначе очистка последущих полей вывод ошибки
				$('#country').css({'border' : '1px solid #000'});
		        $('#city').prop('disabled', true);//блокировка полей ввода
				$('#city').val('');
				$('#city').css({'border' : '1px solid #000'});
				$('.error_register').css({'opacity': '0'});
				valid_country = true;
			}
		}, 250);
	});

	$('#city').blur(function() {//проверка выбранного/введенного города
		setTimeout(function () {//задержка отправки
			if($('#city').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'citycheck',
					type: 'POST',
					data: ({'val': $('#city').val()}),
					dataType: 'json',
					success: funcSuccessCityCheck
				});
			}
			else{//иначе вывод ошибки
				valid_country = true;
				$('#city').css({'border' : '1px solid #000'});
				$('.error_register').css({'opacity': '0'});
			}
		}, 250);
	});

	$('#country_job').blur(function() {//проверка выбранной/введенной страны
		setTimeout(function () {//задержка отправки
			if($('#country_job').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'countrycheck',
					type: 'POST',
					data: ({'val': $('#country_job').val()}),
					dataType: 'json',
					success: funcSuccessCountryJobCheck
				});
			}
			else{//иначе очистка последущих полей вывод ошибки
				$('#country_job').css({'border' : '1px solid #000'});
		        $('#city_job').prop('disabled', true);//блокировка полей ввода
				$('#city_job').val('');
				$('#city_job').css({'border' : '1px solid #000'});
				$('.error_register').css({'opacity': '0'});
				valid_country = true;
			}
		}, 250);
	});

	$('#city_job').blur(function() {//проверка выбранного/введенного города
		setTimeout(function () {//задержка отправки
			if($('#city_job').val() != ''){
				$.ajax({//отправка запроса проверки
					url: 'citycheck',
					type: 'POST',
					data: ({'val': $('#city_job').val()}),
					dataType: 'json',
					success: funcSuccessCityJobCheck
				});
			}
			else{//иначе вывод ошибки
				valid_country = true;
				$('#city_job').css({'border' : '1px solid #000'});
				$('.error_register').css({'opacity': '0'});
			}
		}, 250);
	});
});