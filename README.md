# Admin Dashboard (test task for MirraGames)
## Запуск backend (API на http://localhost:5000)
> 
    cd backend
> 
    dotnet run
> 
    bash
## Запуск frontend (React на http://localhost:5173)
>
    cd frontend
>
    npm install
>
    npm run dev

### Данные для входа
**Email**: admin@mirra.dev
**Password**: *admin123*

## Примеры API-запросов
### Получение токена авторизации
>
    bash
    curl -X POST http://localhost:5000/auth/login ^
    -H "Content-Type: application/json" ^
    -d "{\"email\":\"admin@mirra.dev\",\"password\":\"admin123\"}"
### Получение информации о клиентах
>
    bash
    curl http://localhost:5000/clients ^
    -H "Authorization: Bearer <ВАШ_JWT_ТОКЕН>"
### Получение информации о платежах
>
    bash
    curl http://localhost:5000/payments ^
    -H "Authorization: Bearer <ВАШ_JWT_ТОКЕН>"
### Получение информации о курсе валюты
>
    bash
    curl http://localhost:5000/rate ^
    -H "Authorization: Bearer <ВАШ_JWT_ТОКЕН>"
___
## Структура проекта
+ backend/ — **.NET API (C#)**
+ frontend/ — **React-приложение (TypeScript)**
