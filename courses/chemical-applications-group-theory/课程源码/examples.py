"""后续八章独立 NumPy 复现。运行 python3 examples.py；不依赖浏览器JS。"""
import numpy as np

def characters():
    rows = np.array([[1,1,1],[1,1,-1],[2,-1,0]])
    weights = np.diag([1,2,3])/6
    assert np.allclose(rows @ weights @ rows.T,np.eye(3))
    representation = np.array([3,0,1])
    print('C3v: (3,0,1) ->',rows @ weights @ representation,'即 A1 + E')
    print('E x E ->',rows @ weights @ (rows[2]*rows[2]),'即 A1 + A2 + E')

def projectors():
    mats=[]
    for f in (1,-1):
        for k in range(3):
            A=np.zeros((3,3))
            for j in range(3): A[(k+f*j)%3,j]=1
            mats.append(A)
    P=sum(mats)/6
    E=np.eye(3)-P
    assert np.allclose(P@P,P) and np.allclose(E@E,E)
    assert np.allclose(P@E,0)
    seed=np.array([1.,2.,3.])
    print('种子(1,2,3): A1分量',P@seed,'E分量',E@seed)

def huckel(n=6):
    H=np.zeros((n,n))
    for i in range(n): H[i,(i+1)%n]=H[(i+1)%n,i]=-1
    values,C=np.linalg.eigh(H)
    expected=np.sort([-2*np.cos(2*np.pi*k/n) for k in range(n)])
    assert np.allclose(values,expected)
    print(f'{n}元环 α=0,β=−1 能量:',np.round(values,6))
    return values,C

def naphthalene():
    # 十元外围环加一条对位跨环融合边；此编号独立于原书。
    H=np.zeros((10,10))
    for i in range(10): H[i,(i+1)%10]=H[(i+1)%10,i]=-1
    H[0,5]=H[5,0]=-1
    e,C=np.linalg.eigh(H)
    density=2*np.sum(C[:,:5]**2,axis=1)
    assert np.allclose(H@C,C@np.diag(e))
    assert np.isclose(density.sum(),10)
    print('萘能谱:',np.round(e,6),'总π能量:',2*e[:5].sum())

def two_levels():
    for detuning in (-2,0,2):
        H=np.array([[detuning/2,.3],[.3,-detuning/2]])
        e,C=np.linalg.eigh(H)
        assert np.isclose(e[1]-e[0],2*np.hypot(detuning/2,.3))
        print('两态耦合，失谐',detuning,'能量',e,'原态1权重',C[0]**2)

def vibration():
    K=np.array([[1,-1,0],[-1,2,-1],[0,-1,1]],float)
    for masses in ([1,16,1],[2,16,2]):
        m=np.array(masses,float)
        D=K/np.sqrt(m[:,None]*m[None,:])
        e,Q=np.linalg.eigh(D)
        X=Q/np.sqrt(m[:,None])
        assert abs(e[0])<1e-12
        assert np.allclose(m@X[:,1:],0,atol=1e-10)
        print('质量',masses,'ω²',np.round(e,6))
    F=np.array([[2,.3],[.3,1]])
    G=np.array([[1,.1],[.1,2]])
    d,U=np.linalg.eigh(G)
    root=U@np.diag(np.sqrt(d))@U.T
    assert np.allclose(np.sort(np.linalg.eigvals(F@G)),np.linalg.eigvalsh(root@F@root))
    print('FG本征值',np.linalg.eigvalsh(root@F@root))

def crystal():
    for hkl in ([1,1,1],[1,1,0],[2,0,0]):
        points=np.array([[0,0,0],[.5,.5,.5]])
        F=np.exp(2j*np.pi*(points@hkl)).sum()
        print('I中心化',hkl,'强度因子',round(abs(F)**2,8))
    for l in range(1,6):
        factor=np.exp(2j*np.pi*l*np.arange(4)/4).sum()
        assert (abs(factor)<1e-8)==(l%4!=0)
    print('4_1螺旋轴00l：仅l为4的倍数时相位和非零')

def main():
    characters();projectors();huckel();naphthalene();two_levels();vibration();crystal()
    print('全部独立复现通过。完整覆盖项目见verify.cjs。')

if __name__=='__main__':main()
