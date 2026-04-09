# Lab 13.1 — Higher-Order Components: withTheme

**Student:** Радмир Абраев  
**Student ID:** [твой ID]  
**Date:** 09.04.2026  
**Course:** Advanced JavaScript / React — Week 13

---

## Objective

Implement a theme injection system using the Higher-Order Component (HOC) pattern.
The `withTheme` HOC reads from `ThemeContext` via the Consumer API and injects
`theme`, `isDark`, `toggleTheme` into any wrapped component — no prop drilling required.

---

## Architecture
ThemeProvider (ThemeContext.jsx)
└── ThemeContext.Provider { theme, isDark, toggleTheme }
└── withTheme(WrappedComponent) ← reads context via Consumer
└── <WrappedComponent theme={...} isDark={...} toggleTheme={...} />

text

---

## File Structure
task1/
├── src/
│ ├── context/
│ │ └── ThemeContext.jsx # createContext, ThemeProvider, useTheme hook
│ ├── hocs/
│ │ └── withTheme.jsx # withTheme HOC + withStyles HOC
│ ├── components/
│ │ └── ThemedComponents.jsx # ThemedButton, ThemedCard, ThemedText,
│ │ # ThemedInput, ThemeSwitcher
│ ├── App.jsx # Demo application
│ └── main.jsx # React entry point
├── index.html
├── vite.config.js
└── package.json

text

---

## Setup & Run

```bash
cd Lab_13/task1
npm install
npm run dev
```

---

## HOC Pattern

```jsx
// Factory: takes a component → returns enhanced component
export function withTheme(WrappedComponent) {
  function WithTheme(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme, isDark, toggleTheme }) => (
          <WrappedComponent
            {...props}
            theme={theme}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
  WithTheme.displayName = `WithTheme(${WrappedComponent.name})`;
  return WithTheme;
}

// Usage
function MyButton({ theme, children }) {
  return (
    <button style={{ backgroundColor: theme.colors.primary }}>
      {children}
    </button>
  );
}
export const ThemedMyButton = withTheme(MyButton);
```

---

## Theme Object Shape

```js
const theme = {
  name: 'light' | 'dark',
  colors: {
    primary, secondary, background, surface,
    text, textSecondary, border, error, success, warning
  },
  spacing:      { xs, sm, md, lg, xl },           // 4px → 32px
  typography:   { fontFamily, fontSize: { xs, sm, md, lg, xl, xxl } },
  borderRadius: { sm, md, lg }                    // 4px → 12px
};
```

---

## Components API

| Component       | Props                                       | Description                        |
|-----------------|---------------------------------------------|------------------------------------|
| `ThemedButton`  | `variant` (primary/secondary/outline/ghost) | Button with 4 variants             |
| `ThemedCard`    | `elevated` (bool)                           | Surface card, optional shadow      |
| `ThemedText`    | `variant` (title/subtitle/body/caption)     | Text with typography scale         |
| `ThemedInput`   | `label`, `error`                            | Input with label and error message |
| `ThemeSwitcher` | —                                           | Toggle button light ↔ dark         |

---

## Key Fixes vs PDF

| # | Problem in PDF | Fix Applied |
|---|----------------|-------------|
| 1 | `function ThemedButton` + `export const ThemedButton = withTheme(ThemedButton)` — redeclaration error | Renamed inner functions with `Base` suffix before HOC wrapping |
| 2 | `displayName` used string quotes `'WithTheme(${ ... })'` instead of template literal | Fixed to backtick `` `WithTheme(${...})` `` |

---

## HOC vs useTheme Hook — When to Use

| Aspect             | `withTheme` HOC              | `useTheme()` Hook         |
|--------------------|------------------------------|---------------------------|
| Class components   | ✅ Works                     | ❌ Hooks only             |
| Wrapper in tree    | Adds one wrapper layer       | No extra wrapper          |
| DevTools name      | `WithTheme(Button)`          | Same component name       |
| Prop collision     | Possible (`theme` collides)  | None                      |
| Composability      | Easy to stack multiple HOCs  | Simpler composition       |

---

## Assessment Rubric

| Task | Points | Criteria |
|------|--------|----------|
| Task 1 — ThemeContext | 15 | Context provider (8), theme values (7) |
| Task 2 — withTheme HOC | 20 | HOC structure (10), props proxying (10) |
| Task 3 — Themed Components | 15 | Component implementation (10), theme integration (5) |
| **Total** | **50** | |

> ⚠️ Grading penalties: No HOC pattern **−20 pts** · No theme switching **−15 pts** · Missing Context **−10 pts**