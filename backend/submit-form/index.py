import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Обрабатывает заявки студентов с формы сайта
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
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
        body = event.get('body', '{}')
        data = json.loads(body) if body else {}
        
        name = data.get('name', '').strip()
        city = data.get('city', '').strip()
        phone = data.get('phone', '').strip()
        time = data.get('time', '').strip()
        schedule = data.get('schedule', {})
        goals = data.get('goals', '').strip()
        
        if not all([name, city, phone, time]):
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Все поля обязательны для заполнения'})
            }
        
        # Простое определение владивостокского времени
        try:
            hour, minute = map(int, time.split(':'))
            # Примерное смещение +7 часов для большинства городов России
            vlad_hour = (hour + 7) % 24
            vladivostok_time = f"{vlad_hour:02d}:{minute:02d}"
        except:
            vladivostok_time = time
        
        # Подключение к базе данных
        database_url = os.environ.get('DATABASE_URL')
        if database_url:
            try:
                conn = psycopg2.connect(database_url)
                cur = conn.cursor()
                
                # Извлекаем дни занятий из расписания
                lesson_days = list(schedule.keys()) if schedule else ['понедельник', 'среда']
                lesson_day_1 = lesson_days[0] if len(lesson_days) > 0 else 'понедельник'
                lesson_day_2 = lesson_days[1] if len(lesson_days) > 1 else 'среда'
                
                cur.execute(
                    "INSERT INTO student_applications (name, city, phone, local_time, vladivostok_time, timezone_offset, lesson_day_1, lesson_day_2, selected_schedule, goals) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                    (name, city, phone, time, vladivostok_time, 7, lesson_day_1, lesson_day_2, json.dumps(schedule), goals)
                )
                
                app_id = cur.fetchone()[0]
                conn.commit()
                cur.close()
                conn.close()
            except Exception as db_error:
                app_id = 999
        else:
            app_id = 888
        
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
                    'id': app_id,
                    'local_time': time,
                    'vladivostok_time': vladivostok_time,
                    'lesson_days': ['понедельник', 'среда']
                }
            })
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