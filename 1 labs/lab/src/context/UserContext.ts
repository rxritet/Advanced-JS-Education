import { createContext, useContext } from 'react';
import type { UserContextType } from '../types/user.types';

// createContext с null — принудительно требует обёртку Provider
// без него TypeScript сам не поймёт, что контекст не инициализирован
export const UserContext = createContext<UserContextType | null>(null);

// Кастомный хук — единственная точка доступа к контексту для потребителей
// Защищает от вызова useUser() вне дерева <UserProvider>
export function useUser(): UserContextType {
  const context = useContext(UserContext);

  // Error boundary на уровне хука — срабатывает при неправильном использовании
  if (context === null) {
    throw new Error(
      'useUser() must be used within a <UserProvider>. ' +
      'Wrap your component tree with <UserProvider> in App.tsx.'
    );
  }

  return context;
}

