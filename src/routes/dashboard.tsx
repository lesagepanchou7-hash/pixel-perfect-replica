import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/dashboard')({ head: () => pageHead('Your learning workspace', 'Your EngineeringOS learning paths, project overview and recommended electrical workspace.'), component: Dashboard });
