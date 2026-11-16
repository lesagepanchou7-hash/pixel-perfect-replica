import { createFileRoute } from '@tanstack/react-router';
import { CreateDashboard } from '@/components/onboarding';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/create')({ head: () => pageHead('Create workspace', 'Explore independent labs, engineering projects and project planning previews.'), component: CreateDashboard });