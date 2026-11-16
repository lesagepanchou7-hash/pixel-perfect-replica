import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { intentEnvironment, type Intent, type Environment } from '@/lib/onboarding';
import {supabase} from '@/integrations/supabase/client';
import type {User} from '@supabase/supabase-js';
type Preferences = { user:User|null;  level: string; setLevel: (value: string) => void; theme: string; setTheme: (value: string) => void; environment: Environment; setEnvironment: (value: Environment) => void; intent: Intent | null; ready: boolean; completeOnboarding: (intent: Intent, level?: string) => void; resetOnboarding: () => void; interests: string[]; setInterests: (value: string[]) => void };
const PreferencesContext = createContext<Preferences>({ user:null, level: 'foundation', setLevel: () => {}, theme: 'automatic', setTheme: () => {}, environment: 'learn', setEnvironment: () => {}, intent: null, ready: false, completeOnboarding: () => {}, resetOnboarding: () => {}, interests: [], setInterests: () => {} });
export function EngineeringProvider({ children }: { children: ReactNode }) {
  const [user,setUser]=useState<User|null>(null);
  const [level, setLevel] = useState('foundation');
  const [theme, setTheme] = useState('automatic');
  const [environment, setEnvironment] = useState<Environment>('learn');
  const [intent, setIntent] = useState<Intent | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const data = JSON.parse(sessionStorage.getItem('engineeringos-demo-preferences') || 'null');
      if (data) {
        if (['explorer', 'foundation', 'engineering'].includes(data.level)) setLevel(data.level);
        if (['automatic', 'light', 'dark'].includes(data.theme)) setTheme(data.theme);
        if (['learn', 'create'].includes(data.environment)) setEnvironment(data.environment);
        if (['learn', 'experiment', 'project', 'assistance'].includes(data.intent)) setIntent(data.intent);
        if (Array.isArray(data.interests)) setInterests(data.interests.filter((x: unknown) => typeof x === 'string'));
      }
    } catch { /* Demo remains usable when browser storage is unavailable. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem('engineeringos-demo-preferences', JSON.stringify({ level, theme, environment, intent, interests })); } catch { /* No cloud persistence is implied. */ }
  }, [level, theme, environment, intent, interests, ready]);
  useEffect(()=>{const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setUser(session?.user||null);});void supabase.auth.getUser().then(({data})=>setUser(data.user));return ()=>subscription.unsubscribe();},[]);
  function completeOnboarding(value: Intent, selectedLevel?: string) { setIntent(value); setEnvironment(intentEnvironment(value)); if (selectedLevel) setLevel(selectedLevel); }
  return <PreferencesContext.Provider value={{ user, level, setLevel, theme, setTheme, environment, setEnvironment, intent, ready, completeOnboarding, resetOnboarding: () => setIntent(null), interests, setInterests }}>{children}</PreferencesContext.Provider>;
}
export const usePreferences = () => useContext(PreferencesContext);