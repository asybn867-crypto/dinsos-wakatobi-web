CREATE TABLE IF NOT EXISTS complaints (
 id TEXT PRIMARY KEY,
 category TEXT NOT NULL CHECK(category IN ('bantuan-sosial','perlindungan','rehabilitasi','data','lainnya')),
 title TEXT NOT NULL,
 description TEXT NOT NULL,
 tracking_hash TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'diterima' CHECK(status IN ('diterima','ditinjau','ditindaklanjuti','selesai')),
 public_update TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_complaints_created ON complaints(created_at DESC);
CREATE TABLE IF NOT EXISTS complaint_rate_limits (
 rate_key TEXT PRIMARY KEY,
 window_start INTEGER NOT NULL,
 attempts INTEGER NOT NULL
);