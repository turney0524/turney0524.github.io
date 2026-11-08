# 第 2 章 · 定态薛定谔方程 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 2.1 定态

原书 PDF 第 21—24 页。

第一章的计算以一个已知波函数为起点。本章解决更早的一步：给定势能与初态，怎样真正构造波函数？以下首先假设 $V=V(x)$ 不显含时间。一维含时方程是 $i\hbar\partial_t\Psi=-(\hbar^2/2m)\partial_x^2\Psi+V\Psi$。不要预先假定所有解都能分离；我们只是先找出一组有用的分离变量解，再利用线性叠加。

#### 推导：分离变量：逐项代入，而不是直接背下时间因子

**步骤 1**

$$
\Psi(x,t)=\psi(x)\varphi(t)
$$

先作乘积试探。空间导数只作用在 ψ 上，时间导数只作用在 ϕ 上。

**步骤 2**

$$
i\hbar\psi\frac{d\varphi}{dt}=-\frac{\hbar^2}{2m}\varphi\frac{d^2\psi}{dx^2}+V\psi\varphi
$$

代入含时方程。

**步骤 3**

$$
i\hbar\frac{1}{\varphi}\frac{d\varphi}{dt}=-\frac{\hbar^2}{2m\psi}\frac{d^2\psi}{dx^2}+V(x)=E
$$

在函数非零处除以 ψϕ；方程再由连续性延伸到节点。两侧依赖互相独立的变量，故等于同一常数。

**步骤 4**

$$
\frac{d\varphi}{\varphi}=-\frac{iE}{\hbar}dt\quad\Longrightarrow\quad\varphi(t)=e^{-iEt/\hbar}
$$

积分常数吸收进空间波函数。

**步骤 5**

$$
-\frac{\hbar^2}{2m}\psi\prime\prime+V\psi=E\psi
$$

这才是需要按具体势能与边界求解的定态方程。

### 为什么把分离解称为定态？三个理由分别证明

#### 推导：理由一：概率与固定可观测量的统计不随时间变化

**步骤 1**

$$
|\Psi|^2=\psi^*e^{iEt/\hbar}\psi e^{-iEt/\hbar}=|\psi|^2
$$

归一化分离解要求 E 为实数，正负时间相位恰好抵消。

**步骤 2**

$$
\langle Q\rangle=\int \psi^*e^{iEt/\hbar}\hat Q\psi e^{-iEt/\hbar}dx=\int\psi^*\hat Q\psi dx
$$

Q̂ 不显含时间且不对时间求导时，时间因子移到算符外相消。

#### 推导：理由二：它不是只有“平均能量”确定，而是每次测能都确定

**步骤 1**

$$
\hat H\psi=E\psi,\quad \langle H\rangle=E\int|\psi|^2dx=E
$$

利用归一化。

**步骤 2**

$$
\hat H^2\psi=E^2\psi,\quad\sigma_H^2=\langle H^2\rangle-\langle H\rangle^2=E^2-E^2=0
$$

方差为零，所以分离解是能量定值态。

#### 推导：理由三：用叠加把任意合格初态重建回来

**步骤 1**

$$
\Psi(x,0)=\sum_n c_n\psi_n(x),\quad c_n=\int\psi_n^*(x)\Psi(x,0)dx
$$

在本征态组成完备正交归一基的离散情形成立。

**步骤 2**

$$
\Psi(x,t)=\sum_n c_n\psi_n(x)e^{-iE_nt/\hbar}
$$

线性方程保证每一项是解时总和仍为解。连续谱的部分须以积分表示。

#### 原书例 2.1 · 两个定态为什么能够叠出随时间变化的密度？

设 $c_1,c_2,\psi_1,\psi_2$ 均为实数。先把复共轭的每一项写出来，再做乘法：

$$
|\Psi|^2=c_1^2\psi_1^2+c_2^2\psi_2^2+c_1c_2\psi_1\psi_2\left[e^{i(E_2-E_1)t/\hbar}+e^{-i(E_2-E_1)t/\hbar}\right]
$$



$$
|\Psi|^2=c_1^2\psi_1^2+c_2^2\psi_2^2+2c_1c_2\psi_1\psi_2\cos[(E_2-E_1)t/\hbar]
$$

振荡角频率由能量差决定。各能量出现的概率可以不变，位置概率仍然变化。

**互动：两个定态，叠出一个会变化的密度**（请在同章 HTML 中运行，源码可展开。）

> **定态的适用边界** 一维实轴上的通常非简并束缚态可取实空间波函数，概率流为零。更一般的定态（例如环上行波）可有稳恒概率流。因此“密度不变”不应被扩大解释为“任何定态都没有流”。

## 2.2 无限深方势阱

原书 PDF 第 24—31 页。

势阱为 $V=0$（$0<x<a$），区间外无限大。外部波函数为零。有限物理解与连续性要求内部函数在两端也为零。我们先保留一般系数，观察究竟是哪一个条件筛出了能量。

#### 推导：通解 → 边界 → 离散波数 → 归一化

**步骤 1**

$$
\psi\prime\prime+k^2\psi=0,\quad k=\sqrt{2mE}/\hbar,\quad\psi=A\sin kx+B\cos kx
$$

考虑 E>0。E≤0 的指数或线性解无法同时满足两个硬墙边界并给出非零态。

**步骤 2**

$$
\psi(0)=0\Rightarrow B=0,\qquad\psi(a)=0\Rightarrow A\sin ka=0
$$

A=0 是零函数，必须排除。

**步骤 3**

$$
k_n=\frac{n\pi}{a},\quad E_n=\frac{n^2\pi^2\hbar^2}{2ma^2},\quad n=1,2,\ldots
$$

n=0 没有非零函数；负整数只改变整体符号，不能重复计数。

**步骤 4**

$$
1=|A|^2\int_0^a\sin^2\frac{n\pi x}{a}dx=|A|^2\frac a2
$$

用 sin²u=(1−cos2u)/2，振荡项积分为零。

**步骤 5**

$$
\psi_n(x)=\sqrt{\frac2a}\sin\frac{n\pi x}{a}
$$

选择整体相位使归一化常数为正实数。

### 四个性质不能只列名称：分别看它们做了什么

关于阱中心，$\psi_n(a-x)=(-1)^{n+1}\psi_n(x)$，所以奇 n 对中心为偶，偶 n 为奇。内部零点为 $x=ja/n$（j=1,…,n−1），故节点数 n−1。正交性来自以下积分；完备性来自相应正弦 Fourier 系的完备性，不由正交性单独推出。

#### 推导：正交性与投影系数

**步骤 1**

$$
\int_0^a\psi_m\psi_n dx=\frac1a\int_0^a\left[\cos\frac{(m-n)\pi x}{a}-\cos\frac{(m+n)\pi x}{a}\right]dx=0\quad(m\ne n)
$$

两个余弦均在整半波数上积分为零；m=n 要单独用归一化处理，不能除以 m−n。

**步骤 2**

$$
\int_0^a\psi_m^*(x)\Psi(x,0)dx=\sum_n c_n\int_0^a\psi_m^*\psi_n dx=c_m
$$

先展开，再左乘一个基函数并积分，正交性只留下一个系数。

**步骤 3**

$$
\int|\Psi|^2dx=\sum_{m,n}c_m^*c_n\delta_{mn}=\sum_n|c_n|^2=1
$$

这也给出能量测量概率的总和。

**步骤 4**

$$
\langle H\rangle=\sum_{m,n}c_m^*c_n E_n\delta_{mn}=\sum_n|c_n|^2E_n
$$

时间相位在同一个 n 项中相消，表现为能量统计守恒。

**互动：边界筛出的驻波**（请在同章 HTML 中运行，源码可展开。）

#### 原书例 2.2—2.3 · 把抛物线初态真正展开，并算出它的能量

取 $\Psi(x,0)=Ax(a-x)$。不能只凭图形像基态就把它替换成基态；微小的高能分量对某些可观测量仍可能重要。

#### 推导：归一化与两次分部积分

**步骤 1**

$$
\int_0^a x^2(a-x)^2dx=\frac{a^5}{30}\Rightarrow A=\sqrt{\frac{30}{a^5}}
$$

先将多项式展开逐项积分。

**步骤 2**

$$
I_n=\int_0^a x(a-x)\sin(k_nx)dx=\frac1{k_n}\int_0^a(a-2x)\cos(k_nx)dx
$$

第一次分部积分；多项式在两个端点均为零，边界项消失。

**步骤 3**

$$
I_n=\frac{2}{k_n^2}\int_0^a\sin(k_nx)dx=\frac{2[1-(-1)^n]}{k_n^3}
$$

第二次分部积分的 sin 端点项为零。

**步骤 4**

$$
c_n=\sqrt{\frac2a}A I_n=\frac{4\sqrt{15}[1-(-1)^n]}{n^3\pi^3}
$$

偶数 n 系数为零；奇数 n 为 8√15/(n³π³)。

**步骤 5**

$$
\Psi(x,t)=\sum_{n\ {\rm odd}}\frac{8\sqrt{15}}{n^3\pi^3}\sqrt{\frac2a}\sin\frac{n\pi x}{a}\,e^{-in^2\pi^2\hbar t/(2ma^2)}
$$

把系数与每一个时间因子放回去，得到完整初值问题的解。

$$
P(E_1)=\frac{960}{\pi^6}\approx0.998555,\qquad \langle H\rangle=\frac{480\hbar^2}{ma^2\pi^4}\sum_{n\ {\rm odd}}\frac1{n^4}=\frac{5\hbar^2}{ma^2}
$$



用了 $\sum_{n\,odd}n^{-4}=\pi^4/96$。也可以不求级数：对当前光滑初态使用 $\langle H\rangle=(\hbar^2/2m)\int|\Psi\prime|^2dx$，而 $\Psi\prime=A(a-2x)$，积分立刻给同一个答案。

**自测：为什么很小的激发态概率仍不能一律忽略？**

<details><summary>查看答案</summary>

期待值按 |cn|²En 加权，高能 En 的增长可能补偿小概率。更高能量矩涉及更高次 En，更应先检查级数收敛，而不是只看 |c₁|² 接近 1。

</details>

## 2.3 谐振子：代数法与解析法都要会

原书 PDF 第 31—45 页。

在势能的光滑稳定极小值附近，Taylor 展开第一项非平凡贡献为二次项，所以 $V=m\omega^2x^2/2$ 是许多小振动的统一模型。以下先用代数求谱，再用微分方程解释为什么能量必须离散。两条路线互相检查，不能只保留能级公式。

### 2.3.1 代数法：利用非对易性分解哈密顿量

#### 推导：先计算 a†a，不能把 x 与 p 当成普通数交换

**步骤 1**

$$
a=\frac{m\omega x+ip}{\sqrt{2m\hbar\omega}},\quad a^\dagger=\frac{m\omega x-ip}{\sqrt{2m\hbar\omega}}
$$

在相容的算符定义域中，x、p 自伴。

**步骤 2**

$$
a^\dagger a=\frac{m^2\omega^2x^2+p^2+im\omega[x,p]}{2m\hbar\omega}=\frac{H}{\hbar\omega}-\frac12
$$

[x,p]=iℏ，使最后一项为负的 mωℏ。零点项正来自这个不对易。

**步骤 3**

$$
[a,a^\dagger]=1,\quad H=\hbar\omega(a^\dagger a+\tfrac12),\quad[H,a^\dagger]=\hbar\omega a^\dagger
$$

因此若 Hψ=Eψ，非零的 a†ψ 能量为 E+ℏω，非零的 aψ 能量为 E−ℏω。

**步骤 4**

$$
\lVert a\psi\rVert^2=\frac E{\hbar\omega}-\frac12\ge0
$$

反复降阶不能越过非负范数的下限；阶梯必须终止于被 a 湮灭的最低态。

**步骤 5**

$$
a\psi_0=0\Rightarrow\frac{d\psi_0}{dx}=-\frac{m\omega}{\hbar}x\psi_0\Rightarrow\psi_0=\left(\frac{m\omega}{\pi\hbar}\right)^{1/4}e^{-m\omega x^2/(2\hbar)}
$$

最后一步用高斯积分归一化。

**步骤 6**

$$
E_n=(n+\tfrac12)\hbar\omega,\quad a|n\rangle=\sqrt n|n-1\rangle,\quad a^\dagger|n\rangle=\sqrt{n+1}|n+1\rangle
$$

系数由范数确定，不是任意约定；n 从 0 开始。

**步骤 7**

$$
|n\rangle=\frac{(a^\dagger)^n}{\sqrt{n!}}|0\rangle
$$

累计乘数 √1√2…√n=√n!。

#### 原书例 2.4—2.5 · 第一激发态与势能期待值

$$
\psi_1=a^\dagger\psi_0=\sqrt{\frac{2m\omega}{\hbar}}\,x\psi_0
$$



#### 推导：把势能写成升降算符再求平均

**步骤 1**

$$
x=\sqrt{\frac\hbar{2m\omega}}(a+a^\dagger),\quad V=\frac{\hbar\omega}{4}(a^2+aa^\dagger+a^\dagger a+(a^\dagger)^2)
$$

展开平方时 aa† 与 a†a 都必须保留。

**步骤 2**

$$
\langle n|a^2|n\rangle=\langle n|(a^\dagger)^2|n\rangle=0
$$

它们将 n 移到 n∓2，与原态正交。

**步骤 3**

$$
\langle V\rangle_n=\frac{\hbar\omega}{4}[(n+1)+n]=\frac12E_n,\quad\langle T\rangle_n=\frac12E_n
$$

同样可以得到 ⟨x⟩=⟨p⟩=0、σxσp=(n+1/2)ℏ；只有基态达到 ℏ/2。

### 2.3.2 解析法：级数为什么必须终止

#### 推导：无量纲化、剥离渐近解、推导递推式

**步骤 1**

$$
\xi=\sqrt{m\omega/\hbar}\,x,\quad K=2E/(\hbar\omega),\quad\psi\prime\prime(\xi)=(\xi^2-K)\psi
$$

将所有物理常数收进 ξ 与 K。

**步骤 2**

$$
\psi=e^{-\xi^2/2}h(\xi)\Rightarrow h\prime\prime-2\xi h\prime+(K-1)h=0
$$

先求 ψ′、ψ″ 并代回；抵消 ξ²h 项。

**步骤 3**

$$
h=\sum_{j=0}^{\infty}a_j\xi^j\Rightarrow(j+1)(j+2)a_{j+2}+(K-1-2j)a_j=0
$$

将二阶导数的求和指标平移两位，比较每一个 ξʲ 的系数。

**步骤 4**

$$
a_{j+2}=\frac{2j+1-K}{(j+1)(j+2)}a_j
$$

偶系数链由 a₀ 决定，奇系数链由 a₁ 决定。

**步骤 5**

$$
K=2n+1\Rightarrow a_{n+2}=0,\qquad h\propto H_n(\xi)
$$

若链不终止，大 j 的递推会产生类似 exp(ξ²) 的增长，乘高斯后仍不平方可积。物理解选择一条截断链，并将另一条链的起始系数置零。

$$
\psi_n(x)=\frac{(m\omega/\pi\hbar)^{1/4}}{\sqrt{2^n n!}}H_n(\xi)e^{-\xi^2/2}
$$



前几项 $H_0=1$、$H_1=2\xi$、$H_2=4\xi^2-2$、$H_3=8\xi^3-12\xi$。可用 $H_{n+1}=2\xi H_n-2nH_{n-1}$ 与代数法逐项核对。经典转折点为 $x_t=\sqrt{2E/(m\omega^2)}$；量子波函数在其外仍有衰减尾部。

**互动：给谐振子逐级加能量**（请在同章 HTML 中运行，源码可展开。）

## 2.4 自由粒子

原书 PDF 第 45—52 页。

自由粒子并不意味着波函数不随时间变化。$V=0$ 时 $\psi=Ae^{ikx}+Be^{-ikx}$，其中 $E=\hbar^2k^2/(2m)$。没有盒子边界来筛选 k，所以谱连续。单个平面波不能在整个实轴上归一化；物理的局域态由连续叠加构成。

#### 推导：从 Fourier 变换构造整个初值问题

**步骤 1**

$$
\Psi(x,0)=\frac1{\sqrt{2\pi}}\int\phi(k)e^{ikx}dk,\quad \phi(k)=\frac1{\sqrt{2\pi}}\int\Psi(x,0)e^{-ikx}dx
$$

先选定一对互逆的归一化约定，不要混入动量表象的 √ℏ 因子。

**步骤 2**

$$
\Psi(x,t)=\frac1{\sqrt{2\pi}}\int\phi(k)e^{i[kx-\hbar k^2t/(2m)]}dk
$$

每个 k 的能量不同，需分别加时间因子。

**步骤 3**

$$
\int|\Psi(x,t)|^2dx=\int|\phi(k)|^2dk=1
$$

由 Plancherel 等距性；|φ(k)|² 是 k 的概率密度，动量 p=ℏk 的密度则除以 ℏ。

#### 原书例 2.6 · 初始矩形波包：位置变窄，波数分布变宽

$$
\Psi(x,0)=\begin{cases}(2a)^{-1/2},&|x|<a\\0,&|x|>a\end{cases}
$$



#### 推导：直接计算 Fourier 积分

**步骤 1**

$$
\phi(k)=\frac1{\sqrt{4\pi a}}\int_{-a}^{a}e^{-ikx}dx=\frac{\sin ka}{k\sqrt{\pi a}}
$$

k=0 的值用极限 φ(0)=√(a/π)，不能直接以 0/0 处理。

**步骤 2**

$$
|\phi(k)|^2=\frac a\pi\left(\frac{\sin ka}{ka}\right)^2
$$

第一对零点在 k=±π/a；a 越大，中央峰越窄。矩形边缘不光滑，某些高阶动量矩会发散，不能把第一零点宽度当作有限的标准差。

#### 推导：相速度与群速度的区别来自哪一步？

**步骤 1**

$$
\omega(k)=\frac{\hbar k^2}{2m},\quad v_{ph}=\frac\omega k=\frac{\hbar k}{2m}
$$

这是固定相位 kx−ωt 的移动速度，不是包络速度。

**步骤 2**

$$
k=k_0+s,\quad\omega(k)\approx\omega_0+\omega_0\prime s
$$

对窄波数带作一阶展开，暂时忽略导致扩散的二次项。

**步骤 3**

$$
\Psi\approx e^{i(k_0x-\omega_0t)}\frac1{\sqrt{2\pi}}\int\phi(k_0+s)e^{is(x-\omega_0\prime t)}ds
$$

积分中的初始包络以 x−ω₀′t 的组合整体平移。

**步骤 4**

$$
v_g=\omega_0\prime=\frac{\hbar k_0}{m}=\frac{p_0}{m}
$$

对自由粒子群速度恰为相速度的两倍。保留 ω″ 项后包络不再严格保形。

**互动：追着包络走，不要追着每个波峰走**（请在同章 HTML 中运行，源码可展开。）

## 2.5 δ 函数势：束缚态与散射态

原书 PDF 第 52—59 页。

### 2.5.1 两类解的区别，在无穷远处最清楚

若势能在两端趋于常数，E 低于两端渐近势能时，可寻找两端均衰减的束缚态；E 高于至少一侧渐近势能时，存在振荡的散射通道。常用的两端 $V\to0$ 情形，束缚态通常 E<0，散射态 E>0。这里的“散射本征态”本身非普通归一化态，真实入射粒子仍须用波包表示。

### 2.5.2 δ 势：先推接续，再谈能量

取 $V(x)=-\alpha\delta(x)$，α>0。δ 的定义是 $\int\delta(x-a)f(x)dx=f(a)$，它的强度 α 具有能量×长度单位。波函数连续，但一阶导数有跳跃。

#### 推导：跨过奇点积分，得到跳跃条件

**步骤 1**

$$
-\frac{\hbar^2}{2m}\int_{-\epsilon}^{\epsilon}\psi\prime\prime dx-\alpha\int_{-\epsilon}^{\epsilon}\delta(x)\psi(x)dx=E\int_{-\epsilon}^{\epsilon}\psi dx
$$

将定态方程在奇点两侧积分。

**步骤 2**

$$
-\frac{\hbar^2}{2m}[\psi\prime(0^+)-\psi\prime(0^-)]-\alpha\psi(0)=0
$$

ε→0 时，有限函数的普通积分为零，δ 项留下有限贡献。

**步骤 3**

$$
\psi\prime(0^+)-\psi\prime(0^-)=-\frac{2m\alpha}{\hbar^2}\psi(0)
$$

对于有限非奇异势，这个跳跃为零。δ 势是必须例外处理的模型。

#### 推导：唯一的束缚态：衰减条件加连续性

**步骤 1**

$$
E<0,\quad\kappa=\sqrt{-2mE}/\hbar,\quad\psi=\begin{cases}Be^{\kappa x},&x<0\\Fe^{-\kappa x},&x>0\end{cases}
$$

剔除两个无穷远处增长的解。

**步骤 2**

$$
B=F,\quad-\kappa F-\kappa B=-\frac{2m\alpha}{\hbar^2}B\Rightarrow\kappa=\frac{m\alpha}{\hbar^2}
$$

连续性与导数跳跃条件共同固定 κ。

**步骤 3**

$$
1=2|B|^2\int_0^\infty e^{-2\kappa x}dx=\frac{|B|^2}{\kappa}
$$

归一化固定振幅，不固定能量；能量已经由接续条件确定。

**步骤 4**

$$
\psi=\sqrt\kappa e^{-\kappa|x|},\quad E=-\frac{m\alpha^2}{2\hbar^2}
$$

没有第二个可独立选择的 κ，因此只有一个束缚态。排斥 δ 势会要求 κ<0，与衰减条件冲突，故无束缚态。

**互动：越窄的束缚态，越深的能量**（请在同章 HTML 中运行，源码可展开。）

#### 推导：正能量散射：振幅怎样变成概率流比例

**步骤 1**

$$
\psi=\begin{cases}e^{ikx}+r e^{-ikx},&x<0\\t e^{ikx},&x>0\end{cases},\quad k=\sqrt{2mE}/\hbar
$$

只从左边入射，已将入射振幅除为 1；这里 t 是透射振幅，不是时间。

**步骤 2**

$$
1+r=t,\quad ikt-ik(1-r)=-2\kappa t
$$

把连续性与跳跃条件分别写一遍。

**步骤 3**

$$
r=-\frac\kappa{\kappa+ik},\quad t=\frac{ik}{\kappa+ik}
$$

消去 t 或 r 解二元方程。

**步骤 4**

$$
J_{in}=\frac{\hbar k}{m},\quad J_{ref}=-\frac{\hbar k}{m}|r|^2,\quad J_{tr}=\frac{\hbar k}{m}|t|^2
$$

J=(ℏ/m)Im(ψ*ψ′)。反射流方向为负，因此 R 定义时再取负号。

**步骤 5**

$$
R=\frac{\kappa^2}{k^2+\kappa^2},\quad T=\frac{k^2}{k^2+\kappa^2},\quad R+T=1
$$

两侧波数相同，才可把透射概率写成 |t|²。两侧势能不同时必须补速度比。

## 2.6 有限深方势阱

原书 PDF 第 59—63 页。

取 $V=-V_0$（$|x|<a$），阱外 V=0，V₀>0。束缚态能量必须满足 −V₀<E<0。定义阱内波数 $q=\sqrt{2m(E+V_0)}/\hbar$，阱外衰减率 $\kappa=\sqrt{-2mE}/\hbar$。为了不与角动量 l 混淆，这里用 q 代替原书此处的 l。

#### 推导：偶态匹配：两条边界式相除，消去振幅

**步骤 1**

$$
\psi(x)=\begin{cases}C\cos qx,&0<x<a\\F e^{-\kappa x},&x>a\end{cases},\quad\psi(-x)=\psi(x)
$$

偶势下可取确定宇称的本征态，只需在 +a 处匹配。

**步骤 2**

$$
C\cos qa=Fe^{-\kappa a},\qquad -qC\sin qa=-\kappa Fe^{-\kappa a}
$$

波函数与导数在有限势阶跃处连续。

**步骤 3**

$$
q\tan qa=\kappa
$$

两式相除消去 C、F。

**步骤 4**

$$
z=qa,\quad z_0=a\sqrt{2mV_0}/\hbar,\quad\kappa a=\sqrt{z_0^2-z^2}
$$

利用 q²+κ²=2mV₀/ℏ²。

**步骤 5**

$$
z\tan z=\sqrt{z_0^2-z^2},\quad E=\frac{\hbar^2}{2ma^2}(z^2-z_0^2)
$$

只接受 0<z<z₀ 的根；正切极点不是本征根。

#### 推导：奇态与两个极限（奇态是原书习题 2.29 的补全）

**步骤 1**

$$
\psi=C\sin qx\ (0<x<a)\Rightarrow q\cot qa=-\kappa
$$

将外侧导数比 ψ′/ψ=−κ 与内侧 q cot qa 相等。

**步骤 2**

$$
-z\cot z=\sqrt{z_0^2-z^2}
$$

奇态方程与偶态必须分支求根，不要跨越函数的极点做一次整体二分。

**步骤 3**

$$
z_0\gg1:\quad E_n+V_0\approx\frac{n^2\pi^2\hbar^2}{2m(2a)^2}
$$

宽深阱趋近宽度 2a 的硬墙阱；偶、奇解交替给出完整能谱。

**步骤 4**

$$
z_0\ll1:\quad z\tan z\approx z^2,\quad\kappa a\approx z_0^2
$$

浅窄阱仍有一个偶束缚态；最低奇态需 z₀>π/2 才出现。

**步骤 5**

$$
E\approx-\frac{2ma^2V_0^2}{\hbar^2}
$$

由 κa≈z₀² 得到。若令 α=2aV₀ 固定并令 a→0，就回到 δ 阱的束缚能。

**互动：逐渐加深一个有限阱**（请在同章 HTML 中运行，源码可展开。）

#### 推导：散射态的四个匹配条件与透射率

**步骤 1**

$$
\psi_L=Ae^{ikx}+Be^{-ikx},\quad\psi_M=C\sin qx+D\cos qx,\quad\psi_R=Fe^{ikx}
$$

此时 E>0，k=√(2mE)/ℏ，q=√(2m(E+V₀))/ℏ。

**步骤 2**

$$
\psi_L(-a)=\psi_M(-a),\quad\psi_L\prime(-a)=\psi_M\prime(-a),\quad\psi_M(a)=\psi_R(a),\quad\psi_M\prime(a)=\psi_R\prime(a)
$$

共四条线性方程。先由右侧两式解 C、D，再代入左侧，避免一次操作四个未知量。

**步骤 3**

$$
C=Fe^{ika}\left[\sin qa+i\frac{k}{q}\cos qa\right],\quad D=Fe^{ika}\left[\cos qa-i\frac{k}{q}\sin qa\right]
$$

这是把右边的振幅与导数用旋转矩阵逆变换回中间区域。

**步骤 4**

$$
t=\frac FA=\frac{e^{-2ika}}{\cos(2qa)-i\frac{k^2+q^2}{2kq}\sin(2qa)}
$$

将 C、D 代回后消去反射振幅 B，得到 t。

**步骤 5**

$$
|t|^{-2}=\cos^2(2qa)+\frac{(k^2+q^2)^2}{4k^2q^2}\sin^2(2qa)
$$

取模平方，并用相位因子模为 1。

**步骤 6**

$$
T=\left[1+\frac{V_0^2}{4E(E+V_0)}\sin^2(2qa)\right]^{-1}
$$

利用 (k²+q²)²−4k²q²=(q²−k²)²，把式子整理为 1 加正数。

**步骤 7**

$$
2qa=N\pi\Rightarrow T=1,\quad E_N+V_0=\frac{N^2\pi^2\hbar^2}{8ma^2}
$$

正能量范围内的这些点发生透射共振；与宽 2a 的硬墙驻波条件相呼应。

> **这一章真正反复使用的算法** 写各区域通解 → 用可归一化或入射条件剔除项 → 写完全部边界式 → 先解能量或散射振幅 → 最后归一化并计算可观测量。仅背最后一个 T 或 En，不足以处理改过边界的新问题。

## 原书对应清单

- 2.1 分离变量、定态三性质、例2.1
- 2.2 边界量子化、正交与完备、例2.2—2.3
- 2.3.1 升降算符、基态、系数、例2.4—2.5
- 2.3.2 幂级数递推、截断、Hermite 波函数
- 2.4 Fourier 初值解、例2.6、相速与群速
- 2.5.1—2 δ 势导数跳跃、束缚态与流比
- 2.6 偶/奇束缚态、深浅极限、四边界散射与共振