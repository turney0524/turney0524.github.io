"""第三章：独立 NumPy 算例。运行 python3 examples.py；依赖 numpy。"""
import numpy as np

I = np.eye(3)

def rotation(axis, angle):
    """右手主动转动；angle 单位为弧度，列向量约定。"""
    u = np.asarray(axis, dtype=float)
    u /= np.linalg.norm(u)
    x, y, z = u
    K = np.array([[0, -z, y], [z, 0, -x], [-y, x, 0]])
    return np.cos(angle)*I + (1-np.cos(angle))*np.outer(u,u) + np.sin(angle)*K

def reflection(normal):
    u = np.asarray(normal, dtype=float)
    u /= np.linalg.norm(u)
    return I - 2*np.outer(u,u)

def element_order(M, limit=240):
    P = I.copy()
    for k in range(1, limit+1):
        P = P @ M
        if np.allclose(P, I, atol=1e-8):
            return k
    raise ValueError('未在给定上限内回到恒等操作')

def preserves(atoms, M):
    """每个原子必须匹配同类型且尚未占用的位置；不能只比较无类型点云。"""
    used = set()
    for kind, point in atoms:
        q = M @ np.asarray(point)
        candidates = [j for j,(t,p) in enumerate(atoms)
                      if j not in used and t == kind and np.allclose(p,q,atol=1e-8)]
        if not candidates:
            return False
        used.add(candidates[0])
    return True

def closure(generators):
    result = [I.copy()]
    cursor = 0
    while cursor < len(result):
        for g in generators:
            M = g @ result[cursor]
            if not any(np.allclose(M,N,atol=1e-8) for N in result):
                result.append(M)
                if len(result)>240:
                    raise ValueError('未闭合：请检查生成元或数值误差')
        cursor += 1
    return result

def ethane(beta=60):
    atoms = [('C',(0,0,z)) for z in (-.45,.45)]
    for z,offset in ((.8,0),(-.8,np.deg2rad(beta))):
        for k in range(3):
            a = 2*np.pi*k/3+offset
            atoms.append(('H',(np.cos(a),np.sin(a),z)))
    return atoms

def ferrocene(beta):
    """省略氢的理想化同心环模型；等价的氢环不改变这里的点群。"""
    b = np.deg2rad(beta)
    atoms = [('Fe',(0,0,0))]
    for z,offset in ((.8,0),(-.8,b)):
        for k in range(5):
            a = 2*np.pi*k/5+offset
            atoms.append(('C',(np.cos(a),np.sin(a),z)))
    C5 = rotation([0,0,1],2*np.pi/5)
    C2 = rotation([np.cos(b/2),np.sin(b/2),0],np.pi)
    generators = [C5,C2]
    if np.isclose(beta,0):
        generators.append(reflection([0,0,1]))
    elif np.isclose(beta,36):
        generators.append(reflection([0,0,1]) @ rotation([0,0,1],np.pi/5))
    return atoms,closure(generators)

def main():
    horizontal = reflection([0,0,1])
    C6 = rotation([0,0,1],np.pi/3)
    atoms = ethane()
    results = [preserves(atoms,M) for M in (C6,horizontal,horizontal@C6)]
    print('交错乙烷：单独 C6、单独 σh、组合 S6 是否成立：',results)
    assert results == [False,False,True]
    for n in range(1,11):
        Sn = horizontal @ rotation([0,0,1],2*np.pi/n)
        actual = element_order(Sn)
        assert actual == (n if n%2==0 else 2*n)
        print(f'S{n} 的元素阶 = {actual}')
    for phi in (15,30,45,60,72,90):
        p = np.deg2rad(phi)
        s1 = reflection([0,1,0])
        s2 = reflection([-np.sin(p),np.cos(p),0])
        assert np.allclose(s2@s1,rotation([0,0,1],2*p),atol=1e-8)
    print('两镜面乘积 = 绕交线转动 2φ：全部通过')
    for beta,name,expected in ((0,'D5h',20),(18,'D5',10),(36,'D5d',20)):
        atoms,ops = ferrocene(beta)
        assert len(ops)==expected and all(preserves(atoms,M) for M in ops)
        print(f'二茂铁相对角 {beta}°：{name}，{len(ops)} 个操作')
    print('全部算例通过。完整点群与共轭类核验见 source/verify.cjs。')

if __name__ == '__main__':
    main()
