import { createFileRoute } from '@tanstack/react-router';
import { Course } from '@/components/engineering-pages';
import { pageHead, tracks } from '@/lib/engineering-content';
export const Route = createFileRoute('/learn_/$track')({ head: ({params}) => pageHead(tracks.find(t=>t.id===params.track)?.title || 'Learning path', 'Explore your EngineeringOS electrical engineering course outline.'), component: Page });
function Page() { const {track} = Route.useParams(); return <Course id={track}/>; }
