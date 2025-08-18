import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(selectedDays.filter(d => d !== day));
    }
  };

  const handleTimeChange = (time: string, checked: boolean) => {
    if (checked) {
      setSelectedTimes([...selectedTimes, time]);
    } else {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    }
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = 7 + i;
    return `${hour}:00`;
  });

  const mainProgram = [
    "Обыкновенные дроби", "Десятичные дроби ч.1", "Десятичные дроби ч.2", "Проценты", 
    "Среднее арифметическое", "Отрицательные числа", "Работа с переменными", "Решение уравнений",
    "Решение задач с помощью уравнений", "Решение задач с помощью уравнений на проценты из второй части",
    "Решение задач на движение из второй части", "Смежные и вертикальные углы", "Треугольники",
    "Равнобедренный треугольник и его свойства", "Линейная функция", "Степень", "Многочлены",
    "ФСУ", "Параллельные прямые и углы при параллельных прямых", "Теорема о сумме углов треугольника",
    "Некоторые свойства прямоугольных треугольников", "Системы линейных уравнений",
    "Решение задач с помощью системы линейных уравнений из второй части", "Вероятность",
    "Обратная пропорциональность", "Многоугольники", "Параллелограмм. Признаки параллелограмма. Трапеция",
    "Прямоугольник. Ромб и квадрат", "Квадратные корни ч.1", "Квадратные корни ч.2",
  ];

  const bonusTopics = [
    "Как на пальцах считать до 1000",
    "Как мошенники используют теорию вероятностей и как не стать их жертвой",
    "Комбинация карт или сколько секунд осталось до смерти",
    "Какая вероятность выиграть в лотерею",
    "Почему минус на минус дает плюс?",
    "Почему при умножение обыкновенных дробей числитель умножаем на числитель, а знаменатель на знаменатель?",
    "Как связана география и математика?(рассказать про масштаб, плотность населения, координаты)",
    "Как связана информатика и математика?",
    "Откуда появился этот Дискриминант? Выводим формулу Дискриминанта",
    "Как связано искусство и математика? Золотое сечение",
    "Парадокс дней рождений",
    "Математические модели в биологии",
    "Замедление Ютуб",
    "Задача Монти Холла",
    "Как применяться математика в игре блек Джек"
  ];

  const reviews = [
    {
      name: "Анна",
      role: "мама пятиклассника",
      text: "Илья - молодец! 👏 целеустремленный и очень терпеливый молодой преподаватель. Он нашел подход к моему очень непростому ребенку, который ненавидит учиться, а сейчас приходит после занятия и рассказывает с восторгом, как много он решил примеров и задач. Очень рады, что обратились к Илье! Рекомендую 👌"
    },
    {
      name: "Диана",
      role: "девятиклассница",
      text: "все супер, Илья лучший преподаватель. Объясняет все в доступном формате не как на уроках)) Если вы хотите хороший бал по ОГЭ и при этом заниматься в полном комфорте, то вы нашли его! Всем девятиклассникам рекомендую."
    },
    {
      name: "Ирина",
      role: "мама восьмиклассника",
      text: "Искала репетитора сыну подростку, выбор пал на Илью. Сын алгебру подтянул. И это главное! Илью.,как репетитора, рекомендую. Всё доходчиво объясняет. Занимаемся с ним второй год. Сыну нравится!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg via-white to-purple-50 font-source">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-inter font-bold text-vibrant-purple">
            МатемАтик 🧮
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#lessons" className="text-dark-text hover:text-vibrant-purple transition-colors">О занятиях</a>
            <a href="#teacher" className="text-dark-text hover:text-vibrant-purple transition-colors">О преподавателе</a>
            <a href="#program" className="text-dark-text hover:text-vibrant-purple transition-colors">Программа</a>
            <a href="#faq" className="text-dark-text hover:text-vibrant-purple transition-colors">FAQ</a>
            <a href="#booking" className="text-dark-text hover:text-vibrant-purple transition-colors">Записаться</a>
          </div>
          <Button className="bg-vibrant-purple hover:bg-purple-700">
            <Icon name="Phone" size={16} />
            Связаться
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vibrant-purple/10 to-success-green/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 text-sm px-4 py-2 bg-vibrant-purple/10 text-vibrant-purple border-vibrant-purple/20">
              🎯 Подготовка к ОГЭ по математике
            </Badge>
            <h1 className="text-5xl md:text-7xl font-inter font-bold text-dark-text mb-6 leading-tight">
              Математика без 
              <span className="bg-gradient-to-r from-vibrant-purple to-success-green bg-clip-text text-transparent">
                {" "}страха
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Готовим к ОГЭ с гарантией результата! Получи пятерку на экзамене — получи 5000 рублей! 🎉
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-vibrant-purple hover:bg-purple-700 text-white px-8 py-6 text-lg animate-scale-in"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Calendar" size={20} />
                Записаться на занятие
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-vibrant-purple text-vibrant-purple hover:bg-vibrant-purple hover:text-white px-8 py-6 text-lg"
              >
                <Icon name="Play" size={20} />
                Посмотреть видео
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Lessons */}
      <section id="lessons" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">О занятиях</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Современный подход к изучению математики с персональным кабинетом и автоматической проверкой
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-vibrant-purple/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-vibrant-purple/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-vibrant-purple/20 transition-colors">
                  <Icon name="Clock" size={32} className="text-vibrant-purple" />
                </div>
                <CardTitle className="text-xl font-inter">Удобное расписание</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Занятия 60-75 минут, 2 раза в неделю + 1 бесплатное дополнительное</p>
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
                <CardTitle className="text-xl font-inter">Малые группы</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">8-12 учеников одного уровня знаний</p>
                <Badge variant="outline" className="border-success-green text-success-green">
                  Индивидуальный подход
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:shadow-purple-500/20 lg:col-span-2">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Icon name="Computer" size={32} className="text-purple-600" />
                </div>
                <CardTitle className="text-xl font-inter">Личный кабинет ученика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
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
                    <div className="flex items-center space-x-3">
                      <Icon name="MessageCircle" size={20} className="text-blue-600" />
                      <span>Всегда на связи</span>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg text-center">
                      <Icon name="Play" size={24} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">Место для видео о личном кабинете</div>
                    </div>
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

      {/* About Teacher */}
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
                <p className="text-lg text-gray-700 leading-relaxed">
                  Меня зовут <span className="font-semibold text-vibrant-purple">Илья</span>, я студент ДВФУ, 
                  изучаю педагогику с акцентом на математику и информатику.
                </p>
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
                    <span>Молодой подход</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-inter font-semibold text-lg mb-3 text-dark-text">Мой подход:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success-green" />
                      <span>Нахожу подход к каждому ученику</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success-green" />
                      <span>Объясняю сложное простыми словами</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success-green" />
                      <span>Создаю комфортную атмосферу на уроках</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">Программа курса</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Полная программа подготовки к ОГЭ + интересные дополнительные занятия
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-vibrant-purple to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-inter flex items-center">
                  <Icon name="BookOpen" size={28} className="mr-3" />
                  Основные занятия
                </CardTitle>
                <CardDescription className="text-purple-100">
                  59 тем программы ОГЭ по математике
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {mainProgram.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <div className="w-6 h-6 bg-vibrant-purple text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                  <div className="text-center py-4">
                    <Badge variant="outline" className="border-vibrant-purple text-vibrant-purple">
                      и ещё 29 тем...
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-success-green to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-inter flex items-center">
                  <Icon name="Sparkles" size={28} className="mr-3" />
                  Бесплатные дополнительные
                </CardTitle>
                <CardDescription className="text-green-100">
                  Математика в жизни - интересно и познавательно
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {bonusTopics.map((topic, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="w-8 h-8 bg-success-green text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        🎯
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ответы на популярные вопросы о занятиях и обучении
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как пользоваться личным кабинетом?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Я отправляю вам ссылку, по которой вы переходите. Регистрация не требуется.
                    На открывшейся странице вы найдете таблицу, где указаны: номер урока, название урока,
                    домашнее задание, количество выполненных заданий, конспекты урока,
                    запись урока с тайм-кодами (для удобного поиска нужного момента).
                    Доступ к личному кабинету будет как у ученика, так и у родителя.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как происходит запись на занятия?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Вы заполняете форму, после чего я связываюсь с вами и скидываю тест, который должен пройти ученик для оценки уровня знаний.
                    После этого в течение 10 дней я утверждаю время занятий и отправляю ссылку, по которой должен перейти ученик, чтобы вступить в группу.
                    Затем я открываю доступ ученику в личный кабинет, с которого он уже может перейти на занятие. Провожу занятие 😊.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как происходит оплата?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    После первого урока вы принимаете решение, хотите ли продолжать занятия.
                    Если вы решаете заниматься дальше, то оплачиваете занятия до конца месяца, включая уже проведенный урок.
                    Если вы решаете не продолжать, первый урок для вас бесплатный.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Групповой формат неэффективен?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Я формирую группы из учеников с одинаковым уровнем знаний.
                    После заполнения формы я отправляю родителю тест, который должен пройти ученик.
                    Ученик выполняет тест, делает скриншот результата и отправляет его мне через родителя.
                    На основе результатов теста я формирую группы, где все ученики имеют схожий уровень знаний. 
                    Это позволяет избежать ситуаций, когда одному ученику понятно, а другому нет.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Подходят ли занятия для 8 класса?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Да! Мои занятия отлично подойдут ученикам 8 класса, так как 90% материала ОГЭ — это программа 5-8 классов.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">Отзывы</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Что говорят ученики и родители о занятиях
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-vibrant-purple to-success-green rounded-full flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div className="ml-3">
                      <div className="font-inter font-semibold text-dark-text">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{review.text}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 px-4 bg-gradient-to-br from-vibrant-purple via-purple-600 to-success-green text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold mb-4">Записаться на занятие</h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Заполните форму, и я свяжусь с вами в течение дня
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="role" className="text-dark-text font-medium">Кто вы? *</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Родитель</SelectItem>
                        <SelectItem value="student">Ученик</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="grade" className="text-dark-text font-medium">Какой класс? *</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите класс..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8 класс</SelectItem>
                        <SelectItem value="9">9 класс</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-dark-text font-medium">Из какого вы города? *</Label>
                    <Input 
                      id="city" 
                      placeholder="Введите ваш город..." 
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-dark-text font-medium mb-3 block">Когда вам будет удобно заниматься? *</Label>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">Дни недели:</Label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                          {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((day) => (
                            <label key={day} className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedDays.includes(day)}
                                onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                              />
                              <span className="text-sm text-dark-text">{day}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">Удобное время:</Label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <label key={time} className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedTimes.includes(time)}
                                onCheckedChange={(checked) => handleTimeChange(time, checked as boolean)}
                              />
                              <span className="text-sm text-dark-text">{time}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-dark-text font-medium">Расскажите подробнее о своих целях</Label>
                    <Textarea 
                      id="goals"
                      placeholder="Что вы хотите получить от занятий? Какой уровень подготовки сейчас? Есть ли особые пожелания?"
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-vibrant-purple hover:bg-purple-700 text-white py-4 text-lg font-inter font-semibold"
                  >
                    <Icon name="Send" size={20} />
                    Отправить заявку
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-dark-text text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-inter font-bold mb-2">МатемАтик 🧮</div>
              <p className="text-gray-400">Математика без страха</p>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm" className="text-white hover:text-vibrant-purple">
                <Icon name="Phone" size={16} />
                Телефон
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-vibrant-purple">
                <Icon name="Mail" size={16} />
                Email
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-vibrant-purple">
                <Icon name="MessageCircle" size={16} />
                Telegram
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 МатемАтик. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;