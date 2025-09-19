import json
import os
import psycopg2
from datetime import datetime, timedelta
from typing import Dict, Any, Tuple

def get_timezone_offset_by_city(city: str) -> int:
    """
    Определяет смещение часового пояса относительно UTC по городу.
    Возвращает смещение в часах.
    """
    # Основные города России и их часовые пояса (смещение от UTC)
    city_timezones = {
        # Калининградское время (UTC+2)
        'калининград': 2,
        'советск': 2,
        'гусев': 2,
        
        # Московское время (UTC+3)
        'москва': 3, 'санкт-петербург': 3, 'петербург': 3, 'спб': 3,
        'новгород': 3, 'псков': 3, 'смоленск': 3, 'брянск': 3,
        'орел': 3, 'курск': 3, 'белгород': 3, 'воронеж': 3,
        'липецк': 3, 'тамбов': 3, 'рязань': 3, 'тула': 3,
        'калуга': 3, 'владимир': 3, 'иваново': 3, 'ярославль': 3,
        'кострома': 3, 'вологда': 3, 'череповец': 3, 'архангельск': 3,
        'мурманск': 3, 'петрозаводск': 3, 'сыктывкар': 3,
        'нижний новгород': 3, 'киров': 3, 'йошкар-ола': 3,
        'чебоксары': 3, 'казань': 3, 'ульяновск': 3, 'саранск': 3,
        'пенза': 3, 'саратов': 3, 'волгоград': 3, 'астрахань': 3,
        'элиста': 3, 'ростов-на-дону': 3, 'краснодар': 3,
        'ставрополь': 3, 'майкоп': 3, 'черкесск': 3, 'нальчик': 3,
        'владикавказ': 3, 'грозный': 3, 'махачкала': 3,
        
        # Самарское время (UTC+4)
        'самара': 4, 'тольятти': 4, 'оренбург': 4, 'уфа': 4,
        'стерлитамак': 4, 'салават': 4, 'ижевск': 4, 'глазов': 4,
        
        # Екатеринбургское время (UTC+5)
        'екатеринбург': 5, 'пермь': 5, 'березники': 5, 'соликамск': 5,
        'челябинск': 5, 'магнитогорск': 5, 'златоуст': 5,
        'курган': 5, 'тюмень': 5, 'нижневартовск': 5, 'сургут': 5,
        'ханты-мансийск': 5, 'салехард': 5, 'надым': 5,
        
        # Омское время (UTC+6) 
        'омск': 6, 'новосибирск': 6, 'бердск': 6, 'искитим': 6,
        'барнаул': 6, 'бийск': 6, 'рубцовск': 6, 'горно-алтайск': 6,
        'кемерово': 6, 'новокузнецк': 6, 'прокопьевск': 6,
        'ленинск-кузнецкий': 6, 'киселевск': 6, 'междуреченск': 6,
        'томск': 6, 'северск': 6, 'стрежевой': 6,
        
        # Красноярское время (UTC+7)
        'красноярск': 7, 'норильск': 7, 'ачинск': 7, 'канск': 7,
        'минусинск': 7, 'абакан': 7, 'черногорск': 7, 'саяногорск': 7,
        'кызыл': 7, 'ак-довурак': 7,
        
        # Иркутское время (UTC+8)
        'иркутск': 8, 'ангарск': 8, 'братск': 8, 'усть-илимск': 8,
        'черемхово': 8, 'шелехов': 8, 'улан-удэ': 8, 'северобайкальск': 8,
        'гусиноозерск': 8, 'закаменск': 8,
        
        # Якутское время (UTC+9)
        'якутск': 9, 'мирный': 9, 'ленск': 9, 'алдан': 9,
        'нерюнгри': 9, 'олекминск': 9, 'покровск': 9,
        'чита': 9, 'краснокаменск': 9, 'борзя': 9, 'петровск-забайкальский': 9,
        'благовещенск': 9, 'белогорск': 9, 'свободный': 9, 'зея': 9,
        'тында': 9, 'райчихинск': 9,
        
        # Владивостокское время (UTC+10)
        'владивосток': 10, 'уссурийск': 10, 'находка': 10, 'артем': 10,
        'спасск-дальний': 10, 'дальнегорск': 10, 'партизанск': 10,
        'хабаровск': 10, 'комсомольск-на-амуре': 10, 'амурск': 10,
        'советская гавань': 10, 'николаевск-на-амуре': 10,
        'южно-сахалинск': 10, 'холмск': 10, 'корсаков': 10, 'оха': 10,
        'поронайск': 10, 'долинск': 10,
        
        # Магаданское время (UTC+11)
        'магадан': 11, 'сусуман': 11, 'омсукчан': 11,
        'петропавловск-камчатский': 11, 'елизово': 11, 'вилючинск': 11,
        'мильково': 11, 'эссо': 11, 'усть-камчатск': 11,
        
        # Камчатское время (UTC+12)
        'анадырь': 12, 'билибино': 12, 'певек': 12, 'провидения': 12
    }
    
    # Приводим город к нижнему регистру для поиска
    city_lower = city.lower().strip()
    
    # Ищем точное совпадение
    if city_lower in city_timezones:
        return city_timezones[city_lower]
    
    # Ищем частичное совпадение (если в названии города есть ключевое слово)
    for city_key, offset in city_timezones.items():
        if city_key in city_lower or city_lower in city_key:
            return offset
    
    # По умолчанию возвращаем московское время
    return 3

def convert_to_vladivostok_time(local_time: str, local_timezone_offset: int) -> str:
    """
    Конвертирует локальное время в владивостокское время.
    local_time в формате "HH:MM"
    """
    vladivostok_offset = 10  # UTC+10
    
    try:
        # Парсим время
        hour, minute = map(int, local_time.split(':'))
        
        # Вычисляем разность часовых поясов
        time_diff = vladivostok_offset - local_timezone_offset
        
        # Конвертируем время
        new_hour = (hour + time_diff) % 24
        
        return f"{new_hour:02d}:{minute:02d}"
    except:
        return local_time  # Возвращаем исходное время в случае ошибки

def get_lesson_days() -> Tuple[str, str]:
    """
    Возвращает два дня недели для занятий.
    По умолчанию понедельник и среда.
    """
    return ("понедельник", "среда")

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Сохраняет заявку студента в базу данных с конвертацией времени во владивостокское.
    
    Args:
        event: dict с httpMethod, body, headers
        context: объект с атрибутами request_id, function_name и др.
    
    Returns:
        HTTP response dict
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Парсим данные из формы
        body_data = json.loads(event.get('body', '{}'))
        
        name = body_data.get('name', '').strip()
        city = body_data.get('city', '').strip()
        phone = body_data.get('phone', '').strip()
        time = body_data.get('time', '').strip()
        
        # Валидация данных
        if not all([name, city, phone, time]):
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Все поля обязательны для заполнения'})
            }
        
        # Определяем часовой пояс по городу
        timezone_offset = get_timezone_offset_by_city(city)
        
        # Конвертируем время во владивостокское
        vladivostok_time = convert_to_vladivostok_time(time, timezone_offset)
        
        # Определяем дни занятий
        day1, day2 = get_lesson_days()
        
        # Подключение к базе данных
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Database connection not configured'})
            }
        
        # Сохраняем в базу данных
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute(
            """
            INSERT INTO student_applications 
            (name, city, phone, local_time, vladivostok_time, timezone_offset, lesson_day_1, lesson_day_2)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (name, city, phone, time, vladivostok_time, timezone_offset, day1, day2)
        )
        
        application_id = cur.fetchone()[0]
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена!',
                'data': {
                    'id': application_id,
                    'local_time': time,
                    'vladivostok_time': vladivostok_time,
                    'timezone_offset': timezone_offset,
                    'lesson_days': [day1, day2]
                }
            })
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Invalid JSON format'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }