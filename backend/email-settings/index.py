"""
Business: Manage SMTP/IMAP email settings and test connections
Args: event with httpMethod, body; context with request_id
Returns: HTTP response with email settings and test results
"""

import json
import os
import psycopg2
import smtplib
import imaplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
            # Get email settings
            cursor.execute("SELECT * FROM email_settings ORDER BY id DESC LIMIT 1")
            row = cursor.fetchone()
            
            if row:
                settings = {
                    'id': row[0],
                    'smtp_host': row[1],
                    'smtp_port': row[2],
                    'smtp_user': row[3],
                    'smtp_password': '***' if row[4] else '',  # Hide password
                    'smtp_secure': row[5],
                    'imap_host': row[6],
                    'imap_port': row[7],
                    'imap_user': row[8],
                    'imap_password': '***' if row[9] else '',  # Hide password
                    'imap_secure': row[10]
                }
            else:
                settings = {}
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'settings': settings})
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'test_smtp':
                # Test SMTP connection
                smtp_host = body_data.get('smtp_host')
                smtp_port = body_data.get('smtp_port', 587)
                smtp_user = body_data.get('smtp_user')
                smtp_password = body_data.get('smtp_password')
                smtp_secure = body_data.get('smtp_secure', True)
                
                try:
                    # Create SMTP connection
                    if smtp_secure:
                        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
                    else:
                        server = smtplib.SMTP(smtp_host, smtp_port)
                        server.starttls()
                    
                    server.login(smtp_user, smtp_password)
                    server.quit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': True, 'message': 'SMTP connection successful'})
                    }
                    
                except Exception as e:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': False, 'error': str(e)})
                    }
            
            elif action == 'test_imap':
                # Test IMAP connection
                imap_host = body_data.get('imap_host')
                imap_port = body_data.get('imap_port', 993)
                imap_user = body_data.get('imap_user')
                imap_password = body_data.get('imap_password')
                imap_secure = body_data.get('imap_secure', True)
                
                try:
                    # Create IMAP connection
                    if imap_secure:
                        mail = imaplib.IMAP4_SSL(imap_host, imap_port)
                    else:
                        mail = imaplib.IMAP4(imap_host, imap_port)
                    
                    mail.login(imap_user, imap_password)
                    mail.select('INBOX')
                    mail.logout()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': True, 'message': 'IMAP connection successful'})
                    }
                    
                except Exception as e:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': False, 'error': str(e)})
                    }
        
        elif method == 'PUT':
            # Save email settings
            body_data = json.loads(event.get('body', '{}'))
            
            # Escape values for Simple Query Protocol
            smtp_host = body_data.get('smtp_host', '').replace("'", "''")
            smtp_port = int(body_data.get('smtp_port', 587))
            smtp_user = body_data.get('smtp_user', '').replace("'", "''")
            smtp_password = body_data.get('smtp_password', '').replace("'", "''")
            smtp_secure = body_data.get('smtp_secure', True)
            
            imap_host = body_data.get('imap_host', '').replace("'", "''")
            imap_port = int(body_data.get('imap_port', 993))
            imap_user = body_data.get('imap_user', '').replace("'", "''")
            imap_password = body_data.get('imap_password', '').replace("'", "''")
            imap_secure = body_data.get('imap_secure', True)
            
            # Delete old settings and insert new ones
            cursor.execute("DELETE FROM email_settings")
            
            insert_query = f"""
                INSERT INTO email_settings (
                    smtp_host, smtp_port, smtp_user, smtp_password, smtp_secure,
                    imap_host, imap_port, imap_user, imap_password, imap_secure
                ) VALUES (
                    '{smtp_host}', {smtp_port}, '{smtp_user}', '{smtp_password}', {smtp_secure},
                    '{imap_host}', {imap_port}, '{imap_user}', '{imap_password}', {imap_secure}
                )
                RETURNING id
            """
            
            cursor.execute(insert_query)
            settings_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'id': settings_id})
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