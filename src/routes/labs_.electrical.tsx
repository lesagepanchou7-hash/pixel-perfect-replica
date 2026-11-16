import { createFileRoute } from '@tanstack/react-router';
import { ElectricalPreview } from '@/components/electrical-preview';
import { pageHead } from '@/lib/engineering-content';
export const Route = createFileRoute('/labs_/electrical')({ head: () => pageHead('Virtual Electrical Laboratory', 'Build circuits in 3D, inspect the synchronised schematic and calculate supported ideal DC circuits.'), component: ElectricalPreview });
