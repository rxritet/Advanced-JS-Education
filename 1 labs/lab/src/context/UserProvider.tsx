import { useState, type ReactNode, useMemo } from 'react';
import { UserContext } from './UserContext';
import type { UserContextType, UserInfo, UserPermissions, UserTheme } from '../types/user.types';

// Моковые начальные данные — имитируют ответ от API
const initialUser: UserInfo = {
  name: 'Amir Seitkali',
  email: 'amir@example.com',
  role: 'admin',
};

const initialPermissions: UserPermissions = {
  canEdit: true,
  canDelete: true,
  canView: true,
};

const initialTheme: UserTheme = {
  darkMode: false,
  fontSize: 16,
};

interface UserProviderProps {
  readonly children: ReactNode;
}

// Provider — хранит стейт и передаёт его вниз по дереву без prop drilling
// Любой компонент внутри <UserProvider> получает доступ через useUser()
export function UserProvider({ children }: UserProviderProps) {
  const [user] = useState<UserInfo>(initialUser);
  const [permissions] = useState<UserPermissions>(initialPermissions);
  const [theme, setTheme] = useState<UserTheme>(initialTheme);

  // Позволяет любому потребителю переключить тему без передачи коллбека через пропсы
  function toggleDarkMode(): void {
    setTheme((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  }

  const contextValue = useMemo<UserContextType>(() => ({
    user,
    permissions,
    theme,
    toggleDarkMode,
  }), [user, permissions, theme]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
