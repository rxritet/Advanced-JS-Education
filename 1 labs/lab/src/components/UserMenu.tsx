import { useUser } from '../context/UserContext';

// UserMenu — третий уровень, показывает пропускай и разрешения
// Получает данные напрямую из контекста через useUser()
export function UserMenu() {
  const { user, permissions, theme } = useUser();

  return (
    <div
      style={{
        padding: '8px 12px',
        backgroundColor: theme.darkMode ? '#282828' : '#f0f0f0',
        borderRadius: '4px',
        fontSize: '12px',
      }}
    >
      <p>Email: <strong>{user.email}</strong></p>
      <p>Can Edit: {permissions.canEdit ? 'Yes' : 'No'}</p>
      <p>Can Delete: {permissions.canDelete ? 'Yes' : 'No'}</p>
      <p>Can View: {permissions.canView ? 'Yes' : 'No'}</p>
    </div>
  );
}
