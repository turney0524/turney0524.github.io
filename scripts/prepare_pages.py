"""Create a public artifact with no Git metadata, workflow files or build tools."""
from pathlib import Path
import shutil,subprocess,sys
R=Path(__file__).resolve().parents[1];OUT=R/'_site'
subprocess.run([sys.executable,str(R/'scripts/sanitize_cotton_public.py')],check=True)
if OUT.exists():shutil.rmtree(OUT)
OUT.mkdir()
for p in R.iterdir():
    if p.is_file() and (p.suffix in {'.html','.css','.js','.svg','.xml'} or p.name in {'robots.txt','.nojekyll','notes.md'} or p.name.startswith('v2-chapter-') and p.suffix=='.md'):
        shutil.copy2(p,OUT/p.name)
for name in ['assets','articles','content','examples','courses']:
    shutil.copytree(R/name,OUT/name,ignore=shutil.ignore_patterns('__pycache__','*.pyc','.DS_Store','_template.md'))
print('Prepared',len(list(OUT.rglob('*'))),'public files and directories.')
