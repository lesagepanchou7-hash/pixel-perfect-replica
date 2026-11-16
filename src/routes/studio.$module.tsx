import { createFileRoute } from '@tanstack/react-router';
import { Studio } from '@/components/engineering-pages';
import { pageHead, modules } from '@/lib/engineering-content';
export const Route = createFileRoute('/studio/$module')({ head: ({params}) => pageHead(modules.find(m=>m.id===params.module)?.name || 'Studio preview', 'A planned EngineeringOS engineering module. Not operational.'), component: Page });
function Page() { const {module} = Route.useParams(); return <Studio id={module}/>; }
