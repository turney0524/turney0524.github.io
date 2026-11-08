# 第 1 章 · 波函数 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 1.1 薛定谔方程

原书 PDF 第 6—6 页。

经典力学给定位置和速度，再用 Newton 方程预测轨道。量子力学的基本动力学对象是复值波函数 $\Psi(x,t)$；它不是直接可见的物质波纹，而是计算测量概率的振幅。先讨论一维、非相对论、无自旋粒子。

$$
i\hbar\frac{\partial\Psi}{\partial t}=-\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2}+V(x,t)\Psi\equiv\widehat H\Psi
$$

ℏ=h/(2π)，左边和右边都具有能量×波函数的量纲。这是本书采用的动力学公设，不是从经典轨道严格推导出的结论。

方程对 Ψ 线性：同一势能下两个解的线性组合仍是解；概率密度却包含干涉交叉项。要唯一演化，还需初态与合适的空间边界条件。复数 i 不是排版习惯，它让时间演化保留模长而改变相位。

## 1.2 波函数的统计诠释

原书 PDF 第 6—8 页。

#### 推导：从振幅到区间概率

**步骤 1**

$$
\rho(x,t)=\Psi^*(x,t)\Psi(x,t)=|\Psi(x,t)|^2
$$

Born 规则把复振幅转换成非负密度。

**步骤 2**

$$
P(a<x<b;t)=\int_a^b\rho(x,t)dx
$$

连续分布中单个点的概率为零；应说一个小区间内的概率约为 ρdx。

**步骤 3**

$$
\Psi\to e^{i\alpha}\Psi\Rightarrow\rho\to\rho
$$

全态共同的常数相位不改变任何概率；不同分量的相对相位可能影响干涉。

原书用“测量之前粒子在哪里”的问题比较现实主义、正统统计解释等立场。本教程把可计算的规则与对规则的诠释区分：一次位置测量给一个结果；大量相同制备实验的统计分布由 |Ψ|² 预测。随后立刻重复理想测量会得到相同结果，是测量公设的内容，不能只靠未测量的 Schrödinger 演化解释。

> **密度的单位** 一维 ∫|Ψ|²dx=1，所以 Ψ 的单位是长度⁻¹ᐟ²，ρ 的单位是长度⁻¹。ρ 可以大于数值 1，真正受 0 到 1 限制的是区间积分概率。

## 1.3 概率：分立变量与连续变量

原书 PDF 第 8—13 页。

### 1.3.1 分立变量

#### 推导：均值、方差与标准差

**步骤 1**

$$
\sum_jP_j=1,\quad\langle j\rangle=\sum_jjP_j,\quad\langle f(j)\rangle=\sum_jf(j)P_j
$$

均值是多次测量平均，不必是单次允许取值。

**步骤 2**

$$
\sigma^2=\langle(j-\langle j\rangle)^2\rangle=\langle j^2\rangle-\langle j\rangle^2
$$

展开平方，⟨j⟩ 是对求和不变的常数。

**步骤 3**

$$
\sigma=\sqrt{\langle j^2\rangle-\langle j\rangle^2}
$$

标准差与变量有同样单位；方差有平方单位。

### 1.3.2 连续变量

$$
\int\rho(x)dx=1,\quad\langle f(x)\rangle=\int f(x)\rho(x)dx
$$

把概率质量 Pj 换成概率元 ρdx，求和换积分。对变量换元，密度还须乘 Jacobian。

#### 原书例1.1 · 随机时刻拍下自由落体：为什么不均匀

从高度 h 由静止落下，在从释放到着地的时间区间内均匀随机拍一张照片。以下以“已下降距离”x 为坐标，0<x<h；若以离地高度 y=h−x 表示，密度相应反向。

#### 推导：时间均匀不代表位置均匀

**步骤 1**

$$
x=\tfrac12gt^2,\quad T=\sqrt{2h/g},\quad\rho_t=1/T
$$

球在上方运动慢，停留时间长。

**步骤 2**

$$
\rho_x(x)=\rho_t\left|\frac{dt}{dx}\right|=\frac1{2\sqrt{hx}}
$$

由 ρx dx=ρt dt 转换概率元。原点密度发散但积分有限。

**步骤 3**

$$
\int_0^h\rho_xdx=1,\quad\langle x\rangle=\frac h3,\quad\langle x^2\rangle=\frac{h^2}5
$$

逐项作幂函数积分。离地高度的平均则为 2h/3。

**步骤 4**

$$
\sigma_x=\sqrt{h^2/5-h^2/9}=\frac{2h}{3\sqrt5}
$$

同一个物理实验，换坐标方向不改变标准差。

## 1.4 归一化及其随时间保持

原书 PDF 第 13—15 页。

因方程线性，乘常数不改变其为解的性质；但概率总和须为 1，因而归一化选择了模长。不可平方积的单个平面波是广义本征态，需要另用波包与 δ 归一化处理，不能声称任何非零解都可用有限常数归一化。

#### 推导：从 Schrödinger 方程推出连续性方程

**步骤 1**

$$
\partial_t|\Psi|^2=\Psi^*\partial_t\Psi+\Psi\partial_t\Psi^*
$$

乘积求导。假设 V 为实数，保证封闭体系的 H 厄米。

**步骤 2**

$$
\partial_t|\Psi|^2=\frac{i\hbar}{2m}(\Psi^*\Psi\prime\prime-\Psi\Psi^{*\prime\prime})
$$

共轭方程中 i 变号，实势项互相抵消。

**步骤 3**

$$
j=\frac{\hbar}{2mi}(\Psi^*\Psi\prime-\Psi\Psi^{*\prime}),\quad\partial_t\rho+\partial_xj=0
$$

将差写成一个空间总导数，定义概率流。

**步骤 4**

$$
\frac d{dt}\int_a^b\rho dx=j(a)-j(b)
$$

区间概率的变化等于流入减流出。

**步骤 5**

$$
j(\pm\infty)=0\Rightarrow\frac d{dt}\int_{-\infty}^\infty\rho dx=0
$$

波包的合适衰减或封闭边界保证总归一化保持。

#### 归一化练习的完整示范 · 两侧指数初态

$$
\Psi(x,0)=Ae^{-\kappa|x|},\quad1=2|A|^2\int_0^\infty e^{-2\kappa x}dx=|A|^2/\kappa
$$



$$
A=\sqrt\kappa\quad(\text{选实正}),\quad P(|x|<b)=1-e^{-2\kappa b}
$$



这个计算只指定初态，不自动说明它是任意给定势中的定态。第二章会找到与此形状精确相容的吸引 δ 势。

## 1.5 动量、算符与 Ehrenfest 定理

原书 PDF 第 15—17 页。

#### 推导：动量算符不是凭空背出来的

**步骤 1**

$$
\langle x\rangle=\int x\rho dx,\quad\frac{d\langle x\rangle}{dt}=-\int x\partial_xj\,dx=\int jdx
$$

分部积分并令无穷远 xj 的边界项消失。

**步骤 2**

$$
\frac{d\langle x\rangle}{dt}=\frac{\hbar}{2mi}\int(\Psi^*\Psi\prime-\Psi\Psi^{*\prime})dx=\frac1m\int\Psi^*(-i\hbar\partial_x)\Psi dx
$$

第二项再分部积分，和第一项合并。

**步骤 3**

$$
\widehat p=-i\hbar\partial_x,\quad\langle p\rangle=\int\Psi^*\widehat p\Psi dx
$$

与 p=mv 的平均关系一致，并推广为测量算符规则。

**步骤 4**

$$
\langle Q(x,p)\rangle=\int\Psi^*\widehat Q\Psi dx,\quad\widehat T=-\frac{\hbar^2}{2m}\partial_x^2
$$

混合 x、p 的函数还须规定算符次序；它们不是可交换的数。

#### 推导：平均动量的时间导数

**步骤 1**

$$
\frac{d\langle p\rangle}{dt}=\frac i\hbar\langle[H,p]\rangle,\quad[V,p]\Psi=i\hbar V\prime\Psi
$$

用两条 Schrödinger 方程求期待值导数；动能与 p 对易。

**步骤 2**

$$
\frac{d\langle p\rangle}{dt}=-\left\langle\frac{\partial V}{\partial x}\right\rangle
$$

这是平均力，不一般等于 −V′(⟨x⟩)。只有线性力或足够窄的波包等条件下才能近似按单条经典轨道运动。

**互动：追着包络走，不要追着每个波峰走**（请在同章 HTML 中运行，源码可展开。）

## 1.6 不确定原理

原书 PDF 第 17—20 页。

局域波包需要很多波数叠加；单一波数对应完全延展的平面波。空间越窄，Fourier 波数谱通常越宽。用 de Broglie 关系 p=ℏk，把这一数学宽度关系转成位置—动量不确定关系。这里讨论同一制备态中两个测量分布的标准差，不是某次测量把粒子“撞坏了”的口号。

$$
\sigma_x\sigma_p\ge\frac\hbar2
$$

严格的一般证明放在第三章：Cauchy–Schwarz 不等式加 [x,p]=iℏ。本章先建立可算的例子。

#### 推导：最小不确定高斯的直接核算

**步骤 1**

$$
\psi=(2\pi s^2)^{-1/4}e^{-x^2/(4s^2)}e^{ip_0x/\hbar}
$$

密度方差是 s²；振幅与密度指数相差一倍，不能混淆。

**步骤 2**

$$
\langle x\rangle=0,\quad\sigma_x=s,\quad\langle p\rangle=p_0
$$

对称性给位置均值；相位梯度给平均动量。

**步骤 3**

$$
(p-p_0)\psi=\frac{i\hbar x}{2s^2}\psi\Rightarrow\sigma_p^2=\|(p-p_0)\psi\|^2=\frac{\hbar^2}{4s^2}
$$

用范数求二阶中心矩，比逐项二次微分更简洁。

**步骤 4**

$$
\sigma_x\sigma_p=\hbar/2
$$

此无二次啁啾的高斯饱和界限；加入二次相位可保持位置密度却增加动量方差。

**互动：看不见的二次相位，扩宽动量分布**（请在同章 HTML 中运行，源码可展开。）

**自测：如果粒子平均动量为零，能否推出它没有动能？**

<details><summary>查看答案</summary>

不能。⟨p⟩=0 不等于 ⟨p²⟩=0。动能是 ⟨p²⟩/(2m)，包括分布宽度贡献 σp²/(2m)。

</details>

## 原书对应清单

- 1.1—1.2：动力学公设与 Born 统计诠释
- 1.3：分立/连续概率、方差与原书自由落体例
- 1.4：归一化、连续性方程及边界条件
- 1.5：分部积分得动量、平均力 Ehrenfest 关系
- 1.6：Fourier 宽度、高斯直接核算；一般证明链接第三章