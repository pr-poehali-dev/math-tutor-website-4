import React, { useState, useRef, useEffect } from 'react';
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
  const [cityInput, setCityInput] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const cities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
    'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
    'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар',
    'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Ульяновск',
    'Иркутск', 'Хабаровск', 'Ярославль', 'Владивосток', 'Махачкала',
    'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Астрахань',
    'Пенза', 'Липецк', 'Тула', 'Киров', 'Чебоксары', 'Калининград',
    'Брянск', 'Курск', 'Иваново', 'Магнитогорск', 'Тверь', 'Ставрополь',
    'Сочи', 'Белгород', 'Симферополь', 'Севастополь', 'Владимир', 'Архангельск'
  ];

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityInputRef.current && !cityInputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityInputChange = (value: string) => {
    setCityInput(value);
    if (value.length > 0) {
      const filtered = cities.filter(city => 
        city.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 5);
      setFilteredCities(filtered);
      setShowCitySuggestions(filtered.length > 0);
    } else {
      setShowCitySuggestions(false);
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city: string) => {
    setCityInput(city);
    setShowCitySuggestions(false);
    setFilteredCities([]);
  };

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

                <div className="relative">
                  <Label htmlFor="city" className="text-dark-text font-medium">Из какого вы города? *</Label>
                  <Input 
                    ref={cityInputRef}
                    id="city" 
                    name="city"
                    value={cityInput}
                    onChange={(e) => handleCityInputChange(e.target.value)}
                    onFocus={() => {
                      if (cityInput.length > 0 && filteredCities.length > 0) {
                        setShowCitySuggestions(true);
                      }
                    }}
                    placeholder="Введите ваш город..." 
                    className="mt-2"
                    required
                    autoComplete="off"
                  />
                  {showCitySuggestions && filteredCities.length > 0 && (
                    <div 
                      ref={suggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
                    >
                      {filteredCities.map((city, index) => (
                        <div
                          key={city}
                          onClick={() => handleCitySelect(city)}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-dark-text border-b border-gray-100 last:border-b-0"
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
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
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => handleTimeToggle(day, time, !selectedSchedule[day]?.includes(time))}
                                  className={`w-full px-2 py-2 text-sm font-medium rounded-md border transition-colors flex items-center justify-center min-h-[36px] ${
                                    selectedSchedule[day]?.includes(time)
                                      ? 'bg-vibrant-purple text-white border-vibrant-purple'
                                      : 'bg-white text-dark-text border-gray-300 hover:bg-gray-50'
                                  }`}
                                >
                                  {time}
                                </button>
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