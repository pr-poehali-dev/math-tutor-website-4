"""
Business: Admin panel API for managing bookings and messages
Args: event with httpMethod, body, queryStringParameters; context with request_id
Returns: HTTP response with booking data and chat messages
"""

import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any, List, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Get database connection
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration error'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        if method == 'GET':
            # Get all bookings with their messages
            query = """
                SELECT 
                    b.id, b.name, b.phone, b.role, b.grade, b.city,
                    b.schedule, b.schedule_vladivostok, b.user_timezone, 
                    b.goals, b.created_at, b.status,
                    m.id as message_id, m.message, m.sender_type, 
                    m.sender_email, m.created_at as message_created_at
                FROM bookings b
                LEFT JOIN booking_messages m ON b.id = m.booking_id
                ORDER BY b.created_at DESC, m.created_at ASC
            """
            cursor.execute(query)
            rows = cursor.fetchall()
            
            # Group messages by booking
            bookings_dict = {}
            for row in rows:
                booking_id = row[0]
                
                if booking_id not in bookings_dict:
                    bookings_dict[booking_id] = {
                        'id': row[0],
                        'name': row[1],
                        'phone': row[2],
                        'role': row[3],
                        'grade': row[4],
                        'city': row[5],
                        'schedule': json.loads(row[6]) if row[6] else {},
                        'schedule_vladivostok': json.loads(row[7]) if row[7] else {},
                        'user_timezone': row[8],
                        'goals': row[9],
                        'created_at': row[10].isoformat() if row[10] else None,
                        'status': row[11] or 'new',
                        'messages': []
                    }
                
                # Add message if exists
                if row[12]:  # message_id exists
                    bookings_dict[booking_id]['messages'].append({
                        'id': row[12],
                        'message': row[13],
                        'sender_type': row[14],
                        'sender_email': row[15],
                        'created_at': row[16].isoformat() if row[16] else None
                    })
            
            bookings_list = list(bookings_dict.values())
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'bookings': bookings_list})
            }
        
        elif method == 'POST':
            # Add new message to booking
            body_data = json.loads(event.get('body', '{}'))
            booking_id = body_data.get('booking_id')
            message = body_data.get('message')
            sender_type = body_data.get('sender_type', 'admin')
            sender_email = body_data.get('sender_email', '')
            
            if not booking_id or not message:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'booking_id and message are required'})
                }
            
            # Escape values for Simple Query Protocol
            message_escaped = message.replace("'", "''")
            sender_email_escaped = sender_email.replace("'", "''")
            
            insert_query = f"""
                INSERT INTO booking_messages (booking_id, message, sender_type, sender_email)
                VALUES ({booking_id}, '{message_escaped}', '{sender_type}', '{sender_email_escaped}')
                RETURNING id, created_at
            """
            
            cursor.execute(insert_query)
            result = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': result[0],
                    'created_at': result[1].isoformat()
                })
            }
        
        elif method == 'PUT':
            # Update booking status
            params = event.get('queryStringParameters', {})
            booking_id = params.get('id')
            body_data = json.loads(event.get('body', '{}'))
            status = body_data.get('status')
            
            if not booking_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'booking id and status are required'})
                }
            
            status_escaped = status.replace("'", "''")
            update_query = f"UPDATE bookings SET status = '{status_escaped}' WHERE id = {booking_id}"
            
            cursor.execute(update_query)
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()