import { useUser } from '../context/UserContext';
import { Header } from './Header';

// Dashboard — первый уровень потребителя
// Получает имя пользователя напрямую из контекста, без пропсов от App
export function Dashboard() {
  const { user, theme } = useUser();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.darkMode ? '#121212' : '#f5f5f5',
        color: theme.darkMode ? '#ffffff' : '#000000',
        fontSize: theme.fontSize,
        padding: '24px',
      }}
    >
      <h1>Welcome, {user.name}!</h1>
      <p>You are logged in as: <strong>{user.role}</strong></p>

      {/* Header на уровень глубже — данные идут из контекста, не из Dashboard */}
      <Header />
    </div>
  );
}
