"""Cotton chapter 2: exact permutation computations. Standard library only.
Run python examples.py. Permutations p store images of 0,1,2; compose(p,q)=p after q.
The printed table follows Cotton: column X times row Y.
"""
from itertools import product, combinations
E=(0,1,2)
r=(1,2,0)
s=(0,2,1)
def mul(p,q): return tuple(p[i] for i in q)
def inv(p): return tuple(p.index(i) for i in range(len(p)))
def power(p,n):
    out=E
    for _ in range(n):out=mul(out,p)
    return out
F=power(r,2)
elements=[E,s,mul(r,s),mul(F,s),r,F]
labels=['E','A','B','C','D','F']
name=dict(zip(elements,labels))
def generated(seed):
    out={E,*seed}
    while True:
        nxt=out|{mul(a,b) for a,b in product(out,repeat=2)}|{inv(a) for a in out}
        if nxt==out:return out
        out=nxt
def subgroups():
    out=[]
    for n in range(1,7):
        for S in combinations(elements,n):
            H=set(S)
            if E in H and generated(H)==H:out.append(H)
    return out
def cosets(H,left=True):
    seen=set();out=[]
    for x in elements:
        if x in seen:continue
        C={mul(x,h) if left else mul(h,x) for h in H}
        seen|=C;out.append(C)
    return out
def conj(a,x):return mul(mul(inv(x),a),x)
def classes():
    seen=set();out=[]
    for a in elements:
        if a in seen:continue
        C={conj(a,x) for x in elements};seen|=C;out.append(C)
    return out
def display(S):return '{'+','.join(name[x] for x in elements if x in S)+'}'
def audit():
    for a,b,c in product(elements,repeat=3):assert mul(mul(a,b),c)==mul(a,mul(b,c))
    for a in elements:assert mul(a,inv(a))==mul(inv(a),a)==E
    for H in subgroups():
        assert 6%len(H)==0
        for side in [True,False]:
            cs=cosets(H,side);assert sum(map(len,cs))==6
            assert len(set().union(*cs))==6
    for a in elements:
        C={conj(a,x) for x in elements}
        center={x for x in elements if mul(x,a)==mul(a,x)}
        assert len(C)*len(center)==6
if __name__=='__main__':
    audit()
    print('PASS: exact S3 permutation identities')
    print('row Y / col X',' '.join(labels))
    for y in elements:print(name[y],*[name[mul(x,y)] for x in elements])
    print('All subgroups:',*[display(H) for H in subgroups()])
    print('Left cosets of {E,A}:',*[display(C) for C in cosets({E,s})])
    print('Right cosets of {E,A}:',*[display(C) for C in cosets({E,s},False)])
    print('Conjugacy classes:',*[display(C) for C in classes()])
    print('Conjugates of A:',*[name[conj(s,x)] for x in elements])
    print('Exercise2.4 counterexample in C4: 1+1 mod4 =',2,'; 3+3 mod4 =',(3+3)%4)
