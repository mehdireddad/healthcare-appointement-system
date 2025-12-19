import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Menu } from 'lucide-react';
import { Button } from './ui/Button';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-[#0596DE] p-2 rounded-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0596DE] to-[#2E4590]">
                        DocLib
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0596DE] transition-colors">
                        Vous êtes praticien ?
                    </a>
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-[#0596DE] transition-colors">
                        Centre d'aide
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                        <User className="w-4 h-4" />
                        Se connecter
                    </Button>
                    <Button variant="primary" size="sm" className="hidden md:flex">
                        S'inscrire
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
