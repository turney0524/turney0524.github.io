/* Re-run: node source/verify.cjs. Verify identities, not just implementation snapshots. */
const P=require('../assets/physics.js'),assert=require('node:assert/strict');let checks=0;
const near=(a,b,tol=2e-8)=>{assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);checks++;};
const dot=P.dot;
function eigenCheck(A,es){for(const e of es){near(dot(e.vector,e.vector),1);const Av=A.map(r=>dot(r,e.vector));near(Math.hypot(...Av.map((x,i)=>x-e.value*e.vector[i])),0);}for(let i=0;i<es.length;i++)for(let j=0;j<i;j++)near(dot(es[i].vector,es[j].vector),0);}
for(const t of [-2,-1,0,.5,2])for(const d of [0,.2,1.5]){const r=P.dimer(t,d),H=[[d,t],[t,-d]];eigenCheck(H,r.energies.map((value,i)=>({value,vector:r.vectors[i]})));near(r.energies[1]-r.energies[0],2*Math.hypot(t,d));if(d===0&&t!==0)r.parity.forEach(p=>near(Math.abs(p),1));}
for(const t of [-2,-1,-.2])for(const eta of [0,.2,1.5]){const r=P.ring(t,eta);eigenCheck(r.H,r.eigen);if(eta===0){r.block.forEach((row,i)=>row.forEach((x,j)=>near(x,i===j?[2*t,-2*t,0,0][i]:0)));near(r.commutator,0);}else assert.ok(r.commutator>0);}
for(const a of [0,.1,.3,Math.PI/4])for(const op of ['x','x2'])near(P.simpson(x=>P.integrand(x,a,op)),(op==='x'?Math.cos(a):Math.sin(a))/Math.SQRT2,1e-10);
near(P.simpson(x=>P.integrand(x,0,'x',true)),0,1e-10);
for(const kr of [.4,1,2])for(const kb of [.05,.2,.7])for(const mass of [1,2]){const w=P.water(kr,kb,mass);assert.equal(w.modes.length,3);assert.equal(w.all.filter(e=>Math.abs(e.value)<1e-7).length,3);eigenCheck(w.D,w.all);assert.deepEqual(w.modes.map(m=>m.label).sort(),['A₁','A₁','B₂']);w.modes.forEach(m=>near(Math.abs(m.parity),1));const co=P.water(kr*2,kb*2,mass);co.modes.forEach((m,i)=>near(m.omega,Math.SQRT2*w.modes[i].omega));}
for(const n of [3,12,40])for(const m of [0,1,2])near(P.structure(n,m*2*Math.PI).intensity,n*n,1e-8);
for(const n of [3,12,40])near(P.structure(n,2*Math.PI/n).intensity,0);
for(const center of ['s','p'])for(const ch of ['+','-']){const r=P.ligand(center,ch,.8);if(!r.allowed)near(r.coupling,0);}
console.log(JSON.stringify({status:'PASS',checks,notes:['Analytic spectra and eigenvector residuals','Parity quadrature vs analytic integrals','Water rigid zero modes, normalization and symmetry','Frequency scaling with force constants','Finite lattice interference maxima and roots']},null,2));
