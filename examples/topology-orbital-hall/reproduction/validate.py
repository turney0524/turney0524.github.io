"""Independent checks: overlap-plaquette Chern number and Fourier roundtrip."""
import json
from pathlib import Path
import numpy as np
from scipy.linalg import expm
from model import A,B,L,h0
from effective import he,hoppings
n=60;q=np.arange(n)/n;k=np.stack(np.meshgrid(q,q,indexing='ij'),-1)@B
result=[]
for ep in [3.2,4.1,4.9]:
 e,u=np.linalg.eigh(he(k,ep));v=u[...,0]
 ux=np.sum(v.conj()*np.roll(v,-1,axis=0),axis=-1);uy=np.sum(v.conj()*np.roll(v,-1,axis=1),axis=-1)
 ux/=abs(ux);uy/=abs(uy)
 phase=ux*np.roll(uy,-1,axis=0)/np.roll(ux,-1,axis=1)/uy
 c=-np.angle(phase).sum()/(2*np.pi)
 rng=np.random.default_rng(11);err=0
 for kk in rng.uniform(-4,4,(30,2)):
  rt=sum(t*np.exp(1j*kk@(np.array(r)@A)) for r,t in hoppings(ep).items())
  err=max(err,float(abs(rt-he(kk,ep)).max()))
 assert err<1e-10
 assert abs(c-([0,1,0][[3.2,4.1,4.9].index(ep)]))<1e-8
 result.append({'epsilon2':ep,'fhs_chern_n60':float(c),'fourier_reconstruction_error_eV':err})
print(json.dumps(result,indent=2))
(Path(__file__).parent/'data/independent_checks.json').write_text(json.dumps(result,indent=2))
