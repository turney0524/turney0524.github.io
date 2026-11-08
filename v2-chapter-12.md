# 第 12 章 · 后记：量子力学的概念问题 · 详细第二版

沿原书章节顺序独立整理；展示公式编号以 HTML 为准。

## 12.1 EPR 佯谬

原书 PDF 第 323—324 页。

原书借 Bohm 的自旋版本讨论 EPR：两粒子形成总自旋零的单态，分开后分别测自旋。若两端同轴，结果完全相反。EPR 的论证把“能无扰动地确定预测”当作实在性标准，再加入远端选择不改变本地物理实在的定域性，质疑波函数描述是否完备。

#### 推导：单态的反相关与本地随机

**步骤 1**

$$
|\Psi^-\rangle=\frac{|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle}{\sqrt2}
$$

不是“两个粒子各自已经有一个未知箭头”的简单经典混合。

**步骤 2**

$$
\rho_A={\rm Tr}_B|\Psi^-\rangle\langle\Psi^-|=I/2
$$

对 B 求偏迹，两种本地结果各 1/2。

**步骤 3**

$$
\langle(\boldsymbol\sigma_A\cdot\mathbf a)(\boldsymbol\sigma_B\cdot\mathbf b)\rangle=-\mathbf a\cdot\mathbf b
$$

单态满足 ⟨σAiσBj⟩=−δij。两端比较记录，才显出随夹角变化的相关。

> **相关性不等于可控信号** B 端改变测量轴但不传递结果时，A 的约化态仍是 I/2。A 不能只用自己的数据判断 B 的选择。这里讨论的是统计相关与定域隐变量限制，不能把它描述成可以发出超光速消息。

## 12.2 Bell 定理：保留原书三方向证明

原书 PDF 第 324—328 页。

#### 推导：原书 Bell 不等式逐步推导

**步骤 1**

$$
A(\mathbf a,\lambda)=\pm1,\quad B(\mathbf b,\lambda)=\pm1,\quad B(\mathbf a,\lambda)=-A(\mathbf a,\lambda)
$$

定域响应只依赖本地轴与共同变量；最后一个条件来自同轴完全反相关。测量设置还假设与 λ 的分布独立。

**步骤 2**

$$
P(\mathbf a,\mathbf b)=-\int\rho(\lambda)A(\mathbf a,\lambda)A(\mathbf b,\lambda)d\lambda
$$

ρ≥0 且积分为 1；这里 P 是乘积的平均，不是某一结果的概率。

**步骤 3**

$$
P(\mathbf a,\mathbf b)-P(\mathbf a,\mathbf c)=-\int\rho A(\mathbf a)A(\mathbf b)[1-A(\mathbf b)A(\mathbf c)]d\lambda
$$

用 A(b)²=1 将差提取共同因子。

**步骤 4**

$$
|P(\mathbf a,\mathbf b)-P(\mathbf a,\mathbf c)|\le\int\rho[1-A(\mathbf b)A(\mathbf c)]d\lambda=1+P(\mathbf b,\mathbf c)
$$

因 A=±1，方括号非负；用三角不等式并识别最后的相关函数。

**步骤 5**

$$
\angle(\mathbf a,\mathbf b)=90^\circ,\quad\angle(\mathbf a,\mathbf c)=\angle(\mathbf b,\mathbf c)=45^\circ
$$

三个共面方向，c 在中间。

**步骤 6**

$$
\frac1{\sqrt2}\le1-\frac1{\sqrt2}
$$

代入量子 P=−cosθ，左边约 0.707，右边约 0.293，明显违背。

这说明上述局域共同变量模型不能重现全部量子相关，而不单是“某一种 λ 不好”。若允许非定域隐变量、改变设置独立性等假设，论证范围也相应变化。不要将结论写成已经排除了所有可能的隐变量理论。

### 教学扩展：四方向 CHSH 更便于交互操作

$$
S=E(a,b)+E(a,b\prime)+E(a\prime,b)-E(a\prime,b\prime),\quad|S|\le2
$$

每个 λ 下把式子分成 A(B+B′)+A′(B−B′)，两个括号恰好一个为零、另一个为 ±2，再平均。

**互动：调四个轴中的一对，跨过经典关联界限**（请在同章 HTML 中运行，源码可展开。）

该演示采用四方向 CHSH；上面的正文保留原书三方向 Bell 证明。两者都检验局域模型的约束，所用组合和数值界限不同。量子 CHSH 最大值为 $2\sqrt2$，不能误与三方向不等式的右边混用。

## 12.3 无复本定理

原书 PDF 第 328—329 页。

#### 推导：幺正性与线性给出的两种证明

**步骤 1**

$$
U|\psi\rangle|0\rangle=|\psi\rangle|\psi\rangle,\quad U|\phi\rangle|0\rangle=|\phi\rangle|\phi\rangle
$$

假设同一个设备能无误复制任意未知纯态。空白寄存器相同。

**步骤 2**

$$
\langle\psi|\phi\rangle=\langle\psi|\phi\rangle^2
$$

幺正演化保内积；输出两个拷贝使内积变为平方。

**步骤 3**

$$
s=s^2\Rightarrow s=0\ \text{or}\ 1
$$

不同非正交态不满足，故不存在普适完美克隆机。相位等价的态可先选择统一代表。

**步骤 4**

$$
U\frac{|0\rangle+|1\rangle}{\sqrt2}|0\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}\ne\frac{(|0\rangle+|1\rangle)(|0\rangle+|1\rangle)}2
$$

若设备会复制计算基，线性规定叠加态的输出为纠缠态，而不是两个独立拷贝。

**互动：CNOT 会复制基态，却不会复制叠加**（请在同章 HTML 中运行，源码可展开。）

无复本禁止普适、确定、精确地复制未知态；不禁止复制经典正交记录，也不禁止已知制备方法重复制备同一态。测量未知态后按测量结果重新制备，通常已丢失原态的相干信息。

## 12.4 薛定谔猫与测量问题

原书 PDF 第 329—330 页。

把微观事件、仪器记录与宏观对象都纳入线性演化，就会得到不同记录之间的纠缠。问题不是人的目光有什么特殊作用，而是：幺正演化如何与每次实验出现一个确定记录相联系？原书在这里讨论测量界线，不给出一个从普通薛定谔方程就能推出唯一结果的证明。

#### 推导：教学扩展：用约化态分清退相干解决到哪一步

**步骤 1**

$$
(\alpha|0\rangle+\beta|1\rangle)|M_0\rangle|E_0\rangle\to\alpha|0\rangle|M_0^\prime\rangle|E_0^\prime\rangle+\beta|1\rangle|M_1^\prime\rangle|E_1^\prime\rangle
$$

记录与环境都携带分支信息。

**步骤 2**

$$
\rho_{0M,1M}=\alpha\beta^*\langle E_1^\prime|E_0^\prime\rangle
$$

忽略环境即求偏迹，非对角元乘环境态重叠。

**步骤 3**

$$
\langle E_1^\prime|E_0^\prime\rangle\to0\Rightarrow\rho_{SM}\simeq|\alpha|^2|0M_0\rangle\langle0M_0|+|\beta|^2|1M_1\rangle\langle1M_1|
$$

局域干涉项被压低，解释为何宏观记录看起来稳定经典。

**互动：人口没变，干涉却淡了**（请在同章 HTML 中运行，源码可展开。）

> **不要越过结论** 退相干解释可观察干涉为何消失；只做偏迹并没有在整体纯态中选出一个唯一分支。不同测量诠释对这一点有不同回答。此处密度矩阵推导是帮助阅读原书的补充，不冒充原书已完整展开的内容。

## 12.5 量子 Zeno 佯谬

原书 PDF 第 330—332 页。

#### 推导：先推短时二次律，再讨论重复测量

**步骤 1**

$$
\mathcal A(t)=\langle\psi|e^{-iHt/\hbar}|\psi\rangle=1-\frac{i\langle H\rangle t}\hbar-\frac{\langle H^2\rangle t^2}{2\hbar^2}+\cdots
$$

假定初态能量二阶矩有限；展开的是振幅。

**步骤 2**

$$
P(t)=|\mathcal A(t)|^2=1-\frac{(\Delta H)^2t^2}{\hbar^2}+\cdots=1-t^2/\tau_Z^2+\cdots
$$

一阶纯虚项在模平方中抵消；τZ=ℏ/ΔH。

**步骤 3**

$$
P_N(T)=\left[P(T/N)\right]^N\simeq\left(1-\frac{T^2}{N^2\tau_Z^2}\right)^N\to1
$$

每次理想投影检查是否仍在初态，计算 N 次全存活概率。只有 T/N 落在二次窗口内才适用。

**步骤 4**

$$
\left[e^{-T/(N\tau)}\right]^N=e^{-T/\tau}
$$

若从头到尾使用指数衰变模型，重复检查并不改变结果。Zeno 的关键正是极短时非指数区。

**互动：更多次投影，抑制短时跃迁**（请在同章 HTML 中运行，源码可展开。）

理想投影、有限测量时长、测量引起的实际相互作用须区分。这个推导展示一个可检验动力学效应，并不能单凭它判决所有波函数塌缩诠释。

**自测：频繁“想一想”体系，会不会冻结它？**

<details><summary>查看答案</summary>

不会。推导里的测量是与体系发生物理作用的记录或投影过程，并且测量间隔与短时尺度有定量要求。

</details>

## 原书对应清单

- 12.1：EPR 前提、单态和本地边缘分布
- 12.2：原书三方向 Bell 完整代数；CHSH 另标为扩展
- 12.3：内积与线性两种无复本证明
- 12.4：猫与测量界线；退相干约化态为教学扩展
- 12.5：二次存活律、重复投影极限与指数对照