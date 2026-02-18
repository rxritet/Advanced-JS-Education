# AI Usage Report

## Tool Used
Perplexity AI

## Prompts Used
1. "Сделай полностью Lab 1.2 и напиши код под использование TypeScript"

## How I Modified the Code
- Проверил, что все типы соответствуют требованиям лабы
- Убедился, что компоненты вложены минимум на 2 уровня (требование Task 3)
- Вручную набрал код в OquLabs, не копируя напрямую

## What I Learned
- Как правильно типизировать React Context через generics
- Почему createContext<T | null>(null) лучше, чем createContext<T>({} as T)
- Как кастомный хук с error boundary защищает от неправильного использования контекста
