'use strict';
const $=id=>document.getElementById(id);let samples=[],playing=false,last=0;
const params=()=>({s:+$('s').value,k:+$('k').value,t:+$('time').value});
function plot(id,xmin,xmax,ymin,ymax,curves,bars=[],marks=[]){
const c=$(id),w=c.clientWidth,h=c.clientHeight,dpr=devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;const ctx=c.getContext('2d');ctx.scale(dpr,dpr);
const pad={l:48,r:15,t:16,b:30},X=x=>pad.l+(x-xmin)/(xmax-xmin)*(w-pad.l-pad.r),Y=y=>h-pad.b-(y-ymin)/(ymax-ymin)*(h-pad.t-pad.b);
ctx.font='11px system-ui';ctx.lineWidth=1;
for(let i=0;i<=4;i++){let y=ymin+(ymax-ymin)*i/4;ctx.strokeStyle='#294052';ctx.beginPath();ctx.moveTo(pad.l,Y(y));ctx.lineTo(w-pad.r,Y(y));ctx.stroke();ctx.fillStyle='#a7bacb';ctx.fillText(y.toFixed(2),2,Y(y)+4);let x=xmin+(xmax-xmin)*i/4;ctx.fillText(x.toFixed(1),X(x)-10,h-8);}
ctx.save();ctx.beginPath();ctx.rect(pad.l,pad.t,w-pad.l-pad.r,h-pad.t-pad.b);ctx.clip();
ctx.fillStyle='#69c9ff88';for(const b of bars)ctx.fillRect(X(b.x),Y(b.y),Math.max(1,X(b.x+b.dx)-X(b.x)-1),Y(0)-Y(b.y));
for(const [f,color] of curves){ctx.strokeStyle=color;ctx.lineWidth=2.2;ctx.beginPath();for(let i=0;i<=700;i++){const x=xmin+(xmax-xmin)*i/700,y=f(x);i?ctx.lineTo(X(x),Y(y)):ctx.moveTo(X(x),Y(y));}ctx.stroke();}
ctx.setLineDash([4,5]);ctx.strokeStyle='#d4e2ec88';for(const x of marks){ctx.beginPath();ctx.moveTo(X(x),pad.t);ctx.lineTo(X(x),h-pad.b);ctx.stroke();}ctx.restore();
}
function renderStatic(){const {s,k}=params(),r=4*s,peak=QM.state(0,s,k,0).rho,a=Math.max(Math.sqrt(peak),peak)*1.15;
plot('wave',-r,r,-a,a,[[x=>QM.state(x,s,k,0).re,'#69c9ff'],[x=>QM.state(x,s,k,0).im,'#65e0bd'],[x=>QM.state(x,s,k,0).rho,'#ffba69']]);$('waveRange').textContent=`横轴 x ∈ [${(-r).toFixed(2)}, ${r.toFixed(2)}]；初态 ⟨x⟩ = 0`;
const sp=1/(2*s);plot('momentum',k-4*sp,k+4*sp,0,1.12/(Math.sqrt(2*Math.PI)*sp),[[p=>QM.momentumDensity(p,s,k),'#65e0bd']],[],[k-sp,k,k+sp]);$('pRange').textContent=`动量中心 ${k.toFixed(2)}；σₚ = ${sp.toFixed(3)}；虚线：中心及 ±σₚ`;
$('sv').textContent=s.toFixed(2);$('kv').textContent=k.toFixed(1);renderSamples();}
function renderSamples(){const {s}=params(),r=4*s,bins=40,dx=2*r/bins,counts=Array(bins).fill(0);let outside=0;for(const x of samples){let i=Math.floor((x+r)/dx);if(i>=0&&i<bins)counts[i]++;else outside++;}const bars=counts.map((n,i)=>({x:-r+i*dx,dx,y:samples.length?n/(samples.length*dx):0})),peak=QM.state(0,s,0,0).rho,ymax=Math.max(peak*1.2,...bars.map(b=>b.y*1.1));plot('sampling',-r,r,0,ymax,[[x=>QM.state(x,s,0,0).rho,'#ffba69']],bars);const n=samples.length,mean=n?samples.reduce((a,b)=>a+b,0)/n:0,sd=n?Math.sqrt(samples.reduce((a,b)=>a+(b-mean)**2,0)/n):0;
$('sampleStats').textContent=n?`N = ${n}　样本均值 = ${mean.toFixed(3)}（理论 0）　样本标准差（分母 N）= ${sd.toFixed(3)}（理论 ${s.toFixed(2)}）　图外样本 ${outside} 个，仍计入统计与密度分母。`:'还没有测量。先猜：前 10 个点会对称分布吗？';}
function renderTime(){const {s,k,t}=params(),z=QM.stats(s,k,t),r=4*z.sigmaX,peak=QM.state(0,s,k,0).rho;plot('evolution',z.meanX-r,z.meanX+r,0,peak*1.12,[[x=>QM.state(x,s,k,t).rho,'#ffba69']],[],[z.meanX-z.sigmaX,z.meanX,z.meanX+z.sigmaX]);$('tv').textContent=t.toFixed(2);$('mx').textContent=z.meanX.toFixed(3);$('sx').textContent=z.sigmaX.toFixed(3);$('sp').textContent=z.sigmaP.toFixed(3);$('prod').textContent=z.product.toFixed(3);$('eRange').textContent=`横轴 x ∈ [${(z.meanX-r).toFixed(2)}, ${(z.meanX+r).toFixed(2)}]；显示约 99.994% 的概率。纵轴固定，单位为概率密度。`;}
function stop(){playing=false;$('play').textContent='播放';}
for(const id of ['s','k'])$(id).addEventListener('input',()=>{stop();samples=[];$('time').value=0;renderStatic();renderTime();});
for(const [id,n]of [['one',1],['hundred',100],['thousand',1000]])$(id).onclick=()=>{const {s}=params();for(let i=0;i<n;i++)samples.push(QM.sample(s));renderSamples();};
$('clear').onclick=()=>{samples=[];renderSamples();};$('time').oninput=()=>{stop();renderTime();};$('reset').onclick=()=>{stop();$('time').value=0;renderTime();};
$('play').onclick=()=>{playing=!playing;if(playing&&+$('time').value>=6)$('time').value=0;$('play').textContent=playing?'暂停':'播放';last=performance.now();};
function frame(now){if(playing){const dt=Math.min((now-last)/1000,.1);$('time').value=Math.min(6,+$('time').value+dt*.55);renderTime();if(+$('time').value>=6)stop();}last=now;requestAnimationFrame(frame);}window.addEventListener('resize',()=>{renderStatic();renderTime();});renderStatic();renderTime();requestAnimationFrame(frame);
