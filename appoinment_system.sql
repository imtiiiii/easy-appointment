-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 05, 2022 at 01:42 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appoinment_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(13, 'database\\migrations\\1630641123973_users', 1, '2022-04-24 06:22:31'),
(14, 'database\\migrations\\1650445841970_time_slots', 2, '2022-04-24 06:25:08'),
(15, 'database\\migrations\\1650446648581_appointments', 2, '2022-04-24 06:25:09'),
(16, 'database\\migrations\\1650780582636_days', 2, '2022-04-24 06:25:09'),
(17, 'database\\migrations\\1650781704465_alter_time_slots_add_day_ids', 3, '2022-04-24 06:33:09'),
(18, 'database\\migrations\\1651121260667_appointments', 4, '2022-04-28 05:30:45'),
(19, 'database\\migrations\\1651121350777_appointments', 4, '2022-04-28 05:30:46');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(10) UNSIGNED NOT NULL,
  `time_slot_id` int(10) UNSIGNED NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(10) UNSIGNED DEFAULT NULL,
  `status` enum('0','1','2') COLLATE utf8mb4_bin DEFAULT '0',
  `agenda` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `time_slot_id`, `teacher_id`, `student_id`, `status`, `agenda`, `created_at`, `updated_at`, `date`) VALUES
(21, 90, 11, 12, '1', 'uu', '2022-09-05 10:23:21', '2022-09-05 10:38:30', '2022-09-26');

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int(10) UNSIGNED NOT NULL,
  `day_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `day_no` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`id`, `day_name`, `day_no`, `created_at`, `updated_at`) VALUES
(1, 'monday', 1, '2022-04-25 05:14:22', '2022-04-25 05:14:22'),
(2, 'tueday', 2, '2022-04-25 05:14:22', '2022-04-25 05:14:22'),
(3, 'wednesday', 3, '2022-04-25 05:14:43', '2022-04-25 05:14:43'),
(4, 'thursday', 4, '2022-04-25 05:14:43', '2022-04-25 05:14:43'),
(5, 'friday', 5, '2022-04-25 05:16:18', '2022-04-25 05:16:18'),
(6, 'satarday', 6, '2022-04-25 05:16:18', '2022-04-25 05:16:18'),
(7, 'sunday', 0, '2022-04-27 09:42:53', '2022-04-27 09:42:53');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(10) UNSIGNED NOT NULL,
  `teacher_id` int(10) UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `day_no_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `teacher_id`, `start_time`, `end_time`, `created_at`, `updated_at`, `day_no_id`) VALUES
(87, 11, '03:00:00', '06:00:00', '2022-09-05 10:20:53', '2022-09-05 10:20:53', 1),
(88, 11, '06:00:00', '09:00:00', '2022-09-05 10:20:53', '2022-09-05 10:20:53', 1),
(89, 11, '09:00:00', '12:00:00', '2022-09-05 10:20:53', '2022-09-05 10:20:53', 1),
(90, 11, '12:00:00', '15:00:00', '2022-09-05 10:20:53', '2022-09-05 10:20:53', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(180) COLLATE utf8mb4_bin NOT NULL,
  `user_type` enum('admin','teacher','student') COLLATE utf8mb4_bin NOT NULL,
  `student_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `course` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `dept` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` enum('0','1','2') COLLATE utf8mb4_bin DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `email`, `password`, `user_type`, `student_id`, `course`, `dept`, `status`, `created_at`, `updated_at`) VALUES
(9, 'admin', 'admin', 'admin_admin', 'admin@gmail.com', '$bcrypt$v=98$r=10$284Y4nOMciGz1hzHRjeijg$4MQDe/hGlquJ5AQP4ipSnJbZoB0Of5k', 'admin', NULL, NULL, 'admin', '1', '2022-04-28 11:13:26', '2022-04-28 11:13:26'),
(10, 'Imtiaz', 'Ahmed', 'Imtiaz_Ahmed', 'imtiaz@gmail.com', '$bcrypt$v=98$r=10$HiaENGQvF/4lI3qrp8rzRA$7Tv3lRhD83jb9w4M7H0puSqUayUWxAA', 'admin', NULL, NULL, NULL, '1', '2022-08-22 12:15:39', '2022-08-22 12:15:39'),
(11, 'test ', 'teacher', 'test _teacher', 'teacher1@gmail.com', '$bcrypt$v=98$r=10$T1KYFK+GlQI0UHGnh2mNgA$7CPYHn33okYXLP+W7oDHzqWzd51h1nc', 'teacher', NULL, NULL, 'cse', '1', '2022-08-22 12:17:58', '2022-08-22 12:17:58'),
(12, 'test', 'student', 'test_student', 'student1@gmail.com', '$bcrypt$v=98$r=10$8ya9eGgq3HiQFkHHxi9rJw$dVcFD50YIUJrCk4vqKeL/CHAInWxc5s', 'student', '211', NULL, 'cse', '1', '2022-08-22 12:24:52', '2022-08-22 12:24:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_time_slot_id_foreign` (`time_slot_id`),
  ADD KEY `appointments_student_id_foreign` (`student_id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `days_day_name_unique` (`day_name`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_slots_teacher_id_foreign` (`teacher_id`),
  ADD KEY `time_slots_day_id_foreign` (`day_no_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
