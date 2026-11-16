import { createFileRoute } from '@tanstack/react-router';
import { ElectricalPreview } from '@/components/electrical-preview';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/labs/electrical')({ head: () => pageHead('DC Circuit Workbench Preview', 'Explore the EngineeringOS electrical workspace layout. Solver and editor not yet operational.'), component: ElectricalPreview });
