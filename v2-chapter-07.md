# 第 7 章 · 变分原理 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 7.1 理论与三个试探函数例题

原书 PDF 第 218—223 页。

#### 推导：为什么任意合适试探态都给上界

**步骤 1**

$$
|\psi\rangle=\sum_n c_n|n\rangle,\quad\sum_n|c_n|^2=1
$$

将归一化试探态展开在真实但未必已知的能量本征基中。连续谱时加入积分。

**步骤 2**

$$
\mathcal E[\psi]=\langle\psi|H|\psi\rangle=\sum_n|c_n|^2E_n\ge E_0\sum_n|c_n|^2=E_0
$$

所有权重非负，平均值不会低于最小值。

**步骤 3**

$$
\mathcal E[\phi]=\frac{\langle\phi|H|\phi\rangle}{\langle\phi|\phi\rangle}
$$

未归一化的函数可直接用 Rayleigh 商；试探态必须满足边界且具有有限能量。

#### 原书例7.1 · 用高斯求谐振子上界

#### 推导：归一化、积分、极小化

**步骤 1**

$$
\psi_b=Ae^{-bx^2},\quad A=(2b/\pi)^{1/4},\quad\langle x^2\rangle=1/(4b)
$$

b>0；利用高斯积分及对 b 求导得到二阶矩。

**步骤 2**

$$
\langle T\rangle=\frac{\hbar^2}{2m}\int|\psi_b\prime|^2dx=\frac{\hbar^2b}{2m},\quad\langle V\rangle=\frac{m\omega^2}{8b}
$$

ψ′=−2bxψ，表面项消失。

**步骤 3**

$$
\frac{d\mathcal E}{db}=\frac{\hbar^2}{2m}-\frac{m\omega^2}{8b^2}=0\Rightarrow b_*=\frac{m\omega}{2\hbar}
$$

动能随 b 增大，势能随 b 减小；最优值在二者平衡处。

**步骤 4**

$$
\mathcal E(b_*)=\hbar\omega/2
$$

恰好取到真实波函数形状，因此上界等于精确值；一般问题没有这种保证。

**互动：让试探宽度寻找最低能量**（请在同章 HTML 中运行，源码可展开。）

#### 原书例7.2 · 同一个高斯用于吸引 δ 势

$$
\mathcal E(b)=\frac{\hbar^2b}{2m}-\alpha\sqrt{\frac{2b}\pi},\quad b_*={2m^2\alpha^2\over\pi\hbar^4}
$$



$$
\mathcal E_{\min}=-\frac{m\alpha^2}{\pi\hbar^2}>-\frac{m\alpha^2}{2\hbar^2}=E_0
$$



δ 势能直接抽取原点密度。高斯缺少真解的原点尖点，所以即使参数最优，也不能给精确能量。注意负数中“上界”是较不负的数。

#### 原书例7.3 · 有折角的三角试探态

$$
\psi=A x\ (0<x<a/2),\quad\psi=A(a-x)\ (a/2<x<a),\quad A=\sqrt{12/a^3}
$$



$$
\mathcal E=\frac{\hbar^2}{2m}\int_0^a|\psi\prime|^2dx=\frac{6\hbar^2}{ma^2}>\frac{\pi^2\hbar^2}{2ma^2}
$$



两段二阶导数都为零，不意味着动能为零：折角使 ψ″ 有分布项。能量二次型 ∫|ψ′|² 是这里更稳妥的计算方式。把未满足阱外为零的高斯直接放进无限深势阱，反而得到无限能量。

> **激发态上界需要额外约束** 若试探态严格正交于所有更低本征态，相同证明才能给相应激发能上界。偶势的一维非简并基态为偶函数，因此奇试探态可以估第一奇态；任意第二个试探函数并不会自动估第二能级。

## 7.2 氦原子基态：把屏蔽变成参数

原书 PDF 第 223—228 页。

让两个电子使用有效核电荷 Z 的氢型 1s 轨道，真实核电荷保持 2。空间乘积态对称，配自旋单态。Z 是变分参数，不是把核中质子数改变。

#### 推导：电子排斥积分为何得到 5Z/8

**步骤 1**

$$
\phi_Z(r)=\sqrt{Z^3/(\pi a_0^3)}e^{-Zr/a_0},\quad\psi=\phi_Z(r_1)\phi_Z(r_2)
$$

每个轨道归一化。

**步骤 2**

$$
\int d\Omega_2\frac1{|\mathbf r_1-\mathbf r_2|}=\frac{4\pi}{\max(r_1,r_2)}
$$

取 r₁ 为极轴，令 u=r₁²+r₂²−2r₁r₂cosθ，直接积分得到壳层公式。

**步骤 3**

$$
\left\langle\frac1{r_{12}}\right\rangle=2(4\pi)^2\left(\frac{Z^3}{\pi a_0^3}\right)^2\int_0^\infty dr_1\,r_1e^{-2Zr_1/a_0}\int_0^{r_1}dr_2\,r_2^2e^{-2Zr_2/a_0}
$$

按 r₁>r₂ 与反区域分割；二者相等，故乘 2。角积分已完成。

**步骤 4**

$$
\left\langle\frac1{r_{12}}\right\rangle=\frac{5Z}{8a_0}
$$

对指数乘多项式逐项积分；用 ∫rⁿe⁻ᵇʳdr=n!/bⁿ⁺¹。

**步骤 5**

$$
\mathcal E(Z)=E_h\left[Z^2-4Z+\frac58Z\right]=E_h\left[Z^2-\frac{27}8Z\right]
$$

Eh=e²/(4πε₀a₀)≈27.2 eV。两个电子动能为 Z²Eh，真实核吸引为 −4ZEh。

**步骤 6**

$$
Z_*={27\over16},\quad\mathcal E_*=-\frac{729}{256}E_h\simeq-77.5\ {\rm eV}
$$

比固定 Z=2 的约 −74.8 eV 更低，仍高于真实基态约 −79.0 eV。

#### 推导：排斥积分最后两行的计算细节

**步骤 1**

$$
b=2Z/a_0,\quad\int_0^{r_1}r_2^2e^{-br_2}dr_2=\frac2{b^3}-e^{-br_1}\left(\frac{r_1^2}b+\frac{2r_1}{b^2}+\frac2{b^3}\right)
$$

先对内积分两次分部积分；在 r₂=0 的下限留下 2/b³。

**步骤 2**

$$
J=\int_0^\infty r_1e^{-br_1}\left[\frac2{b^3}-e^{-br_1}\left(\frac{r_1^2}b+\frac{2r_1}{b^2}+\frac2{b^3}\right)\right]dr_1
$$

将角积分后的径向部分记为 J。

**步骤 3**

$$
J=\frac2{b^5}-\frac{3!}{b(2b)^4}-\frac{2\cdot2!}{b^2(2b)^3}-\frac2{b^3(2b)^2}=\frac5{8b^5}
$$

逐项用阶乘积分，四项都具有长度⁵单位。

**步骤 4**

$$
2(4\pi)^2\frac{Z^6}{\pi^2a_0^6}J=\frac{5Z}{8a_0}
$$

代回 b=2Z/a₀，检查最后单位为逆长度。

**互动：优化一个有效电荷，降低变分上界**（请在同章 HTML 中运行，源码可展开。）

最优 Z 小于 2，反映另一个电子的屏蔽。这个乘积试探态没有显式 r₁₂ 相关，进一步加入相关因子会扩大试探空间，最优能量可以继续降低。剥离第一个电子的能量不是 |EHe|，而是 EHe⁺−EHe；He⁺ 本身还带负的束缚能。

## 7.3 氢分子离子：从重叠积分到化学键

原书 PDF 第 228—237 页。

在 Born–Oppenheimer 近似中先固定两个质子，相距 R。一个电子同时被两个核吸引；核间排斥最后必须加回。选氢 1s 原子轨道 φA、φB 的对称组合。

#### 推导：LCAO 归一化与能量商

**步骤 1**

$$
\psi_+=\frac{\phi_A+\phi_B}{\sqrt{2(1+S)}},\quad S=\langle\phi_A|\phi_B\rangle
$$

两个轨道各自归一化，但并不正交。

**步骤 2**

$$
S=e^{-x}(1+x+x^2/3),\quad x=R/a_0
$$

选择 A 为原点，B 为极轴；令 rB²=r²+R²−2rRcosθ，角积分转成 rB 积分后，径向分 r<R、r>R 两段。

**步骤 3**

$$
D=\left\langle\phi_A\left|\frac{a_0}{r_B}\right|\phi_A\right\rangle=\frac1x-(1+1/x)e^{-2x},\quad X=\left\langle\phi_A\left|\frac{a_0}{r_A}\right|\phi_B\right\rangle=(1+x)e^{-x}
$$

D 是直接积分，X 是交叠的吸引积分。定义为无量纲，避免和有能量单位的交换矩阵元混淆。

**步骤 4**

$$
E_{\rm el}=E_{\rm H}\left[1+2\frac{D+X}{1+S}\right]
$$

用 HAφA=EHφA，把大部分微分算符替换成本征值，只剩另一个核的吸引。EH=−Eh/2。

**步骤 5**

$$
E_{\rm tot}(R)=E_{\rm el}(R)+\frac{E_h}{x}
$$

加回质子—质子排斥；R→∞ 时应回到 EH，而 R→0 核排斥发散。

**互动：两核靠近，什么时候会成键？**（请在同章 HTML 中运行，源码可展开。）

曲线在 R 约 2.4a₀ 附近低于分离极限，得到约 1.8 eV 的结合能。这不是精确实验值，而是此试探族的预测。只要一个合适试探态已低于解离阈值，变分上界就证明真实体系至少存在更低的束缚态。

**自测：为什么能量上界反而给结合能下界？**

<details><summary>查看答案</summary>

以固定的解离能量减去分子基态能量定义结合能。基态能量估得偏高，则两者的差估得偏小。

</details>

## 原书对应清单

- 7.1：上界证明、原书例7.1—7.3与激发态约束
- 7.2：氦排斥六维积分的角化简、Z 极小化
- 7.3：重叠、直接与交换积分、核排斥与结合能