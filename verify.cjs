// Independent finite differences and quadrature, no dependencies.
const assert=require('node:assert/strict');const Q=require('./quantum.js');
function integrate(f,a,b,n=16000){let sum=(f(a)+f(b))/2;const dx=(b-a)/n;for(let i=1;i<n;i++)sum+=f(a+i*dx);return sum*dx;}
function near(actual,expected,tol,label){assert.ok(Math.abs(actual-expected)<tol,`${label}: ${actual} versus ${expected}`);}
let checks=0,maxResidual=0;
for(const s of [.35,.5,1,2.5])for(const k of [-4,0,2])for(const t of [0,1,6]){
const z=Q.stats(s,k,t),a=z.meanX-10*z.sigmaX,b=z.meanX+10*z.sigmaX;
near(integrate(x=>Q.state(x,s,k,t).rho,a,b),1,1e-10,'position normalization');
near(integrate(x=>x*Q.state(x,s,k,t).rho,a,b),z.meanX,1e-9,'mean x');
near(integrate(x=>(x-z.meanX)**2*Q.state(x,s,k,t).rho,a,b),z.sigmaX**2,1e-8,'variance x');
const pa=k-10*z.sigmaP,pb=k+10*z.sigmaP;
near(integrate(p=>Q.momentumDensity(p,s,k),pa,pb),1,1e-10,'momentum normalization');
near(integrate(p=>p*Q.momentumDensity(p,s,k),pa,pb),k,1e-9,'mean p');
near(integrate(p=>(p-k)**2*Q.momentumDensity(p,s,k),pa,pb),z.sigmaP**2,1e-9,'variance p');
assert.ok(z.product>=.5-1e-12);
for(const x of [z.meanX-.7*s,z.meanX,z.meanX+.8*s]){const h=1e-4,dt=1e-5,w=Q.state(x,s,k,t),l=Q.state(x-h,s,k,t),r=Q.state(x+h,s,k,t),past=Q.state(x,s,k,t-dt),next=Q.state(x,s,k,t+dt);
const dtr=(next.re-past.re)/(2*dt),dti=(next.im-past.im)/(2*dt),dxxr=(r.re-2*w.re+l.re)/(h*h),dxxi=(r.im-2*w.im+l.im)/(h*h);
const residual=Math.hypot(-dti+.5*dxxr,dtr+.5*dxxi);maxResidual=Math.max(maxResidual,residual);assert.ok(residual<3e-6,`Schrodinger residual ${residual}`);
function J(y){const c=Q.state(y,s,k,t),u=Q.state(y+h,s,k,t),v=Q.state(y-h,s,k,t);return c.re*(u.im-v.im)/(2*h)-c.im*(u.re-v.re)/(2*h);}
near((next.rho-past.rho)/(2*dt)+(J(x+h)-J(x-h))/(2*h),0,3e-6,'continuity');checks+=2;}
checks+=7;}
// Deterministic sampler test: seeded generator, independent distribution moments.
let seed=123456789;const rng=()=>{seed=(1664525*seed+1013904223)>>>0;return (seed+.5)/4294967296;};let sum=0,sum2=0;for(let i=0;i<100000;i++){const x=Q.sample(1,rng);sum+=x;sum2+=x*x;}near(sum/100000,0,.012,'sample mean');near(sum2/100000,1,.025,'sample second moment');
console.log(`PASS: ${checks+2} checks; max Schrodinger residual ${maxResidual.toExponential(3)}. Exact Gaussian across 36 parameter combinations; quadrature ±10 sigma.`);
