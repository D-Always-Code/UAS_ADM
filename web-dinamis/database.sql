-- ==========================================
-- Database Schema: uas_adm_doni (Iron & Blade)
-- ==========================================

CREATE DATABASE IF NOT EXISTS `uas_adm_doni`;
USE `uas_adm_doni`;

-- 1. Tabel Users (Untuk Login Admin)
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Password default: 'admin123' (sudah di-hash dengan bcrypt)
INSERT IGNORE INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$JuSsw.wJw8f.E0cqmPfpY.YqClcIgZuYVH18jEDDHsjMgDLxvKUU6', 'admin');


-- 2. Tabel Berita (Untuk Perkamen Lore)
CREATE TABLE IF NOT EXISTS `berita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `excerpt` text NOT NULL,
  `konten` longtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data Awal Perkamen Lore (4 Kisah Hardcoded Sebelumnya)
INSERT IGNORE INTO `berita` (`judul`, `slug`, `excerpt`, `konten`, `image`, `is_published`, `created_at`) VALUES
('Pedang Damascus Generasi Ke-7 Telah Selesai Ditempa', 'pedang-damascus-generasi-ke-7', 'Setelah 77 hari di dalam tungku, bilah Damascus dengan 1024 lapisan baja diselesaikan oleh Master Aldric sendiri.', 'Setelah 77 hari di dalam tungku yang tak pernah padam, bilah Damascus dengan 1024 lapisan baja akhirnya diselesaikan oleh Master Aldric sendiri. Senjata ini bukan sekadar alat penebas, melainkan mahakarya yang mewarisi tekad para leluhur The Forge.', '⚔️', 1, '2026-06-01 10:00:00'),
('Bijih Besi Biru Ditemukan di Pegunungan Utara', 'bijih-besi-biru-utara', 'Tim ekspedisi kami menemukan bijih besi biru langka — konon tidak bisa ditembus oleh panah biasa manapun.', 'Tim ekspedisi penambang dari The Forge yang dikirim ke Pegunungan Utara akhirnya membawa kabar gembira. Mereka telah mengamankan urat bijih besi biru yang sangat langka. Zirah yang ditempa dari bahan ini konon tidak akan bisa ditembus oleh panah biasa manapun.', '💎', 1, '2026-05-25 09:30:00'),
('The Forge Kini Hadir di Pelabuhan Timur', 'cabang-pelabuhan-timur', 'Iron & Blade membuka bengkel kedua — melayani para pelaut dan pedagang yang berlayar melewati Selat Naga.', 'Kabar baik bagi para pedagang keliling dan ksatria pelaut! Iron & Blade resmi membuka tungku api kedua mereka di Pelabuhan Timur. Kini perbaikan pedang dan zirah dapat dilakukan sebelum kapal kalian melintasi Selat Naga yang berbahaya.', '🔥', 1, '2026-05-10 14:00:00'),
('Koleksi Busur Elvish Kini Tersedia', 'koleksi-busur-elvish', 'Busur dari kayu Yew pilihan diperkuat resin Dragonwood — terinspirasi dari teknik kuno pengrajin Elvish Woodland.', 'Setelah bertahun-tahun mempelajari gulungan perkamen tua dari Hutan Woodland, pengrajin kami berhasil meracik resin Dragonwood. Dipadukan dengan kayu Yew pilihan, busur edisi terbatas ini menjanjikan jangkauan tembak yang mematikan dan nyaris tak bersuara.', '🏹', 1, '2026-05-02 08:15:00');



-- 3. Tabel Kontak (Untuk Surat Gagak Masuk / Pesanan)
CREATE TABLE IF NOT EXISTS `kontak` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subjek` varchar(150) DEFAULT NULL,
  `pesan` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 4. Tabel Layanan (Katalog Armory - Sudah disesuaikan!)
CREATE TABLE IF NOT EXISTS `layanan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(150) NOT NULL,
  `kategori` varchar(100) DEFAULT NULL,
  `harga` varchar(50) DEFAULT NULL,
  `kekuatan` varchar(50) DEFAULT NULL,
  `icon` varchar(50) DEFAULT '⚔️',
  `deskripsi` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data Awal Senjata (Contoh)
INSERT IGNORE INTO `layanan` (`nama`, `kategori`, `harga`, `kekuatan`, `icon`, `deskripsi`, `image`, `urutan`) VALUES
('Excalibur Echo', 'Longsword / Great Sword', '850 ⚜', '1200 MPa', '⚔️', 'Ditempa di bawah cahaya bulan purnama. Memiliki aura putih yang dapat membutakan musuh dalam sekejap.', 'https://images.unsplash.com/photo-1590261352482-1e907e5f385c?q=80&w=600&auto=format&fit=crop', 1),
('Shadow Dagger', 'Dagger / Stiletto', '320 ⚜', '450 MPa', '🗡️', 'Sangat ringan, tak bersuara, dan dilapisi racun basilisk pada ujungnya. Favorit para Assassin.', 'https://images.unsplash.com/photo-1608670868846-9cfd91f42296?q=80&w=600&auto=format&fit=crop', 2);
