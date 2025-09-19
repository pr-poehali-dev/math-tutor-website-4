import json
import os
import psycopg2
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all bookings from database with filtering and pagination
    Args: event - dict with httpMethod, queryStringParameters for filters
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with bookings list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Get query parameters for filtering
        params = event.get('queryStringParameters') or {}
        city_filter = params.get('city', '').strip()
        grade_filter = params.get('grade', '').strip()
        role_filter = params.get('role', '').strip()
        search_query = params.get('search', '').strip()
        limit = min(int(params.get('limit', '50')), 100)  # Max 100 records
        offset = int(params.get('offset', '0'))
        
        # Connect to database
        database_url = os.environ.get('DATABASE_URL')
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Database configuration error'})
            }
        
        conn = psycopg2.connect(database_url)
        try:
            cursor = conn.cursor()
            
            # Build dynamic query with filters
            where_conditions = []
            query_params = []
            
            if city_filter:
                where_conditions.append("city ILIKE %s")
                query_params.append(f'%{city_filter}%')
            
            if grade_filter:
                where_conditions.append("grade = %s")
                query_params.append(grade_filter)
            
            if role_filter:
                where_conditions.append("role = %s")
                query_params.append(role_filter)
            
            if search_query:
                where_conditions.append("(name ILIKE %s OR phone ILIKE %s)")
                query_params.extend([f'%{search_query}%', f'%{search_query}%'])
            
            where_clause = ""
            if where_conditions:
                where_clause = "WHERE " + " AND ".join(where_conditions)
            
            # Main query for bookings
            select_query = f"""
                SELECT 
                    id, name, phone, role, grade, city, 
                    schedule, schedule_vladivostok, user_timezone, 
                    goals, created_at
                FROM bookings 
                {where_clause}
                ORDER BY created_at DESC 
                LIMIT %s OFFSET %s
            """
            
            query_params.extend([limit, offset])
            cursor.execute(select_query, query_params)
            
            # Convert results to list of dictionaries
            columns = [desc[0] for desc in cursor.description]
            bookings = []
            
            for row in cursor.fetchall():
                booking = dict(zip(columns, row))
                # Convert datetime to ISO string for JSON serialization
                if booking['created_at']:
                    booking['created_at'] = booking['created_at'].isoformat()
                # Parse JSON fields
                booking['schedule'] = json.loads(booking['schedule']) if booking['schedule'] else {}
                booking['schedule_vladivostok'] = json.loads(booking['schedule_vladivostok']) if booking['schedule_vladivostok'] else {}
                bookings.append(booking)
            
            # Get total count for pagination
            count_query = f"SELECT COUNT(*) FROM bookings {where_clause}"
            count_params = query_params[:-2]  # Remove limit and offset
            cursor.execute(count_query, count_params)
            total_count = cursor.fetchone()[0]
            
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
                'bookings': bookings,
                'total': total_count,
                'limit': limit,
                'offset': offset,
                'has_more': offset + limit < total_count
            })
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