# 第 9 章 · 含时微扰论 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 9.1 两能级体系与时间依赖的系数

原书 PDF 第 265—270 页。

### 9.1.1 微扰体系：先把精确方程写出来

#### 推导：分离已知的自由时间相位

**步骤 1**

$$
|\Psi(t)\rangle=\sum_n c_n(t)e^{-iE_nt/\hbar}|n\rangle,\quad H=H_0+W(t)
$$

|n⟩ 是 H₀ 的完备本征态，系数变化承担真正的跃迁动力学。

**步骤 2**

$$
i\hbar\sum_n\dot c_ne^{-iE_nt/\hbar}|n\rangle=\sum_nW(t)c_ne^{-iE_nt/\hbar}|n\rangle
$$

对时间求导后，En 项与 H₀ 项相消。

**步骤 3**

$$
\dot c_m=-\frac i\hbar\sum_nW_{mn}(t)e^{i\omega_{mn}t}c_n,\quad\omega_{mn}=(E_m-E_n)/\hbar
$$

投影到 ⟨m| 并补回自由相位；这一步没有微扰近似。

**步骤 4**

$$
\dot c_a=-\frac i\hbar W_{ab}e^{-i\omega_0t}c_b,\quad\dot c_b=-\frac i\hbar W_{ba}e^{i\omega_0t}c_a
$$

两能级且对角元为零，ω₀=(Eb−Ea)/ℏ>0。厄米性确保 |ca|²+|cb|² 守恒。

### 9.1.2 含时微扰论的逐次代入

#### 推导：从初始 a 态到一阶跃迁振幅

**步骤 1**

$$
c_a^{(0)}=1,\quad c_b^{(0)}=0\Rightarrow c_b^{(1)}(t)=-\frac i\hbar\int_0^tW_{ba}(t\prime)e^{i\omega_0t\prime}dt\prime
$$

把零阶系数放入精确右端再积分。

**步骤 2**

$$
c_a^{(2)}(t)=-\frac1{\hbar^2}\int_0^tdt_1\int_0^{t_1}dt_2\,W_{ab}(t_1)W_{ba}(t_2)e^{-i\omega_0(t_1-t_2)}
$$

二次迭代带时间排序；回到 a 态的修正是二阶振幅。

**步骤 3**

$$
P_{a\to b}=|c_b^{(1)}|^2+\cdots\ll1
$$

一阶振幅对应二阶的小概率。若算出大于 1，就超出近似范围，不能把结果硬截到 1。

**互动：短脉冲宽谱，长脉冲窄谱**（请在同章 HTML 中运行，源码可展开。）

### 9.1.3 正弦微扰与共振

#### 推导：两个频率分母与旋转波近似

**步骤 1**

$$
W(t)=V\cos\omega t,\quad c_b^{(1)}=-\frac{V_{ba}}{2\hbar}\left[\frac{e^{i(\omega_0+\omega)t}-1}{\omega_0+\omega}+\frac{e^{i(\omega_0-\omega)t}-1}{\omega_0-\omega}\right]
$$

把 cos 写成两个指数，逐项积分。

**步骤 2**

$$
\Delta=\omega_0-\omega,\quad P_{a\to b}\simeq\frac{|V_{ba}|^2}{\hbar^2}\frac{\sin^2(\Delta t/2)}{\Delta^2}
$$

接近共振时慢旋转项占主导；要求 |Δ|、|Vba|/ℏ 远小于 ω₀+ω。

**步骤 3**

$$
P_{a\to b}(\Delta=0)\simeq\frac{|V_{ba}|^2t^2}{4\hbar^2}
$$

取 sinx/x 的极限，共振并不意味着真的发散。

**步骤 4**

$$
P_{a\to b}^{\rm RWA}=\frac{\Omega^2}{\Omega^2+\Delta^2}\sin^2\left(\frac{\sqrt{\Omega^2+\Delta^2}}2t\right),\quad\Omega=|V_{ba}|/\hbar
$$

在旋转波哈密顿量内精确解 2×2 方程，得到有界的 Rabi 振荡。RWA 本身仍是一种近似。

**互动：共振时转移，失谐时打折**（请在同章 HTML 中运行，源码可展开。）

**自测：静态耦合也会让原来的两态占据振荡，矛盾吗？**

<details><summary>查看答案</summary>

不矛盾。原来的 |a⟩、|b⟩ 是 H₀ 的态，不是加入耦合后完整 H 的能量本征态。完整静态 H 的能量测量概率仍不变。

</details>

## 9.2 辐射的吸收与发射

原书 PDF 第 270—274 页。

### 9.2.1 电磁波与偶极近似

$$
H_I=-\mathbf d\cdot\mathbf E(t),\quad\mathbf d=q\mathbf r,\quad\lambda\gg a_0
$$

原子尺度内把电场看作均匀，忽略较高多极项和磁耦合。电子 q=−e，因此沿 z 电场的势能可写 +eEz。

### 9.2.2 吸收与受激发射

交换初态末态，厄米性给 $|V_{ab}|=|V_{ba}|$，因此同一光场导致的吸收与受激发射概率相同。要得到净光放大，需要考虑粒子数反转。经典外场模型关闭外场后不能自己生成自发发射；那需要量子化电磁场，或用下一节热平衡关系间接求系数。

#### 推导：9.2.3 非相干宽谱：为什么概率改为正比于时间

**步骤 1**

$$
u=\epsilon_0E_0^2/2,\quad P(t)=\frac{2|d_{ba,z}|^2}{\epsilon_0\hbar^2}\int_0^\infty\rho(\omega)\frac{\sin^2[(\omega-\omega_0)t/2]}{(\omega-\omega_0)^2}d\omega
$$

非相干频率分量加概率；相干场必须先加振幅再平方。ρ 是每单位角频率的能量密度。

**步骤 2**

$$
\int_{-\infty}^{\infty}\frac{\sin^2(\Delta t/2)}{\Delta^2}d\Delta=\pi t/2
$$

换元 x=Δt/2，使用 ∫(sinx/x)²dx=π。

**步骤 3**

$$
\rho(\omega)\simeq\rho(\omega_0),\quad R=\frac{dP}{dt}=\frac{\pi|\mathbf d_{ba}|^2}{3\epsilon_0\hbar^2}\rho(\omega_0)
$$

谱在宽约 1/t 的共振窗内平滑；各向同性方向平均带来 1/3。

> **线性增长的时间窗口** 时间须足够长，使共振核窄于谱变化尺度；又须足够短，使跃迁概率仍小。极短时间总是先出现二次增长，不能把恒定跃迁率外推到 t=0。

## 9.3 自发发射、寿命和选择定则

原书 PDF 第 274—283 页。

#### 推导：9.3.1 Einstein 系数与 Planck 热平衡

**步骤 1**

$$
\dot N_b=-AN_b-B_{ba}\rho N_b+B_{ab}\rho N_a
$$

A 是自发发射率，Bρ 是受激过程速率。这里先取非简并能级。

**步骤 2**

$$
\frac{N_b}{N_a}=e^{-\hbar\omega_0/k_BT},\quad\rho=\frac A{B_{ab}e^{\hbar\omega_0/k_BT}-B_{ba}}
$$

平衡令上式为零，再使用 Boltzmann 人口比。

**步骤 3**

$$
B_{ab}=B_{ba}=B,\quad\frac AB=\frac{\hbar\omega_0^3}{\pi^2c^3}
$$

逐项与 Planck 角频率谱比较。若合并简并能级，吸收与发射 B 还要乘简并度关系。

**步骤 4**

$$
A_{b\to a}=\frac{\omega_{ba}^3|\mathbf d_{ab}|^2}{3\pi\epsilon_0\hbar c^3}
$$

代入上节求得的 B。这是电偶极自发跃迁率。

#### 推导：9.3.2 多个衰变通道的寿命

**步骤 1**

$$
\frac{dN_b}{dt}=-\left(\sum_{a<b}A_{b\to a}\right)N_b,\quad N_b(t)=N_b(0)e^{-t/\tau},\quad\tau^{-1}=\sum_{a<b}A_{b\to a}
$$

独立末态的速率相加。单通道时 τ=1/A；自然线宽能量尺度 Γ=ℏ/τ。

#### 氢原子 2p→1s 的具体计算 · 把选择定则允许的矩阵元算到末尾

#### 推导：取初态 2p,m=0 与 z 偏振

**步骤 1**

$$
Y_{00}=1/\sqrt{4\pi},\quad Y_{10}=\sqrt{3/(4\pi)}\cos\theta,\quad\int Y_{00}^*\cos\theta Y_{10}d\Omega=1/\sqrt3
$$

利用 ∫cos²θ dΩ=4π/3；x、y 分量在该对态之间为零。

**步骤 2**

$$
R_{10}=2a_0^{-3/2}e^{-r/a_0},\quad R_{21}=\frac{r/a_0}{2\sqrt6a_0^{3/2}}e^{-r/(2a_0)}
$$

使用第四章已经归一化的两个径向函数。

**步骤 3**

$$
\int_0^\infty R_{10}R_{21}r^3dr=\frac1{\sqrt6a_0^4}\frac{4!}{[3/(2a_0)]^5}=\frac{256a_0}{81\sqrt6}
$$

体积元 r²dr 再乘位置算符 r，所以是 r³；R21 本身又含一个 r。

**步骤 4**

$$
|d_z|=e\frac{256a_0}{243\sqrt2},\quad A=\frac{\omega_0^3e^2a_0^2}{3\pi\epsilon_0\hbar c^3}\frac{2^{15}}{3^{10}}
$$

径向结果乘 1/√3，再平方。

**步骤 5**

$$
\hbar\omega_0\simeq10.2\ {\rm eV}\Rightarrow A\simeq6.3\times10^8\ {\rm s}^{-1},\quad\tau\simeq1.6\ {\rm ns}
$$

这些近似数用于展示量级。不同 m 的总自发发射率由旋转对称性相同；观测某个偏振与方向的强度则可以不同。

**互动：一条生存曲线，多个可能末态**（请在同章 HTML 中运行，源码可展开。）

#### 推导：9.3.3 选择定则：矩阵元为零才是根本原因

**步骤 1**

$$
\mathbf d_{ab}=q\int R_{n_al_a}^*R_{n_bl_b}\,r^3dr\int Y_{l_a}^{m_a*}\widehat{\mathbf r}\,Y_{l_b}^{m_b}d\Omega
$$

拆开径向与角向。即便角向允许，径向积分也可能很小或为零。

**步骤 2**

$$
\widehat r_z\propto Y_1^0,\quad\widehat r_x\pm i\widehat r_y\propto Y_1^{\pm1}\Rightarrow\Delta m=0,\pm1
$$

φ 积分选出磁量子数差，具体偏振再筛选其中分量。

**步骤 3**

$$
|l_a-l_b|\le1,\quad(-1)^{l_a+l_b+1}=1\Rightarrow\Delta l=\pm1
$$

角动量三角条件结合位置算符的奇宇称，排除 Δl=0。

**步骤 4**

$$
\Delta s=0
$$

非相对论电偶极算符不作用在自旋部分。

**互动：先查对称性，再算矩阵元**（请在同章 HTML 中运行，源码可展开。）

氢的 2p→1s 有电偶极通道，而 2s→1s 的 l 不变，电偶极矩阵元为零；“禁戒”只针对这一阶相互作用，不等于任何机制下都永不衰变。更高多极或多光子过程仍可发生。

## 原书对应清单

- 9.1：精确系数方程、一阶积分、正弦两项、Rabi 对照
- 9.2：偶极近似、受激对称性、非相干积分与时间窗口
- 9.3：Einstein 平衡推导、寿命、多通道与角积分选择定则