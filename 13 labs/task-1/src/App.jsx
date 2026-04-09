// src/App.jsx — Lab 13.1 Demo
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemedButton, ThemedCard, ThemedText,
         ThemedInput, ThemeSwitcher } from './components/ThemedComponents';

function DemoContent() {
  const { theme } = useTheme();
  const [val, setVal] = useState('');
  const [err, setErr] = useState('');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.background,
                  padding: theme.spacing.xl, transition: 'background-color 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: theme.spacing.xl }}>
        <ThemedText variant="title">Lab 13.1 — withTheme HOC</ThemedText>
        <ThemeSwitcher />
      </div>

      <ThemedCard elevated style={{ marginBottom: theme.spacing.lg }}>
        <ThemedText variant="subtitle" style={{ display: 'block', marginBottom: theme.spacing.md }}>
          Button Variants
        </ThemedText>
        <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          <ThemedButton variant="primary">Primary</ThemedButton>
          <ThemedButton variant="secondary">Secondary</ThemedButton>
          <ThemedButton variant="outline">Outline</ThemedButton>
          <ThemedButton variant="ghost">Ghost</ThemedButton>
        </div>
      </ThemedCard>

      <ThemedCard elevated>
        <ThemedText variant="subtitle" style={{ display: 'block', marginBottom: theme.spacing.md }}>
          Input with Validation
        </ThemedText>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
          <ThemedInput
            label="Your name"
            placeholder="Enter your name..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
            error={err}
          />
          <ThemedButton
            variant="primary"
            onClick={() => setErr(val.trim() === '' ? 'Field cannot be empty' : '')}
            style={{ alignSelf: 'flex-start' }}
          >
            Validate
          </ThemedButton>
        </div>
      </ThemedCard>
    </div>
  );
}

export default function App() {
  return <ThemeProvider><DemoContent /></ThemeProvider>;
}