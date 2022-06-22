-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: filmverleih
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adresse` (
  `strasse` varchar(200) NOT NULL,
  `plz` varchar(45) NOT NULL,
  `stadt` varchar(200) DEFAULT NULL,
  `kundenID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`kundenID`,`plz`,`strasse`),
  CONSTRAINT `adresse_ibfk_1` FOREIGN KEY (`kundenID`) REFERENCES `kunde` (`kundenID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresse`
--

LOCK TABLES `adresse` WRITE;
/*!40000 ALTER TABLE `adresse` DISABLE KEYS */;
INSERT INTO `adresse` VALUES ('Bahnhofstraße 6','70000','Stuttgart',1),('Straßestraße 111','70022','Stuttgart',2),('Veilchen Weg 7','70001','Stuttgart',3),('Bahnhofstraße 6','70000',NULL,4);
/*!40000 ALTER TABLE `adresse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ausleihen`
--

DROP TABLE IF EXISTS `ausleihen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ausleihen` (
  `ausleihID` int NOT NULL AUTO_INCREMENT,
  `kundenID` int NOT NULL,
  `filmID` int NOT NULL,
  `ausleihDatum` date NOT NULL,
  `rueckgabeDatum` date DEFAULT NULL,
  `kosten` int DEFAULT NULL,
  PRIMARY KEY (`ausleihID`),
  KEY `kundenID` (`kundenID`),
  KEY `filmID` (`filmID`),
  CONSTRAINT `ausleihen_ibfk_1` FOREIGN KEY (`kundenID`) REFERENCES `kunde` (`kundenID`),
  CONSTRAINT `ausleihen_ibfk_2` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ausleihen`
--

LOCK TABLES `ausleihen` WRITE;
/*!40000 ALTER TABLE `ausleihen` DISABLE KEYS */;
INSERT INTO `ausleihen` VALUES (1,3,5,'2022-06-13','2022-06-21',40),(2,4,2,'2022-06-13','2022-06-21',40),(3,4,1,'2022-06-13','2022-06-21',40),(4,1,3,'2022-06-28','2022-06-30',10);
/*!40000 ALTER TABLE `ausleihen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `filmID` int NOT NULL AUTO_INCREMENT,
  `filmName` varchar(200) NOT NULL,
  `beschreibung` varchar(500) DEFAULT NULL,
  `regie` varchar(200) DEFAULT NULL,
  `kategorieName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`filmID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,'Inception','super dufte','Christopher Nolan','Klassiker'),(2,'Titanik','sinkendes Schiff','James Cameron','Klassiker'),(3,'Fluch der Karibik','priaten abenteuer','Gore Verbinski','Klassiker'),(4,'Fluch der Karibik 2','priaten abenteuer','Gore Verbinski','Klassiker'),(5,'Transformers','krasse roboter','Micheal Bay','Klassiker');
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genreName` varchar(200) NOT NULL,
  `filmID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`filmID`),
  CONSTRAINT `genre_ibfk_1` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES ('Sci-Fi',1),('Drama',2),('Action',3),('Action',4),('Sci-Fi',5);
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorie`
--

DROP TABLE IF EXISTS `kategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorie` (
  `kategorieName` varchar(200) NOT NULL,
  `preis` int NOT NULL,
  `rabatt` int DEFAULT NULL,
  PRIMARY KEY (`kategorieName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorie`
--

LOCK TABLES `kategorie` WRITE;
/*!40000 ALTER TABLE `kategorie` DISABLE KEYS */;
INSERT INTO `kategorie` VALUES ('Klassiker',5,NULL),('Neuerscheinung',6,NULL),('Normal',3,NULL);
/*!40000 ALTER TABLE `kategorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kunde`
--

DROP TABLE IF EXISTS `kunde`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunde` (
  `kundenID` int NOT NULL AUTO_INCREMENT,
  `vorname` varchar(200) DEFAULT NULL,
  `nachname` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`kundenID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunde`
--

LOCK TABLES `kunde` WRITE;
/*!40000 ALTER TABLE `kunde` DISABLE KEYS */;
INSERT INTO `kunde` VALUES (1,'Georg','Buehler','georgbuehler@mail.com'),(2,'Moritz','Zucker','mortizzucker@mail.com'),(3,'Lam Tiep','Nguyen','lamtiepnguyen@mail.com'),(4,'Max','Mustermann','maxmusti@mail.com');
/*!40000 ALTER TABLE `kunde` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservieren`
--

DROP TABLE IF EXISTS `reservieren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservieren` (
  `reservierDatum` date NOT NULL,
  `reservierFrist` date NOT NULL,
  `kundenID` int NOT NULL,
  `filmID` int NOT NULL,
  `reservierID` int NOT NULL,
  PRIMARY KEY (`reservierID`),
  KEY `kundenID` (`kundenID`),
  KEY `filmID` (`filmID`),
  CONSTRAINT `reservieren_ibfk_1` FOREIGN KEY (`kundenID`) REFERENCES `kunde` (`kundenID`),
  CONSTRAINT `reservieren_ibfk_2` FOREIGN KEY (`filmID`) REFERENCES `film` (`filmID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservieren`
--

LOCK TABLES `reservieren` WRITE;
/*!40000 ALTER TABLE `reservieren` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservieren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schauspieler`
--

DROP TABLE IF EXISTS `schauspieler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schauspieler` (
  `filmID` int NOT NULL AUTO_INCREMENT,
  `schauspielerName` varchar(200) NOT NULL,
  PRIMARY KEY (`filmID`,`schauspielerName`),
  UNIQUE KEY `filmID_UNIQUE` (`filmID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schauspieler`
--

LOCK TABLES `schauspieler` WRITE;
/*!40000 ALTER TABLE `schauspieler` DISABLE KEYS */;
INSERT INTO `schauspieler` VALUES (1,'Leonardo DiCaprio'),(2,'Leonardo DiCaprio'),(3,'Johnny Depp'),(4,'Johnny Depp'),(5,'Megan Fox');
/*!40000 ALTER TABLE `schauspieler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-22 15:36:18
