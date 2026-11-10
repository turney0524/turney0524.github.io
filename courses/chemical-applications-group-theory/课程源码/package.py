"""Package the reviewed local course, retaining every source-page asset."""
from pathlib import Path
import zipfile
r=Path(__file__).resolve().parents[1];z=r/'Cotton_全书_动态伴读.zip'
excluded={'核对资料','全书核对','__pycache__','.git'}
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED,compresslevel=5) as a:
 for f in sorted(r.rglob('*')):
  if not f.is_file() or f.suffix=='.zip' or f.name=='.DS_Store' or any(p in excluded for p in f.relative_to(r).parts):continue
  a.write(f,Path('Cotton_全书')/f.relative_to(r))
with zipfile.ZipFile(z) as a:
 bad=a.testzip()
 if bad:raise ValueError(bad)
 print('PASS',len(a.namelist()),'files',round(z.stat().st_size/1024/1024,1),'MiB')
 print(z.resolve())
