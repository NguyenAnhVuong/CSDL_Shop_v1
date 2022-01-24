-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: csdl_shop
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'unknown',
  `email` varchar(40) NOT NULL DEFAULT 'unknown',
  `password` varchar(200) NOT NULL,
  `address` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `phone_number` char(20) NOT NULL DEFAULT '',
  `gender` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'unknown',
  `birthday` date DEFAULT NULL,
  `user_avatar` varchar(200) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyễn Anh Vương','navuong2001@gmail.com','$2b$10$xUUfU1q49Q9y6uchUpdwWe8hqsBlxPaJPZ3mPd6kI95b9meJvklFq','','','Nam','2001-08-30',NULL,'2022-01-22 17:19:18'),(2,'Đào Ngọc Bản','bandeptrai@gmail.com','$2b$10$C1PV8g4XMC.e7.bj1xFro.XR7o6kPbc6RBXmr6lXXHsRsxgRwhN/y','phường Tam Sơn, thành phố Từ Sơn, tỉnh Bắc Ninh','0912322893','Nam','2001-01-01','images-1642873631824.jpg','2022-01-22 17:48:47'),(3,'Nguyễn Tiến Việt','vietphe@gmail.com','$2b$10$Ua6O4endPKKMrfvsTyh3XOkBuPO90mUkZ1SdJqQARVAwodVoEaXze','khu 2 Hoàng Thương - Thanh Ba - Phú Thọ','0123456789','Nam','2002-12-31','images-1642910554496.jpg','2022-01-23 04:05:40'),(4,'Ngô Bá Khá','khabanh@gmail.com','$2b$10$47ScfI8G3uu8QEpi3QW.1enr321njgRmqSg4G6mTBdw7vFXXzrz3y','phường Tam Sơn, thành phố Từ Sơn, tỉnh Bắc Ninh','0981234563','Nam','1993-11-27','images-1642917085866.png','2022-01-23 05:51:27'),(5,'Nguyễn Tiến Việt','nguyentienviet@gmail.com','$2b$10$XxyZj7xsA8CmWbOol3YR1.GsdsLEIAUzAOg/Yf9dNxJtSLEWK51sa','khu 2 Hoàng Thương - Thanh Ba - Phú Thọ','098765432','Nam','2001-01-01','images-1642921781262.png','2022-01-23 07:10:14'),(6,'Nguyễn Hồng Phương','phuongnh@gmail.com','$2b$10$meA0HjE71aelUhItmwGdPOBeXDvbLxKNpIZkuriNCtV8zLaqPgu.W','','','Nam','2022-01-24',NULL,'2022-01-23 07:18:42');
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

-- Dump completed on 2022-01-24 19:24:10
