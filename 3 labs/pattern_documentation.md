Student name: Абраев Радмир
Date: 29.01.2026

Pattern name:
API Wrapper Pattern (Fetch Abstraction)

## Description:
Паттерн инкапсулирует fetch API в унифицированный интерфейс для HTTP-запросов обеспечивая централизованную обработку ошибок, заголовков и interceptors

## Context Outline
Паттерн эффективен в следующих контекстах:
-Single Page Application с множественными API endpoints
-Микросервисная архитектура с разными beackend сервисами
-Проекты с authenyication требующие автоматического добавления токенов
-Приложения с retry logic для нестабильных соединений 
-Системы с централизованным логированием API request/responses

## Problems Statement
Разработчики сталкиваются с проблемами при работа с fetch API:
1. **Code Duplication**: повторяющаяся логика error handling в каждом запросе
2. **Inconsistent Error Handling**: разные подходы к обработке network/HTTP ошибок
3. **Manual Header Management**: необходимость вручную добавлять auth токены и  headers
4. **No Built-in Timeout**: fetch не имеет встроенного timeout механизма
5. **Scattered Configuration**: base URL и default параметры разюросаны по коду

Это приводит к багам, усложнению тестирования и снижению maintainability

## Solution 
Паттерн решает проблему через создание абстракции над fetch API:
1. **Создать класс ApiWrapper** с configuration (baseURL, timeout, headers)
2. **Реализоваться HTTP методы** (get, post, put, delete) с единной сигнатурой 
3. **Добавить request interceptor**
4. **Добавить response interceptor** для обработки ответов (error hendling, parsing)
5. **Реализовать timeout mechanism** через AbortController 
6. **Создать typed error classes** для  классификации ошибок (NetworlError, HttpError)
7. **Экспортировать singleton instance** для использования в приложении
