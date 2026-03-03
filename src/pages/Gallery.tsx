import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutList, Grid2x2, Grid3x3, LayoutGrid } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { Skeleton } from '../components/Skeleton';

export const Gallery: React.FC = () => {
    const { projects, loading, error } = useProjects();
    const [activeFilter, setActiveFilter] = useState<string>('All');
    const [requestedCols, setRequestedCols] = useState<number>(3); // Default to 3 columns
    const [actualCols, setActualCols] = useState<number>(3);

    // Handle logic for actual displayed columns based on current breakpoint
    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let currentDisplayCols = requestedCols;

            if (width < 640) { // < sm
                currentDisplayCols = 1;
            } else if (width < 768) { // sm to < md
                currentDisplayCols = Math.min(requestedCols, 2);
            } else if (width < 1024) { // md to < lg
                currentDisplayCols = Math.min(requestedCols, 3);
            } else { // >= lg
                currentDisplayCols = requestedCols;
            }

            setActualCols(currentDisplayCols);
        };

        // Recalculate initially and on screen resize
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [requestedCols]);

    // Extract unique technologies from all projects
    const allTechs = useMemo(() => {
        const techs = new Set<string>();
        projects.forEach((p) => {
            if (p.tech_stack) {
                p.tech_stack.forEach((tech) => techs.add(tech));
            }
        });
        return ['All', ...Array.from(techs).sort()];
    }, [projects]);

    // Filter projects based on active tech filter
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter((p) => p.tech_stack?.includes(activeFilter));
    }, [projects, activeFilter]);

    // Dynamic CSS classes for grid columns based on user selection and screen size
    const getGridClass = () => {
        // Tailwind breakpoints: sm (640px), md (768px), lg (1024px)
        switch (actualCols) {
            case 1: return "grid-cols-1 w-full";
            case 2: return "grid-cols-1 sm:grid-cols-2 w-full";
            case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full";
            case 3:
            default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                        My Projects
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        A diverse collection of my recent creative and technical projects.
                    </p>
                </motion.div>

                {/* Controls Section: Filter & View Toggle */}
                {!loading && projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12"
                    >
                        {/* Tags Filter */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-4xl">
                            {allTechs.map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => setActiveFilter(tech)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeFilter === tech
                                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>

                        {/* View Controls */}
                        <div className="hidden sm:flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                            <span className="text-sm font-medium text-slate-500 mr-2 hidden md:block">View:</span>

                            <button onClick={() => setRequestedCols(1)} className={`p-2 rounded-lg transition-colors ${actualCols === 1 ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`} aria-label="List View">
                                <LayoutList size={20} />
                            </button>
                            <button onClick={() => setRequestedCols(2)} className={`p-2 rounded-lg transition-colors sm:block ${actualCols === 2 ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`} aria-label="2 Columns">
                                <Grid2x2 size={20} />
                            </button>
                            <button onClick={() => setRequestedCols(3)} className={`p-2 rounded-lg transition-colors hidden md:block ${actualCols === 3 ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`} aria-label="3 Columns">
                                <Grid3x3 size={20} />
                            </button>
                            <button onClick={() => setRequestedCols(4)} className={`p-2 rounded-lg transition-colors hidden lg:block ${actualCols === 4 ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`} aria-label="4 Columns">
                                <LayoutGrid size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {error && <div className="text-red-500 text-center mb-8">{error}</div>}

                {/* Projects Grid */}
                <motion.div layout className={`grid gap-8 transition-all duration-500 ${getGridClass()}`}>
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
                            ))
                        ) : filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <Link to={`/projects/${project.id}`} className="block h-full group">
                                        <ProjectCard project={project} index={index} layout={actualCols === 1 ? 'list' : 'grid'} />
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 text-slate-500 text-lg"
                            >
                                No projects found for {activeFilter}.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
};
