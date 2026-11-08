# 第 3 章 · 形式理论 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 3.1 Hilbert 空间

原书 PDF 第 71—73 页。

态是向量，波函数是它在位置表象中的坐标。对于区间 $(a,b)$，平方可积函数空间 $L^2(a,b)$ 的元素满足 $\int_a^b|f|^2dx<\infty$。其内积定义为 $\langle f|g\rangle=\int f^*g\,dx$，对右边线性、对左边共轭线性。归一化态是其中的单位向量；单位向量集合本身不是线性空间。

#### 推导：从范数的正定性证明 Cauchy–Schwarz

**步骤 1**

$$
0\le\lVert g-cf\rVert^2=\langle g|g\rangle-c\langle g|f\rangle-c^*\langle f|g\rangle+|c|^2\langle f|f\rangle
$$

任意复数 c 都成立。

**步骤 2**

$$
c=\frac{\langle f|g\rangle}{\langle f|f\rangle}\quad\Rightarrow\quad0\le\langle g|g\rangle-\frac{|\langle f|g\rangle|^2}{\langle f|f\rangle}
$$

f≠0 时选取使投影残差最小的 c；f=0 情形显然成立。

**步骤 3**

$$
|\langle f|g\rangle|^2\le\langle f|f\rangle\langle g|g\rangle
$$

等号当且仅当 f、g 线性相关。这一等号条件以后决定最小不确定态。

正交归一组满足 $\langle f_m|f_n\rangle=\delta_{mn}$。完备性另要求任何空间中的态都可用它们展开。有限维的矩阵直觉仍有用，但无穷级数的收敛与微分算符的定义域必须检查，不能把无穷维运算当成永远可交换次序的有限求和。

## 3.2 可观测量与定值态

原书 PDF 第 73—76 页。

### 3.2.1 厄密性为什么保证实数期待值

#### 推导：从平均值的实数要求走向算符条件

**步骤 1**

$$
\langle Q\rangle=\langle\psi|Q\psi\rangle,\quad\langle Q\rangle^*=\langle Q\psi|\psi\rangle
$$

复共轭交换内积两项。

**步骤 2**

$$
\langle f|Qg\rangle=\langle Qf|g\rangle
$$

在公共定义域上成立的这一条件叫对称性。有限维中等价于 Q†=Q；无界算符的自伴性还要求适当的定义域相等。

**步骤 3**

$$
\int f^*(-i\hbar g\prime)dx=\left[-i\hbar f^*g\right]_a^b+\int(-i\hbar f\prime)^*g\,dx
$$

动量微分表达式的积分分部明确显示了边界项；必须说明为何它为零。

例如整个实轴上足够衰减的函数使边界项消失；环上的周期边界也可相消。这里讲物理可观测量时最终需要自伴算符，不能只验证某一个波函数的期待值恰好是实数。

### 3.2.2 方差为零，当且仅当态是本征态

#### 推导：把定值态条件写成一个非负范数

**步骤 1**

$$
\sigma_Q^2=\langle(Q-\langle Q\rangle)^2\rangle=\lVert(Q-\langle Q\rangle)|\psi\rangle\rVert^2
$$

使用 Q 自伴且态属于相应定义域。

**步骤 2**

$$
\sigma_Q=0\Longleftrightarrow Q|\psi\rangle=q|\psi\rangle,\quad q=\langle Q\rangle
$$

范数为零的向量只能是零向量。所以测量没有分散的态正是本征态。

谱是所有允许本征值的集合。一个值若对应多个线性独立本征态就是简并。不同可观测量有不同的定值态；能量定值态不一定是位置或动量定值态。

#### 原书例3.1 · 圆环上的 i d/dφ：边界真的决定谱

#### 推导：周期边界、厄密性与整数谱

**步骤 1**

$$
Q=i\frac d{d\phi},\quad f(\phi+2\pi)=f(\phi)
$$

此处不含 ℏ，是原书的无量纲算符。

**步骤 2**

$$
\langle f|Qg\rangle-\langle Qf|g\rangle=i[f^*g]_0^{2\pi}=0
$$

周期边界使两个端点相消。

**步骤 3**

$$
if\prime=qf\Rightarrow f=Ae^{-iq\phi},\quad e^{-2\pi iq}=1
$$

本征方程给指数，单值性筛掉非整数 q。

**步骤 4**

$$
q\in\mathbb Z,\quad f_q=\frac{e^{-iq\phi}}{\sqrt{2\pi}}
$$

每个整数仅一个线性独立本征函数，故谱非简并。

## 3.3 厄密算符的本征函数：分立与连续谱

原书 PDF 第 76—79 页。

#### 推导：两个基本定理：实谱与不同本征值正交

**步骤 1**

$$
Q|f\rangle=q|f\rangle\Rightarrow q\langle f|f\rangle=\langle f|Qf\rangle=\langle Qf|f\rangle=q^*\langle f|f\rangle
$$

非零可归一化本征函数有正范数，故 q=q*。

**步骤 2**

$$
\langle f_m|Qf_n\rangle=q_n\langle f_m|f_n\rangle=q_m\langle f_m|f_n\rangle
$$

把 Q 分别向右、向左作用。

**步骤 3**

$$
(q_n-q_m)\langle f_m|f_n\rangle=0\Rightarrow\langle f_m|f_n\rangle=0\quad(q_m\ne q_n)
$$

同一本征值内部可做正交化；不能由该等式推断简并本征函数天生正交。

#### 原书例 3.2 · 动量本征函数为何只能做 δ 归一化

#### 推导：解微分本征方程并决定连续谱的归一化因子

**步骤 1**

$$
-i\hbar\frac{df_p}{dx}=pf_p\Rightarrow f_p(x)=Ae^{ipx/\hbar}
$$

任意实 p 都允许，单个平面波在实轴上不平方可积。

**步骤 2**

$$
\int e^{i(p-p\prime)x/\hbar}dx=2\pi\hbar\,\delta(p-p\prime)
$$

这是分布意义的恒等式，不是普通绝对收敛积分。

**步骤 3**

$$
f_p(x)=\frac{e^{ipx/\hbar}}{\sqrt{2\pi\hbar}},\quad\langle f_{p\prime}|f_p\rangle=\delta(p-p\prime)
$$

连续指标的 δ 函数替代离散指标的 Kronecker δ。

#### 原书例 3.3 · 位置算符的本征函数

$$
x\,g_y(x)=y\,g_y(x)\Rightarrow(x-y)g_y(x)=0,\quad g_y(x)=\delta(x-y)
$$



它只在 x=y 处有分布支持。$\int\delta(x-y)\psi(x)dx=\psi(y)$，所以位置表象的展开系数正是波函数本身。位置本征“尖峰”同样不属于普通的平方可积态。

## 3.4 广义统计诠释

原书 PDF 第 79—82 页。

#### 推导：从展开到测量概率、平均值与状态更新

**步骤 1**

$$
|\psi\rangle=\sum_n c_n|q_n\rangle,\quad c_n=\langle q_n|\psi\rangle
$$

完备本征基提供展开。

**步骤 2**

$$
P(q_n)=|c_n|^2,\quad\langle Q\rangle=\sum_n q_n|c_n|^2
$$

概率规则是物理公设；右边的平均形式与算符期待值一致。

**步骤 3**

$$
P(q)=\langle\psi|\Pi_q|\psi\rangle,\quad|\psi_{post}\rangle=\frac{\Pi_q|\psi\rangle}{\sqrt{P(q)}}
$$

简并情形要投影到整个本征子空间，不能擅自挑其中一个本征矢。

#### 推导：位置与动量两种表象，怎样互相对应

**步骤 1**

$$
\Phi(p)=\frac1{\sqrt{2\pi\hbar}}\int e^{-ipx/\hbar}\Psi(x)dx,\quad\Psi(x)=\frac1{\sqrt{2\pi\hbar}}\int e^{ipx/\hbar}\Phi(p)dp
$$

Fourier 变换给出表象变换；|Φ|²dp 才是某个动量区间的概率。

**步骤 2**

$$
x e^{-ipx/\hbar}=i\hbar\partial_p e^{-ipx/\hbar}\Rightarrow\hat x\to i\hbar\partial_p,\quad\hat p\to p
$$

第一式在变换积分中直接导出位置算符的动量表示。动量算符变成乘子。

#### 原书例 3.4 · δ 阱束缚态的动量分布不再是高斯

$$
\psi(x)=\sqrt\kappa e^{-\kappa|x|},\quad\Phi(p)=\sqrt{\frac{2\kappa^3}{\pi\hbar}}\frac1{\kappa^2+(p/\hbar)^2}
$$



把积分拆为正、负半轴：$\int_0^\infty e^{-(\kappa\pm ip/\hbar)x}dx=(\kappa\pm ip/\hbar)^{-1}$。两项相加后得到 $2\kappa/[\kappa^2+(p/\hbar)^2]$。密度是这个振幅的模平方，不能把 Lorentz 形振幅误认成同样形状的密度。

**互动：同一个态，换一组测量轴**（请在同章 HTML 中运行，源码可展开。）

**互动：在两次 z 测量中间插入一次测量**（请在同章 HTML 中运行，源码可展开。）

## 3.5 不确定原理

原书 PDF 第 82—88 页。

### 3.5.1 一般不确定关系的完整逻辑

#### 推导：从两个中心化态出发

**步骤 1**

$$
|f\rangle=(A-\langle A\rangle)|\psi\rangle,\quad|g\rangle=(B-\langle B\rangle)|\psi\rangle
$$

于是 ⟨f|f⟩=σA²、⟨g|g⟩=σB²。

**步骤 2**

$$
\sigma_A^2\sigma_B^2\ge|\langle f|g\rangle|^2\ge[\operatorname{Im}\langle f|g\rangle]^2
$$

第一步为 Cauchy–Schwarz，第二步舍去非负的实部平方。

**步骤 3**

$$
2i\operatorname{Im}\langle f|g\rangle=\langle f|g\rangle-\langle g|f\rangle=\langle[A,B]\rangle
$$

展开中心化算符，常数项相消。

**步骤 4**

$$
\sigma_A\sigma_B\ge\frac12|\langle[A,B]\rangle|
$$

对易子期待值不是算符本身，某些态中它可以为零。

### 3.5.2 最小不确定波包

#### 推导：把两次不等式都变成等式，得到高斯而非猜出高斯

**步骤 1**

$$
|g\rangle=ic|f\rangle,\quad c\in\mathbb R
$$

线性相关使第一步取等，纯虚比例使第二步取等。

**步骤 2**

$$
(-i\hbar\partial_x-p_0)\psi=ic(x-x_0)\psi
$$

取 A=x，B=p。

**步骤 3**

$$
\frac{\psi\prime}{\psi}=\frac{ip_0}{\hbar}-\frac c\hbar(x-x_0)
$$

除以 −iℏ。

**步骤 4**

$$
\psi=C\exp\left[-\frac c{2\hbar}(x-x_0)^2+\frac{ip_0x}{\hbar}\right]
$$

平方可积要求 c>0。整体相位不影响结果。

**步骤 5**

$$
\sigma_x^2=\frac\hbar{2c},\quad\sigma_p^2=\frac{\hbar c}{2},\quad\sigma_x\sigma_p=\frac\hbar2
$$

额外的二次相位通常带来协方差，使这个简单乘积超过下限。

**互动：看不见的二次相位，扩宽动量分布**（请在同章 HTML 中运行，源码可展开。）

### 3.5.3 能量—时间：先解释“时间”指什么

#### 推导：由期待值变化率推得特征时间界

**步骤 1**

$$
\frac{d\langle A\rangle}{dt}=\frac i\hbar\langle[H,A]\rangle\quad(\partial_t A=0)
$$

由含时方程及其共轭推导；若 A 自身显含时间还需加 ⟨∂tA⟩。

**步骤 2**

$$
\sigma_H\sigma_A\ge\frac\hbar2\left|\frac{d\langle A\rangle}{dt}\right|
$$

把 Robertson 关系中的第二个量选成 H。

**步骤 3**

$$
\tau_A=\frac{\sigma_A}{|d\langle A\rangle/dt|}\Rightarrow\sigma_H\tau_A\ge\hbar/2
$$

仅在分母非零时这样定义。τA 是平均值变化一个分布宽度的特征时间，不是测量仪器必须等待的秒数。

定态中 σH=0，固定算符的期待值不变，τA 不能按“0 除 0”硬算。对窄带自由波包，用 τ≈σx/v、σE≈vσp 可看出同一尺度关系。对不稳定态，寿命与谱宽相关，但 Lorentz 线形的标准差可能不存在，必须说明所说的是半高宽或其他宽度定义，不能把这些 Δ 全都视为同一个标准差。

## 3.6 Dirac 符号

原书 PDF 第 88—96 页。

抽象态 $|\psi\rangle$ 不依赖坐标选择，$\psi(x)=\langle x|\psi\rangle$、$\Phi(p)=\langle p|\psi\rangle$、$c_n=\langle n|\psi\rangle$ 是它在不同基中的分量。内积是复数，外积是算符。

#### 推导：完备关系怎样将函数运算变成矩阵运算

**步骤 1**

$$
I=\sum_n|n\rangle\langle n|,\quad|\psi\rangle=\sum_n|n\rangle\langle n|\psi\rangle
$$

连续基使用积分。

**步骤 2**

$$
Q_{mn}=\langle m|Q|n\rangle,\quad(Q\psi)_m=\sum_nQ_{mn}c_n
$$

在 Q 与 ψ 之间插入恒等算符。

**步骤 3**

$$
\langle Q\rangle=\sum_{m,n}c_m^*Q_{mn}c_n
$$

这就是熟悉的 c†Qc。

**步骤 4**

$$
c\prime=Uc,\quad Q\prime=UQU^\dagger\Rightarrow c\prime{}^\dagger Q\prime c\prime=c^\dagger Qc
$$

同一个物理态与算符都必须按同一个基变换。

#### 原书例3.8 · 完整求解 H=[[h,g],[g,h]] 的两态振荡

#### 推导：对角化、展开初态、补时间相位

**步骤 1**

$$
H=\begin{pmatrix}h&g\\g&h\end{pmatrix},\quad\det(H-EI)=(h-E)^2-g^2=0
$$

h、g 是实常数。

**步骤 2**

$$
E_\pm=h\pm g,\quad|\pm\rangle=\frac1{\sqrt2}\begin{pmatrix}1\\\pm1\end{pmatrix}
$$

分别求解并归一化两个本征矢。

**步骤 3**

$$
|\psi(0)\rangle=\begin{pmatrix}1\\0\end{pmatrix}=\frac{|+\rangle+|-\rangle}{\sqrt2}
$$

先分解初态，不能直接给原坐标两分量都乘一个相同相位。

**步骤 4**

$$
|\psi(t)\rangle=\frac{e^{-i(h+g)t/\hbar}|+\rangle+e^{-i(h-g)t/\hbar}|-\rangle}{\sqrt2}=e^{-iht/\hbar}\begin{pmatrix}\cos(gt/\hbar)\\-i\sin(gt/\hbar)\end{pmatrix}
$$

将指数相加、相减转换为正弦与余弦。

**步骤 5**

$$
P_1(t)=\cos^2(gt/\hbar),\quad P_2(t)=\sin^2(gt/\hbar)
$$

h 只产生整体相位；非对角耦合 g 决定坐标基中的人口交换。

## 原书对应清单

- 3.1 内积、完备与Schwarz证明
- 3.2 厄密/自伴边界、定值态证明
- 3.3 实谱、正交证明及例3.2—3.3
- 3.4 广义Born规则、表象变换、例3.4
- 3.5.1—3 不确定关系、等号条件、能量时间
- 3.6 完备关系与矩阵表示；原书例3.8两态哈密顿量完整演化