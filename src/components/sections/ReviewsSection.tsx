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
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-inter font-bold text-dark-text mb-4">Отзывы</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Что говорят ученики и родители о занятиях
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-vibrant-purple to-success-green rounded-full flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-inter font-semibold text-dark-text">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{review.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;