"""Run: OPENBLAS_NUM_THREADS=1 MPLCONFIGDIR=/tmp/topo-mpl python reproduction/run.py
Produces numerical data + plots. All images marked independently calculated.
"""
from pathlib import Path
import json,sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.linalg import eigh,expm
from model import *
from effective import he,response,hoppings,flake,LE
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets';DATA=ROOT/'reproduction'/'data';DATA.mkdir(exist_ok=True);OUT.mkdir(exist_ok=True)
plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False,'savefig.dpi':220})
EP=[3.2,4.1,4.9];COL=['#4057b2','#d55b42','#309276'];NAMES=['two valleys inverted','one valley inverted','uninverted']
fac=abs(np.linalg.det(B))/(2*np.pi)
# Convergence: integrate exact same Kubo implementation on successively finer grids.
records=[]
for n in [120,240,480,720]:
 for ep in EP:
  os=[];bs=[];emax=-1e10;emin=1e10
  k=mesh(n).reshape(-1,2)
  for chunk in np.array_split(k,max(1,len(k)//10000)):
   e,o,b=response(chunk,ep);os.append(o[:,0]);bs.append(b[:,0]);emax=max(emax,e[:,0].max());emin=min(emin,e[:,1].min())
  records.append(dict(n=n,epsilon2=ep,ohc=float(-np.concatenate(os).mean()*fac),chern=float(np.concatenate(bs).mean()*fac),vbm=float(emax),cbm=float(emin),gap=float(emin-emax)))
print('CONVERGENCE',records,flush=True)
(DATA/'effective_convergence.json').write_text(json.dumps(records,indent=2))
rows=[r for r in records if r['n']==720];shifts=[(r['vbm']+r['cbm'])/2 for r in rows]
# Band and response overview corresponding to Fig.2(b,d,f).
fig,axs=plt.subplots(3,3,figsize=(12,10),gridspec_kw={'height_ratios':[1,1,1.1]})
points=np.array([[0,0],[4*np.pi/3,0],[np.pi,np.pi/S],[2*np.pi/3,2*np.pi/S],[0,0]])
path=np.concatenate([np.linspace(x,y,90,endpoint=False) for x,y in zip(points[:-1],points[1:])]+[points[-1:]])
mu=np.linspace(-2,2,601);curves=[]
for z,(ep,shift) in enumerate(zip(EP,shifts)):
 e,u=np.linalg.eigh(he(path,ep));path_e=e.copy();w=abs(u[:,0,:])**2
 ax=axs[0,z]
 for band in range(3):ax.scatter(np.arange(len(path)),e[:,band]-shift,c=w[:,band],s=3,cmap='plasma_r',vmin=0,vmax=1,rasterized=True)
 ax.set(ylim=(-2.2,2.2),xticks=[0,90,180,270,360],xticklabels=[r'$\Gamma$','+K','M','-K',r'$\Gamma$'],title=f'$\epsilon_2={ep}$ eV · {NAMES[z]}')
 ax.text(.03,.03,r'purple: $d_{z^2}$; yellow: $d_{x^2-y^2}/d_{xy}$',transform=ax.transAxes,fontsize=8)
 ax.axhline(0,color='gray',ls=':',lw=.7);ax.set_ylabel('E - midgap (eV)')
 e,o,b=response(mesh(480),ep);flat_e=e.ravel()-shift;flat_o=o.ravel();order=np.argsort(flat_e);cum=np.cumsum(flat_o[order]);inds=np.searchsorted(flat_e[order],mu,side='right')
 curve=-np.where(inds>0,cum[np.maximum(0,inds-1)],0)*fac/(480**2);curves.append(curve)
 ax=axs[1,z];ax.plot(mu,curve,color=COL[z]);ax.axvspan(rows[z]['vbm']-shift,rows[z]['cbm']-shift,color=COL[z],alpha=.15)
 ax.axhline(rows[z]['ohc'],color='gray',ls=':',lw=.7);ax.set(xlabel='Fermi energy - midgap (eV)',ylabel=r'$\sigma^z_{xy}$ [$e/(2\pi)$]',ylim=(-.4,3),title=f"OHC={rows[z]['ohc']:.4f}; C={round(rows[z]['chern'])}")
 # Full hexagon, occupied band only, no arbitrary map normalization.
 xx=np.linspace(-4.5,4.5,301);yy=np.linspace(-4,4,271);kk=np.stack(np.meshgrid(xx,yy),-1)
 _,oo,_=response(kk,ep);oc=oo[...,0]
 mask=(abs(kk[...,0])<=4*np.pi/3)&(abs(S*kk[...,0])+abs(kk[...,1])<=4*np.pi/S)&(abs(kk[...,1])<=2*np.pi/S)
 oc=np.ma.masked_where(~mask,oc)
 im=axs[2,z].pcolormesh(xx,yy,oc,cmap='RdBu_r',norm=matplotlib.colors.SymLogNorm(linthresh=.03,vmin=-30,vmax=30),shading='auto',rasterized=True)
 axs[2,z].set(aspect='equal',xlabel=r'$k_x a$',ylabel=r'$k_y a$',title=r'Orbital curvature ($a^2$, symlog)')
 fig.colorbar(im,ax=axs[2,z],shrink=.7,ticks=[-10,-1,-.1,0,.1,1,10])
 np.savez_compressed(DATA/f'effective-{ep}.npz',kpath=path,path_energies=path_e,mu=mu,ohc=curve,kx=xx,ky=yy,orbital_curvature=oc.filled(np.nan))
fig.suptitle('Independent 3-orbital effective model: bulk trends only\nNot a quantitative reproduction of the published five-orbital model',fontsize=14)
fig.tight_layout(rect=[0,0,1,.94]);fig.savefig(OUT/'effective-bulk.png')
# Export clean single-column panels for mobile reading, without adjacent labels.
from matplotlib.transforms import Bbox
fig.canvas.draw();renderer=fig.canvas.get_renderer();allaxes=list(fig.axes)
fig._suptitle.set_visible(False)
for z in range(3):
 group=[axs[0,z],axs[1,z],axs[2,z],allaxes[9+z]]
 for aa in allaxes:aa.set_visible(aa in group)
 box=Bbox.union([aa.get_tightbbox(renderer) for aa in group]).transformed(fig.dpi_scale_trans.inverted())
 fig.savefig(OUT/f'effective-case-{z+1}.png',bbox_inches=box.expanded(1.035,1.025))
plt.close(fig)
# Literal SI diagnostics, evaluated on complete 10-band spin model.
th=2*np.pi/3;rot=np.array([[np.cos(th),-np.sin(th)],[np.sin(th),np.cos(th)]]);U=expm(-1j*th*L)
rng=np.random.default_rng(7);ks=rng.uniform(-3,3,(100,2))
err=max(float(abs(h0(rot@k)-U@h0(k)@U.conj().T).max()) for k in ks)
se=max(float(abs(np.linalg.eigvalsh(h0(rot@k))-np.linalg.eigvalsh(h0(k))).max()) for k in ks)
checks={'c3_matrix_max_error_eV':err,'c3_spectral_max_error_eV':se,'gamma_p_diagonal_difference_eV':float((h0([0,0])[3,3]-h0([0,0])[4,4]).real),'interpretations':['r4=0.607 eV','H(2,5)=h25; lower triangle from Hermiticity','exchange on d sublattice; SOC exactly t_so Lz sigma_z'],'literal':[]}
fig,axs=plt.subplots(2,3,figsize=(12,7))
for z,ep in enumerate(EP):
 e,u=np.linalg.eigh(hamiltonian(path,ep));w=abs(u[:,0,:])**2+abs(u[:,5,:])**2
 for band in range(10):axs[0,z].scatter(np.arange(len(path)),e[:,band],c=w[:,band],s=2,cmap='plasma_r',vmin=0,vmax=1)
 axs[0,z].set(xticks=[0,90,180,270,360],xticklabels=[r'$\Gamma$','+K','M','-K',r'$\Gamma$'],ylim=(-4,5),ylabel='absolute energy (eV)',title=f'Literal SI, epsilon2={ep}')
 e,o,b=curvature(mesh(360),ep);ev=e.ravel();ov=o.ravel();ii=np.argsort(ev);cc=np.cumsum(ov[ii]);en=np.linspace(-3,4,701);nn=np.searchsorted(ev[ii],en,side='right');oh=-np.where(nn>0,cc[np.maximum(nn-1,0)],0)*fac/360**2
 axs[1,z].plot(en,oh,color=COL[z]);axs[1,z].set(ylim=(-5,5),xlabel='absolute Fermi energy (eV)',ylabel=r'OHC [$e/(2\pi)$]')
 gaps=[dict(filled=n,gap=float(e[...,n].min()-e[...,n-1].max())) for n in range(1,10)]
 checks['literal'].append({'epsilon2':ep,'gaps':gaps})
 np.savez_compressed(DATA/f'literal-{ep}.npz',kpath=path,path_energies=np.linalg.eigvalsh(hamiltonian(path,ep)),mu=en,ohc=oh)
fig.suptitle('Literal SI transcription: bands and Kubo OHC\nDo not label these parameter sets SOTI / QAHI / NI without further verification',fontsize=13)
fig.tight_layout(rect=[0,0,1,.92]);fig.savefig(OUT/'literal-audit.png');plt.close(fig)
(DATA/'si_checks.json').write_text(json.dumps(checks,indent=2));print('SI CHECKS',checks,flush=True)
# Boundary diagnostics for independent effective model: a finite open ribbon and flake.
pos,h=flake(3.2,24);e,u=eigh(h);shift=shifts[0]
np.savez_compressed(DATA/'flake-effective.npz',positions=pos,energies=e,eigenvectors=u)
inside=np.flatnonzero((e>rows[0]['vbm'])&(e<rows[0]['cbm']))
ipr=np.sum(np.sum(abs(u.reshape(len(pos),3,-1))**2,axis=1)**2,axis=0)
# Show all in-gap states; no manual selection of a desired corner triad.
fig=plt.figure(figsize=(12,4));gs=fig.add_gridspec(1,3,width_ratios=[1,1,1.35]);ax=fig.add_subplot(gs[0]);ax.scatter(np.arange(len(e)),e-shift,c=ipr,cmap='viridis',s=12);ax.axhspan(rows[0]['vbm']-shift,rows[0]['cbm']-shift,color='gray',alpha=.12);ax.set(xlim=(len(pos)-25,len(pos)+30),ylim=(-.5,.5),xlabel='state index',ylabel='E - midgap (eV)',title=f'Open triangular flake: {len(pos)} sites')
rho=(abs(u[:,inside])**2).sum(-1).reshape(-1,3).sum(-1)
ax=fig.add_subplot(gs[1]);im=ax.scatter(pos[:,0],pos[:,1],c=rho,s=18,cmap='magma');ax.set(aspect='equal',title=f'All {len(inside)} in-gap states summed',xlabel='x/a',ylabel='y/a');fig.colorbar(im,ax=ax,shrink=.6)
# Ribbon periodic a1, open along a2; edge weights on each boundary individually.
n=40;terms=hoppings(4.1);qs=np.linspace(-np.pi,np.pi,181);ee=[];ww=[]
for q in qs:
 hr=np.zeros((3*n,3*n),complex)
 for j in range(n):
  for (r1,r2),t in terms.items():
   jj=j+r2
   if 0<=jj<n:hr[3*j:3*j+3,3*jj:3*jj+3]+=t*np.exp(1j*q*r1)
 er,ur=eigh(hr);ee.append(er-shifts[1]);ww.append((abs(ur[:9])**2).sum(0))
ax=fig.add_subplot(gs[2]);ax.scatter(np.repeat(qs,3*n),np.array(ee).ravel(),c=np.array(ww).ravel(),vmin=0,vmax=.5,cmap='inferno',s=2,rasterized=True);ax.set(ylim=(-1.2,1.2),xlabel=r'$k\cdot a_1$',ylabel='E - midgap (eV)',title='QAH ribbon, 40 rows; one-edge weight')
fig.suptitle('Independent-model boundary diagnostics: no isolated three-corner-state claim',fontsize=12);fig.tight_layout(rect=[0,0,1,.90]);fig.savefig(OUT/'effective-boundary.png');plt.close(fig)
(DATA/'boundary.json').write_text(json.dumps({'flake_sites':len(pos),'flake_in_gap_state_count':len(inside),'in_gap_energies_eV':e[inside].tolist(),'isolated_three_corner_states_reproduced':False,'ribbon_rows':n},indent=2))
np.savez_compressed(DATA/'ribbon-effective.npz',q=qs,energy=ee,one_edge_weight=ww)
print('DONE',flush=True)
