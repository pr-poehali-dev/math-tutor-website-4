import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">Готовлю к ОГЭ с гарантией результата! Получи пятерку на экзамене — получи 5000 рублей! 🎉</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-vibrant-purple hover:bg-purple-700 text-white px-8 py-6 text-lg animate-scale-in"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Calendar" size={20} />
              Записаться на занятие
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;