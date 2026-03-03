import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import type { Database } from '../types/supabase';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

interface ProjectCardProps {
    project: ProjectRow;
    index: number;
    layout?: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, layout = 'grid' }) => {
    const imagesRecord = project.images as Record<string, any> | null;
    let mainImage = 'https://via.placeholder.com/600x400?text=No+Image';
    if (imagesRecord) {
        if (typeof imagesRecord.home_page === 'string') {
            mainImage = imagesRecord.home_page;
        } else if (Array.isArray(imagesRecord.home_page) && imagesRecord.home_page.length > 0) {
            mainImage = imagesRecord.home_page[0];
        } else {
            const firstValue = Object.values(imagesRecord)[0];
            if (typeof firstValue === 'string') {
                mainImage = firstValue;
            } else if (Array.isArray(firstValue) && firstValue.length > 0) {
                mainImage = firstValue[0];
            }
        }
    }

    // Cloudinary URL optimization helper
    const getOptimizedCloudinaryUrl = (url: string) => {
        if (!url) return url;
        // Check if it's a Cloudinary URL and doesn't already have f_auto,q_auto
        if (url.includes('cloudinary.com') && !url.includes('/upload/f_auto,q_auto/')) {
            // Insert optimization parameters into the URL after /upload/
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        return url;
    };

    const optimizedImage = getOptimizedCloudinaryUrl(mainImage);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className={`glass glass-dark rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-blue-500/50 transition-all duration-300 group flex h-full ${layout === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
        >
            <div className={`relative overflow-hidden bg-slate-800 ${layout === 'list' ? 'md:w-5/12 shrink-0 h-64 md:h-auto min-h-[250px]' : 'aspect-video'}`}>
                {/* Skeleton could be integrated here while the real image is loading */}
                <img
                    src={optimizedImage}
                    alt={project.title}
                    className="object-cover object-top w-full h-full group-hover:scale-110 transition-transform duration-500 absolute inset-0"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            </div>

            <div className={`p-6 flex flex-col flex-grow ${layout === 'list' ? 'md:w-7/12 md:py-8 md:px-10 justify-center' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                </p>

                {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {project.tech_stack.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech_stack.length > 4 && (
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300">
                                +{project.tech_stack.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* Action Links Container */}
                {((project.show_github && project.github_url) || (project.show_demo && project.demo_url)) && (
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        {(project.show_github && project.github_url) && (
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.github_url!, '_blank', 'noopener,noreferrer');
                                }}
                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                            >
                                <Github size={18} />
                                Code
                            </div>
                        )}
                        {(project.show_demo && project.demo_url) && (
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(project.demo_url!, '_blank', 'noopener,noreferrer');
                                }}
                                className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
