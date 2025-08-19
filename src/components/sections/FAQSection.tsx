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
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;