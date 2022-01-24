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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'unknown',
  `product_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_avatar` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `new_product` int DEFAULT '1',
  `price` int DEFAULT '0',
  `discount` int DEFAULT '0',
  `bought_count` int DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (6,'Basic Sweater - Black','sweater','images-1642872877384.jpg',1,300000,20,0),(8,'Donut Zip Hoodie - Black','hoodie','images-1642872945794.jpg',1,300000,0,1),(9,'Jacket University','jacket','images-1642873004617.jpg',1,300000,0,0),(10,'Mascot Hand Fan Jacket','jacket','images-1642873034906.jpeg',1,300000,20,0),(11,'Mascot Jacket - Black','jacket','images-1642873083136.jpeg',1,300000,20,0),(12,'Monogram Jacket','jacket','images-1642873104864.jpg',1,300000,10,0),(13,'OutDoor Jacket YB','jacket','images-1642873149555.jpg',1,300000,10,0),(14,'1M Bucket','accessory','images-1642873197387.jpg',1,300000,30,1),(15,'1M Shoulder Bag','accessory','images-1642873222412.jpg',1,320000,40,1),(17,'2 Panel Polo Shirt - WB','tee','images-1642909946151.jpg',1,300000,0,0),(18,'Basic Shirt - Black','tee','images-1642909979375.jpg',1,300000,30,0),(19,'Basic Shirt - White','tee','images-1642910023273.jpg',1,300000,10,0),(20,'Blossom Flower Tee 2022 - Black','tee','images-1642910059925.jpg',1,320000,0,0),(21,'Good Kid - White','tee','images-1642910093341.jpg',1,320000,20,0),(22,'Indomitable Tee - Black','tee','images-1642910121736.jpg',1,320000,20,0),(24,'On The Ride','tee','images-1642911404900.jpg',1,300000,0,0),(28,'Monogram Tee','tee','images-1642915356559.jpg',1,300000,0,0),(29,'Sweater Tiedye - Rainbow','sweater','images-1642915410850.jpg',1,350000,0,0),(30,'Basic Sweater - White','sweater','images-1642915453443.jpg',1,300000,0,0),(31,'Basic pants - Black','Pants','images-1642915534493.jpg',1,320000,0,0),(32,'Reflective Line Pant','Pants','images-1642915658811.jpeg',1,380000,0,0),(33,'Terry Short - Black','Pants','images-1642915690140.jpg',1,300000,0,0),(34,'Trousers Black','Pants','images-1642915706054.jpeg',1,300000,0,0),(35,'8-Ball Hoodie - Black','hoodie','images-1642915808018.jpg',1,480000,0,0),(36,'8-Ball Sweater','sweater','images-1642915856002.jpg',1,380000,0,0),(37,'Hot & Cold Sweater','sweater','images-1642915917368.jpg',1,380000,0,1),(38,'Mascot Tattooss Hoodie - White','hoodie','images-1642915958650.jpg',1,450000,0,0),(39,'Paint Mascot Hoodie - Tan','hoodie','images-1642915996096.jpg',1,390000,10,0),(40,'Wallet - BlackYellow','accessory','images-1642916038101.jpg',1,280000,10,0),(41,'Tote Bag CanvasWhite','accessory','images-1642916097667.jpg',1,150000,30,0),(42,'Tote Bag CanvasBlack','accessory','images-1642916143927.jpg',1,150000,30,0),(43,'Tote Bag Canvas - Pink Light Blue','accessory','images-1642916178760.jpg',1,150000,50,0),(44,'Monogram Backpack','accessory','images-1642916219062.jpg',1,450000,0,0),(45,'Minibag Heart Pattern - White','accessory','images-1642916255261.jpeg',1,300000,10,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
