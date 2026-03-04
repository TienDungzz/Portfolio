import React from 'react';
import { Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Resume: React.FC = () => {
    const resumeId = '17YGFzUyBw7thTTKcx_ScJT4tjmTM1KFm';
    const previewUrl = `https://drive.google.com/file/d/${resumeId}/preview`;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${resumeId}`;
    const viewUrl = `https://drive.google.com/file/d/${resumeId}/view?usp=sharing`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 min-h-screen py-10 pt-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 font-medium">
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Column: Header Info */}
                    <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">My Resume</h1>

                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                View or download my curriculum vitae to learn more about my experience, skills, and background.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <a
                                    href={viewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
                                >
                                    <ExternalLink size={18} /> Open in Drive
                                </a>
                                <a
                                    href={downloadUrl}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-500/30 hover:scale-105"
                                >
                                    <Download size={18} /> Download PDF
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Gallery Images */}
                    <div className="lg:col-span-7 space-y-12 pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full h-[80vh] min-h-[600px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                        >
                            <iframe
                                src={previewUrl}
                                className="w-full h-full border-none"
                                allow="autoplay"
                                title="Resume PDF Viewer"
                            ></iframe>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
