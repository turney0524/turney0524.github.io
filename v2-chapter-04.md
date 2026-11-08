# 第 4 章 · 三维空间中的量子力学 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 4.1 球坐标系中的薛定谔方程

原书 PDF 第 97—106 页。

三维中动量为 $-i\hbar\nabla$，哈密顿量 $H=-(\hbar^2/2m)\nabla^2+V$。归一化用体积元 $d^3r=r^2\sin\theta\,dr\,d\theta\,d\phi$。在中心势 $V(r)$ 下写 $\psi=R(r)\Theta(\theta)\Phi(\phi)$，分离不仅省计算，还揭示了能量与角动量量子数的来源。

### 4.1.1—4.1.2 分离角度变量

#### 推导：球坐标 Laplacian 与两个分离常数

**步骤 1**

$$
\nabla^2=\frac1{r^2}\partial_r(r^2\partial_r)+\frac1{r^2\sin\theta}\partial_\theta(\sin\theta\partial_\theta)+\frac1{r^2\sin^2\theta}\partial_\phi^2
$$

这三个项都必须保留；球坐标不是把普通二阶导数简单相加。

**步骤 2**

$$
\frac1R\frac d{dr}\left(r^2\frac{dR}{dr}\right)+\frac{2mr^2}{\hbar^2}(E-V)=l(l+1)
$$

将定态方程除以 RY 后，径向与角向分别等于常数。l(l+1) 是为以后角动量本征值方便而命名。

**步骤 3**

$$
\frac1{\sin\theta}\partial_\theta(\sin\theta\partial_\theta Y)+\frac1{\sin^2\theta}\partial_\phi^2Y=-l(l+1)Y
$$

剩余是所有中心势共有的角方程。

**步骤 4**

$$
\Phi\prime\prime=-m_l^2\Phi\Rightarrow\Phi=e^{im_l\phi},\quad m_l\in\mathbb Z
$$

φ→φ+2π 的单值性要求整数。这里 ml 是磁量子数，不是粒子质量。

**步骤 5**

$$
\frac1{\sin\theta}\frac d{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right)+\left[l(l+1)-\frac{m_l^2}{\sin^2\theta}\right]\Theta=0
$$

φ 项除以 Φ 后变成常数。

**步骤 6**

$$
z=\cos\theta\Rightarrow(1-z^2)\Theta\prime\prime-2z\Theta\prime+\left[l(l+1)-\frac{m_l^2}{1-z^2}\right]\Theta=0
$$

利用 d/dθ=−sinθ d/dz，得到缔合 Legendre 方程。

**步骤 7**

$$
l=0,1,2,\ldots,\quad |m_l|\le l,\quad Y_l^{m_l}=N_{lm}P_l^{m_l}(\cos\theta)e^{im_l\phi}
$$

两个极点的正则性筛出 l 和 ml 的允许范围。不同的缔合多项式相位约定会改变 N 的符号。

采用常见的 Condon–Shortley 约定时，$Y_0^0=1/\sqrt{4\pi}$，$Y_1^0=\sqrt{3/(4\pi)}\cos\theta$，$Y_1^{\pm1}=\mp\sqrt{3/(8\pi)}\sin\theta e^{\pm i\phi}$。它们按球面立体角积分正交归一。

#### 推导：角方程的多项式条件：先从 m=0 的 Legendre 方程算起

**步骤 1**

$$
(1-z^2)y\prime\prime-2zy\prime+\lambda y=0,\quad y=\sum_{j=0}^\infty a_jz^j
$$

暂不把分离常数预设为 l(l+1)。m=0 已能显示正则条件如何选出它。

**步骤 2**

$$
(j+1)(j+2)a_{j+2}+[\lambda-j(j+1)]a_j=0
$$

z²y″、2zy′ 和 λy 中的 zʲ 系数分别收集。

**步骤 3**

$$
a_{j+2}=\frac{j(j+1)-\lambda}{(j+1)(j+2)}a_j
$$

偶、奇系数各自组成一条链。一般不终止的分支在极点不能保持所需的正则性。

**步骤 4**

$$
\lambda=l(l+1)\Rightarrow a_{l+2}=0,\quad P_l(z)=\frac1{2^ll!}\frac{d^l}{dz^l}(z^2-1)^l
$$

选择相应宇称的截断链；Rodrigues 公式固定 Pl(1)=1。

**步骤 5**

$$
P_0=1,\quad P_1=z,\quad P_2=(3z^2-1)/2
$$

将它们直接代回方程，分别检查 λ=0、2、6。

**步骤 6**

$$
P_l^m(z)=(-1)^m(1-z^2)^{m/2}\frac{d^mP_l}{dz^m}\quad(0\le m\le l)
$$

求导并乘端点因子产生一般 m 解；m>l 时多项式求导为零。负 m 由复共轭与归一化关系补齐。

**步骤 7**

$$
Y_l^m=\sqrt{\frac{2l+1}{4\pi}\frac{(l-m)!}{(l+m)!}}P_l^m(\cos\theta)e^{im\phi}
$$

这里将 Condon–Shortley 相位放在 Plm 的定义中，不再重复乘 (−1)m。

球谐归一化分成两个积分：φ 项给 2π；z=cosθ 后，缔合 Legendre 的平方积分为 $2(l+m)!/[(2l+1)(l-m)!]$。二者相乘恰好抵消上面的常数平方。角函数在球面上是振幅分布，不能把一张轨道截面图当作粒子运行的轨迹。

### 4.1.3 径向方程：解释为什么令 u=rR

#### 推导：把一阶导数项严格消去

**步骤 1**

$$
R=\frac ur,\quad R\prime=\frac{ru\prime-u}{r^2},\quad\frac d{dr}(r^2R\prime)=ru\prime\prime
$$

代换的作用不是猜一个新物理量，而是简化微分表达式。

**步骤 2**

$$
-\frac{\hbar^2}{2m}u\prime\prime+\left[V(r)+\frac{\hbar^2l(l+1)}{2mr^2}\right]u=Eu
$$

离心势随 l 增大而升高。

**步骤 3**

$$
\int|\psi|^2d^3r=\int_0^\infty|R|^2r^2dr\int|Y|^2d\Omega=\int_0^\infty|u|^2dr=1
$$

u 的模平方是径向概率密度，但 u 定义在半轴，还须满足原点的合适边界。

#### 原书例4.1 · 无限深球势阱的 l=0 与一般 l

$$
l=0:\quad u=A\sin kr+B\cos kr,\quad u(0)=u(a)=0\Rightarrow k_n=n\pi/a
$$



$$
\psi_{n00}=\frac1{\sqrt{2\pi a}}\frac{\sin(n\pi r/a)}r,\quad E_{n0}=\frac{n^2\pi^2\hbar^2}{2ma^2}
$$



原点的 u(0)=0 取自通常无点相互作用的正则径向问题；不能仅说 1/r 发散就断言不平方可积。一般 l 的正则解为 $R=A j_l(kr)$，丢弃原点奇异的 Neumann 分支，再由 $j_l(ka)=0$ 数值求谱。$j_0(z)=\sin z/z$ 恰好回到上述结果。

## 4.2 氢原子

原书 PDF 第 106—117 页。

先把质子视为固定；若计入核运动，以约化质量 μ 代替 m。势能为 $-e^2/(4\pi\epsilon_0r)$。束缚谱 E<0，不等于这个势没有连续散射谱；本节只集中求负能量本征态。

### 4.2.1 径向方程的幂级数解

#### 推导：量子数 n 从哪里出现：逐项保留渐近因子

**步骤 1**

$$
\kappa=\sqrt{-2\mu E}/\hbar,\quad\rho=\kappa r,\quad\rho_0=\frac{\mu e^2}{2\pi\epsilon_0\hbar^2\kappa}
$$

将径向方程写成纯数变量。

**步骤 2**

$$
\frac{d^2u}{d\rho^2}=\left[1-\frac{\rho_0}{\rho}+\frac{l(l+1)}{\rho^2}\right]u
$$

远处由常数 1 控制，近原点由离心项控制。

**步骤 3**

$$
u\sim e^{-\rho}\ (\rho\to\infty),\quad u\sim\rho^{l+1}\ (\rho\to0)
$$

增长的 expρ 不可归一化；原点选正则分支。l=0 时结论还需用原点边界，而不是由不存在的离心项直接推出。

**步骤 4**

$$
u=\rho^{l+1}e^{-\rho}v(\rho)\Rightarrow\rho v\prime\prime+2(l+1-\rho)v\prime+[\rho_0-2(l+1)]v=0
$$

将一阶、二阶导数展开后，1/ρ² 项恰好抵消。

**步骤 5**

$$
v=\sum_{j=0}^\infty c_j\rho^j\Rightarrow c_{j+1}=\frac{2(j+l+1)-\rho_0}{(j+1)(j+2l+2)}c_j
$$

对 ρʲ 项统一求和指标并比较系数。

**步骤 6**

$$
j\gg1:\ c_{j+1}\approx\frac2{j+1}c_j\Rightarrow v\sim e^{2\rho}
$$

如果不终止，u 的远场会重新长成 expρ，违背束缚条件。

**步骤 7**

$$
\rho_0=2(j_{max}+l+1)=2n,\quad n=1,2,\ldots
$$

终止条件定义主量子数 n；因为 jmax≥0，必有 l≤n−1。

**步骤 8**

$$
\kappa=\frac1{na_\mu},\quad a_\mu=\frac{4\pi\epsilon_0\hbar^2}{\mu e^2},\quad E_n=-\frac{\mu e^4}{2(4\pi\epsilon_0)^2\hbar^2n^2}
$$

先由 ρ₀=2n 解 κ，再代回 E=−ℏ²κ²/(2μ)。不要跳过这一步只给 Bohr 公式。

#### 推导：1s 基态的归一化与径向概率

**步骤 1**

$$
n=1,l=0:\quad R_{10}=Ce^{-r/a_\mu},\quad1=|C|^2\int_0^\infty r^2e^{-2r/a_\mu}dr
$$

取 jmax=0，剩余多项式只是常数。

**步骤 2**

$$
\int_0^\infty r^2e^{-br}dr=\frac2{b^3}\Rightarrow C=2a_\mu^{-3/2}
$$

积分可由 ∫exp(−br)dr=1/b 对 b 连续求两次导数得到。

**步骤 3**

$$
\psi_{100}=\frac{e^{-r/a_\mu}}{\sqrt{\pi a_\mu^3}},\quad P_r(r)=4r^2a_\mu^{-3}e^{-2r/a_\mu}
$$

先把归一化球谐 Y00 乘回来，再对角度积分。

**步骤 4**

$$
\frac d{dr}\ln P_r=\frac2r-\frac2{a_\mu}=0\Rightarrow r_{mode}=a_\mu,\quad\langle r\rangle=\frac32a_\mu
$$

最可能半径与点密度最大处 r=0、平均半径均不同。

$$
R_{20}=\frac{(2-r/a_\mu)e^{-r/(2a_\mu)}}{2\sqrt2\,a_\mu^{3/2}},\quad R_{21}=\frac{(r/a_\mu)e^{-r/(2a_\mu)}}{2\sqrt6\,a_\mu^{3/2}}
$$

n=2 的 l=0 链有一次多项式；l=1 链在常数处终止。分别归一化得到这两个系数。

一般解可用缔合 Laguerre 多项式表示。写 x=2r/(naμ) 时，$R_{nl}=\sqrt{(2/(na_\mu))^3 (n-l-1)!/[2n(n+l)!]}\,e^{-x/2}x^l L_{n-l-1}^{2l+1}(x)$。不同教材的 Laguerre 定义可能带阶乘或符号；比较时应先核对定义，再比较常数。

### 4.2.2 光谱与简并度

$$
d_n=\sum_{l=0}^{n-1}(2l+1)=n^2,\quad h\nu=E_{n_i}-E_{n_f},\quad\frac1\lambda=R_H\left(\frac1{n_f^2}-\frac1{n_i^2}\right)
$$



这里的 n² 是空间简并度，尚未乘电子自旋的 2。相同 n 的不同 l 简并是 Coulomb 势的特殊性质；一般中心势只保证同一 l 的不同 ml 简并。电子处于定态时不按一条经典圆轨道连续辐射。

**互动：点密度与球壳概率，不是同一个问题**（请在同章 HTML 中运行，源码可展开。）

**互动：轨道的颜色表示相位，不是电荷正负**（请在同章 HTML 中运行，源码可展开。）

## 4.3 角动量

原书 PDF 第 117—124 页。

#### 推导：4.3.1 先不用 l 命名：上下端如何确定总角动量

**步骤 1**

$$
L^2|\lambda,m\rangle=\hbar^2\lambda|\lambda,m\rangle,\quad L_z|\lambda,m\rangle=\hbar m|\lambda,m\rangle
$$

λ 先是待定数。因 L²−Lz²=Lx²+Ly² 非负，有 m²≤λ，所以阶梯有界。

**步骤 2**

$$
0=\|L_+|\lambda,m_{max}\rangle\|^2=\hbar^2[\lambda-m_{max}(m_{max}+1)]
$$

到最高点升阶必须湮灭，否则产生更大的 m。

**步骤 3**

$$
0=\|L_-|\lambda,m_{min}\rangle\|^2=\hbar^2[\lambda-m_{min}(m_{min}-1)]
$$

最低点同理。

**步骤 4**

$$
(m_{max}+m_{min})(m_{max}-m_{min}+1)=0\Rightarrow m_{min}=-m_{max}
$$

第二因子严格为正。

**步骤 5**

$$
l=m_{max},\quad\lambda=l(l+1),\quad2l=m_{max}-m_{min}\in\{0,1,2,\ldots\}
$$

两端用整数步连接，故一般角动量允许整数和半整数；轨道单值性进一步只留整数。

#### 推导：从 r×p 到升降算符的本征值

**步骤 1**

$$
L_x=yp_z-zp_y,\quad[L_x,L_y]=i\hbar L_z,\quad[L^2,L_i]=0
$$

逐项展开，用 [xi,pj]=iℏδij，异方向坐标与动量对易；循环置换给出另两式。

**步骤 2**

$$
L_\pm=L_x\pm iL_y,\quad[L_z,L_\pm]=\pm\hbar L_\pm,\quad[L^2,L_\pm]=0
$$

升降操作改变 mz，不改变总角动量长度。

**步骤 3**

$$
L_\mp L_\pm=L^2-L_z^2\mp\hbar L_z
$$

保留 Lx、Ly 的对易项。

**步骤 4**

$$
\lVert L_\pm|l,m\rangle\rVert^2=\hbar^2[l(l+1)-m(m\pm1)]
$$

用范数非负限制阶梯上下端。

**步骤 5**

$$
L_+|l,l\rangle=0,\quad L_-|l,-l\rangle=0,\quad m=-l,-l+1,\ldots,l
$$

上下端条件加上每次跳一个单位，要求 2l 为整数。一般角动量可为半整数，轨道的单值球谐表示只给整数 l。

**步骤 6**

$$
L^2|l,m\rangle=\hbar^2l(l+1)|l,m\rangle,\quad L_z|l,m\rangle=\hbar m|l,m\rangle
$$

总长度的平方不等于最大 z 分量的平方。

### 4.3.2 对应本征函数就是球谐

$$
L_z=-i\hbar\partial_\phi,\quad L^2=-\hbar^2\left[\frac1{\sin\theta}\partial_\theta(\sin\theta\partial_\theta)+\frac1{\sin^2\theta}\partial_\phi^2\right]
$$



将这些算符作用在 $Y_l^m$，分别返回 ℏm 与 ℏ²l(l+1)。这说明前面分离方程中暂时命名的常数确实是角动量本征值，而不是两套不相干的巧合。

**互动：在一套固定 l 的态中上下移动**（请在同章 HTML 中运行，源码可展开。）

## 4.4 自旋

原书 PDF 第 124—143 页。

### 4.4.1 自旋 1/2：矩阵、投影与一个完整算例

$$
S_x=\frac\hbar2\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad S_y=\frac\hbar2\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad S_z=\frac\hbar2\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$



#### 推导：解 Sx 的本征问题，再求一般旋量的测量统计

**步骤 1**

$$
\det(S_x-sI)=s^2-\hbar^2/4=0\Rightarrow s=\pm\hbar/2
$$

与 Sz 的可能值一致，但本征基不同。

**步骤 2**

$$
|\pm x\rangle=\frac1{\sqrt2}\begin{pmatrix}1\\\pm1\end{pmatrix},\quad |\chi\rangle=\begin{pmatrix}a\\b\end{pmatrix}
$$

|a|²+|b|²=1。

**步骤 3**

$$
P(\pm z)=\{|a|^2,|b|^2\},\quad P(\pm x)=\frac12|a\pm b|^2
$$

概率是与相应本征矢内积的模平方，不能把旋量分量不加变换地用于所有轴。

#### 原书例4.2 · χ=((1+i),2)ᵀ/√6

$$
P(+z)=\tfrac13,\quad P(-z)=\tfrac23,\quad P(+x)=\frac{|3+i|^2}{12}=\frac56,\quad P(-x)=\frac{|-1+i|^2}{12}=\frac16
$$



$$
\langle S_x\rangle=\frac\hbar2(\tfrac56-\tfrac16)=\hbar/3
$$

可另用 χ†Sxχ 验证。两种算法相同，说明投影概率与算符平均一致。

**互动：把自旋制备方向与测量结果分开**（请在同章 HTML 中运行，源码可展开。）

### 4.4.2 磁场中的电子：Larmor 与 Stern–Gerlach

#### 推导：均匀磁场让两个分量积累不同相位

**步骤 1**

$$
H=-\gamma BS_z,\quad |\chi(0)\rangle=\begin{pmatrix}\cos(\alpha/2)\\\sin(\alpha/2)\end{pmatrix}
$$

γ 是含符号的回转磁比；不把电子的负磁矩符号藏掉。

**步骤 2**

$$
|\chi(t)\rangle=\begin{pmatrix}e^{i\gamma Bt/2}\cos(\alpha/2)\\e^{-i\gamma Bt/2}\sin(\alpha/2)\end{pmatrix}
$$

分别乘两个能量本征态的时间因子。

**步骤 3**

$$
\langle S_x\rangle=\frac\hbar2\sin\alpha\cos(\gamma Bt),\quad\langle S_y\rangle=-\frac\hbar2\sin\alpha\sin(\gamma Bt),\quad\langle S_z\rangle=\frac\hbar2\cos\alpha
$$

两分量的相对相位转化成横向期待值进动。

**步骤 4**

$$
F_z=-\partial_zH=\gamma S_z\,\partial_zB
$$

非均匀场还产生依赖自旋投影的力，才能把两种结果在空间分离；均匀场只有转矩而没有这个净分束力。

### 4.4.3 两个角动量的合成

#### 推导：以两个自旋 1/2 为例，自己构造三重态与单态

**步骤 1**

$$
|1,1\rangle=|\uparrow\uparrow\rangle,\quad S_-=S_{1-}+S_{2-}
$$

最高磁量子数只能来自两个向上态。

**步骤 2**

$$
S_-|1,1\rangle=\hbar(|\downarrow\uparrow\rangle+|\uparrow\downarrow\rangle)=\hbar\sqrt2|1,0\rangle
$$

用总角动量的降阶系数固定归一化。

**步骤 3**

$$
|1,0\rangle=\frac{|\uparrow\downarrow\rangle+|\downarrow\uparrow\rangle}{\sqrt2},\quad |1,-1\rangle=|\downarrow\downarrow\rangle
$$

再次降阶得到最低态。

**步骤 4**

$$
|0,0\rangle=\frac{|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle}{\sqrt2}
$$

在 m=0 的二维子空间找一个与三重态正交的组合。总升降算符都将其湮灭。

**步骤 5**

$$
S^2=S_1^2+S_2^2+2\mathbf S_1\cdot\mathbf S_2
$$

因此三重态的 S1·S2=ℏ²/4，单态为 −3ℏ²/4；分别给总 S²=2ℏ² 与 0。

$$
j=|j_1-j_2|,\ldots,j_1+j_2,\quad|j,m\rangle=\sum_{m_1+m_2=m}C^{jm}_{j_1m_1,j_2m_2}|j_1m_1\rangle|j_2m_2\rangle
$$



Clebsch–Gordan 系数是两组正交基之间的变换系数，平方给相应投影的概率。一般取值规则在原书作为已知角动量理论结果给出；本节以上完整证明了最常用的 1/2⊗1/2 情形，没有将一般规则假装成已由这一例子证明。

## 原书对应清单

- 4.1.1—3 球坐标分离、角方程与径向代换；例4.1
- 4.2.1 氢径向递推截断与归一化
- 4.2.2 光谱、量子数、简并与径向概率
- 4.3.1—2 角动量代数、范数、球谐本征函数
- 4.4.1 Pauli矩阵与例4.2
- 4.4.2 例4.3进动、例4.4分束力
- 4.4.3 两自旋合成的完整构造