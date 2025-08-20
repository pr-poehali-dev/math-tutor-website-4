import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
              <div className="bg-gradient-to-r from-success-green to-vibrant-purple text-white p-3 rounded-xl">
                <div className="font-bold">🎁 Бонус 5000₽</div>
                <div className="text-sm">за пятерку на ОГЭ!</div>
              </div>
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

                  <a 
                    href="https://rutube.ru/video/cfb42cc4773d23d9d9376a43f1e11e79/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg text-center hover:from-blue-600 hover:to-purple-700 transition-colors cursor-pointer"
                  >
                    <Icon name="Play" size={24} className="mx-auto mb-2" />
                    <div className="text-sm font-medium">как им пользоваться</div>
                  </a>
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

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-yellow-500/20 bg-gradient-to-br from-yellow-50 to-orange-50 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                <Icon name="Trophy" size={32} className="text-yellow-600" />
              </div>
              <CardTitle className="text-xl font-inter text-orange-800">Денежный приз!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3">
                <div className="text-2xl font-bold text-yellow-600">5000₽</div>
                <p className="text-gray-700 font-semibold">Получил пятёрку на экзамене — получил пять тысяч рублей!</p>
                <div className="bg-white/70 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Эти деньги ученик с удовольствием сможет потратить на организацию праздника в честь отличной сдачи экзамена!</p>
                </div>
                <div className="flex justify-center space-x-2 text-2xl">
                  <span>🎉</span>
                  <span>🎁</span>
                  <span>🏆</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutLessons;