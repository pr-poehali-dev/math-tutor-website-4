import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-vibrant-purple/10 to-success-green/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in text-left lg:text-left">
            <Badge className="mb-6 text-sm px-4 py-2 bg-vibrant-purple/10 text-vibrant-purple border-vibrant-purple/20">
              🎯 Подготовка к ОГЭ по математике
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-bold text-dark-text mb-6 leading-tight">
              Математика без 
              <span className="bg-gradient-to-r from-vibrant-purple to-success-green bg-clip-text text-transparent">
                {" "}страха
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">Не просто готовлю к ОГЭ, а самое главное-учу мыслить!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start lg:items-center">
              <Button 
                size="lg" 
                className="bg-vibrant-purple hover:bg-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg animate-scale-in w-full sm:w-auto"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Calendar" size={20} />
                Записаться на занятие
              </Button>
            </div>
          </div>
          
          <div className="animate-fade-in order-first lg:order-last">
            <div className="relative">
              <div className="w-full max-w-md mx-auto lg:max-w-lg">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://cdn.poehali.dev/files/1ba41f3f-23e5-4d45-8aca-4249911f803a.jpg" 
                    alt="Илья - преподаватель математики"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vibrant-purple/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Icon name="BookOpen" size={24} className="text-vibrant-purple" />
                </div>
                <div className="absolute -top-4 -left-4 bg-success-green rounded-full p-3 shadow-lg">
                  <Icon name="Star" size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;