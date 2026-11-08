# 第 11 章 · 散射 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 11.1 从经典轨道到量子散射振幅

原书 PDF 第 301—305 页。

#### 推导：11.1.1 经典微分截面是面积与立体角的比

**步骤 1**

$$
d\sigma=2\pi b\,db,\quad d\Omega=2\pi\sin\theta\,d\theta
$$

轴对称入射束中，碰撞参数 b 的环带被散射到 θ 的锥带。

**步骤 2**

$$
\frac{d\sigma}{d\Omega}=\frac b{\sin\theta}\left|\frac{db}{d\theta}\right|
$$

若同一 θ 对应多个 b，需将各分支截面相加。

**步骤 3**

$$
b=a\cos(\theta/2)\Rightarrow\frac{d\sigma}{d\Omega}=a^2/4,\quad\sigma=\pi a^2
$$

硬球反射几何中 θ=π−2α、b=a sinα。积分过 4π 得几何面积。

**步骤 4**

$$
b=\frac C{2E}\cot\frac\theta2\Rightarrow\frac{d\sigma}{d\Omega}=\left(\frac C{4E}\right)^2\frac1{\sin^4(\theta/2)}
$$

排斥 Coulomb 势 V=C/r 的 Rutherford 轨道；前向微分截面发散。

**互动：一条轨迹，连接碰撞参数和偏转角**（请在同章 HTML 中运行，源码可展开。）

#### 推导：11.1.2 量子截面来自概率流

**步骤 1**

$$
\psi\sim A\left[e^{ikz}+f(\theta,\phi)\frac{e^{ikr}}r\right]
$$

远处入射平面波加外向球面波，弹性散射 k 相同。f 有长度单位。

**步骤 2**

$$
j_{\rm in}=|A|^2\hbar k/m,\quad j_{\rm sc}=|A|^2\hbar k|f|^2/(mr^2)
$$

把两支分别放入 j=(ℏ/m)Im(ψ*∇ψ)，取散射球面波的主导径向项。

**步骤 3**

$$
\frac{d\sigma}{d\Omega}=\frac{j_{\rm sc}r^2}{j_{\rm in}}=|f|^2
$$

r² 抵消了球面波的扩散。一般非弹性通道还要乘末态与初态的速度比。

## 11.2 分波法

原书 PDF 第 305—309 页。

### 11.2.1 理论表述：把每个角动量通道分开

#### 推导：中心势中的自由径向基

**步骤 1**

$$
\psi=\sum_{l=0}^\infty R_l(r)P_l(\cos\theta),\quad R_l\prime\prime+\frac2rR_l\prime+\left[k^2-\frac{l(l+1)}{r^2}-\frac{2mV}{\hbar^2}\right]R_l=0
$$

绕入射 z 轴对称，所以只需 m=0。

**步骤 2**

$$
V=0:\quad R_l=A_lj_l(kr)+B_ln_l(kr)
$$

球 Bessel 与球 Neumann 函数给两个自由解。

**步骤 3**

$$
e^{ikr\cos\theta}=\sum_l(2l+1)i^lj_l(kr)P_l(\cos\theta)
$$

把入射平面波也展开到同一套角向基。

**步骤 4**

$$
f(\theta)=\sum_l(2l+1)a_lP_l(\cos\theta)
$$

定义分波振幅 al。所有角向花纹来自这些通道相干叠加。

### 11.2.2 计算技巧：原点正则、界面接续、远处归一

实际计算先在势能内部求原点正则的径向解，再于势的边界连续接上 ψ 与 ψ′，最后用已知的入射系数确定每个外向波。中心势让三维偏微分方程变为一组一维常微分方程；低能时离心势会压低高 l 通道。

#### 原书硬球散射例 · 低能截面为何是经典值的四倍

$$
R_l(a)=0,\qquad ka\ll1:\quad R_0\propto\frac{\sin[k(r-a)]}{kr}
$$



$$
f\simeq-a,\quad\sigma\simeq4\pi a^2
$$



量子长波极限由 s 波支配，向各方向近似各向同性。这里的 4πa² 与经典 πa² 比较；不能把“低能 s 波极限”外推到高能。

## 11.3 相移与通道幺正性

原书 PDF 第 309—312 页。

#### 推导：用一个实相移编码每个弹性通道

**步骤 1**

$$
R_l\propto\frac1{kr}\sin(kr-l\pi/2+\delta_l)
$$

短程实势远处的径向波相对自由解发生相位位移。

**步骤 2**

$$
S_l=e^{2i\delta_l},\quad a_l=\frac{S_l-1}{2ik}=\frac{e^{i\delta_l}\sin\delta_l}k
$$

把正弦拆成入射与出射指数，对照入射平面波的分波系数。

**步骤 3**

$$
f(\theta)=\frac1k\sum_l(2l+1)e^{i\delta_l}\sin\delta_lP_l(\cos\theta)
$$

弹性势无吸收时 δl 为实数，|Sl|=1。

**步骤 4**

$$
\sigma=\frac{4\pi}{k^2}\sum_l(2l+1)\sin^2\delta_l
$$

平方后用 ∫PₗPₗ′dΩ=4πδₗₗ′/(2l+1)，总截面中的不同 l 交叉项消失。

**步骤 5**

$$
\sigma_l\le\frac{4\pi}{k^2}(2l+1),\quad\sigma=\frac{4\pi}k{\rm Im}f(0)
$$

分别是单通道幺正界和纯弹性情况下的光学定理。

**步骤 6**

$$
\tan\delta_l=\frac{k j_l\prime(ka)-\beta_lj_l(ka)}{k n_l\prime(ka)-\beta_ln_l(ka)},\quad\beta_l=R_l\prime(a)/R_l(a)
$$

对外解 jₗcosδ−nₗsinδ 求对数导数，与内部接续；撇号对函数自变量求导。

**互动：s 波加上 p 波，角分布就不再圆**（请在同章 HTML 中运行，源码可展开。）

硬球极限对应 β→∞，故 tanδl=jl(ka)/nl(ka)；l=0 给 δ₀≈−ka。若某个准束缚态使 δl 经过 π/2，该通道截面接近幺正峰，形成共振。

## 11.4 Born 近似与积分方程

原书 PDF 第 312—322 页。

#### 推导：11.4.1 由 Green 函数得到外向边界条件

**步骤 1**

$$
(\nabla^2+k^2)\psi=\frac{2m}{\hbar^2}V\psi,\quad(\nabla^2+k^2)G_+(\mathbf r)=-4\pi\delta^3(\mathbf r)
$$

先约定 Green 函数的 −4π，避免不同教材的系数混淆。

**步骤 2**

$$
G_+(\mathbf r)=e^{ikr}/r
$$

r≠0 直接微分满足齐次方程；在原点小球积分给 −4π。+ik 选择外向波。

**步骤 3**

$$
\psi(\mathbf r)=e^{i\mathbf k\cdot\mathbf r}-\frac m{2\pi\hbar^2}\int\frac{e^{ik|\mathbf r-\mathbf r\prime|}}{|\mathbf r-\mathbf r\prime|}V(\mathbf r\prime)\psi(\mathbf r\prime)d^3r\prime
$$

把源与 Green 函数卷积，并加上指定入射的齐次解。

**步骤 4**

$$
|\mathbf r-\mathbf r\prime|\simeq r-\widehat{\mathbf r}\cdot\mathbf r\prime\Rightarrow f=-\frac m{2\pi\hbar^2}\int e^{-i\mathbf k\prime\cdot\mathbf r\prime}V(\mathbf r\prime)\psi(\mathbf r\prime)d^3r\prime
$$

远场分母取 r，相位仍须保留一阶项。k′=k r̂。

#### 推导：11.4.2 一级 Born：一次代入平面波

**步骤 1**

$$
\psi(\mathbf r\prime)\simeq e^{i\mathbf k\cdot\mathbf r\prime}\Rightarrow f_B=-\frac m{2\pi\hbar^2}\int e^{-i\mathbf q\cdot\mathbf r}V(\mathbf r)d^3r,\quad\mathbf q=\mathbf k\prime-\mathbf k
$$

散射振幅就是势能的 Fourier 分量乘常数。

**步骤 2**

$$
V=V(r):\quad f_B=-\frac{2m}{\hbar^2q}\int_0^\infty rV(r)\sin(qr)dr,\quad q=2k\sin(\theta/2)
$$

取 q 为极轴，角积分 4πsin(qr)/(qr)。q→0 应先取 sin(qr)/q→r。

#### 原书软球例 · 有限常势球的全部角度

$$
V(r)=V_0\ (r<a):\quad f_B=-\frac{2mV_0}{\hbar^2}\frac{\sin qa-qa\cos qa}{q^3}
$$



$$
ka\ll1:\quad f_B\simeq-\frac{2mV_0a^3}{3\hbar^2},\quad\sigma_B=\frac{16\pi m^2V_0^2a^6}{9\hbar^4}
$$



把 sinz−zcosz 展开为 z³/3 得低能极限。令 V₀→∞ 会发散，说明 Born 不能这样用来求硬球。

#### 原书例11.5—11.6 · Yukawa 势与 Coulomb 极限

$$
V(r)=\beta e^{-\mu r}/r,\quad\int_0^\infty e^{-\mu r}\sin(qr)dr=\frac q{q^2+\mu^2}
$$



$$
f_B=-\frac{2m\beta}{\hbar^2(q^2+\mu^2)}
$$



μ>0 控制作用程。形式上 μ→0 得 Rutherford 微分截面；纯 Coulomb 势长程，在普通短程散射渐近式与 Born 收敛论证上有额外细节，不能据此宣称任意 Coulomb 波函数都近似为平面波。

**互动：屏蔽长度，如何改变小角散射？**（请在同章 HTML 中运行，源码可展开。）

### 11.4.3 Born 级数

$$
\psi=\phi+GV\psi=\phi+GV\phi+GVGV\phi+\cdots
$$

这里 G 吸收上面的常数与符号。每次迭代增加一次散射；势对入射态的改变须足够弱，级数才有用。高能通常更有利，但不是任何高能势都自动满足条件。

## 原书对应清单

- 11.1：经典硬球与 Rutherford、概率流截面
- 11.2：平面波展开、径向接续、硬球低能值
- 11.3：S 矩阵、相移、总截面和对数导数
- 11.4：Green 函数、Born Fourier 积分、软球与 Yukawa 例、级数