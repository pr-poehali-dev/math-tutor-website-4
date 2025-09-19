-- Add status column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';

-- Create booking_messages table for chat functionality
CREATE TABLE IF NOT EXISTS booking_messages (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES bookings(id),
    message TEXT NOT NULL,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('admin', 'client')),
    sender_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_booking_messages_booking_id ON booking_messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_messages_created_at ON booking_messages(created_at);

-- Create email_settings table for SMTP/IMAP configuration
CREATE TABLE IF NOT EXISTS email_settings (
    id SERIAL PRIMARY KEY,
    smtp_host VARCHAR(255),
    smtp_port INTEGER,
    smtp_user VARCHAR(255),
    smtp_password VARCHAR(255),
    smtp_secure BOOLEAN DEFAULT true,
    imap_host VARCHAR(255),
    imap_port INTEGER,
    imap_user VARCHAR(255),
    imap_password VARCHAR(255),
    imap_secure BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);