-- Создание таблицы для хранения заявок с формы
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  city VARCHAR(255) NOT NULL,
  schedule JSONB NOT NULL,
  schedule_vladivostok JSONB NOT NULL,
  user_timezone VARCHAR(100),
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска по дате создания
CREATE INDEX idx_bookings_created_at ON bookings(created_at);

-- Индекс для поиска по городу
CREATE INDEX idx_bookings_city ON bookings(city);

-- Индекс для поиска по классу
CREATE INDEX idx_bookings_grade ON bookings(grade);