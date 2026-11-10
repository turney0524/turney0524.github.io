/* Pure numerical core. No dependencies. Matrices use row-major arrays. */
(function(root){
'use strict';
const transpose=A=>A[0].map((_,i)=>A.map(r=>r[i]));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
function jacobi(A,tol=1e-12){
 const n=A.length,a=A.map(r=>r.slice()),v=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
 for(let sweep=0;sweep<100*n*n;sweep++){
  let p=0,q=1,max=0;
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(a[i][j])>max){max=Math.abs(a[i][j]);p=i;q=j;}
  if(max<tol)break;
  const th=.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]),c=Math.cos(th),s=Math.sin(th),ap=a[p][p],aq=a[q][q],apq=a[p][q];
  for(let k=0;k<n;k++)if(k!==p&&k!==q){let x=a[k][p],y=a[k][q];a[k][p]=a[p][k]=c*x-s*y;a[k][q]=a[q][k]=s*x+c*y;}
  a[p][p]=c*c*ap+s*s*aq-2*s*c*apq;a[q][q]=s*s*ap+c*c*aq+2*s*c*apq;a[p][q]=a[q][p]=0;
  for(let k=0;k<n;k++){let x=v[k][p],y=v[k][q];v[k][p]=c*x-s*y;v[k][q]=s*x+c*y;}
 }
 return a.map((r,i)=>({value:r[i],vector:v.map(row=>row[i])})).sort((x,y)=>x.value-y.value);
}
function dimer(t,delta,epsilon=0){
 const r=Math.hypot(t,delta),theta=.5*Math.atan2(t,delta),lo=[-Math.sin(theta),Math.cos(theta)],hi=[Math.cos(theta),Math.sin(theta)];
 return {energies:[epsilon-r,epsilon+r],vectors:[lo,hi],parity:[2*lo[0]*lo[1],2*hi[0]*hi[1]],commutator:Math.sqrt(8)*Math.abs(delta),degenerate:r<1e-10};
}
function oscillator(n,x){
 const f=Math.pow(Math.PI,-.25)*Math.exp(-x*x/2);
 return n===0?f:n===1?Math.SQRT2*x*f:n===2?(2*x*x-1)/Math.SQRT2*f:(2*x*x*x-3*x)/Math.sqrt(3)*f;
}
function integrand(x,alpha,operator,final3=false){
 const final=final3?oscillator(3,x):Math.cos(alpha)*oscillator(1,x)+Math.sin(alpha)*oscillator(2,x);
 return final*(operator==='x'?x:x*x)*oscillator(0,x);
}
function simpson(fn,a=-7,b=7,n=1400){let sum=fn(a)+fn(b),h=(b-a)/n;for(let j=1;j<n;j++)sum+=(j%2?4:2)*fn(a+j*h);return sum*h/3;}
function ring(t,eta=0,epsilon=0){
 const H=[[epsilon,t+eta,0,t],[t+eta,epsilon,t,0],[0,t,epsilon,t],[t,0,t,epsilon]],s=.5,r=1/Math.SQRT2;
 const Q=[[s,s,r,0],[s,-s,0,r],[s,s,-r,0],[s,-s,0,-r]];
 const R=[[0,0,0,1],[1,0,0,0],[0,1,0,0],[0,0,1,0]],HR=multiply(H,R),RH=multiply(R,H);
 return {H,Q,block:multiply(multiply(transpose(Q),H),Q),eigen:jacobi(H),commutator:Math.hypot(...HR.flat().map((x,i)=>x-RH.flat()[i]))};
}
function ligand(center,channel,v){
 // Orthogonal localized ligand basis; inversion swaps L and R with + phase.
 const allowed=(center==='s'&&channel==='+')||(center==='p'&&channel==='-');
 const eA=center==='s'?-.6:.7,eL=0,w=allowed?v:0,mid=(eA+eL)/2,r=Math.hypot((eA-eL)/2,w);
 return {allowed,coupling:w,energies:[mid-r,mid+r],H:[[eA,w],[w,eL]]};
}
function water(kr=1,kb=.2,mH=1){
 // coordinates are (y,z), O at 0; angle 104.5 degrees, r=1, mO=16.
 const h=104.5*Math.PI/360,s=Math.sin(h),c=Math.cos(h),positions=[[0,0],[-s,-c],[s,-c]],x=positions.flat();
 function internal(a){const u=[a[2]-a[0],a[3]-a[1]],v=[a[4]-a[0],a[5]-a[1]],r=Math.hypot(...u),q=Math.hypot(...v);return [r,q,Math.acos(Math.max(-1,Math.min(1,dot(u,v)/(r*q))))];}
 const step=1e-5,B=Array.from({length:3},()=>Array(6));
 for(let j=0;j<6;j++){let a=x.slice(),b=x.slice();a[j]+=step;b[j]-=step;const f=internal(a),g=internal(b);for(let i=0;i<3;i++)B[i][j]=(f[i]-g[i])/(2*step);}
 const masses=[16,16,mH,mH,mH,mH],force=[kr,kr,kb];
 const K=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>B.reduce((sum,row,k)=>sum+force[k]*row[i]*row[j],0)));
 const D=K.map((r,i)=>r.map((q,j)=>q/Math.sqrt(masses[i]*masses[j]))),all=jacobi(D);
 // Active C2(z): reflect y; swap the two equivalent outer nuclei.
 function applyP(v){return [-v[0],v[1],-v[4],v[5],-v[2],v[3]];}
 const modes=all.filter(e=>e.value>1e-7).map(e=>{
  const disp=e.vector.map((v,i)=>v/Math.sqrt(masses[i])),parts=B.map(row=>dot(row,disp)),parity=dot(e.vector,applyP(e.vector));
  return {value:e.value,omega:Math.sqrt(e.value),e:e.vector,displacement:disp,parts,parity,label:parity>0?'A₁':'B₂'};
 });
 return {positions,B,K,D,all,modes,masses};
}
function structure(N,qa){let re=0,im=0;for(let n=0;n<N;n++){re+=Math.cos(n*qa);im+=Math.sin(n*qa);}return {re,im,intensity:re*re+im*im};}
const api={transpose,multiply,dot,jacobi,dimer,oscillator,integrand,simpson,ring,ligand,water,structure};
if(typeof module==='object'&&module.exports)module.exports=api;else root.GroupChapterPhysics=api;
})(typeof window!=='undefined'?window:this);
