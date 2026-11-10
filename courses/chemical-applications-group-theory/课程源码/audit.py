"""Static and source-page completeness audit. No browser automation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1];chapters=json.loads((R/'课程源码/chapters.json').read_text());fail=[];summary=[]
class Audit(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.urls=[];self.readers=[];self.labs=0
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id'in d:self.ids.append(d['id'])
  if 'demo'in d.get('class','').split():self.labs+=1
  if 'page-edition'in d.get('class','').split():self.readers.append(d)
  for k in ['href','src']:
   if k in d:self.urls.append(d[k])
for p in R.rglob('*.html'):
 if any(x in p.parts for x in ['全书核对','核对资料']):continue
 a=Audit();text=p.read_text();a.feed(text)
 if len(a.ids)!=len(set(a.ids)):fail.append(str(p)+': duplicate IDs')
 for url in a.urls:
  u=urlsplit(url)
  if u.scheme or u.netloc:continue
  q=(p.parent/unquote(u.path)) if u.path else p
  if not q.exists():fail.append(str(p)+': missing '+url)
  if q==p and u.fragment and unquote(u.fragment) not in a.ids:fail.append(str(p)+': anchor '+url)
 for d in a.readers:
  for n in range(int(d['data-min']),int(d['data-max'])+1):
   q=R/'原书页'/d['data-lang']/f'pdf-{n+int(d["data-offset"]):03d}.jpg'
   if not q.exists():fail.append('source missing '+str(q))
 math=re.findall(r'<math\b.*?</math>',text,re.S)
 for formula in math:
  try:ET.fromstring(formula)
  except ET.ParseError as e:fail.append(str(p)+': invalid MathML '+str(e))
 if p.name=='index.html':summary.append({'page':str(p.relative_to(R)),'labs':a.labs,'mathml':len(math),'ids':len(a.ids)})
 if p.parent.name in [x['folder'] for x in chapters]:
  c=next(x for x in chapters if x['folder']==p.parent.name)
  if a.labs!=len(c['labs']):fail.append(str(p)+': lab count')
  if len(re.findall(r'<h2 id="section-',text))!=len(c['sections'])+1:fail.append(str(p)+': section count')
for lang,a,b in [('中文',61,402),('英文',77,481)]:
 files=list((R/'原书页'/lang).glob('*.jpg'))
 if len(files)!=b-a+1:fail.append(lang+': total page count')
 for n in range(a,b+1):
  p=R/'原书页'/lang/f'pdf-{n:03d}.jpg'
  if not p.exists() or p.stat().st_size<1000:fail.append(str(p)+': invalid page')
report={'status':'PASS' if not fail else 'FAIL','pages':summary,'original_pages':{'中文':342,'英文':405},'all_local_links_and_anchors':not fail,'failures':fail}
(R/'页面与原文完整性报告.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
if fail:raise SystemExit(1)
