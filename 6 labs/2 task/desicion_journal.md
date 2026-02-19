# Decision Journal – Lab 6.2

## 1. Implemented Scenarios

- I implemented SCENARIO_01 (App-Wide Configuration Store) because Singleton — базовый и часто используемый паттерн, а задача с конфигом максимально типична для реальных приложений.
- I implemented SCENARIO_02 (Legacy Payment Gateway Adapter) потому что паттерн Adapter хорошо демонстрирует, как в JS через композицию можно «подружить» старый API с новым интерфейсом без переписывания legacy-кода.

## 2. Key Clues for Non-Implemented Scenarios

- SCENARIO_03 (UI Notification System): ключевой намёк — множество независимых компонентов должны реагировать на одно событие, а в подсказке говорится про подписку/отписку; это сразу указывает на семейство Behavioral и паттерн Observer.
- SCENARIO_04 (Report Builder): важный сигнал — одинаковый процесс построения отчёта при разных форматах и фраза из Ch. 6 про паттерн, который «separates object construction from its representation», что напрямую указывает на Builder.
- SCENARIO_05 (Undo/Redo for Task Manager): подсказка про то, что «каждое действие должно быть объектом» и «паттерн, который отделяет выполнение команды от инициатора», однозначно ведёт к Behavioral‑паттерну Command.
- SCENARIO_06 (Large-Scale Particle System): требование шарить типовые данные между тысячами объектов и подсказка про «fine-grained instance used for efficient sharing of information» из Ch. 6 сразу указывают на структурный паттерн Flyweight.

## 3. Takeaway

The main thing I learned from this lab is that starting с правильной категории паттерна (Creational, Structural или Behavioral по Ch. 6) даёт очень сильный «фильтр мыслей»: вместо перебора всех паттернов я быстрее нахожу 2–3 кандидата и принимаю более обоснованные архитектурные решения.
