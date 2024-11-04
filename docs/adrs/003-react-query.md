# ADR 3: Использование React Query для управления состоянием данных

## Контекст

Для работы с серверными данными мне нужно было эффективное решение, которое бы упрощало управление асинхронными запросами, кэширование, обработку ошибок и обновление данных в реальном времени.

## Решение

Я выбрала React Query, потому что эта библиотека идеально справляется с задачами, связанными с запросами и синхронизацией данных с сервером. React Query предоставляет удобные хуки для кэширования, автоматического рефетчинга и обновления данных, избавляя от необходимости вручную управлять состоянием и повторно вызывать запросы.

## Причины выбора

- Автоматическое кэширование: данные кэшируются и переиспользуются, что снижает количество запросов
- Автоматическое обновление: React Query автоматически обновляет кэш при изменении данных, что делает интерфейс отзывчивее
- Простота в использовании + уже есть опыт работы с хуками React Query

## Итог

React Query позволил мне сосредоточиться на логике интерфейса, а не на ручном управлении состоянием данных, что значительно ускорило разработку и повысило стабильность приложения.