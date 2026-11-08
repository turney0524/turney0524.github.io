# 第 5 章 · 全同粒子 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 5.1 双粒子体系与交换对称性

原书 PDF 第 144—149 页。

两粒子的态是配置空间中的一个函数 $\Psi(\mathbf r_1,\mathbf r_2,t)$，归一化须对两个坐标积分。没有相互作用时可以用单粒子态的乘积，但有相互作用或交换约束时，单个乘积通常不够。

#### 推导：5.1.1 交换算符与两种统计

**步骤 1**

$$
H=-\frac{\hbar^2}{2m_1}\nabla_1^2-\frac{\hbar^2}{2m_2}\nabla_2^2+V(\mathbf r_1,\mathbf r_2)
$$

不同粒子先用一般质量。全同粒子还要求相同质量和对称的相互作用。

**步骤 2**

$$
P_{12}\Psi(1,2)=\Psi(2,1),\quad P_{12}^2=1\Rightarrow p^2=1
$$

交换两次回到原态，交换本征值只能为 ±1。

**步骤 3**

$$
\Psi_\pm=\frac{\psi_a(1)\psi_b(2)\pm\psi_b(1)\psi_a(2)}{\sqrt2}\quad(\langle a|b\rangle=0)
$$

正号适用玻色子，负号适用费米子。这里的归一化假设 a、b 正交且不同。

**步骤 4**

$$
\Psi_-\big|_{a=b}=0
$$

两个费米子不能占据同一完整单粒子态；完整态包含自旋。

> **不能只从对易关系推出统计类型** [H,P₁₂]=0 说明交换对称性可以保持；自然界选取整数自旋玻色子和半整数自旋费米子，是还需加入的物理规律。a=b 时玻色子态就是 ψa(1)ψa(2)，不能继续使用上面的 √2 分母。

#### 原书例5.1 · 无限深势阱里的两粒子能级

$$
K=\frac{\pi^2\hbar^2}{2ma^2},\qquad E_{n_1n_2}=(n_1^2+n_2^2)K
$$



先忽略自旋：可区分粒子基态 (1,1) 的能量为 2K，第一激发态 (1,2)、(2,1) 能量为 5K，有两个态。玻色子的同一基态能量仍为 2K；第一激发态只保留对称组合。费米子的最低允许态是 (1,2) 的反对称组合，能量 5K；下一个是 (1,3)，能量 10K。若允许电子处在不同自旋态，两个电子可以同时占据同一空间轨道。

### 5.1.2 交换力：不是多出一个势能

#### 推导：粒子平均间距平方中的交叉项

**步骤 1**

$$
D_{\rm dist}=\langle x^2\rangle_a+\langle x^2\rangle_b-2\langle x\rangle_a\langle x\rangle_b
$$

分别展开 (x₁−x₂)²，对乘积态积分。

**步骤 2**

$$
\langle a(1)b(2)|x_1x_2|b(1)a(2)\rangle=|\langle a|x|b\rangle|^2
$$

两个一维积分互为复共轭。x₁²、x₂² 的交换交叉项因正交性为零。

**步骤 3**

$$
D_\pm=D_{\rm dist}\mp2|\langle a|x|b\rangle|^2
$$

玻色子在这个指标下更靠近，费米子更分离。这来自态的对称性而不是额外的经典力。

**互动：两粒子的联合概率，怎样被交换改变**（请在同章 HTML 中运行，源码可展开。）

两个电子的总态必须反对称。自旋单态反对称，所以空间态对称；自旋三重态对称，所以空间态反对称。讨论化学键之前必须先把这两个部分一起检查。

## 5.2 原子：氦与周期表

原书 PDF 第 149—155 页。

#### 推导：5.2.1 氦原子的第一近似

**步骤 1**

$$
H=\sum_{i=1}^2\left[-\frac{\hbar^2}{2m}\nabla_i^2-\frac{2e^2}{4\pi\epsilon_0r_i}\right]+\frac{e^2}{4\pi\epsilon_0r_{12}}
$$

最后一项使两个电子的运动耦合，不能再精确分离成两个氢原子。

**步骤 2**

$$
E^{(0)}=2Z^2E_{\rm H}=8E_{\rm H}\simeq-108.8\ {\rm eV}\quad(Z=2)
$$

忽略排斥时两个电子都在 1s 轨道，配成自旋单态。这个数明显低于实验约 −79 eV，说明排斥项不能忽略。

**步骤 3**

$$
J=\iint |a(1)|^2|b(2)|^2V_{12}\,d^3r_1d^3r_2,\quad K=\iint a^*(1)b^*(2)V_{12}b(1)a(2)\,d^3r_1d^3r_2
$$

对不同正交空间轨道，分别定义直接积分与交换积分。

**步骤 4**

$$
E_\pm=E_a+E_b+J\pm K
$$

空间对称的单态取 +；空间反对称的三重态取 −。正的 K 使三重态较低，体现交换在谱中的效果。

### 5.2.2 为什么周期表有壳层结构

$$
N_l=2(2l+1),\qquad N_n=\sum_{l=0}^{n-1}2(2l+1)=2n^2
$$

磁量子数有 2l+1 个，再乘两个自旋方向。

多电子屏蔽打破纯 Coulomb 势的同 n 简并，实际填充要比较各轨道能量。Hund 规则把同一壳层的交换与电子排斥概括为优先最大总自旋等经验规律。原子项符号为 $^{2S+1}L_J$；L 用 S、P、D、F 等字母表示，J 是轨道与自旋相加后的总角动量。不要把壳层容量直接当作实际能量排序。

## 5.3 固体：自由电子气与能带

原书 PDF 第 155—162 页。

#### 推导：5.3.1 正八分之一球内计数

**步骤 1**

$$
k_i=\frac{n_i\pi}{L},\quad\Delta^3k=\frac{\pi^3}{V},\quad N=2\frac{(1/8)(4\pi k_F^3/3)}{\pi^3/V}=\frac{Vk_F^3}{3\pi^2}
$$

硬壁立方盒用正整数；因子 2 是自旋。大体积极限忽略边界误差。

**步骤 2**

$$
E_F=\frac{\hbar^2}{2m}(3\pi^2N/V)^{2/3},\quad dN=\frac{V}{\pi^2}k^2dk
$$

T=0 时按 Pauli 原理从低到高填到 Fermi 面。

**步骤 3**

$$
U=\frac{V\hbar^2}{2m\pi^2}\int_0^{k_F}k^4dk=\frac35NE_F
$$

能量积分多一个 k²，因此平均能量不是 EF/2。

**步骤 4**

$$
P=-\left(\frac{\partial U}{\partial V}\right)_N=\frac{2U}{3V}
$$

固定粒子数时 U∝V⁻²ᐟ³。零温仍有简并压。

#### 推导：5.3.2 周期势与 Bloch 定理

**步骤 1**

$$
[H,T_a]=0,\quad T_a\psi=e^{iKa}\psi\Rightarrow\psi(x)=e^{iKx}u(x),\quad u(x+a)=u(x)
$$

平移算符幺正，所以本征值模为 1。Bloch 波不是只有一个平面波分量。

**步骤 2**

$$
\psi(x+Na)=\psi(x)\Rightarrow K=\frac{2\pi j}{Na}
$$

环形边界给 N 个互不等价的 K，取一个 Brillouin 区即可。

**步骤 3**

$$
V(x)=\alpha\sum_j\delta(x-ja),\quad D=\begin{pmatrix}1&0\\2m\alpha/\hbar^2&1\end{pmatrix},\quad P=\begin{pmatrix}\cos ka&\sin ka/k\\-k\sin ka&\cos ka\end{pmatrix}
$$

把一周期分为自由传播和 δ 跳跃，作用在 (ψ,ψ′) 上。

**步骤 4**

$$
2\cos Ka={\rm tr}(DP)=2\cos ka+\frac{2m\alpha}{\hbar^2k}\sin ka
$$

周期矩阵行列式为 1，本征值为 e±iKa。

**步骤 5**

$$
\cos Ka=\cos z+\beta\frac{\sin z}{z},\quad z=ka,\quad\beta=\frac{m\alpha a}{\hbar^2}
$$

右边绝对值不超过 1 才有实 K；超出区间就是禁带。每条带每种自旋容纳 N 个态。

**互动：只有右侧落在 [−1,1]，才有实数 Bloch 波数**（请在同章 HTML 中运行，源码可展开。）

## 5.4 量子统计力学

原书 PDF 第 162—173 页。

### 5.4.1 从微观态数开始，而不是直接背分布

#### 原书的三粒子计数例 · 同样的总能量，不同的概率空间

$$
n_1^2+n_2^2+n_3^2=363:\quad(11,11,11),\ (5,13,13),\ (1,1,19),\ (5,7,17)
$$



可区分粒子对应排列数 1、3、3、6，共 13 个微观态。玻色子每种占据各算一个，共 4 个；无自旋费米子只允许最后一个配置。例如随机取一个粒子落在 n=11 的概率，可区分情形为 1/13，玻色子为 1/4，费米子为 0。差别来自先数系统态，再计算粒子概率。

#### 推导：5.4.2—5.4.3 计数、约束与最概然分布

**步骤 1**

$$
W_{\rm MB}=N!\prod_i\frac{d_i^{N_i}}{N_i!},\quad W_{\rm FD}=\prod_i\frac{d_i!}{N_i!(d_i-N_i)!},\quad W_{\rm BE}=\prod_i\frac{(N_i+d_i-1)!}{N_i!(d_i-1)!}
$$

能量组 i 含 di 个单粒子态，放入 Ni 个粒子。FD 是选格子，BE 是隔板法；MB 保留粒子标签。

**步骤 2**

$$
\delta\left[\ln W-\alpha\sum_iN_i-\beta\sum_iN_i\epsilon_i\right]=0
$$

固定总数与总能量，用两个 Lagrange 乘子极大化 lnW。

**步骤 3**

$$
\partial_{N_i}\ln W=\ln(d_i/N_i),\quad\ln[(d_i-N_i)/N_i],\quad\ln[(N_i+d_i)/N_i]
$$

依次为 MB、FD、BE；使用 Stirling 近似，所以每组应包含足够多的态和粒子。

**步骤 4**

$$
\bar n_i=\frac{N_i}{d_i}=e^{-\alpha-\beta\epsilon_i},\quad\frac1{e^{\alpha+\beta\epsilon_i}+1},\quad\frac1{e^{\alpha+\beta\epsilon_i}-1}
$$

把前一步分别等于 α+βεi，再代数求解。

**步骤 5**

$$
\beta=\frac1{k_BT},\quad\alpha=-\frac\mu{k_BT}
$$

由温度与能量交换、粒子交换的热力学定义识别乘子。

### 5.4.4 三种分布的极限

当 $(\epsilon-\mu)/k_BT\gg1$ 时 ±1 均可忽略，量子分布回到稀薄的 Maxwell–Boltzmann 极限。FD 在零温成为 ε<μ 的全占据阶跃；BE 要求 μ 不高于最低单粒子能量，最低态的宏观占据须单独处理。

**互动：三种计数，三条占据曲线**（请在同章 HTML 中运行，源码可展开。）

#### 推导：5.4.5 黑体谱：态密度乘每模平均能量

**步骤 1**

$$
\frac{g(\omega)}Vd\omega=\frac{\omega^2}{\pi^2c^3}d\omega,\qquad\bar n=\frac1{e^{\hbar\omega/k_BT}-1}
$$

计入光的两个横向偏振；光子数不守恒，所以 μ=0。

**步骤 2**

$$
u_\omega=\frac{\hbar\omega^3}{\pi^2c^3}\frac1{e^{\hbar\omega/k_BT}-1}
$$

每个模的热能为 ℏω n̄。这里不把零点能算入热辐射能量。

**步骤 3**

$$
u_\lambda=u_\omega\left|\frac{d\omega}{d\lambda}\right|=\frac{8\pi hc}{\lambda^5}\frac1{e^{hc/(\lambda k_BT)}-1}
$$

ω=2πc/λ，必须乘 Jacobian，不能只替换横轴。

**步骤 4**

$$
u=\int_0^\infty u_\omega d\omega=\frac{\pi^2k_B^4}{15\hbar^3c^3}T^4
$$

换元 x=ℏω/kBT 后，使用 ∫x³/(eˣ−1)dx=π⁴/15。各向同性辐射的出射通量为 cu/4。

**互动：加热后，谱峰向哪边走？**（请在同章 HTML 中运行，源码可展开。）

**自测：频率谱的峰换成波长，等于波长谱的峰吗？**

<details><summary>查看答案</summary>

不等。谱是单位频率或单位波长中的能量；改变区间度量须乘 Jacobian，因此两种曲线的极大值并不直接对应。

</details>

## 原书对应清单

- 5.1：两粒子归一化、交换公设、例5.1及交换间距积分
- 5.2：氦近似、直接与交换积分、壳层和项符号
- 5.3：Fermi 计数、简并压、Bloch 与 δ 晶格色散
- 5.4：原书三粒子计数、三种统计的极值推导、Planck 谱