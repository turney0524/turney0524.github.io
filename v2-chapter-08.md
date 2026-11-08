# 第 8 章 · WKB 近似 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 8.1 经典允许区域

原书 PDF 第 238—244 页。

WKB 把缓变势中的波看成局部平面波：相位快速变化，振幅慢慢调整以保持流守恒。它适合局部波长比势变化尺度小的区域，不适合直接跨越 p=0 的转折点。

#### 推导：从精确振幅—相位方程到 WKB

**步骤 1**

$$
\psi=A(x)e^{i\phi(x)},\quad p(x)=\sqrt{2m[E-V(x)]}
$$

在当前无节点的局部选 A、φ 为实函数。

**步骤 2**

$$
\psi\prime\prime=e^{i\phi}[A\prime\prime+2iA\prime\phi\prime+iA\phi\prime\prime-A(\phi\prime)^2]
$$

先完整微分，近似还没有使用。

**步骤 3**

$$
A\prime\prime-A(\phi\prime)^2=-p^2A/\hbar^2,\quad2A\prime\phi\prime+A\phi\prime\prime=0
$$

分开实部和虚部。

**步骤 4**

$$
(A^2\phi\prime)\prime=0\Rightarrow A\propto1/\sqrt{|\phi\prime|}
$$

虚部正是常概率流的条件。

**步骤 5**

$$
|A\prime\prime|\ll|A(\phi\prime)^2|\Rightarrow\phi\prime\simeq\pm p/\hbar
$$

忽略的是振幅的二阶变化，不是任意删除 ψ″。

**步骤 6**

$$
\psi_{\rm WKB}=\frac1{\sqrt{p(x)}}\left[C_+e^{(i/\hbar)\int^xpdx}+C_-e^{-(i/\hbar)\int^xpdx}\right]
$$

常数吸收 ℏ 因子；两支分别向右和向左传播。

**步骤 7**

$$
\left|\frac{\hbar p\prime}{p^2}\right|\ll1
$$

常用局部缓变判据；转折点 p=0 处失效。更精确的误差还取决于更高导数。

**互动：势能缓变时，局部波长随之调整**（请在同章 HTML 中运行，源码可展开。）

#### 原书例8.1 · 崎岖底部、两端硬壁的方阱

$$
\psi\simeq\frac{C}{\sqrt p}\sin\left(\frac1\hbar\int_0^xpdx\right),\quad\int_0^a p(x)dx=n\pi\hbar,\ n=1,2,\ldots
$$



左边硬壁选择正弦，右边硬壁要求相位为整数 π。V=0 时立即给 k=nπ/a，恰好精确；缓变但非平底时，能量隐含在积分内，可数值求根。硬壁不是光滑转折点，不可机械加 π/4。

## 8.2 隧道效应与 α 衰变

原书 PDF 第 244—249 页。

#### 推导：禁阻区的指数解与透射指数

**步骤 1**

$$
q(x)=\sqrt{2m[V(x)-E]},\quad\psi\simeq\frac{D_+e^{\int^xqdx/\hbar}+D_-e^{-\int^xqdx/\hbar}}{\sqrt q}
$$

E<V 时 p=iq，振荡变成增长与衰减。有限势垒内部一般两项都存在。

**步骤 2**

$$
\gamma=\frac1\hbar\int_{x_1}^{x_2}q(x)dx,\quad T\sim e^{-2\gamma}
$$

高而宽、γ≫1 的势垒给主导指数。振幅衰减一次，概率平方所以是 2γ。

**互动：看指数，不只看一个接近零的数字**（请在同章 HTML 中运行，源码可展开。）

#### 原书例8.2 · Gamow 模型：为什么 α 能量稍变寿命就差很远

#### 推导：Coulomb 势垒积分

**步骤 1**

$$
V(r)=C/r,\quad C=2Ze^2/(4\pi\epsilon_0),\quad r_2=C/E
$$

r₁ 是核半径，外转折点满足 V=E。

**步骤 2**

$$
\gamma=\frac{\sqrt{2mE}}\hbar\int_{r_1}^{r_2}\sqrt{r_2/r-1}\,dr
$$

先把 E 提出根号。

**步骤 3**

$$
r=r_2\sin^2u\Rightarrow\sqrt{r_2/r-1}\,dr=2r_2\cos^2u\,du
$$

这个换元把根号变成余弦平方。

**步骤 4**

$$
\gamma=\frac{r_2\sqrt{2mE}}\hbar\left[\arccos\sqrt{\frac{r_1}{r_2}}-\sqrt{\frac{r_1}{r_2}\left(1-\frac{r_1}{r_2}\right)}\right]
$$

上下限 u₁=arcsin√(r₁/r₂)、u₂=π/2。

**步骤 5**

$$
\gamma\simeq\frac{\sqrt{2mE}}\hbar\left[\frac\pi2r_2-2\sqrt{r_1r_2}\right],\quad\tau\sim\frac{2r_1}{v}e^{2\gamma}
$$

小 r₁/r₂ 展开。每秒碰撞约 v/(2r₁) 次，每次逃逸概率约 e⁻²ᵞ。

第一项随 Z/√E 变化，指数再把这种变化放大成寿命跨越多个数量级。这个简单核模型主要解释趋势，碰撞频率与粒子预形成概率仍影响前因子。

## 8.3 连接公式与三种量子化条件

原书 PDF 第 249—264 页。

#### 推导：转折点附近必须换成 Airy 方程

**步骤 1**

$$
V(x)\simeq E+F(x-x_t),\quad\psi\prime\prime=\frac{2mF}{\hbar^2}(x-x_t)\psi\quad(F>0)
$$

简单转折点具有非零斜率。

**步骤 2**

$$
z=(2mF/\hbar^2)^{1/3}(x-x_t),\quad\frac{d^2\psi}{dz^2}=z\psi
$$

得到 Ai、Bi 两支。右方无穷增长的 Bi 被束缚边界排除。

**步骤 3**

$$
{\rm Ai}(z)\sim\frac{e^{-2z^{3/2}/3}}{2\sqrt\pi z^{1/4}}\ (z>0),\quad{\rm Ai}(-s)\sim\frac{\sin(2s^{3/2}/3+\pi/4)}{\sqrt\pi s^{1/4}}
$$

分别在禁阻与允许侧的重叠区匹配渐近式；不要在 z=0 强行使用 WKB。

**步骤 4**

$$
\frac{D}{\sqrt q}e^{-\int_{x_t}^xqdx/\hbar}\ \longleftrightarrow\ \frac{2D}{\sqrt p}\sin\left(\frac1\hbar\int_x^{x_t}pdx+\frac\pi4\right)
$$

Airy 两侧系数相差 2，振荡相位有 π/4。箭头是在指定衰减分支下的匹配，不是任何 WKB 项都能随意双向替换。

#### 原书例8.3 · 一个硬壁和一个软转折点

$$
\int_0^{x_t}pdx=(n-1/4)\pi\hbar,\quad n=1,2,\ldots
$$



$$
V=\tfrac12m\omega^2x^2\ (x>0):\quad\int_0^{x_t}pdx=\frac{\pi E}{2\omega}\Rightarrow E_n=(2n-1/2)\hbar\omega
$$



等于全谐振子的奇宇称能级：3ℏω/2、7ℏω/2……因为硬壁 x=0 要求波函数为零。

#### 原书例8.4 · 两个软转折点

#### 推导：左右衰减解同时匹配

**步骤 1**

$$
\psi_L\propto\frac1{\sqrt p}\sin\left(\frac1\hbar\int_{x_1}^xpdx+\frac\pi4\right),\quad\psi_R\propto\frac1{\sqrt p}\sin\left(\frac1\hbar\int_x^{x_2}pdx+\frac\pi4\right)
$$

一个在左侧禁阻区衰减，一个在右侧禁阻区衰减。

**步骤 2**

$$
\int_{x_1}^{x_2}pdx=(n+1/2)\pi\hbar,\quad n=0,1,2,\ldots
$$

正弦成为同一个函数（允许整体正负号），给出半整数位移。这里 n 从 0 开始，与原书 n 从 1 开始的写法等价。

**互动：两次软转折，留下半个量子的偏移**（请在同章 HTML 中运行，源码可展开。）

> **三种边界放在一起比较** 两硬壁：nπℏ（n≥1）；一硬一软：(n−1/4)πℏ（n≥1）；两软：(n+1/2)πℏ（n≥0）。差别是边界的相位，不是改动势能本身。WKB 通常在高量子数更准，谐振子能谱恰好精确是特殊情况。

**自测：为什么 WKB 在转折点发散，精确波函数却有限？**

<details><summary>查看答案</summary>

1/√p 是缓变假设下的振幅；当 p→0，该假设失效。Airy 解在转折点有限，发散是近似表达式的缺陷。

</details>

## 原书对应清单

- 8.1：振幅—相位精确方程、缓变条件与硬壁例
- 8.2：隧穿指数、Gamow 积分换元及寿命估计
- 8.3：Airy 渐近匹配、例8.3/8.4及边界相位比较