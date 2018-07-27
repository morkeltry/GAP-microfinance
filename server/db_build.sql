-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_build`
--

-- --------------------------------------------------------

--
-- Table structure for table `accepted`
--

CREATE TABLE `accepted` (
  `id` smallint(6) NOT NULL,
  `fully_paid` tinyint(1) DEFAULT NULL,
  `start_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `repayment_schedule` varchar(1000) DEFAULT NULL,
  `lender_name` varchar(60) NOT NULL,
  `lender_eth_address` varchar(42) NOT NULL,
  `borrower_eth_address` varchar(42) NOT NULL,
  `amount` varchar(50) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `your_story` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `borrowers`
--

CREATE TABLE `borrowers` (
  `eth_address` varchar(42) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` smallint(6) NOT NULL,
  `borrower_eth_address` varchar(42) NOT NULL,
  `lender_eth_address` varchar(42) NOT NULL,
  `start_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `early_repayment_days` varchar(60) NOT NULL,
  `last_sync_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lenders`
--

CREATE TABLE `lenders` (
  `eth_address` varchar(150) NOT NULL,
  `name` varchar(60) NOT NULL,
  `capital` int(11) DEFAULT NULL,
  `min_amount` int(11) DEFAULT NULL,
  `max_amount` int(11) DEFAULT NULL,
  `min_duration` smallint(6) DEFAULT NULL,
  `max_duration` smallint(6) DEFAULT NULL,
  `preferred_amount` int(11) DEFAULT NULL,
  `preferred_duration` smallint(6) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lenders`
--

INSERT INTO `lenders` (`eth_address`, `name`, `capital`, `min_amount`, `max_amount`, `min_duration`, `max_duration`, `preferred_amount`, `preferred_duration`, `username`, `password`, `created_at`, `updated_at`) VALUES
('0x24a8ca2fa39ea49c9b01bdd99aa48257d8017543', 'tester', 1, 2500, 5000, 1, 3, 3000, 2, 'test', '123456', '2018-07-20 09:27:33', '2018-07-20 09:27:33');

--
-- Table structure for table `offered`
--

CREATE TABLE `offered` (
  `id` smallint(6) NOT NULL,
  `start_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_day` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `repayment_schedule` varchar(1000) NOT NULL,
  `lender_name` varchar(60) NOT NULL,
  `lender_eth_address` varchar(42) NOT NULL,
  `borrower_eth_address` varchar(42) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accepted`
--
ALTER TABLE `accepted`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowers`
--
ALTER TABLE `borrowers`
  ADD PRIMARY KEY (`eth_address`),
  ADD UNIQUE KEY `address_uniq_idx` (`eth_address`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lenders`
--
ALTER TABLE `lenders`
  ADD PRIMARY KEY (`eth_address`),
  ADD UNIQUE KEY `address_uniq_idx` (`eth_address`);

--
-- Indexes for table `offered`
--
ALTER TABLE `offered`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accepted`
--
ALTER TABLE `accepted`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
