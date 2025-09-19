"""
Business: Send and receive emails for booking chat system
Args: event with httpMethod, body; context with request_id  
Returns: HTTP response for email operations
"""

import json
import os
import psycopg2
import smtplib
import imaplib
import email
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import decode_header
from datetime import datetime
from typing import Dict, Any, List, Tuple

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'submit_form':
                # Handle form submission from website
                name = body_data.get('name', '').strip()
                city = body_data.get('city', '').strip()
                phone = body_data.get('phone', '').strip()
                time = body_data.get('time', '').strip()
                schedule = body_data.get('schedule', {})
                
                if not all([name, city, phone, time]):
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Все поля обязательны для заполнения'})
                    }
                
                # Simple timezone conversion (Moscow +3 to Vladivostok +10 = +7 hours)
                try:
                    hour, minute = map(int, time.split(':'))
                    vlad_hour = (hour + 7) % 24
                    vladivostok_time = f"{vlad_hour:02d}:{minute:02d}"
                except:
                    vladivostok_time = time
                
                # Get selected days from schedule
                selected_days = list(schedule.keys()) if schedule else []
                lesson_day_1 = selected_days[0] if len(selected_days) > 0 else ''
                lesson_day_2 = selected_days[1] if len(selected_days) > 1 else ''
                
                # Save to database
                cursor.execute(
                    "INSERT INTO student_applications (name, city, phone, local_time, vladivostok_time, timezone_offset, lesson_day_1, lesson_day_2) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                    (name, city, phone, time, vladivostok_time, 7, lesson_day_1, lesson_day_2)
                )
                
                app_id = cursor.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'message': 'Заявка успешно отправлена!',
                        'data': {
                            'id': app_id,
                            'local_time': time,
                            'vladivostok_time': vladivostok_time,
                            'lesson_days': [lesson_day_1, lesson_day_2] if lesson_day_1 and lesson_day_2 else [lesson_day_1] if lesson_day_1 else []
                        }
                    })
                }
            
            elif action == 'send_email':
                # Send email to client
                booking_id = body_data.get('booking_id')
                message_text = body_data.get('message')
                
                if not booking_id or not message_text:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'booking_id and message are required'})
                    }
                
                # Get booking details
                cursor.execute(f"SELECT name, phone FROM bookings WHERE id = {booking_id}")
                booking_row = cursor.fetchone()
                
                if not booking_row:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Booking not found'})
                    }
                
                client_name, client_phone = booking_row
                
                # Get email settings
                cursor.execute("SELECT smtp_host, smtp_port, smtp_user, smtp_password, smtp_secure FROM email_settings ORDER BY id DESC LIMIT 1")
                settings_row = cursor.fetchone()
                
                if not settings_row:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Email settings not configured'})
                    }
                
                smtp_host, smtp_port, smtp_user, smtp_password, smtp_secure = settings_row
                
                # Extract email from phone if it contains @, otherwise use a default format
                client_email = body_data.get('client_email')
                if not client_email:
                    if '@' in client_phone:
                        client_email = client_phone
                    else:
                        return {
                            'statusCode': 400,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            'body': json.dumps({'error': 'Client email is required'})
                        }
                
                try:
                    # Create email message
                    msg = MIMEMultipart()
                    msg['From'] = smtp_user
                    msg['To'] = client_email
                    msg['Subject'] = f'Ответ по заявке #{booking_id}'
                    
                    email_body = f"""
Здравствуйте, {client_name}!

{message_text}

---
С уважением,
Команда поддержки

Заявка #{booking_id}
"""
                    
                    msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
                    
                    # Send email
                    if smtp_secure:
                        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
                    else:
                        server = smtplib.SMTP(smtp_host, smtp_port)
                        server.starttls()
                    
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
                    server.quit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
                    }
                    
                except Exception as e:
                    return {
                        'statusCode': 500,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': False, 'error': f'Failed to send email: {str(e)}'})
                    }
            
            elif action == 'check_new_emails':
                # Check for new emails from clients
                # Get email settings
                cursor.execute("SELECT imap_host, imap_port, imap_user, imap_password, imap_secure FROM email_settings ORDER BY id DESC LIMIT 1")
                settings_row = cursor.fetchone()
                
                if not settings_row:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Email settings not configured'})
                    }
                
                imap_host, imap_port, imap_user, imap_password, imap_secure = settings_row
                
                try:
                    # Connect to IMAP server
                    if imap_secure:
                        mail = imaplib.IMAP4_SSL(imap_host, imap_port)
                    else:
                        mail = imaplib.IMAP4(imap_host, imap_port)
                    
                    mail.login(imap_user, imap_password)
                    mail.select('INBOX')
                    
                    # Search for unread emails
                    _, message_ids = mail.search(None, 'UNSEEN')
                    
                    new_messages = []
                    
                    for msg_id in message_ids[0].split():
                        _, msg_data = mail.fetch(msg_id, '(RFC822)')
                        email_body = msg_data[0][1]
                        email_message = email.message_from_bytes(email_body)
                        
                        # Get email details
                        subject = decode_header(email_message['Subject'])[0][0]
                        if isinstance(subject, bytes):
                            subject = subject.decode()
                        
                        from_email = email_message['From']
                        
                        # Extract booking ID from subject if present
                        booking_id_match = re.search(r'#(\d+)', subject)
                        booking_id = int(booking_id_match.group(1)) if booking_id_match else None
                        
                        # Get message content
                        message_content = ""
                        if email_message.is_multipart():
                            for part in email_message.walk():
                                if part.get_content_type() == "text/plain":
                                    message_content = part.get_payload(decode=True).decode()
                                    break
                        else:
                            message_content = email_message.get_payload(decode=True).decode()
                        
                        # Clean up message content (remove quoted text)
                        lines = message_content.split('\n')
                        clean_lines = []
                        for line in lines:
                            if line.strip().startswith('>') or '---' in line:
                                break
                            clean_lines.append(line)
                        
                        clean_message = '\n'.join(clean_lines).strip()
                        
                        if booking_id and clean_message:
                            # Add message to booking chat
                            message_escaped = clean_message.replace("'", "''")
                            from_email_escaped = from_email.replace("'", "''")
                            
                            insert_query = f"""
                                INSERT INTO booking_messages (booking_id, message, sender_type, sender_email)
                                VALUES ({booking_id}, '{message_escaped}', 'client', '{from_email_escaped}')
                                RETURNING id
                            """
                            
                            cursor.execute(insert_query)
                            message_id = cursor.fetchone()[0]
                            conn.commit()
                            
                            new_messages.append({
                                'booking_id': booking_id,
                                'message_id': message_id,
                                'from_email': from_email,
                                'message': clean_message
                            })
                        
                        # Mark email as read
                        mail.store(msg_id, '+FLAGS', '\\Seen')
                    
                    mail.logout()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': True,
                            'new_messages': new_messages,
                            'count': len(new_messages)
                        })
                    }
                    
                except Exception as e:
                    return {
                        'statusCode': 500,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'success': False, 'error': f'Failed to check emails: {str(e)}'})
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