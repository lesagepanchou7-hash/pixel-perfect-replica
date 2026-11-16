import { createFileRoute } from '@tanstack/react-router';
import { Settings } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/settings')({ head: () => pageHead('Profile and preferences', 'Choose your learning track and EngineeringOS workspace appearance.'), component: Settings });
