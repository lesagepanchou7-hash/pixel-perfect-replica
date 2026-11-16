import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, Folder, GraduationCap, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brand, Workspace } from './engineering-shell';
import { usePreferences } from './engineering-context';
import { intentDestination, type Intent } from '@/lib/onboarding';
import { tracks } from '@/lib/engineering-content';
const choices = [
  { id: 'learn', icon: BookOpen, title: 'I want to learn engineering', text: 'Mini-courses, lessons, and guided experiments.', tag: 'LEARN' },
  { id: 'experiment', icon: FlaskConical, title: 'I want to experiment', text: 'Explore virtual labs independently. No course required.', tag: 'CREATE' },
  { id: 'project', icon: Folder, title: 'I have an engineering project', text: 'Explore project types and future engineering tools.', tag: 'CREATE' },
  { id: 'assistance', icon: Sparkles, title: 'I need AI engineering assistance', text: 'Explore the project planning workspace preview.', tag: 'CREATE · AI PLANNED' },
] as const;
export function Onboarding() {
  const { intent, ready, environment, completeOnboarding } = usePreferences();
  const navigate = useNavigate();
  const [step, setStep] = useState<'intent' | 'level'>('intent');
  const choosing = useRef(false);
  useEffect(() => { if (ready && intent && !choosing.current) void navigate({ to: environment === 'learn' ? '/dashboard' : '/create', replace: true }); }, [ready, intent, environment, navigate]);
  function choose(value: Intent) { if (value === 'learn') { setStep('level'); return; } choosing.current = true; completeOnboarding(value); void navigate({ to: intentDestination(value) }); }
  if (!ready || intent) return <div className="entry-loading" role="status">Opening your workspace…</div>;
  return <div className="onboarding-page"><header className="site-width onboarding-header"><Brand/><Link to="/" className="text-link"><ArrowLeft size={16}/>Back to home</Link></header><main className="onboarding-main"><div className="eyebrow">YOUR WORKSPACE. YOUR STARTING POINT.</div><h1>{step === 'intent' ? 'What brings you to EngineeringOS today?' : 'Where would you like to start learning?'}</h1><p>{step === 'intent' ? 'Follow your curiosity. You can change direction anytime.' : 'Choose the level that suits you—not an age declaration.'}</p>{step === 'intent' ? <div className="intent-grid">{choices.map(c => <Button key={c.id} variant="outline" className="intent-choice" onClick={() => choose(c.id)}><span className="track-icon"><c.icon size={25}/></span><span className="intent-copy"><small>{c.tag}</small><strong>{c.title}</strong><span>{c.text}</span></span><ArrowRight/></Button>)}</div> : <><Button variant="ghost" onClick={() => setStep('intent')} className="mb-5"><ArrowLeft/>Back</Button><div className="onboarding-levels">{tracks.map(t => <Button variant="outline" className="level-choice" key={t.id} onClick={() => { choosing.current = true; completeOnboarding('learn',t.id); void navigate({to:'/dashboard'}); }}><GraduationCap size={28}/><strong>{t.name}</strong><span>{t.audience}</span><small>{t.title}</small><ArrowRight/></Button>)}</div></>}<div className="onboarding-safety">No account needed. Explorer is a controlled demonstration; no personal information or unrestricted AI conversations.<br/>Demo preferences are kept in this browser tab only. Tools in development are clearly labelled.</div></main></div>;
}
export function CreateDashboard() { const { interests } = usePreferences(); return <Workspace technical><div className="page-intro"><div className="eyebrow">CREATE · YOUR INDEPENDENT WORKSPACE</div><h1>Start with an idea. Explore what’s possible.</h1><p>Labs, projects, and planning—without course prerequisites.</p></div><div className="create-grid">{choices.filter(c=>c.id!=='learn').map(c => <Link key={c.id} to={intentDestination(c.id)} className="create-item"><c.icon size={32}/><span className="status-badge">{c.id==='experiment'?'Workspace preview':'Planned'}</span><h2>{c.id==='experiment'?'Virtual laboratories':c.id==='project'?'My engineering projects':'AI Project Planner'}</h2><p>{c.text}</p><span className="text-link">Explore workspace <ArrowRight size={15}/></span></Link>)}</div><div className="info-band"><GraduationCap/><div><h3>No course required. No unsupported claims.</h3><p>Project saving, live AI, 3D interaction, and circuit calculations are not yet available.{interests.length > 0 ? ` Your interests: ${interests.join(', ')}.` : ''}</p></div></div><Button variant="outline" asChild><Link to="/studio">Explore CAD, simulation & manufacturing previews <ArrowRight/></Link></Button></Workspace>; }