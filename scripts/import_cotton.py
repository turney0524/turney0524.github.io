"""Sync the reviewed Cotton companion into the public course directory."""
from pathlib import Path
import sys,shutil,json
R=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]).resolve();dest=R/'courses/chemical-applications-group-theory'
assert (source/'第十一章/index.html').exists(),'Expected reviewed eleven-chapter course'
excluded={'全书核对','核对资料','页面预览','__pycache__','.git','原书页','原文对照'}
allowed={'.html','.css','.js','.svg','.md','.py','.cjs','.json','.jpg','.png'}
for f in source.rglob('*'):
 if not f.is_file() or f.suffix not in allowed or any(x in excluded for x in f.relative_to(source).parts):continue
 p=dest/f.relative_to(source);p.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(f,p)
for p in list(dest.rglob('*.html'))+list(dest.rglob('*.md'))+list(dest.rglob('*.py')):
 s=p.read_text();s=s.replace('本地课本蒸馏','课本蒸馏').replace('这是本地完整课程目录，未推送网站。','这是《群论在化学中的应用》的完整课程目录。').replace('本地学习稿','在线学习版').replace('本地完整课程目录','完整课程目录').replace('当前版本保存在本地，未推送GitHub或更改线上网站。','本课程发布于计算凝聚态物理网站的课本蒸馏栏目。').replace('此版本未推送网站。','此版本已接入网站课本蒸馏栏目。').replace('也未发布到网站。','已接入网站课本蒸馏栏目。').replace('本章为本地稿，未推送公开网站。','本章已接入网站课本蒸馏栏目。').replace('本次只制作第一章，尚未推送网站。后续可作为“课本蒸馏”系列入口并加入“群论”合集；不需要公开教材 PDF 或核对扫描图。','本章已作为全书课程的一部分发布在课本蒸馏栏目，并加入群论合集。')
 p.write_text(s)
# Public stable metadata; used by the site search build on GitHub Actions.
info=[{'n':1,'folder':'第一章','title':'绪论'},{'n':2,'folder':'第二章','title':'群论的定义和定理'},{'n':3,'folder':'第三章','title':'分子对称性和对称群'}]+json.loads((dest/'课程源码/chapters.json').read_text())
(dest/'course-info.json').write_text(json.dumps([{'n':x['n'],'folder':x['folder'],'title':x['title']} for x in info],ensure_ascii=False,indent=2))
print('Imported',len(list(dest.rglob('*'))),'files/directories to',dest.relative_to(R))

import subprocess
subprocess.run([sys.executable,str(R/"scripts/sanitize_cotton_public.py")],check=True)
