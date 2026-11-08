---
{"slug":"berry","title":"Berry 相：走回原点，为何还留下一个相位","category":"notes","summary":"从瞬时本征态的相位自由度出发，理解规范变换与自旋绕行的立体角。","date":"2026-11-08","tags":["几何相位","量子力学"],"minutes":8,"label":"概念与计算"}
---
哈密顿量慢慢改变，最后回到原来的样子，量子态是否也完全回去？即使没有跃迁到别的能级，态还会积累动力学相位和几何相位。

## 1. 绝热跟随不等于系数恒定

对非简并、与其他能级保持适当能隙的瞬时本征态，写

$$
|\Psi(t)\rangle=e^{-\frac{i}{\hbar}\int_0^tE_n(t')dt'}e^{i\gamma_n(t)}|n(t)\rangle.
$$

代入含时方程，能量项相消，投影到本征态得到

$$
\dot\gamma_n=i\langle n|\dot n\rangle.
$$

参数 R 绕闭路 C 变化时，几何相位是

$$
\gamma_n=\oint_C\mathbf A_n\cdot d\mathbf R,\qquad\mathbf A_n=i\langle n|\nabla_{\mathbf R}n\rangle.
$$

## 2. 相位约定变了，物理是否也变了

重新选择本征矢 $|n\rangle\to e^{i\chi(\mathbf R)}|n\rangle$，直接求导可得 $\mathbf A_n\to\mathbf A_n-\nabla\chi$。闭合路径的相位因子不变；单独的开放路径积分则依赖相位规范，需要端点比较才能形成完整物理量。

## 3. 一次能亲手算完的绕行

沿单位方向 $\mathbf n$ 的自旋向上态可选为

$$
|+\mathbf n\rangle=\begin{pmatrix}\cos(\theta/2)\\e^{i\phi}\sin(\theta/2)\end{pmatrix}.
$$

只让方位角变化：

$$
i\langle+\mathbf n|\partial_\phi|+\mathbf n\rangle=-\sin^2(\theta/2)=-\frac{1-\cos\theta}{2}.
$$

固定 θ 绕行一周，得到 $\gamma_+=-\pi(1-\cos\theta)=-\Omega/2$，Ω 是路径包围的有向立体角。几何相位依赖路径，而动力学相位还依赖行进用了多长时间。

> 相位不是都能单独测到。干涉实验比较两条分支的相对相位；只有一个孤立分支的整体相位不改变测量概率。

## 延伸阅读

[量子力学第十章](../v2-chapter-10.html)中可以操作磁场绕行与 Aharonov–Bohm 干涉演示。本笔记沿用其中的相位约定，不将几何相位与动力学相位混为一谈。
