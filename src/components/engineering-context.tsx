import { createContext, useContext, useState, type ReactNode } from 'react';
type Preferences = { level: string; setLevel: (value: string) => void; theme: string; setTheme: (value: string) => void };
const PreferencesContext = createContext<Preferences>({ level: 'foundation', setLevel: () => {}, theme: 'automatic', setTheme: () => {} });
export function EngineeringProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState('foundation');
  const [theme, setTheme] = useState('automatic');
  return <PreferencesContext.Provider value={{ level, setLevel, theme, setTheme }}>{children}</PreferencesContext.Provider>;
}
export const usePreferences = () => useContext(PreferencesContext);