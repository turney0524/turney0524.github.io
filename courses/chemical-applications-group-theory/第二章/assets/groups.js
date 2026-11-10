/* Exact finite-group engine. Internal table[a][b] = a*b; textbook UI transposes it. */
(function(root){'use strict';
const mod=(a,n)=>(a%n+n)%n,eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function create(id,name,raw,product,labels,meta={}){
 const table=raw.map(a=>raw.map(b=>{const p=product(a,b),j=raw.findIndex(x=>eq(x,p));if(j<0)throw Error('Not closed: '+id);return j;}));
 const e=table.findIndex((r,i)=>r.every((x,j)=>x===j)&&table.every((r,j)=>r[i]===j));
 const inverse=raw.map((_,i)=>table[i].findIndex((x,j)=>x===e&&table[j][i]===e));
 const orders=raw.map((_,i)=>{let p=e;for(let k=1;k<=raw.length;k++){p=table[p][i];if(p===e)return k;}throw Error('Missing finite order');});
 return {id,name,raw,table,e,inverse,orders,labels,n:raw.length,...meta};
}
function cyclic(n){return create('C'+n,'C'+n+' · '+n+'阶循环群',Array.from({length:n},(_,i)=>i),(a,b)=>(a+b)%n,Array.from({length:n},(_,i)=>i===0?'E':n<=5?['','A','B','C','D'][i]:i===1?'r':'r^'+i),{kind:'cyclic',degree:n,description:'指数模 '+n+' 相加；用带标记的转盘追踪操作。'});}
function dihedral(n){let raw=[];for(let k=0;k<n;k++)raw.push([k,0]);for(let k=0;k<n;k++)raw.push([k,1]);if(n===3)raw=[[0,0],[0,1],[1,1],[2,1],[1,0],[2,0]];
 return create('D'+n,'D'+n+' · '+(2*n)+'阶'+(n===3?'三角形':'正方形')+'群',raw,([k,b],[l,c])=>[mod(k+(b?-l:l),n),b^c],raw.map(([k,b],i)=>n===3?['E','A','B','C','D','F'][i]:b?(k===0?'s':k===1?'rs':'r^'+k+'s'):(k===0?'E':k===1?'r':'r^'+k)),{kind:'dihedral',degree:n,description:'r^'+n+'=s²=E，sr=r⁻¹s。'});
}
function direct(a,b,id,name,labels){const raw=[];for(let i=0;i<a;i++)for(let j=0;j<b;j++)raw.push([i,j]);return create(id,name,raw,([i,j],[k,l])=>[(i+k)%a,(j+l)%b],labels||raw.map(([i,j])=>i===0&&j===0?'E':'('+i+','+j+')'),{kind:'abstract',description:'逐分量模 '+a+'、模 '+b+' 相加。'});}
const V4=create('V4','V₄ · Klein四元群',[0,1,2,3],(a,b)=>a^b,['E','A','B','C'],{kind:'v4',description:'两个独立开关按位异或；A=01、B=10、C=11。'});
const Z222=create('Z222','C₂ × C₂ × C₂',Array.from({length:8},(_,i)=>i),(a,b)=>a^b,Array.from({length:8},(_,i)=>i?i.toString(2).padStart(3,'0'):'E'),{kind:'abstract',description:'三位二进制按位异或。'});
const units=[[0,1],[1,0],[0,0],[0,-1]],unitTable=[[0,1,2,3],[1,0,3,2],[2,3,0,1],[3,2,1,0]],unitSigns=[[1,1,1,1],[1,-1,1,-1],[1,-1,-1,1],[1,1,-1,-1]];
// Basis indices 0=1,1=i,2=j,3=k. i*j=k, j*k=i, k*i=j.
const qRaw=[[1,0],[-1,0],[1,1],[-1,1],[1,2],[-1,2],[1,3],[-1,3]];
const Q8=create('Q8','Q₈ · 四元数群',qRaw,([s,a],[t,b])=>[s*t*unitSigns[a][b],unitTable[a][b]],['1','−1','i','−i','j','−j','k','−k'],{kind:'abstract',description:'i²=j²=k²=ijk=−1；不是三维普通分子点群。'});
function permutations(xs){if(!xs.length)return [[]];return xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>i!==j)).map(p=>[x,...p]));}
function cycleName(p){const used=new Set();let out='';for(let i=0;i<p.length;i++)if(!used.has(i)){let cyc=[],j=i;do{cyc.push(j+1);used.add(j);j=p[j];}while(j!==i);if(cyc.length>1)out+='('+cyc.join('')+')';}return out||'E';}
const even=permutations([0,1,2,3]).filter(p=>{let inv=0;for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)inv+=p[i]>p[j];return inv%2===0;});
const A4=create('A4','A₄ · 4个对象的交错群（群阶12）',even,(p,q)=>q.map(x=>p[x]),even.map(cycleName),{kind:'abstract',description:'4个对象的偶置换；群阶12，用作整除逆命题的反例。'});
const groups={};[1,2,3,4,5,6,8,12].forEach(n=>{let g=cyclic(n);groups[g.id]=g;});for(const g of [V4,dihedral(3),dihedral(4),direct(4,2,'C4xC2','C₄ × C₂'),Z222,Q8,A4])groups[g.id]=g;
function mul(g,a,b){return g.table[a][b];}
function word(g,xs){return xs.reduce((p,x)=>mul(g,p,x),g.e);}
function closure(g,seed){let set=new Set([g.e,...seed]),changed=true;while(changed){changed=false;for(const x of Array.from(set)){for(const y of Array.from(set)){const z=mul(g,x,y);if(!set.has(z)){set.add(z);changed=true;}}const z=g.inverse[x];if(!set.has(z)){set.add(z);changed=true;}}}return [...set].sort((a,b)=>a-b);}
function subgroupCheck(g,subset){const S=new Set(subset);if(!S.size)return {ok:false,reason:'empty'};if(!S.has(g.e))return {ok:false,reason:'identity',missing:g.e};for(const x of S){if(!S.has(g.inverse[x]))return {ok:false,reason:'inverse',x,missing:g.inverse[x]};for(const y of S)if(!S.has(mul(g,x,y)))return {ok:false,reason:'product',x,y,missing:mul(g,x,y)};}return {ok:true};}
function subgroups(g){if(g._subs)return g._subs;const out=[];for(let m=1;m<(1<<g.n);m++){if(!(m&(1<<g.e)))continue;const S=[];for(let i=0;i<g.n;i++)if(m&(1<<i))S.push(i);if(g.n%S.length===0&&subgroupCheck(g,S).ok)out.push(S);}return g._subs=out.sort((a,b)=>a.length-b.length||a.join(',').localeCompare(b.join(',')));}
function cosets(g,H,side='left'){const seen=new Set(),out=[];for(let x=0;x<g.n;x++)if(!seen.has(x)){const members=H.map(h=>side==='left'?mul(g,x,h):mul(g,h,x)).sort((a,b)=>a-b);members.forEach(y=>seen.add(y));out.push({representative:x,members});}return out;}
function conjugate(g,a,x){return mul(g,mul(g,g.inverse[x],a),x);}
function centralizer(g,a){return g.raw.map((_,i)=>i).filter(x=>mul(g,x,a)===mul(g,a,x));}
function classes(g){let seen=new Set(),out=[];for(let a=0;a<g.n;a++)if(!seen.has(a)){let C=[...new Set(g.raw.map((_,x)=>conjugate(g,a,x)))].sort((a,b)=>a-b);C.forEach(x=>seen.add(x));out.push(C);}return out;}
function audit(T){const n=T.length,result={closure:true,identity:-1,inverses:true,associativity:true,latin:true,commutative:true};
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){if(!Number.isInteger(T[i][j])||T[i][j]<0||T[i][j]>=n)result.closure=false;if(T[i][j]!==T[j][i])result.commutative=false;}
 if(!result.closure){result.associativity=false;result.inverses=false;return result;}
 result.identity=T.findIndex((r,i)=>r.every((x,j)=>x===j)&&T.every((r,j)=>r[i]===j));
 result.latin=T.every(r=>new Set(r).size===n)&&T[0].every((_,j)=>new Set(T.map(r=>r[j])).size===n);
 result.inverses=result.identity>=0&&T.every((r,i)=>r.some((x,j)=>x===result.identity&&T[j][i]===result.identity));
 for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let c=0;c<n;c++)if(T[T[a][b]][c]!==T[a][T[b][c]]){result.associativity=false;result.witness??={a,b,c,left:T[T[a][b]][c],right:T[a][T[b][c]]};}
 result.group=result.closure&&result.identity>=0&&result.inverses&&result.associativity;return result;
}
function matrix(g,i){if(g.kind==='cyclic'){let a=2*Math.PI*g.raw[i]/g.degree;return [[Math.cos(a),-Math.sin(a)],[Math.sin(a),Math.cos(a)]];}if(g.kind==='dihedral'){const [k,b]=g.raw[i],a=2*Math.PI*k/g.degree,c=Math.cos(a),s=Math.sin(a),d=b?-1:1;return [[c,-d*s],[s,d*c]];}if(g.kind==='v4'){const b=g.raw[i];return [[b&1?-1:1,0],[0,b&2?-1:1]];}return null;}
function act(M,v){return M.map(r=>r[0]*v[0]+r[1]*v[1]);}
const api={groups,mul,word,closure,subgroupCheck,subgroups,cosets,conjugate,centralizer,classes,audit,matrix,act,cycleName};if(typeof module==='object'&&module.exports)module.exports=api;else root.GroupTheory=api;
})(typeof window!=='undefined'?window:this);
