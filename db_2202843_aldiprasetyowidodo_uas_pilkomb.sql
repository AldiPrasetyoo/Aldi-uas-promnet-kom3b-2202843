-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jan 2024 pada 10.33
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2202843_aldiprasetyowidodo_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjamanbuku_aldiprasetyowidodo`
--

CREATE TABLE `peminjamanbuku_aldiprasetyowidodo` (
  `id` int(11) NOT NULL,
  `judul_buku` text NOT NULL,
  `jumlah` int(11) NOT NULL,
  `nama_peminjam` text NOT NULL,
  `alamat_peminjam` text NOT NULL,
  `noHp_peminjam` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_pengembalian` date NOT NULL,
  `lama_pinjam` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjamanbuku_aldiprasetyowidodo`
--

INSERT INTO `peminjamanbuku_aldiprasetyowidodo` (`id`, `judul_buku`, `jumlah`, `nama_peminjam`, `alamat_peminjam`, `noHp_peminjam`, `tanggal_pinjam`, `tanggal_pengembalian`, `lama_pinjam`) VALUES
(1, 'The Tarix Jabrix 2', 3, 'Aldi', 'Kp.Margajaya No 57', '085155274333', '2024-01-07', '2024-01-08', '1 Hari'),
(2, 'Belajar Golang', 2, 'Budi', 'Kp. Berkah No 78', '08155213211', '2024-01-03', '2024-01-05', '2 Hari'),
(3, 'Kok Susah Tidur?', 4, 'Rendy', 'Jalan Geger Kalong Baru No.25', '088124152511', '2024-01-01', '2024-01-01', '1 Hari'),
(4, 'Cara Mengemudikan Pesawat', 11, 'Raditya', 'Jalan Boeing 77', '08881929121', '2023-12-29', '2024-01-03', '6 Hari'),
(5, 'Aku Ingin Pintar Matematika', 2, 'Arsenio', 'Kp.Margasayu No 60', '081220142123', '2024-01-03', '2024-01-03', '1 Hari');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `peminjamanbuku_aldiprasetyowidodo`
--
ALTER TABLE `peminjamanbuku_aldiprasetyowidodo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `peminjamanbuku_aldiprasetyowidodo`
--
ALTER TABLE `peminjamanbuku_aldiprasetyowidodo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
