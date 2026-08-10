-- Run this in the Supabase SQL Editor to add the mentor_applications table
-- ============================================================
-- MENTOR APPLICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  city TEXT,
  current_company TEXT,
  current_position TEXT,
  expertise TEXT,
  years_experience TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  mentoring_categories TEXT[],
  availability TEXT,
  languages TEXT,
  short_bio TEXT,
  motivation TEXT,
  cv_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE mentor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (public form)
CREATE POLICY "Anyone can submit mentor application"
  ON mentor_applications FOR INSERT WITH CHECK (true);

-- Only admins can view submitted applications
CREATE POLICY "Only admins can view mentor applications"
  ON mentor_applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
