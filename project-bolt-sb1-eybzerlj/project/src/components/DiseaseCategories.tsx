import React from 'react';
import { Disease } from '../types';
import { useNavigate } from 'react-router-dom';

const diseases: Disease[] = [
  {
    id: '1',
    name: 'Kidney Disease',
    description: 'Chronic kidney disease and related conditions',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '2',
    name: 'Cancer',
    description: 'Various types of cancer treatment and care',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '3',
    name: 'Heart Disease',
    description: 'Cardiovascular conditions and treatments',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '4',
    name: 'Diabetes',
    description: 'Type 1 and Type 2 diabetes management',
    imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '5',
    name: 'Respiratory Diseases',
    description: 'Asthma, COPD, and other respiratory conditions',
    imageUrl: 'https://images.unsplash.com/photo-1583947581924-860bda3c5881?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '6',
    name: 'Neurological Disorders',
    description: 'Brain and nervous system conditions',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=500',
  },
];

export function DiseaseCategories() {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Select a Condition
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Choose a condition to find specialized doctors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease) => (
            <div
              key={disease.id}
              onClick={() => navigate(`/doctors/${disease.id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={disease.imageUrl}
                  alt={disease.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {disease.name}
                </h3>
                <p className="text-gray-600">{disease.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}