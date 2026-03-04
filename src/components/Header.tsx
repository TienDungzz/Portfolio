import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const isActive = (path: string) => location.pathname === path;

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 w-full z-50 glass border-b border-white/20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" onClick={closeMenu} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Tran Tien Dung
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/projects"
                            className={`text-sm font-medium transition-colors ${isActive('/projects') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'
                                }`}
                        >
                            Projects
                        </Link>
                        <Link
                            to="/resume"
                            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors ${isActive('/resume')
                                ? 'bg-blue-700 text-white'
                                : 'text-white bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <FileText size={16} /> Resume
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/projects"
                                onClick={closeMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/projects') ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                Projects
                            </Link>
                            <Link
                                to="/resume"
                                onClick={closeMenu}
                                className={`flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 rounded-xl transition-colors font-medium text-base ${isActive('/resume')
                                    ? 'bg-blue-700 text-white'
                                    : 'text-white bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                <FileText size={18} /> View / Download Resume
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
