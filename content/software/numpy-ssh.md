---
{"slug":"numpy-ssh","title":"NumPy 实战：用一张矩阵算出 SSH 开链","category":"software","summary":"构造有限链的厄米矩阵，计算能谱、边界权重和本征方程残差，附可下载代码。","date":"2026-11-08","tags":["Python","NumPy","紧束缚"],"minutes":10,"label":"可运行代码"}
---
从一维交替链开始，练习一个常用工作流：写下模型 → 选择基底 → 构造矩阵 → 对角化 → 检查结果。这里只需 Python 和 NumPy；浏览器中的能带图使用独立的解析表达式。

## 1. 安装与运行

```sh
python -m pip install numpy
python ssh_chain.py
```

[下载完整示例 ssh_chain.py](../examples/ssh_chain.py)。建议在自己的虚拟环境中运行。

## 2. 把物理键放进矩阵

令基底按 $A_0,B_0,A_1,B_1,\ldots$ 排列。胞内键连接 $2j$ 与 $2j+1$，胞间键连接 $2j+1$ 与 $2j+2$。开边界不连接链尾与链头。

```python
import numpy as np


def ssh_hamiltonian(cells=24, t1=0.6, t2=1.0):
    H = np.zeros((2 * cells, 2 * cells), dtype=float)
    for j in range(cells):
        a, b = 2 * j, 2 * j + 1
        H[a, b] = H[b, a] = t1
        if j + 1 < cells:
            H[b, a + 2] = H[a + 2, b] = t2
    return H
```

对实跃迁，反向矩阵元相同；若跃迁包含复相位，反向元应取复共轭，保证 $H=H^\dagger$。

## 3. 用 eigh 对角化

```python
H = ssh_hamiltonian()
energies, states = np.linalg.eigh(H)
nearest = np.argsort(np.abs(energies))[:2]

for index in nearest:
    psi = states[:, index]
    edge_weight = np.sum(np.abs(psi[[0, 1, -2, -1]]) ** 2)
    residual = np.linalg.norm(H @ psi - energies[index] * psi)
    print(energies[index], edge_weight, residual)
```

NumPy 的 [`numpy.linalg.eigh`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eigh.html)用于厄米或实对称矩阵，返回按升序排列的本征值，本征向量存放在列中。因此第 i 个态是 `states[:, i]`，不是 `states[i, :]`。

## 4. 不要只看到“接近零”就下结论

当前边界保留两端的胞内键，取 $t_1<t_2$ 时，长链存在靠近零能的端态。有限链两端仍有微弱耦合，两个能量通常有小分裂，并非机器精度下严格为零。

如果两个态高度接近简并，对角化程序可能返回分布在两端的对称或反对称组合；要构造分别局域在左右端的态，可在这个二维子空间内进一步对位置算符对角化。

检查至少三个量：厄米性、归一化和本征方程残差。再改变链长，观察小分裂是否随长度减小。把 $t_1$ 改为 1.4，比较相同边界下的结果；同时画出波函数空间分布，不要只盯着能量表。

> 本例是非相互作用、无自旋、开边界的紧束缚模型。相互作用多体问题的 Hilbert 空间增长与求解方式不同，不能直接用这个 2N×2N 矩阵代替。

## 继续学习

- [SSH 经典文献的模型入口](ssh-reading.html)
- [Bloch 定理与周期体系](bloch.html)
- [可复现计算合集](../collection-computing.html)
