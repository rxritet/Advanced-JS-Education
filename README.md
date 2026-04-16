# Advanced JavaScript Labs

Учебный репозиторий с лабораторными работами по курсу Advanced JavaScript.
Содержит практику по:

- React (включая Context, HOC, hooks)
- TypeScript и JavaScript (ES6+)
- асинхронному программированию
- архитектурным шаблонам (MVC, MVVM)
- паттернам проектирования GoF
- анализу и модернизации кода

## Технологии

- JavaScript (ES6+)
- TypeScript
- React 18
- Vite
- Node.js + npm

## Структура репозитория

```text
├─ 1 labs/
│  ├─ lab 1.1/
│  └─ lab 1.2/                # React + TypeScript + Vite
├─ 2 labs/                    # отчеты
├─ 3 labs/                    # анализ и документация
├─ 5 labs/                    # legacy и modernization
├─ 6 labs/                    # классификация и выбор паттернов
├─ 7 labs/                    # Singleton, Factory Method
├─ 8 labs/                    # Flyweight, Event Delegation
├─ 9 labs/                    # Pub/Sub, Command, Mediator
├─ 10 labs/                   # MVC, MVVM
├─ 11 labs/                   # async abstractions
├─ 13 labs/                   # React patterns: HOC, hooks
└─ 14 labs/                   # backend + island architecture
```

## Карта лабораторных

| Папка | Краткое содержание |
|---|---|
| `1 labs/lab 1.2` | React-приложение на Vite: компоненты, контекст, типы, стили, ESLint |
| `2 labs` | Общие отчеты и аналитические материалы |
| `3 labs` | Function analysis, pattern documentation и quality assessment |
| `5 labs` | Анализ legacy-кода и модернизированная версия модулей |
| `6 labs` | Классификация GoF и сценарии выбора паттернов |
| `7 labs` | Реализации Singleton и Factory (уведомления) |
| `8 labs` | Flyweight (рендер леса) и делегирование событий (todo) |
| `9 labs` | Observer/Pub-Sub, Command, Mediator |
| `10 labs` | Архитектурные шаблоны MVC и MVVM |
| `11 labs` | Асинхронные утилиты: queue, retry, cancellable fetcher, pipeline |
| `13 labs` | React-паттерны: Context/HOC и набор custom hooks |
| `14 labs` | Node.js server и задание с island-engine |

## Быстрый старт

### 1. Клонирование

```bash
git clone https://github.com/Rad1o4kt1vchik/advanced-js-homework.git
cd advanced-js-homework
```

### 2. Запуск React-проекта (лаба 1.2)

```bash
cd "1 labs/lab 1.2"
npm install
npm run dev
```

### 3. Линт и сборка (лаба 1.2)

```bash
npm run lint
npm run build
```

### 4. Запуск Node.js сервера (лаба 14/task-1)

```bash
cd "14 labs/task-1/server"
npm install
npm start
```

## Как запускать остальные задания

- Папки с `index.html` можно открыть напрямую в браузере или через Live Server.
- Для заданий с `package.json` используйте стандартный цикл:

```bash
npm install
npm run dev
```

или

```bash
npm start
```

в зависимости от скриптов конкретной лабораторной.

## Примечания

- Названия директорий и файлов сохранены в формате, заданном в лабораторных.
- В ряде папок есть дополнительные отчеты: `README.md`, `AI_REPORT.md` и тематические `.md` файлы.

## Автор

Radmir Abraev
