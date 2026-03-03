import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { getProjectById } from '../services/projects';
import type { Database } from '../types/supabase';
import { Skeleton } from '../components/Skeleton';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDetail() {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getProjectById(id);
                if (data) {
                    setProject(data);
                } else {
                    setError('Project not found');
                }
            } catch (err: any) {
                setError(err.message || 'Error loading project');
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Skeleton className="h-8 w-32 mb-8" />
                <Skeleton className="h-64 w-full rounded-2xl mb-8" />
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{error || 'Project not found'}</h2>
                <Link to="/projects" className="text-blue-600 hover:underline">
                    Return to Projects
                </Link>
            </div>
        );
    }

    // Hàm tối ưu hóa URL Cloudinary
    const getOptimizedCloudinaryUrl = (url?: string) => {
        if (!url) return '';
        if (url.includes('cloudinary.com') && !url.includes('/upload/f_auto,q_auto/')) {
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        return url;
    };

    const homeImage = getOptimizedCloudinaryUrl(project.images?.home);
    const productImage = getOptimizedCloudinaryUrl(project.images?.product);
    const collectionImage = getOptimizedCloudinaryUrl(project.images?.collection);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 min-h-screen py-10"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 font-medium">
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{project.title}</h1>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech_stack?.map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-semibold">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex gap-4 mt-8">
                        {(project.show_github && project.github_url) && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
                                <Github size={20} /> View Source
                            </a>
                        )}
                        {(project.show_demo && project.demo_url) && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer shadow-lg shadow-blue-500/30">
                                <ExternalLink size={20} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Gallery Images */}
                <div className="space-y-12 pb-20">
                    {homeImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-2xl glass-dark"
                        >
                            <div className="bg-slate-800 py-3 px-6 text-white font-medium border-b border-white/10">Home Page</div>
                            <img src={homeImage} alt={`${project.title} Home`} className="w-full h-auto object-cover" loading="lazy" />
                        </motion.div>
                    )}

                    {productImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-2xl glass-dark"
                        >
                            <div className="bg-slate-800 py-3 px-6 text-white font-medium border-b border-white/10">Product Page</div>
                            <img src={productImage} alt={`${project.title} Product`} className="w-full h-auto object-cover" loading="lazy" />
                        </motion.div>
                    )}

                    {collectionImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-2xl glass-dark"
                        >
                            <div className="bg-slate-800 py-3 px-6 text-white font-medium border-b border-white/10">Collection Page</div>
                            <img src={collectionImage} alt={`${project.title} Collection`} className="w-full h-auto object-cover" loading="lazy" />
                        </motion.div>
                    )}
                </div>

            </div>
        </motion.div>
    );
};
