import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const Hero = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative overflow-hidden bg-[#2E4590] py-20 lg:py-32">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[#0596DE] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                    Trouvez votre rendez-vous<br />
                    <span className="text-sky-300">rapidement et simplement</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto"
                >
                    Accédez aux disponibilités de milliers de professionnels de santé et prenez rendez-vous en ligne 24h/24 et 7j/7.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-2 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2"
                >
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                        <Input
                            placeholder="Nom, spécialité..."
                            className="pl-12 border-none bg-slate-50 focus:bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 relative md:border-l border-slate-100">
                        <MapPin className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                        <Input
                            placeholder="Où ? (ex: Casablanca)"
                            className="pl-12 border-none bg-slate-50 focus:bg-white"
                        />
                    </div>
                    <Button size="lg" className="md:w-auto w-full">
                        Rechercher
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
