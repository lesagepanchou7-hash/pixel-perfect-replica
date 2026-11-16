import { createFileRoute } from '@tanstack/react-router';
import { Labs } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/labs')({ head: () => pageHead('Virtual engineering labs', 'Explore the electrical circuit workspace preview and planned engineering laboratories.'), component: Labs });
