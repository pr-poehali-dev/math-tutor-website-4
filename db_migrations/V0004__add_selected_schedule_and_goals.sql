-- Добавляем поле для хранения полного расписания клиента
ALTER TABLE t_p67460326_math_tutor_website_4.student_applications 
ADD COLUMN selected_schedule JSONB;

-- Добавляем поле для хранения дополнительных целей/пожеланий
ALTER TABLE t_p67460326_math_tutor_website_4.student_applications 
ADD COLUMN goals TEXT;