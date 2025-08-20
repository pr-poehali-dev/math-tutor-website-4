import React from 'react';
import Icon from '@/components/ui/icon';

const AboutTeacher = () => {
  return (
    <section id="teacher" className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="w-80 h-80 bg-gradient-to-br from-vibrant-purple to-success-green rounded-full mx-auto flex items-center justify-center">
              <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                <div className="text-6xl">👨‍🏫</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="bg-white px-4 py-2 rounded-full inline-block text-sm text-gray-600">
                📸 Место для фотографии Ильи
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
                  <span>Педагогика + математика</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Monitor" size={24} className="text-motivation-red" />
                  <span>Информатика</span>
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
                    <Icon name="CheckCircle" size={32} className="text-success-green" />
                    <span>Показываю, как применяется математика в жизни</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={32} className="text-success-green" />
                    <span>Рассказываю, под каким историческим влиянием обществу стало необходимо то или иное математическое знание</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={32} className="text-success-green" />
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