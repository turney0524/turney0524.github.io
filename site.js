'use strict';
(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const menu = $('.menu-toggle'), nav = $('.main-nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '收起导航' : '展开导航');
    menu.textContent = open ? '×' : '☰';
  });
  const search = $('#search-dialog'), input = $('#site-search'), hits = $('#search-results');
  const data = JSON.parse($('#search-data')?.textContent || '[]');
  const root = new URL('.', new URL(document.querySelector('script[src$="site.js"]').getAttribute('src'), location.href));
  function showResults() {
    const q = input.value.trim().toLocaleLowerCase();
    const matches = data.filter(x => [x.title, x.summary, ...x.tags].join(' ').toLocaleLowerCase().includes(q));
    hits.replaceChildren();
    const count = document.createElement('p'); count.className = 'search-hint'; count.textContent = q ? `找到 ${matches.length} 项相关内容` : '从这些内容开始，或输入标题、主题和关键词'; hits.append(count);
    for (const x of matches.slice(0, q ? 40 : 7)) {
      const a = document.createElement('a'); a.className = 'search-hit'; a.href = new URL(x.href, root).href;
      for (const [tag, text] of [['span', x.category], ['strong', x.title], ['small', x.summary]]) {
        const el = document.createElement(tag); el.textContent = text; a.append(el);
      }
      hits.append(a);
    }
    if (!matches.length) { const p = document.createElement('p'); p.className = 'search-hint'; p.textContent = '试试“量子力学”“Bloch”“NumPy”或“几何相位”。'; hits.append(p); }
  }
  function openSearch() { search.showModal(); showResults(); input.focus(); }
  $$('.search-button').forEach(b => b.addEventListener('click', openSearch));
  input?.addEventListener('input', showResults);
  document.addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName || '') || document.activeElement?.isContentEditable;
    if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); if (!search.open) openSearch(); }
  });
  $$('.dialog-close').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  $$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } }));
  $$('.wechat-button').forEach(b => b.addEventListener('click', () => $('#wechat-dialog').showModal()));
  async function copy(text, button, label) {
    try { await navigator.clipboard.writeText(text); }
    catch (_) {
      const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.append(t); t.select();
      const ok = document.execCommand('copy'); t.remove(); if (!ok) { button.textContent = '请选中内容手动复制'; return; }
    }
    button.textContent = '已复制'; setTimeout(() => button.textContent = label, 1700);
  }
  $('#copy-wechat')?.addEventListener('click', e => copy('计算凝聚态物理', e.currentTarget, '复制公众号名称'));
  $$('.prose pre').forEach(pre => {
    const block = document.createElement('div'); block.className = 'code-block'; pre.before(block); block.append(pre);
    const b = document.createElement('button'); b.type = 'button'; b.className = 'copy-button'; b.textContent = '复制代码';
    b.addEventListener('click', () => copy(pre.textContent.replace(/\n$/, ''), b, '复制代码')); block.append(b);
  });
  for (const scope of $$('[data-filter-scope]')) {
    const entries = $$('[data-entry]', scope), buttons = $$('[data-filter]', scope), q = $('[data-local-search]', scope), empty = $('.empty-state', scope), counter = $('.list-count', scope);
    let active = 'all';
    function filter() {
      const query = (q?.value || '').toLocaleLowerCase().trim(); let count = 0;
      for (const row of entries) {
        const tags = JSON.parse(row.dataset.tags || '[]');
        const ok = (active === 'all' || row.dataset.category === active || tags.includes(active)) && row.textContent.toLocaleLowerCase().includes(query);
        row.hidden = !ok; if (ok) count++;
      }
      if (empty) empty.hidden = count > 0;
      if (counter) counter.textContent = `${count} 篇内容`;
    }
    buttons.forEach(b => b.addEventListener('click', () => { active = b.dataset.filter; buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b))); filter(); }));
    q?.addEventListener('input', filter); filter();
  }
  function drawBands(box) {
    const canvas = $('canvas', box), slider = $('input[type=range]', box), output = $('output', box), dark = box.classList.contains('model-panel');
    function draw() {
      const t1 = Number(slider.value), t2 = 1, w = canvas.clientWidth, h = canvas.clientHeight, dpr = devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr); ctx.clearRect(0, 0, w, h);
      const pad = {l:31,r:12,t:20,b:26}, pw=w-pad.l-pad.r, ph=h-pad.t-pad.b;
      const X=k=>pad.l+(k+Math.PI)/(2*Math.PI)*pw, Y=e=>pad.t+(3-e)/6*ph;
      ctx.font='9px system-ui'; ctx.lineWidth=.6;
      for (const v of [-2,0,2]) { ctx.strokeStyle=dark?'#ded3b8':'#ded3b8';ctx.beginPath();ctx.moveTo(pad.l,Y(v));ctx.lineTo(w-pad.r,Y(v));ctx.stroke();ctx.fillStyle=dark?'#6b7488':'#6b7488';ctx.fillText(String(v),9,Y(v)+3); }
      for (const [k,label] of [[-Math.PI,'−π'],[0,'0'],[Math.PI,'π']]) {ctx.fillStyle=dark?'#6b7488':'#6b7488';ctx.fillText(label,X(k)-4,h-8);}
      ctx.fillStyle=dark?'#6b7488':'#6b7488';ctx.fillText('E',10,13);ctx.fillText('k',w-8,h-8);
      for (const sign of [1,-1]) {
        ctx.strokeStyle=dark?(sign===1?'#102d60':'#b28331'):(sign===1?'#102d60':'#b28331');ctx.lineWidth=1.7;ctx.beginPath();
        for(let i=0;i<=240;i++){const k=-Math.PI+2*Math.PI*i/240,E=sign*Math.sqrt(Math.max(0,t1*t1+t2*t2+2*t1*t2*Math.cos(k)));if(i===0)ctx.moveTo(X(k),Y(E));else ctx.lineTo(X(k),Y(E));}ctx.stroke();
      }
      const gap=2*Math.abs(t1-t2);output.textContent=t1.toFixed(2);
      const readout=$('.gap-readout',box)||$('.plot-readout',box);
      if(dark){readout.replaceChildren();const small=document.createElement('span');small.textContent='带隙 ΔE';const strong=document.createElement('strong');strong.textContent=gap.toFixed(2);readout.append(small,document.createElement('br'),strong);}
      else readout.textContent=`t₁=${t1.toFixed(2)}，t₂=1.00；在 k=π 处带隙 ΔE=${gap.toFixed(2)}。${gap<.00001?'能隙闭合。':'改变键强度，能隙连续变化。'}`;
    }
    slider.addEventListener('input',draw);new ResizeObserver(draw).observe(canvas);draw();
  }
  $$('[data-ssh]').forEach(drawBands);
  const progress=$('.article-progress');if(progress){const update=()=>{const d=document.documentElement.scrollHeight-innerHeight;progress.style.width=(d>0?100*scrollY/d:0)+'%';};addEventListener('scroll',update,{passive:true});update();}
})();
