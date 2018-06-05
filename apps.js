var express = require('express');//веб-фреймворк
var bodyParser = require('body-parser');//обработка post запросов
var app = express();//создаем фреймворк
var mysql = require('mysql');//база данных
var domen = 'localhost';//домен по которому будет доступен сервер

var nodemailer = require('nodemailer');//обработчик почты

var session = require('express-session');//сессия
var MySQLStore = require('connect-mysql')(session);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Facethree!23',
  database : 'carma'
});

var options = {
    config: {
        user: 'root', 
        password: 'Facethree!23', 
        database: 'carma' 
    }
};

app.use(session({//настройки сессии
	secret: 'adth6e6',//ключ по которому будут шифроваться cookie
	store: new MySQLStore(options)
}));

app.use(bodyParser.json());//подключаем к фреймворку обработку post запросов
app.use(bodyParser.urlencoded({extended: true}));//подключаем обработку данных из пост запросов
app.use('/', express.static('dist'));//разрешаем нашим страницам загружать дополнительные файлы (css, js, img)

app.listen(8081, domen, function () {//запуск сервера по 80 порту и указанному домену
  console.log('Успешно запущен');
});

connection.connect(function(err, database){
	if(err){
		console.log('Не возможно подключиться к серверу MySQL. Ошибка:', err);
	}	
	else{
		console.log('Соединение с базой данных успешно установлено');
	}
});

app.get('/', function (req, res) {//ответ на запрос главной страницы
    res.sendFile(__dirname + '/dist/index.html');//отправляем нашу главную страницу
    console.log('Переход на главную');
});

app.get('/login', function (req, res) {//ответ на запрос страницы входа
	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			if(docs[0].sessions_email == null){
				res.sendFile(__dirname + '/dist/login.html');//отправляем страницу входа
    			console.log('Переход на вход');
			}
			else{
				res.redirect('/view');//перенаправление на выдачу
    			console.log('Переход на выдачу');
			}
		}
    });
});

app.get('/register', function (req, res) {//ответ на запрос страницы регистрации
	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			if(docs[0].sessions_email == null){
				res.sendFile(__dirname + '/dist/register.html');//отправляем страницу регистрации
				console.log('Переход на регистрацию');
			}
			else{
				res.redirect('/view');//перенаправление на выдачу
    			console.log('Переход на выдачу');
			}
		}
    });
});

app.get('/view', function (req, res) {//ответ на запрос страницы выдачи
	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			if(docs[0].sessions_email == null){
				res.redirect('/login');//перенаправление на вход
				console.log('Переход на вход');
			}
			else{
				res.sendFile(__dirname + '/dist/result.html');//отправляем страницу выдачи
    			console.log('Переход на выдачу');
			}
		}
    });
});

app.get('/rebootpass', function (req, res) {//ответ на запрос страницы восстановления пароля
	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			if(docs[0].sessions_email == null){
				res.sendFile(__dirname + '/dist/rebootpass.html');//отправляем страницы восстановления пароля
    			console.log('Переход на восстановление');
			}
			else{
				res.sendFile(__dirname + '/dist/result.html');//отправляем страницу выдачи
    			console.log('Переход на выдачу');
			}
		}
    });
});

app.post('/login', function(req, res){//ответ на запрос страницы со страцниы входа
	var user = {//полученные данные
		email: req.body.login,
		password: req.body.password
	};
	var status = {//статус проверки
		login: '',
		password: ''
	};
	connection.query('SELECT * FROM users WHERE email = "' + user.email + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].email == user.email && docs[0].password == user.password){//если совпадает и логин и пароль
				connection.query("UPDATE sessions SET sessions_email = '" + user.email + "' WHERE sid = '" + req.sessionID + "'");
				connection.query("UPDATE sessions SET permission = '" + docs[0].permission + "' WHERE sid = '" + req.sessionID + "'");
				console.log('Успешный вход ' + user.email + ' ' + user.password);//вывод в консоль аутентификацию пользователя
				status.login = true;//устанавливаем положительный статус аутентификации
				status.password = true;
			}
			else{//иначе
				status.login = true;//устанавливаем положительный статус логина
				status.password = false;//и отрицательный для пароля
				console.log('Не правильный пароль ' + user.email + ' ' + user.password);//вывод в консоль не успешную аутентификацию пользователя
			}
		}
		else{//иначе
			console.log('Пользователь ' + user.email + ' ' + user.password + ' не найден');//выводим попытку аутентификации
			status.login = false;//устанавливаем отрицательный статус аутентификации
			status.password = false;
		}
		res.send(status);//отправляем статус
    });
});

app.post('/logout', function(req, res){//ответ на запрос разрыва авторизации
	var status = {};
	connection.query("DELETE FROM sessions WHERE sid = '" + req.sessionID + "'");
	res.send(status);
});

app.post('/button', function(req, res){//ответ на запрос информации о сессии
	var status = {
		session: ''
	};
	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			if(docs[0].sessions_email == null){
				status.session = false;
			}
			else{
				status.session = true;
			}
		}
		res.send(status);//отправляем статус
    });
});

app.post('/country', function(req, res){//ответ на запрос списка стран
	connection.query('SELECT * FROM country', function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs !== null){//если найдено совпадение
			var list = [];
			docs.forEach(function(element){
				list.push(element.country_name);
			});
			res.send(list);//отправляем список стран
		}
		else{//иначе выводим в консоль не найдено
			console.log('не найдено');
		}
    });
});

app.post('/countrycheck', function(req, res){//ответ на запрос списка стран
	var status = {
		found: ''
	};
	connection.query('SELECT * FROM country WHERE country_name = "' + req.body.val + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].country_name == req.body.val){//если совпадает и логин и пароль
				status.found = true;//присваиваем положительный статус
			}
		}
		else{//иначе
				status.found = false;//отрицательный статус
				console.log('не найдено');//вывод в консоль не найдено
			}
		res.send(status);//отправка статуса
    });
});

app.post('/city', function(req, res){//ответ на запрос списка городов
	connection.query('SELECT * FROM city WHERE city_country = "' + req.body.val + '"', function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs !== null){//если найдено совпадение
			var list = [];
			docs.forEach(function(element){
				list.push(element.city_name);
			});
			res.send(list);//отправляем список гордов
		}
		else{//иначе выводим в консоль не найдено
			console.log('не найдено');
		}
    });
});

app.post('/citycheck', function(req, res){//ответ на запрос списка стран
	var status = {
		found: ''
	};
	connection.query('SELECT * FROM city WHERE city_name = "' + req.body.val + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].city_name == req.body.val){//если совпадает и логин и пароль
				status.found = true;//присваиваем положительный статус
			}
		}
		else{//иначе
				status.found = false;//отрицательный статус
				console.log('не найдено');//вывод в консоль не найдено
			}
		res.send(status);//отправка статуса
    });
});

app.post('/university', function(req, res){//ответ на запрос списка университетов
	connection.query('SELECT * FROM university', function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs !== null){//если найдено совпадение
			var list = [];
			docs.forEach(function(element){
				list.push(element.university_name);
			});
			res.send(list);//отправляем список университетов
		}
		else{//иначе выводим в консоль не найдено
			console.log('не найдено');
		}
    });
});

app.post('/universitycheck', function(req, res){//ответ на запрос проверки университета
	var status = {
		found: ''
	};
	connection.query('SELECT * FROM university WHERE university_name = "' + req.body.val + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].university_name == req.body.val){//если совпадает и логин и пароль
				status.found = true;//присваиваем положительный статус
			}
		}
		else{//иначе
				status.found = false;//отрицательный статус
				console.log('не найдено');//вывод в консоль не найдено
			}
		res.send(status);//отправка статуса
    });
});

app.post('/faculty', function(req, res){//ответ на запрос списка факультетов
	connection.query('SELECT * FROM faculty WHERE faculty_university = "' + req.body.val + '"', function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs !== null){//если найдено совпадение
			var list = [];
			docs.forEach(function(element){
				list.push(element.faculty_name);
			});
			res.send(list);//отправляем список университетов
		}
		else{//иначе выводим в консоль не найдено
			console.log('не найдено');
		}
    });
});

app.post('/facultycheck', function(req, res){//ответ на запрос проверки факультета
	var status = {
		found: ''
	};
	connection.query('SELECT * FROM faculty WHERE faculty_name = "' + req.body.val + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].faculty_name == req.body.val){//если совпадает и логин и пароль
				status.found = true;//присваиваем положительный статус
			}
		}
		else{//иначе
				status.found = false;//отрицательный статус
				console.log('не найдено');//вывод в консоль не найдено
			}
		res.send(status);//отправка статуса
    });
});

app.post('/direction', function(req, res){//ответ на запрос списка направлений
	connection.query('SELECT * FROM direction WHERE direction_faculty = "' + req.body.val + '"', function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs !== null){//если найдено совпадение
			var list = [];
			docs.forEach(function(element){
				list.push(element.direction_name);
			});
			res.send(list);//отправляем список университетов
		}
		else{//иначе выводим в консоль не найдено
			console.log('не найдено');
		}
    });
});

app.post('/directioncheck', function(req, res){//ответ на запрос проверки направления
	var status = {
		found: ''
	};
	connection.query('SELECT * FROM direction WHERE direction_name = "' + req.body.val + '"', function(err, docs){//поиск в базе данных пользователей по email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			if(docs[0].direction_name == req.body.val){//если совпадает и логин и пароль
				status.found = true;//присваиваем положительный статус
			}
		}
		else{//иначе
				status.found = false;//отрицательный статус
				console.log('не найдено');//вывод в консоль не найдено
			}
		res.send(status);//отправка статуса
    });
});

app.post('/register', function(req, res){//ответ на запрос регистрации
	var newusers;//объект новый пользователь
	if(req.body.permission == 1){//если студент
		newusers = {//оптеделяем поля студента
			permission: req.body.permission,
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			surname: req.body.surname,
			otche: req.body.otche,
			country: req.body.country,//связанное поле
			city: req.body.city,//связанное поле
			vk: req.body.vk,
			skype: req.body.skype,
			telegram: req.body.telegram,
			course: req.body.course,
			type: req.body.type,
			university: req.body.university,//связанное поле
			faculty: req.body.faculty,//связанное поле
			direction: req.body.direction//связанное поле
		};
		connection.query("INSERT INTO users (permission, email, password, name, surname, patronymic, id_vk, skype, telegram, kurs, form) VALUES('" + newusers.permission + "', '" + newusers.email + "', '" + newusers.password + "', '" + newusers.name + "', '"  + newusers.surname + "', '" + newusers.otche + "', '"  + newusers.vk + "', '" + newusers.skype + "', '" + newusers.telegram + "', '" + newusers.course + "', '"  + newusers.type + "')");
		connection.query("UPDATE users SET user_university = (SELECT * FROM university WHERE university_name = '" + newusers.university + "') WHERE email = '" + newusers.email + "'");
		connection.query("UPDATE users SET user_faculty = (SELECT faculty_name FROM faculty WHERE faculty_name = '" + newusers.faculty + "') WHERE email = '" + newusers.email + "'");
		connection.query("UPDATE users SET user_direction = (SELECT direction_name FROM direction WHERE direction_name = '" + newusers.direction + "') WHERE email = '" + newusers.email + "'");
	}
	else{//если работодатель
		newusers = {//определяем поля работодателя
			permission: req.body.permission,
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			surname: req.body.surname,
			otche: req.body.otche,
			country: req.body.country,//связанное поле
			city: req.body.city,//связанное поле
			vk: req.body.vk,
			skype: req.body.skype,
			telegram: req.body.telegram
		};
		connection.query("INSERT INTO users (permission, email, password, name, surname, patronymic, id_vk, skype, telegram) VALUES('" + newusers.permission + "', '" + newusers.email + "', '" + newusers.password + "', '" + newusers.name + "', '"  + newusers.surname + "', '" + newusers.otche + "', '"  + newusers.vk + "', '" + newusers.skype + "', '" + newusers.telegram + "')");
	}
	var status = {//статус 
		send: true
	}
	if(newusers.country != ''){
		connection.query("UPDATE users SET user_country = (SELECT * FROM country WHERE country_name = '" + newusers.country + "') WHERE email = '" + newusers.email + "'");
		if(newusers.city != ''){
			connection.query("UPDATE users SET user_city = (SELECT city_name FROM city WHERE city_name = '" + newusers.city + "') WHERE email = '" + newusers.email + "'");
		}
	}
	res.send(status);//отправка статуса
});

app.post('/email', function(req, res){//ответ на запрос проверки email
	var email = {//объект email
		found: ''//значение поиска
	};
	connection.query('SELECT * FROM users WHERE email = "' + req.body.email + '"', function(err, docs){//поиск в базе данных пользователей введенного email
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs[0]){//если найдено совпадение
			email.found = true;//присваиваем положительный статутс
		}
		else{//иначе
			email.found = false;//отрицательный
		}
		res.send(email);//отправка статуса
    });
});

app.post('/sendmail', function(req, res){//ответ на запрос восстановления пароля
	var status = {//статус восстановления
		send: ''
	};

	var transporter = nodemailer.createTransport({//настройки обработчика отправки писем
		service: "Gmail",//сервис
        host: 'smtp.ethereal.email',//хост
        port: 587,//порт
        secure: false,
        auth: {//аутентификация отправителя
	        user: "CarmaWorkServises@gmail.com",//логин
	        pass: "Stark009s"//пароль
	    }
    });

    connection.query('SELECT * FROM users WHERE email = "' + req.body.email + '"', function(err, docs){//поиск в базе данных зарегистрированных пользвателей
		if(err){//вывод если ошибка
			console.log(err);
			status.send = false;
		}
		else if(docs[0]){//если найдено совпадение
			var mail = {//конструктор письма
			    from: "CarmaWork <from@gmail.com>",//отправитель
			    to: req.body.email,//адресат
			    subject: "Восстановление пароля",//тема
			    text: "Ваш Email: " + docs.email + " пароль: " + docs.password,//текст
			    html: "<b>Ваш Email: </b>" + docs[0].email + "<b> пароль: </b>" + docs[0].password//html текст
			};

			transporter.sendMail(mail, function(error, info){//отправка
			    if(error){//вывод если ошибка
			        console.log(error);
			    }//вывод в консоль статуса отправки
			    console.log('Message sent: %s', info.messageId);
		        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			    transporter.close();//закрытие потока отправки
			});
			status.send = true;//присваиваем положительный статус отправки
		}
		else{//иначе
			status.send = false;//отрицательный статутс
		}
		res.send(status);//отправка статуса
    });
});

app.post('/sendmailcode', function(req, res){//ответ на запрос отправки письма с кодом для регистрации
	var status = {//статус
		send: ''
	};

	var transporter = nodemailer.createTransport({//настройки обработчика отправки писем
		service: "Gmail",//сервис
        host: 'smtp.ethereal.email',//хост
        port: 587,//порт
        secure: false,
        auth: {//аутентификация отправителя
	        user: "CarmaWorkServises@gmail.com",//логин
	        pass: "Stark009s"//пароль
	    }
    });

    const crypto = require('crypto');//модуль шифрования
	crypto.randomBytes(8, (err, buf) => {//функция генерирования 8 битного кода
		if (err){//вывод если ошибка
			console.log(err);
			status.send = false;//отрицательный статус
		}
		else{//иначе
			connection.query("DELETE FROM code WHERE email = '" + req.body.email + "'");
			connection.query("INSERT INTO code (code_name, email) VALUES ('" + buf.toString('hex') + "', '" + req.body.email + "')");
			var mail = {//конструктор письма
			    from: "CarmaWork <from@gmail.com>",//отправитель
			    to: req.body.email,//адресат
			    subject: "Код подтверждения регистрации",//тема
			    text: "Ваш код подтверждения регистрации: " + buf.toString('hex'),//текст
			    html: "<b>Ваш код подтверждения регистрации: </b>" + buf.toString('hex')//html текст
			};

			transporter.sendMail(mail, function(error, info){//отправка
			    if(error){//вывод если ошибка
			        console.log(error);
			    }//вывод в консоль статуса отправки
			    console.log('Message sent: %s', info.messageId);
		        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			    transporter.close();//закрытие потока отправки
			});
			status.send = true;//положительный статус
		}
		res.send(status);//отправка статуса
	});
});

app.post('/checkcode', function(req, res){//ответ на запрос проверки кода
	var status = {//статус
		send: ''
	};
	connection.query('SELECT * FROM code WHERE code_name = "' + req.body.code + '"', function(err, docs){//поиск в базе данных пользователей введенного email
		if(err){//вывод если ошибка
			console.log(err);
			status.send = false;
		}
		else if(docs[0]){//если найдено совпадение
			status.send = true;//устанавливаем положительный статус
			connection.query("DELETE FROM code WHERE code_name = '" + req.body.code + "'");
		}
		else{//иначе
			status.send = false;//отрицательный статус
		}
		res.send(status);//отправка статуса
    });
});

app.post('/permission', function(req, res){//ответ на запрос информации о типе учетной записи пользователя
	var status = {//информация о пользователе
		permission: '',//тип учетной записи
		university: '',//университет (для студента)
		faculty: '',//факультет (для студента)
		email: ''
	};

	connection.query('SELECT * FROM sessions WHERE sid = "' + req.sessionID + '"', function(err, docs){
		if(err){
			console.log(err);
		}
		else if(docs[0]){
			status.permission = docs[0].permission;
			status.email = docs[0].sessions_email;
		}
		if(status.permission == 1){//если студент
			connection.query('SELECT * FROM users WHERE email = "' + status.email + '"', function(err, docs){//поиск студента в базе данных по данным сессии
				if(err){//вывод если ошибка
					console.log(err);
				}
				else if(docs[0]){//если найдено совпадение
					status.university = docs[0].user_university;//устанавливаем значения унверситета
					status.faculty = docs[0].user_faculty;//и факультета
				}
				res.send(status);//отправляем данные студента
		    });
		}
		else{
			res.send(status);//отправляем данные работодателя
		}
    });

	
});

app.post('/load', function(req, res){//ответ на запрос карточек
	var load = {//полученные данные
		course: req.body.course,
		type: req.body.type,
		university: req.body.university,
		faculty: req.body.faculty,
		direction: req.body.direction
	};
	var sql = "SELECT * FROM users WHERE permission = '1'";
	var filtr = {//фильтр
		permission: '1'//поиск только по студентам
	};
	if(load.course != ''){//если получен не пустой курс
		filtr.course = load.course;//устанавливаем фильт по нему
		sql += " AND kurs = '" + load.course + "'";
	}
	if(load.type != ''){//если получена не пустая форма обучения
		filtr.type = load.type;//устанавливаем фильтр по форме обучения
		sql += " AND form = '" + load.type + "'";
	}
	if(load.university != ''){//если получен не пустой университет
		filtr.university = load.university;//устанавливаем фильтр по университету
		sql += " AND user_university = '" + load.university + "'";
		if(load.faculty != ''){//если получен не пустой факультет
			filtr.faculty = load.faculty;//устанавливаем фильтр по факультету
			sql += " AND user_faculty = '" + load.faculty + "'";
			if(load.direction != ''){//если получено не пустое направление
				filtr.direction = load.direction;//устанавливаем фильтр по направлению
				sql += " AND user_direction = '" + load.direction + "'";
			}
		}
	}
	connection.query(sql, function(err, docs){
		if(err){//вывод если ошибка
			console.log(err);
		}
		else if(docs.size !== 0){//если найдено совпадение
			var users = [];//массив объектов студентов
			docs.forEach(function(element){//проход по найденным студентам
				var user = {};//объект студент
				user.name = element.name;//присваиваем имя
				user.surname = element.surname;//фамилию
				user.otche = element.patronymic;//отчество
				user.email = element.email;//email
				user.university = element.user_university;//университет
				user.faculty = element.user_faculty;//факультет
				user.direction = element.user_direction;//направление
				user.type = element.form;//форму обучения
				user.course = element.kurs;//курс
				user.vk = element.id_vk;//vk
				user.telegram = element.telegram;//telegram
				user.skype = element.skype;//skype
				users.push(user);//добавляем в массив
			});
			res.send(users);//отправляем данные
		}
    });
});