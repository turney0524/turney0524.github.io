"""Build the offline review article, full Markdown appendix and data explorer."""
from pathlib import Path
import sys,json,re,html
R=Path(__file__).resolve().parents[1]
sys.path[:0]=['/tmp/cmp-site','/tmp/qm-math']
import markdown2
from latex2mathml.converter import convert
G=json.loads((R/'assets/groups.json').read_text())
def esc(s):return html.escape(str(s),quote=True)
def sf(s):
 m=re.match(r'([CDSTO])(.*)',s);return m[1]+('<sub>'+m[2]+'</sub>' if m[2] else '')
def hm(s):return re.sub(r'-(\d)',r'<span class="overbar">\1</span>',esc(s))
def label(s):return re.sub(r'([gu])$',r'<sub>\1</sub>',re.sub(r'([ABTE])([12])',r'\1<sub>\2</sub>',esc(s)))
def decomp(g,k):return ' ⊕ '.join((str(r[k]) if r[k]>1 else '')+r['label'] for r in g['irreps'] if r[k])
def fmt(v):
 for x,s in [(0,'0'),(1,'1'),(.5,r'\frac12'),(3**.5/2,r'\frac{\sqrt3}2')]:
  if abs(abs(v)-x)<1e-7:return ('-' if v<-1e-7 else '')+s
 return f'{v:.6g}'
def matrix_tex(M):return r'\begin{pmatrix}'+r'\\'.join('&'.join(fmt(v) for v in row) for row in M)+r'\end{pmatrix}'
body=(R/'正文.md').read_text()
overview=['\n\n## 附录 A：32 点群符号与生成元总览\n','|序号|晶系|国际符号（横线用 - 表示）|Schönflies|阶数|一组生成元|','|---:|---|---|---|---:|---|']
appendix=['\n\n## 附录 B：完整特征标表与基空间分解\n','ω = exp(2πi/3)。¹、² 表示共轭伙伴，不是维数。K_j 对应本页的一个真正共轭类，类大小用于加权求和。\n']
htmlOverview=[];htmlAppendix=[]
for g in G:
 gens='；'.join(f"{x['letter']}={x['name']}" for x in g['generators']) or '空集（无非平凡生成元）'
 overview.append(f"|{g['number']}|{g['system']}|{g['hm']}|{g['symbol']}|{g['order']}|{gens}|")
 htmlOverview.append(f"<tr><td>{g['number']}</td><td>{g['system']}</td><td>{hm(g['hm'])}</td><td>{sf(g['symbol'])}</td><td>{g['order']}</td><td>{esc(gens)}</td></tr>")
 appendix.extend([f"\n### {g['number']:02d}. {g['hm']} / {g['symbol']}\n",f"{g['system']}晶系；阶数 {g['order']}；{len(g['classes'])} 个真正共轭类。生成元：{gens}。\n"])
 for gen in g['generators']:appendix.append('$$\n'+gen['letter']+'='+matrix_tex(g['operations'][gen['index']]['matrix'])+'\n$$\n')
 classlegend='；'.join(f"K{j+1}：{c['size']} 个元素，代表元 {g['operations'][c['representative']]['name']}" for j,c in enumerate(g['classes']))
 appendix.append(classlegend+'。\n')
 heads=['复不可约表示','维数']+[f'K{j+1}' for j in range(len(g['classes']))]
 appendix.append('|'+ '|'.join(heads)+'|');appendix.append('|'+ '|'.join('---' for _ in heads)+'|')
 rows=[]
 for r in g['irreps']:
  appendix.append('|'+ '|'.join([r['label'],str(r['dimension'])]+r['characters'])+'|')
  rows.append('<tr><td>'+label(r['label'])+'</td><td>'+str(r['dimension'])+'</td>'+''.join('<td>'+esc(x)+'</td>' for x in r['characters'])+'</tr>')
 appendix.extend(['\n极矢量 V = '+decomp(g,'polar')+'；轴矢量 A = '+decomp(g,'axial')+'；Sym²V = '+decomp(g,'quadratic')+'。\n',f"对称二阶极张量不变量维数 {g['rank2Dimension']}；普通压电型不变量维数 {g['piezoDimension']}。\n"])
 table='<div class="table-wrap"><table class="character-table"><thead><tr><th>复不可约表示</th><th>维数</th>'+''.join(f'<th>K{j+1}<br>|c|={c["size"]}</th>' for j,c in enumerate(g['classes']))+'</tr></thead><tbody>'+''.join(rows)+'</tbody></table></div>'
 htmlAppendix.append('<details><summary>'+str(g['number']).zfill(2)+'　'+hm(g['hm'])+' ↔ '+sf(g['symbol'])+'　· '+g['system']+' · |G|='+str(g['order'])+'</summary><p class="appendix-meta">'+esc(gens)+'</p><p class="appendix-meta">'+esc(classlegend)+'</p>'+table+'<p class="appendix-meta">V = '+esc(decomp(g,'polar'))+'；A = '+esc(decomp(g,'axial'))+'；Sym²V = '+esc(decomp(g,'quadratic'))+'。</p></details>')
(R/'32点群的动态展示.md').write_text(body+'\n'.join(overview)+'\n'.join(appendix))
# Protect TeX before Markdown processing; the result uses native offline MathML.
protected=[]
def save(value):protected.append(value);return f'ZZMATH{len(protected)-1}ZZ'
text=re.sub(r'\$\$(.*?)\$\$',lambda m:save('<div class="math-block" tabindex="0" aria-label="公式，可左右滚动">'+convert(m[1].strip(),display='block')+'</div>'),body,flags=re.S)
text=re.sub(r'\$([^$\n]+)\$',lambda m:save(convert(m[1],display='inline')),text)
prose=str(markdown2.markdown(text,extras=['tables']))
# Native inline MathML must keep its intrinsic layout: no inline-block scroll box.
# Unicode modifier/subscript letters have inconsistent font metrics on macOS.
# Format ordinary text symbols as semantic HTML before restoring protected MathML.
subscript_map=str.maketrans('₀₁₂₃₄₅₆₇₈₉ᵥₕᵢ','0123456789vhi')
def format_text_symbols(text):
 return re.sub(r'(?<![A-Za-z])([CDSTOABE])([₀₁₂₃₄₅₆₇₈₉ᵥₕᵢ]+)([dgu]?)',lambda m:'<span class="group-symbol">'+m[1]+'<sub>'+m[2].translate(subscript_map)+m[3]+'</sub></span>',text)
prose=re.sub(r'(^|>)([^<]*)(?=<|$)',lambda m:m[1]+format_text_symbols(m[2]),prose)
for i,v in enumerate(protected):
 token=f'ZZMATH{i}ZZ'
 if v.startswith('<div'):prose=prose.replace('<p>'+token+'</p>',v)
 prose=prose.replace(token,v)
css=(R/'assets/app.css').read_text();js=(R/'assets/app.js').read_text();data=(R/'assets/groups.js').read_text()
page='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>32点群的动态展示 · 审核稿 · 计算凝聚态物理</title><meta name="description" content="32 个晶体学点群的国际与 Schönflies 符号、三维对称操作、生成元、不可约表示、特征标与凝聚态应用。"><meta name="theme-color" content="#071b49"><style>'''+css+'''</style></head><body><header class="topbar"><a class="brand" href="https://turney0524.github.io/" target="_blank" rel="noopener"><i>ψ</i>计算凝聚态物理</a><div class="top-links"><a href="#notebook">阅读正文</a><a href="#all-tables">32 群速查</a><span class="draft-tag">审核稿 · 尚未发布</span></div></header><main class="wrap"><section class="hero"><p class="kicker">SYMMETRY / REPRESENTATION / CONDENSED MATTER</p><h1>32点群的动态展示</h1><p class="deck">从一次看得见的变换，走到一张读得懂的特征标表。点击群元素，让标记点运动；选择表示，看矩阵、基函数和物理量怎样跟着变。</p><div class="hero-bottom"><nav><a href="#explorer">动手探索 ↓</a><a href="#notebook">按顺序学习 ↓</a><a href="#all-tables">完整符号与特征标 ↓</a></nav><div class="hero-count"><b>32</b>晶体学点群 <b>332</b>群元素 <b>175</b>复不可约表示</div></div></section>
<div class="workspace" id="explorer"><aside class="group-sidebar"><h2>选一个点群</h2><label class="sr-only" for="group-search">搜索点群符号</label><input id="group-search" class="group-search" type="search" placeholder="C3v / 3m / 立方…"><label class="sr-only" for="system-filter">按晶系筛选</label><select id="system-filter" class="system-filter"><option value="">全部七个晶系</option>'''+''.join('<option>'+s+'</option>' for s in ['三斜','单斜','正交','四方','三方','六方','立方'])+'''</select><nav class="group-list" id="group-list" aria-label="32 点群列表"></nav><p class="sidebar-note">统一采用主动变换与右手笛卡尔轴。国际符号给出群类型，屏幕坐标不直接等同于任意 CIF 的分数坐标。</p></aside><div class="explorer"><header class="group-header"><div><h2 id="group-title"></h2><p id="group-description"></p></div><div class="group-badges" id="group-badges"></div></header>
<div class="viewer-grid"><section class="scene-panel"><div class="scene-bar"><strong>参考点集 × 对称操作</strong><div><button id="top-view">俯视 z</button><button id="reset-camera">重置视角</button></div></div><div class="canvas-wrap"><canvas id="scene" class="scene-canvas" role="img" tabindex="0" aria-label="三维点群交互图形"></canvas><div id="operation-warning" class="scene-warning" hidden></div><div class="scene-note">拖动旋转相机 · 滚轮缩放 · P 为被跟踪的点 · 三条短线标记局部朝向</div></div><div class="animation-controls"><div class="control-buttons"><button id="play" class="primary">重放本次</button><button id="reset" class="quiet">恢复初态</button><label class="check-label"><input id="from-initial" type="checkbox">每次从初态</label><label class="check-label"><input id="full-orbit" type="checkbox" checked>完整轨道</label><label class="check-label"><input id="show-reference" type="checkbox" checked>参考轮廓</label></div><div class="scrub-row"><label for="scrub">演示进度</label><input id="scrub" type="range" min="0" max="1" step="0.001" value="1"><output id="scrub-output">100%</output></div></div><div id="pose-result" class="pose-result"></div></section><section class="operation-panel"><div class="panel-title">点击一个操作 <small id="operation-count"></small></div><div class="generator-section"><p>一组生成元 / 可重复点击</p><div class="generator-buttons" id="generator-buttons"></div></div><div class="operations-scroll" id="operations"></div><p class="operation-detail" id="operation-detail" aria-live="polite"></p></section></div>
<div class="info-grid"><section class="info-card"><h3>本次操作 <span id="operation-name"></span></h3><div class="matrix-pair"><span class="matrix-name">M(g) =</span><div id="operation-matrix"></div></div><p class="info-caption" id="operation-meta"></p></section><section class="info-card"><h3>从生成元到整个群</h3><p class="generator-relations" id="generator-relations"></p><p class="info-caption">a、b、c 表示上方选定的生成元。乘积按矩阵次序写，右边先作用。连续操作默认为新操作左乘当前姿态；勾选“每次从初态”可逐项比较。</p><button class="quiet" id="download-group">下载本群全部矩阵与表示 JSON ↓</button></section></div>
<section id="characters"><div class="section-title"><div><h3>特征标表 · 点击行和列</h3><p>选择一行查看不可约矩阵；点击列标题演示该共轭类的代表元。</p></div><button id="download-csv" class="quiet">导出表 CSV ↓</button></div><div class="table-wrap" id="character-table"></div><p class="table-legend">E 为恒等；ω = exp(2πi/3)。列标题以一个代表元命名，前面的数表示类大小，并不是把类内所有轴逐一写出。上标 ¹/² 标记复共轭伙伴，维数看专门一列。长表可横向滚动。</p><p class="application-note" id="group-specific-note"></p><div class="selected-irrep"><h4 id="irrep-title"></h4><p class="irrep-meta" id="irrep-meta"></p><div class="rep-detail-grid"><div id="irrep-matrix"></div><div class="basis-lists" id="basis-lists"></div></div><p class="table-legend">基函数由字符投影生成并重新缩放，仅是一种数值基。重数大于 1 时，所列的是整个等型分量的基，不应当作单个不可约拷贝。Rx、Ry、Rz 表示轴矢量基。</p></div></section>
<section class="physics-panel"><div class="section-title"><div><h3>接回凝聚态物理</h3><p>这些分解描述变换类型，不自动给出某种具体材料的频率或响应强度。</p></div></div><div class="decomposition-grid"><div class="decomposition"><small>极矢量 V · 位置 / 电场 / 电极化</small><strong id="polar-decomp"></strong><p>普通电偶极算符的变换方式。</p></div><div class="decomposition"><small>轴矢量 A · 角动量 / 磁矩</small><strong id="axial-decomp"></strong><p>按 det(M)M 变换，不能与极矢量混用。</p></div><div class="decomposition"><small>Sym²V · 普通对称极化率 / 二次函数</small><strong id="quadratic-decomp"></strong><p>用于轨道基与普通 Raman 对称通道的分析。</p></div></div><div class="response-summary"><div><b id="polar-dim"></b><span>极矢量不变空间维数</span></div><div><b id="rank2-dim"></b><span>静态对称二阶极张量独立参数</span></div><div><b id="piezo-dim"></b><span>普通压电型张量不变量维数</span></div></div><p class="application-note">“允许”表示空间对称性不禁止，不保证实际系数非零，也不等于已经是铁电体。具体红外/Raman 声子还须结合原子位置、3N 位移表示与声学模。涉及 SOC、时间反演或一般 k 点时，应进一步使用双群、磁群或空间群小群。</p></section>
<section class="info-card" style="margin-top:18px"><h3>直积计算器：哪些耦合包含全对称表示？</h3><div class="product-controls"><label>表示 Γ₁<select id="product-a"></select></label><span>⊗</span><label>表示 Γ₂<select id="product-b"></select></label></div><div id="product-result" class="product-result" aria-live="polite"></div></section>
<details class="source-box"><summary>查看这段动画实际使用的变换代码</summary><pre id="source-code"></pre><p>上述函数就是 Canvas 调用的插值实现。生成群、构造不可约表示、取迹与核验的 Python 程序见 <a href="source/build_data.py">build_data.py</a>；完整数据见 <a href="assets/groups.json">groups.json</a>，完整前端实现见 <a href="assets/app.js">app.js</a>。代码与数据均随审核稿保存，未加载外部 CDN。</p></details></div></div>
<section class="prose-shell" id="notebook"><div class="article-intro"><p class="kicker">THE NOTEBOOK / 供审阅的完整正文</p><h2>从“能看见”到“能使用”</h2><p>建议先操作 C₃ᵥ，再按下面的顺序阅读。正文采用普通单值表示；完整 32 群表和生成元另附在文末。</p><a href="32点群的动态展示.md">查看完整 Markdown 稿（含全部特征标表） ↓</a></div><article class="prose">'''+prose+'''</article></section><section class="appendix" id="all-tables"><p class="kicker">REFERENCE / ALL 32 CRYSTAL CLASSES</p><h2>32 点群速查与完整特征标</h2><p>附表采用与交互面板相同的数据。K 列编号按各群自己的共轭类顺序，具体代表元与类大小列于表前。全稿数据的数值校验报告可在 <a href="校验报告.json">这里查看</a>。</p><div class="table-wrap"><table class="all-groups-table"><thead><tr><th>序号</th><th>晶系</th><th>国际符号</th><th>Schönflies</th><th>|G|</th><th>一组生成元</th></tr></thead><tbody>'''+''.join(htmlOverview)+'''</tbody></table></div>'''+''.join(htmlAppendix)+'''</section><footer class="site-footer"><span>审核稿 · 尚未提交到公开网站 · 计算凝聚态物理</span><a href="32点群的动态展示.md">Markdown 正文与全部数据表 ↓</a></footer></main><noscript><p class="application-note">正文和文末全部字符表可直接阅读。三维演示、筛选和直积计算需要启用 JavaScript。</p></noscript><script>'''+data.replace('</','<\\/')+'''</script><script>'''+js.replace('</','<\\/')+'''</script></body></html>'''
(R/'32点群的动态展示_审核版.html').write_text(page)
(R/'index.html').write_text(page)
print('Built offline review page and full Markdown appendix:',len(G),'groups,',sum(len(g['irreps']) for g in G),'irreps.')
