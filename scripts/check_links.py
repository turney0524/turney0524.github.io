"""Validate internal navigation and article MathML before deployment."""
from pathlib import Path
from urllib.parse import unquote,urlsplit
import re,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1];files=list(R.glob('*.html'))+list((R/'articles').glob('*.html'))+list((R/'courses').rglob('*.html'));count=0;math=0
for p in files:
    text=p.read_text()
    assert not re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f]',text),p
    ids=set(re.findall(r'\bid="([^"]+)"',text))
    for target in re.findall(r'(?:href|src)="([^"]+)"',text):
        u=urlsplit(target)
        if u.scheme or target.startswith('//'):continue
        path=(p.parent/unquote(u.path)).resolve() if u.path else p
        assert path.exists(),(p.name,target)
        if u.fragment and path.suffix=='.html':
            target_ids=ids if path==p else set(re.findall(r'\bid="([^"]+)"',path.read_text()))
            assert unquote(u.fragment) in target_ids,(p.name,'missing anchor',target)
        count+=1
    if p.parent.name=='articles':
        for node in re.findall(r'<math\b.*?</math>',text,re.S):
            ET.fromstring(node);assert not re.search(r'\\[A-Za-z]+',re.sub('<[^>]*>','',node)),p;math+=1
for p in ['feed.xml','sitemap.xml','assets/site/favicon.svg']:ET.parse(R/p)
print(f'PASS: {len(files)} pages, {count} internal links, {math} article MathML nodes; XML documents valid.')
