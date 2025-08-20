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

            <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Что делать, если ребенок не может прийти на занятие?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Если ребенок не будет присутствовать на уроке, он всегда может посмотреть в любое время запись урока, на котором он не присутствовал. Но это совсем не значит, что на уроки можно не ходить! На уроке надо быть, так как ученик может всегда сказать, что ему не понятно и я это разберу более подробно.
                </p>
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

            <AccordionItem value="item-9" className="bg-white rounded-lg shadow-sm border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-inter font-semibold">Что происходит на бесплатных дополнительных занятиях?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  Мы смотрим, как математика пригождается в жизни, я рассказываю, под каким историческим влиянием появилась та или иная тема, более глубоко разбираем математику или же просто дополнительно нарешиваем задания из ОГЭ!
                </p>
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
      </div>
    </section>
  );
};

export default FAQSection;