import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save booking form data to PostgreSQL database
    Args: event - dict with httpMethod, body containing form data
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse request body
        body_data = json.loads(event.get('body', '{}'))
        
        # Extract form data
        name = body_data.get('name', '').strip()
        phone = body_data.get('phone', '').strip()
        role = body_data.get('role', '').strip()
        grade = body_data.get('grade', '').strip()
        city = body_data.get('city', '').strip()
        goals = body_data.get('goals', '').strip()
        schedule = body_data.get('schedule', {})
        schedule_vladivostok = body_data.get('schedule_vladivostok', {})
        user_timezone = body_data.get('user_timezone', '')
        
        # Validate required fields
        if not all([name, phone, role, grade, city]):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        # Connect to database
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database configuration error'})
            }
        
        # Insert booking into database
        conn = psycopg2.connect(database_url)
        try:
            cursor = conn.cursor()
            insert_query = """
                INSERT INTO bookings (
                    name, phone, role, grade, city, 
                    schedule, schedule_vladivostok, user_timezone, goals
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """
            
            cursor.execute(insert_query, (
                name, phone, role, grade, city,
                json.dumps(schedule), json.dumps(schedule_vladivostok),
                user_timezone, goals
            ))
            
            booking_id = cursor.fetchone()[0]
            conn.commit()
            cursor.close()
        finally:
            conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'booking_id': booking_id,
                'message': 'Заявка успешно сохранена'
            })
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON format'})
        }
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Database error: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }