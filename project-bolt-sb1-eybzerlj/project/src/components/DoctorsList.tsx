import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Doctor } from '../types';
import { MapPin, Award, Clock, Building2 } from 'lucide-react';

export const doctors: Doctor[] = [
  // Kidney Disease Doctors
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Nephrologist',
    education: [
      'MD - Johns Hopkins University',
      'Fellowship in Nephrology - Mayo Clinic',
      'Board Certified in Internal Medicine and Nephrology'
    ],
    hospital: 'City General Hospital',
    hospitalType: 'government',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },
  {
    id: '2',
    name: 'Dr. Robert Chen',
    specialization: 'Nephrologist',
    education: [
      'MD - Stanford University',
      'Fellowship in Nephrology - UCSF',
      'Board Certified in Nephrology'
    ],
    hospital: 'Kidney Care Private Hospital',
    hospitalType: 'private',
    experience: 12,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },
  {
    id: '3',
    name: 'Dr. Maria Garcia',
    specialization: 'Nephrologist',
    education: [
      'MD - Yale University',
      'Fellowship in Nephrology - Cleveland Clinic',
      'Board Certified in Internal Medicine'
    ],
    hospital: 'State Medical Center',
    hospitalType: 'government',
    experience: 10,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Nephrologist',
    education: [
      'MD - Columbia University',
      'Fellowship in Nephrology - Mount Sinai',
      'Board Certified in Nephrology'
    ],
    hospital: 'Premium Kidney Institute',
    hospitalType: 'private',
    experience: 18,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },
  {
    id: '5',
    name: 'Dr. Emily Patel',
    specialization: 'Nephrologist',
    education: [
      'MD - University of Pennsylvania',
      'Fellowship in Nephrology - Duke University',
      'Board Certified in Internal Medicine and Nephrology'
    ],
    hospital: 'District Hospital',
    hospitalType: 'government',
    experience: 8,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },
  {
    id: '6',
    name: 'Dr. David Kim',
    specialization: 'Nephrologist',
    education: [
      'MD - Harvard Medical School',
      'Fellowship in Nephrology - Massachusetts General Hospital',
      'Board Certified in Nephrology'
    ],
    hospital: 'Advanced Kidney Care Center',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['1']
  },

  // Cancer Doctors
  {
    id: '7',
    name: 'Dr. Michael Chang',
    specialization: 'Oncologist',
    education: [
      'MD - Harvard Medical School',
      'Fellowship in Medical Oncology - Dana-Farber Cancer Institute',
      'Board Certified in Medical Oncology'
    ],
    hospital: 'National Cancer Center',
    hospitalType: 'government',
    experience: 20,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },
  {
    id: '8',
    name: 'Dr. Lisa Anderson',
    specialization: 'Radiation Oncologist',
    education: [
      'MD - Stanford University',
      'Residency in Radiation Oncology - MD Anderson Cancer Center',
      'Board Certified in Radiation Oncology'
    ],
    hospital: 'Advanced Cancer Care Institute',
    hospitalType: 'private',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },
  {
    id: '9',
    name: 'Dr. William Taylor',
    specialization: 'Surgical Oncologist',
    education: [
      'MD - Johns Hopkins University',
      'Fellowship in Surgical Oncology - Memorial Sloan Kettering',
      'Board Certified in Surgical Oncology'
    ],
    hospital: 'State Cancer Hospital',
    hospitalType: 'government',
    experience: 18,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },
  {
    id: '10',
    name: 'Dr. Rachel Martinez',
    specialization: 'Medical Oncologist',
    education: [
      'MD - UCLA',
      'Fellowship in Hematology-Oncology - UCSF',
      'Board Certified in Medical Oncology and Hematology'
    ],
    hospital: 'Premier Cancer Institute',
    hospitalType: 'private',
    experience: 12,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },
  {
    id: '11',
    name: 'Dr. Thomas Lee',
    specialization: 'Gynecologic Oncologist',
    education: [
      'MD - University of Michigan',
      'Fellowship in Gynecologic Oncology - Mayo Clinic',
      'Board Certified in Gynecologic Oncology'
    ],
    hospital: 'Women\'s Cancer Center',
    hospitalType: 'government',
    experience: 16,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },
  {
    id: '12',
    name: 'Dr. Sofia Rodriguez',
    specialization: 'Pediatric Oncologist',
    education: [
      'MD - Columbia University',
      'Fellowship in Pediatric Oncology - St. Jude Children\'s Research Hospital',
      'Board Certified in Pediatric Oncology'
    ],
    hospital: 'Children\'s Cancer Hospital',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['2']
  },

  // Heart Disease Doctors
  {
    id: '13',
    name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    education: [
      'MD - Yale University',
      'Fellowship in Cardiology - Cleveland Clinic',
      'Board Certified in Cardiovascular Disease'
    ],
    hospital: 'Heart Institute',
    hospitalType: 'government',
    experience: 22,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },
  {
    id: '14',
    name: 'Dr. Emma Wilson',
    specialization: 'Interventional Cardiologist',
    education: [
      'MD - Duke University',
      'Fellowship in Interventional Cardiology - Mount Sinai',
      'Board Certified in Interventional Cardiology'
    ],
    hospital: 'Cardiac Care Center',
    hospitalType: 'private',
    experience: 16,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },
  {
    id: '15',
    name: 'Dr. Richard Brown',
    specialization: 'Cardiac Surgeon',
    education: [
      'MD - University of Pennsylvania',
      'Fellowship in Cardiothoracic Surgery - Stanford',
      'Board Certified in Cardiothoracic Surgery'
    ],
    hospital: 'State Heart Hospital',
    hospitalType: 'government',
    experience: 25,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },
  {
    id: '16',
    name: 'Dr. Patricia White',
    specialization: 'Electrophysiologist',
    education: [
      'MD - Northwestern University',
      'Fellowship in Cardiac Electrophysiology - Mayo Clinic',
      'Board Certified in Cardiac Electrophysiology'
    ],
    hospital: 'Rhythm Heart Center',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },
  {
    id: '17',
    name: 'Dr. George Thompson',
    specialization: 'Preventive Cardiologist',
    education: [
      'MD - Emory University',
      'Fellowship in Preventive Cardiology - Johns Hopkins',
      'Board Certified in Cardiovascular Disease'
    ],
    hospital: 'Preventive Heart Institute',
    hospitalType: 'government',
    experience: 18,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },
  {
    id: '18',
    name: 'Dr. Linda Davis',
    specialization: 'Heart Failure Specialist',
    education: [
      'MD - University of Chicago',
      'Fellowship in Advanced Heart Failure - UCLA',
      'Board Certified in Advanced Heart Failure'
    ],
    hospital: 'Advanced Heart Care Center',
    hospitalType: 'private',
    experience: 20,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['3']
  },

  // Diabetes Doctors
  {
    id: '19',
    name: 'Dr. Jennifer Moore',
    specialization: 'Endocrinologist',
    education: [
      'MD - University of Michigan',
      'Fellowship in Endocrinology - Mayo Clinic',
      'Board Certified in Endocrinology'
    ],
    hospital: 'Diabetes Care Center',
    hospitalType: 'government',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },
  {
    id: '20',
    name: 'Dr. Kevin Park',
    specialization: 'Diabetologist',
    education: [
      'MD - Columbia University',
      'Fellowship in Diabetes Management - Joslin Diabetes Center',
      'Board Certified in Endocrinology'
    ],
    hospital: 'Metabolic Institute',
    hospitalType: 'private',
    experience: 12,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },
  {
    id: '21',
    name: 'Dr. Susan Lee',
    specialization: 'Endocrinologist',
    education: [
      'MD - Stanford University',
      'Fellowship in Endocrinology - UCSF',
      'Board Certified in Endocrinology'
    ],
    hospital: 'State Diabetes Hospital',
    hospitalType: 'government',
    experience: 18,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },
  {
    id: '22',
    name: 'Dr. Mark Johnson',
    specialization: 'Diabetologist',
    education: [
      'MD - Yale University',
      'Fellowship in Diabetes Care - Barbara Davis Center',
      'Board Certified in Internal Medicine'
    ],
    hospital: 'Advanced Diabetes Care',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },
  {
    id: '23',
    name: 'Dr. Laura Martinez',
    specialization: 'Pediatric Endocrinologist',
    education: [
      'MD - Harvard Medical School',
      'Fellowship in Pediatric Endocrinology - Children\'s Hospital of Philadelphia',
      'Board Certified in Pediatric Endocrinology'
    ],
    hospital: 'Children\'s Diabetes Center',
    hospitalType: 'government',
    experience: 16,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },
  {
    id: '24',
    name: 'Dr. David Wilson',
    specialization: 'Endocrinologist',
    education: [
      'MD - Duke University',
      'Fellowship in Endocrinology - Northwestern University',
      'Board Certified in Endocrinology'
    ],
    hospital: 'Premium Diabetes Institute',
    hospitalType: 'private',
    experience: 20,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['4']
  },

  // Respiratory Disease Doctors
  {
    id: '25',
    name: 'Dr. Robert Taylor',
    specialization: 'Pulmonologist',
    education: [
      'MD - Johns Hopkins University',
      'Fellowship in Pulmonary Medicine - Mayo Clinic',
      'Board Certified in Pulmonary Disease'
    ],
    hospital: 'Respiratory Care Center',
    hospitalType: 'government',
    experience: 17,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },
  {
    id: '26',
    name: 'Dr. Maria Rodriguez',
    specialization: 'Pulmonologist',
    education: [
      'MD - Stanford University',
      'Fellowship in Pulmonary Critical Care - UCSF',
      'Board Certified in Pulmonary Disease and Critical Care'
    ],
    hospital: 'Lung Institute',
    hospitalType: 'private',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },
  {
    id: '27',
    name: 'Dr. James Chen',
    specialization: 'Respiratory Specialist',
    education: [
      'MD - Yale University',
      'Fellowship in Pulmonary Medicine - Cleveland Clinic',
      'Board Certified in Pulmonary Disease'
    ],
    hospital: 'State Pulmonary Hospital',
    hospitalType: 'government',
    experience: 20,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },
  {
    id: '28',
    name: 'Dr. Sarah Brown',
    specialization: 'Pulmonologist',
    education: [
      'MD - Columbia University',
      'Fellowship in Pulmonary Medicine - Mount Sinai',
      'Board Certified in Pulmonary Disease'
    ],
    hospital: 'Advanced Respiratory Care',
    hospitalType: 'private',
    experience: 13,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },
  {
    id: '29',
    name: 'Dr. Michael Lee',
    specialization: 'Sleep Medicine Specialist',
    education: [
      'MD - University of Pennsylvania',
      'Fellowship in Sleep Medicine - Stanford Sleep Center',
      'Board Certified in Sleep Medicine'
    ],
    hospital: 'Sleep and Breathing Center',
    hospitalType: 'government',
    experience: 16,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },
  {
    id: '30',
    name: 'Dr. Emily Wilson',
    specialization: 'Pediatric Pulmonologist',
    education: [
      'MD - Harvard Medical School',
      'Fellowship in Pediatric Pulmonology - Boston Children\'s Hospital',
      'Board Certified in Pediatric Pulmonology'
    ],
    hospital: 'Children\'s Respiratory Institute',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['5']
  },

  // Neurological Disorders Doctors
  {
    id: '31',
    name: 'Dr. William Anderson',
    specialization: 'Neurologist',
    education: [
      'MD - Harvard Medical School',
      'Fellowship in Neurology - Mayo Clinic',
      'Board Certified in Neurology'
    ],
    hospital: 'Brain and Spine Center',
    hospitalType: 'government',
    experience: 22,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  },
  {
    id: '32',
    name: 'Dr. Patricia Martinez',
    specialization: 'Neurosurgeon',
    education: [
      'MD - Stanford University',
      'Residency in Neurosurgery - Johns Hopkins',
      'Board Certified in Neurological Surgery'
    ],
    hospital: 'Advanced Neuroscience Institute',
    hospitalType: 'private',
    experience: 18,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  },
  {
    id: '33',
    name: 'Dr. Richard Kim',
    specialization: 'Movement Disorder Specialist',
    education: [
      'MD - Columbia University',
      'Fellowship in Movement Disorders - UCSF',
      'Board Certified in Neurology'
    ],
    hospital: 'State Neurological Hospital',
    hospitalType: 'government',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  },
  {
    id: '34',
    name: 'Dr. Elizabeth Park',
    specialization: 'Epileptologist',
    education: [
      'MD - Yale University',
      'Fellowship in Epilepsy - Cleveland Clinic',
      'Board Certified in Epilepsy'
    ],
    hospital: 'Epilepsy Care Center',
    hospitalType: 'private',
    experience: 16,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  },
  {
    id: '35',
    name: 'Dr. Thomas Garcia',
    specialization: 'Neuro-oncologist',
    education: [
      'MD - Duke University',
      'Fellowship in Neuro-oncology - MD Anderson',
      'Board Certified in Neuro-oncology'
    ],
    hospital: 'Neuro-Oncology Center',
    hospitalType: 'government',
    experience: 20,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  },
  {
    id: '36',
    name: 'Dr. Sarah Chen',
    specialization: 'Pediatric Neurologist',
    education: [
      'MD - University of Pennsylvania',
      'Fellowship in Pediatric Neurology - Children\'s Hospital of Philadelphia',
      'Board Certified in Pediatric Neurology'
    ],
    hospital: 'Children\'s Neurology Institute',
    hospitalType: 'private',
    experience: 14,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500',
    diseases: ['6']
  }
];

export function DoctorsList() {
  const { diseaseId } = useParams<{ diseaseId: string }>();
  const [hospitalFilter, setHospitalFilter] = useState<'all' | 'government' | 'private'>('all');
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.diseases.includes(diseaseId || '') && 
    (hospitalFilter === 'all' || doctor.hospitalType === hospitalFilter)
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Specialized Doctors
          </h2>
          
          <div className="flex gap-4">
            <button
              onClick={() => setHospitalFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                hospitalFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Hospitals
            </button>
            <button
              onClick={() => setHospitalFilter('government')}
              className={`px-4 py-2 rounded-lg ${
                hospitalFilter === 'government'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Government Hospitals
            </button>
            <button
              onClick={() => setHospitalFilter('private')}
              className={`px-4 py-2 rounded-lg ${
                hospitalFilter === 'private'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Private Hospitals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                    {doctor.specialization}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {doctor.name}
                  </h3>
                  
                  <div className="mt-4 flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {doctor.hospital}
                  </div>

                  <div className="mt-2 flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-2" />
                    {doctor.hospitalType === 'government' ? 'Government Hospital' : 'Private Hospital'}
                  </div>
                  
                  <div className="mt-2 flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    {doctor.experience} years of experience
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Education & Certifications
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="text-gray-600">
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}