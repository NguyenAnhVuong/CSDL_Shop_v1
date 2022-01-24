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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (18,8,'images-1642872955808.jpg'),(19,8,'images-1642872955810.jpg'),(20,8,'images-1642872955813.jpeg'),(21,8,'images-1642872955816.jpeg'),(23,9,'images-1642873011264.jpg'),(26,10,'images-1642873041049.jpeg'),(27,10,'images-1642873041051.jpg'),(33,12,'images-1642873108773.jpg'),(34,12,'images-1642873108775.jpg'),(35,12,'images-1642873108778.jpg'),(37,13,'images-1642873152380.jpg'),(44,14,'images-1642873202436.jpg'),(45,14,'images-1642873202439.jpg'),(46,14,'images-1642873202452.jpg'),(47,15,'images-1642873230286.jpg'),(48,15,'images-1642873230288.jpg'),(49,15,'images-1642873230301.jpg'),(62,11,'images-1642873090565.jpeg'),(63,11,'images-1642873090567.jpg'),(65,17,'images-1642909961923.jpg'),(66,17,'images-1642909961928.jpg'),(67,17,'images-1642909961939.jpg'),(68,18,'images-1642909988871.jpg'),(69,19,'images-1642910029668.jpg'),(70,20,'images-1642910067409.jpg'),(71,20,'images-1642910067412.jpg'),(72,21,'images-1642910105185.jpg'),(73,21,'images-1642910105199.jpg'),(74,21,'images-1642910105205.jpg'),(75,21,'images-1642910105210.jpg'),(76,22,'images-1642910133025.jpg'),(77,22,'images-1642910133027.jpg'),(78,22,'images-1642910133030.jpg'),(85,24,'images-1642911416996.jpg'),(86,24,'images-1642911416998.jpg'),(87,24,'images-1642911417003.jpg'),(106,28,'images-1642915360921.jpg'),(107,28,'images-1642915360927.jpg'),(108,28,'images-1642915360933.jpg'),(110,30,'images-1642915460826.jpg'),(112,29,'images-1642915414584.jpg'),(127,31,'images-1642915540901.jpg'),(128,31,'images-1642915540902.jpg'),(129,31,'images-1642915540905.jpg'),(130,32,'images-1642915667714.jpeg'),(131,32,'images-1642915667716.jpg'),(137,33,'images-1642915693714.jpg'),(138,33,'images-1642915693717.jpg'),(139,34,'images-1642915710429.jpeg'),(140,34,'images-1642915710442.png'),(141,34,'images-1642915710446.png'),(145,35,'images-1642915812664.jpg'),(148,36,'images-1642915862041.jpg'),(149,36,'images-1642915862046.jpg'),(152,37,'images-1642915921110.jpg'),(153,37,'images-1642915921112.jpg'),(154,38,'images-1642915967335.jpg'),(155,38,'images-1642915967337.jpg'),(156,39,'images-1642916014122.jpg'),(157,39,'images-1642916014124.jpg'),(158,40,'images-1642916053437.jpg'),(159,40,'images-1642916053440.jpg'),(162,41,'images-1642916107031.jpg'),(163,41,'images-1642916107033.jpg'),(166,42,'images-1642916153219.jpg'),(167,42,'images-1642916153232.jpg'),(168,43,'images-1642916192381.jpg'),(169,44,'images-1642916227826.jpg'),(170,44,'images-1642916227837.jpg'),(171,44,'images-1642916227844.jpg'),(175,45,'images-1642916261053.jpeg'),(176,45,'images-1642916261053.jpeg'),(177,45,'images-1642916261067.jpeg'),(245,6,'images-1642872890800.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
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
