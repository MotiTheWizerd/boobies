# Project Structure

## src/ui/
```
src/ui/
├── app/
│   └── main.js
├── modules/
│   ├── core/
│   │   ├── CoreManager.js
│   │   ├── di/
│   │   │   ├── DI.js
│   │   │   ├── index.js
│   │   │   └── tokens.js
│   │   ├── event-bus/
│   │   │   └── EventBus.js
│   │   ├── events/
│   │   │   ├── BridgeHandler.js
│   │   │   └── events.js
│   │   └── logger/
│   │       └── Logger.js
│   └── ui-logic/
│       ├── UIManager.js
│       └── ui-controllers/
│           ├── StatusController.js
│           ├── UIControllerManager.js
│           └── chat-controller/
│               ├── message-list/
│               │   └── MessageListController.js
│               └── user-ui/
│                   ├── UserInputController.js
│                   └── UserUIController.js
└── templates/
    ├── base.html
    ├── components/
    │   ├── chat-header.html
    │   ├── message-list.html
    │   └── user-input.html
    └── css/
        ├── base.css
        ├── ui-header.css
        ├── ui-messages-list.css
        └── ui-user-input.css
```

## src/ext/
```
src/ext/
├── activation.ts
├── modules/
│   ├── core/
│   │   ├── CoreManager.ts
│   │   ├── di/
│   │   │   ├── DI.ts
│   │   │   ├── index.ts
│   │   │   └── tokens.ts
│   │   ├── event-bus/
│   │   │   └── EventBus.ts
│   │   ├── events/
│   │   │   └── events.ts
│   │   └── logger/
│   │       └── Logger.ts
│   ├── LogicManager.ts
│   └── providers/
│       ├── ProviderManager.ts
│       ├── anthropics/
│       │   └── cli-wrapper/
│       │       ├── ClaudeCodeService.ts
│       │       ├── index.ts
│       │       ├── types.ts
│       │       ├── auth-manager/
│       │       │   └── AuthManager.ts
│       │       ├── cli-executor/
│       │       │   └── CLIExecutor.ts
│       │       └── state-manager/
│       │           └── StateManager.ts
│       ├── base/
│       │   ├── BaseProvider.ts
│       │   ├── ExtensionTypes.ts
│       │   ├── IProvider.ts
│       │   └── IProviderAdapter.ts
│       ├── events/
│       │   └── provider-events.ts
│       └── implementations/
│           ├── ClaudeCodeCLIAdapter.ts
│           └── MockProvider.ts
└── providers/
    └── SemntixViewProvider.ts
```