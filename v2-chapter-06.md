# 第 6 章 · 定态微扰论 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 6.1 非简并微扰论

原书 PDF 第 174—181 页。

微扰论的对象是一个已知可解的 $H_0$ 加上较小的 W。“小”主要比较混合矩阵元与相关能级间隔，而不是只看某个势能的绝对数值。先把 λ 当记账参数，最后令 λ=1。

#### 推导：6.1.1 一阶能量与一阶态逐阶配对

**步骤 1**

$$
H=H_0+\lambda W,\quad|n\rangle=|n^0\rangle+\lambda|n^1\rangle+\cdots,\quad E_n=E_n^0+\lambda E_n^1+\lambda^2E_n^2+\cdots
$$

原书的 H′ 在此记为 W，以避免与求导符号混淆。

**步骤 2**

$$
(H_0-E_n^0)|n^1\rangle=-(W-E_n^1)|n^0\rangle
$$

代入 H|n⟩=En|n⟩，匹配 λ 的系数。

**步骤 3**

$$
E_n^1=\langle n^0|W|n^0\rangle
$$

左乘 ⟨n⁰|，左边因 H₀ 厄米且 |n⁰⟩ 是本征态而消失。

**步骤 4**

$$
\langle m^0|n^1\rangle=\frac{W_{mn}}{E_n^0-E_m^0}\quad(m\ne n)
$$

改投影到不同本征态，能量差作为混合的代价。

**步骤 5**

$$
|n^1\rangle=\sum_{m\ne n}\frac{W_{mn}}{E_n^0-E_m^0}|m^0\rangle,\qquad\langle n^0|n^1\rangle=0
$$

最后一个条件是方便的一阶归一化与相位选择。连续谱部分还要相应积分。

#### 原书例6.1 · 把无限深阱整体抬高与只抬高一半

$$
W(x)=V_0\Rightarrow W_{mn}=V_0\delta_{mn}\Rightarrow E_n^1=V_0,\ |n^1\rangle=0
$$



$$
W(x)=V_0\ (0<x<a/2):\quad E_n^1=\frac{2V_0}{a}\int_0^{a/2}\sin^2\frac{n\pi x}{a}\,dx=\frac{V_0}2
$$



整体抬高的结果已经精确；只抬高一半时，一阶能量相同，但非对角矩阵元不都为零，波函数与更高阶能量仍会改变。

#### 推导：6.1.2 二阶能量的分母从哪来

**步骤 1**

$$
(H_0-E_n^0)|n^2\rangle=-(W-E_n^1)|n^1\rangle+E_n^2|n^0\rangle
$$

匹配 λ²。

**步骤 2**

$$
E_n^2=\langle n^0|W|n^1\rangle=\sum_{m\ne n}\frac{|W_{mn}|^2}{E_n^0-E_m^0}
$$

代入一阶态；W 厄米保证分子为模平方。

**步骤 3**

$$
E_0^2\le0,\qquad\left|\frac{\lambda W_{mn}}{E_n^0-E_m^0}\right|\ll1
$$

基态分母均负。若分母接近零，应把相关态一起对角化。

**互动：用一个有精确解的问题，检验微扰展开**（请在同章 HTML 中运行，源码可展开。）

## 6.2 简并微扰论

原书 PDF 第 181—190 页。

#### 推导：6.2.1 二重简并：先在子空间内解矩阵

**步骤 1**

$$
|\psi^0\rangle=a|a\rangle+b|b\rangle,\quad H_0|a\rangle=E^0|a\rangle,\ H_0|b\rangle=E^0|b\rangle
$$

原来任意线性组合都可作基；微扰会挑出具有稳定极限的方向。

**步骤 2**

$$
\begin{pmatrix}W_{aa}&W_{ab}\\W_{ba}&W_{bb}\end{pmatrix}\binom ab=E^1\binom ab
$$

将一阶方程投影到整个简并子空间。

**步骤 3**

$$
E_\pm^1=\frac{W_{aa}+W_{bb}}2\pm\frac12\sqrt{(W_{aa}-W_{bb})^2+4|W_{ab}|^2}
$$

行列式为零给能移；相应本征向量给好初态。

**步骤 4**

$$
[A,H_0]=[A,W]=0,\quad A|a\rangle=a_A|a\rangle,\ A|b\rangle=b_A|b\rangle\Rightarrow(a_A-b_A)W_{ab}=0
$$

若另一个对称性算符区分两态，非对角矩阵元自动为零。

### 6.2.2 任意重简并

对 g 维简并空间 P，计算 $PWP$ 的 g×g 矩阵并对角化；得到的本征向量才是非简并公式向空间外求和时应使用的零阶态。若 PWP 仍有简并，必须再看高阶有效矩阵，不能任意代入零分母。

#### 对应原书立方阱例的显式计算 · 三重简并被四分之一体积的微扰分裂

用边长 a 的立方阱，选 |112⟩、|121⟩、|211⟩。在 0<x<a/2、0<y<a/2、0<z<a 区域加 V₀，作为明确的坐标约定。

$$
\int_0^{a/2}\frac2a\sin\frac{\pi x}a\sin\frac{2\pi x}a\,dx=\frac4{3\pi},\qquad\int_0^{a/2}\frac2a\sin^2\frac{n\pi x}a\,dx=\frac12
$$



$$
PWP=V_0\begin{pmatrix}1/4&0&0\\0&1/4&16/(9\pi^2)\\0&16/(9\pi^2)&1/4\end{pmatrix}
$$



z 方向的正交性切断第一态与另外两态的混合。三个一阶能移是 V₀/4、V₀(1/4±16/(9π²))，后两态为 (|121⟩±|211⟩)/√2。选择另一个相邻四分之一区域可以改变非对角元符号，但不改变这三个能移。

**互动：两条能级，靠近却不相交**（请在同章 HTML 中运行，源码可展开。）

## 6.3 氢原子的精细结构

原书 PDF 第 190—200 页。

本节把相对论动能修正和自旋—轨道耦合加到氢原子上；采用非相对论态求首阶矩阵元。能级精度只到 $\alpha^4mc^2$，不是完整的相对论理论。

#### 推导：6.3.1 相对论动能修正

**步骤 1**

$$
T=\sqrt{m^2c^4+p^2c^2}-mc^2=\frac{p^2}{2m}-\frac{p^4}{8m^3c^2}+\cdots
$$

对 p/(mc) 展开。首项已在 H₀ 中，下一项才是微扰。

**步骤 2**

$$
\Delta E_{\rm rel}=-\frac{\langle p^4\rangle}{8m^3c^2}=-\frac1{2mc^2}\langle(E_n-V)^2\rangle
$$

利用 p²ψ=2m(E−V)ψ，按范数计算 ⟨p⁴⟩，避免错误地对 (E−V)²ψ 直接再次作用微分算符。

**步骤 3**

$$
\langle V\rangle=2E_n,\quad\langle r^{-2}\rangle=\frac1{a_0^2n^3(l+1/2)}
$$

前式是 Coulomb 势的 virial 关系；后式由径向积分得到。

**步骤 4**

$$
\Delta E_{\rm rel}=-\frac{E_n^2}{2mc^2}\left[\frac{4n}{l+1/2}-3\right]
$$

先展开 E²−2E⟨V⟩+⟨V²⟩，再代入径向矩。

#### 推导：把相对论能移中的三个期待值真正合并

**步骤 1**

$$
C=\frac{e^2}{4\pi\epsilon_0},\quad E_n=-\frac{\hbar^2}{2ma_0^2n^2},\quad C=\frac{\hbar^2}{ma_0}
$$

统一常数，暂按固定核质量 m。

**步骤 2**

$$
E_n^2-2E_n\langle V\rangle+\langle V^2\rangle=-3E_n^2+C^2\langle r^{-2}\rangle
$$

由 ⟨V⟩=2En 直接代入，注意 En 本身为负。

**步骤 3**

$$
\frac{C^2\langle r^{-2}\rangle}{E_n^2}=\frac{4n}{l+1/2}
$$

分子为 ℏ⁴/[m²a₀⁴n³(l+1/2)]，分母为 ℏ⁴/(4m²a₀⁴n⁴)，常数全消。

**步骤 4**

$$
j=l+1/2:\quad\langle\mathbf L\cdot\mathbf S\rangle=\hbar^2l/2,\quad j=l-1/2:\quad\langle\mathbf L\cdot\mathbf S\rangle=-\hbar^2(l+1)/2
$$

把两种 j 分别代入 [j(j+1)−l(l+1)−3/4]ℏ²/2；l=0 时不存在下支。

#### 推导：6.3.2 自旋—轨道耦合与总角动量基

**步骤 1**

$$
H_{\rm SO}=\frac1{2m^2c^2r}\frac{dV}{dr}\mathbf L\cdot\mathbf S=\frac{e^2}{8\pi\epsilon_0m^2c^2r^3}\mathbf L\cdot\mathbf S
$$

电子瞬时静止系的磁场加 Thomas 因子 1/2，给出该系数。

**步骤 2**

$$
\mathbf L\cdot\mathbf S=\frac12(J^2-L^2-S^2),\quad\langle r^{-3}\rangle=\frac1{a_0^3n^3l(l+1/2)(l+1)}\quad(l>0)
$$

用 |n,l,j,mj⟩ 可同时对角化。电子 s=1/2。

**步骤 3**

$$
\Delta E_{\rm fs}=-\frac{mc^2\alpha^4}{2n^4}\left[\frac n{j+1/2}-\frac34\right]
$$

将相对论与自旋—轨道能移相加，l 依赖合并为 j 依赖。

> **s 态的边界** ⟨r⁻³⟩ 的公式不适用于 l=0。对 s 态不能把一个发散积分乘 L=0 来代替计算；完整的这一阶结果还需 Darwin 接触项。这里给出的通用精细结构能式包含这一补充，不宣称仅用上面的 l>0 径向积分就已证明 s 态。

#### 精细结构算例 · n=2：把结果落到具体能级

$$
\Delta E_{2,j=1/2}=-\frac{5}{128}mc^2\alpha^4,\quad\Delta E_{2,j=3/2}=-\frac1{128}mc^2\alpha^4
$$



$$
E_{2,3/2}-E_{2,1/2}=\frac{mc^2\alpha^4}{32}
$$



在这一阶，2s1/2 与 2p1/2 仍简并；这里没有包含 Lamb 位移。对 j=1/2、l=1 的 p 态，弱场 gJ=2/3；对 j=3/2 则 gJ=4/3。对 l=0 的 s1/2，gJ=2。把这些数代回下一节，可画出不同磁量子数的线性分裂。

## 6.4 Zeeman 效应：三种磁场范围

原书 PDF 第 200—208 页。

#### 推导：6.4.1 弱场：保持 j 为好量子数

**步骤 1**

$$
H_Z=\frac{\mu_B B}{\hbar}(L_z+2S_z)=\frac{\mu_BB}{\hbar}(J_z+S_z)
$$

忽略电子反常磁矩，场沿 z。

**步骤 2**

$$
\langle S_z\rangle=\frac{\langle\mathbf S\cdot\mathbf J\rangle}{j(j+1)\hbar^2}m_j\hbar
$$

固定 j,mj 的态中，期望矢量只有 J 方向；点乘 J 求投影系数。

**步骤 3**

$$
g_J=1+\frac{j(j+1)+s(s+1)-l(l+1)}{2j(j+1)},\quad\Delta E_Z=\mu_BBg_Jm_j
$$

磁场能移小于精细结构分裂时成立；j=0 的态另取零一阶磁矩。

### 6.4.2 强场

$$
\Delta E_Z=\mu_BB(m_l+2m_s),\quad\Delta E_{\rm SO}=A m_lm_s
$$

这里 HSO=A L·S/ℏ²。磁场大于自旋—轨道分裂、但仍小于主要壳层间隔，改用 |l,ml⟩|s,ms⟩；耦合是随后的小修正。

#### 推导：6.4.3 中间场：不用硬拼两个极限

**步骤 1**

$$
|1\rangle=|m_l=m_j-1/2,\uparrow\rangle,\quad|2\rangle=|m_l=m_j+1/2,\downarrow\rangle
$$

固定 n,l,mj，只需这两个乘积态。

**步骤 2**

$$
H=\begin{pmatrix}A(m_j/2-1/4)+b(m_j+1/2)&\frac A2\sqrt{(l+1/2)^2-m_j^2}\\\frac A2\sqrt{(l+1/2)^2-m_j^2}&-A(m_j/2+1/4)+b(m_j-1/2)\end{pmatrix},\quad b=\mu_BB
$$

非对角元来自 L₊S₋+L₋S₊，直接用升降算符系数。公共的径向与相对论能移省略在矩阵外。

**步骤 3**

$$
E_\pm=-\frac A4+bm_j\pm\frac12\sqrt{(Am_j+b)^2+A^2[(l+1/2)^2-m_j^2]}
$$

解二阶特征方程，自动连续连接弱场与强场。极端 mj=±(l+1/2) 只存在一个基态，不能虚增第二支。

**互动：弱磁场如何拆开 mj 简并？**（请在同章 HTML 中运行，源码可展开。）

## 6.5 超精细结构

原书 PDF 第 208—217 页。

质子也有自旋和磁矩。基态空间球对称，磁偶极相互作用的角平均留下接触项；质子磁矩包含实验的 $g_p$ 因子。

#### 推导：从接触相互作用到 21 cm 线

**步骤 1**

$$
H_{\rm hf}=A\frac{\mathbf I\cdot\mathbf S}{\hbar^2},\quad A=\frac{\mu_0g_pe^2\hbar^2}{3\pi m_em_pa_0^3}
$$

对 1s 用 |ψ(0)|²=1/(πa₀³)，电子 g 取 2。A 的单位是能量。

**步骤 2**

$$
\mathbf I\cdot\mathbf S=\frac12(F^2-I^2-S^2),\quad I=S=1/2
$$

将质子和电子的自旋相加。

**步骤 3**

$$
E_{F=1}=A/4,\quad E_{F=0}=-3A/4,\quad\Delta E=A,\quad\lambda=hc/A\simeq21\ {\rm cm}
$$

三重态与单态的间隔极小；宏观天文观测可以利用这条线。

**自测：为什么有些微扰要先换基，有些直接求期待值？**

<details><summary>查看答案</summary>

非简并本征态的零阶方向已经确定；简并空间内任何组合都一样好，微扰会在其中产生同阶混合，所以必须先对角化 PWP。

</details>

## 原书对应清单

- 6.1：一阶态、二阶能移与原书半阱例
- 6.2：二重和多重简并、对称性选基、立方阱计算
- 6.3：p⁴、径向矩、精细结构与 l=0 限制
- 6.4：弱场、强场、固定 mj 的中间场矩阵
- 6.5：接触项与超精细分裂