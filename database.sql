-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 21, 2021 at 02:05 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `o-clock`
--

-- --------------------------------------------------------

--
-- Table structure for table `Memory`
--

CREATE TABLE `Memory` (
  `Id` int(11) NOT NULL,
  `finishDate` date NOT NULL,
  `finishTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Memory`
--

INSERT INTO `Memory` (`Id`, `finishDate`, `finishTime`) VALUES
(1, '2021-05-17', '05:35:00'),
(2, '2021-05-04', '02:47:00'),
(3, '2021-05-08', '03:47:00'),
(4, '2021-05-16', '01:45:00'),
(5, '2021-05-05', '00:03:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Memory`
--
ALTER TABLE `Memory`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Memory`
--
ALTER TABLE `Memory`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
