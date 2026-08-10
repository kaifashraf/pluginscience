import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!url.startsWith('http')) {
    url = 'https://dummy.supabase.co';
  }
  if (!key || key === 'undefined') {
    key = 'dummy';
  }

  return createBrowserClient(url, key);
}
