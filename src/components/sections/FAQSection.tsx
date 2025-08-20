import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">Часто задаваемые вопросы</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ответы на популярные вопросы о занятиях и обучении
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Группа: Организация занятий */}
          <div className="mb-8">
            <h3 className="text-xl font-inter font-semibold text-dark-text mb-4 text-center">📚 Организация занятий</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Сколько длится занятие по времени?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p><strong>Основная часть:</strong> 60 минут активного обучения</p>
                    <p><strong>Дополнительно:</strong> 15 минут на вопросы учеников или углубление в тему</p>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg">💡 Если материал сложный, я всегда готов продолжить объяснение в дополнительное время</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Когда начинаются занятия?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p><strong>Старт курса:</strong> ориентировочно 14 сентября</p>
                    <p className="text-sm">К этому времени ученики уже адаптируются к школьному режиму и не будут перегружены первыми учебными днями</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm"><strong>Почему именно эта дата?</strong></p>
                      <p className="text-sm">Избегаем стресса 1 сентября, когда ученики и так нагружены школой и другими репетиторами</p>
                    </div>
                  </div>
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

              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Что делать, если ребенок не может прийти на занятие?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p><strong>✅ Возможно:</strong> посмотреть запись урока в любое время</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p><strong>⚠️ Но лучше:</strong> присутствовать лично</p>
                      <p className="text-sm mt-1">На уроке можно сразу сказать, что непонятно, и я разберу вопрос детально</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Что делать, если ученик не смог решить домашнее задание?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Если ваш ребенок не смог выполнить ДЗ, то вероятнее всего и остальные ученики тоже не справились. У меня есть отчеты, которые показывают в процентном соотношении выполнение задания у учеников. Так что я всегда знаю, с чем трудности у учеников и на уроке мы сделаем работу над ошибками. Также после выполнения задания у ученика отображается верное решение каждого задания, благодаря чему он сможет найти в чем у него ошибка.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Сколько длится занятие по времени?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Основная часть занятия длится 60 минут, после этого я выделяю 15 минут на вопросы учеников или же продолжаю рассказывать тему, если мне не хватило часа.
                </p>
              </AccordionContent>
            </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Что происходит на бесплатных дополнительных занятиях?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">🌍 Математика в жизни</p>
                        <p className="text-xs">Практическое применение</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">📜 История математики</p>
                        <p className="text-xs">Откуда взялись формулы</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">🔍 Глубокий анализ</p>
                        <p className="text-xs">Математика за рамками ОГЭ</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">🎯 Практика ОГЭ</p>
                        <p className="text-xs">Дополнительные задания</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

            <AccordionItem value="item-10" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Когда начинаются занятия?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Занятия ориентировочно начинаются 14 сентября. К этому времени ученик как раз уже вольется в учебный процесс и не будет нагружен со всех сторон 1 сентября и школой, и репетиторами.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Как получить 5 тысяч рублей?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Все просто: записываетесь ко мне на занятия, пишете ОГЭ на пять и деньги ваши! На эти деньги ученик сможет купить себе подарок или же просто организовать праздник в честь успешной сдачи ОГЭ!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>

          {/* Группа: Запись и начало обучения */}
          <div className="mb-8">
            <h3 className="text-xl font-inter font-semibold text-dark-text mb-4 text-center">📝 Запись и начало обучения</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как происходит запись на занятия?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">1</span>
                      <p><strong>Заполнение формы</strong> — вы оставляете заявку</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">2</span>
                      <p><strong>Тестирование</strong> — отправляю тест для оценки уровня знаний ученика</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">3</span>
                      <p><strong>Формирование группы</strong> — в течение 10 дней определяем время и группу</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">4</span>
                      <p><strong>Доступ</strong> — открываю личный кабинет и отправляю ссылку на занятия</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Подходят ли занятия для 8 класса?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">✅ Да, отлично подходят!</p>
                      <p className="text-sm mt-2">90% материала ОГЭ — это программа 5-8 классов</p>
                    </div>
                    <p className="text-sm">Ученики 8 класса получают преимущество — больше времени на подготовку к ОГЭ</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Групповой формат неэффективен?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="font-semibold text-yellow-800">🎯 Мой подход решает эту проблему</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Как я формирую группы:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                        <li>Тестирование уровня знаний каждого ученика</li>
                        <li>Объединение учеников с одинаковым уровнем</li>
                        <li>Результат: всем понятно, никто не отстает</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Группа: Учебный процесс */}
          <div className="mb-8">
            <h3 className="text-xl font-inter font-semibold text-dark-text mb-4 text-center">📚 Учебный процесс</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-8" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как пользоваться личным кабинетом?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold">💡 Просто и удобно</p>
                      <p className="text-sm">Регистрация не требуется — просто переходите по ссылке</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border-l-4 border-blue-500 pl-3">
                        <p className="font-semibold text-sm">📊 Прогресс</p>
                        <p className="text-xs">Номер урока, название, выполненные задания</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-3">
                        <p className="font-semibold text-sm">📝 Материалы</p>
                        <p className="text-xs">Конспекты и домашние задания</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-3">
                        <p className="font-semibold text-sm">🎥 Записи</p>
                        <p className="text-xs">Уроки с тайм-кодами для быстрого поиска</p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-3">
                        <p className="font-semibold text-sm">👨‍👩‍👧‍👦 Доступ</p>
                        <p className="text-xs">Как для ученика, так и для родителя</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Что делать, если ученик не смог решить домашнее задание?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">😌 Не переживайте!</p>
                      <p className="text-sm">Скорее всего, и другие ученики тоже не справились</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Мой подход к решению:</strong></p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500">📊</span>
                          <span className="text-sm">У меня есть отчеты с процентом выполнения заданий</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500">🔍</span>
                          <span className="text-sm">Знаю, с чем именно трудности у учеников</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-500">✏️</span>
                          <span className="text-sm">Делаем работу над ошибками на уроке</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500">💡</span>
                          <span className="text-sm">Ученик видит правильное решение после выполнения</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Группа: Оплата и гарантии */}
          <div className="mb-8">
            <h3 className="text-xl font-inter font-semibold text-dark-text mb-4 text-center">💰 Оплата и гарантии</h3>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-10" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как происходит оплата?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">🎁 Первый урок — БЕСПЛАТНО!</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✅</span>
                        <div>
                          <p className="font-semibold">Если понравилось</p>
                          <p className="text-sm">Оплачиваете занятия до конца месяца (включая первый урок)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">❌</span>
                        <div>
                          <p className="font-semibold">Если не подошло</p>
                          <p className="text-sm">Первый урок остается бесплатным</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="bg-white rounded-lg shadow-sm border-0">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-inter font-semibold">Как получить 5 тысяч рублей?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                      <p className="font-bold text-orange-800 text-lg">🎯 Простая формула успеха:</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">1️⃣</span>
                        <p>Записываетесь ко мне на занятия</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">2️⃣</span>
                        <p>Пишете ОГЭ на <strong>пятерку</strong></p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">3️⃣</span>
                        <p>Получаете <strong>5000 рублей!</strong></p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm"><strong>💡 На что потратить:</strong> подарок себе или праздник в честь успешной сдачи ОГЭ!</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;