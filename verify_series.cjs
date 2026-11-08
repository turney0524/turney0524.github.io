/* Numerical / invariant checks independent of the visual renderer.
   Run from any directory: node /absolute/path/code/verify_series.cjs */
const assert=require('node:assert/strict'),{H,models:M}=require('./series_models.js');
let count=0;function near(a,b,tol,label){assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol,`${label}: ${a} vs ${b}`);count++;}function ok(value,label){assert.ok(value,label);count++;}
// Independent trapezoidal quadrature (the model helper uses Simpson).
function integral(f,a,b,n=12000){const h=(b-a)/n;let z=(f(a)+f(b))/2;for(let j=1;j<n;j++)z+=f(a+j*h);return z*h;}
for(const n of [1,2,4,6])for(const a of [.6,1,2]){let R=M.boxEigen({n,a});near(integral(R.density,0,a),1,1e-10,'box normalization');}
for(const beta of [0,.3,Math.PI/4,Math.PI/2])for(const t of [0,.17,.6])near(integral(M.boxSuper({mix:beta,t}).density,0,1),1,1e-10,'superposition norm');
for(let n=0;n<=7;n++)near(integral(M.oscillator({n}).density,-12,12),1,1e-10,'oscillator norm');
for(const alpha of [.2,1,3])near(integral(M.deltaBound({alpha}).density,-30/alpha,30/alpha),1,1e-5,'delta norm');
for(const z0 of [.3,1,4,9]){const levels=H.finiteLevels(z0);ok(levels.length===Math.ceil(2*z0/Math.PI),'bound-state count away from thresholds');for(const L of levels){const z=L.z,derivative=L.parity==='even'?z*Math.tan(z):-z/Math.tan(z);near(derivative,Math.sqrt(z0*z0-z*z),1e-8,'finite well matching');ok(L.energy<0&&L.energy>-z0*z0/2,'bound energy in well');}}
near(M.basis({theta:Math.PI/2,phi:Math.PI,beta:Math.PI/2}).values.prob,0,1e-14,'relative phase changes basis probability');near(M.sequential({beta:90}).values.prob,.5,1e-14,'z-x-z probabilities');
for(const s of [.4,1,2])for(const c of [-2,0,2])near(M.chirp({s,c}).values.det,.25,1e-11,'Gaussian covariance uncertainty');
for(const state of ['1s','2s','2p'])near(integral(M.hydrogenRadial({state}).density,0,90),1,1e-8,'hydrogen radial normalization');
for(const mode of ['distinguishable','boson','fermion']){const f=M.exchange({mode}).density;near(integral(x=>integral(y=>f(x,y),0,1,260),0,1,260),1,1e-9,'exchange 2D norm');if(mode==='fermion')for(const x of [.1,.3,.5,.9])near(f(x,x),0,1e-15,'fermion diagonal node');}
for(const e of [-.001,.001]){const v=M.springPerturb({n:0,eps:e}).values;ok(Math.abs(v.second-v.exact)<Math.abs(v.first-v.exact),'second order improves local expansion');}
near(M.avoided({g:.4,delta:0}).values.gap,.8,1e-14,'avoided crossing gap');
near(M.zeeman({l:1,branch:'upper',B:.05}).values.g,4/3,1e-14,'Lande upper');near(M.zeeman({l:1,branch:'lower',B:.05}).values.g,2/3,1e-14,'Lande lower');
near(M.variational({lambda:0,a:1}).values.bound,.5,1e-12,'variational exact harmonic limit');near(M.helium({Z:27/16}).values.energy,-729/256,1e-14,'helium optimum');ok(H.molecule(2).plus<-.5,'molecular variational binding');near(H.molecule(40).plus,-.5,1e-12,'molecular dissociation');
for(const a of [.1,1,3])near(H.rectT(.5,a),1/Math.cosh(a)**2,1e-14,'barrier special symmetric case');near(H.rectT(.3,0),1,1e-14,'vanishing barrier');
// Independent fourth-order Runge–Kutta for a two-component complex spinor.
function evolve(initial,ham,t,dt=.001){let z=initial.slice(),n=Math.ceil(t/dt),h=t/n;const rhs=(time,u)=>{const [a,b,c]=ham(time);return [a*u[1]+b*u[3]-c*u[2],-a*u[0]-b*u[2]-c*u[3],b*u[1]+c*u[0]-a*u[3],-b*u[0]+c*u[1]+a*u[2]];};const add=(u,v,k)=>u.map((x,j)=>x+k*v[j]);for(let j=0;j<n;j++){const time=j*h,k1=rhs(time,z),k2=rhs(time+h/2,add(z,k1,h/2)),k3=rhs(time+h/2,add(z,k2,h/2)),k4=rhs(time+h,add(z,k3,h));z=z.map((x,i)=>x+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6);}return z;}
// H=[[a,b-ic],[b+ic,-a]]. Start in first computational basis state.
for(const [O,D,t]of [[1,0,Math.PI],[.8,.7,4],[1.2,-1.1,7]]){const z=evolve([1,0,0,0],()=>[D/2,O/2,0],t);near(z[2]**2+z[3]**2,M.rabi({Omega:O,Delta:D,t}).values.prob,2e-9,'Rabi vs independently integrated Schrodinger');near(z.reduce((a,b)=>a+b*b,0),1,2e-9,'RK4 norm');}
// Rotating Hamiltonian and projection onto the moving upper eigenspinor.
for(const [r,theta,t]of [[.1,1,10],[.7,.8,8],[2,1.3,6]]){const s=Math.sin(theta/2),c=Math.cos(theta/2),z=evolve([-s,0,c,0],time=>[Math.cos(theta)/2,Math.sin(theta)*Math.cos(r*time)/2,Math.sin(theta)*Math.sin(r*time)/2],t),ph=r*t;const re=c*z[0]+s*(Math.cos(ph)*z[2]+Math.sin(ph)*z[3]),im=c*z[1]+s*(Math.cos(ph)*z[3]-Math.sin(ph)*z[2]);near(re*re+im*im,M.adiabatic({r,theta,t}).values.prob,2e-8,'adiabatic rotating-field exact model vs RK4');}
// Angle integration checks the partial-wave interference and total cross section.
for(const [d0,d1]of [[.5,.2],[1,-.7],[0,.8]]){const R=M.partialWaves({d0,d1});near(2*Math.PI*integral(theta=>R.differential(theta)*Math.sin(theta),0,Math.PI),R.values.sigma,2e-6,'partial wave angular integral');}
// Independent radial integral for the Born Fourier transform of Yukawa.
{const mu=.7,k=1.2,theta=.9,q=2*k*Math.sin(theta/2),amp=-.1/q*integral(r=>Math.exp(-mu*r)*Math.sin(q*r),0,70,100000);near(M.bornYukawa({mu,k}).differential(theta),amp*amp,1e-9,'Yukawa transform quadrature');}
near(Math.abs(M.bell({beta:45}).values.S),2*Math.sqrt(2),1e-12,'Tsirelson CHSH point');for(const theta of [0,.3,Math.PI/2,Math.PI]){const v=M.cloning({theta}).values;near(v.actual.reduce((a,b)=>a+b,0),1,1e-14,'CNOT output norm');near(v.target.reduce((a,b)=>a+b,0),1,1e-14,'target product norm');}
near(M.cloning({theta:Math.PI/2}).values.fidelity,.5,1e-14,'cloning superposition mismatch');near(M.decoherence({eta:0,phi:0}).values.prob,.5,1e-14,'incoherent x probability');near(M.decoherence({eta:1,phi:0}).values.purity,1,1e-14,'pure state purity');near(H.zeno(Math.PI,2),.25,1e-14,'two projective survival steps');ok(H.zeno(Math.PI,10000)>.9997,'Zeno limit');
console.log(`PASS: ${count} scientific checks; includes quadrature, boundary matching and independent RK4 Schrodinger evolution.`);
