const assert=require('node:assert/strict'),G=require('../assets/groups.js');let checks=0;
function ok(v,msg){assert.ok(v,msg);checks++;}function equal(a,b,msg){assert.deepEqual(a,b,msg);checks++;}function near(a,b){ok(Math.abs(a-b)<1e-9,a+' != '+b);}
const reports=[];
for(const g of Object.values(G.groups)){
 const a=G.audit(g.table);ok(a.group,'Axioms '+g.id);const cs=G.classes(g),subs=G.subgroups(g);
 for(let x=0;x<g.n;x++){
  equal(G.mul(g,x,g.inverse[x]),g.e);equal(G.mul(g,g.inverse[x],x),g.e);
  const C=cs.find(S=>S.includes(x)),cent=G.centralizer(g,x);equal(C.length*cent.length,g.n);
  ok(G.subgroupCheck(g,cent).ok);const fibers=C.map(v=>g.raw.map((_,i)=>i).filter(i=>G.conjugate(g,x,i)===v));fibers.forEach(S=>equal(S.length,cent.length));
  for(let y=0;y<g.n;y++){
   const z=G.mul(g,x,y);equal(g.inverse[z],G.mul(g,g.inverse[y],g.inverse[x]));
   equal(g.orders[G.conjugate(g,x,y)],g.orders[x]);
   const A=G.matrix(g,x),B=G.matrix(g,y),Cmat=G.matrix(g,z);if(A){for(let i=0;i<2;i++)for(let j=0;j<2;j++)near(A[i][0]*B[0][j]+A[i][1]*B[1][j],Cmat[i][j]);}
  }
 }
 for(const H of subs){ok(g.n%H.length===0);ok(G.subgroupCheck(g,H).ok);equal(G.closure(g,H),H);for(const side of ['left','right']){const cs=G.cosets(g,H,side);equal(cs.length*H.length,g.n);const flat=cs.flatMap(c=>c.members);equal(new Set(flat).size,g.n);cs.forEach(c=>equal(c.members.length,H.length));}}
 equal(new Set(cs.flat()).size,g.n);equal(cs.flat().length,g.n);
 reports.push({group:g.id,order:g.n,subgroups:subs.length,classes:cs.map(c=>c.length),axioms:'PASS'});
}
const D=G.groups.D3,book=[[0,1,2,3,4,5],[1,0,4,5,2,3],[2,5,0,4,3,1],[3,4,5,0,1,2],[4,3,1,2,5,0],[5,2,3,1,0,4]];
for(let y=0;y<6;y++)for(let x=0;x<6;x++)equal(D.table[x][y],book[y][x],'Cotton table convention');
equal(D.raw.map((_,x)=>G.conjugate(D,1,x)),[1,1,3,2,2,3]);
// All 6^3 input expressions: the reverse inverse always undoes the forward action.
for(let a=0;a<6;a++)for(let b=0;b<6;b++)for(let c=0;c<6;c++){
 const product=G.word(D,[a,b,c]),inv=G.word(D,[D.inverse[c],D.inverse[b],D.inverse[a]]);equal(G.mul(D,inv,product),D.e);
}
const loop=require('../assets/nonassociative.json'),audit=G.audit(loop);ok(audit.latin&&audit.inverses&&audit.identity===0&&!audit.associativity&&!audit.group);equal(audit.witness,{a:1,b:1,c:2,left:2,right:4});
const counts={C4:3,V4:5,C6:4,D3:6,C8:4,C4xC2:8,Z222:16,D4:10,Q8:6,A4:10};for(const [id,n] of Object.entries(counts))equal(G.subgroups(G.groups[id]).length,n);
ok(!G.subgroups(G.groups.A4).some(H=>H.length===6),'A4 lacks order6 subgroup');
const c4=G.groups.C4;equal(G.mul(c4,1,1),G.mul(c4,3,3));ok(G.mul(c4,1,1)!==c4.e,'Exercise2.4 counterexample');
const result={status:'PASS',checks,groups:reports,notes:['All h^3 associativity checks per group; exact arithmetic','Textbook column-times-row table matches all36 entries','All matrix realizations respect group multiplication','Every subgroup/coset/class and centralizer identity checked','Exercise2.4 counterexample and A4 nonconverse checked']};console.log(JSON.stringify(result,null,2));
