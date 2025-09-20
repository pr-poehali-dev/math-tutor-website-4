import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg text-center hover:from-blue-600 hover:to-purple-700 transition-colors cursor-pointer w-full"
      >
        <Icon name="Play" size={24} className="mx-auto mb-2" />
        <div className="text-sm font-medium">как им пользоваться</div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Как пользоваться личным кабинетом</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-4">
              <iframe 
                width="100%" 
                height="405" 
                src="https://rutube.ru/play/embed/cfb42cc4773d23d9d9376a43f1e11e79/" 
                frameBorder="0" 
                allow="clipboard-write; autoplay" 
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AboutLessons = () => {
  return (
    <section id="lessons" className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-dark-text mb-4">О занятиях</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Современный подход к изучению математики с персональным кабинетом и автоматической проверкой
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-vibrant-purple/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-vibrant-purple/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-vibrant-purple/20 transition-colors">
                <Icon name="Clock" size={32} className="text-vibrant-purple" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-inter">Удобное расписание</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-4">Занятия 60-75 минут, 2 раза в неделю + 1 бесплатное дополнительное</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Основные занятия:</span>
                  <span className="font-semibold text-vibrant-purple">2 раза/неделя</span>
                </div>
                <div className="flex justify-between">
                  <span>Дополнительные:</span>
                  <span className="font-semibold text-success-green">Бесплатно!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-success-green/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-success-green/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-success-green/20 transition-colors">
                <Icon name="BookOpen" size={32} className="text-success-green" />
              </div>
              <CardTitle className="text-xl font-inter">Бесплатные групповые занятия</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Дополнительные занятия, где я рассказываю о применении математики в жизни, истории математических открытий, разбираю задания ОГЭ и отвечаю на вопросы учеников</p>
              <Badge variant="outline" className="border-success-green text-success-green">
                Математика в жизни
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-success-green/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-success-green/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-success-green/20 transition-colors">
                <Icon name="Users" size={32} className="text-success-green" />
              </div>
              <CardTitle className="text-xl font-inter">Группы</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">8-12 учеников одного уровня знаний</p>
              <Badge variant="outline" className="border-success-green text-success-green">
                Одинаковый уровень
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-vibrant-purple/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-vibrant-purple/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-vibrant-purple/20 transition-colors">
                <Icon name="GraduationCap" size={32} className="text-vibrant-purple" />
              </div>
              <CardTitle className="text-xl font-inter">Бесплатные индивидуальные занятия</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Персональные занятия с студентами-репетиторами из лучших вузов России. Дополнительная поддержка и разбор сложных тем</p>
              <Badge variant="outline" className="border-vibrant-purple text-vibrant-purple">
                Лучшие студенты
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-motivation-red/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-motivation-red/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-motivation-red/20 transition-colors">
                <Icon name="Banknote" size={32} className="text-motivation-red" />
              </div>
              <CardTitle className="text-xl font-inter">Стоимость</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-motivation-red mb-2">800₽</div>
              <p className="text-gray-600 mb-4">за занятие</p>
              <Badge variant="outline" className="border-motivation-red text-motivation-red">
                Доступная цена
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-blue-500/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Icon name="MessageCircle" size={32} className="text-blue-600" />
              </div>
              <CardTitle className="text-xl font-inter">Поддержка вне занятий</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Всегда на связи! Ученик может задавать вопросы и получать ответы от меня или моего помощника в любое время.</p>
              <Badge variant="outline" className="border-blue-600 text-blue-600">
                24/7 поддержка
              </Badge>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-purple-500/20 md:col-span-2 lg:col-span-2">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Icon name="Computer" size={32} className="text-purple-600" />
              </div>
              <CardTitle className="text-xl font-inter">Личный кабинет ученика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-vibrant-purple" />
                    <span>Конспекты всех уроков</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="BookOpen" size={20} className="text-success-green" />
                    <span>Домашние задания</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Video" size={20} className="text-motivation-red" />
                    <span>Записи занятий с тайм-кодами</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-purple-600" />
                    <span>Автоматическая проверка</span>
                  </div>

                  <VideoModal />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-green-500/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Icon name="Target" size={32} className="text-green-600" />
              </div>
              <CardTitle className="text-xl font-inter">Результат</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">Не просто хорошая сдача ОГЭ, но и отличная база для ЕГЭ</p>
              <Badge className="bg-green-100 text-green-700">
                8-9 классы
              </Badge>
            </CardContent>
          </Card>


        </div>
      </div>
    </section>
  );
};

export default AboutLessons;