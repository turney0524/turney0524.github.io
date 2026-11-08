/* Shared offline reader: controls, drawing, source inspection, local reading marks. */
'use strict';
(() => {
  const specs = JSON.parse(document.getElementById('demo-specs').textContent),
    source = JSON.parse(document.getElementById('demo-source').textContent),
    models = QMSeries.models;
  const colors = {
      teal: '#197e83',
      orange: '#ba693b',
      blue: '#4979a8',
      muted: '#a9b5ac'
    },
    records = [],
    $ = s => document.querySelector(s);
  const readable = (v, step) => {
    const n = Number(v);
    return Number.isInteger(Number(step)) && Number(step) >= 1 ? String(Math.round(n)) : n.toFixed(step === 'any' || Number(step) < .01 ? 3 : 2);
  };

  function setupCanvas(c) {
    const w = c.clientWidth,
      h = c.clientHeight,
      dpr = devicePixelRatio || 1;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return {
      ctx,
      w,
      h
    };
  }

  function arrow(ctx, x, y, u, v, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(u, v);
    ctx.stroke();
    const a = Math.atan2(v - y, u - x);
    ctx.beginPath();
    ctx.moveTo(u, v);
    ctx.lineTo(u - 9 * Math.cos(a - .4), v - 9 * Math.sin(a - .4));
    ctx.lineTo(u - 9 * Math.cos(a + .4), v - 9 * Math.sin(a + .4));
    ctx.closePath();
    ctx.fill();
  }

  function draw(c, p) {
    const {
      ctx,
      w,
      h
    } = setupCanvas(c);
    ctx.font = '11px system-ui';
    if (p.kind === 'plot') {
      const pad = {
          l: 45,
          r: 16,
          t: 24,
          b: 44
        },
        X = x => pad.l + (x - p.xmin) / (p.xmax - p.xmin) * (w - pad.l - pad.r),
        Y = y => h - pad.b - (y - p.ymin) / (p.ymax - p.ymin) * (h - pad.t - pad.b);
      ctx.lineWidth = .7;
      if (p.band) {
        ctx.fillStyle = '#197e8310';
        ctx.fillRect(pad.l, Y(p.band[1]), w - pad.l - pad.r, Y(p.band[0]) - Y(p.band[1]));
      }
      for (let j = 0; j <= 4; j++) {
        const x = p.xmin + (p.xmax - p.xmin) * j / 4,
          y = p.ymin + (p.ymax - p.ymin) * j / 4;
        ctx.strokeStyle = '#e5ebe4';
        ctx.beginPath();
        ctx.moveTo(pad.l, Y(y));
        ctx.lineTo(w - pad.r, Y(y));
        ctx.stroke();
        ctx.fillStyle = '#7e8e82';
        ctx.font = '10px system-ui';
        ctx.fillText(Math.abs(y) < .00001 ? '0' : y.toFixed(Math.abs(y) > 10 ? 1 : 2), 2, Y(y) + 3);
        ctx.textAlign = 'center';
        ctx.fillText(x.toFixed(Math.abs(x) > 20 ? 0 : 1), X(x), h - 26);
        ctx.textAlign = 'left';
      }
      ctx.fillStyle = '#63796b';
      ctx.textAlign = 'center';
      ctx.fillText(p.xlabel || '', (pad.l + w - pad.r) / 2, h - 7);
      ctx.textAlign = 'left';
      ctx.fillText(p.ylabel || '', pad.l, 13);
      ctx.save();
      ctx.beginPath();
      ctx.rect(pad.l, pad.t, w - pad.l - pad.r, h - pad.t - pad.b);
      ctx.clip();
      for (const line of p.lines) {
        ctx.strokeStyle = colors[line.color] || line.color || colors.teal;
        ctx.lineWidth = line.color === 'muted' ? 1 : 2;
        ctx.beginPath();
        let active = false;
        for (let j = 0; j <= 800; j++) {
          const x = p.xmin + (p.xmax - p.xmin) * j / 800,
            y = line.fn(x);
          if (!Number.isFinite(y)) {
            active = false;
            continue;
          }
          if (active) ctx.lineTo(X(x), Y(y));
          else {
            ctx.moveTo(X(x), Y(y));
            active = true;
          }
        }
        ctx.stroke();
      }
      ctx.strokeStyle = '#829a89';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 5]);
      for (const x of p.marks || []) {
        ctx.beginPath();
        ctx.moveTo(X(x), pad.t);
        ctx.lineTo(X(x), h - pad.b);
        ctx.stroke();
      }
      ctx.restore();
    } else if (p.kind === 'bars') {
      const l = 30,
        b = h - 36,
        t = 25,
        n = p.items.length,
        span = (w - l - 12) / n;
      ctx.fillStyle = '#7e8e82';
      ctx.font = '10px system-ui';
      ctx.fillText('0', 5, b + 2);
      ctx.fillText(p.ymax.toFixed(1), 2, t + 4);
      ctx.strokeStyle = '#d6e2d8';
      ctx.beginPath();
      ctx.moveTo(l, t);
      ctx.lineTo(l, b);
      ctx.lineTo(w - 10, b);
      ctx.stroke();
      for (let j = 0; j < n; j++) {
        const it = p.items[j],
          bh = (b - t) * it.v / p.ymax;
        ctx.fillStyle = colors[it.color] || colors.teal;
        ctx.fillRect(l + j * span + span * .16, b - bh, span * .68, bh);
        ctx.fillStyle = '#647d6c';
        ctx.textAlign = 'center';
        ctx.fillText(it.label, l + (j + .5) * span, b + 19);
        ctx.fillText(it.v.toFixed(3), l + (j + .5) * span, Math.max(t + 11, b - bh - 8));
      }
      ctx.textAlign = 'left';
    } else if (p.kind === 'heat') {
      const side = Math.min(w - 62, h - 43),
        left = (w - side) / 2,
        top = 12,
        n = 110,
        off = document.createElement('canvas');
      off.width = off.height = n;
      const oc = off.getContext('2d'),
        img = oc.createImageData(n, n),
        values = [];
      let peak = 1e-15;
      for (let j = 0; j < n; j++)
        for (let i = 0; i < n; i++) {
          const v = p.fn(p.xmin + (p.xmax - p.xmin) * i / (n - 1), p.ymax - (p.ymax - p.ymin) * j / (n - 1));
          values.push(v);
          peak = Math.max(peak, Math.abs(v));
        }
      for (let k = 0; k < values.length; k++) {
        const v = values[k],
          z = Math.min(1, Math.abs(v) / peak) ** .6,
          target = p.signed ? (v >= 0 ? [186, 105, 59] : [73, 121, 168]) : [25, 126, 131];
        for (let ch = 0; ch < 3; ch++) img.data[k * 4 + ch] = Math.round(250 + (target[ch] - 250) * z);
        img.data[k * 4 + 3] = 255;
      }
      oc.putImageData(img, 0, 0);
      ctx.drawImage(off, left, top, side, side);
      ctx.strokeStyle = '#d5dfd5';
      ctx.strokeRect(left, top, side, side);
      ctx.fillStyle = '#718679';
      ctx.textAlign = 'center';
      ctx.fillText(p.xlabel, left + side / 2, top + side + 29);
      ctx.fillText(String(p.xmin), left, top + side + 14);
      ctx.fillText(String(p.xmax), left + side, top + side + 14);
      ctx.textAlign = 'left';
      ctx.save();
      ctx.translate(left - 35, top + side / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(p.ylabel, 0, 0);
      ctx.restore();
      ctx.fillText(String(p.ymax), left - 23, top + 6);
      ctx.fillText(String(p.ymin), left - 23, top + side);
      if (p.signed) {
        ctx.fillStyle = colors.blue;
        ctx.fillText('−', left + side + 8, top + 20);
        ctx.fillStyle = colors.orange;
        ctx.fillText('+', left + side + 8, top + 40);
      }
    } else if (p.kind === 'spin' || p.kind === 'cone') {
      const cx = w / 2,
        cy = h / 2,
        r = Math.min(w / 2 - 38, h / 2 - 24),
        project = v => [cx + r * (v[0] + .3 * v[1]), cy - r * (v[2] - .18 * v[1])];
      ctx.strokeStyle = '#d6e1d6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * .22, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#d6e1d6';
      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();
      ctx.fillStyle = '#7e9183';
      ctx.fillText('z', cx + 5, cy - r + 7);
      ctx.fillText('x', cx + r - 7, cy - 7);
      let v = p.vector;
      if (p.kind === 'cone') {
        const n = phi => [Math.sin(p.theta) * Math.cos(phi), Math.sin(p.theta) * Math.sin(phi), Math.cos(p.theta)];
        for (const [end, color] of [
            [Math.PI * 2, '#cad9cc'],
            [p.phi, colors.orange]
          ]) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          for (let j = 0; j <= 150; j++) {
            const [x, y] = project(n(end * j / 150));
            j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.stroke();
        }
        v = n(p.phi);
      }
      if (p.axis) {
        const [x, y] = project(p.axis);
        arrow(ctx, cx, cy, x, y, '#a9b5ac');
      }
      const [x, y] = project(v);
      arrow(ctx, cx, cy, x, y, colors.teal);
      ctx.fillStyle = colors.teal;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === 'scatter') {
      const scale = Math.min(w * .18, h * .31),
        cx = w * .52,
        cy = h * .51,
        X = x => cx + scale * x,
        Y = y => cy - scale * y;
      ctx.fillStyle = '#eef4ee';
      ctx.strokeStyle = '#83a898';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      arrow(ctx, X(-2.3), Y(p.b), X(p.cx), Y(p.cy), colors.blue);
      arrow(ctx, X(p.cx), Y(p.cy), X(p.cx + 1.75 * p.dx), Y(p.cy + 1.75 * p.dy), colors.orange);
      ctx.strokeStyle = '#adbeb1';
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(X(-2.3), cy);
      ctx.lineTo(X(2.1), cy);
      ctx.moveTo(cx, cy);
      ctx.lineTo(X(p.cx), Y(p.cy));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#6e8776';
      ctx.fillText('入射 →', X(-2.2), Y(p.b) - 12);
      ctx.fillText('a', cx + scale / 2, cy - 8);
    } else if (p.kind === 'polar') {
      const cx = w / 2,
        cy = h / 2,
        r = Math.min(w / 2 - 30, h / 2 - 25);
      let max = 1e-12;
      for (let j = 0; j <= 360; j++) max = Math.max(max, p.fn(j * Math.PI / 180));
      ctx.strokeStyle = '#dce6dc';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();
      ctx.strokeStyle = colors.orange;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let j = 0; j <= 500; j++) {
        const a = j / 500 * 2 * Math.PI,
          rad = r * p.fn(a) / max,
          x = cx + rad * Math.cos(a),
          y = cy - rad * Math.sin(a);
        j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = '#7b8e7f';
      ctx.fillText('θ=0', cx + r - 18, cy + 20);
      ctx.fillText('π', cx - r, cy + 20);
    } else if (p.kind === 'transition') {
      const X1 = w * .2,
        X2 = w * .8,
        Y = e => 32 - e * (h - 75);
      ctx.strokeStyle = colors.teal;
      ctx.lineWidth = 3;
      for (const [x, y] of [
          [X1, Y(p.ei)],
          [X2, Y(p.ef)]
        ]) {
        ctx.beginPath();
        ctx.moveTo(x - 32, y);
        ctx.lineTo(x + 32, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#506e5c';
      ctx.textAlign = 'center';
      ctx.fillText(p.initial, X1, Y(p.ei) - 16);
      ctx.fillText(p.final, X2, Y(p.ef) - 16);
      arrow(ctx, X1 + 15, Y(p.ei) + 4, X2 - 15, Y(p.ef) + 4, p.allowed ? colors.orange : '#b2bcb2');
      ctx.fillStyle = p.allowed ? colors.orange : '#829181';
      ctx.fillText(p.allowed ? 'E1 角向允许 ↓' : '检查能量方向与选择定则', w / 2, h - 12);
      ctx.textAlign = 'left';
    }
  }

  function legend(p, el) {
    el.replaceChildren();
    if (p.kind === 'plot') {
      for (const line of p.lines) {
        const s = document.createElement('span');
        s.textContent = line.label;
        s.style.color = colors[line.color] || line.color || colors.teal;
        el.append(s);
      }
    }
  }

  function render(rec) {
    const spec = specs[rec.id],
      params = {};
    for (const input of rec.inputs) {
      const c = input.control,
        v = c.type === 'select' ? input.el.value : Number(input.el.value);
      params[c.key] = v;
      if (input.out) input.out.textContent = readable(v, c.step) + (c.unit ? ' ' + c.unit : '');
    }
    const result = models[rec.id](params);
    rec.params = params;
    rec.result = result;
    const plots = rec.el.querySelector('.demo-plots');
    while (plots.children.length < result.plots.length) {
      const box = document.createElement('div'),
        c = document.createElement('canvas'),
        leg = document.createElement('div');
      box.className = 'demo-plot';
      c.className = 'demo-canvas';
      c.setAttribute('role', 'img');
      c.setAttribute('aria-label', spec.title);
      leg.className = 'legend';
      box.append(c, leg);
      plots.append(box);
    }
    plots.classList.toggle('paired', result.plots.length > 1);
    result.plots.forEach((p, i) => {
      const box = plots.children[i];
      box.style.display = '';
      draw(box.querySelector('canvas'), p);
      legend(p, box.querySelector('.legend'));
    });
    for (let j = result.plots.length; j < plots.children.length; j++) plots.children[j].style.display = 'none';
    rec.el.querySelector('.demo-result').textContent = result.readout;
    const pre = rec.el.querySelector('.demo-code code'),
      paramsText = JSON.stringify(params, null, 2);
    pre.textContent = `// 直接在当前课本的浏览器控制台运行，或在 code/ 下用 Node 运行。\nconst { H } = typeof QMSeries !== 'undefined'\n  ? QMSeries : require('./series_models.js');\n\n// 网页实际调用的同一个物理模型函数。\n${source[rec.id]}\n\nconst params = ${paramsText};\nconst result = ${rec.id}(params);\nconsole.log(result.readout);\n// result.values 是可核验数值；result.plots 交给 series_reader.js 绘图。`;
  }
  for (const el of document.querySelectorAll('[data-demo]')) {
    const id = el.dataset.demo,
      spec = specs[id],
      rec = {
        id,
        el,
        inputs: [],
        playing: false,
        visible: true
      };
    records.push(rec);
    const controls = el.querySelector('.demo-controls');
    for (const c of spec.controls) {
      const label = document.createElement('label'),
        name = document.createElement('span');
      name.textContent = c.label;
      label.append(name);
      let input, out;
      if (c.type === 'select') {
        input = document.createElement('select');
        for (const option of c.options) {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.label;
          input.append(opt);
        }
        input.value = c.value;
      } else {
        out = document.createElement('output');
        label.append(out);
        input = document.createElement('input');
        input.type = 'range';
        input.min = c.min;
        input.max = c.max;
        input.step = c.step;
        input.value = c.value;
      }
      input.setAttribute('aria-label', spec.title + '：' + c.label);
      input.dataset.key = c.key;
      label.append(input);
      controls.append(label);
      rec.inputs.push({
        control: c,
        el: input,
        out
      });
      input.addEventListener('input', () => {
        rec.playing = false;
        updatePlay(rec);
        render(rec);
      });
    }
    const actions = el.querySelector('.demo-actions');
    if (spec.animate) {
      const button = document.createElement('button');
      button.textContent = spec.animate.label;
      button.className = 'demo-play';
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      actions.append(button);
      rec.playButton = button;
      button.onclick = () => {
        rec.playing = !rec.playing;
        const field = rec.inputs.find(i => i.control.key === spec.animate.key);
        if (rec.playing && +field.el.value >= field.control.max) field.el.value = field.control.min;
        rec.animationValue = +field.el.value;
        updatePlay(rec);
        render(rec);
      };
    }
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'quiet';
    reset.textContent = '重置参数';
    reset.onclick = () => {
      rec.playing = false;
      for (const field of rec.inputs) field.el.value = field.control.value;
      updatePlay(rec);
      render(rec);
    };
    actions.append(reset);
    el.querySelector('.copy-code').onclick = async e => {
      const button = e.currentTarget,
        text = el.querySelector('.demo-code code').textContent;
      try {
        if (!navigator.clipboard) throw new Error('no clipboard');
        await navigator.clipboard.writeText(text);
        button.textContent = '已复制';
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(el.querySelector('.demo-code code'));
        getSelection().removeAllRanges();
        getSelection().addRange(range);
        button.textContent = '代码已选中，请复制';
      }
      setTimeout(() => button.textContent = '复制当前代码', 2500);
    };
    render(rec);
  }

  function updatePlay(rec) {
    if (rec.playButton) {
      rec.playButton.textContent = rec.playing ? '暂停' : specs[rec.id].animate.label;
      rec.playButton.setAttribute('aria-pressed', String(rec.playing));
    }
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const rec = records.find(r => r.el === entry.target);
        if (rec) {
          rec.visible = entry.isIntersecting;
          if (!rec.visible && rec.playing) {
            rec.playing = false;
            updatePlay(rec);
          }
        }
      }
    }, {
      rootMargin: '150px'
    });
    for (const rec of records) observer.observe(rec.el);
  }
  let last = performance.now();

  function frame(now) {
    const dt = Math.min(.08, (now - last) / 1000);
    last = now;
    for (const rec of records)
      if (rec.playing && rec.visible) {
        const a = specs[rec.id].animate,
          field = rec.inputs.find(i => i.control.key === a.key),
          value = Math.min(field.control.max, rec.animationValue + a.speed * dt);
        rec.animationValue = value;
        field.el.value = value;
        if (value >= field.control.max) {
          rec.playing = false;
          updatePlay(rec);
        }
        render(rec);
      } requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  let resizeQueued = false;
  window.addEventListener('resize', () => {
    if (!resizeQueued) {
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        for (const rec of records) render(rec);
      });
    }
  });
  const sections = [...document.querySelectorAll('.chapter-section')],
    links = [...document.querySelectorAll('.sidebar nav a')];
  let progressQueued = false;

  function progress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const meter = $('#reading-progress');
    if (meter) meter.style.width = (max > 0 ? 100 * scrollY / max : 0) + '%';
    let current = sections[0]?.id;
    for (const s of sections)
      if (s.getBoundingClientRect().top < innerHeight * .35) current = s.id;
    for (const a of links) {
      const yes = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', yes);
      if (yes) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
  }
  window.addEventListener('scroll', () => {
    if (!progressQueued) {
      progressQueued = true;
      requestAnimationFrame(() => {
        progressQueued = false;
        progress();
      });
    }
  }, {
    passive: true
  });
  const chapter = document.body.dataset.chapter,
    storageKey = 'qm-course-read-' + chapter;
  let marks = {};
  try {
    marks = JSON.parse(localStorage.getItem(storageKey) || '{}');
  } catch (_) {}
  for (const button of document.querySelectorAll('.mark-section')) {
    const id = button.dataset.section;
    const update = () => {
      button.textContent = marks[id] ? '✓ 已读这一节' : '标记这一节已读';
      button.setAttribute('aria-pressed', String(!!marks[id]));
    };
    update();
    button.onclick = () => {
      marks[id] = !marks[id];
      update();
      try {
        localStorage.setItem(storageKey, JSON.stringify(marks));
      } catch (_) {}
    };
  }
  $('#print')?.addEventListener('click', () => window.print());
  let printState = [];
  window.addEventListener('beforeprint', () => {
    for (const rec of records) {
      rec.playing = false;
      updatePlay(rec);
    }
    printState = [...document.querySelectorAll('details')].map(el => [el, el.open]);
    for (const [el] of printState)
      if (!el.classList.contains('demo-code')) el.open = true;
    for (const rec of records) render(rec);
  });
  window.addEventListener('afterprint', () => {
    for (const [el, open] of printState) el.open = open;
    for (const rec of records) render(rec);
  });
  progress();
})();
