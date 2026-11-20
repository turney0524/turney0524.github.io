"""Five-orbital model transcribed from ACS SI S1 (not fitted).
Coordinates: a1=(1,0), a2=(1/2,sqrt(3)/2), tau_p=(0,-1/sqrt(3)).
alpha=kx/2, beta=sqrt(3)*ky/2; energies eV, hbar=1, a=1.
The SI's H[1,4] matrix label is taken as h25 for Hermiticity.
r4 printed '0607' is interpreted as 0.607 eV. All scalar formulas retained.
"""
import numpy as np
S=np.sqrt(3.)
A=np.array([[1.,0.],[.5,S/2]])
B=2*np.pi*np.linalg.inv(A).T
TAU=np.array([[0.,0.]]*3+[[0.,-1/S]]*2)
L=np.zeros((5,5),complex); L[1,2]=-2j;L[2,1]=2j;L[3,4]=-1j;L[4,3]=1j
D=np.diag([1.,1.,1.,0.,0.])

def h0(k,eps=3.2,variant='literal',r4_override=None):
 k=np.asarray(k);a=k[...,0]/2;b=S*k[...,1]/2
 c=np.cos;s=np.sin;r1,r2,r3,r4,r5,r6,r7,r8,r9=-.184,.401,.02,.607,.338,.057,.2,-.12,.2
 if r4_override is not None:r4=r4_override
 t1,t2,t3=.1,-.18,.5
 h=np.zeros(k.shape[:-1]+(5,5),complex)
 h[...,0,0]=1.746+2*r1*c(2*a)+4*r1*c(a)*c(b)
 h[...,0,1]=2*r2*c(2*a)-2*r2*c(a)*c(b)+2j*S*r4*c(a)*s(b)
 h[...,0,2]=4j*r4*c(a)*s(a)+2j*r4*c(b)*s(a)-2*S*r2*s(a)*s(b)
 h[...,0,3]=2j*S*t1*c(b/3)*s(a)-2*S*t1*s(a)*s(b/3)
 h[...,0,4]=2*t1*c(a)*c(b/3)-2*t1*c(2*b/3)+2j*t1*c(a)*s(b/3)+2j*t1*s(2*b/3)
 h[...,1,1]=eps+2*r3*c(2*a)+(r3+3*r6)*c(a)*c(b)
 h[...,1,2]=4j*r5*c(a)*s(a)-4j*r5*c(b)*s(a)+S*(r3-r6)*s(a)*s(b)
 h[...,1,3]=2j*t3*c(b/3)*s(a)-2*t3*s(a)*s(b/3)
 h[...,1,4]=t2*c(a-b/3)+t2*c(a+b/3)+(t2+S*t3)*c(2*b/3)-1j*t2*s(a-b/3)+1j*t2*s(a+b/3)-1j*(t2+S*t3)*s(2*b/3)
 h[...,2,2]=eps+2*r6*c(2*a)+(3*r3+r6)*c(a)*c(b)
 h[...,2,3]=(t2+2*t3/S)*(c(a-b/3)+c(a+b/3))+(-2*t3/S)*c(2*b/3)-1j*(t2+2*t3/S)*s(a-b/3)+1j*(t2+2*t3/S)*s(a+b/3)+1j*(-t2+2*t3/S)*s(2*b/3)
 h[...,2,4]=2j*t3*c(b/3)*s(a)-2*t3*s(a)*s(b/3)
 h[...,3,3]=-1.8+(r7+r8)/S*c(2*a)+2*r9*c(2*a)-4*(r7+r8)/S*c(a)*c(b)-4*r9*c(a)*c(b)
 h[...,3,4]=2j*(r8-r7)*c(a)*s(a)+2j*(r7-r8)*c(b)*s(a)-2*(r7+r8)*s(a)*s(b)
 h[...,4,4]=-1.8-S*(r7+r8)*c(2*a)+2*r9*c(2*a)+4*r9*c(a)*c(b)
 if variant=='c3':
  # Explicit symmetry-restored candidate; NOT an author-provided correction.
  h[...,2,3]=(t2+2*t3/S)*2*c(a)*np.exp(1j*b/3)+(t2-t3/S)*np.exp(-2j*b/3)
  h[...,3,3]+=8*r9*c(a)*c(b)
 for i in range(5):
  for j in range(i+1,5):h[...,j,i]=h[...,i,j].conj()
 return h

def hamiltonian(k,eps=3.2,spin=None):
 h=h0(k,eps)
 if spin is not None:return h+spin*(.5*L-1.5*D)
 out=np.zeros(h.shape[:-2]+(10,10),complex)
 out[...,:5,:5]=h+.5*L-1.5*D;out[...,5:,5:]=h-.5*L+1.5*D
 return out

def mesh(n):
 q=(np.arange(n)+.5)/n
 uv=np.stack(np.meshgrid(q,q,indexing='ij'),-1)
 return uv@B

def curvature(k,eps,step=1e-5):
 """Return all 10 energies and orbital/charge curvature (xy convention SI/main)."""
 e,u=np.linalg.eigh(hamiltonian(k,eps))
 vel=[]
 for d in np.eye(2)*step:vel.append((hamiltonian(k+d,eps)-hamiltonian(k-d,eps))/(2*step))
 ll=np.kron(np.eye(2),L);vx,vy=vel
 jo=(vx@ll+ll@vx)/2
 ut=u.conj().swapaxes(-1,-2)
 j=ut@jo@u;x=ut@vx@u;y=ut@vy@u
 de=e[..., :,None]-e[...,None,:]
 den=de**2
 mask=den>1e-14
 inv=np.divide(1.,den,out=np.zeros_like(den),where=mask)
 # Orbital formula in main text is +2 Im; sigma = -e integral Omega.
 oc=2*np.sum((j*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 bc=-2*np.sum((x*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 return e,oc,bc

if __name__=='__main__':
 import json
 for ep in [3.2,4.1,4.9]:
  e,o,c=curvature(mesh(120),ep)
  print(ep,'bands',[(i,round(float(e[...,i].min()),3),round(float(e[...,i].max()),3)) for i in range(10)])
  for n in [6,7,8]:
   gap=e[...,n].min()-e[...,n-1].max()
   print('filled',n,'gap',gap,'OHC',-o[...,:n].sum(-1).mean()*abs(np.linalg.det(B))/(2*np.pi),'C',c[...,:n].sum(-1).mean()*abs(np.linalg.det(B))/(2*np.pi))
