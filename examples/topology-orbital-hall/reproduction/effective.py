"""Independent three-d-orbital effective model; NOT the published five-orbital TB.
Retains SI d-d hopping parameters except ambiguous r4 set to 0.0607 eV as an independent model choice.
Uses effective SOC 0.25*L (vs SI printed 0.5*L), plus a stated valley-odd
 dz2 term -0.06*(sin(kx)-2*sin(kx/2)*cos(sqrt(3)*ky/2)) eV.
No fitting of Hall amplitude. No p orbitals or exchange (constant in one spin).
Reflection ky -> -ky together with L -> -L sets C(QAHI)=+1.
"""
import numpy as np
from model import h0,L,A,B,S,mesh
LE=-L[:3,:3]
def he(k,eps):
 k=np.asarray(k).copy();k[...,1]*=-1
 h=h0(k,eps,r4_override=.0607)[...,:3,:3]+.25*L[:3,:3]
 a=k[...,0]/2;b=S*k[...,1]/2
 h[...,0,0]-=.06*(np.sin(2*a)-2*np.sin(a)*np.cos(b))
 return h

def response(k,eps):
 e,u=np.linalg.eigh(he(k,eps));ut=u.conj().swapaxes(-1,-2);d=1e-5
 x=(he(k+[d,0],eps)-he(k-[d,0],eps))/(2*d)
 y=(he(k+[0,d],eps)-he(k-[0,d],eps))/(2*d)
 j=(x@LE+LE@x)/2
 x=ut@x@u;y=ut@y@u;j=ut@j@u
 de=e[..., :,None]-e[...,None,:]
 inv=np.divide(1.,de**2,out=np.zeros_like(de),where=abs(de)>1e-7)
 oc=2*np.sum((j*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 bc=-2*np.sum((x*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 return e,oc,bc

def hoppings(eps):
 n=9;q=np.arange(n)/n
 uv=np.stack(np.meshgrid(q,q,indexing='ij'),-1);h=he(uv@B,eps)
 tt=np.fft.fft2(h,axes=(0,1))/n**2
 terms={}
 for i in range(n):
  for j in range(n):
   r=(i if i<n/2 else i-n,j if j<n/2 else j-n)
   if abs(tt[i,j]).max()>1e-10:terms[r]=tt[i,j]
 return terms

def flake(eps,n=20,armchair=False):
 if armchair:
  # Equilateral armchair cut: x >= 0, x +/-sqrt(3)y < const, rotated triangle.
  cells=[]
  for i in range(-2*n,2*n+1):
   for j in range(-2*n,2*n+1):
    x,y=np.array([i,j])@A
    if y>=-1e-8 and S*x+y<=S*n+1e-8 and -S*x+y<=S*n+1e-8:cells.append((i,j))
 else:cells=[(i,j) for i in range(n) for j in range(n-i)]
 cells=np.array(cells);idx={tuple(r):i for i,r in enumerate(cells)};t=hoppings(eps)
 h=np.zeros((3*len(cells),)*2,complex)
 for r,i in idx.items():
  for R,v in t.items():
   s=(r[0]+R[0],r[1]+R[1]);j=idx.get(s)
   if j is not None:h[3*i:3*i+3,3*j:3*j+3]+=v
 assert abs(h-h.conj().T).max()<1e-10
 return cells@A,h
if __name__=='__main__':
 from scipy.linalg import eigh
 for ac in [False,True]:
  pos,h=flake(3.2,18,ac);e,u=eigh(h)
  print(ac,len(pos),[(i,round(x,5)) for i,x in enumerate(e) if 1.8<x<2.25])
  for i,x in enumerate(e):
   if 1.84<x<2.13:
    p=abs(u[:,i].reshape(-1,3))**2;p=p.sum(-1)
    print('state',i,x,'ipr',sum(p*p),'sites',pos[p.argsort()[-4:]])
