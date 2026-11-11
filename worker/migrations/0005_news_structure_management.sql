ALTER TABLE content_items ADD COLUMN source_name TEXT;
ALTER TABLE content_items ADD COLUMN source_url TEXT;
ALTER TABLE content_items ADD COLUMN published_at TEXT;
CREATE TABLE IF NOT EXISTS structure_units (
  id TEXT PRIMARY KEY,
  parent_id TEXT REFERENCES structure_units(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  office_holder TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order BETWEEN 0 AND 999),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0,1)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_structure_parent_order ON structure_units(parent_id, sort_order, name);
INSERT INTO structure_units (id,parent_id,name,description,sort_order,active,created_at,updated_at) VALUES
('kepala-dinas',NULL,'Kepala Dinas','Pimpinan dan penanggung jawab penyelenggaraan urusan sosial',0,1,'2026-11-10','2026-11-10'),
('sekretariat','kepala-dinas','Sekretariat','Program, anggaran, administrasi keuangan, kepegawaian, perlengkapan, dan urusan umum',1,1,'2026-11-10','2026-11-10'),
('bidang-perlindungan','kepala-dinas','Bidang Perlindungan dan Jaminan Sosial','Perlindungan sosial korban bencana serta jaminan sosial keluarga',2,1,'2026-11-10','2026-11-10'),
('bidang-rehabilitasi','kepala-dinas','Bidang Rehabilitasi Sosial','Rehabilitasi sosial anak, penyandang disabilitas, lanjut usia, dan kelompok yang membutuhkan pelayanan sosial',3,1,'2026-11-10','2026-11-10'),
('bidang-pemberdayaan','kepala-dinas','Bidang Pemberdayaan Sosial dan Penanganan Fakir Miskin','Pemberdayaan masyarakat, pengelolaan bantuan sosial, serta verifikasi dan validasi data fakir miskin',4,1,'2026-11-10','2026-11-10'),
('uptd','kepala-dinas','Unit Pelaksana Teknis Daerah (UPTD)','Pelaksana teknis operasional dan/atau penunjang sesuai pembentukan berdasarkan ketentuan',5,1,'2026-11-10','2026-11-10'),
('kelompok-jabatan-fungsional','kepala-dinas','Kelompok Jabatan Fungsional','Pelaksana tugas sesuai keahlian dan keterampilan masing-masing',6,1,'2026-11-10','2026-11-10'),
('subbagian-umum','sekretariat','Subbagian Umum dan Kepegawaian','',1,1,'2026-11-10','2026-11-10');