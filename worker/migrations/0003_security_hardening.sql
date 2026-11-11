ALTER TABLE auth_users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0 CHECK (must_change_password IN (0,1));
CREATE TABLE IF NOT EXISTS security_events (
  id TEXT PRIMARY KEY,
  actor_email TEXT,
  actor_ip_hash TEXT,
  event TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_actor ON security_events(actor_email,created_at DESC);
