"""Independent checks on the serialized review data and key physical decompositions."""
from pathlib import Path
import json,numpy as np
R=Path(__file__).resolve().parents[1];groups=json.loads((R/'assets/groups.json').read_text());idx={g['symbol']:g for g in groups};checks=0

def expect(ok,what):
 global checks
 assert ok,what
 checks+=1

def rotation(axis,t):
 a=np.asarray(axis,float);K=np.array([[0,-a[2],a[1]],[a[2],0,-a[0]],[-a[1],a[0],0.]])
 return np.eye(3)*np.cos(t)+(1-np.cos(t))*np.outer(a,a)+np.sin(t)*K

def decomp(g,k):return {r['label']:r[k] for r in g['irreps'] if r[k]}
for g in groups:
 mats=np.array([o['matrix'] for o in g['operations']]);N=len(mats);size=np.array([c['size'] for c in g['classes']]);chars=[]
 for op in g['operations']:
  M=np.array(op['matrix']);expect(np.max(abs(M.T@M-np.eye(3)))<1e-8,(g['symbol'],'orthogonal'))
  if op['kind']=='identity':A=np.eye(3)
  elif op['kind']=='inversion':A=-np.eye(3)
  elif op['kind']=='rotation':A=rotation(op['axis'],op['angle'])
  else:
   n=np.array(op['normal']);A=rotation(op['axis'],op['angle'])@(np.eye(3)-2*np.outer(n,n))
  expect(np.max(abs(A-M))<1e-8,(g['symbol'],op['id'],'animation endpoint'))
  for b in range(N):expect(np.max(abs(M@mats[b]-mats[g['multiplication'][op['id']][b]]))<1e-8,(g['symbol'],'multiplication'))
 for r in g['irreps']:
  D=np.array(r['matrices']);D=D[...,0]+1j*D[...,1];ch=np.array(r['values']);ch=ch[:,0]+1j*ch[:,1];chars.append(ch)
  expect(np.max(abs(np.einsum('nji,njk->nik',D.conj(),D)-np.eye(r['dimension'])))<1e-8,(g['symbol'],r['label'],'unitarity'))
  if r['fs']==0:expect(any(np.max(abs(ch-(np.array(s['values'])[:,0]-1j*np.array(s['values'])[:,1])))<1e-8 for s in g['irreps'] if s['label']!=r['label']),(g['symbol'],'complex partner'))
 C=np.array(chars);expect(np.max(abs(C.conj().T@C-np.diag(N/size)))<1e-8,(g['symbol'],'column orthogonality'))
 expect(sum(r['dimension']**2 for r in g['irreps'])==N,(g['symbol'],'dimension sum'))
 for a in range(len(C)):
  for b in range(len(C)):
   coeff=(C.conj()*size)@(C[a]*C[b])/N
   expect(np.max(abs(coeff-np.round(coeff.real)))<1e-8 and coeff.real.min()>-1e-8,(g['symbol'],'integer tensor product'))
expect(decomp(idx['C3v'],'polar')=={'A1':1,'E':1},'C3v vector / Bilbao')
expect(decomp(idx['C3v'],'quadratic')=={'A1':2,'E':2},'C3v symmetric square / Bilbao')
expect(decomp(idx['D2d'],'polar')=={'B2':1,'E':1},'D2d vector / Bilbao')
expect(decomp(idx['D4h'],'polar')=={'A2u':1,'Eu':1},'D4h vector / Bilbao')
expect(decomp(idx['D4h'],'quadratic')=={'A1g':2,'B1g':1,'B2g':1,'Eg':1},'D4h quadratics / Bilbao')
expect(decomp(idx['Oh'],'polar')=={'T1u':1},'Oh vector')
expect(decomp(idx['Oh'],'axial')=={'T1g':1},'Oh axial')
expect(decomp(idx['Oh'],'quadratic')=={'A1g':1,'Eg':1,'T2g':1},'Oh quadratic orbitals')
expect(idx['O']['piezoDimension']==0 and not idx['O']['centrosymmetric'],'432 piezoelectric exception / IUCr')
expect(sum(g['piezoDimension']>0 for g in groups)==20,'20 piezoelectric classes / IUCr')
expect(sum(g['polarDimension']>0 for g in groups)==10,'10 polar classes')
report=json.loads((R/'校验报告.json').read_text());report.update(serialized_data_checks=checks,animation_endpoints_checked=332,column_orthogonality=True,tensor_product_integer_checks=True,representative_bilbao_decompositions=True)
(R/'校验报告.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS:',checks,'serialized algebra, animation endpoint and physical decomposition checks.')
