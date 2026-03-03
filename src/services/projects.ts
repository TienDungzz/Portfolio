import { supabase } from '../lib/supabaseClient';
import type { Database } from '../types/supabase';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

/**
 * Lấy danh sách tất cả các dự án (Tối đa 20 dự án mới nhất)
 */
export async function getProjects(): Promise<ProjectRow[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error fetching projects:', error.message);
        throw new Error(error.message);
    }

    return data || [];
}

/**
 * Lấy thông tin chi tiết một dự án dựa trên ID
 */
export async function getProjectById(id: string): Promise<ProjectRow | null> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching project with id ${id}:`, error.message);
        return null;
    }

    return data;
}
