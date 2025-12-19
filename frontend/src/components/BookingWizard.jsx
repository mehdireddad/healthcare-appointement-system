import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const BookingWizard = ({ isOpen, onClose, doctor, onConfirm }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    if (!isOpen || !doctor) return null;

    const handleNext = () => {
        if (step === 1 && selectedDate) setStep(2);
        else if (step === 2 && selectedTime) {
            // Create a full date object
            const fullDate = new Date(`${selectedDate}T${selectedTime}`);
            onConfirm(fullDate);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-900">Prendre rendez-vous</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="mb-6 flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                            {doctor.nom.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Praticien</p>
                            <p className="font-bold text-lg text-slate-900">{doctor.nom}</p>
                            <p className="text-sm text-slate-500">{doctor.specialite}</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <label className="block text-sm font-medium text-slate-700">Choisir une date</label>
                                <Input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />

                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {[0, 1, 2].map(days => {
                                        const d = new Date();
                                        d.setDate(d.getDate() + days);
                                        const str = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
                                        return (
                                            <button
                                                key={days}
                                                onClick={() => setSelectedDate(d.toISOString().split('T')[0])}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${selectedDate === d.toISOString().split('T')[0] ? 'border-[#0596DE] bg-sky-50 text-[#0596DE]' : 'border-slate-200 hover:border-[#0596DE]'}`}
                                            >
                                                {str}
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <label className="block text-sm font-medium text-slate-700">Choisir une heure</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-3 text-center rounded-xl border text-sm font-medium transition-all ${selectedTime === time ? 'border-[#0596DE] bg-sky-50 text-[#0596DE]' : 'border-slate-200 hover:border-[#0596DE]'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    {step > 1 && (
                        <Button variant="ghost" onClick={() => setStep(step - 1)}>Retour</Button>
                    )}
                    <Button onClick={handleNext} disabled={step === 1 ? !selectedDate : !selectedTime}>
                        {step === 1 ? 'Continuer' : 'Confirmer le RDV'}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingWizard;
