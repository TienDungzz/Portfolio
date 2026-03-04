import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Navbar */}
            <Header />

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
