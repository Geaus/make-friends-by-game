CREATE DATABASE  IF NOT EXISTS `make_friend` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `make_friend`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: make_friend
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_list`
--

DROP TABLE IF EXISTS `chat_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_list` (
  `list_id` int NOT NULL AUTO_INCREMENT,
  `link_id` int DEFAULT NULL,
  `from_user` int DEFAULT NULL,
  `to_user` int DEFAULT NULL,
  `from_window` int DEFAULT NULL,
  `to_window` int DEFAULT NULL,
  `unread` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`list_id`),
  KEY `list_link_id_idx` (`link_id`),
  KEY `list_from_user_idx` (`from_user`),
  KEY `list_to_user_idx` (`to_user`),
  CONSTRAINT `list_from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`),
  CONSTRAINT `list_link_id` FOREIGN KEY (`link_id`) REFERENCES `chat_user_link` (`link_id`),
  CONSTRAINT `list_to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_list`
--

LOCK TABLES `chat_list` WRITE;
/*!40000 ALTER TABLE `chat_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `link_id` int DEFAULT NULL,
  `from_user` int DEFAULT NULL,
  `to_user` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `send_time` varchar(45) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `is_latest` int DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `mess_link_id_idx` (`link_id`),
  KEY `mess_from_user_idx` (`from_user`),
  KEY `mess_to_user_idx` (`to_user`),
  CONSTRAINT `mess_from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`),
  CONSTRAINT `mess_link_id` FOREIGN KEY (`link_id`) REFERENCES `chat_user_link` (`link_id`),
  CONSTRAINT `mess_to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_user_link`
--

DROP TABLE IF EXISTS `chat_user_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_user_link` (
  `link_id` int NOT NULL AUTO_INCREMENT,
  `from_user` int DEFAULT NULL,
  `to_user` int DEFAULT NULL,
  `create_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`link_id`),
  KEY `link_from_user_idx` (`from_user`),
  KEY `link_to_user_idx` (`to_user`),
  CONSTRAINT `link_from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`),
  CONSTRAINT `link_to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_user_link`
--

LOCK TABLES `chat_user_link` WRITE;
/*!40000 ALTER TABLE `chat_user_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_user_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-10 20:01:02
