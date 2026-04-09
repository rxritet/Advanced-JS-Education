# AI_REPORT — Lab 13: React Component Patterns

**Student:** Радмир Абраев  
**Date:** 09.04.2026  
**Tool used:** Perplexity AI (GPT-4 класс)

---

## 1. Какой инструмент использовался

Perplexity AI — для анализа условий лабы, генерации
структуры проекта и исправления ошибок из PDF.

---

## 2. Что просил у AI (промпты)

- "Проанализируй задания из лабораторной работы.
   Составь структуру и дай код каждого файла."
- "Сделай общий AI_REPORT"

---

## 3. Что AI сделал

- Прочитал PDF полностью (25 страниц)
- Выявил 2 критических бага в коде из условия
- Сгенерировал все 9 файлов с кодом + 2 README

---

## 4. Найденные ошибки в PDF и как исправил

### Ошибка 1 — Конфликт имён в ThemedComponents.jsx

PDF содержит:
```js
function ThemedButton({ theme, ... }) { ... }
export const ThemedButton = withTheme(ThemedButton); // ❌ redeclaration
```
**Фикс:** Внутренние функции переименованы с суффиксом `Base`:
```js
function ThemedButtonBase({ theme, ... }) { ... }
export const ThemedButton = withTheme(ThemedButtonBase); // ✅
```

### Ошибка 2 — Template literals в PDF отображались как строки

PDF: `'WithTheme(${ getDisplayName(WrappedComponent) })'`  
**Фикс:** заменил на настоящий template literal с backtick:
```js
WithTheme.displayName = `WithTheme(${getDisplayName(WrappedComponent)})`;
```

### Ошибка 3 — useDebouncedCallback использует useState для timeoutId

PDF использует `useState(null)` для `timeoutId`, что вызывает
лишний ре-рендер при каждом вызове callback.  
**Фикс:** `useRef` вместо `useState` — ref mutation не триггерит ре-рендер.

---

## 5. Что проверил вручную

- [x] Логика toggleTheme в ThemeProvider — два состояния (theme + isDark)
      синхронны, переключение корректное
- [x] withTheme пробрасывает `...props` до обёрнутого компонента
- [x] isMounted guard в useApi предотвращает setState после unmount
- [x] AbortController корректно отменяет предыдущий запрос при re-execute
- [x] Cache в useFetch очищается после CACHE_DURATION (5 min)
- [x] useLocalStorage слушает `storage` event — синхронизация между вкладками

---

## 6. Что узнал / понял глубже

**HOC vs Hooks — когда что:**
- HOC нужен когда компонент нужно "обернуть" для side effect
  (логирование, error boundary) или когда нужен класс-компонент
- Hook удобнее для извлечения stateful logic внутри функциональных
  компонентов без создания лишних обёрток в дереве

**AbortController** — правильный способ отменять fetch запросы при
unmount. Без него setState на unmounted компоненте даёт memory leak.

**isMounted ref** — guard-паттерн: `useRef(true)` → в cleanup `false`.
Защищает от race condition когда fetch завершается после unmount.

**Stale-while-revalidate (SWR)** — паттерн: показываем кешированные
данные сразу, параллельно перезапрашиваем свежие. Улучшает UX.

**Cache invalidation** — самая сложная часть useFetch. Ключ кеша =
`url + JSON.stringify(options)`. Риск: options объект пересоздаётся
каждый рендер → useCallback со стабильными deps обязателен.