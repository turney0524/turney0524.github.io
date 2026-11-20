---
{"slug": "topology-engineered-orbital-hall-2024", "title": "能带反转如何调节轨道霍尔效应：论文解读与图2模型检验", "category": "papers", "summary": "解读 Nano Letters 2024 的四幅主图，以 Kubo 计算检验双谷轨道反转机制；区分独立模型的定性结果、SI转录差异与尚未复现的角态。", "date": "2026-11-20", "tags": ["轨道霍尔效应", "拓扑相变", "二维磁体", "模型复现"], "minutes": 22, "label": "2024 论文回读 · 模型检验"}
---

电场驱动电子时，横向流动的不一定只有电荷或自旋，也可以是轨道角动量。这篇论文提出一个具体的调控思路：借助拓扑相变交换带隙两侧的轨道成分，进而改变轨道霍尔响应。关键在于，参与反转的轨道携带多少角动量，以及反转发生在哪个能谷。

## 题目、DOI与研究定位

**英文题目：** Topology-Engineered Orbital Hall Effect in Two-Dimensional Ferromagnets  
**作者：** Zhiqi Chen、Runhan Li、Yingxi Bai、Ning Mao、Mahmoud Zeer、Dongwook Go、Ying Dai、Baibiao Huang、Yuriy Mokrousov、Chengwang Niu。  
**期刊：** Nano Letters **24** (16), 4826–4833 (2024)，2024 年 4 月 15 日在线发表。  
**DOI：** [10.1021/acs.nanolett.3c05129](https://doi.org/10.1021/acs.nanolett.3c05129)。

这是一项**紧束缚模型与第一性原理相结合的理论研究**。以下逐图解读依据 Zotero 中保存的作者稿及 ACS 补充材料；作者稿亦可通过 [arXiv:2404.07820](https://arxiv.org/abs/2404.07820) 阅读。材料的应变调控与轨道霍尔电导是计算预测，并非本文已经完成的实验测量。

## 摘要提炼

论文研究的问题是：能否利用拓扑相变，有方向地调节二维磁体中的轨道霍尔效应？作者在蜂窝晶格多轨道模型中改变轨道在位能，使体系依次经历二阶拓扑绝缘体（SOTI）、量子反常霍尔绝缘体（QAHI）和普通绝缘体（NI）。随着两个不等价能谷先后发生能带反转，带边的轨道角动量分布改变，轨道霍尔电导随之逐级降低。

作者随后给出两类材料计算：Janus RuBrCl 展现以 Ru 的 d 轨道为主的双谷调控；三七层结构单元的 MnBi₂Te₄ 展现以 p 轨道为主的调控。两者共同支持“通过反转轨道成分来调节轨道输运”的思路，但不意味着所有拓扑相变都会使轨道霍尔电导减半或归零。

## 图文介绍：从机制到材料

### 图 1：为什么能带反转能影响轨道流？

![图1：拓扑相变调节轨道霍尔效应的示意图](../assets/papers/topology-orbital-hall/fig-01.png)

图 1(a) 画出带边主要由零角动量轨道构成的示意情形。这里关心的是垂直二维平面的轨道角动量 Lz：s、pz 和 dz² 在相应原子轨道子空间内具有 mz = 0；px、py 的复数组合具有 mz = ±1；dx²−y²、dxy 的复数组合则具有 mz = ±2。单个实轨道的平均角动量与这些复数组合的本征值需要区分。

图 1(b) 表示拓扑相变伴随的能带反转：不同轨道成分在导带和价带之间交换。图 1(c) 表示非零角动量轨道进入低能区后，电场诱导的轨道杂化可以产生横向角动量流。底部曲率示意强调，最终输运取决于整个布里渊区的积分，不能只看一处带边的轨道颜色。

这幅图说明的是作者构造机制的出发点。它没有证明“零角动量带边的所有普通绝缘体都没有轨道霍尔效应”，也没有把拓扑非平庸性变成 OHE 存在的必要条件。

### 图 2：在同一个模型里串起轨道反转、边界态与电导

![图2：多轨道紧束缚模型中的拓扑相变与轨道霍尔响应，论文原图](../assets/papers/topology-orbital-hall/fig-02.png)

**图 2(a)** 的蜂窝晶格包含两类格点：一类取 dz²、dx²−y²、dxy 三个轨道，另一类取 px、py 两个轨道，再加入自旋、近邻与次近邻跃迁、交换场和原子自旋轨道耦合。每个晶胞共有十个自旋轨道态。调节的是两个面内 d 轨道共同的在位能 ε₂。

**图 2(b)** 对应 ε₂ = 3.2、4.1、4.9 eV。紫色表示 dz² 权重，黄色表示 dx²−y²/dxy 权重；沿 Γ—+K—M—−K—Γ 的能带显示，两个谷的轨道成分先后交换。作者将三个参数点分别识别为 SOTI、QAHI 和 NI。认定拓扑相还需要边界态或拓扑指标，不能单凭颜色交换。

**图 2(c)** 给出 SOTI 参数下三角纳米片的离散能谱。红点标出作者选取的三个已占据角态，插图展示它们的总电荷密度集中在三个角。这里的横轴是本征态序号，插图则是实空间分布；它们都不是动量空间 Berry 曲率。有限体系的边界终止方式会影响具体谱线和角态位置。

**图 2(d)** 才是调控轨道霍尔效应的核心证据。横轴是费米能，纵轴是以 e/(2π) 为单位的二维轨道霍尔电导；阴影表示相应体带隙。作者报告隙内平台约为 **1.74 → 0.87 → 接近 0**。带隙内改变费米能不改变占据带集合，所以响应出现平台；平台本身并不表示轨道霍尔电导具有拓扑量子化。

**图 2(e)** 显示 QAHI 的手性边界通道，对应作者采用约定下的 Chern 数 C = 1。它与图 2(c) 的零维角态不同：前者沿一维边界传播，后者局域在角上。

**图 2(f)** 显示隙内费米能下占据态轨道 Berry 曲率的动量分布。SOTI 中两个不等价谷的主要贡献同号；进入 QAHI 后，一个谷附近变号；进入 NI 后，另一个谷也变号。NI 的近零电导来自谷附近与其余动量区域的贡献抵消，不表示曲率处处为零。图中的六个六角形顶点只有两类不等价谷，也不能将其当作六个独立谷相加。

### 图 3：Janus RuBrCl 用拉伸应变实现相同的调控链条

![图3：Janus RuBrCl 的轨道能带、角态、应变相变及霍尔响应](../assets/papers/topology-orbital-hall/fig-03.png)

图 3(a) 比较 0%、2%、4% 拉伸应变下的轨道分辨能带。材料在无应变时具有面外磁序，费米能附近主要是同一自旋通道的 Ru-d 态。两个谷的价带边以 dx²−y²/dxy 为主，导带边以 dz² 为主；应变逐渐交换这些成分。

图 3(b) 的三角纳米片能谱与角态密度为初始 SOTI 提供边界证据。作者还计算得到旋转对称性指标 χ⁽³⁾ = (−1, 2)，以及在其约定下的分数角电荷 2e/3。图 3(c) 显示两个谷的带隙约在 **0.8% 和 2.9%** 应变处先后闭合、重开，区分三个相区。

图 3(d) 是普通 Berry 曲率，图 3(e) 是反常电荷霍尔电导，图 3(f) 是 QAHI 的手性边界谱。它们共同支持中间相 C = 1，而两侧相 C = 0。

图 3(g) 换成轨道 Berry 曲率，图 3(h) 则给出轨道霍尔电导。作者报告隙内响应约 **1.30 → 0.67 → 接近 0**，单位仍为 e/(2π)。因此 C = 0 的初始相依然可以具有有限 OHC；电荷霍尔响应与轨道霍尔响应没有一一对应关系。RuBrCl 的这些数值也与图 2 的模型数值不同，体现了真实轨道混合和远离带边的能带贡献。

### 图 4：MnBi₂Te₄ 表明机制也适用于 p 轨道

![图4：三七层 MnBi2Te4 的能带反转、Wannier 电荷中心与轨道霍尔响应](../assets/papers/topology-orbital-hall/fig-04.png)

这里的三七层是三个 Te—Bi—Te—Mn—Te—Bi—Te 结构单元，合计 21 个原子层，并非只有三层原子。体系具有层内铁磁、层间反铁磁的磁结构，奇数个结构单元保留净磁矩，不能简单理解为所有 Mn 磁矩平行。

图 4(a,b) 对比 QAHI 与压缩应变诱导的 NI：Γ 点附近 Te-px/py 与 pz 的带边权重发生交换。图 4(c) 的 Wannier 电荷中心演化用于区分两相，QAHI 中具有相应的非平庸绕行，NI 中则没有。反转发生在 Γ 点，机制无需依赖前面的双谷图像。

图 4(d) 给出作者计算的 OHC：由约 **−1.88 变为 −1.28 e/(2π)**，其绝对值减小，但 NI 中仍有明显响应。这是全文一个重要的适用范围提醒：拓扑变化可以调节 OHE，却不保证普通绝缘体的 OHC 为零，也不保证响应按固定比例变化。

## 原理：轨道权重怎样进入 Kubo 响应？

论文使用的轨道角动量流算符为

$$
J_x^z=\frac{1}{2}\{v_x,L_z\},\qquad v_i=\frac{1}{\hbar}\frac{\partial H(\mathbf{k})}{\partial k_i}.
$$

它描述携带 z 分量轨道角动量、沿 x 方向流动的响应。采用论文的曲率和电荷符号约定，内禀轨道霍尔电导写成

$$
\sigma_{xy}^{z}=-e\int_{\mathrm{BZ}}\frac{d^2k}{(2\pi)^2}\sum_n f_n(\mathbf{k})\Omega^{O,z}_{n,xy}(\mathbf{k}),
$$

$$
\Omega^{O,z}_{n,xy}=2\hbar\,\operatorname{Im}\sum_{m\ne n}\frac{\langle u_n|J_x^z|u_m\rangle\langle u_m|v_y|u_n\rangle}{(E_n-E_m)^2}.
$$

这里 e 表示正的元电荷，f 是费米分布。带隙附近能量分母小，因而容易形成较强的曲率热点；但热点的符号和强度仍由矩阵元决定。能带反转同时改变波函数、速度矩阵元和角动量矩阵元，因而可以改变这些热点及其积分。

在图 2 和图 3 的特定轨道结构中，两个谷原先都提供较强的同向轨道响应。一个谷发生反转后，相关贡献被削弱或变号，总响应约减半；第二个谷也反转后，谷与背景贡献接近抵消。这是具体模型中的结果，不是从 Chern 数单独推出的定律。

轨道电流的定义同样重要。晶体中 Lz 一般不守恒，本文采用上述对易化乘积定义的常规轨道流；它的隙内平台不能直接等同于电荷量子霍尔的无耗散量子化电导，也不能据此宣称已经测得边界轨道积累。

## 图 2 的模型复现：算出了什么，尚未复现什么？

本次分两步计算：先逐式实现补充材料的五轨道模型，再用一个独立、明确修改过的三轨道模型验证体态机制。**目前完成的是定性机制验证，尚未完成论文图 2 全部面板的定量复现。**

### 第一步：核查补充材料的五轨道模型

补充材料 S1 的矩阵总表将第 2 行第 5 列标为 h15，但后文单独列出了 h25。本实现使用 h25，并以下三角为上三角的厄米共轭；参数表中的 r₄ = “0607”暂按 0.607 eV 解释。这些选择都保留在代码注释中。

更直接的检查来自 Γ 点：按补充材料逐式代入，px、py 两个对角元之差为 **−1.6 eV**。在作者所述的非磁自旋无关 H₀ 中，Γ 点的 px、py 应构成三重旋转对称性下的一对；这一差值与给定的 C₃ 约束不相容。随机抽取 100 个动量点比较旋转前后的 H₀，本实现得到最大矩阵残差约 1.585 eV，最大能谱差约 1.267 eV。

![补充材料逐式实现的能带与轨道霍尔响应](../assets/papers/topology-orbital-hall/literal-audit.png)

*本次计算：直接转录补充材料后的结果。纵轴使用绝对能量，未将这些参数点预先命名为 SOTI、QAHI、NI。紫色表示 dz² 权重，黄色表示其余轨道权重。*

因此，不能将这份直接转录结果冒充论文原图。上述不一致也不足以判定论文的物理结论错误：它首先说明，需要作者使用的原始模型文件，或对印刷表达式和参数的进一步澄清。代码同时保留了一个只恢复部分 C₃ 矩阵关系的可选分支，但不把该分支当作作者认可的修正。

### 第二步：独立三轨道模型验证体态趋势

独立模型取 dz²、dx²−y²、dxy，保留 d-d 跃迁结构；选取 r₄ = 0.0607 eV、有效 SOC 系数 0.25 eV，并显式加入幅度为 0.06 eV 的谷奇 dz² 色散项。这些是本次建模选择，**并非从作者参数无歧义推导出的有效哈密顿量**，也没有通过乘一个系数把 OHC 调到论文平台高度。

取晶格常数 a = 1、ℏ = 1，能量用 eV；在完整倒格原胞上积分，零温占据最低一条带，每组参数分别将隙中心设为图中的能量零点。坐标取向固定为中间相 C = +1。Kubo 积分乘上倒格原胞面积，并换算为 e/(2π)。

![独立有效模型计算的轨道能带、电导及轨道曲率](../assets/papers/topology-orbital-hall/effective-bulk.png)

*本次计算：上排对应图 2(b) 的轨道能带，中排对应图 2(d) 的 OHC，下排对应图 2(f) 的占据带轨道曲率。下排采用对称对数色标，±30 之外饱和；数值积分未截断曲率。紫色为 dz²，黄色为两个面内 d 轨道；这三个模型状态仅按双谷/单谷反转分类，不将第一个直接命名为 SOTI。*

| ε₂ / eV | 论文相别及 OHC / [e/(2π)] | 独立模型 OHC / [e/(2π)] | 独立模型 C | 独立模型体带隙 / eV |
| --- | --- | --- | --- | --- |
| 3.2 | SOTI，约 1.74 | 2.049434 | 0 | 0.31397 |
| 4.1 | QAHI，约 0.87 | 1.013310 | 1 | 0.31180 |
| 4.9 | NI，接近 0 | −0.002203 | 0 | 0.07464 |

该模型得到“强响应—约一半—近零”的趋势。前两个平台相对论文值分别高约 17.8% 和 16.5%，所以不能称为数值吻合。120、240、480、720 四组动量网格用于收敛检查；480 到 720 时，三个 OHC 的最大变化小于 10⁻¹⁰ e/(2π)。体带隙极值收敛较慢，故表内给出实际有限网格结果，不把所有末位数字当作精确材料常数。

### 边界态检查与复现范围

![独立有效模型的三角纳米片与量子反常霍尔条带](../assets/papers/topology-orbital-hall/effective-boundary.png)

*本次计算：300 个格点的开边界三角片能谱、全部隙内态的密度总和，以及宽度为 40 行的条带能谱。条带颜色表示单侧边界前三行的波函数权重。*

条带在中间相出现跨隙边界分支，与计算得到的 C = 1 相符；有限条带包含两条边，各自传播方向相反。三角片则在相应能窗内出现 **12 个态**，密度分布不能替代论文中“恰好三个孤立角态”的证据。因此，本次没有复现图 2(c)，也没有证明独立模型的初始相属于论文相同的二阶拓扑相。

对应关系是：图 2(a) 的晶格和轨道定义已转录；图 2(b,d,f) 得到独立模型的定性对照；图 2(e) 得到有限条带的边界通道对照；图 2(c) 未复现。后续若要完成同一哈密顿量的全部面板复现，需要进一步核实作者实际使用的跃迁矩阵、SOC 归一化、能量基准以及纳米片边界终止。

## 主要结论

1. 论文提出以能带反转重排轨道角动量，再通过轨道 Berry 曲率改变 OHE 的调控路径；紧束缚模型和两类材料计算构成相互呼应的证据链。
2. RuBrCl 的双谷相变给出约“全量、半量、近零”的响应变化，MnBi₂Te₄ 则表明拓扑转为普通绝缘体后，OHC 仍可显著非零。拓扑有助于组织调控路径，具体数值由轨道结构与全布里渊区积分决定。
3. 本次独立计算支持双谷贡献逐步改变的体态图像，但尚未定量复现论文图 2，也未复现其三个孤立角态。理解机制与完成同模型复现是两项不同的检验。

主文四幅图均已解读；补充材料用于核查模型、参数与材料计算条件，此处不逐张展开全部补充图。


## 可折叠源代码与数据下载

[下载完整代码、计算数据和配图](../assets/papers/topology-orbital-hall/reproduction.zip)。压缩包不包含论文PDF。运行方法与依赖见包内 reproduction/README.md；运行目录为解压后同时包含 assets 和 reproduction 的文件夹。

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r reproduction/requirements.txt
OPENBLAS_NUM_THREADS=1 MPLCONFIGDIR=/tmp/topo-mpl python reproduction/run.py
```


<details>
<summary style="cursor:pointer;padding:14px;border:1px solid #d7dde2;border-radius:8px;">展开源代码 · 五轨道模型与 Kubo 公式：直接转录和候选对称性分支</summary>

```python
"""Five-orbital model transcribed from ACS SI S1 (not fitted).
Coordinates: a1=(1,0), a2=(1/2,sqrt(3)/2), tau_p=(0,-1/sqrt(3)).
alpha=kx/2, beta=sqrt(3)*ky/2; energies eV, hbar=1, a=1.
The SI's H[1,4] matrix label is taken as h25 for Hermiticity.
r4 printed '0607' is interpreted as 0.607 eV. All scalar formulas retained.
"""
import numpy as np
S=np.sqrt(3.)
A=np.array([[1.,0.],[.5,S/2]])
B=2*np.pi*np.linalg.inv(A).T
TAU=np.array([[0.,0.]]*3+[[0.,-1/S]]*2)
L=np.zeros((5,5),complex); L[1,2]=-2j;L[2,1]=2j;L[3,4]=-1j;L[4,3]=1j
D=np.diag([1.,1.,1.,0.,0.])

def h0(k,eps=3.2,variant='literal',r4_override=None):
 k=np.asarray(k);a=k[...,0]/2;b=S*k[...,1]/2
 c=np.cos;s=np.sin;r1,r2,r3,r4,r5,r6,r7,r8,r9=-.184,.401,.02,.607,.338,.057,.2,-.12,.2
 if r4_override is not None:r4=r4_override
 t1,t2,t3=.1,-.18,.5
 h=np.zeros(k.shape[:-1]+(5,5),complex)
 h[...,0,0]=1.746+2*r1*c(2*a)+4*r1*c(a)*c(b)
 h[...,0,1]=2*r2*c(2*a)-2*r2*c(a)*c(b)+2j*S*r4*c(a)*s(b)
 h[...,0,2]=4j*r4*c(a)*s(a)+2j*r4*c(b)*s(a)-2*S*r2*s(a)*s(b)
 h[...,0,3]=2j*S*t1*c(b/3)*s(a)-2*S*t1*s(a)*s(b/3)
 h[...,0,4]=2*t1*c(a)*c(b/3)-2*t1*c(2*b/3)+2j*t1*c(a)*s(b/3)+2j*t1*s(2*b/3)
 h[...,1,1]=eps+2*r3*c(2*a)+(r3+3*r6)*c(a)*c(b)
 h[...,1,2]=4j*r5*c(a)*s(a)-4j*r5*c(b)*s(a)+S*(r3-r6)*s(a)*s(b)
 h[...,1,3]=2j*t3*c(b/3)*s(a)-2*t3*s(a)*s(b/3)
 h[...,1,4]=t2*c(a-b/3)+t2*c(a+b/3)+(t2+S*t3)*c(2*b/3)-1j*t2*s(a-b/3)+1j*t2*s(a+b/3)-1j*(t2+S*t3)*s(2*b/3)
 h[...,2,2]=eps+2*r6*c(2*a)+(3*r3+r6)*c(a)*c(b)
 h[...,2,3]=(t2+2*t3/S)*(c(a-b/3)+c(a+b/3))+(-2*t3/S)*c(2*b/3)-1j*(t2+2*t3/S)*s(a-b/3)+1j*(t2+2*t3/S)*s(a+b/3)+1j*(-t2+2*t3/S)*s(2*b/3)
 h[...,2,4]=2j*t3*c(b/3)*s(a)-2*t3*s(a)*s(b/3)
 h[...,3,3]=-1.8+(r7+r8)/S*c(2*a)+2*r9*c(2*a)-4*(r7+r8)/S*c(a)*c(b)-4*r9*c(a)*c(b)
 h[...,3,4]=2j*(r8-r7)*c(a)*s(a)+2j*(r7-r8)*c(b)*s(a)-2*(r7+r8)*s(a)*s(b)
 h[...,4,4]=-1.8-S*(r7+r8)*c(2*a)+2*r9*c(2*a)+4*r9*c(a)*c(b)
 if variant=='c3':
  # Explicit symmetry-restored candidate; NOT an author-provided correction.
  h[...,2,3]=(t2+2*t3/S)*2*c(a)*np.exp(1j*b/3)+(t2-t3/S)*np.exp(-2j*b/3)
  h[...,3,3]+=8*r9*c(a)*c(b)
 for i in range(5):
  for j in range(i+1,5):h[...,j,i]=h[...,i,j].conj()
 return h

def hamiltonian(k,eps=3.2,spin=None):
 h=h0(k,eps)
 if spin is not None:return h+spin*(.5*L-1.5*D)
 out=np.zeros(h.shape[:-2]+(10,10),complex)
 out[...,:5,:5]=h+.5*L-1.5*D;out[...,5:,5:]=h-.5*L+1.5*D
 return out

def mesh(n):
 q=(np.arange(n)+.5)/n
 uv=np.stack(np.meshgrid(q,q,indexing='ij'),-1)
 return uv@B

def curvature(k,eps,step=1e-5):
 """Return all 10 energies and orbital/charge curvature (xy convention SI/main)."""
 e,u=np.linalg.eigh(hamiltonian(k,eps))
 vel=[]
 for d in np.eye(2)*step:vel.append((hamiltonian(k+d,eps)-hamiltonian(k-d,eps))/(2*step))
 ll=np.kron(np.eye(2),L);vx,vy=vel
 jo=(vx@ll+ll@vx)/2
 ut=u.conj().swapaxes(-1,-2)
 j=ut@jo@u;x=ut@vx@u;y=ut@vy@u
 de=e[..., :,None]-e[...,None,:]
 den=de**2
 mask=den>1e-14
 inv=np.divide(1.,den,out=np.zeros_like(den),where=mask)
 # Orbital formula in main text is +2 Im; sigma = -e integral Omega.
 oc=2*np.sum((j*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 bc=-2*np.sum((x*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 return e,oc,bc

if __name__=='__main__':
 import json
 for ep in [3.2,4.1,4.9]:
  e,o,c=curvature(mesh(120),ep)
  print(ep,'bands',[(i,round(float(e[...,i].min()),3),round(float(e[...,i].max()),3)) for i in range(10)])
  for n in [6,7,8]:
   gap=e[...,n].min()-e[...,n-1].max()
   print('filled',n,'gap',gap,'OHC',-o[...,:n].sum(-1).mean()*abs(np.linalg.det(B))/(2*np.pi),'C',c[...,:n].sum(-1).mean()*abs(np.linalg.det(B))/(2*np.pi))

```

</details>

<details>
<summary style="cursor:pointer;padding:14px;border:1px solid #d7dde2;border-radius:8px;">展开源代码 · 独立三轨道模型：明确的参数与边界条件</summary>

```python
"""Independent three-d-orbital effective model; NOT the published five-orbital TB.
Retains SI d-d hopping parameters except ambiguous r4 set to 0.0607 eV as an independent model choice.
Uses effective SOC 0.25*L (vs SI printed 0.5*L), plus a stated valley-odd
 dz2 term -0.06*(sin(kx)-2*sin(kx/2)*cos(sqrt(3)*ky/2)) eV.
No fitting of Hall amplitude. No p orbitals or exchange (constant in one spin).
Reflection ky -> -ky together with L -> -L sets C(QAHI)=+1.
"""
import numpy as np
from model import h0,L,A,B,S,mesh
LE=-L[:3,:3]
def he(k,eps):
 k=np.asarray(k).copy();k[...,1]*=-1
 h=h0(k,eps,r4_override=.0607)[...,:3,:3]+.25*L[:3,:3]
 a=k[...,0]/2;b=S*k[...,1]/2
 h[...,0,0]-=.06*(np.sin(2*a)-2*np.sin(a)*np.cos(b))
 return h

def response(k,eps):
 e,u=np.linalg.eigh(he(k,eps));ut=u.conj().swapaxes(-1,-2);d=1e-5
 x=(he(k+[d,0],eps)-he(k-[d,0],eps))/(2*d)
 y=(he(k+[0,d],eps)-he(k-[0,d],eps))/(2*d)
 j=(x@LE+LE@x)/2
 x=ut@x@u;y=ut@y@u;j=ut@j@u
 de=e[..., :,None]-e[...,None,:]
 inv=np.divide(1.,de**2,out=np.zeros_like(de),where=abs(de)>1e-7)
 oc=2*np.sum((j*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 bc=-2*np.sum((x*y.swapaxes(-1,-2)).imag*inv,axis=-1)
 return e,oc,bc

def hoppings(eps):
 n=9;q=np.arange(n)/n
 uv=np.stack(np.meshgrid(q,q,indexing='ij'),-1);h=he(uv@B,eps)
 tt=np.fft.fft2(h,axes=(0,1))/n**2
 terms={}
 for i in range(n):
  for j in range(n):
   r=(i if i<n/2 else i-n,j if j<n/2 else j-n)
   if abs(tt[i,j]).max()>1e-10:terms[r]=tt[i,j]
 return terms

def flake(eps,n=20,armchair=False):
 if armchair:
  # Equilateral armchair cut: x >= 0, x +/-sqrt(3)y < const, rotated triangle.
  cells=[]
  for i in range(-2*n,2*n+1):
   for j in range(-2*n,2*n+1):
    x,y=np.array([i,j])@A
    if y>=-1e-8 and S*x+y<=S*n+1e-8 and -S*x+y<=S*n+1e-8:cells.append((i,j))
 else:cells=[(i,j) for i in range(n) for j in range(n-i)]
 cells=np.array(cells);idx={tuple(r):i for i,r in enumerate(cells)};t=hoppings(eps)
 h=np.zeros((3*len(cells),)*2,complex)
 for r,i in idx.items():
  for R,v in t.items():
   s=(r[0]+R[0],r[1]+R[1]);j=idx.get(s)
   if j is not None:h[3*i:3*i+3,3*j:3*j+3]+=v
 assert abs(h-h.conj().T).max()<1e-10
 return cells@A,h
if __name__=='__main__':
 from scipy.linalg import eigh
 for ac in [False,True]:
  pos,h=flake(3.2,18,ac);e,u=eigh(h)
  print(ac,len(pos),[(i,round(x,5)) for i,x in enumerate(e) if 1.8<x<2.25])
  for i,x in enumerate(e):
   if 1.84<x<2.13:
    p=abs(u[:,i].reshape(-1,3))**2;p=p.sum(-1)
    print('state',i,x,'ipr',sum(p*p),'sites',pos[p.argsort()[-4:]])

```

</details>

<details>
<summary style="cursor:pointer;padding:14px;border:1px solid #d7dde2;border-radius:8px;">展开源代码 · 运行脚本：能带、电导、曲率、收敛与边界态</summary>

```python
"""Run: OPENBLAS_NUM_THREADS=1 MPLCONFIGDIR=/tmp/topo-mpl python reproduction/run.py
Produces numerical data + plots. All images marked independently calculated.
"""
from pathlib import Path
import json,sys
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.linalg import eigh,expm
from model import *
from effective import he,response,hoppings,flake,LE
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets';DATA=ROOT/'reproduction'/'data';DATA.mkdir(exist_ok=True);OUT.mkdir(exist_ok=True)
plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False,'savefig.dpi':220})
EP=[3.2,4.1,4.9];COL=['#4057b2','#d55b42','#309276'];NAMES=['two valleys inverted','one valley inverted','uninverted']
fac=abs(np.linalg.det(B))/(2*np.pi)
# Convergence: integrate exact same Kubo implementation on successively finer grids.
records=[]
for n in [120,240,480,720]:
 for ep in EP:
  os=[];bs=[];emax=-1e10;emin=1e10
  k=mesh(n).reshape(-1,2)
  for chunk in np.array_split(k,max(1,len(k)//10000)):
   e,o,b=response(chunk,ep);os.append(o[:,0]);bs.append(b[:,0]);emax=max(emax,e[:,0].max());emin=min(emin,e[:,1].min())
  records.append(dict(n=n,epsilon2=ep,ohc=float(-np.concatenate(os).mean()*fac),chern=float(np.concatenate(bs).mean()*fac),vbm=float(emax),cbm=float(emin),gap=float(emin-emax)))
print('CONVERGENCE',records,flush=True)
(DATA/'effective_convergence.json').write_text(json.dumps(records,indent=2))
rows=[r for r in records if r['n']==720];shifts=[(r['vbm']+r['cbm'])/2 for r in rows]
# Band and response overview corresponding to Fig.2(b,d,f).
fig,axs=plt.subplots(3,3,figsize=(12,10),gridspec_kw={'height_ratios':[1,1,1.1]})
points=np.array([[0,0],[4*np.pi/3,0],[np.pi,np.pi/S],[2*np.pi/3,2*np.pi/S],[0,0]])
path=np.concatenate([np.linspace(x,y,90,endpoint=False) for x,y in zip(points[:-1],points[1:])]+[points[-1:]])
mu=np.linspace(-2,2,601);curves=[]
for z,(ep,shift) in enumerate(zip(EP,shifts)):
 e,u=np.linalg.eigh(he(path,ep));path_e=e.copy();w=abs(u[:,0,:])**2
 ax=axs[0,z]
 for band in range(3):ax.scatter(np.arange(len(path)),e[:,band]-shift,c=w[:,band],s=3,cmap='plasma_r',vmin=0,vmax=1,rasterized=True)
 ax.set(ylim=(-2.2,2.2),xticks=[0,90,180,270,360],xticklabels=[r'$\Gamma$','+K','M','-K',r'$\Gamma$'],title=f'$\epsilon_2={ep}$ eV · {NAMES[z]}')
 ax.text(.03,.03,r'purple: $d_{z^2}$; yellow: $d_{x^2-y^2}/d_{xy}$',transform=ax.transAxes,fontsize=8)
 ax.axhline(0,color='gray',ls=':',lw=.7);ax.set_ylabel('E - midgap (eV)')
 e,o,b=response(mesh(480),ep);flat_e=e.ravel()-shift;flat_o=o.ravel();order=np.argsort(flat_e);cum=np.cumsum(flat_o[order]);inds=np.searchsorted(flat_e[order],mu,side='right')
 curve=-np.where(inds>0,cum[np.maximum(0,inds-1)],0)*fac/(480**2);curves.append(curve)
 ax=axs[1,z];ax.plot(mu,curve,color=COL[z]);ax.axvspan(rows[z]['vbm']-shift,rows[z]['cbm']-shift,color=COL[z],alpha=.15)
 ax.axhline(rows[z]['ohc'],color='gray',ls=':',lw=.7);ax.set(xlabel='Fermi energy - midgap (eV)',ylabel=r'$\sigma^z_{xy}$ [$e/(2\pi)$]',ylim=(-.4,3),title=f"OHC={rows[z]['ohc']:.4f}; C={round(rows[z]['chern'])}")
 # Full hexagon, occupied band only, no arbitrary map normalization.
 xx=np.linspace(-4.5,4.5,301);yy=np.linspace(-4,4,271);kk=np.stack(np.meshgrid(xx,yy),-1)
 _,oo,_=response(kk,ep);oc=oo[...,0]
 mask=(abs(kk[...,0])<=4*np.pi/3)&(abs(S*kk[...,0])+abs(kk[...,1])<=4*np.pi/S)&(abs(kk[...,1])<=2*np.pi/S)
 oc=np.ma.masked_where(~mask,oc)
 im=axs[2,z].pcolormesh(xx,yy,oc,cmap='RdBu_r',norm=matplotlib.colors.SymLogNorm(linthresh=.03,vmin=-30,vmax=30),shading='auto',rasterized=True)
 axs[2,z].set(aspect='equal',xlabel=r'$k_x a$',ylabel=r'$k_y a$',title=r'Orbital curvature ($a^2$, symlog)')
 fig.colorbar(im,ax=axs[2,z],shrink=.7,ticks=[-10,-1,-.1,0,.1,1,10])
 np.savez_compressed(DATA/f'effective-{ep}.npz',kpath=path,path_energies=path_e,mu=mu,ohc=curve,kx=xx,ky=yy,orbital_curvature=oc.filled(np.nan))
fig.suptitle('Independent 3-orbital effective model: bulk trends only\nNot a quantitative reproduction of the published five-orbital model',fontsize=14)
fig.tight_layout(rect=[0,0,1,.94]);fig.savefig(OUT/'effective-bulk.png')
# Export clean single-column panels for mobile reading, without adjacent labels.
from matplotlib.transforms import Bbox
fig.canvas.draw();renderer=fig.canvas.get_renderer();allaxes=list(fig.axes)
fig._suptitle.set_visible(False)
for z in range(3):
 group=[axs[0,z],axs[1,z],axs[2,z],allaxes[9+z]]
 for aa in allaxes:aa.set_visible(aa in group)
 box=Bbox.union([aa.get_tightbbox(renderer) for aa in group]).transformed(fig.dpi_scale_trans.inverted())
 fig.savefig(OUT/f'effective-case-{z+1}.png',bbox_inches=box.expanded(1.035,1.025))
plt.close(fig)
# Literal SI diagnostics, evaluated on complete 10-band spin model.
th=2*np.pi/3;rot=np.array([[np.cos(th),-np.sin(th)],[np.sin(th),np.cos(th)]]);U=expm(-1j*th*L)
rng=np.random.default_rng(7);ks=rng.uniform(-3,3,(100,2))
err=max(float(abs(h0(rot@k)-U@h0(k)@U.conj().T).max()) for k in ks)
se=max(float(abs(np.linalg.eigvalsh(h0(rot@k))-np.linalg.eigvalsh(h0(k))).max()) for k in ks)
checks={'c3_matrix_max_error_eV':err,'c3_spectral_max_error_eV':se,'gamma_p_diagonal_difference_eV':float((h0([0,0])[3,3]-h0([0,0])[4,4]).real),'interpretations':['r4=0.607 eV','H(2,5)=h25; lower triangle from Hermiticity','exchange on d sublattice; SOC exactly t_so Lz sigma_z'],'literal':[]}
fig,axs=plt.subplots(2,3,figsize=(12,7))
for z,ep in enumerate(EP):
 e,u=np.linalg.eigh(hamiltonian(path,ep));w=abs(u[:,0,:])**2+abs(u[:,5,:])**2
 for band in range(10):axs[0,z].scatter(np.arange(len(path)),e[:,band],c=w[:,band],s=2,cmap='plasma_r',vmin=0,vmax=1)
 axs[0,z].set(xticks=[0,90,180,270,360],xticklabels=[r'$\Gamma$','+K','M','-K',r'$\Gamma$'],ylim=(-4,5),ylabel='absolute energy (eV)',title=f'Literal SI, epsilon2={ep}')
 e,o,b=curvature(mesh(360),ep);ev=e.ravel();ov=o.ravel();ii=np.argsort(ev);cc=np.cumsum(ov[ii]);en=np.linspace(-3,4,701);nn=np.searchsorted(ev[ii],en,side='right');oh=-np.where(nn>0,cc[np.maximum(nn-1,0)],0)*fac/360**2
 axs[1,z].plot(en,oh,color=COL[z]);axs[1,z].set(ylim=(-5,5),xlabel='absolute Fermi energy (eV)',ylabel=r'OHC [$e/(2\pi)$]')
 gaps=[dict(filled=n,gap=float(e[...,n].min()-e[...,n-1].max())) for n in range(1,10)]
 checks['literal'].append({'epsilon2':ep,'gaps':gaps})
 np.savez_compressed(DATA/f'literal-{ep}.npz',kpath=path,path_energies=np.linalg.eigvalsh(hamiltonian(path,ep)),mu=en,ohc=oh)
fig.suptitle('Literal SI transcription: bands and Kubo OHC\nDo not label these parameter sets SOTI / QAHI / NI without further verification',fontsize=13)
fig.tight_layout(rect=[0,0,1,.92]);fig.savefig(OUT/'literal-audit.png');plt.close(fig)
(DATA/'si_checks.json').write_text(json.dumps(checks,indent=2));print('SI CHECKS',checks,flush=True)
# Boundary diagnostics for independent effective model: a finite open ribbon and flake.
pos,h=flake(3.2,24);e,u=eigh(h);shift=shifts[0]
np.savez_compressed(DATA/'flake-effective.npz',positions=pos,energies=e,eigenvectors=u)
inside=np.flatnonzero((e>rows[0]['vbm'])&(e<rows[0]['cbm']))
ipr=np.sum(np.sum(abs(u.reshape(len(pos),3,-1))**2,axis=1)**2,axis=0)
# Show all in-gap states; no manual selection of a desired corner triad.
fig=plt.figure(figsize=(12,4));gs=fig.add_gridspec(1,3,width_ratios=[1,1,1.35]);ax=fig.add_subplot(gs[0]);ax.scatter(np.arange(len(e)),e-shift,c=ipr,cmap='viridis',s=12);ax.axhspan(rows[0]['vbm']-shift,rows[0]['cbm']-shift,color='gray',alpha=.12);ax.set(xlim=(len(pos)-25,len(pos)+30),ylim=(-.5,.5),xlabel='state index',ylabel='E - midgap (eV)',title=f'Open triangular flake: {len(pos)} sites')
rho=(abs(u[:,inside])**2).sum(-1).reshape(-1,3).sum(-1)
ax=fig.add_subplot(gs[1]);im=ax.scatter(pos[:,0],pos[:,1],c=rho,s=18,cmap='magma');ax.set(aspect='equal',title=f'All {len(inside)} in-gap states summed',xlabel='x/a',ylabel='y/a');fig.colorbar(im,ax=ax,shrink=.6)
# Ribbon periodic a1, open along a2; edge weights on each boundary individually.
n=40;terms=hoppings(4.1);qs=np.linspace(-np.pi,np.pi,181);ee=[];ww=[]
for q in qs:
 hr=np.zeros((3*n,3*n),complex)
 for j in range(n):
  for (r1,r2),t in terms.items():
   jj=j+r2
   if 0<=jj<n:hr[3*j:3*j+3,3*jj:3*jj+3]+=t*np.exp(1j*q*r1)
 er,ur=eigh(hr);ee.append(er-shifts[1]);ww.append((abs(ur[:9])**2).sum(0))
ax=fig.add_subplot(gs[2]);ax.scatter(np.repeat(qs,3*n),np.array(ee).ravel(),c=np.array(ww).ravel(),vmin=0,vmax=.5,cmap='inferno',s=2,rasterized=True);ax.set(ylim=(-1.2,1.2),xlabel=r'$k\cdot a_1$',ylabel='E - midgap (eV)',title='QAH ribbon, 40 rows; one-edge weight')
fig.suptitle('Independent-model boundary diagnostics: no isolated three-corner-state claim',fontsize=12);fig.tight_layout(rect=[0,0,1,.90]);fig.savefig(OUT/'effective-boundary.png');plt.close(fig)
(DATA/'boundary.json').write_text(json.dumps({'flake_sites':len(pos),'flake_in_gap_state_count':len(inside),'in_gap_energies_eV':e[inside].tolist(),'isolated_three_corner_states_reproduced':False,'ribbon_rows':n},indent=2))
np.savez_compressed(DATA/'ribbon-effective.npz',q=qs,energy=ee,one_edge_weight=ww)
print('DONE',flush=True)

```

</details>
