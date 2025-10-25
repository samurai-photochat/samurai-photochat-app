# User Entity

Бизнес-сущность пользователя.

## Структура

- `api/` - API для работы с пользователями
- `model/` - Модель данных пользователя (будет добавлено)
- `ui/` - Переиспользуемые UI компоненты пользователя (будет добавлено)

## Public API

Экспортируется через `index.ts`:

- `publicUserApi` - RTK Query API для публичных данных пользователя
- `useGetTotalCountRegisteredUsersQuery` - хук для получения общего кол-ва пользователей
- `useGetUserProfileByIdQuery` - хук для получения профиля пользователя
- `PublicProfileResponse` - тип публичного профиля
