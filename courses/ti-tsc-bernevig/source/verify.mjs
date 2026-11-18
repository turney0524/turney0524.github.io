import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),src=fs.readFileSync(new URL('assets/app.js',root),'utf8');
function extract(name){const start=src.indexOf('function '+name+'(');assert(start>=0);const body=src.indexOf('{',start);let n=1,i=body+1;for(;n&&i<src.length;i++){if(src[i]==='{')n++;if(src[i]==='}')n--}return src.slice(start,i)}
const names=['eigenSym','chernData','chernExact','harperMatrix','sshMatrix','lowerState','overlap','pumpPolar','getPump'];
const context=vm.createContext({Math,console});vm.runInContext('const PI=Math.PI,TAU=2*Math.PI;let pumpCurve=null;'+names.map(extract).join('\n'),context);
const run=s=>vm.runInContext(s,context),checks=[];
const near=(a,b,e=1e-6)=>assert(Math.abs(a-b)<e,`${a} != ${b}`);
near(run('eigenSym([[1,2],[2,4]])[0]'),0);near(run('eigenSym([[1,2],[2,4]])[1]'),5);checks.push('Jacobi eigensolver: 2×2 analytic eigenvalues');
for(const [m,c]of[[-3,0],[-1,1],[1,-1],[3,0]]){near(run(`chernData(${m},120).C`),c,1e-6);assert.equal(run(`chernExact(${m})`),c)}checks.push('Chern phases m = −3, −1, 1, 3 match 0, +1, −1, 0');
for(const m of [-2,0,2])near(run(`chernData(${m},90).gap`),0);checks.push('All three analytic bulk gap closures detected');
for(const q of [2,3,4,7,9]){const a=run(`harperMatrix(${q},.37)`);a.forEach((r,i)=>r.forEach((x,j)=>near(x,a[j][i])));const eigen=run(`eigenSym(harperMatrix(${q},.37))`);near(eigen.reduce((s,x)=>s+x,0),0,1e-7);near(eigen.reduce((s,x)=>s+x*x,0),a.flat().reduce((s,x)=>s+x*x,0),1e-6)}checks.push('Harper q=2,3,4,7,9: symmetry, trace and trace(H²) invariants');
for(const t of [0,.5,1,1.5,2]){const E=run(`eigenSym(sshMatrix(${t}))`);E.forEach((e,i)=>near(e,-E[E.length-1-i],1e-7))}assert(run('Math.min(...eigenSym(sshMatrix(.5)).map(Math.abs))')<.001);assert(run('Math.min(...eigenSym(sshMatrix(1.5)).map(Math.abs))')>.5);checks.push('SSH open chain: ±E pairing and topological end levels');
const pump=run('getPump()');const delta=pump.at(-1)[1]-pump[0][1];near(Math.abs(delta),1,1e-6);checks.push(`Rice–Mele pump: continuous Wannier center shift = ${delta.toFixed(6)}`);
for(const v of [[1,2,3],[0,0,-1],[0,0,1]]){const u=run(`lowerState(${v.join(',')})`);near(u.flat().reduce((s,x)=>s+x*x,0),1)}checks.push('Stable lower-band spinor normalization at generic point and both poles');
const html=fs.readFileSync(new URL('index.html',root),'utf8');assert.equal((html.match(/class="chapter"/g)||[]).length,19);assert.equal((html.match(/data-lab=/g)||[]).length,11);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length);for(const m of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),`broken anchor ${m[1]}`);for(const m of html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g))assert(fs.existsSync(new URL(m[1],root)),`missing ${m[1]}`);checks.push('18 chapters + appendix, 11 labs, unique IDs, all anchors and local assets');
const report={date:'2026-11-18',status:'passed',checks,limits:['Browser rendering and controls checked separately; this report tests numerical and structural invariants.','Finite-grid curvature integration is unreliable near gap closures.','No tests claim coverage of every textbook derivation or real materials.']};fs.writeFileSync(new URL('verification.json',root),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
