/* Orthogonal 3D transformations, typed-atom matching and finite point groups. */
(function(root){'use strict';
const I=[[1,0,0],[0,1,0],[0,0,1]],inv=I.map(r=>r.map(x=>-x));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),norm=a=>Math.hypot(...a),unit=a=>{const n=norm(a);return a.map(x=>x/n);};
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const act=(M,v)=>M.map(r=>dot(r,v));
const det=M=>M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
const near=(A,B,tol=2e-7)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<tol));
function rotation(axis,angle){const [x,y,z]=unit(axis),c=Math.cos(angle),s=Math.sin(angle),t=1-c;return [[c+x*x*t,x*y*t-z*s,x*z*t+y*s],[y*x*t+z*s,c+y*y*t,y*z*t-x*s],[z*x*t-y*s,z*y*t+x*s,c+z*z*t]];}
function reflection(normal){const u=unit(normal);return I.map((r,i)=>r.map((x,j)=>x-2*u[i]*u[j]));}
const rz=a=>rotation([0,0,1],a),rx=a=>rotation([1,0,0],a),sh=reflection([0,0,1]);
const vertical=a=>reflection([-Math.sin(a),Math.cos(a),0]);
function power(M,k){if(k<0)return power(transpose(M),-k);let p=I;for(let i=0;i<k;i++)p=mul(M,p);return p;}
function closure(gens,max=240){const out=[I],words=['E'];for(let i=0;i<out.length;i++)for(let j=0;j<gens.length;j++){const M=mul(gens[j],out[i]);if(!out.some(x=>near(x,M))){out.push(M);words.push(String.fromCharCode(97+j)+(i?'·'+words[i]:''));if(out.length>max)throw Error('Nonfinite/too large generator set');}}return {matrices:out,words};}
function table(mats){return mats.map(a=>mats.map(b=>{const M=mul(a,b),j=mats.findIndex(x=>near(x,M));if(j<0)throw Error('Not closed');return j;}));}
function conjugacy(mats){const T=table(mats),iv=mats.map(M=>mats.findIndex(N=>near(N,transpose(M)))),seen=new Set(),classes=[];for(let a=0;a<mats.length;a++)if(!seen.has(a)){const C=[...new Set(mats.map((_,x)=>T[T[iv[x]][a]][x]))].sort((a,b)=>a-b);C.forEach(i=>seen.add(i));classes.push(C);}return {table:T,inverse:iv,classes};}
function axisAngle(M){let c=Math.max(-1,Math.min(1,(M[0][0]+M[1][1]+M[2][2]-1)/2)),angle=Math.acos(c);if(angle<1e-7)return {axis:[0,0,1],angle:0};if(Math.PI-angle<1e-6){let a=[Math.sqrt(Math.max(0,(M[0][0]+1)/2)),Math.sqrt(Math.max(0,(M[1][1]+1)/2)),Math.sqrt(Math.max(0,(M[2][2]+1)/2))];let k=a.indexOf(Math.max(...a));for(let j=0;j<3;j++)if(j!==k)a[j]=(M[k][j]+M[j][k])/(4*a[k]);return {axis:unit(a),angle};}return {axis:unit([M[2][1]-M[1][2],M[0][2]-M[2][0],M[1][0]-M[0][1]]),angle};}
function order(M){let p=I;for(let n=1;n<=120;n++){p=mul(M,p);if(near(p,I))return n;}return Infinity;}
function opName(M){if(near(M,I))return 'E';if(near(M,inv))return 'i';if(det(M)>0){const a=axisAngle(M).angle*180/Math.PI;return 'C · '+Math.round(a*100)/100+'°';}if(near(mul(M,M),I))return 'σ · 镜像';const R=mul(sh,M);return '非真转动 · 阶'+order(M);}
function match(atoms,M,tol=2e-6){const map=[],used=new Set();for(let i=0;i<atoms.length;i++){const p=act(M,atoms[i].p);let j=atoms.findIndex((a,k)=>!used.has(k)&&a.t===atoms[i].t&&norm(a.p.map((x,j)=>x-p[j]))<tol);if(j<0)return {ok:false,index:i,point:p,map};map.push(j);used.add(j);}return {ok:true,map};}
function orbits(atoms,ops){const seen=new Set(),out=[];for(let i=0;i<atoms.length;i++)if(!seen.has(i)){const O=[...new Set(ops.map(M=>match(atoms,M)).filter(r=>r.ok).map(r=>r.map[i]))].sort((a,b)=>a-b);O.forEach(j=>seen.add(j));out.push(O);}return out;}
function family(name,n=3){const C=rz(2*Math.PI/n),X=rx(Math.PI),V=vertical(0),H=sh;let gens,expected;
 if(name==='Cn'){gens=[C];expected=n;}else if(name==='Cnv'){gens=[C,V];expected=2*n;}else if(name==='Cnh'){gens=[C,H];expected=2*n;}else if(name==='Dn'){gens=[C,X];expected=2*n;}else if(name==='Dnh'){gens=[C,X,H];expected=4*n;}else if(name==='Dnd'){gens=[C,X,vertical(Math.PI/(2*n))];expected=4*n;}else if(name==='Sn'){gens=[mul(sh,rz(2*Math.PI/n))];expected=n%2?2*n:n;}else throw Error(name);return {...closure(gens),gens,expected,name,n};}
function tetra(){return [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]];}
function ico(){const f=(1+Math.sqrt(5))/2,out=[];for(const a of [-1,1])for(const b of [-1,1])out.push([0,a,b*f],[a,b*f,0],[b*f,0,a]);return out;}
function edges(ps){let min=Infinity;for(let i=0;i<ps.length;i++)for(let j=0;j<i;j++)min=Math.min(min,norm(ps[i].map((x,k)=>x-ps[j][k])));const out=[];for(let i=0;i<ps.length;i++)for(let j=0;j<i;j++)if(Math.abs(norm(ps[i].map((x,k)=>x-ps[j][k]))-min)<1e-6)out.push([j,i]);return out;}
function triangles(ps){const ed=new Set(edges(ps).map(([a,b])=>a+','+b)),out=[];for(let a=0;a<ps.length;a++)for(let b=a+1;b<ps.length;b++)for(let c=b+1;c<ps.length;c++)if(ed.has(a+','+b)&&ed.has(a+','+c)&&ed.has(b+','+c))out.push([a,b,c]);return out;}
const polyCache={};function polyGroup(name){if(polyCache[name])return polyCache[name];let gens;const r3=rotation([1,1,1],2*Math.PI/3),x2=rx(Math.PI),x4=rotation([1,0,0],Math.PI/2);if(name==='T')gens=[r3,x2];if(name==='Td')gens=[r3,x2,reflection([1,-1,0])];if(name==='Th')gens=[r3,x2,inv];if(name==='O')gens=[r3,x4];if(name==='Oh')gens=[r3,x4,inv];if(name==='I'||name==='Ih'){const ps=ico(),face=triangles(ps)[0],a=ps[0],b=face.reduce((s,i)=>s.map((x,k)=>x+ps[i][k]),[0,0,0]);gens=[rotation(a,2*Math.PI/5),rotation(b,2*Math.PI/3)];if(name==='Ih')gens.push(inv);}return polyCache[name]={...closure(gens),gens,name};}
function polyhedron(name){let ps,g,faces;if(name==='tetra'){ps=tetra();g='Td';faces=4;}if(name==='cube'){ps=[];for(let x of [-1,1])for(let y of [-1,1])for(let z of [-1,1])ps.push([x,y,z]);g='Oh';faces=6;}if(name==='octa'){ps=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];g='Oh';faces=8;}if(name==='ico'){ps=ico();g='Ih';faces=20;}if(name==='dodeca'){const ip=ico();ps=triangles(ip).map(f=>f.reduce((s,i)=>s.map((x,k)=>x+ip[i][k]/3),[0,0,0]));g='Ih';faces=12;}if(name==='cubocta'){ps=[];for(let zero=0;zero<3;zero++)for(let a of [-1,1])for(let b of [-1,1]){let p=[a,b];p.splice(zero,0,0);ps.push(p);}g='Oh';faces=14;}return {ps,edges:edges(ps),group:g,faces};}
function classify(f){if(f.special&&f.special!=='none')return f.special;if(f.onlyS)return +f.sn===2?'Ci':'S'+f.sn;if(+f.n<2)return f.mirror?'Cs':f.inversion?'Ci':'C1';if(f.perpendicular)return 'D'+f.n+(f.horizontal?'h':f.dihedral?'d':'');return 'C'+f.n+(f.horizontal?'h':f.vertical?'v':'');}
function atom(t,p){return {t,p};}
function ring(n,z=0,a=0,r=1,t='B'){return Array.from({length:n},(_,j)=>atom(t,[r*Math.cos(a+j*2*Math.PI/n),r*Math.sin(a+j*2*Math.PI/n),z]));}
function model(name,param){let atoms,group,n,ops,desc;
 if(name==='water'){atoms=[atom('O',[0,0,0]),atom('H',[0,.79,-.61]),atom('H',[0,-.79,-.61])];ops=family('Cnv',2).matrices.map(M=>mul(mul([[0,1,0],[1,0,0],[0,0,1]],M),[[0,1,0],[1,0,0],[0,0,1]]));group='C2v';}
 if(name==='ammonia'||name==='bf3'){const h=name==='bf3'?0:(param??.55);atoms=[atom(name==='bf3'?'B':'N',[0,0,h]),...ring(3,0,0,1,name==='bf3'?'F':'H')];group=Math.abs(h)<1e-9?'D3h':'C3v';ops=family(Math.abs(h)<1e-9?'Dnh':'Cnv',3).matrices;}
 if(name==='methane'){atoms=[atom('C',[0,0,0]),...tetra().map(p=>atom('H',p.map(x=>x*.65)))];group='Td';ops=polyGroup('Td').matrices;}
 if(name==='sf6'){atoms=[atom('S',[0,0,0]),...polyhedron('octa').ps.map(p=>atom('F',p))];group='Oh';ops=polyGroup('Oh').matrices;}
 if(name==='square'){atoms=[atom('Pt',[0,0,0]),...ring(4,0,0,1,'Cl')];group='D4h';ops=family('Dnh',4).matrices;}
 if(name==='benzene'){atoms=[...ring(6,0,0,1,'C'),...ring(6,0,0,1.5,'H')];group='D6h';ops=family('Dnh',6).matrices;}
 if(name==='pf5'){atoms=[atom('P',[0,0,0]),atom('F',[0,0,1.35]),atom('F',[0,0,-1.35]),...ring(3,0,0,1,'F')];group='D3h';ops=family('Dnh',3).matrices;}
 if(name==='allene'){atoms=[atom('C',[0,0,0]),atom('C',[0,0,.8]),atom('C',[0,0,-.8]),atom('H',[.75,0,1.2]),atom('H',[-.75,0,1.2]),atom('H',[0,.75,-1.2]),atom('H',[0,-.75,-1.2])];group='D2d';{const Q=rz(Math.PI/4);ops=family('Dnd',2).matrices.map(M=>mul(mul(Q,M),transpose(Q)));}}
 if(name==='ethane'||name==='ferrocene'){n=name==='ethane'?3:5;const b=(param??180/n)*Math.PI/180;atoms=[...(name==='ethane'?[atom('C',[0,0,.45]),atom('C',[0,0,-.45])]:[atom('Fe',[0,0,0])]),...ring(n,.8,0,1,name==='ethane'?'H':'C'),...ring(n,-.8,b,1,name==='ethane'?'H':'C')];let gens=[rz(2*Math.PI/n),rotation([Math.cos(b/2),Math.sin(b/2),0],Math.PI)];const nearZero=Math.abs(b)<1e-8,nearStagger=Math.abs(b-Math.PI/n)<1e-8;if(nearZero)gens.push(sh);if(nearStagger)gens.push(mul(sh,rz(Math.PI/n)));ops=closure(gens).matrices;group='D'+n+(nearZero?'h':nearStagger?'d':'');}
 if(name==='peroxide'){const theta=(param??50)*Math.PI/180,c=Math.cos(theta),s=Math.sin(theta);atoms=[atom('O',[0,0,.5]),atom('O',[0,0,-.5]),atom('H',[c,s,1]),atom('H',[c,-s,-1])];const gens=[rx(Math.PI)];if(Math.abs(theta)<1e-8)gens.push(reflection([0,1,0]));if(Math.abs(theta-Math.PI/2)<1e-8)gens.push(inv);ops=closure(gens).matrices;group=Math.abs(theta)<1e-8?'C2v':Math.abs(theta-Math.PI/2)<1e-8?'C2h':'C2';}
 if(name==='co2'||name==='hcn'){atoms=[atom(name==='co2'?'C':'C',[0,0,0]),atom(name==='co2'?'O':'H',[0,0,1]),atom(name==='co2'?'O':'N',[0,0,-1])];ops=family(name==='co2'?'Dnh':'Cnv',6).matrices;group=name==='co2'?'D∞h':'C∞v';desc='连续群：下方只抽样显示部分操作，列表不是完整群。';}
 if(name==='chiral'){atoms=[atom('C',[0,0,0]),...tetra().map((p,j)=>atom(['F','Cl','Br','H'][j],p.map(x=>x*.65)))];ops=[I];group='C1';}
 if(name==='s4'){const S=mul(sh,rz(Math.PI/2));ops=closure([S]).matrices;atoms=[];for(const [i,p] of [[0,[1,.27,.7]],[1,[.56,.83,.29]],[2,[.22,-.31,1.1]]])for(const M of ops)atoms.push(atom(['A','B','D'][i],act(M,p)));group='S4';}
 if(name==='genericCs'){atoms=[atom('S',[0,0,0]),atom('O',[0,0,1]),atom('F',[.8,.7,-.5]),atom('F',[.8,-.7,-.5])];ops=[I,reflection([0,1,0])];group='Cs';}
 if(!atoms)throw Error('Unknown model '+name);return {name,atoms,ops,group,desc:desc||'理想化几何模型；键长与角度仅用于对称性教学，不是结构拟合。'};
}
function decorated(kind,angle=0){
 let atoms,source,expected;
 if(kind==='tetra'){const ps=tetra(),ed=edges(ps);atoms=ps.map(p=>atom('V',p));const special=new Set();special.add(ed.findIndex(([a,b])=>a===0&&b===1));special.add(ed.findIndex(([a,b])=>a===2&&b===3));ed.forEach(([a,b],i)=>atoms.push(atom(special.has(i)?'red':'black',ps[a].map((x,k)=>(x+ps[b][k])/2))));source=polyGroup('Td').matrices;expected='D2d';}
 if(kind==='octa'){const ps=polyhedron('octa').ps;atoms=ps.map(p=>atom('V',p));for(const f of triangles(ps)){const c=f.reduce((s,i)=>s.map((x,k)=>x+ps[i][k]/3),[0,0,0]);atoms.push(atom(c[0]*c[1]*c[2]>0?'red':'black',c));}source=polyGroup('Oh').matrices;expected='Td';}
 if(kind==='cube'||kind==='black'){const ps=polyhedron('cube').ps;atoms=ps.map(p=>atom(kind==='black'?(p[0]*p[1]*p[2]>0?'red':'black'):'V',p));for(let a=0;a<3;a++)for(let sign of [-1,1]){const n=[0,0,0];n[a]=sign;const base=[0,0,0];base[(a+2)%3]=1;const v=act(rotation(n,-angle*Math.PI/180),base);for(let t of [-1,1])atoms.push(atom('line',n.map((x,k)=>x+t*.38*v[k])));}source=polyGroup('Oh').matrices;expected=kind==='black'?'T':Math.abs(angle)<1e-8?'Th':Math.abs(angle-45)<1e-8?'Td':'T';}
 return {atoms,ops:source.filter(M=>match(atoms,M).ok),source,group:expected};
}
function matrixList(atoms,ops){return ops.filter(M=>match(atoms,M).ok);}
function substitution(n,labels){const base=[...ring(n,0,0,1,'C'),...ring(n,0,0,1.5,'H')];labels.forEach((t,j)=>base[n+j].t=t);const ops=matrixList(base,family('Dnh',n).matrices);return {atoms:base,ops,group:inferPlanar(n,ops)};}
function inferPlanar(n,ops){const proper=ops.filter(M=>det(M)>0),inver=ops.some(M=>near(M,inv));if(ops.length===4*n)return 'D'+n+'h';if(ops.length===12&&n===6)return 'D3h';if(ops.length===8)return 'D2h';if(ops.length===4)return inver?'C2h':'C2v';if(ops.length===2)return 'Cs';if(ops.length===1)return 'C1';return '群阶 '+ops.length+'，请按流程确认符号';}
const api={I,inv,dot,norm,unit,transpose,mul,act,det,near,rotation,reflection,rz,rx,sh,vertical,power,closure,table,conjugacy,axisAngle,order,opName,match,orbits,family,tetra,ico,edges,triangles,polyGroup,polyhedron,classify,atom,ring,model,substitution,matrixList,decorated};
if(typeof module==='object'&&module.exports)module.exports=api;else root.MolecularSymmetry=api;
})(typeof window!=='undefined'?window:this);
