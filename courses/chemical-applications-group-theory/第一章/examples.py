"""Cotton chapter 1 companion: independently reproducible toy models.
Run: python -m pip install numpy; python examples.py
Teaching units throughout. Not a fit to actual molecules.
"""
import numpy as np

def dimer(t=-1.0, delta=0.0):
    H = np.array([[delta, t], [t, -delta]])
    P = np.array([[0., 1.], [1., 0.]])
    E, U = np.linalg.eigh(H)
    return E, U, np.diag(U.T @ P @ U), np.linalg.norm(H @ P - P @ H)

def ring(t=-1.0, eta=0.0):
    H = np.array([[0,t+eta,0,t],[t+eta,0,t,0],[0,t,0,t],[t,0,t,0.]])
    s, r = .5, 1/np.sqrt(2)
    Q = np.array([[s,s,r,0],[s,-s,0,r],[s,s,-r,0],[s,-s,0,-r]])
    return np.linalg.eigvalsh(H), Q.T @ H @ Q

def transition(alpha=0., operator='x2', final3=False):
    # Dense trapezoidal quadrature provides an independent check of browser Simpson.
    x = np.linspace(-7, 7, 28001)
    phi0 = np.pi**(-.25) * np.exp(-x*x/2)
    phi1 = np.sqrt(2)*x*phi0
    phi2 = (2*x*x-1)/np.sqrt(2)*phi0
    phi3 = (2*x**3-3*x)/np.sqrt(3)*phi0
    psi = phi3 if final3 else np.cos(alpha)*phi1+np.sin(alpha)*phi2
    f = psi * (x if operator == 'x' else x*x) * phi0
    # numpy 1.x and 2.x compatible
    integrate = np.trapezoid if hasattr(np, 'trapezoid') else np.trapz
    return float(integrate(f, x))

def water(kr=1., kb=.2, mH=1.):
    # yz plane, z bisects HOH. Full 3D has three additional rigid zero modes.
    h = np.deg2rad(104.5/2)
    x = np.array([[0.,0.],[-np.sin(h),-np.cos(h)],[np.sin(h),-np.cos(h)]]).ravel()
    def internal(a):
        u, v = a[2:4]-a[:2], a[4:6]-a[:2]
        ru, rv = np.linalg.norm(u), np.linalg.norm(v)
        return np.array([ru,rv,np.arccos(np.clip(np.dot(u,v)/(ru*rv),-1,1))])
    B = np.empty((3,6)); step=1e-5
    for j in range(6):
        d=np.zeros(6);d[j]=step
        B[:,j]=(internal(x+d)-internal(x-d))/(2*step)
    K=B.T @ np.diag([kr,kr,kb]) @ B
    mass=np.array([16.,16.,mH,mH,mH,mH])
    D=K/np.sqrt(mass[:,None]*mass[None,:])
    values, vecs=np.linalg.eigh(D)
    keep=values>1e-7
    return np.sqrt(values[keep]), vecs[:,keep]/np.sqrt(mass[:,None]), values

def structure(n=12, qa=2*np.pi):
    F=np.exp(1j*qa*np.arange(n)).sum()
    return F, abs(F)**2

if __name__=='__main__':
    np.set_printoptions(precision=6,suppress=True)
    print('Dimer: energies, eigenvectors, parity, commutator norm:', *dimer(), sep='\n')
    print('\nFour-site ring: energies, transformed H:', *ring(), sep='\n')
    print('\nParity forbidden integral:', transition())
    print('Allowed oscillator x: ', transition(operator='x'))
    print('Parity allowed but oscillator-forbidden: ',transition(operator='x',final3=True))
    print('\nWater H2O model omega:', water()[0])
    print('Water D2O model omega:',water(mH=2)[0])
    print('Diffraction F and I:',structure())
