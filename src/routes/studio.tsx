import { createFileRoute } from '@tanstack/react-router';
import { Studio } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/studio')({ head: () => pageHead('Engineering Studio', 'Preview future CAD, simulation, manufacturing and factory workflow tools.'), component: Studio });
