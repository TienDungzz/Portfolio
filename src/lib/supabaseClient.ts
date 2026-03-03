import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Lấy thông tin kết nối từ biến môi trường của Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Thiếu Supabase URL hoặc Anon Key. Vui lòng kiểm tra file .env.');
}

// Khởi tạo Supabase client với kiểu dữ liệu
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
