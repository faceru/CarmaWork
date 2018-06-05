-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: carma
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `permission` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `patronymic` varchar(100) DEFAULT NULL,
  `user_country` varchar(100) DEFAULT NULL,
  `user_city` varchar(100) DEFAULT NULL,
  `id_vk` varchar(100) DEFAULT NULL,
  `skype` varchar(100) DEFAULT NULL,
  `telegram` varchar(100) DEFAULT NULL,
  `kurs` varchar(100) DEFAULT NULL,
  `form` varchar(100) DEFAULT NULL,
  `user_university` varchar(100) DEFAULT NULL,
  `user_faculty` varchar(100) DEFAULT NULL,
  `user_direction` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `user_country` (`user_country`),
  KEY `user_city` (`user_city`),
  KEY `user_university` (`user_university`),
  KEY `user_faculty` (`user_faculty`),
  KEY `user_direction` (`user_direction`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_country`) REFERENCES `country` (`country_name`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`user_city`) REFERENCES `city` (`city_name`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`user_university`) REFERENCES `university` (`university_name`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`user_faculty`) REFERENCES `faculty` (`faculty_name`),
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`user_direction`) REFERENCES `direction` (`direction_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','facedirect@yandex.ru','facethree123','Maks','Rogou','blbl','Польша','Варшава','sadasd','sadas','asddsa','2','Заочная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Факультет компьютерных наук и информационных технологий','Программная инженерия 09.03.04 (Бакалавриат)'),('1','liyofu@aditus.info','12345678','Рубен','Максудов','Иванович',NULL,NULL,'testvk','testskype','testtelegram','2','Заочная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Геологический факультет','Геология 05.04.01 (Магистратура)'),('1','megusaza@bitwhites.top','12345678','Николай','Борщёв','Афанасиевич','Польша',NULL,'','','','2','Заочная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Географический факультет','Картография и геоинформатика 05.03.03 (Бакалавриат)'),('1','sadub@stelliteop.info','12345678','Софья','Воропаева','Иосифовна',NULL,NULL,'','','','3','Дневная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Биологический факультет','Педагогическое образование 44.04.01 (Магистратура)'),('1','selaromit@storiqax.top','12345678','Ефросинья','Пустоходова','Василиевна','Российская Федерация',NULL,'testvk','testskype','testtelegram','3','Дневная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Геологический факультет','Геология 05.03.01 (Бакалавриат)'),('1','tapukalifo@bitwhites.top','12345678','Оксана','Загидуллина','Андрияновна',NULL,NULL,'vk','skype','telega','5','Заочная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Биологический факультет','Биология 06.04.01 (Магистратура)'),('2','xasa@storiqax.top','12345678','Клара','Щавлева','Георгиевна',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL),('1','xeyufekob@b2bx.net','12345678','Ксения','Дюженкова','Трофимовна',NULL,NULL,'vk','skype','telega','1','Дневная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Биологический факультет','Биология 06.04.01 (Магистратура)'),('1','xicaxas@storiqax.com','12345678','Лиана','Кожевина','Тимуровна',NULL,NULL,'','','','5','Дневная','Саратовский Государственный Университет имени Н. Г. Чернышевского','Факультет психолого-педагогического и специального образования','Психолого-педагогическое образование 44.03.02 (Бакалавриат)');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-05 16:27:02
