import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Video } from 'lucide-react';
import { Button } from './ui/Button';

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all"
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doctor.id}`}
            alt={doctor.nom}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-900">{doctor.nom}</h3>
          <p className="text-slate-500 font-medium">{doctor.specialite}</p>

          <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
            <MapPin className="w-4 h-4" />
            <span>Casablanca</span>
          </div>

          <div className="flex gap-2 mt-3">
            {doctor.available ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Disponible
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Indisponible
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <Video className="w-3 h-3" />
              Téléconsultation
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex -space-x-2">
          {/* Fake avatars for "Next available slots" feel */}
        </div>
        <Button
          onClick={() => onBook(doctor)}
          className="w-full"
          disabled={!doctor.available}
        >
          {doctor.available ? "Prendre RDV" : "Indisponible"}
        </Button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
