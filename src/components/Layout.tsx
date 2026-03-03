import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

export const Layout: React.FC = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    // Thay thế '#Url_CV_Cua_Ban' bằng link Google Drive/PDF thực tế của bạn
    const resumeUrl = '#Url_CV_Cua_Ban';

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Navbar with Glassmorphism */}
            <header className="fixed top-0 w-full z-50 glass border-b border-white/20">
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
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
                            >
                                <FileText size={16} /> Resume
                            </a>
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
                {isMenuOpen && (
                    <div className="md:hidden glass border-t border-white/20">
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
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="flex items-center justify-center gap-2 w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl transition-colors font-medium text-base"
                            >
                                <FileText size={18} /> View / Download Resume
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-grow w-full pt-16">
                <Outlet />
            </main>

            {/* Basic Footer */}
            <footer className="w-full bg-slate-900 text-slate-400 py-8 text-center mt-auto">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Tran Tien Dung Portfolio. Built with React & Tailwind.
                </p>
            </footer>
        </div>
    );
};
