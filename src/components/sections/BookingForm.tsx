import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const BookingForm = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Record<string, string[]>>({});

  const handleDayToggle = (day: string, checked: boolean) => {
    if (checked) {
      setSelectedSchedule(prev => ({
        ...prev,
        [day]: []
      }));
    } else {
      setSelectedSchedule(prev => {
        const newSchedule = { ...prev };
        delete newSchedule[day];
        return newSchedule;
      });
    }
  };

  const handleTimeToggle = (day: string, time: string, checked: boolean) => {
    setSelectedSchedule(prev => ({
      ...prev,
      [day]: checked 
        ? [...(prev[day] || []), time]
        : (prev[day] || []).filter(t => t !== time)
    }));
  };

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = 7 + i;
    return `${hour}:00`;
  });

  return (
    <section id="booking" className="py-12 md:py-20 px-4 bg-gradient-to-br from-vibrant-purple via-purple-600 to-success-green text-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold mb-4">Записаться на занятие</h2>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto px-2">
            Заполните форму, и я свяжусь с вами в течение дня
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <form action="https://formspree.io/f/manbgwqw" method="POST" className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-dark-text font-medium">Как к вам обращаться? *</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Введите ваше имя..." 
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-dark-text font-medium">Телефон для связи *</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__" 
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-dark-text font-medium">Кто вы? *</Label>
                  <Select name="role">
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
                  <Select name="grade">
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
                    name="city"
                    placeholder="Введите ваш город..." 
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-dark-text font-medium mb-3 block">Когда вам будет удобно заниматься? *</Label>
                  <div className="space-y-6">
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((day) => (
                      <div key={day} className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <Checkbox
                            checked={day in selectedSchedule}
                            onCheckedChange={(checked) => handleDayToggle(day, checked as boolean)}
                          />
                          <span className="font-medium text-dark-text">{day}</span>
                        </label>
                        
                        {day in selectedSchedule && (
                          <div className="ml-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
                            <Label className="text-sm text-gray-600 mb-2 block">Удобное время в {day.toLowerCase()}:</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-40 overflow-y-auto">
                              {timeSlots.map((time) => (
                                <label key={time} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={selectedSchedule[day]?.includes(time) || false}
                                    onCheckedChange={(checked) => handleTimeToggle(day, time, checked as boolean)}
                                  />
                                  <span className="text-sm text-dark-text">{time}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals" className="text-dark-text font-medium">Расскажите подробнее о своих целях</Label>
                  <Textarea 
                    id="goals"
                    name="goals"
                    placeholder="Что вы хотите получить от занятий? Какой уровень подготовки сейчас? Есть ли особые пожелания?"
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                {/* Скрытое поле для передачи данных о расписании */}
                <input
                  type="hidden"
                  name="schedule"
                  value={JSON.stringify(selectedSchedule)}
                />

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
  );
};

export default BookingForm;