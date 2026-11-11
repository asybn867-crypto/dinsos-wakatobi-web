ALTER TABLE complaints ADD COLUMN contact_method TEXT NOT NULL DEFAULT 'email' CHECK(contact_method IN ('whatsapp','email'));
ALTER TABLE complaints ADD COLUMN contact_value TEXT NOT NULL DEFAULT '';
