import { useState, useEffect } from 'react';
import { getProjects } from '../services/projects';
import type { Database } from '../types/supabase';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

interface UseProjectsResult {
    projects: ProjectRow[];
    loading: boolean;
    error: string | null;
}

export function useProjects(): UseProjectsResult {
    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const data = await getProjects();
                setProjects(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Error loading projects');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return { projects, loading, error };
}
