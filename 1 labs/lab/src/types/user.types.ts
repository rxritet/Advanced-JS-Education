// Типы вынесены отдельно, чтобы переиспользовать их
// в Provider, контексте и компонентах без дублирования

export interface UserInfo {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface UserPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

export interface UserTheme {
  darkMode: boolean;
  fontSize: number;
}

// Полный тип контекста — всё что получат потребители
export interface UserContextType {
  user: UserInfo;
  permissions: UserPermissions;
  theme: UserTheme;
  toggleDarkMode: () => void;
}
