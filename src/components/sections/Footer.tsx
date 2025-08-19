import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
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
  );
};

export default Footer;