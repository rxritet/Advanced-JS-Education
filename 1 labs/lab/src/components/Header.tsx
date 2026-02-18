import { useUser } from '../context/UserContext';
import { UserMenu } from './UserMenu';

// Header — второй уровень, показывает роль и переключатель темы
// toggleDarkMode берётся из контекста, а не передаётся через пропсы от Dashboard
export function Header() {
  const { user, theme, toggleDarkMode } = useUser();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: theme.darkMode ? '#1e1e1e' : '#ffffff',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <span>Role: <strong>{user.role}</strong></span>

      {/* Кнопка напрямую вызывает toggleDarkMode из контекста */}
      <button onClick={toggleDarkMode}>
        {theme.darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* UserMenu — третий уровень вложенности */}
      <UserMenu />
    </header>
  );
}
