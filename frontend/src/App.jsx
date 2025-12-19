import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import DoctorList from './components/DoctorList';
import BookingWizard from './components/BookingWizard';

const API_URL = 'http://localhost:8888';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -50, x: '-50%' }}
      className={`fixed top-24 left-1/2 z-[110] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${type === 'success'
          ? 'bg-green-50/90 border-green-200 text-green-800'
          : 'bg-red-50/90 border-red-200 text-red-800'
        }`}
    >
      {type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-4 font-bold opacity-50 hover:opacity-100">✕</button>
    </motion.div>
  );
};

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    setLoading(true);
    axios.get(`${API_URL}/doctors`)
      .then(response => {
        if (response.data?._embedded?.docteurs) {
          setDoctors(response.data._embedded.docteurs);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des docteurs:", error);
        setLoading(false);
        showNotification("Impossible de charger les docteurs. Vérifiez que le back-end est lancé.", "error");
      });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 5000);
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleConfirmBooking = (date) => {
    if (!selectedDoctor) return;

    const rdvData = {
      date: date.toISOString(),
      docteurID: selectedDoctor.id,
    };

    axios.post(`${API_URL}/appointments`, rdvData)
      .then(response => {
        showNotification(`Rendez-vous confirmé avec Dr. ${selectedDoctor.nom} !`, "success");
        handleCloseModal();
        // Refresh doctors to update availability if backend handles it
        fetchDoctors();
      })
      .catch(error => {
        console.error("Erreur lors de la prise de RDV:", error);
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la réservation.";
        showNotification(`Échec: ${errorMessage}`, "error");
      });
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-[#0596DE] selection:text-white">
      <AnimatePresence>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: '', type: '' })}
          />
        )}
      </AnimatePresence>

      <Header />

      <main>
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="container mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {searchTerm ? `Résultats pour "${searchTerm}"` : "Nos praticiens recommandés"}
              </h2>
              <span className="text-slate-500 font-medium">{filteredDoctors.length} résultat(s)</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0596DE] rounded-full animate-spin mb-4"></div>
                <p>Chargement des disponibilités...</p>
              </div>
            ) : filteredDoctors.length > 0 ? (
              <DoctorList doctors={filteredDoctors} onBook={handleBookClick} />
            ) : (
              <div className="text-center py-20 text-slate-500">
                <p className="text-lg">Aucun praticien trouvé.</p>
                <p className="text-sm">Essayez une autre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-slate-500">© 2025 DocLib - Tous droits réservés</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      <BookingWizard
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};

export default App;
