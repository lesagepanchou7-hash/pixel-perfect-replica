import { Matrix, solve } from 'ml-matrix';
export type Kind = 'source' | 'resistor' | 'ground' | 'switch';
export type Part = { id:string; kind:Kind; value:number; x:number; z:number; closed:boolean };
export type Wire = { id:string; a:string; b:string };
export type Circuit = { version:1; parts:Part[]; wires:Wire[] };
export type Results = { version:string; nodes:Record<string,number>; branches:{id:string; voltage:number; current:number}[]; error?:string };
export const names:Record<Kind,string> = { source:'DC source',resistor:'Resistor',ground:'Ground',switch:'Switch' };
export const terminals = (p:Part) => p.kind==='ground' ? [`${p.id}:a`] : [`${p.id}:a`,`${p.id}:b`];
export function example(type:'single'|'series'|'parallel'):Circuit {
 const parts:Part[]=[{id:'V1',kind:'source',value:10,x:-2.4,z:-1.2,closed:true},{id:'R1',kind:'resistor',value:1000,x:0,z:-.7,closed:true},{id:'G1',kind:'ground',value:0,x:-2,z:1.3,closed:true}];
 if(type!=='single')parts.push({id:'R2',kind:'resistor',value:1000,x:1.8,z:1,closed:true});
 const pairs=type==='single'?[['V1:a','R1:a'],['R1:b','V1:b']]:type==='series'?[['V1:a','R1:a'],['R1:b','R2:a'],['R2:b','V1:b']]:[['V1:a','R1:a'],['V1:a','R2:a'],['R1:b','V1:b'],['R2:b','V1:b']];
 pairs.push(['V1:b','G1:a']);return {version:1,parts,wires:pairs.map((p,i)=>({id:`w${i}`,a:p[0] || '',b:p[1] || ''}))};
}
export function calculate(c:Circuit):Results {
 const fail=(error:string):Results=>({version:'DC-MNA 1.0',nodes:{},branches:[],error});
 if(c.parts.length>40||c.wires.length>100)return fail('This educational solver supports up to 40 components and 100 wires.');
 if(!c.parts.length)return fail('Add a DC source, resistor, ground, and terminal connections.');
 const all=c.parts.flatMap(terminals);if(new Set(all).size!==all.length)return fail('Component identifiers must be unique.');
 const parent=new Map(all.map(t=>[t,t]));
 function root(t:string):string {const p=parent.get(t); if(!p)return t; if(p===t)return t;const r=root(p);parent.set(t,r);return r;}
 function join(a:string,b:string){parent.set(root(a),root(b));}
 for(const w of c.wires){if(!parent.has(w.a)||!parent.has(w.b)||w.a===w.b)return fail('Invalid wire: connect two different existing terminals.');join(w.a,w.b);}
 for(const p of c.parts){if(!['source','resistor','ground','switch'].includes(p.kind))return fail('Unsupported component type.');if(p.kind==='resistor'&&(!Number.isFinite(p.value)||p.value<=0))return fail(`${p.id}: resistance must be positive and finite.`);if(p.kind==='source'&&!Number.isFinite(p.value))return fail(`${p.id}: voltage must be finite.`);if(p.kind==='switch'&&p.closed)join(`${p.id}:a`,`${p.id}:b`);}
 const grounds=c.parts.filter(p=>p.kind==='ground');const g=grounds[0];if(!g)return fail('Missing ground reference. Add Ground and connect it to the return node.');for(const p of grounds)join(`${g.id}:a`,`${p.id}:a`);
 const ground=root(`${g.id}:a`);const roots=[...new Set(all.map(root))];const unknown=roots.filter(n=>n!==ground);
 const conductive=c.parts.filter(p=>p.kind==='source'||p.kind==='resistor');
 const reached=new Set([ground]);let change=true;while(change){change=false;for(const p of conductive){const a=root(`${p.id}:a`),b=root(`${p.id}:b`);if(reached.has(a)||reached.has(b)){if(!reached.has(a)||!reached.has(b))change=true;reached.add(a);reached.add(b);}}}
 if(roots.some(n=>!reached.has(n)))return fail('Floating or disconnected circuit: connect every electrical node to a path with a ground reference. An open switch can leave a floating node.');
 const sources=c.parts.filter(p=>p.kind==='source');if(!sources.length)return fail('Add at least one ideal DC voltage source.');
 for(const p of sources)if(root(`${p.id}:a`)===root(`${p.id}:b`))return fail('Shorted or contradictory voltage source: its terminals are connected together.');
 const size=unknown.length+sources.length;const A=Matrix.zeros(size,size),b=Matrix.zeros(size,1);const idx=(t:string)=>unknown.indexOf(root(t));
 const add=(i:number,j:number,v:number)=>{if(i>=0&&j>=0)A.set(i,j,A.get(i,j)+v);};
 for(const p of c.parts.filter(p=>p.kind==='resistor')){const a=idx(`${p.id}:a`),d=idx(`${p.id}:b`),s=1/p.value;add(a,a,s);add(d,d,s);add(a,d,-s);add(d,a,-s);}
 sources.forEach((p,k)=>{const a=idx(`${p.id}:a`),d=idx(`${p.id}:b`),i=unknown.length+k;add(a,i,1);add(d,i,-1);add(i,a,1);add(i,d,-1);b.set(i,0,p.value);});
 let x:Matrix;try{x=solve(A,b);}catch{return fail('Contradictory or redundant voltage-source constraints, or an underdetermined circuit. Check source connections.');}
 const values=x.to1DArray();if(values.some(v=>!Number.isFinite(v)))return fail('The circuit does not have a finite unique solution.');
 const residual=A.mmul(x).sub(b).to1DArray();if(residual.some(v=>Math.abs(v)>1e-7))return fail('Numerical validation failed; no results are reported.');
 const voltage=(t:string)=>{const i=idx(t);return i<0?0:x.get(i,0);};const nodes=Object.fromEntries(all.map(t=>[t,voltage(t)]));
 const branches=c.parts.filter(p=>p.kind==='source'||p.kind==='resistor').map(p=>{const v=voltage(`${p.id}:a`)-voltage(`${p.id}:b`);const s=sources.findIndex(t=>t.id===p.id);return {id:p.id,voltage:v,current:p.kind==='resistor'?v/p.value:x.get(unknown.length+s,0)};});
 return {version:'DC-MNA 1.0',nodes,branches};
}
export function removePart(c:Circuit,id:string):Circuit {return {...c,parts:c.parts.filter(p=>p.id!==id),wires:c.wires.filter(w=>!w.a.startsWith(id+':')&&!w.b.startsWith(id+':'))};}
