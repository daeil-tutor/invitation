import { createClient } from "@supabase/supabase-js";

// Supabase 연결. 주소와 공개(anon) 키는 .env.local에서 읽는다.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    ".env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 넣어주세요.",
  );
}

export const supabase = createClient(url, anonKey);
