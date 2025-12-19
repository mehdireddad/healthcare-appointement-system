import React from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors, onBook }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onBook={onBook} />
            ))}
        </div>
    );
};

export default DoctorList;
