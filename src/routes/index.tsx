import { createFileRoute } from '@tanstack/react-router';
import { Landing } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/')({ head: () => pageHead('Engineering starts with curiosity', 'Explore EngineeringOS learning paths, virtual lab previews, and a connected future of engineering.'), component: Landing });
