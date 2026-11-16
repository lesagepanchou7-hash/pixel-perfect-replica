import { createFileRoute } from '@tanstack/react-router';
import { Tutor } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/tutor')({ head: () => pageHead('AI Engineering Tutor', 'Read clearly labelled authored example explanations of circuit concepts.'), component: Tutor });
