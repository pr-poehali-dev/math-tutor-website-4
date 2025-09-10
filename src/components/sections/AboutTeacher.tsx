import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const AboutTeacher = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  const photos = [
    "https://cdn.poehali.dev/files/8a3fe9ba-1f92-49c0-b7f9-df6b423ec1d0.JPG",
    "https://cdn.poehali.dev/files/b93b48b5-c536-4bc6-9ee9-90804c51e14d.JPG", 
    "https://cdn.poehali.dev/files/465c6b8c-281d-4b69-b513-27c4172c1600.JPG"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section id="teacher" className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="w-80 h-80 bg-gradient-to-br from-vibrant-purple to-success-green rounded-full mx-auto flex items-center justify-center p-2">
              <div className="w-full h-full bg-white rounded-full overflow-hidden relative">
                {photos.map((photo, index) => (
                  <img 
                    key={index}
                    src={photo} 
                    alt={`Илья - преподаватель математики ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                    } ${index === 2 ? 'scale-125' : ''}`}
                    style={{ 
                      objectPosition: index === 2 ? 'center 15%' : 'center 20%'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-inter font-bold text-dark-text mb-6">О преподавателе</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">Меня зовут Илья, я студент ДВФУ, получаю педагогическое образование по профилю математика и информатика</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Icon name="GraduationCap" size={24} className="text-vibrant-purple" />
                  <span>Студент ДВФУ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="BookOpen" size={24} className="text-success-green" />
                  <span>Учусь на педагога </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Monitor" size={24} className="text-motivation-red" />
                  <span>Преподаю третий год</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Heart" size={24} className="text-pink-500" />
                  <span>Молодой преподаватель </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-inter font-semibold text-lg mb-3 text-dark-text">Мой подход:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={24} className="text-success-green" />
                    <span>Показываю, как применяется математика в жизни</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={24} className="text-success-green" />
                    <span>Рассказываю историю математики </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={24} className="text-success-green" />
                    <span>Учу не подставлять циферки в формулу, а выводить их</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeacher;