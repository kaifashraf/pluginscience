import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClient() {
  const cookieStore = cookies();
  
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (!url.startsWith('http')) url = 'https://dummy.supabase.co';
  
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!key || key === 'undefined') key = 'dummy';

  return createServerClient(url, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Server component — cookie set ignored
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Server component — cookie removal ignored
          }
        },
      },
    }
  );
}

export function createServiceRoleClient() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (!url.startsWith('http')) url = 'https://dummy.supabase.co';
  
  let key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key || key === 'undefined') key = 'dummy';

  return createServerClient(url, key, {
      cookies: {
        get() { return undefined; },
        set() {},
        remove() {},
      },
    }
  );
}
