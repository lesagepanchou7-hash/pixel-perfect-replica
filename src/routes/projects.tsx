import { createFileRoute } from '@tanstack/react-router';
import { Projects } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/projects')({ head: () => pageHead('My engineering projects', 'Explore future electrical project types and cloud project saving.'), component: Projects });
