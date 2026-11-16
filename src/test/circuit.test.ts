import {describe,it,expect} from 'vitest';
import {calculate,example,removePart} from '@/lab/circuit';
// Absolute tolerance: 1e-9 A and 1e-7 V for these analytical examples.
describe('Validated DC circuits',()=>{
 it('10 V and 1 kΩ gives 10 mA',()=>{const r=calculate(example('single'));expect(r.error).toBeUndefined();expect(r.branches.find(b=>b.id==='R1')?.current).toBeCloseTo(.01,9);});
 it('two 1 kΩ series resistors give 5 mA and 5 V each',()=>{const r=calculate(example('series'));expect(r.error).toBeUndefined();for(const id of ['R1','R2']){expect(r.branches.find(b=>b.id===id)?.current).toBeCloseTo(.005,9);expect(r.branches.find(b=>b.id===id)?.voltage).toBeCloseTo(5,7);}});
 it('parallel resistors give 10 mA each and 20 mA delivered',()=>{const r=calculate(example('parallel'));expect(r.error).toBeUndefined();for(const id of ['R1','R2'])expect(r.branches.find(b=>b.id===id)?.current).toBeCloseTo(.01,9);expect(r.branches.find(b=>b.id==='V1')?.current).toBeCloseTo(-.02,9);});
 it('missing ground has no invented results',()=>{const r=calculate(removePart(example('single'),'G1'));expect(r.error).toContain('ground');expect(r.branches).toEqual([]);});
 it('rejects invalid resistance',()=>{const c=example('single');c.parts=c.parts.map(p=>p.kind==='resistor'?{...p,value:0}:p);expect(calculate(c).error).toContain('positive');});
 it('rejects invalid terminals',()=>{const c=example('single');c.wires.push({id:'bad',a:'missing:a',b:'V1:a'});expect(calculate(c).error).toContain('Invalid wire');});
 it('rejects shorted voltage sources',()=>{const c=example('single');c.wires.push({id:'short',a:'V1:a',b:'V1:b'});expect(calculate(c).error).toContain('Shorted');});
 it('rejects contradictory parallel sources',()=>{const c=example('single');c.parts.push({id:'V2',kind:'source',value:5,x:1,z:1,closed:true});c.wires.push({id:'a',a:'V2:a',b:'V1:a'},{id:'b',a:'V2:b',b:'V1:b'});expect(calculate(c).error).toBeDefined();});
 it('rejects floating nodes',()=>{const c=example('single');c.parts.push({id:'R2',kind:'resistor',value:1000,x:1,z:1,closed:true});expect(calculate(c).error).toContain('Floating');});
 it('changing resistance changes calculated current',()=>{const c=example('single');c.parts=c.parts.map(p=>p.kind==='resistor'?{...p,value:2000}:p);expect(calculate(c).branches.find(b=>b.id==='R1')?.current).toBeCloseTo(.005,9);});
 it('removing a component removes attached wires',()=>{const c=removePart(example('series'),'R2');expect(c.wires.some(w=>w.a.startsWith('R2:')||w.b.startsWith('R2:'))).toBe(false);});
});
