import { createFileRoute } from '@tanstack/react-router';
import { Learn } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/learn')({ head: () => pageHead('Engineering learning paths', 'Discover Explorer, Foundation and Engineering starter circuit course outlines.'), component: Learn });
