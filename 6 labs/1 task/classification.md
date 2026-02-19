### SNIPET_01

- Pattern Family: Creational
- Specific Pattern Name: Singleton
- Evidence:
    - `if (DatabaseConnection._instance) { return databaseConnection._instance; }`
    - `DataaseConnection._instance = this;`
    - `static getInstance() { ... return DatabaseConnection._instance; }`
- Book Reference: Ch. 6, "Creational Design Patterns"; Ch. 7, "The Singleton Pattern"
- Reasoning:
    Конструктор `DatabaseConnection` запрещает создание более одного экзампляра и сохраняет ссылку в статистическом поле `._instance`, а доступ к объекту идёт через `getInstance()`. По определению из Ch. 6, Singleton - порождающий паттерн, который гарантирует единственный экзамепляр с глобальной точкой доступа, что здесь и реализовано. Это относится к семейству Creational, потому что основная - контролировать процесс создания объекта.

    ### SNIPPET_02

- Pattern Family: Behavioral
- Specific Pattern Name: Observer
- Evidence:
  - `subscribe(event, callback) { ... this._subscribers[event].push(callback); }`
  - `publish(event, data) { const handlers = this._subscribers[event] || []; handlers.forEach(handler => handler(data)); }`
- Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Observer Pattern"
- Reasoning:
  Класс `EventBus` реализует подписку обработчиков на события и оповещение всех подписчиков через `publish`, не зная заранее, кто именно подписан. В Ch. 6 Observer описывается как способ уведомлять множество объектов об изменении для поддержания согласованности, что совпадает с паттерном «подписчик–издатель» здесь. Поэтому это поведенческий паттерн семейства Behavioral, фокусирующийся на коммуникации объектов.


### SNIPPET_03

- Pattern Family: Structural
- Specific Pattern Name: Facade
- Evidence:
  - Внутри `UserSession` создаются: `this._auth = new AuthService();`, `this._repo = new UserRepository();`, `this._logger = new AuditLogger();`
  - Публичный метод `login(token)` вызывает три внутренних сервиса и возвращает упрощённый результат.
- Book Reference: Ch. 6, "Structural Design Patterns"; Ch. 7, "The Facade Pattern"
- Reasoning:
  Класс `UserSession` скрывает сложность трёх подсистем (аутентификация, репозиторий пользователей, логирование) за одним простым методом `login`. В Ch. 6 Facade определяется как одиночный класс, который прячет сложность целой подсистемы, предоставляя простый интерфейс. Это структурный паттерн, так как он про организацию и композицию объектов, а не про создание или обмен сообщениями.

### SNIPPET_04

- Pattern Family: Creational
- Specific Pattern Name: Factory Method
- Evidence:
  - `function createNotifier(type) { switch(type) { ... return new SMSNotifier(); ... } }`
  - Вызывающий код: `const notifier = createNotifier('telegram');` без прямого `new` конкретных классов.
- Book Reference: Ch. 6, "Creational Design Patterns"; Ch. 7, "The Factory Pattern"
- Reasoning:
  Функция `createNotifier` инкапсулирует логику выбора конкретного класса уведомления на основе параметра `type`. В GoF‑таблице Factory Method описан как создание экземпляров нескольких производных классов на основе входных данных или событий. Это порождающий паттерн, поскольку решает вопрос «как создавать нужный объект» и прячет прямую инициализацию от клиента.

### SNIPPET_05

- Pattern Family: Structural
- Specific Pattern Name: Decorator
- Evidence:
  - `TimestampLogger` и `SeverityLogger` принимают `logger` в конструкторе и внутри `log` делегируют вызов, добавляя поведение.
  - Пример цепочки: `const withBoth = new SeverityLogger(withTime, 'ERROR');`
- Book Reference: Ch. 6, "Structural Design Patterns"; Ch. 7, "The Decorator Pattern"
- Reasoning:
  В этом сниппете исходный компонент `PlainTextLogger` «оборачивается» в дополнительные логгеры, которые добавляют timestamp и уровень, не изменяя базовый класс. Ch. 6 определяет Decorator как способ динамически добавлять альтернативную обработку объектам. Это структурный паттерн, так как за счёт композиции объектов изменяется структура и поведение без наследования.

### SNIPPET_06

- Pattern Family: Creational
- Specific Pattern Name: Prototype
- Evidence:
  - Базовый объект `vehiclePrototype = { ... }` используется как прототип.
  - Создание: `const car = vehiclePrototype.clone();` и последующее изменение полей.
  - Проверка: `Object.getPrototypeOf(car) === vehiclePrototype`.
- Book Reference: Ch. 6, "Creational Design Patterns"; Ch. 7, "The Prototype Pattern"
- Reasoning:
  Здесь создаются новые объекты путём клонирования полностью инициализированного прототипа вместо прямого конструирования. В GoF‑таблице Prototype описывается как полностью инициализированный объект для копирования или клонирования. Это порождающий паттерн (Creational), потому что он концентрируется на альтернативном механизме создания объектов через прототип.

### SNIPPET_07

- Pattern Family: Behavioral
- Specific Pattern Name: Chain of Responsibility
- Evidence:
  - Класс `SupportHandler` хранит `nextHandler` и в `handle(ticket)` либо обрабатывает тикет, либо передаёт дальше: `this.next.handle(ticket);`
  - Демо показывает прохождение тикета через несколько уровней.
- Book Reference: Ch. 6, "Behavioral Design Patterns"
- Reasoning:
  Обработчики поддержки образуют цепочку, по которой запрос (тикет) передаётся до тех пор, пока один из объектов не сможет его обработать. В Ch. 6 Chain of Responsibility определён как способ пропускать запрос через цепочку объектов, чтобы найти тот, который его обработает. Это поведенческий паттерн, так как он организует передачу ответственности между объектами.

### SNIPPET_08

- Pattern Family: Behavioral
- Specific Pattern Name: Command
- Evidence:
  - Класс `WriteCommand` инкапсулирует действие над `TextEditor` и имеет методы `execute()` и `undo()`.
  - `CommandHistory` хранит список команд и вызывает `run(command)`, `undo()`.
- Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Command Pattern"
- Reasoning:
  Действия над текстовым редактором упакованы в отдельные объекты команд, которые можно сохранить, выполнить и отменить. По GoF Command — это способ отделить исполнение команды от инициатора, что напрямую реализовано через `CommandHistory` и команды. Это семейство Behavioral, поскольку цель — организовать взаимодействие и историю действий между объектами.

### SNIPPET_09

- Pattern Family: Structural
- Specific Pattern Name: Flyweight
- Evidence:
  - Класс `TreeType` представляет общие (intrinsic) данные: `name`, `color`, `texture`.
  - `TreeTypeFactory.get(...)` кеширует и переиспользует экземпляры типов деревьев.
  - Класс `Tree` хранит только уникальные координаты, ссылаясь на общий `type`.
- Book Reference: Ch. 6, "Structural Design Patterns"; GoF table, "Flyweight"
- Reasoning:
  Общие данные вида дерева создаются один раз и переиспользуются для множества объектов `Tree`, которые содержат только уникальное состояние (позиция). В Ch. 6 Flyweight описан как «fine-grained instance для эффективного шаринга информации, которая хранится где‑то ещё», что совпадает с разделением intrinsic/extrinsic состояния здесь. Это структурный паттерн, так как оптимизирует структуру набора объектов и использование памяти.

### SNIPPET_10

- Pattern Family: Behavioral
- Specific Pattern Name: Mediator
- Evidence:
  - Класс `ChatRoom` выступает «координатором» и хранит `_members`.
  - Пользователи `User` общаются только через `room.send(...)`, а не напрямую друг с другом.
- Book Reference: Ch. 6, "Behavioral Design Patterns"; Ch. 7, "The Mediator Pattern"
- Reasoning:
  `ChatRoom` централизует коммуникацию: участники регистрируются в комнате и отправляют сообщения через неё, что предотвращает прямые ссылки объектов друг на друга. Ch. 6 определяет Mediator как упрощённую коммуникацию между классами, устраняющую необходимость явных ссылок между ними. Это поведенческий паттерн, так как основная задача — управление обменом сообщениями в системе.
