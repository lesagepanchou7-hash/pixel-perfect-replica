import { createFileRoute } from '@tanstack/react-router';
import { InfoPage } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/about')({ head: () => pageHead('About', 'EngineeringOS about information and preview status.'), component: Page });
function Page() { return <InfoPage kind="about"/>; }
