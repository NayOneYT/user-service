# User Service API

Проект представляет собой API для управления пользователями (регистрация, авторизация, получение данных, блокировка).

## Стек технологий
Node.js, Express.js, TypeScript, JWT (для аутентификации), bcrypt (для хэширования паролей)

## Запуск проекта
1. Установите зависимости: npm install  
2. Запустите сервер: npm run start  

Сервер по умолчанию запускается на http://localhost:3000  
Скомпилированные TypeScript файлы сохраняются в папку dist. 

## API Эндпоинты

1. Регистрация нового пользователя  
   Метод: POST  
   URL: http://localhost:3000/api/auth/register  
   Тело запроса (JSON): { "full_name": "Иван Иванов", "date_of_birth": "1990-05-20", "email": "ivan@example.com", "password": "mypassword123", "role": "user" }  
   Поле role необязательно. Возможные значения: user, admin.  

2. Авторизация пользователя  
   Метод: POST  
   URL: http://localhost:3000/api/auth  
   Тело запроса (JSON): { "ID": "12345", "password": "mypassword123" }  

3. Получение пользователя по ID  
   Метод: GET  
   URL: http://localhost:3000/api/users/id  
   Заголовок: Authorization: Bearer <токен>  
4. Получение всех пользователей  
   Метод: GET  
   URL: http://localhost:3000/api/users  
   Заголовок: Authorization: Bearer <токен>  

5. Блокировка пользователя  
   Метод: PATCH  
   URL: http://localhost:3000/api/users/:id/block  
   Заголовок: Authorization: Bearer <токен>  
