import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use a dedicated Google Sheet for Volunteers
const GOOGLE_SHEET_URL = process.env.VOLUNTEER_GOOGLE_SHEET_URL || '';
const SHEET_SECRET_TOKEN = process.env.GOOGLE_SHEET_SECRET || '';

// Debug endpoint to check if env vars are loaded
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '(missing)';
  const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasSheetSecret = Boolean(process.env.GOOGLE_SHEET_SECRET);
  return NextResponse.json({
    supabaseUrl: url.substring(0, 20) + '...',
    hasServiceKey,
    hasSheetSecret,
    nodeEnv: process.env.NODE_ENV,
  });
}

export async function POST(request: Request) {
  try {
    console.log('[VOLUNTEER] POST request received');
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || '';
    const college = formData.get('college') as string;
    const year = formData.get('year') as string;
    const role = formData.get('role') as string;
    const why = formData.get('why') as string;
    const resumeFile = formData.get('resume') as File | null;

    if (!name || !email || !college || !year || !role || !why) {
      console.log('[VOLUNTEER] Missing required fields:', { name: !!name, email: !!email, college: !!college, year: !!year, role: !!role, why: !!why });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hardcode the public Supabase URL to avoid any env var corruption issues on Netlify
    const supabaseUrl = 'https://amoztyohuhfesjyrxmty.supabase.co';
    const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

    if (!serviceKey) {
      console.error('[VOLUNTEER] Missing SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ error: 'Server configuration error: missing service key' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    let resumePublicUrl = '';
    let resumeFileName = '';
    let resumeMimeType = '';

    // 1. Upload to Supabase Storage first (Handles large files perfectly)
    if (resumeFile && resumeFile.size > 0) {
      resumeFileName = resumeFile.name;
      resumeMimeType = resumeFile.type;
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(fileName, resumeFile, {
          contentType: resumeFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading to Supabase Storage:', uploadError);
      } else {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('resumes')
          .getPublicUrl(fileName);
        resumePublicUrl = publicUrlData.publicUrl;
      }
    }

    // 2. Send the URL (not the massive base64 file) to Google Apps Script
    let resumeDriveUrl = '';
    try {
      const sheetRes = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          token: SHEET_SECRET_TOKEN,
          name, email, phone, college, year, role, why,
          resumePublicUrl,
          resumeFileName,
          resumeMimeType,
        })
      });
      const sheetJson = await sheetRes.json();
      console.log('Google Sheets response:', sheetJson);
      if (sheetJson.driveUrl) resumeDriveUrl = sheetJson.driveUrl;
    } catch (err) {
      console.error('Google Sheets/Drive sync error:', err);
    }

    // 3. Insert into Supabase Database
    const { error } = await supabaseAdmin
      .from('volunteers')
      .insert([{
        full_name: name,
        email,
        phone,
        college,
        year_of_study: year,
        preferred_role: role,
        reason: why,
        resume_url: resumeDriveUrl || resumePublicUrl || null,
      }]);

    if (error) {
      console.error('[VOLUNTEER] Supabase insert error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Failed to submit application', detail: error.message, code: error.code }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('[VOLUNTEER] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', detail: error?.message || String(error) }, { status: 500 });
  }
}

