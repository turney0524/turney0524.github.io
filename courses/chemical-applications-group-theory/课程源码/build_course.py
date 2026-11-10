"""Build eight complete chapter companions and a local original-page/appendix library."""
from pathlib import Path
import json,re,sys,html,hashlib
for p in ['/tmp/cmp-site','/tmp/qm-math']:
 if Path(p).exists():sys.path.insert(0,p)
import markdown2
from latex2mathml.converter import convert
from labs import LABS
R=Path(__file__).resolve().parents[1]
CH=json.loads((R/'课程源码/chapters.json').read_text())
css=(R/'共享资源/course.css').read_text()
versions={f:hashlib.sha256((R/'共享资源'/f).read_bytes()).hexdigest()[:12] for f in ['numerics.js','course.js']}
def reader(en,zh,title='本节全部原文与原图',enoffset=9):
 def view(lang,span,offset):
  a,b=span
  return f'''<section class="page-edition" data-lang="{lang}" data-min="{a}" data-max="{b}" data-offset="{offset}"><b>{lang}版 · 书页{a}–{b}</b><div class="page-tools"><button data-prev>← 上页</button><label>书页 <input type="number" min="{a}" max="{b}" value="{a}" aria-label="{lang}原书页码"></label><button data-next>下页 →</button><a class="page-full" target="_blank">原尺寸 ↗</a><input type="range" min="{a}" max="{b}" value="{a}" aria-label="{lang}原书翻页"></div><div class="page-caption">展开后载入原页，扫描文字未经改写。</div><img loading="lazy" alt="{lang}原书页面"></section>'''
 return '<details class="original-reader"><summary>'+title+' · 点击展开双语翻页对读</summary><p class="source-notice">完整保留用户提供扫描本的原话、公式、插图、表格和页内习题。下方页码是印刷书页；两版排版、部分习题与附录有所不同。图片仅在展开后载入。</p><label class="reader-mode">阅读布局 <select data-reader-mode><option value="both">中英对照</option><option value="中文">中文单栏放大</option><option value="英文">英文单栏放大</option></select></label><div class="page-reader paired-pages">'+view('中文',zh,15)+view('英文',en,enoffset)+'</div></details>'
def controls(spec):
 out=''
 for j,c in enumerate(spec['controls']):
  id=spec['key']+'-'+c['key'];k=c['key'];label=c['label']
  if c['type']=='select':field='<select id="'+id+'" data-field="'+k+'">'+''.join('<option value="'+v+'">'+t+'</option>' for v,t in c['options'])+'</select>'
  else:
   field=f'<input id="{id}" data-field="{k}" type="{c["type"]}" min="{c["min"]}" max="{c["max"]}" step="{c["step"]}" value="{c["value"]}">'
   if c['type']=='range':label+=f' <output for="{id}">{c["value"]}</output>'
  out+='<label for="'+id+'">'+label+field+'</label>'
 return out

def lab(k,num):
 s=LABS[k];data=json.dumps({x:s[x] for x in ['key','engine','source']},ensure_ascii=False).replace('</','<\\/')
 return f'''<section class="demo experiment" data-key="{k}" data-engine="{s['engine']}" id="lab-{k}" aria-labelledby="title-{k}"><header class="demo-head"><div><div class="demo-no">INTERACTIVE {num:02d} / 预测 · 操作 · 验证</div><h4 id="title-{k}">{s['title']}</h4></div><button data-toggle aria-pressed="true">暂停动画</button></header><div class="prompt">{s['prompt']}</div><div class="demo-body"><canvas role="img" aria-label="{s['title']}动态模型"></canvas><div class="controls">{controls(s)}</div><div class="result" role="status" aria-live="off">载入本地计算…</div><div class="data-view"></div><p class="note">{s['note']}</p><details class="source-box"><summary>查看这个模型的实际计算源码</summary><pre><code data-source></code></pre><div class="source-links"><a href="../共享资源/numerics.js" download>数值核心JS ↓</a><a href="../共享资源/course.js" download>动画与界面JS ↓</a><a href="../课程源码/examples.py" download>独立NumPy算例 ↓</a></div></details></div><script type="application/json">{data}</script></section>'''

def render_md(s):
 protected=[]
 def keep(s):protected.append(s);return f'ZZFORM{len(protected)-1}ZZ'
 s=re.sub(r'\$\$(.*?)\$\$',lambda m:keep('<div class="math-block" tabindex="0" aria-label="公式，可横向滚动">'+convert(m[1].strip(),display='block')+'</div>'),s,flags=re.S)
 s=re.sub(r'\$([^$\n]+)\$',lambda m:keep(convert(m[1],display='inline')),s)
 out=str(markdown2.markdown(s,extras=['tables','fenced-code-blocks']))
 for i,x in enumerate(protected):out=out.replace('<p>ZZFORM'+str(i)+'ZZ</p>',x).replace('ZZFORM'+str(i)+'ZZ',x)
 out=re.sub(r'<table>(.*?)</table>',r'<div class="table-scroll"><table>\1</table></div>',out,flags=re.S)
 return out

def hero(n):return f'''<svg class="orbital-hero" viewBox="0 0 360 260" aria-label="对称性、基函数与能级的联系" role="img"><g fill="none" stroke="#d8ceb5"><circle cx="180" cy="130" r="94"/><path d="M45 130H315M180 20V240"/></g><g fill="none" stroke="#071b49" stroke-width="2"><path d="M90 160L180 60L270 160L180 210Z"/><path d="M90 160L270 160M180 60V210"/></g><g fill="#43789a"><circle cx="90" cy="160" r="20"/><circle cx="180" cy="60" r="24"/></g><g fill="#a46061"><circle cx="270" cy="160" r="20"/><circle cx="180" cy="210" r="16"/></g><circle cx="180" cy="135" r="25" fill="#071b49"/><text x="180" y="143" fill="#fffcf1" font-family="Georgia" font-size="22" text-anchor="middle">{n:02d}</text><path d="M280 65h35M280 80h35M280 200h35" stroke="#b28b43" stroke-width="3"/><text x="180" y="253" text-anchor="middle" fill="#8b6a31" font-family="Georgia" font-size="14">READ · PREDICT · COMPUTE</text></svg>'''

def shell(title,n,herohtml,content,toc,scope,links):
 return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#071b49"><meta name="description" content="Cotton群论第三版逐节动态伴读、双语原文对照、推导与交互代码"><title>'+title+'｜计算凝聚态物理</title><style>'+css+'</style></head><body data-chapter="'+str(n)+'"><header class="topbar"><a class="brand" href="../index.html"><i>ψ</i>计算凝聚态物理</a><nav>'+links+'<span class="status">详细原文伴读 / CHAPTER '+str(n)+'</span></nav><div id="reading-progress"></div></header><main class="wrap">'+herohtml+'<div class="scope">'+scope+'</div><div class="layout"><aside class="toc"><p class="toc-label">READ / PREDICT / VERIFY</p>'+toc+'<hr><p id="read-count" class="read-counter"></p><button id="pause-all">暂停全部动画</button><p><a href="../附录/index.html">原书附录与习题解答 ↗</a></p><p><a href="../校验报告_后续八章.json">数值校验记录 ↗</a></p></aside><article class="prose">'+content+'</article></div><footer class="end">计算凝聚态物理 · Cotton中英文第三版动态伴读 · 在线学习版</footer></main><script src="../共享资源/numerics.js?v='+versions['numerics.js']+'"></script><script src="../共享资源/course.js?v='+versions['course.js']+'"></script></body></html>'

for c in CH:
 folder=R/c['folder'];md=next(p for p in folder.glob('*.md') if p.name!='README.md');s=md.read_text();chunks=re.split(r'^## ',s,flags=re.M);intro=render_md(chunks[0]);intro=re.sub(r'<h1>.*?</h1>','',intro,flags=re.S);content=intro;toc=[]
 for i,part in enumerate(chunks[1:],1):
  heading,_,body=part.partition('\n');id='section-'+str(i);toc.append((id,heading));content+=f'<h2 id="{id}">{html.escape(heading)}</h2>'+render_md(body)
  for num,(k,section) in enumerate(c['labs'],1):
   if section==i:content+=lab(k,num)
  if i<=len(c['sections']):
   _,en,zh=c['sections'][i-1];enend=c['sections'][i][1] if i<len(c['sections']) else c['exercise'][0];zhend=c['sections'][i][2] if i<len(c['sections']) else c['exercise'][1]
   content+=reader([en,max(en,enend)],[zh,max(zh,zhend)])+f'<label class="read-mark"><input type="checkbox" data-read="{id}">我已读完本节，能解释主要公式并核对一个例子</label>'
  else:content+=reader([c['exercise'][0],c['en'][1]],[c['exercise'][1],c['zh'][1]],'本章全部原题、图示与题目条件')
 content+='<h2 id="whole-original">全章原文连续阅读</h2><p>此入口覆盖本章首尾全部页面，避免按小节翻阅时漏掉跨页公式、脚注或图表。印刷空白页与部分衔接页也保留。</p>'+reader(c['en'],c['zh'],'本章中英文完整原文')
 content+='<div class="quiz-card"><b>建议学习循环</b><p>先读原书与伴读，暂停动画作预测，再操作验证；将一条公式改写成自己的解释，最后核对原书习题解答。阅读勾选仅保存在本机浏览器。</p></div>'
 n=c['n'];prev='第三章' if n==4 else CH[n-5]['folder'];nxt=CH[n-3]['folder'] if n<11 else '附录'
 links=f'<a href="../{prev}/index.html">上一章</a><a href="../index.html">全书目录</a><a href="../{nxt}/index.html">下一章</a>'
 content+=f'<div class="endnav"><a href="../{prev}/index.html">← 上一章</a><a href="{md.name}">Markdown全文 ↓</a><a href="../{nxt}/index.html">下一章 →</a></div>'
 h=f'<section class="hero"><div><p class="eyebrow">COTTON / GROUP THEORY / CHAPTER {n:02d}</p><h1>{c["folder"]}<br><em>{c["title"]}</em></h1><p class="deck">沿课本逐节走完概念与推导，<br>把公式变成可以预测和验证的实验。</p><div class="actions"><a class="primary" href="#section-1">按原书顺序阅读 ↓</a><a href="#lab-{c["labs"][0][0]}">进入互动实验 ↗</a><a href="{md.name}">Markdown全文 ↗</a></div></div><div class="hero-art">{hero(n)}<p class="caption">原文对照 · 公式推导 · 可运行代码</p></div></section><div class="meta-strip"><span><b>{len(c["sections"])}节</b> 原书章节顺序</span><span><b>{len(c["labs"])}组</b> 交互实验</span><span><b>中英文</b> 全章原页</span><span><b>习题与附录</b> 可查原文</span></div>'
 scope='教材原文完整保留在逐节和全章翻页器中；正文为独立编写的教学伴读，按原节次展开主要概念、公式与实例，并非逐句誊录。动态模型注明近似范围，原书表格、复杂图式和完整习题可直接展开核对。无需浏览器插件，所有资源保存在本地。'
 out=shell(c['folder']+' · '+c['title'],n,h,content,''.join(f'<a data-section href="#{id}">{html.escape(t)}</a>' for id,t in toc)+'<a href="#whole-original">全章原文连续阅读</a>',scope,links)
 (folder/'index.html').write_text(out);(folder/(c['folder']+'_动态课本.html')).write_text(out)
 (folder/'README.md').write_text(f'# {c["folder"]} {c["title"]}\n\n打开index.html阅读。包含{len(c["sections"])}节教学伴读、{len(c["labs"])}组交互、两版完整本章原页与习题。保留整个教材蒸馏目录，以便共享脚本、原页和附录的相对路径正常工作。数值模型的范围与局限在各实验下说明。\n\n修改本章Markdown后，在课程源码目录运行build_course.py。依赖markdown2、latex2mathml；动态课本运行时不依赖Python或网络。\n')
 print(c['folder'],len(s),'chars',len(c['labs']),'labs',len(c['sections']),'sections')
# Complete original appendices, including the Chinese edition's supplied solutions.
APP=[('矩阵代数',[417,425],[307,313]),('化学上重要点群的特征标表',[426,436],[314,324]),('Oh相关表与共振积分β',[437,440],[325,327]),('f轨道形状',[441,442],[328,329]),('双值群与g矩阵元',[443,446],[330,333]),('32晶体学点群的极射赤面投影',[447,449],[334,335]),('230空间群',[450,451],[336,337]),('参考文献',[452,456],[338,341]),('中译本习题解答与英文索引',[457,461],[342,380]),('中译本人名对照与索引、英文随书特征标表册',[462,472],[381,387])]
folder=R/'附录';folder.mkdir(exist_ok=True);content='<p>本页完整保留教材附录与中译本习题解答。中英文版本附录编排并非完全一一对应：最后一项英文为索引，中译本含额外的习题解答；原书页面本身是依据。</p>';toc=[]
for i,(name,en,zh) in enumerate(APP,1):
 id='appendix-'+str(i);toc.append((id,name));content+=f'<h2 id="{id}">{name}</h2>'+reader(en,zh,'展开附录原文')
content+='<p>英文本最后11张为随书夹带的特征标表册：下方462–472是为连续翻阅定义的资料序号，原册实际印刷页为1–11，PDF页为471–481。其他范围采用原书印刷页码。</p><h2 id="source-index">全部原页索引</h2><p>用于检查页面连续性。中文版PDF61–402、英文版PDF77–481均完整保留，包含章节衔接页及后附内容。</p><details><summary>展开中文全部342张原页链接</summary>'+''.join(f'<a href="../原书页/中文/pdf-{p:03d}.jpg" target="_blank">书页{p-15}</a>　' for p in range(61,403))+'</details><details><summary>展开英文全部405张原页链接</summary>'+''.join(f'<a href="../原书页/英文/pdf-{p:03d}.jpg" target="_blank">书页{p-9}</a>　' for p in range(77,482))+'</details>'
h='<section class="hero"><div><p class="eyebrow">REFERENCE / TABLES / EXERCISE SOLUTIONS</p><h1>附录与原书解答<br><em>把查表和核对留在手边</em></h1><p>特征标、相关表、空间群与原题解答，完整扫描原页本地查阅。</p></div><div class="hero-art">'+hero(12)+'</div></section>'
(folder/'index.html').write_text(shell('附录与原书解答','附录',h,content,''.join(f'<a data-section href="#{id}">{t}</a>' for id,t in toc),'用户提供的两版教材附录对照；保留扫描原样，未把OCR识别结果当作校订原文。','<a href="../第十一章/index.html">第十一章</a><a href="../index.html">全书目录</a>'))
# Landing page retains existing first three chapters and opens every later chapter.
cards=[]
for n,title,folder,labs in [(1,'绪论','第一章',8),(2,'群论的定义和定理','第二章',12),(3,'分子对称性和对称群','第三章',16)]+[(c['n'],c['title'],c['folder'],len(c['labs'])) for c in CH]:
 cards.append(f'<a class="chapter-card" href="{folder}/index.html"><span class="eyebrow">CHAPTER {n:02d}</span><h3>{title} →</h3><p>{labs}组交互 · 公式讲解 · 实例与代码</p></a>')
home='<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>群论在化学中的应用 · 全书动态伴读</title><style>'+css+'</style></head><body><header class="topbar"><a class="brand" href="https://turney0524.github.io/"><i>ψ</i>计算凝聚态物理</a><nav><a href="附录/index.html">附录与原书解答</a></nav></header><main class="wrap" style="max-width:1120px"><section class="hero"><div><p class="eyebrow">F. ALBERT COTTON / THIRD EDITION / DYNAMIC COMPANION</p><h1>群论在化学中的应用<br><em>从对称图像<br>到可计算的方法</em></h1><p>十一章连续课程。沿原书节次阅读，让抽象符号落到波函数、光谱、化学键和晶体上。</p><div class="actions"><a class="primary" href="第一章/index.html">从第一章开始 →</a><a href="第四章/index.html">接着读第四章 ↗</a></div></div><div class="hero-art">'+hero(11)+'</div></section><div class="meta-strip"><span><b>11章</b> 教学伴读</span><span><b>84组</b> 交互实验</span><span><b>双语原页</b> 后续八章完整对照</span><span><b>原书附录</b> 特征标表与习题解答</span></div><div class="scope">这是《群论在化学中的应用》的完整课程目录。第四至十一章的教学伴读之外，另外保留中英文整章原页，原文、插图、表格、复杂推导和全部原题都可翻阅；教学模型注明近似，不替代原书全部算例的逐题详解。</div><div class="course-route"><span>1–3：概念与几何</span><span>4–6：表示、选择定则与SALC</span><span>7–10：轨道、晶场与振动</span><span>11：晶体与空间群</span></div><div class="chapter-grid">'+''.join(cards)+'<a class="chapter-card" href="附录/index.html"><span class="eyebrow">REFERENCE LIBRARY</span><h3>附录、原书解答与索引 →</h3><p>双语原页 · 中译本习题解答 · 原页连续性索引</p></a></div><p><a href="README.md">使用说明</a> · <a href="校验报告_后续八章.json">数值与页面校验记录</a></p><footer class="end">计算凝聚态物理 · 课本蒸馏 · 原书内容用于用户提供教材的对读</footer></main></body></html>'
(R/'index.html').write_text(home)
# Third-to-fourth navigation, without changing existing chapter calculations.
p=R/'第三章/source/build.py';src=p.read_text();old='<a href="../index.html">全书目录</a><span';new='<a href="../index.html">全书目录</a><a href="../第四章/index.html">下一章</a><span'
if old in src:p.write_text(src.replace(old,new))
for p in (R/'第三章').glob('*.html'):
 s=p.read_text()
 if old in s:p.write_text(s.replace(old,new))
