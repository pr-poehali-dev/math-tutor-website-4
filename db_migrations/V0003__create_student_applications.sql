-- Создание таблицы для хранения заявок с расписанием занятий
CREATE TABLE student_applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    local_time VARCHAR(50) NOT NULL,
    vladivostok_time VARCHAR(50) NOT NULL,
    timezone_offset INTEGER NOT NULL,
    lesson_day_1 VARCHAR(20) NOT NULL,
    lesson_day_2 VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);