import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { Skeleton } from '../components/Skeleton';

export const Home: React.FC = () => {
    const { projects, loading, error } = useProjects();
    const featuredProjects = projects.slice(0, 3); // Preview top 3

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-200">
                            Hi There! <span className="inline-block origin-bottom-right animate-bounce">👋🏻</span>
                        </h1>
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                            I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase">Tran Tien Dung</span>
                        </h2>

                        <div className="text-3xl md:text-5xl font-bold text-blue-400 h-[60px] flex items-center justify-center">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Software Developer',
                                        'Open Source Contributor',
                                        'Freelancer'
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    deleteSpeed: 50,
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:scale-105"
                        >
                            View My Work <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Trust Bar Section */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-semibold text-slate-500 tracking-wider uppercase mb-8">
                        Technologies I work with
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Replace these with actual logos as needed */}
                        <div className="text-xl font-bold font-mono">Shopify</div>
                        <div className="text-xl font-bold font-mono">BigCommerce</div>
                        <div className="text-xl font-bold font-mono">Liquid</div>
                        <div className="text-xl font-bold font-mono">Handlebars</div>
                        <div className="text-xl font-bold font-mono">Javascript</div>
                        <div className="text-xl font-bold font-mono">React</div>
                        <div className="text-xl font-bold font-mono">Laravel</div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-end mb-12"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Featured Projects</h2>
                            <p className="mt-3 text-lg text-slate-600">Some of my recent work</p>
                        </div>
                        <Link to="/projects" className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            View All <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    {error && <div className="text-red-500 text-center">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
                            ))
                        ) : (
                            featuredProjects.map((project, index) => (
                                <Link key={project.id} to={`/projects/${project.id}`} className="block h-full group">
                                    <ProjectCard project={project} index={index} />
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="mt-10 sm:hidden flex justify-center">
                        <Link to="/projects" className="inline-flex items-center gap-2 text-blue-600 font-medium border border-blue-200 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">About Me</h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
                            I am a passionate Frontend Developer focused on creating interactive, accessible, and high-performance web applications. I love turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Social Links Section */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
                        <div className="flex gap-6">
                            {/* Github Link */}
                            <a
                                href="https://github.com/TienDungzz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                                aria-label="GitHub"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </a>

                            {/* LinkedIn Link */}
                            <a
                                href="https://www.linkedin.com/in/tran-tien-dung/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                                aria-label="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
