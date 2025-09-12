import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  
  const certificates = [
    {
      id: 1,
      title: "Высшая школа ораторского искусства",
      description: "Сертификат по ораторскому мастерству и практическому тренингу",
      course: "Теоретический мастер-класс по ораторскому искусству. Практический тренинг по ораторскому искусству.",
      image: "https://cdn.poehali.dev/files/830ae18e-fae9-476c-b3f2-6ee1a81b3340.jpg",
      date: "2024",
      organization: "Высшая школа ораторского искусства"
    },
    {
      id: 2,
      title: "Фоксфорд",
      description: "Подготовка к ОГЭ по математике в условиях ФГОС",
      course: "Организация эффективной подготовки к ОГЭ по математике в условиях ФГОС",
      image: "https://cdn.poehali.dev/files/f1bd1394-63f5-4f96-9e33-f76e8a3bf781.png",
      date: "2025",
      organization: "Фоксфорд"
    },
    {
      id: 3,
      title: "TutorOnline",
      description: "Основы репетиторства",
      course: "Основы репетиторства",
      image: "https://cdn.poehali.dev/files/6bfafeaf-8d8b-48f8-82cb-b6a39d82c303.jpg",
      date: "2024",
      organization: "TutorOnline"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-dark-text mb-4">
            Сертификаты и квалификации
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Постоянно повышаю квалификацию и получаю новые знания для эффективного обучения
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <Card 
              key={cert.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
              onClick={() => setSelectedCertificate(cert.id)}
            >
              <div className="relative">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <Icon name="Eye" size={20} className="mb-2" />
                    <p className="text-sm">Нажмите, чтобы увеличить</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-inter font-semibold text-lg text-dark-text line-clamp-2">
                    {cert.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                    {cert.date}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>
                <div className="flex items-center text-sm text-vibrant-purple">
                  <Icon name="Award" size={16} className="mr-2" />
                  <span>{cert.organization}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for enlarged certificate */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
              <img 
                src={certificates.find(c => c.id === selectedCertificate)?.image} 
                alt="Увеличенный сертификат"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;