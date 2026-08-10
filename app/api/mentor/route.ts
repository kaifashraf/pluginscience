import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use a dedicated Google Sheet for Mentors
const GOOGLE_SHEET_URL = process.env.MENTOR_GOOGLE_SHEET_URL || '';
const SHEET_SECRET_TOKEN = process.env.GOOGLE_SHEET_SECRET || '';

export async function POST(request: Request) {
  try {
    console.log('[MENTOR] POST request received');
    const formData = await request.formData();

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || '';
    const country = (formData.get('country') as string) || '';
    const city = (formData.get('city') as string) || '';
    const currentCompany = (formData.get('currentCompany') as string) || '';
    const currentPosition = (formData.get('currentPosition') as string) || '';
    const expertise = (formData.get('expertise') as string) || '';
    const yearsExperience = (formData.get('yearsExperience') as string) || '';
    const linkedinUrl = (formData.get('linkedinUrl') as string) || '';
    const portfolioUrl = (formData.get('portfolioUrl') as string) || '';
    const mentoringCategories = (formData.get('mentoringCategories') as string) || '';
    const availability = (formData.get('availability') as string) || '';
    const languages = (formData.get('languages') as string) || '';
    const shortBio = (formData.get('shortBio') as string) || '';
    const motivation = (formData.get('motivation') as string) || '';
    const cvFile = formData.get('cv') as File | null;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabaseUrl = 'https://amoztyohuhfesjyrxmty.supabase.co';
    const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

    if (!serviceKey) {
      console.error('[MENTOR] Missing SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    let cvPublicUrl = '';
    let cvFileName = '';
    let cvMimeType = '';

    // 1. Upload CV to Supabase Storage
    if (cvFile && cvFile.size > 0) {
      cvFileName = cvFile.name;
      cvMimeType = cvFile.type;
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `mentor_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(fileName, cvFile, {
          contentType: cvFile.type,
          upsert: false
        });

      if (uploadError) {
        console.error('[MENTOR] CV upload error:', uploadError);
      } else {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('resumes')
          .getPublicUrl(fileName);
        cvPublicUrl = publicUrlData.publicUrl;
      }
    }

    // 2. Sync to Google Sheet + Drive (Mentors folder)
    let cvDriveUrl = '';
    try {
      const sheetRes = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          token: SHEET_SECRET_TOKEN,
          type: 'mentor',           // tells the Apps Script to use the Mentors folder/sheet
          firstName, lastName, email, phone, country, city,
          currentCompany, currentPosition, expertise, yearsExperience,
          linkedinUrl, portfolioUrl, mentoringCategories, availability,
          languages, shortBio, motivation,
          resumePublicUrl: cvPublicUrl,
          resumeFileName: cvFileName,
          resumeMimeType: cvMimeType,
        })
      });
      const sheetJson = await sheetRes.json();
      console.log('[MENTOR] Google Sheets response:', sheetJson);
      if (sheetJson.driveUrl) cvDriveUrl = sheetJson.driveUrl;
    } catch (err) {
      console.error('[MENTOR] Google Sheets/Drive sync error:', err);
    }

    // 3. Insert into Supabase Database
    const { error } = await supabaseAdmin
      .from('mentor_applications')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        country,
        city,
        current_company: currentCompany,
        current_position: currentPosition,
        expertise,
        years_experience: yearsExperience,
        linkedin_url: linkedinUrl,
        portfolio_url: portfolioUrl,
        mentoring_categories: mentoringCategories ? mentoringCategories.split(',') : [],
        availability,
        languages,
        short_bio: shortBio,
        motivation,
        cv_url: cvDriveUrl || cvPublicUrl || null,
      }]);

    if (error) {
      console.error('[MENTOR] Supabase insert error:', JSON.stringify(error));
      return NextResponse.json({ error: 'Failed to submit application', detail: error.message, code: error.code }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('[MENTOR] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', detail: error?.message || String(error) }, { status: 500 });
  }
}
