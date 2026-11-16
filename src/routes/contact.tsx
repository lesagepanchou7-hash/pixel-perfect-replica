import { createFileRoute } from '@tanstack/react-router';
import { InfoPage } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact', 'EngineeringOS contact information and preview status.'), component: Page });
function Page() { return <InfoPage kind="contact"/>; }
