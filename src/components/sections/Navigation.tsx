import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="text-xl sm:text-2xl font-inter font-bold text-vibrant-purple"
          МатемАтик 🧮
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 xl:space-x-8">
          <a href="#lessons" className="text-dark-text hover:text-vibrant-purple transition-colors">О занятиях</a>
          <a href="#teacher" className="text-dark-text hover:text-vibrant-purple transition-colors">О преподавателе</a>
          <a href="#program" className="text-dark-text hover:text-vibrant-purple transition-colors">Программа</a>
          <a href="#faq" className="text-dark-text hover:text-vibrant-purple transition-colors">FAQ</a>
          <a href="#booking" className="text-dark-text hover:text-vibrant-purple transition-colors">Записаться</a>
        </div>

        {/* Desktop Contact Button */}
        <Button className="hidden lg:flex bg-vibrant-purple hover:bg-purple-700 text-sm xl:text-base">
          <Icon name="Phone" size={16} />
          Связаться
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-purple-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#lessons" 
              className="block text-dark-text hover:text-vibrant-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              О занятиях
            </a>
            <a 
              href="#teacher" 
              className="block text-dark-text hover:text-vibrant-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              О преподавателе
            </a>
            <a 
              href="#program" 
              className="block text-dark-text hover:text-vibrant-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Программа
            </a>
            <a 
              href="#faq" 
              className="block text-dark-text hover:text-vibrant-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a 
              href="#booking" 
              className="block text-dark-text hover:text-vibrant-purple transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Записаться
            </a>
            <Button 
              className="w-full bg-vibrant-purple hover:bg-purple-700 mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon name="Phone" size={16} />
              Связаться
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;