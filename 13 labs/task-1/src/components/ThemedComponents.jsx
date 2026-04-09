// src/components/ThemedComponents.jsx
import React from 'react';
import withTheme from '../hocs/withTheme';

// ── ThemedButton ────────────────────────────────────────────────────────────
function ThemedButtonBase({ theme, children, variant = 'primary', ...props }) {
  const base = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
    fontWeight: 500,
    transition: 'all 0.2s ease',
  };
  const variants = {
    primary:   { backgroundColor: theme.colors.primary, color: '#ffffff' },
    secondary: { backgroundColor: theme.colors.secondary, color: '#ffffff' },
    outline:   { backgroundColor: 'transparent', color: theme.colors.primary,
                 border: `2px solid ${theme.colors.primary}` },
    ghost:     { backgroundColor: 'transparent', color: theme.colors.text },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} {...props}>
      {children}
    </button>
  );
}
export const ThemedButton = withTheme(ThemedButtonBase);

// ── ThemedCard ──────────────────────────────────────────────────────────────
function ThemedCardBase({ theme, children, elevated = false, ...props }) {
  const style = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    border: `1px solid ${theme.colors.border}`,
    fontFamily: theme.typography.fontFamily,
    ...(elevated && {
      boxShadow: theme.name === 'dark'
        ? '0 4px 12px rgba(0,0,0,0.4)'
        : '0 4px 12px rgba(0,0,0,0.1)',
    }),
  };
  return <div style={style} {...props}>{children}</div>;
}
export const ThemedCard = withTheme(ThemedCardBase);

// ── ThemedText ──────────────────────────────────────────────────────────────
function ThemedTextBase({ theme, children, variant = 'body', ...props }) {
  const styles = {
    title:    { fontSize: theme.typography.fontSize.xxl, fontWeight: 700, color: theme.colors.text },
    subtitle: { fontSize: theme.typography.fontSize.lg,  fontWeight: 600, color: theme.colors.text },
    body:     { fontSize: theme.typography.fontSize.md,  color: theme.colors.text },
    caption:  { fontSize: theme.typography.fontSize.sm,  color: theme.colors.textSecondary },
  };
  return <span style={styles[variant]} {...props}>{children}</span>;
}
export const ThemedText = withTheme(ThemedTextBase);

// ── ThemedInput ─────────────────────────────────────────────────────────────
function ThemedInputBase({ theme, label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
      {label && (
        <label style={{ fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text, fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        style={{
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize.md,
          outline: 'none',
        }}
        {...props}
      />
      {error && (
        <span style={{ fontSize: theme.typography.fontSize.xs,
                       color: theme.colors.error }}>
          {error}
        </span>
      )}
    </div>
  );
}
export const ThemedInput = withTheme(ThemedInputBase);

// ── ThemeSwitcher ───────────────────────────────────────────────────────────
function ThemeSwitcherBase({ theme, isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
        backgroundColor: theme.colors.surface,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
      }}
    >
      <span style={{ fontSize: '18px' }}>{isDark ? '☀' : '☽'}</span>
      <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text }}>
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
export const ThemeSwitcher = withTheme(ThemeSwitcherBase);