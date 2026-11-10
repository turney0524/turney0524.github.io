# -*- coding: utf-8 -*-
"""Public edition: retain independent lessons/code, never ship full-book scans."""
from pathlib import Path
import re,shutil
R=Path(__file__).resolve().parents[1];C=R/'courses/chemical-applications-group-theory'
BLOCKED={'原书页','原文对照','核对资料','全书核对'}
replacements={
 '完整原文、公式、图表和习题':'概念、公式推导、独立示例和练习指导',
 '原话、原图对照':'公式与示例解读','详细原文伴读':'交互学习伴读',
 '详细原文':'学习伴读','原书附录与习题解答':'参考资料与学习导航',
 '原书附录':'参考资料','附录与原书解答':'参考资料与学习导航',
 '两版完整原题原图':'学习方法与参考资料','全章原文连续阅读':'本章学习资料',
 '原文对照 · 公式推导 · 可运行代码':'独立讲解 · 公式推导 · 可运行代码',
 '原页对照 定义 / 原图 / 全部习题':'方法与代码 定义 / 推导 / 学习练习',
 '双语原页':'逐节讲解','双语原文对照':'公式推导与独立讲解','两版完整本章原页与习题':'公式讲解与学习练习',
 '原页、':'讲解、','原页对照':'逐节讲解','双语原文':'独立讲解',
 '原书表述与白话讲解并行。':'沿原书主题独立讲解。',
 '逐节原文对照、公式讲解与可查看源码。':'逐节公式讲解、独立实例与可查看源码。',
 '原文、推导、实例与交互代码。':'概念、推导、实例与交互代码。',
}
for p in C.rglob('*'):
 if p.is_dir() and p.name in BLOCKED:shutil.rmtree(p)
for p in C.rglob('*.html'):
 s=p.read_text()
 protected=[]
 def keep(m):
  protected.append(m[0]);return f'ZZSCRIPTKEEP{len(protected)-1}ZZ'
 s=re.sub(r'<(script|style)\b[^>]*>.*?</\1>',keep,s,flags=re.S|re.I)
 s=re.sub(r'<details\b[^>]*class="[^"]*(?:original-reader|original-pages)[^"]*"[^>]*>.*?</details>','',s,flags=re.S)
 s=re.sub(r'<h2 id="whole-original">.*?(?=<div class="quiz-card">)','',s,flags=re.S)
 s=re.sub(r'<a\b[^>]*href="#[^"]*(?:whole-original|original-exercises)[^"]*"[^>]*>.*?</a>','',s,flags=re.S)
 s=re.sub(r'<a\b[^>]*href="[^"]*(?:原书页|原文对照)[^"]*"[^>]*>.*?</a>','',s,flags=re.S)
 # These scope paragraphs described full-scan distribution, not tutorial content.
 s=re.sub(r'<div class="scope">.*?</div>','<div class="scope">依照Cotton第三版的主题组织，提供独立编写的讲解、公式推导、示例与交互代码。公开版不提供教材整页扫描或整册习题解答；核对课本请使用合法获得的教材。</div>',s,flags=re.S)
 s=re.sub(r'<p[^>]*>[^<]*(?:完整教材原文|全部原页索引|所有原页|扫描本|原页保留|原文完整保留)[^<]*</p>','',s)
 for a,b in replacements.items():s=s.replace(a,b)
 s=s.replace('每节可展开对应原页逐字逐图核查。','').replace('完整中译章页与英文本扩展习题均保存在本地对照目录。','')
 s=s.replace('每节可展开对应原页逐字逐图核查','').replace('原书定义与规则使用引文标记。','短引文保留书名与页码。')
 s=re.sub(r'<span><b>中英文</b> 全章原页</span>','<span><b>逐节</b> 主题讲解</span>',s)
 s=s.replace('<span><b>原页对照</b> 定义 / 原图 / 全部习题</span>','<span><b>源码</b> 模型 / 示例 / 校验</span>')
 s=re.sub(r'(^|>)([^<]*)(?=<|$)',lambda m:m[1]+''.join(sentence for sentence in re.findall(r'[^。]*。|[^。]+$',m[2]) if not any(word in sentence for word in ['原页','原题','原书解答','中译本解答'])),s)
 s=s.replace('后续八章完整对照','概念、方法与示例').replace('特征标表与习题解答','方法、代码与引用').replace('中译本习题解答 · 原页连续性索引','方法与学习路线')
 for i,chunk in enumerate(protected):s=s.replace(f'ZZSCRIPTKEEP{i}ZZ',chunk)
 p.write_text(s)
# Replace the scan-only appendix with a useful independent reference hub.
appendix='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>参考资料与学习导航 · 群论在化学中的应用</title><link rel="stylesheet" href="../共享资源/course.css"></head><body><header class="topbar"><a class="brand" href="../index.html">ψ 群论在化学中的应用</a><nav><a href="../../../textbooks.html">课本蒸馏</a><a href="../index.html">课程目录</a></nav></header><main class="wrap" style="max-width:920px;padding-bottom:60px"><section class="hero"><div><p class="eyebrow">REFERENCE / METHODS / CODE</p><h1>参考资料<br><em>与学习导航</em></h1><p>本站提供独立编写的学习讲解、示例与代码。原书请通过出版社、图书馆或授权渠道获取。</p></div></section><h2>主要参考教材</h2><p>F. Albert Cotton, <i>Chemical Applications of Group Theory</i>, third edition, Wiley；以及其第三版中文译本《群论在化学中的应用》。文中的短引文注明相应版本与页码。</p><h2>查方法</h2><ul><li><a href="../第四章/index.html">表示、特征标正交与约化公式</a></li><li><a href="../第五章/index.html">直积与选择定则</a></li><li><a href="../第六章/index.html">投影算符、SALC与正交化</a></li><li><a href="../第九章/index.html">晶场、多重态与双群</a></li><li><a href="../第十章/index.html">振动计数与F/G方法</a></li><li><a href="../第十一章/index.html">晶格、螺旋与消光</a></li></ul><h2>自己复现</h2><p><a href="../课程源码/examples.py" download>下载NumPy算例</a> · <a href="../共享资源/numerics.js" download>数值核心</a> · <a href="../校验报告_后续八章.json">校验记录</a></p></main></body></html>'''
(C/'附录/index.html').write_text(appendix)
for p in C.rglob('*.md'):
 s=p.read_text()
 s=re.sub(r'^.*(?:全部原页|原页目录|原书页目录|扫描页|扫描本|双语原页|全部本章原页|中英文原页|英文末尾PDF|完整原文).*\n','',s,flags=re.M)
 for a,b in replacements.items():s=s.replace(a,b)
 p.write_text(s)
# Public numerical audit does not need a private-book asset inventory.
for name in ['页面与原文完整性报告.json']:
 p=C/name
 if p.exists():p.unlink()
(C/'README.md').write_text('''# 群论在化学中的应用：公开学习版\n\n共十一章，保留独立讲解、公式推导、实例与交互代码。公开版本不包含整页教材扫描、整册原书习题解答或原始PDF。短引文按版本及页码标注。\n\n数值核心与NumPy算例可供独立复现。教学动画的近似范围见各模型说明。\n''')
print('Prepared scan-free public course.')
