import { createFileRoute } from '@tanstack/react-router';
import { Studio } from '@/components/engineering-pages';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/planner')({ head: () => pageHead('AI Project Planner preview', 'Planned EngineeringOS project planning tools. Live AI is not connected.'), component: Planner });
function Planner() { return <Studio id="planner"/>; }