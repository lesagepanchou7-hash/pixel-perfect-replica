import { createFileRoute } from '@tanstack/react-router';
import { Onboarding } from '@/components/onboarding';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/entry')({ head: () => pageHead('Choose your workspace', 'Choose Learn or Create, and your EngineeringOS starting point.'), component: Onboarding });