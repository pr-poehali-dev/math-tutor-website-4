import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Анна",
      role: "мама пятиклассника",
      text: "Илья - молодец! 👏 целеустремленный и очень терпеливый молодой преподаватель. Он нашел подход к моему очень непростому ребенку, который ненавидит учиться, а сейчас приходит после занятия и рассказывает с восторгом, как много он решил примеров и задач. Очень рады, что обратились к Илье! Рекомендую 👌"
    },
    {
      name: "Диана",
      role: "девятиклассница",
      text: "все супер, Илья лучший преподаватель. Объясняет все в доступном формате не как на уроках)) Если вы хотите хороший бал по ОГЭ и при этом заниматься в полном комфорте, то вы нашли его! Всем девятиклассникам рекомендую."
    },
    {
      name: "Ирина",
      role: "мама восьмиклассника",
      text: "Искала репетитора сыну подростку, выбор пал на Илью. Сын алгебру подтянул. И это главное! Илью.,как репетитора, рекомендую. Всё доходчиво объясняет. Занимаемся с ним второй год. Сыну нравится!"
    },
    {
      name: "Ильгина",
      role: "мама восьмиклассника",
      text: "Остались довольны работой Ильи, из многих репетиторов сыну было комфортно заниматься именно с ним. Сейчас он получает только 5ки, очень внятно все объяснил, спасибо вам большое."
    },
    {
      name: "Марина",
      role: "мама девятиклассника",
      text: "Сыну нравится заниматься с преподавателем 👍"
    },
    {
      name: "Анна",
      role: "мама девятиклассника",
      text: "Хотела, чтобы репетитором для сына был молодой человек. Характер у сына тяжелый, не со всеми идет на контакт. С Ильей комфортно в общении, что очень важно. Объясняет доступно, сыну нравится. Отличный репетитор, рекомендую."
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-dark-text mb-4">Отзывы</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Что говорят ученики и родители о занятиях
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-vibrant-purple to-success-green rounded-full flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-inter font-semibold text-dark-text text-sm sm:text-base">{review.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">"{review.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Больше отзывов в моем профиле на Авито
            </p>
            <a 
              href="https://www.avito.ru/user/155c8c7b68f029d55e8fd73fe762f0ff/profile?src=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-vibrant-purple to-success-green text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-green-600 transition-colors text-sm md:text-base font-medium"
            >
              <Icon name="ExternalLink" size={20} />
              <span>Смотреть на Авито</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;