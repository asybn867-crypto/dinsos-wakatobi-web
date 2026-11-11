ALTER TABLE auth_users ADD COLUMN mfa_secret_enc TEXT;
ALTER TABLE auth_users ADD COLUMN mfa_enabled INTEGER NOT NULL DEFAULT 0 CHECK (mfa_enabled IN (0,1));
ALTER TABLE auth_users ADD COLUMN mfa_last_step INTEGER NOT NULL DEFAULT -1;
CREATE TABLE IF NOT EXISTS auth_login_challenges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_auth_login_challenges_expiry ON auth_login_challenges(expires_at);
CREATE TABLE IF NOT EXISTS auth_recovery_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(user_id,code_hash)
);
CREATE INDEX IF NOT EXISTS idx_auth_recovery_codes_user ON auth_recovery_codes(user_id,used_at);
