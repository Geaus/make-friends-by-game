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
  `type` int DEFAULT NULL,
  `is_latest` int DEFAULT NULL,
  `send_time` varchar(45) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `media` mediumblob,
  PRIMARY KEY (`message_id`),
  KEY `mess_link_id_idx` (`link_id`),
  KEY `mess_from_user_idx` (`from_user`),
  KEY `mess_to_user_idx` (`to_user`),
  CONSTRAINT `mess_from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`),
  CONSTRAINT `mess_link_id` FOREIGN KEY (`link_id`) REFERENCES `chat_user_link` (`link_id`),
  CONSTRAINT `mess_to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (8,3,1,3,0,0,'2023-05-15 10:58:15','我是小明\n',NULL),(11,NULL,1,1,0,0,'2023-05-15 22:01:23','我是小明',NULL);
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
  `is_black` int DEFAULT NULL,
  `is_add` int DEFAULT NULL,
  PRIMARY KEY (`link_id`),
  KEY `link_from_user_idx` (`from_user`),
  KEY `link_to_user_idx` (`to_user`),
  CONSTRAINT `link_from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`id`),
  CONSTRAINT `link_to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_user_link`
--

LOCK TABLES `chat_user_link` WRITE;
/*!40000 ALTER TABLE `chat_user_link` DISABLE KEYS */;
INSERT INTO `chat_user_link` VALUES (3,1,3,'1',0,1),(4,3,1,'1',0,1),(5,2,3,'1',0,1),(6,3,2,'1',0,1),(10,1,4,'2023-06-16 20:09:32',0,1),(11,4,1,'2023-06-16 20:09:32',0,1);
/*!40000 ALTER TABLE `chat_user_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_user_rel`
--

DROP TABLE IF EXISTS `tag_user_rel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_user_rel` (
  `tagid` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  KEY `tag_user_rel_idx` (`tagid`),
  KEY `user_tag_rel_idx` (`userid`),
  CONSTRAINT `tag_user_rel` FOREIGN KEY (`tagid`) REFERENCES `tags` (`tagid`),
  CONSTRAINT `user_tag_rel` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_user_rel`
--

LOCK TABLES `tag_user_rel` WRITE;
/*!40000 ALTER TABLE `tag_user_rel` DISABLE KEYS */;
INSERT INTO `tag_user_rel` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `tag_user_rel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tagid` int NOT NULL AUTO_INCREMENT,
  `tagname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tagid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'二次元'),(2,'军事发烧友'),(3,'rap爱好者'),(4,'登山爱好者'),(5,'滑雪爱好者'),(6,'跳舞爱好者'),(7,'游戏发烧友'),(8,'属鼠'),(9,'原神'),(10,'LOL'),(11,'FPS爱好者'),(12,'KTV女王'),(13,'技术宅'),(14,'社恐'),(15,'社牛'),(16,'整活爱好者'),(17,'抽象艺术家'),(18,'美食家'),(19,'探险家'),(20,'牌佬');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'小明','1'),(2,'小红','2'),(3,'小李','3'),(4,'蓝蓝','4');
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

-- Dump completed on 2023-06-16 20:23:21
