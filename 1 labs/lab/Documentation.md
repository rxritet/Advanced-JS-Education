## Provider Pattern — Documentation

This implementation follows the Provider Pattern as described in Chapter 1,
Section "An Everyday Use Case for Design Patterns" of *Learning JavaScript
Design Patterns* by Addy Osmani.

### Problem: Prop Drilling

Without the Provider Pattern, data must be passed manually through every
component level: App → Dashboard → Header → UserMenu. Each intermediate
component receives props it doesn't use — only to forward them deeper.
This creates tight coupling and makes refactoring painful.

### Solution: Provider Pattern

The `UserProvider` component stores all shared state (user info, permissions,
theme) and exposes it through `UserContext`. Any component in the tree calls
`useUser()` to access data directly — no props needed from parent components.

### Benefits Over Traditional Prop Passing

1. **No intermediate props** — Dashboard doesn't know about UserMenu's data needs
2. **Centralized state** — `toggleDarkMode` is available everywhere without callbacks
3. **Scalable** — adding a new field to context requires changing only UserProvider
4. **Type-safe** — TypeScript interfaces ensure correct data shape at compile time

### Reference

This pattern directly implements the example from Ch. 1, "An Everyday Use Case
for Design Patterns", where the Provider Pattern is introduced as the solution
to shared data in deep component trees.
