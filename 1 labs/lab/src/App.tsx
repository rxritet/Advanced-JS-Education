import { UserProvider } from './context/UserProvider';
import { Dashboard } from './components/Dashboard';

// UserProvider оборачивает всё дерево — любой компонент внутри
// может вызвать useUser() и получить данные без пробрасывания пропсов
export default function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}
