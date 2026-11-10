(function(){
'use strict';
const P=window.GroupChapterPhysics,$=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const ink='#071b49',gold='#b28b43',blue='#43789a',red='#a46061',line='#ded4ba',muted='#738094',paper='#fffcf1';
const fmt=(v,n=3)=>Math.abs(v)<10**(-n)?(0).toFixed(n):v.toFixed(n);
function label(c,text,x,y,color=ink,size=12,align='left'){c.font=`${size}px system-ui,-apple-system,"PingFang SC",sans-serif`;c.fillStyle=color;c.textAlign=align;c.fillText(text,x,y);}
function stroke(c,points,color=ink,width=1.5){c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function circle(c,x,y,r,color,outline=null){c.beginPath();c.arc(x,y,Math.max(1,r),0,Math.PI*2);c.fillStyle=color;c.fill();if(outline){c.strokeStyle=outline;c.lineWidth=1.5;c.stroke();}}
function arrow(c,x,y,dx,dy,color=gold){stroke(c,[[x,y],[x+dx,y+dy]],color,1.6);let a=Math.atan2(dy,dx);stroke(c,[[x+dx-7*Math.cos(a-.4),y+dy-7*Math.sin(a-.4)],[x+dx,y+dy],[x+dx-7*Math.cos(a+.4),y+dy-7*Math.sin(a+.4)]],color,1.6);}
function panelMatrix(A){return '<div class="matrix" style="grid-template-columns:repeat('+A.length+',1fr)">'+A.flat().map(x=>'<span class="'+(Math.abs(x)>1e-7?'nonzero':'')+'">'+fmt(x,2)+'</span>').join('')+'</div>';}
const sims=[];
function register(id,render,animated=true){
 const el=$('#'+id),canvas=el.querySelector('canvas'),ctx=canvas.getContext('2d');
 const sim={id,el,canvas,ctx,render,animated,visible:false,play:!matchMedia('(prefers-reduced-motion: reduce)').matches,time:0,w:0,h:0};
 sim.draw=()=>{const r=canvas.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);if(!r.width)return;if(sim.w!==r.width||sim.h!==r.height){sim.w=r.width;sim.h=r.height;canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,sim.w,sim.h);render(ctx,sim.w,sim.h,sim.time);};
 new ResizeObserver(()=>sim.draw()).observe(canvas);
 const btn=el.querySelector('[data-play]');if(btn){const update=()=>{btn.textContent=sim.play?'暂停动画':'播放动画';btn.setAttribute('aria-pressed',String(sim.play));};btn.addEventListener('click',()=>{sim.play=!sim.play;update();sim.draw();});update();}
 el.addEventListener('input',event=>{const out=document.getElementById(event.target.id+'-out');if(out)out.textContent=event.target.value;sim.draw();});el.addEventListener('change',()=>sim.draw());sims.push(sim);return sim;
}
const waterState={angle:0,start:0,target:0,elapsed:1,showLabels:true,isotope:false};
const geo=register('symmetry-demo',(c,w,h,t)=>{
 const a=waterState.angle,scale=Math.min(w*.32,105),cx=w/2,cy=h*.41,hy=-Math.cos(104.5*Math.PI/360),hx=Math.sin(104.5*Math.PI/360);
 label(c,'绕 z 轴转动：比较操作终点的完整点集',w/2,23,muted,11,'center');
 stroke(c,[[cx,42],[cx,h-35]],line,1);label(c,'z',cx+7,49,muted,11);
 const pts=[[-hx,hy],[hx,hy]].map(([y,z],i)=>{const depth=-y*Math.sin(a),y1=y*Math.cos(a),pers=1/(1+.18*depth);return {x:cx+y1*scale*pers,y:cy-z*scale*pers,depth,i};});
 for(const p of pts)stroke(c,[[cx,cy],[p.x,p.y]],'#9da9ad',6);
 // reference ghost atoms show equivalence even while tracked nuclei move
 for(const sign of [-1,1]){c.beginPath();c.arc(cx+sign*hx*scale,cy-hy*scale,19,0,Math.PI*2);c.strokeStyle=line;c.setLineDash([3,4]);c.stroke();c.setLineDash([]);}
 circle(c,cx,cy,24,ink);label(c,'O',cx,cy+5,paper,15,'center');
 pts.sort((a,b)=>b.depth-a.depth).forEach(p=>{const color=p.i===1&&waterState.isotope?gold:blue;circle(c,p.x,p.y,18,color);label(c,p.i===1&&waterState.isotope?'D':'H',p.x,p.y+4,paper,13,'center');if(waterState.showLabels)label(c,p.i===0?'①':'②',p.x,p.y+37,muted,14,'center');});
 label(c,'φ = '+Math.round(a*180/Math.PI)+'°',w/2,h-20,gold,12,'center');
},true);
geo.advance=dt=>{if(waterState.elapsed<1){waterState.elapsed=Math.min(1,waterState.elapsed+dt/1.2);const f=.5-.5*Math.cos(Math.PI*waterState.elapsed);waterState.angle=waterState.start+(waterState.target-waterState.start)*f;$('#symmetry-status').textContent=waterState.elapsed<1?'正在沿观察路径转动；中间帧不要求具有该对称性。':waterState.isotope?'HDO：轮廓仍重合，但 H 与 D 身份互换；核质量分布没有恢复。':'H₂O：两个同种 H 交换，完整分子与参考轮廓重合。';}};
$('#symmetry-status').textContent='初态：先预测两个原子怎样交换，再点 C₂(z)。';
$('#apply-c2').onclick=()=>{waterState.start=waterState.angle;waterState.target=waterState.angle+Math.PI;waterState.elapsed=0;geo.play=true;geo.el.querySelector('[data-play]').textContent='暂停动画';geo.el.querySelector('[data-play]').setAttribute('aria-pressed','true');};
$('#geometry-reset').onclick=()=>{waterState.angle=0;waterState.elapsed=1;$('#symmetry-status').textContent='初态：先预测两个原子怎样交换，再点 C₂(z)。';geo.draw();};
$('#show-atom-labels').onchange=e=>{waterState.showLabels=e.target.checked;geo.draw();};
$('#geometry-isotope').onchange=e=>{waterState.isotope=e.target.value==='hdo';$('#symmetry-status').textContent=waterState.isotope?'现在同位素身份可区分，比较 C₂ 操作前后的质量分布。':'两侧同为 H，追踪编号只是观察标签。';geo.draw();};
function dimerInputs(){return {t:+$('#dimer-t').value,delta:+$('#dimer-delta').value};}
const dim=register('dimer-demo',(c,w,h,time)=>{
 const {t,delta}=dimerInputs(),r=P.dimer(t,delta),mid=h*.48,scale=45,xs=w<550?[w*.28,w*.72]:[w*.32,w*.73];
 $('#dimer-t-out').textContent=fmt(t,2);$('#dimer-delta-out').textContent=fmt(delta,2);
 stroke(c,[[25,mid],[w-25,mid]],line,1);label(c,'ε = 0',27,mid-10,muted,10);
 r.energies.forEach((e,i)=>{const y=mid-e*scale,x=xs[i];stroke(c,[[x-44,y],[x+44,y]],i?gold:ink,3);label(c,(i?'高能':'低能')+' E = '+fmt(e,2),x,y-15,i?gold:ink,11,'center');const v=r.vectors[i],py=h-51;stroke(c,[[x-26,py],[x+26,py]],line,3);v.forEach((amp,j)=>{const p=x+(j?26:-26);circle(c,p,py,8+13*Math.abs(amp),amp>=0?blue:red);label(c,amp>=0?'+':'−',p,py+4,paper,12,'center');});label(c,'⟨P⟩ = '+fmt(r.parity[i],2),x,h-13,muted,10,'center');});
 label(c,'相同颜色表示同号振幅；半径表示振幅大小',w/2,22,muted,10,'center');
 $('#dimer-status').innerHTML=(r.degenerate?'t = δ = 0：两态简并；当前图示只是其中一组正交本征基。':Math.abs(delta)<1e-9?'交换对称保留：两条态可按奇偶分类。':'交换对称被破坏：本征态一般不再有确定奇偶性。')+'<br>能差 '+fmt(r.energies[1]-r.energies[0])+'；‖[H,P]‖<sub>F</sub> = '+fmt(r.commutator)+'。参数均为教学能量单位。';
},false);
function restoreDimer(){$('#dimer-t').value=-1;$('#dimer-delta').value=0;dim.draw();}$('#dimer-reset').onclick=restoreDimer;
const integral=register('selection-demo',(c,w,h,time)=>{
 const alpha=+$('#mix-angle').value*Math.PI/180,op=$('#operator').value,final3=$('#final-state').value==='phi3';
 $('#mix-angle-out').textContent=fmt(alpha*180/Math.PI,0)+'°';$('#mix-angle').disabled=final3;$('#operator').disabled=final3;
 const fn=x=>P.integrand(x,alpha,op,final3),left=38,right=w-18,mid=h*.49,ys=100,px=x=>left+(x+4)/8*(right-left),py=y=>mid-y*ys;
 stroke(c,[[left,mid],[right,mid]],line);stroke(c,[[px(0),33],[px(0),h-38]],line);label(c,'ψf(x) O(x) ψi(x)',left,22,ink,11);label(c,'x',right,h*.49+18,muted,10);
 for(let x=-4;x<4;x+=.035){const y=fn(x);c.fillStyle=y>=0?'#43789a35':'#a4606135';c.fillRect(px(x),Math.min(mid,py(y)),(right-left)/8*.037,Math.max(.5,Math.abs(y*ys)));}
 stroke(c,Array.from({length:321},(_,i)=>{let x=-4+i/40;return [px(x),py(fn(x))];}),ink,2);
 const probe=1.7*(.5+.5*Math.sin(time));for(const x of [-probe,probe]){circle(c,px(x),py(fn(x)),4,x<0?red:blue);stroke(c,[[px(x),mid],[px(x),py(fn(x))]],x<0?red:blue,1);}
 [-4,-2,0,2,4].forEach(x=>label(c,String(x),px(x),mid+17,muted,10,'center'));
 const M=P.simpson(fn),exact=final3?0:(op==='x'?Math.cos(alpha):Math.sin(alpha))/Math.SQRT2;
 label(c,'蓝色：正贡献　红色：负贡献',w/2,h-10,muted,10,'center');
 $('#selection-status').innerHTML='M（数值）= '+fmt(M,6)+'；解析 = '+fmt(exact,6)+'；|M|² = '+fmt(M*M,6)+'.<br>'+(final3?'φ₀ → φ₃：x 的奇偶性筛选通过，积分仍因振子额外选择定则为零。':Math.abs(alpha)<1e-9&&op==='x2'?'纯奇末态 × 偶算符 × 偶初态：正负面积相消，严格为零。':Math.abs(alpha)>1e-9?'末态混合了奇偶分量；不能继续使用纯奇态的选择定则。':'奇算符 × 奇末态得到偶的被积函数；此模型中矩阵元非零。');
},true);
$('#final-state').onchange=()=>{if($('#final-state').value==='phi3')$('#operator').value='x';integral.draw();};
$('#selection-reset').onclick=()=>{$('#mix-angle').value=0;$('#operator').value='x2';$('#final-state').value='mixed';integral.draw();};
const ringSim=register('ring-demo',(c,w,h,time)=>{
 const t=+$('#ring-t').value,eta=+$('#ring-eta').value,res=P.ring(t,eta),idx=+$('#ring-vector').value,basis=['s','a','u','v'],amps=res.Q.map(row=>row[idx]),cx=w*.27,cy=h*.47,r=Math.min(w*.17,75),points=[[cx-r,cy-r],[cx+r,cy-r],[cx+r,cy+r],[cx-r,cy+r]],f=Math.cos(time*2);
 $('#ring-t-out').textContent=fmt(t,2);$('#ring-eta-out').textContent=fmt(eta,2);
 for(let i=0;i<4;i++)stroke(c,[points[i],points[(i+1)%4]],i===0&&eta!==0?gold:line,i===0?4:3);
 points.forEach(([x,y],i)=>{circle(c,x,y,10+22*Math.abs(amps[i]),amps[i]>=0?blue:red);label(c,amps[i]===0?'0':amps[i]>0?'+':'−',x,y+4,paper,14,'center');label(c,String(i+1),x,y+43,muted,10,'center');circle(c,x,y+8*f*amps[i],3,gold);});
 label(c,'所选基：'+basis[idx],cx,24,ink,12,'center');
 const ex=w*.75,mid=h*.48,sc=34;stroke(c,[[ex-60,mid],[ex+65,mid]],line,1);
 const counts={};res.eigen.forEach(e=>{const key=fmt(e.value,2),n=counts[key]||0;counts[key]=n+1;const xx=ex-12+n*25,yy=mid-e.value*sc;stroke(c,[[xx-10,yy],[xx+10,yy]],n?gold:ink,2);label(c,key,ex+47,yy+4,muted,10);});label(c,'数值本征能量',ex,24,ink,12,'center');label(c,'轨道系数的符号与幅值',cx,h-11,muted,10,'center');
 $('#ring-matrices').innerHTML='<div><span class="matrix-label">H</span>'+panelMatrix(res.H)+'</div><div><span class="matrix-label">Qᵀ H Q</span>'+panelMatrix(res.block)+'</div>';
 $('#ring-status').innerHTML='‖[H,R₉₀°]‖<sub>F</sub> = '+fmt(res.commutator)+'. '+(eta===0?'四重旋转保留，s、a 与 (u,v) 块不耦合。':'一条边改变后，原来的对称基出现混合项；看看哪些原来的零元变成非零。');
},true);
$('#ring-reset').onclick=()=>{$('#ring-t').value=-1;$('#ring-eta').value=0;$('#ring-vector').value=0;ringSim.draw();};
const lig=register('ligand-demo',(c,w,h,time)=>{
 const center=$('#central-orbital').value,ch=$('#ligand-channel').value,v=+$('#ligand-v').value,res=P.ligand(center,ch,v),y=h*.44,scale=Math.min(w*.3,150),cx=w/2;
 $('#ligand-v-out').textContent=fmt(v,2);
 stroke(c,[[cx-scale,y],[cx+scale,y]],line,3);
 const lobes=[{x:cx-scale,color:blue,text:'L'},{x:cx+scale,color:ch==='+'?blue:red,text:'R'}];
 lobes.forEach(p=>{circle(c,p.x,y,24,p.color);label(c,p.text,p.x,y+5,paper,13,'center');});
 if(center==='s'){circle(c,cx,y,28,gold);label(c,'s',cx,y+5,paper,15,'center');}else{circle(c,cx-16,y,21,gold);circle(c,cx+16,y,21,red);label(c,'p_z',cx,y-35,ink,12,'center');}
 label(c,'示意沿 z 对置的 σ 配体；颜色表示轨道相位',w/2,24,muted,10,'center');
 const a=res.allowed?blue:red;arrow(c,cx-scale+27,y+48,cx-(cx-scale+27),0,a);arrow(c,cx+scale-27,y+48,cx-(cx+scale-27),0,a);
 label(c,res.allowed?'对称类型相同：耦合可以存在':'奇偶性不同：耦合矩阵元为零',w/2,h-54,a,12,'center');
 label(c,'本征能量：'+res.energies.map(e=>fmt(e,3)).join('，'),w/2,h-22,ink,12,'center');
 $('#ligand-status').innerHTML=(center==='s'?'s：偶':'p_z：奇')+'；配体 '+(ch==='+'?'(L+R)/√2：偶':'(L−R)/√2：奇')+'。实际耦合 v_eff = '+fmt(res.coupling)+'. '+(res.allowed&&v===0?'虽然对称性允许，此刻耦合参数为零，没有混合。':res.allowed?'改变 v 会改变能级排斥，对称性本身不决定 v。':'即使把候选 v 调大，模型仍将不相容通道置零。');
},false);
$('#ligand-reset').onclick=()=>{$('#central-orbital').value='s';$('#ligand-channel').value='+';$('#ligand-v').value=.5;lig.draw();};
const field=register('field-demo',(c,w,h,time)=>{
 const d=+$('#field-delta').value,cx=w*.26,cy=h*.49,sc=Math.min(w*.16,66),a=time*.22;
 $('#field-delta-out').textContent=fmt(d,2);
 const project=([x,y,z])=>{let X=x*Math.cos(a)-y*Math.sin(a),Y=x*Math.sin(a)+y*Math.cos(a);return [cx+sc*(X+.35*Y),cy-sc*(z+.25*Y)];};
 const ps=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(project);ps.forEach(p=>stroke(c,[[cx,cy],p],line,2));ps.forEach(p=>circle(c,...p,10,blue));circle(c,cx,cy,16,gold);label(c,'M',cx,cy+4,paper,11,'center');label(c,'理想八面体环境',cx,h-19,muted,10,'center');
 const x=w*.71,mid=h*.45,s=45;stroke(c,[[x-65,mid],[x+70,mid]],line,1);label(c,'重心 = 0',x+68,mid+15,muted,9,'right');
 const ey=mid-.6*d*s,ty=mid+.4*d*s;
 for(let j=0;j<2;j++)stroke(c,[[x-40+j*36,ey],[x-14+j*36,ey]],gold,3);
 for(let j=0;j<3;j++)stroke(c,[[x-54+j*36,ty],[x-28+j*36,ty]],ink,3);
 label(c,'e_g  ·  2维',x,ey-28,gold,12,'center');label(c,'d_z² , d_x²−y²',x,ey-12,muted,10,'center');label(c,'t₂g  ·  3维',x,ty+23,ink,12,'center');label(c,'d_xy , d_yz , d_zx',x,ty+39,muted,10,'center');
 $('#field-status').innerHTML='E(e_g) = '+fmt(.6*d)+'；E(t₂g) = '+fmt(-.4*d)+'；2E(e_g)+3E(t₂g) = 0。'+(d===0?'此刻两组偶然等能，O_h 分类仍然可以使用。':'分组来自对称性，间隔 Δ 来自额外的物理参数。')+' 本页为单电子能级示意。';
},true);
$('#field-reset').onclick=()=>{$('#field-delta').value=1.5;field.draw();};
let modeIndex=0,waterCache=null,waterKey='';
const vib=register('vibration-demo',(c,w,h,time)=>{
 const kr=+$('#vib-kr').value,kb=+$('#vib-kb').value,mass=+$('#vib-mass').value,key=[kr,kb,mass].join();
 if(key!==waterKey){waterCache=P.water(kr,kb,mass);waterKey=key;}
 const res=waterCache,m=res.modes[modeIndex],cx=w/2,cy=h*.47,sc=Math.min(w*.31,110),amp=+$('#vib-amplitude').value,disp=m.displacement,norm=Math.max(...disp.map(Math.abs)),phase=Math.cos(time*m.omega*2),points=res.positions.map(([y,z],i)=>[cx+sc*(y+amp*phase*disp[2*i]/norm),cy-sc*(z+amp*phase*disp[2*i+1]/norm)]);
 $('#vib-kr-out').textContent=fmt(kr,2);$('#vib-kb-out').textContent=fmt(kb,2);
 for(let i=1;i<3;i++)stroke(c,[points[0],points[i]],'#99a5a9',6);
 points.forEach(([x,y],i)=>{circle(c,x,y,i===0?20:15,i===0?ink:blue);label(c,i===0?'O':mass===2?'D':'H',x,y+4,paper,12,'center');const dy=disp[2*i]/norm*27,dz=-disp[2*i+1]/norm*27;if(Math.hypot(dy,dz)>1)arrow(c,x,y,dy,dz,gold);});
 label(c,'第 '+(modeIndex+1)+' 模：'+m.label+'，ω = '+fmt(m.omega,4),w/2,24,ink,12,'center');label(c,'箭头：模式位移方向；动画振幅已放大',w/2,h-17,muted,10,'center');
 $$('#mode-choices button').forEach((b,i)=>{b.innerHTML='模式 '+(i+1)+' · '+res.modes[i].label+'<br>ω = '+fmt(res.modes[i].omega,3);b.setAttribute('aria-pressed',String(i===modeIndex));});
 const parts=m.parts,pmax=Math.max(...parts.map(Math.abs)),pstr=parts.map(v=>fmt(v/pmax,2)).join('，');
 $('#vibration-status').innerHTML='6个面内自由度 → '+res.modes.length+' 个振动 + 3个刚体零模。选中模式的 (Δr₁, Δr₂, Δθ) 相对成分：('+pstr+')。<br>对 C₂(z) 的字符 '+fmt(m.parity,2)+'；三个模式均满足 C₂v 下普通 IR 与 Raman 的对称性条件，强度本页未计算。ω 为模型单位，不是实验波数。';
},true);
$$('#mode-choices button').forEach((b,i)=>b.onclick=()=>{modeIndex=i;vib.time=0;vib.draw();});
$('#vib-reset').onclick=()=>{$('#vib-kr').value=1;$('#vib-kb').value=.2;$('#vib-mass').value=1;$('#vib-amplitude').value=.12;modeIndex=0;vib.draw();};
const crystal=register('crystal-demo',(c,w,h,time)=>{
 const n=+$('#crystal-n').value,k=+$('#crystal-k').value,qa=+$('#crystal-q').value*Math.PI,margin=32,right=w-22,spacing=(right-margin)/7;
 $('#crystal-n-out').textContent=n;$('#crystal-k-out').textContent=fmt(k,2)+'π';$('#crystal-q-out').textContent=fmt(qa/Math.PI,2)+'π';
 label(c,'相邻原胞的 Bloch 相位：k a = '+fmt(k,2)+'π',margin,23,ink,11);
 for(let i=0;i<8;i++){const x=margin+i*spacing,y=82,ang=i*k*Math.PI-time*.8;circle(c,x,y,14,'#f0e7cf',line);arrow(c,x,y,12*Math.cos(ang),-12*Math.sin(ang),blue);label(c,String(i),x,y+31,muted,9,'center');}
 const top=148,bottom=h-38,xq=q=>margin+q/(4*Math.PI)*(right-margin),yi=I=>bottom-I/(n*n)*(bottom-top);
 stroke(c,[[margin,top-8],[margin,bottom],[right,bottom]],line,1);label(c,'I(q) / N²',margin,top-16,ink,10);
 const pts=Array.from({length:801},(_,i)=>{let q=i/800*4*Math.PI;return [xq(q),yi(P.structure(n,q).intensity)];});stroke(c,pts,ink,1.7);
 [0,1,2,3,4].forEach(j=>label(c,j+'π',xq(j*Math.PI),bottom+20,muted,9,'center'));
 const f=P.structure(n,qa),xx=xq(qa),yy=yi(f.intensity);stroke(c,[[xx,top],[xx,bottom]],gold,1);circle(c,xx,yy,4,gold);
 $('#crystal-status').innerHTML='选中散射动量 q a = '+fmt(qa/Math.PI,2)+'π；F = '+fmt(f.re)+' '+(f.im>=0?'+':'−')+' '+fmt(Math.abs(f.im))+'i；I/N² = '+fmt(f.intensity/(n*n),5)+'.<br>上图 k 控制 Bloch 态相位；下图 q 控制散射相位，二者是独立变量。N 改变有限链的干涉峰宽。';
},true);
$('#crystal-reset').onclick=()=>{$('#crystal-n').value=12;$('#crystal-k').value=.5;$('#crystal-q').value=2;crystal.draw();};
// Keep the pedagogical source next to each panel, drawn from the real numerical functions.
const sources={symmetry:'// Active rotation about z, then simple perspective projection.\n// The molecule lies in yz, and C2(z) exchanges the two identical H nuclei.\nconst y1 = y * Math.cos(angle);\nconst depth = -y * Math.sin(angle);\nconst perspective = 1 / (1 + 0.18 * depth);\nconst screenX = cx + scale * y1 * perspective;\nconst screenY = cy - scale * z * perspective;',dimer:P.dimer.toString(),selection:[P.oscillator,P.integrand,P.simpson].map(f=>f.toString()).join('\n\n'),ring:P.ring.toString(),ligand:P.ligand.toString(),field:'// Five-level barycenter chosen as zero.\nconst Eg = 3 * delta / 5;    // two orbitals\nconst T2g = -2 * delta / 5;  // three orbitals\nconsole.assert(Math.abs(2 * Eg + 3 * T2g) < 1e-12);',vibration:P.water.toString(),crystal:P.structure.toString()};
$$('[data-source]').forEach(el=>{el.textContent=sources[el.dataset.source];});
const observer=new IntersectionObserver(entries=>{for(const e of entries){let s=sims.find(s=>s.el===e.target);s.visible=e.isIntersecting;if(s.visible)s.draw();}},{rootMargin:'100px'});sims.forEach(s=>observer.observe(s.el));
let last=performance.now();function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;for(const s of sims)if(s.visible&&s.play){s.time+=dt;if(s.advance)s.advance(dt);if(s.animated)s.draw();}requestAnimationFrame(frame);}requestAnimationFrame(frame);
$('#pause-all').onclick=()=>{const any=sims.some(s=>s.animated&&s.play);sims.forEach(s=>{s.play=!any;const b=s.el.querySelector('[data-play]');if(b){b.textContent=s.play?'暂停动画':'播放动画';b.setAttribute('aria-pressed',String(s.play));}});$('#pause-all').textContent=any?'播放全部动画':'暂停全部动画';};
const headings=$$('.prose > h2');const nav=$$('.toc a[data-section]');
const headObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});},{rootMargin:'-80px 0px -60% 0px'});headings.forEach(h=>headObserver.observe(h));
addEventListener('scroll',()=>{const total=document.documentElement.scrollHeight-innerHeight;$('#reading-progress').style.width=(total>0?100*scrollY/total:0)+'%';},{passive:true});
})();
