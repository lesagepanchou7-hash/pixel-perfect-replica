export type Intent = 'learn' | 'experiment' | 'project' | 'assistance';
export type Environment = 'learn' | 'create';
export function intentDestination(intent: Intent) {
  switch (intent) {
    case 'learn': return '/dashboard';
    case 'experiment': return '/labs';
    case 'project': return '/projects';
    case 'assistance': return '/planner';
  }
}
export function intentEnvironment(intent: Intent): Environment { return intent === 'learn' ? 'learn' : 'create'; }