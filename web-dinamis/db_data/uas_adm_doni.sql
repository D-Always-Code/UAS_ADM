-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Jun 2026 pada 06.57
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
-- Database: `uas_adm_doni`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `excerpt` text NOT NULL,
  `konten` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `berita`
--

INSERT INTO `berita` (`id`, `judul`, `slug`, `excerpt`, `konten`, `image`, `is_published`, `created_at`) VALUES
(1, 'Pedang Damascus Generasi Ke-7 Telah Selesai Ditempa', 'pedang-damascus-generasi-ke-7', 'Setelah 77 hari di dalam tungku, bilah Damascus dengan 1024 lapisan baja diselesaikan oleh Master Aldric sendiri.', 'Setelah 77 hari di dalam tungku yang tak pernah padam, bilah Damascus dengan 1024 lapisan baja akhirnya diselesaikan oleh Master Aldric sendiri. Senjata ini bukan sekadar alat penebas, melainkan mahakarya yang mewarisi tekad para leluhur The Forge.', '⚔️', 1, '2026-06-01 03:00:00'),
(2, 'Bijih Besi Biru Ditemukan di Pegunungan Utara', 'bijih-besi-biru-utara', 'Tim ekspedisi kami menemukan bijih besi biru langka — konon tidak bisa ditembus oleh panah biasa manapun.', 'Tim ekspedisi penambang dari The Forge yang dikirim ke Pegunungan Utara akhirnya membawa kabar gembira. Mereka telah mengamankan urat bijih besi biru yang sangat langka. Zirah yang ditempa dari bahan ini konon tidak akan bisa ditembus oleh panah biasa manapun.', '💎', 1, '2026-05-25 02:30:00'),
(3, 'The Forge Kini Hadir di Pelabuhan Timur', 'cabang-pelabuhan-timur', 'Iron & Blade membuka bengkel kedua — melayani para pelaut dan pedagang yang berlayar melewati Selat Naga.', 'Kabar baik bagi para pedagang keliling dan ksatria pelaut! Iron & Blade resmi membuka tungku api kedua mereka di Pelabuhan Timur. Kini perbaikan pedang dan zirah dapat dilakukan sebelum kapal kalian melintasi Selat Naga yang berbahaya.', '🔥', 1, '2026-05-10 07:00:00'),
(4, 'Koleksi Busur Elvish Kini Tersedia', 'koleksi-busur-elvish', 'Busur dari kayu Yew pilihan diperkuat resin Dragonwood — terinspirasi dari teknik kuno pengrajin Elvish Woodland.', 'Setelah bertahun-tahun mempelajari gulungan perkamen tua dari Hutan Woodland, pengrajin kami berhasil meracik resin Dragonwood. Dipadukan dengan kayu Yew pilihan, busur edisi terbatas ini menjanjikan jangkauan tembak yang mematikan dan nyaris tak bersuara.', '🏹', 1, '2026-05-02 01:15:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kontak`
--

CREATE TABLE `kontak` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subjek` varchar(150) DEFAULT NULL,
  `pesan` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `layanan`
--

CREATE TABLE `layanan` (
  `id` int(11) NOT NULL,
  `nama` varchar(150) NOT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `harga` varchar(50) DEFAULT NULL,
  `kekuatan` varchar(50) DEFAULT NULL,
  `icon` varchar(50) DEFAULT '⚔️',
  `deskripsi` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `layanan`
--

INSERT INTO `layanan` (`id`, `nama`, `kategori`, `harga`, `kekuatan`, `icon`, `deskripsi`, `image`, `urutan`) VALUES
(1, 'Excalibur Echo', 'Longsword / Great Sword', '850 ⚜', '1200 MPa', '⚔️', 'Ditempa di bawah cahaya bulan purnama. Memiliki aura putih yang dapat membutakan musuh dalam sekejap.', 'https://images.unsplash.com/photo-1590261352482-1e907e5f385c?q=80&w=600&auto=format&fit=crop', 1),
(2, 'Shadow Dagger', 'Dagger / Stiletto', '320 ⚜', '450 MPa', '🗡️', 'Sangat ringan, tak bersuara, dan dilapisi racun basilisk pada ujungnya. Favorit para Assassin.', 'https://images.unsplash.com/photo-1608670868846-9cfd91f42296?q=80&w=600&auto=format&fit=crop', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$JuSsw.wJw8f.E0cqmPfpY.YqClcIgZuYVH18jEDDHsjMgDLxvKUU6', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `layanan`
--
ALTER TABLE `layanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
