import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectById } from '../services/projects';
import type { Database } from '../types/supabase';
import { Skeleton } from '../components/Skeleton';
import { ImageSlider } from '../components/ImageSlider';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Cloudinary URL optimization helper
    const getOptimizedCloudinaryUrl = (url?: string) => {
        if (!url) return '';
        if (url.includes('cloudinary.com') && !url.includes('/upload/f_auto,q_auto/')) {
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        return url;
    };

    // Derived state for formatted images
    const projectImages = useMemo(() => {
        if (!project?.images) return [];

        const images: { key: string, label: string, url: string, originalUrl: string, group: string }[] = [];
        const formatLabel = (str: string) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        const entries = Object.entries(project.images as Record<string, any>);

        // Sort keys with priority priorities: home -> collection -> product -> others
        const sortOrder: Record<string, number> = { home_page: 1, collection_page: 2, product_page: 3 };
        entries.sort((a, b) => {
            const rankA = sortOrder[a[0]] || 99;
            const rankB = sortOrder[b[0]] || 99;
            if (rankA !== rankB) return rankA - rankB;
            return a[0].localeCompare(b[0]);
        });

        entries.forEach(([key, value]) => {
            if (!value) return;
            const label = formatLabel(key);

            if (typeof value === 'string') {
                images.push({
                    key,
                    label,
                    group: key,
                    url: getOptimizedCloudinaryUrl(value),
                    originalUrl: value
                });
            } else if (Array.isArray(value)) {
                value.forEach((url: string, index: number) => {
                    if (typeof url === 'string') {
                        images.push({
                            key: `${key}_${index}`,
                            label,
                            group: key,
                            url: getOptimizedCloudinaryUrl(url),
                            originalUrl: url
                        });
                    }
                });
            }
        });

        return images;
    }, [project]);

    const groupedImages = useMemo(() => {
        const groups: Record<string, { label: string, items: (typeof projectImages[0] & { globalIndex: number })[] }> = {};
        projectImages.forEach((img, index) => {
            if (!groups[img.group]) {
                groups[img.group] = { label: img.label, items: [] };
            }
            groups[img.group].items.push({ ...img, globalIndex: index });
        });
        return Object.values(groups);
    }, [projectImages]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedImageIndex]);

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex(selectedImageIndex === 0 ? projectImages.length - 1 : selectedImageIndex - 1);
    }

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex(selectedImageIndex === projectImages.length - 1 ? 0 : selectedImageIndex + 1);
    }

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 min-h-screen py-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 font-medium">
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Column: Header Info */}
                    <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{project.title}</h1>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.tech_stack?.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm font-semibold">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                {(project.show_github && project.github_url) && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
                                        <Github size={18} /> View Source
                                    </a>
                                )}
                                {(project.show_demo && project.demo_url) && (
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/30">
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Gallery Images */}
                    <div className="lg:col-span-7 space-y-12 pb-20">
                        {groupedImages.map((group) => (
                            <motion.div
                                key={group.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl overflow-hidden shadow-2xl glass-dark"
                            >
                                <div className="bg-slate-800 py-3 px-6 text-white font-medium border-b border-white/10 flex justify-between items-center">
                                    <span>{group.label}</span>
                                    {group.items.length > 1 ? (
                                        <span className="text-sm font-semibold text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/30">
                                            {group.items.length} images
                                        </span>
                                    ) : (
                                        <span className="text-sm text-slate-400">Click to expand</span>
                                    )}
                                </div>

                                {group.items.length === 1 ? (
                                    <div
                                        className="cursor-pointer group relative bg-slate-900 flex items-center justify-center min-h-[200px]"
                                        style={{ maxHeight: '100vh' }}
                                        onClick={() => setSelectedImageIndex(group.items[0].globalIndex)}
                                    >

                                        <img src={group.items[0].url} alt={`${project.title} ${group.label}`} className="w-full object-cover object-top group-hover:object-bottom transition-all duration-[8000ms] ease-linear" style={{ maxHeight: '100vh' }} loading="lazy" />
                                    </div>
                                ) : (
                                    <ImageSlider group={group} projectTitle={project.title} onImageClick={(idx) => setSelectedImageIndex(idx)} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && projectImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-black/95 select-none backdrop-blur-sm"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Top Bar */}
                        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                            <div className="text-white/80 font-medium px-4">
                                {selectedImageIndex + 1} / {projectImages.length}
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                                className="text-white/70 hover:text-white p-2 transition-colors rounded-full hover:bg-white/10"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Main Image Area */}
                        <div className="flex-1 flex items-center justify-center relative px-4 md:px-20 overflow-hidden">
                            {/* Navigation Buttons */}
                            {projectImages.length > 1 && (
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-2 md:left-8 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
                                >
                                    <ChevronLeft size={40} strokeWidth={1.5} />
                                </button>
                            )}

                            <motion.div
                                key={selectedImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full flex items-center justify-center p-4 md:p-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={projectImages[selectedImageIndex].url}
                                    alt={`Fullscreen ${projectImages[selectedImageIndex].label}`}
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                />
                            </motion.div>

                            {projectImages.length > 1 && (
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-2 md:right-8 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
                                >
                                    <ChevronRight size={40} strokeWidth={1.5} />
                                </button>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {projectImages.length > 1 && (
                            <div
                                className="bg-black/80 border-t border-white/10 flex items-center justify-start sm:justify-center gap-3 px-4 py-4 overflow-x-auto w-full no-scrollbar shrink-0"
                                onClick={(e) => e.stopPropagation()}
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {projectImages.map((img, idx) => (
                                    <button
                                        key={img.key}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative shrink-0 rounded-md overflow-hidden transition-all duration-200 ${selectedImageIndex === idx
                                            ? 'w-24 md:w-32 h-16 md:h-20 ring-2 ring-blue-500 opacity-100'
                                            : 'w-20 md:w-28 h-14 md:h-16 opacity-50 hover:opacity-80'
                                            }`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${img.label}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
