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
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `faculty` (
  `faculty_name` varchar(100) NOT NULL,
  `faculty_university` varchar(100) NOT NULL,
  PRIMARY KEY (`faculty_name`),
  KEY `faculty_university` (`faculty_university`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`faculty_university`) REFERENCES `university` (`university_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES ('Институт прикладных информационных технологий','Саратовский государственный технический университет имени Ю. А. Гагарина'),('Биологический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Географический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Геологический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт дополнительного профессионального образования','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт искусств','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт истории и международных отношений','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт физической культуры и спорта','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт филологии и журналистики','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Институт химии','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Механико-математический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Социологический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет иностранных языков и лингводидактики','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет компьютерных наук и информационных технологий','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет нано- и биомедицинских технологий','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет нелинейных процессов','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет психологии','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Факультет психолого-педагогического и специального образования','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Физический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Философский факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Экономический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского'),('Юридический факультет','Саратовский Государственный Университет имени Н. Г. Чернышевского');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-05 16:27:06
