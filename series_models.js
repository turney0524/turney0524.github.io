/* Pure physical models used by chapters 2–12. No DOM, network or external library.
   Unless noted otherwise, dimensionless units hbar=m=1. Exports work in Node. */
(function(root) {
  'use strict';
  const H = {
    pi: Math.PI,
    gaussian: (x, mu, s) => Math.exp(-.5 * ((x - mu) / s) ** 2) / (Math.sqrt(2 * Math.PI) * s),
    sinc: x => Math.abs(x) < 1e-7 ? 1 - x * x / 6 : Math.sin(x) / x,
    factorial: n => {
      let f = 1;
      for (let i = 2; i <= n; i++) f *= i;
      return f;
    },
    hermite: (n, x) => {
      if (n === 0) return 1;
      let a = 1,
        b = 2 * x;
      for (let j = 1; j < n; j++) {
        const c = 2 * x * b - 2 * j * a;
        a = b;
        b = c;
      }
      return b;
    },
    integrate: (f, a, b, n = 1600) => {
      if (n % 2) n++;
      let z = f(a) + f(b),
        h = (b - a) / n;
      for (let i = 1; i < n; i++) z += (i % 2 ? 4 : 2) * f(a + i * h);
      return z * h / 3;
    },
    bisect: (f, a, b) => {
      let fa = f(a);
      for (let i = 0; i < 70; i++) {
        let c = (a + b) / 2,
          fc = f(c);
        if (fa * fc <= 0) b = c;
        else {
          a = c;
          fa = fc;
        }
      }
      return (a + b) / 2;
    },
    finiteLevels: z0 => {
      const roots = [];
      for (let parity = 0; parity < 2; parity++) {
        for (let j = 0; j < Math.ceil(z0 / Math.PI) + 1; j++) {
          let lo = parity ? j * Math.PI + Math.PI / 2 : j * Math.PI,
            hi = parity ? (j + 1) * Math.PI : j * Math.PI + Math.PI / 2;
          lo += 1e-8;
          hi = Math.min(hi - 1e-8, z0 - 1e-8);
          if (hi <= lo) continue;
          const f = z => (parity ? -z / Math.tan(z) : z * Math.tan(z)) - Math.sqrt(Math.max(0, z0 * z0 - z * z));
          if (f(lo) * f(hi) < 0) {
            let z = H.bisect(f, lo, hi);
            roots.push({
              z,
              parity: parity ? 'odd' : 'even',
              energy: (z * z - z0 * z0) / 2
            });
          }
        }
      }
      return roots.sort((a, b) => a.energy - b.energy);
    },
    radial: (type, r) => type === '1s' ? 4 * r * r * Math.exp(-2 * r) : type === '2s' ? r * r * (2 - r) ** 2 * Math.exp(-r) / 8 : r ** 4 * Math.exp(-r) / 24,
    molecule: R => {
      const S = Math.exp(-R) * (1 + R + R * R / 3),
        D = -1 / R + (1 + 1 / R) * Math.exp(-2 * R),
        X = -(1 + R) * Math.exp(-R);
      return {
        S,
        plus: -.5 + (D + X) / (1 + S) + 1 / R,
        minus: -.5 + (D - X) / (1 - S) + 1 / R
      };
    },
    rectT: (E, a) => {
      const kap = Math.sqrt(2 * (1 - E));
      return 1 / (1 + Math.sinh(kap * a) ** 2 / (4 * E * (1 - E)));
    },
    rabi: (Omega, Delta, t) => Omega * Omega / (Omega * Omega + Delta * Delta) * Math.sin(Math.hypot(Omega, Delta) * t / 2) ** 2,
    zeno: (A, N) => Math.pow(Math.cos(A / (2 * N)) ** 2, N),
    line: (fn, label, color = 'teal') => ({
      fn,
      label,
      color
    }),
    plot: (xmin, xmax, ymin, ymax, lines, xlabel = 'x', ylabel = '') => ({
      kind: 'plot',
      xmin,
      xmax,
      ymin,
      ymax,
      lines,
      xlabel,
      ylabel
    }),
    bars: (items, ymax = 1) => ({
      kind: 'bars',
      items,
      ymax
    }),
    f: (x, d = 3) => Number(x).toFixed(d),
  };
  const M = {
    boxSuper(p) {
      const a = 1,
        beta = p.mix,
        psi = (n, x) => Math.sqrt(2 / a) * Math.sin(n * Math.PI * x / a),
        E1 = Math.PI ** 2 / 2,
        E2 = 4 * E1;
      const density = (x, t) => Math.cos(beta) ** 2 * psi(1, x) ** 2 + Math.sin(beta) ** 2 * psi(2, x) ** 2 + 2 * Math.sin(beta) * Math.cos(beta) * psi(1, x) * psi(2, x) * Math.cos((E2 - E1) * t);
      return {
        plots: [H.plot(0, 1, 0, 4, [H.line(x => density(x, p.t), '|Ψ|²', 'orange')])],
        readout: `P(E₁) = ${H.f(Math.cos(beta)**2)}；P(E₂) = ${H.f(Math.sin(beta)**2)}；ω₂₁ = ${H.f(E2-E1)}`,
        values: {
          norm: 1,
          p1: Math.cos(beta) ** 2,
          p2: Math.sin(beta) ** 2
        },
        density: x => density(x, p.t)
      };
    },
    boxEigen(p) {
      const n = p.n,
        a = p.a,
        psi = x => Math.sqrt(2 / a) * Math.sin(n * Math.PI * x / a),
        E = n * n * Math.PI ** 2 / (2 * a * a);
      return {
        plots: [H.plot(0, a, -Math.max(2, 2 / a), Math.max(2, 2 / a), [H.line(psi, 'ψₙ', 'blue'), H.line(x => psi(x) ** 2, '|ψₙ|²', 'orange')])],
        readout: `n=${n}；a=${H.f(a,2)}；Eₙ=${H.f(E)}；内部节点 ${n-1} 个`,
        values: {
          energy: E
        },
        density: x => psi(x) ** 2
      };
    },
    oscillator(p) {
      const n = p.n,
        f = x => H.hermite(n, x) * Math.exp(-x * x / 2) / Math.sqrt(2 ** n * H.factorial(n) * Math.sqrt(Math.PI)),
        E = n + .5;
      const a = H.plot(-5, 5, -1, 1, [H.line(f, 'ψₙ', 'blue'), H.line(x => f(x) ** 2, '|ψₙ|²', 'orange')]);
      a.marks = [-Math.sqrt(2 * E), Math.sqrt(2 * E)];
      return {
        plots: [a],
        readout: `Eₙ=${H.f(E,1)}；经典转折点 ±${H.f(Math.sqrt(2*E))}；虚线外的量子尾部通常非零。`,
        values: {
          energy: E
        },
        density: x => f(x) ** 2
      };
    },
    freePacket(p) {
      const s = p.s,
        k = 2,
        t = p.t,
        tau = t / (2 * s * s),
        sx = s * Math.sqrt(1 + tau * tau),
        x0 = k * t;
      const re = x => {
        let d = x - x0,
          den = 1 + tau * tau,
          A = (2 * Math.PI * s * s) ** (-.25) * den ** (-.25) * Math.exp(-d * d / (4 * s * s * den)),
          ph = -Math.atan(tau) / 2 + d * d * tau / (4 * s * s * den) + k * x - k * k * t / 2;
        return A * Math.cos(ph);
      };
      const plot = H.plot(-8, 20, -1.2, 1.2, [H.line(re, 'Re Ψ', 'blue'), H.line(x => H.gaussian(x, x0, sx), '|Ψ|²', 'orange')]);
      plot.marks = [x0];
      return {
        plots: [plot],
        readout: `⟨x⟩=${H.f(x0)}；σₓ=${H.f(sx)}；群速度=2，相速度=1；σₚ=${H.f(1/(2*s))}`,
        values: {
          mean: x0,
          sigma: sx
        }
      };
    },
    deltaBound(p) {
      const kap = p.alpha,
        f = x => Math.sqrt(kap) * Math.exp(-kap * Math.abs(x)),
        E = -kap * kap / 2;
      return {
        plots: [H.plot(-6, 6, 0, 3, [H.line(x => f(x) ** 2, '|ψ|²', 'orange')])],
        readout: `κ=${H.f(kap)}；E=${H.f(E)}；σₓ=${H.f(1/(Math.sqrt(2)*kap))}；导数跳跃=${H.f(-2*kap**1.5)}`,
        values: {
          energy: E
        },
        density: x => f(x) ** 2
      };
    },
    finiteWell(p) {
      const z0 = p.z0,
        levels = H.finiteLevels(z0),
        idx = Math.min(p.level, levels.length - 1),
        selected = levels[Math.max(0, idx)];
      const lines = [H.line(x => Math.abs(x) < 1 ? -z0 * z0 / 2 : 0, 'V(x)', 'muted')];
      for (let j = 0; j < levels.length; j++) {
        const L = levels[j];
        lines.push(H.line(x => Math.abs(x) < 1.6 ? L.energy : NaN, `${j+1} ${L.parity}`, j === idx ? 'orange' : 'teal'));
      }
      return {
        plots: [H.plot(-2, 2, -z0 * z0 / 2 - 1, 1, lines)],
        readout: `束缚态 ${levels.length} 个；${selected?`所选第 ${idx+1} 态 E=${H.f(selected.energy)}（${selected.parity}）`: '当前精度未解析极浅态'}。阱半宽 a=1。`,
        values: {
          levels
        }
      };
    },
    basis(p) {
      const a = p.theta / 2,
        b = p.beta / 2,
        phi = p.phi,
        P = Math.cos(a) ** 2 * Math.cos(b) ** 2 + Math.sin(a) ** 2 * Math.sin(b) ** 2 + 2 * Math.cos(a) * Math.sin(a) * Math.cos(b) * Math.sin(b) * Math.cos(phi);
      return {
        plots: [{
          kind: 'spin',
          vector: [Math.sin(p.theta) * Math.cos(phi), Math.sin(p.theta) * Math.sin(phi), Math.cos(p.theta)],
          axis: [Math.sin(p.beta), 0, Math.cos(p.beta)]
        }, H.bars([{
          label: '+z',
          v: Math.cos(a) ** 2
        }, {
          label: '−z',
          v: Math.sin(a) ** 2
        }, {
          label: '+β',
          v: P,
          color: 'orange'
        }, {
          label: '−β',
          v: 1 - P,
          color: 'orange'
        }])],
        readout: `旋转基 P(+β)=${H.f(P)}；两种基中的概率各自相加都为 1。`,
        values: {
          prob: P
        }
      };
    },
    sequential(p) {
      const beta = p.beta * Math.PI / 180,
        P = 1 - .5 * Math.sin(beta) ** 2;
      let plot = H.plot(0, 180, 0, 1, [H.line(d => 1 - .5 * Math.sin(d * Math.PI / 180) ** 2, 'P(最终 +z)', 'orange')], '中间轴 β / °', '概率');
      plot.marks = [p.beta];
      return {
        plots: [plot, H.bars([{
          label: '最终 +z',
          v: P
        }, {
          label: '最终 −z',
          v: 1 - P
        }])],
        readout: `先制备 +z，测中间 β 轴且不筛选，再测 z：P(+z)=${H.f(P)}。无中间测量时是 1。`,
        values: {
          prob: P
        }
      };
    },
    chirp(p) {
      const s = p.s,
        c = p.c,
        sp = Math.sqrt(1 / (4 * s * s) + 4 * c * c * s * s),
        cov = 2 * c * s * s;
      return {
        plots: [H.plot(-8, 8, 0, 1.5, [H.line(x => H.gaussian(x, 0, s), '位置密度', 'orange'), H.line(x => H.gaussian(x, 0, sp), '动量密度', 'teal')], 'x 或 p（分别以各自单位表示）')],
        readout: `σₓσₚ=${H.f(s*sp)}；Cov(x,p)=${H.f(cov)}；σₓ²σₚ²−Cov²=${H.f(s*s*sp*sp-cov*cov)} = 0.25`,
        values: {
          sx: s,
          sp,
          cov,
          det: s * s * sp * sp - cov * cov
        }
      };
    },
    hydrogenRadial(p) {
      const type = p.state,
        f = r => H.radial(type, r);
      return {
        plots: [H.plot(0, 20, 0, .6, [H.line(f, `${type} 的径向密度`, 'orange')], 'r / a₀', 'a₀ Pᵣ')],
        readout: `所选 ${type}；积分 ∫Pᵣ dr=1。1s 的径向峰在 r/a₀=1，2s 在 r/a₀=2 有径向节点。`,
        density: f
      };
    },
    orbital(p) {
      const mode = p.state,
        f = (x, z) => {
          const r = Math.hypot(x, z);
          return mode === '2pz' ? z * Math.exp(-r / 2) : mode === '2s' ? (2 - r) * Math.exp(-r / 2) : (2 * z * z - x * x) * Math.exp(-r / 3);
        };
      return {
        plots: [{
          kind: 'heat',
          fn: f,
          xmin: -12,
          xmax: 12,
          ymin: -12,
          ymax: 12,
          signed: true,
          xlabel: 'x / a₀',
          ylabel: 'z / a₀'
        }],
        readout: `${mode} 的 x–z 平面截面；蓝/橙表示振幅的正负，白色是节点。颜色按本图最大幅度归一化。`,
        values: {
          mode
        }
      };
    },
    angularLadder(p) {
      const l = p.l,
        m = Math.max(-l, Math.min(l, p.m)),
        up = Math.sqrt(l * (l + 1) - m * (m + 1)),
        down = Math.sqrt(l * (l + 1) - m * (m - 1));
      const items = [];
      for (let j = -l; j <= l; j++) items.push({
        label: `m=${j}`,
        v: j === m ? 1 : 0,
        color: 'teal'
      });
      return {
        plots: [H.bars(items)],
        readout: `有效 m=${m}；|L|/ℏ=${H.f(Math.sqrt(l*(l+1)))}；升阶系数/ℏ=${H.f(up)}；降阶系数/ℏ=${H.f(down)}。m 自动限制在 [−l,l]。`,
        values: {
          m,
          up,
          down
        }
      };
    },
    spin(p) {
      const theta = p.theta * Math.PI / 180,
        phi = p.phi * Math.PI / 180,
        P = Math.cos(theta / 2) ** 2;
      return {
        plots: [{
          kind: 'spin',
          vector: [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)],
          axis: [0, 0, 1]
        }, H.bars([{
          label: '+ℏ/2',
          v: P
        }, {
          label: '−ℏ/2',
          v: 1 - P,
          color: 'orange'
        }])],
        readout: `测 Sz：P(+)=${H.f(P)}；⟨Sz⟩/ℏ=${H.f(Math.cos(theta)/2)}。箭头是 Bloch 向量，不是电子表面的转动。`,
        values: {
          prob: P
        }
      };
    },
    exchange(p) {
      const a = x => Math.sqrt(2) * Math.sin(Math.PI * x),
        b = x => Math.sqrt(2) * Math.sin(2 * Math.PI * x);
      const density = (x, y) => p.mode === 'distinguishable' ? a(x) ** 2 * b(y) ** 2 : (a(x) * b(y) + (p.mode === 'boson' ? 1 : -1) * b(x) * a(y)) ** 2 / 2;
      return {
        plots: [{
          kind: 'heat',
          fn: density,
          xmin: 0,
          xmax: 1,
          ymin: 0,
          ymax: 1,
          signed: false,
          xlabel: 'x₁ / a',
          ylabel: 'x₂ / a'
        }],
        readout: `${p.mode}：联合位置密度 |Ψ(x₁,x₂)|²。费米图对应相同自旋的反对称空间态，对角线 x₁=x₂ 上严格为零。`,
        density
      };
    },
    bands(p) {
      const F = z => Math.cos(z) + p.beta * H.sinc(z),
        current = F(p.z),
        allowed = Math.abs(current) <= 1,
        plot = H.plot(0, 18, -3, 3, [H.line(F, 'cos z + β sin z/z', 'teal'), H.line(() => 1, '+1', 'muted'), H.line(() => -1, '−1', 'muted')], 'z = ka');
      plot.band = [-1, 1];
      plot.marks = [p.z];
      return {
        plots: [plot],
        readout: `z=${H.f(p.z,2)}；右侧=${H.f(current)} → ${allowed?'允许带：有实数 K':'禁带：无实数 K'}；E/(ℏ²/ma²)=z²/2=${H.f(p.z*p.z/2)}`,
        values: {
          allowed,
          F: current
        }
      };
    },
    occupations(p) {
      const fd = e => 1 / (Math.exp((e - p.mu) / p.T) + 1),
        be = e => 1 / Math.expm1((e - p.mu) / p.T),
        mb = e => Math.exp(-(e - p.mu) / p.T),
        peak = Math.max(1.1, be(0) * 1.1);
      return {
        plots: [H.plot(0, 6, 0, peak, [H.line(fd, 'Fermi–Dirac', 'blue'), H.line(be, 'Bose–Einstein', 'orange'), H.line(mb, 'Maxwell–Boltzmann', 'teal')], 'ε（kB=1）', '每态平均占据')],
        readout: `固定 μ=${H.f(p.mu,2)}，T=${H.f(p.T,2)}；BE 的 n(0)=${H.f(be(0))}。此图比较固定 μ，不代表固定粒子数随 T 的演化；纵轴自动缩放。`,
        values: {
          fd0: fd(0),
          be0: be(0)
        }
      };
    },
    blackbody(p) {
      const f = w => w === 0 ? 0 : w ** 3 / Math.expm1(w / p.T);
      return {
        plots: [H.plot(0, 15, 0, 12, [H.line(f, '角频率谱形', 'orange')], 'ω（ℏ=kB=1）', '省略常数的 uω')],
        readout: `T=${H.f(p.T,2)}；ω峰≈${H.f(2.821439*p.T)}；全频积分随 T⁴ 变化，本图仅显示有限频段。`,
        values: {
          peak: 2.821439 * p.T
        }
      };
    },
    springPerturb(p) {
      const n = p.n,
        exact = e => (n + .5) * Math.sqrt(1 + e),
        first = e => (n + .5) * (1 + e / 2),
        second = e => (n + .5) * (1 + e / 2 - e * e / 8),
        plot = H.plot(-.8, 1, 0, (n + .5) * 1.6, [H.line(exact, '精确解', 'teal'), H.line(first, '一级', 'blue'), H.line(second, '二级', 'orange')], 'ε', 'E / ℏω');
      plot.marks = [p.eps];
      return {
        plots: [plot],
        readout: `ε=${H.f(p.eps,2)}：精确 ${H.f(exact(p.eps))}；一级 ${H.f(first(p.eps))}；二级 ${H.f(second(p.eps))}。离 ε=0 越远，截断不一定可靠。`,
        values: {
          exact: exact(p.eps),
          first: first(p.eps),
          second: second(p.eps)
        }
      };
    },
    avoided(p) {
      const E = d => Math.hypot(d / 2, p.g),
        plot = H.plot(-4, 4, -3, 3, [H.line(d => E(d), 'E+', 'teal'), H.line(d => -E(d), 'E−', 'orange'), H.line(d => d / 2, '未耦合 1', 'muted'), H.line(d => -d / 2, '未耦合 2', 'muted')], 'Δ', '能量');
      plot.marks = [p.delta];
      return {
        plots: [plot],
        readout: `g=${H.f(p.g,2)}；当前能隙=${H.f(2*E(p.delta))}；最小能隙=2|g|=${H.f(2*Math.abs(p.g))}。`,
        values: {
          gap: 2 * E(p.delta),
          minGap: 2 * Math.abs(p.g)
        }
      };
    },
    zeeman(p) {
      const l = p.l,
        s = .5,
        j = l + (p.branch === 'upper' ? .5 : -.5),
        g = 1 + (j * (j + 1) + s * (s + 1) - l * (l + 1)) / (2 * j * (j + 1)),
        lines = [];
      for (let m = -j; m <= j; m++) lines.push(H.line(b => g * m * b, `mj=${m}`, m >= 0 ? 'teal' : 'orange'));
      const plot = H.plot(0, .15, -.5, .5, lines, 'b = μBB / ΔEfs', 'ΔE / ΔEfs');
      plot.marks = [p.B];
      return {
        plots: [plot],
        readout: `l=${l}，j=${j}，gJ=${H.f(g)}；${2*j+1} 条弱场分支。当前 b=${H.f(p.B)}，此图只使用 μBB≪精细结构尺度的模型。`,
        values: {
          j,
          g,
          branches: 2 * j + 1
        }
      };
    },
    variational(p) {
      const energy = a => a / 4 + 1 / (4 * a) + 3 * p.lambda / (4 * a * a),
        best = H.bisect(a => a * a * a - a - 6 * p.lambda, 1, 4),
        plot = H.plot(.3, 4, 0, 10, [H.line(energy, '变分能量 E(a)', 'teal')], 'a', 'Hartree-like units');
      plot.marks = [p.a, best];
      return {
        plots: [plot, H.plot(-4, 4, 0, 1.3, [H.line(x => Math.sqrt(p.a / Math.PI) * Math.exp(-p.a * x * x), '当前试探密度', 'orange'), H.line(x => Math.sqrt(best / Math.PI) * Math.exp(-best * x * x), '该试探族最优', 'teal')])],
        readout: `λ=${H.f(p.lambda,2)}；当前上界=${H.f(energy(p.a))}；高斯族最优 a=${H.f(best)}，上界=${H.f(energy(best))}。这不是未知精确能量的误差条。`,
        values: {
          best,
          energy: energy(p.a),
          bound: energy(best)
        }
      };
    },
    helium(p) {
      const E = z => z * z - 27 * z / 8,
        plot = H.plot(.3, 3.2, -3.1, .2, [H.line(E, 'E(Z)', 'teal')], '试探 Z', 'E / Hartree');
      plot.marks = [p.Z, 27 / 16];
      return {
        plots: [plot],
        readout: `Z=${H.f(p.Z)}；E=${H.f(E(p.Z),5)} Hartree；最优 Z=27/16，E=−729/256=${H.f(-729/256,5)} Hartree。`,
        values: {
          energy: E(p.Z),
          optimum: -729 / 256
        }
      };
    },
    molecule(p) {
      const e = H.molecule(p.R),
        plot = H.plot(.4, 8, -.7, 1, [H.line(R => H.molecule(R).plus, '对称试探态', 'teal'), H.line(R => H.molecule(R).minus, '反对称试探态', 'orange'), H.line(() => -.5, '解离极限', 'muted')], 'R / a₀', '总能量 / Hartree');
      plot.marks = [p.R];
      return {
        plots: [plot],
        readout: `R=${H.f(p.R,2)}；重叠 S=${H.f(e.S)}；E+=${H.f(e.plus,5)}；E−=${H.f(e.minus,5)}。已包含核间排斥 +1/R。`,
        values: e
      };
    },
    wkbWave(p) {
      const q = p.slope,
        E = 2,
        mom = x => Math.sqrt(2 * (E - q * x)),
        phase = x => Math.abs(q) < 1e-10 ? Math.sqrt(2 * E) * x : -2 * Math.sqrt(2) / (3 * q) * ((E - q * x) ** 1.5 - E ** 1.5),
        plot = H.plot(-5, 5, -1.3, 1.3, [H.line(x => Math.cos(phase(x) - E * p.t) / Math.sqrt(mom(x)), 'Re ψWKB', 'blue'), H.line(x => 1 / mom(x), '|ψWKB|²', 'orange')]);
      return {
        plots: [plot],
        readout: `E=2，V(x)=${H.f(q,2)}x；视窗内最大 ℏ|p′|/p²≈${H.f(Math.abs(q)/Math.min(mom(-5),mom(5))**3)}。只展示单向 WKB 近似，未作全实轴归一化。`,
        values: {
          criterion: Math.abs(q) / Math.min(mom(-5), mom(5)) ** 3
        }
      };
    },
    barrier(p) {
      const kap = Math.sqrt(2 * (1 - p.E)),
        log = x => Math.log10(Math.max(Number.MIN_VALUE, x)),
        plot = H.plot(0, 5, -7, 0, [H.line(a => log(H.rectT(p.E, a)), '矩形势垒精确 T', 'teal'), H.line(a => -2 * kap * a / Math.LN10, '仅 WKB 指数', 'orange')], '势垒宽度 a', 'log₁₀ T');
      plot.marks = [p.a];
      return {
        plots: [plot],
        readout: `V₀=1，E=${H.f(p.E,2)}，κa=${H.f(kap*p.a)}；精确 T=${H.rectT(p.E,p.a).toExponential(3)}；指数近似=${Math.exp(-2*kap*p.a).toExponential(3)}。`,
        values: {
          exact: H.rectT(p.E, p.a),
          wkb: Math.exp(-2 * kap * p.a)
        }
      };
    },
    wkbQuantization(p) {
      const E = p.n + .5,
        a = Math.sqrt(2 * E),
        wave = x => {
          if (Math.abs(x) > a - .08) return NaN;
          const mom = Math.sqrt(2 * E - x * x),
            action = E * Math.PI / 2 - (x * mom / 2 + E * Math.asin(x / a));
          return E + .22 * Math.sin(action + Math.PI / 4) / Math.sqrt(mom);
        };
      let plot = H.plot(-4, 4, 0, 7, [H.line(x => x * x / 2, 'V(x)', 'muted'), H.line(() => E, 'E', 'teal'), H.line(wave, 'WKB 波形，人工偏置', 'orange')]);
      plot.marks = [-a, a];
      return {
        plots: [plot],
        readout: `n=${p.n}；∫p dx/π=${H.f(E,1)}=n+1/2；E=${H.f(E,1)}。转折点附近的 WKB 曲线主动留空，避免把近似发散当成物理解。`,
        values: {
          energy: E,
          action: Math.PI * E
        }
      };
    },
    pulse(p) {
      const P = d => (p.Omega * p.T / 2) ** 2 * H.sinc(d * p.T / 2) ** 2,
        peak = P(0);
      return {
        plots: [H.plot(-3, 3, 0, Math.max(1.1, peak * 1.1), [H.line(P, '一级跃迁概率', 'orange'), H.line(() => 1, '概率上限', 'muted')], '失谐 Δ', 'P一级')],
        readout: `ΩT/2=${H.f(p.Omega*p.T/2)}；共振一级预测=${H.f(peak)}。${peak>.1?'警示：累计概率已不很小，一级结果应谨慎；超过 1 明确失效。':'小概率区域：可与下方 Rabi 解比较。'}`,
        values: {
          peak
        }
      };
    },
    rabi(p) {
      const f = t => H.rabi(p.Omega, p.Delta, t),
        plot = H.plot(0, 20, 0, 1, [H.line(f, '激发态概率', 'orange'), H.line(t => 1 - f(t), '初态概率', 'teal')], 't', '概率');
      plot.marks = [p.t];
      return {
        plots: [plot],
        readout: `P激发(t)=${H.f(f(p.t))}；最大转移=${H.f(p.Omega**2/(p.Omega**2+p.Delta**2))}；广义 Rabi 角频率=${H.f(Math.hypot(p.Omega,p.Delta))}`,
        values: {
          prob: f(p.t),
          sum: 1
        }
      };
    },
    selection(p) {
      const states = {
          '2s': [2, 0, 0],
          '2p0': [2, 1, 0],
          '3p1': [3, 1, 1],
          '3d0': [3, 2, 0],
          '1s': [1, 0, 0],
          '2p1': [2, 1, 1]
        },
        a = states[p.initial],
        b = states[p.final],
        dl = b[1] - a[1],
        dm = b[2] - a[2],
        allowed = Math.abs(dl) === 1 && Math.abs(dm) <= 1,
        down = b[0] < a[0];
      return {
        plots: [{
          kind: 'transition',
          initial: p.initial,
          final: p.final,
          allowed: allowed && down,
          ei: -1 / a[0] ** 2,
          ef: -1 / b[0] ** 2
        }],
        readout: `Δl=${dl}，Δm=${dm}：${allowed?'E1 角向对称性允许（还需检查径向矩阵元与偏振）':'E1 角向禁戒'}；${down?'为向低能跃迁': '不是能量降低的自发发射通道'}。`,
        values: {
          allowed,
          down
        }
      };
    },
    decay(p) {
      const exc = t => Math.exp(-t / p.tau),
        plot = H.plot(0, 15, 0, 1, [H.line(exc, '激发态', 'orange'), H.line(t => p.branch * (1 - exc(t)), '末态 1', 'teal'), H.line(t => (1 - p.branch) * (1 - exc(t)), '末态 2', 'blue')], 't', '人口概率');
      plot.marks = [p.t];
      return {
        plots: [plot],
        readout: `寿命 τ=${H.f(p.tau)}；半衰期=${H.f(p.tau*Math.LN2)}；当前生存=${H.f(exc(p.t))}；总人口保持 1。`,
        values: {
          exc: exc(p.t),
          half: p.tau * Math.LN2,
          sum: 1
        }
      };
    },
    adiabatic(p) {
      const theta = p.theta,
        r = p.r,
        lambda = Math.sqrt(1 + r * r - 2 * r * Math.cos(theta)),
        f = t => (r * Math.sin(theta) / lambda) ** 2 * Math.sin(lambda * t / 2) ** 2,
        plot = H.plot(0, 30, 0, 1, [H.line(f, '离开瞬时初始分支的概率', 'orange')], 't / (1/ω₀)', 'P跃迁');
      plot.marks = [p.t];
      return {
        plots: [plot, {
          kind: 'spin',
          vector: [Math.sin(theta) * Math.cos(r * p.t), Math.sin(theta) * Math.sin(r * p.t), Math.cos(theta)],
          axis: [0, 0, 1]
        }],
        readout: `Ω/ω₀=${H.f(r)}；P跃迁=${H.f(f(p.t))}。箭头表示旋转的哈密顿量方向，不表示实际自旋态；曲线是该旋转场两能级模型的精确结果。`,
        values: {
          prob: f(p.t),
          lambda
        }
      };
    },
    berry(p) {
      const gamma = -p.phi * (1 - Math.cos(p.theta)) / 2,
        closed = -Math.PI * (1 - Math.cos(p.theta));
      return {
        plots: [{
          kind: 'cone',
          theta: p.theta,
          phi: p.phi
        }],
        readout: `闭合圆锥立体角 Ω=${H.f(2*Math.PI*(1-Math.cos(p.theta)))}；一圈 γ+ /π=${H.f(closed/Math.PI)}。当前弧段相位/π=${H.f(gamma/Math.PI)}（开路径表达依赖所选规范）。`,
        values: {
          gamma,
          closed
        }
      };
    },
    abPhase(p) {
      const phase = -2 * Math.PI * p.flux,
        I = (x, ph) => Math.exp(-x * x / 18) * (1 + Math.cos(3 * x + ph));
      return {
        plots: [H.plot(-6, 6, 0, 2.1, [H.line(x => I(x, 0), '零磁通参考', 'muted'), H.line(x => I(x, phase), '当前相对强度', 'orange')], '屏幕位置（示意）', '相对强度')],
        readout: `Φ/Φ₀=${H.f(p.flux,2)}；电子相位差/2π=${H.f(-p.flux,2)}；增加一个磁通量子后条纹复原。包络与载波为教学示意。`,
        values: {
          phase
        }
      };
    },
    classicalScatter(p) {
      const b = p.b,
        theta = 2 * Math.acos(b),
        cx = -Math.sqrt(1 - b * b),
        cy = b,
        dx = 2 * b * b - 1,
        dy = 2 * b * Math.sqrt(1 - b * b);
      return {
        plots: [{
          kind: 'scatter',
          b,
          cx,
          cy,
          dx,
          dy
        }],
        readout: `b/a=${H.f(b)}；θ=${H.f(theta*180/Math.PI,1)}°；dσ/dΩ=a²/4；总截面=πa²（经典刚球）。`,
        values: {
          theta
        }
      };
    },
    partialWaves(p) {
      const s0 = Math.sin(p.d0),
        s1 = Math.sin(p.d1),
        re = x => s0 * Math.cos(p.d0) + 3 * s1 * Math.cos(p.d1) * Math.cos(x),
        im = x => s0 * s0 + 3 * s1 * s1 * Math.cos(x),
        f = x => re(x) ** 2 + im(x) ** 2,
        max = (Math.abs(s0) + 3 * Math.abs(s1)) ** 2 + .01;
      return {
        plots: [H.plot(0, 180, 0, max, [H.line(d => f(d * Math.PI / 180), '|f(θ)|²', 'orange')], 'θ / °', 'dσ/dΩ（k=1）'), {
          kind: 'polar',
          fn: f
        }],
        readout: `σ总=${H.f(4*Math.PI*(s0*s0+3*s1*s1))}；只保留 l=0,1、k=1 的弹性模型。极图半径按当前峰值缩放，只比较形状。`,
        values: {
          sigma: 4 * Math.PI * (s0 * s0 + 3 * s1 * s1)
        },
        differential: f
      };
    },
    bornYukawa(p) {
      const g = .05,
        f = theta => -2 * g / (4 * p.k * p.k * Math.sin(theta / 2) ** 2 + p.mu * p.mu),
        plot = H.plot(0, 180, -8, 2, [H.line(d => Math.log10(f(d * Math.PI / 180) ** 2), '一级 Born 微分截面', 'teal')], 'θ / °', 'log₁₀(dσ/dΩ)');
      return {
        plots: [plot],
        readout: `μ=${H.f(p.mu,2)}，k=${H.f(p.k,2)}，g=0.05；前向 dσ/dΩ=${H.f(f(0)**2,5)}；弱势尺度 2|g|/μ=${H.f(.1/p.mu)}，需结合能区判断近似。`,
        values: {
          forward: f(0) ** 2
        },
        differential: theta => f(theta) ** 2
      };
    },
    bell(p) {
      const beta = p.beta * Math.PI / 180,
        E = (a, b) => -Math.cos(a - b),
        S = E(0, beta) + E(0, -beta) + E(Math.PI / 2, beta) - E(Math.PI / 2, -beta),
        c = Math.cos(beta);
      return {
        plots: [H.plot(0, 90, 0, 3, [H.line(d => 2 * (Math.cos(d * Math.PI / 180) + Math.sin(d * Math.PI / 180)), '量子 |S|', 'orange'), H.line(() => 2, '局域模型上限', 'muted')], 'β / °', '|S|'), H.bars([{
          label: '++',
          v: (1 - c) / 4
        }, {
          label: '+−',
          v: (1 + c) / 4
        }, {
          label: '−+',
          v: (1 + c) / 4
        }, {
          label: '−−',
          v: (1 - c) / 4
        }], .6)],
        readout: `a=0°、a′=90°、b=β、b′=−β；当前 |S|=${H.f(Math.abs(S),5)}。下图为 (a,b) 联合概率，每一侧边缘概率仍为 1/2。`,
        values: {
          S,
          marginA: .5,
          marginB: .5
        }
      };
    },
    cloning(p) {
      const c = Math.cos(p.theta / 2),
        s = Math.sin(p.theta / 2),
        actual = [c * c, 0, 0, s * s],
        target = [c ** 4, c * c * s * s, c * c * s * s, s ** 4],
        labels = ['00', '01', '10', '11'],
        items = [];
      for (let i = 0; i < 4; i++) {
        items.push({
          label: labels[i] + ' 实',
          v: actual[i],
          color: 'teal'
        }, {
          label: labels[i] + ' 目标',
          v: target[i],
          color: 'orange'
        });
      }
      return {
        plots: [H.bars(items)],
        readout: `实际 CNOT 输出与两个理想副本的全态保真度 F=${H.f((c**3+s**3)**2)}。只展示实系数输入；“概率看似接近”仍不等于两个量子态相同。`,
        values: {
          actual,
          target,
          fidelity: (c ** 3 + s ** 3) ** 2
        }
      };
    },
    decoherence(p) {
      const prob = .5 * (1 + p.eta * Math.cos(p.phi)),
        plot = H.plot(0, 2 * Math.PI, 0, 1, [H.line(ph => .5 * (1 + p.eta * Math.cos(ph)), '测 +x 概率', 'orange'), H.line(ph => .5 * (1 + Math.cos(ph)), '完全相干参考', 'muted')], '相对相位 φ', 'P(+x)');
      plot.marks = [p.phi];
      return {
        plots: [plot, {
          kind: 'spin',
          vector: [p.eta * Math.cos(p.phi), p.eta * Math.sin(p.phi), 0],
          axis: [0, 0, 1]
        }],
        readout: `环境态重叠 η=${H.f(p.eta)}；P(+x)=${H.f(prob)}；纯度 Trρ²=${H.f((1+p.eta*p.eta)/2)}。z 基人口始终各半，Bloch 向量长度变为 η。`,
        values: {
          prob,
          purity: (1 + p.eta * p.eta) / 2
        }
      };
    },
    zeno(p) {
      const P = H.zeno(p.angle, p.N),
        plot = H.plot(1, 200, 0, 1, [H.line(n => H.zeno(p.angle, Math.round(n)), '全部测量均生存的概率', 'teal')], '测量次数 N', 'P_N');
      plot.marks = [p.N];
      return {
        plots: [plot],
        readout: `ΩT=${H.f(p.angle,2)}；N=${p.N}；P_N=${H.f(P,5)}；不测量 P=${H.f(Math.cos(p.angle/2)**2,5)}。极限 N→∞ 时 P_N→1，不保证任意有限 N 都单调改善。`,
        values: {
          survival: P,
          unmeasured: Math.cos(p.angle / 2) ** 2
        }
      };
    },
  };
  const api = {
    H,
    models: M
  };
  root.QMSeries = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
