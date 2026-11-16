import { createFileRoute } from '@tanstack/react-router';
import { InfoPage } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/privacy')({ head: () => pageHead('Privacy', 'EngineeringOS privacy information and preview status.'), component: Page });
function Page() { return <InfoPage kind="privacy"/>; }
