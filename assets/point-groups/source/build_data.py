"""Construct all 32 ordinary crystallographic point groups in one Cartesian convention.
Characters are traces of explicit complex representation matrices, not hand-entered tables.
Only NumPy is required. The ordinary single-valued, unitary (no time reversal) groups
are covered. No spin double groups or space-group translation phases are implied.
"""
from pathlib import Path
import numpy as np,json,math,itertools
ROOT=Path(__file__).resolve().parents[1]
I=np.eye(3);INV=-I;H=np.diag([1.,1.,-1.]);SX=np.diag([1.,-1.,-1.]);MV=np.diag([1.,-1.,1.])
TOL=2e-7

def key(M):return tuple(np.round(np.asarray(M).ravel(),8))
def rot(n,axis=(0,0,1)):
 a=np.array(axis,float);a/=np.linalg.norm(a);x,y,z=a;t=2*np.pi/n;K=np.array([[0,-z,y],[z,0,-x],[-y,x,0.]])
 return np.cos(t)*I+(1-np.cos(t))*np.outer(a,a)+np.sin(t)*K

def order(M):
 A=I.copy()
 for k in range(1,49):
  A=A@M
  if np.max(abs(A-I))<TOL:return k
 raise AssertionError('infinite order')

def axis_angle(R):
 t=float(np.arccos(np.clip((np.trace(R)-1)/2,-1,1)))
 if t<1e-7:return np.array([0.,0.,1.]),0.
 if abs(t-np.pi)<1e-6:
  _,_,vh=np.linalg.svd(R-I);a=vh[-1];a/=np.linalg.norm(a)
 else:a=np.array([R[2,1]-R[1,2],R[0,2]-R[2,0],R[1,0]-R[0,1]])/(2*np.sin(t))
 for v in a:
  if abs(v)>1e-7:
   if v<0:a=-a;t=-t
   break
 return a,t

def vector_name(a):
 a=np.array(a);a[abs(a)<1e-7]=0
 for j,k in enumerate('xyz'):
  if abs(abs(a[j])-1)<1e-6:return k
 return '('+','.join(f'{v:.3f}' if abs(v)>1e-7 else '0' for v in a)+')'

def describe(M,index):
 det=int(round(np.linalg.det(M)));o=order(M);axis,theta=axis_angle(M if det==1 else -M)
 if o==1:return dict(name='E',kind='identity',axis=[0,0,1],angle=0.,normal=None,detail='恒等操作：所有点保持不动。',order=1,det=1)
 if np.max(abs(M+I))<TOL:return dict(name='i',kind='inversion',axis=[0,0,1],angle=0.,normal=None,detail='中心反演：r → −r，极矢量反向，轴矢量不反向。',order=2,det=-1)
 if det==1:
  n=int(round(2*np.pi/abs(theta)));name=f'C{n}'+('⁻¹' if theta<0 else '')+'('+vector_name(axis)+')'
  return dict(name=name,kind='rotation',axis=axis.tolist(),angle=theta,normal=None,detail=f'绕笛卡尔单位轴 {vector_name(axis)} 右手旋转 {theta*180/np.pi:.0f}°。',order=o,det=det)
 # Every improper orthogonal matrix has an eigenvector of eigenvalue −1.
 _,_,vh=np.linalg.svd(M+I);normal=vh[-1];normal/=np.linalg.norm(normal)
 for v in normal:
  if abs(v)>1e-7:
   if v<0:normal=-normal
   break
 reflect=I-2*np.outer(normal,normal);R=M@reflect;a,t=axis_angle(R)
 if np.max(abs(M-reflect))<TOL:
  if abs(normal[2])>1-1e-6:name='σh(xy)'
  elif abs(normal[1])>1-1e-6:name='σv(xz)'
  elif abs(normal[0])>1-1e-6:name='σv(yz)'
  else:name='σ(n'+str(index)+')'
  return dict(name=name,kind='reflection',axis=normal.tolist(),angle=0.,normal=normal.tolist(),detail='镜面法向为 '+vector_name(normal)+'；平面内分量不变，法向分量反号。',order=o,det=det)
 n=int(round(2*np.pi/abs(t)));name=f'S{n}'+('⁻¹' if t<0 else '')+'('+vector_name(a)+')'
 return dict(name=name,kind='improper',axis=a.tolist(),angle=t,normal=normal.tolist(),detail=f'先绕 {vector_name(a)} 旋转 {t*180/np.pi:.0f}°，再关于法向 {vector_name(normal)} 的平面反射；操作阶数为 {o}。',order=o,det=det)

QBASE=[]
for j in range(3):B=np.zeros((3,3));B[j,j]=1;QBASE.append(B)
for j,k in [(0,1),(0,2),(1,2)]:B=np.zeros((3,3));B[j,k]=B[k,j]=1/np.sqrt(2);QBASE.append(B)
QBASE=np.array(QBASE)
EBASE=np.array([np.diag([-1.,-1.,2.])/np.sqrt(6),np.diag([1.,-1.,0.])/np.sqrt(2)])
def tensor_rep(M,basis=QBASE):return np.array([[np.trace(Bi@M@Bj@M.T) for Bj in basis] for Bi in basis])
def serial(A):
 A=np.asarray(A,dtype=complex);out=np.stack([A.real,A.imag],axis=-1);out[abs(out)<1e-9]=0
 return np.round(out,10).tolist()

def ct(x):
 x=complex(x)
 for n in [-3,-2,-1,0,1,2,3]:
  if abs(x-n)<1e-7:return str(n)
 values=[(1j,'i'),(-1j,'−i'),(np.exp(2j*np.pi/3),'ω'),(np.exp(4j*np.pi/3),'ω²'),(-np.exp(2j*np.pi/3),'−ω'),(-np.exp(4j*np.pi/3),'−ω²')]
 for a,s in values:
  if abs(x-a)<1e-7:return s
 raise ValueError(x)

def cyclic_irreps(n):
 if n==1:return [('A',1,1)]
 if n==2:return [('A',1,1),('B',1,-1)]
 if n==3:ks=[('A',0),('¹E',1),('²E',2)]
 elif n==4:ks=[('A',0),('B',2),('¹E',1),('²E',3)]
 elif n==6:ks=[('A',0),('B',3),('¹E1',1),('²E1',5),('¹E2',2),('²E2',4)]
 else:raise ValueError(n)
 return [(name,1,np.exp(2j*np.pi*k/n)) for name,k in ks]

def make(n,symbol,hm,system,kind,N=1,central=None):
 r=H@rot(4) if kind=='S4' or kind=='D2d' else rot(N)
 if kind=='C1':N=1;r=I
 isD=kind in ['D','Cv','D2d'];s=MV if kind=='Cv' else SX
 P=INV if central=='i' else H if central=='h' else I
 coords=list(itertools.product(range(N),range(2 if isD else 1),range(2 if central else 1)))
 mats=[np.linalg.matrix_power(r,k)@np.linalg.matrix_power(s,b)@np.linalg.matrix_power(P,p) for k,b,p in coords]
 gen=[]
 if N>1:gen.append((coords.index((1,0,0)), 'S4(z)=σh C4(z)' if kind in ['S4','D2d'] else f'C{N}(z)'))
 if isD:gen.append((coords.index((0,1,0)),'σv(xz)' if kind=='Cv' else 'C2(x)'))
 if central:gen.append((coords.index((0,0,1)),'i' if central=='i' else 'σh(xy)'))
 base=[]
 if not isD:
  for name,d,value in cyclic_irreps(N):base.append((name,np.array([[value]]),None))
 else:
  if N==2 and kind=='D':ones=[('A',1,1),('B1',1,-1),('B2',-1,-1),('B3',-1,1)]
  elif N%2==0:ones=[('A1',1,1),('A2',1,-1),('B1',-1,1),('B2',-1,-1)]
  else:ones=[('A1',1,1),('A2',1,-1)]
  for name,rv,sv in ones:base.append((name,np.array([[rv]]),np.array([[sv]])))
  for j in range(1,(N-1)//2+1):
   theta=2*np.pi*j/N;R=np.array([[np.cos(theta),-np.sin(theta)],[np.sin(theta),np.cos(theta)]])
   base.append(('E' if N in [3,4] else f'E{j}',R,np.diag([1.,-1.])))
 reps=[]
 for par in ([1,-1] if central else [1]):
  for name,R,S in base:
   label=name+('g' if par==1 else 'u') if central=='i' else name+('′' if par==1 else '″') if central=='h' else name
   values=[np.linalg.matrix_power(R,k)*(par**p)@(np.linalg.matrix_power(S,b) if S is not None else np.eye(R.shape[0])) for k,b,p in coords]
   reps.append((label,np.array(values,dtype=complex)))
 return finalize(n,symbol,hm,system,mats,gen,reps)

def cube(n,symbol,hm,system,kind):
 C3=rot(3,(1,1,1));C2=SX;C4=rot(4);S4=H@C4
 gm=[C3,C2] if kind in ['T','Th'] else [C3,S4] if kind=='Td' else [C4,C3]
 gn=['C3(1,1,1)','C2(x)'] if kind in ['T','Th'] else ['C3(1,1,1)','S4(z)'] if kind=='Td' else ['C4(z)','C3(1,1,1)']
 if kind in ['Th','Oh']:gm.append(INV);gn.append('i')
 mats=[I];lookup={key(I):0};todo=0
 while todo<len(mats):
  for M in gm:
   A=mats[todo]@M;k=key(A)
   if k not in lookup:lookup[k]=len(mats);mats.append(A)
  todo+=1
 gen=[(lookup[key(M)],name) for M,name in zip(gm,gn)]
 if kind in ['T','Th']:
  base=[('A',1),('¹E',1),('²E',1),('T',3)]
 else:base=[('A1',1),('A2',1),('E',2),('T1',3),('T2',3)]
 reps=[]
 for parity in ([1,-1] if kind in ['Th','Oh'] else [1]):
  for name,dim in base:
   Ds=[]
   for M in mats:
    det=round(np.linalg.det(M));Q=M if det==1 else -M
    if kind=='Td':Q=det*M
    p=0 if det==1 or kind=='Td' else 1
    if kind in ['T','Th']:
     if name=='A':D=np.array([[1.]])
     elif name=='T':D=Q
     else:
      perm=np.argmax(abs(Q),axis=1).tolist();k=0 if perm==[0,1,2] else 1 if perm==np.argmax(abs(C3),axis=1).tolist() else 2
      D=np.array([[np.exp(2j*np.pi*k*(1 if name=='¹E' else 2)/3)]])
    else:
     # Parity of the permutation of the four body-diagonal axes is A2.
     diagonals=[np.array(v,float) for v in [(1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1)]]
     perm=[]
     for v in diagonals:
      w=Q@v;perm.append(next(j for j,a in enumerate(diagonals) if np.max(abs(w-a))<TOL or np.max(abs(w+a))<TOL))
     sign=(-1)**sum(perm[i]>perm[j] for i in range(4) for j in range(i+1,4))
     D=np.array([[1.]]) if name=='A1' else np.array([[sign]]) if name=='A2' else tensor_rep(Q,EBASE) if name=='E' else Q if name=='T1' else sign*Q
    Ds.append(D*parity**p)
   reps.append((name+('g' if parity==1 else 'u') if kind in ['Th','Oh'] else name,np.array(Ds,dtype=complex)))
 return finalize(n,symbol,hm,system,mats,gen,reps)

def projected_basis(Ds,chars,dim,kind):
 P=sum(np.conj(c)*D for c,D in zip(chars,Ds))*dim/len(Ds);vectors=[]
 for v in P.T:
  v=v.copy()
  for q in vectors:v-=np.vdot(q,v)*q
  norm=np.linalg.norm(v)
  if norm>1e-7:
   v/=norm;j=next(j for j,z in enumerate(v) if abs(z)>1e-7);v*=np.exp(-1j*np.angle(v[j]));vectors.append(v)
 def poly(v):
  if kind=='quadratic':coeff=np.array([v[0],v[1],v[2],np.sqrt(2)*v[3],np.sqrt(2)*v[4],np.sqrt(2)*v[5]]);names=['x²','y²','z²','xy','xz','yz']
  else:coeff=v;names=['Rx','Ry','Rz'] if kind=='axial' else ['x','y','z']
  coeff=coeff/max(abs(coeff));parts=[]
  for z,name in zip(coeff,names):
   if abs(z)<1e-6:continue
   if abs(z.imag)<1e-6:a=float(z.real);term=('-' if a<0 else '')+('' if abs(abs(a)-1)<1e-6 else f'{abs(a):.3g}')+name
   elif abs(z.real)<1e-6:a=float(z.imag);term=('-' if a<0 else '')+('' if abs(abs(a)-1)<1e-6 else f'{abs(a):.3g}')+'i '+name
   else:term=f'({z.real:.3g}{z.imag:+.3g}i){name}'
   parts.append(term)
  return ' + '.join(parts).replace('+ -','− ')
 return [poly(v) for v in vectors]

def finalize(n,symbol,hm,system,mats,gens,reps):
 mats=np.array(mats);N=len(mats);lookup={key(M):j for j,M in enumerate(mats)};assert len(lookup)==N
 mul=np.array([[lookup[key(A@B)] for B in mats] for A in mats]);inv=np.array([lookup[key(M.T)] for M in mats]);Iidx=lookup[key(I)];assert Iidx==0
 # Minimal right-generator words, identity is the empty word.
 words={0:'E'};queue=[0]
 while queue:
  a=queue.pop(0)
  for j,(g,name) in enumerate(gens):
   b=int(mul[a,g])
   if b not in words:words[b]=('' if a==0 else words[a]+' · ')+chr(97+j);queue.append(b)
 assert len(words)==N
 classes=[];seen=set()
 for g in range(N):
  if g in seen:continue
  cls=sorted({int(mul[mul[h,g],inv[h]]) for h in range(N)});seen.update(cls);classes.append(cls)
 classes.sort(key=lambda c:(0 if c[0]==0 else 1 if np.linalg.det(mats[c[0]])>0 else 2,-order(mats[c[0]]),c[0]))
 sizes=np.array([len(c) for c in classes]);class_of={g:j for j,c in enumerate(classes) for g in c}
 ops=[dict(id=j,matrix=np.round(M,10).tolist(),word=words[j],classId=class_of[j],**describe(M,j)) for j,M in enumerate(mats)]
 vd=mats.astype(complex);ad=np.array([np.linalg.det(M)*M for M in mats],dtype=complex);qd=np.array([tensor_rep(M) for M in mats],dtype=complex)
 vch=np.trace(vd,axis1=1,axis2=2);ach=np.trace(ad,axis1=1,axis2=2);qch=np.trace(qd,axis1=1,axis2=2)
 out=[];charrows=[]
 for label,Ds in reps:
  d=Ds.shape[1];chars=np.trace(Ds,axis1=1,axis2=2);cr=np.array([chars[c[0]] for c in classes]);charrows.append(cr)
  assert np.max(abs(Ds[0]-np.eye(d)))<TOL
  # Explicit homomorphism checks, including all multiplication pairs.
  error=max(np.max(abs(Ds[a]@Ds[b]-Ds[mul[a,b]])) for a in range(N) for b in range(N));assert error<TOL,(symbol,label,error)
  assert all(max(abs(chars[g]-chars[c[0]]) for g in c)<TOL for c in classes)
  fs=int(round(sum(chars[mul[g,g]] for g in range(N)).real/N))
  def multiplicity(c):
   value=np.vdot(chars,c)/N;assert abs(value.imag)<TOL and abs(value.real-round(value.real))<TOL;return int(round(value.real))
  out.append(dict(label=label,dimension=d,characters=[ct(z) for z in cr],values=serial(cr),matrices=serial(Ds),fs=fs,polar=multiplicity(vch),axial=multiplicity(ach),quadratic=multiplicity(qch),basis={k:projected_basis(D,chars,d,k) for k,D in [('polar',vd),('axial',ad),('quadratic',qd)]}))
 charrows=np.array(charrows);assert len(out)==len(classes),(symbol,len(out),len(classes))
 assert sum(x['dimension']**2 for x in out)==N
 assert np.max(abs((charrows*sizes)@charrows.conj().T/N-np.eye(len(out))))<TOL
 polar_dim=int(round(vch.sum().real/N));rank2=int(round(qch.sum().real/N));piezo=int(round((vch*qch).sum().real/N));centro=key(INV) in lookup
 assert sum(r['dimension']*r['polar'] for r in out)==3
 assert sum(r['dimension']*r['axial'] for r in out)==3
 assert sum(r['dimension']*r['quadratic'] for r in out)==6
 return dict(number=n,symbol=symbol,hm=hm,system=system,order=N,generators=[dict(index=g,name=name,letter=chr(97+j),order=ops[g]['order']) for j,(g,name) in enumerate(gens)],operations=ops,classes=[dict(id=j,indices=c,size=len(c),label=('' if len(c)==1 else str(len(c)))+ops[c[0]]['name'],representative=c[0]) for j,c in enumerate(classes)],irreps=out,multiplication=mul.tolist(),inverse=inv.tolist(),centrosymmetric=centro,chiral=all(x['det']==1 for x in ops),polarDimension=polar_dim,axialDimension=int(round(ach.sum().real/N)),rank2Dimension=rank2,piezoDimension=piezo)

specs=[
(1,'C1','1','三斜','C1',1,None),(2,'Ci','-1','三斜','C1',1,'i'),(3,'C2','2','单斜','C',2,None),(4,'Cs','m','单斜','C1',1,'h'),(5,'C2h','2/m','单斜','C',2,'i'),
(6,'D2','222','正交','D',2,None),(7,'C2v','mm2','正交','Cv',2,None),(8,'D2h','mmm','正交','D',2,'i'),
(9,'C4','4','四方','C',4,None),(10,'S4','-4','四方','S4',4,None),(11,'C4h','4/m','四方','C',4,'i'),(12,'D4','422','四方','D',4,None),(13,'C4v','4mm','四方','Cv',4,None),(14,'D2d','-42m','四方','D2d',4,None),(15,'D4h','4/mmm','四方','D',4,'i'),
(16,'C3','3','三方','C',3,None),(17,'C3i','-3','三方','C',3,'i'),(18,'D3','32','三方','D',3,None),(19,'C3v','3m','三方','Cv',3,None),(20,'D3d','-3m','三方','D',3,'i'),
(21,'C6','6','六方','C',6,None),(22,'C3h','-6','六方','C',3,'h'),(23,'C6h','6/m','六方','C',6,'i'),(24,'D6','622','六方','D',6,None),(25,'C6v','6mm','六方','Cv',6,None),(26,'D3h','-6m2','六方','D',3,'h'),(27,'D6h','6/mmm','六方','D',6,'i')]
if __name__=='__main__':
 groups=[make(*s) for s in specs]
 for n,sym,hm in [(28,'T','23'),(29,'Th','m-3'),(30,'O','432'),(31,'Td','-43m'),(32,'Oh','m-3m')]:groups.append(cube(n,sym,hm,'立方',sym))
 assert len(groups)==32
 assert sum(g['centrosymmetric'] for g in groups)==11
 assert sum(g['chiral'] for g in groups)==11
 assert sum(g['polarDimension']>0 for g in groups)==10
 assert sum(g['piezoDimension']>0 for g in groups)==20
 report={'groups':32,'operations':sum(g['order'] for g in groups),'irreps':sum(len(g['irreps']) for g in groups),'class_count':sum(len(g['classes']) for g in groups),'all_homomorphisms_checked':True,'all_row_orthogonality_checked':True,'all_dimension_square_sums_checked':True,'centrosymmetric_groups':11,'proper_only_groups':11,'polar_groups':10,'piezo_allowed_groups':20,'max_matrix_error_tolerance':TOL}
 (ROOT/'assets/groups.json').write_text(json.dumps(groups,ensure_ascii=False,separators=(',',':')))
 (ROOT/'assets/groups.js').write_text('window.POINT_GROUPS='+json.dumps(groups,ensure_ascii=False,separators=(',',':'))+';\n')
 (ROOT/'校验报告.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report,ensure_ascii=False,indent=2))
