import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProgramSection = () => {
  const mainProgram = [
    "Обыкновенные дроби", "Десятичные дроби ч.1", "Десятичные дроби ч.2", "Проценты", 
    "Среднее арифметическое", "Отрицательные числа", "Работа с переменными", "Решение уравнений",
    "Решение задач с помощью уравнений", "Решение задач с помощью уравнений на проценты из второй части",
    "Решение задач на движение из второй части", "Смежные и вертикальные углы", "Треугольники",
    "Равенство треугольников", "Параллельные прямые", "Сумма углов треугольника", "Соотношения между сторонами треугольника",
    "Прямоугольные треугольники", "Четырехугольники", "Площадь", "Подобные треугольники", "Окружность",
    "Векторы", "Тождественные преобразования", "Разложение на множители", "Формулы сокращенного умножения",
    "Алгебраические дроби", "Функции", "Квадратные корни", "Квадратные уравнения", "Неравенства",
    "Степень с целым показателем. Элементы статистики", "Работа с графиками", "Теория вероятностей",
    "Координаты на плоскости", "Теорема Пифагора", "Квадратичная функция", "Квадратные неравенства",
    "Элементы тригонометрии", "Элементы комбинаторики", "Геометрическая прогрессия", "Арифметическая прогрессия",
    "Использование графиков функций для решения уравнений и их систем", "Определения, доказательства, аксиомы и теоремы",
    "Решение практических задач", "Анализ реальных данных", "Извлечение информации из таблиц и диаграмм",
    "Работа с планами и схемами", "Вычисления и округления", "Сравнение величин", "Координатная прямая",
    "Числовые неравенства и их свойства", "Системы уравнений", "Решение текстовых задач", "Преобразование выражений",
    "Множества и операции над ними", "Задачи на отношения и пропорции", "Длина окружности и площадь круга",
    "Элементы стереометрии", "Координаты и векторы", "Площади фигур", "Объемы тел"
  ];

  const bonusTopics = [
    "Как связано искусство и математика? Золотое сечение",
    "Парадокс дней рождений",
    "Математические модели в биологии",
    "Замедление Ютуб",
    "Задача Монти Холла",
    "Как применяться математика в игре блек Джек"
  ];

  return (
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
            <CardContent className="p-6 max-h-96 overflow-y-auto">
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
  );
};

export default ProgramSection;