# 图 2 的模型计算与复现边界

此包包含论文 SI 的直接转录、独立三轨道机制模型及原始计算数据。不是图 2 全面定量复现。

- `model.py`：五轨道 H0，加两个自旋块。默认 `variant='literal'`，r4=0.607。`variant='c3'` 仅是恢复 h34/h44 的候选分支，不是作者模型。
- `effective.py`：独立三轨道模型，r4=0.0607、SOC=0.25、谷奇项幅度0.06 eV，取向使中间相 C=1。
- `run.py`：绘图、Kubo 积分、网格收敛、C3检查、三角片与条带。
- `data/`：JSON检查记录及 NPZ 原始数据。`effective-*.npz` 含能带、OHC、曲率；`literal-*.npz` 含直接转录结果。

解压后在本目录的上一级（包含 assets/、reproduction/ 的目录）运行：

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r reproduction/requirements.txt
OPENBLAS_NUM_THREADS=1 MPLCONFIGDIR=/tmp/topo-mpl python reproduction/run.py
```

依赖在本次实际计算中为 NumPy 2.5.5、SciPy 1.18.1、Matplotlib 3.11.2，Python 3.12.14。
所有图保存到 assets/，数据保存到 reproduction/data/。

单位：能量 eV，a=1，hbar=1；OHC 以 e/(2pi) 为单位；零温、最低一条有效模型能带占据。
Chern 数采用普通 Berry 曲率 -2 Im 的约定；OHC 采用主文 +2 Im 轨道曲率、再乘 -e。
速度采用中心差分，步长1e-5/a。完整倒格原胞积分，非只积六边形的一部分。
图的隙中心平移对每组参数单独计算，没有平移哈密顿量来改变波函数。

结果：独立模型 OHC=2.049434,1.013310,-0.002203；C=0,1,0。
论文报告 OHC约1.74,0.87,0。独立模型三角片出现12个隙内态，并非三个孤立角态。
因此不能把第一个有效模型状态直接称为已验证的 SOTI。

来源：https://doi.org/10.1021/acs.nanolett.3c05129 ，ACS SI S1与Table S1。
