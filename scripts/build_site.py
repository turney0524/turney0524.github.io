'''Build the publication from Markdown; existing quantum course stays at its URLs.'''
from pathlib import Path
import sys,json,re,html,shutil,xml.etree.ElementTree as ET
if Path('/tmp/cmp-site').exists():sys.path.insert(0,'/tmp/cmp-site')
if Path('/tmp/qm-math').exists():sys.path.insert(0,'/tmp/qm-math')
import markdown2
from latex2mathml.converter import convert
R=Path(__file__).resolve().parents[1];BASE='https://turney0524.github.io';DATE='2026-11-08'
CATS={
 'textbooks':('课本蒸馏','TEXTBOOKS','把厚书读薄，把关键推导读厚。沿课本的逻辑逐章学习，让每一步计算都有来处。'),
 'notes':('知识笔记','NOTES & DERIVATIONS','记录日常遇到的物理问题：一个概念、一段推导，或一次把公式真正算明白的过程。'),
 'papers':('科研进展','PAPERS & PERSPECTIVES','从论文的问题、模型和证据出发理解研究。兼收文献报告与经典回读，明确区分发表年份。'),
 'software':('开源软件','OPEN-SOURCE TOOLS','从物理问题走到可运行的计算。记录工具使用、模型实现、结果验证与可复现的细节。'),
 'collections':('合集','READING COLLECTIONS','把散落的内容连成一条学习路径。围绕一个主题，依次读概念、推导、文献与代码。')}
ICONS={
 'textbooks':'<path d="M4 5h7a3 3 0 0 1 3 3v13a4 4 0 0 0-3-2H4zM14 8a3 3 0 0 1 3-3h7v14h-7a4 4 0 0 0-3 2"/>',
 'notes':'<path d="M5 4h13l5 5v15H5zM18 4v6h5M9 14h10M9 18h7"/>',
 'papers':'<path d="M4 6h20v17H4zM8 10h5v5H8zM17 10h3M17 14h3M8 19h12"/>',
 'software':'<path d="m9 7-6 7 6 7m10-14 6 7-6 7M16 4l-4 20"/>',
 'collections':'<path d="M3 7h9l3 3h10v14H3zM7 3h14v7"/>'}
def esc(s):return html.escape(str(s),quote=True)
def icon(k):return f'''<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[k]}</svg>'''
LOGO='<svg viewBox="0 0 42 42" fill="none" aria-hidden="true"><path d="M9 11 31 11 20 31 9 11M9 11v20h22V11M9 31l11-20 11 20" stroke="currentColor" stroke-width="1"/><g fill="currentColor"><circle cx="9" cy="11" r="3"/><circle cx="31" cy="11" r="3"/><circle cx="20" cy="31" r="3"/><circle cx="9" cy="31" r="2"/><circle cx="31" cy="31" r="2"/><circle cx="20" cy="11" r="2"/></g></svg>'
SEARCHSVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.8"/><path d="m16 16 5 5"/></svg>'
GITHUB='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.17c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.23 3.26.94.1-.72.4-1.23.71-1.51-2.5-.29-5.14-1.26-5.14-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3.01 0 0 .95-.31 3.08 1.16a10.7 10.7 0 0 1 5.61 0c2.14-1.47 3.08-1.16 3.08-1.16.61 1.57.23 2.72.12 3.01.72.79 1.15 1.8 1.15 3.04 0 4.35-2.64 5.31-5.16 5.59.41.35.77 1.04.77 2.1v3.16c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8"/></svg>'
posts=[]
for p in sorted((R/'content').rglob('*.md')):
 if p.name.startswith('_'):continue
 text=p.read_text();assert text.startswith('---\n'),p
 meta,body=text[4:].split('\n---\n',1);x=json.loads(meta)
 assert x['category'] in ['notes','papers','software'];assert re.fullmatch('[a-z0-9-]+',x['slug'])
 x.update(body=body,source=p.relative_to(R).as_posix(),href='articles/'+x['slug']+'.html');posts.append(x)
assert len({x['slug'] for x in posts})==len(posts)
# Explicit editorial order; future posts appear first by publication date.
order={'numpy-ssh':0,'bloch':1,'ssh-reading':2,'variational':3,'berry':4}
posts.sort(key=lambda p:(p['date'], -order.get(p['slug'],-1)),reverse=True)
course={'title':'量子力学 · 详细第二版','summary':'依据 Griffiths 第二版逐章整理：12 章、390 步推导说明与 40 种可操作模型。','category':'textbooks','href':'v2-index.html','tags':['量子力学','课本','公式推导'],'label':'详细第二版','date':DATE,'minutes':0}
entries=[course]+posts
COLLECTIONS=json.loads((R/'content/collections.json').read_text())
search=[dict(title=x['title'],summary=x['summary'],href=x['href'],category=CATS[x['category']][0],tags=x['tags']) for x in entries]
# Make all 12 course chapters discoverable from the global search.
manifest=json.loads((R.parent/'authoring/v2_manifest.json').read_text()) if (R.parent/'authoring/v2_manifest.json').exists() else None
if manifest:
 for c in manifest['chapters']:search.append(dict(title=f'''量子力学第{c["n"]}章 · {c["title"]}''',summary=f'''{c["steps"]} 步推导说明；正文、例题与交互演示。''',href=f'''v2-chapter-{c["n"]:02d}.html''',category='课本章节',tags=['量子力学',c['title']]))
else:
 # Stable build data is checked in, so cloud builds do not depend on parent directories.
 search+=json.loads((R/'content/course-chapters.json').read_text())
(R/'content/course-chapters.json').write_text(json.dumps([x for x in search if x['category']=='课本章节'],ensure_ascii=False,indent=2))

search += [dict(title=c['title'],summary=c['summary'],href='collection-'+c['slug']+'.html',category='合集',tags=[c['title']]) for c in COLLECTIONS]

def header(active,prefix):
 nav=''.join('<a href="'+prefix+k+'.html"'+(' class="active" aria-current="page"' if active==k else '')+'>'+v[0]+'</a>' for k,v in CATS.items())
 return f'''<a class="skip-link" href="#main">跳到正文</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="{prefix}index.html">{LOGO}<span><strong>计算凝聚态物理</strong><small>COMPUTATIONAL CONDENSED MATTER</small></span></a><nav class="main-nav" id="main-nav" aria-label="主导航">{nav}</nav><div class="header-tools"><button class="search-button" aria-label="搜索全站">{SEARCHSVG}<span>搜索</span><kbd>⌘ K</kbd></button><a class="github-link" href="https://github.com/turney0524/turney0524.github.io" target="_blank" rel="noopener" aria-label="GitHub 网站仓库">{GITHUB}</a><button class="menu-toggle" aria-label="展开导航" aria-expanded="false" aria-controls="main-nav">☰</button></div></div></header>'''
def footer(prefix):
 return f'''<footer class="site-footer"><div class="wrap"><div class="footer-top"><div><p class="footer-brand">计算凝聚态物理</p><p class="footer-tagline">从物理直觉出发，让推导与计算相互印证。</p></div><nav class="footer-links" aria-label="页脚"><a href="{prefix}about.html">关于本站</a><a href="{prefix}feed.xml">RSS 订阅 ↗</a><a href="https://github.com/turney0524/turney0524.github.io" target="_blank" rel="noopener">GitHub ↗</a></nav></div><div class="footer-bottom"><span>© 2026 计算凝聚态物理 · 公众号同名学习站</span><span>保持好奇，认真推导，动手计算。</span></div></div></footer>'''
def dialogs():
 return '''<dialog id="search-dialog" aria-labelledby="search-title"><div class="dialog-head"><span id="search-title">搜索课本、笔记与文献</span><button class="dialog-close" aria-label="关闭搜索">×</button></div><div class="dialog-body"><label class="sr-only" for="site-search">输入关键词</label><input id="site-search" type="search" placeholder="试试 Bloch、变分法、SSH…" autocomplete="off"><div id="search-results" class="search-results" aria-live="polite"></div></div></dialog><dialog id="wechat-dialog" aria-labelledby="wechat-title"><div class="dialog-head"><span id="wechat-title">在微信里找到我们</span><button class="dialog-close" aria-label="关闭公众号信息">×</button></div><div class="dialog-body"><p class="overline">WECHAT OFFICIAL ACCOUNT</p><p class="wechat-name">计算凝聚态物理</p><p class="wechat-instructions">打开微信 → 搜一搜 → 公众号，搜索 <strong>计算凝聚态物理</strong>。<br>网站方便系统阅读与代码学习，公众号继续分享日常思考。</p><button class="button-primary" id="copy-wechat">复制公众号名称</button></div></dialog>'''
def shell(title,body,active='',prefix='',description='',canonical='index.html',article=False):
 return f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)} · 计算凝聚态物理</title><meta name="description" content="{esc(description or '课本蒸馏、知识笔记、科研进展与开源软件。用公式、代码与交互模型学习凝聚态物理。')}"><meta name="theme-color" content="#193b39"><link rel="canonical" href="{BASE}/{canonical}"><link rel="icon" href="{prefix}assets/site/favicon.svg" type="image/svg+xml"><link rel="alternate" type="application/rss+xml" title="计算凝聚态物理" href="{prefix}feed.xml"><link rel="stylesheet" href="{prefix}site.css"></head><body>{'<div class="article-progress" aria-hidden="true"></div>' if article else ''}{header(active,prefix)}{body}{footer(prefix)}{dialogs()}<script id="search-data" type="application/json">{json.dumps(search,ensure_ascii=False).replace('</','<'+chr(92)+'/')}</script><script src="{prefix}site.js" defer></script></body></html>'''
def row(p,prefix=''):
 return f'''<a class="entry-row" href="{prefix}{p['href']}" data-entry data-category="{p['category']}" data-tags="{esc(json.dumps(p['tags'],ensure_ascii=False))}"><div><div class="entry-kicker"><span>{esc(p['label'])}</span><span>·</span><time datetime="{p['date']}">{p['date'].replace('-','.')}</time></div><h3>{esc(p['title'])}</h3><p>{esc(p['summary'])}</p><div class="entry-tags">{''.join('<span>'+esc(t)+'</span>' for t in p['tags'])}<small>{p['minutes']} 分钟阅读</small></div></div><span class="row-arrow" aria-hidden="true">↗</span></a>'''
def bookfeature():
 return '''<div class="course-feature"><div class="book-art" aria-hidden="true"><div class="book"><div class="book-top">TEXTBOOK DISTILLATION</div><div class="edition">ψ</div><div class="book-title">量子力学<br>详细第二版</div><div class="book-formula">iℏ ∂ₜΨ = HΨ</div><div class="book-bottom">READ / DERIVE / EXPLORE</div></div></div><div class="course-info"><div class="badge-line"><span class="badge">课本蒸馏</span><span class="badge filled">详细第二版</span><span class="badge">可交互 · 可查看源码</span></div><h3>量子力学</h3><p>沿 Griffiths 第二版的章节顺序，逐步展开公式、边界条件与例题。配合可操作模型，把“看懂了”变成“算明白”。</p><div class="course-meta"><span><strong>12</strong>章课本</span><span><strong>390</strong>步推导说明</span><span><strong>40</strong>种交互模型</span></div><div class="course-buttons"><a class="button-primary" href="v2-index.html">进入课本<span>→</span></a><a class="text-link" href="v2-chapter-01.html">从第一章读起 ↗</a></div></div></div>'''
def collections():
 return '<div class="collection-grid">'+''.join(f'''<a class="collection-card" href="collection-{c["slug"]}.html"><span class="collection-num">{i:02d}</span><h3>{c["title"]}</h3><p>{c["summary"]}</p><footer><span>{len(c["items"])} 个学习节点</span><span>沿路线阅读 →</span></footer></a>''' for i,c in enumerate(COLLECTIONS,1))+'</div>'
# Home.
chain='<div class="chain" aria-hidden="true">'+''.join('<b></b>'+('<i class="weak"></i>' if i%2==0 else '<i></i>') for i in range(7))+'<b></b></div>'
model=f'''<div class="model-panel" data-ssh><div class="model-top"><span>A SMALL MODEL, A BIG IDEA</span><span class="model-live">可交互模型</span></div><h2>两种键，一条能带的故事。</h2><p class="model-sub">SSH 交替跃迁链 · E±(k) · t₂ = 1</p><canvas aria-label="SSH 模型的正负两条能带"></canvas>{chain}<div class="model-bottom"><label>拖动胞内跃迁 t₁<output>0.60</output><input type="range" min="0.1" max="1.9" step="0.01" value="0.6" aria-label="胞内跃迁 t1"></label><div class="gap-readout"><span>带隙 ΔE</span><br><strong>0.80</strong></div></div></div>'''
moduleline='<div class="module-strip">'+''.join(f'''<a href="{k}.html">{icon(k)}<span><strong>{v[0]}</strong><small>{["沿课本，系统学","把公式，算明白","带着问题读论文","让模型运行起来","连成一条学习路"][i]}</small></span></a>''' for i,(k,v) in enumerate(CATS.items()))+'</div>'
home=f'''<main id="main" class="wrap"><section class="hero"><div><p class="eyebrow">PHYSICS · NOTES · CODE</p><h1>从一个公式，<br>走进<em>凝聚态物理</em>。</h1><p class="hero-description">这里是「计算凝聚态物理」的开放学习笔记。<br>读课本、拆推导、追文献，也把物理写进代码。<br>让零散的知识，慢慢连成自己的理解。</p><div class="hero-actions"><a href="textbooks.html" class="button-primary">开始系统学习<span>→</span></a><a href="notes.html" class="text-link">翻翻知识笔记 ↗</a></div><p class="hero-foot">公式推导<i></i>交互演示<i></i>可复现代码<i></i>持续整理</p></div>{model}</section>{moduleline}<section class="section-space"><div class="section-heading"><div><p class="overline">FEATURED TEXTBOOK</p><h2>把一本书，读成自己的理解。</h2></div><a class="text-link" href="textbooks.html">全部课本 ↗</a></div>{bookfeature()}</section><div class="home-columns"><section class="recent-section" data-filter-scope><div class="section-heading"><div><p class="overline">FROM THE NOTEBOOK</p><h2>最近整理</h2></div><a class="text-link" href="feed.xml">RSS 订阅 ↗</a></div><div class="filter-tabs" role="group" aria-label="筛选最近内容"><button data-filter="all" aria-pressed="true">全部内容</button><button data-filter="notes" aria-pressed="false">知识笔记</button><button data-filter="papers" aria-pressed="false">文献回读</button><button data-filter="software" aria-pressed="false">开源软件</button></div>{''.join(row(p) for p in posts)}<p class="empty-state" hidden>这个分类暂时没有内容。</p></section><aside><div class="about-card"><div class="about-mark">{LOGO}</div><p class="overline">ABOUT THIS SPACE</p><h3>你好，欢迎一起学物理。</h3><p>这里由公众号「计算凝聚态物理」博主整理，记录学习中的推导、阅读与计算。</p><p>不急着追求所有答案，先把一个问题认真弄明白。</p><div class="about-rule"></div><button class="wechat-button">在微信里找到我们 ↗</button></div><div class="sidebar-links"><p class="overline">从这里开始</p><a href="collection-quantum.html">我想系统学习量子力学<span>→</span></a><a href="collection-bands.html">我想看懂能带与拓扑<span>→</span></a><a href="articles/numpy-ssh.html">我想动手做一个模型<span>→</span></a><a href="about.html">了解这个学习站<span>→</span></a></div></aside></div><section class="collection-section"><div class="section-heading"><div><p class="overline">CONNECTED READING</p><h2>把知识，连成线。</h2></div><a class="text-link" href="collections.html">全部合集 ↗</a></div>{collections()}</section></main>'''
(R/'index.html').write_text(shell('首页',home))
# Category pages.
for k,(name,en,desc) in CATS.items():
 count=1 if k=='textbooks' else len(COLLECTIONS) if k=='collections' else len([p for p in posts if p['category']==k])
 intro=f'''<section class="page-intro"><div class="breadcrumbs"><a href="index.html">首页</a><span>/</span><span>{name}</span></div><p class="overline">{en}</p><h1>{name}</h1><p class="intro-description">{desc}</p><span class="page-count">{count} '''+('部课本' if k=='textbooks' else '个合集' if k=='collections' else '篇内容')+'</span></section>'
 if k=='textbooks':
  content='<section class="section-space">'+bookfeature()+'<div class="category-sibling"><strong>保留每一次认真整理</strong>量子力学默认进入详细第二版。初版课程与互动实验仍可访问：<a href="quantum-v1.html">初版书架</a> · <a href="lab.html">第一章实验室</a>。后续课本将在这里独立归档。</div></section>'
 elif k=='collections':content='<section class="section-space">'+collections()+'</section>'
 else:
  selected=[p for p in posts if p['category']==k];tags=sorted({t for p in selected for t in p['tags']})
  filters='<button data-filter="all" aria-pressed="true">全部主题</button>'+''.join(f'''<button data-filter="{esc(t)}" aria-pressed="false">{esc(t)}</button>''' for t in tags)
  content=f'''<section class="listing-layout" data-filter-scope><aside class="filter-sidebar"><p class="overline">按主题浏览</p><div class="tag-filter" role="group" aria-label="主题筛选">{filters}</div><p class="topic-hint">用标题或关键词查找内容。<br>每篇文章都可独立阅读。</p></aside><div class="listing-entries"><label class="local-search"><span class="sr-only">搜索本栏目</span><input data-local-search type="search" placeholder="搜索本栏目的标题、主题…"></label><p class="list-count">{count} 篇内容</p>{''.join(row(p) for p in selected)}<p class="empty-state" hidden>没有找到匹配内容。试试其他关键词，或切回全部主题。</p>'''+('<div class="category-sibling"><strong>从经典出发，逐步追踪前沿</strong>目前收录一篇标注发表年份的经典回读。后续文献报告继续记录问题、方法、证据与适用范围。</div>' if k=='papers' else '')+'</div></section>'
 (R/f'''{k}.html''').write_text(shell(name,'<main id="main" class="wrap">'+intro+content+'</main>',active=k,description=desc,canonical=f'''{k}.html'''))
# Collection detail pages.
for c in COLLECTIONS:
 steps=''.join(f'''<section class="collection-step"><span>{i:02d}</span><div><p class="step-type">{CATS[cat][0]} · {esc(title)}</p><h2>{esc(name)}</h2><p>{esc(desc)}</p><a href="{href}">开始阅读<span>→</span></a></div></section>''' for i,(cat,title,desc,href,name) in enumerate(c['items'],1))
 body=f'''<main id="main" class="wrap"><section class="page-intro collection-intro"><div><div class="breadcrumbs"><a href="index.html">首页</a><span>/</span><a href="collections.html">合集</a></div><p class="overline">A CONNECTED LEARNING PATH</p><h1>{c["title"]}</h1><p class="intro-description">{c["summary"]}</p><span class="page-count">{len(c["items"])} 个学习节点 · 建议按顺序阅读</span></div><div class="collection-art" aria-hidden="true">{c["symbol"]}</div></section><div class="collection-steps">{steps}</div></main>'''
 (R/f'''collection-{c["slug"]}.html''').write_text(shell(c['title'],body,active='collections',canonical=f'''collection-{c["slug"]}.html'''))
# Article renderer: protect code and math before Markdown processing.
def render_md(text):
 protected=[]
 def store(value):protected.append(value);return f'''ZZPROTECTED{len(protected)-1}ZZ'''
 text=re.sub(r'```([^\n]*)\n(.*?)```',lambda m:store('<pre><code class="language-'+esc(m[1].strip())+'">'+html.escape(m[2])+'</code></pre>'),text,flags=re.S)
 text=re.sub(r'\$\$(.*?)\$\$',lambda m:store('<div class="math-block" tabindex="0" aria-label="公式，可横向滚动">'+convert(m[1].strip(),display='block')+'</div>'),text,flags=re.S)
 text=re.sub(r'\$([^$\n]+)\$',lambda m:store(convert(m[1],display='inline')),text)
 result=str(markdown2.markdown(text,extras=['tables','strike']))
 for i,value in enumerate(protected):
  key=f'''ZZPROTECTED{i}ZZ'''
  if value.startswith(('<pre','<div')):result=result.replace('<p>'+key+'</p>',value)
  result=result.replace(key,value)
 toc=[]
 def h(m):
  id=f'''s{len(toc)+1}''';label=re.sub('<[^>]+>','',m[1]);toc.append((id,label));return f'''<h2 id="{id}">{m[1]}</h2>'''
 result=re.sub(r'<h2>(.*?)</h2>',h,result,flags=re.S)
 return result,toc
for p in posts:
 rendered,toc=render_md(p['body']);name=CATS[p['category']][0]
 aside=''.join(f'''<a href="#{id}">{label}</a>''' for id,label in toc)
 body=f'''<main id="main" class="wrap"><header class="article-head"><div class="breadcrumbs"><a href="../index.html">首页</a><span>/</span><a href="../{p['category']}.html">{name}</a></div><div class="badge-line"><span class="badge">{p['label']}</span>{''.join('<span class="badge filled">'+esc(t)+'</span>' for t in p['tags'])}</div><h1>{esc(p['title'])}</h1><p class="article-deck">{esc(p['summary'])}</p><div class="article-meta"><span>计算凝聚态物理</span><time datetime="{p['date']}">{p['date'].replace('-','.')}</time><span>约 {p['minutes']} 分钟阅读</span><a href="../{p['source']}">Markdown 原文 ↗</a></div></header><div class="article-layout"><article class="prose">{rendered}<div class="article-end"><strong>把这一步，接回更大的图景。</strong><p>继续读相关内容，或在纸上重做一遍推导，再用代码检查结果。</p><a href="../collections.html">浏览学习合集 →</a></div></article><aside class="article-aside"><p class="overline">这一篇的路线</p><nav aria-label="文章目录">{aside}</nav><a class="download-md" href="../{p['source']}">查看 Markdown 源文件 ↗</a></aside></div></main>'''
 out=R/p['href'];out.parent.mkdir(exist_ok=True);out.write_text(shell(p['title'],body,active=p['category'],prefix='../',description=p['summary'],canonical=p['href'],article=True))
about='''<main id="main" class="wrap"><section class="page-intro"><div class="breadcrumbs"><a href="index.html">首页</a><span>/</span><span>关于本站</span></div><p class="overline">ABOUT THIS SPACE</p><h1>把学习，留下一点痕迹。</h1><p class="intro-description">公众号「计算凝聚态物理」的开放学习站。用文字、公式与代码，整理可以反复回看的知识。</p></section><article class="about-page"><h2>这里记录什么</h2><p>这里由公众号「计算凝聚态物理」博主整理。网站承载适合长时间阅读的课本、公式推导、文献报告和计算实例；公众号承载日常的知识分享。两种形式一起，积累一份可以查阅、重算和继续扩展的学习档案。</p><div class="about-modules">'''+''.join(f'''<a href="{k}.html"><strong>{v[0]} →</strong><span>{v[2]}</span></a>''' for k,v in CATS.items())+'''</div><h2>怎样阅读更有效</h2><p>先分清模型的假设，再追踪公式中每一步变换。遇到演示先预测趋势；遇到代码先检查基底、单位与边界。把“能看到结果”推进到“知道结果为何如此”。</p><h2>内容与来源</h2><p>课本内容采用独立教学表述，保留章节与原书对应关系；文献文章列出原文链接并区分经典回读与近期工作；软件示例注明适用模型并提供运行代码。当前站内内容为网站整理稿，未自动导入既有公众号文章。发现问题，欢迎通过网站仓库反馈。</p><p><a class="button-primary" href="https://github.com/turney0524/turney0524.github.io/issues" target="_blank" rel="noopener">反馈问题 ↗</a> <button class="wechat-button" style="width:auto;padding:11px 20px;margin-left:12px">公众号信息 ↗</button></p></article></main>'''
(R/'about.html').write_text(shell('关于本站',about,canonical='about.html'))
# Integrate the retained course with the publication navigation, idempotently.
for n in range(1,13):
 p=R/f'''v2-chapter-{n:02d}.html''';t=p.read_text()
 if 'class="site-back"' not in t:
  t=t.replace('<button class="quiet" id="print">','<a class="site-back" href="textbooks.html">← 计算凝聚态物理</a><button class="quiet" id="print">',1)
 p.write_text(t)
p=R/'v2-v2.css';t=p.read_text()
if '.site-back{' not in t:t+='\n.site-back{font:11px/1.5 system-ui,sans-serif;color:#267367;text-decoration:none;margin-right:12px}@media(max-width:650px){.site-back{font-size:9px;margin-right:5px}}\n'
p.write_text(t)
p=R/'v2-index.html';t=p.read_text()
if 'class="site-back"' not in t:t=t.replace('</header>','<a class="site-back" href="textbooks.html">← 返回课本蒸馏</a></header>',1)
p.write_text(t)
# Feeds and crawler metadata.
rss=ET.Element('rss',version='2.0');ch=ET.SubElement(rss,'channel')
for k,v in [('title','计算凝聚态物理'),('link',BASE),('description','课本蒸馏、知识笔记、科研进展与开源软件'),('language','zh-cn')]:ET.SubElement(ch,k).text=v
for p in entries:
 item=ET.SubElement(ch,'item')
 for k,v in [('title',p['title']),('link',BASE+'/'+p['href']),('guid',BASE+'/'+p['href']),('description',p['summary'])]:ET.SubElement(item,k).text=v
(R/'feed.xml').write_bytes(ET.tostring(rss,encoding='utf-8',xml_declaration=True))
urls=ET.Element('urlset',xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
for p in sorted(R.glob('*.html'))+sorted((R/'articles').glob('*.html')):
 u=ET.SubElement(urls,'url');ET.SubElement(u,'loc').text=BASE+'/'+p.relative_to(R).as_posix()
(R/'sitemap.xml').write_bytes(ET.tostring(urls,encoding='utf-8',xml_declaration=True));(R/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+BASE+'/sitemap.xml\n')
(R/'assets/site/favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><rect width="42" height="42" rx="8" fill="#193b39"/><g transform="translate(5 5) scale(.76)" color="#e2e9ba">'+LOGO[LOGO.index('><path')+1:LOGO.rindex('</svg>')]+'</g></svg>')
print(f'''Built homepage, 5 categories, 3 collections, {len(posts)} articles, RSS and sitemap.''')
