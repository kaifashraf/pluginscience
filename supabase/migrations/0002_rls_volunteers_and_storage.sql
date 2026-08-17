-- ============================================================
-- RLS POLICIES FOR VOLUNTEERS TABLE & RESUMES STORAGE
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ── Volunteers table RLS ─────────────────────────────────────
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including unauthenticated visitors) to submit a volunteer application
CREATE POLICY "Anyone can submit volunteer application"
  ON volunteers FOR INSERT WITH CHECK (true);

-- Only admins can view volunteer applications
CREATE POLICY "Only admins can view volunteer applications"
  ON volunteers FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can update volunteer applications
CREATE POLICY "Only admins can update volunteer applications"
  ON volunteers FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can delete volunteer applications
CREATE POLICY "Only admins can delete volunteer applications"
  ON volunteers FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ── Resumes storage bucket ───────────────────────────────────
-- Create the 'resumes' bucket if it doesn't exist (public readable for download links)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to the resumes bucket
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- Allow public read access to resumes (for download links)
CREATE POLICY "Public read access to resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');

-- Only admins can delete resumes
CREATE POLICY "Only admins can delete resumes"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resumes' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
