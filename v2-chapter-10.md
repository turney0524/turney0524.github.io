# 第 10 章 · 绝热近似 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 10.1 绝热定理

原书 PDF 第 284—289 页。

### 10.1.1 慢变化到底与什么比较

绝热的含义是体系保持在瞬时本征态的分支上，而不是能量守恒：缓慢改变势阱宽度，粒子的能量可以连续改变。突然变化则先保持波函数形状，再投影到新基。必须把变化速率与相关能隙比较，不能只说“变化了很多秒”。

#### 推导：10.1.2 在瞬时基中证明跃迁被压低

**步骤 1**

$$
H(t)|n(t)\rangle=E_n(t)|n(t)\rangle,\quad|\Psi\rangle=\sum_n c_n(t)e^{i\theta_n(t)}|n(t)\rangle,\quad\theta_n=-\frac1\hbar\int_0^tE_n dt\prime
$$

本征基本身也随时间移动。

**步骤 2**

$$
\dot c_m=-c_m\langle m|\dot m\rangle-\sum_{n\ne m}c_n\langle m|\dot n\rangle e^{i(\theta_n-\theta_m)}
$$

代入薛定谔方程后投影，保留基矢导数。

**步骤 3**

$$
\langle m|\dot H|n\rangle+(E_m-E_n)\langle m|\dot n\rangle=0\quad(m\ne n)
$$

对瞬时本征方程求导，再用 ⟨m| 投影。

**步骤 4**

$$
\langle m|\dot n\rangle=\frac{\langle m|\dot H|n\rangle}{E_n-E_m}
$$

本征态变化速度受到能隙控制。

**步骤 5**

$$
\frac{\hbar|\langle m|\dot H|n\rangle|}{|E_n-E_m|^2}\ll1
$$

常用的局部绝热指标：耦合速率远小于快速相位频率。长时间累积、端点、简并和能隙闭合仍需另外检查；它不是任意驱动的完整充分条件。

**步骤 6**

$$
c_n(t)\simeq e^{i\gamma_n(t)},\quad\gamma_n=i\int_0^t\langle n|\dot n\rangle dt\prime
$$

忽略不同分支跃迁后，同分支仍留下相位，不能把 cn 直接设成 1。

**互动：转动外场，看态还能否跟上**（请在同章 HTML 中运行，源码可展开。）

#### 对应原书移动势阱例 · 缓慢扩张与瞬间扩张的差别

$$
\psi_n(x,t)=\sqrt{2/L(t)}\sin[n\pi x/L(t)],\quad E_n(t)=\frac{n^2\pi^2\hbar^2}{2mL(t)^2}
$$



绝热扩张保持 n，但能量随 L⁻² 下降，外界从体系取走能量。瞬间扩张时旧态只在原区间非零，需算新阱内积；不能把相同 n 的新正弦函数直接当成瞬时状态。实函数规范下 ⟨n|∂t n⟩=0，此例没有额外几何相位。

## 10.2 Berry 相

原书 PDF 第 289—300 页。

### 10.2.1 不完全过程：相位不能全部丢弃

$$
|\Psi(t)\rangle\simeq e^{-\frac i\hbar\int E_ndt}e^{i\gamma_n(t)}|n(t)\rangle
$$

整体相位在单支概率中不可见，但与另一支或参考臂比较时，相对相位可测。开放路径的几何积分单独依赖规范。

#### 推导：10.2.2 闭合路径的几何相位

**步骤 1**

$$
\mathbf A_n(\mathbf R)=i\langle n(\mathbf R)|\nabla_{\mathbf R}n(\mathbf R)\rangle,\quad\gamma_n=\oint_C\mathbf A_n\cdot d\mathbf R
$$

把控制参数记为 R；同一路径换行进速度不改变该积分。

**步骤 2**

$$
|n\rangle\to e^{i\chi(\mathbf R)}|n\rangle\Rightarrow\mathbf A_n\to\mathbf A_n-\nabla\chi
$$

对相位变换显式求导。

**步骤 3**

$$
\gamma_n\to\gamma_n-2\pi k
$$

单值规范在闭路上只改变整数倍 2π，物理相位因子不变。

**步骤 4**

$$
\gamma_n=\iint_\Sigma(\nabla_{\mathbf R}\times\mathbf A_n)\cdot d\mathbf S
$$

在所用规范光滑的区域可用 Stokes 定理；奇点与多张规范贴图要谨慎处理。

#### 旋转磁场中的自旋 · 把 Berry 积分具体算一遍

#### 推导：自旋沿场方向的本征旋量

**步骤 1**

$$
|+\mathbf n\rangle=\binom{\cos(\theta/2)}{e^{i\phi}\sin(\theta/2)}
$$

选北极附近规则的规范。

**步骤 2**

$$
i\langle+\mathbf n|\partial_\phi|+\mathbf n\rangle=-\sin^2(\theta/2)=-\frac12(1-\cos\theta)
$$

只需对下分量求 φ 导数。

**步骤 3**

$$
\gamma_+=-\frac12\oint(1-\cos\theta)d\phi=-\Omega_{\rm solid}/2,\quad\gamma_-=+\Omega_{\rm solid}/2
$$

闭路包围的立体角给几何相位。符号取决于沿场或逆场分支，不能把它与某个固定能量高低标签混同。

**互动：沿圆锥走一圈，读出几何相**（请在同章 HTML 中运行，源码可展开。）

### 10.2.3 Aharonov–Bohm 效应：局部无磁场仍有相位差

#### 推导：矢势、规范与两臂干涉

**步骤 1**

$$
H=\frac1{2m}(-i\hbar\nabla-q\mathbf A)^2+q\varphi
$$

带电粒子的正则动量与机械动量不同。

**步骤 2**

$$
\mathbf A\to\mathbf A+\nabla\chi,\quad\psi\to e^{iq\chi/\hbar}\psi
$$

协变导数作用后附加梯度相消，保证预测不变。

**步骤 3**

$$
\Delta\phi=\frac q\hbar\left(\int_1\mathbf A\cdot d\mathbf l-\int_2\mathbf A\cdot d\mathbf l\right)=\frac{q\Phi_B}\hbar
$$

两条臂围成闭路。虽然轨道处 B=0，闭路包住的磁通可非零；不能在整个多连通区域用一个单值规范把 A 消去。

**步骤 4**

$$
I\propto|\psi_1+\psi_2e^{i\Delta\phi}|^2,\quad\Phi_0=h/|q|
$$

磁通变化一个磁通量子使相位变化 2π，条纹重复。对于电子 q=−e，条纹位移方向相应改变。

**互动：磁通拨一格，条纹移一轮**（请在同章 HTML 中运行，源码可展开。）

**自测：绝热相位都是几何相位吗？**

<details><summary>查看答案</summary>

不是。总相位包括依赖经历时间的动力学相位，以及主要由参数路径几何决定的 Berry 相位。绝热只保证分支跟随，并不删除动力学相位。

</details>

## 原书对应清单

- 10.1：瞬时基、能隙分母、局部判据及移动势阱
- 10.2.1—2：开放路径规范、闭路 Berry 积分、自旋立体角
- 10.2.3：最小耦合、规范相位、AB 闭路磁通