/* Ordinary crystallographic point groups: local data, no network and no dependencies. */
'use strict';
(() => {
 const groups=window.POINT_GROUPS, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const SF=s=>s.replace(/^([CDSTO])([0-9]*)(.*)$/,(_,a,n,b)=>a+(n||b?'<sub>'+n+b+'</sub>':''));
 const HM=s=>esc(s).replace(/-(\d)/g,'<span class="overbar">$1</span>');
 const label=s=>esc(s).replace(/([ABTE])([12])/g,'$1<sub>$2</sub>').replace(/([gu])$/, '<sub>$1</sub>');
 const I=[[1,0,0],[0,1,0],[0,0,1]], seeds=[[.72,.31,.47],[.17,.61,-.24],[-.29,.13,.78]];
 const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));
 const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
 const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0), cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 const norm=a=>Math.sqrt(dot(a,a)), scale=(a,t)=>a.map(x=>x*t), add=(a,b)=>a.map((x,i)=>x+b[i]);
 function rotation(axis,angle) {
  const [x,y,z]=axis,c=Math.cos(angle),s=Math.sin(angle),v=1-c;
  return [[c+x*x*v,x*y*v-z*s,x*z*v+y*s],[y*x*v+z*s,c+y*y*v,y*z*v-x*s],[z*x*v-y*s,z*y*v+x*s,c+z*z*v]];
 }
 function operationPath(op,t) {
  if(op.kind==='identity')return I;
  if(op.kind==='rotation')return rotation(op.axis,op.angle*t);
  if(op.kind==='inversion')return I.map(r=>r.map(x=>x*(1-2*t)));
  // This interpolation intentionally leaves O(3) during a reflection. Only endpoints are group operations.
  const rotationT=op.kind==='improper'?Math.min(1,t/.55):0;
  const mirrorT=op.kind==='improper'?Math.max(0,(t-.55)/.45):t;
  const n=op.normal,F=I.map((r,i)=>r.map((v,j)=>v-2*mirrorT*n[i]*n[j]));
  return mul(rotation(op.axis,op.angle*rotationT),F);
 }
 function real(x) {
  if(Math.abs(x)<1e-7)return '0';
  for(const [v,s] of [[1,'1'],[.5,'½'],[Math.sqrt(3)/2,'√3/2'],[Math.SQRT1_2,'1/√2'],[1/Math.sqrt(3),'1/√3']])if(Math.abs(Math.abs(x)-v)<1e-7)return (x<0?'−':'')+s;
  if(Math.abs(x-Math.round(x))<1e-7)return String(Math.round(x));
  return x.toFixed(3).replace(/0+$/,'').replace(/\.$/,'').replace('-','−');
 }
 function complex(z) {
  const [a,b]=z;if(Math.abs(b)<1e-7)return real(a);
  const im=(Math.abs(Math.abs(b)-1)<1e-7?'':real(Math.abs(b)))+'i';
  return Math.abs(a)<1e-7?(b<0?'−':'')+im:real(a)+(b<0?' − ':' + ')+im;
 }
 function matrix(M,isComplex=false) {
  return '<div class="matrix-scroll"><table class="matrix" aria-label="矩阵"><tbody>'+M.map(row=>'<tr>'+row.map(x=>'<td'+((isComplex?Math.hypot(...x):Math.abs(x))<1e-7?' class="matrix-zero"':'')+'>'+esc(isComplex?complex(x):real(x))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 }
 const state={g:null,selectedOp:0,selectedIrrep:0,pose:0,start:0,target:0,t:1,active:false,playing:false,raf:0,yaw:.8,elevation:.4,zoom:1};
 let orbit=[],canvas=$('#scene'),ctx=canvas.getContext('2d'),W=500,H=365;
 function project(p) {
  const a=state.yaw,e=state.elevation,r=[-Math.sin(a),Math.cos(a),0],up=[-Math.cos(a)*Math.sin(e),-Math.sin(a)*Math.sin(e),Math.cos(e)],forward=[Math.cos(a)*Math.cos(e),Math.sin(a)*Math.cos(e),Math.sin(e)];
  const depth=dot(p,forward),factor=.34*Math.min(W,H)*state.zoom/(1-.18*depth);
  return {x:W/2+dot(p,r)*factor,y:H/2-dot(p,up)*factor,z:depth};
 }
 function line(a,b,color,width=1,dash=[]) {const p=project(a),q=project(b);ctx.beginPath();ctx.setLineDash(dash);ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();ctx.setLineDash([]);}
 function point(v,color,r=3,filled=true) {const p=project(v);ctx.beginPath();ctx.arc(p.x,p.y,r,0,2*Math.PI);ctx.fillStyle=color;ctx.strokeStyle=color;ctx.lineWidth=1;if(filled)ctx.fill();else ctx.stroke();}
 function draw() {
  if(!state.g)return;
  W=canvas.clientWidth;H=canvas.clientHeight;const dpr=devicePixelRatio||1;
  if(canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)){canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const op=state.g.operations[state.selectedOp],A=mul(operationPath(op,state.t),state.g.operations[state.start].matrix),full=$('#full-orbit').checked,ghost=$('#show-reference').checked;
  // The selected symmetry element, in the fixed Cartesian laboratory frame.
  if(op.normal){
   const n=op.normal,raw=cross(n,Math.abs(n[2])<.8?[0,0,1]:[1,0,0]),u=scale(raw,1/norm(raw)),v=cross(n,u);
   ctx.beginPath();for(let j=0;j<=40;j++){const t=2*Math.PI*j/40,p=project(add(scale(u,1.25*Math.cos(t)),scale(v,1.25*Math.sin(t))));j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.closePath();ctx.fillStyle='#cfac5930';ctx.fill();ctx.strokeStyle='#b58a3670';ctx.lineWidth=.8;ctx.stroke();
  }
  if(op.kind==='rotation'||op.kind==='improper')line(scale(op.axis,-1.4),scale(op.axis,1.4),'#b78d3d',1.3,[4,4]);
  for(let i=0;i<3;i++){const v=[0,0,0];v[i]=1.35;line(scale(v,-.8),v,'#b9c1cf',.7);const p=project(v);ctx.fillStyle='#748398';ctx.font='11px Georgia';ctx.fillText('xyz'[i],p.x+5,p.y+3);}
  const visible=full?orbit:seeds.map((v,i)=>({v,c:i,id:i})),colors=['#284f83','#b48632','#92566b'];
  if(ghost)for(const p of visible)point(p.v,'#aeb7c5',2.4,false);
  if(full){for(let i=0;i<orbit.length;i+=3){line(mv(A,orbit[i].v),mv(A,orbit[i+1].v),'#627a9b20',.8);line(mv(A,orbit[i+1].v),mv(A,orbit[i+2].v),'#627a9b20',.8);}}
  else{line(mv(A,seeds[0]),mv(A,seeds[1]),'#8596ac',1);line(mv(A,seeds[1]),mv(A,seeds[2]),'#8596ac',1);}
  const pts=visible.map(p=>({...p,w:mv(A,p.v)}));pts.sort((a,b)=>project(a.w).z-project(b.w).z);for(const p of pts)point(p.w,colors[p.c],full?3.1:5);
  // Track one labelled point; otherwise a symmetry operation is invisible at the endpoint.
  ctx.beginPath();for(let j=0;j<=40;j++){const T=mul(operationPath(op,state.t*j/40),state.g.operations[state.start].matrix),p=project(mv(T,seeds[0]));j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y);}ctx.strokeStyle='#b78d3d';ctx.lineWidth=1.2;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
  const p0=mv(A,seeds[0]);point(p0,'#fffdf5',7);point(p0,'#a87826',4.6);const p=project(p0);ctx.fillStyle='#071b49';ctx.font='bold 11px system-ui';ctx.fillText('P',p.x+10,p.y-7);
  const armColors=['#345f94','#b08433','#a06173'];for(let i=0;i<3;i++){const v=[...seeds[0]];v[i]+=.15;line(p0,mv(A,v),armColors[i],2);}
  point([0,0,0],'#71819b',2);$('#scene').setAttribute('aria-label',state.g.symbol+'，'+op.name+'，进度 '+Math.round(state.t*100)+'%。鼠标拖动旋转观察。');
 }
 function stop(){cancelAnimationFrame(state.raf);state.playing=false;}
 function controlState(){
  $$('[data-op]').forEach(b=>{b.disabled=state.active&&state.t<1;b.classList.toggle('active',Number(b.dataset.op)===state.selectedOp);});
  $('#scrub').value=String(state.t);$('#scrub-output').textContent=Math.round(state.t*100)+'%';$('#play').textContent=state.playing?'暂停演示':state.t<1?'继续演示':'重放本次';
 }
 function finish(){state.t=1;state.pose=state.target;state.active=false;state.playing=false;controlState();updatePose();draw();}
 function play(){
  if(state.playing){stop();controlState();return;}
  if(state.t>=1){state.t=0;state.active=true;}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
  const initial=state.t,start=performance.now(),duration=950;state.playing=true;controlState();
  function frame(now){state.t=Math.min(1,initial+(now-start)/duration);$('#scrub').value=String(state.t);$('#scrub-output').textContent=Math.round(state.t*100)+'%';updatePose();draw();if(state.t<1)state.raf=requestAnimationFrame(frame);else finish();}
  state.raf=requestAnimationFrame(frame);
 }
 function applyOperation(index){
  if(state.active&&state.t<1)return;
  stop();state.selectedOp=index;state.start=$('#from-initial').checked?0:state.pose;state.target=state.g.multiplication[index][state.start];state.t=0;state.active=true;
  updateOperation();updateIrrep();controlState();updatePose();draw();play();
 }
 function updatePose(){
  const op=state.g.operations[state.pose],moving=state.active&&state.t<1,A=moving?mul(operationPath(state.g.operations[state.selectedOp],state.t),state.g.operations[state.start].matrix):op.matrix,p=mv(A,seeds[0]);
  $('#pose-result').innerHTML='<strong>'+ (moving?'插值演示中':'当前姿态')+'</strong> '+(moving?esc(state.g.operations[state.selectedOp].name)+' · '+Math.round(state.t*100)+'%':esc(op.word)+'　·　det='+op.det)+'<br>P = ('+p.map(real).map(esc).join(', ')+')　'+(moving?'仅终点按群元素核对。':op.id===0?'回到初态。':'右边的操作先作用。');
 }
 function updateOperation(){
  const op=state.g.operations[state.selectedOp];$('#operation-name').textContent=op.name;$('#operation-detail').textContent=op.detail+' 生成元乘积：'+op.word+'。';
  $('#operation-matrix').innerHTML=matrix(op.matrix);$('#operation-meta').textContent='det M = '+op.det+'；操作阶数 '+op.order+'；共轭类含 '+state.g.classes[op.classId].size+' 个元素。';
  $('#operation-warning').hidden=op.det===1;$('#operation-warning').textContent='非正旋转：中间帧含非刚性插值，仅最后一帧严格对应群元素。';
  $$('.character-table[data-current] .active-class').forEach(el=>el.classList.remove('active-class'));
  $$('.character-table[data-current] [data-class="'+op.classId+'"]').forEach(el=>el.classList.add('active-class'));
 }
 function updateIrrep(){
  const ir=state.g.irreps[state.selectedIrrep],op=state.g.operations[state.selectedOp],value=ir.characters[op.classId];
  $('#irrep-title').innerHTML=label(ir.label)+' <span class="badge">d = '+ir.dimension+'</span>';
  $('#irrep-meta').textContent=(ir.fs===0?'FS 指标 0 · 复型：通常与共轭伙伴配成实表示；上标 ¹/² 不是维数。':'FS 指标 +1 · 实型：可选取一组实矩阵基。')+' 本次 χ(g) = '+value+'。';
  $('#irrep-matrix').innerHTML='<span class="matrix-name">D(g) =</span>'+matrix(ir.matrices[state.selectedOp],true);
  let text='';for(const [key,title] of [['polar','极矢量 / 一阶函数'],['axial','轴矢量 / 转动'],['quadratic','对称二阶函数']]){const terms=ir.basis[key];text+='<p><strong>'+title+' · 重数 '+ir[key]+'</strong>'+(terms.length?terms.map(x=>'<code>'+esc(x)+'</code>').join(''):'<span class="basis-empty">本空间中不出现</span>')+'</p>';}
  $('#basis-lists').innerHTML=text;
  $$('[data-irrep]').forEach(r=>{r.classList.toggle('selected',Number(r.dataset.irrep)===state.selectedIrrep);r.setAttribute('aria-pressed',String(Number(r.dataset.irrep)===state.selectedIrrep));});
 }
 function decomposition(key){return state.g.irreps.filter(r=>r[key]>0).map(r=>(r[key]>1?r[key]:'')+label(r.label)).join(' ⊕ ')||'0';}
 function tensorProduct(){
  const g=state.g,a=g.irreps[Number($('#product-a').value)],b=g.irreps[Number($('#product-b').value)];
  const cmul=(x,y)=>[x[0]*y[0]-x[1]*y[1],x[0]*y[1]+x[1]*y[0]];
  const reduce=values=>g.irreps.map(r=>{let value=0;for(let j=0;j<g.classes.length;j++)value+=g.classes[j].size*(r.values[j][0]*values[j][0]+r.values[j][1]*values[j][1]);return [r,Math.round(value/g.order)];}).filter(x=>x[1]>0).map(([r,n])=>(n>1?n:'')+label(r.label)).join(' ⊕ ')||'0';
  const product=a.values.map((v,i)=>cmul(v,b.values[i]));let s=label(a.label)+' ⊗ '+label(b.label)+' = '+reduce(product);
  if(a===b){const squares=g.classes.map(c=>a.values[g.operations[g.multiplication[c.representative][c.representative]].classId]);const sym=product.map((v,j)=>v.map((x,k)=>(x+squares[j][k])/2)),anti=product.map((v,j)=>v.map((x,k)=>(x-squares[j][k])/2));s+='<br>Sym² '+label(a.label)+' = '+reduce(sym)+'<br>Λ² '+label(a.label)+' = '+reduce(anti);}
  s+='<small>普通复表示的直积；同一表示时另列对称平方与反对称平方。是否允许实际耦合，还要检查反演、时间反演、统计与基态/末态。</small>';$('#product-result').innerHTML=s;
 }
 function renderGroups(){
  const q=$('#group-search').value.toLowerCase().replace(/\s+/g,''),sys=$('#system-filter').value;let result='',last='';
  for(const g of groups){if(sys&&g.system!==sys||!((g.symbol+' '+g.hm+' '+g.system+(g.symbol==='C3i'?' S6':'')).toLowerCase().replace(/\s+/g,'').includes(q)))continue;
   if(g.system!==last){last=g.system;result+='<p class="system-heading">'+g.system+'晶系</p>';}
   result+='<button class="group-option'+(g.symbol===state.g?.symbol?' active':'')+'" data-group="'+g.symbol+'" aria-label="'+g.hm+'，'+g.symbol+'，'+g.system+'晶系"><strong>'+HM(g.hm)+'</strong><span>'+SF(g.symbol)+'</span><small>'+g.order+'</small></button>';
  }
  $('#group-list').innerHTML=result||'<p class="sidebar-note">没有匹配。可试 C3v、3m、-43m 或立方。</p>';$$('[data-group]').forEach(b=>b.onclick=()=>selectGroup(b.dataset.group));
 }
 function renderTable(){
  const g=state.g;let s='<table class="character-table" data-current><thead><tr><th>复不可约表示</th><th>维数</th>'+g.classes.map(c=>'<th data-class="'+c.id+'"><button data-pick-class="'+c.id+'" title="'+esc(g.operations[c.representative].detail)+'">'+esc(c.label)+'<small>|c| = '+c.size+'</small></button></th>').join('')+'</tr></thead><tbody>';
  g.irreps.forEach((r,i)=>{s+='<tr data-irrep="'+i+'" tabindex="0" role="button" aria-label="选择不可约表示 '+r.label+'，维数 '+r.dimension+'"><td><span class="irrep-label">'+label(r.label)+'</span>'+(r.fs===0?'<span class="row-type">复型</span>':'')+'</td><td>'+r.dimension+'</td>'+r.characters.map((x,j)=>'<td data-class="'+j+'">'+esc(x)+'</td>').join('')+'</tr>';});
  $('#character-table').innerHTML=s+'</tbody></table>';
  $$('[data-irrep]').forEach(r=>{r.onclick=()=>{state.selectedIrrep=Number(r.dataset.irrep);updateIrrep();};r.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();r.click();}};});
  $$('[data-pick-class]').forEach(b=>b.onclick=()=>applyOperation(g.classes[Number(b.dataset.pickClass)].representative));
 }
 function bindOperationButtons(){ $$('[data-op]').forEach(b=>b.onclick=()=>applyOperation(Number(b.dataset.op))); }
 function selectGroup(symbol){
  stop();const g=groups.find(g=>g.symbol===symbol);state.g=g;Object.assign(state,{selectedOp:0,selectedIrrep:0,pose:0,start:0,target:0,t:1,active:false});
  orbit=[];for(const op of g.operations)for(let j=0;j<3;j++)orbit.push({v:mv(op.matrix,seeds[j]),c:j,id:orbit.length});
  $('#group-title').innerHTML=HM(g.hm)+' <small>↔</small> '+SF(g.symbol);$('#group-description').textContent=g.system+'晶系 · 群阶 '+g.order+' · '+g.classes.length+' 个共轭类 · '+g.irreps.length+' 个复不可约表示';
  $('#group-badges').innerHTML=[['有反演',g.centrosymmetric],['仅正旋转',g.chiral],['允许极性',g.polarDimension>0],['允许普通压电',g.piezoDimension>0]].map(([s,ok])=>'<span class="badge'+(ok?' yes':'')+'">'+s+'：'+(ok?'是':'否')+'</span>').join('');
  $('#generator-buttons').innerHTML=g.generators.length?g.generators.map(r=>'<button class="op-button" data-op="'+r.index+'">'+r.letter+' = '+esc(r.name)+'<small>阶数 '+r.order+'</small></button>').join(''):'<span class="basis-empty">空集即可生成 C₁；没有非平凡生成元。</span>';
  $('#generator-relations').textContent=(g.generators.length?g.generators.map(r=>r.letter+'^'+r.order+' = E').join('；')+'；':'空生成集；')+'通过乘积闭包得到全部 '+g.order+' 个元素。';
  $('#operation-count').textContent=g.order+' 个元素';
  $('#operations').innerHTML=g.classes.map(c=>'<div class="operation-class"><p>共轭类 '+(c.id+1)+' · '+c.size+' 个元素</p><div class="op-items">'+c.indices.map(i=>'<button class="op-button" data-op="'+i+'" title="'+esc(g.operations[i].detail)+'">'+esc(g.operations[i].name)+'<small>'+esc(g.operations[i].word)+'</small></button>').join('')+'</div></div>').join('');
  bindOperationButtons();renderTable();renderGroups();updateOperation();updateIrrep();updatePose();controlState();
  $('#polar-decomp').innerHTML=decomposition('polar');$('#axial-decomp').innerHTML=decomposition('axial');$('#quadratic-decomp').innerHTML=decomposition('quadratic');
  $('#polar-dim').textContent=g.polarDimension;$('#rank2-dim').textContent=g.rank2Dimension;$('#piezo-dim').textContent=g.piezoDimension;
  const opts=g.irreps.map((r,i)=>'<option value="'+i+'">'+esc(r.label)+' (d='+r.dimension+')</option>').join('');$('#product-a').innerHTML=opts;$('#product-b').innerHTML=opts;
  const E=g.irreps.findIndex(r=>r.dimension===2);if(E>=0){$('#product-a').value=String(E);$('#product-b').value=String(E);}tensorProduct();
  const note=g.irreps.some(r=>r.fs===0)?'本群含复共轭的不可约表示。¹/² 是本稿区分共轭伙伴的上标，不是维数；实函数表可能把共轭对合写成 E。':'本群的本页不可约表示均为实型。';
  $('#group-specific-note').textContent=note+(g.symbol==='C3i'?' C₃ᵢ 也常记作 S₆；这是点群类型的同义记号，不是把同名的带方向操作直接等同。':'')+(g.symbol==='D3h'?' 国际符号的不同面内设置可相差 30°，本页 x 为教学用正交坐标，不直接指定为晶胞 a。':'');
  history.replaceState(null,'','#group='+g.symbol);draw();
 }
 $('#group-search').addEventListener('input',renderGroups);$('#system-filter').addEventListener('change',renderGroups);
 $('#play').onclick=play;$('#reset').onclick=()=>{stop();Object.assign(state,{pose:0,start:0,target:0,t:1,active:false,selectedOp:0});updateOperation();updateIrrep();updatePose();controlState();draw();};
 $('#scrub').addEventListener('input',e=>{stop();state.t=Number(e.target.value);state.active=state.t<1;if(state.t===1)state.pose=state.target;controlState();updatePose();draw();});
 for(const id of ['full-orbit','show-reference'])$('#'+id).addEventListener('change',draw);
 $('#reset-camera').onclick=()=>{state.yaw=.8;state.elevation=.4;state.zoom=1;draw();};
 $('#top-view').onclick=()=>{state.yaw=0;state.elevation=1.48;draw();};
 $('#product-a').onchange=tensorProduct;$('#product-b').onchange=tensorProduct;
 let drag=null;
 canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;state.yaw-=(e.clientX-drag.x)*.008;state.elevation=Math.max(-1.48,Math.min(1.48,state.elevation+(e.clientY-drag.y)*.008));drag={x:e.clientX,y:e.clientY};draw();});
 canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
 canvas.addEventListener('wheel',e=>{e.preventDefault();state.zoom=Math.max(.55,Math.min(1.8,state.zoom*Math.exp(-e.deltaY*.001)));draw();},{passive:false});
 canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();state.yaw+=(e.key==='ArrowLeft'?.1:e.key==='ArrowRight'?-.1:0);state.elevation=Math.max(-1.48,Math.min(1.48,state.elevation+(e.key==='ArrowUp'?.1:e.key==='ArrowDown'?-.1:0)));draw();}});
 new ResizeObserver(draw).observe(canvas);
 function download(name,content,type){const blob=new Blob([content],{type}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
 $('#download-group').onclick=()=>download('point-group-'+state.g.symbol+'.json',JSON.stringify(state.g,null,2),'application/json');
 $('#download-csv').onclick=()=>{const g=state.g,rows=[['irrep','dimension',...g.classes.map(c=>c.label)],...g.irreps.map(r=>[r.label,r.dimension,...r.characters])];download(g.symbol+'-characters.csv','\ufeff'+rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv;charset=utf-8');};
 $('#source-code').textContent=operationPath.toString()+'\n\n'+rotation.toString()+'\n\n// operationPath(g, 1) 严格等于数据中的 M(g)。\n// 当前物体姿态 = operationPath(g,t) × M(起始姿态)。\n// 完整群操作、表示矩阵与特征标见 assets/groups.json。';
 window.addEventListener('beforeprint',()=>{$$('.appendix details').forEach(x=>{x.dataset.wasOpen=String(x.open);x.open=true;});});
 window.addEventListener('afterprint',()=>{$$('.appendix details').forEach(x=>x.open=x.dataset.wasOpen==='true');});
 const initial=decodeURIComponent(location.hash.replace(/^#group=/,''));selectGroup(groups.some(g=>g.symbol===initial)?initial:'C3v');
})();
