# Cargo Auction SPA

SPA для работы с грузовыми аукционами: список и фильтрация аукционов,
детальная страница, история ставок и установка своей ставки.

## Стек

- React 19 и TypeScript
- Vite
- TanStack Router и TanStack Query
- React Hook Form и Zod
- MobX для точечного клиентского UI-state
- MSW для mock API
- Tailwind CSS и shadcn/ui
- Vitest

## Требования

- Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`
- pnpm `>=10`

Для разработки рекомендуется Node.js `24.15.0`; версия указана в `.nvmrc`.
Проверенная версия pnpm `10.13.1` указана в поле `packageManager`. Минимальные
требования зафиксированы в `package.json`.

## Запуск с mock API

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

После запуска приложение доступно по адресу, который выведет Vite (обычно
`http://localhost:5173`).

Настройки mock API в `.env.local`:

```dotenv
VITE_API_URL=/api/v1
VITE_ENABLE_MSW=true
VITE_MSW_DELAY_MS=500
```

- `VITE_ENABLE_MSW=true` включает браузерный MSW.
- `VITE_MSW_DELAY_MS` задаёт искусственную задержку ответов в миллисекундах.
- Состояние mock-хранилища живёт до перезагрузки страницы. Установка ставки
  обновляет список, detail и историю ставок.

### Проверка production-сборки

После установки зависимостей и создания `.env.local` production-версию можно
собрать и запустить локально:

```bash
pnpm build
pnpm preview
```

Приложение будет доступно по адресу, который выведет Vite (обычно
`http://localhost:4173`). При `VITE_ENABLE_MSW=true` production preview также
использует mock API.

Для полной автоматической проверки проекта выполните:

```bash
pnpm check
```

Команда проверяет актуальность OpenAPI-типов, ESLint, форматирование,
TypeScript, тесты и production build.

## Основные маршруты

- `/auctions` — список аукционов.
- `/auctions/{auctionUuid}` — детальная страница.
- `/auctions/{auctionUuid}/bets` — история ставок.
- `/auctions/{auctionUuid}?action=place-bet` — detail с открытой формой ставки.

Фильтры, пагинация и сортировка списка синхронизируются с URL. Некорректные
search params валидируются Zod-схемами и заменяются безопасными значениями.

## Команды

```bash
pnpm dev          # локальная разработка
pnpm build        # production build
pnpm preview      # просмотр production build
pnpm test:run     # однократный запуск тестов
pnpm lint         # ESLint
pnpm typecheck    # проверка TypeScript
pnpm format:check # проверка форматирования
pnpm check        # OpenAPI, lint, format, types, tests и build
```

Перед отправкой изменений рекомендуется выполнить:

```bash
pnpm check
```

## OpenAPI

Типы API генерируются из `openapi/openapi.auctions.v0.json`:

```bash
pnpm api:generate
```

Проверить, что сгенерированная схема актуальна:

```bash
pnpm api:check
```

Файл `src/shared/api/generated/schema.ts` не следует редактировать вручную.

## Архитектура

Проект организован по Feature-Sliced Design:

- `app` — инициализация приложения, providers и routes;
- `pages` — композиция страниц;
- `features` — фильтрация и установка ставки;
- `entities` — API и представление аукциона;
- `shared` — API-клиент, mock API, общие библиотеки и UI-kit.

Направления зависимостей и импорты через public API проверяются ESLint.

## AI Usage

Описание использования AI при выполнении задания находится в
[`AI_USAGE.md`](./AI_USAGE.md).
