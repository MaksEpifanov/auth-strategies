# @packages/services

Пакет сервисов для управления пользователями и TODO-задачами в монорепозитории. Предоставляет типизированные сервисы для работы с данными через SQLite базы данных.

## Возможности

- 🔐 **Управление пользователями** - регистрация, аутентификация, управление ролями
- ✅ **Управление TODO-задачами** - создание, редактирование, удаление задач
- 🗄️ **SQLite базы данных** - легковесное хранение данных
- 🛡️ **Типизация** - полная типизация с TypeScript и валидация через TypeBox
- 🔄 **Singleton сервисы** - эффективное управление ресурсами

## Установка

```bash
bun install
```

## Использование

### Импорт сервисов

```typescript
import { usersService, todosService } from '@packages/services';
import type { User, Todo, CreateUserPayload } from '@packages/services';
```

### Работа с пользователями

```typescript
// Создание пользователя
const newUser = await usersService.create({
  login: 'john_doe',
  name: 'John Doe',
  password: 'securepassword123',
  role: 'user'
});

// Получение пользователя по логину
const user = await usersService.getByLogin('john_doe');

// Получение пользователя по ID
const userById = await usersService.getById(1);

// Получение всех пользователей
const users = await usersService.getUsers();

// Фильтрация по роли
const admins = await usersService.getUsers('admin');

// Обновление пользователя
const updatedUser = await usersService.update(userId, {
  login: 'new_login',
  name: 'New Name',
  password: 'newpassword',
  role: 'admin'
});

// Удаление пользователя
await usersService.delete(userId);
```

### Работа с TODO-задачами

```typescript
// Создание задачи
const newTodo = await todosService.create(userId, {
  title: 'Изучить TypeScript',
  description: 'Пройти курс по TypeScript',
  completed: 0
});

// Получение задач пользователя
const userTodos = await todosService.getTodos(userId);

// Получение конкретной задачи
const todo = await todosService.getById(userId, todoId);

// Обновление задачи
const updatedTodo = await todosService.update(userId, todoId, {
  title: 'Изучить TypeScript (обновлено)',
  description: 'Пройти продвинутый курс по TypeScript',
  completed: 1
});

// Удаление задачи
await todosService.delete(userId, todoId);
```

## Структура данных

### Пользователь (User)

```typescript
interface User {
  id: number;
  login: string;    // 4-40 символов
  name: string;     // 4-100 символов
  password: string; // хешированный пароль
  role: 'user' | 'admin';
}
```

### TODO-задача (Todo)

```typescript
interface Todo {
  id: number;
  userId: number;
  title: string;       // 4-100 символов
  description: string; // 4-1000 символов
  completed: 0 | 1;    // 0 = не выполнена, 1 = выполнена
}
```

## Валидация

Пакет использует TypeBox для валидации входных данных:

### Ограничения для пользователей
- **Логин**: 4-40 символов
- **Имя**: 4-100 символов
- **Пароль**: 8-100 символов (автоматически хешируется)
- **Роль**: 'user' или 'admin'

### Ограничения для задач
- **Заголовок**: 4-100 символов
- **Описание**: 4-1000 символов
- **Статус**: 0 (не выполнена) или 1 (выполнена)

## Безопасность

- Пароли автоматически хешируются с использованием `Bun.password.hash()`
- Валидация всех входных данных через TypeBox
- Роли пользователей для контроля доступа
- Изоляция данных пользователей (задачи привязаны к userId)

## Начальные данные

При первом запуске автоматически создаются тестовые данные:

### Пользователи
- **user1** / пароль: `user1` (роль: user)
- **user2** / пароль: `user2` (роль: user)
- **admin** / пароль: `admin` (роль: admin)

### TODO-задачи
- Несколько тестовых задач для пользователей user1 и user2

## API сервисов

### UsersService

| Метод | Описание | Параметры | Возвращает |
|-------|----------|-----------|------------|
| `create()` | Создание пользователя | `CreateUserPayload` | `User \| null` |
| `getUsers()` | Получение всех пользователей | `role?: Role` | `User[]` |
| `getById()` | Получение пользователя по ID | `id: UserId` | `User \| null` |
| `getByLogin()` | Получение пользователя по логину | `login: string` | `User \| null` |
| `update()` | Обновление пользователя | `id: UserId, payload: CreateUserPayload` | `User \| null` |
| `delete()` | Удаление пользователя | `id: string` | `void` |

### TodosService

| Метод | Описание | Параметры | Возвращает |
|-------|----------|-----------|------------|
| `create()` | Создание задачи | `userId: UserId, payload: CreateTodoPayload` | `Todo \| null` |
| `getTodos()` | Получение задач пользователя | `userId: UserId` | `Todo[]` |
| `getById()` | Получение задачи по ID | `userId: UserId, id: TodoId` | `Todo \| null` |
| `update()` | Обновление задачи | `userId: UserId, id: TodoId, payload: CreateTodoPayload` | `Todo \| null` |
| `delete()` | Удаление задачи | `userId: UserId, id: TodoId` | `Todo \| null` |

## Архитектура

### Структура пакета
```
src/
├── todos/
│   ├── _database/
│   │   ├── init.ts          # Инициализация БД
│   │   └── todos.ts         # Тестовые данные
│   ├── todos.model.ts       # Модели и типы
│   └── todos.service.ts     # Сервис для работы с задачами
├── users/
│   ├── _database/
│   │   ├── init.ts          # Инициализация БД
│   │   └── user.example.ts  # Тестовые данные
│   ├── users.model.ts       # Модели и типы
│   └── users.service.ts     # Сервис для работы с пользователями
```

### Принципы
- **Singleton Pattern**: Сервисы используют паттерн Singleton для эффективного управления ресурсами
- **Модульность**: Каждый сервис имеет свою структуру папок с моделями, базой данных и логикой
- **Типизация**: Полная типизация TypeScript с экспортом типов для использования в других пакетах
- **Валидация**: Входные данные валидируются через TypeBox DTO

## Разработка

```bash
# Запуск в режиме разработки
bun run index.ts

# Компиляция TypeScript
bun run start

# Генерация типов
tsc
```

## Зависимости

### Основные
- `elysia` - для типизации и валидации
- `typescript` - для типизации

### Системные
- `bun:sqlite` - для работы с SQLite (встроенный модуль Bun)
- `bun:password` - для хеширования паролей (встроенный модуль Bun)

### Workspace
- `@packages/tsconfig` - общие настройки TypeScript для монорепозитория

## Экспорты

### Сервисы
```typescript
export const usersService: UsersService;
export const todosService: TodosService;
```

### Типы
```typescript
// Пользователи
export type { User, CreateUserPayload, Role };

// Задачи
export type { Todo, CreateTodoPayload, TodoId };
```

### DTO для валидации
```typescript
// Пользователи
export { UserDTO, CreateUserDTO, RoleDTO };

// Задачи
export { TodoDTO, CreateTodoDTO };
```

## Лицензия

MIT
